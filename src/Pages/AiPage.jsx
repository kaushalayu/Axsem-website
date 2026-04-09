import { useState, useEffect, useRef } from "react"
import { FiCpu, FiMessageCircle, FiFileText, FiBarChart2, FiZap, FiCode, FiArrowRight, FiCheckCircle, FiPlus, FiTrendingUp } from "react-icons/fi"
import PageHero from "../Components/PageHero"
import ProductPricingSection from "../Components/ProductPricingSection"
import "../Styles/ServicePage.css"
import { Link } from "react-router-dom"
import AiImg from "../assets/erp.jpeg"

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
    { icon: <FiMessageCircle />, title: "AI Chatbot Builder", desc: "Train custom chatbots on your business data — for customer support, lead qualification, or internal helpdesk." },
    { icon: <FiFileText />, title: "Document Intelligence", desc: "Auto-extract structured data from invoices, forms, contracts, and PDFs using computer vision and NLP." },
    { icon: <FiBarChart2 />, title: "Predictive Analytics", desc: "Forecast sales, inventory demand, and customer churn using your historical data — no ML expertise needed." },
    { icon: <FiZap />, title: "Workflow Automation", desc: "Connect your tools and automate repetitive tasks — email responses, data entry, approvals, and reports." },
    { icon: <FiCode />, title: "AI Content Generation", desc: "Generate product descriptions, email drafts, and reports aligned to your brand voice automatically." },
    { icon: <FiCpu />, title: "Custom AI Integrations", desc: "Embed OpenAI, Gemini, or custom models into your existing software via clean API integrations." },
]

const techStack = [
    { cat: "AI Models", items: ["OpenAI GPT-4", "Gemini", "LangChain"] },
    { cat: "Backend", items: ["Python", "FastAPI", "Node.js"] },
    { cat: "Frontend", items: ["React", "Next.js"] },
    { cat: "Infra", items: ["AWS", "PostgreSQL", "Redis"] },
]

const steps = [
    { num: "01", title: "Discovery", desc: "Identify repetitive tasks and automation opportunities" },
    { num: "02", title: "Data Audit", desc: "Review existing data quality and integration points" },
    { num: "03", title: "Pilot Build", desc: "Build a focused pilot automation in 2 weeks" },
    { num: "04", title: "Testing", desc: "Validate accuracy, edge cases, and user acceptance" },
    { num: "05", title: "Rollout", desc: "Deploy to production with full team training" },
    { num: "06", title: "Iteration", desc: "Monitor, refine, and expand automation coverage" },
]

const stats = [
    { val: "70%", lbl: "Reduction in Manual Work" },
    { val: "10x", lbl: "Faster Document Processing" },
    { val: "24/7", lbl: "AI Chatbot Availability" },
    { val: "30+", lbl: "Automations Built" },
]

const faqs = [
    { q: "Do I need technical staff to use AI automation?", a: "No. We build and maintain the AI systems. Your team uses simple interfaces — no coding or ML knowledge needed." },
    { q: "How accurate is document data extraction?", a: "Typically 95–98% accuracy for structured documents like invoices. We include a human review layer for critical fields." },
    { q: "Can the chatbot handle Hindi and regional languages?", a: "Yes. We support Hindi, Tamil, Telugu, and other Indian languages depending on the use case and training data." },
    { q: "What data do you need to train the chatbot?", a: "Your FAQs, product catalogues, support tickets, and knowledge base documents are sufficient to start." },
]

export default function AiProductPage() {
    const statsRef = useReveal()
    const overviewRef = useReveal()
    const featRef = useReveal()
    const stepsRef = useReveal()
    const techRef = useReveal()
    const faqRef = useReveal()

    return (
        <div className="sp-page">
            <PageHero
                breadcrumbs={[{ label: "Products", to: "/products" }, { label: "AI Solutions" }]}
                pill="Artificial Intelligence"
                title={<>Automate Smarter,<br /><span className="ph-gradient">Decide Faster with AI</span></>}
                subtitle="Practical AI automation for your business — chatbots, document intelligence, predictive analytics, and workflow automation. No data science team needed."
                tag="AI-First Products for Indian Businesses"
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
                        <h2 className="sp-overview-title">AI That Works<br /><span className="sp-hl">For Your Business</span></h2>
                        <p className="sp-overview-para">Most businesses don't need research-level AI — they need practical automation that saves hours every day. We build AI solutions that integrate into your existing workflows, train on your data, and deliver measurable ROI from day one.</p>
                        <ul className="sp-checklist">
                            {["Custom chatbots trained on your own business data", "Auto-extract data from invoices and documents", "Predictive analytics without a data science team", "Integrates with your existing tools via API"].map(item => (
                                <li key={item}><span className="sp-check-icon">✓</span>{item}</li>
                            ))}
                        </ul>
                        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
                            <Link to="/contact" className="sp-btn-primary" style={{ background: "var(--sp-white)", color: "var(--sp-orange)", border: "1.5px solid var(--sp-orange)" }}>See a Live AI Demo <FiArrowRight /></Link>
                            <Link to="/portfolio/project" className="sp-btn-primary" style={{ background: "var(--sp-white)", color: "var(--sp-orange)", border: "1.5px solid var(--sp-orange)" }}>View Projects <FiArrowRight /></Link>
                        </div>
                    </div>
                    <div className="sp-overview-visual">
                        <div className="sp-visual-box">
                            <FiCpu className="sp-visual-icon" />
                            <img src={AiImg} alt="AI Solutions" />
                            <span className="sp-visual-label">AI Solutions</span>
                        </div>
                        <div className="sp-visual-badge sp-vb-1"><FiZap style={{ color: "var(--sp-orange)" }} /> 70% Less Manual Work</div>
                        <div className="sp-visual-badge sp-vb-2"><FiCheckCircle style={{ color: "var(--sp-orange)" }} /> 24/7 Available</div>
                    </div>
                </div>

                <div>
                    <div className="sp-section-header">
                        <div className="sp-pill">Features</div>
                        <h2 className="sp-section-title">AI Automation <span className="sp-hl">Capabilities</span></h2>
                        <p className="sp-section-sub">From chatbots to predictive analytics — practical AI tools built for real business problems.</p>
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
                        <h2 className="sp-section-title">AI Implementation <span className="sp-hl">Process</span></h2>
                        <p className="sp-section-sub">From discovery to deployed automation — a clear 6-step process.</p>
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
                        <h2 className="sp-section-title">Built With <span className="sp-hl">Modern AI Tech</span></h2>
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
                    <h2 className="sp-cta-title">Ready to Automate Your Business with AI?</h2>
                    <p className="sp-cta-sub">See a live AI demo built for a business like yours — 30 minutes, no commitment.</p>
                    <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                        <Link to="/contact" className="sp-btn-primary">Book an AI Demo <FiArrowRight /></Link>
                        <Link to="/portfolio/project" className="sp-btn-primary">View Our Work <FiArrowRight /></Link>
                    </div>
                </div>

                <ProductPricingSection productRoute="/products/ai-solutions" color="#6b3fa0" />

            </div>
        </div>
    )
}