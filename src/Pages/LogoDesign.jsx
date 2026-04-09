import { useEffect, useRef } from "react"
import { FiFeather, FiLayers, FiPackage, FiFileText, FiRefreshCw, FiStar, FiArrowRight, FiCheck } from "react-icons/fi"
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
    { icon: <FiFeather />, t: "3 Unique Concepts", d: "Three completely different logo directions — different styles, not just colour variations." },
    { icon: <FiLayers />, t: "All Format Files", d: "PNG, SVG, PDF, AI, EPS — print-ready and web-ready files in both light and dark versions." },
    { icon: <FiRefreshCw />, t: "Unlimited Revisions", d: "We refine until you're 100% happy — no revision limit, no extra charges." },
    { icon: <FiPackage />, t: "Favicon & App Icon", d: "Optimised favicon for your website and app icon in all required sizes." },
    { icon: <FiFileText />, t: "Brand Colour & Font Guide", d: "Your official colour codes (HEX, RGB, CMYK) and typography recommendations." },
    { icon: <FiStar />, t: "Social Media Kit", d: "Profile picture and cover image versions sized for Instagram, Facebook, and LinkedIn." },
]

const PACKAGES = [
    {
        name: "Basic Logo", price: "₹5,000", per: "one-time", highlight: false,
        items: ["1 logo concept", "3 revision rounds", "PNG + SVG files", "Favicon included", "48hr first draft"]
    },
    {
        name: "Standard Logo", price: "₹10,000", per: "one-time", highlight: true,
        items: ["3 logo concepts", "Unlimited revisions", "All formats (AI, EPS, PDF, SVG, PNG)", "Dark + light versions", "Favicon & app icon", "Brand colour & font guide", "Social media kit"]
    },
    {
        name: "Premium Logo", price: "₹18,000", per: "one-time", highlight: false,
        items: ["5 logo concepts", "Unlimited revisions", "All formats", "Dark + light + monochrome", "Brand mini style guide", "Stationery mockups (3)", "Social media kit", "Usage rights documentation"]
    },
]

const ALL = ["3 logo concepts (Standard)", "Multiple style directions", "Unlimited revision rounds", "PNG transparent background", "SVG vector file", "PDF print-ready", "AI source file", "EPS source file", "Light & dark logo variants", "Monochrome version", "Favicon (32x32, 64x64)", "App icon (1024x1024)", "Brand colour palette (HEX, RGB, CMYK)", "Typography recommendations", "Instagram profile picture", "Facebook cover photo", "LinkedIn banner", "Social media kit", "Usage rights letter"]
const NOT = ["Full brand style guide (see Brand Identity package)", "Stationery design", "Business card design", "Packaging design"]

export default function LogoDesignPage() {
    const featRef = useRevealCards()
    const { getPrice } = usePricing()
    
    const PACKAGES = [
        {
            name: "Basic Logo", price: getPrice('logo', 'basic'), per: "one-time", highlight: false,
            items: ["1 logo concept", "3 revision rounds", "PNG + SVG files", "Favicon included", "48hr first draft"]
        },
        {
            name: "Standard Logo", price: getPrice('logo', 'standard'), per: "one-time", highlight: true,
            items: ["3 logo concepts", "Unlimited revisions", "All formats (AI, EPS, PDF, SVG, PNG)", "Dark + light versions", "Favicon & app icon", "Brand colour & font guide", "Social media kit"]
        },
        {
            name: "Premium Logo", price: getPrice('logo', 'premium'), per: "one-time", highlight: false,
            items: ["5 logo concepts", "Unlimited revisions", "All formats", "Dark + light + monochrome", "Brand mini style guide", "Stationery mockups (3)", "Social media kit", "Usage rights documentation"]
        },
    ]
    
    const price = getPrice('logo', 'standard')
    return (
        <div className="sp-page dp-page">
            <PageHero
                breadcrumbs={[{ label: "Packages", }, { label: "Design" }, { label: "Logo Design" }]}
                pill="Design Package · Logo"
                title={<>Logo Design That Makes<br /><span className="ph-gradient">Your Brand Memorable</span></>}
                subtitle="Unique, professionally crafted logos — multiple concepts, unlimited revisions, all file formats, and a complete social media kit included."
                tag="48hr First Draft · Unlimited Revisions · All Formats"
            />
            <div className="sp-body dp-body">
                <div className="dp-cubes" aria-hidden><div className="dp-cube dp-c1" /><div className="dp-cube dp-c2" /><div className="dp-cube dp-c3" /></div>

                {/* Pricing plans */}
                <div>
                    <div className="sp-section-header sp-center">
                        <div className="sp-pill">Pricing Plans</div>
                        <h2 className="sp-section-title">Logo Design <span className="sp-hl">Packages</span></h2>
                        <p className="sp-section-sub">All packages include source files. No hidden charges, no subscription.</p>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
                        {PACKAGES.map((p, i) => (
                            <div key={p.name} className={`dp-pcard${p.highlight ? " dp-pcard-hl" : ""}`} style={{ "--delay": `${i * .1}s`, opacity: 1, transform: p.highlight ? "scale(1.03)" : "none" }}>
                                {p.highlight && <div className="dp-pcard-badge" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 50, background: "var(--sp-orange)", color: "#fff", fontSize: 11, fontWeight: 800, textTransform: "uppercase", width: "fit-content", marginBottom: 4 }}>Most Popular</div>}
                                <div className="dp-pcard-name">{p.name}</div>
                                <div className="dp-pcard-price">{p.price}</div>
                                <div className="dp-pcard-per">{p.per}</div>
                                <ul className="dp-pcard-list" style={{ margin: "12px 0 auto" }}>
                                    {p.items.map(f => <li key={f}><FiCheck style={{ color: "var(--sp-orange)", fontSize: 15, flexShrink: 0 }} />{f}</li>)}
                                </ul>
                                <a href="/contact" className={`dp-pcard-btn${p.highlight ? " dp-pcard-btn-hl" : ""}`} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "13px 22px", borderRadius: 50, textDecoration: "none", fontWeight: 700, fontSize: 14, marginTop: 16 }}>
                                    Get Started <FiArrowRight />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>

                {/* What's included details */}
                <div className="pkg-layout">
                    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
                        <div>
                            <div className="sp-section-header">
                                <div className="sp-pill">Our Process</div>
                                <h2 className="sp-section-title">What We <span className="sp-hl">Deliver</span></h2>
                                <p className="sp-section-sub">Every logo we design comes with everything you need — web, print, and social.</p>
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
                            <div className="sp-section-header"><div className="sp-pill">Full Deliverables</div><h2 className="sp-section-title">Everything You <span className="sp-hl">Get</span></h2></div>
                            <div className="pkg-checklist">{ALL.map(f => <div key={f} className="pkg-check-row"><span className="pkg-check-dot">✓</span>{f}</div>)}</div>
                        </div>

                        <div className="pkg-excluded">
                            <div className="pkg-excl-title">Not included (separate packages)</div>
                            <div className="pkg-excl-tags">{NOT.map(f => <span key={f} className="pkg-excl-tag">{f}</span>)}</div>
                        </div>

                        <div className="pkg-upgrade">
                            <div><h3>Need a complete brand identity?</h3><p>Our Brand Identity Package (₹35,000) includes logo + full style guide + all stationery.</p></div>
                            <a href="/packages/graphic-design/branding" className="sp-btn-primary">Brand Identity Package <FiArrowRight /></a>
                        </div>
                    </div>

                    <div className="pkg-card">
                        <div className="pkg-card-label">Recommended</div>
                        <div className="pkg-card-name">Standard Logo</div>
                        <div className="pkg-card-price">{price}</div>
                        <div className="pkg-card-per">one-time · 3–5 days</div>
                        <hr className="pkg-card-divider" />
                        <ul className="pkg-card-list">
                            {["3 concepts", "Unlimited revisions", "All file formats", "Social media kit", "Brand colours & fonts"].map(f => <li key={f}><FiCheck />{f}</li>)}
                        </ul>
                        <a href="/contact" className="pkg-card-cta">Start Logo Project <FiArrowRight /></a>
                        <a href="/projects" className="pkg-card-secondary">View Portfolio <FiArrowRight /></a>
                    </div>
                </div>

                <div className="sp-cta sp-anim">
                    <h2 className="sp-cta-title">Ready for a Logo Your Business is Proud Of?</h2>
                    <p className="sp-cta-sub">First draft in 48 hours — share your brief and we'll get started.</p>
                    <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                        <a href="/contact" className="sp-btn-primary" style={{ background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.4)" }} >Start Logo Design <FiArrowRight /></a>
                        <a href="/projects" className="sp-btn-primary" style={{ background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.4)" }}>View Portfolio <FiArrowRight /></a>
                    </div>
                </div>
            </div>
        </div>
    )
}