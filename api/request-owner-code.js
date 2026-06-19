// =============================================================================
// iStructural - Owner OTP request endpoint (drop-in for Vercel /api)
// =============================================================================
//
// PURPOSE
// -------
// Sends a 6-digit one-time passcode to info@istructgroup.com via Resend.
// The client never sees the code; it arrives in the inbox.
// The client receives a signed challenge it must echo back to /api/verify-owner-code
// along with the code the user entered.
//
// DEPLOY
// ------
// 1) Rename to: pages/api/request-owner-code.js  (or your project's API route path).
// 2) Add Vercel env vars:
//       RESEND_API_KEY        = re_...                (from resend.com)
//       OWNER_EMAIL           = info@istructgroup.com
//       OWNER_OTP_SECRET      = a long random string (256 bits)
//       OWNER_OTP_FROM        = onboarding@istructgroup.com  (must be a verified sender on Resend)
// 3) Do not log the secret or the API key.
//
// SECURITY NOTES
// --------------
// - Code is bound to a request id and expires in 10 minutes.
// - One challenge per request; rate limit via Vercel WAF or a small KV later.
// - Signed with HMAC-SHA256. JWT-style "header.payload.signature".
// =============================================================================

const crypto = require("crypto");

function b64url(buf){ return Buffer.from(buf).toString("base64").replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,""); }
function sign(payload, secret){
  const header = b64url(JSON.stringify({alg:"HS256",typ:"JWT"}));
  const body = b64url(JSON.stringify(payload));
  const sig = b64url(crypto.createHmac("sha256", secret).update(header+"."+body).digest());
  return header+"."+body+"."+sig;
}

module.exports = async function handler(req, res){
  try {
    if (req.method !== "POST") { res.status(405).json({ok:false,error:"method_not_allowed"}); return; }
    const { RESEND_API_KEY, OWNER_EMAIL, OWNER_OTP_SECRET, OWNER_OTP_FROM } = process.env;
    if (!RESEND_API_KEY || !OWNER_EMAIL || !OWNER_OTP_SECRET || !OWNER_OTP_FROM) {
      console.error("[request-owner-code] missing env");
      res.status(500).json({ok:false,error:"not_configured"}); return;
    }
    const code = String(Math.floor(100000 + Math.random()*900000)); // 6 digits
    const codeHash = crypto.createHash("sha256").update(code).digest("hex");
    const reqId = b64url(crypto.randomBytes(12));
    const issued = Date.now();
    const exp = issued + 10*60*1000; // 10 minutes
    const challenge = sign({reqId, exp, codeHash, iss:"isg-owner"}, OWNER_OTP_SECRET);
    // Send the email via Resend
    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Authorization": `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: OWNER_OTP_FROM,
        to: OWNER_EMAIL,
        subject: `iStructural owner sign-in code: ${code}`,
        text: `Your iStructural owner sign-in code is: ${code}\n\nIt expires in 10 minutes.\nIf you did not request this, ignore this email.\n\nRequest id: ${reqId}`,
        html: `<div style="font-family:Arial,sans-serif;color:#1C2733;line-height:1.5">
          <p>Your iStructural owner sign-in code is:</p>
          <p style="font-size:28px;font-weight:800;letter-spacing:6px;font-family:'SF Mono',Menlo,monospace;color:#0E2438">${code}</p>
          <p style="color:#6B7785">Expires in 10 minutes. If you did not request this, ignore this email.</p>
          <p style="color:#6B7785;font-size:11px">Request id: ${reqId}</p>
        </div>`
      })
    });
    if (!resp.ok) {
      const t = await resp.text().catch(()=>"");
      console.error("[request-owner-code] resend error", resp.status, t.slice(0,200));
      res.status(502).json({ok:false,error:"email_send_failed"}); return;
    }
    // Return the challenge to the client. The 6 digits go to your inbox.
    res.status(200).json({ ok:true, challenge, expiresIn: 600 });
  } catch (err) {
    console.error("[request-owner-code] unexpected", err && err.message);
    res.status(500).json({ ok:false, error:"server_error" });
  }
};
