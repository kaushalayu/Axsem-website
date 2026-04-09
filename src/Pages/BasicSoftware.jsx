import { useEffect, useRef } from "react"
import { FiCode, FiDatabase, FiSettings, FiUsers, FiFileText, FiBarChart2, FiArrowRight, FiCheck } from "react-icons/fi"
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
    { icon: <FiCode />, t: "1 Core Module", d: "One focused software module — inventory, billing, payroll, bookings, or similar." },
    { icon: <FiUsers />, t: "User & Role Management", d: "Admin, manager, and staff roles with separate access levels and dashboards." },
    { icon: <FiDatabase />, t: "Database + Backend API", d: "Secure PostgreSQL database with a clean REST API for future integrations." },
    { icon: <FiSettings />, t: "Admin Panel", d: "Simple admin interface to manage records, users, and reports." },
    { icon: <FiFileText />, t: "Reports & Data Export", d: "Basic reporting with CSV/PDF export for the key data in your module." },
    { icon: <FiBarChart2 />, t: "Dashboard Overview", d: "Home screen dashboard with key stats and quick-action shortcuts." },
]
const ALL = ["1 core module built from scratch", "Role-based user access", "Secure login system", "Admin panel", "Basic dashboard", "Reports & CSV export", "REST API", "Mobile-responsive UI", "Email notifications", "Data import (Excel/CSV)", "2 months free support", "Documentation included", "Source code ownership"]
const NOT = ["Multiple modules", "Payment gateway", "Mobile app", "Cloud hosting (quoted separately)", "Third-party API integrations"]

export default function BasicSoftwarePage() {
    const featRef = useRevealCards()
    const { getPrice } = usePricing()
    const price = getPrice('software', 'basic')
    return (
        <div className="sp-page dp-page">
            <PageHero
                breadcrumbs={[{ label: "Packages", }, { label: "Software" }, { label: "Basic" }]}
                pill="Software Package · Basic"
                title={<>Basic Software<br /><span className="ph-gradient">Package</span></>}
                subtitle="A single focused software module — inventory, billing, payroll, or any core business function — built to your exact workflow."
                tag="Best For: Small Teams & Single-Module Needs"
            />
            <div className="sp-body dp-body">
                <div className="dp-cubes" aria-hidden><div className="dp-cube dp-c1" /><div className="dp-cube dp-c2" /><div className="dp-cube dp-c3" /></div>

                <div className="pkg-layout">
                    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
                        <div>
                            <div className="sp-section-header">
                                <div className="sp-pill">What's Included</div>
                                <h2 className="sp-section-title">Basic Software <span className="sp-hl">Features</span></h2>
                                <p className="sp-section-sub">One well-built module — clean, fast, and ready to use in under 6 weeks.</p>
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
                            <div className="pkg-excl-title">Not included in Basic Software</div>
                            <div className="pkg-excl-tags">{NOT.map(f => <span key={f} className="pkg-excl-tag">{f}</span>)}</div>
                        </div>
                        <div className="pkg-upgrade">
                            <div><h3>Need more modules or advanced features?</h3><p>Upgrade to Premium Software (₹2,00,000) for full multi-module platform, integrations and more.</p></div>
                            <a href="/packages/software/premium" className="sp-btn-primary">Premium Software <FiArrowRight /></a>
                        </div>
                    </div>

                    <div className="pkg-card">
                        <div className="pkg-card-label">Package</div>
                        <div className="pkg-card-name">Basic Software</div>
                        <div className="pkg-card-price">{price}</div>
                        <div className="pkg-card-per">one-time · 4–6 weeks delivery</div>
                        <hr className="pkg-card-divider" />
                        <ul className="pkg-card-list">
                            {["1 core module", "Role-based access", "Admin panel", "Reports & export", "2 months support", "Source code included"].map(f => <li key={f}><FiCheck />{f}</li>)}
                        </ul>
                        <a href="/contact" className="pkg-card-cta">Get Started <FiArrowRight /></a>
                        <a href="/projects" className="pkg-card-cta">View Our Work <FiArrowRight /></a>
                    </div>
                </div>

                <div className="sp-cta sp-anim">
                    <h2 className="sp-cta-title">Have a Software Idea?</h2>
                    <p className="sp-cta-sub">Tell us what you want to automate — we'll scope it and send a proposal in 24 hours.</p>
                    <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                        <a href="/contact" className="sp-btn-primary" style={{ background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.4)" }}>Book Basic Software <FiArrowRight /></a>
                        <a href="/projects" className="sp-btn-primary" style={{ background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.4)" }}>View Our Work <FiArrowRight /></a>
                    </div>
                </div>
            </div>
        </div>
    )
}