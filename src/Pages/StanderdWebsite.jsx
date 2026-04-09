import { useEffect, useRef } from "react"
import { FiMonitor, FiSmartphone, FiSearch, FiBarChart2, FiDatabase, FiUsers, FiArrowRight, FiCheck } from "react-icons/fi"
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
    { icon: <FiMonitor />, t: "Up to 10 Pages", d: "Home, About, Services, Blog, Portfolio, Team, FAQ, Contact and more." },
    { icon: <FiDatabase />, t: "Full CMS — Edit Anything", d: "Update pages, blogs, images, and team members yourself with no developer." },
    { icon: <FiSearch />, t: "Advanced On-Page SEO", d: "Schema markup, Core Web Vitals optimisation, image alt tags, speed audit." },
    { icon: <FiBarChart2 />, t: "GA4 + Search Console", d: "Full analytics setup with monthly performance report for 3 months." },
    { icon: <FiSmartphone />, t: "PWA Ready", d: "Users can install your site on phone like a native app." },
    { icon: <FiUsers />, t: "Lead Capture + CRM", d: "Enquiry forms with CRM integration — leads captured, notified via email & WhatsApp." },
]
const ALL = ["Up to 10 custom pages", "Full CMS integration", "Blog module", "Advanced on-page SEO", "Schema markup", "Core Web Vitals pass", "GA4 + Search Console", "Progressive Web App", "Social media feed widget", "WhatsApp chat widget", "Lead capture with CRM", "Performance optimisation", "SSL + security hardening", "3 months free support", "Hosting deployment", "Multi-language ready"]
const NOT = ["Online store / payments", "Custom booking system", "Admin dashboard", "Mobile app"]

export default function StandardWebsitePage() {
    const featRef = useRevealCards()
    const { getPrice } = usePricing()
    const price = getPrice('website', 'standard')
    return (
        <div className="sp-page dp-page">
            <PageHero
                breadcrumbs={[{ label: "Packages", }, { label: "Website" }, { label: "Standard" }]}
                pill="Website Package · Standard"
                title={<>Standard Website<br /><span className="ph-gradient">Package</span></>}
                subtitle="A full-featured business website with CMS, advanced SEO, analytics, and lead capture — for businesses serious about growing online."
                tag="Best For: Established Businesses & Professionals"
            />
            <div className="sp-body dp-body">
                <div className="dp-cubes" aria-hidden><div className="dp-cube dp-c1" /><div className="dp-cube dp-c2" /><div className="dp-cube dp-c3" /></div>

                <div className="pkg-layout">
                    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
                        <div>
                            <div className="sp-section-header">
                                <div className="sp-pill">What's Included</div>
                                <h2 className="sp-section-title">Standard Package <span className="sp-hl">Features</span></h2>
                                <p className="sp-section-sub">A complete business website built to rank on Google and convert visitors.</p>
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
                            <div className="pkg-excl-title">Not included in Standard</div>
                            <div className="pkg-excl-tags">{NOT.map(f => <span key={f} className="pkg-excl-tag">{f}</span>)}</div>
                        </div>
                        <div className="pkg-upgrade">
                            <div><h3>Need e-commerce or a booking system?</h3><p>Upgrade to Dynamic (₹90,000) for full online store and custom web app features.</p></div>
                            <a href="/packages/websites/dynamic" className="sp-btn-primary">Dynamic Package <FiArrowRight /></a>
                        </div>
                    </div>

                    <div className="pkg-card">
                        <div className="pkg-card-label">Package</div>
                        <div className="pkg-card-name">Standard Website</div>
                        <div className="pkg-card-price">{price}</div>
                        <div className="pkg-card-per">one-time · 4–5 weeks delivery</div>
                        <hr className="pkg-card-divider" />
                        <ul className="pkg-card-list">
                            {["Up to 10 pages", "Full CMS", "Advanced SEO", "GA4 + Search Console", "Lead capture & CRM", "3 months support"].map(f => <li key={f}><FiCheck />{f}</li>)}
                        </ul>
                        <a href="/contact" className="pkg-card-cta">Get Started <FiArrowRight /></a>
                        <a href="/projects" className="pkg-card-cta">View Our Work <FiArrowRight /></a>
                    </div>
                </div>

                <div className="sp-cta sp-anim">
                    <h2 className="sp-cta-title">Ready for a Proper Business Website?</h2>
                    <p className="sp-cta-sub">Get in touch — project kickoff within 48 hours of confirmation.</p>
                    <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                        <a href="/contact" className="sp-btn-primary" style={{ background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.4)" }}>Book Standard Package <FiArrowRight /></a>
                        <a href="/projects" className="sp-btn-primary" style={{ background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.4)" }}>View Our Work <FiArrowRight /></a>
                    </div>
                </div>
            </div>
        </div>
    )
}