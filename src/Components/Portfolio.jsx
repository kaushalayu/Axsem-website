import { useEffect, useRef, useState } from "react"
import { FiArrowRight, FiExternalLink, FiLayers, FiTrendingUp } from "react-icons/fi"
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
        metrics: [{ val: "40%", lbl: "Faster Operations" }, { val: "3×", lbl: "Revenue Growth" }],
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
        metrics: [{ val: "10K+", lbl: "Bookings/Month" }, { val: "50+", lbl: "Agencies" }],
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
        metrics: [{ val: "₹2Cr+", lbl: "GMV Monthly" }, { val: "99.9%", lbl: "Uptime" }],
        path: "/projects",
    },
]

const FILTERS = ["All", "ERP System", "Mobile App", "SaaS Platform", "Travel Software", "School ERP", "E-Commerce"]

function ProjectCard({ p, i }) {
    const ref = useRef(null)
    useEffect(() => {
        const el = ref.current; if (!el) return
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) el.classList.add("pf-card-in") },
            { threshold: 0.06 }
        )
        obs.observe(el); return () => obs.disconnect()
    }, [])

    return (
        <a
            ref={ref}
            href={p.path}
            className={`pf-card pf-${p.size}`}
            style={{ "--accent": p.color, "--delay": `${i * 0.09}s` }}
        >
            {/* Thumbnail */}
            <div className="pf-thumb">
                <div className="pf-thumb-inner">
                    <div className="pf-lines"><span /><span /><span /></div>
                    <div className="pf-thumb-icon"><FiLayers /></div>
                </div>
                <div className="pf-thumb-overlay">
                    <span className="pf-view-btn"><FiExternalLink /> View Project</span>
                </div>
            </div>

            {/* Body */}
            <div className="pf-body">
                <div className="pf-top-row">
                    <span className="pf-tag">{p.tag}</span>
                    <div className="pf-metrics">
                        {p.metrics.map(m => (
                            <div key={m.lbl} className="pf-metric">
                                <span className="pf-metric-val">{m.val}</span>
                                <span className="pf-metric-lbl">{m.lbl}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <h3 className="pf-title">{typeof p.title === 'string' ? p.title : 'Untitled'}</h3>
                <p className="pf-desc">{typeof p.desc === 'string' ? p.desc : ''}</p>
                <div className="pf-stack">
                    {p.stack.map(s => <span key={s} className="pf-tech">{s}</span>)}
                </div>
            </div>
        </a>
    )
}

export default function PortfolioSection() {
    const [filter, setFilter] = useState("All")
    const headerRef = useReveal()
    const ctaRef = useReveal(0.1)

    const filtered = filter === "All" ? PROJECTS : PROJECTS.filter(p => p.tag === filter)

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
                <div className="pf-filters">
                    {FILTERS.map(f => (
                        <button
                            key={f}
                            className={`pf-filter-btn${filter === f ? " active" : ""}`}
                            onClick={() => setFilter(f)}
                        >
                            <span>{f}</span>
                        </button>
                    ))}
                </div>

                {/* Bento grid */}
                <div className="pf-grid">
                    {filtered.map((p, i) => <ProjectCard key={p.id} p={p} i={i} />)}
                </div>

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