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

export default function PrivacyPage() {
    const section1Ref = useReveal()
    const section2Ref = useReveal()
    const section3Ref = useReveal()
    const section4Ref = useReveal()

    return (
        <div className="sp-page">
            <PageHero
                breadcrumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
                title={<>Privacy <span className="ph-gradient">Policy</span></>}
                subtitle="Your privacy is important to us. This policy outlines how we collect, use, and protect your information."
            />
            <div className="sp-body">
                <div className="sp-section-header sp-center" ref={section1Ref}>
                    <div className="sp-pill">Last Updated: February 2026</div>
                    <h2 className="sp-section-title">Information We <span className="sp-hl">Collect</span></h2>
                </div>

                <div className="sp-cards-grid sp-cols-2 sp-anim" ref={section2Ref}>
                    <div className="sp-card" style={{ "--delay": "0s" }}>
                        <h3 className="sp-card-title">Personal Information</h3>
                        <p className="sp-card-desc">Name, email, phone number, and company details when you contact us or use our services.</p>
                    </div>
                    <div className="sp-card" style={{ "--delay": "0.1s" }}>
                        <h3 className="sp-card-title">Technical Data</h3>
                        <p className="sp-card-desc">IP address, browser type, device information, and cookies for improving user experience.</p>
                    </div>
                    <div className="sp-card" style={{ "--delay": "0.2s" }}>
                        <h3 className="sp-card-title">Usage Data</h3>
                        <p className="sp-card-desc">Pages visited, time spent, and interaction patterns to analyze and improve our services.</p>
                    </div>
                    <div className="sp-card" style={{ "--delay": "0.3s" }}>
                        <h3 className="sp-card-title">Communication Data</h3>
                        <p className="sp-card-desc">Messages, feedback, and inquiry details you provide through forms or email.</p>
                    </div>
                </div>

                <div className="sp-overview-grid sp-anim" ref={section3Ref}>
                    <div className="sp-overview-text">
                        <h2 className="sp-overview-title">How We <span className="sp-hl">Use Your Information</span></h2>
                        <ul className="sp-checklist">
                            <li><span className="sp-check-icon">✓</span>Provide and maintain our services</li>
                            <li><span className="sp-check-icon">✓</span>Improve and personalize user experience</li>
                            <li><span className="sp-check-icon">✓</span>Communicate about updates, offers, and support</li>
                            <li><span className="sp-check-icon">✓</span>Comply with legal obligations</li>
                            <li><span className="sp-check-icon">✓</span>Protect against fraud and abuse</li>
                        </ul>
                    </div>
                    <div className="sp-overview-visual" style={{ background: "linear-gradient(135deg, #f05a28 0%, #ff8a65 100%)", borderRadius: "16px", padding: "40px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "300px" }}>
                        <div style={{ color: "white", textAlign: "center" }}>
                            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔒</div>
                            <h3 style={{ fontSize: "24px", marginBottom: "8px" }}>Your Data is Secure</h3>
                            <p style={{ opacity: 0.9 }}>We use industry-standard encryption and security measures</p>
                        </div>
                    </div>
                </div>

                <div className="sp-section-header sp-center" ref={section4Ref}>
                    <div className="sp-pill">Data Protection</div>
                    <h2 className="sp-section-title">Your <span className="sp-hl">Rights</span></h2>
                </div>

                <div className="sp-cards-grid sp-cols-3 sp-anim">
                    <div className="sp-card" style={{ "--delay": "0s" }}>
                        <h3 className="sp-card-title">Access</h3>
                        <p className="sp-card-desc">You can request a copy of the personal data we hold about you.</p>
                    </div>
                    <div className="sp-card" style={{ "--delay": "0.1s" }}>
                        <h3 className="sp-card-title">Correction</h3>
                        <p className="sp-card-desc">Request correction of inaccurate or incomplete data.</p>
                    </div>
                    <div className="sp-card" style={{ "--delay": "0.2s" }}>
                        <h3 className="sp-card-title">Deletion</h3>
                        <p className="sp-card-desc">Request deletion of your data where no legal obligation requires retention.</p>
                    </div>
                </div>

                <div className="sp-cta sp-anim" style={{ marginTop: "60px" }}>
                    <h2 className="sp-cta-title">Questions About Our Privacy Policy?</h2>
                    <p className="sp-cta-sub">We're here to help. Contact us with any questions.</p>
                    <Link to="/contact" className="sp-btn-primary">Contact Us</Link>
                </div>
            </div>
        </div>
    )
}
