import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { FiUsers, FiClock, FiDollarSign, FiShield, FiSmartphone, FiBarChart2, FiArrowRight, FiCheckCircle, FiPlus, FiZap } from "react-icons/fi"
import PageHero from "../Components/PageHero"
import PageLoader from "../Components/PageLoader"
import ProductPricingSection from "../Components/ProductPricingSection"
import "../Styles/ServicePage.css"
import HrImg from "../assets/erp.jpeg"

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
    { icon: <FiUsers />, title: "Employee Management", desc: "Complete profiles, document storage, org chart, and onboarding/offboarding workflows in one place." },
    { icon: <FiClock />, title: "Attendance & Leave", desc: "Biometric/app attendance, leave policies, approval workflows, and calendar view for team managers." },
    { icon: <FiDollarSign />, title: "Payroll Processing", desc: "One-click payroll with auto-calculation of basic, HRA, allowances, deductions, and net pay." },
    { icon: <FiShield />, title: "Statutory Compliance", desc: "Auto PF, ESI, PT, TDS, and Form 16 — fully compliant with Indian labour laws and regulations." },
    { icon: <FiSmartphone />, title: "Employee Self-Service", desc: "Mobile app for payslips, leave applications, IT declarations, and document downloads anytime." },
    { icon: <FiBarChart2 />, title: "People Analytics", desc: "Headcount trends, attrition reports, cost-per-hire, and salary benchmarking dashboards for HR leaders." },
]

const techStack = [
    { cat: "Frontend", items: ["React", "React Native"] },
    { cat: "Backend", items: ["Node.js", "PostgreSQL", "Redis"] },
    { cat: "Compliance", items: ["PF Portal API", "ESIC API", "TDS Filing"] },
    { cat: "Infra", items: ["AWS", "Razorpay"] },
]

const steps = [
    { num: "01", title: "Company Setup", desc: "Configure org structure, pay structure, and leave policies" },
    { num: "02", title: "Data Migration", desc: "Import employee data and historical payroll records" },
    { num: "03", title: "Compliance", desc: "Set up PF, ESI details, and tax configurations" },
    { num: "04", title: "Test Run", desc: "Run a parallel payroll cycle to validate accuracy" },
    { num: "05", title: "Go Live", desc: "First official payroll run on the platform" },
    { num: "06", title: "Support", desc: "Dedicated support for first 3 payroll cycles" },
]

const stats = [
    { val: "200+", lbl: "Companies Using It" },
    { val: "50k+", lbl: "Employees Managed" },
    { val: "100%", lbl: "Statutory Compliant" },
    { val: "4hr", lbl: "Monthly Payroll Time" },
]

const faqs = [
    { q: "Does it handle PF/ESI filings?", a: "Yes. PF and ESI challans are auto-generated each month. ECR files for the PF portal are ready to upload directly." },
    { q: "Can we integrate with biometric devices?", a: "Yes. We integrate with all major biometric attendance devices via API or file import." },
    { q: "What about multi-state companies?", a: "Fully supported — each state's PT slab, minimum wage rules, and local compliance are pre-configured." },
    { q: "Is there a mobile app for employees?", a: "Yes. Employees view payslips, apply for leave, check attendance, and download Form 16 from the mobile app." },
]

export default function HrPayrollPage() {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500)
        return () => clearTimeout(timer)
    }, [])

    const statsRef = useReveal()
    const overviewRef = useReveal()
    const featRef = useReveal()
    const stepsRef = useReveal()
    const techRef = useReveal()
    const faqRef = useReveal()

    if (loading) return <PageLoader />

    return (
        <div className="sp-page">
            <PageHero
                breadcrumbs={[{ label: "Products", }, { label: "HR & Payroll" }]}
                pill="HR & Payroll Software"
                title={<>HR & Payroll Software<br /><span className="ph-gradient">Built for India</span></>}
                subtitle="Employee management, attendance, leave, payroll processing, and 100% statutory compliance — all in one platform."
                tag="200+ Companies · 50,000+ Employees Managed"
            />
            <div className="sp-body">

                <div className="sp-stats-strip sp-anim" ref={statsRef}>
                    {stats.map((s, i) => (<div key={s.lbl} className="sp-stat-card" style={{ "--delay": `${i * 0.08}s` }}><span className="sp-stat-val">{s.val}</span><span className="sp-stat-lbl">{s.lbl}</span></div>))}
                </div>

                <div className="sp-overview-grid sp-anim" ref={overviewRef}>
                    <div className="sp-overview-text">
                        <h2 className="sp-overview-title">From Hire to Retire,<br /><span className="sp-hl">One Platform</span></h2>
                        <p className="sp-overview-para">PeopleAxis handles the full employee lifecycle — onboarding, attendance, leaves, monthly payroll, PF/ESI/TDS compliance, and offboarding — so your HR team can focus on people, not paperwork. Built 100% for Indian labour laws.</p>
                        <ul className="sp-checklist">
                            {["One-click monthly payroll processing", "Auto PF, ESI, PT, TDS calculations", "Employee self-service mobile app", "Form 16, payslips, and IT reports ready to download"].map(item => (<li key={item}><span className="sp-check-icon">✓</span>{item}</li>))}
                        </ul>
                        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
                            <Link to="/contact" className="sp-btn-primary" style={{ background: "var(--sp-white)", color: "var(--sp-orange)", border: "1.5px solid var(--sp-orange)" }} >Get a Free Payroll Demo <FiArrowRight /></Link>
                            <Link to="/portfolio/project" className="sp-btn-primary" style={{ background: "var(--sp-white)", color: "var(--sp-orange)", border: "1.5px solid var(--sp-orange)" }}>View Projects <FiArrowRight /></Link>
                        </div>
                    </div>
                    <div className="sp-overview-visual">
                        <div className="sp-visual-box"><FiUsers className="sp-visual-icon" /><img src={HrImg} alt="HR & Payroll" /><span className="sp-visual-label">HR & Payroll Software</span></div>
                        <div className="sp-visual-badge sp-vb-1"><FiShield style={{ color: "var(--sp-orange)" }} /> 100% Compliant</div>
                        <div className="sp-visual-badge sp-vb-2"><FiZap style={{ color: "var(--sp-orange)" }} /> 4hr Payroll Run</div>
                    </div>
                </div>

                <div>
                    <div className="sp-section-header"><div className="sp-pill">Features</div><h2 className="sp-section-title">Complete HR & Payroll <span className="sp-hl">Features</span></h2><p className="sp-section-sub">Everything your HR team needs — attendance to compliance — in one place.</p></div>
                    <div className="sp-cards-grid sp-cols-3 sp-anim" ref={featRef}>
                        {features.map((f, i) => (<div key={f.title} className="sp-card" style={{ "--delay": `${i * 0.08}s` }}><div className="sp-card-icon">{f.icon}</div><h3 className="sp-card-title">{f.title}</h3><p className="sp-card-desc">{f.desc}</p></div>))}
                    </div>
                </div>

                <div>
                    <div className="sp-section-header sp-center"><div className="sp-pill">How It Works</div><h2 className="sp-section-title">Payroll <span className="sp-hl">Onboarding</span></h2><p className="sp-section-sub">Most companies run their first payroll on our platform within 2 weeks.</p></div>
                    <div className="sp-steps-grid sp-anim" ref={stepsRef}>
                        {steps.map((s, i) => (<div key={s.num} className="sp-step" style={{ "--delay": `${i * 0.08}s` }}><div className="sp-step-num"><span>{s.num}</span></div><div className="sp-step-title">{s.title}</div><div className="sp-step-desc">{s.desc}</div></div>))}
                    </div>
                </div>

                <div>
                    <div className="sp-section-header"><div className="sp-pill">Tech Stack</div><h2 className="sp-section-title">Built With <span className="sp-hl">Reliable Technology</span></h2></div>
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
                    <h2 className="sp-cta-title">Simplify Your HR & Payroll Today</h2>
                    <p className="sp-cta-sub">See how PeopleAxis can cut your monthly payroll time to under 4 hours.</p>
                    <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                        <Link to="/contact" className="sp-btn-primary">Book a Payroll Demo <FiArrowRight /></Link>
                        <Link to="/portfolio/project" className="sp-btn-primary">View Our Work <FiArrowRight /></Link>
                    </div>
                </div>

                <ProductPricingSection productRoute="/products/hr-payroll" color="#e63b2a" />

            </div>
        </div>
    )
}