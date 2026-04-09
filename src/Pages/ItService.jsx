import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import {
    FiShield, FiRefreshCw, FiServer, FiAlertCircle, FiActivity,
    FiLock, FiArrowRight, FiPlus, FiZap, FiSettings,
    FiCode, FiLayers, FiTrendingUp, FiCheckCircle, FiClock
} from "react-icons/fi"
import PageHero from "../Components/PageHero"
import "../Styles/ServicePageShared.css"
import ItImg from "../assets/erp.jpeg"

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
                <span>{q}</span><FiPlus className="sp-faq-icon" />
            </button>
            <div className="sp-faq-a">{a}</div>
        </div>
    )
}

const services = [
    { icon: <FiActivity />, title: "24/7 Uptime Monitoring", desc: "Round-the-clock monitoring of your website, app, and APIs — instant alerts and rapid response before your users notice.", tag: "Monitoring" },
    { icon: <FiRefreshCw />, title: "Updates & Patch Management", desc: "Regular OS patches, CMS updates (WordPress, etc.), dependency upgrades, and security fixes — keeping your stack current and safe.", tag: "Updates" },
    { icon: <FiShield />, title: "Security Monitoring & Fixes", desc: "Malware scanning, vulnerability assessments, SSL management, firewall rules, and incident response for your production environment.", tag: "Security" },
    { icon: <FiServer />, title: "Server & Cloud Management", desc: "AWS, GCP, or DigitalOcean infra management — scaling, cost optimisation, backups, log management, and performance tuning.", tag: "Cloud Infra" },
    { icon: <FiAlertCircle />, title: "Bug Fixes & Minor Changes", desc: "Priority queue for bug fixes, UI tweaks, content updates, and small feature additions — without needing a full project engagement.", tag: "Bug Fixes" },
    { icon: <FiLock />, title: "Backup & Disaster Recovery", desc: "Automated daily backups, tested recovery procedures, and disaster recovery plans so you're never caught off guard.", tag: "Backup" },
]

const plans = [
    { name: "Basic", hours: "5 hrs/mo", rt: "48hr", items: ["Uptime monitoring", "Monthly security scan", "CMS/plugin updates", "Email support"] },
    { name: "Standard", hours: "15 hrs/mo", rt: "24hr", items: ["Everything in Basic", "Server monitoring", "Bug fix priority queue", "Weekly backup verification", "Phone & email support"] },
    { name: "Premium", hours: "30 hrs/mo", rt: "4hr", items: ["Everything in Standard", "24/7 on-call support", "Security incident response", "Performance optimisation", "Dedicated account manager"] },
]

const process = [
    { num: "01", title: "System Audit", desc: "Full audit of codebase, server, security, and dependencies" },
    { num: "02", title: "Onboarding", desc: "Access credentials, monitoring setup, runbook documentation" },
    { num: "03", title: "Monitoring Live", desc: "Uptime, performance, and security alerts go live" },
    { num: "04", title: "Scheduled Tasks", desc: "Planned updates, backups, and routine maintenance runs" },
    { num: "05", title: "Incident Response", desc: "Issues flagged, triaged, and resolved with SLA adherence" },
    { num: "06", title: "Monthly Report", desc: "Uptime report, incidents handled, recommendations for next month" },
]

const techStack = [
    { cat: "Monitoring", items: ["UptimeRobot", "Datadog", "New Relic", "Sentry"] },
    { cat: "Security", items: ["Wordfence", "Sucuri", "Cloudflare WAF", "OWASP ZAP"] },
    { cat: "Cloud/Infra", items: ["AWS", "GCP", "DigitalOcean", "Nginx"] },
    { cat: "DevOps", items: ["Docker", "PM2", "GitHub Actions", "Terraform"] },
]

const stats = [
    { val: "99.9%", lbl: "Uptime Guaranteed" },
    { val: "4hr", lbl: "Max Response Time (Premium)" },
    { val: "40+", lbl: "Systems Under Maintenance" },
    { val: "0", lbl: "Data Breaches on Our Watch" },
]

const faqs = [
    { q: "What is IT maintenance and why do I need it?", a: "IT maintenance is the ongoing service of keeping your website, app, or server healthy, secure, and performing well. Without it, software becomes outdated, vulnerabilities accumulate, and small issues compound into costly outages." },
    { q: "Can you maintain a system someone else built?", a: "Yes. We start with a thorough audit to understand the codebase, infrastructure, and any existing issues. Most third-party projects can be onboarded within 1–2 weeks." },
    { q: "What's the difference between your plans?", a: "Plans differ in monthly hours, response time SLA, and support channels. Basic is for simple sites needing routine care. Standard covers growing apps. Premium is for business-critical systems needing near-real-time response." },
    { q: "What happens if there's an emergency outside working hours?", a: "Premium plan clients get 24/7 on-call support. Standard plan gets next-business-day response for non-critical issues and same-day for production outages. Basic plan is business hours only." },
    { q: "Do you provide maintenance for mobile apps?", a: "Yes. Mobile app maintenance covers dependency updates, OS compatibility patches (new iOS/Android versions), crash monitoring via Sentry/Firebase Crashlytics, and Play Store/App Store update submissions." },
]

export default function ItMaintenancePage() {
    const overviewRef = useReveal(); const statsRef = useReveal(); const servicesRef = useReveal()
    const processRef = useReveal(); const plansRef = useReveal(); const techRef = useReveal()
    const faqRef = useReveal()

    return (
        <div className="sp-page">
            <PageHero
                breadcrumbs={[{ label: "Services", }, { label: "IT Maintenance" }]}
                pill="IT Maintenance & Support"
                pillIcon={<FiShield />}
                title={<>Your Systems, <span className="ph-gradient">Always Running</span></>}
                subtitle="24/7 monitoring, security patching, bug fixes, and server management — so your website and applications stay fast, secure, and online while you focus on your business."
                tag="99.9% Uptime · 40+ Systems Maintained"
            />

            <div className="sp-body">

                <div className="sp-overview-grid sp-anim" ref={overviewRef}>
                    <div className="sp-overview-text">
                        <h2 className="sp-overview-title">Technology Breaks. <span className="sp-hl">We Fix It Fast.</span></h2>
                        <p className="sp-overview-para">Every hour of downtime costs money, damages reputation, and frustrates users. Most businesses don't have a dedicated IT team watching their systems — we become that team. Proactive maintenance prevents problems before they happen; rapid response minimises damage when they do.</p>
                        <p className="sp-overview-para">We maintain websites, web apps, mobile apps, and cloud infrastructure for 40+ businesses — and we've never had a data breach on our watch.</p>
                        <ul className="sp-checklist">
                            {["24/7 uptime monitoring with instant alerts", "Security patches applied within 24 hours of release", "Monthly maintenance reports with full transparency", "Dedicated contact — never a support ticket queue"].map(i => (
                                <li key={i}><span className="sp-check-icon">✓</span>{i}</li>
                            ))}
                        </ul>
                        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
                            <Link to="/contact" className="sp-btn-primary sp-btn-no-hover">Get a Maintenance Quote <FiArrowRight /></Link>
                        </div>
                    </div>
                    <div className="sp-overview-visual">
                        <div className="sp-visual-box">
                            <FiShield className="sp-visual-icon" />
                            <img src={ItImg} alt="IT Services" />
                            <span className="sp-visual-label">IT Maintenance & Support</span>
                        </div>
                        <div className="sp-visual-badge sp-vb-1"><FiActivity style={{ color: "var(--sp-orange)" }} /> 99.9% Uptime</div>
                        <div className="sp-visual-badge sp-vb-2"><FiClock style={{ color: "var(--sp-orange)" }} /> 4hr Response</div>
                    </div>
                </div>

                <div className="sp-stats-strip sp-anim" ref={statsRef}>
                    {stats.map((s, i) => (
                        <div key={s.lbl} className="sp-stat-card" style={{ "--delay": `${i * .08}s` }}>
                            <span className="sp-stat-val">{s.val}</span>
                            <span className="sp-stat-lbl">{s.lbl}</span>
                        </div>
                    ))}
                </div>

                <div>
                    <div className="sp-section-header">
                        <div className="sp-pill"><FiLayers /> Services</div>
                        <h2 className="sp-section-title">IT Maintenance <span className="sp-hl">Services</span></h2>
                        <p className="sp-section-sub">Proactive monitoring, security, updates, and rapid response — everything to keep your systems healthy.</p>
                    </div>
                    <div className="sp-cards-grid sp-cols-3 sp-anim" ref={servicesRef}>
                        {services.map((s, i) => (
                            <div key={s.title} className="sp-card" style={{ "--delay": `${i * .08}s` }}>
                                <div className="sp-card-icon">{s.icon}</div>
                                <div className="sp-card-tag">{s.tag}</div>
                                <h3 className="sp-card-title">{s.title}</h3>
                                <p className="sp-card-desc">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Plans */}
                <div>
                    <div className="sp-section-header sp-center">
                        <div className="sp-pill"><FiCheckCircle /> Plans</div>
                        <h2 className="sp-section-title">Maintenance <span className="sp-hl">Plans</span></h2>
                        <p className="sp-section-sub">Choose the plan that matches your system's criticality and your team's needs.</p>
                    </div>
                    <div className="sp-cards-grid sp-cols-3 sp-anim" ref={plansRef}>
                        {plans.map((plan, i) => (
                            <div key={plan.name} className="sp-card" style={{ "--delay": `${i * .1}s` }}>
                                <div className="sp-card-tag">{plan.hours}</div>
                                <h3 className="sp-card-title">{plan.name}</h3>
                                <p className="sp-card-desc" style={{ marginBottom: 12 }}>Response time: <strong>{plan.rt}</strong></p>
                                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 7 }}>
                                    {plan.items.map(item => (
                                        <li key={item} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "13px", color: "var(--sp-text-mid)" }}>
                                            <FiCheckCircle style={{ color: "var(--sp-orange)", flexShrink: 0, fontSize: 14 }} />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <div className="sp-section-header sp-center">
                        <div className="sp-pill"><FiSettings /> Process</div>
                        <h2 className="sp-section-title">How Maintenance <span className="sp-hl">Works</span></h2>
                        <p className="sp-section-sub">Onboarding to ongoing care — a clear, structured process for system reliability.</p>
                    </div>
                    <div className="sp-steps-grid sp-anim" ref={processRef}>
                        {process.map((p, i) => (
                            <div key={p.num} className="sp-step" style={{ "--delay": `${i * .08}s` }}>
                                <div className="sp-step-num"><span>{p.num}</span></div>
                                <div className="sp-step-title">{p.title}</div>
                                <div className="sp-step-desc">{p.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <div className="sp-section-header">
                        <div className="sp-pill"><FiCode /> Tools</div>
                        <h2 className="sp-section-title">Tools We <span className="sp-hl">Use</span></h2>
                        <p className="sp-section-sub">Enterprise-grade monitoring, security, and DevOps tools to keep your systems running.</p>
                    </div>
                    <div className="sp-tech-grid sp-anim" ref={techRef}>
                        {techStack.map((t, i) => (
                            <div key={t.cat} className="sp-tech-card" style={{ "--delay": `${i * .08}s` }}>
                                <span className="sp-tech-cat">{t.cat}</span>
                                <div className="sp-tech-items">
                                    {t.items.map(item => <span key={item} className="sp-tech-item">{item}</span>)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <div className="sp-section-header">
                        <div className="sp-pill"><FiTrendingUp /> FAQ</div>
                        <h2 className="sp-section-title">Common <span className="sp-hl">Questions</span></h2>
                    </div>
                    <div className="sp-faq-list sp-anim" ref={faqRef}>
                        {faqs.map((f, i) => (
                            <div key={i} style={{ "--delay": `${i * .07}s` }}>
                                <FaqItem q={f.q} a={f.a} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="sp-cta sp-anim">
                    <h2 className="sp-cta-title">Never Worry About Downtime Again</h2>
                    <p className="sp-cta-sub">Get a free system audit and a recommended maintenance plan tailored to your infrastructure.</p>
                    <Link to="/contact" className="sp-btn-primary">Get a Free System Audit <FiArrowRight /></Link>
                </div>

            </div>
        </div>
    )
}