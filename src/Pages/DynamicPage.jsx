import { useEffect, useRef } from "react"
import { FiShoppingCart, FiCalendar, FiUsers, FiSettings, FiZap, FiShield, FiArrowRight, FiCheck } from "react-icons/fi"
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
    { icon: <FiShoppingCart />, t: "E-Commerce / Online Store", d: "Full online store with product listings, cart, and payment gateway (Razorpay/Stripe)." },
    { icon: <FiCalendar />, t: "Booking & Appointment System", d: "Online booking with calendar, time slots, confirmation emails and reminders." },
    { icon: <FiUsers />, t: "Multi-Role User Accounts", d: "Customer accounts, vendor portals, or admin panels with role-based access control." },
    { icon: <FiSettings />, t: "Custom Web Application", d: "Any functionality you need — calculators, configurators, dashboards, or workflows." },
    { icon: <FiZap />, t: "Third-Party Integrations", d: "WhatsApp, SMS, email marketing, shipping (Shiprocket), accounting, and more." },
    { icon: <FiShield />, t: "Security & Performance", d: "Enterprise-grade security, caching, CDN, and auto-scaling for high traffic." },
]
const ALL = ["Unlimited pages", "E-commerce / online store", "Razorpay / Stripe payments", "Booking & scheduling system", "Multi-role user management", "Admin dashboard", "Advanced CMS", "Full SEO suite", "API integrations (any)", "WhatsApp + email automation", "Shiprocket shipping", "Custom calculators or tools", "Performance & security audit", "6 months free support", "Source code ownership", "Cloud deployment on AWS"]
const NOT = ["Native mobile app (Android/iOS)", "AI/ML features (separate scope)"]

export default function DynamicWebsitePage() {
    const featRef = useRevealCards()
    const { getPrice } = usePricing()
    const price = getPrice('website', 'dynamic')
    return (
        <div className="sp-page dp-page">
            <PageHero
                breadcrumbs={[{ label: "Packages", }, { label: "Website" }, { label: "Dynamic" }]}
                pill="Website Package · Dynamic"
                title={<>Dynamic Website<br /><span className="ph-gradient">Package</span></>}
                subtitle="A fully custom web application — e-commerce, booking systems, user portals, and complex integrations. If your website needs to do something, we build it."
                tag="Best For: E-Commerce, Portals & Complex Web Apps"
            />
            <div className="sp-body dp-body">
                <div className="dp-cubes" aria-hidden><div className="dp-cube dp-c1" /><div className="dp-cube dp-c2" /><div className="dp-cube dp-c3" /></div>

                <div className="pkg-layout">
                    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
                        <div>
                            <div className="sp-section-header">
                                <div className="sp-pill">What's Included</div>
                                <h2 className="sp-section-title">Dynamic Package <span className="sp-hl">Features</span></h2>
                                <p className="sp-section-sub">Everything in Standard, plus full web application capabilities — built for your exact business logic.</p>
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
                            <div className="pkg-excl-title">Not included (separate project)</div>
                            <div className="pkg-excl-tags">{NOT.map(f => <span key={f} className="pkg-excl-tag">{f}</span>)}</div>
                        </div>
                        <div className="pkg-upgrade">
                            <div><h3>Need a native mobile app too?</h3><p>We build iOS & Android apps — ask us for a combined web + mobile quote.</p></div>
                            <a href="/contact" className="sp-btn-primary sp-btn-no-hover">Get a Custom Quote <FiArrowRight /></a>
                        </div>
                    </div>

                    <div className="pkg-card">
                        <div className="pkg-card-label">Package</div>
                        <div className="pkg-card-name">Dynamic Website</div>
                        <div className="pkg-card-price">{price}</div>
                        <div className="pkg-card-per">one-time · 6–10 weeks delivery</div>
                        <hr className="pkg-card-divider" />
                        <ul className="pkg-card-list">
                            {["E-commerce / store", "Payment gateway", "Booking system", "User accounts", "Admin dashboard", "6 months support"].map(f => <li key={f}><FiCheck />{f}</li>)}
                        </ul>
                        <a href="/contact" className="pkg-card-cta">Get Started <FiArrowRight /></a>
                        <a href="/projects" className="pkg-card-cta">View Our Work <FiArrowRight /></a>
                    </div>
                </div>

                <div className="sp-cta sp-anim">
                    <h2 className="sp-cta-title">Let's Build Something Powerful</h2>
                    <p className="sp-cta-sub">Share your requirements — we'll send a detailed proposal within 24 hours.</p>
                    <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                        <a href="/contact" className="sp-btn-primary" style={{ background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.4)" }}>Book Dynamic Package <FiArrowRight /></a>
                        <a href="/projects" className="sp-btn-primary" style={{ background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.4)" }}>View Our Work <FiArrowRight /></a>
                    </div>
                </div>
            </div>
        </div>
    )
}