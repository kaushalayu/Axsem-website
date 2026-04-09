import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { FiHome, FiUsers, FiCalendar, FiFileText, FiDollarSign, FiSettings, FiArrowRight, FiCheckCircle, FiPlus, FiTrendingUp } from "react-icons/fi"
import PageHero from "../Components/PageHero"
import ProductPricingSection from "../Components/ProductPricingSection"
import "../Styles/ServicePage.css"
import RealImg from "../assets/erp.jpeg"

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
    { icon: <FiUsers />, title: "Lead & Enquiry CRM", desc: "Capture leads from website, portals, and ads — assign, track, and follow up from one sales pipeline." },
    { icon: <FiHome />, title: "Property Listings", desc: "Manage full inventory with floor plans, photos, availability status, and pricing history." },
    { icon: <FiCalendar />, title: "Site Visit Management", desc: "Schedule visits, assign agents, capture outcome notes, and send automated follow-up reminders." },
    { icon: <FiFileText />, title: "Booking & Agreements", desc: "Digital booking forms, auto-generate sale agreements, and track document collection from buyers." },
    { icon: <FiDollarSign />, title: "Payment Milestones", desc: "Construction or date-linked payment schedules — auto-reminders sent to buyers on every due date." },
    { icon: <FiSettings />, title: "Post-Sale Management", desc: "Track possession dates, handover checklists, maintenance requests, and society management." },
]

const techStack = [
    { cat: "Frontend", items: ["React", "Next.js"] },
    { cat: "Backend", items: ["Node.js", "PostgreSQL"] },
    { cat: "Comms", items: ["Twilio", "WhatsApp API", "SendGrid"] },
    { cat: "Portals", items: ["MagicBricks API", "99acres API", "Housing.com"] },
]

const steps = [
    { num: "01", title: "Project Setup", desc: "Add your projects, towers, units, and pricing" },
    { num: "02", title: "Lead Import", desc: "Import existing leads and integrate lead sources" },
    { num: "03", title: "Team Setup", desc: "Configure sales team roles and lead assignment rules" },
    { num: "04", title: "Training", desc: "Sales team training on CRM and pipeline management" },
    { num: "05", title: "Go Live", desc: "Full CRM live — all leads flow into PropAxis" },
    { num: "06", title: "Optimise", desc: "Monthly pipeline review and conversion coaching" },
]

const stats = [
    { val: "₹500Cr+", lbl: "Properties Managed" },
    { val: "35%", lbl: "Faster Lead-to-Close" },
    { val: "Zero", lbl: "Missed Payment Reminders" },
    { val: "25+", lbl: "Developers & Brokers" },
]

const faqs = [
    { q: "Can we integrate portals like MagicBricks and 99acres?", a: "Yes. Leads from MagicBricks, 99acres, Housing.com, and your website all flow automatically into PropAxis." },
    { q: "Does it work for brokers, not just developers?", a: "Yes. Broker mode with client-wise commission tracking, multiple project listings, and a buyer portal." },
    { q: "Can buyers see their payment schedule online?", a: "Yes. Buyers get a portal to view payment milestones, outstanding amounts, and download receipts." },
    { q: "Can we send bulk WhatsApp updates to leads?", a: "Yes. Bulk WhatsApp campaigns for new launches, offers, and follow-ups with template management." },
]

export default function RealEstatePage() {
    const statsRef = useReveal()
    const overviewRef = useReveal()
    const featRef = useReveal()
    const stepsRef = useReveal()
    const techRef = useReveal()
    const faqRef = useReveal()

    return (
        <div className="sp-page">
            <PageHero
                breadcrumbs={[{ label: "Products", }, { label: "Real Estate" }]}
                pill="Real Estate CRM Software"
                title={<>Close More Deals,<br /><span className="ph-gradient">Manage Every Property</span></>}
                subtitle="Lead CRM, property listings, site visit tracking, payment milestones, and post-sale management — built for developers and brokers."
                tag="₹500Cr+ Properties Managed on PropAxis"
            />
            <div className="sp-body">

                <div className="sp-stats-strip sp-anim" ref={statsRef}>
                    {stats.map((s, i) => (<div key={s.lbl} className="sp-stat-card" style={{ "--delay": `${i * 0.08}s` }}><span className="sp-stat-val">{s.val}</span><span className="sp-stat-lbl">{s.lbl}</span></div>))}
                </div>

                <div className="sp-overview-grid sp-anim" ref={overviewRef}>
                    <div className="sp-overview-text">
                        <h2 className="sp-overview-title">From First Enquiry<br /><span className="sp-hl">to Final Handover</span></h2>
                        <p className="sp-overview-para">PropAxis gives your sales team a CRM that captures every lead, tracks every site visit, and never lets a hot prospect go cold. Your accounts team gets payment milestone tracking with auto-reminders. Management gets real-time sales dashboards.</p>
                        <ul className="sp-checklist">
                            {["Capture leads from website, portals, and ads", "Site visit scheduling and outcome tracking", "Auto payment milestone reminders to buyers", "Digital booking forms and sale agreements"].map(item => (<li key={item}><span className="sp-check-icon">✓</span>{item}</li>))}
                        </ul>
                        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
                            <Link to="/contact" className="sp-btn-primary" style={{ background: "var(--sp-white)", color: "var(--sp-orange)", border: "1.5px solid var(--sp-orange)" }} >Book a PropAxis Demo <FiArrowRight /></Link>
                            <Link to="/portfolio/project" className="sp-btn-primary" style={{ background: "var(--sp-white)", color: "var(--sp-orange)", border: "1.5px solid var(--sp-orange)" }}>View Projects <FiArrowRight /></Link>
                        </div>
                    </div>
                    <div className="sp-overview-visual">
                        <div className="sp-visual-box"><FiHome className="sp-visual-icon" /><img src={RealImg} alt="Real Estate CRM" /><span className="sp-visual-label">Real Estate CRM</span></div>
                        <div className="sp-visual-badge sp-vb-1"><FiCheckCircle style={{ color: "var(--sp-orange)" }} /> 35% Faster Close</div>
                        <div className="sp-visual-badge sp-vb-2"><FiTrendingUp style={{ color: "var(--sp-orange)" }} /> Zero Missed Reminders</div>
                    </div>
                </div>

                <div>
                    <div className="sp-section-header"><div className="sp-pill">Features</div><h2 className="sp-section-title">Everything Your Sales Team <span className="sp-hl">Needs</span></h2><p className="sp-section-sub">Lead capture to possession — every stage of the real estate sales cycle managed.</p></div>
                    <div className="sp-cards-grid sp-cols-3 sp-anim" ref={featRef}>
                        {features.map((f, i) => (<div key={f.title} className="sp-card" style={{ "--delay": `${i * 0.08}s` }}><div className="sp-card-icon">{f.icon}</div><h3 className="sp-card-title">{f.title}</h3><p className="sp-card-desc">{f.desc}</p></div>))}
                    </div>
                </div>

                <div>
                    <div className="sp-section-header sp-center"><div className="sp-pill">How It Works</div><h2 className="sp-section-title">CRM <span className="sp-hl">Onboarding</span></h2><p className="sp-section-sub">Most sales teams are fully live and tracking leads within 1 week.</p></div>
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
                    <h2 className="sp-cta-title">Ready to Close More Deals Faster?</h2>
                    <p className="sp-cta-sub">See how PropAxis helps your sales team never miss a follow-up again.</p>
                    <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                        <Link to="/contact" className="sp-btn-primary">Book PropAxis Demo <FiArrowRight /></Link>
                        <Link to="/portfolio/project" className="sp-btn-primary">View Our Work <FiArrowRight /></Link>
                    </div>
                </div>

                <ProductPricingSection productRoute="/products/real-estate" color="#6b3fa0" />

            </div>
        </div>
    )
}