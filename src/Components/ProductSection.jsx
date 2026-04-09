import { useEffect, useRef, useState } from "react"
import {
    FiArrowUpRight, FiZap, FiUsers, FiBookOpen, FiShoppingBag,
    FiHome, FiCoffee, FiMap, FiTrendingUp, FiCpu, FiBarChart2, FiBriefcase,
} from "react-icons/fi"
import "../Styles/ProductSection.css"

/* ── Scroll reveal ── */
function useReveal(threshold = 0.1) {
    const ref = useRef(null)
    useEffect(() => {
        const el = ref.current; if (!el) return
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) el.classList.add("prd-revealed") },
            { threshold }
        )
        obs.observe(el)
        return () => obs.disconnect()
    }, [])
    return ref
}

/* ── Products data ── */
const PRODUCTS = [
    {
        id: "tour-travel", name: "TripAxis",
        tagline: "Complete Tour & Travel Management",
        desc: "End-to-end booking, itinerary, billing & GST filing for travel agencies.",
        path: "/products/tour-booking", icon: <FiMap />,
        color: "#f05a28", category: "Industry", tag: "50+ Agencies",
    },
    {
        id: "ai", name: "AxsemAI",
        tagline: "AI-Powered Automation Suite",
        desc: "Automate repetitive tasks, parse documents & generate insights with AI.",
        path: "/products/ai-solutions", icon: <FiCpu />,
        color: "#6b3fa0", category: "Business", tag: "30+ Automations",
    },
    {
        id: "school", name: "SchoolAxis",
        tagline: "Complete School Management System",
        desc: "Admissions, attendance, fee collection, report cards & parent portal.",
        path: "/products/school-management", icon: <FiBookOpen />,
        color: "#0e9e6e", category: "Education", tag: "15k+ Students",
    },
    {
        id: "hr-payroll", name: "PeopleAxis",
        tagline: "HR & Payroll for Growing Companies",
        desc: "PF, ESI, TDS auto-calculations with leave & attendance tracking.",
        path: "/products/hr-payroll", icon: <FiUsers />,
        color: "#3d3d9e", category: "Business", tag: "50k+ Employees",
    },
    {
        id: "ngo", name: "NGOAxis",
        tagline: "Management Software for NGOs",
        desc: "FCRA compliance, donor management, project tracking & fund reporting.",
        path: "/products/ngo", icon: <FiTrendingUp />,
        color: "#e63b2a", category: "Industry", tag: "FCRA Compliant",
    },
    {
        id: "hotel", name: "HotelAxis",
        tagline: "Hotel & Property Management System",
        desc: "Room booking, housekeeping, billing & OTA channel management in one.",
        path: "/products/real-estate", icon: <FiHome />,
        color: "#f5a623", category: "Industry", tag: "40+ Properties",
    },
    {
        id: "food", name: "FoodAxis",
        tagline: "Restaurant & Food Business Platform",
        desc: "POS, KOT, table management, delivery integration & GST billing.",
        path: "/products/ecommerce", icon: <FiCoffee />,
        color: "#e63b2a", category: "Industry", tag: "60+ Restaurants",
    },
    {
        id: "real-estate", name: "PropAxis",
        tagline: "Real Estate CRM & Property Software",
        desc: "Lead tracking, site visits, agreements, registry & payment schedule.",
        path: "/products/real-estate", icon: <FiBarChart2 />,
        color: "#3d3d9e", category: "Industry", tag: "₹500Cr+ Properties",
    },
    {
        id: "lms", name: "LearnAxis",
        tagline: "Learning Management System",
        desc: "Course builder, live classes, assessments & progress analytics.",
        path: "/products/lms", icon: <FiBookOpen />,
        color: "#0e9e6e", category: "Education", tag: "50k+ Students",
    },
    {
        id: "ecommerce", name: "ShopAxis",
        tagline: "Complete E-Commerce Platform",
        desc: "Multi-vendor store, payment gateway, shipping & inventory in one.",
        path: "/products/ecommerce", icon: <FiShoppingBag />,
        color: "#f05a28", category: "Business", tag: "100+ Stores",
    },
    {
        id: "crm", name: "CRMAxis",
        tagline: "CRM for Sales Teams",
        desc: "Pipeline, follow-ups, quotations & performance dashboard for teams.",
        path: "/products/crm", icon: <FiBriefcase />,
        color: "#6b3fa0", category: "Business", tag: "300+ Sales Teams",
    },
    {
        id: "hrm", name: "HRMAxis",
        tagline: "Full Human Resource Management",
        desc: "Recruitment, onboarding, appraisals & full HRMS for scaling companies.",
        path: "/products/hrm", icon: <FiZap />,
        color: "#3d3d9e", category: "Business", tag: "200+ Companies",
    },
]

const TABS = ["All", "Business", "Industry", "Education"]

/* ── Sliding ink tab bar ── */
function TabBar({ active, onChange }) {
    const inkRef = useRef(null)
    const barRef = useRef(null)
    const btnRefs = useRef([])

    useEffect(() => {
        const idx = TABS.indexOf(active)
        const btn = btnRefs.current[idx]
        const bar = barRef.current
        const ink = inkRef.current
        if (!btn || !bar || !ink) return
        const bRect = bar.getBoundingClientRect()
        const bBtn = btn.getBoundingClientRect()
        ink.style.left = `${bBtn.left - bRect.left}px`
        ink.style.width = `${bBtn.width}px`
    }, [active])

    return (
        <div ref={barRef} className="prd-tabbar">
            <div ref={inkRef} className="prd-tab-ink" />
            {TABS.map((t, i) => {
                const count = t === "All" ? PRODUCTS.length : PRODUCTS.filter(p => p.category === t).length
                return (
                    <button
                        key={t}
                        ref={el => (btnRefs.current[i] = el)}
                        className={`prd-tab ${active === t ? "prd-tab-on" : ""}`}
                        onClick={() => onChange(t)}
                    >
                        {t}
                        <span className="prd-tab-badge">{count}</span>
                    </button>
                )
            })}
        </div>
    )
}

/* ── Product card ── */
function ProductCard({ p, i }) {
    const ref = useRef(null)
    const [vis, setVis] = useState(false)

    useEffect(() => {
        const el = ref.current; if (!el) return
        const io = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setVis(true) },
            { threshold: 0.06 }
        )
        io.observe(el)
        return () => io.disconnect()
    }, [])

    return (
        <a
            ref={ref}
            href={p.path}
            className={`prd-card ${vis ? "prd-card-vis" : ""}`}
            style={{ "--accent": p.color, "--i": i }}
        >
            {/* Radial glow — blooms outward on hover */}
            <div className="prd-glow" />

            {/* Top shimmer line */}
            <div className="prd-shimmer" />

            {/* Icon */}
            <div className="prd-icon-wrap">
                <div className="prd-icon-ring" />
                <div className="prd-icon-box">{p.icon}</div>
            </div>

            {/* Text content */}
            <div className="prd-content">
                <div className="prd-top-row">
                    <h3 className="prd-name">{p.name}</h3>
                    <span className="prd-tag">{p.tag}</span>
                </div>
                <p className="prd-tagline">{p.tagline}</p>
                <p className="prd-desc">{p.desc}</p>
            </div>

            {/* Arrow */}
            <div className="prd-arrow">
                <FiArrowUpRight />
            </div>

            {/* Bottom bar */}
            <div className="prd-foot-bar" />
        </a>
    )
}

/* ── Stats ── */
const STATS = [
    { val: "12+", lbl: "Software Products" },
    { val: "500+", lbl: "Businesses Powered" },
    { val: "6+", lbl: "Years of Development" },
    { val: "99%", lbl: "Client Retention" },
]

export default function ProductsSection() {
    const [tab, setTab] = useState("All")
    const headerRef = useReveal()
    const statsRef = useReveal(0.1)

    const filtered = tab === "All" ? PRODUCTS : PRODUCTS.filter(p => p.category === tab)

    return (
        <section className="prd-section">

            <div className="prd-bg" aria-hidden>
                <div className="prd-orb prd-orb-1" />
                <div className="prd-orb prd-orb-2" />
                <div className="prd-orb prd-orb-3" />
                <div className="prd-grid-lines" />
            </div>

            <div className="prd-container">

                {/* Header */}
                <div className="prd-header" ref={headerRef}>
                    <div className="prd-eyebrow">
                        <span className="prd-dot-pulse" />
                        Our Products
                        <span className="prd-eyebrow-rule" />
                    </div>
                    <h2 className="prd-heading">
                        Software Built for
                        <br />
                        <span className="prd-hl">Every Industry</span>
                    </h2>
                    <p className="prd-sub">
                        12 industry-specific SaaS products — built, deployed, and supported by Axsem Softwares.
                        Ready to use, or customised to your exact workflow.
                    </p>
                </div>

                {/* Tabs */}
                <div className="prd-tab-row">
                    <TabBar active={tab} onChange={setTab} />
                </div>

                {/* Cards */}
                <div className="prd-grid">
                    {filtered.map((p, i) => <ProductCard key={p.id} p={p} i={i} />)}
                </div>

                {/* Stats */}
                <div className="prd-stats" ref={statsRef}>
                    {STATS.map((s, i) => (
                        <div key={s.lbl} className="prd-stat" style={{ "--i": i }}>
                            <span className="prd-stat-val">{s.val}</span>
                            <span className="prd-stat-lbl">{s.lbl}</span>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="prd-cta">
                    <a href="/product" className="prd-btn-primary">
                        Explore the Product Gallery <FiArrowUpRight />
                    </a>
                    <a href="/contact" className="prd-btn-ghost">
                        Request a Demo <FiArrowUpRight />
                    </a>
                </div>

            </div>
        </section>
    )
}