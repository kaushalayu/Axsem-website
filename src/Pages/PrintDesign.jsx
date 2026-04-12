import { useEffect, useRef } from "react"
import { FiFileText, FiCreditCard, FiMonitor, FiPackage, FiBook, FiFlag, FiArrowRight, FiCheck } from "react-icons/fi"
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

const SERVICES = [
    { icon: <FiCreditCard />, t: "Business Cards", d: "Premium business card design — front & back, standard or folded, print-ready 300 DPI PDF.", price: "₹1,500" },
    { icon: <FiFileText />, t: "Brochure & Flyer Design", d: "Tri-fold, bi-fold, or z-fold brochures and A4/A5/DL flyers — both sides, full bleed.", price: "₹4,000" },
    { icon: <FiFlag />, t: "Banners & Standees", d: "Roll-up standees, hoarding banners, event backdrops, and exhibition panels.", price: "₹3,000" },
    { icon: <FiMonitor />, t: "Letterhead & Stationery", d: "A4 letterhead, envelope, compliment slip, and folder design — complete stationery set.", price: "₹5,000" },
    { icon: <FiBook />, t: "Catalogue / Lookbook", d: "Multi-page product catalogues and brand lookbooks — layout, design, and print-ready export.", price: "₹12,000" },
    { icon: <FiPackage />, t: "Packaging Design", d: "Product boxes, label stickers, bags, and pouches — retail-ready, Dieline file included.", price: "₹8,000" },
]

const PACKAGES = [
    {
        name: "Print Starter", price: "₹8,000", per: "one-time", highlight: false,
        items: ["Business card (front + back)", "A4 letterhead design", "Email signature design", "1 flyer design (A5)", "Print-ready PDF files"]
    },
    {
        name: "Print Business", price: "₹18,000", per: "one-time", highlight: true,
        items: ["Everything in Starter", "Tri-fold brochure (A4)", "Roll-up standee (2×6 ft)", "Envelope design", "Folder design", "All print-ready files (CMYK, 300 DPI)", "Bleed & crop marks included"]
    },
    {
        name: "Print Pro", price: "₹35,000", per: "one-time", highlight: false,
        items: ["Everything in Business", "12-page product catalogue", "Packaging design (1 product)", "Event backdrop design", "Presentation deck", "Unlimited revisions", "Printer liaison support"]
    },
]

const ALL = ["Business card (front + back)", "A4 letterhead", "A5 letterhead", "Envelope (DL + C4)", "Email signature", "Compliment slip", "Tri-fold brochure", "Bi-fold brochure", "A4 flyer", "A5 flyer", "DL flyer", "Roll-up standee", "Hoarding / banner", "Event backdrop", "Product catalogue", "Packaging / label", "Presentation deck", "All files: PDF, AI, PSD", "CMYK colour mode", "300 DPI print resolution", "Bleed + crop marks", "Print-ready specifications"]
const NOT = ["Actual printing / production", "Photography / product shoots", "3D product rendering", "Animation or video"]

export default function PrintDesignPage() {
    const featRef = useRevealCards()
    const { getPrice } = usePricing()

    const SERVICES = [
        { icon: <FiCreditCard />, t: "Business Cards", d: "Premium business card design — front & back, standard or folded, print-ready 300 DPI PDF.", price: getPrice('printDesign', 'businessCards') },
        { icon: <FiFileText />, t: "Brochure & Flyer Design", d: "Tri-fold, bi-fold, or z-fold brochures and A4/A5/DL flyers — both sides, full bleed.", price: getPrice('printDesign', 'brochureFlyer') },
        { icon: <FiFlag />, t: "Banners & Standees", d: "Roll-up standees, hoarding banners, event backdrops, and exhibition panels.", price: getPrice('printDesign', 'bannersStandees') },
        { icon: <FiMonitor />, t: "Letterhead & Stationery", d: "A4 letterhead, envelope, compliment slip, and folder design — complete stationery set.", price: getPrice('printDesign', 'stationery') },
        { icon: <FiBook />, t: "Catalogue / Lookbook", d: "Multi-page product catalogues and brand lookbooks — layout, design, and print-ready export.", price: getPrice('printDesign', 'catalogue') },
        { icon: <FiPackage />, t: "Packaging Design", d: "Product boxes, label stickers, bags, and pouches — retail-ready, Dieline file included.", price: getPrice('printDesign', 'packaging') },
    ]

    const PACKAGES = [
        {
            name: "Print Starter", price: "₹8,000", per: "one-time", highlight: false,
            items: ["Business card (front + back)", "A4 letterhead design", "Email signature design", "1 flyer design (A5)", "Print-ready PDF files"]
        },
        {
            name: "Print Business", price: getPrice('printDesign', 'business'), per: "one-time", highlight: true,
            items: ["Everything in Starter", "Tri-fold brochure (A4)", "Roll-up standee (2×6 ft)", "Envelope design", "Folder design", "All print-ready files (CMYK, 300 DPI)", "Bleed & crop marks included"]
        },
        {
            name: "Print Pro", price: "₹35,000", per: "one-time", highlight: false,
            items: ["Everything in Business", "12-page product catalogue", "Packaging design (1 product)", "Event backdrop design", "Presentation deck", "Unlimited revisions", "Printer liaison support"]
        },
    ]

    const price = getPrice('printDesign', 'business')
    return (
        <div className="sp-page dp-page">
            <PageHero
                breadcrumbs={[{ label: "Packages", }, { label: "Design" }, { label: "Print Design" }]}
                pill="Design Package · Print"
                title={<>Print Design That<br /><span className="ph-gradient">Leaves an Impression</span></>}
                subtitle="Business cards, brochures, banners, standees, catalogues, and packaging — professionally designed and print-ready for any printer."
                tag="300 DPI · CMYK · Bleed Marks · All Print Formats"
            />
            <div className="sp-body dp-body">
                <div className="dp-cubes" aria-hidden><div className="dp-cube dp-c1" /><div className="dp-cube dp-c2" /><div className="dp-cube dp-c3" /></div>

                {/* Services pricing */}
                <div>
                    <div className="sp-section-header">
                        <div className="sp-pill">Individual Services</div>
                        <h2 className="sp-section-title">Print Design <span className="sp-hl">Services & Rates</span></h2>
                        <p className="sp-section-sub">Need a single piece? Order individually — or save with a package below.</p>
                    </div>
                    <div className="pkg-feat-grid" ref={featRef}>
                        {SERVICES.map((f, i) => (
                            <div key={f.t} className="pkg-feat-card" style={{ "--delay": `${i * .07}s` }}>
                                <div className="pkg-fi">{f.icon}</div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                                        <p className="pkg-ft">{f.t}</p>
                                        <span style={{ fontSize: 13, fontWeight: 800, color: "var(--sp-orange)", whiteSpace: "nowrap", flexShrink: 0 }}>From {f.price}</span>
                                    </div>
                                    <p className="pkg-fd">{f.d}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Packages */}
                <div className="pkg-layout">
                    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
                        <div>
                            <div className="sp-section-header sp-center">
                                <div className="sp-pill">Bundle Packages</div>
                                <h2 className="sp-section-title">Save More with a <span className="sp-hl">Bundle</span></h2>
                                <p className="sp-section-sub">Get your complete print collateral set at a bundled price.</p>
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
                                {PACKAGES.map((p, i) => (
                                    <div key={p.name} className={`dp-pcard${p.highlight ? " dp-pcard-hl" : ""}`} style={{ "--delay": `${i * .1}s`, opacity: 1, transform: p.highlight ? "scale(1.03)" : "none" }}>
                                        {p.highlight && <div className="dp-pcard-badge" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 50, background: "var(--sp-orange)", color: "#fff", fontSize: 11, fontWeight: 800, textTransform: "uppercase", width: "fit-content", marginBottom: 4 }}>Best Value</div>}
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

                        <div>
                            <div className="sp-section-header"><div className="sp-pill">Full Deliverables</div><h2 className="sp-section-title">All Print Formats We <span className="sp-hl">Design</span></h2></div>
                            <div className="pkg-checklist">{ALL.map(f => <div key={f} className="pkg-check-row"><span className="pkg-check-dot">✓</span>{f}</div>)}</div>
                        </div>

                        <div className="pkg-excluded">
                            <div className="pkg-excl-title">Not included</div>
                            <div className="pkg-excl-tags">{NOT.map(f => <span key={f} className="pkg-excl-tag">{f}</span>)}</div>
                        </div>

                        <div className="pkg-upgrade">
                            <div><h3>Need brand identity first?</h3><p>Build your brand colours and logo first — then print materials are quicker and more consistent.</p></div>
                            <a href="/packages/graphic-design/branding" className="sp-btn-primary">Brand Identity Package <FiArrowRight /></a>
                        </div>
                    </div>

                    <div className="pkg-card">
                        <div className="pkg-card-label">Most ordered</div>
                        <div className="pkg-card-name">Print Business Bundle</div>
                        <div className="pkg-card-price">{price}</div>
                        <div className="pkg-card-per">one-time · 5–7 days</div>
                        <hr className="pkg-card-divider" />
                        <ul className="pkg-card-list">
                            {["Business card", "Letterhead", "Flyer", "Brochure", "Roll-up standee", "Print-ready files"].map(f => <li key={f}><FiCheck />{f}</li>)}
                        </ul>
                        <a href="/contact" className="pkg-card-cta">Start Print Project <FiArrowRight /></a>
                        <a href="/projects" className="pkg-card-secondary">View Portfolio <FiArrowRight /></a>
                    </div>
                </div>

                <div className="sp-cta sp-anim">
                    <h2 className="sp-cta-title">Ready to Print Something Remarkable?</h2>
                    <p className="sp-cta-sub">Share what you need — we'll send a quote and first draft within 48 hours.</p>
                    <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                        <a href="/contact" className="sp-btn-primary" >Start Print Project <FiArrowRight /></a>
                        <a href="/projects" className="sp-btn-primary" >View Portfolio <FiArrowRight /></a>
                    </div>
                </div>
            </div>
        </div>
    )
}