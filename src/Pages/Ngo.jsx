import { useState, useEffect, useRef } from "react"
import {
    FiHeart, FiUsers, FiTarget, FiFileText, FiGlobe, FiShield,
    FiArrowRight, FiPlus, FiZap, FiDollarSign, FiClipboard,
    FiBarChart2, FiAward, FiBell, FiLock,
} from "react-icons/fi"
import PageHero from "../Components/PageHero"
import "../Styles/heroSoftware.css"
import Ngo2Img from "../assets/erp.jpeg"

/* ── animation hook ── */
function useReveal() {
    const ref = useRef(null)
    useEffect(() => {
        const el = ref.current; if (!el) return
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) el.classList.add("sp-revealed") },
            { threshold: 0, rootMargin: "0px 0px -40px 0px" }
        )
        obs.observe(el); return () => obs.disconnect()
    }, [])
    return ref
}

/* ── FAQ ── */
function FaqItem({ q, a }) {
    const [open, setOpen] = useState(false)
    return (
        <div className={`sp-faq-item${open ? " sp-faq-open" : ""}`}>
            <button className="sp-faq-q" onClick={() => setOpen(!open)}>
                <span>{q}</span>
                <FiPlus className="sp-faq-icon" />
            </button>
            <div className="sp-faq-a">{a}</div>
        </div>
    )
}

/* ══════════ DATA ══════════ */
const stats = [
    { val: "30+", lbl: "NGOs Onboarded" },
    { val: "₹8Cr+", lbl: "Donations Tracked" },
    { val: "80G", lbl: "Auto Receipts" },
    { val: "FCRA", lbl: "Compliant" },
]

const features = [
    {
        icon: <FiDollarSign />,
        title: "Donor Management & CRM",
        desc: "Complete donor profiles, full donation history, giving trends, auto-segmentation, and personalised communication pipelines.",
    },
    {
        icon: <FiFileText />,
        title: "80G Receipt Automation",
        desc: "Every donation instantly triggers a branded 80G receipt via email — with PDF archive and bulk download for audits.",
    },
    {
        icon: <FiTarget />,
        title: "Project & Milestone Tracking",
        desc: "Break projects into milestones, assign field teams, track budgets vs actuals, and view real-time completion dashboards.",
    },
    {
        icon: <FiUsers />,
        title: "Volunteer Management",
        desc: "Register volunteers, manage event assignments, track hours logged, auto-issue certificates, and send appreciation emails.",
    },
    {
        icon: <FiGlobe />,
        title: "Grant & Fund Management",
        desc: "Track grant applications, approval status, donor-restricted fund utilisation, and generate compliance utilisation reports.",
    },
    {
        icon: <FiShield />,
        title: "FCRA Compliance",
        desc: "Separate domestic and foreign fund ledgers with audit-ready FCRA-3B and FCRA-6 reports ready for Ministry of Home Affairs.",
    },
    {
        icon: <FiBarChart2 />,
        title: "Impact Reporting",
        desc: "Auto-generate beneficiary reports, programme summaries, and annual impact reports formatted for donors and regulators.",
    },
    {
        icon: <FiBell />,
        title: "Donation Portal & Alerts",
        desc: "Branded online donation page with UPI / card / net-banking, real-time payment alerts, and instant receipt delivery.",
    },
    {
        icon: <FiClipboard />,
        title: "Expense & Audit Trail",
        desc: "Log all project expenses with bill uploads, approvals workflow, and a tamper-proof audit trail for board review.",
    },
]

const steps = [
    { num: "01", title: "Org Setup", desc: "Configure NGO profile, fund heads, programmes & tax details" },
    { num: "02", title: "Donor Import", desc: "Migrate existing donor database and full donation history" },
    { num: "03", title: "Project Config", desc: "Set up active projects, milestones, budgets & teams" },
    { num: "04", title: "80G Templates", desc: "Configure receipt templates, e-sign & automation rules" },
    { num: "05", title: "Team Training", desc: "Live training session with workflow documentation handover" },
    { num: "06", title: "Go Live", desc: "Full platform live with dedicated compliance support" },
]

const techStack = [
    { cat: "Frontend", items: ["React", "Next.js", "PWA"] },
    { cat: "Backend", items: ["Django", "PostgreSQL", "Redis"] },
    { cat: "Payments", items: ["Razorpay", "UPI", "NEFT", "RTGS"] },
    { cat: "Infra", items: ["AWS S3", "SendGrid", "Cloudflare"] },
]

const compliance = [
    { icon: <FiShield />, label: "FCRA Compliant", sub: "Foreign & domestic fund separation" },
    { icon: <FiAward />, label: "80G Certified", sub: "Auto receipt generation & archival" },
    { icon: <FiLock />, label: "Data Security", sub: "AES-256 encryption at rest & transit" },
    { icon: <FiFileText />, label: "Audit Ready", sub: "Tamper-proof logs for board review" },
]

const faqs = [
    {
        q: "Does it generate 80G receipts automatically?",
        a: "Yes. Every donation — online or cash — triggers an auto-generated, digitally signed 80G receipt sent to the donor instantly via email, with a PDF stored in your archive.",
    },
    {
        q: "Is it fully FCRA compliant?",
        a: "Yes. Completely separate ledgers for domestic and foreign contributions, with FCRA-3B and FCRA-6 utilisation reports pre-formatted and ready for Ministry of Home Affairs filing.",
    },
    {
        q: "Can donors donate online through the system?",
        a: "Yes. A white-label donor portal allows online donations via UPI, debit/credit card, and net banking — with instant 80G receipt and payment confirmation.",
    },
    {
        q: "How long does setup take?",
        a: "Most NGOs are fully live within 10–14 days. We handle data migration, template setup, and conduct a live training session with your team before go-live.",
    },
    {
        q: "Can we track in-kind donations?",
        a: "Yes. In-kind donation tracking with estimated valuation, item classification, and inclusion in annual impact reports and donor acknowledgements is fully supported.",
    },
    {
        q: "Is there a mobile app for field teams?",
        a: "Yes. A PWA-based mobile app lets field teams log beneficiaries, upload expense bills, update project milestones, and record attendance — all offline-capable.",
    },
]

/* ══════════ COMPONENT ══════════ */
export default function NgoManagementPage() {
    const statsRef = useReveal()
    const overviewRef = useReveal()
    const compRef = useReveal()
    const featRef = useReveal()
    const stepsRef = useReveal()
    const techRef = useReveal()
    const faqRef = useReveal()

    return (
        <div className="sp-page">
            <PageHero
                breadcrumbs={[{ label: "Products", href: "/products" }, { label: "NGO Management" }]}
                pill="NGO Management Software"
                title={<>Complete NGO Platform for<br /><span className="ph-gradient">Donors, Projects & Compliance</span></>}
                subtitle="Donor CRM, 80G receipt automation, project tracking, volunteer management, and FCRA-ready fund accounting — purpose-built for Indian non-profits."
                tag="FCRA Compliant · 80G Automation · Donor Portal Included"
            />

            <div className="sp-body">

                {/* ── Stats Strip ── */}
                <div className="sp-stats-strip sp-anim" ref={statsRef}>
                    {stats.map((s, i) => (
                        <div key={s.lbl} className="sp-stat-card" style={{ "--delay": `${i * 0.08}s` }}>
                            <span className="sp-stat-val">{s.val}</span>
                            <span className="sp-stat-lbl">{s.lbl}</span>
                        </div>
                    ))}
                </div>

                {/* ── Overview ── */}
                <div className="sp-overview-grid sp-anim" ref={overviewRef}>
                    <div className="sp-overview-text">
                        <h2 className="sp-overview-title">
                            Focus on Your Mission,<br />
                            <span className="sp-hl">Not on Spreadsheets</span>
                        </h2>
                        <p className="sp-overview-para">
                            Most NGOs waste 30–40% of staff time on manual donor acknowledgements,
                            FCRA reports, and impact documentation. NGOAxis automates all of it — so
                            your team spends that time on programmes, not paperwork.
                        </p>
                        <ul className="sp-checklist">
                            {[
                                "Auto 80G receipt on every donation — online and offline",
                                "Separate FCRA domestic & foreign fund ledgers with one-click reports",
                                "Project milestone tracking with real-time budget vs actual dashboards",
                                "Branded donor portal with UPI / card / net-banking support",
                                "Volunteer hour tracking with auto-certificate generation",
                            ].map(item => (
                                <li key={item}>
                                    <span className="sp-check-icon">✓</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
                            <a href="/contact" className="sp-btn-primary">
                                Book a Free Demo <FiArrowRight />
                            </a>
                            <a href="/projects" className="sp-btn-primary"
                                style={{ background: "var(--sp-white)", color: "var(--sp-orange)", border: "1.5px solid var(--sp-orange)" }}>
                                View Case Studies <FiArrowRight />
                            </a>
                        </div>
                    </div>

                    {/* Software UI mockup — no image */}
                    <div className="sp-overview-visual">
                        <div className="sp-visual-box">
                            <div className="sp-dash-mock">
                                <div className="sp-dm-topbar">
                                    <span className="sp-dm-dot sp-dm-d1" />
                                    <span className="sp-dm-dot sp-dm-d2" />
                                    <span className="sp-dm-dot sp-dm-d3" />
                                    <span className="sp-dm-title">NGOAxis Dashboard</span>
                                </div>
                                <div className="sp-dm-grid">
                                    <div className="sp-dm-kpi sp-dm-kpi-orange">
                                        <span className="sp-dm-kval">₹2.4L</span>
                                        <span className="sp-dm-klbl">This Month</span>
                                    </div>
                                    <div className="sp-dm-kpi">
                                        <span className="sp-dm-kval">142</span>
                                        <span className="sp-dm-klbl">Active Donors</span>
                                    </div>
                                    <div className="sp-dm-kpi">
                                        <span className="sp-dm-kval">8</span>
                                        <span className="sp-dm-klbl">Projects Live</span>
                                    </div>
                                    <div className="sp-dm-kpi">
                                        <span className="sp-dm-kval">97%</span>
                                        <span className="sp-dm-klbl">FCRA Filed</span>
                                    </div>
                                </div>
                                <div className="sp-dm-row">
                                    <div className="sp-dm-bar-wrap">
                                        <span className="sp-dm-bar-lbl">Education Fund</span>
                                        <div className="sp-dm-bar"><div className="sp-dm-bar-fill" style={{ width: "78%" }} /></div>
                                        <span className="sp-dm-bar-pct">78%</span>
                                    </div>
                                    <div className="sp-dm-bar-wrap">
                                        <span className="sp-dm-bar-lbl">Health Programme</span>
                                        <div className="sp-dm-bar"><div className="sp-dm-bar-fill" style={{ width: "55%" }} /></div>
                                        <span className="sp-dm-bar-pct">55%</span>
                                    </div>
                                    <div className="sp-dm-bar-wrap">
                                        <span className="sp-dm-bar-lbl">Relief Fund (FCRA)</span>
                                        <div className="sp-dm-bar"><div className="sp-dm-bar-fill" style={{ width: "91%" }} /></div>
                                        <span className="sp-dm-bar-pct">91%</span>
                                    </div>
                                </div>
                            </div>
                            <img src={Ngo2Img} alt="NGO Software" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0, opacity: 0.3 }} />
                        </div>
                        <div className="sp-visual-badge sp-vb-1">
                            <FiShield style={{ color: "var(--sp-orange)" }} /> FCRA Ready
                        </div>
                        <div className="sp-visual-badge sp-vb-2">
                            <FiZap style={{ color: "var(--sp-orange)" }} /> 80G Instant
                        </div>
                    </div>
                </div>

                {/* ── Compliance Strip ── */}
                <div>
                    <div className="sp-section-header">
                        <div className="sp-pill">Compliance</div>
                        <h2 className="sp-section-title">
                            Built for <span className="sp-hl">Indian Regulatory Standards</span>
                        </h2>
                        <p className="sp-section-sub">
                            Every feature is designed around the compliance requirements Indian NGOs actually face.
                        </p>
                    </div>
                    <div className="sp-cards-grid sp-cols-4 sp-anim" ref={compRef}>
                        {compliance.map((c, i) => (
                            <div key={c.label} className="sp-card" style={{ "--delay": `${i * 0.08}s` }}>
                                <div className="sp-card-icon">{c.icon}</div>
                                <h3 className="sp-card-title">{c.label}</h3>
                                <p className="sp-card-desc">{c.sub}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Features ── */}
                <div>
                    <div className="sp-section-header">
                        <div className="sp-pill">Features</div>
                        <h2 className="sp-section-title">
                            Everything Your NGO <span className="sp-hl">Needs in One Place</span>
                        </h2>
                        <p className="sp-section-sub">
                            From the first donor acknowledgement to the final FCRA filing — all in one platform.
                        </p>
                    </div>
                    <div className="sp-cards-grid sp-cols-3 sp-anim" ref={featRef}>
                        {features.map((f, i) => (
                            <div key={f.title} className="sp-card" style={{ "--delay": `${i * 0.07}s` }}>
                                <div className="sp-card-icon">{f.icon}</div>
                                <h3 className="sp-card-title">{f.title}</h3>
                                <p className="sp-card-desc">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Steps ── */}
                <div>
                    <div className="sp-section-header sp-center">
                        <div className="sp-pill">Onboarding</div>
                        <h2 className="sp-section-title">
                            Live in <span className="sp-hl">2 Weeks</span>
                        </h2>
                        <p className="sp-section-sub">
                            Simple, structured onboarding — we handle data migration and training so your team hits the ground running.
                        </p>
                    </div>
                    <div className="sp-steps-grid sp-anim" ref={stepsRef}>
                        {steps.map((s, i) => (
                            <div key={s.num} className="sp-step" style={{ "--delay": `${i * 0.08}s` }}>
                                <div className="sp-step-num"><span>{s.num}</span></div>
                                <div className="sp-step-title">{s.title}</div>
                                <div className="sp-step-desc">{s.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Tech Stack ── */}
                <div>
                    <div className="sp-section-header">
                        <div className="sp-pill">Tech Stack</div>
                        <h2 className="sp-section-title">
                            Built on <span className="sp-hl">Proven Technology</span>
                        </h2>
                    </div>
                    <div className="sp-tech-grid sp-anim" ref={techRef}>
                        {techStack.map((t, i) => (
                            <div key={t.cat} className="sp-tech-card" style={{ "--delay": `${i * 0.08}s` }}>
                                <span className="sp-tech-cat">{t.cat}</span>
                                <div className="sp-tech-items">
                                    {t.items.map(item => (
                                        <span key={item} className="sp-tech-item">{item}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── FAQ ── */}
                <div>
                    <div className="sp-section-header">
                        <div className="sp-pill">FAQ</div>
                        <h2 className="sp-section-title">
                            Common <span className="sp-hl">Questions</span>
                        </h2>
                    </div>
                    <div className="sp-faq-list sp-anim" ref={faqRef}>
                        {faqs.map((f, i) => (
                            <div key={i} style={{ "--delay": `${i * 0.06}s` }}>
                                <FaqItem q={f.q} a={f.a} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── CTA ── */}
                <div className="sp-cta">
                    <div className="sp-pill" style={{ marginBottom: 20 }}>Get Started</div>
                    <h2 className="sp-cta-title">Let's Help Your NGO Do More with Less</h2>
                    <p className="sp-cta-sub">
                        Book a free demo and see how NGOAxis saves your team 10+ hours every week on reporting and compliance.
                    </p>
                    <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                        <a href="/contact" className="sp-btn-primary">
                            Book Free NGO Demo <FiArrowRight />
                        </a>
                        <a href="/projects" className="sp-btn-primary"
                        >
                            View Our Work <FiArrowRight />
                        </a>
                    </div>
                </div>

            </div>
        </div>
    )
}