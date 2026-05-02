import { useEffect, useRef, useState } from "react"
import { FiArrowRight, FiExternalLink, FiLayers, FiTrendingUp, FiPlus } from "react-icons/fi"
import { api } from "../services/api"
import "../Styles/Portfolio.css"

function useReveal(threshold = 0.08) {
    const ref = useRef(null)
    useEffect(() => {
        const el = ref.current; if (!el) return
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) el.classList.add("revealed") },
            { threshold }
        )
        obs.observe(el); return () => obs.disconnect()
    }, [])
    return ref
}

const PROJECTS = [
    {
        id: 1, size: "large",
        tag: "ERP System", title: "RetailFlow ERP",
        desc: "End-to-end ERP for a 12-branch retail chain — inventory, billing, HR, and real-time analytics unified in one dashboard.",
        stack: ["React", "Node.js", "PostgreSQL", "Redis"],
        color: "#f05a28",
        metrics: [{ val: "40%", lbl: "Faster Ops" }, { val: "3×", lbl: "Revenue" }],
        path: "/projects",
    },
    {
        id: 2, size: "small",
        tag: "Mobile App", title: "SwiftDeliver",
        desc: "On-demand delivery app with live tracking, driver management, and customer portal.",
        stack: ["Flutter", "Firebase", "Google Maps"],
        color: "#3d3d9e",
        metrics: [{ val: "50K+", lbl: "Downloads" }, { val: "4.8★", lbl: "Rating" }],
        path: "/projects",
    },
    {
        id: 3, size: "small",
        tag: "SaaS Platform", title: "HireBoard ATS",
        desc: "Applicant tracking system with AI resume parsing, interview scheduling, and pipeline analytics.",
        stack: ["Next.js", "PostgreSQL", "AWS", "Python"],
        color: "#6b3fa0",
        metrics: [{ val: "200+", lbl: "Companies" }, { val: "60%", lbl: "Time Saved" }],
        path: "/projects",
    },
    {
        id: 4, size: "large",
        tag: "Travel Software", title: "TripAxis Live",
        desc: "Full tour & travel management platform deployed for 50+ agencies — packages, bookings, vouchers, and B2B portal.",
        stack: ["React", "Node.js", "Razorpay", "AWS"],
        color: "#0e9e6e",
        metrics: [{ val: "10K+", lbl: "Bookings" }, { val: "50+", lbl: "Agencies" }],
        path: "/products/tour-travel",
    },
    {
        id: 5, size: "small",
        tag: "School ERP", title: "SchoolAxis",
        desc: "School management system for 30+ schools covering admissions, fees, attendance, and parent app.",
        stack: ["React Native", "Node.js", "PostgreSQL"],
        color: "#e63b2a",
        metrics: [{ val: "15K+", lbl: "Students" }, { val: "80%", lbl: "Less Paperwork" }],
        path: "/products/school",
    },
    {
        id: 6, size: "small",
        tag: "E-Commerce", title: "LuxCart Marketplace",
        desc: "Multi-vendor luxury marketplace with custom checkout, vendor dashboards, and OTP login.",
        stack: ["Next.js", "Stripe", "Node.js", "AWS S3"],
        color: "#f5a623",
        metrics: [{ val: "₹2Cr+", lbl: "GMV" }, { val: "99.9%", lbl: "Uptime" }],
        path: "/projects",
    },
    {
        id: 7, size: "small",
        tag: "Healthcare", title: "MediCare+",
        desc: "Telemedicine platform with video consultations, appointment booking, and prescription management.",
        stack: ["React", "Node.js", "MongoDB", "Twilio"],
        color: "#0ea5e9",
        metrics: [{ val: "5K+", lbl: "Consults" }, { val: "100+", lbl: "Doctors" }],
        path: "/projects",
    },
    {
        id: 8, size: "large",
        tag: "CRM Software", title: "SalesForce Pro",
        desc: "Enterprise CRM with lead pipeline, analytics dashboard, and automation workflows.",
        stack: ["React", "Node.js", "MongoDB", "Chart.js"],
        color: "#8b5cf6",
        metrics: [{ val: "35%", lbl: "Sales ↑" }, { val: "2×", lbl: "Productivity" }],
        path: "/projects",
    },
    {
        id: 9, size: "small",
        tag: "LMS", title: "LearnAxis",
        desc: "Learning management system with course builder, live classes, and certification.",
        stack: ["React", "Node.js", "MongoDB", "Zoom API"],
        color: "#14b8a6",
        metrics: [{ val: "50K+", lbl: "Students" }, { val: "500+", lbl: "Courses" }],
        path: "/products/lms",
    },
    {
        id: 10, size: "small",
        tag: "NGO Platform", title: "DonorAxis",
        desc: "FCRA-compliant NGO management with donor tracking, 80G certificates, and fund reports.",
        stack: ["React", "Node.js", "PostgreSQL", "Razorpay"],
        color: "#f43f5e",
        metrics: [{ val: "₹10Cr+", lbl: "Funds Raised" }, { val: "1K+", lbl: "Donors" }],
        path: "/products/ngo",
    },
    {
        id: 11, size: "small",
        tag: "Hotel Software", title: "HotelAxis",
        desc: "Property management with room booking, housekeeping tracking, and billing integration.",
        stack: ["React", "Node.js", "MongoDB", "Payment Gateway"],
        color: "#f59e0b",
        metrics: [{ val: "40%", lbl: "Bookings ↑" }, { val: "100+", lbl: "Properties" }],
        path: "/projects",
    },
    {
        id: 12, size: "large",
        tag: "AI Solutions", title: "AxsemAI",
        desc: "AI-powered automation for document parsing, data extraction, and intelligent analytics.",
        stack: ["Python", "OpenAI", "LangChain", "FastAPI"],
        color: "#a855f7",
        metrics: [{ val: "90%", lbl: "Accuracy" }, { val: "10×", lbl: "Faster" }],
        path: "/products/ai-solutions",
    },
]

const FILTERS_UNUSED = [] // Filters now built dynamically from API data

function ProjectCard({ p, i }) {
    const ref = useRef(null)
    useEffect(() => {
        const el = ref.current; if (!el) return
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) el.classList.add("revealed") },
            { threshold: 0.08 }
        )
        obs.observe(el); return () => obs.disconnect()
    }, [])

    // Support both API format and local format
    const tag = p.category || p.tag || ""
    const title = p.title || p.name || "Untitled"
    const desc = p.description || p.desc || ""
    const stack = p.technologies || p.stack || []
    const color = p.color || "#f05a28"
    const metrics = p.results || p.metrics || []
    const isLarge = p.featured || p.size === "large"
    const path = p.path || `/portfolio/${p._id || p.id || ""}`

    return (
        <a href={path} className={`pf-card ${isLarge ? "pf-large" : ""}`} ref={ref}
            style={{ "--delay": `${i * 0.1}s`, "--pf-color": color, "--accent": color }}>
            <div className="pf-thumb">
                <div className="pf-thumb-inner">
                    <div className="thumb-lines"><span /><span /><span /></div>
                    <div className="thumb-icon"><FiLayers /></div>
                </div>
                <div className="pf-overlay"><FiExternalLink /></div>
            </div>
            <div className="pf-content">
                <div className="pf-top">
                    <span className="pf-tag">{tag}</span>
                    <div className="pf-links">
                        {stack.slice(0, 2).map(s => (
                            <span key={s} className="pf-link-icon" title={s}>{s[0]}</span>
                        ))}
                    </div>
                </div>
                {metrics.length > 0 && (
                    <div className="pf-metrics">
                        {metrics.slice(0, 2).map((m, idx) => (
                            <div key={idx} className="pf-metric">
                                <span className="pf-metric-val">{m.val || m.metric || m.value}</span>
                                <span className="pf-metric-lbl">{m.lbl || m.label}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <h3 className="pf-title">{title}</h3>
            <p className="pf-desc">{desc}</p>
            {stack.length > 0 && (
                <div className="pf-stack">
                    {stack.map(s => <span key={s} className="pf-tech">{s}</span>)}
                </div>
            )}
        </a>
    )
}

export default function PortfolioSection() {
    const [filter, setFilter] = useState("All")
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const headerRef = useReveal()
    const ctaRef = useReveal(0.1)

    useEffect(() => {
        api.getPortfolio()
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    setProjects(data)
                } else {
                    setProjects([])
                }
            })
            .catch(() => setProjects([]))
            .finally(() => setLoading(false))
    }, [])

    // Build filter tabs from actual data
    const allTags = ["All", ...new Set(projects.map(p => p.category || p.tag).filter(Boolean))]

    const filtered = filter === "All"
        ? projects
        : projects.filter(p => (p.category || p.tag) === filter)

    // No data — render nothing (no empty space)
    if (!loading && projects.length === 0) return null

    return (
        <section className="pf-section">
            <div className="pf-bg" aria-hidden>
                <div className="pf-orb pf-orb-1" /><div className="pf-orb pf-orb-2" />
                <div className="pf-grid-overlay" />
            </div>

            <div className="pf-container">

                {/* Header */}
                <div className="pf-header" ref={headerRef}>
                    <div className="pf-eyebrow"><span className="pf-dot" /><FiTrendingUp /> Our Portfolio</div>
                    <h2 className="pf-heading">
                        Projects That<br /><span className="pf-heading-hl">Speak for Themselves</span>
                    </h2>
                    <p className="pf-subheading">
                        A sample of what we've built — scalable, impactful, and delivered on time across industries.
                    </p>
                </div>

                {/* Filter tabs */}
                {allTags.length > 1 && (
                    <div className="pf-filters">
                        {allTags.map(f => (
                            <button
                                key={f}
                                className={`pf-filter-btn${filter === f ? " active" : ""}`}
                                onClick={() => setFilter(f)}
                            >
                                <span>{f}</span>
                            </button>
                        ))}
                    </div>
                )}

                {/* Bento grid */}
                {loading ? (
                    <div className="pf-grid">
                        {[1,2,3,4].map(i => (
                            <div key={i} className="pf-skeleton" />
                        ))}
                    </div>
                ) : (
                    <div className="pf-grid">
                        {filtered.map((p, i) => <ProjectCard key={p._id || p.id || i} p={p} i={i} />)}
                    </div>
                )}

                {/* CTA */}
                <div className="pf-cta" ref={ctaRef}>
                    <a href="/portfolio" className="pf-cta-btn">
                        View All Projects <FiArrowRight />
                    </a>
                    <a href="/contact" className="pf-cta-outline">
                        <span>Start Your Project <FiArrowRight /></span>
                    </a>
                </div>

            </div>
        </section>
    )
}