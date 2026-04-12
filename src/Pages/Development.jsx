import { useEffect, useRef } from "react"
import { FiMonitor, FiSmartphone, FiSearch, FiMail, FiLayers, FiShare2, FiArrowRight, FiCheck } from "react-icons/fi"
import PageHero from "../Components/PageHero"
import { usePricing } from "../hooks/usePricing"
import "../Styles/ServicePageShared.css"
import "../Styles/PackagePage.css"
import "../Styles/DevelopmentPage.css"

function useRevealCards(selector = ".pkg-feat-card") {
    const ref = useRef(null)
    useEffect(() => {
        const el = ref.current; if (!el) return
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) el.querySelectorAll(selector).forEach((c, i) => setTimeout(() => c.classList.add("pkg-in"), i * 70))
        }, { threshold: 0.04 })
        obs.observe(el); return () => obs.disconnect()
    }, [])
    return ref
}

const FEATS = [
    { icon: <FiMonitor />, t: "5 Custom Pages", d: "Home, About, Services, Contact + 1 of your choice — all designed from scratch." },
    { icon: <FiSmartphone />, t: "Mobile Responsive", d: "Looks perfect on all phones, tablets, and desktops." },
    { icon: <FiSearch />, t: "Basic SEO Setup", d: "Meta tags, sitemap, robots.txt, and Google Search Console submission." },
    { icon: <FiMail />, t: "Contact Form", d: "Working form with email notification + WhatsApp button." },
    { icon: <FiLayers />, t: "CMS Integration", d: "Edit your own text and images — no developer needed." },
    { icon: <FiShare2 />, t: "Social Media Links", d: "All social profiles linked with open graph preview cards." },
]

const ALL = ["5 custom pages", "Mobile-first design", "Contact form", "WhatsApp button", "Basic on-page SEO", "XML sitemap", "Google Analytics setup", "SSL setup guidance", "Social media links", "Google Maps embed", "1 month free support", "Source files delivered"]
const NOT = ["Blog / CMS blog", "Payment gateway", "Booking system", "Admin dashboard", "Custom animations", "E-commerce store"]

export default function BasicWebsitePage() {
    const featRef = useRevealCards()
    const { getPrice } = usePricing()
    const price = getPrice('website', 'basic')
    return (
        <div className="sp-page dp-page">
            <PageHero
                breadcrumbs={[{ label: "Packages", }, { label: "Website" }, { label: "Basic" }]}
                pill="Website Package · Basic"
                title={<>Basic Website<br /><span className="ph-gradient">Package</span></>}
                subtitle="A clean, fast, mobile-ready 5-page website — everything essential for getting your business online, nothing unnecessary."
                tag="Best For: Startups & New Businesses"
            />
            <div className="sp-body dp-body">
                <div className="dp-cubes" aria-hidden><div className="dp-cube dp-c1" /><div className="dp-cube dp-c2" /><div className="dp-cube dp-c3" /></div>

                <div className="pkg-layout">
                    {/* LEFT */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
                        <div>
                            <div className="sp-section-header">
                                <div className="sp-pill">What's Included</div>
                                <h2 className="sp-section-title">Basic Package <span className="sp-hl">Features</span></h2>
                                <p className="sp-section-sub">A solid online presence — built right and delivered in 2–3 weeks.</p>
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
                            <div className="pkg-checklist">
                                {ALL.map(f => <div key={f} className="pkg-check-row"><span className="pkg-check-dot">✓</span>{f}</div>)}
                            </div>
                        </div>

                        <div className="pkg-excluded">
                            <div className="pkg-excl-title">Not included in Basic</div>
                            <div className="pkg-excl-tags">{NOT.map(f => <span key={f} className="pkg-excl-tag">{f}</span>)}</div>
                        </div>

                        <div className="pkg-upgrade">
                            <div><h3>Need more?</h3><p>Upgrade to Standard (₹50,000) for blog, advanced SEO, and lead capture.</p></div>
                            <a href="/packages/websites/standard" className="sp-btn-primary">Standard Package <FiArrowRight /></a>
                        </div>
                    </div>

                    {/* RIGHT — sticky card */}
                    <div className="pkg-card">
                        <div className="pkg-card-label">Package</div>
                        <div className="pkg-card-name">Basic Website</div>
                        <div className="pkg-card-price">{price}</div>
                        <div className="pkg-card-per">one-time · 2–3 weeks delivery</div>
                        <hr className="pkg-card-divider" />
                        <ul className="pkg-card-list">
                            {["5 custom pages", "Mobile responsive", "Basic SEO", "Contact form", "1 month support", "Source files included"].map(f => <li key={f}><FiCheck />{f}</li>)}
                        </ul>
                        <a href="/contact" className="pkg-card-cta">Get Started <FiArrowRight /></a>
                        <a href="/projects" className="pkg-card-cta">View Our Work <FiArrowRight /></a>
                    </div>
                </div>

                <div className="sp-cta sp-anim">
                    <h2 className="sp-cta-title">Ready to Launch Your Website?</h2>
                    <p className="sp-cta-sub">Get in touch — project starts within 48 hours of confirmation.</p>
                    <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                        <a href="/contact" className="sp-btn-primary">Book Basic Package <FiArrowRight /></a>
                        <a href="/projects" className="sp-btn-primary" >View Our Work <FiArrowRight /></a>
                    </div>
                </div>
            </div>
        </div>
    )
}
