import { useState, useEffect, useRef } from "react"
import {
    FiCamera, FiCpu, FiUsers, FiBarChart2, FiShield,
    FiSmartphone, FiClock, FiArrowRight, FiPlus,
    FiZap, FiLock, FiBell, FiMapPin, FiCheckCircle,
} from "react-icons/fi"
import PageHero from "../Components/PageHero"
import "../Styles/heroSoftware.css"
import AttandImg from "../assets/erp.jpeg"

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
    { val: "99.4%", lbl: "Face Match Accuracy" },
    { val: "< 1s", lbl: "Recognition Speed" },
    { val: "Zero", lbl: "Proxy Attendance" },
    { val: "100%", lbl: "Payroll Auto-Sync" },
]

const features = [
    {
        icon: <FiCamera />,
        title: "AI Face Recognition",
        desc: "99.4% accurate face recognition marks attendance in under 1 second — works with masks, glasses, and varying lighting conditions.",
    },
    {
        icon: <FiMapPin />,
        title: "GPS Geo-Fencing",
        desc: "Define location boundaries — employees can only punch in when physically inside the designated office or site perimeter.",
    },
    {
        icon: <FiShield />,
        title: "Anti-Spoofing Technology",
        desc: "Liveness detection rejects photos, videos, and deepfakes — ensuring only the real person can mark attendance.",
    },
    {
        icon: <FiClock />,
        title: "Shift & Leave Management",
        desc: "Define multiple shifts, rotational rosters, and auto-calculate overtime. Leave requests flow through an approval workflow.",
    },
    {
        icon: <FiBarChart2 />,
        title: "Real-Time Analytics",
        desc: "Live dashboards show who's in, who's late, who's absent — with department-wise drill-downs and trend charts.",
    },
    {
        icon: <FiSmartphone />,
        title: "Mobile Punch-In",
        desc: "Remote employees mark attendance via selfie + GPS on the mobile app — accurate location verified in real time.",
    },
    {
        icon: <FiCpu />,
        title: "Payroll Integration",
        desc: "Attendance data auto-syncs to payroll — working days, OT hours, late deductions calculated without manual entry.",
    },
    {
        icon: <FiBell />,
        title: "Smart Alerts",
        desc: "Instant alerts to managers for late arrivals, unauthorised absences, or geo-fence violations — via app and email.",
    },
    {
        icon: <FiLock />,
        title: "Role-Based Access",
        desc: "HR, managers, and employees each see only what they need — full audit trail of every attendance event and override.",
    },
]

const steps = [
    { num: "01", title: "Device Setup", desc: "Install camera devices or configure mobile app for your team" },
    { num: "02", title: "Face Enrolment", desc: "Enrol employee faces — 3 photos per person, done in 2 minutes" },
    { num: "03", title: "Shift Config", desc: "Define shifts, grace periods, overtime rules & leave policies" },
    { num: "04", title: "Geo-Fence", desc: "Draw location boundaries for offices and remote work sites" },
    { num: "05", title: "Payroll Link", desc: "Connect with your existing payroll system via API or CSV export" },
    { num: "06", title: "Go Live", desc: "Team begins marking attendance — zero manual effort from day one" },
]

const techStack = [
    { cat: "AI / ML", items: ["TensorFlow", "OpenCV", "DeepFace"] },
    { cat: "Backend", items: ["FastAPI", "PostgreSQL", "Redis"] },
    { cat: "Mobile", items: ["React Native", "Android", "iOS"] },
    { cat: "Infra", items: ["AWS Rekognition", "S3", "CloudWatch"] },
]

const comparisons = [
    { label: "Proxy Attendance", old: "Common", new: "Impossible" },
    { label: "Marking Time", old: "5–10 min queue", new: "< 1 second" },
    { label: "Payroll Errors", old: "Manual → 8–12%", new: "Auto → Zero" },
    { label: "Late Reports to HR", old: "End of day", new: "Real-time alert" },
    { label: "Remote Worker Tracking", old: "Trust-based", new: "GPS + Face verified" },
]

const faqs = [
    {
        q: "How accurate is the face recognition?",
        a: "99.4% accuracy across real-world deployments. The system is trained on diverse Indian demographics and handles varying lighting, glasses, masks, and hairstyles reliably.",
    },
    {
        q: "Can someone use a photo to spoof the system?",
        a: "No. Liveness detection technology checks for eye blink, depth, and micro-movements before confirming a match — photos, videos, and deepfakes are rejected.",
    },
    {
        q: "Does it work offline?",
        a: "Yes. Devices cache the face recognition model locally and sync data when connectivity is restored — perfect for factories, construction sites, and remote offices.",
    },
    {
        q: "How many employees can the system handle?",
        a: "The system scales from 20 to 50,000+ employees. Face matching performance remains under 1 second at any scale due to our distributed architecture.",
    },
    {
        q: "Does it integrate with our existing payroll?",
        a: "Yes. We provide pre-built connectors for Tally, Keka, GreytHR, and Zoho Payroll — or a clean REST API for any custom payroll system.",
    },
    {
        q: "What hardware is required?",
        a: "Any Android tablet or phone with a front camera works. For large offices, we recommend our dedicated smart attendance terminals that work without a network connection.",
    },
]

/* ══════════ COMPONENT ══════════ */
export default function AiAttendancePage() {
    const statsRef = useReveal()
    const overRef = useReveal()
    const compRef = useReveal()
    const featRef = useReveal()
    const stepsRef = useReveal()
    const techRef = useReveal()
    const faqRef = useReveal()

    return (
        <div className="sp-page">
            <PageHero
                breadcrumbs={[{ label: "Products", href: "/products" }, { label: "AI Attendance" }]}
                pill="AI-Based Attendance Software"
                title={<>Face Recognition Attendance<br /><span className="ph-gradient">Zero Proxy. Zero Manual Work.</span></>}
                subtitle="99.4% accurate AI face recognition — marks attendance in under 1 second, blocks proxy completely, and auto-syncs to payroll. Works online and offline."
                tag="Face Recognition · GPS Geo-Fencing · Payroll Auto-Sync"
            />

            <div className="sp-body">

                {/* ── Stats ── */}
                <div className="sp-stats-strip sp-anim" ref={statsRef}>
                    {stats.map((s, i) => (
                        <div key={s.lbl} className="sp-stat-card" style={{ "--delay": `${i * 0.08}s` }}>
                            <span className="sp-stat-val">{s.val}</span>
                            <span className="sp-stat-lbl">{s.lbl}</span>
                        </div>
                    ))}
                </div>

                {/* ── Overview ── */}
                <div className="sp-overview-grid sp-anim" ref={overRef}>
                    <div className="sp-overview-text">
                        <h2 className="sp-overview-title">
                            Replace Biometric Machines<br />
                            <span className="sp-hl">With Intelligence</span>
                        </h2>
                        <p className="sp-overview-para">
                            Traditional fingerprint machines break down, have long queues, and still allow
                            proxy. Our AI attendance system uses face recognition + GPS — so every punch-in
                            is verified to the right person, at the right location, in under a second.
                        </p>
                        <ul className="sp-checklist">
                            {[
                                "99.4% face match accuracy — works with masks and glasses",
                                "GPS geo-fencing prevents marking from outside office premises",
                                "Liveness detection blocks photos, videos, and deepfakes",
                                "Payroll auto-sync eliminates manual attendance entry forever",
                                "Works offline — syncs automatically when network is back",
                            ].map(item => (
                                <li key={item}>
                                    <span className="sp-check-icon">✓</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
                            <a href="/contact" className="sp-btn-primary">
                                Book a Live Demo <FiArrowRight />
                            </a>
                            <a href="/contact" className="sp-btn-primary"
                                style={{ background: "var(--sp-white)", color: "var(--sp-orange)", border: "1.5px solid var(--sp-orange)" }}>
                                Get Free Trial <FiArrowRight />
                            </a>
                        </div>
                    </div>

                    {/* AI UI mockup */}
                    <div className="sp-overview-visual">
                        <div className="sp-visual-box">
                            <div className="sp-dash-mock">
                                <div className="sp-dm-topbar">
                                    <span className="sp-dm-dot sp-dm-d1" />
                                    <span className="sp-dm-dot sp-dm-d2" />
                                    <span className="sp-dm-dot sp-dm-d3" />
                                    <span className="sp-dm-title">AI Attendance — Live View</span>
                                </div>

                                {/* face scan animation */}
                                <div className="sp-face-scan">
                                    <div className="sp-face-ring sp-face-ring1" />
                                    <div className="sp-face-ring sp-face-ring2" />
                                    <div className="sp-face-center">
                                        <FiCamera style={{ fontSize: 28, color: "var(--sp-orange)" }} />
                                    </div>
                                    <div className="sp-face-status">
                                        <FiCheckCircle style={{ color: "#22c55e", fontSize: 13 }} />
                                        <span>Rohan Sharma — Matched</span>
                                    </div>
                                </div>

                                <div className="sp-dm-grid" style={{ marginTop: 12 }}>
                                    <div className="sp-dm-kpi sp-dm-kpi-orange">
                                        <span className="sp-dm-kval">312</span>
                                        <span className="sp-dm-klbl">Present Today</span>
                                    </div>
                                    <div className="sp-dm-kpi">
                                        <span className="sp-dm-kval">14</span>
                                        <span className="sp-dm-klbl">On Leave</span>
                                    </div>
                                    <div className="sp-dm-kpi">
                                        <span className="sp-dm-kval">6</span>
                                        <span className="sp-dm-klbl">Late Arrivals</span>
                                    </div>
                                    <div className="sp-dm-kpi">
                                        <span className="sp-dm-kval">0</span>
                                        <span className="sp-dm-klbl">Proxy Blocked</span>
                                    </div>
                                </div>
                            </div>
                            <img src={AttandImg} alt="Attendance System" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0, opacity: 0.3 }} />
                        </div>
                        <div className="sp-visual-badge sp-vb-1">
                            <FiZap style={{ color: "var(--sp-orange)" }} /> &lt;1s Recognition
                        </div>
                        <div className="sp-visual-badge sp-vb-2">
                            <FiShield style={{ color: "var(--sp-orange)" }} /> Anti-Spoof Active
                        </div>
                    </div>
                </div>

                {/* ── Before vs After ── */}
                <div>
                    <div className="sp-section-header">
                        <div className="sp-pill">Impact</div>
                        <h2 className="sp-section-title">
                            Before vs <span className="sp-hl">After AI Attendance</span>
                        </h2>
                        <p className="sp-section-sub">
                            See the difference in attendance accuracy, payroll effort, and HR workload.
                        </p>
                    </div>
                    <div className="sp-compare-table sp-anim" ref={compRef}>
                        <div className="sp-compare-head">
                            <div className="sp-compare-col-label" />
                            <div className="sp-compare-col sp-compare-old">Before</div>
                            <div className="sp-compare-col sp-compare-new">With AI Attendance</div>
                        </div>
                        {comparisons.map((row, i) => (
                            <div key={row.label} className="sp-compare-row" style={{ "--delay": `${i * 0.07}s` }}>
                                <div className="sp-compare-col-label">{row.label}</div>
                                <div className="sp-compare-col sp-compare-old-val">✗ {row.old}</div>
                                <div className="sp-compare-col sp-compare-new-val">✓ {row.new}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Features ── */}
                <div>
                    <div className="sp-section-header">
                        <div className="sp-pill">Features</div>
                        <h2 className="sp-section-title">
                            Built for <span className="sp-hl">Real Workplaces</span>
                        </h2>
                        <p className="sp-section-sub">
                            Every feature is designed around the actual challenges Indian HR teams face every day.
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
                        <div className="sp-pill">Setup</div>
                        <h2 className="sp-section-title">
                            Running in <span className="sp-hl">1 Day</span>
                        </h2>
                        <p className="sp-section-sub">
                            No complex hardware. No IT team required. Most companies are fully live the same day they sign up.
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
                        <div className="sp-pill">Technology</div>
                        <h2 className="sp-section-title">
                            Enterprise AI <span className="sp-hl">Under the Hood</span>
                        </h2>
                    </div>
                    <div className="sp-tech-grid sp-anim" ref={techRef}>
                        {techStack.map((t, i) => (
                            <div key={t.cat} className="sp-tech-card" style={{ "--delay": `${i * 0.08}s` }}>
                                <span className="sp-tech-cat">{t.cat}</span>
                                <div className="sp-tech-items">
                                    {t.items.map(item => <span key={item} className="sp-tech-item">{item}</span>)}
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
                    <div className="sp-pill" style={{ marginBottom: 20 }}>Get Started Free</div>
                    <h2 className="sp-cta-title">Eliminate Proxy Attendance Starting Today</h2>
                    <p className="sp-cta-sub">
                        Book a live demo — we'll set up a pilot for your office in 24 hours, free of charge.
                    </p>
                    <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                        <a href="/contact" className="sp-btn-primary">
                            Book Live Demo <FiArrowRight />
                        </a>
                        <a href="/contact" className="sp-btn-primary"
                        >
                            Start Free Trial <FiArrowRight />
                        </a>
                    </div>
                </div>

            </div>
        </div>
    )
}