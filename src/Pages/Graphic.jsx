import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import {
    FiFeather, FiImage, FiPackage, FiMonitor, FiFilm,
    FiPenTool, FiArrowRight, FiPlus, FiZap, FiSettings,
    FiCode, FiLayers, FiTrendingUp, FiStar
} from "react-icons/fi"
import PageHero from "../Components/PageHero"
import "../Styles/ServicePageShared.css"
import GraphicImg from "../assets/ads.jpeg"

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
    { icon: <FiFeather />, title: "Brand Identity & Logo", desc: "Logo design, colour palettes, typography, and brand guidelines that give your business a consistent, memorable identity.", tag: "Branding" },
    { icon: <FiImage />, title: "Social Media Creatives", desc: "Scroll-stopping post designs, stories, reels covers, and ad creatives optimised for Instagram, LinkedIn, and Facebook.", tag: "Social Media" },
    { icon: <FiPackage />, title: "Packaging Design", desc: "Product packaging, labels, and box designs that stand out on shelves and reinforce your premium brand positioning.", tag: "Packaging" },
    { icon: <FiMonitor />, title: "Marketing Collateral", desc: "Brochures, flyers, pitch decks, banners, and all print/digital materials your sales and marketing team needs.", tag: "Collateral" },
    { icon: <FiFilm />, title: "Motion Graphics", desc: "Animated logos, explainer videos, social media animations, and ad motion creatives that capture attention instantly.", tag: "Motion" },
    { icon: <FiPenTool />, title: "UI Graphics & Illustrations", desc: "Custom icons, illustration sets, infographics, and UI graphics that add personality and clarity to your digital products.", tag: "Illustration" },
]

const process = [
    { num: "01", title: "Brief", desc: "Understand brand, audience, goals, and design references" },
    { num: "02", title: "Mood Board", desc: "Visual direction — colours, typography, style, and tone" },
    { num: "03", title: "Concepts", desc: "2–3 initial design concepts for your feedback" },
    { num: "04", title: "Refinement", desc: "Iterate on the chosen concept with your feedback" },
    { num: "05", title: "Final Files", desc: "Deliver all formats: AI, EPS, SVG, PNG, PDF" },
    { num: "06", title: "Brand Guide", desc: "Usage guidelines so your brand stays consistent everywhere" },
]

const techStack = [
    { cat: "Vector & Brand", items: ["Adobe Illustrator", "Figma", "CorelDRAW", "Affinity Designer"] },
    { cat: "Photo & Print", items: ["Adobe Photoshop", "Adobe InDesign", "Lightroom", "Canva Pro"] },
    { cat: "Motion", items: ["Adobe After Effects", "Premiere Pro", "Rive", "Lottie"] },
    { cat: "Prototyping", items: ["Figma", "Adobe XD", "ProtoPie", "InVision"] },
]

const stats = [
    { val: "200+", lbl: "Design Projects Delivered" },
    { val: "48hr", lbl: "First Draft Turnaround" },
    { val: "100%", lbl: "Source Files Delivered" },
    { val: "5★", lbl: "Average Client Rating" },
]

const faqs = [
    { q: "What file formats do you deliver?", a: "We deliver all source files (AI, PSD, INDD) plus all common export formats — SVG, EPS, PNG (transparent), JPG, and PDF (print-ready). You own everything." },
    { q: "How many revision rounds are included?", a: "Most projects include 2 rounds of revisions per milestone. For logo projects, we present 3 initial concepts and include 3 revision rounds on the chosen direction. Revisions beyond that are handled via a simple hourly rate." },
    { q: "Can you match our existing brand identity?", a: "Yes. If you have existing brand guidelines, we work within them to create consistent assets. If your guidelines are outdated, we can refresh them as part of the engagement." },
    { q: "Do you do one-off projects or only retainers?", a: "Both. One-off projects like a logo or brochure are welcome. We also offer monthly design retainers (10, 20, or 40 hours/month) for businesses that need a consistent stream of creatives." },
    { q: "Can you create animated versions of our logo?", a: "Yes. We create Lottie animations and After Effects-based animated logos for use in video intros, loading screens, and social media — fully optimised for web and mobile use." },
]

export default function GraphicDesigningPage() {
    const overviewRef = useReveal(); const statsRef = useReveal(); const servicesRef = useReveal()
    const processRef = useReveal(); const techRef = useReveal(); const faqRef = useReveal()

    return (
        <div className="sp-page">
            <PageHero
                breadcrumbs={[{ label: "Services", }, { label: "Graphic Designing" }]}
                pill="Graphic Designing"
                pillIcon={<FiFeather />}
                title={<>Visuals That Make Your <span className="ph-gradient">Brand Unforgettable</span></>}
                subtitle="Logo design, brand identity, social media creatives, packaging, motion graphics — everything your brand needs to look world-class and stand out in every market."
                tag="200+ Design Projects · 48hr Turnaround"
            />

            <div className="sp-body">

                <div className="sp-overview-grid sp-anim" ref={overviewRef}>
                    <div className="sp-overview-text">
                        <h2 className="sp-overview-title">Design That Makes People <span className="sp-hl">Remember You</span></h2>
                        <p className="sp-overview-para">Your brand is the first thing people judge you by — and they do it in under 3 seconds. We create visual identities and marketing materials that make the right impression instantly, consistently, and memorably.</p>
                        <p className="sp-overview-para">From a single social media post to a complete brand overhaul, every design we deliver is purposeful, on-brand, and built for the medium it lives in.</p>
                        <ul className="sp-checklist">
                            {["All source files delivered — you own everything", "First draft within 48 hours for most projects", "2–3 concept directions for logos and branding", "Consistent style that works across print and digital"].map(i => (
                                <li key={i}><span className="sp-check-icon">✓</span>{i}</li>
                            ))}
                        </ul>
                        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
                            <Link to="/contact" className="sp-btn-primary">Start a Design Project <FiArrowRight /></Link>
                        </div>
                    </div>
                    <div className="sp-overview-visual">
                        <div className="sp-visual-box">
                            <FiFeather className="sp-visual-icon" />
                            <img src={GraphicImg} alt="Graphic Design" />
                            <span className="sp-visual-label">Graphic Designing</span>
                        </div>
                        <div className="sp-visual-badge sp-vb-1"><FiStar style={{ color: "var(--sp-orange)" }} /> 5★ Rated</div>
                        <div className="sp-visual-badge sp-vb-2"><FiZap style={{ color: "var(--sp-orange)" }} /> 48hr First Draft</div>
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
                        <h2 className="sp-section-title">Graphic Design <span className="sp-hl">Services</span></h2>
                        <p className="sp-section-sub">Branding, print, digital, and motion — every creative service under one roof.</p>
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

                <div>
                    <div className="sp-section-header sp-center">
                        <div className="sp-pill"><FiSettings /> Process</div>
                        <h2 className="sp-section-title">Our Design <span className="sp-hl">Process</span></h2>
                        <p className="sp-section-sub">Brief to final files — a creative process that keeps you in control at every stage.</p>
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
                        <p className="sp-section-sub">Industry-standard Adobe suite and modern design tools for every type of creative work.</p>
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
                    <h2 className="sp-cta-title">Ready to Elevate Your Brand?</h2>
                    <p className="sp-cta-sub">Share your brief and get a design proposal with timeline and pricing within 24 hours.</p>
                    <Link to="/contact" className="sp-btn-primary">Start Your Design Project <FiArrowRight /></Link>
                </div>

            </div>
        </div>
    )
}