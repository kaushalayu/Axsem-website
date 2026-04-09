import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { FiBook, FiVideo, FiCheckSquare, FiTrendingUp, FiAward, FiGlobe, FiArrowRight, FiCheckCircle, FiPlus, FiZap } from "react-icons/fi"
import PageHero from "../Components/PageHero"
import ProductPricingSection from "../Components/ProductPricingSection"
import "../Styles/ServicePage.css"
import LmsImg from "../assets/erp.jpeg"

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
    { icon: <FiBook />, title: "Course Builder", desc: "Create structured courses with video lectures, PDFs, quizzes, and assignments — drag-and-drop interface." },
    { icon: <FiVideo />, title: "Live Classes", desc: "Integrated scheduling with Zoom/Google Meet, attendance auto-tracking, and recording storage." },
    { icon: <FiCheckSquare />, title: "Assessments & Exams", desc: "MCQ, descriptive, and coding tests with auto-grading, proctoring, and detailed performance analytics." },
    { icon: <FiTrendingUp />, title: "Student Progress Tracking", desc: "Completion rates, quiz scores, time-on-content, and learning path progress for every student." },
    { icon: <FiAward />, title: "Certificates", desc: "Auto-generated branded completion certificates triggered on course completion or exam passing." },
    { icon: <FiGlobe />, title: "B2B & B2C Modes", desc: "Sell courses individually (B2C) or provide corporate training with bulk enrolment (B2B) — both in one platform." },
]

const techStack = [
    { cat: "Frontend", items: ["React", "React Native"] },
    { cat: "Backend", items: ["Node.js", "PostgreSQL"] },
    { cat: "Media", items: ["AWS S3", "CloudFront", "Zoom API"] },
    { cat: "Payments", items: ["Razorpay", "Stripe"] },
]

const steps = [
    { num: "01", title: "Org Setup", desc: "Configure institute profile, branding, and custom domain" },
    { num: "02", title: "Course Upload", desc: "Upload or record your first course content" },
    { num: "03", title: "Test Launch", desc: "Invite a test batch and run a live class" },
    { num: "04", title: "Payments", desc: "Connect payment gateway for course fee collection" },
    { num: "05", title: "Go Live", desc: "Open enrolments — students start learning" },
    { num: "06", title: "Analytics", desc: "Monthly review of progress and engagement data" },
]

const stats = [
    { val: "100+", lbl: "Educators on LearnAxis" },
    { val: "50k+", lbl: "Students Enrolled" },
    { val: "4.9★", lbl: "Educator Rating" },
    { val: "95%", lbl: "Course Completion Rate" },
]

const faqs = [
    { q: "Can we host live classes inside the platform?", a: "Yes. Live classes via Zoom or Google Meet are scheduled inside the LMS — attendance is auto-recorded." },
    { q: "Can students access courses on mobile?", a: "Yes. LearnAxis is fully mobile-responsive and has native Android and iOS apps for students." },
    { q: "Can we white-label the platform with our brand?", a: "Yes. Custom domain, logo, colour scheme, and app branding are all included." },
    { q: "Does it support video DRM to prevent downloads?", a: "Yes. Video content is DRM-protected — students can watch but cannot download or screen-record." },
]

export default function LmsPage() {
    const statsRef = useReveal()
    const overviewRef = useReveal()
    const featRef = useReveal()
    const stepsRef = useReveal()
    const techRef = useReveal()
    const faqRef = useReveal()

    return (
        <div className="sp-page">
            <PageHero
                breadcrumbs={[{ label: "Products", }, { label: "LMS" }]}
                pill="Learning Management System"
                title={<>Teach Online, Track Progress,<br /><span className="ph-gradient">Scale Your Learning</span></>}
                subtitle="Live classes, recorded courses, assessments, certificates, and student analytics — everything your online education platform needs."
                tag="100+ Educators · 50,000+ Students Enrolled"
            />
            <div className="sp-body">

                <div className="sp-stats-strip sp-anim" ref={statsRef}>
                    {stats.map((s, i) => (<div key={s.lbl} className="sp-stat-card" style={{ "--delay": `${i * 0.08}s` }}><span className="sp-stat-val">{s.val}</span><span className="sp-stat-lbl">{s.lbl}</span></div>))}
                </div>

                <div className="sp-overview-grid sp-anim" ref={overviewRef}>
                    <div className="sp-overview-text">
                        <h2 className="sp-overview-title">Your Complete<br /><span className="sp-hl">Online Learning Platform</span></h2>
                        <p className="sp-overview-para">Whether you're a school running online classes, a coaching centre selling courses, or a company training employees — LearnAxis gives you a fully branded platform with live and recorded learning, assessments, and auto-certificates. No technical setup needed.</p>
                        <ul className="sp-checklist">
                            {["Live classes with Zoom/Google Meet integration", "Course builder with videos, PDFs, and quizzes", "Auto-generated branded certificates for completions", "Sell courses online or enrol employees in bulk"].map(item => (<li key={item}><span className="sp-check-icon">✓</span>{item}</li>))}
                        </ul>
                        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
                            <Link to="/contact" className="sp-btn-primary" style={{ background: "var(--sp-white)", color: "var(--sp-orange)", border: "1.5px solid var(--sp-orange)" }} >Start a Free LMS Trial <FiArrowRight /></Link>
                            <Link to="/portfolio/project" className="sp-btn-primary" style={{ background: "var(--sp-white)", color: "var(--sp-orange)", border: "1.5px solid var(--sp-orange)" }}>View Projects <FiArrowRight /></Link>
                        </div>
                    </div>
                    <div className="sp-overview-visual">
                        <div className="sp-visual-box"><FiBook className="sp-visual-icon" /><img src={LmsImg} alt="LMS" /><span className="sp-visual-label">Learning Management System</span></div>
                        <div className="sp-visual-badge sp-vb-1"><FiCheckCircle style={{ color: "var(--sp-orange)" }} /> 95% Completion Rate</div>
                        <div className="sp-visual-badge sp-vb-2"><FiZap style={{ color: "var(--sp-orange)" }} /> 4.9★ Rating</div>
                    </div>
                </div>

                <div>
                    <div className="sp-section-header"><div className="sp-pill">Features</div><h2 className="sp-section-title">Complete LMS <span className="sp-hl">Features</span></h2><p className="sp-section-sub">Every tool your educators and learners need — live, recorded, assessed, and certified.</p></div>
                    <div className="sp-cards-grid sp-cols-3 sp-anim" ref={featRef}>
                        {features.map((f, i) => (<div key={f.title} className="sp-card" style={{ "--delay": `${i * 0.08}s` }}><div className="sp-card-icon">{f.icon}</div><h3 className="sp-card-title">{f.title}</h3><p className="sp-card-desc">{f.desc}</p></div>))}
                    </div>
                </div>

                <div>
                    <div className="sp-section-header sp-center"><div className="sp-pill">How It Works</div><h2 className="sp-section-title">LMS <span className="sp-hl">Launch Process</span></h2><p className="sp-section-sub">Your first course can be live within 24 hours of signing up.</p></div>
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
                    <h2 className="sp-cta-title">Launch Your Online Learning Platform Today</h2>
                    <p className="sp-cta-sub">Start free — no credit card required. Your first course live in 24 hours.</p>
                    <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                        <Link to="/contact" className="sp-btn-primary">Start Free Trial <FiArrowRight /></Link>
                        <Link to="/portfolio/project" className="sp-btn-primary">View Our Work <FiArrowRight /></Link>
                    </div>
                </div>

                <ProductPricingSection productRoute="/products/lms" color="#3d3d9e" />

            </div>
        </div>
    )
}