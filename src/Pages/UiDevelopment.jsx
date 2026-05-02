import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { FiLayout, FiEye, FiSmartphone, FiMonitor, FiUsers, FiTarget, FiArrowRight, FiPlus, FiCheckCircle, FiCode, FiLayers, FiTrendingUp, FiSettings, FiZap, FiStar } from "react-icons/fi"
import PageHero from "../Components/PageHero"
import "../Styles/ServicePageShared.css"
import UiImg from "../assets/ui-real.jpeg"

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

const services = [
    { icon: <FiLayout />, title: "Product UI Design", desc: "End-to-end interface design for web and mobile products — from wireframes to dev-ready Figma files.", tag: "UI Design" },
    { icon: <FiUsers />, title: "UX Research & Audit", desc: "User interviews, heatmap analysis, usability testing, and UX audits to find and fix friction points.", tag: "UX Research" },
    { icon: <FiSmartphone />, title: "Mobile App UI", desc: "Platform-native app designs following Apple HIG and Material Design guidelines for iOS and Android.", tag: "Mobile UI" },
    { icon: <FiMonitor />, title: "Website & Landing Page UI", desc: "Conversion-focused website designs that balance aesthetics, brand identity, and user psychology.", tag: "Web UI" },
    { icon: <FiTarget />, title: "Design Systems", desc: "Scalable component libraries and design tokens that keep your product consistent as it grows.", tag: "Design System" },
    { icon: <FiEye />, title: "Prototype & Testing", desc: "Interactive Figma prototypes for stakeholder reviews and usability testing before a single line of code.", tag: "Prototype" },
]

const process = [
    { num: "01", title: "Discovery", desc: "User research, competitor audit, brand guidelines review" },
    { num: "02", title: "Wireframes", desc: "Low-fidelity layouts to validate information architecture" },
    { num: "03", title: "Visual Design", desc: "High-fidelity UI screens with your brand voice" },
    { num: "04", title: "Prototype", desc: "Interactive Figma prototype for realistic user flows" },
    { num: "05", title: "User Testing", desc: "Testing with real users, iterating on feedback" },
    { num: "06", title: "Dev Handoff", desc: "Annotated Figma files, design tokens, assets export" },
]

const techStack = [
    { cat: "Design Tools", items: ["Figma", "FigJam", "Adobe XD", "Illustrator"] },
    { cat: "Prototyping", items: ["Figma Prototype", "ProtoPie", "Framer", "Principle"] },
    { cat: "Research", items: ["Hotjar", "Maze", "Lookback", "Google Analytics"] },
    { cat: "Handoff", items: ["Figma Dev Mode", "Zeplin", "Storybook", "CSS Export"] },
]

const stats = [
    { val: "40+", lbl: "Products Designed" },
    { val: "3.2x", lbl: "Avg. Conversion Lift" },
    { val: "98%", lbl: "Client Satisfaction" },
    { val: "2wk", lbl: "First Design in 2 Weeks" },
]

const faqs = [
    { q: "Do you deliver Figma source files?", a: "Yes — you receive complete, organised Figma files with components, auto-layouts, and design tokens. Everything is structured for easy developer handoff." },
    { q: "Can you work with our existing brand guidelines?", a: "Absolutely. We adapt to your existing brand identity, colour palette, and typography. If you don't have guidelines, we can create a brand style guide as part of the engagement." },
    { q: "Do you do UX only, or visual design too?", a: "Both. We offer end-to-end design: UX research → wireframes → visual UI design → interactive prototypes → dev handoff. Or just one phase if you need it." },
    { q: "How do you handle design revisions?", a: "Every project includes 2 rounds of revisions per milestone. We present designs with a clear rationale — changes that go outside the agreed scope are handled via a simple change request process." },
    { q: "Can your developers also build what you design?", a: "Yes. Axsem is a full-service agency. If you want both design and development, we offer a seamless end-to-end engagement with zero handoff friction." },
]

export default function UiUxDesignPage() {
    const overviewRef = useReveal(); const statsRef = useReveal(); const servicesRef = useReveal()
    const processRef = useReveal(); const techRef = useReveal(); const faqRef = useReveal()
    return (
        <div className="sp-page">
            <PageHero breadcrumbs={[{ label: "Services" }, { label: "UI/UX Design" }]} pill="UI/UX Design" pillIcon={<FiLayout />} title={<>Design That <span className="ph-gradient">Converts & Delights</span></>} subtitle="Beautiful interfaces built on solid UX research. We design products that users love and businesses profit from — every pixel with purpose." tag="40+ Products Designed" />
            <div className="sp-body">
                <div className="sp-overview-grid sp-anim" ref={overviewRef}>
                    <div className="sp-overview-text">
                        <h2 className="sp-overview-title">Good Design Is <span className="sp-hl">Good Business</span></h2>
                        <p className="sp-overview-para">A confusing interface costs you users. A beautiful but unusable one costs you even more. We bridge the gap between aesthetics and function — creating experiences that guide users effortlessly to the outcomes your business needs.</p>
                        <p className="sp-overview-para">Every design decision we make is backed by user research, conversion data, and platform best practices — not just visual preference.</p>
                        <ul className="sp-checklist">
                            {["Research-backed UX, not just pretty screens", "Figma files with components and design tokens", "Interactive prototype before development begins", "Dev-ready handoff with annotations and assets"].map(i => (<li key={i}><span className="sp-check-icon">✓</span>{i}</li>))}
                        </ul>
                        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}><Link to="/contact" className="sp-btn-primary">Start with a Design Audit <FiArrowRight /></Link></div>
                    </div>
                    <div className="sp-overview-visual">
                        <div className="sp-visual-box"><FiLayout className="sp-visual-icon" /><img src={UiImg} alt="UI/UX Design" /><span className="sp-visual-label">UI/UX Design</span></div>
                        <div className="sp-visual-badge sp-vb-1"><FiStar style={{ color: "var(--sp-orange)" }} /> Figma Expert</div>
                        <div className="sp-visual-badge sp-vb-2"><FiZap style={{ color: "var(--sp-orange)" }} /> 2-Week First Draft</div>
                    </div>
                </div>
                <div className="sp-stats-strip sp-anim" ref={statsRef}>{stats.map((s, i) => (<div key={s.lbl} className="sp-stat-card" style={{ "--delay": `${i * .08}s` }}><span className="sp-stat-val">{s.val}</span><span className="sp-stat-lbl">{s.lbl}</span></div>))}</div>
                <div>
                    <div className="sp-section-header"><div className="sp-pill"><FiLayers /> What We Design</div><h2 className="sp-section-title">UI/UX Design <span className="sp-hl">Services</span></h2><p className="sp-section-sub">From research to pixel-perfect handoff — every design service your product needs.</p></div>
                    <div className="sp-cards-grid sp-cols-3 sp-anim" ref={servicesRef}>{services.map((s, i) => (<div key={s.title} className="sp-card" style={{ "--delay": `${i * .08}s` }}><div className="sp-card-icon">{s.icon}</div><div className="sp-card-tag">{s.tag}</div><h3 className="sp-card-title">{s.title}</h3><p className="sp-card-desc">{s.desc}</p></div>))}</div>
                </div>
                <div>
                    <div className="sp-section-header sp-center"><div className="sp-pill"><FiSettings /> Process</div><h2 className="sp-section-title">Our Design <span className="sp-hl">Process</span></h2><p className="sp-section-sub">A structured 6-step process that delivers great design consistently — every time.</p></div>
                    <div className="sp-steps-grid sp-anim" ref={processRef}>{process.map((p, i) => (<div key={p.num} className="sp-step" style={{ "--delay": `${i * .08}s` }}><div className="sp-step-num"><span>{p.num}</span></div><div className="sp-step-title">{p.title}</div><div className="sp-step-desc">{p.desc}</div></div>))}</div>
                </div>
                <div>
                    <div className="sp-section-header"><div className="sp-pill"><FiCode /> Tools</div><h2 className="sp-section-title">Design Tools We <span className="sp-hl">Use</span></h2><p className="sp-section-sub">Industry-standard tools for design, prototyping, testing, and developer handoff.</p></div>
                    <div className="sp-tech-grid sp-anim" ref={techRef}>{techStack.map((t, i) => (<div key={t.cat} className="sp-tech-card" style={{ "--delay": `${i * .08}s` }}><span className="sp-tech-cat">{t.cat}</span><div className="sp-tech-items">{t.items.map(item => (<span key={item} className="sp-tech-item">{item}</span>))}</div></div>))}</div>
                </div>
                <div>
                    <div className="sp-section-header"><div className="sp-pill"><FiTrendingUp /> FAQ</div><h2 className="sp-section-title">Common <span className="sp-hl">Questions</span></h2></div>
                    <div className="sp-faq-list sp-anim" ref={faqRef}>{faqs.map((f, i) => (<div key={i} style={{ "--delay": `${i * .07}s` }}><FaqItem q={f.q} a={f.a} /></div>))}</div>
                </div>
                <div className="sp-cta sp-anim"><h2 className="sp-cta-title">Let's Design Your Next Product</h2><p className="sp-cta-sub">Share your product idea and get a free UX audit or design proposal within 48 hours.</p><Link to="/contact" className="sp-btn-primary">Get a Free Design Audit <FiArrowRight /></Link></div>
            </div>
        </div>
    )
}