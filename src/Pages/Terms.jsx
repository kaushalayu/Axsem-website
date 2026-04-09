import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import PageHero from "../Components/PageHero"
import "../Styles/ServicePage.css"

function useReveal() {
    const ref = useRef(null)
    useEffect(() => {
        const el = ref.current; if (!el) return
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add("sp-revealed") }, { threshold: 0, rootMargin: "0px 0px -40px 0px" })
        obs.observe(el); return () => obs.disconnect()
    }, [])
    return ref
}

export default function TermsPage() {
    const section1Ref = useReveal()
    const section2Ref = useReveal()
    const section3Ref = useReveal()

    return (
        <div className="sp-page">
            <PageHero
                breadcrumbs={[{ label: "Home", href: "/" }, { label: "Terms of Service" }]}
                title={<>Terms of <span className="ph-gradient">Service</span></>}
                subtitle="Please read our terms carefully before using our services."
            />
            <div className="sp-body">
                <div className="sp-section-header sp-center" ref={section1Ref}>
                    <div className="sp-pill">Agreement Overview</div>
                    <h2 className="sp-section-title">By Using Our Services, <span className="sp-hl">You Agree To</span></h2>
                </div>

                <div className="sp-cards-grid sp-cols-2 sp-anim" ref={section2Ref}>
                    <div className="sp-card" style={{ "--delay": "0s" }}>
                        <h3 className="sp-card-title">Acceptable Use</h3>
                        <p className="sp-card-desc">You agree to use our services only for lawful purposes and in accordance with these terms.</p>
                    </div>
                    <div className="sp-card" style={{ "--delay": "0.1s" }}>
                        <h3 className="sp-card-title">Account Security</h3>
                        <p className="sp-card-desc">You are responsible for maintaining the confidentiality of your account credentials.</p>
                    </div>
                    <div className="sp-card" style={{ "--delay": "0.2s" }}>
                        <h3 className="sp-card-title">Intellectual Property</h3>
                        <p className="sp-card-desc">All content, features, and functionality remain our exclusive property.</p>
                    </div>
                    <div className="sp-card" style={{ "--delay": "0.3s" }}>
                        <h3 className="sp-card-title">Service Modifications</h3>
                        <p className="sp-card-desc">We reserve the right to modify or discontinue services at any time.</p>
                    </div>
                </div>

                <div className="sp-overview-grid sp-anim" ref={section3Ref}>
                    <div className="sp-overview-text">
                        <h2 className="sp-overview-title">Service <span className="sp-hl">Commitments</span></h2>
                        <ul className="sp-checklist">
                            <li><span className="sp-check-icon">✓</span>Professional and timely service delivery</li>
                            <li><span className="sp-check-icon">✓</span>Clear communication and project updates</li>
                            <li><span className="sp-check-icon">✓</span>Quality assurance and testing</li>
                            <li><span className="sp-check-icon">✓</span>Confidentiality of your project details</li>
                            <li><span className="sp-check-icon">✓</span>Post-delivery support as agreed</li>
                        </ul>
                    </div>
                    <div className="sp-overview-visual" style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)", borderRadius: "16px", padding: "40px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "300px" }}>
                        <div style={{ color: "white", textAlign: "center" }}>
                            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🤝</div>
                            <h3 style={{ fontSize: "24px", marginBottom: "8px" }}>Partnership Approach</h3>
                            <p style={{ opacity: 0.9 }}>We work as your technology partner, not just a vendor</p>
                        </div>
                    </div>
                </div>

                <div className="sp-section-header sp-center" style={{ marginTop: "60px" }}>
                    <div className="sp-pill">Limitation</div>
                    <h2 className="sp-section-title">What We <span className="sp-hl">Don't Do</span></h2>
                </div>

                <div className="sp-cards-grid sp-cols-3 sp-anim">
                    <div className="sp-card" style={{ "--delay": "0s" }}>
                        <h3 className="sp-card-title">No Guarantees</h3>
                        <p className="sp-card-desc">We don't guarantee specific business outcomes or revenue projections.</p>
                    </div>
                    <div className="sp-card" style={{ "--delay": "0.1s" }}>
                        <h3 className="sp-card-title">Third-Party Services</h3>
                        <p className="sp-card-desc">We're not responsible for third-party tools or external integrations.</p>
                    </div>
                    <div className="sp-card" style={{ "--delay": "0.2s" }}>
                        <h3 className="sp-card-title">Force Majeure</h3>
                        <p className="sp-card-desc">We aren't liable for delays caused by circumstances beyond our control.</p>
                    </div>
                </div>

                <div className="sp-cta sp-anim" style={{ marginTop: "60px" }}>
                    <h2 className="sp-cta-title">Questions About These Terms?</h2>
                    <p className="sp-cta-sub">We're happy to clarify any aspect of our terms.</p>
                    <Link to="/contact" className="sp-btn-primary">Contact Us</Link>
                </div>
            </div>
        </div>
    )
}
