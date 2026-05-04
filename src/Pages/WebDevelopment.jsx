import { useState, useEffect, useRef } from "react"
import { usePageData } from "../hooks/usePageData"
import { Link } from "react-router-dom"
import {
    FiGlobe, FiLayout, FiShoppingCart, FiZap, FiSearch,
    FiSmartphone, FiArrowRight, FiPlus, FiCheckCircle,
    FiMonitor, FiCode, FiTrendingUp, FiLayers, FiSettings
} from "react-icons/fi"
import PageHero from "../Components/PageHero"
import "../Styles/SoftwareDevelopment.css"
import WebImg from "../assets/custom-web.jpeg"

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
    { icon: <FiLayout />, title: "Corporate Websites", desc: "Professional, high-performance websites that reflect your brand and convert visitors into leads.", tag: "Corporate" },
    { icon: <FiShoppingCart />, title: "E-Commerce Stores", desc: "Custom storefronts with seamless checkout, inventory management, and payment integrations.", tag: "E-Commerce" },
    { icon: <FiMonitor />, title: "Landing Pages", desc: "Conversion-focused landing pages built for campaigns, product launches, and lead generation.", tag: "Landing Page" },
    { icon: <FiGlobe />, title: "Web Portals & Dashboards", desc: "Role-based portals and admin dashboards that give your team and clients a unified workspace.", tag: "Portal" },
    { icon: <FiSearch />, title: "SEO-Optimised Websites", desc: "Websites built with Core Web Vitals in mind — fast load times, structured data, and technical SEO baked in.", tag: "SEO" },
    { icon: <FiZap />, title: "Performance Optimisation", desc: "Speed audits and full-stack performance improvements for existing websites struggling with load times.", tag: "Optimisation" },
]

const techStack = [
    { cat: "Frameworks", items: ["Next.js", "React", "Astro", "Nuxt"] },
    { cat: "CMS", items: ["Sanity", "Contentful", "WordPress", "Strapi"] },
    { cat: "Styling", items: ["Tailwind CSS", "Framer Motion", "GSAP", "CSS Modules"] },
    { cat: "Deployment", items: ["Vercel", "Netlify", "AWS", "Cloudflare"] },
]

const process = [
    { num: "01", title: "Brief & Goals", desc: "Understanding your audience, goals, brand & competitors" },
    { num: "02", title: "Wireframes", desc: "Low-fidelity wireframes to plan layout and user flow" },
    { num: "03", title: "UI Design", desc: "High-fidelity Figma designs for review and approval" },
    { num: "04", title: "Development", desc: "Pixel-perfect, responsive, accessible front-end build" },
    { num: "05", title: "Testing & Speed", desc: "Cross-browser QA, mobile testing, Core Web Vitals audit" },
    { num: "06", title: "Launch & SEO", desc: "Deployment, DNS setup, sitemap, Search Console config" },
]

const stats = [
    { val: "50+", lbl: "Websites Delivered" },
    { val: "2.1s", lbl: "Avg. Page Load Time" },
    { val: "98", lbl: "Google PageSpeed avg." },
    { val: "100%", lbl: "Mobile Responsive" },
]

const faqs = [
    { q: "How long does a website take to build?", a: "A landing page takes 1–2 weeks. A corporate website takes 3–6 weeks. A full e-commerce or portal project typically takes 6–12 weeks depending on features." },
    { q: "Do you provide CMS so we can edit content ourselves?", a: "Yes. We integrate headless CMS tools like Sanity or Contentful so your team can update content, add blog posts, and manage media without touching code." },
    { q: "Will the website work well on mobile?", a: "Every website we build is mobile-first. We test on actual devices across iOS and Android, and our average mobile PageSpeed score is 95+." },
    { q: "What about SEO — will our site rank?", a: "We build with technical SEO in mind: semantic HTML, structured data, XML sitemaps, fast load times, and Open Graph tags. We also offer ongoing SEO services separately." },
    { q: "Do you redesign existing websites?", a: "Yes. We offer website audits, redesigns, and performance overhauls. We can rebuild your site from scratch while migrating all existing content and preserving your SEO rankings." },
]

export default function WebDevelopmentPage() {
    const pageData = usePageData("/services/web-development", { faqs, gallery: [{ url: WebImg }] })
    const overviewRef = useReveal()
    const statsRef = useReveal()
    const servicesRef = useReveal()
    const processRef = useReveal()
    const techRef = useReveal()
    const faqRef = useReveal()

    const displayImage = pageData.gallery?.[0]?.url || WebImg
    const displayFaqs = pageData.faqs
    const displayHero = pageData.hero || {}

    return (
        <div className="sp-page">
            <PageHero
                breadcrumbs={[{ label: "Services" }, { label: "Website Development" }]}
                pill="Website Development"
                pillIcon={<FiGlobe />}
                title={displayHero.title || <>Websites That <span className="ph-gradient">Work & Convert</span></>}
                subtitle={displayHero.subtitle || "Fast, beautiful, SEO-optimised websites built with modern frameworks. From landing pages to full e-commerce platforms — we deliver pixel-perfect results."}
                tag="50+ Websites Delivered"
            />

            <div className="sp-body">

                {/* OVERVIEW */}
                <div className="sp-overview-grid sp-anim" ref={overviewRef}>
                    <div className="sp-overview-text">
                        <h2 className="sp-overview-title">
                            Your Website Is Your<br />
                            <span className="sp-hl">First Impression</span>
                        </h2>
                        <p className="sp-overview-para">
                            In 2024, a slow or outdated website costs you business every single day. We build websites that load fast, look stunning on every screen, and are engineered to turn visitors into paying customers.
                        </p>
                        <p className="sp-overview-para">
                            Every website we ship gets a Google PageSpeed score of 90+ and is built with clean, semantic code that search engines love.
                        </p>
                        <ul className="sp-checklist">
                            {["Mobile-first, 100% responsive design", "PageSpeed 90+ guaranteed", "CMS integration for self-editing", "Technical SEO built in from day one"].map(i => (
                                <li key={i}><span className="sp-check-icon">✓</span>{i}</li>
                            ))}
                        </ul>
                        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
                            <Link to="/contact" className="sp-btn-primary sp-btn-no-hover">Get a Free Quote <FiArrowRight /></Link>
                        </div>
                    </div>
                    <div className="sp-overview-visual">
                        <div className="sp-visual-box">
                            <FiGlobe className="sp-visual-icon" />
                            <img src={displayImage} alt="Web Development" />
                            <span className="sp-visual-label">Website Development</span>
                        </div>
                        <div className="sp-visual-badge sp-vb-1"><FiZap style={{ color: "var(--sp-orange)" }} /> PageSpeed 98</div>
                        <div className="sp-visual-badge sp-vb-2"><FiSmartphone style={{ color: "var(--sp-orange)" }} /> Mobile-First</div>
                    </div>
                </div>

                {/* STATS */}
                <div className="sp-stats-strip sp-anim" ref={statsRef}>
                    {stats.map((s, i) => (
                        <div key={s.lbl} className="sp-stat-card" style={{ "--delay": `${i * 0.08}s` }}>
                            <span className="sp-stat-val">{s.val}</span>
                            <span className="sp-stat-lbl">{s.lbl}</span>
                        </div>
                    ))}
                </div>

                {/* SERVICES */}
                <div>
                    <div className="sp-section-header">
                        <div className="sp-pill"><FiLayers /> What We Build</div>
                        <h2 className="sp-section-title">Web Development <span className="sp-hl">Services</span></h2>
                        <p className="sp-section-sub">Every type of website and web experience your business needs — all under one roof.</p>
                    </div>
                    <div className="sp-cards-grid sp-cols-3 sp-anim" ref={servicesRef}>
                        {services.map((s, i) => (
                            <div key={s.title} className="sp-card" style={{ "--delay": `${i * 0.08}s` }}>
                                <div className="sp-card-icon">{s.icon}</div>
                                <div className="sp-card-tag">{s.tag}</div>
                                <h3 className="sp-card-title">{s.title}</h3>
                                <p className="sp-card-desc">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* PROCESS */}
                <div>
                    <div className="sp-section-header sp-center">
                        <div className="sp-pill"><FiSettings /> How We Work</div>
                        <h2 className="sp-section-title">Our Website <span className="sp-hl">Process</span></h2>
                        <p className="sp-section-sub">From brief to launch — a clear, collaborative process with you in the loop at every step.</p>
                    </div>
                    <div className="sp-steps-grid sp-anim" ref={processRef}>
                        {process.map((p, i) => (
                            <div key={p.num} className="sp-step" style={{ "--delay": `${i * 0.08}s` }}>
                                <div className="sp-step-num"><span>{p.num}</span></div>
                                <div className="sp-step-title">{p.title}</div>
                                <div className="sp-step-desc">{p.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* TECH STACK */}
                <div>
                    <div className="sp-section-header">
                        <div className="sp-pill"><FiCode /> Tech Stack</div>
                        <h2 className="sp-section-title">Technologies We <span className="sp-hl">Use</span></h2>
                        <p className="sp-section-sub">Modern frameworks and tools that deliver speed, flexibility, and excellent developer experience.</p>
                    </div>
                    <div className="sp-tech-grid sp-anim" ref={techRef}>
                        {techStack.map((t, i) => (
                            <div key={t.cat} className="sp-tech-card" style={{ "--delay": `${i * 0.08}s` }}>
                                <span className="sp-tech-cat">{t.cat}</span>
                                <div className="sp-tech-items">
                                    {t.items.map(item => <span key={item} className="sp-tech-item">{item}</span>)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* FAQ */}
                <div>
                    <div className="sp-section-header">
                        <div className="sp-pill"><FiTrendingUp /> FAQ</div>
                        <h2 className="sp-section-title">Common <span className="sp-hl">Questions</span></h2>
                    </div>
                    <div className="sp-faq-list sp-anim" ref={faqRef}>
                        {displayFaqs.map((f, i) => (
                            <div key={i} style={{ "--delay": `${i * 0.07}s` }}>
                                <FaqItem q={f.q} a={f.a} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="sp-cta sp-anim">
                    <h2 className="sp-cta-title">Let's Build Your Next Website</h2>
                    <p className="sp-cta-sub">Share your requirements and get a detailed proposal with timeline and pricing within 48 hours.</p>
                    <Link to="/contact" className="sp-btn-primary sp-btn-no-hover">Request a Proposal <FiArrowRight /></Link>
                </div>

            </div>
        </div>
    )
}