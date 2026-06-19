// =============================================================================
// iStructural - Owner OTP verify endpoint (drop-in for Vercel /api)
// =============================================================================
//
// PURPOSE
// -------
// Verifies the 6-digit code the user typed against the signed challenge
// returned by /api/request-owner-code. On success, returns a short-lived
// signed owner session token the front-end can store and use as the new
// "ownerMode" credential.
//
// DEPLOY
// ------
// 1) Rename to: pages/api/verify-owner-code.js
// 2) Reuses env vars from the request endpoint:
//       OWNER_OTP_SECRET
//       OWNER_OTP_SESSION_HOURS  (optional, default 24)
//
// SECURITY NOTES
// --------------
// - Constant-time comparison on the code hash.
// - The session token is signed with the same secret. Verify on every
//   API call before granting owner-only operations.
// =============================================================================

const crypto = require("crypto");

function b64url(buf){ return Buffer.from(buf).toString("base64").replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,""); }
function fromB64url(s){ s=s.replace(/-/g,"+").replace(/_/g,"/"); while(s.length%4)s+="="; return Buffer.from(s,"base64"); }
function sign(payload, secret){
  const header = b64url(JSON.stringify({alg:"HS256",typ:"JWT"}));
  const body = b64url(JSON.stringify(payload));
  const sig = b64url(crypto.createHmac("sha256", secret).update(header+"."+body).digest());
  return header+"."+body+"."+sig;
}
function verify(token, secret){
  try {
    const [h,b,s] = (token||"").split(".");
    if (!h||!b||!s) return null;
    const expected = b64url(crypto.createHmac("sha256", secret).update(h+"."+b).digest());
    if (s.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(s),Buffer.from(expected))) return null;
    return JSON.parse(fromB64url(b).toString("utf8"));
  } catch(_) { return null; }
}

module.exports = async function handler(req, res){
  try {
    if (req.method !== "POST") { res.status(405).json({ok:false,error:"method_not_allowed"}); return; }
    const { OWNER_OTP_SECRET, OWNER_OTP_SESSION_HOURS } = process.env;
    if (!OWNER_OTP_SECRET) { res.status(500).json({ok:false,error:"not_configured"}); return; }
    const sessionHours = parseInt(OWNER_OTP_SESSION_HOURS || "24", 10);
    let body = req.body;
    if (typeof body === "string") { try{ body = JSON.parse(body); } catch(_){ body={}; } }
    const { challenge, code } = body || {};
    if (!challenge || !code) { res.status(400).json({ok:false,error:"missing_fields"}); return; }
    const claims = verify(challenge, OWNER_OTP_SECRET);
    if (!claims) { res.status(401).json({ok:false,error:"bad_challenge"}); return; }
    if (Date.now() > claims.exp) { res.status(401).json({ok:false,error:"expired"}); return; }
    const codeHash = crypto.createHash("sha256").update(String(code)).digest("hex");
    if (codeHash !== claims.codeHash) { res.status(401).json({ok:false,error:"wrong_code"}); return; }
    // Mint a session token good for sessionHours
    const session = sign({
      role: "owner",
      iss: "isg-owner",
      iat: Date.now(),
      exp: Date.now() + sessionHours*3600*1000,
      reqId: claims.reqId,
    }, OWNER_OTP_SECRET);
    res.status(200).json({ ok:true, ownerSession: session, expiresIn: sessionHours*3600 });
  } catch (err) {
    console.error("[verify-owner-code] unexpected", err && err.message);
    res.status(500).json({ ok:false, error:"server_error" });
  }
};
