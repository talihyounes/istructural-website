import { useState, useMemo, useEffect, Fragment } from "react";

// ── Meta injection (for Vercel / Next.js move, use next/head instead) ──
if (typeof document !== "undefined") {
  document.title = "iStructural Group Inc. | Structural Engineering, Management & AI Assessment";
  const meta = document.querySelector('meta[name="description"]');
  if (meta) {
    meta.setAttribute("content", "iStructural Group Inc. | Advanced structural engineering, project management, and AI-powered structural assessment. Canada, MENA, global.");
  } else {
    const m = document.createElement("meta");
    m.name = "description";
    m.content = "iStructural Group Inc. | Advanced structural engineering, project management, and AI-powered structural assessment. Canada, MENA, global.";
    document.head.appendChild(m);
  }
}

// ── FORMSPREE ENDPOINT | replace YOUR_FORM_ID with your actual Formspree form ID ──
// Create a free account at formspree.io, create a new form, copy the ID.
// Example: if your form URL is https://formspree.io/f/xpzvwkab, the ID is xpzvwkab
const FORMSPREE_ID = "jgjrvgk";
const FORMSPREE_URL = `https://formspree.io/f/${FORMSPREE_ID}`;

const P = {
  navy:"#0C1B2E",navyM:"#162D4A",teal:"#0A7C6E",tealL:"#0EBEA8",
  sand:"#F7F5F0",white:"#FFFFFF",slate:"#5A6B7A",charcoal:"#2A3642",warm:"#B8A68E",gold:"#C6973F",
  s1:"#1E5B8A",s1L:"#E8F0F7",s2:"#6B3A7D",s2L:"#F3ECF6",s3:"#0A7C6E",s3L:"#E6F5F2",
  coral:"#C0553A",redD:"#8B2020",greenD:"#1B6B35",s3b:"#1565C0",s3bL:"#E3F2FD",
};

// ── ALL 87 PROJECTS ──
const allProjects = [
  // Residential & Hotel (26)
  {n:"Muntazah Building (3B+GF+7+Roof+URoof), V.E. on structural elements",c:"Residential",r:"Qatar"},
  {n:"Specialized Thermal Analysis and Design of Post-Tensioned Concrete Slabs",c:"Residential",r:"Other",country:"Iraq"},
  {n:"Six Buildings of B+G+3, plus Luxury Club House",c:"Residential",r:"Qatar"},
  {n:"Structural Assessment report for existing building subject to excessive slab deflection",c:"Residential",r:"Lebanon"},
  {n:"Irregular U Shape Luxury Buildings (Two), with Seismic Joints (B3+GF+12)",c:"Residential",r:"Lebanon"},
  {n:"Hamra Building (B2+GF+15)",c:"Residential",r:"Lebanon"},
  {n:"Hamra Building (B4+GF+17)",c:"Residential",r:"Lebanon"},
  {n:"Empire Tower (B4+GF+13)",c:"Residential",r:"Lebanon"},
  {n:"Mansour Building (2 Joined Buildings of B1+4)",c:"Residential",r:"Lebanon"},
  {n:"Hmadeh Building (B2+12)",c:"Residential",r:"Lebanon"},
  {n:"Residential Building (2B+G+4), Aley",c:"Residential",r:"Lebanon"},
  {n:"Residential Building (3B+G+7), Al Saad",c:"Residential",r:"Qatar"},
  {n:"Tijara Town (Six Buildings of 15 and 13), Al Ain Road",c:"Residential",r:"UAE"},
  {n:"Three Fishers Harbours (Multi-usage), Jumeirah 1, 2 and Umm Suqueim 2",c:"Residential",r:"UAE"},
  {n:"Real Estate Bank Development (Five Buildings of 15 and 10), Dubai Silicon Oasis",c:"Residential",r:"UAE"},
  {n:"Al Ouyoun Residences (2B+G+4), Broumana",c:"Residential",r:"Lebanon"},
  {n:"Reef Villas (Seven Types, 1000+ Villas)",c:"Residential",r:"UAE"},
  {n:"Jumeirah Beach Residence Sector 6, J.B.R.",c:"Residential",r:"UAE"},
  {n:"G+12 Building, Port Saeed",c:"Residential",r:"UAE"},
  {n:"Golf Towers, Jumeirah Lake",c:"Residential",r:"UAE"},
  {n:"B+G+10, International City",c:"Residential",r:"UAE"},
  {n:"2B+G+10, International City",c:"Residential",r:"UAE"},
  {n:"B+G+8+Gym, International City",c:"Residential",r:"UAE"},
  {n:"G+3+Roof, Nahda 2",c:"Residential",r:"UAE"},
  {n:"G+4+Roof, Nahda 2",c:"Residential",r:"UAE"},
  {n:"G+12+Roof, Nahda 2",c:"Residential",r:"UAE"},
  // Offices & Commercial (28)
  {n:"Jeddah Industrial City",c:"Infrastructure",r:"KSA"},
  {n:"MISK Peninsula",c:"Commercial",r:"KSA"},
  {n:"MISK Foundation Center",c:"Commercial",r:"KSA"},
  {n:"King Salman Park",c:"Commercial",r:"KSA"},
  {n:"Cultural Square Park",c:"Commercial",r:"KSA"},
  {n:"BCP Tower (Banque Centrale Populaire)",c:"Commercial",r:"Other",country:"Morocco"},
  {n:"Al Majed Tower (4B+G+25+P)",c:"Commercial",r:"Qatar"},
  {n:"Entisar Tower / Level 54 (Vibration analysis)",c:"Commercial",r:"UAE"},
  {n:"D.F.C.M. (Transfer Beams)",c:"Commercial",r:"Qatar"},
  {n:"Lusail Tower (2B+G+34)",c:"Commercial",r:"Qatar"},
  {n:"ENBD Tower (3B+GF+18)",c:"Commercial",r:"UAE"},
  {n:"Specialized Thermal Analysis and Design of Post-Tensioned Concrete Slabs",c:"Commercial",r:"Qatar"},
  {n:"Barwa Financial District (9 Towers and 1 Hotel)",c:"Commercial",r:"Qatar"},
  {n:"Yabes Towers (Admin 3B+G+42 and Hotel 3B+G+18)",c:"Commercial",r:"KSA"},
  {n:"Tamani Tower (B+G+19)",c:"Commercial",r:"UAE"},
  {n:"Hydra Tower (38 stories)",c:"Commercial",r:"UAE"},
  {n:"Al Hathboor Building (3B+G+21), Al Nahda First",c:"Commercial",r:"UAE"},
  {n:"Star Hills Mixed Use (5* Hotel 4B+43 + Office Tower 4B+26), Business Bay",c:"Commercial",r:"UAE"},
  {n:"Al Jaber Tower, Jumeirah Lake",c:"Commercial",r:"UAE"},
  {n:"Al Shaafar Tower, Jumeirah Lake",c:"Commercial",r:"UAE"},
  {n:"Limitless (Block of 4 Towers), JAFZA",c:"Commercial",r:"UAE"},
  {n:"Shihab Towers (Two Office 3B+G+3P+31 each), Business Bay",c:"Commercial",r:"UAE"},
  {n:"Al Waseet Headquarter (2B+G+5), Media City",c:"Commercial",r:"UAE"},
  {n:"Deyaar Three Towers (U1, U2, U3), Jumeirah Lake",c:"Commercial",r:"UAE"},
  {n:"Indigo Tower, Jumeirah Lake",c:"Commercial",r:"UAE"},
  {n:"Reef Tower, Jumeirah Lake",c:"Commercial",r:"UAE"},
  {n:"Emirates Industrial Bank Headquarter, Deira",c:"Commercial",r:"UAE"},
  {n:"Amlak Tower",c:"Commercial",r:"Other",country:"Kuwait"},
  // Retail (4)
  {n:"Dubai Mall, Business Bay",c:"Retail",r:"UAE"},
  {n:"Dubai Marina Mall, J.B.R.",c:"Retail",r:"UAE"},
  {n:"Landmark Building Mall",c:"Retail",r:"UAE"},
  {n:"COOP Supermarket, Oman-Hatta",c:"Retail",r:"Other",country:"Oman"},
  // Social / University / Hospital (11)
  {n:"IMC Medical College",c:"Institutional",r:"KSA"},
  {n:"Tabuk Administration Building (Irregular shape two interconnected)",c:"Institutional",r:"KSA"},
  {n:"Science and Computer Colleges",c:"Institutional",r:"KSA"},
  {n:"Sidra Hospital",c:"Institutional",r:"Qatar"},
  {n:"Sacred Heart (3B+GF+40m Minaret+18m/70 Tons Statue)",c:"Institutional",r:"Lebanon"},
  {n:"Hasbaya School (2B+GF+2)",c:"Institutional",r:"Lebanon"},
  {n:"Saint-Anne Social Building (B+GF+3)",c:"Institutional",r:"Lebanon"},
  {n:"Taran Mosque (Integrated Piled Raft)",c:"Institutional",r:"Lebanon"},
  {n:"Pere Jacques School (2B+G+4), Extension",c:"Institutional",r:"Lebanon"},
  {n:"KHDA Headquarter (B+G+4), Dubai Knowledge Village",c:"Institutional",r:"UAE"},
  {n:"Ismaili Centre, Um Hrair",c:"Institutional",r:"UAE"},
  // Bridges (15)
  {n:"AlUla Bridge, Overpass",c:"Bridges",r:"KSA"},
  {n:"Riyadh Metro, Multiple Spans, Alternative Structural Solutions",c:"Bridges",r:"KSA"},
  {n:"Haramain High Speed Rail, Multiple Spans, Alternative Solutions, Riyadh",c:"Bridges",r:"KSA"},
  {n:"Haramain High Speed Rail, Multiple Spans, Alternative Solutions, Jeddah",c:"Bridges",r:"KSA"},
  {n:"Innovative Precast U Girders, PT Box Girders, Multiple Spans",c:"Bridges",r:"KSA"},
  {n:"Mixed Flyover Bridge PT Concrete and Steel Box-Girders (60m spans)",c:"Bridges",r:"KSA"},
  {n:"Overpass Bridge (I Sections), Multiple Spans, Alternative PT Solutions",c:"Bridges",r:"KSA"},
  {n:"Extension Platforms (T Sections), Multiple Spans, Alternative PT Solutions",c:"Bridges",r:"KSA"},
  {n:"Service Check, Deflection Control Precast Segmental Bridge (38m)",c:"Bridges",r:"KSA"},
  {n:"Precast I Sections (30m), Construction Stage Analysis",c:"Bridges",r:"KSA"},
  {n:"Balanced Cantilever Bridge (44, 72, 44m), Variable PT Deck",c:"Bridges",r:"KSA"},
  {n:"Precast I Sections (34m), Construction Stage Analysis, Jeddah",c:"Bridges",r:"KSA"},
  {n:"Precast T Sections (30m), Construction Stage Analysis, Jeddah",c:"Bridges",r:"KSA"},
  {n:"Mixed Flyover Bridge PT Concrete, Curved Spans (Total 325m)",c:"Bridges",r:"KSA"},
  {n:"Pre-Tensioned Pedestrian Solid Deck Bridge (30m span)",c:"Bridges",r:"UAE"},
  // Cultural (3)
  {n:"Abu Bakr Salem Theatre",c:"Cultural",r:"KSA"},
  {n:"ISF Camp (Transfer Beams)",c:"Cultural",r:"Qatar"},
  {n:"Shooting Club",c:"Cultural",r:"UAE"},
  // ── ADDED FROM CLIENT'S REFERENCE LIST (2025 update) ──
  {n:"Taj Al Fakhama, 550 Villas",c:"Residential",r:"KSA",y:"2021"},
  {n:"Oryx Tower",c:"Commercial",r:"Qatar",y:"2021"},
  {n:"Al Mana Tower",c:"Commercial",r:"Qatar",y:"2020"},
  {n:"Damac Tower",c:"Commercial",r:"Qatar",y:"2020"},
  {n:"Saint Charbel Church",c:"Institutional",r:"Qatar",y:"2018"},
  {n:"BLOM Bank Headquarter",c:"Commercial",r:"Lebanon",y:"2019"},
  {n:"Al Nahr Mixed Used Development",c:"Commercial",r:"Lebanon",y:"2017"},
  {n:"Sioufi 4499, Maceio",c:"Residential",r:"Lebanon",y:"2016"},
  {n:"Yassine Warehouse",c:"Commercial",r:"Lebanon",y:"2016"},
  {n:"Industrial Research Institute",c:"Institutional",r:"Lebanon",y:"2016"},
  {n:"Mada Building, Societe Generale de Banque au Liban",c:"Commercial",r:"Lebanon",y:"2015"},
  {n:"U Park Buildings",c:"Commercial",r:"Lebanon",y:"2013"},
  {n:"Ministry of Health / IPS Irrigation Systems and Water Tanks (2,500 m3)",c:"Infrastructure",r:"KSA",y:"2015"},
  {n:"Haiti Airport Control Tower",c:"Infrastructure",r:"Other",country:"Haiti",y:"2022"},
  {n:"Limassol Blue Marine Towers",c:"Residential",r:"Other",country:"Cyprus",y:"2022"},
  {n:"Herat Solar and Wind Power Plant",c:"Infrastructure",r:"Other",country:"Afghanistan",y:"2017"},
  {n:"Ghozareh Industrial Zone, Wind Turbines",c:"Infrastructure",r:"Other",country:"Afghanistan",y:"2017"},
  {n:"Turkmenistan Satellite Control",c:"Infrastructure",r:"Other",country:"Turkmenistan",y:"2016"},
  {n:"Skaya Tower",c:"Commercial",r:"Other",country:"Syria",y:"2014-2016"},
  {n:"Sulaimaniya Hotel, Rotana",c:"Commercial",r:"Other",country:"Iraq",y:"2013"},
  {n:"Market Analysis",c:"Business Development",r:"North America",country:"USA & Canada",y:"2025"},
];

const cats = ["All","Residential","Commercial","Retail","Institutional","Bridges","Infrastructure","Cultural","Business Development"];
const catCol = {Residential:P.s1,Commercial:P.gold,Retail:P.coral,Institutional:P.s2,Bridges:P.teal,Infrastructure:P.s3,Cultural:P.warm,"Business Development":P.charcoal};
const regions = ["All","UAE","KSA","Qatar","Lebanon","North America","Other"];

const partners = [
  {name:"T2D2",type:"Damage AI",focus:"Facade/exterior CV damage"},{name:"STRUCINSPECT",type:"Damage AI",focus:"Bridge/concrete 99.9% TPR"},
  {name:"Niricson/Autospex",type:"Damage AI",focus:"Concrete infrastructure"},{name:"Inspekt AI",type:"Damage AI",focus:"Facade+thermal ASTM/ISO"},
  {name:"Facade AI",type:"Damage AI",focus:"BMU autonomous facade"},{name:"DroneDeploy",type:"Platform",focus:"Reality capture+AI agents"},
  {name:"Optelos",type:"Platform",focus:"Geospatial AI workflow"},{name:"gNext Labs",type:"Platform",focus:"AI photogrammetry"},
  {name:"Ombrulla",type:"Platform",focus:"Multi-asset drone/rover"},{name:"Averroes.ai",type:"Platform",focus:"95% accuracy 400K img/day"},
  {name:"Oxmaint AI",type:"Platform",focus:"Drone-to-CMMS NBI"},{name:"Datagrid",type:"Adjacent",focus:"AI agents structural defects"},
  {name:"FlyPix AI",type:"Adjacent",focus:"Geospatial satellite+drone"},{name:"Hosta A.I.",type:"Adjacent",focus:"Remote photo assessment"},
  {name:"Pix4D",type:"Processing",focus:"Photogrammetry"},{name:"Matterport",type:"Processing",focus:"3D digital twin"},
  {name:"Skydio",type:"Hardware",focus:"Autonomous AI drones"},{name:"Zeitview",type:"Service",focus:"Pilot network 70+ countries"},
  {name:"Propeller Aero",type:"Processing",focus:"Site mapping"},{name:"Parsons",type:"Enterprise",focus:"AI bridge (700+ assets)"},
  {name:"OpenSpace",type:"Adjacent",focus:"360 progress ($200M)"},{name:"Buildots",type:"Adjacent",focus:"Hardhat AI ($106M)"},
  {name:"Avvir/Hexagon",type:"Adjacent",focus:"Scan vs BIM"},
];
const tC={"Damage AI":P.coral,Platform:P.teal,Adjacent:P.gold,Processing:P.s1,Hardware:P.charcoal,Service:P.s2,Enterprise:P.navy};

// ── PHASES (restructured: 2 phases + optional AI Deep Inspection escalation) ──
const phases = [
  {id:"p1",label:"Phase 1",title:"Preliminary Advisory",price:"",liability:"No liability",color:P.s3,
   items:["Free standardized forms","Guided photo protocol (far, near, nearer, nearest)","AI preliminary advisory report","Optional engineer review (add-on)","Disclaimer: AI output only"]},
  {id:"p2",label:"Phase 2",title:"Stamped Engineering",price:"",liability:"Full PE stamp + PI",color:P.s2,
   items:["Finite Element Modeling","Full load and capacity calculations","Repair drawings and 3D modeling","Material specifications and construction sequence","Authority submission package"]},
];

// ── OPTIONAL AI DEEP INSPECTION (escalation, available on engineer's decision) ──
const aiDeepInspection = {
  title:"Conditional Escalation (Selected cases, on engineer's decision)",
  subtitle:"AI Deep Inspection capability",
  liability:"Inspection-level",
  items:["Specialist data: LiDAR, drone, thermal, GPR","Curated partner AI processing","3D digital twin and defect overlay","Severity-rated findings (ACI, AASHTO, IBC, FEMA, CSA, NBC, Eurocode)","Detailed inspection dossier"],
};

// ── SHARED STYLES ──
const inputStyle = {
  width:"100%",padding:"8px 10px",borderRadius:6,border:"1px solid #d0d8e0",
  fontSize:10,color:P.charcoal,background:"#fafbfc",
  fontFamily:"'DM Sans',sans-serif",boxSizing:"border-box",
  outline:"none",marginBottom:6,display:"block",
};
const textareaStyle = {...inputStyle,resize:"vertical",minHeight:72};
const labelStyle = {fontSize:9,fontWeight:600,color:P.slate,marginBottom:2,display:"block",letterSpacing:0.3};

// ── A11Y HELPER: add keyboard activation (Enter/Space) to non-button clickables ──
const kbd = (handler) => ({
  role: "button",
  tabIndex: 0,
  onKeyDown: (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handler(e); } },
});
const submitStyle = (color) => ({
  marginTop:12,background:color,color:P.white,padding:"10px 20px",
  borderRadius:8,fontSize:11,fontWeight:700,textAlign:"center",
  cursor:"pointer",border:"none",width:"100%",fontFamily:"'DM Sans',sans-serif",
  letterSpacing:0.3,
});

// ── CAPTCHA HOOK (simple math, server-replaceable with reCAPTCHA / Cloudflare Turnstile on deploy) ──
// ── PUZZLE CAPTCHA HOOK (drag-fit puzzle piece + confidence percentage) ──
// Production note: replace with hCaptcha component (<HCaptcha sitekey={KEY} onVerify={...} />)
// when ready. Sign up at hcaptcha.com to get a free sitekey. Install: npm install @hcaptcha/react.
function useCaptcha() {
  // The puzzle slot is at a random x position; user drags slider to match
  const [targetX] = useState(() => Math.floor(Math.random() * 140) + 60); // 60-200 px
  const [sliderX, setSliderX] = useState(0);
  const [released, setReleased] = useState(false);
  const tolerance = 8; // pixels
  const distance = Math.abs(sliderX - targetX);
  const accuracy = Math.max(0, Math.round(100 - (distance / 2.5)));
  const ok = released && distance <= tolerance;
  return {targetX, sliderX, setSliderX, released, setReleased, accuracy, ok, distance};
}

// ── FORM HOOK (with CAPTCHA gate) ──
function useForm(initial) {
  const [values, setValues] = useState(initial);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error | captcha
  const captcha = useCaptcha();
  const set = (k) => (e) => setValues(v => ({...v, [k]: e.target.value}));
  const submit = async (e) => {
    e.preventDefault();
    if (!captcha.ok) { setStatus("captcha"); return; }
    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_URL, {
        method:"POST",
        headers:{"Content-Type":"application/json","Accept":"application/json"},
        body: JSON.stringify(values),
      });
      if (res.ok) setStatus("success");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };
  return {values, set, status, submit, captcha};
}

// ── PUZZLE CAPTCHA UI (drag-fit slider with accuracy %) ──
const CaptchaBlock = ({captcha, status}) => {
  const handleChange = (e) => {
    captcha.setSliderX(parseInt(e.target.value, 10));
  };
  const handleMouseUp = () => captcha.setReleased(true);
  const statusColor = captcha.ok ? P.greenD : (captcha.released ? P.coral : P.slate);
  const statusText = captcha.ok
    ? `Verified ✓  Accuracy: ${captcha.accuracy}%`
    : (captcha.released
        ? `Off by ${captcha.distance}px. Drag again. Accuracy: ${captcha.accuracy}%`
        : `Drag the slider to align the puzzle piece. Live accuracy: ${captcha.accuracy}%`);

  return (
    <div style={{marginTop:8,padding:"12px 14px",borderRadius:7,background:"#F0F8F6",border:`1px solid ${P.teal}40`}}>
      <div style={{fontSize:8,fontWeight:700,color:P.teal,letterSpacing:1.2,textTransform:"uppercase",marginBottom:8}}>Security Check &middot; Drag to Fit Puzzle Piece</div>

      {/* Puzzle visual: track + target slot + draggable piece */}
      <div style={{position:"relative",height:36,background:P.white,borderRadius:6,border:"1px solid #d0d8e0",overflow:"hidden",marginBottom:8}}>
        {/* Background pattern (mimics the gray puzzle backdrop in real captchas) */}
        <div style={{position:"absolute",inset:0,background:"repeating-linear-gradient(45deg, #f4f6f8 0 6px, #e9edf1 6px 12px)"}} />
        {/* Target slot (the missing-piece outline at random position) */}
        <div style={{position:"absolute",left:captcha.targetX,top:6,width:24,height:24,border:`2px dashed ${P.teal}`,borderRadius:6,background:"rgba(14,190,168,0.08)"}} />
        {/* Draggable puzzle piece */}
        <div style={{position:"absolute",left:captcha.sliderX,top:6,width:24,height:24,background:captcha.ok?P.greenD:P.teal,borderRadius:6,boxShadow:"0 2px 6px rgba(0,0,0,0.15)",pointerEvents:"none",transition:captcha.released?"left 0.15s":"none"}}>
          <svg width="24" height="24" viewBox="0 0 24 24"><path d="M8 12L11 15L16 9" stroke="#FFF" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </div>

      {/* Slider */}
      <input type="range" min="0" max="248" value={captcha.sliderX} onChange={handleChange} onMouseUp={handleMouseUp} onTouchEnd={handleMouseUp}
        style={{width:"100%",accentColor:P.teal,cursor:"grab"}} />

      {/* Status / accuracy display */}
      <div style={{fontSize:8.5,color:statusColor,marginTop:6,fontWeight:600,fontFamily:"'DM Sans',monospace"}}>{statusText}</div>

      {status === "captcha" && !captcha.ok && (
        <div style={{fontSize:8,color:P.coral,marginTop:4,fontStyle:"italic"}}>Verification incomplete. Drag the green piece to align with the dashed slot, then release.</div>
      )}
    </div>
  );
};

// ── FORM STATUS MESSAGES ──
const FormStatus = ({status, color}) => {
  if (status === "sending") return <div style={{marginTop:10,padding:"8px 12px",borderRadius:7,background:"#f0f4f8",fontSize:10,color:P.slate,textAlign:"center"}}>Sending...</div>;
  if (status === "success") return <div style={{marginTop:10,padding:"10px 14px",borderRadius:7,background:P.greenD+"12",border:`1px solid ${P.greenD}25`,fontSize:10,color:P.greenD,fontWeight:600,textAlign:"center"}}>Received. We will be in touch within 24 hours.</div>;
  if (status === "error") return <div style={{marginTop:10,padding:"10px 14px",borderRadius:7,background:P.coral+"12",border:`1px solid ${P.coral}25`,fontSize:10,color:P.coral,fontWeight:600,textAlign:"center"}}>Something went wrong. Please email info@istructgroup.com directly.</div>;
  return null;
};

export default function App(){
  const [page,setPage]=useState("home");
  const [aPhase,setAPhase]=useState("p1");
  const [pCat,setPCat]=useState("All");
  const [pReg,setPReg]=useState("All");
  const [sTab,setSTab]=useState("s1");
  const [trainingSw,setTrainingSw]=useState("");
  const [hubTile,setHubTile]=useState(null);
  const [showAll,setShowAll]=useState(false);
  const [sapOpen,setSapOpen]=useState(false);
  const [mobileNavOpen,setMobileNavOpen]=useState(false);
  const [showSearch,setShowSearch]=useState(false);
  const [searchQ,setSearchQ]=useState("");
  const [selectedProj,setSelectedProj]=useState(null);
  const [projSearchQ,setProjSearchQ]=useState("");
  const [inquiryProj,setInquiryProj]=useState(null);

  // ── Tools Box Phase 1  modular apps with dormant auth/identity scaffolding ──
  const [activeApp,setActiveApp]=useState(null);          // app object when an app modal is open
  const [appAccessKey,setAppAccessKey]=useState("");      // user-entered access key
  const [accessRequest,setAccessRequest]=useState(null);  // app object when access-request form is open
  const [toolsDisclaimerOpen,setToolsDisclaimerOpen]=useState(false); // top-of-page disclaimer expand toggle
  const [toolsDisclaimerAccepted,setToolsDisclaimerAccepted]=useState(false); // checkbox above briefing form
  const [nowTick,setNowTick]=useState(Date.now());        // 1s heartbeat so the 60 min session timer counts down live
  useEffect(()=>{ const id=setInterval(()=>setNowTick(Date.now()),1000); return ()=>clearInterval(id); },[]);
  const [toolsSession,setToolsSession]=useState({
    userId:"default_user",                                 // dormant — single-user mode for Phase 1
    accessKey:"",                                          // currently empty until user enters key
    keyValidUntil:null,                                    // ISO timestamp when the session expires
    tier:"trial",                                          // dormant — Phase 2 will set free/pro/enterprise
    entitlements:["ecios","bid"],                          // dormant — Phase 2 will gate per subscription
  });

  const filteredP = useMemo(()=>{
    let f=allProjects;
    if(pCat!=="All")f=f.filter(p=>p.c===pCat);
    if(pReg!=="All"){
      if(pReg==="Other")f=f.filter(p=>!["UAE","KSA","Qatar","Lebanon","North America"].includes(p.r));
      else f=f.filter(p=>p.r===pReg);
    }
    if(projSearchQ.trim()){
      const q=projSearchQ.toLowerCase();
      f=f.filter(p=>(p.n||"").toLowerCase().includes(q)||(p.c||"").toLowerCase().includes(q)||(p.r||"").toLowerCase().includes(q)||(p.country||"").toLowerCase().includes(q));
    }
    return f;
  },[pCat,pReg,projSearchQ]);

  const displayed = showAll?filteredP:filteredP.slice(0,20);

  const Nav=()=>(
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 18px",background:P.navy,position:"sticky",top:0,zIndex:10}}>
      <div onClick={()=>setPage("home")} {...kbd(()=>setPage("home"))} aria-label="Home" style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer"}}>
        {/* iStructural H4 v7 logo — exact paths from approved business card (FINAL_H4v7) */}
        <svg width="64" height="86" viewBox="0 -10 86 130" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <radialGradient id="navBcOcean" cx="50%" cy="35%" r="70%"><stop offset="0%" stopColor="#4AA3D9"/><stop offset="45%" stopColor="#1E5F8F"/><stop offset="85%" stopColor="#0A3556"/><stop offset="100%" stopColor="#051C2F"/></radialGradient>
            <radialGradient id="navBcAtmo" cx="50%" cy="50%" r="55%"><stop offset="80%" stopColor="#0EBEA8" stopOpacity="0"/><stop offset="92%" stopColor="#4AC8FF" stopOpacity="0.35"/><stop offset="100%" stopColor="#4AC8FF" stopOpacity="0"/></radialGradient>
            <radialGradient id="navBcTmd" cx="40%" cy="35%" r="65%"><stop offset="0%" stopColor="#F7F5F0" stopOpacity="0.85"/><stop offset="55%" stopColor="#0EBEA8" stopOpacity="0.55"/><stop offset="100%" stopColor="#0A7C6E" stopOpacity="0.85"/></radialGradient>
            <clipPath id="navBcTwr"><path d="M28 92 L28 84 L31 84 L31 76 L34 76 L34 64 C36 56 38 44 40 32 C40.5 24 41 16 42 10 L42.6 4 L42.9 2 L43.4 4 L44 10 C45 16 45.5 24 46 32 C48 44 50 56 52 64 L52 76 L55 76 L55 84 L58 84 L58 92 Z"/></clipPath>
            <clipPath id="navBcGlobe"><circle cx="58" cy="-3" r="4.55"/></clipPath>
          </defs>

          {/* Smart piling baseline rails */}
          <line x1="22" y1="92.3" x2="64" y2="92.3" stroke="#F7F5F0" strokeWidth="0.4" opacity="0.3" strokeDasharray="1.2,1"/>
          <line x1="20" y1="99" x2="66" y2="99" stroke="#F7F5F0" strokeWidth="0.2" opacity="0.12" strokeDasharray="0.5,0.7"/>
          <line x1="20" y1="106" x2="66" y2="106" stroke="#F7F5F0" strokeWidth="0.2" opacity="0.12" strokeDasharray="0.5,0.7"/>
          <rect x="32" y="92" width="22" height="1.3" fill="#0A7C6E" opacity="0.55"/>
          <line x1="32" y1="92" x2="54" y2="92" stroke="#F7F5F0" strokeWidth="0.4" opacity="0.7"/>
          <line x1="32" y1="93.3" x2="54" y2="93.3" stroke="#F7F5F0" strokeWidth="0.3" opacity="0.5"/>

          {/* 7 smart piles */}
          <rect x="32.4" y="93.3" width="1.2" height="17.4" fill="#0A7C6E" opacity="0.6"/>
          <circle cx="33" cy="111" r="0.6" fill="#0EBEA8"/>
          <rect x="36.4" y="93.3" width="1.2" height="19" fill="#0A7C6E" opacity="0.6"/>
          <circle cx="37" cy="112.6" r="0.6" fill="#0EBEA8"/>
          <rect x="40.4" y="93.3" width="1.2" height="20" fill="#0A7C6E" opacity="0.7"/>
          <circle cx="41" cy="113.5" r="0.7" fill="#0EBEA8"/>
          <rect x="42.4" y="93.3" width="1.2" height="20.4" fill="#0A7C6E" opacity="0.78"/>
          <line x1="43" y1="93.3" x2="43" y2="113.7" stroke="#0EBEA8" strokeWidth="0.4" opacity="0.7"/>
          <circle cx="43" cy="114" r="0.9" fill="#0EBEA8"/>
          <circle cx="43" cy="114" r="1.6" fill="none" stroke="#0EBEA8" strokeWidth="0.25" opacity="0.55"/>
          <rect x="44.4" y="93.3" width="1.2" height="20" fill="#0A7C6E" opacity="0.7"/>
          <circle cx="45" cy="113.5" r="0.7" fill="#0EBEA8"/>
          <rect x="48.4" y="93.3" width="1.2" height="19" fill="#0A7C6E" opacity="0.6"/>
          <circle cx="49" cy="112.6" r="0.6" fill="#0EBEA8"/>
          <rect x="52.4" y="93.3" width="1.2" height="17.4" fill="#0A7C6E" opacity="0.6"/>
          <circle cx="53" cy="111" r="0.6" fill="#0EBEA8"/>

          {/* EARTH globe (upper right) */}
          <circle cx="58" cy="-3" r="5.85" fill="url(#navBcAtmo)" opacity="0.85"/>
          <circle cx="58" cy="-3" r="4.55" fill="url(#navBcOcean)"/>
          <g clipPath="url(#navBcGlobe)">
            <path d="M54.2 -5.9 Q55.0 -6.6 55.9 -6.5 Q56.6 -6.3 56.7 -5.7 Q56.3 -4.6 55.2 -4.4 Q54.1 -5.6 54.2 -5.9 Z" fill="#3E9B5F" opacity="0.92"/>
            <path d="M58.4 -4.6 Q59.3 -4.9 59.9 -4.4 Q60.5 -3.4 60.2 -2.3 Q59.2 -1.4 58.3 -1.3 Q57.7 -2.9 58.2 -4.4 Z" fill="#3E9B5F" opacity="0.92"/>
          </g>
          <circle cx="58" cy="-3" r="4.55" fill="none" stroke="#F7F5F0" strokeWidth="0.85" opacity="0.85"/>

          {/* Bridge deck */}
          <line x1="0" y1="90" x2="86" y2="90" stroke="#F7F5F0" strokeWidth="0.9" opacity="0.55"/>
          <line x1="0" y1="91.6" x2="86" y2="91.6" stroke="#F7F5F0" strokeWidth="0.55" opacity="0.4"/>
          <line x1="0" y1="95" x2="86" y2="95" stroke="#F7F5F0" strokeWidth="0.5" opacity="0.3"/>

          {/* Cable stays */}
          <line x1="43" y1="44" x2="4" y2="88" stroke="#0EBEA8" strokeWidth="0.45" opacity="0.6"/>
          <line x1="43" y1="48" x2="14" y2="88" stroke="#0EBEA8" strokeWidth="0.45" opacity="0.5"/>
          <line x1="43" y1="44" x2="82" y2="88" stroke="#0EBEA8" strokeWidth="0.45" opacity="0.6"/>
          <line x1="43" y1="48" x2="72" y2="88" stroke="#0EBEA8" strokeWidth="0.45" opacity="0.5"/>

          {/* H4 v7 hybrid silhouette (dashed outline) */}
          <path d="M28 92 L28 84 L31 84 L31 76 L34 76 L34 64 C36 56 38 44 40 32 C40.5 24 41 16 42 10 L42.6 4 L42.9 2 L43.4 4 L44 10 C45 16 45.5 24 46 32 C48 44 50 56 52 64 L52 76 L55 76 L55 84 L58 84 L58 92 Z"
                fill="#0C1B2E" fillOpacity="0.55" stroke="#F7F5F0" strokeWidth="1.0" strokeDasharray="1.5,0.8"/>

          {/* B1 left buttress */}
          <path d="M40.5 92 L41.8 22 L40.6 32 C38.5 44 36.5 56 34.5 64 L34.5 76 L31.5 76 L31.5 84 L28.7 84 L28.7 92 Z"
                fill="#0A7C6E" fillOpacity="0.28" stroke="#0EBEA8" strokeWidth="0.35"/>

          {/* B2 right buttress */}
          <path d="M45.5 92 L44.2 22 L45.4 32 C47.5 44 49.5 56 51.5 64 L51.5 76 L54.5 76 L54.5 84 L57.3 84 L57.3 92 Z"
                fill="#0A7C6E" fillOpacity="0.28" stroke="#0EBEA8" strokeWidth="0.35"/>

          {/* Core (tapered, top y=22) */}
          <path d="M40.5 92 L41.8 22 L44.2 22 L45.5 92 Z"
                fill="#0EBEA8" fillOpacity="0.32" stroke="#0EBEA8" strokeWidth="0.4"/>

          {/* Setback floor lines (Burj DNA) */}
          <g stroke="#F7F5F0" strokeWidth="0.18" opacity="0.32">
            <line x1="28" y1="84" x2="58" y2="84"/>
            <line x1="31" y1="76" x2="55" y2="76"/>
            <line x1="34" y1="64" x2="52" y2="64"/>
          </g>

          {/* Mid AI horizontal zigzag */}
          <g clipPath="url(#navBcTwr)">
            <rect x="40" y="29.5" width="6" height="5" fill="#0A7C6E" fillOpacity="0.18"/>
            <path d="M40.5 33 L41.5 30.5 L42.5 33 L43 30 L43.5 33 L44.5 30.5 L45.5 33"
                  fill="none" stroke="#0EBEA8" strokeWidth="0.85" strokeLinecap="round" opacity="0.95"/>
            <circle cx="43" cy="32" r="0.55" fill="#F7F5F0"/>
          </g>

          {/* Smart TMD */}
          <g clipPath="url(#navBcTwr)">
            <rect x="41.4" y="14" width="3.2" height="6" fill="#0A7C6E" fillOpacity="0.10" stroke="#0EBEA8" strokeWidth="0.18" opacity="0.5" strokeDasharray="0.5,0.4"/>
            <circle cx="43" cy="17.6" r="1.15" fill="url(#navBcTmd)" opacity="0.9"/>
            <circle cx="43" cy="17.6" r="1.15" fill="none" stroke="#0EBEA8" strokeWidth="0.25" opacity="0.8"/>
            <circle cx="43" cy="17.6" r="1.7" fill="none" stroke="#0EBEA8" strokeWidth="0.18" opacity="0.55"/>
            <line x1="43" y1="17.6" x2="41.6" y2="19.5" stroke="#0EBEA8" strokeWidth="0.3" opacity="0.7"/>
            <line x1="43" y1="17.6" x2="44.4" y2="19.5" stroke="#0EBEA8" strokeWidth="0.3" opacity="0.7"/>
            <circle cx="41.4" cy="15.0" r="0.18" fill="#0EBEA8"/>
            <circle cx="41.4" cy="17.0" r="0.18" fill="#0EBEA8"/>
            <circle cx="41.4" cy="19.0" r="0.18" fill="#0EBEA8"/>
            <circle cx="44.6" cy="15.0" r="0.18" fill="#0EBEA8"/>
            <circle cx="44.6" cy="17.0" r="0.18" fill="#0EBEA8"/>
            <circle cx="44.6" cy="19.0" r="0.18" fill="#0EBEA8"/>
          </g>

          {/* Crown AI band */}
          <g clipPath="url(#navBcTwr)">
            <rect x="41.5" y="10" width="3" height="3.5" fill="#0A7C6E" fillOpacity="0.18"/>
            <path d="M41.7 12.5 L42.4 11 L43 12.5 L43.6 11 L44.3 12.5"
                  fill="none" stroke="#0EBEA8" strokeWidth="0.5" strokeLinecap="round" opacity="0.95"/>
            <circle cx="42.4" cy="11" r="0.4" fill="#0EBEA8"/>
            <circle cx="43.6" cy="11" r="0.4" fill="#0EBEA8"/>
          </g>

          {/* Spire beacon */}
          <circle cx="43" cy="2" r="0.7" fill="#0EBEA8"/>
          <circle cx="43" cy="2" r="1.3" fill="none" stroke="#0EBEA8" strokeWidth="0.2" opacity="0.55"/>
        </svg>
        <div>
          <div style={{fontSize:12.5,fontWeight:700,color:P.white,lineHeight:1.1}}>iStructural Group Inc.</div>
          <div style={{fontSize:7,color:"#6A8CA8",letterSpacing:1.5,textTransform:"uppercase"}}>Structural Solutions | Management | AI</div>
        </div>
      </div>
      {/* Desktop nav tabs (≥720px) */}
      <div className="nav-desktop" style={{display:"flex",alignItems:"center",gap:2}}>
        {[{id:"home",l:"Home"},{id:"s1",l:"Management"},{id:"s2",l:"Design"},{id:"s3",l:"AI & Technology"},{id:"hub",l:"Knowledge Hub"},{id:"tools",l:"Tools Box"},{id:"projects",l:"Projects"},{id:"training",l:"Training"},{id:"contact",l:"Contact"}].map(n=>
          <div key={n.id} onClick={()=>setPage(n.id)} {...kbd(()=>setPage(n.id))} aria-label={`Go to ${n.l}`} aria-current={page===n.id?"page":undefined} style={{padding:"4px 8px",borderRadius:6,fontSize:9.5,fontWeight:600,cursor:"pointer",color:page===n.id?P.tealL:"#8BA0B5",background:page===n.id?P.teal+"20":"transparent"}}>{n.l}</div>
        )}
        {/* Search icon */}
        <div onClick={()=>setShowSearch(true)} {...kbd(()=>setShowSearch(true))} aria-label="Search the site" title="Search resources and projects" style={{marginLeft:6,width:28,height:28,borderRadius:7,background:"transparent",border:`1px solid ${P.tealL}40`,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={P.tealL} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
        </div>
        <div onClick={()=>setPage("start")} {...kbd(()=>setPage("start"))} aria-label="Start a Project" style={{marginLeft:4,background:P.teal,color:P.white,padding:"5px 11px",borderRadius:7,fontSize:9.5,fontWeight:700,cursor:"pointer"}}>Start a Project</div>
      </div>

      {/* Mobile nav controls (<720px) */}
      <div className="nav-mobile" style={{display:"none",alignItems:"center",gap:8}}>
        <div onClick={()=>setShowSearch(true)} {...kbd(()=>setShowSearch(true))} aria-label="Search the site" style={{width:32,height:32,borderRadius:7,border:`1px solid ${P.tealL}40`,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={P.tealL} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
        </div>
        <div onClick={()=>setMobileNavOpen(true)} {...kbd(()=>setMobileNavOpen(true))} aria-label="Open menu" aria-expanded={mobileNavOpen} style={{width:32,height:32,borderRadius:7,background:P.teal,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={P.white} strokeWidth="2.6" strokeLinecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
        </div>
      </div>
    </div>
  );

  const Footer=()=>(
    <div style={{background:P.navy,padding:"18px 22px 12px",marginTop:24}}>
      <div style={{display:"grid",gridTemplateColumns:"1.2fr 1fr 1fr 1fr 0.8fr",gap:16,marginBottom:12}}>
        <div>
          <div style={{fontSize:10,fontWeight:700,color:P.white,marginBottom:4}}>iStructural Group Inc.</div>
          <div style={{fontSize:8,color:"#6A8CA8",lineHeight:1.6}}>Since 2010. Advanced structural engineering, business strategy, and AI-powered assessment. Canada.</div>
        </div>
        {[{t:"Management",i:["Project Management","Business Strategy","Risk & Financial","Value Engineering"]},
          {t:"Design",i:["Structural Design","PT Concrete","Seismic & Wind","Third-Party Review","Training"]},
          {t:"AI & Technology",i:["AI Literacy & Readiness","Implementation Support","Start a Project"]},
          {t:"Resources",i:["Knowledge Hub","Projects","Gallery","Contact"]},
        ].map(c=><div key={c.t}><div style={{fontSize:9,fontWeight:700,color:P.tealL,marginBottom:5}}>{c.t}</div>{c.i.map(x=><div key={x} style={{fontSize:8,color:"#7A96AE",padding:"1px 0",cursor:"pointer"}}>{x}</div>)}</div>)}
      </div>
      <div style={{borderTop:"1px solid #1E3A55",paddingTop:8,display:"flex",justifyContent:"space-between",fontSize:7.5,color:"#5A7A95"}}>
        <span>iStructural Group Inc. | istructgroup.com | Canada | info@istructgroup.com</span>
        <span>Copyright 2026 iStructural Group Inc. All rights reserved.</span>
      </div>
    </div>
  );

  const HeroBg=({children,color1,color2})=>(
    <div style={{position:"relative",overflow:"hidden"}}>
      {/* IMAGE SLOT: Replace the URL below with your own hero image */}
      <div style={{position:"absolute",inset:0,backgroundImage:"url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=60')",backgroundSize:"cover",backgroundPosition:"center",opacity:0.15}} />
      <div style={{position:"absolute",inset:0,background:`linear-gradient(160deg, ${color1} 0%, ${color2||color1}CC 60%, ${color1}EE 100%)`}} />
      <div style={{position:"relative",zIndex:1}}>{children}</div>
    </div>
  );

  // ══════════════════════ HOME ══════════════════════
  const HomePage=()=>(
    <div>
      <HeroBg color1={P.navy} color2={P.navyM}>
        <div style={{padding:"44px 28px 40px",maxWidth:560}}>
          <div style={{fontSize:9,fontWeight:700,letterSpacing:3,color:P.tealL,textTransform:"uppercase",marginBottom:10}}>Since 2010 | Structural Solutions | Management | AI Assessment</div>
          <h1 style={{fontFamily:"'Fraunces',serif",fontSize:32,fontWeight:800,color:P.white,lineHeight:1.15,margin:0}}>Engineering intelligence<br/>for the built world</h1>
          <p style={{fontSize:12,color:"#9BBCD6",lineHeight:1.7,marginTop:12,maxWidth:500}}>iStructural Group Inc. has championed advanced structural engineering for complex and unconventional projects for over two decades. Hybrid structural systems, structural forensics, seismic and wind engineering, and finite element modeling | now powered by AI-driven assessment and next-generation digital tools.</p>
          <div style={{display:"flex",gap:8,marginTop:18}}>
            <div onClick={()=>setPage("s1")} {...kbd(()=>setPage("s1"))} aria-label="Open Management page" style={{background:P.s1,color:P.white,padding:"9px 20px",borderRadius:8,fontSize:11,fontWeight:700,cursor:"pointer"}}>Management</div>
            <div onClick={()=>setPage("s2")} {...kbd(()=>setPage("s2"))} aria-label="Open Design and Consultancy page" style={{background:P.s2,color:P.white,padding:"9px 20px",borderRadius:8,fontSize:11,fontWeight:700,cursor:"pointer"}}>Design & Consultancy</div>
            <div onClick={()=>setPage("s3")} {...kbd(()=>setPage("s3"))} aria-label="Open AI and Technology page" style={{background:P.teal,color:P.white,padding:"9px 20px",borderRadius:8,fontSize:11,fontWeight:700,cursor:"pointer"}}>AI & Technology</div>
          </div>
        </div>
      </HeroBg>

      {/* 3 EQUAL PILLARS */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:0}}>
        {[
          {key:"s1",title:"Management & Business Support",color:P.s1,bg:P.s1L,tag:"Strategy that builds before construction begins",
           items:["Project & Construction Management","Business Strategy & Growth","Risk & Financial Management","Value Engineering (V.E.)","ROI & Investment Analysis"]},
          {key:"s2",title:"Design Services & Consultancy",color:P.s2,bg:P.s2L,tag:"Engineering precision for structures that endure",
           items:["Seismic and Wind Engineering","Third-Party Review and Verification","Training (CSi Licensed)"]},
          {key:"s3",title:"AI & Technology Services",color:P.s3,bg:P.s3L,tag:"From AI literacy to stamped engineering drawings",
           items:["AI Literacy and Organizational Readiness (AI 101)","Tool Integration and Process Automation","AI Readiness Assessment","Knowledge Hub (free resources for all)","Cross-link: Structural Assessment Platform under Design"]},
        ].map((s,i)=>(
          <div key={s.key} onClick={()=>setPage(s.key)} {...kbd(()=>setPage(s.key))} aria-label={`Open ${s.title}`} style={{padding:"24px 20px 20px",cursor:"pointer",background:P.white,borderRight:i<2?"1px solid #E8E8E8":"none",borderBottom:"3px solid transparent",transition:"all 0.25s"}}
            onMouseEnter={e=>{e.currentTarget.style.background=s.bg;e.currentTarget.style.borderBottom=`3px solid ${s.color}`;}}
            onMouseLeave={e=>{e.currentTarget.style.background=P.white;e.currentTarget.style.borderBottom="3px solid transparent";}}>
            <div style={{fontSize:13,fontWeight:700,color:s.color,marginTop:0}}>{s.title}</div>
            <div style={{fontSize:10,color:P.warm,fontStyle:"italic",marginTop:3,fontFamily:"'Fraunces',serif"}}>{s.tag}</div>
            <div style={{marginTop:10}}>{s.items.map((it,j)=><div key={j} style={{fontSize:9.5,color:P.charcoal,padding:"2px 0",display:"flex",gap:5}}><span style={{color:s.color,fontWeight:800,fontSize:8}}>+</span>{it}</div>)}</div>
            <div style={{fontSize:10,fontWeight:700,color:s.color,marginTop:12}}>Explore services &#8594;</div>
          </div>
        ))}
      </div>

      {/* DAMAGE SUB-MARKETS */}
      <div style={{background:P.sand,padding:"22px 24px"}}>
        <div style={{fontSize:9,fontWeight:700,letterSpacing:2,color:P.slate,textTransform:"uppercase",marginBottom:10}}>Three damage assessment sub-markets</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
          {[{t:"Post-natural disaster",c:P.coral},
            {t:"Post-conflict / war zones",c:P.redD},
            {t:"Heritage and aging assets",c:P.s2}].map((m,i)=>
            <div key={i} style={{padding:"14px 16px",borderRadius:10,background:P.white,border:`1px solid ${m.c}15`}}>
              <div style={{fontSize:10,fontWeight:700,color:m.c,textTransform:"uppercase",letterSpacing:1.6}}>{m.t}</div>
            </div>
          )}
        </div>
      </div>

      <div onClick={()=>setPage("hub")} {...kbd(()=>setPage("hub"))} aria-label="Open Knowledge Hub" style={{padding:"16px 24px",background:P.greenD+"08",borderTop:`1px solid ${P.greenD}15`,display:"flex",alignItems:"center",justifyContent:"space-between",cursor:"pointer"}}>
        <div>
          <div style={{fontSize:11,fontWeight:700,color:P.greenD}}>Knowledge Hub | Free for every engineer, architect, safety officer, and developers</div>
          <div style={{fontSize:9,color:P.slate,marginTop:2}}>Forms, crack library, calculators, software directory, standards, management templates</div>
        </div>
        <div style={{background:P.greenD,color:P.white,padding:"6px 14px",borderRadius:8,fontSize:10,fontWeight:700,whiteSpace:"nowrap"}}>Browse &#8594;</div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:0,background:P.navy}}>
        {[{v:"2010",l:"Founded"}].map((s,i)=>
          <div key={i} style={{padding:"14px 10px",textAlign:"center",borderRight:i<4?"1px solid #1E3A55":"none"}}>
            <div style={{fontSize:18,fontWeight:800,color:P.tealL,fontFamily:"'Fraunces',serif"}}>{s.v}</div>
            <div style={{fontSize:8,color:"#7A96AE",marginTop:2}}>{s.l}</div>
          </div>
        )}
      </div>
    </div>
  );

  // ══════════════════════ S1 ══════════════════════
  const S1Page=()=>(
    <div>
      <HeroBg color1={P.s1}><div style={{padding:"32px 28px 28px"}}>
        <div style={{fontSize:9,fontWeight:700,letterSpacing:3,color:P.white+"80",textTransform:"uppercase"}}>Service 01</div>
        <h2 style={{fontFamily:"'Fraunces',serif",fontSize:24,fontWeight:800,color:P.white,margin:"6px 0 0"}}>Management & Business Support</h2>
        <p style={{fontSize:11,color:P.white+"BB",marginTop:6,maxWidth:460,lineHeight:1.6}}>Strategic project management, business growth advisory, financial risk strategies, and value engineering. Aligning with new standards and surpassing client expectations.</p>
      </div></HeroBg>
      <div style={{padding:"18px 24px"}}>
        {[{n:"Project & Construction Management",d:"Full lifecycle oversight. Budget control, schedule optimization, multi-stakeholder coordination across government, healthcare, education, industrial, hospitality."},
          {n:"Business Strategy & Growth",d:"Market entry analysis, organizational structuring, partnership frameworks. Single collaborative environment for architects, engineers, builders, clients, owners."},
          {n:"Risk & Financial Management",d:"Quantitative risk modeling, cost-benefit analysis, insurance and bonding advisory. Data-driven resilient financial strategies."},
          {n:"Value Engineering (V.E.)",d:"Systematic function analysis. Creative V.E. solutions with remarkable ROI. Applied to high-rise, bridges, irregular structures."},
          {n:"ROI & Investment Analysis",d:"Lifecycle cost analysis, capital allocation. LEED certification pathway support."}
        ].map((o,i)=><div key={i} style={{display:"grid",gridTemplateColumns:"180px 1fr",gap:14,padding:"12px 14px",borderRadius:8,background:i%2===0?P.s1L:"transparent",border:`1px solid ${P.s1}10`,marginBottom:5}}>
          <div style={{fontSize:11,fontWeight:700,color:P.s1}}>{o.n}</div><div style={{fontSize:10,color:P.slate,lineHeight:1.6}}>{o.d}</div></div>)}
        <div onClick={()=>{setPage("start");setSTab("s1");}} {...kbd(()=>{setPage("start");setSTab("s1");})} aria-label="Start a Management Inquiry" style={{marginTop:14,background:P.s1,color:P.white,padding:"9px 20px",borderRadius:8,fontSize:11,fontWeight:700,cursor:"pointer",display:"inline-block"}}>Start a Management Inquiry &#8594;</div>
      </div>
    </div>
  );

  // ══════════════════════ S2 ══════════════════════
  const S2Page=()=>(
    <div>
      <HeroBg color1={P.s2}><div style={{padding:"32px 28px 28px"}}>
        <div style={{fontSize:9,fontWeight:700,letterSpacing:3,color:P.white+"80",textTransform:"uppercase"}}>Service 02</div>
        <h2 style={{fontFamily:"'Fraunces',serif",fontSize:24,fontWeight:800,color:P.white,margin:"6px 0 0"}}>Design Services & Consultancy</h2>
        <p style={{fontSize:11,color:P.white+"BB",marginTop:6,maxWidth:480,lineHeight:1.6}}>Performance-based seismic design for super-tall structures exceeding 200m. Advanced nonlinear applications. CSi certified training programs.</p>
      </div></HeroBg>
      <div style={{padding:"18px 24px"}}>
        {[{n:"Seismic and Wind Engineering",d:"ASCE 41, NBC, Eurocode 8. Dynamic response, base isolation, damper design. Wind tunnel correlation. Tall and supertall structures."},
        ].map((o,i)=><div key={i} style={{display:"grid",gridTemplateColumns:"180px 1fr",gap:14,padding:"12px 14px",borderRadius:8,background:i%2===0?P.s2L:"transparent",border:`1px solid ${P.s2}10`,marginBottom:5}}>
          <div style={{fontSize:11,fontWeight:700,color:P.s2}}>{o.n}</div><div style={{fontSize:10,color:P.slate,lineHeight:1.6}}>{o.d}</div></div>)}
        <div style={{fontSize:10,fontWeight:700,color:P.s2,letterSpacing:1,textTransform:"uppercase",marginTop:16,marginBottom:8}}>Third-Party Consultancy</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
          {[{t:"High-Rise",i:["Lateral stability","Shortening vertical elements","Human response"]},
            {t:"Bridges",i:["Alternative concepts (V.E.)","Design details + verification","Stage modelling"]},
            {t:"Irregular",i:["Rotated/twisted buildings","Vibration analysis","Thermal design","Long spans","Transfer structures"]},
          ].map((c,i)=>(
            <div key={i} style={{padding:"10px 12px",borderRadius:8,background:P.s2L,border:`1px solid ${P.s2}15`}}>
              <div style={{fontSize:10,fontWeight:700,color:P.s2,marginBottom:4}}>{c.t}</div>
              {c.i.map((x,j)=><div key={j} style={{fontSize:9,color:P.slate,padding:"1px 0"}}>+ {x}</div>)}
            </div>
          ))}

          {/* 4th CARD: STRUCTURAL ASSESSMENT PLATFORM (consistent outer frame, distinction lives INSIDE) */}
          <div onClick={()=>setSapOpen(!sapOpen)} {...kbd(()=>setSapOpen(!sapOpen))} aria-expanded={sapOpen} aria-label="Toggle Structural Assessment Platform details"
               style={{padding:"10px 12px",borderRadius:8,background:P.s2L,border:`1px solid ${P.s2}15`,cursor:"pointer",transition:"all 0.2s"}}>

            {/* Title - same size/weight as other 3 cards */}
            <div style={{fontSize:10,fontWeight:700,color:P.s2,marginBottom:6}}>Structural Assessment Platform</div>

            {/* 3 softened pastel chips inside (internal distinction without alarming colors) */}
            <div style={{display:"flex",gap:3,flexWrap:"wrap",marginBottom:6}}>
              <span style={{fontSize:7.5,fontWeight:700,padding:"2px 6px",borderRadius:4,background:P.s3+"20",color:P.s3,letterSpacing:0.2,border:`1px solid ${P.s3}40`}}>Phase 1</span>
              <span style={{fontSize:7.5,fontWeight:700,padding:"2px 6px",borderRadius:4,background:P.s2+"20",color:P.s2,letterSpacing:0.2,border:`1px solid ${P.s2}40`}}>Phase 2</span>
              <span style={{fontSize:7.5,fontWeight:700,padding:"2px 6px",borderRadius:4,background:P.s3+"10",color:P.s3,border:`1px dashed ${P.s3}60`,letterSpacing:0.2}}>Conditional Escalation</span>
            </div>

            {/* Compact button at bottom */}
            <div style={{marginTop:4,padding:"5px 10px",background:P.s2,color:P.white,borderRadius:5,fontSize:8.5,fontWeight:700,textAlign:"center",letterSpacing:0.3}}>
              {sapOpen ? "▾ Hide Full Phases and Escalation" : "▸ View Full Phases and Escalation"}
            </div>
          </div>
        </div>

        {/* ═══ STRUCTURAL ASSESSMENT PLATFORM EXPANDED PANEL (toggled by 4th card) ═══ */}
        {sapOpen && (
          <div style={{marginTop:14,padding:"18px 20px",borderRadius:12,background:P.s2L,border:`1px solid ${P.s2}25`}}>
            <div style={{fontSize:10,fontWeight:700,color:P.s2,letterSpacing:1,textTransform:"uppercase",marginBottom:6}}>Structural Assessment Platform</div>
            <div style={{fontSize:11,color:P.slate,fontStyle:"italic",fontFamily:"'Fraunces',serif",marginBottom:10}}>AI-Augmented when needed</div>
            <div style={{fontSize:10.5,color:P.slate,lineHeight:1.6,marginBottom:12}}>Two-phase structural assessment platform: from preliminary advisory through full stamped engineering with finite element modeling, repair drawings, and authority submission. AI Deep Inspection available as a conditional escalation on engineer's decision.</div>

            {/* Phase tabs */}
            <div style={{display:"flex",gap:5,marginBottom:12}}>
              {phases.map(p=><div key={p.id} onClick={()=>setAPhase(p.id)} {...kbd(()=>setAPhase(p.id))} role="tab" aria-selected={aPhase===p.id} aria-label={`${p.label}: ${p.title}`} style={{padding:"6px 12px",borderRadius:7,fontSize:10,fontWeight:700,cursor:"pointer",background:aPhase===p.id?p.color:"transparent",color:aPhase===p.id?P.white:P.slate,border:`1px solid ${aPhase===p.id?p.color:"#ccc"}`,transition:"all 0.2s"}}>{p.label}: {p.title}</div>)}
            </div>

            {/* Active phase content */}
            {phases.filter(p=>p.id===aPhase).map(p=>
              <div key={p.id}>
                <div style={{fontSize:10,color:P.slate,marginBottom:8}}>{[p.price,p.liability].filter(Boolean).join(" | ")}</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4}}>
                  {p.items.map((it,i)=><div key={i} style={{fontSize:10,color:P.charcoal,padding:"4px 8px",borderRadius:5,background:P.white,border:"1px solid #eee",display:"flex",gap:4}}><span style={{color:p.color,fontWeight:800,fontSize:8,marginTop:2}}>+</span>{it}</div>)}
                </div>
              </div>
            )}

            {/* Conditional Escalation callout */}
            <div style={{marginTop:14,padding:"12px 14px",borderRadius:8,background:P.s3L,borderLeft:`3px dashed ${P.s3}`}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6,flexWrap:"wrap"}}>
                <span style={{fontSize:8,fontWeight:700,letterSpacing:1.4,color:P.white,background:P.s3,padding:"2px 8px",borderRadius:10,textTransform:"uppercase"}}>Conditional Escalation</span>
                <span style={{fontSize:11,fontWeight:700,color:P.s3,fontFamily:"'Fraunces',serif"}}>{aiDeepInspection.title}</span>
              </div>
              <div style={{fontSize:9.5,color:P.slate,marginBottom:8,fontStyle:"italic"}}>{aiDeepInspection.subtitle}. {aiDeepInspection.liability}.</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4,marginBottom:10}}>
                {aiDeepInspection.items.map((it,i)=><div key={i} style={{fontSize:9.5,color:P.charcoal,padding:"4px 8px",borderRadius:5,background:P.white,border:"1px solid #eee",display:"flex",gap:4}}><span style={{color:P.s3,fontWeight:800,fontSize:8,marginTop:2}}>+</span>{it}</div>)}
              </div>

              {/* Allied Specialist Partnerships disclaimer */}
              <div style={{marginTop:10,padding:"10px 12px",borderRadius:6,background:P.white,borderLeft:`2px dashed ${P.s3}`}}>
                <div style={{fontSize:8,fontWeight:700,letterSpacing:1.6,color:P.s3,textTransform:"uppercase",marginBottom:5}}>Allied Specialist Partnerships</div>
                <div style={{fontSize:9,color:P.charcoal,lineHeight:1.65}}>AI Deep Inspection is delivered in coordination with iStructural's curated network of allied specialist partners. Onboarded specialists handle on-site data capture (LiDAR, drone, thermal, GPR) and dedicated AI processing pipelines. iStructural Group Inc. coordinates the engagement, validates partner outputs, and bridges the inspection deliverables to Phase 2 stamped engineering when required.</div>
                <div style={{fontSize:8,color:P.slate,lineHeight:1.6,marginTop:5,fontStyle:"italic"}}>Partner selection is project-specific, based on asset type, location, and required deliverables. Specific partner pairings are discussed under NDA per engagement.</div>
              </div>
            </div>
          </div>
        )}

        <div onClick={()=>{setPage("start");setSTab("s2");}} {...kbd(()=>{setPage("start");setSTab("s2");})} aria-label="Start a Design Inquiry" style={{marginTop:14,background:P.s2,color:P.white,padding:"9px 20px",borderRadius:8,fontSize:11,fontWeight:700,cursor:"pointer",display:"inline-block"}}>Start a Design Inquiry &#8594;</div>
      </div>
    </div>
  );

  // ══════════════════════ S3 ══════════════════════
  const S3Page=()=>(
    <div>
      <HeroBg color1={P.s3}><div style={{padding:"32px 28px 28px"}}>
        <div style={{fontSize:9,fontWeight:700,letterSpacing:3,color:P.white+"80",textTransform:"uppercase"}}>Service 03</div>
        <h2 style={{fontFamily:"'Fraunces',serif",fontSize:24,fontWeight:800,color:P.white,margin:"6px 0 0"}}>AI & Technology Services</h2>
        <p style={{fontSize:11,color:P.white+"BB",marginTop:6,maxWidth:500,lineHeight:1.6}}>AI Literacy and Organizational Readiness for any industry. For AI-Augmented structural assessment, see Design Services & Consultancy.</p>
      </div></HeroBg>

      <div style={{padding:"20px 24px 0"}}>
        <div style={{padding:"18px 20px",borderRadius:12,background:P.s3bL,border:`1px solid ${P.s3b}20`,marginBottom:16}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
            <div style={{fontSize:14,fontWeight:800,color:P.s3b,fontFamily:"'Fraunces',serif"}}>AI Literacy & Organizational Readiness</div>
          </div>
          <div style={{fontSize:10.5,color:P.slate,lineHeight:1.6,marginBottom:12}}>Eradicating AI illiteracy across your organization. From AI 101 fundamentals through readiness assessment to hands-on tool integration | tailored to your industry, your team, and your workflows.</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
            {[{n:"AI 101 | Foundations",d:"What AI is, what it is not, how it works, where it applies. Tailored workshops for leadership, engineers, operations, and support teams. No technical background required."},
              {n:"AI Readiness Assessment",d:"Evaluate your organization's AI maturity. Identify high-impact automation opportunities. Gap analysis: data, skills, infrastructure, culture. Actionable roadmap delivered."},
              {n:"Tool Selection & Integration",d:"Identify the right AI tools for your specific tasks: document processing, quality control, scheduling, reporting, communication. Vendor-neutral recommendations. Integration planning."},
              {n:"Implementation Support",d:"Hands-on support deploying selected AI tools into existing workflows. Staff training. Process redesign. Performance monitoring. Ongoing advisory retainer available."},
            ].map((o,i)=><div key={i} style={{padding:"10px 12px",borderRadius:8,background:P.white,border:"1px solid #e0e8f0"}}>
              <div style={{fontSize:10.5,fontWeight:700,color:P.s3b}}>{o.n}</div>
              <div style={{fontSize:9,color:P.slate,marginTop:3,lineHeight:1.5}}>{o.d}</div>
            </div>)}
          </div>
        </div>
      </div>

      {/* Cross-reference: Structural Assessment Platform moved to Design page */}
      <div style={{padding:"0 24px"}}>
        <div onClick={()=>setPage("s2")} {...kbd(()=>setPage("s2"))} aria-label="Go to Design page for Structural Assessment Platform" style={{padding:"14px 18px",borderRadius:10,background:P.s2L,border:`1px dashed ${P.s2}40`,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between",gap:12}}>
          <div>
            <div style={{fontSize:9,fontWeight:700,letterSpacing:1.6,color:P.s2,textTransform:"uppercase",marginBottom:4}}>Looking for Structural Assessment?</div>
            <div style={{fontSize:11,color:P.charcoal,lineHeight:1.5}}>The AI-Augmented Structural Assessment Platform is now part of Design Services. See <strong style={{color:P.s2}}>Design &gt; Structural Assessment Platform</strong> for Phase 1 (Preliminary Advisory), Phase 2 (Stamped Engineering), and optional AI Deep Inspection escalation.</div>
          </div>
          <div style={{fontSize:11,fontWeight:700,color:P.white,background:P.s2,padding:"7px 14px",borderRadius:7,whiteSpace:"nowrap"}}>Go to Design &#8594;</div>
        </div>
        <div onClick={()=>{setPage("start");setSTab("s3");}} {...kbd(()=>{setPage("start");setSTab("s3");})} aria-label="Start an AI Literacy Inquiry" style={{marginTop:14,background:P.s3,color:P.white,padding:"9px 20px",borderRadius:8,fontSize:11,fontWeight:700,cursor:"pointer",display:"inline-block"}}>Start an AI Literacy Inquiry &#8594;</div>
      </div>

    </div>
  );

  // ══════════════════════ KNOWLEDGE HUB ══════════════════════
  const HubPage=()=>(
    <div>
      <HeroBg color1={P.greenD}><div style={{padding:"32px 28px 28px"}}>
        <div style={{fontSize:9,fontWeight:700,letterSpacing:3,color:P.white+"80",textTransform:"uppercase"}}>Free for everyone</div>
        <h2 style={{fontFamily:"'Fraunces',serif",fontSize:24,fontWeight:800,color:P.white,margin:"6px 0 0"}}>Knowledge Hub</h2>
        <p style={{fontSize:11,color:P.white+"BB",marginTop:6,maxWidth:460,lineHeight:1.6}}>The most comprehensive free structural, engineering, and management resource online. For engineers, architects, students, safety officers, clients, and government officials.</p>
      </div></HeroBg>

      {/* ═══ KNOWLEDGE HUB CATEGORY TILES (3 BANDS) ═══ */}
      {(() => {
        const allTiles = {
          forms:   {id:"forms",n:"Free Inspection Forms",d:"Safety pre-check, site ID, Phase 1 field form, post-disaster rapid.",s:"AI Platform",c:P.s3},
          crack:   {id:"crack",n:"Crack & Damage Library",d:"Visual guide: crack types, spalling, delamination. Severity ratings.",s:"AI + Design",c:P.s3},
          pm:      {id:"pm",n:"PM Templates & Frameworks",d:"RFP templates, scope of work, risk registers, milestone tracking.",s:"Management",c:P.s1},
          ve:      {id:"ve",n:"V.E. & ROI Tools",d:"Value engineering templates, cost-benefit calculators, LEED guides.",s:"Management",c:P.s1},
          calc:    {id:"calc",n:"Structural Calculators",d:"Beam deflection, buckling, seismic base shear, wind load. Browser-based.",s:"Design",c:P.s2},
          trial:   {id:"trial",n:"Trial Software",d:"Commercial trial downloads from leading vendors. 10 to 30-day trials.",s:"Design + Training",c:P.s2},
          budget:  {id:"budget",n:"Budget-Friendly Software",d:"Free, open-source, and low-cost alternatives for students and small practices.",s:"All Services",c:P.greenD},
          std:     {id:"std",n:"International Standards",d:"ACI, AASHTO, IBC, FEMA, CSA, NBC, Eurocode. Plus ASCE, ICOMOS, ISO references.",s:"All Services",c:P.greenD},
          cert:    {id:"cert",n:"Training & Certification Links",d:"PMI, ICC, ACI, AASHTO, FEMA, CSA, ICOMOS, Eurocode certs and university programs. CPD-aligned.",s:"All Services",c:P.greenD},
        };
        const bands = [
          {key:"docs", code:"DOC", title:"Documents, Forms and Templates", subtitle:"Static deliverables to download, fill, or copy.", items:[allTiles.forms, allTiles.crack, allTiles.pm, allTiles.ve]},
          {key:"tools",code:"TLS", title:"Calculators, Spreadsheets and Software", subtitle:"Interactive and computational tools to run or install.", items:[allTiles.calc, allTiles.trial, allTiles.budget]},
          {key:"refs", code:"REF", title:"Standards, Training and External Links", subtitle:"Outbound references to authoritative third parties.", items:[allTiles.std, allTiles.cert]},
        ];
        const Tile = ({r,i}) => {
          const active = hubTile === r.id;
          return (
            <div key={i} onClick={()=>setHubTile(active?null:r.id)} {...kbd(()=>setHubTile(active?null:r.id))} aria-expanded={active} aria-label={`${active?"Close":"Open"} ${r.n}`} style={{padding:"10px 12px",borderRadius:8,background:active?r.c+"15":r.c+"06",border:`1px solid ${active?r.c+"60":r.c+"12"}`,cursor:"pointer",transition:"all 0.2s",boxShadow:active?`0 2px 8px ${r.c}25`:"none"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                <div style={{fontSize:10,fontWeight:700,color:r.c}}>{r.n}</div>
                <span style={{fontSize:7,fontWeight:600,padding:"1px 5px",borderRadius:8,background:r.c+"12",color:r.c,whiteSpace:"nowrap"}}>{r.s}</span>
              </div>
              <div style={{fontSize:8.5,color:P.slate,marginTop:3,lineHeight:1.5}}>{r.d}</div>
              <div style={{fontSize:8,color:r.c,marginTop:6,fontWeight:700}}>{active ? "▾ Click to close" : "▸ Click to open"}</div>
            </div>
          );
        };
        return (
          <div style={{padding:"14px 24px"}}>
            {bands.map((b,bi)=>(
              <div key={b.key} style={{marginBottom:14}}>
                {/* ── BAND HEADER (engineering section divider, integrated) ── */}
                <div style={{display:"flex",alignItems:"center",gap:12,padding:"10px 12px 10px 14px",borderRadius:9,background:P.sand,border:`1px solid ${P.charcoal}14`,borderLeft:`4px solid ${P.greenD}`,marginBottom:8}}>

                  {/* Code mark — confident square block, sand-integrated */}
                  <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minWidth:42,height:38,padding:"0 8px",background:P.greenD+"10",border:`1px solid ${P.greenD}40`,borderRadius:5}}>
                    <span style={{fontFamily:"'SF Mono','Menlo','Consolas',monospace",fontSize:11,fontWeight:800,letterSpacing:2,color:P.greenD,textTransform:"uppercase",lineHeight:1}}>{b.code}</span>
                  </div>

                  {/* Title block */}
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontFamily:"'SF Mono','Menlo','Consolas',monospace",fontSize:7,fontWeight:700,letterSpacing:2,color:P.slate,textTransform:"uppercase",marginBottom:2}}>{`Section · 0${bi+1} of 03`}</div>
                    <div style={{fontSize:12,fontWeight:800,color:P.charcoal,fontFamily:"'Fraunces',serif",lineHeight:1.2}}>{b.title}</div>
                    <div style={{fontSize:8.5,color:P.slate,marginTop:2,lineHeight:1.4}}>{b.subtitle}</div>
                  </div>

                  {/* Count chip — informative but quiet */}
                  <div style={{display:"flex",alignItems:"baseline",gap:4,padding:"4px 9px",borderRadius:8,background:P.white,border:`1px solid ${P.charcoal}1A`,whiteSpace:"nowrap"}}>
                    <span style={{fontFamily:"'Fraunces',serif",fontSize:13,fontWeight:800,color:P.charcoal,lineHeight:1}}>{b.items.length}</span>
                    <span style={{fontSize:7.5,fontWeight:600,color:P.slate,letterSpacing:0.5}}>categories</span>
                  </div>
                </div>

                {/* ── TILE GRID ── */}
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:7}}>
                  {b.items.map((r,i)=><Tile key={r.id} r={r} i={`${b.key}-${i}`} />)}
                </div>
              </div>
            ))}
          </div>
        );
      })()}

      {/* ═══ EXPANDED CONTENT MODAL (overlay, opens on tile click) ═══ */}
      {hubTile && (
        <div role="dialog" aria-modal="true" aria-label="Knowledge Hub category details"
             onClick={(e)=>{ if(e.target===e.currentTarget) setHubTile(null); }}
             onKeyDown={(e)=>{ if(e.key==='Escape') setHubTile(null); }}
             tabIndex={-1}
             style={{position:"fixed",inset:0,zIndex:1000,background:"rgba(15,24,40,0.78)",backdropFilter:"blur(4px)",WebkitBackdropFilter:"blur(4px)",display:"flex",alignItems:"flex-start",justifyContent:"center",padding:"40px 16px",overflowY:"auto",animation:"fadeUp 0.2s ease-out"}}>
          <div style={{position:"relative",width:"100%",maxWidth:820,background:P.sand,borderRadius:12,boxShadow:"0 20px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(57,197,188,0.25)",overflow:"hidden",animation:"fadeUp 0.22s ease-out"}}>
            {/* Top accent bar matching tile pillar color */}
            <div style={{height:4,background:`linear-gradient(90deg, ${P.greenD} 0%, ${P.s3} 50%, ${P.s2} 100%)`}}></div>
            {/* Close button */}
            <button onClick={()=>setHubTile(null)} aria-label="Close category details"
                    style={{position:"absolute",top:14,right:14,width:32,height:32,borderRadius:8,background:P.white,border:`1px solid ${P.charcoal}25`,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,lineHeight:1,color:P.charcoal,fontWeight:700,zIndex:2,fontFamily:"inherit"}}>×</button>
            <div style={{padding:"24px 28px 28px"}}>

          {/* CRACK & DAMAGE LIBRARY */}
          {hubTile === "crack" && (
            <div>
              <div style={{fontSize:9,fontWeight:700,letterSpacing:2.4,color:P.s3,textTransform:"uppercase",marginBottom:6}}>Crack & Damage Library</div>
              <div style={{fontSize:14,fontWeight:800,color:P.charcoal,fontFamily:"'Fraunces',serif",marginBottom:6}}>Crack and Damage Reference Documents</div>
              <div style={{fontSize:10,color:P.slate,lineHeight:1.6,marginBottom:14,maxWidth:760}}>Verified, free-to-download references on damage evaluation and repair from authoritative bodies in the USA, Canada, and Europe. All links lead to the issuing authority and require no purchase.</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr",gap:8}}>
                {[
                  {region:"USA", title:"FEMA P-2018 Seismic Evaluation of Older Concrete Buildings for Earthquake Damage", body:"FEMA", year:"2018", url:"https://www.fema.gov/sites/default/files/2020-08/fema_seismic-eval-older-concrete-buildings_p-2018.pdf"},
                  {region:"USA", title:"FEMA P-58-1 Seismic Performance Assessment of Buildings — Vol. 1 Methodology (2nd Edition)", body:"FEMA / Applied Technology Council", year:"2019", url:"https://www.usrc.org/wp-content/uploads/FEMA_P-58-1-SE_Volume1_Methodology.pdf"},
                  {region:"Canada", title:"Federal Flood Damage Estimation Guidelines for Buildings and Infrastructure", body:"Natural Resources Canada", year:"2021", url:"https://publications.gc.ca/collections/collection_2021/rncan-nrcan/M45-124-2021-eng.pdf"},
                  {region:"Europe", title:"EN 1504 Concrete Repair Standards — illustrated reference summary (10 parts, 11 Principles)", body:"EN 1504-aligned guide", year:"2018", url:"https://www.sika.com/dam/dms/corporate/z/glo-concrete-repair-protection-en-1504.pdf"},
                ].map((d,i)=>(
                  <a key={i} href={d.url} target="_blank" rel="noopener noreferrer" style={{display:"block",padding:"10px 12px",borderRadius:8,background:P.white,border:`1px solid ${P.s3}25`,textDecoration:"none"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
                      <div style={{flex:1}}>
                        <div style={{fontSize:10.5,fontWeight:700,color:P.charcoal,marginBottom:2}}>{d.title}</div>
                        <div style={{fontSize:8.5,color:P.slate}}>{d.body} · {d.year}</div>
                      </div>
                      <span style={{fontSize:7.5,fontWeight:700,padding:"2px 7px",borderRadius:8,background:P.s3+"15",color:P.s3,whiteSpace:"nowrap",border:`1px solid ${P.s3}30`}}>{d.region}</span>
                    </div>
                    <div style={{fontSize:8,color:P.s3,fontWeight:700,marginTop:6}}>Open free document &#x2197;</div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* FREE INSPECTION FORMS */}
          {hubTile === "forms" && (
            <div>
              <div style={{fontSize:9,fontWeight:700,letterSpacing:2.4,color:P.s3,textTransform:"uppercase",marginBottom:6}}>Free Inspection Forms</div>
              <div style={{fontSize:14,fontWeight:800,color:P.charcoal,fontFamily:"'Fraunces',serif",marginBottom:6}}>Standardized Field and Office Forms</div>
              <div style={{fontSize:10,color:P.slate,lineHeight:1.6,marginBottom:14,maxWidth:760}}>Verified, free-to-download inspection forms and field manuals from authoritative bodies in the USA, Canada, and Europe. All links lead to the issuing authority and require no purchase.</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr",gap:8}}>
                {[
                  {region:"USA", title:"FEMA P-154 Rapid Visual Screening of Buildings — Handbook + Data Collection Forms (3rd Ed.)", body:"FEMA", year:"2015", url:"https://www.fema.gov/sites/default/files/2020-07/fema_earthquakes_rapid-visual-screening-of-buildings-for-potential-seismic-hazards-a-handbook-third-edition-fema-p-154.pdf"},
                  {region:"USA", title:"FEMA P-2055 Post-Disaster Building Safety Evaluation Guidance", body:"FEMA", year:"2019", url:"https://www.fema.gov/sites/default/files/2020-07/fema_p-2055_post-disaster_buildingsafety_evaluation_2019.pdf"},
                  {region:"Canada", title:"Level 1 Preliminary Seismic Risk Screening Tool (PST) for Existing Buildings — User's Guide", body:"National Research Council Canada", year:"2020", url:"https://nrc-publications.canada.ca/eng/view/object/?id=5f059958-29e6-43eb-aa37-c896ab11dcd1"},
                  {region:"Canada", title:"Post-Disaster Building Assessment Resources — Rapid Damage Assessment Form, placards, kits, guidelines", body:"BC Housing", year:"2022", url:"https://www.bchousing.org/projects-partners/emergency-management/building-assessments/pdba-resources"},
                  {region:"Europe", title:"Second-Generation Eurocodes Workshop — training materials (key changes and benefits through design examples)", body:"EU Joint Research Centre", year:"2025", url:"https://eurocodes.jrc.ec.europa.eu/news/now-available-training-materials-second-generation-eurocodes-workshop-3-5-june-2025"},
                ].map((d,i)=>(
                  <a key={i} href={d.url} target="_blank" rel="noopener noreferrer" style={{display:"block",padding:"10px 12px",borderRadius:8,background:P.white,border:`1px solid ${P.s3}25`,textDecoration:"none"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
                      <div style={{flex:1}}>
                        <div style={{fontSize:10.5,fontWeight:700,color:P.charcoal,marginBottom:2}}>{d.title}</div>
                        <div style={{fontSize:8.5,color:P.slate}}>{d.body} · {d.year}</div>
                      </div>
                      <span style={{fontSize:7.5,fontWeight:700,padding:"2px 7px",borderRadius:8,background:P.s3+"15",color:P.s3,whiteSpace:"nowrap",border:`1px solid ${P.s3}30`}}>{d.region}</span>
                    </div>
                    <div style={{fontSize:8,color:P.s3,fontWeight:700,marginTop:6}}>Open free document &#x2197;</div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* STRUCTURAL CALCULATORS */}
          {hubTile === "calc" && (
            <div>
              <div style={{fontSize:9,fontWeight:700,letterSpacing:2.4,color:P.s2,textTransform:"uppercase",marginBottom:6}}>Structural Calculators</div>
              <div style={{fontSize:14,fontWeight:800,color:P.charcoal,fontFamily:"'Fraunces',serif",marginBottom:6}}>Browser-Based Tools by Material and Load</div>
              <div style={{fontSize:10,color:P.slate,lineHeight:1.6,marginBottom:14,maxWidth:760}}>Verified, free-to-use browser-based calculators from authoritative bodies and reputable 3rd-party-endorsed engineering resources in the USA, Canada, and Europe. Organized by material system (Reinforced Concrete, Post-Tensioned, Steel, Composite, Wood, Aluminum) and by load type (Wind, Seismic). No login or purchase required.</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr",gap:8}}>
                {[
                  // ── REINFORCED CONCRETE ──
                  {region:"USA", units:"SI/US", title:"ACI 318-19 Reinforced Concrete Beams Design Calculator · 2025", body:"CalcTree", year:"Live · 2026", url:"https://www.calctree.com/templates/concrete-beam"},
                  {region:"USA / Europe", units:"SI/US", title:"ACI 318-19 / EN 1992-1-1 Reinforced Concrete Section Design Calculator · 2025", body:"CalcForge", year:"Live · 2026", url:"https://calcforge.com/concrete/1"},
                  {region:"Europe", units:"SI", title:"EN 1992-1-1 (Eurocode 2) Reinforced Concrete Slabs, Beams, Columns, Walls, Footings, Punching Shear, Deflection, Crack Width Calculators · 2025", body:"EurocodeApplied", year:"Live · 2026", url:"https://eurocodeapplied.com/design/en1992"},
                  {region:"Canada", units:"SI/US", title:"CSA A23.3-14 Reinforced Concrete Slab and Wall Resistance Calculator · 2025", body:"SkyCiv", year:"Live · 2026", url:"https://skyciv.com/quick-calculators/csa-a23-concrete-slab-calculator/"},
                  {region:"Canada", units:"SI", title:"CSA A23.3-19 Reinforced Concrete Beams, Slabs and Columns Design Calculator · 2025", body:"SAFI Concrete Calculator", year:"Live · 2026", url:"https://safi.com/concrete-engineering-calculator/"},
                  {region:"Canada", units:"SI", title:"CSA A23.3-14 Reinforced Concrete Beam Design Examples and Worksheets · 2025", body:"StructurePoint spBeam", year:"Live · 2026", url:"https://structurepoint.org/publication/design-examples.asp"},
                  // ── POST-TENSIONED ──
                  {region:"USA", units:"US", title:"ACI 318-19 Post-Tensioned Concrete Slab Calculator (one-way, two-way) · 2025", body:"ConcreteMetric", year:"Live · 2026", url:"https://concretemetric.com/calculators/post-tension-slab-calculator/"},
                  {region:"USA", units:"US", title:"ACI 318 Post-Tensioned Beam and Slab Design Spreadsheets · 2025", body:"PDH Online", year:"Live · 2026", url:"https://pdhonline.com/courses/s133/s133.htm"},
                  // ── STEEL ──
                  {region:"USA", units:"SI/US", title:"AISC 360-16/22 Steel Beam and Column Design Calculator · 2025", body:"CalcTree", year:"Live · 2026", url:"https://www.calctree.com/templates/steel-section"},
                  {region:"USA / Europe / Canada", units:"SI/US", title:"AISC 360 / EN 1993 / CSA S16 Steel Column Capacity Calculator · 2025", body:"SteelCalculator.app", year:"Live · 2026", url:"https://steelcalculator.app/tools/column-capacity/"},
                  {region:"Europe", units:"SI", title:"EN 1993-1-1 (Eurocode 3) Steel Beam, Column and Connection Calculator · 2025", body:"SkyCiv EC3", year:"Live · 2026", url:"https://skyciv.com/free-tools/"},
                  {region:"Canada", units:"SI", title:"CSA S16-19 Steel Beam, Column and Member Design Calculator · 2025", body:"AutoCalcs", year:"Live · 2026", url:"https://autocalcs.com/csa-s16-design-calculator"},
                  {region:"Canada", units:"SI", title:"CSA S16:19 + NBCC 2015 Steel Beam Calculator · 2025", body:"Calcs.com", year:"Live · 2026", url:"https://calcs.com/calculations/steelbeamca"},
                  {region:"Canada", units:"SI", title:"CSA S16:19 + NBCC 2015 Steel Member (Beam / Column) Calculator · 2025", body:"ClearCalcs", year:"Live · 2026", url:"https://www.clearcalcs.com/calculations/steelmemberca"},
                  // ── COMPOSITE ──
                  {region:"USA", units:"SI/US", title:"AISC 360-22 Steel-Concrete Composite Beam Design Calculator · 2025", body:"SteelCalculator.app", year:"Live · 2026", url:"https://steelcalculator.app/tools/composite-design/"},
                  {region:"USA / Europe", units:"SI/US", title:"AISC 360 / EN 1994 / IS 11384 Composite Beam Calculator · 2025", body:"ToolsRail", year:"Live · 2026", url:"https://www.toolsrail.com/civil/composite-beam-calculator.php"},
                  // ── WOOD / TIMBER ──
                  {region:"USA", units:"US", title:"NDS 2024 + AISC 360 Wood and Steel Beam Calculator · 2025", body:"WebStructural", year:"Live · 2026", url:"https://webstructural.com/beam-designer.html"},
                  {region:"Europe", units:"SI", title:"EN 1995-1-1 (Eurocode 5) Timber Beam Design Calculator · 2025", body:"CalcTree", year:"Live · 2026", url:"https://www.calctree.com/templates/timber-beam"},
                  {region:"Canada", units:"SI/US", title:"CSA O86-14/19 Wood Beam Design Calculator · 2025", body:"SkyCiv", year:"Live · 2026", url:"https://skyciv.com/quick-calculators/canadian-wood-beam-design/"},
                  // ── ALUMINUM ──
                  {region:"USA / Europe / Canada", units:"SI/US", title:"ADM 2020 / EN 1999 / CSA S157 Aluminum Beam Capacity Calculator · 2025", body:"SkyCiv", year:"Live · 2026", url:"https://skyciv.com/quick-calculators/aluminum-beam-capacity-calculator/"},
                  // ── WIND ──
                  {region:"USA / Europe / Canada", units:"SI/US", title:"ASCE 7-22 / EN 1991-1-4 / NBCC 2020 Wind Load Calculator · 2025", body:"SkyCiv", year:"Live · 2026", url:"https://skyciv.com/wind-load-calculator/"},
                  // ── SEISMIC ──
                  {region:"USA", units:"US", title:"ASCE 7 / ASCE 41 / NEHRP / IBC / AASHTO Seismic Design Web Services · 2025", body:"US Geological Survey", year:"Live · 2026", url:"https://earthquake.usgs.gov/ws/designmaps/"},
                  {region:"USA", units:"US", title:"USGS Unified Seismic Hazard Tool · 2025", body:"US Geological Survey", year:"Live · 2026", url:"https://earthquake.usgs.gov/hazards/interactive/"},
                  {region:"USA", units:"US", title:"ASCE 7-10/16/22 Hazard Tool (wind, seismic, tornado, ice, snow) · 2025", body:"American Society of Civil Engineers", year:"Live · 2026", url:"https://ascehazardtool.org/"},
                  {region:"Canada", units:"SI", title:"NBCC 2020 Seismic Hazard Tool (Sa, PGA, PGV by location and Site Class) · 2025", body:"Natural Resources Canada", year:"2025", url:"https://www.seismescanada.rncan.gc.ca/hazard-alea/interpolat/nbc-cnb-en.php"},
                  {region:"Canada", units:"SI", title:"NBCC 2020 Seismic Load — Equivalent Static Method Calculator · 2025", body:"Jabacus", year:"Live · 2026", url:"https://jabacus.com/engineering/nbc2020/seismic.php"},
                  // ── GENERAL ANALYSIS ──
                  {region:"USA / Europe / Canada", units:"SI/US", title:"Multi-Code Beam Analysis Calculator (reactions, SFD, BMD, deflection) · 2025", body:"SkyCiv", year:"Live · 2026", url:"https://skyciv.com/free-beam-calculator/"},
                  {region:"Europe", units:"SI/US", title:"2D Beam, Frame and Truss Analysis Calculator · 2025", body:"BeamGuru", year:"Live · 2026", url:"https://beamguru.com/"},
                  {region:"Europe", units:"SI", title:"EN 1990–EN 1998 Eurocode Multi-Code Calculation Suite · 2025", body:"EurocodeApplied", year:"Live · 2026", url:"https://eurocodeapplied.com/"},
                ].map((d,i)=>(
                  <a key={i} href={d.url} target="_blank" rel="noopener noreferrer" style={{display:"block",padding:"10px 12px",borderRadius:8,background:P.white,border:`1px solid ${P.s2}25`,textDecoration:"none"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
                      <div style={{flex:1}}>
                        <div style={{fontSize:10.5,fontWeight:700,color:P.charcoal,marginBottom:2}}>{d.title}</div>
                        <div style={{fontSize:8.5,color:P.slate}}>{d.body} · {d.year}</div>
                      </div>
                      <div style={{display:"flex",flexDirection:"column",gap:4,alignItems:"flex-end"}}>
                        <span style={{fontSize:7.5,fontWeight:700,padding:"2px 7px",borderRadius:8,background:P.s2+"15",color:P.s2,whiteSpace:"nowrap",border:`1px solid ${P.s2}30`}}>{d.region}</span>
                        <span style={{fontSize:7,fontWeight:700,padding:"2px 7px",borderRadius:8,background:P.charcoal+"0F",color:P.charcoal,whiteSpace:"nowrap",border:`1px solid ${P.charcoal}1F`,letterSpacing:0.5}}>{d.units}</span>
                      </div>
                    </div>
                    <div style={{fontSize:8,color:P.s2,fontWeight:700,marginTop:6}}>Open free calculator &#x2197;</div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* TRIAL SOFTWARE (commercial trials only) */}
          {hubTile === "trial" && (
            <div>
              <div style={{fontSize:9,fontWeight:700,letterSpacing:2.4,color:P.s2,textTransform:"uppercase",marginBottom:6}}>Trial Software</div>
              <div style={{fontSize:14,fontWeight:800,color:P.charcoal,fontFamily:"'Fraunces',serif",marginBottom:6}}>Commercial Trial Downloads</div>
              <div style={{fontSize:10,color:P.slate,lineHeight:1.6,marginBottom:14,maxWidth:760}}>Direct links to official trial downloads from leading commercial vendors. All trials require user registration on the vendor's website. iStructural Group Inc. does not host, distribute, or modify any third-party software.</div>

              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
                {[
                  {n:"ETABS",v:"Computers and Structures, Inc.",t:"30-day trial",d:"Multi-story buildings, lateral systems, P-delta, response spectrum.",url:"https://www.csiamerica.com/products/etabs/trial",c:P.s3},
                  {n:"SAP2000",v:"Computers and Structures, Inc.",t:"30-day trial",d:"General-purpose structural analysis, linear, nonlinear, static, dynamic.",url:"https://www.csiamerica.com/products/sap2000/trial",c:P.s3},
                  {n:"CSiBridge",v:"Computers and Structures, Inc.",t:"30-day trial",d:"Bridge analysis, design, rating, staged construction, tendon layout.",url:"https://www.csiamerica.com/products/csibridge/trial",c:P.s3},
                  {n:"SAFE",v:"Computers and Structures, Inc.",t:"30-day trial",d:"Slab and foundation design, PT and RC, FEA and strip method.",url:"https://www.csiamerica.com/products/safe/trial",c:P.s3},
                  {n:"IDEA StatiCa",v:"IDEA StatiCa s.r.o.",t:"14-day trial",d:"Steel connection design, code-check, full functionality.",url:"https://www.ideastatica.com/product-downloads",c:P.s1},
                  {n:"MIDAS Civil NX",v:"MIDAS Information Technology Co.",t:"30-day trial",d:"Bridges and civil structures, advanced FEA, staged construction.",url:"https://resource.midasuser.com/en/free-trial",c:P.gold},
                  {n:"MIDAS GEN",v:"MIDAS Information Technology Co.",t:"30-day trial",d:"Buildings and general structural analysis, code-check.",url:"https://resource.midasuser.com/en/free-trial",c:P.gold},
                  {n:"ADAPT-Builder",v:"RISA Tech, Inc.",t:"10-day trial",d:"Concrete buildings with PT, integrated BIM environment.",url:"https://risa.com/products/adapt-builder",c:P.s2},
                  {n:"ADAPT-PT/RC",v:"RISA Tech, Inc.",t:"10-day trial",d:"Post-tensioned beam and slab design.",url:"https://risa.com/products/adapt-pt-rc",c:P.s2},
                  {n:"RISA-3D",v:"RISA Tech, Inc.",t:"10-day trial",d:"3D analysis and design, integrates with RISAFloor.",url:"https://risa.com/products/risa-3d",c:P.s2},
                  {n:"RISAFloor",v:"RISA Tech, Inc.",t:"10-day trial",d:"Multi-story building gravity systems and floor design.",url:"https://risa.com/products/risafloor",c:P.s2},
                  {n:"DeepEX",v:"Deep Excavation LLC",t:"30-day trial",d:"Deep excavation, retaining walls, sheet piles, anchored walls. Geotechnical and structural integrated.",url:"https://www.deepexcavation.com/en/downloads",c:P.s1},
                ].map((s,i)=>(
                  <div key={i} style={{padding:"12px 14px",borderRadius:8,background:P.white,border:`1px solid ${s.c}20`,display:"flex",flexDirection:"column",justifyContent:"space-between",minHeight:130}}>
                    <div>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:6}}>
                        <div style={{fontSize:11,fontWeight:800,color:s.c,fontFamily:"'Fraunces',serif"}}>{s.n}</div>
                        <span style={{fontSize:7.5,fontWeight:700,padding:"2px 7px",borderRadius:10,background:s.c+"15",color:s.c,whiteSpace:"nowrap",border:`1px solid ${s.c}30`}}>{s.t}</span>
                      </div>
                      <div style={{fontSize:8,color:P.slate,fontStyle:"italic",marginTop:1,marginBottom:6}}>by {s.v}</div>
                      <div style={{fontSize:9,color:P.charcoal,lineHeight:1.5}}>{s.d}</div>
                    </div>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" style={{display:"inline-block",marginTop:10,fontSize:9,fontWeight:700,color:P.white,background:s.c,padding:"5px 10px",borderRadius:5,textDecoration:"none",textAlign:"center"}}>Visit Vendor Trial &#x2197;</a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* BUDGET-FRIENDLY SOFTWARE (free, open-source, low-cost) */}
          {hubTile === "budget" && (
            <div>
              <div style={{fontSize:9,fontWeight:700,letterSpacing:2.4,color:P.greenD,textTransform:"uppercase",marginBottom:6}}>Budget-Friendly Software</div>
              <div style={{fontSize:14,fontWeight:800,color:P.charcoal,fontFamily:"'Fraunces',serif",marginBottom:6}}>Free, Open-Source, and Low-Cost Tools</div>
              <div style={{fontSize:10,color:P.slate,lineHeight:1.6,marginBottom:14,maxWidth:760}}>Free, open-source, and educational alternatives to commercial structural software. For students, small practices, research, and budget-conscious projects. License terms vary by vendor (GPL, MIT, BSD, EULA); review each vendor's license before use.</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
                {[
                  {n:"OpenSees",v:"UC Berkeley / PEER",d:"Nonlinear seismic, advanced research, free open-source.",url:"https://opensees.berkeley.edu/",c:P.greenD},
                  {n:"Code_Aster + Salome-Meca",v:"Electricite de France (EDF)",d:"General FEA, mechanical, thermal. Industrial-grade open-source.",url:"https://code-aster.org/",c:P.greenD},
                  {n:"STRES Software",v:"STRES",d:"Reinforced concrete design tools. Slabs Expert, Strut-and-Tie, deep beams. ACI 318-19.",url:"https://stres-software.com/",c:P.greenD},
                  {n:"FreeCAD with FEM",v:"The FreeCAD Project",d:"CAD plus simple FEA via FEM workbench.",url:"https://www.freecad.org/",c:P.greenD},
                  {n:"Mastan2",v:"Cornell University",d:"2D/3D matrix analysis, learning tool.",url:"https://www.mastan2.com/",c:P.greenD},
                  {n:"CalculiX",v:"Guido Dhondt et al.",d:"FEA solver with ABAQUS-like syntax.",url:"https://www.calculix.de/",c:P.greenD},
                  {n:"PrePoMax",v:"Open-source community",d:"Pre/post-processor GUI for CalculiX.",url:"https://prepomax.fs.um.si/",c:P.greenD},
                  {n:"2D Frame Analysis",v:"EngiSSol",d:"Quick 2D frame analysis. Free version available.",url:"https://www.engissol.com/",c:P.greenD},
                  {n:"LISA-FEA",v:"Sonnenhof Holdings",d:"Low-cost general FEA, $150 one-time license.",url:"https://lisafea.com/",c:P.greenD},
                  {n:"TRUSS4",v:"Trussplan",d:"Truss analysis and design. Free version available.",url:"https://www.fine.eu/products/truss/",c:P.greenD},
                ].map((s,i)=>(
                  <div key={i} style={{padding:"12px 14px",borderRadius:8,background:P.white,border:`1px solid ${s.c}20`,display:"flex",flexDirection:"column",justifyContent:"space-between",minHeight:130}}>
                    <div>
                      <div style={{fontSize:11,fontWeight:800,color:s.c,fontFamily:"'Fraunces',serif"}}>{s.n}</div>
                      <div style={{fontSize:8,color:P.slate,fontStyle:"italic",marginTop:1,marginBottom:6}}>by {s.v}</div>
                      <div style={{fontSize:9,color:P.charcoal,lineHeight:1.5}}>{s.d}</div>
                    </div>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" style={{display:"inline-block",marginTop:10,fontSize:9,fontWeight:700,color:P.white,background:s.c,padding:"5px 10px",borderRadius:5,textDecoration:"none",textAlign:"center"}}>Visit Vendor &#x2197;</a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* INTERNATIONAL STANDARDS */}
          {hubTile === "std" && (
            <div>
              <div style={{fontSize:9,fontWeight:700,letterSpacing:2.4,color:P.greenD,textTransform:"uppercase",marginBottom:6}}>International Standards</div>
              <div style={{fontSize:14,fontWeight:800,color:P.charcoal,fontFamily:"'Fraunces',serif",marginBottom:6}}>Codes and Standards Quick Reference</div>
              <div style={{fontSize:10,color:P.slate,lineHeight:1.6,marginBottom:14,maxWidth:760}}>Verified, free-to-access standards portals and design parameter tools from authoritative bodies in the USA, Canada, and Europe. All links lead to the issuing authority and require no purchase.</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr",gap:8}}>
                {[
                  {region:"USA", title:"ASCE Hazard Tool — site-specific design parameters per ASCE 7-10/16/22 (wind, seismic, tornado, ice, snow)", body:"American Society of Civil Engineers", year:"Live · 2026", url:"https://ascehazardtool.org/"},
                  {region:"USA", title:"USGS Seismic Design Web Services — endpoints for ASCE 7-22, ASCE 41-17, NEHRP, IBC, AASHTO", body:"US Geological Survey", year:"Live · 2026", url:"https://earthquake.usgs.gov/ws/designmaps/"},
                  {region:"Canada", title:"National Building Code of Canada 2020 — free PDF via NRC archive", body:"National Research Council Canada", year:"2020", url:"https://nrc-publications.canada.ca/eng/search/?q=NRCCode"},
                  {region:"Canada", title:"NBC 2020 Seismic Hazard Tool — spectral acceleration / PGA / PGV per location and Site Class", body:"Natural Resources Canada (CHIS)", year:"2025", url:"https://www.seismescanada.rncan.gc.ca/hazard-alea/interpolat/nbc-cnb-en.php"},
                  {region:"Europe", title:"Eurocodes Learning Corner — full Eurocode family, training materials, JRC background documents", body:"EU Joint Research Centre", year:"Live · 2026", url:"https://eurocodes.jrc.ec.europa.eu/learning-corner"},
                  {region:"Europe", title:"Eurocode 2 Worked Examples — design examples (Concrete Initiative)", body:"The Concrete Initiative", year:"2017", url:"https://www.theconcreteinitiative.eu/images/ECP_Documents/Eurocode2_WorkedExamples.pdf"},
                ].map((d,i)=>(
                  <a key={i} href={d.url} target="_blank" rel="noopener noreferrer" style={{display:"block",padding:"10px 12px",borderRadius:8,background:P.white,border:`1px solid ${P.greenD}25`,textDecoration:"none"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
                      <div style={{flex:1}}>
                        <div style={{fontSize:10.5,fontWeight:700,color:P.charcoal,marginBottom:2}}>{d.title}</div>
                        <div style={{fontSize:8.5,color:P.slate}}>{d.body} · {d.year}</div>
                      </div>
                      <span style={{fontSize:7.5,fontWeight:700,padding:"2px 7px",borderRadius:8,background:P.greenD+"15",color:P.greenD,whiteSpace:"nowrap",border:`1px solid ${P.greenD}30`}}>{d.region}</span>
                    </div>
                    <div style={{fontSize:8,color:P.greenD,fontWeight:700,marginTop:6}}>Open free resource &#x2197;</div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* PM TEMPLATES */}
          {hubTile === "pm" && (
            <div>
              <div style={{fontSize:9,fontWeight:700,letterSpacing:2.4,color:P.s1,textTransform:"uppercase",marginBottom:6}}>PM Templates & Frameworks</div>
              <div style={{fontSize:14,fontWeight:800,color:P.charcoal,fontFamily:"'Fraunces',serif",marginBottom:6}}>Project Management Documents and Frameworks</div>
              <div style={{fontSize:10,color:P.slate,lineHeight:1.6,marginBottom:14,maxWidth:760}}>Verified, free-to-download project management templates and frameworks from authoritative bodies in the USA, Canada, and Europe. All links lead to the issuing authority and require no purchase.</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr",gap:8}}>
                {[
                  {region:"USA", title:"PMBOK 6 Project Risk Management — Risk Register, Risk Breakdown Structure, Probability-Impact Matrix templates (free webinar PDF)", body:"PMI Central Italy Chapter", year:"2018", url:"https://www.pmi-centralitaly.org/wp-content/uploads/2019/06/PMBoK_Risk_03072018.pdf"},
                  {region:"Canada", title:"Federal Flood Damage Estimation Guidelines for Buildings and Infrastructure (project planning + risk framework)", body:"Natural Resources Canada", year:"2021", url:"https://publications.gc.ca/collections/collection_2021/rncan-nrcan/M45-124-2021-eng.pdf"},
                  {region:"Europe", title:"Managing an Intervention — current EU INTPA project cycle and contract management guidance portal", body:"European Commission, DG INTPA", year:"Live · 2026", url:"https://international-partnerships.ec.europa.eu/funding-and-technical-assistance/guidelines/managing-intervention_en"},
                ].map((d,i)=>(
                  <a key={i} href={d.url} target="_blank" rel="noopener noreferrer" style={{display:"block",padding:"10px 12px",borderRadius:8,background:P.white,border:`1px solid ${P.s1}25`,textDecoration:"none"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
                      <div style={{flex:1}}>
                        <div style={{fontSize:10.5,fontWeight:700,color:P.charcoal,marginBottom:2}}>{d.title}</div>
                        <div style={{fontSize:8.5,color:P.slate}}>{d.body} · {d.year}</div>
                      </div>
                      <span style={{fontSize:7.5,fontWeight:700,padding:"2px 7px",borderRadius:8,background:P.s1+"15",color:P.s1,whiteSpace:"nowrap",border:`1px solid ${P.s1}30`}}>{d.region}</span>
                    </div>
                    <div style={{fontSize:8,color:P.s1,fontWeight:700,marginTop:6}}>Open free document &#x2197;</div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* V.E. & ROI TOOLS */}
          {hubTile === "ve" && (
            <div>
              <div style={{fontSize:9,fontWeight:700,letterSpacing:2.4,color:P.s1,textTransform:"uppercase",marginBottom:6}}>V.E. & ROI Tools</div>
              <div style={{fontSize:14,fontWeight:800,color:P.charcoal,fontFamily:"'Fraunces',serif",marginBottom:6}}>Value Engineering and Cost Documents</div>
              <div style={{fontSize:10,color:P.slate,lineHeight:1.6,marginBottom:14,maxWidth:760}}>Verified, free-to-download value engineering and life cycle costing references from authoritative bodies in the USA and Europe. All links lead to the issuing authority and require no purchase.</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr",gap:8}}>
                {[
                  {region:"USA", title:"SAVE International Value Methodology Standard — full Six-Phase Job Plan", body:"SAVE International", year:"2015", url:"https://cdn.ymaws.com/www.value-eng.org/resource/resmgr/standards_documents/vmstd.pdf"},
                  {region:"USA", title:"SD-24 Value Engineering: A Guidebook of Best Practices and Tools", body:"US Department of Defense", year:"2025", url:"https://www.cto.mil/wp-content/uploads/2025/02/SD-24-VE-Guidebook-25Feb2025-Cleared-1.pdf"},
                  {region:"Europe", title:"Level(s) Indicator 6.1 Life Cycle Costs — User Manual (introductory briefing, instructions, guidance)", body:"EU Joint Research Centre", year:"2021", url:"https://susproc.jrc.ec.europa.eu/product-bureau/sites/default/files/2021-01/UM3_Indicator_6.1_v1.1_21pp.pdf"},
                  {region:"Europe", title:"Achieving the Cost-Effective Energy Transformation of Europe's Buildings (cost-benefit framework for retrofits)", body:"EU Joint Research Centre", year:"2019", url:"https://publications.jrc.ec.europa.eu/repository/bitstream/JRC117739/cost_optimal_energy_renovations_online.pdf"},
                ].map((d,i)=>(
                  <a key={i} href={d.url} target="_blank" rel="noopener noreferrer" style={{display:"block",padding:"10px 12px",borderRadius:8,background:P.white,border:`1px solid ${P.s1}25`,textDecoration:"none"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
                      <div style={{flex:1}}>
                        <div style={{fontSize:10.5,fontWeight:700,color:P.charcoal,marginBottom:2}}>{d.title}</div>
                        <div style={{fontSize:8.5,color:P.slate}}>{d.body} · {d.year}</div>
                      </div>
                      <span style={{fontSize:7.5,fontWeight:700,padding:"2px 7px",borderRadius:8,background:P.s1+"15",color:P.s1,whiteSpace:"nowrap",border:`1px solid ${P.s1}30`}}>{d.region}</span>
                    </div>
                    <div style={{fontSize:8,color:P.s1,fontWeight:700,marginTop:6}}>Open free document &#x2197;</div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* TRAINING & CERT LINKS */}
          {hubTile === "cert" && (
            <div>
              <div style={{fontSize:9,fontWeight:700,letterSpacing:2.4,color:P.greenD,textTransform:"uppercase",marginBottom:6}}>Training & Certification Links</div>
              <div style={{fontSize:14,fontWeight:800,color:P.charcoal,fontFamily:"'Fraunces',serif",marginBottom:6}}>Professional Development Resources</div>
              <div style={{fontSize:10,color:P.slate,lineHeight:1.6,marginBottom:14,maxWidth:760}}>Verified, free-to-access training portals and CPD entry points from authoritative bodies in the USA, Canada, and Europe. All links lead to the issuing authority. Course completion certificates may be issued at no cost or with a separate fee depending on the provider.</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr",gap:8}}>
                {[
                  {region:"USA", title:"FEMA Emergency Management Institute — Independent Study Program (200+ free online courses including building safety and emergency management)", body:"FEMA EMI", year:"Live · 2026", url:"https://training.fema.gov/is/crslist.aspx"},
                  {region:"USA", title:"FEMA P-154 official training page — Rapid Visual Screening training resources", body:"FEMA", year:"Live · 2026", url:"https://www.fema.gov/emergency-managers/risk-management/earthquake/training/fema-p-154"},
                  {region:"Canada", title:"Canadian Society for Civil Engineering (CSCE) — Professional Development portal", body:"CSCE / SCGC", year:"Live · 2026", url:"https://legacy.csce.ca/en/lifelong-learning/professional-development/"},
                  {region:"Canada", title:"OSPE Continuing Professional Development — free weekly sessions for members + recordings", body:"Ontario Society of Professional Engineers", year:"Live · 2026", url:"https://ospe.on.ca/academy/cpd/"},
                  {region:"Europe", title:"Eurocodes Learning Corner — free training materials, JRC workshops, slide decks", body:"EU Joint Research Centre", year:"Live · 2026", url:"https://eurocodes.jrc.ec.europa.eu/learning-corner/training-materials"},
                  {region:"Europe", title:"JRC Eurocodes Evolution — free explainer video series on second-generation Eurocodes", body:"EU Joint Research Centre", year:"2025", url:"https://eurocodes.jrc.ec.europa.eu/2nd-generation/eurocodes-evolution-explained-video-series"},
                ].map((d,i)=>(
                  <a key={i} href={d.url} target="_blank" rel="noopener noreferrer" style={{display:"block",padding:"10px 12px",borderRadius:8,background:P.white,border:`1px solid ${P.greenD}25`,textDecoration:"none"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
                      <div style={{flex:1}}>
                        <div style={{fontSize:10.5,fontWeight:700,color:P.charcoal,marginBottom:2}}>{d.title}</div>
                        <div style={{fontSize:8.5,color:P.slate}}>{d.body} · {d.year}</div>
                      </div>
                      <span style={{fontSize:7.5,fontWeight:700,padding:"2px 7px",borderRadius:8,background:P.greenD+"15",color:P.greenD,whiteSpace:"nowrap",border:`1px solid ${P.greenD}30`}}>{d.region}</span>
                    </div>
                    <div style={{fontSize:8,color:P.greenD,fontWeight:700,marginTop:6}}>Open free training portal &#x2197;</div>
                  </a>
                ))}
              </div>
            </div>
          )}

            </div>{/* end modal padded body */}
          </div>{/* end modal card */}
        </div>
      )}

      {/* ═══ GENERIC DISCLAIMER (covers all third-party content site-wide) ═══ */}
      <div style={{padding:"18px 24px 24px",background:"#FAFAFA",borderTop:"1px solid #d0d0d0"}}>
        <div style={{fontSize:8,fontWeight:700,letterSpacing:2,color:P.charcoal,textTransform:"uppercase",marginBottom:8}}>Disclaimer, Copyright, and Third-Party Notice</div>
        <div style={{fontSize:8.5,color:P.slate,lineHeight:1.7,maxWidth:1100}}>
          <p style={{marginBottom:6}}>All third-party content referenced or linked from this Knowledge Hub, including but not limited to software programs, documents, datasheets, code excerpts, technical standards, training materials, brand names, logos, trademarks, and any associated documentation, is the exclusive property of its respective owners, vendors, publishers, or issuing authorities.</p>
          <p style={{marginBottom:6}}>iStructural Group Inc. is not affiliated with, endorsed by, or sponsored by any third party referenced on this page unless explicitly stated. iStructural Group Inc. holds no rights, licenses, or ownership over any third-party content.</p>
          <p style={{marginBottom:6}}>External links provided here lead to the official sources of the respective owners. iStructural Group Inc. does not host, distribute, modify, or redistribute any third-party content. We are not responsible for the availability, terms of use, licensing terms, privacy practices, or any outcomes resulting from interaction with linked external resources. Trial periods, license restrictions, eligibility, and access terms are governed solely by the respective owners and may change without notice.</p>
          <p style={{marginBottom:6}}>Documents and materials displayed within this Knowledge Hub that explicitly carry the badge <strong style={{color:P.charcoal}}>"AUTHORED BY iSTRUCTURAL GROUP INC."</strong> or the iStructural Group Inc. copyright notice are the original intellectual property of iStructural Group Inc. and may not be reproduced, redistributed, or modified without prior written consent.</p>
          <p style={{marginBottom:6}}>All other content is referenced strictly for educational and informational purposes. iStructural Group Inc. does not claim authorship, endorsement, or any proprietary interest in third-party content unless explicitly stated.</p>
          <p style={{marginBottom:0}}>By accessing this Knowledge Hub, you acknowledge and accept these terms.</p>
          <p style={{marginTop:8,fontSize:7.5,fontStyle:"italic",color:"#888"}}>Last updated: April 2026.</p>
        </div>
      </div>
    </div>
  );

  // ══════════════════════ TOOLS BOX  modular app launcher (Phase 1) ══════════════════════
  // Phase 1 scope: launcher + 2 apps (APEX + ARGO). Auth + payments dormant.
  // Each app entry is fully declarative; adding a new app = 1 new entry in this registry.
  //
  // ICON LIBRARY  reusable shapes referenced by string id from each app's "icon" field.
  // To add a new icon: add a case below. To add a new app: set app.icon = "<id>" in the registry.
  // For a bespoke one-off, set app.icon = {custom: <jsx>} instead.
  const AppIcon = ({id, size=22, color="#FFFFFF", accent=null}) => {
    const a = accent || color;
    const s = size;
    const half = s/2;
    if (id && typeof id === "object" && id.custom) return id.custom;
    switch (id) {
      case "summit": // APEX  mountain peak with flag
        return (
          <svg width={s} height={s} viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M 14 5 L 25 22 L 3 22 Z" fill={color} stroke={a} strokeWidth="0.9"/>
            <path d="M 14 5 L 18 12 L 12 16 L 3 22 L 25 22 L 18 12 Z" fill={a} opacity="0.55"/>
            <line x1="14" y1="5" x2="14" y2="1.5" stroke={color} strokeWidth="0.9"/>
            <path d="M 14 1.5 L 19 3 L 14 4.2 Z" fill={a}/>
          </svg>
        );
      case "compass": // ARGO  cardinal ring with rotating needle
        return (
          <svg width={s} height={s} viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="14" cy="14" r="11" fill="none" stroke={color} strokeWidth="1.2"/>
            <circle cx="14" cy="14" r="7.5" fill={a} stroke={color} strokeWidth="0.6" opacity="0.25"/>
            <line x1="14" y1="2.5" x2="14" y2="5" stroke={color} strokeWidth="1"/>
            <line x1="14" y1="23" x2="14" y2="25.5" stroke={color} strokeWidth="1"/>
            <line x1="2.5" y1="14" x2="5" y2="14" stroke={color} strokeWidth="1"/>
            <line x1="23" y1="14" x2="25.5" y2="14" stroke={color} strokeWidth="1"/>
            <g transform="rotate(-15 14 14)">
              <path d="M 14 7 L 16 14 L 12 14 Z" fill={color}/>
              <path d="M 14 21 L 16 14 L 12 14 Z" fill={color} opacity="0.45"/>
              <circle cx="14" cy="14" r="1.4" fill={a}/>
            </g>
          </svg>
        );
      case "gear":
        return (
          <svg width={s} height={s} viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <g fill={color}>
              <rect x="12.5" y="1" width="3" height="4" rx="0.6"/>
              <rect x="12.5" y="23" width="3" height="4" rx="0.6"/>
              <rect x="1" y="12.5" width="4" height="3" rx="0.6"/>
              <rect x="23" y="12.5" width="4" height="3" rx="0.6"/>
              <rect x="3.7" y="3.7" width="3" height="3" rx="0.6" transform="rotate(-45 5.2 5.2)"/>
              <rect x="21.3" y="3.7" width="3" height="3" rx="0.6" transform="rotate(45 22.8 5.2)"/>
              <rect x="3.7" y="21.3" width="3" height="3" rx="0.6" transform="rotate(45 5.2 22.8)"/>
              <rect x="21.3" y="21.3" width="3" height="3" rx="0.6" transform="rotate(-45 22.8 22.8)"/>
            </g>
            <circle cx="14" cy="14" r="6" fill={a} stroke={color} strokeWidth="1.2"/>
            <circle cx="14" cy="14" r="2.4" fill={color}/>
          </svg>
        );
      case "book":
        return (
          <svg width={s} height={s} viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M 4 5 L 14 7 L 14 24 L 4 22 Z" fill={color} stroke={a} strokeWidth="0.8"/>
            <path d="M 24 5 L 14 7 L 14 24 L 24 22 Z" fill={a} stroke={color} strokeWidth="0.8"/>
            <line x1="6" y1="10" x2="12" y2="11" stroke={a} strokeWidth="0.7" opacity="0.7"/>
            <line x1="6" y1="13" x2="12" y2="14" stroke={a} strokeWidth="0.7" opacity="0.7"/>
            <line x1="6" y1="16" x2="12" y2="17" stroke={a} strokeWidth="0.7" opacity="0.7"/>
            <line x1="16" y1="11" x2="22" y2="10" stroke={color} strokeWidth="0.7" opacity="0.7"/>
            <line x1="16" y1="14" x2="22" y2="13" stroke={color} strokeWidth="0.7" opacity="0.7"/>
            <line x1="16" y1="17" x2="22" y2="16" stroke={color} strokeWidth="0.7" opacity="0.7"/>
          </svg>
        );
      case "chart":
        return (
          <svg width={s} height={s} viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="4" y="14" width="4" height="10" fill={color} rx="0.7"/>
            <rect x="12" y="9" width="4" height="15" fill={a} rx="0.7"/>
            <rect x="20" y="4" width="4" height="20" fill={color} rx="0.7"/>
            <line x1="3" y1="25" x2="25" y2="25" stroke={color} strokeWidth="0.9"/>
          </svg>
        );
      case "lightbulb":
        return (
          <svg width={s} height={s} viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M 14 3 C 8.5 3 5 7 5 12 C 5 15 7 17 9 18.5 L 9 22 L 19 22 L 19 18.5 C 21 17 23 15 23 12 C 23 7 19.5 3 14 3 Z" fill={color} stroke={a} strokeWidth="0.8"/>
            <rect x="10" y="22.5" width="8" height="2" fill={a} rx="0.5"/>
            <rect x="11" y="25" width="6" height="1.5" fill={a} rx="0.5"/>
            <path d="M 11 11 L 14 14 L 17 11" fill="none" stroke={a} strokeWidth="1.1"/>
          </svg>
        );
      case "shield":
        return (
          <svg width={s} height={s} viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M 14 3 L 24 6 L 24 14 C 24 19 20 23.5 14 25.5 C 8 23.5 4 19 4 14 L 4 6 Z" fill={color} stroke={a} strokeWidth="0.9"/>
            <path d="M 14 3 L 24 6 L 24 14 C 24 19 20 23.5 14 25.5 L 14 3 Z" fill={a} opacity="0.55"/>
            <path d="M 9 13 L 13 17 L 19 10" fill="none" stroke={a} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case "globe":
        return (
          <svg width={s} height={s} viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="14" cy="14" r="11" fill={color} stroke={a} strokeWidth="0.9"/>
            <ellipse cx="14" cy="14" rx="11" ry="4.5" fill="none" stroke={a} strokeWidth="0.8" opacity="0.7"/>
            <ellipse cx="14" cy="14" rx="4.5" ry="11" fill="none" stroke={a} strokeWidth="0.8" opacity="0.7"/>
            <line x1="3" y1="14" x2="25" y2="14" stroke={a} strokeWidth="0.7" opacity="0.7"/>
            <line x1="14" y1="3" x2="14" y2="25" stroke={a} strokeWidth="0.7" opacity="0.7"/>
          </svg>
        );
      default:
        return null;
    }
  };

  const toolsApps = [
    {
      id:"ecios",
      name:"APEX",
      tagline:"Applied Persona and Executive eXecution",
      category:"Career & Hiring",
      shortDesc:"From a job description to an executive grade application package in one run. Multi vendor ATS, recruiter and hiring manager simulation, company intelligence, interview prep, advisory. Peak your application package.",
      iconColor:P.s2,
      iconLetter:"A",
      icon:"summit",
      requiresKey:true,
      requiresEntitlement:"ecios",
      briefing:{
        docx:"AJAIE/users/default_user/library/APEX_Capabilities_Briefing.docx",
        pdf:"AJAIE/users/default_user/library/APEX_Capabilities_Briefing.pdf",
      },
      capabilities:[
        "Multi-vendor ATS scoring (Workday, Taleo, iCIMS, Greenhouse, Lever, Ashby, BambooHR, ADP, SuccessFactors)",
        "Recruiter and hiring manager 6 second scan simulation",
        "Company intelligence: mission, vision, values, leadership, employee sentiment",
        "12 interview scenarios + STAR matrix + day of brief",
        "Strategic advisory: Apply / Selectively / Skip + probability + salary range",
        "Outputs: DOCX cover letter (1 A4), DOCX CV, XLSX scorecard, PDF full report",
      ],
      phases:[
        {n:1, name:"ATS Intelligence", get:"Score / 100 across 11 ATS engines + 5 angle consensus"},
        {n:2, name:"Recruiter and HM Simulation", get:"6 second scan, hiring psychology, AI detection"},
        {n:3, name:"Company Intelligence", get:"Mission, vision, values, leadership, employee sentiment, news"},
        {n:4, name:"Interview Intelligence", get:"12 scenario answers, mock simulator, day of brief"},
        {n:5, name:"Strategic Advisory", get:"Apply yes / no, probability, salary range"},
        {n:6, name:"Report Exports", get:"DOCX cover letter, DOCX CV, XLSX scorecard, PDF full report"},
        {n:7, name:"Automation", get:"Save, reuse, batch, schedule, log"},
        {n:8, name:"AI Optimization", get:"Continuous improvement, gap closure"},
      ],
      shortcuts:[
        {k:"A", a:"Full APEX run, all 8 phases", t:"green"},
        {k:"A quick", a:"ATS + decision only", t:"blue"},
        {k:"A cover", a:"Cover letter only", t:"blue"},
        {k:"A cv", a:"CV optimization only", t:"blue"},
        {k:"A interview", a:"Interview prep only (Phase 4)", t:"blue"},
        {k:"A mock", a:"Mock interview simulator (Phase 4 D2)", t:"blue"},
        {k:"A company", a:"Company intelligence only (Phase 3)", t:"blue"},
        {k:"A brief", a:"Day of interview brief", t:"blue"},
        {k:"A batch", a:"Multi JD batch", t:"yellow"},
        {k:"A reuse", a:"Reuse last saved CV + cover letter", t:"green"},
        {k:"A help", a:"Show the 2 page capabilities briefing", t:"green"},
        {k:"A report", a:"Regenerate full report from last run", t:"green"},
      ],
      outputs:[
        {file:"Cover Letter", fmt:"DOCX, 1 A4 page", what:"Executive tone, JD tailored, target company only"},
        {file:"CV", fmt:"DOCX, ATS optimized", what:"Single column, no images, no tables"},
        {file:"ATS Scorecard", fmt:"XLSX, 8 worksheets", what:"Per vendor scores, keyword heatmap, gaps, Q and A bank"},
        {file:"Full Report", fmt:"PDF", what:"All 8 phases, charts, tables, references with dates"},
        {file:"Full Report (editable)", fmt:"DOCX", what:"Same content in Word for editing or sharing"},
        {file:"Day of Brief", fmt:"DOCX, 1 page", what:"Generated after the interview is scheduled"},
      ],
      tips:[
        {tip:"Upload your latest CV verbatim, do not pre filter", why:"The engine needs raw signal"},
        {tip:"Upload at least one reference cover letter", why:"Style anchor improves the final letter"},
        {tip:"Use real numbers (team size, budget, scope) in your CV", why:"Hiring manager lens rewards specificity"},
        {tip:"Run J batch for multiple JDs", why:"Compare in one consolidated XLSX"},
        {tip:"Run J mock 48 hours before an interview", why:"Mock simulator with rubric scoring"},
        {tip:"Save versions of your CV per role family", why:"Library reuse cuts run time in half"},
        {tip:"Re run J after any CV edit", why:"Track ATS score delta in optimization log"},
      ],
      boundaries:[
        {will:"Invent experience you do not have", why:"Hard anti hallucination rule"},
        {will:"Copy past employer or client names into new cover letters", why:"Sanitization on ingest"},
        {will:"Promise an interview or an offer", why:"Probability is a model, not a guarantee"},
        {will:"Provide legal or immigration advice", why:"Out of scope"},
        {will:"Share your data outside this project", why:"Confidentiality enforced"},
      ],
      bars:[
        {label:"Pass ATS screen", pct:80},
        {label:"Recruiter screen pass", pct:75},
        {label:"HM interview pass", pct:65},
        {label:"Final round pass", pct:50},
        {label:"Offer received", pct:40},
      ],
      intakeFields:[
        {key:"cv",label:"Your CV / Resume",type:"textarea",required:true,placeholder:"Paste the full text of your CV here. The engine needs raw signal, do not pre filter."},
        {key:"refLetter",label:"Reference Cover Letter (optional, used for style anchors only)",type:"textarea",required:false,placeholder:"Optional. Company names will be stripped on ingest."},
        {key:"jd",label:"Target Job Description",type:"textarea",required:true,placeholder:"Paste the job description text or a URL."},
      ],
    },
    {
      id:"bid",
      name:"ARGO",
      tagline:"Adaptive Risk and Go Orchestrator",
      category:"Business & Strategy",
      shortDesc:"Convert any RFP, scope note, or project description into a structured GO / CONDITIONAL GO / NO-GO decision with delivery model ranking, commercial strategy, risk math, and win probability. Chart the bid. Decide the journey.",
      iconColor:P.s1,
      iconLetter:"A",
      icon:"compass",
      requiresKey:true,
      requiresEntitlement:"bid",
      capabilities:[
        "Technical analysis, constructability, interface dependencies",
        "Delivery model ranking: DBB / DB / CMAR / EPC / Progressive DB / Alliance",
        "Commercial model evaluation: Lump Sum / Hourly / Hybrid / Retainer",
        "Risk math (Probability x Impact x Detectability) across 8 categories",
        "Historical analogy + procurement psychology + win probability",
        "Outputs: 4 page Executive Decision Dashboard, GO/NO-GO with justification",
      ],
      phases:[
        {n:1, name:"Project Intake", get:"Scope, sector, delivery context, constraints"},
        {n:2, name:"Technical Analysis", get:"Constructability, interface dependencies, complexity"},
        {n:3, name:"Delivery Model Ranking", get:"DBB / DB / CMAR / EPC / Progressive DB / Alliance"},
        {n:4, name:"Commercial Model Evaluation", get:"Lump Sum / Hourly / Hybrid / Retainer"},
        {n:5, name:"Risk Math", get:"P x I x D across 8 categories"},
        {n:6, name:"Procurement Psychology", get:"Owner posture, scoring lens, incumbent advantage"},
        {n:7, name:"Win Probability", get:"Historical analogy + capability fit + competitive density"},
        {n:8, name:"Decision Dashboard", get:"GO / CONDITIONAL GO / NO-GO with justification"},
      ],
      shortcuts:[
        {k:"R", a:"Full ARGO run, all 8 phases", t:"green"},
        {k:"R quick", a:"GO / NO-GO call only", t:"blue"},
        {k:"R risk", a:"Risk math only (Phase 5)", t:"blue"},
        {k:"R commercial", a:"Commercial model evaluation (Phase 4)", t:"blue"},
        {k:"R delivery", a:"Delivery model ranking (Phase 3)", t:"blue"},
        {k:"R win", a:"Win probability only (Phase 7)", t:"blue"},
        {k:"R compare", a:"Multi opportunity batch comparison", t:"yellow"},
        {k:"R reuse", a:"Reuse last project context", t:"green"},
      ],
      outputs:[
        {file:"Executive Decision Dashboard", fmt:"PDF, 4 pages", what:"GO / CONDITIONAL GO / NO-GO with full justification"},
        {file:"Risk Register", fmt:"XLSX", what:"8 risk categories with P x I x D scoring"},
        {file:"Delivery + Commercial Memo", fmt:"DOCX", what:"Model ranking and commercial strategy rationale"},
        {file:"Win Probability Note", fmt:"DOCX, 1 page", what:"Probability, competitive density, historical analogy"},
      ],
      tips:[
        {tip:"Paste the full RFP if available, not a summary", why:"Scoring criteria and clauses drive the model rankings"},
        {tip:"List known competitors if you can", why:"Competitive density tightens win probability"},
        {tip:"State your firm's relevant past projects briefly", why:"Historical analogy improves the call"},
        {tip:"Flag any non-negotiable constraints", why:"Avoids CONDITIONAL GO with false confidence"},
      ],
      boundaries:[
        {will:"Promise a contract award", why:"Probability is a model, not a guarantee"},
        {will:"Estimate fixed bid pricing", why:"Pricing requires firm-specific cost data"},
        {will:"Provide legal opinion on contract terms", why:"Out of scope, route to counsel"},
        {will:"Share your project data outside this project", why:"Confidentiality enforced"},
      ],
      bars:[
        {label:"Technical fit", pct:75},
        {label:"Commercial fit", pct:65},
        {label:"Risk acceptable", pct:60},
        {label:"Win probability", pct:45},
      ],
      intakeFields:[
        {key:"projectDesc",label:"Project Description / Scope",type:"textarea",required:true,placeholder:"Describe the project: sector, scale, delivery context, known constraints."},
        {key:"rfp",label:"RFP Text / Email Exchange (optional)",type:"textarea",required:false,placeholder:"Paste relevant procurement signals, deadlines, scoring criteria."},
        {key:"constraints",label:"Known Constraints",type:"textarea",required:false,placeholder:"Budget, timeline, regulatory, stakeholder, geographic."},
      ],
    },
  ];

  // Session validity recomputes every second via nowTick so the timer is live.
  const sessionMsLeft = toolsSession.keyValidUntil ? (new Date(toolsSession.keyValidUntil).getTime() - nowTick) : 0;
  const sessionStillValid = sessionMsLeft > 0;
  const sessionSecondsLeft = sessionStillValid ? Math.floor(sessionMsLeft / 1000) : 0;
  const sessionMinutesLeft = Math.floor(sessionSecondsLeft / 60);
  const SESSION_TOTAL_SECONDS = 60 * 60; // 60 minute slot during this transition stage

  // SandTimer: a small sand-clock that drains as the 60 min session runs down.
  // fraction = seconds remaining / total. Renders the hourglass plus mm:ss.
  const SandTimer = ({secondsLeft, size=34, dark=false}) => {
    const total = SESSION_TOTAL_SECONDS;
    const frac = Math.max(0, Math.min(1, secondsLeft / total)); // 1 full, 0 empty
    const mm = String(Math.floor(secondsLeft / 60)).padStart(2,"0");
    const ss = String(secondsLeft % 60).padStart(2,"0");
    const topFill = frac;          // sand still in the top bulb
    const botFill = 1 - frac;      // sand collected in the bottom bulb
    const glassStroke = dark ? "#9BBCD6" : P.navy;
    const sandColor = secondsLeft <= 300 ? P.coral : P.teal; // turns coral in the last 5 minutes
    const txtColor = dark ? P.white : P.navy;
    return (
      <span style={{display:"inline-flex",alignItems:"center",gap:7}}>
        <svg width={size} height={size} viewBox="0 0 28 36" xmlns="http://www.w3.org/2000/svg" role="img" aria-label={`Session time remaining ${mm}:${ss}`}>
          {/* Frame caps */}
          <rect x="4" y="1.5" width="20" height="3" rx="1.2" fill={glassStroke}/>
          <rect x="4" y="31.5" width="20" height="3" rx="1.2" fill={glassStroke}/>
          {/* Glass outline */}
          <path d="M 6 4.5 L 22 4.5 L 15.4 18 L 22 31.5 L 6 31.5 L 14.6 18 Z" fill="none" stroke={glassStroke} strokeWidth="1.1" opacity="0.85"/>
          {/* Top sand: a triangle that shrinks toward the neck as time drains */}
          <path d={`M ${14-7*topFill} ${5} L ${14+7*topFill} ${5} L 14 ${5+12.5*topFill} Z`} fill={sandColor} opacity="0.92"/>
          {/* Falling grain */}
          {topFill>0 && botFill<1 && <line x1="14" y1="17" x2="14" y2="24" stroke={sandColor} strokeWidth="1" opacity="0.8"/>}
          {/* Bottom sand: a triangle that grows from the base */}
          <path d={`M 14 ${31 - 12.5*botFill} L ${14-7*botFill} 31 L ${14+7*botFill} 31 Z`} fill={sandColor} opacity="0.92"/>
        </svg>
        <span style={{fontFamily:"'SF Mono','Menlo',monospace",fontSize:11,fontWeight:800,color:txtColor,letterSpacing:0.5}}>{mm}:{ss}</span>
      </span>
    );
  };

  const validateAccessKey = (k) => {
    // Phase 1: any non-empty key issued by info@istructgroup.com is accepted client-side.
    // Format expected: ISG-XXXXX-XXXXX (8-15 chars total). This is a soft check. Phase 2 moves validation server-side.
    return typeof k === "string" && k.trim().length >= 6;
  };
  const grantSession = (k, durationMinutes=60) => {
    setToolsSession(s => ({...s, accessKey:k, keyValidUntil:new Date(Date.now() + durationMinutes*60000).toISOString()}));
  };

  const ToolsPage = () => (
    <div>
      {/* HERO: Tools Box */}
      <HeroBg color1={P.navy} color2={P.navyM}><div style={{padding:"44px 28px 36px"}}>
        <div style={{fontSize:9,fontWeight:700,letterSpacing:3,color:P.tealL,textTransform:"uppercase",marginBottom:10}}>Modular Apps · Secure Sessions · Free Preview</div>
        <h2 style={{fontFamily:"'Fraunces',serif",fontSize:30,fontWeight:800,color:P.white,margin:0,lineHeight:1.1}}>Tools Box</h2>
        <p style={{fontSize:12,color:"#9BBCD6",lineHeight:1.65,marginTop:10,maxWidth:680}}>A growing collection of iStructural apps for engineering, strategy, careers, and business decisions. Each app runs inside this site with a time-limited access key issued by request. Subscriptions and payment options coming later.</p>
        <div style={{display:"flex",gap:8,marginTop:18,flexWrap:"wrap",alignItems:"center"}}>
          {sessionStillValid ? (
            <div style={{padding:"6px 12px",borderRadius:7,background:P.greenD+"25",border:`1px solid ${P.tealL}40`,fontSize:10,fontWeight:700,color:"#7EE8DA",display:"flex",alignItems:"center",gap:8}}>
              <span>Session active</span>
              <SandTimer secondsLeft={sessionSecondsLeft} size={30} dark={true}/>
            </div>
          ) : (
            <div style={{padding:"6px 12px",borderRadius:7,background:P.coral+"20",color:"#FFD1C9",border:`1px solid ${P.coral}40`,fontSize:10,fontWeight:700}}>No active session · Request a 60 minute key on any app card</div>
          )}
        </div>
      </div></HeroBg>

      {/* ═══ TOP-OF-PAGE DISCLAIMER  covers current and future apps ═══ */}
      <div style={{padding:"10px 24px",background:P.navy,borderTop:`1px solid ${P.tealL}30`,borderBottom:`1px solid ${P.tealL}30`}}>
        <div style={{maxWidth:1100,margin:"0 auto",display:"flex",alignItems:"flex-start",gap:10,flexWrap:"wrap"}}>
          <span style={{fontSize:8,fontWeight:800,padding:"3px 8px",borderRadius:4,background:P.coral+"25",color:"#FFD1C9",border:`1px solid ${P.coral}60`,letterSpacing:1.5,textTransform:"uppercase",whiteSpace:"nowrap"}}>Disclaimer  Please Read</span>
          <div style={{flex:1,minWidth:240,fontSize:10,color:"#CFE0F0",lineHeight:1.55}}>
            Informational and decision-support use only. No professional advice. No guarantee. Confidentiality enforced. Apps may change at any time. By using any app you accept the terms.
          </div>
          <button onClick={()=>setToolsDisclaimerOpen(v=>!v)} {...kbd(()=>setToolsDisclaimerOpen(v=>!v))} aria-expanded={toolsDisclaimerOpen} aria-label="Toggle full disclaimer text" style={{padding:"4px 10px",borderRadius:6,background:"transparent",color:P.tealL,border:`1px solid ${P.tealL}40`,fontSize:9,fontWeight:700,cursor:"pointer",fontFamily:"inherit",letterSpacing:0.5}}>
            {toolsDisclaimerOpen ? "Hide full terms" : "Read full terms"}
          </button>
        </div>
        {toolsDisclaimerOpen && (
          <div style={{maxWidth:1100,margin:"10px auto 4px",padding:"12px 14px",borderRadius:8,background:P.navyM,border:`1px solid ${P.tealL}30`,fontSize:10,color:"#E2EBF5",lineHeight:1.7}}>
            <strong style={{color:P.tealL}}>Important disclaimer covering this page and every app on it, current and future.</strong> The Tools Box, and every app inside it, is provided by iStructural Group Inc. as an informational and decision-support resource only. Outputs are produced by software models and do not replace licensed professional advice (engineering, legal, financial, medical, immigration, or otherwise). iStructural Group Inc. makes no warranty of accuracy, fitness, or outcome. Apps may evolve, change, or be withdrawn at any time without notice. You remain solely responsible for any decisions made on the basis of any output. Confidentiality is enforced: inputs you submit are used only to deliver the requested output and to follow up. We do not share your data with third parties. By using any app, or by submitting any input or request through this page, you accept these terms.
          </div>
        )}
      </div>

      {/* ═══ OPEN TREASURE CHEST  neutral intelligence vibes; no app pointers inside ═══ */}
      {/* Visual proportion: same artwork as before, scaled down (380x280 -> 240x180) and section padding tightened */}
      <div style={{padding:"14px 24px 8px",background:`linear-gradient(180deg, ${P.navy} 0%, ${P.navy} 30%, ${P.sand} 100%)`,display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden"}}>
        {/* Caption above the chest */}
        <div style={{position:"absolute",top:8,left:0,right:0,textAlign:"center",pointerEvents:"none"}}>
          <div style={{fontSize:8,fontWeight:700,letterSpacing:3,color:P.tealL,textTransform:"uppercase",opacity:0.85}}>Open the box. Apps inside. More arriving as we draft them.</div>
        </div>
        <svg width="240" height="180" viewBox="0 0 380 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Antique open treasure chest with glowing intelligence inside" style={{filter:"drop-shadow(0 12px 20px rgba(0,0,0,0.55))"}}>
          <defs>
            {/* Aged plank gradient */}
            <linearGradient id="plankGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#A78256"/>
              <stop offset="55%" stopColor="#7A5A36"/>
              <stop offset="100%" stopColor="#4A3520"/>
            </linearGradient>
            {/* Inside (shadowed) gradient */}
            <linearGradient id="insideGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1A0F08"/>
              <stop offset="100%" stopColor="#0A0604"/>
            </linearGradient>
            {/* Iron band */}
            <linearGradient id="ironGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#5C5C5C"/>
              <stop offset="50%" stopColor="#2E2E2E"/>
              <stop offset="100%" stopColor="#1A1A1A"/>
            </linearGradient>
            {/* Light beam escaping */}
            <linearGradient id="lightBeam" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor={P.tealL} stopOpacity="0"/>
              <stop offset="50%" stopColor={P.tealL} stopOpacity="0.25"/>
              <stop offset="100%" stopColor={P.tealL} stopOpacity="0.45"/>
            </linearGradient>
            {/* Vibe glow */}
            <radialGradient id="apexGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={P.tealL} stopOpacity="0.95"/>
              <stop offset="60%" stopColor={P.teal} stopOpacity="0.35"/>
              <stop offset="100%" stopColor={P.teal} stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="argoGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F4C77A" stopOpacity="0.95"/>
              <stop offset="60%" stopColor="#C77A2A" stopOpacity="0.40"/>
              <stop offset="100%" stopColor="#C77A2A" stopOpacity="0"/>
            </radialGradient>
            {/* Wood grain pattern */}
            <pattern id="woodGrain" patternUnits="userSpaceOnUse" width="40" height="80">
              <rect width="40" height="80" fill="url(#plankGrad)"/>
              <path d="M0 20 Q 10 18, 20 22 T 40 20" stroke="#3D2810" strokeWidth="0.6" fill="none" opacity="0.55"/>
              <path d="M0 40 Q 12 38, 22 42 T 40 40" stroke="#3D2810" strokeWidth="0.5" fill="none" opacity="0.4"/>
              <path d="M0 62 Q 8 60, 18 64 T 40 62" stroke="#3D2810" strokeWidth="0.6" fill="none" opacity="0.5"/>
            </pattern>
          </defs>

          {/* Escaping light beam from chest interior */}
          <path d="M 110 150 L 80 30 L 300 30 L 270 150 Z" fill="url(#lightBeam)" opacity="0.55"/>

          {/* Particles drifting up from the chest */}
          <g fill={P.tealL}>
            <circle cx="140" cy="80" r="1.2" opacity="0.75">
              <animate attributeName="cy" values="150;40" dur="4.5s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0;0.9;0" dur="4.5s" repeatCount="indefinite"/>
            </circle>
            <circle cx="200" cy="100" r="1.6" opacity="0.65">
              <animate attributeName="cy" values="150;30" dur="6s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0;0.95;0" dur="6s" repeatCount="indefinite"/>
            </circle>
            <circle cx="240" cy="90" r="1" opacity="0.8">
              <animate attributeName="cy" values="150;50" dur="5s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0;0.85;0" dur="5s" repeatCount="indefinite"/>
            </circle>
            <circle cx="170" cy="110" r="1.4" opacity="0.7">
              <animate attributeName="cy" values="150;60" dur="5.6s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0;0.9;0" dur="5.6s" repeatCount="indefinite"/>
            </circle>
            <circle cx="220" cy="120" r="1.1" opacity="0.6">
              <animate attributeName="cy" values="150;45" dur="6.5s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0;0.8;0" dur="6.5s" repeatCount="indefinite"/>
            </circle>
          </g>

          {/* Open lid (hinged backward, perspective foreshortened) */}
          <g transform="translate(0,0)">
            {/* Lid back (visible interior side) */}
            <path d="M 95 130 L 105 50 L 275 50 L 285 130 Z" fill="#1F1308" stroke="#3D2810" strokeWidth="1.5"/>
            {/* Lid inner planks (3 panels) */}
            <path d="M 120 70 L 260 70" stroke="#0A0604" strokeWidth="0.8" opacity="0.5"/>
            <path d="M 115 90 L 265 90" stroke="#0A0604" strokeWidth="0.8" opacity="0.5"/>
            <path d="M 110 110 L 270 110" stroke="#0A0604" strokeWidth="0.8" opacity="0.5"/>
            {/* Lid outer arch (visible top edge) */}
            <path d="M 95 130 Q 190 30, 285 130" stroke="#3D2810" strokeWidth="1.8" fill="none"/>
            {/* Iron strap on lid */}
            <path d="M 188 50 L 192 130" stroke="url(#ironGrad)" strokeWidth="6" fill="none"/>
            <circle cx="190" cy="56" r="2.2" fill="#C8B07A" stroke="#5A4520" strokeWidth="0.6"/>
            <circle cx="190" cy="124" r="2.2" fill="#C8B07A" stroke="#5A4520" strokeWidth="0.6"/>
          </g>

          {/* Chest body (front face, planks) */}
          <g>
            {/* Front face */}
            <path d="M 80 150 L 80 240 L 300 240 L 300 150 Z" fill="url(#woodGrain)" stroke="#3D2810" strokeWidth="1.8"/>
            {/* Side perspective panel (right) */}
            <path d="M 300 150 L 315 145 L 315 235 L 300 240 Z" fill="#4A3520" stroke="#3D2810" strokeWidth="1.5"/>
            {/* Chest interior visible at the top (dark opening) */}
            <path d="M 80 150 L 95 130 L 285 130 L 300 150 Z" fill="url(#insideGrad)" stroke="#3D2810" strokeWidth="1.5"/>

            {/* Iron horizontal bands on front face */}
            <rect x="78" y="172" width="224" height="6" fill="url(#ironGrad)"/>
            <rect x="78" y="210" width="224" height="6" fill="url(#ironGrad)"/>
            {/* Iron vertical strap */}
            <rect x="186" y="150" width="8" height="90" fill="url(#ironGrad)"/>
            {/* Brass nails on bands */}
            <g fill="#D9B873" stroke="#5A4520" strokeWidth="0.4">
              <circle cx="100" cy="175" r="1.6"/>
              <circle cx="140" cy="175" r="1.6"/>
              <circle cx="240" cy="175" r="1.6"/>
              <circle cx="280" cy="175" r="1.6"/>
              <circle cx="100" cy="213" r="1.6"/>
              <circle cx="140" cy="213" r="1.6"/>
              <circle cx="240" cy="213" r="1.6"/>
              <circle cx="280" cy="213" r="1.6"/>
            </g>
            {/* Brass lock plate */}
            <rect x="178" y="188" width="24" height="18" fill="#C8A24C" stroke="#5A4520" strokeWidth="0.8" rx="1.5"/>
            <rect x="186" y="195" width="8" height="6" fill="#1A1308" rx="1"/>
            <circle cx="190" cy="198" r="1.2" fill="#D9B873"/>

            {/* Wood plank grooves on front */}
            <line x1="80" y1="195" x2="186" y2="195" stroke="#3D2810" strokeWidth="0.6" opacity="0.5"/>
            <line x1="194" y1="195" x2="300" y2="195" stroke="#3D2810" strokeWidth="0.6" opacity="0.5"/>
            <line x1="80" y1="225" x2="300" y2="225" stroke="#3D2810" strokeWidth="0.6" opacity="0.5"/>

            {/* Aged wear (faint scuffs) */}
            <ellipse cx="115" cy="200" rx="14" ry="2.5" fill="#2A1A0A" opacity="0.18"/>
            <ellipse cx="265" cy="220" rx="12" ry="2" fill="#2A1A0A" opacity="0.18"/>
          </g>

          {/* ═══ NEUTRAL INTELLIGENCE VIBES INSIDE THE CHEST  no app pointers ═══ */}
          {/* Central halo of light */}
          <g transform="translate(190, 145)">
            <circle cx="0" cy="0" r="42" fill="url(#apexGlow)" opacity="0.55">
              <animate attributeName="r" values="38;46;38" dur="6s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.4;0.7;0.4" dur="6s" repeatCount="indefinite"/>
            </circle>
            {/* Drifting orbs (suggest many apps) */}
            <g fill={P.tealL} opacity="0.9">
              <circle cx="-22" cy="-8" r="2.2">
                <animate attributeName="cy" values="-10;-4;-10" dur="4.5s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.6;1;0.6" dur="4.5s" repeatCount="indefinite"/>
              </circle>
              <circle cx="-8" cy="-14" r="1.8">
                <animate attributeName="cy" values="-16;-10;-16" dur="5.2s" repeatCount="indefinite"/>
              </circle>
              <circle cx="6" cy="-10" r="2">
                <animate attributeName="cy" values="-12;-6;-12" dur="4.8s" repeatCount="indefinite"/>
              </circle>
              <circle cx="20" cy="-4" r="1.6">
                <animate attributeName="cy" values="-6;0;-6" dur="5.6s" repeatCount="indefinite"/>
              </circle>
              <circle cx="-14" cy="6" r="1.4" opacity="0.7">
                <animate attributeName="cy" values="4;10;4" dur="5s" repeatCount="indefinite"/>
              </circle>
              <circle cx="14" cy="8" r="1.8" opacity="0.8">
                <animate attributeName="cy" values="6;12;6" dur="5.4s" repeatCount="indefinite"/>
              </circle>
            </g>
            {/* Tiny faint glyphs: gear, book, chart  hint at the variety of apps inside */}
            <g opacity="0.45" stroke={P.tealL} strokeWidth="0.7" fill="none">
              {/* gear */}
              <g transform="translate(-30, 14)">
                <circle cx="0" cy="0" r="5"/>
                <circle cx="0" cy="0" r="2"/>
                <line x1="0" y1="-7" x2="0" y2="-5"/>
                <line x1="0" y1="5" x2="0" y2="7"/>
                <line x1="-7" y1="0" x2="-5" y2="0"/>
                <line x1="5" y1="0" x2="7" y2="0"/>
              </g>
              {/* book */}
              <g transform="translate(0, 22)">
                <path d="M -6 -3 L 0 -2 L 0 5 L -6 4 Z"/>
                <path d="M 6 -3 L 0 -2 L 0 5 L 6 4 Z"/>
              </g>
              {/* chart bars */}
              <g transform="translate(30, 14)">
                <line x1="-5" y1="5" x2="-5" y2="0"/>
                <line x1="-1" y1="5" x2="-1" y2="-3"/>
                <line x1="3" y1="5" x2="3" y2="-6"/>
              </g>
            </g>
            {/* Caption inside the chest */}
            <text x="0" y="-30" fontFamily="'Fraunces',serif" fontSize="7.5" fontWeight="800" fill={P.white} textAnchor="middle" letterSpacing="2.5" opacity="0.88">INTELLIGENCE INSIDE</text>
            <text x="0" y="-22" fontFamily="'DM Sans',sans-serif" fontSize="5.2" fill={P.tealL} textAnchor="middle" letterSpacing="1.6" opacity="0.85">MANY APPS  ALWAYS GROWING</text>
          </g>

          {/* Tiny brass plaque on the lid arch */}
          <rect x="160" y="38" width="60" height="12" fill="#C8A24C" stroke="#5A4520" strokeWidth="0.6" rx="1.5" opacity="0.92"/>
          <text x="190" y="46" fontFamily="'DM Sans',sans-serif" fontSize="6" fontWeight="700" fill="#3D2810" textAnchor="middle" letterSpacing="2.5">iSTRUCTURAL</text>

          {/* Ground shadow under chest */}
          <ellipse cx="190" cy="246" rx="130" ry="6" fill="#000" opacity="0.35"/>
        </svg>
      </div>

      {/* APP GRID: grouped by category */}
      <div style={{padding:"24px 24px 8px",background:P.sand}}>
        {[...new Set(toolsApps.map(a=>a.category))].map(cat => (
          <div key={cat} style={{marginBottom:22}}>
            <div style={{display:"flex",alignItems:"center",gap:10,padding:"8px 12px",borderRadius:8,background:P.charcoal+"08",border:`1px solid ${P.charcoal}15`,borderLeft:`4px solid ${P.teal}`,marginBottom:10}}>
              <span style={{fontFamily:"'SF Mono','Menlo',monospace",fontSize:8.5,fontWeight:700,letterSpacing:2,color:P.teal,background:P.teal+"15",border:`1px solid ${P.teal}30`,padding:"3px 8px",borderRadius:4,textTransform:"uppercase"}}>CAT</span>
              <div style={{flex:1}}>
                <div style={{fontSize:11,fontWeight:800,color:P.charcoal,fontFamily:"'Fraunces',serif"}}>{cat}</div>
                <div style={{fontSize:8.5,color:P.slate,marginTop:2}}>{toolsApps.filter(a=>a.category===cat).length} app(s) in this category</div>
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(250px, 1fr))",gap:10}}>
              {toolsApps.filter(a=>a.category===cat).map(app => (
                <div key={app.id} onClick={()=>setActiveApp(app)} {...kbd(()=>setActiveApp(app))} aria-label={`Open ${app.name}`}
                     style={{padding:"14px",borderRadius:10,background:P.white,border:`1px solid ${app.iconColor}25`,cursor:"pointer",transition:"all 0.18s",display:"flex",flexDirection:"column",gap:10,minHeight:170}}
                     onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow=`0 6px 18px ${app.iconColor}25`;}}
                     onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <div style={{width:48,height:48,borderRadius:11,background:`linear-gradient(135deg, ${app.iconColor} 0%, ${app.iconColor}CC 100%)`,display:"flex",alignItems:"center",justifyContent:"center",color:P.white,fontFamily:"'Fraunces',serif",fontSize:24,fontWeight:800,boxShadow:`0 3px 10px ${app.iconColor}40`,position:"relative",overflow:"hidden"}}>
                      <div style={{position:"absolute",inset:0,opacity:0.18,backgroundImage:`radial-gradient(circle at 30% 30%, ${P.white}80 1px, transparent 1.5px), radial-gradient(circle at 70% 70%, ${P.white}50 1px, transparent 1.5px)`,backgroundSize:"12px 12px"}}></div>
                      <span style={{position:"relative",zIndex:1,display:"flex",alignItems:"center",justifyContent:"center"}}>
                        {app.icon ? <AppIcon id={app.icon} size={26} color={P.white} accent={P.tealL}/> : app.iconLetter}
                      </span>
                    </div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:12,fontWeight:800,color:P.charcoal}}>{app.name}</div>
                      <div style={{fontSize:8.5,color:P.slate,marginTop:1}}>{app.tagline}</div>
                    </div>
                  </div>
                  <div style={{fontSize:9.5,color:P.charcoal,lineHeight:1.55,flex:1}}>{app.shortDesc}</div>

                  {/* Session status line on the card */}
                  {app.requiresKey && (
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8,padding:"6px 8px",borderRadius:7,background:sessionStillValid ? P.greenD+"12" : P.s4+"12",border:`1px solid ${sessionStillValid ? P.greenD+"35" : P.s4+"35"}`}}>
                      {sessionStillValid ? (
                        <>
                          <span style={{fontSize:8,fontWeight:800,color:P.greenD,textTransform:"uppercase",letterSpacing:0.8}}>Session live</span>
                          <SandTimer secondsLeft={sessionSecondsLeft} size={26} dark={false}/>
                        </>
                      ) : (
                        <>
                          <span style={{fontSize:8.5,fontWeight:700,color:P.charcoal}}>60 min key required</span>
                          <span style={{fontSize:8,color:P.slate}}>Free  transition stage</span>
                        </>
                      )}
                    </div>
                  )}

                  {/* Action buttons */}
                  <div style={{display:"flex",alignItems:"center",gap:6}}>
                    {app.requiresKey && !sessionStillValid && (
                      <button
                        onClick={(e)=>{ e.stopPropagation(); setActiveApp(app); }}
                        {...kbd(()=>setActiveApp(app))}
                        aria-label={`Request a 60 minute key for ${app.name}`}
                        style={{flex:1,fontSize:9.5,fontWeight:800,padding:"8px 10px",borderRadius:8,background:app.iconColor,color:P.white,border:"none",cursor:"pointer",fontFamily:"inherit",letterSpacing:0.3}}>
                        Request 60-min key
                      </button>
                    )}
                    <button
                      onClick={(e)=>{ e.stopPropagation(); setActiveApp(app); }}
                      {...kbd(()=>setActiveApp(app))}
                      aria-label={`Open ${app.name}`}
                      style={{flex:1,fontSize:9.5,fontWeight:800,padding:"8px 10px",borderRadius:8,background:(app.requiresKey && !sessionStillValid) ? "transparent" : app.iconColor,color:(app.requiresKey && !sessionStillValid) ? app.iconColor : P.white,border:`1px solid ${app.iconColor}`,cursor:"pointer",fontFamily:"inherit",letterSpacing:0.3}}>
                      {sessionStillValid ? "Open app ↗" : "View details"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ═══ BRIEFING REQUEST FORM (bottom of Tools Box page) ═══ */}
      <BriefingRequestForm apps={toolsApps} accepted={toolsDisclaimerAccepted} setAccepted={setToolsDisclaimerAccepted} />

      {/* ═══ APP DETAIL MODAL ═══ */}
      {activeApp && <AppDetailModal app={activeApp} onClose={()=>setActiveApp(null)} />}
    </div>
  );

  // ══════════════════════ BRIEFING REQUEST FORM ══════════════════════
  // Sits at the bottom of the Tools Box page. User picks any app from the
  // dropdown (sourced dynamically from toolsApps) and submits a request.
  // Routed through info@istructgroup.com via the existing FormSubmit pipeline
  // shared with all Start a Project forms. No briefing files are auto served;
  // every briefing is issued on request by the iStructural team.
  const BriefingRequestForm = ({apps, accepted, setAccepted}) => {
    const {values, set, status, submit, captcha} = useForm({
      _subject:"iStructural | Tools Box  Capabilities Briefing Request",
      app:"", contact:"", role:"", company:"", email:"", phone:"",
      country:"", audience:"", urgency:"", notes:""
    });
    return (
      <div style={{padding:"28px 24px 36px",background:`linear-gradient(180deg, ${P.sand} 0%, ${P.s2L} 100%)`,borderTop:`1px solid ${P.charcoal}15`}}>
        <div style={{maxWidth:760,margin:"0 auto",background:P.white,borderRadius:14,boxShadow:`0 8px 26px ${P.navy}1A`,overflow:"hidden",border:`1px solid ${P.teal}25`}}>
          {/* Header banner */}
          <div style={{padding:"14px 22px",background:`linear-gradient(135deg, ${P.navy} 0%, ${P.navyM} 100%)`,color:P.white}}>
            <div style={{fontSize:9,fontWeight:700,letterSpacing:3,color:P.tealL,textTransform:"uppercase"}}>Request a Capabilities Briefing</div>
            <h3 style={{fontSize:18,fontWeight:800,fontFamily:"'Fraunces',serif",margin:"4px 0 0"}}>Tell us which app you want a briefing for</h3>
            <p style={{fontSize:10.5,color:"#9BBCD6",marginTop:4,lineHeight:1.6}}>Briefings are issued on request, tailored to your role and audience. Our team replies from <strong style={{color:P.tealL}}>info@istructgroup.com</strong>, typically within one business day.</p>
          </div>

          <form onSubmit={submit} style={{padding:"18px 22px"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              {/* App pulled from registry */}
              <div style={{gridColumn:"1 / -1"}}>
                <label style={labelStyle}>Which app do you want a briefing for? *</label>
                <select required style={inputStyle} value={values.app} onChange={set("app")} aria-label="App selection">
                  <option value="">Select an app...</option>
                  {apps.map(a => (
                    <option key={a.id} value={a.name}>{a.name}  {a.tagline}</option>
                  ))}
                  <option value="Other / Multiple">Other / Multiple (specify in notes)</option>
                </select>
              </div>

              {/* Contact details */}
              <div>
                <label style={labelStyle}>Full Name *</label>
                <input required style={inputStyle} value={values.contact} onChange={set("contact")} placeholder="e.g. Jane Smith" aria-label="Full name" />
              </div>
              <div>
                <label style={labelStyle}>Role / Title *</label>
                <input required style={inputStyle} value={values.role} onChange={set("role")} placeholder="e.g. Senior Structural Engineer" aria-label="Role or title" />
              </div>
              <div>
                <label style={labelStyle}>Company / Organization</label>
                <input style={inputStyle} value={values.company} onChange={set("company")} placeholder="e.g. ABC Consulting" aria-label="Company or organization" />
              </div>
              <div>
                <label style={labelStyle}>Country / City</label>
                <input style={inputStyle} value={values.country} onChange={set("country")} placeholder="e.g. UAE  Dubai" aria-label="Country and city" />
              </div>
              <div>
                <label style={labelStyle}>Email Address *</label>
                <input required type="email" style={inputStyle} value={values.email} onChange={set("email")} placeholder="your@email.com" aria-label="Email address" />
              </div>
              <div>
                <label style={labelStyle}>Phone (optional)</label>
                <input type="tel" style={inputStyle} value={values.phone} onChange={set("phone")} placeholder="+1 555 123 4567" aria-label="Phone number" />
              </div>

              {/* Audience and urgency */}
              <div>
                <label style={labelStyle}>I am a *</label>
                <select required style={inputStyle} value={values.audience} onChange={set("audience")} aria-label="Audience">
                  <option value="">Select audience...</option>
                  <option>Student / Early Career</option>
                  <option>Mid Career Professional</option>
                  <option>Executive / Senior Leader</option>
                  <option>Engineer / Technical Specialist</option>
                  <option>Owner / Project Manager</option>
                  <option>Educator / Trainer</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Urgency</label>
                <select style={inputStyle} value={values.urgency} onChange={set("urgency")} aria-label="Urgency">
                  <option value="">No rush</option>
                  <option>Within 24 hours</option>
                  <option>Within this week</option>
                  <option>Within this month</option>
                </select>
              </div>

              {/* Notes */}
              <div style={{gridColumn:"1 / -1"}}>
                <label style={labelStyle}>What do you want covered in the briefing?</label>
                <textarea style={textareaStyle} value={values.notes} onChange={set("notes")} placeholder="Optional. Mention any specific use case, audience, format preference, or questions you want the briefing to answer." aria-label="Briefing notes" />
              </div>
            </div>

            <CaptchaBlock captcha={captcha} status={status} />

            {/* Hard-stop disclaimer (covers current and future apps) */}
            <div style={{marginTop:12,padding:"12px 14px",borderRadius:8,background:P.coral+"10",border:`1px solid ${P.coral}45`}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                <span style={{fontSize:8,fontWeight:800,padding:"2px 6px",borderRadius:4,background:P.coral+"30",color:P.coral,border:`1px solid ${P.coral}60`,letterSpacing:1.4,textTransform:"uppercase"}}>Disclaimer  Please Read</span>
                <span style={{fontSize:9.5,color:P.charcoal,fontWeight:700}}>Covers this page and every app on it, current and future.</span>
              </div>
              <div style={{fontSize:9.5,color:P.charcoal,lineHeight:1.65}}>
                The Tools Box, and every app inside it, is provided by iStructural Group Inc. as an informational and decision-support resource only. Outputs are produced by software models and do not replace licensed professional advice (engineering, legal, financial, medical, immigration, or otherwise). iStructural Group Inc. makes no warranty of accuracy, fitness, or outcome. Apps may evolve, change, or be withdrawn at any time without notice. You remain solely responsible for any decisions made on the basis of any output. Confidentiality is enforced: inputs you submit are used only to deliver the requested output and to follow up. We do not share your data with third parties.
              </div>
              <label style={{display:"flex",alignItems:"flex-start",gap:8,marginTop:10,cursor:"pointer"}}>
                <input type="checkbox" checked={!!accepted} onChange={(e)=>setAccepted(e.target.checked)} aria-label="Accept disclaimer" style={{marginTop:3}} />
                <span style={{fontSize:10,color:P.charcoal,fontWeight:600,lineHeight:1.55}}>I have read the disclaimer above and I accept the terms. *</span>
              </label>
            </div>

            <button type="submit" disabled={status==="sending"||status==="success"||!accepted} style={{...submitStyle(P.teal), opacity:(!accepted ? 0.55 : 1), cursor:(!accepted ? "not-allowed" : "pointer")}}>
              {status==="sending" ? "Sending..." : status==="success" ? "Received | we will be in touch" : (accepted ? "Submit Briefing Request" : "Accept the disclaimer to enable submit")}
            </button>
            <FormStatus status={status} color={P.teal} />

            <div style={{marginTop:10,fontSize:9,color:P.slate,fontStyle:"italic",lineHeight:1.5}}>
              By submitting you confirm you have read the iStructural privacy posture. Your details are used only to deliver the requested briefing and to follow up on the request. We do not share your information with third parties.
            </div>
          </form>
        </div>
      </div>
    );
  };

  // ══════════════════════ APP DETAIL MODAL ══════════════════════
  // Opens when a user clicks an app card on ToolsPage. Renders full capabilities depth,
  // intake form bound to FormSubmit (same pattern as S1Form), access-key gate, and
  // download links to the saved capabilities briefing files.
  const AppDetailModal = ({app, onClose}) => {
    const [keyInput, setKeyInput] = useState("");
    const [keyError, setKeyError] = useState("");
    const [intake, setIntake] = useState({});
    const [submitStatus, setSubmitStatus] = useState("idle");
    const setIntakeField = (k) => (e) => setIntake(prev => ({...prev, [k]: e.target.value}));

    const chipColor = (t) => t==="green" ? P.greenD : t==="yellow" ? P.s4 : t==="blue" ? P.s2 : P.slate;
    const chipFill  = (t) => (chipColor(t))+"15";

    const tryUnlock = () => {
      if (validateAccessKey(keyInput)) { grantSession(keyInput.trim(), 60); setKeyError(""); }
      else { setKeyError("Access key invalid. Request a key from info@istructgroup.com"); }
    };

    const submitIntake = async (e) => {
      e.preventDefault();
      const required = app.intakeFields.filter(f=>f.required);
      const missing = required.filter(f => !(intake[f.key]||"").trim());
      if (missing.length) { setSubmitStatus("error"); return; }
      setSubmitStatus("sending");
      try {
        const body = new FormData();
        body.append("_subject", `iStructural | ${app.name} run request`);
        body.append("app", app.name);
        body.append("tagline", app.tagline);
        Object.keys(intake).forEach(k => body.append(k, intake[k]));
        body.append("session_key", toolsSession.accessKey || "");
        const res = await fetch("https://formsubmit.co/ajax/info@istructgroup.com", { method:"POST", body });
        if (res.ok) setSubmitStatus("success"); else setSubmitStatus("error");
      } catch (err) { setSubmitStatus("error"); }
    };

    return (
      <div role="dialog" aria-modal="true" aria-label={`${app.name} detail`}
           onClick={(e)=>{ if(e.target===e.currentTarget) onClose(); }}
           style={{position:"fixed",inset:0,zIndex:1200,background:"rgba(11,37,69,0.78)",backdropFilter:"blur(5px)",overflowY:"auto",padding:"24px 12px"}}>
        <div style={{maxWidth:920,margin:"0 auto",background:P.white,borderRadius:14,boxShadow:"0 24px 60px rgba(0,0,0,0.45)",overflow:"hidden"}}>
          {/* Modal header */}
          <div style={{padding:"18px 22px",background:`linear-gradient(135deg, ${P.navy} 0%, ${P.navyM} 100%)`,color:P.white,display:"flex",alignItems:"center",gap:14}}>
            <div style={{width:48,height:48,borderRadius:11,background:`linear-gradient(135deg, ${app.iconColor} 0%, ${app.iconColor}CC 100%)`,display:"flex",alignItems:"center",justifyContent:"center",color:P.white,fontFamily:"'Fraunces',serif",fontSize:24,fontWeight:800}}>
              {app.icon ? <AppIcon id={app.icon} size={28} color={P.white} accent={P.tealL}/> : app.iconLetter}
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:18,fontWeight:800,fontFamily:"'Fraunces',serif"}}>{app.name}</div>
              <div style={{fontSize:10.5,color:P.tealL,marginTop:2}}>{app.tagline}</div>
            </div>
            <button onClick={onClose} aria-label="Close" style={{width:32,height:32,borderRadius:8,background:"transparent",border:`1px solid ${P.tealL}40`,color:P.white,fontSize:16,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>×</button>
          </div>

          {/* Sub banner */}
          <div style={{padding:"10px 22px",background:P.teal,color:P.white,fontSize:10.5,fontWeight:700,letterSpacing:0.3}}>
            From a job description to an executive grade application package in one run. No inferred experience. References dated. No em dashes. Three iterations stated.
          </div>

          {/* Per-modal disclaimer chip (covers current and future apps) */}
          <div style={{padding:"8px 22px",background:P.coral+"12",borderBottom:`1px solid ${P.coral}30`,display:"flex",alignItems:"flex-start",gap:8}}>
            <span style={{fontSize:8,fontWeight:800,padding:"2px 6px",borderRadius:4,background:P.coral+"30",color:P.coral,border:`1px solid ${P.coral}60`,letterSpacing:1.4,textTransform:"uppercase",whiteSpace:"nowrap"}}>Disclaimer</span>
            <div style={{flex:1,fontSize:9.5,color:P.charcoal,lineHeight:1.55}}>
              Informational use only. No professional advice. No guarantee of outcome. App content and behavior may change at any time. You remain solely responsible for any decisions made on the basis of any output. Confidentiality enforced. By submitting any input you accept the full terms shown at the top of the Tools Box page.
            </div>
          </div>

          <div style={{padding:"18px 22px",background:P.sand}}>

            {/* A. 8 Phase capability map */}
            {app.phases && (
              <div style={{background:P.white,borderRadius:10,border:`1px solid ${P.charcoal}15`,padding:"14px 16px",marginBottom:14}}>
                <div style={{fontSize:12,fontWeight:800,color:P.navy,marginBottom:8,fontFamily:"'Fraunces',serif"}}>A. {app.id==="ecios" ? "8 Phase Capability Map (APEX)" : "8 Phase Decision Pipeline (ARGO)"}</div>
                <div style={{display:"grid",gridTemplateColumns:"40px 1fr 2fr 60px",gap:6,fontSize:10}}>
                  <div style={{fontWeight:800,color:P.white,background:P.navy,padding:"5px 7px",borderRadius:4}}>#</div>
                  <div style={{fontWeight:800,color:P.white,background:P.navy,padding:"5px 7px",borderRadius:4}}>Phase</div>
                  <div style={{fontWeight:800,color:P.white,background:P.navy,padding:"5px 7px",borderRadius:4}}>What You Get</div>
                  <div style={{fontWeight:800,color:P.white,background:P.navy,padding:"5px 7px",borderRadius:4,textAlign:"center"}}>Status</div>
                  {app.phases.map((ph,i)=>(
                    <Fragment key={ph.n}>
                      <div style={{padding:"5px 7px",background:i%2===0?P.s2L:P.white,fontWeight:700,color:P.charcoal}}>{ph.n}</div>
                      <div style={{padding:"5px 7px",background:i%2===0?P.s2L:P.white,fontWeight:700,color:P.charcoal}}>{ph.name}</div>
                      <div style={{padding:"5px 7px",background:i%2===0?P.s2L:P.white,color:P.charcoal}}>{ph.get}</div>
                      <div style={{padding:"5px 7px",background:i%2===0?P.s2L:P.white,textAlign:"center"}}>
                        <span style={{fontSize:8.5,fontWeight:800,padding:"2px 6px",borderRadius:4,background:P.greenD+"20",color:P.greenD,border:`1px solid ${P.greenD}40`}}>READY</span>
                      </div>
                    </Fragment>
                  ))}
                </div>
              </div>
            )}

            {/* B. Capabilities bullets (always shown) */}
            <div style={{background:P.white,borderRadius:10,border:`1px solid ${P.charcoal}15`,padding:"14px 16px",marginBottom:14}}>
              <div style={{fontSize:12,fontWeight:800,color:P.navy,marginBottom:8,fontFamily:"'Fraunces',serif"}}>B. Core Capabilities</div>
              <ul style={{margin:0,paddingLeft:18,fontSize:10.5,color:P.charcoal,lineHeight:1.65}}>
                {app.capabilities.map((c,i)=>(<li key={i} style={{marginBottom:3}}>{c}</li>))}
              </ul>
            </div>

            {/* C. Shortcuts */}
            {app.shortcuts && (
              <div style={{background:P.white,borderRadius:10,border:`1px solid ${P.charcoal}15`,padding:"14px 16px",marginBottom:14}}>
                <div style={{fontSize:12,fontWeight:800,color:P.navy,marginBottom:8,fontFamily:"'Fraunces',serif"}}>C. Trigger Shortcuts</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                  {app.shortcuts.map((s,i)=>(
                    <div key={i} style={{display:"flex",alignItems:"center",gap:6,padding:"5px 9px",borderRadius:7,background:chipFill(s.t),border:`1px solid ${chipColor(s.t)}40`}}>
                      <span style={{fontFamily:"'SF Mono','Menlo',monospace",fontSize:10,fontWeight:800,color:chipColor(s.t)}}>{s.k}</span>
                      <span style={{fontSize:9.5,color:P.charcoal}}>{s.a}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* D. Expected outputs */}
            {app.outputs && (
              <div style={{background:P.white,borderRadius:10,border:`1px solid ${P.charcoal}15`,padding:"14px 16px",marginBottom:14}}>
                <div style={{fontSize:12,fontWeight:800,color:P.navy,marginBottom:8,fontFamily:"'Fraunces',serif"}}>D. Expected Outputs Per Run</div>
                <div style={{display:"grid",gridTemplateColumns:"1.4fr 1.2fr 2.4fr",gap:5,fontSize:10}}>
                  <div style={{fontWeight:800,color:P.white,background:P.navy,padding:"5px 7px",borderRadius:4}}>File</div>
                  <div style={{fontWeight:800,color:P.white,background:P.navy,padding:"5px 7px",borderRadius:4}}>Format</div>
                  <div style={{fontWeight:800,color:P.white,background:P.navy,padding:"5px 7px",borderRadius:4}}>What It Contains</div>
                  {app.outputs.map((o,i)=>(
                    <Fragment key={i}>
                      <div style={{padding:"5px 7px",background:i%2===0?P.s2L:P.white,fontWeight:700,color:P.charcoal}}>{o.file}</div>
                      <div style={{padding:"5px 7px",background:i%2===0?P.s2L:P.white,color:P.charcoal}}>{o.fmt}</div>
                      <div style={{padding:"5px 7px",background:i%2===0?P.s2L:P.white,color:P.charcoal}}>{o.what}</div>
                    </Fragment>
                  ))}
                </div>
              </div>
            )}

            {/* E. Probability funnel */}
            {app.bars && (
              <div style={{background:P.white,borderRadius:10,border:`1px solid ${P.charcoal}15`,padding:"14px 16px",marginBottom:14}}>
                <div style={{fontSize:12,fontWeight:800,color:P.navy,marginBottom:8,fontFamily:"'Fraunces',serif"}}>E. {app.id==="ecios" ? "APEX Hiring Outcome Probability (illustrative)" : "ARGO Decision Probability (illustrative)"}</div>
                {app.bars.map((b,i)=>(
                  <div key={i} style={{display:"grid",gridTemplateColumns:"160px 1fr 50px",gap:8,alignItems:"center",marginBottom:5}}>
                    <div style={{fontSize:10,color:P.charcoal,fontWeight:600}}>{b.label}</div>
                    <div style={{height:12,borderRadius:6,background:P.charcoal+"10",overflow:"hidden"}}>
                      <div style={{height:"100%",width:`${b.pct}%`,background:`linear-gradient(90deg, ${P.teal} 0%, ${P.tealL} 100%)`,borderRadius:6}}></div>
                    </div>
                    <div style={{fontSize:10,color:P.charcoal,fontWeight:700,textAlign:"right"}}>{b.pct}%</div>
                  </div>
                ))}
                <div style={{fontSize:8.5,color:P.slate,marginTop:6,fontStyle:"italic"}}>Illustrative ranges. Each run produces user specific values from the engine.</div>
              </div>
            )}

            {/* F. Tips */}
            {app.tips && (
              <div style={{background:P.white,borderRadius:10,border:`1px solid ${P.charcoal}15`,padding:"14px 16px",marginBottom:14}}>
                <div style={{fontSize:12,fontWeight:800,color:P.navy,marginBottom:8,fontFamily:"'Fraunces',serif"}}>F. Tips to Get the Most Out of {app.name}</div>
                <div style={{display:"grid",gridTemplateColumns:"1.4fr 1fr",gap:5,fontSize:10}}>
                  <div style={{fontWeight:800,color:P.white,background:P.navy,padding:"5px 7px",borderRadius:4}}>Tip</div>
                  <div style={{fontWeight:800,color:P.white,background:P.navy,padding:"5px 7px",borderRadius:4}}>Why It Matters</div>
                  {app.tips.map((t,i)=>(
                    <Fragment key={i}>
                      <div style={{padding:"5px 7px",background:i%2===0?P.s2L:P.white,color:P.charcoal}}>{t.tip}</div>
                      <div style={{padding:"5px 7px",background:i%2===0?P.s2L:P.white,color:P.charcoal}}>{t.why}</div>
                    </Fragment>
                  ))}
                </div>
              </div>
            )}

            {/* G. Boundaries */}
            {app.boundaries && (
              <div style={{background:P.white,borderRadius:10,border:`1px solid ${P.coral}40`,padding:"14px 16px",marginBottom:14}}>
                <div style={{fontSize:12,fontWeight:800,color:P.coral,marginBottom:8,fontFamily:"'Fraunces',serif"}}>G. Boundaries: What {app.name} Will Not Do</div>
                <div style={{display:"grid",gridTemplateColumns:"1.2fr 1fr",gap:5,fontSize:10}}>
                  <div style={{fontWeight:800,color:P.white,background:P.coral,padding:"5px 7px",borderRadius:4}}>Will Not Do</div>
                  <div style={{fontWeight:800,color:P.white,background:P.coral,padding:"5px 7px",borderRadius:4}}>Why</div>
                  {app.boundaries.map((b,i)=>(
                    <Fragment key={i}>
                      <div style={{padding:"5px 7px",background:i%2===0?P.coral+"12":P.white,color:P.charcoal}}>{b.will}</div>
                      <div style={{padding:"5px 7px",background:i%2===0?P.coral+"12":P.white,color:P.charcoal}}>{b.why}</div>
                    </Fragment>
                  ))}
                </div>
              </div>
            )}

            {/* H. Briefing request hint (no in-modal download; request form lives at the bottom of the page) */}
            <div style={{background:P.s2L,borderRadius:10,border:`1px dashed ${P.s2}40`,padding:"10px 14px",marginBottom:14,color:P.charcoal,fontSize:10}}>
              Want a printed capabilities briefing for <strong>{app.name}</strong>? Briefings are issued on request. Scroll to the bottom of the Tools Box page and submit the Briefing Request form. Our team replies from <strong>info@istructgroup.com</strong>.
            </div>

            {/* I. Access key gate + intake */}
            <div style={{background:P.white,borderRadius:10,border:`1px solid ${P.teal}40`,padding:"14px 16px"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8,marginBottom:8,flexWrap:"wrap"}}>
                <div style={{fontSize:12,fontWeight:800,color:P.teal,fontFamily:"'Fraunces',serif"}}>Start a {app.name} Run</div>
                {sessionStillValid && (
                  <div style={{display:"flex",alignItems:"center",gap:7,padding:"4px 10px",borderRadius:7,background:P.greenD+"12",border:`1px solid ${P.greenD}35`}}>
                    <span style={{fontSize:8,fontWeight:800,color:P.greenD,textTransform:"uppercase",letterSpacing:0.8}}>Session</span>
                    <SandTimer secondsLeft={sessionSecondsLeft} size={28} dark={false}/>
                  </div>
                )}
              </div>

              {!sessionStillValid && (
                <div style={{padding:"10px 12px",borderRadius:8,background:P.s4+"15",border:`1px solid ${P.s4}40`,marginBottom:10}}>
                  <div style={{fontSize:10.5,color:P.charcoal,marginBottom:8}}>This app requires a time limited access key. During this transition stage every key unlocks a free <strong>60 minute</strong> session. Request a key, then paste it here to start the countdown.</div>
                  <a
                    href={`mailto:info@istructgroup.com?subject=${encodeURIComponent("iStructural Tools Box  60 minute key request  " + app.name)}&body=${encodeURIComponent("Hello iStructural team,\n\nPlease issue a 60 minute access key for the following app on the Tools Box page.\n\nApp: " + app.name + "\nTagline: " + app.tagline + "\n\nMy details:\nFull name: \nRole / title: \nCompany / organization: \nEmail: \nPhone (optional): \n\nThank you.")}`}
                    style={{display:"inline-block",padding:"9px 16px",borderRadius:8,background:P.teal,color:P.white,fontSize:10.5,fontWeight:800,textDecoration:"none",marginBottom:10,letterSpacing:0.3}}>
                    Request 60-min key by email
                  </a>
                  <div style={{fontSize:9,color:P.slate,marginBottom:8,lineHeight:1.5}}>The request goes to <strong>info@istructgroup.com</strong>. You can also use the Briefing and Access request form at the bottom of the Tools Box page.</div>
                  <div style={{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap"}}>
                    <input value={keyInput} onChange={(e)=>setKeyInput(e.target.value)} placeholder="Paste your key  e.g. ISG-XXXXX-XXXXX" aria-label="Access key" style={{flex:"1 1 220px",padding:"8px 10px",borderRadius:7,border:`1px solid ${P.charcoal}30`,fontSize:11,fontFamily:"inherit"}} />
                    <button onClick={tryUnlock} style={{padding:"8px 14px",borderRadius:7,background:P.navy,color:P.white,fontSize:10.5,fontWeight:700,border:"none",cursor:"pointer",fontFamily:"inherit"}}>Start 60-min session</button>
                  </div>
                  {keyError && <div style={{marginTop:6,fontSize:9.5,color:P.coral,fontWeight:600}}>{keyError}</div>}
                </div>
              )}

              {sessionStillValid && (
                <form onSubmit={submitIntake}>
                  {app.intakeFields.map(f=>(
                    <div key={f.key} style={{marginBottom:8}}>
                      <label style={{display:"block",fontSize:10,fontWeight:700,color:P.charcoal,marginBottom:3}}>{f.label}{f.required?" *":""}</label>
                      <textarea value={intake[f.key]||""} onChange={setIntakeField(f.key)} placeholder={f.placeholder} required={f.required} aria-label={f.label} style={{width:"100%",minHeight:80,padding:"8px 10px",borderRadius:7,border:`1px solid ${P.charcoal}30`,fontSize:10.5,fontFamily:"inherit",resize:"vertical",boxSizing:"border-box"}} />
                    </div>
                  ))}
                  <button type="submit" disabled={submitStatus==="sending"||submitStatus==="success"} style={{marginTop:4,padding:"10px 18px",borderRadius:8,background:app.iconColor,color:P.white,fontSize:11,fontWeight:800,border:"none",cursor:submitStatus==="success"?"default":"pointer",fontFamily:"inherit",letterSpacing:0.3}}>
                    {submitStatus==="sending" ? "Sending..." : submitStatus==="success" ? "Received | we will be in touch" : `Submit ${app.name} Run`}
                  </button>
                  {submitStatus==="error" && <div style={{marginTop:6,fontSize:10,color:P.coral,fontWeight:600}}>Please complete the required fields and try again.</div>}
                  {submitStatus==="success" && <div style={{marginTop:6,fontSize:10,color:P.greenD,fontWeight:600}}>Run request received. Our team will follow up by email with your output package.</div>}
                </form>
              )}
            </div>

            {/* Footer banner */}
            <div style={{marginTop:14,padding:"10px 14px",borderRadius:8,background:P.teal,color:P.white,fontSize:9.5,fontWeight:700,letterSpacing:0.3}}>
              {app.id==="ecios"
                ? "APEX. Three iterations stated. References dated. No em dashes. One A4 cover letter. Multi vendor ATS. Mission vision values. Twelve interview scenarios. Full report in DOCX and PDF."
                : "ARGO. Three iterations stated. References dated. No em dashes. Eight phase decision pipeline. Risk math P x I x D. Delivery and commercial ranking. Win probability. Full dashboard in DOCX and PDF."}
            </div>

          </div>
        </div>
      </div>
    );
  };

  // ══════════════════════ PROJECTS ══════════════════════
  const ProjectsPage=()=>(
    <div>
      <HeroBg color1={P.navy}><div style={{padding:"28px 28px 24px"}}>
        <div style={{fontSize:9,fontWeight:700,letterSpacing:3,color:P.tealL,textTransform:"uppercase"}}>Selected Portfolio</div>
        <h2 style={{fontFamily:"'Fraunces',serif",fontSize:24,fontWeight:800,color:P.white,margin:"6px 0 0"}}>Projects</h2>
        <p style={{fontSize:10,color:"#9BBCD6",marginTop:4,maxWidth:680,lineHeight:1.6}}>A curated selection of representative projects across buildings, bridges, and infrastructure in the UAE, KSA, Qatar, Lebanon, and internationally.</p>
      </div></HeroBg>
      <div style={{padding:"10px 24px 6px",background:P.sand,display:"flex",gap:16,alignItems:"center",borderBottom:"1px solid #e0e0e0",flexWrap:"wrap"}}>
        <div style={{display:"flex",gap:4,alignItems:"center"}}>
          <span style={{fontSize:9,color:P.slate,fontWeight:600}}>Type:</span>
          {cats.map(c=><div key={c} onClick={()=>{setPCat(c);setShowAll(false);}} {...kbd(()=>{setPCat(c);setShowAll(false);})} aria-pressed={pCat===c} aria-label={`Filter category: ${c}`} style={{padding:"4px 10px",borderRadius:6,fontSize:9.5,fontWeight:600,cursor:"pointer",background:pCat===c?P.charcoal:"transparent",color:pCat===c?P.white:P.slate,border:`1px solid ${pCat===c?P.charcoal:"#ccc"}`}}>{c}</div>)}
        </div>
        <div style={{display:"flex",gap:4,alignItems:"center"}}>
          <span style={{fontSize:9,color:P.slate,fontWeight:600}}>Region:</span>
          {regions.map(r=><div key={r} onClick={()=>{setPReg(r);setShowAll(false);}} {...kbd(()=>{setPReg(r);setShowAll(false);})} aria-pressed={pReg===r} aria-label={`Filter region: ${r}`} style={{padding:"4px 10px",borderRadius:6,fontSize:9.5,fontWeight:600,cursor:"pointer",background:pReg===r?P.charcoal:"transparent",color:pReg===r?P.white:P.slate,border:`1px solid ${pReg===r?P.charcoal:"#ccc"}`}}>{r}</div>)}
        </div>
      </div>
      <div style={{padding:"8px 24px"}}>
        {/* Search box + result count */}
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10,flexWrap:"wrap"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,flex:"1 1 240px",background:P.white,border:`1px solid ${P.charcoal}1A`,borderRadius:8,padding:"6px 10px"}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={P.slate} strokeWidth="2.2" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
            <input value={projSearchQ} onChange={(e)=>{setProjSearchQ(e.target.value);setShowAll(false);}} placeholder="Search projects by name, type, region, country..." aria-label="Search projects" style={{border:"none",outline:"none",fontSize:11,flex:1,fontFamily:"inherit",color:P.charcoal,background:"transparent"}} />
            {projSearchQ && <button onClick={()=>setProjSearchQ("")} aria-label="Clear search" style={{border:"none",background:"transparent",cursor:"pointer",fontSize:14,color:P.slate,padding:0,fontFamily:"inherit"}}>×</button>}
          </div>
          <div style={{fontSize:9,color:P.slate,whiteSpace:"nowrap"}}>{filteredP.length} {filteredP.length===1?"project":"projects"} shown</div>
        </div>
        <div style={{fontSize:9,color:P.slate,marginBottom:6}}>Project details are shared after inquiry. Use the Inquire button on each row.</div>
        {displayed.map((p,i)=>(
          <div key={i} style={{display:"grid",gridTemplateColumns:"1fr 130px 110px 80px",gap:8,padding:"6px 10px",borderRadius:5,background:i%2===0?"#f8f9fa":"transparent",borderBottom:"1px solid #f2f2f2",alignItems:"center"}}>
            <div style={{fontSize:9.5,color:P.charcoal,lineHeight:1.4}}>{p.n}</div>
            <span style={{fontSize:7.5,fontWeight:600,padding:"2px 5px",borderRadius:5,background:(catCol[p.c]||P.slate)+"12",color:catCol[p.c]||P.slate,textAlign:"center"}}>{p.c}</span>
            <span style={{fontSize:8.5,color:P.slate,textAlign:"right",whiteSpace:"nowrap"}}>{p.country || p.r}</span>
            <button onClick={()=>setInquiryProj(p)} {...kbd(()=>setInquiryProj(p))} aria-label={`Inquire about ${p.n}`} style={{fontSize:8.5,fontWeight:700,padding:"5px 10px",borderRadius:6,background:P.teal,color:P.white,border:"none",cursor:"pointer",whiteSpace:"nowrap",fontFamily:"inherit"}}>Inquire →</button>
          </div>
        ))}
        {displayed.length===0 && <div style={{padding:"24px 0",fontSize:11,color:P.slate,textAlign:"center",fontStyle:"italic"}}>No projects match your search. Try clearing filters or simplifying the query.</div>}
        {!showAll&&filteredP.length>20&&<div onClick={()=>setShowAll(true)} {...kbd(()=>setShowAll(true))} aria-label="Show more projects" style={{marginTop:10,padding:"8px 16px",borderRadius:8,background:P.teal,color:P.white,fontSize:10,fontWeight:700,textAlign:"center",cursor:"pointer"}}>Show more projects</div>}
      </div>
    </div>
  );

  // ══════════════════════ TRAINING ══════════════════════
  const TrainingPage=()=>(
    <div>
      <HeroBg color1={P.s2}><div style={{padding:"28px 28px 24px"}}>
        <div style={{fontSize:9,fontWeight:700,letterSpacing:3,color:P.white+"80",textTransform:"uppercase"}}>Certified Training</div>
        <h2 style={{fontFamily:"'Fraunces',serif",fontSize:24,fontWeight:800,color:P.white,margin:"6px 0 0"}}>Training Programs</h2>
        <p style={{fontSize:10,color:P.white+"BB",marginTop:4}}>CSiAmerica Licensed Instructor since 2010. Over 1,400 engineers trained across MENA and North America. Advanced support for international firms.</p>
      </div></HeroBg>
      <div style={{padding:"18px 24px"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:7}}>
          {[{n:"ETABS",d:"Multi-story building. Lateral systems, P-delta, response spectrum.",sw:"ETABS (CSi)"},{n:"SAP2000",d:"General purpose. Linear/nonlinear, static/dynamic.",sw:"SAP2000 (CSi)"},{n:"CSiBridge",d:"Bridge modeling, staging, tendon layout, seismic.",sw:"CSiBridge (CSi)"},{n:"SAFE",d:"Slab and foundation. PT and RC. FEA + strip design.",sw:"SAFE (CSi)"},{n:"RAM Concept",d:"PT slab specialist. Tendon profiling, load balancing.",sw:"RAM Concept (Bentley Systems)"},{n:"ADAPT PT",d:"PT analysis. Continuous beam, one-way slab.",sw:"ADAPT PT (RISA Tech)"},{n:"Others",d:"Other third-party software. Specify on request.",sw:"Other"}].map((s,i)=>
            <div key={i} onClick={()=>{setPage("start");setSTab("s4");setTrainingSw(s.sw);}} {...kbd(()=>{setPage("start");setSTab("s4");setTrainingSw(s.sw);})} aria-label={`Request training for ${s.n}`} style={{padding:"12px 14px",borderRadius:8,background:P.s2L,border:`1px solid ${P.s2}15`,cursor:"pointer",transition:"all 0.2s"}}
              onMouseEnter={e=>{e.currentTarget.style.background=P.s2+"15";}}
              onMouseLeave={e=>{e.currentTarget.style.background=P.s2L;}}>
              <div style={{fontSize:11,fontWeight:700,color:P.s2}}>{s.n}</div>
              <div style={{fontSize:9,color:P.slate,marginTop:3,lineHeight:1.5}}>{s.d}</div>
            </div>)}
        </div>
        <div onClick={()=>{setPage("start");setSTab("s4");}} {...kbd(()=>{setPage("start");setSTab("s4");})} aria-label="Request Training" style={{marginTop:14,background:P.s2,color:P.white,padding:"9px 20px",borderRadius:8,fontSize:11,fontWeight:700,cursor:"pointer",display:"inline-block"}}>Request Training &#8594;</div>
      </div>
    </div>
  );

  // ══════════════════════ START A PROJECT | REAL FORMS ══════════════════════

  const S1Form = () => {
    const {values, set, status, submit, captcha} = useForm({
      _subject:"iStructural | Management & Business Inquiry",
      company:"", project:"", service:"", description:"", budget:"", timeline:"", contact:"", email:""
    });
    return (
      <form onSubmit={submit}>
        <div style={{fontSize:13,fontWeight:700,color:P.s1,marginBottom:6,fontFamily:"'Fraunces',serif"}}>Management & Business Support Inquiry</div>
        <div style={{fontSize:10,color:P.slate,marginBottom:14,lineHeight:1.6}}>Project management, strategy, risk, V.E., or ROI analysis. We respond with scope, timeline, and proposal within 24 hours.</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          <div>
            <label style={labelStyle}>Company / Organization *</label>
            <input required style={inputStyle} value={values.company} onChange={set("company")} placeholder="e.g. ABC Developments" aria-label="Company or organization" />
          </div>
          <div>
            <label style={labelStyle}>Project Name & Location *</label>
            <input required style={inputStyle} value={values.project} onChange={set("project")} placeholder="e.g. Tower A, Dubai" aria-label="Project name and location" />
          </div>
          <div>
            <label style={labelStyle}>Service Required *</label>
            <select required style={inputStyle} value={values.service} onChange={set("service")} aria-label="Service required">
              <option value="">Select a service...</option>
              <option>Project & Construction Management</option>
              <option>Business Strategy & Growth</option>
              <option>Risk & Financial Management</option>
              <option>Value Engineering (V.E.)</option>
              <option>ROI & Investment Analysis</option>
              <option>Other / Multiple</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Budget Range (optional)</label>
            <input style={inputStyle} value={values.budget} onChange={set("budget")} placeholder="e.g. USD 50K–200K" aria-label="Budget range" />
          </div>
          <div>
            <label style={labelStyle}>Timeline / Urgency</label>
            <input style={inputStyle} value={values.timeline} onChange={set("timeline")} placeholder="e.g. Start Q3 2026" aria-label="Timeline or urgency" />
          </div>
          <div>
            <label style={labelStyle}>Contact Name *</label>
            <input required style={inputStyle} value={values.contact} onChange={set("contact")} placeholder="Full name" aria-label="Contact name" />
          </div>
          <div style={{gridColumn:"1 / -1"}}>
            <label style={labelStyle}>Email Address *</label>
            <input required type="email" style={inputStyle} value={values.email} onChange={set("email")} placeholder="your@email.com" aria-label="Email address" />
          </div>
          <div style={{gridColumn:"1 / -1"}}>
            <label style={labelStyle}>Brief Description *</label>
            <textarea required style={textareaStyle} value={values.description} onChange={set("description")} placeholder="Describe your project, current challenges, and what you need from iStructural..." aria-label="Brief description" />
          </div>
        </div>
        <CaptchaBlock captcha={captcha} status={status} />
        <button type="submit" disabled={status==="sending"||status==="success"} style={submitStyle(P.s1)}>
          {status==="sending" ? "Sending..." : status==="success" ? "Received | we will be in touch" : "Submit Management Inquiry"}
        </button>
        <FormStatus status={status} color={P.s1} />
      </form>
    );
  };

  const S2Form = () => {
    const {values, set, status, submit, captcha} = useForm({
      _subject:"iStructural | Design & Consultancy Inquiry",
      company:"", project:"", service:"", structure:"", size:"", drawings:"", requirements:"", contact:"", email:""
    });
    return (
      <form onSubmit={submit}>
        <div style={{fontSize:13,fontWeight:700,color:P.s2,marginBottom:6,fontFamily:"'Fraunces',serif"}}>Design & Consultancy Inquiry</div>
        <div style={{fontSize:10,color:P.slate,marginBottom:14,lineHeight:1.6}}>Structural design, third-party review, seismic, PT, heritage, or training. We respond within 24 hours.</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          <div>
            <label style={labelStyle}>Company / Organization *</label>
            <input required style={inputStyle} value={values.company} onChange={set("company")} placeholder="e.g. XYZ Engineering" aria-label="Company or organization" />
          </div>
          <div>
            <label style={labelStyle}>Project Name & Location *</label>
            <input required style={inputStyle} value={values.project} onChange={set("project")} placeholder="e.g. Bridge X, Riyadh" aria-label="Project name and location" />
          </div>
          <div>
            <label style={labelStyle}>Service Type *</label>
            <select required style={inputStyle} value={values.service} onChange={set("service")} aria-label="Service required">
              <option value="">Select a service...</option>
              <option>Structural Design</option>
              <option>Seismic & Wind Engineering</option>
              <option>Nonlinear / Thermal Analysis</option>
              <option>Third-Party Review</option>
              <option>Structural Assessment Platform | Phase 1 (Preliminary Advisory)</option>
              <option>Structural Assessment Platform | Phase 2 (Stamped Engineering)</option>
              <option>Other / Multiple</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Structure Type *</label>
            <select required style={inputStyle} value={values.structure} onChange={set("structure")} aria-label="Structure type">
              <option value="">Select type...</option>
              <option>High-rise building (&gt;10 floors)</option>
              <option>Low/mid-rise building</option>
              <option>Bridge</option>
              <option>Heritage / existing structure</option>
              <option>Industrial / special structure</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Approximate Size / Height / Span</label>
            <input style={inputStyle} value={values.size} onChange={set("size")} placeholder="e.g. 42 floors, 160m height" aria-label="Approximate size, height, or span" />
          </div>
          <div>
            <label style={labelStyle}>Existing Drawings Available?</label>
            <select style={inputStyle} value={values.drawings} onChange={set("drawings")} aria-label="Existing drawings available">
              <option value="">Select...</option>
              <option>Yes | full set available</option>
              <option>Yes | partial drawings</option>
              <option>No | new design</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Contact Name *</label>
            <input required style={inputStyle} value={values.contact} onChange={set("contact")} placeholder="Full name" aria-label="Contact name" />
          </div>
          <div>
            <label style={labelStyle}>Email Address *</label>
            <input required type="email" style={inputStyle} value={values.email} onChange={set("email")} placeholder="your@email.com" aria-label="Email address" />
          </div>
          <div style={{gridColumn:"1 / -1"}}>
            <label style={labelStyle}>Special Requirements / Notes</label>
            <textarea style={textareaStyle} value={values.requirements} onChange={set("requirements")} placeholder="Standards, code jurisdiction, specific challenges, delivery timeline..." aria-label="Special requirements or notes" />
          </div>
        </div>
        <CaptchaBlock captcha={captcha} status={status} />
        <button type="submit" disabled={status==="sending"||status==="success"} style={submitStyle(P.s2)}>
          {status==="sending" ? "Sending..." : status==="success" ? "Received | we will be in touch" : "Submit Design Inquiry"}
        </button>
        <FormStatus status={status} color={P.s2} />
      </form>
    );
  };

  const S3Form = () => {
    const {values, set, status, submit, captcha} = useForm({
      _subject:"iStructural | AI & Technology Inquiry",
      company:"", topic:"", part:"", assetType:"", damageType:"", location:"", contact:"", email:"", notes:""
    });
    return (
      <form onSubmit={submit}>
        <div style={{fontSize:13,fontWeight:700,color:P.s3,marginBottom:6,fontFamily:"'Fraunces',serif"}}>AI & Technology | Start a Project</div>
        <div style={{fontSize:10,color:P.slate,marginBottom:12,lineHeight:1.6}}>AI literacy workshop, tool integration, or structural assessment platform. Select your path below.</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr",gap:8,marginBottom:12}}>
          <div style={{padding:"12px 14px",borderRadius:10,border:`1px solid ${P.s3b}20`,background:P.s3bL}}>
            <div style={{fontSize:11,fontWeight:700,color:P.s3b}}>AI Literacy & Readiness</div>
            <div style={{fontSize:9,color:P.slate,marginTop:3,lineHeight:1.5}}>AI 101 workshops, readiness assessment, tool selection, implementation support. For structural assessment requests, see the Design Inquiry intake form.</div>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          <div>
            <label style={labelStyle}>Company / Organization *</label>
            <input required style={inputStyle} value={values.company} onChange={set("company")} placeholder="e.g. City of Toronto" aria-label="Company or organization" />
          </div>
          <div>
            <label style={labelStyle}>Project Name or Workshop Topic *</label>
            <input required style={inputStyle} value={values.topic} onChange={set("topic")} placeholder="e.g. Bridge inspection, AI readiness" aria-label="Project name or workshop topic" />
          </div>
          <div style={{gridColumn:"1 / -1"}}>
            <label style={labelStyle}>Service Path *</label>
            <select required style={inputStyle} value={values.part} onChange={set("part")} aria-label="Service path">
              <option value="">Select your path...</option>
              <option>AI Literacy: AI 101 Workshop</option>
              <option>AI Literacy: Readiness Assessment</option>
              <option>AI Literacy: Tool Selection & Integration</option>
              <option>Implementation Support</option>
              <option>Cross-reference: Structural Assessment Platform | see Design intake</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Asset Type (if Part B)</label>
            <select style={inputStyle} value={values.assetType} onChange={set("assetType")} aria-label="Asset type">
              <option value="">Select if applicable...</option>
              <option>Residential building</option>
              <option>Commercial building</option>
              <option>Bridge</option>
              <option>Heritage / historic structure</option>
              <option>Airport / critical infrastructure</option>
              <option>Industrial</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Damage Type (if Part B)</label>
            <select style={inputStyle} value={values.damageType} onChange={set("damageType")} aria-label="Damage type">
              <option value="">Select if applicable...</option>
              <option>Post-earthquake / seismic</option>
              <option>Post-conflict / blast damage</option>
              <option>Age deterioration / corrosion</option>
              <option>Post-flood / fire</option>
              <option>Settlement / foundation</option>
              <option>Unknown / to be determined</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Project Location</label>
            <input style={inputStyle} value={values.location} onChange={set("location")} placeholder="City, country" aria-label="Project location" />
          </div>
          <div>
            <label style={labelStyle}>Contact Name *</label>
            <input required style={inputStyle} value={values.contact} onChange={set("contact")} placeholder="Full name" aria-label="Contact name" />
          </div>
          <div>
            <label style={labelStyle}>Email Address *</label>
            <input required type="email" style={inputStyle} value={values.email} onChange={set("email")} placeholder="your@email.com" aria-label="Email address" />
          </div>
          <div style={{gridColumn:"1 / -1"}}>
            <label style={labelStyle}>Additional Notes</label>
            <textarea style={textareaStyle} value={values.notes} onChange={set("notes")} placeholder="Any relevant context: urgency, team size, existing data, preferred language (EN/FR/AR)..." aria-label="Additional notes" />
          </div>
        </div>
        <CaptchaBlock captcha={captcha} status={status} />
        <button type="submit" disabled={status==="sending"||status==="success"} style={submitStyle(P.s3)}>
          {status==="sending" ? "Sending..." : status==="success" ? "Received | we will be in touch" : "Submit Project"}
        </button>
        <FormStatus status={status} color={P.s3} />
      </form>
    );
  };

  // ══════════════════════ S4 TRAINING FORM ══════════════════════
  const S4Form = () => {
    const {values, set, status, submit, captcha} = useForm({
      contact:"", email:"", company:"", teamSize:"",
      software: trainingSw || "", otherSwName:"", otherSwCompany:"",
      format:"", dates:"", notes:""
    });
    const showOther = values.software === "Other";
    return (
      <form onSubmit={submit}>
        <div style={{fontSize:13,fontWeight:700,color:P.s2,marginBottom:6,fontFamily:"'Fraunces',serif"}}>Training | CSi Licensed Instructor</div>
        <div style={{fontSize:9.5,color:P.slate,marginBottom:14,lineHeight:1.55}}>Join over 1,400 engineers who have completed our CSi-licensed curriculum since 2010. Corporate and university training on structural analysis software, tailored to your team and software focus.</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <div>
            <label style={labelStyle}>Contact Name *</label>
            <input required style={inputStyle} value={values.contact} onChange={set("contact")} placeholder="Full name" aria-label="Contact name" />
          </div>
          <div>
            <label style={labelStyle}>Email Address *</label>
            <input required type="email" style={inputStyle} value={values.email} onChange={set("email")} placeholder="your@email.com" aria-label="Email address" />
          </div>
          <div>
            <label style={labelStyle}>Company / Organization</label>
            <input style={inputStyle} value={values.company} onChange={set("company")} placeholder="Optional" aria-label="Company or organization (optional)" />
          </div>
          <div>
            <label style={labelStyle}>Team Size *</label>
            <select required style={inputStyle} value={values.teamSize} onChange={set("teamSize")} aria-label="Team size">
              <option value="">Select team size...</option>
              <option>1 to 5</option>
              <option>6 to 10</option>
              <option>11 to 20</option>
              <option>21 to 50</option>
              <option>50 or more</option>
            </select>
          </div>
          <div style={{gridColumn:"1 / -1"}}>
            <label style={labelStyle}>Software Program (primary focus) *</label>
            <select required style={inputStyle} value={values.software} onChange={set("software")} aria-label="Software for training">
              <option value="">Select software...</option>
              <option>ETABS (CSi)</option>
              <option>SAP2000 (CSi)</option>
              <option>CSiBridge (CSi)</option>
              <option>SAFE (CSi)</option>
              <option>RAM Concept (Bentley Systems)</option>
              <option>ADAPT PT (RISA Tech)</option>
              <option>Other</option>
            </select>
          </div>
          {showOther && (
            <>
              <div>
                <label style={labelStyle}>Other Software Name *</label>
                <input required={showOther} style={inputStyle} value={values.otherSwName} onChange={set("otherSwName")} placeholder="e.g. STAAD.Pro, Tekla, Robot..." aria-label="Other software name" />
              </div>
              <div>
                <label style={labelStyle}>Software Company *</label>
                <input required={showOther} style={inputStyle} value={values.otherSwCompany} onChange={set("otherSwCompany")} placeholder="e.g. Bentley Systems, Trimble, Autodesk..." aria-label="Other software vendor" />
              </div>
            </>
          )}
          <div>
            <label style={labelStyle}>Training Format *</label>
            <select required style={inputStyle} value={values.format} onChange={set("format")} aria-label="Training format">
              <option value="">Select format...</option>
              <option>In-person</option>
              <option>Online live</option>
              <option>Hybrid</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Preferred Dates / Timing</label>
            <input style={inputStyle} value={values.dates} onChange={set("dates")} placeholder="e.g. Q3 2026, weekends only..." aria-label="Preferred training dates" />
          </div>
          <div style={{gridColumn:"1 / -1"}}>
            <label style={labelStyle}>Additional Notes</label>
            <textarea style={textareaStyle} value={values.notes} onChange={set("notes")} placeholder="Skill levels, learning objectives, certifications needed, language preference (EN/FR/AR)..." aria-label="Training notes" />
          </div>
        </div>
        <CaptchaBlock captcha={captcha} status={status} />
        <button type="submit" disabled={status==="sending"||status==="success"} style={submitStyle(P.s2)}>
          {status==="sending" ? "Sending..." : status==="success" ? "Received | we will be in touch" : "Request Training"}
        </button>
        <FormStatus status={status} color={P.s2} />
      </form>
    );
  };

  const StartPage=()=>(
    <div>
      <div style={{background:P.navy,padding:"28px 28px 22px"}}>
        <h2 style={{fontFamily:"'Fraunces',serif",fontSize:24,fontWeight:800,color:P.white,margin:0}}>Start a Project</h2>
        <p style={{fontSize:10,color:"#9BBCD6",marginTop:4}}>Choose your service. We respond within 24 hours with scope, timeline, and proposal.</p>
      </div>
      <div style={{display:"flex",gap:0,borderBottom:"1px solid #e0e0e0"}}>
        {[{id:"s1",l:"Management & Business",c:P.s1},{id:"s2",l:"Design & Consultancy",c:P.s2},{id:"s3",l:"AI & Technology",c:P.s3},{id:"s4",l:"Training",c:P.s2}].map(t=>
          <div key={t.id} onClick={()=>setSTab(t.id)} {...kbd(()=>setSTab(t.id))} role="tab" aria-selected={sTab===t.id} aria-label={t.l} style={{flex:1,padding:"10px 14px",textAlign:"center",cursor:"pointer",borderBottom:sTab===t.id?`3px solid ${t.c}`:"3px solid transparent",background:sTab===t.id?t.c+"08":"transparent",fontSize:10.5,fontWeight:sTab===t.id?700:500,color:sTab===t.id?t.c:P.slate,transition:"all 0.2s"}}>{t.l}</div>)}
      </div>
      <div style={{padding:"20px 24px"}}>
        {sTab==="s1" && <S1Form />}
        {sTab==="s2" && <S2Form />}
        {sTab==="s3" && <S3Form />}
        {sTab==="s4" && <S4Form />}
      </div>
    </div>
  );

  // ══════════════════════ PROJECT INQUIRY MODAL ══════════════════════
  const ProjectInquiryModal = ({project, onClose}) => {
    const captcha = useCaptcha();
    const [status, setStatus] = useState("idle");
    const [values, setValues] = useState({message:"", company:"", website:"", contact:"", email:"", phone:""});
    const set = (k) => (e) => setValues({...values, [k]: e.target.value});

    const nameOK = values.contact.trim().length > 1;
    const contactOK = values.email.trim().length > 3 || values.phone.trim().length > 5;
    const canSubmit = captcha.verified && nameOK && contactOK;

    const onSubmit = async (e) => {
      e.preventDefault();
      if (!canSubmit) return;
      setStatus("sending");
      try {
        const subject = `Project Inquiry — ${project.n}`;
        const body = {
          _subject: subject,
          project_name: project.n,
          project_type: project.c,
          project_region: project.r,
          project_country: project.country || "",
          project_year: project.y || "",
          message: values.message,
          company: values.company,
          website: values.website,
          name: values.contact,
          email: values.email,
          phone: values.phone,
        };
        const res = await fetch(FORMSPREE_URL, {method:"POST", headers:{"Content-Type":"application/json","Accept":"application/json"}, body:JSON.stringify(body)});
        if (res.ok) setStatus("success");
        else setStatus("error");
      } catch (err) { setStatus("error"); }
    };

    return (
      <div role="dialog" aria-modal="true" aria-label={`Inquiry about ${project.n}`}
           onClick={(e)=>{ if(e.target===e.currentTarget) onClose(); }}
           onKeyDown={(e)=>{ if(e.key==='Escape') onClose(); }}
           tabIndex={-1}
           style={{position:"fixed",inset:0,zIndex:1010,background:"rgba(15,24,40,0.78)",backdropFilter:"blur(4px)",display:"flex",alignItems:"flex-start",justifyContent:"center",padding:"40px 16px",overflowY:"auto"}}>
        <div style={{position:"relative",width:"100%",maxWidth:580,background:P.sand,borderRadius:12,boxShadow:"0 20px 60px rgba(0,0,0,0.55)",overflow:"hidden",animation:"fadeUp 0.22s ease-out"}}>
          <div style={{height:4,background:P.teal}}></div>
          <button onClick={onClose} aria-label="Close inquiry" style={{position:"absolute",top:14,right:14,width:32,height:32,borderRadius:8,background:P.white,border:`1px solid ${P.charcoal}25`,cursor:"pointer",fontSize:16,color:P.charcoal,fontWeight:700,zIndex:2,fontFamily:"inherit"}}>×</button>
          <div style={{padding:"22px 26px 26px"}}>
            <div style={{fontSize:8,fontWeight:700,letterSpacing:2.5,color:P.teal,textTransform:"uppercase",marginBottom:6}}>Project Inquiry</div>
            <div style={{fontFamily:"'Fraunces',serif",fontSize:16,fontWeight:800,color:P.charcoal,lineHeight:1.25,marginBottom:6}}>{project.n}</div>
            <div style={{fontSize:9,color:P.slate,marginBottom:12}}>{project.c} · {project.country || project.r}{project.y ? " · "+project.y : ""}</div>
            <div style={{padding:"10px 12px",background:P.white,borderRadius:8,border:`1px dashed ${P.teal}40`,fontSize:9.5,color:P.slate,lineHeight:1.6,marginBottom:14}}>
              Project details, scope, role, and deliverables are shared on inquiry. Tell us what you want to know and we will respond.
            </div>

            {status === "success" ? (
              <div style={{padding:"16px 18px",background:"#E8F7F4",borderRadius:8,border:`1px solid ${P.teal}40`,fontSize:11,color:P.charcoal,lineHeight:1.6}}>
                <strong style={{color:P.teal}}>Inquiry received.</strong> We will reply within 1–2 business days. Thank you.
              </div>
            ) : (
              <form onSubmit={onSubmit}>
                <label style={labelStyle}>Your question or interest</label>
                <textarea style={textareaStyle} value={values.message} onChange={set("message")} placeholder="What would you like to know about this project? (scope, role, deliverables, software, software used, schedule, lessons learned...)" aria-label="Your question or interest" />

                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:4}}>
                  <div>
                    <label style={labelStyle}>Company / Organization</label>
                    <input style={inputStyle} value={values.company} onChange={set("company")} placeholder="Optional" aria-label="Company or organization" />
                  </div>
                  <div>
                    <label style={labelStyle}>Website</label>
                    <input style={inputStyle} value={values.website} onChange={set("website")} placeholder="Optional" aria-label="Company website" />
                  </div>
                </div>

                <label style={labelStyle}>Your Name *</label>
                <input required style={inputStyle} value={values.contact} onChange={set("contact")} placeholder="Full name" aria-label="Your name" />

                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                  <div>
                    <label style={labelStyle}>Email {!contactOK && <span style={{color:P.coral}}>*</span>}</label>
                    <input type="email" style={inputStyle} value={values.email} onChange={set("email")} placeholder="your@email.com" aria-label="Email address" />
                  </div>
                  <div>
                    <label style={labelStyle}>Phone {!contactOK && <span style={{color:P.coral}}>*</span>}</label>
                    <input style={inputStyle} value={values.phone} onChange={set("phone")} placeholder="+country code & number" aria-label="Phone number" />
                  </div>
                </div>
                <div style={{fontSize:8.5,color:P.slate,marginTop:-2,marginBottom:8,fontStyle:"italic"}}>Provide at least Email or Phone so we can reply.</div>

                <CaptchaBlock captcha={captcha} status={status}/>

                <button type="submit" disabled={!canSubmit||status==="sending"} style={{...submitStyle(P.teal),opacity:canSubmit&&status!=="sending"?1:0.6,cursor:canSubmit&&status!=="sending"?"pointer":"not-allowed"}}>
                  {status === "sending" ? "Sending..." : "Send Inquiry"}
                </button>
                <FormStatus status={status} color={P.teal}/>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  };

  // ══════════════════════ CONTACT ══════════════════════
  const ContactPage=()=>(
    <div>
      <div style={{background:P.navy,padding:"28px 28px 22px"}}>
        <h2 style={{fontFamily:"'Fraunces',serif",fontSize:24,fontWeight:800,color:P.white,margin:0}}>Contact Us</h2>
        <p style={{fontSize:10,color:"#9BBCD6",marginTop:4}}>iStructural Group Inc. | Canada | info@istructgroup.com</p>
      </div>
      <div style={{padding:"20px 24px",display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
        {[{t:"General Inquiry",d:"Management, design, or consultancy.",a:"info@istructgroup.com",c:P.slate,href:"mailto:info@istructgroup.com"},
          {t:"Start a Project",d:"Management, design, or AI assessment.",a:"Start a Project",c:P.s1,href:null},
          {t:"Training",d:"CSi training for your team.",a:"Request Training",c:P.s2,href:null}].map((c,i)=>
          <div key={i} style={{padding:"16px",borderRadius:10,border:"1px solid #e0e0e0"}}>
            <div style={{fontSize:11,fontWeight:700,color:P.charcoal}}>{c.t}</div>
            <div style={{fontSize:9.5,color:P.slate,marginTop:5,lineHeight:1.6}}>{c.d}</div>
            <div onClick={()=>{if(c.href){window.location.href=c.href;}else{setPage("start");setSTab(i===1?"s1":i===2?"s4":"s1");}}}
              {...kbd(()=>{if(c.href){window.location.href=c.href;}else{setPage("start");setSTab(i===1?"s1":i===2?"s4":"s1");}})}
              aria-label={c.a}
              style={{marginTop:10,fontSize:10,fontWeight:700,color:c.c,cursor:"pointer"}}>{c.a} &#8594;</div>
          </div>)}
      </div>
    </div>
  );

  return (
    <div style={{fontFamily:"'DM Sans',sans-serif",maxWidth:"100%",background:P.white}}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Fraunces:wght@700;800&display=swap" rel="stylesheet"/>
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes slideInRight{from{transform:translateX(100%)}to{transform:translateX(0)}}
        /* Responsive nav: hide desktop tabs and show hamburger under 880px */
        @media (max-width: 880px){
          .nav-desktop{display:none !important;}
          .nav-mobile{display:flex !important;}
        }
        input:focus, textarea:focus, select:focus { border-color: #0A7C6E !important; box-shadow: 0 0 0 2px #0A7C6E18; }
        button:hover { opacity: 0.9; }
        button:disabled { opacity: 0.6; cursor: default; }
        * { box-sizing: border-box; }
        /* A11Y: visible focus ring for keyboard users on all interactive elements */
        :focus { outline: none; }
        :focus-visible { outline: 2px solid #0A7C6E; outline-offset: 2px; border-radius: 4px; }
        [role="button"]:focus-visible, a:focus-visible, button:focus-visible { outline: 2px solid #0A7C6E; outline-offset: 2px; }
        /* A11Y: visually-hidden helper for screen readers */
        .sr-only { position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0; }
      `}</style>
      <Nav/>
      {page==="home"&&<HomePage/>}
      {page==="s1"&&<S1Page/>}
      {page==="s2"&&<S2Page/>}
      {page==="s3"&&<S3Page/>}
      {page==="hub"&&<HubPage/>}
      {page==="tools"&&<ToolsPage/>}
      {page==="projects"&&<ProjectsPage/>}
      {page==="training"&&<TrainingPage/>}
      {page==="start"&&<StartPage/>}
      {page==="contact"&&<ContactPage/>}
      <Footer/>

      {/* ═══ MOBILE NAV DRAWER ═══ */}
      {mobileNavOpen && (
        <div role="dialog" aria-modal="true" aria-label="Site navigation"
             onClick={(e)=>{ if(e.target===e.currentTarget) setMobileNavOpen(false); }}
             style={{position:"fixed",inset:0,zIndex:1100,background:"rgba(15,24,40,0.78)",backdropFilter:"blur(4px)"}}>
          <div style={{position:"absolute",top:0,right:0,height:"100vh",width:"min(86vw,340px)",background:P.navy,boxShadow:"-10px 0 40px rgba(0,0,0,0.5)",padding:"20px 18px",animation:"slideInRight 0.22s ease-out",display:"flex",flexDirection:"column",gap:6}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
              <div style={{fontSize:11,fontWeight:800,color:P.tealL,letterSpacing:2,textTransform:"uppercase"}}>iStructural</div>
              <button onClick={()=>setMobileNavOpen(false)} aria-label="Close menu" style={{width:30,height:30,borderRadius:7,background:"transparent",border:`1px solid ${P.tealL}30`,cursor:"pointer",color:P.white,fontSize:16,fontWeight:700,fontFamily:"inherit"}}>×</button>
            </div>
            {[{id:"home",l:"Home"},{id:"s1",l:"Management"},{id:"s2",l:"Design"},{id:"s3",l:"AI & Technology"},{id:"hub",l:"Knowledge Hub"},{id:"tools",l:"Tools Box"},{id:"projects",l:"Projects"},{id:"training",l:"Training"},{id:"contact",l:"Contact"}].map(n=>(
              <div key={n.id} onClick={()=>{setPage(n.id);setMobileNavOpen(false);}} {...kbd(()=>{setPage(n.id);setMobileNavOpen(false);})} aria-current={page===n.id?"page":undefined} style={{padding:"11px 14px",borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer",color:page===n.id?P.tealL:"#B5C8DD",background:page===n.id?P.teal+"20":"transparent",border:`1px solid ${page===n.id?P.tealL+"40":"transparent"}`}}>{n.l}</div>
            ))}
            <div onClick={()=>{setPage("start");setMobileNavOpen(false);}} {...kbd(()=>{setPage("start");setMobileNavOpen(false);})} aria-label="Start a Project" style={{marginTop:10,background:P.teal,color:P.white,padding:"12px 16px",borderRadius:8,fontSize:12,fontWeight:700,cursor:"pointer",textAlign:"center"}}>Start a Project →</div>
          </div>
        </div>
      )}

      {/* ═══ GLOBAL SEARCH OVERLAY ═══ */}
      {showSearch && (() => {
        const q = searchQ.trim().toLowerCase();
        const projHits = q ? allProjects.filter(p=>(p.n||"").toLowerCase().includes(q)||(p.c||"").toLowerCase().includes(q)||(p.r||"").toLowerCase().includes(q)||(p.country||"").toLowerCase().includes(q)).slice(0,10) : [];
        const pages = [
          {id:"home",l:"Home",d:"Overview, three pillars, AI assessment"},
          {id:"s1",l:"Management & Business Support",d:"V.E., ROI, risk, strategy"},
          {id:"s2",l:"Design Services & Consultancy",d:"High-rise, bridges, irregular, structural assessment"},
          {id:"s3",l:"AI & Technology Services",d:"AI literacy, readiness, implementation"},
          {id:"hub",l:"Knowledge Hub",d:"Free documents, calculators, standards, training links"},
          {id:"tools",l:"Tools Box",d:"Modular apps: APEX career intelligence, ARGO bid decision system, more coming"},
          {id:"projects",l:"Projects",d:"Selected portfolio across MENA, Europe and beyond"},
          {id:"training",l:"Training Programs",d:"CSi licensed training, MENA and North America"},
          {id:"contact",l:"Contact",d:"Reach iStructural Group Inc."},
        ];
        const pageHits = q ? pages.filter(p=>p.l.toLowerCase().includes(q)||p.d.toLowerCase().includes(q)) : pages;
        return (
        <div role="dialog" aria-modal="true" aria-label="Site search"
             onClick={(e)=>{ if(e.target===e.currentTarget) setShowSearch(false); }}
             onKeyDown={(e)=>{ if(e.key==='Escape'){setShowSearch(false);setSearchQ("");} }}
             style={{position:"fixed",inset:0,zIndex:1050,background:"rgba(15,24,40,0.78)",backdropFilter:"blur(4px)",display:"flex",alignItems:"flex-start",justifyContent:"center",padding:"60px 16px",overflowY:"auto"}}>
          <div style={{width:"100%",maxWidth:640,background:P.sand,borderRadius:12,boxShadow:"0 20px 60px rgba(0,0,0,0.55)",overflow:"hidden",animation:"fadeUp 0.2s ease-out"}}>
            <div style={{display:"flex",alignItems:"center",gap:10,padding:"14px 16px",background:P.white,borderBottom:`1px solid ${P.charcoal}1A`}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={P.slate} strokeWidth="2.2" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
              <input autoFocus value={searchQ} onChange={(e)=>setSearchQ(e.target.value)} placeholder="Search pages, projects, resources..." aria-label="Site search input" style={{flex:1,border:"none",outline:"none",fontSize:13,background:"transparent",fontFamily:"inherit",color:P.charcoal}} />
              <button onClick={()=>{setShowSearch(false);setSearchQ("");}} aria-label="Close search" style={{width:28,height:28,borderRadius:7,background:"transparent",border:`1px solid ${P.charcoal}25`,cursor:"pointer",fontSize:14,color:P.charcoal,fontWeight:700,fontFamily:"inherit"}}>×</button>
            </div>
            <div style={{padding:"14px 16px",maxHeight:"60vh",overflowY:"auto"}}>
              <div style={{fontSize:8,fontWeight:700,letterSpacing:2,color:P.slate,textTransform:"uppercase",marginBottom:8}}>{q ? `Pages (${pageHits.length})` : "Browse pages"}</div>
              {pageHits.length===0 && <div style={{fontSize:10,color:P.slate,fontStyle:"italic",padding:"6px 0"}}>No page matches.</div>}
              {pageHits.map(p=>(
                <div key={p.id} onClick={()=>{setPage(p.id);setShowSearch(false);setSearchQ("");}} {...kbd(()=>{setPage(p.id);setShowSearch(false);setSearchQ("");})} style={{padding:"9px 11px",borderRadius:7,cursor:"pointer",marginBottom:4,background:P.white,border:`1px solid ${P.charcoal}10`}}>
                  <div style={{fontSize:10.5,fontWeight:700,color:P.charcoal}}>{p.l}</div>
                  <div style={{fontSize:8.5,color:P.slate,marginTop:1}}>{p.d}</div>
                </div>
              ))}
              {q && (
                <>
                  <div style={{fontSize:8,fontWeight:700,letterSpacing:2,color:P.slate,textTransform:"uppercase",margin:"14px 0 8px"}}>Projects ({projHits.length})</div>
                  {projHits.length===0 && <div style={{fontSize:10,color:P.slate,fontStyle:"italic",padding:"6px 0"}}>No project matches.</div>}
                  {projHits.map((p,i)=>(
                    <div key={i} onClick={()=>{setSelectedProj(p);setShowSearch(false);setSearchQ("");}} {...kbd(()=>{setSelectedProj(p);setShowSearch(false);setSearchQ("");})} style={{padding:"8px 11px",borderRadius:7,cursor:"pointer",marginBottom:4,background:P.white,border:`1px solid ${P.s2}15`,display:"flex",justifyContent:"space-between",alignItems:"center",gap:6}}>
                      <div style={{fontSize:10,color:P.charcoal,flex:1}}>{p.n}</div>
                      <span style={{fontSize:7.5,fontWeight:600,padding:"1px 6px",borderRadius:5,background:(catCol[p.c]||P.slate)+"15",color:catCol[p.c]||P.slate}}>{p.c}</span>
                      <span style={{fontSize:8,color:P.slate,whiteSpace:"nowrap"}}>{p.country||p.r}</span>
                    </div>
                  ))}
                </>
              )}
              {!q && (
                <div style={{fontSize:9,color:P.slate,marginTop:14,padding:"10px 12px",background:P.white,borderRadius:7,border:`1px dashed ${P.charcoal}1F`,lineHeight:1.6}}>
                  Tip: type a project name, region, code (ACI, Eurocode, CSA), or topic. Press Esc to close.
                </div>
              )}
            </div>
          </div>
        </div>
        );
      })()}

      {/* ═══ PROJECT DETAIL MODAL ═══ */}
      {selectedProj && (
        <div role="dialog" aria-modal="true" aria-label="Project details"
             onClick={(e)=>{ if(e.target===e.currentTarget) setSelectedProj(null); }}
             onKeyDown={(e)=>{ if(e.key==='Escape') setSelectedProj(null); }}
             tabIndex={-1}
             style={{position:"fixed",inset:0,zIndex:1000,background:"rgba(15,24,40,0.78)",backdropFilter:"blur(4px)",display:"flex",alignItems:"flex-start",justifyContent:"center",padding:"40px 16px",overflowY:"auto"}}>
          <div style={{position:"relative",width:"100%",maxWidth:560,background:P.sand,borderRadius:12,boxShadow:"0 20px 60px rgba(0,0,0,0.55)",overflow:"hidden",animation:"fadeUp 0.22s ease-out"}}>
            <div style={{height:4,background:catCol[selectedProj.c]||P.teal}}></div>
            <button onClick={()=>setSelectedProj(null)} aria-label="Close project details" style={{position:"absolute",top:14,right:14,width:32,height:32,borderRadius:8,background:P.white,border:`1px solid ${P.charcoal}25`,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,color:P.charcoal,fontWeight:700,zIndex:2,fontFamily:"inherit"}}>×</button>
            <div style={{padding:"24px 28px 26px"}}>
              <div style={{fontSize:8,fontWeight:700,letterSpacing:2.5,color:catCol[selectedProj.c]||P.slate,textTransform:"uppercase",marginBottom:6}}>{selectedProj.c} · Project</div>
              <div style={{fontFamily:"'Fraunces',serif",fontSize:17,fontWeight:800,color:P.charcoal,lineHeight:1.25,marginBottom:14}}>{selectedProj.n}</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
                <div style={{padding:"10px 12px",background:P.white,borderRadius:8,border:`1px solid ${P.charcoal}15`}}>
                  <div style={{fontSize:7.5,fontWeight:700,letterSpacing:1.5,color:P.slate,textTransform:"uppercase",marginBottom:3}}>Type</div>
                  <div style={{fontSize:10.5,fontWeight:600,color:P.charcoal}}>{selectedProj.c}</div>
                </div>
                <div style={{padding:"10px 12px",background:P.white,borderRadius:8,border:`1px solid ${P.charcoal}15`}}>
                  <div style={{fontSize:7.5,fontWeight:700,letterSpacing:1.5,color:P.slate,textTransform:"uppercase",marginBottom:3}}>Region</div>
                  <div style={{fontSize:10.5,fontWeight:600,color:P.charcoal}}>{selectedProj.r}</div>
                </div>
                {selectedProj.country && (
                  <div style={{padding:"10px 12px",background:P.white,borderRadius:8,border:`1px solid ${P.charcoal}15`}}>
                    <div style={{fontSize:7.5,fontWeight:700,letterSpacing:1.5,color:P.slate,textTransform:"uppercase",marginBottom:3}}>Country</div>
                    <div style={{fontSize:10.5,fontWeight:600,color:P.charcoal}}>{selectedProj.country}</div>
                  </div>
                )}
                {selectedProj.y && (
                  <div style={{padding:"10px 12px",background:P.white,borderRadius:8,border:`1px solid ${P.charcoal}15`}}>
                    <div style={{fontSize:7.5,fontWeight:700,letterSpacing:1.5,color:P.slate,textTransform:"uppercase",marginBottom:3}}>Year</div>
                    <div style={{fontSize:10.5,fontWeight:600,color:P.charcoal}}>{selectedProj.y}</div>
                  </div>
                )}
              </div>
              <div style={{padding:"12px 14px",background:P.white,borderRadius:8,border:`1px dashed ${P.charcoal}25`,fontSize:9.5,color:P.slate,lineHeight:1.6}}>
                Detailed project information, scope, role, and deliverables are shared under NDA per engagement. Contact <a href="mailto:info@istructgroup.com" style={{color:P.teal,fontWeight:700}}>info@istructgroup.com</a> to request specifics.
              </div>
              <div onClick={()=>{setSelectedProj(null);setPage("start");setSTab("s2");}} {...kbd(()=>{setSelectedProj(null);setPage("start");setSTab("s2");})} aria-label="Discuss a similar project" style={{marginTop:14,background:P.teal,color:P.white,padding:"10px 18px",borderRadius:8,fontSize:11,fontWeight:700,cursor:"pointer",textAlign:"center"}}>Discuss a Similar Project →</div>
            </div>
          </div>
        </div>
      )}

      {/* ═══ PROJECT INQUIRY MODAL ═══ */}
      {inquiryProj && <ProjectInquiryModal project={inquiryProj} onClose={()=>setInquiryProj(null)} />}
    </div>
  );
}
