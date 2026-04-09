import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { FiHeart, FiUsers, FiTarget, FiFileText, FiGlobe, FiShield, FiArrowRight, FiCheckCircle, FiPlus, FiZap } from "react-icons/fi"
import PageHero from "../Components/PageHero"
import ProductPricingSection from "../Components/ProductPricingSection"
import "../Styles/ServicePage.css"
import NgoImg from "../assets/erp.jpeg"

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
    { icon: <FiHeart />, title: "Donor Management", desc: "Track all donors, donation history, 80G receipt generation, and automated thank-you communications." },
    { icon: <FiTarget />, title: "Project Tracking", desc: "Break projects into milestones, assign teams, track expenses, and monitor completion status in real time." },
    { icon: <FiUsers />, title: "Volunteer Management", desc: "Register volunteers, manage assignments, track hours logged, and issue certificates automatically." },
    { icon: <FiGlobe />, title: "Grant Management", desc: "Track grant applications, approval status, utilisation reports, and donor-specific fund accounting." },
    { icon: <FiFileText />, title: "Impact Reporting", desc: "Auto-generate beneficiary reports, programme summaries, and annual reports for donors and regulators." },
    { icon: <FiShield />, title: "FCRA & Compliance", desc: "Separate domestic and foreign fund accounting with audit-ready FCRA reports for regulatory filing." },
]

const techStack = [
    { cat: "Frontend", items: ["React", "Next.js"] },
    { cat: "Backend", items: ["Django", "PostgreSQL"] },
    { cat: "Payments", items: ["Razorpay", "UPI", "NEFT"] },
    { cat: "Infra", items: ["AWS S3", "SendGrid"] },
]

const steps = [
    { num: "01", title: "Org Setup", desc: "Configure NGO profile, programmes, and fund heads" },
    { num: "02", title: "Donor Import", desc: "Import existing donor database and donation history" },
    { num: "03", title: "Projects", desc: "Set up active projects, milestones, and budgets" },
    { num: "04", title: "Training", desc: "Team training and workflow documentation session" },
    { num: "05", title: "80G Setup", desc: "Configure receipt templates and automation rules" },
    { num: "06", title: "Go Live", desc: "Full platform live with ongoing compliance support" },
]

const stats = [
    { val: "20+", lbl: "NGOs Onboarded" },
    { val: "₹5Cr+", lbl: "Donations Tracked" },
    { val: "FCRA", lbl: "Compliant" },
    { val: "60%", lbl: "Less Reporting Time" },
]

const faqs = [
    { q: "Does it generate 80G receipts automatically?", a: "Yes. Every donation triggers an auto-generated 80G receipt sent to the donor via email, with a PDF copy stored." },
    { q: "Is it FCRA compliant?", a: "Yes. Separate ledgers for domestic and foreign funds, with FCRA utilisation reports ready for filing." },
    { q: "Can donors donate online through the system?", a: "Yes. A donor-facing portal allows online donations with instant 80G receipt generation on payment." },
    { q: "Can we track in-kind donations?", a: "Yes. In-kind donation tracking with estimated value logging and inclusion in annual reports is supported." },
]

export default function NgoPage() {
    const statsRef = useReveal()
    const overviewRef = useReveal()
    const featRef = useReveal()
    const stepsRef = useReveal()
    const techRef = useReveal()
    const faqRef = useReveal()

    return (
        <div className="sp-page">
            <PageHero
                breadcrumbs={[{ label: "Products", }, { label: "NGO Software" }]}
                pill="NGO Management Software"
                title={<>Manage Donors, Projects<br /><span className="ph-gradient">& Impact Effortlessly</span></>}
                subtitle="Donor CRM, project tracking, volunteer management, 80G receipts, and FCRA-ready fund accounting — built for Indian NGOs."
                tag="Purpose-Built for Non-Profits · FCRA Compliant"
            />
            <div className="sp-body">

                <div className="sp-stats-strip sp-anim" ref={statsRef}>
                    {stats.map((s, i) => (<div key={s.lbl} className="sp-stat-card" style={{ "--delay": `${i * 0.08}s` }}><span className="sp-stat-val">{s.val}</span><span className="sp-stat-lbl">{s.lbl}</span></div>))}
                </div>

                <div className="sp-overview-grid sp-anim" ref={overviewRef}>
                    <div className="sp-overview-text">
                        <h2 className="sp-overview-title">Focus on Impact,<br /><span className="sp-hl">Not Spreadsheets</span></h2>
                        <p className="sp-overview-para">NGOs shouldn't spend more time on reporting than on their mission. Our platform automates donor acknowledgements, generates 80G receipts, tracks project milestones, and produces audit-ready FCRA reports — so your team can focus on what actually matters.</p>
                        <ul className="sp-checklist">
                            {["Auto 80G receipt on every donation received", "FCRA-ready domestic and foreign fund tracking", "Project milestone and budget tracking dashboard", "One-click annual impact reports for donors"].map(item => (<li key={item}><span className="sp-check-icon">✓</span>{item}</li>))}
                        </ul>
                        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
                            <Link to="/contact" className="sp-btn-primary">Book a Demo for Your NGO <FiArrowRight /></Link>
                            <Link to="/portfolio/project" className="sp-btn-primary" style={{ background: "var(--sp-white)", color: "var(--sp-orange)", border: "1.5px solid var(--sp-orange)" }}>View Projects <FiArrowRight /></Link>
                        </div>
                    </div>
                    <div className="sp-overview-visual">
                        <div className="sp-visual-box"><FiHeart className="sp-visual-icon" /><img src={NgoImg} alt="NGO Management" /><span className="sp-visual-label">NGO Management Software</span></div>
                        <div className="sp-visual-badge sp-vb-1"><FiShield style={{ color: "var(--sp-orange)" }} /> FCRA Compliant</div>
                        <div className="sp-visual-badge sp-vb-2"><FiZap style={{ color: "var(--sp-orange)" }} /> 60% Less Reporting</div>
                    </div>
                </div>

                <div>
                    <div className="sp-section-header"><div className="sp-pill">Features</div><h2 className="sp-section-title">Everything Your NGO <span className="sp-hl">Needs</span></h2><p className="sp-section-sub">From donor management to impact reporting — all in one FCRA-ready platform.</p></div>
                    <div className="sp-cards-grid sp-cols-3 sp-anim" ref={featRef}>
                        {features.map((f, i) => (<div key={f.title} className="sp-card" style={{ "--delay": `${i * 0.08}s` }}><div className="sp-card-icon">{f.icon}</div><h3 className="sp-card-title">{f.title}</h3><p className="sp-card-desc">{f.desc}</p></div>))}
                    </div>
                </div>

                <div>
                    <div className="sp-section-header sp-center"><div className="sp-pill">How It Works</div><h2 className="sp-section-title">NGO <span className="sp-hl">Onboarding</span></h2><p className="sp-section-sub">Simple setup — most NGOs are fully live within 2 weeks.</p></div>
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
                    <h2 className="sp-cta-title">Let's Help Your NGO Do More with Less</h2>
                    <p className="sp-cta-sub">Book a free demo and see how the platform saves your team 10+ hours every week.</p>
                    <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                        <Link to="/contact" className="sp-btn-primary">Book NGO Demo <FiArrowRight /></Link>
                        <Link to="/portfolio/project" className="sp-btn-primary">View Our Work <FiArrowRight /></Link>
                    </div>
                </div>

            </div>

            <ProductPricingSection productRoute="/products/ngo" color="#3d3d9e" />

        </div>
    )
}