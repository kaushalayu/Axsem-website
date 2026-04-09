import { useEffect, useRef } from "react"
import { FiCode, FiCloud, FiGrid, FiUsers, FiZap, FiShield, FiArrowRight, FiCheck } from "react-icons/fi"
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
    { icon: <FiGrid />, t: "Multi-Module Platform", d: "ERP, CRM, SaaS, or any multi-module system — all modules connected in one platform." },
    { icon: <FiUsers />, t: "Advanced User Management", d: "Multi-role, multi-branch, multi-tenant architecture — scale to thousands of users." },
    { icon: <FiZap />, t: "Third-Party Integrations", d: "Razorpay, Tally, WhatsApp, SMS, email marketing, shipping, and government APIs." },
    { icon: <FiCloud />, t: "Cloud Deployment + DevOps", d: "AWS/GCP deployment with CI/CD, Docker, backups, and 99.9% uptime monitoring." },
    { icon: <FiShield />, t: "Security & Compliance", d: "Data encryption, audit logs, RBAC, and industry-specific compliance built in." },
    { icon: <FiCode />, t: "Full Source Code Ownership", d: "Complete source code, database schema, and documentation — yours forever." },
]
const ALL = ["Multi-module custom platform", "Multi-role user management", "Multi-branch / multi-tenant", "Advanced admin dashboard", "Custom workflow automation", "Payment gateway integration", "Third-party API integrations", "WhatsApp + email automation", "AWS/GCP cloud deployment", "CI/CD pipeline setup", "Automated backups", "Security hardening", "Audit logs & compliance", "Performance monitoring", "6 months dedicated support", "Source code + documentation"]
const NOT = ["Native mobile app (separate project)", "AI/ML features (quoted separately)"]

export default function PremiumSoftwarePage() {
    const featRef = useRevealCards()
    const { getPrice } = usePricing()
    const price = getPrice('software', 'premium')
    return (
        <div className="sp-page dp-page">
            <PageHero
                breadcrumbs={[{ label: "Packages", }, { label: "Software" }, { label: "Premium" }]}
                pill="Software Package · Premium"
                title={<>Premium Software<br /><span className="ph-gradient">Package</span></>}
                subtitle="Full multi-module platforms — ERP, CRM, SaaS products, and enterprise systems — built for scale, security, and long-term growth."
                tag="Best For: Growing Companies & Enterprise Platforms"
            />
            <div className="sp-body dp-body">
                <div className="dp-cubes" aria-hidden><div className="dp-cube dp-c1" /><div className="dp-cube dp-c2" /><div className="dp-cube dp-c3" /></div>

                <div className="pkg-layout">
                    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
                        <div>
                            <div className="sp-section-header">
                                <div className="sp-pill">What's Included</div>
                                <h2 className="sp-section-title">Premium Software <span className="sp-hl">Features</span></h2>
                                <p className="sp-section-sub">Enterprise-grade software built for your exact business — not a template, not off-the-shelf.</p>
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
                            <div className="pkg-excl-title">Separate project scope</div>
                            <div className="pkg-excl-tags">{NOT.map(f => <span key={f} className="pkg-excl-tag">{f}</span>)}</div>
                        </div>
                        <div className="pkg-upgrade">
                            <div><h3>Need a mobile app alongside?</h3><p>We build Flutter iOS & Android apps — ask us for a combined software + app quote.</p></div>
                            <a href="/contact" className="sp-btn-primary sp-btn-no-hover">Get a Combined Quote <FiArrowRight /></a>
                        </div>
                    </div>

                    <div className="pkg-card">
                        <div className="pkg-card-label">Package</div>
                        <div className="pkg-card-name">Premium Software</div>
                        <div className="pkg-card-price">{price}</div>
                        <div className="pkg-card-per">one-time · 3–6 months delivery</div>
                        <hr className="pkg-card-divider" />
                        <ul className="pkg-card-list">
                            {["Multi-module platform", "Multi-role & multi-branch", "API integrations", "Cloud deployment", "6 months support", "Full source code"].map(f => <li key={f}><FiCheck />{f}</li>)}
                        </ul>
                        <a href="/contact" className="pkg-card-cta">Get Started <FiArrowRight /></a>
                        <a href="/projects" className="pkg-card-cta">View Our Work <FiArrowRight /></a>
                    </div>
                </div>

                <div className="sp-cta sp-anim">
                    <h2 className="sp-cta-title">Ready to Build Your Platform?</h2>
                    <p className="sp-cta-sub">Share your requirements — detailed proposal with timeline in 24 hours.</p>
                    <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                        <a href="/contact" className="sp-btn-primary" style={{ background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.4)" }}>Book Premium Software <FiArrowRight /></a>
                        <a href="/projects" className="sp-btn-primary" style={{ background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.4)" }}>View Our Work <FiArrowRight /></a>
                    </div>
                </div>
            </div>
        </div>
    )
}