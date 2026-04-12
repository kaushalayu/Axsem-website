import { useEffect, useRef } from "react"
import { FiSearch, FiFileText, FiLink, FiMap, FiBarChart2, FiCheckSquare, FiArrowRight, FiCheck } from "react-icons/fi"
import PageHero from "../Components/PageHero"
import { usePricing } from "../hooks/usePricing"
import "../Styles/ServicePageShared.css"
import "../Styles/PackagePage.css"
import "../Styles/DevelopmentPage.css"

function useRevealCards() {
    const ref = useRef(null)
    useEffect(() => {
        const el = ref.current; if (!el) return
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) el.querySelectorAll(".pkg-feat-card").forEach((c, i) => setTimeout(() => c.classList.add("pkg-in"), i * 70))
        }, { threshold: 0.04 })
        obs.observe(el); return () => obs.disconnect()
    }, [])
    return ref
}

const FEATS = [
    { icon: <FiCheckSquare />, t: "Technical SEO Audit", d: "Full site crawl — broken links, duplicate content, missing tags, speed issues all identified and fixed." },
    { icon: <FiFileText />, t: "On-Page Optimisation", d: "Title tags, meta descriptions, H1–H6 structure, image alt texts — 10 pages optimised per month." },
    { icon: <FiSearch />, t: "10 Target Keywords", d: "Keyword research, competition analysis, and monthly tracking for 10 business-relevant keywords." },
    { icon: <FiMap />, t: "Local SEO (Google Maps)", d: "Google Business Profile optimisation, local citations, and map pack ranking strategy." },
    { icon: <FiLink />, t: "Basic Link Building", d: "5 quality backlinks per month from relevant directories and local websites." },
    { icon: <FiBarChart2 />, t: "Monthly SEO Report", d: "Keyword rankings, organic traffic, and actions taken — clear plain-English report every month." },
]
const ALL = ["Technical SEO audit", "10 keywords tracked", "10 pages on-page SEO", "Meta tags & schema basics", "XML sitemap submission", "Google Search Console setup", "Google Business Profile", "Local citations (5/mo)", "5 backlinks per month", "Competitor keyword analysis", "Monthly ranking report", "Response time: 48 hours"]
const NOT = ["Blog content writing", "Advanced schema markup", "E-commerce SEO", "25+ keywords", "Video SEO", "Advanced link building (10+/mo)"]

export default function BasicSeoPage() {
    const featRef = useRevealCards()
    const { getPrice } = usePricing()
    const price = getPrice('seo', 'basic')
    return (
        <div className="sp-page dp-page">
            <PageHero
                breadcrumbs={[{ label: "Packages", }, { label: "SEO" }, { label: "Basic" }]}
                pill="SEO Package · Basic"
                title={<>Basic SEO<br /><span className="ph-gradient">Package</span></>}
                subtitle="Technical SEO, on-page optimisation, local SEO, and monthly reporting — everything a small business needs to start ranking on Google."
                tag="Best For: Local Businesses & New Websites"
            />
            <div className="sp-body dp-body">
                <div className="dp-cubes" aria-hidden><div className="dp-cube dp-c1" /><div className="dp-cube dp-c2" /><div className="dp-cube dp-c3" /></div>

                <div className="pkg-layout">
                    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
                        <div>
                            <div className="sp-section-header">
                                <div className="sp-pill">What's Included</div>
                                <h2 className="sp-section-title">Basic SEO <span className="sp-hl">Features</span></h2>
                                <p className="sp-section-sub">A solid SEO foundation — technical fixes, on-page optimisation, and local visibility every month.</p>
                            </div>
                            <div className="pkg-feat-grid" ref={featRef}>
                                {FEATS.map((f, i) => (
                                    <div key={f.t} className="pkg-feat-card" style={{ "--delay": `${i * .07}s` }}>
                                        <div className="pkg-fi">{f.icon}</div>
                                        <div><p className="pkg-ft">{f.t}</p><p className="pkg-fd">{f.d}</p></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <div className="sp-section-header"><div className="sp-pill">Full Feature List</div><h2 className="sp-section-title">Everything You <span className="sp-hl">Get</span></h2></div>
                            <div className="pkg-checklist">{ALL.map(f => <div key={f} className="pkg-check-row"><span className="pkg-check-dot">✓</span>{f}</div>)}</div>
                        </div>
                        <div className="pkg-excluded">
                            <div className="pkg-excl-title">Not included in Basic SEO</div>
                            <div className="pkg-excl-tags">{NOT.map(f => <span key={f} className="pkg-excl-tag">{f}</span>)}</div>
                        </div>
                        <div className="pkg-upgrade">
                            <div><h3>Want faster and bigger results?</h3><p>Upgrade to Advanced SEO for more keywords, blog content, and aggressive link building.</p></div>
                            <a href="/packages/seo/advanced" className="sp-btn-primary">Advanced SEO <FiArrowRight /></a>
                        </div>
                    </div>

                    <div className="pkg-card">
                        <div className="pkg-card-label">Package</div>
                        <div className="pkg-card-name">Basic SEO</div>
                        <div className="pkg-card-price">{price}</div>
                        <div className="pkg-card-per">per month · minimum 3 months</div>
                        <hr className="pkg-card-divider" />
                        <ul className="pkg-card-list">
                            {["10 keywords", "Technical audit", "On-page SEO (10 pages)", "Local SEO", "5 backlinks/mo", "Monthly report"].map(f => <li key={f}><FiCheck />{f}</li>)}
                        </ul>
                        <a href="/contact" className="pkg-card-cta">Get Started <FiArrowRight /></a>
                        <a href="/projects" className="pkg-card-cta">View Case Studies <FiArrowRight /></a>
                    </div>
                </div>

                <div className="sp-cta sp-anim">
                    <h2 className="sp-cta-title">Start Ranking on Google</h2>
                    <p className="sp-cta-sub">Get a free SEO audit — we'll show you exactly what's hurting your rankings.</p>
                    <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                        <a href="/contact" className="sp-btn-primary" >Get Free SEO Audit <FiArrowRight /></a>
                        <a href="/projects" className="sp-btn-primary" >View Case Studies <FiArrowRight /></a>
                    </div>
                </div>
            </div>
        </div>
    )
}