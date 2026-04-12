import { useEffect, useRef } from "react"
import { FiFeather, FiBook, FiType, FiGrid, FiImage, FiLayout, FiArrowRight, FiCheck } from "react-icons/fi"
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
    { icon: <FiFeather />, t: "Logo Design", d: "5 unique logo concepts — wordmark, lettermark, or icon-based — with unlimited revisions." },
    { icon: <FiType />, t: "Typography System", d: "Primary and secondary font selection with size scale, weight rules, and do's and don'ts." },
    { icon: <FiGrid />, t: "Colour Palette", d: "Primary, secondary, and neutral colours with exact HEX, RGB, CMYK, and Pantone codes." },
    { icon: <FiBook />, t: "Brand Style Guide", d: "50+ page PDF guide — logo usage, spacing rules, colours, fonts, imagery, and brand voice." },
    { icon: <FiImage />, t: "Social Media Templates", d: "10 Canva/Figma templates for posts, stories, and covers — editable by your team." },
    { icon: <FiLayout />, t: "Stationery Design", d: "Business card, letterhead, email signature, and envelope — print-ready files included." },
]

const PACKAGES = [
    {
        name: "Brand Starter", price: "₹15,000", per: "one-time", highlight: false,
        items: ["Logo (3 concepts)", "Brand colour palette", "Font selection", "Business card design", "Email signature", "Social profile kit"]
    },
    {
        name: "Brand Pro", price: "₹35,000", per: "one-time", highlight: true,
        items: ["Logo (5 concepts)", "Full brand style guide (PDF)", "Colour + typography system", "Business card + letterhead", "Email signature + envelope", "10 social media templates", "Brand voice guidelines", "All source files (AI, Figma)"]
    },
    {
        name: "Brand Enterprise", price: "₹65,000", per: "one-time", highlight: false,
        items: ["Everything in Brand Pro", "Brand strategy workshop", "Competitor visual analysis", "3 brand concept directions", "Presentation deck template", "Brand photography moodboard", "Vendor guidelines document", "6-month brand support"]
    },
]

const ALL = ["5 unique logo concepts", "All logo formats (AI, EPS, SVG, PDF, PNG)", "Light, dark, monochrome versions", "Primary brand colour palette", "Secondary & neutral colours", "HEX, RGB, CMYK, Pantone codes", "Primary & secondary typography", "Font size & weight scale", "50+ page brand style guide", "Logo usage do's & don'ts", "Clear space & sizing rules", "Pattern / texture elements", "Brand imagery guidelines", "Brand voice & tone guide", "Business card (front + back)", "Letterhead (A4)", "Envelope design", "Email signature (HTML)", "10 social media templates (Canva/Figma)", "Instagram & Facebook cover", "LinkedIn banner", "Brand icon / favicon set", "Source files — all formats"]
const NOT = ["Print production / printing", "Packaging design", "Website design", "Video / motion branding"]

export default function BrandIdentityPage() {
    const featRef = useRevealCards()
    const { getPrice } = usePricing()

    const PACKAGES = [
        {
            name: "Brand Starter", price: getPrice('branding', 'starter'), per: "one-time", highlight: false,
            items: ["Logo (3 concepts)", "Brand colour palette", "Font selection", "Business card design", "Email signature", "Social profile kit"]
        },
        {
            name: "Brand Pro", price: getPrice('branding', 'pro'), per: "one-time", highlight: true,
            items: ["Logo (5 concepts)", "Full brand style guide (PDF)", "Colour + typography system", "Business card + letterhead", "Email signature + envelope", "10 social media templates", "Brand voice guidelines", "All source files (AI, Figma)"]
        },
        {
            name: "Brand Enterprise", price: getPrice('branding', 'enterprise'), per: "one-time", highlight: false,
            items: ["Everything in Brand Pro", "Brand strategy workshop", "Competitor visual analysis", "3 brand concept directions", "Presentation deck template", "Brand photography moodboard", "Vendor guidelines document", "6-month brand support"]
        },
    ]

    const price = getPrice('branding', 'pro')
    return (
        <div className="sp-page dp-page">
            <PageHero
                breadcrumbs={[{ label: "Packages", }, { label: "Design" }, { label: "Brand Identity" }]}
                pill="Design Package · Brand Identity"
                title={<>Complete Brand Identity<br /><span className="ph-gradient">That Sets You Apart</span></>}
                subtitle="Logo, colour palette, typography, style guide, stationery, and social media templates — everything your brand needs to look world-class and consistent."
                tag="Logo + Style Guide + Stationery + Social Templates"
            />
            <div className="sp-body dp-body">
                <div className="dp-cubes" aria-hidden><div className="dp-cube dp-c1" /><div className="dp-cube dp-c2" /><div className="dp-cube dp-c3" /></div>

                {/* Pricing */}
                <div>
                    <div className="sp-section-header sp-center">
                        <div className="sp-pill">Pricing Plans</div>
                        <h2 className="sp-section-title">Brand Identity <span className="sp-hl">Packages</span></h2>
                        <p className="sp-section-sub">All source files delivered. All packages include full ownership of everything created.</p>
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

                {/* Features */}
                <div className="pkg-layout">
                    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
                        <div>
                            <div className="sp-section-header">
                                <div className="sp-pill">What We Create</div>
                                <h2 className="sp-section-title">Brand Identity <span className="sp-hl">Deliverables</span></h2>
                                <p className="sp-section-sub">A complete brand system — not just a logo, but a full visual language for your business.</p>
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
                            <div className="sp-section-header"><div className="sp-pill">Full Deliverables List</div><h2 className="sp-section-title">Everything You <span className="sp-hl">Receive</span></h2></div>
                            <div className="pkg-checklist">{ALL.map(f => <div key={f} className="pkg-check-row"><span className="pkg-check-dot">✓</span>{f}</div>)}</div>
                        </div>

                        <div className="pkg-excluded">
                            <div className="pkg-excl-title">Not included (separate packages)</div>
                            <div className="pkg-excl-tags">{NOT.map(f => <span key={f} className="pkg-excl-tag">{f}</span>)}</div>
                        </div>

                        <div className="pkg-upgrade">
                            <div><h3>Need print materials too?</h3><p>Add our Print Design Package — brochures, flyers, banners, and packaging from ₹4,000.</p></div>
                            <a href="/packages/graphic-design/print" className="sp-btn-primary">Print Design Package <FiArrowRight /></a>
                        </div>
                    </div>

                    <div className="pkg-card">
                        <div className="pkg-card-label">Recommended</div>
                        <div className="pkg-card-name">Brand Pro</div>
                        <div className="pkg-card-price">{price}</div>
                        <div className="pkg-card-per">one-time · 2–3 weeks</div>
                        <hr className="pkg-card-divider" />
                        <ul className="pkg-card-list">
                            {["5 logo concepts", "Brand style guide", "Colour + typography", "Stationery set", "Social templates", "All source files"].map(f => <li key={f}><FiCheck />{f}</li>)}
                        </ul>
                        <a href="/contact" className="pkg-card-cta">Start Brand Project <FiArrowRight /></a>
                        <a href="/projects" className="pkg-card-secondary">View Portfolio <FiArrowRight /></a>
                    </div>
                </div>

                <div className="sp-cta sp-anim">
                    <h2 className="sp-cta-title">Ready to Build a Brand That Lasts?</h2>
                    <p className="sp-cta-sub">Book a free brand consultation — 30 minutes, no commitment.</p>
                    <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                        <a href="/contact" className="sp-btn-primary" >Start Brand Identity <FiArrowRight /></a>
                        <a href="/projects" className="sp-btn-primary" >View Portfolio <FiArrowRight /></a>
                    </div>
                </div>
            </div>
        </div>
    )
}