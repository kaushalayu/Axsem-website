import { useState, useEffect, useRef } from "react"
import { FiUsers, FiTarget, FiMessageSquare, FiBarChart2, FiFileText, FiBell, FiArrowRight, FiCheckCircle, FiPlus, FiTrendingUp } from "react-icons/fi"
import PageHero from "../Components/PageHero"
import ProductPricingSection from "../Components/ProductPricingSection"
import "../Styles/ServicePage.css"
import { Link } from "react-router-dom"
import CRM from "../assets/erp.jpeg"

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
    { icon: <FiTarget />, title: "Lead Management", desc: "Capture leads from website, ads, and portals — assign, score, and track every lead through your sales pipeline." },
    { icon: <FiUsers />, title: "Contact & Account 360°", desc: "Full history of every customer — calls, emails, deals, documents, and support tickets in one view." },
    { icon: <FiFileText />, title: "Quotations & Proposals", desc: "Create and send professional quotations, track when they're opened, and convert to deals in one click." },
    { icon: <FiBell />, title: "Follow-up Automation", desc: "Auto-schedule follow-up reminders, drip sequences, and task assignments so no lead ever goes cold." },
    { icon: <FiMessageSquare />, title: "Email & WhatsApp CRM", desc: "Two-way Gmail/Outlook sync and WhatsApp integration — all customer conversations logged automatically." },
    { icon: <FiBarChart2 />, title: "Sales Analytics", desc: "Pipeline health, conversion rates, revenue forecast, and team performance dashboards for sales managers." },
]

const techStack = [
    { cat: "Frontend", items: ["React", "Next.js"] },
    { cat: "Backend", items: ["Node.js", "PostgreSQL", "Redis"] },
    { cat: "Comms", items: ["Twilio", "WhatsApp API", "Gmail API"] },
    { cat: "Infra", items: ["AWS", "SendGrid"] },
]

const steps = [
    { num: "01", title: "Pipeline Setup", desc: "Define your deal stages, lead sources, and scoring" },
    { num: "02", title: "Team Onboard", desc: "Add sales reps, assign roles and territories" },
    { num: "03", title: "Data Import", desc: "Import existing contacts, leads, and deals" },
    { num: "04", title: "Integrations", desc: "Connect Gmail, WhatsApp, and your website forms" },
    { num: "05", title: "Training", desc: "Sales team training on pipeline and activity tracking" },
    { num: "06", title: "Optimise", desc: "Weekly pipeline review and conversion improvements" },
]

const stats = [
    { val: "300+", lbl: "Sales Teams Using It" },
    { val: "40%", lbl: "Faster Lead-to-Close" },
    { val: "Zero", lbl: "Leads Fall Through Cracks" },
    { val: "3x", lbl: "More Follow-ups Done" },
]

const faqs = [
    { q: "Does the CRM integrate with our website?", a: "Yes. A simple script on your website sends all form submissions directly into the CRM as new leads." },
    { q: "Can we manage WhatsApp conversations in CRM?", a: "Yes. WhatsApp Business API integration lets you send and receive WhatsApp messages logged against each contact." },
    { q: "How many users can we add?", a: "Unlimited users. Pricing is per seat — add or remove users any time from the admin panel." },
    { q: "Can managers see their team's pipeline?", a: "Yes. Role-based access with manager dashboards showing team pipeline, activity, and performance metrics in real time." },
]

export default function CrmPage() {
    const statsRef = useReveal()
    const overviewRef = useReveal()
    const featRef = useReveal()
    const stepsRef = useReveal()
    const techRef = useReveal()
    const faqRef = useReveal()

    return (
        <div className="sp-page">
            <PageHero
                breadcrumbs={[{ label: "Products", }, { label: "CRM" }]}
                pill="Customer Relationship Management"
                title={<>Close More Deals,<br /><span className="ph-gradient">Lose Zero Leads</span></>}
                subtitle="Lead management, contact tracking, quotations, follow-up automation, and sales analytics — a complete CRM for growing Indian businesses."
                tag="300+ Sales Teams Using This CRM"
            />
            <div className="sp-body">

                <div className="sp-stats-strip sp-anim" ref={statsRef}>
                    {stats.map((s, i) => (<div key={s.lbl} className="sp-stat-card" style={{ "--delay": `${i * 0.08}s` }}><span className="sp-stat-val">{s.val}</span><span className="sp-stat-lbl">{s.lbl}</span></div>))}
                </div>

                <div className="sp-overview-grid sp-anim" ref={overviewRef}>
                    <div className="sp-overview-text">
                        <h2 className="sp-overview-title">Every Lead Tracked,<br /><span className="sp-hl">Every Deal Closed</span></h2>
                        <p className="sp-overview-para">Most sales teams lose leads because of poor follow-up — not because of bad sales skills. Our CRM puts every lead in a pipeline, automates follow-up reminders, and gives your manager complete visibility into team performance — so nothing slips through.</p>
                        <ul className="sp-checklist">
                            {["Lead capture from website, ads, and portals", "Auto follow-up reminders — never miss a callback", "Two-way Gmail and WhatsApp integration", "Pipeline dashboards for managers in real time"].map(item => (<li key={item}><span className="sp-check-icon">✓</span>{item}</li>))}
                        </ul>
                        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
                            <Link to="/portfolio/project" className="sp-btn-primary" style={{ background: "var(--sp-white)", color: "var(--sp-orange)", border: "1.5px solid var(--sp-orange)" }}>View Projects <FiArrowRight /></Link>
                            <Link to="/contact" className="sp-btn-primary" style={{ background: "var(--sp-white)", color: "var(--sp-orange)", border: "1.5px solid var(--sp-orange)" }}>Schedule a CRM Demo <FiArrowRight /></Link>
                        </div>
                    </div>
                    <div className="sp-overview-visual">
                        <div className="sp-visual-box"><FiTarget className="sp-visual-icon" /><img src={CRM} alt="CRM Overview" /></div>
                        <div className="sp-visual-badge sp-vb-1"><FiCheckCircle style={{ color: "var(--sp-orange)" }} /> 40% Faster Close</div>
                        <div className="sp-visual-badge sp-vb-2"><FiTrendingUp style={{ color: "var(--sp-orange)" }} /> 3x More Follow-ups</div>
                    </div>
                </div>

                <div>
                    <div className="sp-section-header"><div className="sp-pill">Features</div><h2 className="sp-section-title">Complete CRM <span className="sp-hl">Features</span></h2><p className="sp-section-sub">From first enquiry to repeat customer — every sales stage managed.</p></div>
                    <div className="sp-cards-grid sp-cols-3 sp-anim" ref={featRef}>
                        {features.map((f, i) => (<div key={f.title} className="sp-card" style={{ "--delay": `${i * 0.08}s` }}><div className="sp-card-icon">{f.icon}</div><h3 className="sp-card-title">{f.title}</h3><p className="sp-card-desc">{f.desc}</p></div>))}
                    </div>
                </div>

                <div>
                    <div className="sp-section-header sp-center"><div className="sp-pill">How It Works</div><h2 className="sp-section-title">CRM <span className="sp-hl">Onboarding</span></h2><p className="sp-section-sub">Most sales teams are tracking live leads within 3 days of signing up.</p></div>
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
                    <h2 className="sp-cta-title">Ready to Close More Deals?</h2>
                    <p className="sp-cta-sub">See how our CRM helps your team follow up faster and convert more leads.</p>
                    <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                        <Link to="/contact" className="sp-btn-primary">Book a CRM Demo <FiArrowRight /></Link>
                        <Link to="/portfolio/project" className="sp-btn-primary">View Our Work <FiArrowRight /></Link>
                    </div>
                </div>

                <ProductPricingSection productRoute="/products/crm" color="#0e9e6e" />

            </div>
        </div>
    )
}