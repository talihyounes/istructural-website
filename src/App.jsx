import { useState, useMemo, useEffect } from "react";

// iStructural — Liquid Glass theme (iOS 27 style) as a single React component.
// Self-contained: paste into App.jsx or import as a component. No required props.
// Glass surfaces on chrome/cards; solid surfaces under all reading text.

const P = {
  navy:"#0C1B2E", navyM:"#162D4A", teal:"#0A7C6E", tealL:"#0EBEA8",
  sand:"#F7F5F0", gold:"#C6973F", warm:"#B8A68E", slate:"#5A6B7A", charcoal:"#2A3642",
  s1:"#1E5B8A", s2:"#6B3A7D", s3:"#0A7C6E", coral:"#C0553A", redD:"#8B2020", greenD:"#1B6B35",
};
// light variants for accents used as text on dark glass
const L = {"#0A7C6E":"#3fd0d8","#1E5B8A":"#6db3e6","#6B3A7D":"#c39bd8","#1B6B35":"#5fce86","#C6973F":"#e0b65f","#C0553A":"#e8917a","#2A3642":"#aab8c8","#B8A68E":"#d8c8b0"};
const catCol = {Residential:P.s1,Commercial:P.gold,Retail:P.coral,Institutional:P.s2,Bridges:P.teal,Infrastructure:P.s3,Cultural:P.warm,"Business Development":P.charcoal};

const PILLARS = [
  {key:"s1",c:"#6db3e6",ac:P.s1,t:"Management & Business Support",tag:"Strategy that builds before construction begins",
   items:["Project & Construction Management","Business Strategy & Growth","Risk & Financial Management","Value Engineering (V.E.)","ROI & Investment Analysis"]},
  {key:"s2",c:"#b389c6",ac:P.s2,t:"Design Services & Consultancy",tag:"Engineering precision for structures that endure",
   items:["Seismic and Wind Engineering","Third-Party Review and Verification","Training (CSi Licensed)"]},
  {key:"s3",c:P.tealL,ac:P.tealL,t:"AI & Technology Services",tag:"From AI literacy to stamped engineering drawings",
   items:["AI Literacy and Organizational Readiness (AI 101)","Tool Integration and Process Automation","AI Readiness Assessment","Knowledge Hub (free resources for all)"]},
];
const S1ROWS = [
  ["Project & Construction Management","Full lifecycle oversight. Budget control, schedule optimization, multi-stakeholder coordination across government, healthcare, education, industrial, hospitality."],
  ["Business Strategy & Growth","Market entry analysis, organizational structuring, partnership frameworks. Single collaborative environment for architects, engineers, builders, clients, owners."],
  ["Risk & Financial Management","Quantitative risk modeling, cost-benefit analysis, insurance and bonding advisory. Data-driven resilient financial strategies."],
  ["Value Engineering (V.E.)","Systematic function analysis. Creative V.E. solutions with remarkable ROI. Applied to high-rise, bridges, irregular structures."],
  ["ROI & Investment Analysis","Lifecycle cost analysis, capital allocation. LEED certification pathway support."],
  ["Resources Management","Workforce capability intelligence via Capacity Grid. Map every office and person, see each office forte, route projects from evidence."],
];
const S3CARDS = [
  ["AI 101 · Foundations","What AI is, what it is not, how it works, where it applies. Tailored workshops for leadership, engineers, operations. No technical background required."],
  ["AI Readiness Assessment","Evaluate AI maturity. Identify high-impact automation. Gap analysis across data, skills, infrastructure, culture. Actionable roadmap."],
  ["Tool Selection & Integration","Identify the right AI tools for your tasks: document processing, QC, scheduling, reporting. Vendor-neutral. Integration planning."],
  ["Implementation Support","Hands-on deployment into existing workflows. Staff training. Process redesign. Performance monitoring. Advisory retainer available."],
];
const HUB = [
  {code:"DOC",title:"Documents, Forms and Templates",sub:"Static deliverables to download, fill, or copy.",items:[
    ["Free Inspection Forms","Safety pre-check, site ID, Phase 1 field form, post-disaster rapid.","AI Platform",P.s3],
    ["Crack & Damage Library","Visual guide: crack types, spalling, delamination. Severity ratings.","AI + Design",P.s3],
    ["PM Templates & Frameworks","RFP templates, scope of work, risk registers, milestone tracking.","Management",P.s1],
    ["V.E. & ROI Tools","Value engineering templates, cost-benefit calculators, LEED guides.","Management",P.s1]]},
  {code:"TLS",title:"Calculators, Spreadsheets and Software",sub:"Interactive and computational tools to run or install.",items:[
    ["Structural Calculators","Beam deflection, buckling, seismic base shear, wind load. Browser-based.","Design",P.s2],
    ["Trial Software","Commercial trial downloads from leading vendors. 10 to 30-day trials.","Design + Training",P.s2],
    ["Budget-Friendly Software","Free, open-source, and low-cost alternatives for students and small practices.","All Services",P.greenD]]},
  {code:"REF",title:"Standards, Training and External Links",sub:"Outbound references to authoritative third parties.",items:[
    ["International Standards","ACI, AASHTO, IBC, FEMA, CSA, NBC, Eurocode. Plus ASCE, ICOMOS, ISO references.","All Services",P.greenD],
    ["Training & Certification Links","PMI, ICC, ACI, AASHTO, FEMA, CSA, ICOMOS, Eurocode certs and university programs.","All Services",P.greenD]]},
];
const TRAIN = [["ETABS","Multi-story building. Lateral systems, P-delta, response spectrum."],["SAP2000","General purpose. Linear/nonlinear, static/dynamic."],["CSiBridge","Bridge modeling, staging, tendon layout, seismic."],["SAFE","Slab and foundation. PT and RC. FEA + strip design."],["RAM Concept","PT slab specialist. Tendon profiling, load balancing."],["ADAPT PT","PT analysis. Continuous beam, one-way slab."],["Others","Other third-party software. Specify on request."]];
const CATS = ["All","Residential","Commercial","Retail","Institutional","Bridges","Infrastructure","Cultural","Business Development"];
const REGIONS = ["All","UAE","KSA","Qatar","Lebanon","North America","Other"];
const PROJECTS = [
{n:"Muntazah Building (3B+GF+7+Roof+URoof), V.E. on structural elements",c:"Residential",r:"Qatar"},{n:"Specialized Thermal Analysis and Design of Post-Tensioned Concrete Slabs",c:"Residential",r:"Other",country:"Iraq"},{n:"Six Buildings of B+G+3, plus Luxury Club House",c:"Residential",r:"Qatar"},{n:"Structural Assessment report for existing building subject to excessive slab deflection",c:"Residential",r:"Lebanon"},{n:"Irregular U Shape Luxury Buildings (Two), with Seismic Joints (B3+GF+12)",c:"Residential",r:"Lebanon"},{n:"Hamra Building (B2+GF+15)",c:"Residential",r:"Lebanon"},{n:"Hamra Building (B4+GF+17)",c:"Residential",r:"Lebanon"},{n:"Empire Tower (B4+GF+13)",c:"Residential",r:"Lebanon"},{n:"Mansour Building (2 Joined Buildings of B1+4)",c:"Residential",r:"Lebanon"},{n:"Hmadeh Building (B2+12)",c:"Residential",r:"Lebanon"},{n:"Residential Building (2B+G+4), Aley",c:"Residential",r:"Lebanon"},{n:"Residential Building (3B+G+7), Al Saad",c:"Residential",r:"Qatar"},{n:"Tijara Town (Six Buildings of 15 and 13), Al Ain Road",c:"Residential",r:"UAE"},{n:"Three Fishers Harbours (Multi-usage), Jumeirah 1, 2 and Umm Suqueim 2",c:"Residential",r:"UAE"},{n:"Real Estate Bank Development (Five Buildings of 15 and 10), Dubai Silicon Oasis",c:"Residential",r:"UAE"},{n:"Al Ouyoun Residences (2B+G+4), Broumana",c:"Residential",r:"Lebanon"},{n:"Reef Villas (Seven Types, 1000+ Villas)",c:"Residential",r:"UAE"},{n:"Jumeirah Beach Residence Sector 6, J.B.R.",c:"Residential",r:"UAE"},{n:"G+12 Building, Port Saeed",c:"Residential",r:"UAE"},{n:"Golf Towers, Jumeirah Lake",c:"Residential",r:"UAE"},{n:"B+G+10, International City",c:"Residential",r:"UAE"},{n:"2B+G+10, International City",c:"Residential",r:"UAE"},{n:"B+G+8+Gym, International City",c:"Residential",r:"UAE"},{n:"G+3+Roof, Nahda 2",c:"Residential",r:"UAE"},{n:"G+4+Roof, Nahda 2",c:"Residential",r:"UAE"},{n:"G+12+Roof, Nahda 2",c:"Residential",r:"UAE"},
{n:"Jeddah Industrial City",c:"Infrastructure",r:"KSA"},{n:"MISK Peninsula",c:"Commercial",r:"KSA"},{n:"MISK Foundation Center",c:"Commercial",r:"KSA"},{n:"King Salman Park",c:"Commercial",r:"KSA"},{n:"Cultural Square Park",c:"Commercial",r:"KSA"},{n:"BCP Tower (Banque Centrale Populaire)",c:"Commercial",r:"Other",country:"Morocco"},{n:"Al Majed Tower (4B+G+25+P)",c:"Commercial",r:"Qatar"},{n:"Entisar Tower / Level 54 (Vibration analysis)",c:"Commercial",r:"UAE"},{n:"D.F.C.M. (Transfer Beams)",c:"Commercial",r:"Qatar"},{n:"Lusail Tower (2B+G+34)",c:"Commercial",r:"Qatar"},{n:"ENBD Tower (3B+GF+18)",c:"Commercial",r:"UAE"},{n:"Specialized Thermal Analysis and Design of Post-Tensioned Concrete Slabs",c:"Commercial",r:"Qatar"},{n:"Barwa Financial District (9 Towers and 1 Hotel)",c:"Commercial",r:"Qatar"},{n:"Yabes Towers (Admin 3B+G+42 and Hotel 3B+G+18)",c:"Commercial",r:"KSA"},{n:"Tamani Tower (B+G+19)",c:"Commercial",r:"UAE"},{n:"Hydra Tower (38 stories)",c:"Commercial",r:"UAE"},{n:"Al Hathboor Building (3B+G+21), Al Nahda First",c:"Commercial",r:"UAE"},{n:"Star Hills Mixed Use (5* Hotel 4B+43 + Office Tower 4B+26), Business Bay",c:"Commercial",r:"UAE"},{n:"Al Jaber Tower, Jumeirah Lake",c:"Commercial",r:"UAE"},{n:"Al Shaafar Tower, Jumeirah Lake",c:"Commercial",r:"UAE"},{n:"Limitless (Block of 4 Towers), JAFZA",c:"Commercial",r:"UAE"},{n:"Shihab Towers (Two Office 3B+G+3P+31 each), Business Bay",c:"Commercial",r:"UAE"},{n:"Al Waseet Headquarter (2B+G+5), Media City",c:"Commercial",r:"UAE"},{n:"Deyaar Three Towers (U1, U2, U3), Jumeirah Lake",c:"Commercial",r:"UAE"},{n:"Indigo Tower, Jumeirah Lake",c:"Commercial",r:"UAE"},{n:"Reef Tower, Jumeirah Lake",c:"Commercial",r:"UAE"},{n:"Emirates Industrial Bank Headquarter, Deira",c:"Commercial",r:"UAE"},{n:"Amlak Tower",c:"Commercial",r:"Other",country:"Kuwait"},
{n:"Dubai Mall, Business Bay",c:"Retail",r:"UAE"},{n:"Dubai Marina Mall, J.B.R.",c:"Retail",r:"UAE"},{n:"Landmark Building Mall",c:"Retail",r:"UAE"},{n:"COOP Supermarket, Oman-Hatta",c:"Retail",r:"Other",country:"Oman"},
{n:"IMC Medical College",c:"Institutional",r:"KSA"},{n:"Tabuk Administration Building (Irregular shape two interconnected)",c:"Institutional",r:"KSA"},{n:"Science and Computer Colleges",c:"Institutional",r:"KSA"},{n:"Sidra Hospital",c:"Institutional",r:"Qatar"},{n:"Sacred Heart (3B+GF+40m Minaret+18m/70 Tons Statue)",c:"Institutional",r:"Lebanon"},{n:"Hasbaya School (2B+GF+2)",c:"Institutional",r:"Lebanon"},{n:"Saint-Anne Social Building (B+GF+3)",c:"Institutional",r:"Lebanon"},{n:"Taran Mosque (Integrated Piled Raft)",c:"Institutional",r:"Lebanon"},{n:"Pere Jacques School (2B+G+4), Extension",c:"Institutional",r:"Lebanon"},{n:"KHDA Headquarter (B+G+4), Dubai Knowledge Village",c:"Institutional",r:"UAE"},{n:"Ismaili Centre, Um Hrair",c:"Institutional",r:"UAE"},
{n:"AlUla Bridge, Overpass",c:"Bridges",r:"KSA"},{n:"Riyadh Metro, Multiple Spans, Alternative Structural Solutions",c:"Bridges",r:"KSA"},{n:"Haramain High Speed Rail, Multiple Spans, Alternative Solutions, Riyadh",c:"Bridges",r:"KSA"},{n:"Haramain High Speed Rail, Multiple Spans, Alternative Solutions, Jeddah",c:"Bridges",r:"KSA"},{n:"Innovative Precast U Girders, PT Box Girders, Multiple Spans",c:"Bridges",r:"KSA"},{n:"Mixed Flyover Bridge PT Concrete and Steel Box-Girders (60m spans)",c:"Bridges",r:"KSA"},{n:"Overpass Bridge (I Sections), Multiple Spans, Alternative PT Solutions",c:"Bridges",r:"KSA"},{n:"Extension Platforms (T Sections), Multiple Spans, Alternative PT Solutions",c:"Bridges",r:"KSA"},{n:"Service Check, Deflection Control Precast Segmental Bridge (38m)",c:"Bridges",r:"KSA"},{n:"Precast I Sections (30m), Construction Stage Analysis",c:"Bridges",r:"KSA"},{n:"Balanced Cantilever Bridge (44, 72, 44m), Variable PT Deck",c:"Bridges",r:"KSA"},{n:"Precast I Sections (34m), Construction Stage Analysis, Jeddah",c:"Bridges",r:"KSA"},{n:"Precast T Sections (30m), Construction Stage Analysis, Jeddah",c:"Bridges",r:"KSA"},{n:"Mixed Flyover Bridge PT Concrete, Curved Spans (Total 325m)",c:"Bridges",r:"KSA"},{n:"Pre-Tensioned Pedestrian Solid Deck Bridge (30m span)",c:"Bridges",r:"UAE"},
{n:"Abu Bakr Salem Theatre",c:"Cultural",r:"KSA"},{n:"ISF Camp (Transfer Beams)",c:"Cultural",r:"Qatar"},{n:"Shooting Club",c:"Cultural",r:"UAE"},
{n:"Taj Al Fakhama, 550 Villas",c:"Residential",r:"KSA",y:"2021"},{n:"Oryx Tower",c:"Commercial",r:"Qatar",y:"2021"},{n:"Al Mana Tower",c:"Commercial",r:"Qatar",y:"2020"},{n:"Damac Tower",c:"Commercial",r:"Qatar",y:"2020"},{n:"Saint Charbel Church",c:"Institutional",r:"Qatar",y:"2018"},{n:"BLOM Bank Headquarter",c:"Commercial",r:"Lebanon",y:"2019"},{n:"Al Nahr Mixed Used Development",c:"Commercial",r:"Lebanon",y:"2017"},{n:"Sioufi 4499, Maceio",c:"Residential",r:"Lebanon",y:"2016"},{n:"Yassine Warehouse",c:"Commercial",r:"Lebanon",y:"2016"},{n:"Industrial Research Institute",c:"Institutional",r:"Lebanon",y:"2016"},{n:"Mada Building, Societe Generale de Banque au Liban",c:"Commercial",r:"Lebanon",y:"2015"},{n:"U Park Buildings",c:"Commercial",r:"Lebanon",y:"2013"},{n:"Ministry of Health / IPS Irrigation Systems and Water Tanks (2,500 m3)",c:"Infrastructure",r:"KSA",y:"2015"},{n:"Haiti Airport Control Tower",c:"Infrastructure",r:"Other",country:"Haiti",y:"2022"},{n:"Limassol Blue Marine Towers",c:"Residential",r:"Other",country:"Cyprus",y:"2022"},{n:"Herat Solar and Wind Power Plant",c:"Infrastructure",r:"Other",country:"Afghanistan",y:"2017"},{n:"Ghozareh Industrial Zone, Wind Turbines",c:"Infrastructure",r:"Other",country:"Afghanistan",y:"2017"},{n:"Turkmenistan Satellite Control",c:"Infrastructure",r:"Other",country:"Turkmenistan",y:"2016"},{n:"Skaya Tower",c:"Commercial",r:"Other",country:"Syria",y:"2014-2016"},{n:"Sulaimaniya Hotel, Rotana",c:"Commercial",r:"Other",country:"Iraq",y:"2013"},{n:"Market Analysis",c:"Business Development",r:"North America",country:"USA & Canada",y:"2025"},
];
const START_TABS = [["s1","Management & Business",P.s1],["s2","Design & Consultancy",P.s2],["s3","AI & Technology",P.s3],["s4","Training",P.s2]];
const START_FIELDS = {
  s1:[["Company / Organization"],["Project Name & Location"],["Service Required","Project & Construction Management|Business Strategy & Growth|Risk & Financial Management|Value Engineering (V.E.)|ROI & Investment Analysis"],["Budget Range"],["Contact Name"],["Email Address"],["Brief Description","ta"]],
  s2:[["Company / Organization"],["Project Name & Location"],["Service Type","Structural Design|Seismic & Wind|Third-Party Review|Assessment Phase 1|Assessment Phase 2"],["Structure Type","High-rise|Low/mid-rise|Bridge|Heritage|Industrial"],["Contact Name"],["Email Address"],["Special Requirements","ta"]],
  s3:[["Company / Organization"],["Project / Workshop Topic"],["Service Path","AI 101 Workshop|Readiness Assessment|Tool Selection & Integration|Implementation Support"],["Project Location"],["Contact Name"],["Email Address"],["Additional Notes","ta"]],
  s4:[["Contact Name"],["Email Address"],["Company / Organization"],["Team Size","1 to 5|6 to 10|11 to 20|21 to 50|50 or more"],["Software","ETABS|SAP2000|CSiBridge|SAFE|RAM Concept|ADAPT PT|Other"],["Training Format","In-person|Online live|Hybrid"],["Additional Notes","ta"]],
};

// ===== NPPE Study Tutor (Resources app, request-gated) =====
const NPPE_WHY = [
  ["Grounded in your own materials","Built on your own course materials, never invented examples. Every answer cites where it came from."],
  ["The exclusive iStructural Hybrid RAG engine","It retrieves the governing rule before answering, and refuses to guess."],
  ["Organized to the official blueprint","Mapped to the six official NPPE blueprint areas, heaviest-weighted areas first."],
  ["A method backed by learning science","Drawn from current academic research: you learn by recalling, not rereading."],
  ["An honest readiness check","Checked on questions you never see. The light turns green at 75%, a margin above the pass line."],
  ["Province-aware","Grounds jurisdiction answers in your own province's Act and code of ethics."],
  ["A phone-first app experience","Progress rings, a pace race, streaks, and a rank you climb. Built to keep you moving."],
];
const NPPE_STEPS = [
  ["1","Request access by email","iStructural sends you the engine and short setup instructions."],
  ["2","Set it up in your own account","Your own Claude account and Google Drive, with your own course materials. Guided step by step."],
  ["3","Study","The app paces you to your exam date and tells you, honestly, when you are ready."],
];
const NPPE_FAQ = [
  ["Why not just use Claude directly?","This is tuned to your own materials, with no invented examples. Answers are grounded in what you uploaded and cite their source. It runs on the exclusive iStructural Hybrid RAG engine, organized to the official NPPE blueprint, with a method drawn from current learning-science research."],
  ["How much will it cost me?","The engine is free. You bring your own Claude account and your own course materials."],
  ["What about my materials and privacy?","Your materials live in your own Google Drive. Nothing is shared with iStructural, Anthropic, or Claude. Your study data stays yours."],
  ["Is it hard to set up? What do I need?","A Claude account (Free works; Pro or higher gives the full visual app), your course materials, a Google Drive, and the short setup instructions we send you."],
  ["Will it actually get me ready?","Your readiness is checked on questions you never see. The light turns green at 75%, above the pass line, so the verdict is honest."],
  ["How much time per day, and what if my date changes?","You set the pace and can change it anytime. The plan recalculates around your exam date."],
  ["Is it boring, like flashcards?","No. Short reads then quick recall, progress rings, a pace race, streaks, and a rank you climb."],
  ["Which province does it cover?","The NPPE is national. The engine grounds jurisdiction answers in your own province's Act and code of ethics, wherever in Canada you are seeking your licence."],
];
const NPPE_FIELDS = [
  {k:"fullName",l:"Full name",t:"text",req:true},
  {k:"occupation",l:"Occupation / title",t:"text",req:true},
  {k:"company",l:"Company (optional)",t:"text",req:false},
  {k:"university",l:"University",t:"text",req:true},
  {k:"email",l:"Official contact email",t:"email",req:true},
  {k:"mobile",l:"Mobile number",t:"tel",req:true},
  {k:"app",l:"App interested in",t:"preset",req:true,v:"NPPE"},
  {k:"plan",l:"Claude plan",t:"select",req:true,opts:["Free","Pro or higher"]},
];
const NPPE_CONSENT = "I agree that iStructural Group Inc. may contact me about my access request and store these details for that purpose.";
const NPPE_DISCLAIMER = "NPPE Study Tutor is an independent exam study-support aid, powered by the iStructural Hybrid RAG Engine (sole property of iStructural Group Inc.). iStructural Group Inc. is not a regulator, does not offer engineering services, and is not affiliated with, endorsed by, or authorized by any provincial engineering regulator (including PEO, APEGA, EGBC and others), Engineers Canada, or any NPPE administrator. The names \"NPPE\", \"P.Eng\", and \"Professional Engineer\" are used for identification and descriptive reference only; using this tool does not grant, advance, or relate to any licence or title. Output quality depends on the materials you supply; iStructural does not host, verify, or endorse them, gives no legal advice, and does not guarantee any exam outcome. Confirm all current rules and requirements with your provincial regulator. For personal study only.";

const CSS = `
.lg{--glass-blur:22px;--glass-stroke:rgba(255,255,255,.20);--glass-highlight:rgba(255,255,255,.42);--radius:16px;
  font-family:'DM Sans',system-ui,sans-serif;color:#EAF2FF;position:relative;min-height:100vh;overflow-x:hidden;background:#0C1B2E}
.lg *{box-sizing:border-box;margin:0;padding:0}
.lg .bg{position:fixed;inset:0;z-index:0;background:
  radial-gradient(1100px 700px at 12% -5%,#1c3a72 0,transparent 55%),
  radial-gradient(900px 600px at 95% 8%,#0d5a52 0,transparent 50%),
  radial-gradient(1200px 900px at 50% 120%,#162D4A 0,transparent 60%),#0C1B2E}
.lg .bg:after{content:"";position:absolute;inset:-20%;background:
  radial-gradient(420px 420px at 20% 30%,rgba(14,190,168,.45),transparent 60%),
  radial-gradient(520px 520px at 82% 66%,rgba(30,91,138,.45),transparent 60%);filter:blur(24px);opacity:.5;animation:drift 24s ease-in-out infinite alternate}
@keyframes drift{from{transform:translate3d(-3%,-2%,0) scale(1.05)}to{transform:translate3d(4%,3%,0) scale(1.15)}}
.lg .wrap{position:relative;z-index:1}
.lg .glass{position:relative;background:rgba(255,255,255,var(--glass-opacity));backdrop-filter:blur(var(--glass-blur)) saturate(180%);-webkit-backdrop-filter:blur(var(--glass-blur)) saturate(180%);border:1px solid var(--glass-stroke);border-radius:var(--radius);box-shadow:0 8px 32px rgba(0,0,0,.35),inset 0 1px 0 var(--glass-highlight),inset 0 -8px 24px rgba(0,0,0,.16);isolation:isolate}
.lg .glass:before{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;background:linear-gradient(135deg,rgba(255,255,255,.16),transparent 55%);mix-blend-mode:screen;opacity:.5;z-index:0}
.lg .glass>*{position:relative;z-index:1}
.lg nav{position:sticky;top:12px;z-index:50;margin:12px auto 0;max-width:1200px;width:calc(100% - 24px);display:flex;align-items:center;justify-content:space-between;padding:8px 16px;border-radius:16px;box-shadow:0 10px 40px rgba(0,0,0,.5),inset 0 1px 0 var(--glass-highlight)}
.lg .brand{display:flex;align-items:center;gap:10px;cursor:pointer}
.lg .brand .n{font-family:'Fraunces',serif;font-weight:800;font-size:1.02rem;color:#fff;line-height:1.05}
.lg .brand .s{font-size:.58rem;letter-spacing:.16em;text-transform:uppercase;color:#6A8CA8;margin-top:2px}
.lg .navlinks{display:flex;gap:4px;align-items:center}
.lg .lk{padding:6px 10px;border-radius:8px;font-size:.85rem;font-weight:600;color:#8BA0B5;cursor:pointer;transition:all .2s;background:transparent;border:none;font-family:inherit}
.lg .lk:hover{color:#0EBEA8;background:rgba(14,190,168,.12)}
.lg .lk.active{color:#0EBEA8;background:rgba(10,124,110,.22)}
.lg .dd{position:relative}
.lg .dd-menu{position:absolute;top:calc(100% + 6px);left:0;min-width:185px;padding:6px;border-radius:12px;display:none;flex-direction:column;gap:2px;background:#11243c;border:1px solid var(--glass-stroke);box-shadow:0 14px 36px rgba(0,0,0,.55)}
.lg .dd:hover .dd-menu{display:flex}
.lg .nav-cta{margin-left:6px;padding:7px 14px;border-radius:9px;background:#0A7C6E;color:#fff;font-weight:700;font-size:.83rem;border:none;cursor:pointer;font-family:inherit}
.lg .hamb{display:none;width:34px;height:34px;border-radius:8px;background:#0A7C6E;place-items:center;cursor:pointer;border:none}
@media(max-width:980px){.lg .navlinks{display:none}.lg .hamb{display:grid}}
.lg .page{max-width:1200px;margin:0 auto;padding:0 24px;animation:fade .3s ease}
@keyframes fade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
.lg .phero{position:relative;overflow:hidden;margin-top:24px;padding:40px 34px;border-radius:20px;box-shadow:0 16px 52px rgba(0,0,0,.42),inset 0 1px 0 var(--glass-highlight),inset 0 -10px 30px rgba(0,0,0,.18)}
.lg .phero:after{content:"";position:absolute;inset:0;z-index:0;border-radius:inherit;background:url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1400&q=60') center/cover;opacity:.10}
.lg .phero>*{position:relative;z-index:1}
.lg .eyebrow{font-size:.7rem;font-weight:700;letter-spacing:.2em;color:#0EBEA8;text-transform:uppercase;margin-bottom:12px;text-shadow:0 1px 3px rgba(0,0,0,.45)}
.lg h1{font-family:'Fraunces',serif;font-weight:800;font-size:clamp(2rem,5vw,3.4rem);line-height:1.1;letter-spacing:-.5px;text-shadow:0 1px 3px rgba(0,0,0,.45)}
.lg .phero p{color:#AFC4D8;font-size:1rem;line-height:1.7;margin-top:14px;max-width:620px;text-shadow:0 1px 3px rgba(0,0,0,.45)}
.lg .acts{display:flex;gap:10px;flex-wrap:wrap;margin-top:22px}
.lg .btn{padding:11px 22px;border-radius:10px;color:#fff;font-weight:700;font-size:.88rem;cursor:pointer;border:none;font-family:inherit}
.lg h2.sec{font-family:'Fraunces',serif;font-weight:800;font-size:1.7rem;margin:46px 0 18px;color:#fff;text-shadow:0 1px 3px rgba(0,0,0,.45)}
.lg .kick{font-size:.72rem;font-weight:700;letter-spacing:.16em;color:#AFC4D8;text-transform:uppercase;margin:40px 0 14px;text-shadow:0 1px 3px rgba(0,0,0,.45)}
.lg .grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.lg .grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
.lg .grid2{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
@media(max-width:880px){.lg .grid3,.lg .grid4{grid-template-columns:1fr}.lg .grid2{grid-template-columns:1fr}}
.lg .card{padding:24px 22px;transition:transform .25s;box-shadow:0 6px 22px rgba(0,0,0,.3),inset 0 1px 0 rgba(255,255,255,.35)}
.lg .card:hover{transform:translateY(-4px)}
.lg .card h3{font-family:'Fraunces',serif;font-weight:800;font-size:1.18rem;line-height:1.25;text-shadow:0 1px 3px rgba(0,0,0,.45)}
.lg .card .tag{font-family:'Fraunces',serif;font-style:italic;font-size:.88rem;color:#B8A68E;margin:6px 0 12px}
.lg .card ul{list-style:none}
.lg .card li{display:flex;gap:8px;font-size:.86rem;color:#cdddef;padding:4px 0}
.lg .card li b{font-weight:800;font-size:.78rem}
.lg .card .more{font-size:.84rem;font-weight:700;margin-top:14px}
.lg .subs{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
@media(max-width:680px){.lg .subs{grid-template-columns:1fr}}
.lg .sub-card{padding:18px;border-radius:12px;background:rgba(255,255,255,.05);border:1px solid var(--glass-stroke)}
.lg .strip{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:18px 22px;margin-top:14px;cursor:pointer;box-shadow:0 6px 22px rgba(0,0,0,.3),inset 0 1px 0 rgba(255,255,255,.35)}
.lg .strip .lead{font-size:.94rem;font-weight:700;text-shadow:0 1px 3px rgba(0,0,0,.45)}
.lg .strip .meta{font-size:.82rem;color:#AFC4D8;margin-top:3px}
.lg .go{background:#0A7C6E;color:#fff;padding:8px 15px;border-radius:9px;font-size:.82rem;font-weight:700;white-space:nowrap;border:none;cursor:pointer;font-family:inherit}
.lg .svc-row{display:grid;grid-template-columns:200px 1fr;gap:16px;padding:14px 18px;border-radius:12px;margin-bottom:8px;background:rgba(255,255,255,.04);border:1px solid var(--glass-stroke)}
@media(max-width:680px){.lg .svc-row{grid-template-columns:1fr}}
.lg .filters{display:flex;gap:14px;flex-wrap:wrap;align-items:center;padding:14px 18px;margin-top:12px}
.lg .flbl{font-size:.8rem;color:#AFC4D8;font-weight:600}
.lg .chip{padding:4px 11px;border-radius:8px;font-size:.8rem;font-weight:600;cursor:pointer;color:#8BA0B5;border:1px solid var(--glass-stroke);background:transparent;font-family:inherit}
.lg .chip.on{background:#0A7C6E;color:#fff;border-color:#0A7C6E}
.lg .psearch{display:flex;align-items:center;gap:8px;margin:14px 0;padding:8px 12px;border-radius:10px;background:rgba(255,255,255,.06);border:1px solid var(--glass-stroke)}
.lg .psearch input{flex:1;background:transparent;border:none;outline:none;color:#fff;font-size:.9rem;font-family:inherit}
.lg .prow{display:grid;grid-template-columns:1fr 130px 120px;gap:10px;align-items:center;padding:9px 14px;border-bottom:1px solid rgba(255,255,255,.08);font-size:.86rem}
.lg .prow:nth-child(odd){background:rgba(255,255,255,.03)}
.lg .pc{font-size:.7rem;font-weight:700;padding:2px 7px;border-radius:6px;text-align:center}
.lg .pr{color:#AFC4D8;text-align:right;font-size:.8rem}
.lg .bh{display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:12px;background:rgba(255,255,255,.05);border:1px solid var(--glass-stroke);border-left:4px solid #1B6B35;margin-bottom:10px}
.lg .bh .code{font-family:monospace;font-size:.9rem;font-weight:800;letter-spacing:2px;color:#7fe3a0;padding:6px 10px;border:1px solid rgba(127,227,160,.4);border-radius:6px}
.lg .bh .ttl{font-family:'Fraunces',serif;font-weight:800;font-size:1.1rem;color:#fff}
.lg .bh .bsub{font-size:.8rem;color:#AFC4D8;margin-top:2px}
.lg .tile{padding:14px 16px;border-radius:12px;box-shadow:0 3px 12px rgba(0,0,0,.22),inset 0 1px 0 rgba(255,255,255,.25)}
.lg .tile .tn{font-size:.92rem;font-weight:700;text-shadow:0 1px 3px rgba(0,0,0,.45)}
.lg .tile .td{font-size:.82rem;color:#AFC4D8;margin-top:4px;line-height:1.5}
.lg .badge{float:right;font-size:.68rem;font-weight:600;padding:2px 7px;border-radius:8px}
.lg .ftabs{display:flex;gap:2px;flex-wrap:wrap;margin-top:18px}
.lg .ft{flex:1;min-width:140px;text-align:center;padding:11px;border-radius:10px 10px 0 0;cursor:pointer;font-weight:600;font-size:.88rem;color:#AFC4D8;background:rgba(255,255,255,.04);border:none;font-family:inherit}
.lg .ft.on{color:#fff;background:rgba(255,255,255,.1)}
.lg .fbody{padding:22px;border-radius:0 0 14px 14px}
.lg .fgrid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
@media(max-width:640px){.lg .fgrid{grid-template-columns:1fr}}
.lg .fld label{display:block;font-size:.74rem;font-weight:600;color:#AFC4D8;text-transform:uppercase;letter-spacing:.04em;margin-bottom:4px}
.lg .fld input,.lg .fld select,.lg .fld textarea{width:100%;padding:10px 12px;border-radius:8px;border:1px solid rgba(255,255,255,.3);background:rgba(7,16,30,.45);color:#fff;font-size:.9rem;font-family:inherit;outline:none}
.lg .fld input::placeholder,.lg .fld textarea::placeholder{color:rgba(234,242,255,.5)}
.lg .fld input:focus,.lg .fld select:focus,.lg .fld textarea:focus{border-color:#0EBEA8;box-shadow:0 0 0 2px rgba(14,190,168,.25);background:rgba(7,16,30,.6)}
.lg .fld select option{color:#11243c;background:#f3f6fa}
.lg .fld textarea{min-height:80px;resize:vertical}
.lg .full{grid-column:1/-1}
.lg .founded{text-align:center;margin:40px auto 0;padding:20px;max-width:200px}
.lg .founded .v{font-family:'Fraunces',serif;font-weight:800;font-size:2rem;color:#0EBEA8}
.lg .founded .fl{font-size:.7rem;color:#8FA8BE;letter-spacing:.1em;text-transform:uppercase;margin-top:2px}
.lg .foot{max-width:1200px;margin:46px auto 24px;padding:26px 28px 18px}
.lg .foot-grid{display:grid;grid-template-columns:1.3fr 1fr 1fr 1fr 1fr;gap:18px;margin-bottom:14px}
@media(max-width:780px){.lg .foot-grid{grid-template-columns:1fr 1fr}}
.lg .foot .co{font-family:'Fraunces',serif;font-weight:800;font-size:1rem;color:#fff;margin-bottom:6px}
.lg .foot .blurb{font-size:.76rem;color:#8FA8BE;line-height:1.6}
.lg .foot h4{font-size:.78rem;font-weight:700;color:#0EBEA8;margin-bottom:7px}
.lg .foot a{display:block;font-size:.76rem;color:#8FA8BE;padding:2px 0;text-decoration:none;cursor:pointer}
.lg .foot a:hover{color:#EAF2FF}
.lg .foot .base{border-top:1px solid rgba(255,255,255,.12);padding-top:12px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;font-size:.72rem;color:#7A96AE}
.lg .gc{position:fixed;right:18px;bottom:18px;z-index:60;padding:13px 15px;border-radius:15px;width:206px;display:flex;flex-direction:column;gap:7px}
.lg .gc .gt{font-size:.66rem;letter-spacing:.12em;text-transform:uppercase;color:#0EBEA8;font-weight:700}
.lg .gc .gr{display:flex;justify-content:space-between;font-size:.74rem;color:#AFC4D8;font-weight:600}
.lg .gc .gv{font-family:'Fraunces',serif;color:#0EBEA8;font-weight:800}
.lg .gc input{width:100%;accent-color:#0EBEA8}
.lg .drawer{position:fixed;inset:0;z-index:120;background:rgba(8,18,32,.6);backdrop-filter:blur(4px)}
.lg .drawer .panel{position:absolute;top:0;right:0;height:100%;width:min(82vw,320px);background:#0d1c30;border-left:1px solid var(--glass-stroke);box-shadow:-12px 0 40px rgba(0,0,0,.6);padding:18px 16px;display:flex;flex-direction:column;gap:4px;animation:slidein .25s ease}
@keyframes slidein{from{transform:translateX(100%)}to{transform:translateX(0)}}
.lg .drawer .lk{padding:11px 12px;font-size:1rem}
.lg :focus-visible{outline:2px solid #0EBEA8;outline-offset:2px;border-radius:6px}
@media (prefers-reduced-transparency: reduce){.lg .glass{background:#11243c!important;backdrop-filter:none!important}.lg .glass:before{display:none}}
@media (prefers-reduced-motion: reduce){.lg *{animation:none!important;transition:none!important}}
`;

const Logo = () => (
  <svg width="44" height="60" viewBox="0 -10 86 130" fill="none" aria-label="iStructural logo">
    <defs>
      <radialGradient id="lgO" cx="50%" cy="35%" r="70%"><stop offset="0%" stopColor="#4AA3D9"/><stop offset="45%" stopColor="#1E5F8F"/><stop offset="85%" stopColor="#0A3556"/><stop offset="100%" stopColor="#051C2F"/></radialGradient>
      <radialGradient id="lgA" cx="50%" cy="50%" r="55%"><stop offset="80%" stopColor="#0EBEA8" stopOpacity="0"/><stop offset="92%" stopColor="#4AC8FF" stopOpacity="0.35"/><stop offset="100%" stopColor="#4AC8FF" stopOpacity="0"/></radialGradient>
      <radialGradient id="lgM" cx="40%" cy="35%" r="65%"><stop offset="0%" stopColor="#F7F5F0" stopOpacity="0.85"/><stop offset="55%" stopColor="#0EBEA8" stopOpacity="0.55"/><stop offset="100%" stopColor="#0A7C6E" stopOpacity="0.85"/></radialGradient>
      <clipPath id="lgTw"><path d="M28 92 L28 84 L31 84 L31 76 L34 76 L34 64 C36 56 38 44 40 32 C40.5 24 41 16 42 10 L42.6 4 L42.9 2 L43.4 4 L44 10 C45 16 45.5 24 46 32 C48 44 50 56 52 64 L52 76 L55 76 L55 84 L58 84 L58 92 Z"/></clipPath>
      <clipPath id="lgGl"><circle cx="58" cy="-3" r="4.55"/></clipPath>
    </defs>
    <rect x="32" y="92" width="22" height="1.3" fill="#0A7C6E" opacity="0.55"/>
    <rect x="42.4" y="93.3" width="1.2" height="20.4" fill="#0A7C6E" opacity="0.78"/>
    <circle cx="43" cy="114" r="0.9" fill="#0EBEA8"/>
    <circle cx="58" cy="-3" r="5.85" fill="url(#lgA)" opacity="0.85"/><circle cx="58" cy="-3" r="4.55" fill="url(#lgO)"/>
    <g clipPath="url(#lgGl)"><path d="M54.2 -5.9 Q55 -6.6 55.9 -6.5 Q56.6 -6.3 56.7 -5.7 Q56.3 -4.6 55.2 -4.4 Q54.1 -5.6 54.2 -5.9 Z" fill="#3E9B5F"/><path d="M58.4 -4.6 Q59.3 -4.9 59.9 -4.4 Q60.5 -3.4 60.2 -2.3 Q59.2 -1.4 58.3 -1.3 Q57.7 -2.9 58.2 -4.4 Z" fill="#3E9B5F"/></g>
    <circle cx="58" cy="-3" r="4.55" fill="none" stroke="#F7F5F0" strokeWidth="0.85" opacity="0.85"/>
    <line x1="0" y1="90" x2="86" y2="90" stroke="#F7F5F0" strokeWidth="0.9" opacity="0.55"/>
    <line x1="43" y1="44" x2="4" y2="88" stroke="#0EBEA8" strokeWidth="0.45" opacity="0.6"/>
    <line x1="43" y1="44" x2="82" y2="88" stroke="#0EBEA8" strokeWidth="0.45" opacity="0.6"/>
    <path d="M28 92 L28 84 L31 84 L31 76 L34 76 L34 64 C36 56 38 44 40 32 C40.5 24 41 16 42 10 L42.6 4 L42.9 2 L43.4 4 L44 10 C45 16 45.5 24 46 32 C48 44 50 56 52 64 L52 76 L55 76 L55 84 L58 84 L58 92 Z" fill="#0C1B2E" fillOpacity="0.55" stroke="#F7F5F0" strokeWidth="1" strokeDasharray="1.5,0.8"/>
    <path d="M40.5 92 L41.8 22 L40.6 32 C38.5 44 36.5 56 34.5 64 L34.5 76 L31.5 76 L31.5 84 L28.7 84 L28.7 92 Z" fill="#0A7C6E" fillOpacity="0.28" stroke="#0EBEA8" strokeWidth="0.35"/>
    <path d="M45.5 92 L44.2 22 L45.4 32 C47.5 44 49.5 56 51.5 64 L51.5 76 L54.5 76 L54.5 84 L57.3 84 L57.3 92 Z" fill="#0A7C6E" fillOpacity="0.28" stroke="#0EBEA8" strokeWidth="0.35"/>
    <path d="M40.5 92 L41.8 22 L44.2 22 L45.5 92 Z" fill="#0EBEA8" fillOpacity="0.32" stroke="#0EBEA8" strokeWidth="0.4"/>
    <g clipPath="url(#lgTw)"><circle cx="43" cy="17.6" r="1.15" fill="url(#lgM)"/><circle cx="43" cy="17.6" r="1.7" fill="none" stroke="#0EBEA8" strokeWidth="0.18" opacity="0.55"/></g>
    <circle cx="43" cy="2" r="0.7" fill="#0EBEA8"/>
  </svg>
);

// ===== Capacity Grid client-engagement panel (06_Clients) =====

// Capacity Grid — Client Engagement (06_Clients)
// Owner creates a project for a client, then runs the method scoped to that client:
// office capability -> Career Development Cards -> resource interchange -> corporate dashboard.
// Deterministic core (rule 23): all numbers computed here; an AI layer would only explain/justify.
// Self-contained: default export, no required props. Paste into App.jsx or render standalone.

// ---------------- model ----------------
const LEVELS = ["Technician", "Graduate", "Engineer", "Senior"];
const rank = (l) => Math.max(0, LEVELS.indexOf(l));
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const AREAS = ["High-Seismic", "High-rise Towers", "ETABS / 3D Modelling", "Detailing & BIM", "Bridges (Eurocode)", "Peer Review"];
const forte = {
  "New York": ["High-Seismic", "High-rise Towers", "Peer Review"],
  "Toronto": ["High-rise Towers", "ETABS / 3D Modelling", "Detailing & BIM"],
  "Paris": ["Bridges (Eurocode)", "Detailing & BIM"],
};
const T = [
  ["RFP & Bid", "Define structural scope & fee", "General", "Senior"],
  ["Concept", "Tower system & stability scheme", "High-rise Towers", "Senior"],
  ["Concept", "Seismic force-resisting system (high SDC)", "High-Seismic", "Senior"],
  ["Concept", "Bridge type & span arrangement", "Bridges (Eurocode)", "Senior"],
  ["Concept", "Preliminary sizing & load takedown", "General", "Engineer"],
  ["Detailed Design", "RC element design", "General", "Engineer"],
  ["Detailed Design", "Special seismic detailing ACI 318 Ch.18", "High-Seismic", "Senior"],
  ["Detailed Design", "CBC / ASCE 7 high-SDC compliance", "High-Seismic", "Senior"],
  ["Detailed Design", "Tall-building lateral design", "High-rise Towers", "Senior"],
  ["Detailed Design", "Bridge super/substructure to Eurocode", "Bridges (Eurocode)", "Senior"],
  ["Detailed Design", "Foundation design", "General", "Engineer"],
  ["Detailed Design", "PT floor design", "High-rise Towers", "Senior"],
  ["Analysis", "Build & run ETABS model", "ETABS / 3D Modelling", "Engineer"],
  ["Analysis", "ETABS shear-wall / 3D modelling", "ETABS / 3D Modelling", "Engineer"],
  ["Analysis", "Nonlinear response-history (PBSD)", "High-Seismic", "Senior"],
  ["Analysis", "Bridge FE & moving-load analysis", "Bridges (Eurocode)", "Senior"],
  ["Analysis", "Wind & seismic response analysis", "High-rise Towers", "Senior"],
  ["Analysis", "Design calculation report", "General", "Engineer"],
  ["Modelling & BIM", "Revit structural authoring", "Detailing & BIM", "Technician"],
  ["Modelling & BIM", "Federated BIM coordination", "Detailing & BIM", "Engineer"],
  ["Modelling & BIM", "ETABS model build & clean-up", "ETABS / 3D Modelling", "Technician"],
  ["Modelling & BIM", "3D parametric / Grasshopper", "ETABS / 3D Modelling", "Engineer"],
  ["Coordination", "Minute coordination meetings", "General", "Engineer"],
  ["Coordination", "Lead client & design meetings", "General", "Senior"],
  ["Drawings", "General arrangement drawings", "Detailing & BIM", "Technician"],
  ["Drawings", "Reinforcement detailing drawings", "Detailing & BIM", "Technician"],
  ["Drawings", "Special seismic detailing drawings", "Detailing & BIM", "Engineer"],
  ["QA/QC", "Internal design check", "General", "Senior"],
  ["QA/QC", "Tall-building peer review (LATBSDC/PEER TBI)", "Peer Review", "Senior"],
  ["Construction", "RFIs / shop drawings", "General", "Engineer"],
  ["Construction", "Site inspection & observation", "General", "Senior"],
];
const STAGES = [...new Set(T.map((t) => t[0]))];
const PD = [
  ["New York", "Robert Hayes", "Principal", "Senior", { "High-Seismic": 0.25, "Peer Review": 0.3 }],
  ["New York", "Aisha Khan", "Senior Seismic Engineer", "Senior", { "High-Seismic": 0.2 }],
  ["New York", "Tomas Rivera", "Structural Engineer", "Engineer", {}],
  ["New York", "Grace Lin", "Structural Engineer", "Engineer", {}],
  ["New York", "Daniel Park", "Junior Structural Engineer", "Graduate", {}],
  ["New York", "Maria Lopez", "Junior Structural Engineer", "Graduate", {}],
  ["New York", "Sofia Bauer", "Structural Technician", "Technician", {}],
  ["Toronto", "Daniel Wong", "Senior / Modelling Lead", "Senior", { "ETABS / 3D Modelling": 0.2 }],
  ["Toronto", "Priya Shah", "Associate (3D Specialist)", "Senior", { "ETABS / 3D Modelling": 0.32, "High-rise Towers": 0.1 }],
  ["Toronto", "Mohammed Ali", "Structural Engineer", "Engineer", { "ETABS / 3D Modelling": 0.1 }],
  ["Toronto", "Emma Clarke", "Structural Engineer", "Engineer", {}],
  ["Toronto", "Raj Patel", "Structural Engineer", "Engineer", {}],
  ["Toronto", "Olivia Brown", "Structural Engineer", "Engineer", {}],
  ["Toronto", "Lucas Meyer", "Graduate Engineer", "Graduate", {}],
  ["Toronto", "Hannah Reed", "Graduate Engineer", "Graduate", {}],
  ["Toronto", "Ethan Wright", "Graduate Engineer", "Graduate", {}],
  ["Toronto", "Sofia Mendez", "Senior BIM Technician", "Technician", { "Detailing & BIM": 0.15 }],
  ["Toronto", "Liam Tremblay", "ETABS Modeller / Detailer", "Technician", { "ETABS / 3D Modelling": 0.2 }],
  ["Toronto", "Noah Kim", "CAD Technician", "Technician", {}],
  ["Paris", "Julien Moreau", "Bridges Lead", "Senior", { "Bridges (Eurocode)": 0.3 }],
  ["Paris", "Camille Laurent", "Senior Bridge Engineer", "Senior", { "Bridges (Eurocode)": 0.2 }],
  ["Paris", "Antoine Dubois", "Structural Engineer", "Engineer", { "Bridges (Eurocode)": 0.1 }],
  ["Paris", "Lea Martin", "Structural Engineer", "Engineer", {}],
  ["Paris", "Chloe Petit", "Structural Engineer", "Engineer", {}],
  ["Paris", "Emma Rousseau", "Structural Engineer", "Engineer", {}],
  ["Paris", "Hugo Bernard", "Graduate Engineer", "Graduate", {}],
  ["Paris", "Louis Faure", "Graduate Engineer", "Graduate", {}],
  ["Paris", "Mathis Roy", "Structural Technician", "Technician", {}],
  ["Paris", "Ines Garnier", "Senior BIM Modeller", "Technician", { "Detailing & BIM": 0.35, "ETABS / 3D Modelling": 0.1 }],
];
const baseP = { Technician: 0.45, Graduate: 0.58, Engineer: 0.76, Senior: 0.92 };
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const seedOf = (s) => { let h = 0; for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0; return h; };

function buildPeople() {
  return PD.map(([office, name, title, level, sp]) => {
    const r = mulberry32(seedOf(office + name) + rank(level) * 17);
    const sc = T.map(([stage, act, area, tl]) => {
      let p = baseP[level];
      if (forte[office].includes(area)) p += 0.18;
      if (sp[area]) p += sp[area];
      if (level === "Technician" && (area === "Detailing & BIM" || area === "ETABS / 3D Modelling")) p += 0.18;
      if (!forte[office].includes(area) && area !== "General") p -= 0.12;
      if (tl === "Senior" && level !== "Senior") p -= 0.22;
      p = clamp(p, 0.03, 0.99);
      const exp = clamp(Math.round(p * 5 + (r() - 0.5)), 0, 5);
      const freq = exp >= 2 ? clamp(Math.round((forte[office].includes(area) || sp[area] ? 4 : 2) + (r() * 2 - 1)), 0, 5) : clamp(Math.round(r() * 2), 0, 2);
      const chal = clamp(Math.round((tl === "Senior" ? 4 : tl === "Engineer" ? 3 : 2) + (r() - 0.5)), 1, 5);
      return [exp, freq, chal];
    });
    return { office, name, title, level, sp, sc };
  });
}
const expected = (p) => T.map((t, i) => i).filter((i) => rank(T[i][3]) <= rank(p.level));
const coverage = (p) => { const e = expected(p); return e.length ? Math.round((e.filter((i) => p.sc[i][0] >= 3).length / e.length) * 100) : 0; };
const officeStrength = (people, o, a) => {
  const ppl = people.filter((p) => p.office === o); const idx = T.map((t, i) => i).filter((i) => T[i][2] === a);
  if (!idx.length || !ppl.length) return 0;
  let s = 0; ppl.forEach((p) => idx.forEach((i) => (s += p.sc[i][0])));
  return Math.round((s / (ppl.length * idx.length) / 5) * 100);
};
const personAreaPct = (p, a) => { const idx = T.map((t, i) => i).filter((i) => T[i][2] === a); return idx.length ? Math.round((idx.reduce((s, i) => s + p.sc[i][0], 0) / (idx.length * 5)) * 100) : 0; };
function supportFor(people, p, i) {
  const same = people.filter((x) => x.office === p.office && x !== p && x.sc[i][0] >= 4);
  if (same.length) { const top = same.sort((a, b) => b.sc[i][0] - a.sc[i][0])[0]; return ["Inhouse", top.name]; }
  const other = {};
  people.forEach((x) => { if (x.office !== p.office && x.sc[i][0] >= 4) (other[x.office] = other[x.office] || []).push(x); });
  const offs = Object.keys(other);
  if (offs.length) { const off = offs.sort((a, b) => Math.max(...other[b].map((z) => z.sc[i][0])) - Math.max(...other[a].map((z) => z.sc[i][0])))[0]; const top = other[off].sort((a, b) => b.sc[i][0] - a.sc[i][0])[0]; return ["Offshore by " + off, top.name]; }
  return ["External / Hire", ""];
}
function progression(people, p) {
  const e = expected(p);
  const mastered = T.filter((t, i) => p.sc[i][0] >= 4 && p.sc[i][1] >= 4 && p.sc[i][2] <= 2).length;
  const stretch = T.filter((t, i) => p.sc[i][0] >= 3 && p.sc[i][2] >= 4).length;
  const gaps = e.filter((i) => p.sc[i][0] <= 1).length;
  const ri = rank(p.level); const cov = coverage(p);
  let nxt = null, nextcov = 0;
  if (ri < 3) { nxt = LEVELS[ri + 1]; const nidx = T.map((t, i) => i).filter((i) => T[i][3] === nxt); nextcov = nidx.length ? Math.round((nidx.reduce((s, i) => s + p.sc[i][0], 0) / (nidx.length * 5)) * 100) : 0; }
  const readiness = Math.round(0.6 * cov + 0.4 * nextcov);
  let rec = "On track";
  if (nxt && cov >= 70 && nextcov >= 40) rec = "Level-up → " + nxt;
  else if (mastered >= 4) rec = "Rotate / mentor";
  else if (gaps >= 4) rec = `Development focus (${gaps})`;
  else if (!nxt) rec = "Mentor / leadership";
  return { mastered, stretch, gaps, readiness, rec };
}
const colFor = (v) => (v >= 60 ? "#34d399" : v >= 35 ? "#fbbf24" : "#f87171");
const OFFCOL = { "New York": "#6db3e6", "Toronto": "#3fd0d8", "Paris": "#c9a85f" };

const CG_CSS = `
.cg{--nv:#0C1B2E;font-family:'DM Sans',system-ui,sans-serif;color:#EAF2FF;background:#0C1B2E;background-image:radial-gradient(900px 500px at 8% 0%,#1c3a72 0,transparent 55%),radial-gradient(800px 500px at 96% 4%,#0d5a52 0,transparent 50%);min-height:100vh;padding:22px}
.cg *{box-sizing:border-box}
.cg .wrap{max-width:1080px;margin:0 auto}
.cg .top{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:8px}
.cg h1{font-family:'Fraunces',serif;font-weight:800;font-size:1.5rem;margin-right:auto}
.cg select,.cg .nb{background:rgba(255,255,255,.08);color:#EAF2FF;border:1px solid rgba(255,255,255,.2);border-radius:9px;padding:8px 12px;font-size:.85rem;font-family:inherit;cursor:pointer}
.cg .nb{background:#0A7C6E;border:none;font-weight:700}
.cg .tag{font-size:.62rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#0EBEA8;border:1px solid rgba(14,190,168,.4);padding:4px 9px;border-radius:20px}
.cg .tabs{display:flex;gap:4px;margin:14px 0}
.cg .tb{padding:8px 16px;border-radius:10px;font-size:.85rem;font-weight:700;cursor:pointer;color:#8BA0B5;background:rgba(255,255,255,.05);border:none;font-family:inherit}
.cg .tb.on{color:#0EBEA8;background:rgba(10,124,110,.25)}
.cg .card{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);border-radius:16px;padding:20px;margin-bottom:16px}
.cg .card h2{font-family:'Fraunces',serif;font-weight:800;font-size:1.15rem}
.cg .cd{font-size:.78rem;color:#9fb6d0;margin:4px 0 14px}
.cg .kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:16px}
.cg .kpi{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);border-radius:13px;padding:14px}
.cg .kn{font-family:'Fraunces',serif;font-weight:800;font-size:1.7rem}.cg .kl{font-size:.72rem;color:#9fb6d0;margin-top:2px}
.cg .grow{display:grid;grid-template-columns:160px 1fr;gap:12px;align-items:center;margin-bottom:9px}.cg .gl{font-size:.78rem;font-weight:700}
.cg .gbars{display:flex;flex-direction:column;gap:4px}
.cg .gb{position:relative;background:rgba(255,255,255,.08);border-radius:6px;height:17px;display:flex;align-items:center}
.cg .gb span{position:absolute;left:0;top:0;height:100%;border-radius:6px;opacity:.88}.cg .gb b{position:relative;margin-left:8px;font-size:.66rem;font-weight:800;z-index:1}.cg .gb i{position:absolute;right:8px;font-style:normal;font-size:.56rem;color:#cfe0f0;font-weight:700}
.cg .flow{display:grid;grid-template-columns:1.4fr 1fr 26px 1fr;gap:8px;align-items:center;padding:8px 0;border-bottom:1px solid rgba(255,255,255,.07);font-size:.84rem}
.cg .from{font-weight:800;text-align:right}.cg .arrow{text-align:center;color:#0EBEA8;font-weight:800}.cg .to{color:#cfe0f0}
.cg .lc{display:inline-block;background:rgba(52,211,153,.16);color:#34d399;font-weight:700;font-size:.8rem;padding:5px 11px;border-radius:20px;margin:4px 6px 0 0}
.cg .plist{display:grid;grid-template-columns:repeat(2,1fr);gap:8px}
@media(max-width:760px){.cg .kpis,.cg .plist{grid-template-columns:1fr}.cg .grow,.cg .flow{grid-template-columns:1fr}}
.cg .prow{display:flex;align-items:center;gap:10px;padding:9px 11px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:10px;cursor:pointer}
.cg .prow:hover{border-color:rgba(14,190,168,.5)}
.cg .av{width:34px;height:34px;border-radius:9px;display:grid;place-items:center;font-weight:800;color:#0C1B2E;font-size:.78rem}
.cg .pn{font-weight:700;font-size:.85rem}.cg .pl{font-size:.66rem;color:#9fb6d0}
.cg .pcov{margin-left:auto;font-family:'Fraunces',serif;font-weight:800}
.cg .sec{margin-top:12px}.cg .sh{font-size:.72rem;font-weight:800;letter-spacing:.05em;text-transform:uppercase;color:#cfe0f0;border-bottom:1px solid rgba(255,255,255,.14);padding-bottom:4px;margin-bottom:5px}
.cg table{width:100%;border-collapse:collapse}.cg td{padding:5px 6px;border-bottom:1px solid rgba(255,255,255,.05);font-size:.78rem;vertical-align:middle}
.cg .tk{width:46%}.cg .ar{width:20%;color:#9fb6d0;font-size:.68rem}.cg .sp{width:24%;text-align:right}
.cg .mbs{display:inline-flex;align-items:flex-end;gap:3px;height:17px}.cg .mb{width:7px;border-radius:1px}
.cg .sup{font-size:.62rem;font-weight:800;padding:3px 7px;border-radius:11px}.cg .ih{background:rgba(52,211,153,.16);color:#34d399}.cg .off{background:rgba(201,168,95,.18);color:#e0b65f}.cg .ext{background:rgba(248,113,113,.16);color:#f87171}
.cg .back{color:#0EBEA8;cursor:pointer;font-weight:700;font-size:.84rem;background:none;border:none;font-family:inherit;padding:0;margin-bottom:10px}
.cg .legend{display:flex;gap:14px;flex-wrap:wrap;font-size:.68rem;color:#9fb6d0;align-items:center;margin:10px 0}
.cg .legend i{display:inline-block;width:10px;height:10px;border-radius:2px;margin-right:4px}
.cg .empty{padding:30px;text-align:center;color:#9fb6d0}
`;

function CapacityGridPanel() {
  const demoPeople = useMemo(() => buildPeople(), []);
  const [clients, setClients] = useState([{ name: "Demo Global Structures Inc.", offices: ["New York", "Toronto", "Paris"], people: demoPeople }]);
  const [ci, setCi] = useState(0);
  const [view, setView] = useState("corporate");
  const [person, setPerson] = useState(null);
  const client = clients[ci];
  const people = client.people;
  const offices = client.offices;

  const newClient = () => {
    const n = (typeof window !== "undefined" && window.prompt("Client name?", "")) || "";
    if (!n.trim()) return;
    setClients([...clients, { name: n.trim(), offices: [], people: [] }]);
    setCi(clients.length); setView("corporate"); setPerson(null);
  };

  const firmCov = people.length ? Math.round(people.reduce((s, p) => s + coverage(p), 0) / people.length) : 0;
  const lvlup = people.filter((p) => progression(people, p).rec.startsWith("Level-up")).map((p) => p.name);

  const minibars = (e, f, c) => (
    <span className="mbs">
      <span className="mb" style={{ background: "#34d399", height: `${e * 3.2}px` }} />
      <span className="mb" style={{ background: "#6db3e6", height: `${f * 3.2}px` }} />
      <span className="mb" style={{ background: "#c9a85f", height: `${c * 3.2}px` }} />
    </span>
  );
  const init = (n) => n.split(" ").slice(0, 2).map((w) => w[0]).join("");

  return (
    <div className="cg">
      <style>{CG_CSS}</style>
      <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,800&family=DM+Sans:wght@400;600;700&display=swap" rel="stylesheet" />
      <div className="wrap">
        <div className="top">
          <h1>Capacity Grid — Client Engagement</h1>
          <span className="tag">06 · Clients</span>
          <select value={ci} onChange={(e) => { setCi(+e.target.value); setPerson(null); setView("corporate"); }}>
            {clients.map((c, i) => <option key={i} value={i}>{c.name}</option>)}
          </select>
          <button className="nb" onClick={newClient}>+ New client</button>
        </div>

        {offices.length === 0 ? (
          <div className="card empty">
            <h2>{client.name}</h2>
            <p style={{ marginTop: 8 }}>New client created. Next steps to run the method:</p>
            <p style={{ marginTop: 10, fontSize: ".85rem", lineHeight: 1.8 }}>
              1. Add the client's offices &nbsp;·&nbsp; 2. Distribute Phase 0 activity templates &nbsp;·&nbsp; 3. Import Phase 1 scores (Experience / Frequency / Challenge) &nbsp;·&nbsp; 4. Cards, office forte and the corporate dashboard generate automatically.
            </p>
            <p style={{ marginTop: 12, color: "#0EBEA8" }}>Switch to "Demo Global Structures Inc." to see a fully populated engagement.</p>
          </div>
        ) : (
          <>
            <div className="tabs">
              {[["corporate", "Corporate"], ["offices", "Offices"], ["people", "People & Cards"]].map(([k, l]) => (
                <button key={k} className={"tb" + (view === k ? " on" : "")} onClick={() => { setView(k); setPerson(null); }}>{l}</button>
              ))}
            </div>

            {view === "corporate" && (
              <>
                <div className="kpis">
                  <div className="kpi"><div className="kn">{people.length}</div><div className="kl">Engineers · {offices.length} offices</div></div>
                  <div className="kpi"><div className="kn">{firmCov}%</div><div className="kl">Firm avg coverage</div></div>
                  <div className="kpi"><div className="kn">{lvlup.length}</div><div className="kl">Level-up candidates</div></div>
                  <div className="kpi"><div className="kn">{AREAS.length}</div><div className="kl">Capability areas</div></div>
                </div>
                <div className="card">
                  <h2>Office forte by capability area</h2>
                  <div className="cd">Mean experience scaled 0-100. {offices.map((o) => <span key={o} style={{ color: OFFCOL[o] }}>{o} </span>)}</div>
                  {AREAS.map((a) => (
                    <div className="grow" key={a}>
                      <div className="gl">{a}</div>
                      <div className="gbars">
                        {offices.map((o) => { const v = officeStrength(people, o, a); return (
                          <div className="gb" key={o}><span style={{ width: `${v}%`, background: OFFCOL[o] }} /><b>{v}</b><i>{o.slice(0, 2).toUpperCase()}</i></div>
                        ); })}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="card">
                  <h2>Resource interchange — who supports whom</h2>
                  <div className="cd">Each capability flows from its lead office to offices that are thin in it. The firm acting as one.</div>
                  {AREAS.map((a) => {
                    const s = {}; offices.forEach((o) => (s[o] = officeStrength(people, o, a)));
                    const lead = offices.reduce((x, o) => (s[o] > s[x] ? o : x), offices[0]);
                    const weak = offices.filter((o) => o !== lead && s[o] < 45);
                    if (!weak.length) return null;
                    return <div className="flow" key={a}><span>{a}</span><span className="from" style={{ color: OFFCOL[lead] }}>{lead}</span><span className="arrow">→</span><span className="to">{weak.join(", ")}</span></div>;
                  })}
                </div>
                <div className="card">
                  <h2>Level-up candidates (firm-wide)</h2>
                  <div className="cd">Ready to move up a level, from the progression engine.</div>
                  {lvlup.length ? lvlup.map((n) => <span className="lc" key={n}>{n}</span>) : <span className="lc">—</span>}
                </div>
              </>
            )}

            {view === "offices" && offices.map((o) => {
              const ppl = people.filter((p) => p.office === o);
              const s = {}; AREAS.forEach((a) => (s[a] = officeStrength(people, o, a)));
              const fo = AREAS.reduce((x, a) => (s[a] > s[x] ? a : x), AREAS[0]);
              return (
                <div className="card" key={o}>
                  <h2 style={{ color: OFFCOL[o] }}>{o}</h2>
                  <div className="cd">{ppl.length} people · forte: <b>{fo}</b> · avg coverage {ppl.length ? Math.round(ppl.reduce((x, p) => x + coverage(p), 0) / ppl.length) : 0}%</div>
                  {AREAS.map((a) => (
                    <div className="grow" key={a}><div className="gl">{a}</div><div className="gbars"><div className="gb"><span style={{ width: `${s[a]}%`, background: OFFCOL[o] }} /><b>{s[a]}</b></div></div></div>
                  ))}
                </div>
              );
            })}

            {view === "people" && !person && (
              <div className="card">
                <h2>People — open a Career Development Card</h2>
                <div className="cd">{people.length} engineers across {offices.length} offices.</div>
                <div className="plist">
                  {people.map((p) => { const cov = coverage(p); return (
                    <div className="prow" key={p.name} onClick={() => setPerson(p)}>
                      <div className="av" style={{ background: OFFCOL[p.office] }}>{init(p.name)}</div>
                      <div><div className="pn">{p.name}</div><div className="pl">{p.level} · {p.office}</div></div>
                      <div className="pcov" style={{ color: colFor(cov) }}>{cov}%</div>
                    </div>
                  ); })}
                </div>
              </div>
            )}

            {view === "people" && person && (() => {
              const cov = coverage(person); const pr = progression(people, person);
              return (
                <div className="card">
                  <button className="back" onClick={() => setPerson(null)}>← all people</button>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 12, borderLeft: "4px solid #0EBEA8", paddingLeft: 14 }}>
                    <div>
                      <div style={{ fontSize: ".68rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "#0EBEA8" }}>Career Development Card</div>
                      <div style={{ fontFamily: "Fraunces,serif", fontWeight: 800, fontSize: "1.4rem" }}>{person.name}</div>
                      <div style={{ fontSize: ".82rem", color: "#9fb6d0" }}>{person.title} · {person.office}</div>
                    </div>
                    <div style={{ marginLeft: "auto", textAlign: "right" }}>
                      <div style={{ fontFamily: "Fraunces,serif", fontWeight: 800, fontSize: "1.7rem", color: colFor(cov) }}>{cov}%</div>
                      <div style={{ fontSize: ".6rem", color: "#9fb6d0", textTransform: "uppercase", letterSpacing: ".1em" }}>coverage</div>
                      <div style={{ fontSize: ".72rem", color: "#0EBEA8", fontWeight: 700, marginTop: 3 }}>{pr.rec}</div>
                    </div>
                  </div>
                  <div className="legend">
                    <span><i style={{ background: "#34d399" }} />Experience</span>
                    <span><i style={{ background: "#6db3e6" }} />Frequency</span>
                    <span><i style={{ background: "#c9a85f" }} />Challenge</span>
                    <span className="sup ih">Inhouse</span><span className="sup off">Offshore by [office]</span>
                  </div>
                  {STAGES.map((st) => {
                    const rows = T.map((t, i) => [t, i]).filter(([t]) => t[0] === st);
                    return (
                      <div className="sec" key={st}>
                        <div className="sh">{st}</div>
                        <table><tbody>
                          {rows.map(([t, i]) => {
                            const [e, f, c] = person.sc[i];
                            const gap = expected(person).includes(i) && e <= 1;
                            let sup = null;
                            if (gap) { const [src, who] = supportFor(people, person, i); const cls = src === "Inhouse" ? "ih" : src.startsWith("Offshore") ? "off" : "ext"; sup = <span className={"sup " + cls}>{src}{who ? " · " + who : ""}</span>; }
                            return (
                              <tr key={i}>
                                <td className="tk">{t[1]}</td>
                                <td className="ar">{t[2]}</td>
                                <td>{minibars(e, f, c)}</td>
                                <td className="sp">{sup}</td>
                              </tr>
                            );
                          })}
                        </tbody></table>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </>
        )}
        <div style={{ textAlign: "center", color: "#7a96ae", fontSize: ".7rem", marginTop: 16 }}>iStructural Group Inc. · Capacity Grid · deterministic core, AI advisory · simulated demo</div>
      </div>
    </div>
  );
}


export default function App() {
  const [page, setPage] = useState("home");
  const [opacity, setOpacity] = useState(0.12);
  const [drawer, setDrawer] = useState(false);
  const [owner, setOwner] = useState(false);
  // Owner sign-in via Google, restricted to the whitelist. No password is shared with the site. No DNS/email needed.
  const [ownerEmail, setOwnerEmail] = useState("");
  const [authErr, setAuthErr] = useState("");
  const OWNER_WHITELIST = ["info@istructgroup.com", "talih.younes@istructgroup.com", "talih.younes@me.com"];
  const FIREBASE_CONFIG = { apiKey: "AIzaSyASG9l1UDzQAFm0o24cSXi0k9HYtiqQm9w", authDomain: "istructural-edge.firebaseapp.com", projectId: "istructural-edge", storageBucket: "istructural-edge.firebasestorage.app", messagingSenderId: "125762505073", appId: "1:125762505073:web:452800fefee54191b38ed0" };
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.firebase && window.firebase.auth) return;
    const load = (src) => new Promise((res, rej) => { const s = document.createElement("script"); s.src = src; s.async = true; s.onload = res; s.onerror = rej; document.head.appendChild(s); });
    (async () => {
      try {
        await load("https://www.gstatic.com/firebasejs/10.12.5/firebase-app-compat.js");
        await load("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth-compat.js");
        if (!window.firebase.apps || window.firebase.apps.length === 0) window.firebase.initializeApp(FIREBASE_CONFIG);
      } catch (e) { setAuthErr("Sign-in failed to load."); }
    })();
  }, []);
  const signInGoogle = async () => {
    setAuthErr("");
    if (!(window.firebase && window.firebase.auth)) { setAuthErr("Still loading, try again in a moment."); return; }
    try {
      const provider = new window.firebase.auth.GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      const result = await window.firebase.auth().signInWithPopup(provider);
      const email = ((result && result.user && result.user.email) || "").toLowerCase();
      if (OWNER_WHITELIST.map((e) => e.toLowerCase()).includes(email)) { setOwner(true); setOwnerEmail(email); }
      else { try { await window.firebase.auth().signOut(); } catch (e2) {} setAuthErr("This account is not authorised. Use info@istructgroup.com."); }
    } catch (e) {
      const code = (e && e.code) || "";
      setAuthErr(code.indexOf("popup-closed") >= 0 || code.indexOf("cancelled") >= 0 ? "Sign-in cancelled." : "Sign-in failed: " + (e && e.message || code));
    }
  };
  const signOutOwner = async () => { try { if (window.firebase && window.firebase.auth) await window.firebase.auth().signOut(); } catch (e) {} setOwner(false); setOwnerEmail(""); };
  const [pCat, setPCat] = useState("All");
  const [pReg, setPReg] = useState("All");
  const [pQ, setPQ] = useState("");
  const [pAll, setPAll] = useState(false);
  const [tab, setTab] = useState("s1");
  const [npf, setNpf] = useState({app:"NPPE"});
  const [npConsent, setNpConsent] = useState(false);
  const [npErr, setNpErr] = useState("");
  const npValid = NPPE_FIELDS.every(f => !f.req || (f.t==="preset") || (npf[f.k] && String(npf[f.k]).trim())) && npConsent;
  const submitNppe = () => {
    if (!npValid) { setNpErr("Please complete all required fields and tick the consent box."); return; }
    setNpErr("");
    const lines = NPPE_FIELDS.map(f => `${f.l.replace(" (optional)","")}: ${f.t==="preset" ? (f.v||"NPPE") : (npf[f.k]||"")}`);
    lines.push(`Consent: Yes — ${NPPE_CONSENT}`);
    const body = encodeURIComponent("NPPE Study Tutor access request\n\n" + lines.join("\n"));
    const subject = encodeURIComponent("NPPE Study Tutor — access request");
    window.location.href = `mailto:info@istructgroup.com?subject=${subject}&body=${body}`;
  };

  const go = (id) => { setPage(id); setDrawer(false); window.scrollTo({top:0}); };
  const isSvc = ["s1","s2","s3"].includes(page);

  const projF = PROJECTS.filter(p => {
    if (pCat !== "All" && p.c !== pCat) return false;
    if (pReg === "Other") { if (["UAE","KSA","Qatar","Lebanon","North America"].includes(p.r)) return false; }
    else if (pReg !== "All" && p.r !== pReg) return false;
    if (pQ) return (p.n+p.c+p.r+(p.country||"")).toLowerCase().includes(pQ.toLowerCase());
    return true;
  });
  const projShown = pAll ? projF : projF.slice(0,20);

  return (
    <div className="lg" style={{"--glass-opacity":opacity}}>
      <style>{CSS}</style>
      <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,800&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <div className="bg" />
      <div className="wrap">

        <nav className="glass">
          <div className="brand" onClick={() => go("home")}>
            <Logo />
            <div><div className="n">iStructural Group Inc.</div><div className="s">Structural Solutions · Management · AI</div></div>
          </div>
          <div className="navlinks">
            <button className={"lk"+(page==="home"?" active":"")} onClick={()=>go("home")}>Home</button>
            <span className="dd"><span className={"lk"+(isSvc?" active":"")}>Services ▾</span>
              <span className="dd-menu">
                <button className="lk" onClick={()=>go("s1")}>Management</button>
                <button className="lk" onClick={()=>go("s2")}>Design</button>
                <button className="lk" onClick={()=>go("s3")}>AI & Technology</button>
              </span>
            </span>
            <button className={"lk"+(page==="projects"?" active":"")} onClick={()=>go("projects")}>Projects</button>
            <button className={"lk"+(page==="training"?" active":"")} onClick={()=>go("training")}>Training</button>
            <button className={"lk"+(page==="hub"?" active":"")} onClick={()=>go("hub")}>Knowledge Hub</button>
            <button className={"lk"+(page==="resources"?" active":"")} onClick={()=>go("resources")}>Resources</button>
            <button className={"lk"+(page==="contact"?" active":"")} onClick={()=>go("contact")}>Contact</button>
            <button className="nav-cta" onClick={()=>go("start")}>Start a Project</button>
          </div>
          <button className="hamb" onClick={()=>setDrawer(true)} aria-label="Menu">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
          </button>
        </nav>

        {/* HOME */}
        {page==="home" && (
          <div className="page">
            <div className="phero glass">
              <div className="eyebrow">Since 2010 · Structural Solutions · Management · AI Assessment</div>
              <h1>Engineering intelligence<br/>for the built world</h1>
              <p>iStructural Group Inc. has championed advanced structural engineering for complex and unconventional projects for over two decades. Hybrid structural systems, structural forensics, seismic and wind engineering, and finite element modeling, now powered by AI-driven assessment and next-generation digital tools.</p>
              <div className="acts">
                <button className="btn" style={{background:P.s1}} onClick={()=>go("s1")}>Management</button>
                <button className="btn" style={{background:P.s2}} onClick={()=>go("s2")}>Design & Consultancy</button>
                <button className="btn" style={{background:P.teal}} onClick={()=>go("s3")}>AI & Technology</button>
              </div>
            </div>
            <div className="grid3" style={{marginTop:24}}>
              {PILLARS.map(s => (
                <article key={s.key} className="card glass" onClick={()=>go(s.key)} style={{cursor:"pointer"}}>
                  <h3 style={{color:s.c}}>{s.t}</h3>
                  <div className="tag">{s.tag}</div>
                  <ul>{s.items.map((it,i)=><li key={i}><b style={{color:s.ac}}>+</b>{it}</li>)}</ul>
                  <div className="more" style={{color:s.c}}>Explore services →</div>
                </article>
              ))}
            </div>
            <div className="kick">Three damage assessment sub-markets</div>
            <div className="subs">
              <div className="sub-card"><div style={{fontSize:".84rem",fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",color:"#e08066"}}>Post-natural disaster</div></div>
              <div className="sub-card"><div style={{fontSize:".84rem",fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",color:"#cc6a6a"}}>Post-conflict and war zones</div></div>
              <div className="sub-card"><div style={{fontSize:".84rem",fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",color:"#b389c6"}}>Heritage and aging assets</div></div>
            </div>
            <div className="strip glass" onClick={()=>go("hub")}>
              <div><div className="lead" style={{color:"#7fe3a0"}}>Knowledge Hub, free for every engineer, architect, safety officer, and developer</div>
              <div className="meta">Forms, crack library, calculators, software directory, standards, management templates</div></div>
              <button className="go" style={{background:P.greenD}}>Browse →</button>
            </div>
            <div className="strip glass" onClick={()=>go("resources")}>
              <div><div className="lead" style={{color:P.tealL}}>Resources Management, a growing collection of iStructural apps</div>
              <div className="meta">Capacity Grid, workforce capability intelligence under Resources Management. Open it.</div></div>
              <button className="go">Open the box →</button>
            </div>
            <div className="founded glass"><div className="v">2010</div><div className="fl">Founded</div></div>
          </div>
        )}

        {/* S1 */}
        {page==="s1" && (
          <div className="page">
            <div className="phero glass" style={{borderTop:`4px solid ${P.s1}`}}>
              <div className="eyebrow" style={{color:"#6db3e6"}}>Service 01</div>
              <h1>Management & Business Support</h1>
              <p>Strategic project management, business growth advisory, financial risk strategies, and value engineering. Aligning with new standards and surpassing client expectations.</p>
            </div>
            <h2 className="sec">What we deliver</h2>
            {S1ROWS.map((r,i)=>(<div key={i} className="svc-row"><div style={{fontWeight:700,color:"#6db3e6"}}>{r[0]}</div><div style={{color:"#AFC4D8",fontSize:".88rem",lineHeight:1.6}}>{r[1]}</div></div>))}
            <button className="btn" style={{background:P.s1,marginTop:16}} onClick={()=>go("start")}>Start a Management Inquiry →</button>
          </div>
        )}

        {/* S2 */}
        {page==="s2" && (
          <div className="page">
            <div className="phero glass" style={{borderTop:`4px solid ${P.s2}`}}>
              <div className="eyebrow" style={{color:"#b389c6"}}>Service 02</div>
              <h1>Design Services & Consultancy</h1>
              <p>Performance-based seismic design for super-tall structures exceeding 200m. Advanced nonlinear applications. CSi certified training programs.</p>
            </div>
            <h2 className="sec">Third-Party Consultancy</h2>
            <div className="grid4">
              {[["High-Rise",["Lateral stability","Shortening vertical elements","Human response"]],["Bridges",["Alternative concepts (V.E.)","Design + verification","Stage modelling"]],["Irregular",["Rotated/twisted buildings","Vibration analysis","Thermal design","Transfer structures"]]].map((c,i)=>(
                <div key={i} className="card glass"><h3 style={{fontSize:"1.05rem",color:"#b389c6"}}>{c[0]}</h3><ul>{c[1].map((x,j)=><li key={j}><b style={{color:P.s2}}>+</b>{x}</li>)}</ul></div>
              ))}
              <div className="card glass" style={{border:"1px solid rgba(107,58,125,.5)"}}><h3 style={{fontSize:"1.05rem",color:"#b389c6"}}>Structural Assessment Platform</h3><div className="tag" style={{margin:"6px 0"}}>Phase 1 · Phase 2 · Conditional AI escalation</div><div style={{fontSize:".82rem",color:"#AFC4D8",lineHeight:1.5}}>Preliminary advisory through full stamped engineering with FEA, repair drawings, authority submission.</div></div>
            </div>
            <button className="btn" style={{background:P.s2,marginTop:16}} onClick={()=>go("start")}>Start a Design Inquiry →</button>
          </div>
        )}

        {/* S3 */}
        {page==="s3" && (
          <div className="page">
            <div className="phero glass" style={{borderTop:`4px solid ${P.s3}`}}>
              <div className="eyebrow">Service 03</div>
              <h1>AI & Technology Services</h1>
              <p>AI Literacy and Organizational Readiness for any industry. For AI-Augmented structural assessment, see Design Services & Consultancy.</p>
            </div>
            <h2 className="sec">AI Literacy & Organizational Readiness</h2>
            <div className="grid2">
              {S3CARDS.map((c,i)=>(<div key={i} className="card glass"><h3 style={{fontSize:"1.08rem",color:"#5fa8e0"}}>{c[0]}</h3><div style={{fontSize:".86rem",color:"#AFC4D8",marginTop:6,lineHeight:1.55}}>{c[1]}</div></div>))}
            </div>
            <button className="btn" style={{background:P.s3,marginTop:16}} onClick={()=>go("start")}>Start an AI Literacy Inquiry →</button>
          </div>
        )}

        {/* HUB */}
        {page==="hub" && (
          <div className="page">
            <div className="phero glass" style={{borderTop:`4px solid ${P.greenD}`}}>
              <div className="eyebrow" style={{color:"#7fe3a0"}}>Free for everyone</div>
              <h1>Knowledge Hub</h1>
              <p>The most comprehensive free structural, engineering, and management resource online. For engineers, architects, students, safety officers, clients, and government officials.</p>
            </div>
            <div style={{marginTop:24}}>
              {HUB.map((b,bi)=>(
                <div key={b.code} style={{marginBottom:18}}>
                  <div className="bh"><span className="code">{b.code}</span><div style={{flex:1}}><div className="ttl">{b.title}</div><div className="bsub">{`Section · 0${bi+1} of 03 — ${b.sub}`}</div></div></div>
                  <div className={b.items.length===4?"grid4":"grid3"}>
                    {b.items.map((t,i)=>{const lt=L[t[3]]||t[3];return (
                      <div key={i} className="tile glass"><span className="badge" style={{background:lt+"26",color:lt}}>{t[2]}</span><div className="tn" style={{color:lt}}>{t[0]}</div><div className="td">{t[1]}</div></div>
                    );})}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROJECTS */}
        {page==="projects" && (
          <div className="page">
            <div className="phero glass">
              <div className="eyebrow">Selected Portfolio</div>
              <h1>Projects</h1>
              <p>A curated selection of representative projects across buildings, bridges, and infrastructure in the UAE, KSA, Qatar, Lebanon, and internationally.</p>
            </div>
            <div className="filters glass"><span className="flbl">Type:</span>{CATS.map(c=><span key={c} className={"chip"+(c===pCat?" on":"")} onClick={()=>{setPCat(c);setPAll(false);}}>{c}</span>)}</div>
            <div className="filters glass" style={{marginTop:8}}><span className="flbl">Region:</span>{REGIONS.map(r=><span key={r} className={"chip"+(r===pReg?" on":"")} onClick={()=>{setPReg(r);setPAll(false);}}>{r}</span>)}</div>
            <div className="psearch glass">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8BA0B5" strokeWidth="2.2" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
              <input value={pQ} onChange={e=>{setPQ(e.target.value);setPAll(false);}} placeholder="Search projects by name, type, region, country..." />
              <span style={{fontSize:".8rem",color:"#AFC4D8",whiteSpace:"nowrap"}}>{projF.length} {projF.length===1?"project":"projects"}</span>
            </div>
            <div className="glass" style={{padding:"6px 10px",marginBottom:24}}>
              {projShown.map((p,i)=>{const col=L[catCol[p.c]]||catCol[p.c]||"#9fb3d4";return (
                <div key={i} className="prow"><div style={{textShadow:"0 1px 3px rgba(0,0,0,.45)"}}>{p.n}</div><span className="pc" style={{background:col+"26",color:col}}>{p.c}</span><div className="pr">{p.country||p.r}</div></div>
              );})}
              {projShown.length===0 && <div style={{padding:20,textAlign:"center",color:"#AFC4D8",fontStyle:"italic"}}>No projects match.</div>}
              {!pAll && projF.length>20 && <div style={{textAlign:"center",padding:10}}><button className="go" onClick={()=>setPAll(true)}>Show all {projF.length} →</button></div>}
            </div>
          </div>
        )}

        {/* TRAINING */}
        {page==="training" && (
          <div className="page">
            <div className="phero glass" style={{borderTop:`4px solid ${P.s2}`}}>
              <div className="eyebrow" style={{color:"#b389c6"}}>Certified Training</div>
              <h1>Training Programs</h1>
              <p>CSiAmerica Licensed Instructor since 2010. Over 1,400 engineers trained across MENA and North America. Advanced support for international firms.</p>
            </div>
            <div className="grid4" style={{marginTop:24}}>
              {TRAIN.map((t,i)=>(<div key={i} className="card glass" style={{cursor:"pointer"}} onClick={()=>go("start")}><h3 style={{fontSize:"1.05rem",color:"#b389c6"}}>{t[0]}</h3><div style={{fontSize:".84rem",color:"#AFC4D8",marginTop:6,lineHeight:1.5}}>{t[1]}</div></div>))}
            </div>
            <button className="btn" style={{background:P.s2,marginTop:16}} onClick={()=>go("start")}>Request Training →</button>
          </div>
        )}

        {/* RESOURCES */}
        {page==="resources" && (
          <div className="page">
            <div className="phero glass">
              <div className="eyebrow">Resources Management · A growing collection of iStructural apps</div>
              <h1>Resources Management — iStructural Apps</h1>
              <p>A growing collection of iStructural tools. Deterministic cores, AI advisory layers. Open Capacity Grid, or request access to the NPPE Study Tutor.</p>
            </div>
            <div className="grid2" style={{marginTop:18}}>
              <article className="card glass" style={{borderTop:`4px solid ${P.tealL}`}}>
                <h3 style={{color:P.tealL}}>Capacity Grid</h3>
                <div className="tag">Workforce capability intelligence</div>
                <div style={{fontSize:".86rem",color:"#AFC4D8",lineHeight:1.6}}>Map every office and person, see each office forte, route projects from evidence, read the corporate dashboard. Deterministic core, AI advisory layer.</div>
                <div className="more" style={{color:P.tealL}}>Owner sign-in below ↓</div>
              </article>
              <article className="card glass" style={{borderTop:`4px solid ${P.gold}`,cursor:"pointer"}} onClick={()=>go("nppe")}>
                <h3 style={{color:"#e0b65f"}}>NPPE Study Tutor</h3>
                <div className="tag">An AI study engine for the National Professional Practice Exam</div>
                <div style={{fontSize:".86rem",color:"#AFC4D8",lineHeight:1.6}}>An AI study engine for the NPPE, grounded in your own materials. Free, request-gated access for Canadian P.Eng candidates.</div>
                <div className="more" style={{color:"#e0b65f"}}>Request access →</div>
              </article>
            </div>
            <h2 className="sec">Capacity Grid</h2>
            {owner ? (
              <div style={{marginTop:18}}>
                <div style={{display:"flex",justifyContent:"flex-end",marginBottom:8}}>
                  <button className="lk" onClick={signOutOwner}>Sign out ({ownerEmail})</button>
                </div>
                <CapacityGridPanel/>
              </div>
            ) : (
              <div className="card glass" style={{maxWidth:520,margin:"18px auto 0",padding:24}}>
                <div className="eyebrow" style={{marginBottom:6}}>Owner access</div>
                <h3 style={{fontFamily:"'Fraunces',serif",fontWeight:800,fontSize:"1.2rem"}}>Sign in to Capacity Grid</h3>
                <p style={{color:"#AFC4D8",fontSize:".88rem",lineHeight:1.6,margin:"8px 0 14px"}}>Owner only. Sign in with the Google account <b style={{color:"#0EBEA8"}}>info@istructgroup.com</b>. No password is shared with this site.</p>
                <button onClick={signInGoogle} style={{display:"inline-flex",alignItems:"center",gap:8,padding:"10px 16px",borderRadius:9,background:"#fff",color:"#2A3642",border:"none",fontWeight:700,fontSize:".9rem",cursor:"pointer",fontFamily:"inherit"}}><svg width="16" height="16" viewBox="0 0 18 18"><path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.17-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.71v2.26h2.91c1.7-1.57 2.69-3.88 2.69-6.6z"/><path fill="#34A853" d="M9 18c2.43 0 4.47-.81 5.96-2.18l-2.91-2.26c-.81.54-1.84.86-3.05.86-2.34 0-4.32-1.58-5.02-3.7H.96v2.32A9 9 0 0 0 9 18z"/><path fill="#FBBC05" d="M3.98 10.71A5.41 5.41 0 0 1 3.7 9c0-.59.1-1.17.28-1.71V4.96H.96A8.97 8.97 0 0 0 0 9c0 1.45.35 2.82.96 4.04l3.02-2.33z"/><path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58A8.96 8.96 0 0 0 9 0 9 9 0 0 0 .96 4.96L3.98 7.3C4.68 5.16 6.66 3.58 9 3.58z"/></svg> Sign in with Google</button>
                {authErr && <div style={{fontSize:".8rem",color:"#ffd1c9",marginTop:10}}>{authErr}</div>}
                <div style={{fontSize:".72rem",color:"#7a96ae",marginTop:12}}>Only info@istructgroup.com unlocks the tools. Other access types are postponed.</div>
              </div>
            )}
          </div>
        )}

        {/* NPPE STUDY TUTOR */}
        {page==="nppe" && (
          <div className="page">
            <div className="phero glass" style={{borderTop:`4px solid ${P.gold}`}}>
              <div className="eyebrow" style={{color:"#e0b65f"}}>Resources · NPPE Study Tutor · Free</div>
              <h1>Pass the NPPE with a tutor built on your own materials.</h1>
              <p>A free, AI-powered study engine for Canadian P.Eng candidates. Short reads, quick recall, and an honest readiness check that only turns green when you are genuinely ready.</p>
              <div className="acts">
                <button className="btn" style={{background:P.gold}} onClick={()=>go("nppereq")}>Request access (free) →</button>
              </div>
            </div>

            <h2 className="sec">Why it is different</h2>
            {NPPE_WHY.map((w,i)=>(
              <div key={i} className="svc-row"><div style={{fontWeight:700,color:"#e0b65f"}}>{w[0]}</div><div style={{color:"#AFC4D8",fontSize:".88rem",lineHeight:1.6}}>{w[1]}</div></div>
            ))}

            <h2 className="sec">How it works</h2>
            <div className="grid3">
              {NPPE_STEPS.map((s,i)=>(
                <div key={i} className="card glass">
                  <div style={{fontFamily:"'Fraunces',serif",fontWeight:800,fontSize:"1.6rem",color:"#e0b65f"}}>{s[0]}</div>
                  <h3 style={{fontSize:"1.05rem",marginTop:6}}>{s[1]}</h3>
                  <div style={{fontSize:".85rem",color:"#AFC4D8",marginTop:6,lineHeight:1.55}}>{s[2]}</div>
                </div>
              ))}
            </div>

            <h2 className="sec">Questions</h2>
            {NPPE_FAQ.map((q,i)=>(
              <div key={i} className="svc-row"><div style={{fontWeight:700,color:"#fff"}}>{q[0]}</div><div style={{color:"#AFC4D8",fontSize:".88rem",lineHeight:1.6}}>{q[1]}</div></div>
            ))}

            <div style={{marginTop:24}}>
              <button className="btn" style={{background:P.gold}} onClick={()=>go("nppereq")}>Request access (free) →</button>
            </div>

            <div className="card glass" style={{marginTop:22,padding:"16px 18px"}}>
              <div style={{fontSize:".7rem",color:"#8FA8BE",lineHeight:1.6}}>{NPPE_DISCLAIMER}</div>
            </div>
          </div>
        )}

        {/* NPPE REQUEST ACCESS (intake) */}
        {page==="nppereq" && (
          <div className="page">
            <div className="phero glass" style={{borderTop:`4px solid ${P.gold}`}}>
              <div className="eyebrow" style={{color:"#e0b65f"}}>NPPE Study Tutor · Request access</div>
              <h1>Request access</h1>
              <p>Free for Canadian P.Eng candidates. Submit your details and iStructural sends you the engine and short setup instructions by email. We respond within 24 hours.</p>
            </div>
            <div className="fbody glass" style={{borderRadius:14,marginTop:18}}>
              <div className="fgrid">
                {NPPE_FIELDS.map((f)=>(
                  <div key={f.k} className="fld">
                    <label>{f.l}{f.req?" *":""}</label>
                    {f.t==="preset" ? <input value={f.v||"NPPE"} readOnly style={{opacity:.85,cursor:"not-allowed"}} /> :
                     f.t==="select" ? <select value={npf[f.k]||""} onChange={e=>setNpf({...npf,[f.k]:e.target.value})}><option value="">Select...</option>{f.opts.map(o=><option key={o}>{o}</option>)}</select> :
                     <input type={f.t==="email"?"email":f.t==="tel"?"tel":"text"} value={npf[f.k]||""} onChange={e=>setNpf({...npf,[f.k]:e.target.value})} placeholder={f.l.replace(" (optional)","")} />}
                  </div>
                ))}
              </div>
              <label style={{display:"flex",gap:10,alignItems:"flex-start",marginTop:16,fontSize:".84rem",color:"#cdddef",lineHeight:1.5,cursor:"pointer"}}>
                <input type="checkbox" checked={npConsent} onChange={e=>setNpConsent(e.target.checked)} style={{marginTop:3,width:16,height:16,flexShrink:0,accentColor:P.gold}} />
                <span>{NPPE_CONSENT}</span>
              </label>
              {npErr && <div style={{fontSize:".8rem",color:"#ffd1c9",marginTop:10}}>{npErr}</div>}
              <button className="btn" style={{background:P.gold,marginTop:16,width:"100%",opacity:npValid?1:.6}} onClick={submitNppe}>Submit request</button>
              <div style={{fontSize:".72rem",color:"#7a96ae",marginTop:12,lineHeight:1.6}}>Your details are used only to provide the engine and follow up on your setup. They are not shared. Submitting opens an email to info@istructgroup.com with your request.</div>
            </div>
            <div className="card glass" style={{marginTop:18,padding:"16px 18px"}}>
              <div style={{fontSize:".7rem",color:"#8FA8BE",lineHeight:1.6}}>{NPPE_DISCLAIMER}</div>
            </div>
          </div>
        )}

        {/* START */}
        {page==="start" && (
          <div className="page">
            <div className="phero glass"><h1>Start a Project</h1><p>Choose your service. We respond within 24 hours with scope, timeline, and proposal.</p></div>
            <div className="ftabs">{START_TABS.map(t=><button key={t[0]} className={"ft"+(t[0]===tab?" on":"")} onClick={()=>setTab(t[0])}>{t[1]}</button>)}</div>
            <div className="fbody glass">
              <div className="fgrid">
                {START_FIELDS[tab].map((f,i)=>{
                  const isTa=f[1]==="ta", isSel=f[1]&&f[1]!=="ta";
                  return (
                    <div key={i} className={"fld"+(isTa?" full":"")}>
                      <label>{f[0]}</label>
                      {isTa ? <textarea placeholder={f[0]+"..."} /> :
                       isSel ? <select defaultValue=""><option value="">Select...</option>{f[1].split("|").map(o=><option key={o}>{o}</option>)}</select> :
                       <input placeholder={f[0]} />}
                    </div>
                  );
                })}
              </div>
              <button className="btn" style={{background:START_TABS.find(t=>t[0]===tab)[2],marginTop:14,width:"100%"}}>Submit Inquiry</button>
            </div>
          </div>
        )}

        {/* CONTACT */}
        {page==="contact" && (
          <div className="page">
            <div className="phero glass"><h1>Contact Us</h1><p>iStructural Group Inc. · Canada · info@istructgroup.com</p></div>
            <div className="grid3" style={{marginTop:24}}>
              <div className="card glass"><h3 style={{fontSize:"1.05rem"}}>General Inquiry</h3><div style={{fontSize:".85rem",color:"#AFC4D8",marginTop:6,lineHeight:1.6}}>Management, design, or consultancy.</div><div style={{marginTop:10,fontWeight:700,color:P.tealL}}>info@istructgroup.com →</div></div>
              <div className="card glass" style={{cursor:"pointer"}} onClick={()=>go("start")}><h3 style={{fontSize:"1.05rem"}}>Start a Project</h3><div style={{fontSize:".85rem",color:"#AFC4D8",marginTop:6,lineHeight:1.6}}>Management, design, or AI assessment.</div><div style={{marginTop:10,fontWeight:700,color:"#6db3e6"}}>Start a Project →</div></div>
              <div className="card glass" style={{cursor:"pointer"}} onClick={()=>go("training")}><h3 style={{fontSize:"1.05rem"}}>Training</h3><div style={{fontSize:".85rem",color:"#AFC4D8",marginTop:6,lineHeight:1.6}}>CSi training for your team.</div><div style={{marginTop:10,fontWeight:700,color:"#b389c6"}}>Request Training →</div></div>
            </div>
          </div>
        )}

        <footer className="foot glass">
          <div className="foot-grid">
            <div><div className="co">iStructural Group Inc.</div><div className="blurb">Since 2010. Advanced structural engineering, business strategy, and AI-powered assessment. Canada.</div></div>
            <div><h4>Management</h4><a onClick={()=>go("s1")}>Project Management</a><a onClick={()=>go("s1")}>Business Strategy</a><a onClick={()=>go("s1")}>Value Engineering</a></div>
            <div><h4>Design</h4><a onClick={()=>go("s2")}>Structural Design</a><a onClick={()=>go("s2")}>Seismic & Wind</a><a onClick={()=>go("training")}>Training</a></div>
            <div><h4>AI & Technology</h4><a onClick={()=>go("s3")}>AI Literacy & Readiness</a><a onClick={()=>go("start")}>Start a Project</a></div>
            <div><h4>Resources</h4><a onClick={()=>go("hub")}>Knowledge Hub</a><a onClick={()=>go("resources")}>Capacity Grid</a><a onClick={()=>go("nppe")}>NPPE Study Tutor</a><a onClick={()=>go("projects")}>Projects</a></div>
          </div>
          <div className="base"><span>iStructural Group Inc. · istructgroup.com · Canada · info@istructgroup.com</span><span>Copyright 2026 iStructural Group Inc. All rights reserved.</span></div>
        </footer>
      </div>

      {/* Glass opacity control (iOS 27 style) */}
      <div className="gc glass">
        <div className="gt">Liquid Glass</div>
        <div className="gr"><span>Clear</span><span className="gv">{Math.round(opacity*100)}%</span></div>
        <input type="range" min="2" max="55" value={Math.round(opacity*100)} onChange={e=>setOpacity(+e.target.value/100)} />
        <div className="gr"><span>&nbsp;</span><span>Opaque</span></div>
      </div>

      {/* Mobile drawer */}
      {drawer && (
        <div className="drawer" onClick={e=>{if(e.target===e.currentTarget)setDrawer(false);}}>
          <div className="panel">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
              <span style={{fontFamily:"Fraunces,serif",fontWeight:800,color:P.tealL,letterSpacing:".1em",textTransform:"uppercase",fontSize:".8rem"}}>iStructural</span>
              <button className="lk" onClick={()=>setDrawer(false)} style={{fontSize:"1.2rem"}}>×</button>
            </div>
            {[["home","Home"],["s1","Management"],["s2","Design"],["s3","AI & Technology"],["projects","Projects"],["training","Training"],["hub","Knowledge Hub"],["resources","Resources"],["contact","Contact"]].map(n=>(
              <button key={n[0]} className="lk" onClick={()=>go(n[0])} style={{textAlign:"left"}}>{n[1]}</button>
            ))}
            <button className="btn" style={{background:P.teal,marginTop:10}} onClick={()=>go("start")}>Start a Project →</button>
          </div>
        </div>
      )}
    </div>
  );
}
