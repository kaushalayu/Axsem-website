import { useEffect, useRef } from "react"
import { FiSearch, FiTrendingUp, FiLink, FiFileText, FiBarChart2, FiZap, FiArrowRight, FiCheck } from "react-icons/fi"
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
    { icon: <FiSearch />, t: "25+ Target Keywords", d: "Deep keyword research covering short-tail, long-tail, and commercial-intent keywords for your industry." },
    { icon: <FiFileText />, t: "4 SEO Blog Posts / Month", d: "Keyword-optimised, expert-level blog articles (1000–1500 words each) that rank and drive traffic." },
    { icon: <FiLink />, t: "15+ Backlinks / Month", d: "High-authority backlinks from industry-relevant websites — white-hat outreach and digital PR." },
    { icon: <FiTrendingUp />, t: "Full Technical SEO", d: "Core Web Vitals, page speed, crawl budget, structured data, hreflang, and site architecture." },
    { icon: <FiZap />, t: "E-Commerce / Category SEO", d: "Product page optimisation, faceted navigation, schema markup, and category keyword mapping." },
    { icon: <FiBarChart2 />, t: "Advanced Reporting", d: "Weekly ranking updates, GA4 traffic analysis, conversion tracking, and competitor rank comparison." },
]
const ALL = ["25+ keywords tracked", "Full technical SEO audit", "All pages on-page SEO", "Advanced schema markup", "Core Web Vitals optimisation", "4 SEO blog posts/month", "15+ backlinks/month", "Digital PR outreach", "Competitor gap analysis", "E-commerce / category SEO", "GA4 + Search Console advanced", "Conversion tracking setup", "Weekly keyword rank updates", "Monthly strategy call", "Dedicated SEO manager", "Priority 24-hour response"]
const NOT = ["Google / Meta Ads management", "Social media content", "Web design changes"]

export default function AdvancedSeoPage() {
    const featRef = useRevealCards()
    const { getPrice } = usePricing()
    const price = getPrice('seo', 'advanced')
    return (
        <div className="sp-page dp-page">
            <PageHero
                breadcrumbs={[{ label: "Packages", }, { label: "SEO" }, { label: "Advanced" }]}
                pill="SEO Package · Advanced"
                title={<>Advanced SEO<br /><span className="ph-gradient">Package</span></>}
                subtitle="Aggressive, full-spectrum SEO — 25+ keywords, 4 blog posts per month, 15+ backlinks, and weekly reporting — for businesses that want to dominate Google."
                tag="Best For: Competitive Industries & E-Commerce"
            />
            <div className="sp-body dp-body">
                <div className="dp-cubes" aria-hidden><div className="dp-cube dp-c1" /><div className="dp-cube dp-c2" /><div className="dp-cube dp-c3" /></div>

                <div className="pkg-layout">
                    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
                        <div>
                            <div className="sp-section-header">
                                <div className="sp-pill">What's Included</div>
                                <h2 className="sp-section-title">Advanced SEO <span className="sp-hl">Features</span></h2>
                                <p className="sp-section-sub">Everything in Basic, plus content, aggressive link building, and dedicated management.</p>
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
                            <div className="pkg-excl-title">Not included in SEO packages</div>
                            <div className="pkg-excl-tags">{NOT.map(f => <span key={f} className="pkg-excl-tag">{f}</span>)}</div>
                        </div>
                        <div className="pkg-upgrade">
                            <div><h3>Want paid ads alongside SEO?</h3><p>Add Google Ads management for a combined organic + paid strategy — ask us for a bundle quote.</p></div>
                            <a href="/contact" className="sp-btn-primary sp-btn-no-hover">Get Bundle Quote <FiArrowRight /></a>
                        </div>
                    </div>

                    <div className="pkg-card">
                        <div className="pkg-card-label">Package</div>
                        <div className="pkg-card-name">Advanced SEO</div>
                        <div className="pkg-card-price">{price}</div>
                        <div className="pkg-card-per">per month · minimum 3 months</div>
                        <hr className="pkg-card-divider" />
                        <ul className="pkg-card-list">
                            {["25+ keywords", "4 blog posts/month", "15+ backlinks/month", "E-commerce SEO", "Weekly rank updates", "Dedicated SEO manager"].map(f => <li key={f}><FiCheck />{f}</li>)}
                        </ul>
                        <a href="/contact" className="pkg-card-cta">Get Started <FiArrowRight /></a>
                        <a href="/projects" className="pkg-card-cta">View Case Studies <FiArrowRight /></a>
                    </div>
                </div>

                <div className="sp-cta sp-anim">
                    <h2 className="sp-cta-title">Ready to Dominate Your Industry on Google?</h2>
                    <p className="sp-cta-sub">Free SEO audit first — then we show you the exact keyword opportunities you're missing.</p>
                    <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                        <a href="/contact" className="sp-btn-primary">Get Free SEO Audit <FiArrowRight /></a>
                        <a href="/projects" className="sp-btn-primary">View Case Studies <FiArrowRight /></a>
                    </div>
                </div>
            </div>
        </div>
    )
}