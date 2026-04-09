import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import {
    FiSearch, FiTrendingUp, FiLink, FiFileText, FiBarChart2,
    FiGlobe, FiArrowRight, FiPlus, FiZap, FiSettings,
    FiCode, FiLayers, FiTarget, FiCheckCircle
} from "react-icons/fi"
import PageHero from "../Components/PageHero"
import "../Styles/ServicePageShared.css"
import SeoImg from "../assets/digital.jpeg"

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
    { icon: <FiSettings />, title: "Technical SEO", desc: "Site speed, Core Web Vitals, crawlability, structured data, canonical tags — everything Google needs to rank you.", tag: "Technical" },
    { icon: <FiFileText />, title: "On-Page Optimisation", desc: "Keyword research, meta tags, heading hierarchy, content optimisation, and internal linking done right.", tag: "On-Page" },
    { icon: <FiLink />, title: "Link Building", desc: "White-hat backlink acquisition through outreach, guest posting, and digital PR to build domain authority.", tag: "Off-Page" },
    { icon: <FiFileText />, title: "SEO Content Writing", desc: "Keyword-targeted blog posts, landing pages, and pillar content that ranks and converts organic traffic.", tag: "Content" },
    { icon: <FiBarChart2 />, title: "SEO Audit & Strategy", desc: "Comprehensive audit of your existing SEO health with a prioritised 90-day roadmap for quick wins and long-term growth.", tag: "Audit" },
    { icon: <FiGlobe />, title: "Local & E-Commerce SEO", desc: "Google Business Profile optimisation, local citations, and product/category page SEO for local businesses and online stores.", tag: "Local/E-Comm" },
]

const process = [
    { num: "01", title: "SEO Audit", desc: "Full technical, on-page, and backlink audit of current state" },
    { num: "02", title: "Keyword Research", desc: "Map high-value, low-competition keywords to pages" },
    { num: "03", title: "Strategy", desc: "90-day roadmap with quick wins and long-term goals" },
    { num: "04", title: "Implementation", desc: "Technical fixes, on-page updates, content creation" },
    { num: "05", title: "Link Building", desc: "Outreach, digital PR, and authority-building campaigns" },
    { num: "06", title: "Reporting", desc: "Monthly rank tracking, traffic analysis, and next-steps" },
]

const techStack = [
    { cat: "Audit Tools", items: ["Screaming Frog", "Ahrefs", "SEMrush", "Sitebulb"] },
    { cat: "Keyword Tools", items: ["Ahrefs", "Google Search Console", "Ubersuggest"] },
    { cat: "Analytics", items: ["Google Analytics 4", "Search Console", "Looker Studio"] },
    { cat: "Technical", items: ["PageSpeed Insights", "Schema.org", "GTmetrix", "Cloudflare"] },
]

const stats = [
    { val: "3x", lbl: "Avg. Organic Traffic Growth" },
    { val: "Top 3", lbl: "Rankings for target keywords" },
    { val: "6mo", lbl: "Average to See Results" },
    { val: "30+", lbl: "SEO Clients Served" },
]

const faqs = [
    { q: "How long does SEO take to show results?", a: "SEO is a long-term investment. Technical fixes and on-page changes can show in 4–8 weeks. Meaningful ranking improvements typically take 3–6 months. Full organic traffic growth takes 6–12 months of consistent effort." },
    { q: "What's included in the monthly SEO retainer?", a: "Monthly deliverables include: rank tracking report, 2–4 optimised content pieces, ongoing technical fixes, link building outreach, and a strategy call. Scope varies by plan." },
    { q: "Do you guarantee first-page rankings?", a: "No ethical SEO agency can guarantee rankings — Google's algorithm has 200+ factors. What we guarantee is transparent work, measurable progress, and a strategy backed by data and best practices." },
    { q: "Can you do SEO for an e-commerce site?", a: "Yes. E-commerce SEO is a specialisation of ours — product page optimisation, category SEO, structured data for rich snippets, site architecture for crawl efficiency, and Google Shopping feeds." },
    { q: "Do you also handle paid search (Google Ads)?", a: "SEO and PPC are separate services. We focus on organic SEO. For Google Ads, we can recommend trusted partners or we can manage it as an add-on under our Digital Marketing service." },
]

export default function SeoPage() {
    const overviewRef = useReveal(); const statsRef = useReveal(); const servicesRef = useReveal()
    const processRef = useReveal(); const techRef = useReveal(); const faqRef = useReveal()

    return (
        <div className="sp-page">
            <PageHero
                breadcrumbs={[{ label: "Services", }, { label: "SEO" }]}
                pill="Search Engine Optimisation"
                pillIcon={<FiSearch />}
                title={<>Rank Higher, <span className="ph-gradient">Get Found, Grow</span></>}
                subtitle="Technical SEO, content strategy, and link building that puts your business on page one of Google — and keeps it there."
                tag="3x Average Organic Traffic Growth"
            />

            <div className="sp-body">

                <div className="sp-overview-grid sp-anim" ref={overviewRef}>
                    <div className="sp-overview-text">
                        <h2 className="sp-overview-title">Your Customers Are <span className="sp-hl">Already Searching</span></h2>
                        <p className="sp-overview-para">93% of online experiences start with a search engine. If your business isn't on the first page, you're invisible. We change that — with technical precision, quality content, and authority-building that Google rewards with rankings.</p>
                        <p className="sp-overview-para">We don't chase algorithm tricks. We build sustainable organic visibility that brings you qualified traffic month after month — without paying per click.</p>
                        <ul className="sp-checklist">
                            {["Full technical SEO audit on day one", "Keyword strategy mapped to your buyer journey", "Monthly rank tracking with transparent reporting", "No black-hat tactics — only white-hat, sustainable SEO"].map(i => (
                                <li key={i}><span className="sp-check-icon">✓</span>{i}</li>
                            ))}
                        </ul>
                        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
                            <Link to="/contact" className="sp-btn-primary">Get a Free SEO Audit <FiArrowRight /></Link>
                        </div>
                    </div>
                    <div className="sp-overview-visual">
                        <div className="sp-visual-box">
                            <FiSearch className="sp-visual-icon" />
                            <img src={SeoImg} alt="SEO" />
                            <span className="sp-visual-label">Search Engine Optimisation</span>
                        </div>
                        <div className="sp-visual-badge sp-vb-1"><FiTrendingUp style={{ color: "var(--sp-orange)" }} /> 3x Traffic Growth</div>
                        <div className="sp-visual-badge sp-vb-2"><FiTarget style={{ color: "var(--sp-orange)" }} /> Page 1 Rankings</div>
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
                        <h2 className="sp-section-title">SEO <span className="sp-hl">Services</span></h2>
                        <p className="sp-section-sub">Comprehensive SEO coverage — technical, content, and authority building under one roof.</p>
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
                        <h2 className="sp-section-title">Our SEO <span className="sp-hl">Process</span></h2>
                        <p className="sp-section-sub">Audit to reporting — a systematic approach that compounds results month over month.</p>
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
                        <p className="sp-section-sub">Industry-leading SEO tools for auditing, tracking, and growing your organic presence.</p>
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
                    <h2 className="sp-cta-title">Ready to Rank on Page One?</h2>
                    <p className="sp-cta-sub">Get a free SEO audit that shows exactly where you stand and what it'll take to outrank your competition.</p>
                    <Link to="/contact" className="sp-btn-primary">Get Free SEO Audit <FiArrowRight /></Link>
                </div>

            </div>
        </div>
    )
}