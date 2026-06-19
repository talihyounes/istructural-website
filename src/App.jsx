import { useState } from "react";

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

export default function App() {
  const [page, setPage] = useState("home");
  const [opacity, setOpacity] = useState(0.12);
  const [drawer, setDrawer] = useState(false);
  const [owner, setOwner] = useState(false);
  const [pCat, setPCat] = useState("All");
  const [pReg, setPReg] = useState("All");
  const [pQ, setPQ] = useState("");
  const [pAll, setPAll] = useState(false);
  const [tab, setTab] = useState("s1");

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
              <div className="eyebrow">Management · Resources Management · Powered by AI · Free Preview</div>
              <h1>Resources Management</h1>
              <p>Capacity Grid, the workforce capability intelligence tool under Management Services. Map every office and person, see each office forte, and route projects to the right office from evidence. Built on a deterministic core; Hybrid RAG architecture sits beside it as an advisory layer.</p>
              <div style={{display:"flex",gap:10,flexWrap:"wrap",alignItems:"center",marginTop:20}}>
                {owner ? (<>
                  <span style={{display:"inline-flex",alignItems:"center",gap:8,padding:"7px 13px",borderRadius:8,background:"rgba(107,58,125,.28)",border:`1px solid ${P.s2}`,fontSize:".84rem",fontWeight:700,color:"#e9d6f0"}}>
                    <span style={{fontSize:".66rem",fontWeight:800,padding:"2px 6px",borderRadius:4,background:P.s2,color:"#fff",letterSpacing:".06em"}}>OWNER</span>
                    Unlimited access · no session cap<span style={{fontSize:".72rem",color:P.tealL,opacity:.85}}>info@istructgroup.com</span>
                  </span>
                  <button className="lk" onClick={()=>setOwner(false)} style={{border:"1px solid rgba(255,255,255,.25)",color:"#e9d6f0",padding:"7px 13px"}}>Sign out</button>
                </>) : (<>
                  <span style={{padding:"7px 13px",borderRadius:8,background:"rgba(192,85,58,.18)",border:"1px solid rgba(192,85,58,.4)",fontSize:".84rem",fontWeight:700,color:"#ffd1c9"}}>No active session · Request a 60 minute key</span>
                  <button onClick={()=>setOwner(true)} style={{display:"flex",alignItems:"center",gap:8,padding:"7px 14px",borderRadius:8,background:"#fff",border:"1px solid rgba(14,190,168,.4)",fontSize:".84rem",fontWeight:700,color:"#2A3642",cursor:"pointer",fontFamily:"inherit"}}>
                    <svg width="14" height="14" viewBox="0 0 18 18"><path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.17-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.71v2.26h2.91c1.7-1.57 2.69-3.88 2.69-6.6z"/><path fill="#34A853" d="M9 18c2.43 0 4.47-.81 5.96-2.18l-2.91-2.26c-.81.54-1.84.86-3.05.86-2.34 0-4.32-1.58-5.02-3.7H.96v2.32A9 9 0 0 0 9 18z"/><path fill="#FBBC05" d="M3.98 10.71A5.41 5.41 0 0 1 3.7 9c0-.59.1-1.17.28-1.71V4.96H.96A8.97 8.97 0 0 0 0 9c0 1.45.35 2.82.96 4.04l3.02-2.33z"/><path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58A8.96 8.96 0 0 0 9 0 9 9 0 0 0 .96 4.96L3.98 7.3C4.68 5.16 6.66 3.58 9 3.58z"/></svg>
                    Sign in with Google
                  </button>
                  <span style={{fontSize:".78rem",color:"#AFC4D8"}}>Owner sign-in (whitelisted Google account) unlocks owner mode · info@istructgroup.com</span>
                </>)}
              </div>
            </div>
            <div className="strip glass" style={{marginTop:24,cursor:"default"}}>
              <div><div className="lead" style={{color:P.tealL}}>Capacity Grid · See what your workforce can really do</div>
              <div className="meta">Per-engineer capability cards · Office forte dashboards · Company capability health · Project routing advisor</div></div>
              <span style={{fontSize:".66rem",fontWeight:800,letterSpacing:".08em",color:P.tealL,textTransform:"uppercase",padding:"5px 9px",border:"1px solid rgba(14,190,168,.5)",borderRadius:6,whiteSpace:"nowrap"}}>Hybrid RAG Inside · Advisory</span>
            </div>
            <div className="grid4" style={{marginTop:14}}>
              {[["Foundation","Org tree, task library, scoring scale"],["People & Assessment","Titles, job descriptions, task scores"],["Capability Cards","Per-employee cards, key tasks"],["Office & Company Dashboards","Forte, coverage, routing advisor"]].map((c,i)=>(
                <div key={i} className="sub-card"><div style={{fontSize:".85rem",fontWeight:700,color:P.tealL}}>{c[0]}</div><div style={{fontSize:".78rem",color:"#AFC4D8",marginTop:4}}>{c[1]}</div></div>
              ))}
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
            <div><h4>Resources</h4><a onClick={()=>go("hub")}>Knowledge Hub</a><a onClick={()=>go("projects")}>Projects</a><a onClick={()=>go("contact")}>Contact</a></div>
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
