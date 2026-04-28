import { useState, useMemo } from "react";

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
  {n:"Specialized Thermal Analysis and Design of PT slabs",c:"Residential",r:"Iraq"},
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
  {n:"Jeddah Industrial City",c:"Commercial",r:"KSA"},
  {n:"MISK Peninsula",c:"Commercial",r:"KSA"},
  {n:"MISK Foundation Center",c:"Commercial",r:"KSA"},
  {n:"King Salman Park",c:"Commercial",r:"KSA"},
  {n:"Cultural Square Park",c:"Commercial",r:"KSA"},
  {n:"BCP Tower (Banque Centrale Populaire)",c:"Commercial",r:"Morocco"},
  {n:"Al Majed Tower (4B+G+25+P)",c:"Commercial",r:"UAE"},
  {n:"Entisar Tower / Level 54 (Vibration analysis)",c:"Commercial",r:"UAE"},
  {n:"D.F.C.M. (Transfer Beams)",c:"Commercial",r:"Qatar"},
  {n:"Lusail Tower (2B+G+34)",c:"Commercial",r:"Qatar"},
  {n:"ENBD Tower (3B+GF+18)",c:"Commercial",r:"UAE"},
  {n:"Specialized Thermal Analysis and Design of PT slabs",c:"Commercial",r:"Qatar"},
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
  {n:"Amlak Tower",c:"Commercial",r:"Kuwait"},
  // Retail (4)
  {n:"Dubai Mall, Business Bay",c:"Retail",r:"UAE"},
  {n:"Dubai Marina Mall, J.B.R.",c:"Retail",r:"UAE"},
  {n:"Landmark Building Mall",c:"Retail",r:"UAE"},
  {n:"COOP Supermarket, Oman-Hatta",c:"Retail",r:"Oman"},
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
];

const cats = ["All","Residential","Commercial","Retail","Institutional","Bridges","Cultural"];
const catCol = {Residential:P.s1,Commercial:P.gold,Retail:P.coral,Institutional:P.s2,Bridges:P.teal,Cultural:P.warm};
const regions = ["All","UAE","KSA","Qatar","Lebanon","Other"];

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

const phases = [
  {id:"p1",label:"Phase 1",title:"Smartphone Preliminary",price:"",liability:"No liability",color:P.s3,
   items:["Free standardized forms","Guided photo protocol (far, near, nearer, nearest)","AI preliminary advisory report","Optional engineer review (add-on)","Disclaimer: AI output only"]},
  {id:"p2",label:"Phase 2",title:"AI Deep Inspection",price:"",liability:"Inspection-level",color:P.s1,
   items:["Specialist data: LiDAR, drone, thermal, GPR","Curated partner AI processing","3D digital twin and defect overlay","Severity-rated findings (ACI, Eurocode)","Detailed inspection dossier"]},
  {id:"p3",label:"Phase 3",title:"Stamped Engineering",price:"",liability:"Full PE stamp + PI",color:P.redD,
   items:["FEA (ETABS, SAP2000, CSiBridge)","Full load + capacity calculations","Repair drawings (AutoCAD, Revit)","Material specs + construction sequence","Authority submission package"]},
];

// ── SHARED STYLES ──
const inputStyle = {
  width:"100%",padding:"8px 10px",borderRadius:6,border:"1px solid #d0d8e0",
  fontSize:10,color:P.charcoal,background:"#fafbfc",
  fontFamily:"'DM Sans',sans-serif",boxSizing:"border-box",
  outline:"none",marginBottom:6,display:"block",
};
const textareaStyle = {...inputStyle,resize:"vertical",minHeight:72};
const labelStyle = {fontSize:9,fontWeight:600,color:P.slate,marginBottom:2,display:"block",letterSpacing:0.3};
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

  const filteredP = useMemo(()=>{
    let f=allProjects;
    if(pCat!=="All")f=f.filter(p=>p.c===pCat);
    if(pReg!=="All"){
      if(pReg==="Other")f=f.filter(p=>!["UAE","KSA","Qatar","Lebanon"].includes(p.r));
      else f=f.filter(p=>p.r===pReg);
    }
    return f;
  },[pCat,pReg]);

  const displayed = showAll?filteredP:filteredP.slice(0,20);

  const Nav=()=>(
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 18px",background:P.navy,position:"sticky",top:0,zIndex:10}}>
      <div onClick={()=>setPage("home")} style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer"}}>
        <svg width="32" height="32" viewBox="0 0 90 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M28 92 L28 84 L31 84 L31 76 L34 76 L34 64 C36 56 38 44 40 32 C40.5 24 41 16 42 10 L42.6 4 L42.9 2 L43.4 4 L44 10 C45 16 45.5 24 46 32 C48 44 50 56 52 64 L52 76 L55 76 L55 84 L58 84 L58 92 Z" fill={P.tealL} fillOpacity="0.2" stroke={P.tealL} strokeWidth="1.4" strokeDasharray="2,1"/>
          <path d="M40.5 92 L41.8 22 L40.6 32 C38.5 44 36.5 56 34.5 64 L34.5 76 L31.5 76 L31.5 84 L28.7 84 L28.7 92 Z" fill={P.tealL} fillOpacity="0.55"/>
          <path d="M45.5 92 L44.2 22 L45.4 32 C47.5 44 49.5 56 51.5 64 L51.5 76 L54.5 76 L54.5 84 L57.3 84 L57.3 92 Z" fill={P.tealL} fillOpacity="0.55"/>
          <path d="M40.5 92 L41.8 22 L44.2 22 L45.5 92 Z" fill={P.tealL} fillOpacity="0.85"/>
          <circle cx="43" cy="2" r="1.5" fill={P.tealL}/>
        </svg>
        <div>
          <div style={{fontSize:12.5,fontWeight:700,color:P.white,lineHeight:1.1}}>iStructural Group Inc.</div>
          <div style={{fontSize:7,color:"#6A8CA8",letterSpacing:1.5,textTransform:"uppercase"}}>Structural Solutions | Management | AI</div>
        </div>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:2}}>
        {[{id:"home",l:"Home"},{id:"s1",l:"Management"},{id:"s2",l:"Design"},{id:"s3",l:"AI & Technology"},{id:"hub",l:"Knowledge Hub"},{id:"projects",l:"Projects"},{id:"training",l:"Training"},{id:"contact",l:"Contact"}].map(n=>
          <div key={n.id} onClick={()=>setPage(n.id)} style={{padding:"4px 8px",borderRadius:6,fontSize:9.5,fontWeight:600,cursor:"pointer",color:page===n.id?P.tealL:"#8BA0B5",background:page===n.id?P.teal+"20":"transparent"}}>{n.l}</div>
        )}
        <div onClick={()=>setPage("start")} style={{marginLeft:4,background:P.teal,color:P.white,padding:"5px 11px",borderRadius:7,fontSize:9.5,fontWeight:700,cursor:"pointer"}}>Start a Project</div>
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
          {t:"AI & Technology",i:["AI Literacy & Readiness","AI Assessment Platform","Phase 1/2/3","Start a Project"]},
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
            <div onClick={()=>setPage("s1")} style={{background:P.s1,color:P.white,padding:"9px 20px",borderRadius:8,fontSize:11,fontWeight:700,cursor:"pointer"}}>Management</div>
            <div onClick={()=>setPage("s2")} style={{background:P.s2,color:P.white,padding:"9px 20px",borderRadius:8,fontSize:11,fontWeight:700,cursor:"pointer"}}>Design & Consultancy</div>
            <div onClick={()=>setPage("s3")} style={{background:P.teal,color:P.white,padding:"9px 20px",borderRadius:8,fontSize:11,fontWeight:700,cursor:"pointer"}}>AI & Technology</div>
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
           items:["AI Literacy and Organizational Readiness (AI 101)","Tool Integration and Process Automation","AI Structural Assessment Platform (3-Phase)","Knowledge Hub (free resources for all)","Curated AI Inspection Partner Network"]},
        ].map((s,i)=>(
          <div key={s.key} onClick={()=>setPage(s.key)} style={{padding:"24px 20px 20px",cursor:"pointer",background:P.white,borderRight:i<2?"1px solid #E8E8E8":"none",borderBottom:"3px solid transparent",transition:"all 0.25s"}}
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

      <div onClick={()=>setPage("hub")} style={{padding:"16px 24px",background:P.greenD+"08",borderTop:`1px solid ${P.greenD}15`,display:"flex",alignItems:"center",justifyContent:"space-between",cursor:"pointer"}}>
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
        <div onClick={()=>{setPage("start");setSTab("s1");}} style={{marginTop:14,background:P.s1,color:P.white,padding:"9px 20px",borderRadius:8,fontSize:11,fontWeight:700,cursor:"pointer",display:"inline-block"}}>Start a Management Inquiry &#8594;</div>
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
        {[{n:"Seismic and Wind Engineering",d:"ASCE 41, Eurocode 8. Dynamic response, base isolation, damper design. Wind tunnel correlation. Tall and supertall structures."},
        ].map((o,i)=><div key={i} style={{display:"grid",gridTemplateColumns:"180px 1fr",gap:14,padding:"12px 14px",borderRadius:8,background:i%2===0?P.s2L:"transparent",border:`1px solid ${P.s2}10`,marginBottom:5}}>
          <div style={{fontSize:11,fontWeight:700,color:P.s2}}>{o.n}</div><div style={{fontSize:10,color:P.slate,lineHeight:1.6}}>{o.d}</div></div>)}
        <div style={{fontSize:10,fontWeight:700,color:P.s2,letterSpacing:1,textTransform:"uppercase",marginTop:16,marginBottom:8}}>Third-Party Consultancy</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6}}>
          {[{t:"High-Rise",i:["Lateral stability","Shortening vertical elements","Human response"]},{t:"Bridges",i:["Alternative concepts (V.E.)","Design details + verification","Stage modelling"]},{t:"Irregular",i:["Rotated/twisted buildings","Vibration analysis","Thermal design","Transfer structures"]}].map((c,i)=>
            <div key={i} style={{padding:"10px 12px",borderRadius:8,background:P.s2L,border:`1px solid ${P.s2}15`}}>
              <div style={{fontSize:10,fontWeight:700,color:P.s2,marginBottom:4}}>{c.t}</div>
              {c.i.map((x,j)=><div key={j} style={{fontSize:9,color:P.slate,padding:"1px 0"}}>+ {x}</div>)}
            </div>)}
        </div>
        <div onClick={()=>{setPage("start");setSTab("s2");}} style={{marginTop:14,background:P.s2,color:P.white,padding:"9px 20px",borderRadius:8,fontSize:11,fontWeight:700,cursor:"pointer",display:"inline-block"}}>Start a Design Inquiry &#8594;</div>
      </div>
    </div>
  );

  // ══════════════════════ S3 ══════════════════════
  const S3Page=()=>(
    <div>
      <HeroBg color1={P.s3}><div style={{padding:"32px 28px 28px"}}>
        <div style={{fontSize:9,fontWeight:700,letterSpacing:3,color:P.white+"80",textTransform:"uppercase"}}>Service 03</div>
        <h2 style={{fontFamily:"'Fraunces',serif",fontSize:24,fontWeight:800,color:P.white,margin:"6px 0 0"}}>AI & Technology Services</h2>
        <p style={{fontSize:11,color:P.white+"BB",marginTop:6,maxWidth:500,lineHeight:1.6}}>Two integrated offerings: AI Literacy and Organizational Readiness for any industry, plus the AI Structural Assessment Platform for damage inspection and engineering design.</p>
      </div></HeroBg>

      <div style={{padding:"20px 24px 0"}}>
        <div style={{padding:"18px 20px",borderRadius:12,background:P.s3bL,border:`1px solid ${P.s3b}20`,marginBottom:16}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
            <div style={{fontSize:9,fontWeight:700,color:P.white,background:P.s3b,padding:"3px 10px",borderRadius:10}}>Part A</div>
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

      <div style={{padding:"0 24px"}}>
        <div style={{padding:"18px 20px",borderRadius:12,background:P.s3L,border:`1px solid ${P.s3}20`,marginBottom:16}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
            <div style={{fontSize:9,fontWeight:700,color:P.white,background:P.s3,padding:"3px 10px",borderRadius:10}}>Part B</div>
            <div style={{fontSize:14,fontWeight:800,color:P.s3,fontFamily:"'Fraunces',serif"}}>AI Structural Assessment Platform</div>
          </div>
          <div style={{fontSize:10.5,color:P.slate,lineHeight:1.6,marginBottom:12}}>3-phase AI-powered platform: from smartphone preliminary through deep AI inspection to full stamped engineering with FEA, repair drawings, and authority submission.</div>
          <div style={{display:"flex",gap:5,marginBottom:12}}>
            {phases.map(p=><div key={p.id} onClick={()=>setAPhase(p.id)} style={{padding:"6px 12px",borderRadius:7,fontSize:10,fontWeight:700,cursor:"pointer",background:aPhase===p.id?p.color:"transparent",color:aPhase===p.id?P.white:P.slate,border:`1px solid ${aPhase===p.id?p.color:"#ccc"}`,transition:"all 0.2s"}}>{p.label}: {p.title}</div>)}
          </div>
          {phases.filter(p=>p.id===aPhase).map(p=>
            <div key={p.id}>
              <div style={{fontSize:10,color:P.slate,marginBottom:8}}>{[p.price,p.liability].filter(Boolean).join(" | ")}</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4}}>
                {p.items.map((it,i)=><div key={i} style={{fontSize:10,color:P.charcoal,padding:"4px 8px",borderRadius:5,background:P.white,border:"1px solid #eee",display:"flex",gap:4}}><span style={{color:p.color,fontWeight:800,fontSize:8,marginTop:2}}>+</span>{it}</div>)}
              </div>
            </div>
          )}
        </div>
        <div onClick={()=>{setPage("start");setSTab("s3");}} style={{marginTop:14,background:P.s3,color:P.white,padding:"9px 20px",borderRadius:8,fontSize:11,fontWeight:700,cursor:"pointer",display:"inline-block"}}>Start an AI Inquiry &#8594;</div>
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
      <div style={{padding:"6px 24px 4px",background:P.sand,display:"flex",gap:5}}>
        {[{l:"Management",c:P.s1},{l:"Design & Engineering",c:P.s2},{l:"AI Platform",c:P.s3}].map(t=>
          <span key={t.l} style={{fontSize:8.5,fontWeight:600,padding:"3px 9px",borderRadius:6,background:t.c+"15",color:t.c,border:`1px solid ${t.c}25`}}>{t.l} Resources</span>)}
      </div>

      {/* ═══ KNOWLEDGE HUB CATEGORY TILES (CLICKABLE ACCORDION) ═══ */}
      <div style={{padding:"14px 24px"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:7}}>
          {[{id:"crack",n:"Crack & Damage Library",d:"Visual guide: crack types, spalling, delamination. Severity ratings.",s:"AI + Design",c:P.s3},
            {id:"forms",n:"Free Inspection Forms",d:"Safety pre-check, site ID, Phase 1 field form, post-disaster rapid.",s:"AI Platform",c:P.s3},
            {id:"calc",n:"Structural Calculators",d:"Beam deflection, buckling, seismic base shear, wind load. Browser-based.",s:"Design",c:P.s2},
            {id:"software",n:"Free Software Directory",d:"Trial software downloads + free open-source alternatives.",s:"Design + Training",c:P.s2},
            {id:"std",n:"International Standards",d:"FEMA, ACI, ASCE, Eurocode, ICOMOS, World Bank, USGS, ISO.",s:"All Services",c:P.greenD},
            {id:"pm",n:"PM Templates & Frameworks",d:"RFP templates, scope of work, risk registers, milestone tracking.",s:"Management",c:P.s1},
            {id:"ve",n:"V.E. & ROI Tools",d:"Value engineering templates, cost-benefit calculators, LEED guides.",s:"Management",c:P.s1},
            {id:"case",n:"Case Studies",d:"Anonymized Phase 1/2/3 across all 3 damage sub-markets.",s:"AI Platform",c:P.s3},
            {id:"cert",n:"Training & Certification Links",d:"ICC, ACI, ICOMOS certs, university programs. CPD-aligned.",s:"All Services",c:P.greenD},
          ].map((r,i)=>{
            const active = hubTile === r.id;
            return (
              <div key={i} onClick={()=>setHubTile(active?null:r.id)} style={{padding:"10px 12px",borderRadius:8,background:active?r.c+"15":r.c+"06",border:`1px solid ${active?r.c+"60":r.c+"12"}`,cursor:"pointer",transition:"all 0.2s",boxShadow:active?`0 2px 8px ${r.c}25`:"none"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                  <div style={{fontSize:10,fontWeight:700,color:r.c}}>{r.n}</div>
                  <span style={{fontSize:7,fontWeight:600,padding:"1px 5px",borderRadius:8,background:r.c+"12",color:r.c,whiteSpace:"nowrap"}}>{r.s}</span>
                </div>
                <div style={{fontSize:8.5,color:P.slate,marginTop:3,lineHeight:1.5}}>{r.d}</div>
                <div style={{fontSize:8,color:r.c,marginTop:6,fontWeight:700}}>{active ? "▾ Click to close" : "▸ Click to open"}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ═══ EXPANDED CONTENT PANEL (shows content of selected tile) ═══ */}
      {hubTile && (
        <div style={{padding:"22px 24px 24px",borderTop:`3px solid ${P.greenD}`,background:P.sand}}>

          {/* CRACK & DAMAGE LIBRARY */}
          {hubTile === "crack" && (
            <div>
              <div style={{fontSize:9,fontWeight:700,letterSpacing:2.4,color:P.s3,textTransform:"uppercase",marginBottom:6}}>Crack & Damage Library</div>
              <div style={{fontSize:14,fontWeight:800,color:P.charcoal,fontFamily:"'Fraunces',serif",marginBottom:6}}>Visual References for Field Inspection</div>
              <div style={{fontSize:10,color:P.slate,lineHeight:1.6,marginBottom:14,maxWidth:760}}>Curated visual guide to common crack patterns, structural damage types, severity ratings, and field identification. Useful for engineers, inspectors, and safety officers.</div>
              <div style={{padding:"14px 16px",background:P.white,borderRadius:8,border:`1px dashed ${P.s3}40`,fontSize:10,color:P.slate,lineHeight:1.6}}>
                <strong style={{color:P.s3}}>Coming soon.</strong> Documents and visual references will be available for download here. Contact <a href="mailto:info@istructgroup.com" style={{color:P.s3,fontWeight:700}}>info@istructgroup.com</a> to request specific resources.
              </div>
            </div>
          )}

          {/* FREE INSPECTION FORMS */}
          {hubTile === "forms" && (
            <div>
              <div style={{fontSize:9,fontWeight:700,letterSpacing:2.4,color:P.s3,textTransform:"uppercase",marginBottom:6}}>Free Inspection Forms</div>
              <div style={{fontSize:14,fontWeight:800,color:P.charcoal,fontFamily:"'Fraunces',serif",marginBottom:6}}>Standardized Field and Office Forms</div>
              <div style={{fontSize:10,color:P.slate,lineHeight:1.6,marginBottom:14,maxWidth:760}}>Safety pre-check, site identification, Phase 1 smartphone field form, post-disaster rapid assessment. Multilingual versions on request.</div>
              <div style={{padding:"14px 16px",background:P.white,borderRadius:8,border:`1px dashed ${P.s3}40`,fontSize:10,color:P.slate,lineHeight:1.6}}>
                <strong style={{color:P.s3}}>Coming soon.</strong> Form PDFs will be available here. Contact <a href="mailto:info@istructgroup.com" style={{color:P.s3,fontWeight:700}}>info@istructgroup.com</a> to request a specific form.
              </div>
            </div>
          )}

          {/* STRUCTURAL CALCULATORS */}
          {hubTile === "calc" && (
            <div>
              <div style={{fontSize:9,fontWeight:700,letterSpacing:2.4,color:P.s2,textTransform:"uppercase",marginBottom:6}}>Structural Calculators</div>
              <div style={{fontSize:14,fontWeight:800,color:P.charcoal,fontFamily:"'Fraunces',serif",marginBottom:6}}>Browser-Based Tools</div>
              <div style={{fontSize:10,color:P.slate,lineHeight:1.6,marginBottom:14,maxWidth:760}}>Quick checks for beam deflection, column buckling, seismic base shear, and wind load. No login, no install. Run directly in your browser.</div>
              <div style={{padding:"14px 16px",background:P.white,borderRadius:8,border:`1px dashed ${P.s2}40`,fontSize:10,color:P.slate,lineHeight:1.6}}>
                <strong style={{color:P.s2}}>Coming soon.</strong> Browser calculators will appear here. Contact <a href="mailto:info@istructgroup.com" style={{color:P.s2,fontWeight:700}}>info@istructgroup.com</a> to request specific calculators.
              </div>
            </div>
          )}

          {/* FREE SOFTWARE DIRECTORY (full original content + low-cost section) */}
          {hubTile === "software" && (
            <div>
              <div style={{fontSize:9,fontWeight:700,letterSpacing:2.4,color:P.s2,textTransform:"uppercase",marginBottom:6}}>Free Software Directory</div>
              <div style={{fontSize:14,fontWeight:800,color:P.charcoal,fontFamily:"'Fraunces',serif",marginBottom:6}}>Trial Software Downloads</div>
              <div style={{fontSize:10,color:P.slate,lineHeight:1.6,marginBottom:14,maxWidth:760}}>Direct links to official trial downloads from the respective software vendors. All trials require user registration on the vendor's website. iStructural Group Inc. does not host, distribute, or modify any third-party software.</div>

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

              {/* Sub-section: Free and Low-Cost Alternatives */}
              <div style={{marginTop:24,paddingTop:18,borderTop:`1px solid ${P.greenD}30`}}>
                <div style={{fontSize:9,fontWeight:700,letterSpacing:2.4,color:P.greenD,textTransform:"uppercase",marginBottom:6}}>Free and Low-Cost Alternatives</div>
                <div style={{fontSize:13,fontWeight:800,color:P.charcoal,fontFamily:"'Fraunces',serif",marginBottom:4}}>Open-Source and Budget-Friendly Tools</div>
                <div style={{fontSize:10,color:P.slate,lineHeight:1.6,marginBottom:12,maxWidth:760}}>Free, open-source, and educational alternatives to commercial structural software. For students, small practices, research, and budget-conscious projects.</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
                  {[
                    {n:"OpenSees",v:"UC Berkeley / PEER",d:"Nonlinear seismic, advanced research, free open-source.",url:"https://opensees.berkeley.edu/",c:P.greenD},
                    {n:"Code_Aster + Salome-Meca",v:"Electricite de France (EDF)",d:"General FEA, mechanical, thermal. Industrial-grade open-source.",url:"https://code-aster.org/",c:P.greenD},
                    {n:"FreeCAD with FEM",v:"The FreeCAD Project",d:"CAD plus simple FEA via FEM workbench.",url:"https://www.freecad.org/",c:P.greenD},
                    {n:"Mastan2",v:"Cornell University",d:"2D/3D matrix analysis, learning tool.",url:"https://www.mastan2.com/",c:P.greenD},
                    {n:"CalculiX",v:"Guido Dhondt et al.",d:"FEA solver with ABAQUS-like syntax.",url:"https://www.calculix.de/",c:P.greenD},
                    {n:"PrePoMax",v:"Open-source community",d:"Pre/post-processor GUI for CalculiX.",url:"https://prepomax.fs.um.si/",c:P.greenD},
                    {n:"2D Frame Analysis",v:"EngiSSol",d:"Quick 2D frame analysis. Free version available.",url:"https://www.engissol.com/",c:P.greenD},
                    {n:"LISA-FEA",v:"Sonnenhof Holdings",d:"Low-cost general FEA, $150 one-time license.",url:"https://lisafea.com/",c:P.greenD},
                    {n:"TRUSS4",v:"Trussplan",d:"Truss analysis and design. Free version available.",url:"https://www.fine.eu/products/truss/",c:P.greenD},
                  ].map((s,i)=>(
                    <div key={i} style={{padding:"10px 12px",borderRadius:8,background:P.white,border:`1px solid ${s.c}20`,display:"flex",flexDirection:"column",justifyContent:"space-between",minHeight:115}}>
                      <div>
                        <div style={{fontSize:10.5,fontWeight:800,color:s.c,fontFamily:"'Fraunces',serif"}}>{s.n}</div>
                        <div style={{fontSize:8,color:P.slate,fontStyle:"italic",marginTop:1,marginBottom:5}}>by {s.v}</div>
                        <div style={{fontSize:9,color:P.charcoal,lineHeight:1.5}}>{s.d}</div>
                      </div>
                      <a href={s.url} target="_blank" rel="noopener noreferrer" style={{display:"inline-block",marginTop:8,fontSize:9,fontWeight:700,color:P.white,background:s.c,padding:"4px 10px",borderRadius:5,textDecoration:"none",textAlign:"center"}}>Visit Vendor &#x2197;</a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* INTERNATIONAL STANDARDS */}
          {hubTile === "std" && (
            <div>
              <div style={{fontSize:9,fontWeight:700,letterSpacing:2.4,color:P.greenD,textTransform:"uppercase",marginBottom:6}}>International Standards</div>
              <div style={{fontSize:14,fontWeight:800,color:P.charcoal,fontFamily:"'Fraunces',serif",marginBottom:6}}>Codes and Standards Quick Reference</div>
              <div style={{fontSize:10,color:P.slate,lineHeight:1.6,marginBottom:14,maxWidth:760}}>FEMA, ACI, ASCE, Eurocode, ICOMOS, World Bank, USGS, ISO. Summary references and links to official sources.</div>
              <div style={{padding:"14px 16px",background:P.white,borderRadius:8,border:`1px dashed ${P.greenD}40`,fontSize:10,color:P.slate,lineHeight:1.6}}>
                <strong style={{color:P.greenD}}>Coming soon.</strong> Standards summaries and links will be available here. Contact <a href="mailto:info@istructgroup.com" style={{color:P.greenD,fontWeight:700}}>info@istructgroup.com</a> for specific code references.
              </div>
            </div>
          )}

          {/* PM TEMPLATES */}
          {hubTile === "pm" && (
            <div>
              <div style={{fontSize:9,fontWeight:700,letterSpacing:2.4,color:P.s1,textTransform:"uppercase",marginBottom:6}}>PM Templates & Frameworks</div>
              <div style={{fontSize:14,fontWeight:800,color:P.charcoal,fontFamily:"'Fraunces',serif",marginBottom:6}}>Project Management Resources</div>
              <div style={{fontSize:10,color:P.slate,lineHeight:1.6,marginBottom:14,maxWidth:760}}>RFP templates, scope of work, risk registers, milestone tracking. Adaptable to your projects.</div>
              <div style={{padding:"14px 16px",background:P.white,borderRadius:8,border:`1px dashed ${P.s1}40`,fontSize:10,color:P.slate,lineHeight:1.6}}>
                <strong style={{color:P.s1}}>Coming soon.</strong> Templates will be available here. Contact <a href="mailto:info@istructgroup.com" style={{color:P.s1,fontWeight:700}}>info@istructgroup.com</a> for specific templates.
              </div>
            </div>
          )}

          {/* V.E. & ROI TOOLS */}
          {hubTile === "ve" && (
            <div>
              <div style={{fontSize:9,fontWeight:700,letterSpacing:2.4,color:P.s1,textTransform:"uppercase",marginBottom:6}}>V.E. & ROI Tools</div>
              <div style={{fontSize:14,fontWeight:800,color:P.charcoal,fontFamily:"'Fraunces',serif",marginBottom:6}}>Value Engineering and Cost Analysis</div>
              <div style={{fontSize:10,color:P.slate,lineHeight:1.6,marginBottom:14,maxWidth:760}}>Value engineering templates, cost-benefit calculators, LEED guides. For owners, PMs, and designers.</div>
              <div style={{padding:"14px 16px",background:P.white,borderRadius:8,border:`1px dashed ${P.s1}40`,fontSize:10,color:P.slate,lineHeight:1.6}}>
                <strong style={{color:P.s1}}>Coming soon.</strong> Tools and templates will be available here. Contact <a href="mailto:info@istructgroup.com" style={{color:P.s1,fontWeight:700}}>info@istructgroup.com</a> to request specific tools.
              </div>
            </div>
          )}

          {/* CASE STUDIES */}
          {hubTile === "case" && (
            <div>
              <div style={{fontSize:9,fontWeight:700,letterSpacing:2.4,color:P.s3,textTransform:"uppercase",marginBottom:6}}>Case Studies</div>
              <div style={{fontSize:14,fontWeight:800,color:P.charcoal,fontFamily:"'Fraunces',serif",marginBottom:6}}>Anonymized Project Examples</div>
              <div style={{fontSize:10,color:P.slate,lineHeight:1.6,marginBottom:14,maxWidth:760}}>Anonymized Phase 1, Phase 2, Phase 3 case studies across post-natural disaster, post-conflict, and heritage sub-markets.</div>
              <div style={{padding:"14px 16px",background:P.white,borderRadius:8,border:`1px dashed ${P.s3}40`,fontSize:10,color:P.slate,lineHeight:1.6}}>
                <strong style={{color:P.s3}}>Coming soon.</strong> Case study summaries will be available here. Contact <a href="mailto:info@istructgroup.com" style={{color:P.s3,fontWeight:700}}>info@istructgroup.com</a> for specific case studies.
              </div>
            </div>
          )}

          {/* TRAINING & CERT LINKS */}
          {hubTile === "cert" && (
            <div>
              <div style={{fontSize:9,fontWeight:700,letterSpacing:2.4,color:P.greenD,textTransform:"uppercase",marginBottom:6}}>Training & Certification Links</div>
              <div style={{fontSize:14,fontWeight:800,color:P.charcoal,fontFamily:"'Fraunces',serif",marginBottom:6}}>Professional Development Resources</div>
              <div style={{fontSize:10,color:P.slate,lineHeight:1.6,marginBottom:14,maxWidth:760}}>ICC, ACI, ICOMOS certifications, university programs, CPD-aligned courses. Direct links to official providers.</div>
              <div style={{padding:"14px 16px",background:P.white,borderRadius:8,border:`1px dashed ${P.greenD}40`,fontSize:10,color:P.slate,lineHeight:1.6}}>
                <strong style={{color:P.greenD}}>Coming soon.</strong> Curated certification links will be available here. Contact <a href="mailto:info@istructgroup.com" style={{color:P.greenD,fontWeight:700}}>info@istructgroup.com</a> for guidance on training paths.
              </div>
            </div>
          )}

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

  // ══════════════════════ PROJECTS ══════════════════════
  const ProjectsPage=()=>(
    <div>
      <HeroBg color1={P.navy}><div style={{padding:"28px 28px 24px"}}>
        <div style={{fontSize:9,fontWeight:700,letterSpacing:3,color:P.tealL,textTransform:"uppercase"}}>Portfolio</div>
        <h2 style={{fontFamily:"'Fraunces',serif",fontSize:24,fontWeight:800,color:P.white,margin:"6px 0 0"}}>Projects</h2>
        <p style={{fontSize:10,color:"#9BBCD6",marginTop:4}}>Selected work: buildings, bridges, infrastructure. UAE, KSA, Qatar, Lebanon, and international.</p>
      </div></HeroBg>
      <div style={{padding:"10px 24px 6px",background:P.sand,display:"flex",gap:16,alignItems:"center",borderBottom:"1px solid #e0e0e0",flexWrap:"wrap"}}>
        <div style={{display:"flex",gap:4,alignItems:"center"}}>
          <span style={{fontSize:9,color:P.slate,fontWeight:600}}>Type:</span>
          {cats.map(c=><div key={c} onClick={()=>{setPCat(c);setShowAll(false);}} style={{padding:"4px 10px",borderRadius:6,fontSize:9.5,fontWeight:600,cursor:"pointer",background:pCat===c?P.charcoal:"transparent",color:pCat===c?P.white:P.slate,border:`1px solid ${pCat===c?P.charcoal:"#ccc"}`}}>{c}</div>)}
        </div>
        <div style={{display:"flex",gap:4,alignItems:"center"}}>
          <span style={{fontSize:9,color:P.slate,fontWeight:600}}>Region:</span>
          {regions.map(r=><div key={r} onClick={()=>{setPReg(r);setShowAll(false);}} style={{padding:"4px 10px",borderRadius:6,fontSize:9.5,fontWeight:600,cursor:"pointer",background:pReg===r?P.charcoal:"transparent",color:pReg===r?P.white:P.slate,border:`1px solid ${pReg===r?P.charcoal:"#ccc"}`}}>{r}</div>)}
        </div>
      </div>
      <div style={{padding:"8px 24px"}}>
        <div style={{fontSize:9,color:P.slate,marginBottom:6}}>Filter by Type and Region above.</div>
        {displayed.map((p,i)=>(
          <div key={i} style={{display:"grid",gridTemplateColumns:"1fr 80px 50px",gap:8,padding:"6px 10px",borderRadius:5,background:i%2===0?"#f8f9fa":"transparent",borderBottom:"1px solid #f2f2f2",alignItems:"center"}}>
            <div style={{fontSize:9.5,color:P.charcoal,lineHeight:1.4}}>{p.n}</div>
            <span style={{fontSize:7.5,fontWeight:600,padding:"2px 5px",borderRadius:5,background:(catCol[p.c]||P.slate)+"12",color:catCol[p.c]||P.slate,textAlign:"center"}}>{p.c}</span>
            <span style={{fontSize:8.5,color:P.slate,textAlign:"right"}}>{p.r}</span>
          </div>
        ))}
        {!showAll&&filteredP.length>20&&<div onClick={()=>setShowAll(true)} style={{marginTop:10,padding:"8px 16px",borderRadius:8,background:P.teal,color:P.white,fontSize:10,fontWeight:700,textAlign:"center",cursor:"pointer"}}>Show more projects</div>}
      </div>
    </div>
  );

  // ══════════════════════ TRAINING ══════════════════════
  const TrainingPage=()=>(
    <div>
      <HeroBg color1={P.s2}><div style={{padding:"28px 28px 24px"}}>
        <div style={{fontSize:9,fontWeight:700,letterSpacing:3,color:P.white+"80",textTransform:"uppercase"}}>Certified Training</div>
        <h2 style={{fontFamily:"'Fraunces',serif",fontSize:24,fontWeight:800,color:P.white,margin:"6px 0 0"}}>Training Programs</h2>
        <p style={{fontSize:10,color:P.white+"BB",marginTop:4}}>CSiAmerica Licensed Instructor. Advanced support for international firms.</p>
      </div></HeroBg>
      <div style={{padding:"18px 24px"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:7}}>
          {[{n:"ETABS",d:"Multi-story building. Lateral systems, P-delta, response spectrum.",sw:"ETABS (CSi)"},{n:"SAP2000",d:"General purpose. Linear/nonlinear, static/dynamic.",sw:"SAP2000 (CSi)"},{n:"CSiBridge",d:"Bridge modeling, staging, tendon layout, seismic.",sw:"CSiBridge (CSi)"},{n:"SAFE",d:"Slab and foundation. PT and RC. FEA + strip design.",sw:"SAFE (CSi)"},{n:"RAM Concept",d:"PT slab specialist. Tendon profiling, load balancing.",sw:"RAM Concept (Bentley Systems)"},{n:"ADAPT PT",d:"PT analysis. Continuous beam, one-way slab.",sw:"ADAPT PT (RISA Tech)"},{n:"Others",d:"Other third-party software. Specify on request.",sw:"Other"}].map((s,i)=>
            <div key={i} onClick={()=>{setPage("start");setSTab("s4");setTrainingSw(s.sw);}} style={{padding:"12px 14px",borderRadius:8,background:P.s2L,border:`1px solid ${P.s2}15`,cursor:"pointer",transition:"all 0.2s"}}
              onMouseEnter={e=>{e.currentTarget.style.background=P.s2+"15";}}
              onMouseLeave={e=>{e.currentTarget.style.background=P.s2L;}}>
              <div style={{fontSize:11,fontWeight:700,color:P.s2}}>{s.n}</div>
              <div style={{fontSize:9,color:P.slate,marginTop:3,lineHeight:1.5}}>{s.d}</div>
            </div>)}
        </div>
        <div onClick={()=>{setPage("start");setSTab("s4");}} style={{marginTop:14,background:P.s2,color:P.white,padding:"9px 20px",borderRadius:8,fontSize:11,fontWeight:700,cursor:"pointer",display:"inline-block"}}>Request Training &#8594;</div>
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
            <input required style={inputStyle} value={values.company} onChange={set("company")} placeholder="e.g. ABC Developments" />
          </div>
          <div>
            <label style={labelStyle}>Project Name & Location *</label>
            <input required style={inputStyle} value={values.project} onChange={set("project")} placeholder="e.g. Tower A, Dubai" />
          </div>
          <div>
            <label style={labelStyle}>Service Required *</label>
            <select required style={inputStyle} value={values.service} onChange={set("service")}>
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
            <input style={inputStyle} value={values.budget} onChange={set("budget")} placeholder="e.g. USD 50K–200K" />
          </div>
          <div>
            <label style={labelStyle}>Timeline / Urgency</label>
            <input style={inputStyle} value={values.timeline} onChange={set("timeline")} placeholder="e.g. Start Q3 2026" />
          </div>
          <div>
            <label style={labelStyle}>Contact Name *</label>
            <input required style={inputStyle} value={values.contact} onChange={set("contact")} placeholder="Full name" />
          </div>
          <div style={{gridColumn:"1 / -1"}}>
            <label style={labelStyle}>Email Address *</label>
            <input required type="email" style={inputStyle} value={values.email} onChange={set("email")} placeholder="your@email.com" />
          </div>
          <div style={{gridColumn:"1 / -1"}}>
            <label style={labelStyle}>Brief Description *</label>
            <textarea required style={textareaStyle} value={values.description} onChange={set("description")} placeholder="Describe your project, current challenges, and what you need from iStructural..." />
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
            <input required style={inputStyle} value={values.company} onChange={set("company")} placeholder="e.g. XYZ Engineering" />
          </div>
          <div>
            <label style={labelStyle}>Project Name & Location *</label>
            <input required style={inputStyle} value={values.project} onChange={set("project")} placeholder="e.g. Bridge X, Riyadh" />
          </div>
          <div>
            <label style={labelStyle}>Service Type *</label>
            <select required style={inputStyle} value={values.service} onChange={set("service")}>
              <option value="">Select a service...</option>
              <option>Structural Design</option>
              <option>Seismic & Wind Engineering</option>
              <option>Nonlinear / Thermal Analysis</option>
              <option>Third-Party Review</option>
              <option>Other / Multiple</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Structure Type *</label>
            <select required style={inputStyle} value={values.structure} onChange={set("structure")}>
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
            <input style={inputStyle} value={values.size} onChange={set("size")} placeholder="e.g. 42 floors, 160m height" />
          </div>
          <div>
            <label style={labelStyle}>Existing Drawings Available?</label>
            <select style={inputStyle} value={values.drawings} onChange={set("drawings")}>
              <option value="">Select...</option>
              <option>Yes | full set available</option>
              <option>Yes | partial drawings</option>
              <option>No | new design</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Contact Name *</label>
            <input required style={inputStyle} value={values.contact} onChange={set("contact")} placeholder="Full name" />
          </div>
          <div>
            <label style={labelStyle}>Email Address *</label>
            <input required type="email" style={inputStyle} value={values.email} onChange={set("email")} placeholder="your@email.com" />
          </div>
          <div style={{gridColumn:"1 / -1"}}>
            <label style={labelStyle}>Special Requirements / Notes</label>
            <textarea style={textareaStyle} value={values.requirements} onChange={set("requirements")} placeholder="Standards, code jurisdiction, specific challenges, delivery timeline..." />
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
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
          <div style={{padding:"12px 14px",borderRadius:10,border:`1px solid ${P.s3b}20`,background:P.s3bL}}>
            <div style={{fontSize:8,fontWeight:700,color:P.white,background:P.s3b,padding:"2px 8px",borderRadius:10,display:"inline-block"}}>Part A</div>
            <div style={{fontSize:11,fontWeight:700,color:P.s3b,marginTop:4}}>AI Literacy & Readiness</div>
            <div style={{fontSize:9,color:P.slate,marginTop:3,lineHeight:1.5}}>AI 101 workshops, readiness assessment, tool selection, implementation support.</div>
          </div>
          <div style={{padding:"12px 14px",borderRadius:10,border:`1px solid ${P.s3}20`,background:P.s3L}}>
            <div style={{fontSize:8,fontWeight:700,color:P.white,background:P.s3,padding:"2px 8px",borderRadius:10,display:"inline-block"}}>Part B</div>
            <div style={{fontSize:11,fontWeight:700,color:P.s3,marginTop:4}}>AI Structural Assessment</div>
            <div style={{fontSize:9,color:P.slate,marginTop:3,lineHeight:1.5}}>Phase 1 (Smartphone), Phase 2 (AI Deep Inspection), Phase 3 (Stamped Engineering).</div>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          <div>
            <label style={labelStyle}>Company / Organization *</label>
            <input required style={inputStyle} value={values.company} onChange={set("company")} placeholder="e.g. City of Toronto" />
          </div>
          <div>
            <label style={labelStyle}>Project Name or Workshop Topic *</label>
            <input required style={inputStyle} value={values.topic} onChange={set("topic")} placeholder="e.g. Bridge inspection, AI readiness" />
          </div>
          <div style={{gridColumn:"1 / -1"}}>
            <label style={labelStyle}>Service Path *</label>
            <select required style={inputStyle} value={values.part} onChange={set("part")}>
              <option value="">Select your path...</option>
              <option>Part A | AI Literacy: AI 101 Workshop</option>
              <option>Part A | AI Literacy: Readiness Assessment</option>
              <option>Part A | AI Literacy: Tool Selection & Integration</option>
              <option>Part B | Phase 1: Smartphone Preliminary (no liability)</option>
              <option>Part B | Phase 2: AI Deep Inspection</option>
              <option>Part B | Phase 3: Stamped Engineering Report</option>
              <option>Part B | Full 3-Phase Assessment</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Asset Type (if Part B)</label>
            <select style={inputStyle} value={values.assetType} onChange={set("assetType")}>
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
            <select style={inputStyle} value={values.damageType} onChange={set("damageType")}>
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
            <input style={inputStyle} value={values.location} onChange={set("location")} placeholder="City, country" />
          </div>
          <div>
            <label style={labelStyle}>Contact Name *</label>
            <input required style={inputStyle} value={values.contact} onChange={set("contact")} placeholder="Full name" />
          </div>
          <div>
            <label style={labelStyle}>Email Address *</label>
            <input required type="email" style={inputStyle} value={values.email} onChange={set("email")} placeholder="your@email.com" />
          </div>
          <div style={{gridColumn:"1 / -1"}}>
            <label style={labelStyle}>Additional Notes</label>
            <textarea style={textareaStyle} value={values.notes} onChange={set("notes")} placeholder="Any relevant context: urgency, team size, existing data, preferred language (EN/FR/AR)..." />
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
        <div style={{fontSize:9.5,color:P.slate,marginBottom:14,lineHeight:1.55}}>Corporate and university training on structural analysis software. Tell us your team and software focus and we will tailor the curriculum.</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <div>
            <label style={labelStyle}>Contact Name *</label>
            <input required style={inputStyle} value={values.contact} onChange={set("contact")} placeholder="Full name" />
          </div>
          <div>
            <label style={labelStyle}>Email Address *</label>
            <input required type="email" style={inputStyle} value={values.email} onChange={set("email")} placeholder="your@email.com" />
          </div>
          <div>
            <label style={labelStyle}>Company / Organization</label>
            <input style={inputStyle} value={values.company} onChange={set("company")} placeholder="Optional" />
          </div>
          <div>
            <label style={labelStyle}>Team Size *</label>
            <select required style={inputStyle} value={values.teamSize} onChange={set("teamSize")}>
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
            <select required style={inputStyle} value={values.software} onChange={set("software")}>
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
                <input required={showOther} style={inputStyle} value={values.otherSwName} onChange={set("otherSwName")} placeholder="e.g. STAAD.Pro, Tekla, Robot..." />
              </div>
              <div>
                <label style={labelStyle}>Software Company *</label>
                <input required={showOther} style={inputStyle} value={values.otherSwCompany} onChange={set("otherSwCompany")} placeholder="e.g. Bentley Systems, Trimble, Autodesk..." />
              </div>
            </>
          )}
          <div>
            <label style={labelStyle}>Training Format *</label>
            <select required style={inputStyle} value={values.format} onChange={set("format")}>
              <option value="">Select format...</option>
              <option>In-person</option>
              <option>Online live</option>
              <option>Hybrid</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Preferred Dates / Timing</label>
            <input style={inputStyle} value={values.dates} onChange={set("dates")} placeholder="e.g. Q3 2026, weekends only..." />
          </div>
          <div style={{gridColumn:"1 / -1"}}>
            <label style={labelStyle}>Additional Notes</label>
            <textarea style={textareaStyle} value={values.notes} onChange={set("notes")} placeholder="Skill levels, learning objectives, certifications needed, language preference (EN/FR/AR)..." />
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
          <div key={t.id} onClick={()=>setSTab(t.id)} style={{flex:1,padding:"10px 14px",textAlign:"center",cursor:"pointer",borderBottom:sTab===t.id?`3px solid ${t.c}`:"3px solid transparent",background:sTab===t.id?t.c+"08":"transparent",fontSize:10.5,fontWeight:sTab===t.id?700:500,color:sTab===t.id?t.c:P.slate,transition:"all 0.2s"}}>{t.l}</div>)}
      </div>
      <div style={{padding:"20px 24px"}}>
        {sTab==="s1" && <S1Form />}
        {sTab==="s2" && <S2Form />}
        {sTab==="s3" && <S3Form />}
        {sTab==="s4" && <S4Form />}
      </div>
    </div>
  );

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
        input:focus, textarea:focus, select:focus { border-color: #0A7C6E !important; box-shadow: 0 0 0 2px #0A7C6E18; }
        button:hover { opacity: 0.9; }
        button:disabled { opacity: 0.6; cursor: default; }
        * { box-sizing: border-box; }
      `}</style>
      <Nav/>
      {page==="home"&&<HomePage/>}
      {page==="s1"&&<S1Page/>}
      {page==="s2"&&<S2Page/>}
      {page==="s3"&&<S3Page/>}
      {page==="hub"&&<HubPage/>}
      {page==="projects"&&<ProjectsPage/>}
      {page==="training"&&<TrainingPage/>}
      {page==="start"&&<StartPage/>}
      {page==="contact"&&<ContactPage/>}
      <Footer/>
    </div>
  );
}
