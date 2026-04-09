import { useState, useEffect, useRef } from "react"
import {
    FiArrowRight, FiCheck, FiZap, FiChevronRight,
    FiPhone, FiMail, FiMessageCircle,
    FiUsers, FiBookOpen, FiHome, FiCoffee,
    FiMap, FiTrendingUp, FiCpu, FiBarChart2,
    FiShoppingBag, FiBriefcase, FiMonitor,
} from "react-icons/fi"
import PageHero from "../Components/PageHero"
import { usePricing } from "../hooks/usePricing"
import "../Styles/ServicePageShared.css"
import "../Styles/DevelopmentPage.css"
import "../Styles/ProductShow.css"

/* ─── reveal hook ─── */
function useReveal(threshold = 0.05) {
    const ref = useRef(null)
    useEffect(() => {
        const el = ref.current; if (!el) return
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) el.classList.add("dp-visible") },
            { threshold, rootMargin: "0px 0px -40px 0px" }
        )
        obs.observe(el); return () => obs.disconnect()
    }, [])
    return ref
}

/* ══════════════════════════════════════════
   PRODUCTS DATA
══════════════════════════════════════════ */
const PRODUCTS = [
    {
        id: "tripaxis", name: "TripAxis", short: "Travel",
        category: "Tour & Travel",
        tagline: "Complete Tour & Travel Management Software",
        about: "TripAxis is a full-stack SaaS platform for Indian tour & travel agencies — handles bookings, itineraries, GST billing, supplier management, and agent portals all in one place.",
        icon: <FiMap />, color: "#f05a28",
        tag: "50+ Agencies", year: "2021", path: "/products/tour-booking",
        highlights: [
            "Package & itinerary builder",
            "Real-time seat & inventory tracking",
            "GST-compliant invoice generation",
            "Agent & supplier management",
            "WhatsApp booking notifications",
            "Mobile-first design",
        ],
        tech: ["React", "Node.js", "PostgreSQL", "AWS", "Razorpay", "WhatsApp API"],
        stats: [
            { val: "50+", lbl: "Active Agencies" },
            { val: "10k+", lbl: "Bookings Processed" },
            { val: "99.9%", lbl: "Uptime SLA" },
            { val: "2021", lbl: "Year Launched" },
        ],
        gallery: [
            { label: "Dashboard", desc: "Central command — bookings, revenue & tasks at a glance" },
            { label: "Package Builder", desc: "Day-wise drag-and-drop itinerary creation tool" },
            { label: "Booking Management", desc: "Full lifecycle tracking from enquiry to confirmation" },
            { label: "GST Invoice", desc: "Auto-generated GST invoices with custom branding" },
            { label: "Agent Portal", desc: "Dedicated sub-agent portal for booking & tracking" },
            { label: "Mobile View", desc: "Fully responsive — works flawlessly on every device" },
        ],
        pricing: [
            { name: "Starter", price: "₹2,999", per: "/month", desc: "1 branch · 3 users", features: ["Package management", "Booking & invoicing", "Basic reports", "Email support"], hl: false },
            { name: "Growth", price: "₹6,499", per: "/month", desc: "3 branches · 10 users", features: ["Everything in Starter", "GST filing module", "WhatsApp integration", "Agent portal", "Priority support"], hl: true },
            { name: "Enterprise", price: "Custom", per: "", desc: "Unlimited branches", features: ["Everything in Growth", "Custom integrations", "Dedicated manager", "SLA guarantee", "On-premise option"], hl: false },
        ],
    },
    {
        id: "axsemai", name: "AxsemAI", short: "AI Suite",
        category: "AI & Automation",
        tagline: "AI-Powered Business Automation Platform",
        about: "AxsemAI is a no-code automation platform that helps Indian businesses automate data entry, document parsing, customer support, and internal workflows using custom-trained AI models.",
        icon: <FiCpu />, color: "#6b3fa0",
        tag: "30+ Automations", year: "2024", path: "/products/ai-solutions",
        highlights: [
            "AI document parsing & data extraction",
            "No-code workflow automation builder",
            "Custom chatbot for customer support",
            "Resume parsing for HR teams",
            "50+ tool integrations",
            "Real-time automation analytics",
        ],
        tech: ["Python", "TensorFlow", "OpenAI API", "React", "FastAPI", "Redis"],
        stats: [
            { val: "30+", lbl: "AI Automations" },
            { val: "80%", lbl: "Time Saved Avg" },
            { val: "50+", lbl: "Integrations" },
            { val: "2024", lbl: "Year Launched" },
        ],
        gallery: [
            { label: "Automation Builder", desc: "Visual drag-and-drop workflow builder for AI automations" },
            { label: "Document Parser", desc: "Upload any document — AI extracts structured data instantly" },
            { label: "Chatbot Studio", desc: "Train and deploy custom chatbots without code" },
            { label: "Analytics Dashboard", desc: "Real-time analytics on automation performance & ROI" },
            { label: "Integration Hub", desc: "50+ pre-built connectors to popular business tools" },
            { label: "Mobile Monitor", desc: "Monitor automations and get alerts on the go" },
        ],
        pricing: [
            { name: "Starter", price: "₹4,999", per: "/month", desc: "5 automations", features: ["5 active workflows", "Document parser (100/mo)", "Basic chatbot", "Email support"], hl: false },
            { name: "Scale", price: "₹14,999", per: "/month", desc: "Unlimited automations", features: ["Unlimited workflows", "Document parser (unlimited)", "Custom AI chatbot", "50+ integrations", "Onboarding support"], hl: true },
            { name: "Enterprise", price: "Custom", per: "", desc: "Custom AI models", features: ["Custom-trained models", "On-premise option", "Full API access", "Enterprise SLA", "24×7 support"], hl: false },
        ],
    },
    {
        id: "schoolaxis", name: "SchoolAxis", short: "School",
        category: "Education",
        tagline: "Complete School Management System",
        about: "SchoolAxis covers every aspect of school administration — from online admissions and fee collection to attendance, report cards, parent communication, and timetable management.",
        icon: <FiBookOpen />, color: "#0e9e6e",
        tag: "15k+ Students", year: "2022", path: "/products/school-management",
        highlights: [
            "Online admissions & fee management",
            "Biometric attendance integration",
            "Automated report card generation",
            "Parent app with real-time updates",
            "Timetable & substitute management",
            "CBSE / ICSE / State board compliant",
        ],
        tech: ["React", "Node.js", "MySQL", "Firebase", "Razorpay", "Android/iOS"],
        stats: [
            { val: "15k+", lbl: "Students Managed" },
            { val: "25+", lbl: "Schools Live" },
            { val: "4.8★", lbl: "Parent App Rating" },
            { val: "2022", lbl: "Year Launched" },
        ],
        gallery: [
            { label: "Admin Dashboard", desc: "School-wide overview — attendance, fees & alerts in one place" },
            { label: "Admission Portal", desc: "Online admission form with document upload & status tracking" },
            { label: "Fee Management", desc: "Fee collection, receipts, dues & payment reconciliation" },
            { label: "Report Cards", desc: "Auto-generated report cards with custom grading formats" },
            { label: "Parent App", desc: "Real-time updates on attendance, homework & fees for parents" },
            { label: "Timetable Manager", desc: "Period-wise timetable with teacher substitution management" },
        ],
        pricing: [
            { name: "Small", price: "₹1,999", per: "/month", desc: "Up to 300 students", features: ["Admissions & fee module", "Attendance tracking", "Basic reports", "WhatsApp updates"], hl: false },
            { name: "Standard", price: "₹4,499", per: "/month", desc: "Up to 1,000 students", features: ["Everything in Small", "Parent mobile app", "Report card generator", "Timetable module", "Priority support"], hl: true },
            { name: "Premium", price: "₹8,999", per: "/month", desc: "Unlimited students", features: ["Everything in Standard", "Biometric integration", "Custom branding", "Multi-branch", "Dedicated manager"], hl: false },
        ],
    },
    {
        id: "peopleaxis", name: "PeopleAxis", short: "HR & Payroll",
        category: "HR & Payroll",
        tagline: "HR & Payroll Software for Growing Companies",
        about: "PeopleAxis is a full-featured HRMS designed for Indian compliance. PF, ESI, TDS calculations are auto-handled. From hiring to full & final settlement, every HR workflow is covered.",
        icon: <FiUsers />, color: "#3d3d9e",
        tag: "50k+ Employees", year: "2022", path: "/products/hr-payroll",
        highlights: [
            "Auto PF, ESI & TDS calculation",
            "Leave, attendance & shift management",
            "Payslip generation in one click",
            "Employee self-service portal",
            "Recruitment & onboarding tracker",
            "Performance appraisal module",
        ],
        tech: ["React", "Python", "PostgreSQL", "Celery", "AWS", "PDF Engine"],
        stats: [
            { val: "50k+", lbl: "Employees Managed" },
            { val: "200+", lbl: "Companies" },
            { val: "100%", lbl: "Compliance Coverage" },
            { val: "2022", lbl: "Year Launched" },
        ],
        gallery: [
            { label: "HR Dashboard", desc: "Analytics — headcount, attrition, leaves at a glance" },
            { label: "Payroll Processing", desc: "One-click salary processing with all deductions auto-calculated" },
            { label: "Employee Profile", desc: "360° view — documents, history & performance in one screen" },
            { label: "Attendance Module", desc: "Biometric + geo-fencing + manual attendance tracking" },
            { label: "Leave Management", desc: "Leave requests, approvals & balance tracking for all types" },
            { label: "Self-Service Portal", desc: "Employees view payslips, apply leaves & update info themselves" },
        ],
        pricing: [
            { name: "Basic", price: "₹49", per: "/user/mo", desc: "Teams up to 50", features: ["Payroll processing", "Leave management", "Attendance tracking", "Payslip generation"], hl: false },
            { name: "Pro", price: "₹89", per: "/user/mo", desc: "Teams up to 500", features: ["Everything in Basic", "PF/ESI/TDS auto filing", "Self-service portal", "Appraisal module", "API access"], hl: true },
            { name: "Enterprise", price: "₹129", per: "/user/mo", desc: "500+ employees", features: ["Everything in Pro", "Custom workflows", "Biometric integration", "HRMS consultant", "SLA guarantee"], hl: false },
        ],
    },
    {
        id: "ngoaxis", name: "NGOAxis", short: "NGO",
        category: "Non-Profit",
        tagline: "Management Software Built for NGOs & Non-Profits",
        about: "NGOAxis is the only FCRA-compliant NGO management platform in India — handles donor management, project tracking, fund utilisation reports, and volunteer management all in one.",
        icon: <FiTrendingUp />, color: "#e63b2a",
        tag: "FCRA Compliant", year: "2023", path: "/products/ngo",
        highlights: [
            "FCRA compliance & reporting",
            "Donor database & receipt generation",
            "Project & fund utilisation tracking",
            "Volunteer management module",
            "80G certificate automation",
            "Impact reporting dashboard",
        ],
        tech: ["React", "Node.js", "PostgreSQL", "PDF Engine", "Razorpay", "AWS"],
        stats: [
            { val: "40+", lbl: "NGOs Live" },
            { val: "FCRA", lbl: "Compliant" },
            { val: "₹2Cr+", lbl: "Donations Managed" },
            { val: "2023", lbl: "Year Launched" },
        ],
        gallery: [
            { label: "NGO Dashboard", desc: "Fund overview, active projects & upcoming compliances" },
            { label: "Donor Management", desc: "Complete donor database with communication history" },
            { label: "Fund Tracking", desc: "Project-wise fund allocation & utilisation tracking" },
            { label: "FCRA Reports", desc: "Auto-generated FC-4 and compliance reports" },
            { label: "80G Certificates", desc: "Automatic 80G receipt generation for all donors" },
            { label: "Volunteer Portal", desc: "Volunteer registration, hours tracking & certificates" },
        ],
        pricing: [
            { name: "Basic", price: "₹1,499", per: "/month", desc: "Up to 500 donors", features: ["Donor management", "Donation tracking", "Basic reports", "Email support"], hl: false },
            { name: "Standard", price: "₹3,999", per: "/month", desc: "Unlimited donors", features: ["Everything in Basic", "FCRA compliance module", "80G certificate automation", "Project tracking", "Priority support"], hl: true },
            { name: "Premium", price: "₹7,499", per: "/month", desc: "Multiple branches", features: ["Everything in Standard", "Multi-branch NGO", "Custom reports", "Volunteer portal", "Dedicated manager"], hl: false },
        ],
    },
    {
        id: "hotelaxis", name: "HotelAxis", short: "Hotel",
        category: "Hospitality",
        tagline: "Hotel & Property Management System",
        about: "HotelAxis is a cloud-based PMS for hotels, resorts & service apartments. Front desk, housekeeping, OTA channel management, restaurant POS and guest CRM — all from one screen.",
        icon: <FiHome />, color: "#f5a623",
        tag: "40+ Properties", year: "2022", path: "/products/hotel-management",
        highlights: [
            "Front desk with real-time room status",
            "OTA channel manager integration",
            "Restaurant & room service POS",
            "Housekeeping task management",
            "GST-compliant billing",
            "Guest history & CRM",
        ],
        tech: ["React", "Node.js", "MongoDB", "Socket.io", "Stripe", "OTA APIs"],
        stats: [
            { val: "40+", lbl: "Properties Live" },
            { val: "5k+", lbl: "Monthly Check-ins" },
            { val: "35%", lbl: "Occupancy Lift Avg" },
            { val: "2022", lbl: "Year Launched" },
        ],
        gallery: [
            { label: "Front Desk", desc: "Room grid with check-in, check-out & housekeeping status" },
            { label: "Reservation Calendar", desc: "Drag-to-extend bookings with rate management" },
            { label: "Channel Manager", desc: "Sync availability across MakeMyTrip, Booking.com, Airbnb" },
            { label: "Restaurant POS", desc: "Integrated restaurant billing with room charge posting" },
            { label: "Housekeeping App", desc: "Mobile task assignment & status for housekeeping team" },
            { label: "Reports Dashboard", desc: "Occupancy, ADR, RevPAR reports with trend analysis" },
        ],
        pricing: [
            { name: "Small", price: "₹2,499", per: "/month", desc: "Up to 20 rooms", features: ["Front desk module", "Booking management", "Basic billing", "Email support"], hl: false },
            { name: "Standard", price: "₹5,499", per: "/month", desc: "Up to 60 rooms", features: ["Everything in Small", "OTA channel manager", "Restaurant POS", "Housekeeping app", "GST billing"], hl: true },
            { name: "Full Suite", price: "₹9,999", per: "/month", desc: "Unlimited rooms", features: ["Everything in Standard", "Multi-property", "Custom reports", "Guest CRM", "Dedicated support"], hl: false },
        ],
    },
    {
        id: "foodaxis", name: "FoodAxis", short: "Food",
        category: "Restaurants",
        tagline: "Restaurant & Food Business Management Platform",
        about: "FoodAxis is a complete restaurant management platform — touch POS, KOT printing, table management, Zomato & Swiggy integration, inventory, and GST billing built for Indian restaurants.",
        icon: <FiCoffee />, color: "#e63b2a",
        tag: "60+ Restaurants", year: "2022", path: "/products/restaurant-pos",
        highlights: [
            "Touch-based POS with KOT printing",
            "Table & takeaway order management",
            "Zomato & Swiggy integration",
            "Inventory & recipe management",
            "Staff management & shift tracking",
            "GST-compliant billing",
        ],
        tech: ["React", "Node.js", "MySQL", "Print API", "Zomato API", "Swiggy API"],
        stats: [
            { val: "60+", lbl: "Restaurants Live" },
            { val: "1M+", lbl: "Orders Processed" },
            { val: "4.7★", lbl: "Restaurant Rating" },
            { val: "2022", lbl: "Year Launched" },
        ],
        gallery: [
            { label: "POS Terminal", desc: "Fast touch POS with item search, modifiers & quick billing" },
            { label: "Table Management", desc: "Visual floor plan with real-time table status" },
            { label: "KOT System", desc: "Automatic kitchen order tickets to kitchen printer/display" },
            { label: "Delivery Dashboard", desc: "Zomato & Swiggy orders directly in FoodAxis — no manual entry" },
            { label: "Inventory Module", desc: "Recipe-based inventory deduction with low stock alerts" },
            { label: "Sales Analytics", desc: "Daily sales, item-wise analysis & staff performance trends" },
        ],
        pricing: [
            { name: "Starter", price: "₹1,499", per: "/month", desc: "1 outlet", features: ["POS terminal", "Table management", "KOT printing", "Daily sales reports"], hl: false },
            { name: "Pro", price: "₹3,499", per: "/month", desc: "Up to 3 outlets", features: ["Everything in Starter", "Delivery integration", "Inventory module", "Staff management", "GST billing"], hl: true },
            { name: "Chain", price: "₹7,999", per: "/month", desc: "Unlimited outlets", features: ["Everything in Pro", "Central dashboard", "Recipe management", "Loyalty program", "Dedicated support"], hl: false },
        ],
    },
    {
        id: "propaxis", name: "PropAxis", short: "Real Estate",
        category: "Real Estate",
        tagline: "Real Estate CRM & Property Management Software",
        about: "PropAxis is a real estate CRM for builders, brokers & property managers. Lead tracking, site visits, payment schedules, agreement management and broker commission — all in one platform.",
        icon: <FiBarChart2 />, color: "#3d3d9e",
        tag: "₹500Cr+ Properties", year: "2023", path: "/products/real-estate",
        highlights: [
            "Lead capture from website & portals",
            "Site visit scheduling & tracking",
            "Payment schedule & collection",
            "Agreement & document management",
            "Broker commission management",
            "99acres & MagicBricks integration",
        ],
        tech: ["React", "Node.js", "PostgreSQL", "DocuSign", "99acres API", "AWS S3"],
        stats: [
            { val: "₹500Cr+", lbl: "Properties Managed" },
            { val: "30+", lbl: "Builders & Brokers" },
            { val: "5k+", lbl: "Leads Tracked" },
            { val: "2023", lbl: "Year Launched" },
        ],
        gallery: [
            { label: "CRM Pipeline", desc: "Visual lead pipeline from inquiry to possession" },
            { label: "Property Inventory", desc: "Manage units with floor plans, pricing & availability" },
            { label: "Site Visit Tracker", desc: "Schedule, assign & track site visits with follow-up reminders" },
            { label: "Payment Schedule", desc: "Construction-linked payment plans with automated reminders" },
            { label: "Document Vault", desc: "Store and share agreements, NOCs & possession letters" },
            { label: "Commission Module", desc: "Auto-calculate & track broker commissions across deals" },
        ],
        pricing: [
            { name: "Broker", price: "₹1,999", per: "/month", desc: "1 user · 50 leads/mo", features: ["CRM pipeline", "Lead management", "Site visit tracking", "Basic reports"], hl: false },
            { name: "Builder", price: "₹7,999", per: "/month", desc: "10 users · unlimited leads", features: ["Everything in Broker", "Payment schedule", "Document management", "Commission tracking", "Portal integrations"], hl: true },
            { name: "Enterprise", price: "Custom", per: "", desc: "Large builders & groups", features: ["Everything in Builder", "Multi-project", "Custom reports", "API access", "Dedicated manager"], hl: false },
        ],
    },
    {
        id: "crmaxis", name: "CRMAxis", short: "CRM",
        category: "Sales & CRM",
        tagline: "Customer Relationship Management for Sales Teams",
        about: "CRMAxis is a powerful yet simple CRM for Indian SMEs — captures leads from every source, tracks the pipeline, automates follow-ups, and gives managers real-time visibility into team performance.",
        icon: <FiBriefcase />, color: "#6b3fa0",
        tag: "300+ Sales Teams", year: "2023", path: "/products/crm",
        highlights: [
            "Multi-source lead capture",
            "Visual sales pipeline (Kanban)",
            "Automated follow-up sequences",
            "Quotation & proposal builder",
            "Team performance analytics",
            "WhatsApp & email communication log",
        ],
        tech: ["React", "Node.js", "MongoDB", "Redis", "Twilio", "SendGrid"],
        stats: [
            { val: "300+", lbl: "Sales Teams" },
            { val: "2M+", lbl: "Leads Tracked" },
            { val: "40%", lbl: "Avg Conversion Lift" },
            { val: "2023", lbl: "Year Launched" },
        ],
        gallery: [
            { label: "Sales Pipeline", desc: "Kanban pipeline with deal value, probability & next action" },
            { label: "Lead Inbox", desc: "Unified inbox for leads — web, Facebook, IndiaMART" },
            { label: "Quotation Builder", desc: "Professional PDF quotations in seconds with custom branding" },
            { label: "Follow-up Sequences", desc: "Automated multi-step follow-up via email & WhatsApp" },
            { label: "Team Dashboard", desc: "Manager view of team activities & targets vs achievement" },
            { label: "Mobile CRM", desc: "Full CRM on mobile — call, log & update on the go" },
        ],
        pricing: [
            { name: "Starter", price: "₹999", per: "/user/mo", desc: "Up to 5 users", features: ["Lead management", "Pipeline tracking", "Basic automation", "Email support"], hl: false },
            { name: "Team", price: "₹1,799", per: "/user/mo", desc: "Up to 25 users", features: ["Everything in Starter", "Quotation builder", "Follow-up sequences", "WhatsApp integration", "Manager analytics"], hl: true },
            { name: "Scale", price: "₹2,499", per: "/user/mo", desc: "Unlimited users", features: ["Everything in Team", "Custom fields & stages", "API access", "Advanced reports", "Priority support"], hl: false },
        ],
    },
]

/* ══════════════════════════════════════════
   MOCK SCREENSHOT CARD
══════════════════════════════════════════ */
function ScreenCard({ item, color, i }) {
    return (
        <div className="psp-screen-card" style={{ "--accent": color, "--si": i }}>
            {/* Browser chrome */}
            <div className="psp-browser">
                <div className="psp-browser-bar">
                    <span className="psp-dot" style={{ background: "#ff5f57" }} />
                    <span className="psp-dot" style={{ background: "#febc2e" }} />
                    <span className="psp-dot" style={{ background: "#28c840" }} />
                    <div className="psp-url-bar">
                        <FiMonitor size={9} style={{ opacity: .5 }} />
                        <span>{item.label.toLowerCase().replace(/ /g, "-")}</span>
                    </div>
                </div>
                <div className="psp-screen">
                    {/* Simulated UI skeleton */}
                    <div className="psp-screen-sidebar">
                        {[40, 60, 50, 45, 55].map((w, j) => (
                            <div key={j} className="psp-sk-row" style={{ width: `${w}%` }} />
                        ))}
                    </div>
                    <div className="psp-screen-main">
                        <div className="psp-sk-header" style={{ background: color, opacity: .22 }} />
                        <div className="psp-sk-grid">
                            {[1, 2, 3, 4].map(k => (
                                <div key={k} className="psp-sk-card">
                                    <div className="psp-sk-card-top" style={{ background: color, opacity: .18 }} />
                                    <div className="psp-sk-card-line" style={{ width: "80%" }} />
                                    <div className="psp-sk-card-line" style={{ width: "55%" }} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* Label below */}
            <div className="psp-screen-label">
                <span className="psp-screen-num" style={{ color }}>{String(i + 1).padStart(2, "0")}</span>
                <div>
                    <div className="psp-screen-name">{item.label}</div>
                    <div className="psp-screen-desc">{item.desc}</div>
                </div>
            </div>
        </div>
    )
}

/* ══════════════════════════════════════════
   PRICING CARD
══════════════════════════════════════════ */
function PricingCard({ p, color, delay }) {
    return (
        <div
            className={`dp-pcard ${p.hl ? "dp-pcard-hl" : ""} psp-pcard`}
            style={{ "--delay": delay, "--sp-orange": color, "--accent": color }}
        >
            {p.hl && <div className="dp-pcard-badge psp-badge"><FiZap /> Most Popular</div>}
            <div className="dp-pcard-name">{p.name}</div>
            <div className="dp-pcard-price" style={{ color: p.hl ? color : "var(--sp-text)" }}>{p.price}</div>
            {p.per && <div className="dp-pcard-per">{p.per}</div>}
            <p className="dp-pcard-desc">{p.desc}</p>
            <ul className="dp-pcard-list">
                {p.features.map(f => (
                    <li key={f}><FiCheck style={{ color }} />{f}</li>
                ))}
            </ul>
            <a href="/contact" className={`dp-pcard-btn ${p.hl ? "dp-pcard-btn-hl psp-btn-hl" : ""}`}
                style={p.hl ? { background: color, borderColor: color } : {}}>
                Get Started <FiArrowRight />
            </a>
        </div>
    )
}

/* ══════════════════════════════════════════
    PRODUCT DETAIL PANEL (switches on tab click)
══════════════════════════════════════════ */
function ProductPanel({ product, dynamicPricing }) {
    const statsRef = useReveal()
    const galleryRef = useReveal()
    const pricingRef = useReveal()
    const p = product

    const getPricingWithDynamic = () => {
        if (!dynamicPricing) return p.pricing
        return p.pricing.map(tier => {
            const tierKey = tier.name.toLowerCase()
            const dynamicData = dynamicPricing[tierKey]
            if (dynamicData) {
                return { ...tier, price: dynamicData.price, per: dynamicData.per }
            }
            return tier
        })
    }

    const finalPricing = getPricingWithDynamic()

    return (
        <div className="psp-panel">

            {/* ── Product Header ── */}
            <div className="psp-panel-header">
                <div className="psp-panel-icon" style={{ background: `${p.color}15`, borderColor: `${p.color}28`, color: p.color }}>
                    {p.icon}
                </div>
                <div className="psp-panel-info">
                    <span className="psp-panel-cat" style={{ color: p.color }}>{p.category}</span>
                    <h2 className="psp-panel-title">{p.name}</h2>
                    <p className="psp-panel-tagline">{p.tagline}</p>
                </div>
                <div className="psp-panel-meta">
                    <span className="psp-panel-tag" style={{ color: p.color, background: `${p.color}12`, borderColor: `${p.color}28` }}>
                        {p.tag}
                    </span>
                    <span className="psp-panel-year">Since {p.year}</span>
                </div>
            </div>

            {/* ── About + Highlights ── */}
            <div className="psp-about-grid">
                <div className="psp-about-left">
                    <div className="sp-pill" style={{ background: `${p.color}10`, borderColor: `${p.color}40`, color: p.color }}>
                        About {p.name}
                    </div>
                    <p className="psp-about-text">{p.about}</p>
                    <div className="psp-hl-grid">
                        {p.highlights.map((h, i) => (
                            <div key={h} className="psp-hl-item" style={{ "--delay": `${i * 0.05}s` }}>
                                <span className="psp-hl-check" style={{ background: p.color }}><FiCheck /></span>
                                {h}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="psp-about-right">
                    {/* Tech stack */}
                    <div className="psp-tech-box">
                        <div className="psp-tech-title">Tech Stack</div>
                        <div className="psp-tech-tags">
                            {p.tech.map(t => (
                                <span key={t} className="psp-tech-chip" style={{ "--accent": p.color }}>{t}</span>
                            ))}
                        </div>
                    </div>
                    {/* Quick CTA */}
                    <div className="psp-quick-cta" style={{ borderColor: `${p.color}28`, background: `${p.color}06` }}>
                        <div className="psp-qcta-text">
                            <div className="psp-qcta-title">Want a free demo?</div>
                            <div className="psp-qcta-sub">See {p.name} live — no commitment.</div>
                        </div>
                        <a href="/contact" className="psp-qcta-btn" style={{ background: p.color }}>
                            Book Demo <FiArrowRight />
                        </a>
                    </div>
                </div>
            </div>

            {/* ── Stats ── */}
            <div ref={statsRef} className="sp-stats-strip psp-stats">
                {p.stats.map((s, i) => (
                    <div key={s.lbl} className="sp-stat-card psp-stat" style={{ "--delay": `${i * 0.08}s` }}>
                        <span className="sp-stat-val" style={{ color: p.color }}>{s.val}</span>
                        <span className="sp-stat-lbl">{s.lbl}</span>
                    </div>
                ))}
            </div>

            {/* ───────────────────────────────────────
          GALLERY
      ─────────────────────────────────────── */}
            <div ref={galleryRef} className="psp-section">
                <div className="sp-section-header">
                    <div className="sp-pill" style={{ background: `${p.color}10`, borderColor: `${p.color}40`, color: p.color }}>
                        Gallery
                    </div>
                    <h2 className="sp-section-title">
                        Product <span className="sp-hl" style={{ color: p.color }}>Screenshots</span>
                    </h2>
                    <p className="sp-section-sub">
                        A visual walkthrough of every major screen in {p.name}.
                    </p>
                </div>
                <div className="psp-gallery-grid dp-visible">
                    {p.gallery.map((g, i) => (
                        <ScreenCard key={g.label} item={g} color={p.color} i={i} />
                    ))}
                </div>
            </div>

            {/* ───────────────────────────────────────
          PRICING
      ─────────────────────────────────────── */}
            <div ref={pricingRef} className="psp-section">
                <div className="sp-section-header sp-center">
                    <div className="sp-pill" style={{ background: `${p.color}10`, borderColor: `${p.color}40`, color: p.color }}>
                        Pricing
                    </div>
                    <h2 className="sp-section-title">
                        {p.name} <span className="sp-hl" style={{ color: p.color }}>Plans</span>
                    </h2>
                    <p className="sp-section-sub">Transparent pricing — no hidden charges. Cancel anytime after 3 months.</p>
                </div>
                <div className="dp-pcard-grid dp-visible">
                    {finalPricing.map((pl, i) => (
                        <PricingCard key={pl.name} p={pl} color={p.color} delay={`${i * 0.1}s`} />
                    ))}
                </div>

                <div className="psp-cta-btns">
                    <a href="tel:+917860291285" className="psp-cta-consult">
                        Get Free Consult <FiPhone />
                    </a>
                    <a href={p.path || "/products"} className="psp-cta-details">
                        View Details <FiArrowRight />
                    </a>
                </div>
            </div>

        </div>
    )
}

/* ══════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════ */
export default function ProductShowcasePage() {
    const [active, setActive] = useState(0)
    const [display, setDisplay] = useState(0)
    const [animating, setAnim] = useState(false)
    const panelRef = useRef(null)
    const tabsRef = useRef(null)
    const { getProductPrice } = usePricing()

    const getDynamicPricing = (productId) => {
        const pricingMap = {
            tripaxis: { starter: 'hospital', growth: 'hospital', enterprise: 'hospital' },
            axsemai: { starter: 'aiAutomation', growth: 'aiAutomation', enterprise: 'aiAutomation' },
            eduschool: { starter: 'school', growth: 'school', premium: 'school' },
            hrmpro: { starter: 'hr', growth: 'hr', enterprise: 'hr' },
            safal: { starter: 'ngo', growth: 'ngo', premium: 'ngo' },
            stayinn: { starter: 'hotel', growth: 'hotel', fullSuite: 'hotel' },
            foodpulse: { starter: 'restaurant', growth: 'restaurant', chain: 'restaurant' },
            propcare: { starter: 'realEstate', growth: 'realEstate', enterprise: 'realEstate' },
            crmpro: { starter: 'crm', growth: 'crm', scale: 'crm' },
        }
        
        const map = pricingMap[productId]
        if (!map) return null
        
        const tiers = {}
        Object.keys(map).forEach(tier => {
            const priceData = getProductPrice(map[tier], tier)
            if (priceData) tiers[tier] = priceData
        })
        return tiers
    }

    const currentProduct = PRODUCTS[display]
    const currentDynamicPricing = currentProduct ? getDynamicPricing(currentProduct.id) : null

    const switchTo = (idx) => {
        if (idx === active || animating) return
        setAnim(true)
        const panel = panelRef.current
        if (panel) panel.classList.add("psp-exit")
        setTimeout(() => {
            setDisplay(idx)
            setActive(idx)
            if (panel) {
                panel.classList.remove("psp-exit")
                panel.classList.add("psp-enter")
                setTimeout(() => panel.classList.remove("psp-enter"), 400)
            }
            setAnim(false)
            /* Scroll tabs button into view on mobile */
            const btn = tabsRef.current?.querySelectorAll(".psp-tab-btn")[idx]
            btn?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })
        }, 200)
    }

    const p = PRODUCTS[active]

    return (
        <div className="sp-page dp-page">
            <PageHero
                breadcrumbs={[{ label: "Products", }]}
                pill="Our Products"
                title={<>Built for India,<br /><span className="ph-gradient">Loved by Businesses</span></>}
                subtitle="9 industry-specific SaaS products — explore features, see the UI, understand pricing, and connect with us."
                tag="9 Products · 500+ Businesses · 6+ Years"
            />

            <div className="sp-body dp-body">

                {/* Decorative cubes */}
                <div className="dp-cubes" aria-hidden>
                    <div className="dp-cube dp-c1" /><div className="dp-cube dp-c2" /><div className="dp-cube dp-c3" />
                </div>

                {/* ─────────────────────────────────────
            HORIZONTAL PRODUCT TAB BAR
        ───────────────────────────────────── */}
                <div className="psp-tabs-wrap">
                    <div className="psp-tabs" ref={tabsRef}>
                        {PRODUCTS.map((prod, i) => (
                            <button
                                key={prod.id}
                                className={`psp-tab-btn ${active === i ? "psp-tab-on" : ""}`}
                                style={active === i ? { "--accent": prod.color } : {}}
                                onClick={() => switchTo(i)}
                            >
                                <span className="psp-tab-icon" style={active === i ? { background: `${prod.color}18`, color: prod.color } : {}}>
                                    {prod.icon}
                                </span>
                                <span className="psp-tab-texts">
                                    <span className="psp-tab-name">{prod.name}</span>
                                    <span className="psp-tab-cat">{prod.short}</span>
                                </span>
                                {active === i && (
                                    <span className="psp-tab-bar" style={{ background: prod.color }} />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ─────────────────────────────────────
            PANEL CONTENT
        ───────────────────────────────────── */}
                <div ref={panelRef} className="psp-panel-wrap">
                    <ProductPanel key={display} product={PRODUCTS[display]} dynamicPricing={currentDynamicPricing} />
                </div>

            </div>
        </div>
    )
} 
