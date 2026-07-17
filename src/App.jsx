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
  ["Resources Management","Workforce capability intelligence via Capacity Mesh. Map every office and person, see each office forte, route projects from evidence."],
];
const S3CARDS = [
  ["AI 101 · Foundations","What AI is, what it is not, how it works, where it applies. Tailored workshops for leadership, engineers, operations. No technical background required."],
  ["AI Readiness Assessment","Evaluate AI maturity. Identify high-impact automation. Gap analysis across data, skills, infrastructure, culture. Actionable roadmap."],
  ["Tool Selection & Integration","Identify the right AI tools for your tasks: document processing, QC, scheduling, reporting. Vendor-neutral. Integration planning."],
  ["Implementation Support","Hands-on deployment into existing workflows. Staff training. Process redesign. Performance monitoring. Advisory retainer available."],
];
const HUBDATA = [{"code": "DOC", "title": "Documents, Forms and Templates", "sub": "Static deliverables to download, fill, or copy.", "items": [{"id": "forms", "n": "Free Inspection Forms", "d": "Safety pre-check, site ID, Phase 1 field form, post-disaster rapid.", "s": "AI Platform", "c": "#3fd0d8", "res": [{"region": "USA", "title": "FEMA P-154 Rapid Visual Screening of Buildings, Handbook + Forms (3rd Ed.)", "body": "FEMA", "year": "2015", "url": "https://www.fema.gov/sites/default/files/2020-07/fema_earthquakes_rapid-visual-screening-of-buildings-for-potential-seismic-hazards-a-handbook-third-edition-fema-p-154.pdf"}, {"region": "USA", "title": "FEMA P-2055 Post-Disaster Building Safety Evaluation Guidance", "body": "FEMA", "year": "2019", "url": "https://www.fema.gov/sites/default/files/2020-07/fema_p-2055_post-disaster_buildingsafety_evaluation_2019.pdf"}, {"region": "Canada", "title": "Level 1 Preliminary Seismic Risk Screening Tool (PST), User's Guide", "body": "National Research Council Canada", "year": "2020", "url": "https://nrc-publications.canada.ca/eng/view/object/?id=5f059958-29e6-43eb-aa37-c896ab11dcd1"}, {"region": "Canada", "title": "Post-Disaster Building Assessment Resources, forms, placards, kits", "body": "BC Housing", "year": "2022", "url": "https://www.bchousing.org/projects-partners/emergency-management/building-assessments/pdba-resources"}, {"region": "Europe", "title": "Second-Generation Eurocodes Workshop, training materials", "body": "EU Joint Research Centre", "year": "2025", "url": "https://eurocodes.jrc.ec.europa.eu/news/now-available-training-materials-second-generation-eurocodes-workshop-3-5-june-2025"}]}, {"id": "crack", "n": "Crack & Damage Library", "d": "Crack types, spalling, delamination. Severity ratings.", "s": "AI + Design", "c": "#3fd0d8", "res": [{"region": "USA", "title": "FEMA P-2018 Seismic Evaluation of Older Concrete Buildings for Earthquake Damage", "body": "FEMA", "year": "2018", "url": "https://www.fema.gov/sites/default/files/2020-08/fema_seismic-eval-older-concrete-buildings_p-2018.pdf"}, {"region": "USA", "title": "FEMA P-58-1 Seismic Performance Assessment of Buildings, Vol. 1 Methodology (2nd Edition)", "body": "FEMA / Applied Technology Council", "year": "2019", "url": "https://www.usrc.org/wp-content/uploads/FEMA_P-58-1-SE_Volume1_Methodology.pdf"}, {"region": "Canada", "title": "Federal Flood Damage Estimation Guidelines for Buildings and Infrastructure", "body": "Natural Resources Canada", "year": "2021", "url": "https://publications.gc.ca/collections/collection_2021/rncan-nrcan/M45-124-2021-eng.pdf"}, {"region": "Europe", "title": "EN 1504 Concrete Repair Standards, illustrated reference summary", "body": "EN 1504-aligned guide", "year": "2018", "url": "https://www.sika.com/dam/dms/corporate/z/glo-concrete-repair-protection-en-1504.pdf"}]}, {"id": "pm", "n": "PM Templates & Frameworks", "d": "RFP templates, scope of work, risk registers.", "s": "Management", "c": "#6db3e6", "res": [{"region": "USA", "title": "PMBOK 6 Project Risk Management, Risk Register and matrix templates", "body": "PMI Central Italy Chapter", "year": "2018", "url": "https://www.pmi-centralitaly.org/wp-content/uploads/2019/06/PMBoK_Risk_03072018.pdf"}, {"region": "Canada", "title": "Federal Flood Damage Estimation Guidelines (planning + risk framework)", "body": "Natural Resources Canada", "year": "2021", "url": "https://publications.gc.ca/collections/collection_2021/rncan-nrcan/M45-124-2021-eng.pdf"}, {"region": "Europe", "title": "Managing an Intervention, EU INTPA project cycle guidance", "body": "European Commission, DG INTPA", "year": "Live 2026", "url": "https://international-partnerships.ec.europa.eu/funding-and-technical-assistance/guidelines/managing-intervention_en"}]}, {"id": "ve", "n": "V.E. & ROI Tools", "d": "Value engineering templates, cost-benefit, LEED.", "s": "Management", "c": "#6db3e6", "res": [{"region": "USA", "title": "SAVE International Value Methodology Standard, Six-Phase Job Plan", "body": "SAVE International", "year": "2015", "url": "https://cdn.ymaws.com/www.value-eng.org/resource/resmgr/standards_documents/vmstd.pdf"}, {"region": "USA", "title": "SD-24 Value Engineering: Guidebook of Best Practices and Tools", "body": "US Department of Defense", "year": "2025", "url": "https://www.cto.mil/wp-content/uploads/2025/02/SD-24-VE-Guidebook-25Feb2025-Cleared-1.pdf"}, {"region": "Europe", "title": "Level(s) Indicator 6.1 Life Cycle Costs, User Manual", "body": "EU Joint Research Centre", "year": "2021", "url": "https://susproc.jrc.ec.europa.eu/product-bureau/sites/default/files/2021-01/UM3_Indicator_6.1_v1.1_21pp.pdf"}, {"region": "Europe", "title": "Cost-Effective Energy Transformation of Europe's Buildings", "body": "EU Joint Research Centre", "year": "2019", "url": "https://publications.jrc.ec.europa.eu/repository/bitstream/JRC117739/cost_optimal_energy_renovations_online.pdf"}]}]}, {"code": "TLS", "title": "Calculators, Spreadsheets and Software", "sub": "Interactive and computational tools.", "items": [{"id": "calc", "n": "Structural Calculators", "d": "Concrete, steel, wood, wind, seismic. Browser-based.", "s": "Design", "c": "#c39bd8", "res": [{"region": "USA", "units": "SI/US", "title": "ACI 318-19 Reinforced Concrete Beams Design Calculator", "body": "CalcTree", "year": "Live 2026", "url": "https://www.calctree.com/templates/concrete-beam"}, {"region": "USA / Europe", "units": "SI/US", "title": "ACI 318-19 / EN 1992-1-1 RC Section Design Calculator", "body": "CalcForge", "year": "Live 2026", "url": "https://calcforge.com/concrete/1"}, {"region": "Europe", "units": "SI", "title": "EN 1992-1-1 (EC2) RC Slabs, Beams, Columns, Punching, Crack Width", "body": "EurocodeApplied", "year": "Live 2026", "url": "https://eurocodeapplied.com/design/en1992"}, {"region": "Canada", "units": "SI/US", "title": "CSA A23.3-14 RC Slab and Wall Resistance Calculator", "body": "SkyCiv", "year": "Live 2026", "url": "https://skyciv.com/quick-calculators/csa-a23-concrete-slab-calculator/"}, {"region": "Canada", "units": "SI", "title": "CSA A23.3-19 RC Beams, Slabs and Columns Design Calculator", "body": "SAFI", "year": "Live 2026", "url": "https://safi.com/concrete-engineering-calculator/"}, {"region": "Canada", "units": "SI", "title": "CSA A23.3-14 RC Beam Design Examples and Worksheets", "body": "StructurePoint spBeam", "year": "Live 2026", "url": "https://structurepoint.org/publication/design-examples.asp"}, {"region": "USA", "units": "US", "title": "ACI 318-19 Post-Tensioned Concrete Slab Calculator", "body": "ConcreteMetric", "year": "Live 2026", "url": "https://concretemetric.com/calculators/post-tension-slab-calculator/"}, {"region": "USA", "units": "US", "title": "ACI 318 Post-Tensioned Beam and Slab Spreadsheets", "body": "PDH Online", "year": "Live 2026", "url": "https://pdhonline.com/courses/s133/s133.htm"}, {"region": "USA", "units": "SI/US", "title": "AISC 360-16/22 Steel Beam and Column Design Calculator", "body": "CalcTree", "year": "Live 2026", "url": "https://www.calctree.com/templates/steel-section"}, {"region": "USA / Europe / Canada", "units": "SI/US", "title": "AISC 360 / EN 1993 / CSA S16 Steel Column Capacity", "body": "SteelCalculator.app", "year": "Live 2026", "url": "https://steelcalculator.app/tools/column-capacity/"}, {"region": "Europe", "units": "SI", "title": "EN 1993-1-1 (EC3) Steel Beam, Column and Connection Calculator", "body": "SkyCiv EC3", "year": "Live 2026", "url": "https://skyciv.com/free-tools/"}, {"region": "Canada", "units": "SI", "title": "CSA S16-19 Steel Beam, Column and Member Calculator", "body": "AutoCalcs", "year": "Live 2026", "url": "https://autocalcs.com/csa-s16-design-calculator"}, {"region": "Canada", "units": "SI", "title": "CSA S16:19 + NBCC 2015 Steel Beam Calculator", "body": "Calcs.com", "year": "Live 2026", "url": "https://calcs.com/calculations/steelbeamca"}, {"region": "Canada", "units": "SI", "title": "CSA S16:19 + NBCC 2015 Steel Member Calculator", "body": "ClearCalcs", "year": "Live 2026", "url": "https://www.clearcalcs.com/calculations/steelmemberca"}, {"region": "USA", "units": "SI/US", "title": "AISC 360-22 Steel-Concrete Composite Beam Calculator", "body": "SteelCalculator.app", "year": "Live 2026", "url": "https://steelcalculator.app/tools/composite-design/"}, {"region": "USA / Europe", "units": "SI/US", "title": "AISC 360 / EN 1994 Composite Beam Calculator", "body": "ToolsRail", "year": "Live 2026", "url": "https://www.toolsrail.com/civil/composite-beam-calculator.php"}, {"region": "USA", "units": "US", "title": "NDS 2024 + AISC 360 Wood and Steel Beam Calculator", "body": "WebStructural", "year": "Live 2026", "url": "https://webstructural.com/beam-designer.html"}, {"region": "Europe", "units": "SI", "title": "EN 1995-1-1 (EC5) Timber Beam Design Calculator", "body": "CalcTree", "year": "Live 2026", "url": "https://www.calctree.com/templates/timber-beam"}, {"region": "Canada", "units": "SI/US", "title": "CSA O86-14/19 Wood Beam Design Calculator", "body": "SkyCiv", "year": "Live 2026", "url": "https://skyciv.com/quick-calculators/canadian-wood-beam-design/"}, {"region": "USA / Europe / Canada", "units": "SI/US", "title": "ADM 2020 / EN 1999 / CSA S157 Aluminum Beam Calculator", "body": "SkyCiv", "year": "Live 2026", "url": "https://skyciv.com/quick-calculators/aluminum-beam-capacity-calculator/"}, {"region": "USA / Europe / Canada", "units": "SI/US", "title": "ASCE 7-22 / EN 1991-1-4 / NBCC 2020 Wind Load Calculator", "body": "SkyCiv", "year": "Live 2026", "url": "https://skyciv.com/wind-load-calculator/"}, {"region": "USA", "units": "US", "title": "ASCE 7 / ASCE 41 / NEHRP / IBC / AASHTO Seismic Design Web Services", "body": "US Geological Survey", "year": "Live 2026", "url": "https://earthquake.usgs.gov/ws/designmaps/"}, {"region": "USA", "units": "US", "title": "USGS Unified Seismic Hazard Tool", "body": "US Geological Survey", "year": "Live 2026", "url": "https://earthquake.usgs.gov/hazards/interactive/"}, {"region": "USA", "units": "US", "title": "ASCE 7-10/16/22 Hazard Tool (wind, seismic, snow, ice)", "body": "American Society of Civil Engineers", "year": "Live 2026", "url": "https://ascehazardtool.org/"}, {"region": "Canada", "units": "SI", "title": "NBCC 2020 Seismic Hazard Tool (Sa, PGA, PGV)", "body": "Natural Resources Canada", "year": "2025", "url": "https://www.seismescanada.rncan.gc.ca/hazard-alea/interpolat/nbc-cnb-en.php"}, {"region": "Canada", "units": "SI", "title": "NBCC 2020 Seismic Load, Equivalent Static Method Calculator", "body": "Jabacus", "year": "Live 2026", "url": "https://jabacus.com/engineering/nbc2020/seismic.php"}, {"region": "USA / Europe / Canada", "units": "SI/US", "title": "Multi-Code Beam Analysis Calculator (SFD, BMD, deflection)", "body": "SkyCiv", "year": "Live 2026", "url": "https://skyciv.com/free-beam-calculator/"}, {"region": "Europe", "units": "SI/US", "title": "2D Beam, Frame and Truss Analysis Calculator", "body": "BeamGuru", "year": "Live 2026", "url": "https://beamguru.com/"}, {"region": "Europe", "units": "SI", "title": "EN 1990 to EN 1998 Eurocode Multi-Code Suite", "body": "EurocodeApplied", "year": "Live 2026", "url": "https://eurocodeapplied.com/"}, {"region": "USA", "units": "US", "title": "Wood Connection Calculator (bolts, nails, lag and wood screws), NDS 2024", "body": "American Wood Council", "year": "Live 2026", "url": "https://awc.org/resources/connection-calculator/"}, {"region": "USA", "units": "US", "title": "Span Options Calculator for Wood Joists and Rafters", "body": "American Wood Council", "year": "Live 2026", "url": "https://awc.org/resources/span-options-calculator-for-wood-joists-and-rafters/"}, {"region": "USA", "units": "US", "title": "IBC Heights and Areas Calculator (AWC + WoodWorks + ICC)", "body": "American Wood Council", "year": "Live 2026", "url": "https://awc.org/resources/heights-and-areas-calculator/"}, {"region": "Canada", "units": "SI", "title": "Wood Beam, Joist and Rafter Design Calculator (NBCC)", "body": "Canadian Wood Council", "year": "Live 2026", "url": "https://cwc.ca/design-tool/"}, {"region": "Canada", "units": "SI", "title": "Dimension Calc, wood member sizing", "body": "Canadian Wood Council", "year": "Live 2026", "url": "https://cwc.ca/design-tool/dimensioncalc/"}, {"region": "USA", "units": "SI/US", "title": "AISC Shapes Database v16.0 + free 16th-Edition resources", "body": "American Institute of Steel Construction", "year": "Live 2026", "url": "https://www.aisc.org/publications/steel-construction-manual-resources/16th-ed-steel-construction-manual/aisc-shapes-database-v16.0/"}, {"region": "USA", "units": "US", "title": "WoodWorks Tools and Guides (span tables, calculators)", "body": "WoodWorks", "year": "Live 2026", "url": "https://www.woodworks.org/tools-guides/"}]}, {"id": "trial", "n": "Trial Software", "d": "Commercial trial downloads from leading vendors.", "s": "Design + Training", "c": "#c39bd8", "res": [{"region": "30-day trial", "title": "ETABS", "body": "Computers and Structures, Inc.", "d": "Multi-story buildings, lateral systems, response spectrum.", "url": "https://www.csiamerica.com/products/etabs/trial"}, {"region": "30-day trial", "title": "SAP2000", "body": "Computers and Structures, Inc.", "d": "General-purpose analysis, linear and nonlinear.", "url": "https://www.csiamerica.com/products/sap2000/trial"}, {"region": "30-day trial", "title": "CSiBridge", "body": "Computers and Structures, Inc.", "d": "Bridge analysis, design, staged construction.", "url": "https://www.csiamerica.com/products/csibridge/trial"}, {"region": "30-day trial", "title": "SAFE", "body": "Computers and Structures, Inc.", "d": "Slab and foundation design, PT and RC.", "url": "https://www.csiamerica.com/products/safe/trial"}, {"region": "14-day trial", "title": "IDEA StatiCa", "body": "IDEA StatiCa s.r.o.", "d": "Steel connection design and code-check.", "url": "https://www.ideastatica.com/product-downloads"}, {"region": "30-day trial", "title": "MIDAS Civil NX", "body": "MIDAS IT", "d": "Bridges and civil structures, advanced FEA.", "url": "https://resource.midasuser.com/en/free-trial"}, {"region": "30-day trial", "title": "MIDAS GEN", "body": "MIDAS IT", "d": "Buildings and general structural analysis.", "url": "https://resource.midasuser.com/en/free-trial"}, {"region": "10-day trial", "title": "ADAPT-Builder", "body": "RISA Tech, Inc.", "d": "Concrete buildings with PT, BIM environment.", "url": "https://risa.com/products/adapt-builder"}, {"region": "10-day trial", "title": "ADAPT-PT/RC", "body": "RISA Tech, Inc.", "d": "Post-tensioned beam and slab design.", "url": "https://risa.com/products/adapt-pt-rc"}, {"region": "10-day trial", "title": "RISA-3D", "body": "RISA Tech, Inc.", "d": "3D analysis and design.", "url": "https://risa.com/products/risa-3d"}, {"region": "10-day trial", "title": "RISAFloor", "body": "RISA Tech, Inc.", "d": "Multi-story gravity systems and floor design.", "url": "https://risa.com/products/risafloor"}, {"region": "30-day trial", "title": "DeepEX", "body": "Deep Excavation LLC", "d": "Deep excavation and retaining walls.", "url": "https://www.deepexcavation.com/en/downloads"}]}, {"id": "budget", "n": "Budget-Friendly Software", "d": "Free, open-source, and low-cost alternatives.", "s": "All Services", "c": "#5fce86", "res": [{"title": "OpenSees", "body": "UC Berkeley / PEER", "d": "Nonlinear seismic, research, open-source.", "url": "https://opensees.berkeley.edu/"}, {"title": "Code_Aster + Salome-Meca", "body": "EDF", "d": "General FEA, industrial-grade open-source.", "url": "https://code-aster.org/"}, {"title": "STRES Software", "body": "STRES", "d": "RC design tools, ACI 318-19.", "url": "https://stres-software.com/"}, {"title": "FreeCAD with FEM", "body": "The FreeCAD Project", "d": "CAD plus simple FEA.", "url": "https://www.freecad.org/"}, {"title": "Mastan2", "body": "Cornell University", "d": "2D/3D matrix analysis, learning tool.", "url": "https://www.mastan2.com/"}, {"title": "CalculiX", "body": "Guido Dhondt et al.", "d": "FEA solver, ABAQUS-like syntax.", "url": "https://www.calculix.de/"}, {"title": "PrePoMax", "body": "Open-source", "d": "Pre/post-processor for CalculiX.", "url": "https://prepomax.fs.um.si/"}, {"title": "2D Frame Analysis", "body": "EngiSSol", "d": "Quick 2D frame analysis, free version.", "url": "https://www.engissol.com/"}, {"title": "LISA-FEA", "body": "Sonnenhof Holdings", "d": "Low-cost general FEA.", "url": "https://lisafea.com/"}, {"title": "TRUSS4", "body": "Trussplan", "d": "Truss analysis and design, free version.", "url": "https://www.fine.eu/products/truss/"}]}]}, {"code": "REF", "title": "Standards, Training and External Links", "sub": "Authoritative third-party references.", "items": [{"id": "std", "n": "International Standards", "d": "ASCE, USGS, NBCC, Eurocodes, ICC codes.", "s": "All Services", "c": "#5fce86", "res": [{"region": "USA", "title": "ASCE Hazard Tool, ASCE 7-10/16/22 design parameters", "body": "American Society of Civil Engineers", "year": "Live 2026", "url": "https://ascehazardtool.org/"}, {"region": "USA", "title": "USGS Seismic Design Web Services", "body": "US Geological Survey", "year": "Live 2026", "url": "https://earthquake.usgs.gov/ws/designmaps/"}, {"region": "Canada", "title": "National Building Code of Canada 2020, free PDF", "body": "National Research Council Canada", "year": "2020", "url": "https://nrc-publications.canada.ca/eng/search/?q=NRCCode"}, {"region": "Canada", "title": "NBC 2020 Seismic Hazard Tool", "body": "Natural Resources Canada (CHIS)", "year": "2025", "url": "https://www.seismescanada.rncan.gc.ca/hazard-alea/interpolat/nbc-cnb-en.php"}, {"region": "Europe", "title": "Eurocodes Learning Corner, full family + JRC docs", "body": "EU Joint Research Centre", "year": "Live 2026", "url": "https://eurocodes.jrc.ec.europa.eu/learning-corner"}, {"region": "Europe", "title": "Eurocode 2 Worked Examples", "body": "The Concrete Initiative", "year": "2017", "url": "https://www.theconcreteinitiative.eu/images/ECP_Documents/Eurocode2_WorkedExamples.pdf"}, {"region": "USA", "title": "ICC Digital Codes, free read-only 2024 IBC, IRC and more", "body": "International Code Council", "year": "Live 2026", "url": "https://codes.iccsafe.org/"}]}, {"id": "precast", "n": "Precast & Prestressed, Canada (CPCI)", "d": "Total precast high-rise case studies, structural guides, and the CPCI Design Manual.", "s": "Design", "c": "#c39bd8", "res": [{"region": "Canada", "title": "Total Precast Concrete High-rise Construction and Provincial Building Codes (multiple tall-building case studies)", "body": "Canadian Precast/Prestressed Concrete Institute (CPCI)", "year": "Live 2026", "url": "https://z.cpci.ca/?d=l8j8e5o8j"}, {"region": "Canada", "title": "Structural Solutions Technical Guide (total precast structures, all building types)", "body": "CPCI", "year": "Live 2026", "url": "https://downloads.cpci.ca/63/downloads.do"}, {"region": "Canada", "title": "Structural Floor and Roof Technical Guide", "body": "CPCI", "year": "Live 2026", "url": "https://downloads.cpci.ca/62/downloads.do"}, {"region": "Canada", "title": "Precast Concrete: A Resilient Solution to Canada's Housing Needs, schedule and cost study", "body": "CPCI", "year": "2025", "url": "https://canadianprecast.s3.us-east-2.amazonaws.com/file/resources/tech_publications_reports/2025_Canadas_Housing_needs_Document_Final.pdf"}, {"region": "Canada", "title": "Accelerated Building Construction (ABC), project examples", "body": "CPCI", "year": "Live 2026", "url": "https://downloads.cpci.ca/647/download.do"}, {"region": "Canada", "title": "CPCI Design Manual and design resources (5th Edition, free download)", "body": "CPCI", "year": "Live 2026", "url": "https://www.cpci.ca/en/resources"}, {"region": "Canada", "title": "Project of the Month, precast building case studies", "body": "CPCI", "year": "Live 2026", "url": "https://www.cpci.ca/en/potm"}, {"region": "Canada", "title": "Technical Publications and Reports (full CPCI library)", "body": "CPCI", "year": "Live 2026", "url": "https://www.cpci.ca/en/resources/tech_publications_reports"}]}, {"id": "cert", "n": "Training & Certification Links", "d": "FEMA, CSCE, OSPE, Eurocodes training.", "s": "All Services", "c": "#5fce86", "res": [{"region": "USA", "title": "FEMA Emergency Management Institute, 200+ free courses", "body": "FEMA EMI", "year": "Live 2026", "url": "https://training.fema.gov/is/crslist.aspx"}, {"region": "USA", "title": "FEMA P-154 official training page", "body": "FEMA", "year": "Live 2026", "url": "https://www.fema.gov/emergency-managers/risk-management/earthquake/training/fema-p-154"}, {"region": "Canada", "title": "CSCE Professional Development portal", "body": "CSCE / SCGC", "year": "Live 2026", "url": "https://legacy.csce.ca/en/lifelong-learning/professional-development/"}, {"region": "Canada", "title": "OSPE Continuing Professional Development, free sessions", "body": "Ontario Society of Professional Engineers", "year": "Live 2026", "url": "https://ospe.on.ca/academy/cpd/"}, {"region": "Europe", "title": "Eurocodes Learning Corner, free training materials", "body": "EU Joint Research Centre", "year": "Live 2026", "url": "https://eurocodes.jrc.ec.europa.eu/learning-corner/training-materials"}, {"region": "Europe", "title": "JRC Eurocodes Evolution, explainer video series", "body": "EU Joint Research Centre", "year": "2025", "url": "https://eurocodes.jrc.ec.europa.eu/2nd-generation/eurocodes-evolution-explained-video-series"}]}]}];
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
.lg{--glass-blur:22px;--glass-stroke:rgba(20,40,64,.12);--glass-highlight:rgba(255,255,255,.6);--radius:16px;
  font-family:'DM Sans',system-ui,sans-serif;color:#2A3642;position:relative;min-height:100vh;overflow-x:hidden;background:#EFEAE0}
.lg *{box-sizing:border-box;margin:0;padding:0}
.lg .bg{position:fixed;inset:0;z-index:0;background:radial-gradient(1100px 700px at 12% -5%,#eef3f8 0,transparent 55%),radial-gradient(900px 600px at 95% 8%,#eaf5ef 0,transparent 50%),#EFEAE0}
.lg .bg:after{content:"";position:absolute;inset:-20%;background:radial-gradient(420px 420px at 20% 30%,rgba(14,190,168,.10),transparent 60%),radial-gradient(520px 520px at 82% 66%,rgba(30,91,138,.10),transparent 60%);filter:blur(30px);opacity:.6}
@keyframes drift{from{transform:translate3d(-3%,-2%,0) scale(1.05)}to{transform:translate3d(4%,3%,0) scale(1.15)}}
.lg .wrap{position:relative;z-index:1}
.lg .glass{position:relative;background:rgba(255,255,255,.85);backdrop-filter:blur(var(--glass-blur)) saturate(140%);-webkit-backdrop-filter:blur(var(--glass-blur)) saturate(140%);border:1px solid rgba(20,40,64,.10);border-radius:var(--radius);box-shadow:0 8px 26px rgba(20,40,64,.09);isolation:isolate}
.lg .glass:before{content:"";display:none}
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
.lg .phero:after{content:"";position:absolute;inset:0;z-index:0;border-radius:inherit;background-image:linear-gradient(rgba(14,190,168,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(14,190,168,.08) 1px,transparent 1px);background-size:34px 34px;opacity:1}
.lg .phero>*{position:relative;z-index:1}
.lg .eyebrow{font-size:.7rem;font-weight:700;letter-spacing:.2em;color:#0EBEA8;text-transform:uppercase;margin-bottom:12px;text-shadow:0 1px 3px rgba(0,0,0,.45)}
.lg h1{font-family:'Fraunces',serif;font-weight:800;font-size:clamp(2rem,5vw,3.4rem);line-height:1.1;letter-spacing:-.5px;text-shadow:0 1px 3px rgba(0,0,0,.45)}
.lg .phero p{color:#5A6B7A;font-size:1rem;line-height:1.7;margin-top:14px;max-width:620px;text-shadow:0 1px 3px rgba(0,0,0,.45)}
.lg .acts{display:flex;gap:10px;flex-wrap:wrap;margin-top:22px}
.lg .btn{padding:11px 22px;border-radius:10px;color:#fff;font-weight:700;font-size:.88rem;cursor:pointer;border:none;font-family:inherit}
.lg h2.sec{font-family:'Fraunces',serif;font-weight:800;font-size:1.7rem;margin:46px 0 18px;color:#fff;text-shadow:0 1px 3px rgba(0,0,0,.45)}
.lg .kick{font-size:.72rem;font-weight:700;letter-spacing:.16em;color:#5A6B7A;text-transform:uppercase;margin:40px 0 14px;text-shadow:0 1px 3px rgba(0,0,0,.45)}
.lg .grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.lg .grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
.lg .grid2{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
@media(max-width:880px){.lg .grid3,.lg .grid4{grid-template-columns:1fr}.lg .grid2{grid-template-columns:1fr}}
.lg .card{padding:24px 22px;transition:transform .25s;box-shadow:0 6px 22px rgba(0,0,0,.3),inset 0 1px 0 rgba(255,255,255,.35)}
.lg .card:hover{transform:translateY(-4px)}
.lg .card h3{font-family:'Fraunces',serif;font-weight:800;font-size:1.18rem;line-height:1.25;text-shadow:0 1px 3px rgba(0,0,0,.45)}
.lg .card .tag{font-family:'Fraunces',serif;font-style:italic;font-size:.88rem;color:#B8A68E;margin:6px 0 12px}
.lg .card ul{list-style:none}
.lg .card li{display:flex;gap:8px;font-size:.86rem;color:#3a4654;padding:4px 0}
.lg .card li b{font-weight:800;font-size:.78rem}
.lg .card .more{font-size:.84rem;font-weight:700;margin-top:14px}
.lg .subs{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
@media(max-width:680px){.lg .subs{grid-template-columns:1fr}}
.lg .sub-card{padding:18px;border-radius:12px;background:rgba(255,255,255,.05);border:1px solid var(--glass-stroke)}
.lg .strip{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:18px 22px;margin-top:14px;cursor:pointer;box-shadow:0 6px 22px rgba(0,0,0,.3),inset 0 1px 0 rgba(255,255,255,.35)}
.lg .strip .lead{font-size:.94rem;font-weight:700;text-shadow:0 1px 3px rgba(0,0,0,.45)}
.lg .strip .meta{font-size:.82rem;color:#5A6B7A;margin-top:3px}
.lg .go{background:#0A7C6E;color:#fff;padding:8px 15px;border-radius:9px;font-size:.82rem;font-weight:700;white-space:nowrap;border:none;cursor:pointer;font-family:inherit}
.lg .svc-row{display:grid;grid-template-columns:200px 1fr;gap:16px;padding:14px 18px;border-radius:12px;margin-bottom:8px;background:rgba(255,255,255,.04);border:1px solid var(--glass-stroke)}
@media(max-width:680px){.lg .svc-row{grid-template-columns:1fr}}
.lg .filters{display:flex;gap:14px;flex-wrap:wrap;align-items:center;padding:14px 18px;margin-top:12px}
.lg .flbl{font-size:.8rem;color:#5A6B7A;font-weight:600}
.lg .chip{padding:4px 11px;border-radius:8px;font-size:.8rem;font-weight:600;cursor:pointer;color:#8BA0B5;border:1px solid var(--glass-stroke);background:transparent;font-family:inherit}
.lg .chip.on{background:#0A7C6E;color:#fff;border-color:#0A7C6E}
.lg .psearch{display:flex;align-items:center;gap:8px;margin:14px 0;padding:8px 12px;border-radius:10px;background:rgba(255,255,255,.06);border:1px solid var(--glass-stroke)}
.lg .psearch input{flex:1;background:transparent;border:none;outline:none;color:#fff;font-size:.9rem;font-family:inherit}
.lg .prow{display:grid;grid-template-columns:1fr 116px 86px auto;gap:10px;align-items:center;padding:9px 14px;border-bottom:1px solid rgba(255,255,255,.08);font-size:.86rem}
.lg .pinq{justify-self:end;padding:5px 11px;border-radius:7px;border:1px solid rgba(14,190,168,.5);background:rgba(14,190,168,.14);color:#0EBEA8;font-size:.74rem;font-weight:700;cursor:pointer;font-family:inherit;white-space:nowrap}
.lg .pinq:hover{background:rgba(14,190,168,.26)}
@media(max-width:680px){.lg .prow{grid-template-columns:1fr auto;row-gap:6px}.lg .pr{text-align:left}.lg .pinq{grid-column:1/-1;justify-self:start}}
.lg .prow:nth-child(odd){background:rgba(255,255,255,.03)}
.lg .pc{font-size:.7rem;font-weight:700;padding:2px 7px;border-radius:6px;text-align:center}
.lg .pr{color:#5A6B7A;text-align:right;font-size:.8rem}
.lg .bh{display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:12px;background:rgba(255,255,255,.05);border:1px solid var(--glass-stroke);border-left:4px solid #1B6B35;margin-bottom:10px}
.lg .bh .code{font-family:monospace;font-size:.9rem;font-weight:800;letter-spacing:2px;color:#7fe3a0;padding:6px 10px;border:1px solid rgba(127,227,160,.4);border-radius:6px}
.lg .bh .ttl{font-family:'Fraunces',serif;font-weight:800;font-size:1.1rem;color:#fff}
.lg .bh .bsub{font-size:.8rem;color:#5A6B7A;margin-top:2px}
.lg .tile{padding:14px 16px;border-radius:12px;box-shadow:0 3px 12px rgba(0,0,0,.22),inset 0 1px 0 rgba(255,255,255,.25)}
.lg .tile .tn{font-size:.92rem;font-weight:700;text-shadow:0 1px 3px rgba(0,0,0,.45)}
.lg .tile .td{font-size:.82rem;color:#5A6B7A;margin-top:4px;line-height:1.5}
.lg .badge{float:right;font-size:.68rem;font-weight:600;padding:2px 7px;border-radius:8px}
.lg .ftabs{display:flex;gap:2px;flex-wrap:wrap;margin-top:18px}
.lg .ft{flex:1;min-width:140px;text-align:center;padding:11px;border-radius:10px 10px 0 0;cursor:pointer;font-weight:600;font-size:.88rem;color:#5A6B7A;background:rgba(255,255,255,.04);border:none;font-family:inherit}
.lg .ft.on{color:#fff;background:rgba(255,255,255,.1)}
.lg .fbody{padding:22px;border-radius:0 0 14px 14px}
.lg .fgrid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
@media(max-width:640px){.lg .fgrid{grid-template-columns:1fr}}
.lg .fld label{display:block;font-size:.74rem;font-weight:600;color:#5A6B7A;text-transform:uppercase;letter-spacing:.04em;margin-bottom:4px}
.lg .fld input,.lg .fld select,.lg .fld textarea{width:100%;padding:10px 12px;border-radius:8px;border:1px solid rgba(255,255,255,.3);background:rgba(7,16,30,.45);color:#fff;font-size:.9rem;font-family:inherit;outline:none}
.lg .fld input::placeholder,.lg .fld textarea::placeholder{color:rgba(234,242,255,.5)}
.lg .fld input:focus,.lg .fld select:focus,.lg .fld textarea:focus{border-color:#0EBEA8;box-shadow:0 0 0 2px rgba(14,190,168,.25);background:rgba(7,16,30,.6)}
.lg .fld select option{color:#11243c;background:#f3f6fa}
.lg .fld textarea{min-height:80px;resize:vertical}
.lg .full{grid-column:1/-1}
.lg .founded{text-align:left;margin:40px 0 0;padding:20px;max-width:200px}
.lg .founded .v{font-family:'Fraunces',serif;font-weight:800;font-size:2rem;color:#0EBEA8}
.lg .founded .fl{font-size:.7rem;color:#5A6B7A;letter-spacing:.1em;text-transform:uppercase;margin-top:2px}
.lg .foot{max-width:1200px;margin:46px auto 24px;padding:26px 28px 18px}
.lg .foot-grid{display:grid;grid-template-columns:1.3fr 1fr 1fr 1fr 1fr;gap:18px;margin-bottom:14px}
@media(max-width:780px){.lg .foot-grid{grid-template-columns:1fr 1fr}}
.lg .foot .co{font-family:'Fraunces',serif;font-weight:800;font-size:1rem;color:#fff;margin-bottom:6px}
.lg .foot .blurb{font-size:.76rem;color:#5A6B7A;line-height:1.6}
.lg .foot h4{font-size:.78rem;font-weight:700;color:#0EBEA8;margin-bottom:7px}
.lg .foot a{display:block;font-size:.76rem;color:#5A6B7A;padding:2px 0;text-decoration:none;cursor:pointer}
.lg .foot a:hover{color:#EAF2FF}
.lg .foot .base{border-top:1px solid rgba(255,255,255,.12);padding-top:12px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;font-size:.72rem;color:#7A96AE}
.lg .gc{position:fixed;right:18px;bottom:18px;z-index:60;padding:13px 15px;border-radius:15px;width:206px;display:flex;flex-direction:column;gap:7px}
.lg .gc .gt{font-size:.66rem;letter-spacing:.12em;text-transform:uppercase;color:#0EBEA8;font-weight:700}
.lg .gc .gr{display:flex;justify-content:space-between;font-size:.74rem;color:#5A6B7A;font-weight:600}
.lg .gc .gv{font-family:'Fraunces',serif;color:#0EBEA8;font-weight:800}
.lg .gc input{width:100%;accent-color:#0EBEA8}
.lg .drawer{position:fixed;inset:0;z-index:120;background:rgba(8,18,32,.6);backdrop-filter:blur(4px)}
.lg .drawer .panel{position:absolute;top:0;right:0;height:100%;width:min(82vw,320px);background:#0d1c30;border-left:1px solid var(--glass-stroke);box-shadow:-12px 0 40px rgba(0,0,0,.6);padding:18px 16px;display:flex;flex-direction:column;gap:4px;animation:slidein .25s ease}
@keyframes slidein{from{transform:translateX(100%)}to{transform:translateX(0)}}
.lg .drawer .lk{padding:11px 12px;font-size:1rem}
.lg :focus-visible{outline:2px solid #0EBEA8;outline-offset:2px;border-radius:6px}
@media (prefers-reduced-transparency: reduce){.lg .glass{background:#11243c!important;backdrop-filter:none!important}.lg .glass:before{display:none}}
@media (prefers-reduced-motion: reduce){.lg *{animation:none!important;transition:none!important}}
.lg nav.glass{background:rgba(12,27,46,.94);border:1px solid rgba(255,255,255,.10)}
.lg .phero{background:#0C1B2E}
.lg .foot{background:#0C1B2E}
.lg h1{color:#fff}
.lg h2.sec{color:#2A3642;text-shadow:none}
.lg .kick{color:#5A6B7A;text-shadow:none}
.lg .card h3{text-shadow:none}
.lg .tile .tn{text-shadow:none}
.lg .strip .lead{text-shadow:none}
.lg .bh{background:#fff}
.lg .bh .ttl{color:#2A3642}
.lg .bh .bsub{color:#5A6B7A}
.lg .svc-row{background:#fff}
.lg .sub-card{background:#fff}
.lg .tile{background:#fff}
.lg .chip{color:#5A6B7A}
.lg .card li{color:#3a4654}
.lg .card .tag{color:#8a7a52}
.lg .strip .meta{color:#5A6B7A}
.lg .flbl{color:#5A6B7A}
.lg .pr{color:#5A6B7A}
.lg .tile .td{color:#5A6B7A}
.lg .founded .fl{color:#5A6B7A}
.lg .fld label{color:#5A6B7A}
.lg .psearch{background:#fff}
.lg .psearch input{color:#2A3642}
.lg .filters{background:#fff}
.lg h2.sec{position:relative;padding-left:16px}
.lg h2.sec:before{content:"";position:absolute;left:0;top:.2em;bottom:.2em;width:4px;border-radius:2px;background:#0A7C6E}
.lg .eyebrow:before{content:"";display:inline-block;width:22px;height:1px;background:#0EBEA8;vertical-align:middle;margin-right:8px}
.lg .card{transition:transform .25s,box-shadow .25s}
.lg .card:hover{box-shadow:0 16px 36px rgba(20,40,64,.15)}
.lg .svc-row{transition:border-color .2s}
.lg .svc-row:hover{border-color:rgba(10,124,110,.45)}
@media(min-width:561px) and (max-width:880px){.lg .grid3,.lg .grid4{grid-template-columns:1fr 1fr}}
@media(max-width:560px){.lg .phero{padding:28px 20px}.lg h2.sec{margin:34px 0 14px}}
/* ===== v-next: mobile perf + touch + a11y ===== */
.lg .dd.open .dd-menu{display:flex}
.lg button:focus-visible,.lg .lk:focus-visible,.lg .chip:focus-visible{outline:2px solid #0EBEA8;outline-offset:2px}
@media(max-width:880px){
  .lg{--glass-blur:12px}
  .lg .bg:after{animation:none;filter:blur(18px)}
  .lg .gc{display:none}
  .lg .hamb{width:44px;height:44px}
  .lg .chip{min-height:44px;display:inline-flex;align-items:center}
  .lg .pinq{min-height:40px}
  .lg .go{min-height:44px}
  .lg .foot .col a{padding:8px 0;font-size:.8rem}
}
@media(max-width:640px){.lg .fld input,.lg .fld select,.lg .fld textarea{font-size:16px}}
.lg .cmx-tab{min-height:46px;padding:0 16px;border-radius:10px;border:1px solid rgba(20,40,64,.15);background:#fff;color:#5A6B7A;font-weight:800;font-size:.82rem;cursor:pointer;font-family:inherit;display:inline-flex;align-items:center;gap:4px}
.lg .cmx-tab.on{background:rgba(10,124,110,.12);border-color:#0A7C6E;color:#0A7C6E}
.lg .cmx-grid2{display:grid;grid-template-columns:repeat(auto-fit,minmax(290px,1fr));gap:12px}
.lg .cmx-kpi{flex:1 1 90px;background:#fff;border:1px solid rgba(20,40,64,.1);border-radius:10px;padding:10px;text-align:center}
.lg .cmx-roster{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px}
.lg .appswitch{position:sticky;top:70px;z-index:40;display:flex;gap:8px;align-items:center;flex-wrap:wrap;background:rgba(12,27,46,.94);border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:8px 12px;margin:16px 0 4px;box-shadow:0 8px 24px rgba(0,0,0,.35)}
.lg .appswitch .asl{font-size:.6rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:#8BA0B5;margin-right:2px}
.lg .appswitch .asb{min-height:34px;padding:0 14px;border-radius:8px;border:1.5px solid;background:#fff;font-weight:800;font-size:.8rem;cursor:pointer;font-family:inherit}
.lg .appswitch .asb:hover{background:#F7F5F0}
.lg .cmx-rib{position:sticky;top:8px;z-index:30;background:#0C1B2E;border:1px solid rgba(255,255,255,.08);border-radius:11px;padding:0;margin:0 0 12px;display:flex;gap:0;align-items:stretch;box-shadow:0 8px 24px rgba(0,0,0,.3);overflow:hidden}
.lg .cmx-rib .rbar{width:5px;flex-shrink:0}
.lg .cmx-rib .rin{padding:9px 13px;display:flex;gap:10px;align-items:flex-start;min-width:0}
.lg .cmx-rib .rl{font-size:.52rem;font-weight:800;letter-spacing:.11em;text-transform:uppercase;padding:3px 7px;border-radius:5px;color:#fff;white-space:nowrap;flex-shrink:0;margin-top:1px}
.lg .cmx-rib .rt{font-size:.74rem;font-weight:800;color:#fff;font-family:'Fraunces',serif;line-height:1.2}
.lg .cmx-rib .rb{font-size:.66rem;color:#c3cdd8;line-height:1.45;margin-top:3px}
.lg .cmx-i{display:inline-flex;align-items:center;justify-content:center;width:15px;height:15px;border-radius:50%;border:1.3px solid currentColor;font-size:.55rem;font-weight:800;font-style:normal;cursor:pointer;background:none;padding:0;line-height:1;flex-shrink:0;vertical-align:middle}
.lg .cmx-i:hover{background:currentColor}
.lg .cmx-i:hover span{color:#fff}
.lg .cmx-chip{display:inline-flex;align-items:center;font-size:.48rem;font-weight:800;letter-spacing:.05em;text-transform:uppercase;padding:2px 5px;border-radius:4px;color:#fff;vertical-align:middle;white-space:nowrap}
.lg .cmx-prov{display:inline-flex;align-items:center;gap:5px;margin-left:6px;vertical-align:middle}
@media(max-width:680px){.lg .chip{padding:7px 13px;font-size:.85rem}.lg .drawer .lk{padding:14px 12px;font-size:1.05rem}.lg .nav-cta{padding:9px 16px}.lg .lk{padding:8px 12px}}
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

// ===== Capacity Mesh client-engagement panel (06_Clients) =====

// Capacity Mesh — Client Engagement (06_Clients)
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

function CapacityMeshPanel() {
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
          <h1>Capacity Mesh — Client Engagement</h1>
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
        <div style={{ textAlign: "center", color: "#6b7c8c", fontSize: ".7rem", marginTop: 16 }}>iStructural Group Inc. · Capacity Mesh · deterministic core, AI advisory · simulated demo</div>
      </div>
    </div>
  );
}


// ===== Capacity Mesh teaser data (3-office MVP Corporate demo; simulated) =====
const CMD_VOR = [
  ["NY","Robert Hayes","71.3,4.0 198.9,4.0 162.6,102.6 154.7,108.0 72.8,7.6",132.1,45.2],
  ["NY","Aisha Khan","72.8,7.6 154.7,108.0 144.7,148.0 53.9,135.9",106.5,99.9],
  ["NY","Tomas Rivera","181.5,356.0 51.7,356.0 148.9,160.2 233.6,196.8 216.8,302.2",166.5,274.2],
  ["NY","Grace Lin","198.9,4.0 237.0,4.0 232.1,90.6 162.6,102.6",207.7,50.3],
  ["NY","Daniel Park","51.7,356.0 4.0,356.0 4.0,156.7 53.9,135.9 144.7,148.0 148.9,160.2",67.9,218.8],
  ["NY","Maria Lopez","4.0,4.0 71.3,4.0 72.8,7.6 53.9,135.9 4.0,156.7",41.2,61.6],
  ["NY","Sofia Bauer","233.6,196.8 148.9,160.2 144.7,148.0 154.7,108.0 162.6,102.6 232.1,90.6 249.5,99.8 264.9,171.8 254.8,187.0",205.1,140.5],
  ["TO","Daniel Wong","237.0,4.0 318.1,4.0 325.1,62.7 249.5,99.8 232.1,90.6",272.3,52.2],
  ["TO","Priya Shah","444.4,237.5 392.7,236.5 373.8,188.9 409.2,166.9 431.7,168.5 451.0,183.4",417.2,197.0],
  ["TO","Mohammed Ali","443.2,356.0 316.7,356.0 331.9,277.5 373.1,279.6",366.2,317.3],
  ["TO","Emma Clarke","254.8,187.0 264.9,171.8 325.6,147.4 367.6,187.8 315.6,236.8",305.7,186.2],
  ["TO","Raj Patel","318.1,4.0 431.0,4.0 430.7,73.0 387.0,92.6 341.9,85.7 325.1,62.7",372.3,53.7],
  ["TO","Olivia Brown","325.6,147.4 264.9,171.8 249.5,99.8 325.1,62.7 341.9,85.7",301.4,113.5],
  ["TO","Lucas Meyer","409.2,166.9 373.8,188.9 367.6,187.8 325.6,147.4 341.9,85.7 387.0,92.6",367.5,144.9],
  ["TO","Hannah Reed","316.7,356.0 181.5,356.0 216.8,302.2 320.8,268.6 331.9,277.5",273.5,312.1],
  ["TO","Ethan Wright","216.8,302.2 233.6,196.8 254.8,187.0 315.6,236.8 320.8,268.6",268.3,238.3],
  ["TO","Sofia Mendez","373.8,188.9 392.7,236.5 373.1,279.6 331.9,277.5 320.8,268.6 315.6,236.8 367.6,187.8",353.6,239.4],
  ["TO","Liam Tremblay","461.4,356.0 443.2,356.0 373.1,279.6 392.7,236.5 444.4,237.5 480.9,286.1",432.6,291.9],
  ["TO","Noah Kim","431.7,168.5 409.2,166.9 387.0,92.6 430.7,73.0 454.8,88.0 459.5,105.5",428.8,115.8],
  ["PA","Julien Moreau","596.5,146.9 548.1,219.6 512.5,177.7 513.9,146.1 538.6,113.8 554.9,112.3",544.1,152.7],
  ["PA","Camille Laurent","538.6,113.8 513.9,146.1 459.5,105.5 454.8,88.0 511.1,63.4",495.6,103.4],
  ["PA","Antoine Dubois","588.6,356.0 461.4,356.0 480.9,286.1 549.7,225.7 565.2,233.9",529.2,291.6],
  ["PA","Lea Martin","636.0,137.2 636.0,236.6 565.2,233.9 549.7,225.7 548.1,219.6 596.5,146.9",588.6,200.0],
  ["PA","Chloe Petit","431.0,4.0 535.3,4.0 511.1,63.4 454.8,88.0 430.7,73.0",472.6,46.5],
  ["PA","Emma Rousseau","480.9,286.1 444.4,237.5 451.0,183.4 512.5,177.7 548.1,219.6 549.7,225.7",497.8,221.7],
  ["PA","Hugo Bernard","451.0,183.4 431.7,168.5 459.5,105.5 513.9,146.1 512.5,177.7",473.7,156.2],
  ["PA","Louis Faure","636.0,236.6 636.0,356.0 588.6,356.0 565.2,233.9",606.5,295.6],
  ["PA","Mathis Roy","636.0,14.4 636.0,137.2 596.5,146.9 554.9,112.3",605.9,102.7],
  ["PA","Ines Garnier","535.3,4.0 636.0,4.0 636.0,14.4 554.9,112.3 538.6,113.8 511.1,63.4",568.7,52.0]
];
// ===== Capacity Mesh teaser v2 (engine v2.1, gold-gate validated; simulated demo) =====
const CMD_AREAS=["High-Seismic","High-rise Towers","ETABS / 3D Modelling","Detailing & BIM","Bridges (Eurocode)","Peer Review"];
const CMD_ACOL={"High-Seismic":"#C0553A","High-rise Towers":"#1E5B8A","ETABS / 3D Modelling":"#0A7C6E","Detailing & BIM":"#6B3A7D","Bridges (Eurocode)":"#A8762A","Peer Review":"#1B6B35"};
const CMD_OFF={NY:{n:"New York",c:"#1E5B8A",ppl:7,cov:75,forte:"High-Seismic"},TO:{n:"Toronto",c:"#0EBEA8",ppl:12,cov:95,forte:"ETABS / 3D Modelling"},PA:{n:"Paris",c:"#C6973F",ppl:10,cov:86,forte:"Detailing & BIM"}};
const CMD_FORTE={NY:[69,69,61,62,44,69],TO:[37,65,88,88,37,38],PA:[39,40,62,90,69,40]};
const CMD_MEAN=[48,58,70,80,50,49];
const CMD_FLOWS=[["High-Seismic","NY",69,["TO","PA"]],["High-rise Towers","NY",69,["PA"]],["ETABS / 3D Modelling","TO",88,[]],["Detailing & BIM","PA",90,[]],["Bridges (Eurocode)","PA",69,["NY","TO"]],["Peer Review","NY",69,["TO","PA"]]];
const CMD_P={"Robert Hayes":["NY","Senior",100],"Aisha Khan":["NY","Senior",100],"Tomas Rivera":["NY","Engineer",88],"Grace Lin":["NY","Engineer",88],"Daniel Park":["NY","Graduate",40],"Maria Lopez":["NY","Graduate",40],"Sofia Bauer":["NY","Technician",67],"Daniel Wong":["TO","Senior",100],"Priya Shah":["TO","Senior",100],"Mohammed Ali":["TO","Engineer",83],"Emma Clarke":["TO","Engineer",88],"Raj Patel":["TO","Engineer",88],"Olivia Brown":["TO","Engineer",83],"Lucas Meyer":["TO","Graduate",100],"Hannah Reed":["TO","Graduate",100],"Ethan Wright":["TO","Graduate",100],"Sofia Mendez":["TO","Technician",100],"Liam Tremblay":["TO","Technician",100],"Noah Kim":["TO","Technician",100],"Julien Moreau":["PA","Senior",100],"Camille Laurent":["PA","Senior",100],"Antoine Dubois":["PA","Engineer",79],"Lea Martin":["PA","Engineer",75],"Chloe Petit":["PA","Engineer",83],"Emma Rousseau":["PA","Engineer",75],"Hugo Bernard":["PA","Graduate",70],"Louis Faure":["PA","Graduate",80],"Mathis Roy":["PA","Technician",100],"Ines Garnier":["PA","Technician",100]};
const CMD_LU=[["Lucas Meyer","TO","Graduate","Engineer",94],["Hannah Reed","TO","Graduate","Engineer",94],["Ethan Wright","TO","Graduate","Engineer",94],["Tomas Rivera","NY","Engineer","Senior",92],["Raj Patel","TO","Engineer","Senior",92],["Grace Lin","NY","Engineer","Senior",92]];
const CMD_LENDS={NY:["High-Seismic","High-rise Towers","Peer Review"],TO:["ETABS / 3D Modelling"],PA:["Detailing & BIM","Bridges (Eurocode)"]};
const CMD_BORROWS={NY:["Bridges (Eurocode)"],TO:["High-Seismic","Bridges (Eurocode)","Peer Review"],PA:["High-Seismic","High-rise Towers","Peer Review"]};
const CMD_CARD={name:"Lucas Meyer",off:"TO",level:"Graduate",ready:94,rec:"Level-up candidate: Engineer",stages:[
["Concept",[["Tower system & stability scheme","High-rise Towers",3,5,4],["Seismic force-resisting system (high SDC)","High-Seismic",1,1,4],["Preliminary sizing & load takedown","General",3,2,3]]],
["Detailed Design",[["Tall-building lateral design","High-rise Towers",2,3,4],["PT floor design","High-rise Towers",2,4,4],["Special seismic detailing ACI 318 Ch.18","High-Seismic",2,2,4]]],
["Analysis",[["Build & run ETABS model","ETABS / 3D Modelling",4,3,3],["ETABS shear-wall / 3D modelling","ETABS / 3D Modelling",4,4,3],["Wind & seismic response analysis","High-rise Towers",3,4,4]]],
["Modelling & BIM",[["Revit structural authoring","Detailing & BIM",4,4,2],["Federated BIM coordination","Detailing & BIM",4,4,3],["3D parametric / Grasshopper","ETABS / 3D Modelling",4,4,3]]],
["Drawings & QA",[["General arrangement drawings","Detailing & BIM",4,4,2],["Special seismic detailing drawings","Detailing & BIM",4,3,3],["Tall-building peer review (LATBSDC/PEER TBI)","Peer Review",1,0,4]]]]};
const CMD_INK="#2A3642", CMD_DIM="#5A6B7A", CMD_BRD="1px solid rgba(20,40,64,.1)";
function CmdDot({k}){return <span style={{display:"inline-block",width:9,height:9,borderRadius:2,background:CMD_OFF[k].c,marginRight:5,flexShrink:0}}/>;}
function CmdDonut({v,color,size=40,label}){const r=size*0.36,c=2*Math.PI*r;return(
  <svg width={size} height={size} viewBox={"0 0 "+size+" "+size} role="img" aria-label={(label||"coverage")+" "+v+" percent"}>
    <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(20,40,64,.12)" strokeWidth={size*0.09}/>
    <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={size*0.09} strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c*(1-v/100)} transform={"rotate(-90 "+size/2+" "+size/2+")"}/>
    <text x="50%" y="55%" textAnchor="middle" dominantBaseline="middle" fill={CMD_INK} fontWeight="800" fontSize={size*0.3} fontFamily="'Fraunces',serif">{v}</text>
  </svg>);}
// ===== Value Explainer Ribbon: provenance states + explanation registry =====
const CM_PROV={
  ref:   {k:"REFERENCE",  c:"#0A7C6E"}, // cited default (teal)
  calc:  {k:"MESH CALC",  c:"#1E5B8A", name:"Mesh Calc"}, // deterministic core output (blue)
  assume:{k:"ASSUMPTION",  c:"#C6973F"}, // estimate, no external source (amber)
  user:  {k:"BY USER",    c:"#C9A227"}  // any value the user changed (gold)
};
const CM_EXPL={
  offices:   {p:"calc",  t:"Offices = 3",              b:"Distinct offices in the loaded roster. ARGO Calc: COUNT(DISTINCT office) over the 06_Clients roster."},
  engineers: {p:"calc",  t:"Engineers = 29",           b:"Headcount across all offices. ARGO Calc: COUNT(person) over the roster. NY 7, TO 12, PA 10."},
  avgcov:    {p:"calc",  t:"Avg coverage = 87%",        b:"Headcount-weighted mean of every engineer's coverage. ARGO Calc: sum(coverage_i) / 29. Inputs: per-person coverage cells."},
  levelup:   {p:"calc",  t:"Level-up candidates = 18",  b:"Engineers whose readiness for the next level clears the promotion threshold. ARGO Calc: COUNT(readiness_i >= level_gate)."},
  gaps:      {p:"calc",  t:"Firm gaps = 0",             b:"Capability areas where no office reaches the firm-mean proficiency. ARGO Calc: COUNT(area where MAX(office score) < firm mean). Zero = every area is covered somewhere."},
  succession:{p:"calc",  t:"Succession flags = 0",      b:"Senior roles with no ready backup in the same office. ARGO Calc: COUNT(role with 0 successors at readiness gate). Zero = every lead has a successor."},
  mesh:      {p:"calc",  t:"The mesh",                  b:"One cell per engineer; colour = office, shade = that person's coverage. ARGO Calc: shade = 0.18 + 0.55 x coverage/100. Geometry is a Voronoi layout, not a metric."},
  heat:      {p:"calc",  t:"Capability heatmap",        b:"Office x area mean proficiency, 0-100. ARGO Calc: mean of member proficiencies in each area. Star = lead office (highest score). Area names are a REFERENCE taxonomy."},
  levelboard:{p:"calc",  t:"Level-up board",            b:"Readiness score for each promotion candidate, 0-100. ARGO Calc: weighted coverage of the target level's expected tasks. Sorted high to low."},
  offcov:    {p:"calc",  t:"Office coverage",           b:"Office-level mean coverage shown in the donut. ARGO Calc: mean(coverage) over the office's people. Forte = the area with this office's highest score."},
  roster:    {p:"calc",  t:"Retained capability",       b:"Per-person coverage of the tasks expected at that person's level. ARGO Calc: covered level-tasks / expected level-tasks."},
  ready:     {p:"calc",  t:"Readiness = 94",            b:"This engineer's readiness for the recommended next level. ARGO Calc: weighted coverage of the next level's task set. Deterministic; the AI layer only explains it."},
  pfc:       {p:"assume",t:"P / F / C inputs",          b:"Proficiency and Frequency (0-5) are entered per person and become BY USER in the live engine; here they are simulated (Assumption). Challenge (1-5) is a REFERENCE rubric. The core computes coverage and readiness from these, never the AI."}
};
function CmProv({id,setRib,stop=true}){
  const e=CM_EXPL[id]; if(!e) return null; const pv=CM_PROV[e.p];
  return(
    <span className="cmx-prov">
      <span className="cmx-chip" style={{background:pv.c}}>{pv.k}</span>
      <button type="button" className="cmx-i" style={{color:pv.c}} aria-label={"Explain: "+e.t}
        onClick={(ev)=>{if(stop)ev.stopPropagation();setRib(e);}}><span style={{color:pv.c}}>i</span></button>
    </span>);
}
function ExplainerRibbon({rib,prov}){
  const pc=rib?prov[rib.p].c:"#0A7C6E";
  const dflt="Tap any ⓘ to read what a number is, where it came from, and how it was computed. Colour shows provenance: Reference (teal, cited), "+prov.calc.name+" (blue, computed), Assumption (amber, estimate), By User (gold, you changed it).";
  return(
    <div className="cmx-rib" role="status" aria-live="polite">
      <div className="rbar" style={{background:pc}}/>
      <div className="rin">
        <span className="rl" style={{background:pc}}>{rib?prov[rib.p].k:"Guide"}</span>
        <div style={{minWidth:0}}>
          <div className="rt">{rib?rib.t:"Value Explainer"}</div>
          <div className="rb">{rib?rib.b:dflt}</div>
        </div>
      </div>
    </div>);
}
function ProvLegend({prov}){
  return <span style={{fontSize:".6rem",color:"#5A6B7A"}}>Provenance: <b style={{color:prov.ref.c}}>Reference</b> · <b style={{color:prov.calc.c}}>{prov.calc.name}</b> · <b style={{color:prov.assume.c}}>Assumption</b> · <b style={{color:prov.user.c}}>By User</b>. Deterministic core computed every number; the AI layer only explains.</span>;
}
function CMDash(){
  const [tab,setTab]=useState("exec");
  const [rib,setRib]=useState(null);
  const [off,setOff]=useState("NY");
  const [sel,setSel]=useState(null);
  const P5=sel!=null?CMD_VOR[sel]:null;
  const panel={background:"#fff",border:CMD_BRD,borderRadius:12,padding:14};
  const h3s={fontFamily:"'Fraunces',serif",fontWeight:800,fontSize:".98rem",color:CMD_INK,margin:0};
  const take={fontSize:".7rem",color:"#8a93a0",margin:"3px 0 10px"};
  return(
    <article className="card glass" style={{marginTop:14,borderTop:"4px solid #0EBEA8"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10,flexWrap:"wrap"}}>
        <div>
          <div style={{fontSize:".66rem",fontWeight:700,letterSpacing:".16em",textTransform:"uppercase",color:"#0A7C6E"}}>Capacity Mesh · live MVP dashboard</div>
          <div style={{fontFamily:"'Fraunces',serif",fontWeight:800,fontSize:"1.22rem",color:CMD_INK,marginTop:6,lineHeight:1.25}}>An example workforce: one firm, three offices, 29 engineers, every number computed</div>
          <div style={{fontSize:".72rem",color:"#8a93a0",marginTop:4}}>The same mesh maps any workforce, any discipline, trade, or role, in any field. This 3-office engineering demo is one example.</div>
        </div>
        <span style={{fontSize:".58rem",fontWeight:800,letterSpacing:".07em",textTransform:"uppercase",color:"#A8762A",border:"1px solid #C6973F66",borderRadius:6,padding:"4px 8px"}}>Simulated demo · gold-gate validated</span>
      </div>
      <div role="tablist" aria-label="Dashboard views" style={{display:"flex",gap:8,flexWrap:"wrap",margin:"14px 0"}}>
        {[["exec","Executive"],["office","Office"],["emp","Employee Card"]].map(([k,l])=>(
          <button key={k} role="tab" aria-selected={tab===k} className={"cmx-tab"+(tab===k?" on":"")} onClick={()=>setTab(k)}>{l}</button>))}
      </div>

      <ExplainerRibbon rib={rib} prov={CM_PROV} />

      {tab==="exec" && (<div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {[["3","Offices","offices"],["29","Engineers","engineers"],["87%","Avg coverage","avgcov"],["18","Level-up cands","levelup"],["0","Firm gaps","gaps"],["0","Succession flags","succession"]].map(([v,l,id])=>(
            <div key={l} className="cmx-kpi"><div style={{fontFamily:"'Fraunces',serif",fontWeight:800,fontSize:"1.35rem",color:"#0A7C6E",lineHeight:1}}>{v}</div><div style={{fontSize:".58rem",color:CMD_DIM,textTransform:"uppercase",letterSpacing:".07em",fontWeight:700,marginTop:3,display:"flex",alignItems:"center",justifyContent:"center"}}>{l}<CmProv id={id} setRib={setRib}/></div></div>))}
        </div>
        <div className="cmx-grid2" style={{marginTop:12}}>
          <div style={panel}>
            <h4 style={h3s}>The mesh<CmProv id="mesh" setRib={setRib}/></h4>
            <div style={take}>Each cell is one engineer. Color = office, shade = coverage. Tap a cell.</div>
            <svg viewBox="0 0 640 360" width="100%" style={{display:"block",borderRadius:10,background:"#0C1B2E"}} role="group" aria-label="Voronoi map of 29 engineers">
              {CMD_VOR.map((c,i)=>{const cov=CMD_P[c[1]][2];return(
                <polygon key={c[1]} points={c[2]} fill={CMD_OFF[c[0]].c} fillOpacity={0.18+0.55*cov/100}
                  stroke={sel===i?"#fff":"#0C1B2E"} strokeWidth={sel===i?2.5:1.6} style={{cursor:"pointer"}}
                  tabIndex={0} role="button" aria-label={c[1]+", "+CMD_OFF[c[0]].n+", coverage "+cov+" percent"}
                  onClick={()=>setSel(sel===i?null:i)}
                  onKeyDown={(e)=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();setSel(sel===i?null:i);}}}/>);})}
              {Object.keys(CMD_OFF).map((k,i)=><text key={k} x={30+i*193+96} y={22} textAnchor="middle" fill="#fff" fontWeight="800" fontSize="13" fontFamily="'Fraunces',serif" style={{pointerEvents:"none",paintOrder:"stroke",stroke:"#0C1B2E",strokeWidth:4}}>{CMD_OFF[k].n}</text>)}
            </svg>
            <div aria-live="polite" style={{marginTop:8,minHeight:40,display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",background:"#F7F5F0",border:CMD_BRD,borderRadius:9,padding:"7px 10px",fontSize:".74rem"}}>
              {P5?(<><CmdDot k={P5[0]}/><b style={{color:CMD_INK}}>{P5[1]}</b><span style={{color:CMD_DIM}}>{CMD_P[P5[1]][1]} · {CMD_OFF[P5[0]].n}</span><b style={{marginLeft:"auto",color:"#0A7C6E"}}>coverage {CMD_P[P5[1]][2]}%</b></>)
              :(<span style={{color:CMD_DIM}}>Firm avg coverage 87% · New York 75 · Toronto 95 · Paris 86</span>)}
            </div>
          </div>
          <div style={panel}>
            <h4 style={h3s}>Capability heatmap · office x area<CmProv id="heat" setRib={setRib}/></h4>
            <div style={take}>Mean proficiency 0-100. Star = lead office. Right: who supports whom.</div>
            {CMD_AREAS.map((a,ai)=>(
              <div key={a} style={{display:"grid",gridTemplateColumns:"minmax(96px,1.4fr) repeat(3,minmax(34px,1fr)) 1.6fr",gap:4,alignItems:"center",marginBottom:4}}>
                <div style={{fontSize:".66rem",color:CMD_DIM,display:"flex",alignItems:"center",gap:4}}><span style={{width:8,height:8,borderRadius:2,background:CMD_ACOL[a],flexShrink:0}}/>{a}</div>
                {["NY","TO","PA"].map(k=>{const v=CMD_FORTE[k][ai];return <div key={k} style={{textAlign:"center",padding:"6px 2px",borderRadius:6,fontWeight:800,fontSize:".72rem",background:"rgba(10,124,110,"+(0.06+0.5*v/100).toFixed(2)+")",color:v>=60?"#fff":CMD_DIM}}>{v}{CMD_FLOWS[ai][1]===k?" ★":""}</div>;})}
                <div style={{fontSize:".62rem",color:CMD_FLOWS[ai][3].length?"#A8762A":"#1B6B35",fontWeight:700}}>{CMD_FLOWS[ai][3].length?CMD_OFF[CMD_FLOWS[ai][1]].n+" → "+CMD_FLOWS[ai][3].map(x=>CMD_OFF[x].n).join(", "):"self-sufficient"}</div>
              </div>))}
            <div style={{fontFamily:"'Fraunces',serif",fontWeight:800,fontSize:".9rem",color:CMD_INK,margin:"12px 0 6px",display:"flex",alignItems:"center"}}>Level-up board<CmProv id="levelboard" setRib={setRib}/></div>
            {CMD_LU.map(([n,o,f,t,r])=>(
              <div key={n} style={{display:"grid",gridTemplateColumns:"minmax(96px,1.4fr) minmax(86px,1fr) 1.6fr 30px",gap:6,alignItems:"center",marginBottom:5,fontSize:".72rem"}}>
                <div style={{display:"flex",alignItems:"center",fontWeight:700,color:CMD_INK,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}><CmdDot k={o}/>{n}</div>
                <div style={{color:CMD_DIM,fontSize:".64rem"}}>{f} → <b style={{color:"#0A7C6E"}}>{t}</b></div>
                <div style={{height:7,borderRadius:4,background:"rgba(20,40,64,.08)"}}><div style={{width:r+"%",height:"100%",borderRadius:4,background:"linear-gradient(90deg,#0A7C6E,#0EBEA8)"}}/></div>
                <b style={{fontFamily:"'Fraunces',serif",color:"#0A7C6E",textAlign:"right"}}>{r}</b>
              </div>))}
            <div style={{fontSize:".6rem",color:"#8a93a0",marginTop:4}}>Top of 18 candidates (technician promotions listed in the full engine).</div>
          </div>
        </div>
      </div>)}

      {tab==="office" && (<div>
        <div role="tablist" aria-label="Select office" style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {["NY","TO","PA"].map(k=>(
            <button key={k} role="tab" aria-selected={off===k} className={"cmx-tab"+(off===k?" on":"")} style={{flex:"1 1 100px"}} onClick={()=>setOff(k)}><CmdDot k={k}/>{CMD_OFF[k].n}</button>))}
        </div>
        <div className="cmx-grid2" style={{marginTop:12}}>
          <div style={panel}>
            <div style={{display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
              <CmdDonut v={CMD_OFF[off].cov} color={CMD_OFF[off].c} size={56} label={CMD_OFF[off].n+" coverage"}/>
              <div><h4 style={{...h3s,display:"flex",alignItems:"center"}}>{CMD_OFF[off].n} · {CMD_OFF[off].ppl} people<CmProv id="offcov" setRib={setRib}/></h4>
              <div style={{fontSize:".7rem",color:CMD_DIM,marginTop:2}}>Forte: <b style={{color:CMD_OFF[off].c}}>{CMD_OFF[off].forte}</b> · avg coverage {CMD_OFF[off].cov}%</div></div>
            </div>
            <div style={{...take,marginTop:10}}>Bars = this office · tick = firm mean.</div>
            {CMD_AREAS.map((a,ai)=>{const v=CMD_FORTE[off][ai];return(
              <div key={a} style={{marginBottom:7}}>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:".66rem",marginBottom:2}}>
                  <span style={{color:CMD_DIM}}>{a}{CMD_FLOWS[ai][1]===off?" ★":""}</span><b style={{color:CMD_INK}}>{v}</b></div>
                <div style={{position:"relative",height:9,borderRadius:5,background:"rgba(20,40,64,.08)"}}>
                  <div style={{width:v+"%",height:"100%",borderRadius:5,background:CMD_OFF[off].c,opacity:.9}}/>
                  <div style={{position:"absolute",left:CMD_MEAN[ai]+"%",top:-2,width:2,height:13,background:CMD_INK,opacity:.5}}/>
                </div>
              </div>);})}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginTop:12,fontSize:".7rem"}}>
              <div><div style={{fontWeight:800,letterSpacing:".08em",textTransform:"uppercase",color:"#1B6B35",fontSize:".6rem",marginBottom:4}}>Lends</div>{CMD_LENDS[off].map(a=><div key={a} style={{color:CMD_DIM,padding:"3px 0"}}>{a}</div>)}</div>
              <div><div style={{fontWeight:800,letterSpacing:".08em",textTransform:"uppercase",color:"#C0553A",fontSize:".6rem",marginBottom:4}}>Borrows</div>{CMD_BORROWS[off].map(a=><div key={a} style={{color:CMD_DIM,padding:"3px 0"}}>{a}</div>)}</div>
            </div>
          </div>
          <div style={panel}>
            <h4 style={{...h3s,display:"flex",alignItems:"center"}}>Roster · retained capability<CmProv id="roster" setRib={setRib}/></h4>
            <div style={take}>Per-person coverage of level-expected tasks.</div>
            <div className="cmx-roster">
              {Object.entries(CMD_P).filter(([,v])=>v[0]===off).map(([n,[,lvl,cov]])=>(
                <div key={n} style={{display:"flex",alignItems:"center",gap:8,background:"#F7F5F0",border:CMD_BRD,borderRadius:9,padding:"7px 9px",minHeight:46}}>
                  <CmdDonut v={cov} color={CMD_OFF[off].c} size={36} label={n+" coverage"}/>
                  <div style={{minWidth:0}}><div style={{fontSize:".7rem",fontWeight:700,color:CMD_INK,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{n}</div><div style={{fontSize:".58rem",color:CMD_DIM}}>{lvl}</div></div>
                </div>))}
            </div>
          </div>
        </div>
      </div>)}

      {tab==="emp" && (<div className="cmx-grid2">
        <div style={panel}>
          <div style={{display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
            <CmdDonut v={CMD_CARD.ready} color="#0EBEA8" size={62} label="readiness"/>
            <div style={{flex:1,minWidth:150}}>
              <div style={{fontSize:".6rem",fontWeight:700,letterSpacing:".14em",textTransform:"uppercase",color:"#0A7C6E"}}>Career Development Card</div>
              <h4 style={{...h3s,fontSize:"1.15rem",display:"flex",alignItems:"center"}}>{CMD_CARD.name}<CmProv id="ready" setRib={setRib}/></h4>
              <div style={{fontSize:".7rem",color:CMD_DIM,marginTop:2}}><CmdDot k={CMD_CARD.off}/>{CMD_OFF[CMD_CARD.off].n} · {CMD_CARD.level} · coverage 100%</div>
            </div>
            <span style={{fontSize:".62rem",fontWeight:700,padding:"4px 9px",borderRadius:6,background:"rgba(10,124,110,.1)",color:"#0A7C6E",border:"1px solid rgba(10,124,110,.35)"}}>{CMD_CARD.rec}</span>
          </div>
          <div style={{...take,marginTop:8,display:"flex",alignItems:"center",flexWrap:"wrap"}}>Excerpt, 15 of 31 tracked tasks. P = Proficiency 0-5 · F = Frequency 0-5 · C = Challenge 1-5. Every employee receives this card after each run.<CmProv id="pfc" setRib={setRib}/></div>
        </div>
        {CMD_CARD.stages.map(([st,rows])=>(
          <div key={st} style={panel}>
            <div style={{fontSize:".62rem",fontWeight:800,letterSpacing:".1em",textTransform:"uppercase",color:CMD_DIM,marginBottom:8}}>{st}</div>
            {rows.map(([act,ar,p,f,c])=>(
              <div key={act} style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap",background:"#F7F5F0",border:CMD_BRD,borderRadius:8,padding:"6px 9px",marginBottom:6}}>
                <div style={{flex:"1 1 170px",minWidth:0}}>
                  <div style={{fontSize:".7rem",fontWeight:600,color:CMD_INK,lineHeight:1.3}}>{act}</div>
                  <div style={{fontSize:".56rem",fontWeight:700,color:CMD_ACOL[ar]||CMD_DIM}}>{ar}</div>
                </div>
                <div style={{display:"flex",gap:6,flex:"1 1 120px",maxWidth:190}}>
                  {[[p,p>=3?"#0EBEA8":p>=2?"#C6973F":"#C0553A","P"],[f,"#6db3e6","F"],[c,"#c39bd8","C"]].map(([v,col,lab])=>(
                    <span key={lab} style={{flex:1}} title={lab+" "+v+"/5"}>
                      <i style={{fontStyle:"normal",fontSize:".5rem",color:CMD_DIM,fontWeight:700}}>{lab}{v}</i>
                      <span style={{display:"block",height:4,borderRadius:2,background:"rgba(20,40,64,.08)",marginTop:1}}><span style={{display:"block",height:"100%",width:(v/5*100)+"%",borderRadius:2,background:col}}/></span>
                    </span>))}
                </div>
              </div>))}
          </div>))}
      </div>)}

      <div style={{fontSize:".62rem",color:"#8a93a0",marginTop:12,fontStyle:"italic"}}>Simulated demonstration data, not real personnel records. Source: Capacity Mesh Engine v2.1, 11,257 live formulas, gold-gate 45/45 PASS, June 2026. Deterministic core computes all numbers; AI layer is advisory only.</div>
    </article>);
}

// ===== Capacity Mesh · Trust Ledger — sample Decision Record (working sample) =====
const CM_DRP={ref:{k:"REFERENCE",c:"#0A7C6E"},calc:{k:"MESH CALC",c:"#1E5B8A",name:"Mesh Calc"},assume:{k:"ASSUMPTION",c:"#C6973F"},user:{k:"BY USER",c:"#C9A227"}};
const CM_DR={
  schema_version:"1.0", record_id:"sample-a1f3c8", issued_at:"2026-07-09T14:22:05Z",
  actor:{name:"owner",role:"decision-maker"}, org:"Demo Global Structures Inc.", unit:"Toronto",
  decision_type:"LEVEL-UP",
  subject:{person:"Lucas Meyer",from_level:"Graduate",to_level:"Engineer"},
  drivers:[
    {key:"Readiness",value:"94",provenance:"calc",evidence:"readiness = 0.6·coverage + 0.4·next_level_coverage"},
    {key:"Coverage",value:"100",provenance:"calc",evidence:"covered ÷ expected level tasks"},
    {key:"P / F / C inputs",value:"set",provenance:"user",evidence:"entered by Toronto lead, 2026-06-30"}
  ],
  engine:{version:"v2.1",gold_gate:"45/45 PASS (2026-06)"},
  reproducibility:{input_snapshot_hash:"sha256:7c9b… (sample)"},
  recommendation:{engine_recommended:"Level-up candidate → Engineer",human_decision:"Approved",followed:true},
  rag_note:{text:"Precedent: 3 Toronto graduates promoted at readiness ≥ 90 last cycle.",advisory:true},
  seal:{tier:"Tier-2 advisory",retrieval_ran:false},
  integrity:{record_hash:"sha256:a1f3… (sample)",algo:"sha256"}
};
function CMDecisionSample(){
  const ink="#2A3642", dim="#5A6B7A", brd="1px solid rgba(20,40,64,.1)";
  const cols="minmax(88px,1fr) 44px minmax(96px,1.1fr) minmax(120px,1.7fr)";
  const chip=(pk)=>{const x=CM_DRP[pk];return <span style={{display:"inline-flex",alignItems:"center",fontSize:".5rem",fontWeight:800,letterSpacing:".05em",textTransform:"uppercase",padding:"2px 6px",borderRadius:4,color:"#fff",background:x.c,whiteSpace:"nowrap"}}>{x.k}</span>;};
  const cell={padding:"7px 9px",borderBottom:brd,fontSize:".72rem",color:ink};
  return(
    <article className="card glass" style={{marginTop:14,borderTop:"4px solid #1E5B8A",padding:0,overflow:"hidden"}}>
      <div style={{background:"#0C1B2E",padding:"14px 16px",display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10,flexWrap:"wrap"}}>
        <div>
          <div style={{fontSize:".6rem",fontWeight:800,letterSpacing:".16em",textTransform:"uppercase",color:"#0EBEA8"}}>Capacity Mesh · Trust Ledger</div>
          <div style={{fontFamily:"'Fraunces',serif",fontWeight:800,fontSize:"1.15rem",color:"#fff",marginTop:4}}>Decision Record · working sample</div>
        </div>
        <div style={{textAlign:"right",color:"#c3cdd8",fontSize:".62rem",lineHeight:1.5}}>
          <div>#{CM_DR.record_id}</div><div>{CM_DR.issued_at}</div>
          <span style={{display:"inline-block",marginTop:3,fontSize:".54rem",fontWeight:800,letterSpacing:".08em",textTransform:"uppercase",color:"#e0b65f",border:"1px solid rgba(224,182,95,.5)",borderRadius:5,padding:"2px 6px"}}>Seal · {CM_DR.seal.tier}</span>
        </div>
      </div>
      <div style={{padding:"14px 16px"}}>
        <div style={{fontFamily:"'Fraunces',serif",fontWeight:800,fontSize:"1.05rem",color:ink}}>{CM_DR.decision_type} · {CM_DR.recommendation.human_decision}</div>
        <div style={{fontSize:".82rem",color:dim,marginTop:2}}>{CM_DR.subject.person} · {CM_DR.subject.from_level} → {CM_DR.subject.to_level} · {CM_DR.unit} · {CM_DR.org}</div>
        <div style={{fontSize:".6rem",fontWeight:800,letterSpacing:".1em",textTransform:"uppercase",color:"#0A7C6E",margin:"14px 0 6px"}}>The numbers behind this decision</div>
        <div style={{border:brd,borderRadius:9,overflow:"hidden"}}>
          <div style={{display:"grid",gridTemplateColumns:cols,background:"#F7F5F0",fontSize:".56rem",fontWeight:800,letterSpacing:".05em",textTransform:"uppercase",color:dim}}>
            <div style={{padding:"6px 9px"}}>Value</div><div style={{padding:"6px 9px",textAlign:"center"}}>=</div><div style={{padding:"6px 9px"}}>Provenance</div><div style={{padding:"6px 9px"}}>Evidence</div>
          </div>
          {CM_DR.drivers.map((d,i)=>(
            <div key={i} style={{display:"grid",gridTemplateColumns:cols,alignItems:"center"}}>
              <div style={cell}>{d.key}</div>
              <div style={{...cell,textAlign:"center",fontWeight:800,color:"#0A7C6E"}}>{d.value}</div>
              <div style={cell}>{chip(d.provenance)}</div>
              <div style={{...cell,color:dim,fontSize:".66rem"}}>{d.evidence}</div>
            </div>))}
        </div>
        <div style={{fontSize:".62rem",color:dim,marginTop:6}}>Engine {CM_DR.engine.version} · gold-gate {CM_DR.engine.gold_gate}</div>
        <div className="cmx-grid2" style={{marginTop:14}}>
          <div style={{background:"#F7F5F0",border:brd,borderRadius:9,padding:"9px 11px"}}>
            <div style={{fontSize:".58rem",fontWeight:800,letterSpacing:".08em",textTransform:"uppercase",color:dim,marginBottom:4}}>Engine vs human</div>
            <div style={{fontSize:".7rem",color:ink}}>Engine: {CM_DR.recommendation.engine_recommended}</div>
            <div style={{fontSize:".7rem",color:ink,marginTop:2}}>Human: {CM_DR.recommendation.human_decision} · followed ✓</div>
            <div style={{fontSize:".64rem",color:dim,marginTop:6,fontStyle:"italic"}}>AI note (non-binding): {CM_DR.rag_note.text}</div>
          </div>
          <div style={{background:"#F7F5F0",border:brd,borderRadius:9,padding:"9px 11px"}}>
            <div style={{fontSize:".58rem",fontWeight:800,letterSpacing:".08em",textTransform:"uppercase",color:dim,marginBottom:4}}>Verify</div>
            <div style={{fontSize:".62rem",color:ink}}>Inputs snapshot</div><div style={{fontSize:".6rem",color:"#1E5B8A"}}>{CM_DR.reproducibility.input_snapshot_hash}</div>
            <div style={{fontSize:".62rem",color:ink,marginTop:4}}>Record hash</div><div style={{fontSize:".6rem",color:"#1E5B8A"}}>{CM_DR.integrity.record_hash}</div>
            <div style={{fontSize:".6rem",color:dim,marginTop:5}}>Re-run the engine on the snapshot to reproduce every number.</div>
          </div>
        </div>
        <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap",marginTop:14}}>
          <ProvLegend prov={CM_DRP} />
        </div>
        <div style={{fontSize:".58rem",color:"#8a93a0",marginTop:10,fontStyle:"italic"}}>Sample record from simulated demo data. iStructural Group Inc. · Capacity Mesh · Trust Ledger (Phase 1).</div>
      </div>
    </article>);
}

// ===== ARGO · Bid-Decision War Room — teaser (real opportunity, redacted; no download) =====
const ARGO_WIN={cap:0.80,den:0.55,pos:0.70};
const ARGO_DELIV=[["DBB","High","#0A7C6E",true],["CMAR","Med","#C6973F",false],["Design-Build","Low","#C0553A",false]];
const ARGO_COMM=[["Hybrid stage + hourly","Best","#1B6B35",true],["Retainer","Med","#C6973F",false],["Lump sum","Poor","#C0553A",false]];
const ARGO_RISK=[["Schedule / SLA",4,4,true],["Commercial / fee",3,4,false],["Scope & brief",2,3,false],["Technical / design",2,3,false],["Contractual",2,3,false],["Client / owner",2,2,false],["Authority / external",2,3,false],["Resourcing",2,3,false]];
const ARGO_FEE=[["Lane A · bottom-up","governing","feeA","calc"],["Lane B · % of construction value","governing","feeB","ref"],["Lane C · precedent","reference only, expired","feeC","assume"]];
const ARGO_EXPL={
  verdict:{p:"calc",t:"Verdict: CONDITIONAL GO",b:"ARGO Calc: 8-phase tally plus risk math. Bid only if review cycles are capped per stage and priced on review man-hours; treat extra cycles as additional services."},
  win:{p:"calc",t:"Win probability = 31% (estimate)",b:"ARGO Calc: win = capability(0.80) x density(0.55) x posture(0.70) = 0.31. A reasoned estimate, never a guarantee (rule 3)."},
  cap:{p:"calc",t:"Capability = 0.80",b:"ARGO Calc: fit of the firm's stated experience to this review-only DRC scope."},
  sla:{p:"calc",t:"Controlling risk: Schedule / SLA",b:"ARGO Calc P x I x D: a 10-day SLA against an uncapped submission count is the top risk; it drives the conditional verdict."},
  feeA:{p:"calc",t:"Lane A, bottom-up (governing)",b:"ARGO Calc: hours x deliverables x loaded review rate. Figure redacted in this public demo."},
  feeB:{p:"ref",t:"Lane B, percent of construction value",b:"Reference: review-only % band from a dated market source, tiered. Figure redacted."},
  feeC:{p:"assume",t:"Lane C, precedent (reference only)",b:"Precedent is expired and not like-for-like: shown for context only, never governing (rule 27). Figure redacted."}
};
const ARGO_PROV={ref:{k:"REFERENCE",c:"#0A7C6E"},calc:{k:"ARGO CALC",c:"#1E5B8A",name:"ARGO Calc"},assume:{k:"ASSUMPTION",c:"#C6973F"},user:{k:"BY USER",c:"#C9A227"}};
function ARGOTeaser(){
  const [rib,setRib]=useState(null);
  const ink="#2A3642",dim="#5A6B7A",brd="1px solid rgba(20,40,64,.1)";
  const panel={background:"#fff",border:brd,borderRadius:12,padding:14};
  const h3s={fontFamily:"'Fraunces',serif",fontWeight:800,fontSize:".98rem",color:ink,margin:0,display:"flex",alignItems:"center"};
  const chip=(pk)=>{const x=ARGO_PROV[pk];return <span style={{display:"inline-flex",alignItems:"center",fontSize:".5rem",fontWeight:800,letterSpacing:".05em",textTransform:"uppercase",padding:"2px 6px",borderRadius:4,color:"#fff",background:x.c,whiteSpace:"nowrap"}}>{x.k}</span>;};
  const Iaff=({id})=>{const e=ARGO_EXPL[id];if(!e)return null;const c=ARGO_PROV[e.p].c;return <button type="button" onClick={()=>setRib(e)} aria-label={"Explain: "+e.t} style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:15,height:15,borderRadius:"50%",border:"1.3px solid "+c,color:c,background:"none",fontSize:".55rem",fontWeight:800,cursor:"pointer",marginLeft:5,verticalAlign:"middle",lineHeight:1,flexShrink:0}}>i</button>;};
  const Shade=({w=74})=> <span title="Confidential, redacted in this demo" style={{display:"inline-block",minWidth:w,height:12,borderRadius:3,background:"repeating-linear-gradient(45deg,#c3ccd6,#c3ccd6 4px,#e6ebf0 4px,#e6ebf0 8px)",filter:"blur(.6px)",verticalAlign:"middle"}}/>;
  const win=Math.round(ARGO_WIN.cap*ARGO_WIN.den*ARGO_WIN.pos*100);
  return(
    <article className="card glass" style={{marginTop:14,borderTop:"4px solid #1E5B8A"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10,flexWrap:"wrap"}}>
        <div>
          <div style={{fontSize:".66rem",fontWeight:700,letterSpacing:".16em",textTransform:"uppercase",color:"#1E5B8A"}}>ARGO · Bid-Decision War Room · live MVP teaser</div>
          <div style={{fontFamily:"'Fraunces',serif",fontWeight:800,fontSize:"1.22rem",color:ink,marginTop:6,lineHeight:1.25}}>One RFP in, a GO / CONDITIONAL GO / NO-GO out</div>
          <div style={{fontSize:".7rem",color:dim,marginTop:3}}>Example: a real review-only (DRC) opportunity, KSA. Owner, location and all fees are redacted.</div>
        </div>
        <span style={{fontSize:".58rem",fontWeight:800,letterSpacing:".07em",textTransform:"uppercase",color:"#8B2020",border:"1px solid #8B202066",borderRadius:6,padding:"4px 8px"}}>Redacted demo · confidential bid</span>
      </div>

      <ExplainerRibbon rib={rib} prov={ARGO_PROV} />

      <div style={{background:"#0C1B2E",borderRadius:12,padding:"12px 14px",display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
        <div style={{fontFamily:"'Fraunces',serif",fontWeight:800,fontSize:"1.35rem",color:"#e0b65f",display:"flex",alignItems:"center"}}>CONDITIONAL GO<Iaff id="verdict"/></div>
        <div style={{flex:1,minWidth:220,fontSize:".72rem",color:"#c3cdd8",lineHeight:1.5}}>Deciding factor: bid only with assumptions that cap review cycles per stage and price on review man-hours. Controlling risk: 10-day SLA vs uncapped submissions. Runway: 4 days.</div>
      </div>

      <div className="cmx-grid2" style={{marginTop:12}}>
        <div style={panel}>
          <h4 style={h3s}>Win probability<Iaff id="win"/></h4>
          <div style={{fontSize:".7rem",color:"#8a93a0",margin:"3px 0 10px"}}>A reasoned estimate, never a guarantee.</div>
          <div style={{display:"flex",alignItems:"center",gap:14,flexWrap:"wrap"}}>
            <CmdDonut v={win} color="#1E5B8A" size={66} label="win probability"/>
            <div style={{flex:1,minWidth:150,fontSize:".72rem"}}>
              {[["Capability",ARGO_WIN.cap,"cap"],["Competitive density",ARGO_WIN.den,null],["Owner posture",ARGO_WIN.pos,null]].map(([n,v,id])=>(
                <div key={n} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"3px 0",color:dim}}>
                  <span style={{display:"flex",alignItems:"center"}}>{n}{chip("calc")}</span><b style={{color:ink}}>{v.toFixed(2)}</b>
                </div>))}
              <div style={{fontSize:".62rem",color:"#8a93a0",marginTop:4}}>win = 0.80 x 0.55 x 0.70 = {(win/100).toFixed(2)}</div>
            </div>
          </div>
        </div>
        <div style={panel}>
          <h4 style={h3s}>Delivery + commercial model ranking</h4>
          <div style={{fontSize:".7rem",color:"#8a93a0",margin:"3px 0 8px"}}>Ranked to this role and scope. ★ = best fit.</div>
          <div style={{fontSize:".58rem",fontWeight:800,letterSpacing:".08em",textTransform:"uppercase",color:dim,marginBottom:3}}>Delivery</div>
          {ARGO_DELIV.map(([n,r,c,best])=>(
            <div key={n} style={{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:".72rem",padding:"3px 0"}}><span style={{color:ink}}>{best?"★ ":""}{n}</span><b style={{color:c}}>{r}</b></div>))}
          <div style={{fontSize:".58rem",fontWeight:800,letterSpacing:".08em",textTransform:"uppercase",color:dim,margin:"8px 0 3px"}}>Commercial</div>
          {ARGO_COMM.map(([n,r,c,best])=>(
            <div key={n} style={{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:".72rem",padding:"3px 0"}}><span style={{color:ink}}>{best?"★ ":""}{n}</span><b style={{color:c}}>{r}</b></div>))}
        </div>
      </div>

      <div className="cmx-grid2" style={{marginTop:12}}>
        <div style={panel}>
          <h4 style={h3s}>Risk register · P x I x D<Iaff id="sla"/></h4>
          <div style={{fontSize:".7rem",color:"#8a93a0",margin:"3px 0 8px"}}>8 categories. Bar = P x I. The controlling risk sets the verdict.</div>
          {ARGO_RISK.map(([n,P,I,ctrl])=>{const v=P*I;return(
            <div key={n} style={{display:"grid",gridTemplateColumns:"minmax(96px,1.3fr) 1fr 34px",gap:8,alignItems:"center",marginBottom:4}}>
              <span style={{fontSize:".66rem",color:ctrl?"#8B2020":dim,fontWeight:ctrl?800:400}}>{n}{ctrl?" ●":""}</span>
              <span style={{height:8,borderRadius:4,background:"rgba(20,40,64,.08)"}}><span style={{display:"block",height:"100%",width:(v/25*100)+"%",borderRadius:4,background:ctrl?"#C0553A":"#1E5B8A"}}/></span>
              <b style={{fontSize:".64rem",color:ink,textAlign:"right"}}>{v}</b>
            </div>);})}
        </div>
        <div style={panel}>
          <h4 style={h3s}>Fee · three-lane triangulation</h4>
          <div style={{fontSize:".7rem",color:"#8a93a0",margin:"3px 0 8px"}}>Three cited lanes reconcile; divergence is flagged. Figures redacted (confidential bid).</div>
          {ARGO_FEE.map(([n,note,id,pk])=>(
            <div key={n} style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",background:"#F7F5F0",border:brd,borderRadius:9,padding:"7px 9px",marginBottom:6}}>
              <div style={{flex:"1 1 150px",minWidth:0}}><div style={{fontSize:".7rem",fontWeight:700,color:ink,display:"flex",alignItems:"center"}}>{n}<Iaff id={id}/></div><div style={{fontSize:".58rem",color:dim}}>{note}</div></div>
              <Shade w={80}/>{chip(pk)}
            </div>))}
          <div style={{fontSize:".6rem",color:"#8a93a0",marginTop:2}}>Governing fee is hours-based, independent of construction value. Nothing here is downloadable.</div>
        </div>
      </div>

      <div style={{marginTop:12}}><ProvLegend prov={ARGO_PROV} /></div>
      <div style={{fontSize:".62rem",color:"#8a93a0",marginTop:12,fontStyle:"italic"}}>ARGO is decision support for construction bids. It does not guarantee any award, does not set binding prices, and gives no legal advice. Win probability is a reasoned estimate. Redacted demo from one real opportunity; your documents stay private to you. Deterministic core computes all numbers; the AI layer is advisory only.</div>
    </article>);
}

// ===== ARGO · Owner MVP mini-cockpit (deterministic core, client-side; rules 22/24) =====
const AOP_SVC=[
  ["Design (Full Services)",12,20,"RIBA 2026 / Cambridge 2018 · Tier 2","ref"],
  ["Design Review (Full Services)",0.30,0.60,"ARGO-derived · Tier 3","assume"],
  ["Design (Structural)",1.0,2.5,"ASCE / ACEC / Zweig 2026 · Tier 2","ref"],
  ["Design Review (Structural)",0.20,0.45,"ARGO-derived · Tier 3","assume"]];
const AOP_JUR={
  KSA:{cur:"SAR",tax:"VAT 15% (ZATCA)",codes:"SBC + Mostadam + Civil Defense · SCE",ver:true},
  Canada:{cur:"CAD",tax:"GST 5% (CRA)",codes:"NBC 2020 + CSA A23.3 / S16 / O86",ver:true}};
const AOP_PROVS={
  Ontario:{tax:"HST 13%",reg:"PEO (P.Eng + C of A) · OBC 2024 · Construction Act",ver:true},
  Alberta:{tax:"GST 5% + prov. (verify)",reg:"APEGA · ABC (verify)",ver:false},
  "British Columbia":{tax:"GST + PST (verify)",reg:"EGBC · BCBC (verify)",ver:false},
  Quebec:{tax:"GST + QST (verify)",reg:"OIQ · RBQ (verify)",ver:false}};
const AOP_RISK0=[["Schedule / SLA",4,4,3],["Commercial / fee",3,4,3],["Scope & brief",2,3,3],["Technical / design",2,3,2],["Contractual",2,3,3],["Client / owner",2,2,2],["Authority / external",2,3,3],["Resourcing",2,3,2]];
const AOP_BAND=(r)=> r>=45?["HIGH","#C0553A"]:r>=20?["MED","#C6973F"]:["LOW","#1B6B35"];

function ARGOOwnerPanel(){
  const [rib,setRib]=useState(null);
  const [opp,setOpp]=useState("Untitled opportunity");
  const [svc,setSvc]=useState(2);
  const [country,setCountry]=useState("KSA");
  const [prov,setProv]=useState("Ontario");
  const [win,setWin]=useState({cap:0.80,den:0.55,pos:0.70});
  const [risk,setRisk]=useState(AOP_RISK0.map(r=>[r[1],r[2],r[3]]));
  const [hours,setHours]=useState(2400);
  const [rate,setRate]=useState(140);
  const [cv,setCv]=useState(20000000);
  const [laneC,setLaneC]=useState(320000);
  const [touched,setTouched]=useState({});
  const mark=(id)=>setTouched((t)=>({...t,[id]:true}));
  const pkOf=(id,dflt)=>touched[id]?"user":dflt;

  const jur=AOP_JUR[country];
  const pv=country==="Canada"?AOP_PROVS[prov]:null;
  const [sn,lo,hi,src,bpk]=AOP_SVC[svc];
  const mid=(lo+hi)/2;
  const laneA=hours*rate;
  const laneB=Math.round(cv*mid/100);
  const lanes=[laneA,laneB,laneC];
  const mn=Math.min(...lanes),mx=Math.max(...lanes);
  const spread=mn>0?Math.round(((mx-mn)/mn)*100):0;
  const Rs=risk.map(([p,i,d])=>p*i*d);
  const sig=Rs.reduce((a,b)=>a+b,0);
  const maxR=Math.max(...Rs),maxRi=Rs.indexOf(maxR);
  const wp=win.cap*win.den*win.pos;
  let verdict="GO",vc="#4fc47f",factor="All gates clear: win >= 15%, Sigma R < 400, every R < 45, lane spread <= 30%.";
  if(wp<0.15||sig>=400){verdict="NO-GO";vc="#ff8a70";factor=wp<0.15?("Win probability "+Math.round(wp*100)+"% is below the 15% floor."):("Sigma R = "+sig+" is at or above 400.");}
  else if(maxR>=45||spread>30){verdict="CONDITIONAL GO";vc="#e0b65f";factor=maxR>=45?("Controlling risk: "+AOP_RISK0[maxRi][0]+", R = "+maxR+" >= 45."):("Fee lane spread "+spread+"% exceeds 30% of the smallest lane.");}

  const ink="#2A3642",dim="#5A6B7A",brd="1px solid rgba(20,40,64,.1)";
  const panel={background:"#fff",border:brd,borderRadius:12,padding:14};
  const h3s={fontFamily:"'Fraunces',serif",fontWeight:800,fontSize:".98rem",color:ink,margin:0,display:"flex",alignItems:"center",flexWrap:"wrap",gap:4};
  const nin={width:96,padding:"4px 6px",borderRadius:6,border:"1px solid rgba(20,40,64,.25)",fontSize:".74rem",fontFamily:"inherit",color:ink,background:"#fff"};
  const sel={padding:"6px 8px",borderRadius:8,border:"1px solid rgba(20,40,64,.25)",fontSize:".78rem",fontFamily:"inherit",color:ink,background:"#fff",cursor:"pointer"};
  const chip=(pk)=>{const x=ARGO_PROV[pk];return <span style={{display:"inline-flex",alignItems:"center",fontSize:".5rem",fontWeight:800,letterSpacing:".05em",textTransform:"uppercase",padding:"2px 6px",borderRadius:4,color:"#fff",background:x.c,whiteSpace:"nowrap"}}>{x.k}</span>;};
  const Iaff=({p,t,b})=>{const c=ARGO_PROV[p].c;return <button type="button" onClick={()=>setRib({p,t,b})} aria-label={"Explain: "+t} style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:15,height:15,borderRadius:"50%",border:"1.3px solid "+c,color:c,background:"none",fontSize:".55rem",fontWeight:800,cursor:"pointer",marginLeft:5,verticalAlign:"middle",lineHeight:1,flexShrink:0}}>i</button>;};
  const fmt=(n)=>jur.cur+" "+Math.round(n).toLocaleString("en-US");
  const jurPk=(pv?pv.ver:jur.ver)?"ref":"assume";
  const rules=[
    ["Win probability >= 15%",wp>=0.15,Math.round(wp*100)+"%"],
    ["Sigma R < 400",sig<400,String(sig)],
    ["Every category R < 45",maxR<45,"max R = "+maxR],
    ["Lane spread <= 30%",spread<=30,spread+"%"]];

  return(
    <article className="card glass" style={{marginTop:14,borderTop:"4px solid #1E5B8A"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10,flexWrap:"wrap"}}>
        <div style={{flex:"1 1 300px",minWidth:0}}>
          <div style={{fontSize:".66rem",fontWeight:700,letterSpacing:".16em",textTransform:"uppercase",color:"#1E5B8A"}}>ARGO · owner MVP cockpit · deterministic core, client-side</div>
          <input value={opp} onChange={(e)=>setOpp(e.target.value)} aria-label="Opportunity name" style={{fontFamily:"'Fraunces',serif",fontWeight:800,fontSize:"1.15rem",color:ink,marginTop:6,border:"none",borderBottom:"1.5px dashed rgba(30,91,138,.4)",background:"none",width:"100%",maxWidth:420,padding:"2px 0"}}/>
        </div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
          <select value={svc} onChange={(e)=>{setSvc(+e.target.value);mark("svc");}} style={sel} aria-label="Service">
            {AOP_SVC.map((s,i)=>(<option key={s[0]} value={i}>{s[0]}</option>))}
          </select>
          <select value={country} onChange={(e)=>{setCountry(e.target.value);mark("jur");}} style={sel} aria-label="Project country">
            {Object.keys(AOP_JUR).map((c)=>(<option key={c} value={c}>{c}</option>))}
          </select>
          {country==="Canada" && (
            <select value={prov} onChange={(e)=>{setProv(e.target.value);mark("jur");}} style={sel} aria-label="Project province">
              {Object.keys(AOP_PROVS).map((p)=>(<option key={p} value={p}>{p}</option>))}
            </select>)}
        </div>
      </div>
      <div style={{fontSize:".68rem",color:dim,marginTop:8,display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
        <span><b style={{color:ink}}>{country}{pv?" · "+prov:""}</b> · {pv?pv.tax:jur.tax} · {jur.cur} · {pv?pv.reg:jur.codes}</span>
        {chip(jurPk)}
        <Iaff p={jurPk} t={"Jurisdiction pack: "+country+(pv?" / "+prov:"")} b={(pv&&!pv.ver)?"ASSUMPTION placeholder pack (amber): tax and regulator lines must be web-verified before pricing (rule 3). Ontario is the only verified province pack.":"Verified pack: tax base, currency, codes and regulator carry dated sources in the master workbook. Switching country or province repopulates every dependent line."}/>
      </div>

      <ExplainerRibbon rib={rib} prov={ARGO_PROV} />

      <div style={{background:"#0C1B2E",borderRadius:12,padding:"12px 14px",display:"flex",alignItems:"center",gap:14,flexWrap:"wrap"}}>
        <div style={{fontFamily:"'Fraunces',serif",fontWeight:800,fontSize:"1.35rem",color:vc,display:"flex",alignItems:"center"}}>{verdict}
          <Iaff p="calc" t={"Verdict: "+verdict+" (Verdict Rule v1)"} b={"ARGO Calc: NO-GO if win < 0.15 or Sigma R >= 400; else CONDITIONAL GO if any R >= 45 or lane spread > 30%; else GO. Deciding factor: "+factor}/>
        </div>
        <div style={{flex:1,minWidth:220,fontSize:".72rem",color:"#c3cdd8",lineHeight:1.5}}>{factor}</div>
        <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
          {[["Win",Math.round(wp*100)+"%"],["Sigma R",sig],["Max R",maxR],["Spread",spread+"%"]].map(([l,v])=>(
            <div key={l} style={{textAlign:"center"}}><div style={{fontFamily:"'Fraunces',serif",fontWeight:800,fontSize:"1.05rem",color:"#fff"}}>{v}</div><div style={{fontSize:".56rem",color:"#8ba0b5",textTransform:"uppercase",letterSpacing:".08em"}}>{l}</div></div>))}
        </div>
      </div>

      <div className="cmx-grid2" style={{marginTop:12}}>
        <div style={panel}>
          <h4 style={h3s}>Win probability{chip("calc")}
            <Iaff p="calc" t={"Win probability = "+Math.round(wp*100)+"% (estimate)"} b={"ARGO Calc: win = capability("+win.cap.toFixed(2)+") x density("+win.den.toFixed(2)+") x posture("+win.pos.toFixed(2)+") = "+wp.toFixed(2)+". A reasoned estimate, never a guarantee (rule 3). Each factor is an editable assumption."}/>
          </h4>
          <div style={{fontSize:".7rem",color:"#8a93a0",margin:"3px 0 10px"}}>A reasoned estimate, never a guarantee. Slide to test.</div>
          <div style={{display:"flex",alignItems:"center",gap:14,flexWrap:"wrap"}}>
            <CmdDonut v={Math.round(wp*100)} color="#1E5B8A" size={66} label="win probability"/>
            <div style={{flex:1,minWidth:170,fontSize:".72rem"}}>
              {[["Capability fit","cap"],["Competitive density","den"],["Owner posture","pos"]].map(([n,k])=>(
                <div key={k} style={{display:"grid",gridTemplateColumns:"minmax(90px,1fr) 1fr 34px",gap:8,alignItems:"center",padding:"3px 0",color:dim}}>
                  <span style={{display:"flex",alignItems:"center",gap:4}}>{n}{chip(pkOf("w"+k,"assume"))}</span>
                  <input type="range" min="0" max="1" step="0.05" value={win[k]} aria-label={n} onChange={(e)=>{const v=+e.target.value;setWin((w)=>({...w,[k]:v}));mark("w"+k);}} style={{width:"100%",accentColor:"#1E5B8A"}}/>
                  <b style={{color:ink,textAlign:"right"}}>{win[k].toFixed(2)}</b>
                </div>))}
              <div style={{fontSize:".62rem",color:"#8a93a0",marginTop:4}}>win = {win.cap.toFixed(2)} x {win.den.toFixed(2)} x {win.pos.toFixed(2)} = {wp.toFixed(2)}</div>
            </div>
          </div>
        </div>
        <div style={panel}>
          <h4 style={h3s}>Fee · three-lane triangulation
            <Iaff p="calc" t="Three-lane fee triangulation" b={"Lane A bottom-up = hours x loaded rate (ARGO Calc from your inputs). Lane B top-down = CV x band midpoint "+mid.toFixed(2)+"% for "+sn+" ("+src+"). Lane C = precedent, dated (rule 27 expiry applies). Divergence over 30% of the smallest lane is flagged, never hidden; you pick the governing lane."}/>
          </h4>
          <div style={{fontSize:".7rem",color:"#8a93a0",margin:"3px 0 8px"}}>Service band: <b style={{color:ink}}>{sn}</b> · {lo}%–{hi}% of CV {chip(bpk)}</div>
          <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",background:"#F7F5F0",border:brd,borderRadius:9,padding:"7px 9px",marginBottom:6}}>
            <div style={{flex:"1 1 140px"}}><div style={{fontSize:".7rem",fontWeight:700,color:ink}}>Lane A · bottom-up</div>
              <div style={{fontSize:".62rem",color:dim,display:"flex",gap:6,alignItems:"center",flexWrap:"wrap",marginTop:3}}>
                <input type="number" min="0" value={hours} aria-label="Hours" onChange={(e)=>{setHours(Math.max(0,+e.target.value||0));mark("hours");}} style={nin}/> h x
                <input type="number" min="0" value={rate} aria-label="Loaded rate" onChange={(e)=>{setRate(Math.max(0,+e.target.value||0));mark("rate");}} style={nin}/> /h {chip(pkOf("hours","assume"))}
              </div></div>
            <b style={{fontSize:".76rem",color:ink}}>{fmt(laneA)}</b>{chip("calc")}
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",background:"#F7F5F0",border:brd,borderRadius:9,padding:"7px 9px",marginBottom:6}}>
            <div style={{flex:"1 1 140px"}}><div style={{fontSize:".7rem",fontWeight:700,color:ink}}>Lane B · % of construction value</div>
              <div style={{fontSize:".62rem",color:dim,display:"flex",gap:6,alignItems:"center",flexWrap:"wrap",marginTop:3}}>CV
                <input type="number" min="0" value={cv} aria-label="Construction value" onChange={(e)=>{setCv(Math.max(0,+e.target.value||0));mark("cv");}} style={{...nin,width:130}}/> x {mid.toFixed(2)}% {chip(bpk)}
              </div></div>
            <b style={{fontSize:".76rem",color:ink}}>{fmt(laneB)}</b>{chip("calc")}
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",background:"#F7F5F0",border:brd,borderRadius:9,padding:"7px 9px",marginBottom:6}}>
            <div style={{flex:"1 1 140px"}}><div style={{fontSize:".7rem",fontWeight:700,color:ink}}>Lane C · precedent</div>
              <div style={{fontSize:".62rem",color:dim,display:"flex",gap:6,alignItems:"center",flexWrap:"wrap",marginTop:3}}>
                <input type="number" min="0" value={laneC} aria-label="Precedent fee" onChange={(e)=>{setLaneC(Math.max(0,+e.target.value||0));mark("laneC");}} style={{...nin,width:130}}/> {chip(pkOf("laneC","assume"))}
              </div></div>
            <b style={{fontSize:".76rem",color:ink}}>{fmt(laneC)}</b>
          </div>
          <div style={{fontSize:".64rem",fontWeight:700,color:spread>30?"#C0553A":"#1B6B35"}}>Lane spread = {spread}% {spread>30?"· FLAGGED, exceeds 30% (feeds the verdict)":"· within 30%, reconciled"}</div>
          <div style={{fontSize:".6rem",color:"#8a93a0",marginTop:2}}>The governing fee is hours-based; it does not depend on the construction value. Rate library lives in the master workbook, not in this browser MVP.</div>
        </div>
      </div>

      <div className="cmx-grid2" style={{marginTop:12}}>
        <div style={panel}>
          <h4 style={h3s}>Risk register · R = P x I x D
            <Iaff p="assume" t="FMEA / RPN risk math, 1-5 scale" b="R = Probability x Impact x Detectability, each 1-5, R max 125. Bands: LOW < 20, MED 20-44, HIGH >= 45 (ARGO's chosen granularity, ASSUMPTION, locked to the sealed gold set). Reference: IEC 60812:2018, AIAG-VDA 2019. Every P/I/D is an editable assumption at its reference default; editing flips it BY USER and recomputes R, band, Sigma R and the verdict."/>
          </h4>
          <div style={{display:"grid",gridTemplateColumns:"minmax(88px,1.5fr) 38px 38px 38px 36px 46px",gap:6,alignItems:"center",fontSize:".58rem",fontWeight:800,letterSpacing:".06em",textTransform:"uppercase",color:dim,margin:"8px 0 4px"}}>
            <span>Category</span><span>P</span><span>I</span><span>D</span><span style={{textAlign:"right"}}>R</span><span/>
          </div>
          {AOP_RISK0.map(([n],ri)=>{const r=Rs[ri];const[bl,bc]=AOP_BAND(r);const ctrl=ri===maxRi&&maxR>=45;return(
            <div key={n} style={{display:"grid",gridTemplateColumns:"minmax(88px,1.5fr) 38px 38px 38px 36px 46px",gap:6,alignItems:"center",marginBottom:4}}>
              <span style={{fontSize:".66rem",color:ctrl?"#8B2020":dim,fontWeight:ctrl?800:400,display:"flex",alignItems:"center",gap:3}}>{n}{ctrl?" ●":""}{touched["r"+ri]?chip("user"):null}</span>
              {[0,1,2].map((ci)=>(
                <select key={ci} value={risk[ri][ci]} aria-label={n+" "+["P","I","D"][ci]} onChange={(e)=>{const v=+e.target.value;setRisk((rs)=>rs.map((row,i)=>i===ri?row.map((x,j)=>j===ci?v:x):row));mark("r"+ri);}} style={{...sel,padding:"3px 4px",fontSize:".7rem"}}>
                  {[1,2,3,4,5].map((v)=>(<option key={v} value={v}>{v}</option>))}
                </select>))}
              <b style={{fontSize:".68rem",color:ink,textAlign:"right"}}>{r}</b>
              <span style={{fontSize:".52rem",fontWeight:800,color:"#fff",background:bc,borderRadius:4,padding:"2px 4px",textAlign:"center"}}>{bl}</span>
            </div>);})}
          <div style={{display:"flex",justifyContent:"space-between",borderTop:brd,paddingTop:6,marginTop:6,fontSize:".72rem",color:ink}}>
            <b>Sigma R (8 categories)</b><b style={{display:"flex",alignItems:"center"}}>{sig}{chip("calc")}</b>
          </div>
        </div>
        <div style={panel}>
          <h4 style={h3s}>Verdict Rule v1 · trace{chip("calc")}
            <Iaff p="calc" t="Verdict Rule v1 (deterministic, auditable)" b="NO-GO if win < 0.15 or Sigma R >= 400; otherwise CONDITIONAL GO if any category R >= 45 or the lane spread exceeds 30% of the smallest lane; otherwise GO. Applied to computed outputs only; any revision is versioned and re-runs the gold set before adoption."/>
          </h4>
          <div style={{fontSize:".7rem",color:"#8a93a0",margin:"3px 0 8px"}}>Every gate, its threshold, and its current reading.</div>
          {rules.map(([n,ok,v])=>(
            <div key={n} style={{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:".72rem",padding:"5px 0",borderBottom:"1px solid rgba(20,40,64,.06)"}}>
              <span style={{color:dim}}>{n}</span>
              <span style={{display:"flex",gap:8,alignItems:"center"}}><b style={{color:ink}}>{v}</b>
                <span style={{fontSize:".54rem",fontWeight:800,color:"#fff",background:ok?"#1B6B35":"#C0553A",borderRadius:4,padding:"2px 6px"}}>{ok?"PASS":"FIRES"}</span></span>
            </div>))}
          <div style={{fontSize:".66rem",color:dim,marginTop:10,lineHeight:1.5}}><b style={{color:ink}}>Deciding factor.</b> {factor}</div>
          <div style={{fontSize:".6rem",color:"#8a93a0",marginTop:8}}>This MVP recomputes on every edit. The full engine (workbook spine, gates C1 G1 B1 S0, rate library, legal and timeline tabs) runs in the ARGO war room; this cockpit mirrors its deterministic rules.</div>
        </div>
      </div>

      <div style={{marginTop:12}}><ProvLegend prov={ARGO_PROV} /></div>
      <div style={{fontSize:".62rem",color:"#8a93a0",marginTop:12,fontStyle:"italic"}}>ARGO is decision support for construction bids. It does not guarantee any award, does not set binding prices, and gives no legal or contractual advice. Win probability is a reasoned estimate. Owner MVP: inputs stay in this browser session only; nothing is uploaded. Deterministic core computes all numbers; the AI layer is advisory only.</div>
    </article>);
}

// ===== Owner access gate (shared Google sign-in, rendered INSIDE each app card) =====
function OwnerInline({owner,ownerEmail,signIn,signOut,authErr,app,accent}){
  return(
    <div style={{marginTop:14,border:"1px solid "+accent+"44",background:"rgba(20,40,64,.045)",borderRadius:12,padding:"12px 14px",display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
      <div style={{flex:"1 1 240px",minWidth:0}}>
        <div style={{fontSize:".6rem",fontWeight:800,letterSpacing:".14em",textTransform:"uppercase",color:accent}}>Owner access{owner?" · unlocked":""}</div>
        {owner ? (
          <div style={{fontSize:".78rem",color:"#5A6B7A",marginTop:3}}>Signed in as <b style={{color:"#2A3642"}}>{ownerEmail}</b>. The {app} owner tool is open directly below this card.</div>
        ) : (
          <div style={{fontSize:".78rem",color:"#5A6B7A",marginTop:3,lineHeight:1.5}}>Owner only: <b style={{color:"#2A3642"}}>info@istructgroup.com</b>. One sign-in unlocks ARGO and Capacity Mesh. No password is shared with this site.</div>
        )}
        {authErr && <div style={{fontSize:".74rem",color:"#C0553A",marginTop:4}}>{authErr}</div>}
      </div>
      {owner ? (
        <button className="lk" onClick={signOut} style={{flexShrink:0}}>Sign out</button>
      ) : (
        <button onClick={signIn} style={{display:"inline-flex",alignItems:"center",gap:8,padding:"9px 14px",borderRadius:9,background:"#fff",color:"#2A3642",border:"1px solid rgba(20,40,64,.18)",fontWeight:700,fontSize:".84rem",cursor:"pointer",fontFamily:"inherit",flexShrink:0}}><svg width="15" height="15" viewBox="0 0 18 18"><path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.17-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.71v2.26h2.91c1.7-1.57 2.69-3.88 2.69-6.6z"/><path fill="#34A853" d="M9 18c2.43 0 4.47-.81 5.96-2.18l-2.91-2.26c-.81.54-1.84.86-3.05.86-2.34 0-4.32-1.58-5.02-3.7H.96v2.32A9 9 0 0 0 9 18z"/><path fill="#FBBC05" d="M3.98 10.71A5.41 5.41 0 0 1 3.7 9c0-.59.1-1.17.28-1.71V4.96H.96A8.97 8.97 0 0 0 0 9c0 1.45.35 2.82.96 4.04l3.02-2.33z"/><path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58A8.96 8.96 0 0 0 9 0 9 9 0 0 0 .96 4.96L3.98 7.3C4.68 5.16 6.66 3.58 9 3.58z"/></svg> Sign in with Google</button>
      )}
    </div>);
}

export default function App() {
  const [page, setPage] = useState("home");
  const [opacity] = useState(0.12);
  const [drawer, setDrawer] = useState(false);
  const [svcOpen, setSvcOpen] = useState(false);

  useEffect(() => {
    document.title = "iStructural Group Inc. · Structural Solutions · Management · AI";
    var metas = [["name","description","Advanced structural engineering, management and AI services. Free Knowledge Hub and free NPPE Study Tutor for Canadian P.Eng candidates. Capacity Mesh workforce capability intelligence."],["name","theme-color","#0C1B2E"],["property","og:title","iStructural Group Inc."],["property","og:description","Structural Solutions · Management · AI. Free Knowledge Hub · Free NPPE Study Tutor (Canada) · Capacity Mesh."],["property","og:type","website"]];
    metas.forEach(function(m){var el=document.querySelector("meta["+m[0]+"='"+m[1]+"']");if(!el){el=document.createElement("meta");el.setAttribute(m[0],m[1]);document.head.appendChild(el);}el.setAttribute("content",m[2]);});
    if(!document.querySelector("link[rel='icon']")){var l=document.createElement("link");l.rel="icon";l.href="data:image/svg+xml,"+encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='7' fill='#0C1B2E'/><path d='M10 24h12M16 8v16M12 24l4-9 4 9' stroke='#0EBEA8' stroke-width='2' fill='none' stroke-linecap='round'/></svg>");document.head.appendChild(l);}
  }, []);

  const [hubOpen, setHubOpen] = useState(null);
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
  const [npStatus, setNpStatus] = useState("idle"); // idle | sending | success | error
  const npValid = NPPE_FIELDS.every(f => !f.req || (f.t==="preset") || (npf[f.k] && String(npf[f.k]).trim())) && npConsent;

  // ── Anti-spam puzzle (shared, dependency-free slide-to-align) + hidden honeypot on every request ──
  const [capTarget] = useState(() => 62 + Math.floor(Math.random() * 26)); // star sits at 62..87 %
  const [capVal, setCapVal] = useState(0);
  const [hp, setHp] = useState(""); // honeypot: real users never fill this
  const [capErr, setCapErr] = useState("");
  const capOk = Math.abs(capVal - capTarget) <= 5;
  const captchaBlock = () => (
    <div className="fld full" style={{marginTop:6}}>
      <label>Verify you are human: slide the handle under the star &#9733; *</label>
      <div style={{position:"relative",height:26,marginTop:4}}>
        <div aria-hidden="true" style={{position:"absolute",top:0,left:`calc(${capTarget}% - 6px)`,fontSize:"1rem",lineHeight:1,color:capOk?"#1B6B35":"#0A7C6E"}}>&#9733;</div>
        <input type="range" min="0" max="100" value={capVal} onChange={e=>{setCapVal(+e.target.value); if(capErr) setCapErr("");}} aria-label="Slide the handle under the star to verify you are human" style={{position:"absolute",bottom:0,left:0,width:"100%",margin:0,accentColor:capOk?"#1B6B35":"#0EBEA8"}} />
      </div>
      <div style={{fontSize:".74rem",fontWeight:700,color:capOk?"#1B6B35":"#8a93a0",marginTop:2}}>{capOk?"\u2713 Verified":"Drag the handle until it sits under the star"}</div>
      <input type="text" tabIndex={-1} autoComplete="off" value={hp} onChange={e=>setHp(e.target.value)} aria-hidden="true" style={{position:"absolute",left:"-9999px",width:1,height:1,opacity:0}} />
      {capErr && <div style={{fontSize:".78rem",color:"#d65a5a",marginTop:6,fontWeight:600}}>{capErr}</div>}
    </div>
  );

  // ── Email delivery via FormSubmit (no account needed; the first POST triggers a one-time activation email to info@istructgroup.com that must be confirmed once) ──
  const FORM_ENDPOINT = "https://formsubmit.co/ajax/info@istructgroup.com";
  const postForm = async (payload) => {
    const res = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(payload),
    });
    return res.ok;
  };

  const submitNppe = async () => {
    if (hp) { setNpStatus("success"); return; } // honeypot tripped: silently drop bot
    if (!npValid) { setNpErr("Please complete all required fields and tick the consent box."); return; }
    if (!capOk) { setCapErr("Please complete the slide-to-verify check."); return; }
    setNpErr(""); setCapErr(""); setNpStatus("sending");
    const payload = { _subject: "NPPE Study Tutor - access request", _template: "table", _honey: hp };
    NPPE_FIELDS.forEach(f => { payload[f.l.replace(" (optional)","")] = f.t==="preset" ? (f.v||"NPPE") : (npf[f.k]||""); });
    payload["Consent"] = "Yes - " + NPPE_CONSENT;
    try {
      const ok = await postForm(payload);
      setNpStatus(ok ? "success" : "error");
      if (!ok) setNpErr("Submission failed. Please email info@istructgroup.com directly.");
    } catch (e) { setNpStatus("error"); setNpErr("Submission failed. Please email info@istructgroup.com directly."); }
  };

  // ── Service inquiry (Start a Project, tabs s1 to s4) ──
  const [svc, setSvc] = useState({});
  const [svcStatus, setSvcStatus] = useState("idle"); // idle | sending | success | error
  const submitSvc = async () => {
    const fields = START_FIELDS[tab];
    const tabName = START_TABS.find(t=>t[0]===tab)[1];
    const missing = fields.some(f => f[1]!=="ta" && !String(svc[tab+":"+f[0]]||"").trim());
    const emailVal = String(svc[tab+":Email Address"]||"");
    const needsEmail = fields.some(f => f[0]==="Email Address");
    if (hp) { setSvcStatus("success"); return; } // honeypot tripped: silently drop bot
    if (missing || (needsEmail && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(emailVal))) { setSvcStatus("error"); return; }
    if (!capOk) { setCapErr("Please complete the slide-to-verify check."); return; }
    setCapErr(""); setSvcStatus("sending");
    const payload = { _subject: "Service inquiry - " + tabName, _template: "table", _honey: hp };
    fields.forEach(f => { payload[f[0]] = svc[tab+":"+f[0]] || ""; });
    try {
      const ok = await postForm(payload);
      setSvcStatus(ok ? "success" : "error");
    } catch (e) { setSvcStatus("error"); }
  };

  const [cm, setCm] = useState({});
  const [cmStatus, setCmStatus] = useState("idle");
  useEffect(() => { document.body.style.overflow = drawer ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [drawer]);
  const submitCapMesh = async () => {
    if (hp) { setCmStatus("success"); return; } // honeypot tripped: silently drop bot
    const missing = ["Full name","Company / Organization","Email"].some(k=>!String(cm[k]||"").trim());
    const emailOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(cm["Email"]||"").trim());
    if (missing || !emailOk) { setCmStatus("error"); return; }
    if (!capOk) { setCapErr("Please complete the slide-to-verify check."); return; }
    setCapErr(""); setCmStatus("sending");
    const payload = { _subject: "Capacity Mesh access request", _template: "table", _honey: hp, ...cm };
    try { const ok = await postForm(payload); setCmStatus(ok ? "success" : "error"); }
    catch (e) { setCmStatus("error"); }
  };
  const go = (id) => { setPage(id); setDrawer(false); setSvcOpen(false); window.scrollTo({top:0}); };
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
            <span className={"dd"+(svcOpen?" open":"")}><button className={"lk"+(isSvc?" active":"")} aria-haspopup="true" aria-expanded={svcOpen} onClick={()=>setSvcOpen(o=>!o)}>Services ▾</button>
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
              <div className="eyebrow">Since 2010 · Structural Solutions · Management · AI · Free NPPE Tutor & Knowledge Hub</div>
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
                  <h3 style={{color:s.ac}}>{s.t}</h3>
                  <div className="tag">{s.tag}</div>
                  <ul>{s.items.map((it,i)=><li key={i}><b style={{color:s.ac}}>+</b>{it}</li>)}</ul>
                  <div className="more" style={{color:s.ac}}>Explore services →</div>
                </article>
              ))}
            </div>
            <div className="kick">Three damage assessment sub-markets</div>
            <div className="subs">
              <div className="sub-card"><div style={{fontSize:".84rem",fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",color:"#e08066"}}>Post-natural disaster</div></div>
              <div className="sub-card"><div style={{fontSize:".84rem",fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",color:"#cc6a6a"}}>Post-conflict and war zones</div></div>
              <div className="sub-card"><div style={{fontSize:".84rem",fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",color:"#6B3A7D"}}>Heritage and aging assets</div></div>
            </div>
            <div className="strip glass" onClick={()=>go("hub")}>
              <div><div className="lead" style={{color:"#1B6B35"}}>Knowledge Hub, free for every engineer, architect, safety officer, and developer</div>
              <div className="meta">Forms, crack library, calculators, software directory, standards, management templates</div></div>
              <button className="go" style={{background:P.greenD}}>Browse →</button>
            </div>
            <div className="strip glass" onClick={()=>go("resources")} style={{borderLeft:"4px solid #1E5B8A"}}>
              <div><div className="lead" style={{color:"#1E5B8A"}}>ARGO, bid-decision war room for construction</div>
              <div className="meta">Turn any RFP into a GO / CONDITIONAL GO / NO-GO, with risk math, delivery and commercial model ranking, three-lane fee triangulation, and a win-probability estimate. Under Resources Management.</div></div>
              <button className="go" style={{background:"#1E5B8A"}}>Open the war room →</button>
            </div>
            <div className="strip glass" onClick={()=>go("resources")}>
              <div><div className="lead" style={{color:P.tealL}}>Resources Management, a growing collection of iStructural apps</div>
              <div className="meta">Capacity Mesh, workforce capability intelligence under Resources Management. Open it.</div></div>
              <button className="go">Open the box →</button>
            </div>
            <div className="strip glass" onClick={()=>go("nppe")} style={{borderLeft:"4px solid #C6973F"}}>
              <div><div className="lead" style={{color:"#A8762A"}}>NPPE Study Tutor, free for Canadian P.Eng candidates</div>
              <div className="meta">Students and engineers: bring your own materials, get grounded answers with citations and an honest readiness verdict. Powered by the iStructural Hybrid RAG engine.</div></div>
              <button className="go" style={{background:"#C6973F"}}>Request free access →</button>
            </div>
            <div className="founded glass"><div className="v">2010</div><div className="fl">Founded</div></div>
          </div>
        )}

        {/* S1 */}
        {page==="s1" && (
          <div className="page">
            <div className="phero glass" style={{borderTop:`4px solid ${P.s1}`}}>
              <div className="eyebrow" style={{color:"#1E5B8A"}}>Service 01</div>
              <h1>Management & Business Support</h1>
              <p>Strategic project management, business growth advisory, financial risk strategies, and value engineering. Aligning with new standards and surpassing client expectations.</p>
            </div>
            <h2 className="sec">What we deliver</h2>
            {S1ROWS.map((r,i)=>(<div key={i} className="svc-row"><div style={{fontWeight:700,color:"#1E5B8A"}}>{r[0]}</div><div style={{color:"#5A6B7A",fontSize:".88rem",lineHeight:1.6}}>{r[1]}</div></div>))}
            <button className="btn" style={{background:P.s1,marginTop:16}} onClick={()=>go("start")}>Start a Management Inquiry →</button>
          </div>
        )}

        {/* S2 */}
        {page==="s2" && (
          <div className="page">
            <div className="phero glass" style={{borderTop:`4px solid ${P.s2}`}}>
              <div className="eyebrow" style={{color:"#6B3A7D"}}>Service 02</div>
              <h1>Design Services & Consultancy</h1>
              <p>Performance-based seismic design for super-tall structures exceeding 200m. Advanced nonlinear applications. CSi certified training programs.</p>
            </div>
            <h2 className="sec">Third-Party Consultancy</h2>
            <div className="grid4">
              {[["High-Rise",["Lateral stability","Shortening vertical elements","Human response"]],["Bridges",["Alternative concepts (V.E.)","Design + verification","Stage modelling"]],["Irregular",["Rotated/twisted buildings","Vibration analysis","Thermal design","Transfer structures"]]].map((c,i)=>(
                <div key={i} className="card glass"><h3 style={{fontSize:"1.05rem",color:"#6B3A7D"}}>{c[0]}</h3><ul>{c[1].map((x,j)=><li key={j}><b style={{color:P.s2}}>+</b>{x}</li>)}</ul></div>
              ))}
              <div className="card glass" style={{border:"1px solid rgba(107,58,125,.5)"}}><h3 style={{fontSize:"1.05rem",color:"#6B3A7D"}}>Structural Assessment Platform</h3><div className="tag" style={{margin:"6px 0"}}>Phase 1 · Phase 2 · Conditional AI escalation</div><div style={{fontSize:".82rem",color:"#5A6B7A",lineHeight:1.5}}>Preliminary advisory through full stamped engineering with FEA, repair drawings, authority submission.</div></div>
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
              {S3CARDS.map((c,i)=>(<div key={i} className="card glass"><h3 style={{fontSize:"1.08rem",color:"#1E5B8A"}}>{c[0]}</h3><div style={{fontSize:".86rem",color:"#5A6B7A",marginTop:6,lineHeight:1.55}}>{c[1]}</div></div>))}
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
              <div style={{marginTop:16,display:"inline-flex",alignItems:"baseline",gap:8,padding:"9px 16px",borderRadius:10,background:"rgba(127,227,160,.12)",border:"1px solid rgba(127,227,160,.35)"}}>
                <span style={{fontFamily:"'Fraunces',serif",fontWeight:800,fontSize:"1.6rem",color:"#7fe3a0"}}>{HUBDATA.reduce((a,b)=>a+b.items.reduce((x,i)=>x+i.res.length,0),0)}</span>
                <span style={{fontSize:".84rem",fontWeight:600,color:"#3a4654"}}>free, curated resources and growing</span>
              </div>
            </div>
            <div style={{marginTop:24}}>
              {HUBDATA.map((b,bi)=>(
                <div key={b.code} style={{marginBottom:18}}>
                  <div className="bh"><span className="code">{b.code}</span><div style={{flex:1}}><div className="ttl">{b.title}</div><div className="bsub">{`Section · 0${bi+1} of 03 — ${b.sub}`}</div></div></div>
                  <div className={b.items.length===4?"grid4":"grid3"}>
                    {b.items.map((t)=>(
                      <div key={t.id} className="tile glass" style={{cursor:"pointer"}} onClick={()=>setHubOpen(t.id)}><span className="badge" style={{background:t.c+"26",color:t.c}}>{t.s}</span><div className="tn" style={{color:"#23303d"}}>{t.n}</div><div className="td">{t.d}</div><div style={{marginTop:8,fontSize:".72rem",fontWeight:700,color:t.c}}>{"▸ Open "+t.res.length+" resources"}</div></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="card glass" style={{marginTop:18,padding:"14px 16px"}}>
              <div style={{fontSize:".7rem",fontWeight:700,letterSpacing:".14em",textTransform:"uppercase",color:"#5A6B7A",marginBottom:8}}>Disclaimer · Third-Party Notice</div>
              <div style={{fontSize:".76rem",color:"#5A6B7A",lineHeight:1.7}}>All third-party content linked here is the property of its owners. iStructural Group Inc. is not affiliated with or endorsed by any third party unless stated, hosts none of the linked content, and is not responsible for its availability, licensing, or terms. External links lead to official sources. For educational use. Updated June 2026.</div>
            </div>
            {hubOpen && (()=>{ const it=HUBDATA.reduce((a,b)=>a.concat(b.items),[]).find(x=>x.id===hubOpen); if(!it) return null; return (
              <div role="dialog" aria-modal="true" onClick={e=>{if(e.target===e.currentTarget)setHubOpen(null);}} style={{position:"fixed",inset:0,zIndex:1000,background:"rgba(7,16,30,.8)",backdropFilter:"blur(5px)",WebkitBackdropFilter:"blur(5px)",display:"flex",alignItems:"flex-start",justifyContent:"center",padding:"40px 16px",overflowY:"auto"}}>
                <div style={{position:"relative",width:"100%",maxWidth:820,background:"#0c1a2e",border:"1px solid rgba(127,227,160,.25)",borderRadius:14,boxShadow:"0 20px 60px rgba(0,0,0,.55)",overflow:"hidden"}}>
                  <div style={{height:4,background:"linear-gradient(90deg,#1B6B35,#0A7C6E,#6B3A7D)"}} />
                  <button onClick={()=>setHubOpen(null)} aria-label="Close" style={{position:"absolute",top:14,right:14,width:32,height:32,borderRadius:8,background:"rgba(255,255,255,.1)",border:"1px solid rgba(255,255,255,.2)",color:"#fff",fontSize:"1.3rem",fontWeight:700,cursor:"pointer",lineHeight:1,fontFamily:"inherit"}}>×</button>
                  <div style={{padding:"24px 26px 28px"}}>
                    <div style={{fontSize:".72rem",fontWeight:700,letterSpacing:".18em",textTransform:"uppercase",color:"#7fe3a0",marginBottom:6}}>{it.s}</div>
                    <div style={{fontFamily:"'Fraunces',serif",fontWeight:800,fontSize:"1.4rem",color:"#fff",marginBottom:6}}>{it.n}</div>
                    <div style={{fontSize:".86rem",color:"#AFC4D8",lineHeight:1.6,marginBottom:16,maxWidth:680}}>{it.res.length+" free resources. Links lead to the issuing authority; no login or purchase required."}</div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr",gap:8}}>
                      {it.res.map((r,ri)=>(
                        <a key={ri} href={r.url} target="_blank" rel="noopener noreferrer" style={{display:"block",padding:"10px 12px",borderRadius:8,background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.12)",textDecoration:"none"}}>
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
                            <div style={{flex:1}}>
                              <div style={{fontSize:".9rem",fontWeight:700,color:"#eaf2ff"}}>{r.title}</div>
                              <div style={{fontSize:".78rem",color:"#8FA8BE",marginTop:2}}>{r.body}{r.year?" · "+r.year:""}</div>
                              {r.d && <div style={{fontSize:".78rem",color:"#AFC4D8",marginTop:4,lineHeight:1.5}}>{r.d}</div>}
                            </div>
                            <div style={{display:"flex",flexDirection:"column",gap:4,alignItems:"flex-end"}}>
                              {r.region && <span style={{fontSize:".68rem",fontWeight:700,padding:"2px 7px",borderRadius:8,background:"rgba(127,227,160,.15)",color:"#7fe3a0",whiteSpace:"nowrap",border:"1px solid rgba(127,227,160,.3)"}}>{r.region}</span>}
                              {r.units && <span style={{fontSize:".66rem",fontWeight:700,padding:"2px 7px",borderRadius:8,background:"rgba(255,255,255,.08)",color:"#cdddef",whiteSpace:"nowrap"}}>{r.units}</span>}
                            </div>
                          </div>
                          <div style={{fontSize:".72rem",color:"#7fe3a0",fontWeight:700,marginTop:6}}>Open ↗</div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );})()}
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
              <span style={{fontSize:".8rem",color:"#5A6B7A",whiteSpace:"nowrap"}}>Selected projects</span>
            </div>
            <div className="glass" style={{padding:"6px 10px",marginBottom:24}}>
              {projShown.map((p,i)=>{const col=L[catCol[p.c]]||catCol[p.c]||"#9fb3d4";return (
                <div key={i} className="prow"><div style={{textShadow:"0 1px 3px rgba(0,0,0,.45)"}}>{p.n}</div><span className="pc" style={{background:col+"26",color:col}}>{p.c}</span><div className="pr">{p.country||p.r}</div><button className="pinq" onClick={()=>{setSvc(x=>({...x,["s2:Project Name & Location"]:p.n}));setTab("s2");go("start");}}>Send an inquiry →</button></div>
              );})}
              {projShown.length===0 && <div style={{padding:20,textAlign:"center",color:"#5A6B7A",fontStyle:"italic"}}>No projects match.</div>}
              {!pAll && projF.length>20 && <div style={{textAlign:"center",padding:10}}><button className="go" onClick={()=>setPAll(true)}>Show all →</button></div>}
            </div>
          </div>
        )}

        {/* TRAINING */}
        {page==="training" && (
          <div className="page">
            <div className="phero glass" style={{borderTop:`4px solid ${P.s2}`}}>
              <div className="eyebrow" style={{color:"#6B3A7D"}}>Certified Training</div>
              <h1>Training Programs</h1>
              <p>CSiAmerica Licensed Instructor since 2010. Over 1,400 engineers trained across MENA and North America. Advanced support for international firms.</p>
            </div>
            <div className="grid4" style={{marginTop:24}}>
              {TRAIN.map((t,i)=>(<div key={i} className="card glass" style={{cursor:"pointer"}} onClick={()=>go("start")}><h3 style={{fontSize:"1.05rem",color:"#6B3A7D"}}>{t[0]}</h3><div style={{fontSize:".84rem",color:"#5A6B7A",marginTop:6,lineHeight:1.5}}>{t[1]}</div></div>))}
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
              <p>A growing collection of iStructural tools. Deterministic cores, AI advisory layers. Open ARGO or Capacity Mesh, or request access to the NPPE Study Tutor.</p>
            </div>
            <div className="appswitch">
              <span className="asl">Jump to app</span>
              <button className="asb" style={{borderColor:"#1E5B8A",color:"#1E5B8A"}} onClick={()=>{var el=document.getElementById("app-argo"); if(el) el.scrollIntoView({behavior:"smooth",block:"start"});}}>ARGO</button>
              <button className="asb" style={{borderColor:P.tealL,color:P.teal}} onClick={()=>{var el=document.getElementById("app-mesh"); if(el) el.scrollIntoView({behavior:"smooth",block:"start"});}}>Capacity Mesh</button>
              <button className="asb" style={{borderColor:"#C6973F",color:"#A8762A"}} onClick={()=>{var el=document.getElementById("app-nppe"); if(el) el.scrollIntoView({behavior:"smooth",block:"start"});}}>NPPE Tutor</button>
            </div>
            <article id="app-argo" className="card glass" style={{marginTop:18,borderTop:"4px solid #1E5B8A",boxShadow:"0 10px 34px rgba(30,91,138,.18),0 6px 22px rgba(0,0,0,.3)"}}>
              <div style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}>
                <h3 style={{color:"#1E5B8A",fontSize:"1.45rem"}}>ARGO</h3>
                <span style={{fontSize:".62rem",fontWeight:800,letterSpacing:".12em",textTransform:"uppercase",color:"#1E5B8A",border:"1px solid #1E5B8A66",borderRadius:20,padding:"3px 9px"}}>Bid-decision war room</span>
              </div>
              <div className="tag">GO / CONDITIONAL GO / NO-GO on any RFP</div>
              <div style={{fontSize:".95rem",color:"#3a4654",lineHeight:1.65,marginTop:6}}><b style={{color:CMD_INK}}>What it is.</b> ARGO turns an RFP, tender, or scope into a structured GO / CONDITIONAL GO / NO-GO decision, with delivery and commercial model ranking, 8-category risk math (P x I x D), a three-lane fee triangulation, and a win-probability estimate. For any party to a bid: consultant, contractor, sub-consultant, sub-contractor, supplier, or client.</div>
              <div style={{fontSize:".95rem",color:"#3a4654",lineHeight:1.65,marginTop:8}}><b style={{color:CMD_INK}}>Why you want it.</b> A bid decision in one cockpit, before you commit a team. Every figure carries its origin; the deterministic core does the math, the AI layer only explains and finds precedent, it never invents. Your RFP and pricing stay private to you.</div>
              <div style={{fontSize:".95rem",color:"#3a4654",lineHeight:1.65,marginTop:8}}><b style={{color:CMD_INK}}>Why it is different.</b> Win probability is a reasoned estimate, never a guarantee; fees triangulate three cited lanes and flag divergence; risk is P x I x D you can audit. The teaser below runs a real, redacted opportunity as one example.</div>
              <div className="acts"><button className="btn" style={{background:"#1E5B8A"}} onClick={()=>go("start")}>Request service →</button></div>
              <OwnerInline owner={owner} ownerEmail={ownerEmail} signIn={signInGoogle} signOut={signOutOwner} authErr={authErr} app="ARGO" accent="#1E5B8A"/>
            </article>
            {owner && <ARGOOwnerPanel/>}
            <ARGOTeaser />
            <article id="app-mesh" className="card glass" style={{marginTop:18,borderTop:`4px solid ${P.tealL}`,boxShadow:"0 10px 34px rgba(14,190,168,.18),0 6px 22px rgba(0,0,0,.3)"}}>
              <div style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}>
                <h3 style={{color:P.tealL,fontSize:"1.45rem"}}>Capacity Mesh</h3>
                <span style={{fontSize:".62rem",fontWeight:800,letterSpacing:".12em",textTransform:"uppercase",color:P.tealL,border:`1px solid ${P.tealL}66`,borderRadius:20,padding:"3px 9px"}}>Primary tool</span>
              </div>
              <div className="tag">Workforce capability intelligence you can audit</div>
              <div style={{fontSize:".95rem",color:"#3a4654",lineHeight:1.65,marginTop:6}}><b style={{color:CMD_INK}}>What it is.</b> Capacity Mesh scores every team and every person against the skills a job actually needs, any discipline, trade, or role, then shows who can deliver, who is ready to level up, and which team should lead, lend, or borrow.</div>
              <div style={{fontSize:".95rem",color:"#3a4654",lineHeight:1.65,marginTop:8}}><b style={{color:CMD_INK}}>Why you want it.</b> One live dashboard turns a roster into a staffing decision in seconds, every capability gap and succession risk surfaced before it costs you a deadline. It is not for engineers or offices alone: the same engine maps any workforce, any discipline, trade, or role, in any field. The demo below runs a three-office, twenty-nine-engineer firm as one example.</div>
              <div style={{fontSize:".95rem",color:"#3a4654",lineHeight:1.65,marginTop:8}}><b style={{color:CMD_INK}}>Why it is different.</b> Every number carries its origin. A deterministic core computes each score and you can trace it to its inputs; the AI layer only explains and finds precedent, it never invents. Tap the <span style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:14,height:14,borderRadius:"50%",border:"1.3px solid #0A7C6E",color:"#0A7C6E",fontSize:".55rem",fontWeight:800,fontStyle:"normal"}}>i</span> on any value in the dashboard below to see what it is, where it came from, and how it was worked out.</div>
              <div className="acts">
                <button className="btn" style={{background:P.teal}} onClick={()=>go("capmeshreq")}>Request service →</button>
              </div>
              <OwnerInline owner={owner} ownerEmail={ownerEmail} signIn={signInGoogle} signOut={signOutOwner} authErr={authErr} app="Capacity Mesh" accent={P.tealL}/>
            </article>
            {owner && <CapacityMeshPanel/>}

            <CMDash />
            <CMDecisionSample />

            <article id="app-nppe" className="card glass" style={{marginTop:18,borderTop:"4px solid #C6973F",boxShadow:"0 10px 34px rgba(198,151,63,.18),0 6px 22px rgba(0,0,0,.3)"}}>
              <div style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}>
                <h3 style={{color:"#C6973F",fontSize:"1.45rem"}}>NPPE Study Tutor</h3>
                <span style={{fontSize:".62rem",fontWeight:800,letterSpacing:".12em",textTransform:"uppercase",color:"#A8762A",border:"1px solid #C6973F66",borderRadius:20,padding:"3px 9px"}}>Free · Canada P.Eng</span>
              </div>
              <div className="tag">Grounded exam study, built on your own materials</div>
              <div style={{fontSize:".95rem",color:"#3a4654",lineHeight:1.65,marginTop:6}}><b style={{color:CMD_INK}}>What it is.</b> A free NPPE study engine for Canadian P.Eng candidates. Bring your own course materials and your own Claude account; the tutor answers only from your material and cites every source.</div>
              <div style={{fontSize:".95rem",color:"#3a4654",lineHeight:1.65,marginTop:8}}><b style={{color:CMD_INK}}>Why you want it.</b> An honest readiness check that stays red until you are genuinely ready, and a pace that tracks your exam date. No invented examples, no filler.</div>
              <div style={{fontSize:".95rem",color:"#3a4654",lineHeight:1.65,marginTop:8}}><b style={{color:CMD_INK}}>Why it is different.</b> Powered by the iStructural Hybrid RAG engine: it retrieves the governing rule before answering and refuses to guess. Your materials stay in your own Drive, never shared.</div>
              <div className="acts"><button className="btn" style={{background:"#C6973F"}} onClick={()=>go("nppereq")}>Request service →</button></div>
            </article>

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
              <div key={i} className="svc-row"><div style={{fontWeight:700,color:"#e0b65f"}}>{w[0]}</div><div style={{color:"#5A6B7A",fontSize:".88rem",lineHeight:1.6}}>{w[1]}</div></div>
            ))}

            <h2 className="sec">How it works</h2>
            <div className="grid3">
              {NPPE_STEPS.map((s,i)=>(
                <div key={i} className="card glass">
                  <div style={{fontFamily:"'Fraunces',serif",fontWeight:800,fontSize:"1.6rem",color:"#e0b65f"}}>{s[0]}</div>
                  <h3 style={{fontSize:"1.05rem",marginTop:6}}>{s[1]}</h3>
                  <div style={{fontSize:".85rem",color:"#5A6B7A",marginTop:6,lineHeight:1.55}}>{s[2]}</div>
                </div>
              ))}
            </div>

            <h2 className="sec">Questions</h2>
            {NPPE_FAQ.map((q,i)=>(
              <div key={i} className="svc-row"><div style={{fontWeight:700,color:"#fff"}}>{q[0]}</div><div style={{color:"#5A6B7A",fontSize:".88rem",lineHeight:1.6}}>{q[1]}</div></div>
            ))}


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
              <label style={{display:"flex",gap:10,alignItems:"flex-start",marginTop:16,fontSize:".84rem",color:"#3a4654",lineHeight:1.5,cursor:"pointer"}}>
                <input type="checkbox" checked={npConsent} onChange={e=>setNpConsent(e.target.checked)} style={{marginTop:3,width:16,height:16,flexShrink:0,accentColor:P.gold}} />
                <span>{NPPE_CONSENT}</span>
              </label>
              {captchaBlock()}
              {npErr && <div style={{fontSize:".8rem",color:"#ffd1c9",marginTop:10}}>{npErr}</div>}
              {npStatus==="success" && <div style={{marginTop:12,padding:"10px 12px",borderRadius:8,background:"rgba(46,160,120,.15)",color:"#2EA078",fontSize:".82rem",fontWeight:600,lineHeight:1.5}}>Thank you. Your request was sent. We respond within 24 hours.</div>}
              <button className="btn" disabled={npStatus==="sending"} style={{background:P.gold,marginTop:16,width:"100%",opacity:(npValid&&npStatus!=="sending")?1:.6,cursor:npStatus==="sending"?"wait":"pointer"}} onClick={submitNppe}>{npStatus==="sending"?"Sending...":"Submit request"}</button>
              <div style={{fontSize:".72rem",color:"#6b7c8c",marginTop:12,lineHeight:1.6}}>Your details are used only to provide the engine and follow up on your setup. They are not shared. Submitting sends your request directly to info@istructgroup.com.</div>
            </div>
            <div className="card glass" style={{marginTop:18,padding:"16px 18px"}}>
              <div style={{fontSize:".7rem",color:"#5A6B7A",lineHeight:1.6}}>{NPPE_DISCLAIMER}</div>
            </div>
          </div>
        )}

        {page==="capmeshreq" && (
          <div className="page">
            <div className="phero glass" style={{borderTop:`4px solid ${P.tealL}`}}>
              <div className="eyebrow" style={{color:P.tealL}}>Resources · Capacity Mesh · Request access</div>
              <h1>Request Capacity Mesh access</h1>
              <p>Tell us about your firm and we will set up a private walkthrough or early access. We respond within 24 hours.</p>
            </div>
            <div className="fbody glass" id="capmeshForm" style={{borderRadius:14,marginTop:18}}>
              <div className="fgrid">
                {[["Full name",true],["Company / Organization",true],["Email",true],["Mobile",false],["Role",false]].map(([k,req])=>(
                  <div key={k} className="fld"><label>{k}{req?" *":""}</label><input value={cm[k]||""} onChange={e=>{setCm(sx=>({...sx,[k]:e.target.value})); if(cmStatus!=="idle") setCmStatus("idle");}} placeholder={k} /></div>
                ))}
                <div className="fld full"><label>What do you want Capacity Mesh to do for you?</label><textarea value={cm["Message"]||""} onChange={e=>setCm(sx=>({...sx,Message:e.target.value}))} placeholder="Your goals..." /></div>
              </div>
              {captchaBlock()}
              <button className="btn" disabled={cmStatus==="sending"} onClick={submitCapMesh} style={{background:P.tealL,marginTop:14,width:"100%",opacity:cmStatus==="sending"?.6:1,cursor:cmStatus==="sending"?"wait":"pointer"}}>{cmStatus==="sending"?"Sending...":"Request access"}</button>
              {cmStatus==="success" && <div style={{marginTop:12,padding:"10px 12px",borderRadius:8,background:"rgba(46,160,120,.15)",color:"#2EA078",fontSize:".82rem",fontWeight:600}}>Thank you. Your request was sent. We respond within 24 hours.</div>}
              {cmStatus==="error" && <div style={{marginTop:12,padding:"10px 12px",borderRadius:8,background:"rgba(214,90,90,.15)",color:"#ffb4a8",fontSize:".82rem",fontWeight:600}}>Please complete name, company and a valid email, then try again.</div>}
            </div>
          </div>
        )}
        {/* START */}
        {page==="start" && (
          <div className="page">
            <div className="phero glass"><h1>Start a Project</h1><p>Choose your service. We respond within 24 hours with scope, timeline, and proposal.</p></div>
            <div className="ftabs">{START_TABS.map(t=><button key={t[0]} className={"ft"+(t[0]===tab?" on":"")} onClick={()=>setTab(t[0])}>{t[1]}</button>)}</div>
            <div className="fbody glass">
              <div style={{fontSize:".74rem",color:"#5A6B7A",marginBottom:10}}>Fields marked <b style={{color:"#C0553A"}}>*</b> are required.</div>
              <div className="fgrid">
                {START_FIELDS[tab].map((f,i)=>{
                  const isTa=f[1]==="ta", isSel=f[1]&&f[1]!=="ta";
                  const k=tab+":"+f[0];
                  const val=svc[k]||"";
                  const upd=e=>{ setSvc(s=>({...s,[k]:e.target.value})); if(svcStatus!=="idle") setSvcStatus("idle"); };
                  return (
                    <div key={i} className={"fld"+(isTa?" full":"")}>
                      <label>{f[0]}{f[1]!=="ta"?" *":""}</label>
                      {isTa ? <textarea placeholder={f[0]+"..."} value={val} onChange={upd} /> :
                       isSel ? <select value={val} onChange={upd}><option value="">Select...</option>{f[1].split("|").map(o=><option key={o}>{o}</option>)}</select> :
                       <input placeholder={f[0]} value={val} onChange={upd} />}
                    </div>
                  );
                })}
              </div>
              {captchaBlock()}
              <button className="btn" disabled={svcStatus==="sending"} onClick={submitSvc} style={{background:START_TABS.find(t=>t[0]===tab)[2],marginTop:14,width:"100%",opacity:svcStatus==="sending"?.6:1,cursor:svcStatus==="sending"?"wait":"pointer"}}>{svcStatus==="sending"?"Sending...":"Submit Inquiry"}</button>
              {svcStatus==="success" && <div style={{marginTop:12,padding:"10px 12px",borderRadius:8,background:"rgba(46,160,120,.15)",color:"#2EA078",fontSize:".82rem",fontWeight:600,lineHeight:1.5}}>Thank you. Your inquiry was sent. We respond within 24 hours.</div>}
              {svcStatus==="error" && <div style={{marginTop:12,padding:"10px 12px",borderRadius:8,background:"rgba(214,90,90,.15)",color:"#d65a5a",fontSize:".82rem",fontWeight:600,lineHeight:1.5}}>Please complete every field with a valid email address, then try again. If it keeps failing, email info@istructgroup.com.</div>}
            </div>
          </div>
        )}

        {/* CONTACT */}
        {page==="contact" && (
          <div className="page">
            <div className="phero glass"><h1>Contact Us</h1><p>iStructural Group Inc. · Canada · info@istructgroup.com</p></div>
            <div className="grid3" style={{marginTop:24}}>
              <a className="card glass" href="mailto:info@istructgroup.com?subject=General%20Inquiry" style={{textDecoration:"none",display:"block"}}><h3 style={{fontSize:"1.05rem"}}>General Inquiry</h3><div style={{fontSize:".85rem",color:"#5A6B7A",marginTop:6,lineHeight:1.6}}>Management, design, or consultancy.</div><div style={{marginTop:10,fontWeight:700,color:P.tealL}}>info@istructgroup.com →</div></a>
              <div className="card glass" style={{cursor:"pointer"}} onClick={()=>go("start")}><h3 style={{fontSize:"1.05rem"}}>Start a Project</h3><div style={{fontSize:".85rem",color:"#5A6B7A",marginTop:6,lineHeight:1.6}}>Management, design, or AI assessment.</div><div style={{marginTop:10,fontWeight:700,color:"#1E5B8A"}}>Start a Project →</div></div>
              <div className="card glass" style={{cursor:"pointer"}} onClick={()=>go("training")}><h3 style={{fontSize:"1.05rem"}}>Training</h3><div style={{fontSize:".85rem",color:"#5A6B7A",marginTop:6,lineHeight:1.6}}>CSi training for your team.</div><div style={{marginTop:10,fontWeight:700,color:"#6B3A7D"}}>Request Training →</div></div>
            </div>
          </div>
        )}
        <footer className="foot glass">
          <div className="foot-grid">
            <div><div className="co">iStructural Group Inc.</div><div className="blurb">Since 2010. Advanced structural engineering, business strategy, and AI-powered assessment. Canada.</div></div>
            <div><h4>Management</h4><a onClick={()=>go("s1")}>Project Management</a><a onClick={()=>go("s1")}>Business Strategy</a><a onClick={()=>go("s1")}>Value Engineering</a></div>
            <div><h4>Design</h4><a onClick={()=>go("s2")}>Structural Design</a><a onClick={()=>go("s2")}>Seismic & Wind</a><a onClick={()=>go("training")}>Training</a></div>
            <div><h4>AI & Technology</h4><a onClick={()=>go("s3")}>AI Literacy & Readiness</a><a onClick={()=>go("start")}>Start a Project</a></div>
            <div><h4>Resources</h4><a onClick={()=>go("hub")}>Knowledge Hub</a><a onClick={()=>go("resources")}>ARGO</a><a onClick={()=>go("resources")}>Capacity Mesh</a><a onClick={()=>go("nppe")}>NPPE Study Tutor</a><a onClick={()=>go("projects")}>Projects</a></div>
          </div>
          <div className="base"><span>iStructural Group Inc. · istructgroup.com · Canada · info@istructgroup.com</span><span>Copyright 2026 iStructural Group Inc. All rights reserved.</span></div>
        </footer>
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
