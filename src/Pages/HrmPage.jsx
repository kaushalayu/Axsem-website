import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { FiUsers, FiClock, FiDollarSign, FiShield, FiSmartphone, FiBarChart2, FiArrowRight, FiCheckCircle, FiPlus, FiZap, FiTrendingUp } from "react-icons/fi"
import PageHero from "../Components/PageHero"
import "../Styles/ServicePage.css"
import HrmImg from "../assets/erp.jpeg"

function useReveal() {
    const ref = useRef(null)
    useEffect(() => {
        const el = ref.current; if (!el) return
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add("sp-revealed") }, { threshold: 0, rootMargin: "0px 0px -40px 0px" })
        obs.observe(el); return () => obs.disconnect()
    }, [])
    return ref
}

function FaqItem({ q, a }) {
    const [open, setOpen] = useState(false)
    return (
        <div className={`sp-faq-item${open ? " sp-faq-open" : ""}`}>
            <button className="sp-faq-q" onClick={() => setOpen(!open)}><span>{q}</span><FiPlus className="sp-faq-icon" /></button>
            <div className="sp-faq-a">{a}</div>
        </div>
    )
}

const features = [
    { icon: <FiUsers />, title: "Employee Lifecycle", desc: "Complete profiles, org chart, document storage, onboarding checklists, and offboarding workflows." },
    { icon: <FiClock />, title: "Attendance Management", desc: "Biometric or app-based attendance, shift management, overtime tracking, and timesheet approvals." },
    { icon: <FiDollarSign />, title: "Leave Management", desc: "Configurable leave policies, online leave application, manager approval workflow, and leave balance tracking." },
    { icon: <FiShield />, title: "Performance Management", desc: "Goal setting, quarterly reviews, 360-degree feedback, and performance improvement plans." },
    { icon: <FiSmartphone />, title: "Employee Self-Service App", desc: "Employees update personal details, view payslips, apply for leaves, and access HR policies from their phone." },
    { icon: <FiBarChart2 />, title: "HR Analytics Dashboard", desc: "Headcount, attrition rate, department-wise cost, hiring pipeline, and workforce planning reports." },
]

const techStack = [
    { cat: "Frontend", items: ["React", "React Native"] },
    { cat: "Backend", items: ["Node.js", "PostgreSQL", "Redis"] },
    { cat: "Auth", items: ["Auth0", "Biometric API", "SSO"] },
    { cat: "Infra", items: ["AWS", "Twilio", "SendGrid"] },
]

const steps = [
    { num: "01", title: "Company Setup", desc: "Configure org structure, departments, and designations" },
    { num: "02", title: "Employee Import", desc: "Import all employee data and documents" },
    { num: "03", title: "Policies", desc: "Set up leave policies, shifts, and attendance rules" },
    { num: "04", title: "App Rollout", desc: "Employee self-service app activated and distributed" },
    { num: "05", title: "Go Live", desc: "Full HRM live — attendance and leaves on the system" },
    { num: "06", title: "Support", desc: "HR team support for first 60 days" },
]

const stats = [
    { val: "200+", lbl: "Companies on HRM" },
    { val: "80%", lbl: "Less HR Paperwork" },
    { val: "100%", lbl: "Compliance Ready" },
    { val: "4.7★", lbl: "Employee App Rating" },
]

const faqs = [
    { q: "Is the HRM separate from the payroll module?", a: "Both can work independently or together. HRM handles attendance and people data; payroll uses that data to process salaries." },
    { q: "Does it integrate with biometric devices?", a: "Yes. Integration with all major biometric devices — ZKTeco, eSSL, Realtime, and others — via API or file sync." },
    { q: "Can managers approve leaves from mobile?", a: "Yes. Managers get mobile notifications for leave requests and can approve or reject directly from their phone." },
    { q: "How does the performance review cycle work?", a: "You configure review frequency (quarterly, half-yearly), set goals, and the system sends automated review reminders to managers and employees." },
]

export default function HrmPage() {
    const statsRef = useReveal()
    const overviewRef = useReveal()
    const featRef = useReveal()
    const stepsRef = useReveal()
    const techRef = useReveal()
    const faqRef = useReveal()

    return (
        <div className="sp-page">
            <PageHero
                breadcrumbs={[{ label: "Products", }, { label: "HRM" }]}
                pill="Human Resource Management"
                title={<>Manage Your People,<br /><span className="ph-gradient">Not Your Paperwork</span></>}
                subtitle="Employee lifecycle, attendance, leave management, performance reviews, and HR analytics — complete HRM for growing Indian companies."
                tag="200+ Companies · 80% Less HR Paperwork"
            />
            <div className="sp-body">

                <div className="sp-stats-strip sp-anim" ref={statsRef}>
                    {stats.map((s, i) => (<div key={s.lbl} className="sp-stat-card" style={{ "--delay": `${i * 0.08}s` }}><span className="sp-stat-val">{s.val}</span><span className="sp-stat-lbl">{s.lbl}</span></div>))}
                </div>

                <div className="sp-overview-grid sp-anim" ref={overviewRef}>
                    <div className="sp-overview-text">
                        <h2 className="sp-overview-title">HR That Empowers<br /><span className="sp-hl">Your Entire Team</span></h2>
                        <p className="sp-overview-para">Most HR teams spend 60% of their time on admin tasks — attendance records, leave calculations, document requests, and repetitive queries. Our HRM automates all of it so your HR team can focus on hiring, culture, and performance — what actually moves the business.</p>
                        <ul className="sp-checklist">
                            {["Complete employee records with document storage", "Biometric attendance integration for all devices", "Mobile app for employees — leaves, payslips, policies", "Performance review cycles with automated reminders"].map(item => (<li key={item}><span className="sp-check-icon">✓</span>{item}</li>))}
                        </ul>
                        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
                            <Link to="/contact" className="sp-btn-primary">Book an HRM Demo <FiArrowRight /></Link>
                            <Link to="/portfolio/project" className="sp-btn-primary" style={{ background: "var(--sp-white)", color: "var(--sp-orange)", border: "1.5px solid var(--sp-orange)" }}>View Projects <FiArrowRight /></Link>
                        </div>
                    </div>
                    <div className="sp-overview-visual">
                        <div className="sp-visual-box"><FiUsers className="sp-visual-icon" /><img src={HrmImg} alt="HRM Software" /><span className="sp-visual-label">HRM Software</span></div>
                        <div className="sp-visual-badge sp-vb-1"><FiCheckCircle style={{ color: "var(--sp-orange)" }} /> 80% Less Admin</div>
                        <div className="sp-visual-badge sp-vb-2"><FiZap style={{ color: "var(--sp-orange)" }} /> 4.7★ Employee App</div>
                    </div>
                </div>

                <div>
                    <div className="sp-section-header"><div className="sp-pill">Features</div><h2 className="sp-section-title">Complete HRM <span className="sp-hl">Features</span></h2><p className="sp-section-sub">Hire to retire — every HR process digitised and automated.</p></div>
                    <div className="sp-cards-grid sp-cols-3 sp-anim" ref={featRef}>
                        {features.map((f, i) => (<div key={f.title} className="sp-card" style={{ "--delay": `${i * 0.08}s` }}><div className="sp-card-icon">{f.icon}</div><h3 className="sp-card-title">{f.title}</h3><p className="sp-card-desc">{f.desc}</p></div>))}
                    </div>
                </div>

                <div>
                    <div className="sp-section-header sp-center"><div className="sp-pill">How It Works</div><h2 className="sp-section-title">HRM <span className="sp-hl">Onboarding</span></h2><p className="sp-section-sub">Most companies are fully live on the HRM within 2 weeks.</p></div>
                    <div className="sp-steps-grid sp-anim" ref={stepsRef}>
                        {steps.map((s, i) => (<div key={s.num} className="sp-step" style={{ "--delay": `${i * 0.08}s` }}><div className="sp-step-num"><span>{s.num}</span></div><div className="sp-step-title">{s.title}</div><div className="sp-step-desc">{s.desc}</div></div>))}
                    </div>
                </div>

                <div>
                    <div className="sp-section-header"><div className="sp-pill">Tech Stack</div><h2 className="sp-section-title">Built With <span className="sp-hl">Modern Technology</span></h2></div>
                    <div className="sp-tech-grid sp-anim" ref={techRef}>
                        {techStack.map((t, i) => (<div key={t.cat} className="sp-tech-card" style={{ "--delay": `${i * 0.08}s` }}><span className="sp-tech-cat">{t.cat}</span><div className="sp-tech-items">{t.items.map(item => <span key={item} className="sp-tech-item">{item}</span>)}</div></div>))}
                    </div>
                </div>

                <div>
                    <div className="sp-section-header"><div className="sp-pill">FAQ</div><h2 className="sp-section-title">Common <span className="sp-hl">Questions</span></h2></div>
                    <div className="sp-faq-list sp-anim" ref={faqRef}>
                        {faqs.map((f, i) => (<div key={i} style={{ "--delay": `${i * 0.07}s` }}><FaqItem q={f.q} a={f.a} /></div>))}
                    </div>
                </div>

                <div className="sp-cta sp-anim">
                    <h2 className="sp-cta-title">Ready to Transform Your HR Operations?</h2>
                    <p className="sp-cta-sub">Book a free demo and see how HRM can save your HR team 20+ hours every month.</p>
                    <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                        <Link to="/contact" className="sp-btn-primary">Book an HRM Demo <FiArrowRight /></Link>
                        <Link to="/portfolio/project" className="sp-btn-primary">View Our Work <FiArrowRight /></Link>
                    </div>
                </div>

            </div>
        </div>
    )
}