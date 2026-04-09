import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { FiBook, FiUsers, FiDollarSign, FiFileText, FiSmartphone, FiBriefcase, FiArrowRight, FiCheckCircle, FiPlus, FiZap, FiTrendingUp } from "react-icons/fi"
import PageHero from "../Components/PageHero"
import ProductPricingSection from "../Components/ProductPricingSection"
import "../Styles/ServicePage.css"
import SchoolImg from "../assets/erp.jpeg"

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
    { icon: <FiUsers />, title: "Admissions Management", desc: "Online admission forms, document collection, merit lists, and fee structure assignment — paperless from day one." },
    { icon: <FiBook />, title: "Attendance & Timetable", desc: "Biometric or manual attendance, timetable builder, and automatic absent SMS/WhatsApp alerts to parents." },
    { icon: <FiDollarSign />, title: "Fee Management", desc: "Flexible fee structures, online payment, auto-receipts, defaulter reports, and concession management." },
    { icon: <FiFileText />, title: "Exam & Results", desc: "Mark entry, grade computation, report card generation, and parent-accessible result portal." },
    { icon: <FiSmartphone />, title: "Parent App", desc: "Mobile app for parents to view attendance, fees, homework, notices, and communicate with teachers." },
    { icon: <FiBriefcase />, title: "Staff & Payroll", desc: "Staff profiles, leave management, salary processing, and statutory compliance reports." },
]

const techStack = [
    { cat: "Frontend", items: ["React", "React Native"] },
    { cat: "Backend", items: ["Node.js", "PostgreSQL"] },
    { cat: "Comms", items: ["Twilio", "Firebase", "WhatsApp API"] },
    { cat: "Payments", items: ["Razorpay", "UPI", "Net Banking"] },
]

const steps = [
    { num: "01", title: "Setup", desc: "Configure school, classes, subjects, and academic year" },
    { num: "02", title: "Data Import", desc: "Import student and staff data from existing records" },
    { num: "03", title: "Fee Setup", desc: "Define fee structures and payment schedules" },
    { num: "04", title: "Training", desc: "Admin and teacher training — half-day session" },
    { num: "05", title: "Parent App", desc: "Parent app accounts activated and distributed" },
    { num: "06", title: "Support", desc: "Dedicated support during first academic term" },
]

const stats = [
    { val: "30+", lbl: "Schools Onboarded" },
    { val: "15k+", lbl: "Students Managed" },
    { val: "80%", lbl: "Less Paperwork" },
    { val: "4.8★", lbl: "Parent App Rating" },
]

const faqs = [
    { q: "Can parents pay fees online?", a: "Yes. Parents pay via UPI, cards, or net banking. Receipts are auto-generated and sent via email and SMS instantly." },
    { q: "Does it work for coaching institutes too?", a: "Yes. Fully configurable for coaching centres with batch management, test series, and fee collection." },
    { q: "Is there a mobile app for teachers?", a: "Yes. Teachers have a mobile app for attendance marking, homework assignment, and parent communication." },
    { q: "Can we customise the report card format?", a: "Yes. Report card templates are fully customisable to match your school's existing format and grading system." },
]

export default function SchoolPage() {
    const statsRef = useReveal()
    const overviewRef = useReveal()
    const featRef = useReveal()
    const stepsRef = useReveal()
    const techRef = useReveal()
    const faqRef = useReveal()

    return (
        <div className="sp-page">
            <PageHero
                breadcrumbs={[{ label: "Products", }, { label: "School ERP" }]}
                pill="School Management System"
                title={<>Complete School ERP<br /><span className="ph-gradient">For Modern Schools</span></>}
                subtitle="Admissions, attendance, fees, exams, parent communication, and staff management — fully paperless, fully automated."
                tag="30+ Schools · 15,000+ Students Managed"
            />
            <div className="sp-body">

                <div className="sp-stats-strip sp-anim" ref={statsRef}>
                    {stats.map((s, i) => (
                        <div key={s.lbl} className="sp-stat-card" style={{ "--delay": `${i * 0.08}s` }}>
                            <span className="sp-stat-val">{s.val}</span>
                            <span className="sp-stat-lbl">{s.lbl}</span>
                        </div>
                    ))}
                </div>

                <div className="sp-overview-grid sp-anim" ref={overviewRef}>
                    <div className="sp-overview-text">
                        <h2 className="sp-overview-title">Run Your School<br /><span className="sp-hl">Without the Paperwork</span></h2>
                        <p className="sp-overview-para">From admission forms to result cards — our school ERP digitises every process. Reduce admin workload by 80%, give parents real-time visibility into their child's progress, and give leadership the data they need to make decisions.</p>
                        <ul className="sp-checklist">
                            {["Paperless admissions with online forms", "Auto SMS/WhatsApp absent alerts to parents", "One-click fee collection and instant receipts", "Parent mobile app with live attendance and results"].map(item => (
                                <li key={item}><span className="sp-check-icon">✓</span>{item}</li>
                            ))}
                        </ul>
                        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
                            <Link to="/contact" className="sp-btn-primary" style={{ background: "var(--sp-white)", color: "var(--sp-orange)", border: "1.5px solid var(--sp-orange)" }} >Schedule a School Demo <FiArrowRight /></Link>
                            <Link to="/portfolio/project" className="sp-btn-primary" style={{ background: "var(--sp-white)", color: "var(--sp-orange)", border: "1.5px solid var(--sp-orange)" }}>View Projects <FiArrowRight /></Link>
                        </div>
                    </div>
                    <div className="sp-overview-visual">
                        <div className="sp-visual-box">
                            <FiBook className="sp-visual-icon" />
                            <img src={SchoolImg} alt="School Management" />
                            <span className="sp-visual-label">School Management System</span>
                        </div>
                        <div className="sp-visual-badge sp-vb-1"><FiCheckCircle style={{ color: "var(--sp-orange)" }} /> 80% Less Paperwork</div>
                        <div className="sp-visual-badge sp-vb-2"><FiZap style={{ color: "var(--sp-orange)" }} /> 4.8★ Parent App</div>
                    </div>
                </div>

                <div>
                    <div className="sp-section-header">
                        <div className="sp-pill">Features</div>
                        <h2 className="sp-section-title">Everything Your School <span className="sp-hl">Needs</span></h2>
                        <p className="sp-section-sub">From admissions to alumni — every school process handled in one platform.</p>
                    </div>
                    <div className="sp-cards-grid sp-cols-3 sp-anim" ref={featRef}>
                        {features.map((f, i) => (
                            <div key={f.title} className="sp-card" style={{ "--delay": `${i * 0.08}s` }}>
                                <div className="sp-card-icon">{f.icon}</div>
                                <h3 className="sp-card-title">{f.title}</h3>
                                <p className="sp-card-desc">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <div className="sp-section-header sp-center">
                        <div className="sp-pill">How It Works</div>
                        <h2 className="sp-section-title">School <span className="sp-hl">Onboarding Process</span></h2>
                        <p className="sp-section-sub">Most schools are fully live before the next academic term starts.</p>
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

                <div>
                    <div className="sp-section-header">
                        <div className="sp-pill">Tech Stack</div>
                        <h2 className="sp-section-title">Built With <span className="sp-hl">Reliable Technology</span></h2>
                    </div>
                    <div className="sp-tech-grid sp-anim" ref={techRef}>
                        {techStack.map((t, i) => (
                            <div key={t.cat} className="sp-tech-card" style={{ "--delay": `${i * 0.08}s` }}>
                                <span className="sp-tech-cat">{t.cat}</span>
                                <div className="sp-tech-items">{t.items.map(item => <span key={item} className="sp-tech-item">{item}</span>)}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <div className="sp-section-header">
                        <div className="sp-pill">FAQ</div>
                        <h2 className="sp-section-title">Common <span className="sp-hl">Questions</span></h2>
                    </div>
                    <div className="sp-faq-list sp-anim" ref={faqRef}>
                        {faqs.map((f, i) => (
                            <div key={i} style={{ "--delay": `${i * 0.07}s` }}><FaqItem q={f.q} a={f.a} /></div>
                        ))}
                    </div>
                </div>

                <div className="sp-cta sp-anim">
                    <h2 className="sp-cta-title">Want to See It in Action?</h2>
                    <p className="sp-cta-sub">Book a free demo tailored to your school size and requirements.</p>
                    <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                        <Link to="/contact" className="sp-btn-primary">Book a School Demo <FiArrowRight /></Link>
                        <Link to="/portfolio/project" className="sp-btn-primary">View Our Work <FiArrowRight /></Link>
                    </div>
                </div>

                <ProductPricingSection productRoute="/products/school-management" color="#0e9e6e" />

            </div>
        </div>
    )
}