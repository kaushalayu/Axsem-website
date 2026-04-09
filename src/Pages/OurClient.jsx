import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { FiArrowRight, FiStar, FiGlobe, FiSmartphone, FiMonitor, FiPackage } from "react-icons/fi"
import PageHero from "../Components/PageHero"
import "../Styles/ServicePageShared.css"
import "../Styles/OurClient.css"

function useReveal() {
    const ref = useRef(null)
    useEffect(() => {
        const el = ref.current; if (!el) return
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) el.classList.add("sp-revealed") },
            { threshold: 0, rootMargin: "0px 0px -40px 0px" }
        )
        obs.observe(el); return () => obs.disconnect()
    }, [])
    return ref
}

/* ── Data ── */
const stats = [
    { val: "50+", lbl: "Happy Clients" },
    { val: "6+", lbl: "Industries" },
    { val: "5+", lbl: "Countries" },
    { val: "98%", lbl: "Retention Rate" },
]

const clients = [
    { name: "RetailFlow Pvt. Ltd.", industry: "Retail", service: "ERP System", icon: <FiPackage /> },
    { name: "SwiftDeliver Logistics", industry: "Logistics", service: "Mobile App", icon: <FiSmartphone /> },
    { name: "HireBoard", industry: "HR Tech", service: "SaaS Product", icon: <FiMonitor /> },
    { name: "LuxCart India", industry: "E-Commerce", service: "Web Development", icon: <FiGlobe /> },
    { name: "MediTrack Health", industry: "Healthcare", service: "Web App", icon: <FiMonitor /> },
    { name: "BuildWise Construction", industry: "Construction", service: "CRM System", icon: <FiPackage /> },
    { name: "ZenFit Studios", industry: "Health & Wellness", service: "Mobile App", icon: <FiSmartphone /> },
    { name: "ClearLaw Associates", industry: "Legal", service: "Website + SEO", icon: <FiGlobe /> },
    { name: "NovaInterior Designs", industry: "Interior Design", service: "UI/UX + Website", icon: <FiMonitor /> },
    { name: "PrimeAgro Solutions", industry: "Agriculture", service: "ERP + Mobile", icon: <FiPackage /> },
    { name: "UrbanNest Realty", industry: "Real Estate", service: "Web Portal", icon: <FiGlobe /> },
    { name: "FinBridge Capital", industry: "Finance", service: "Dashboard App", icon: <FiMonitor /> },
]

const testimonials = [
    { quote: "AXSEM didn't just build software — they understood our business and delivered exactly what we needed. ROI was visible within the first quarter.", author: "Rajesh Mehta", role: "CEO, RetailFlow Pvt. Ltd.", initial: "R" },
    { quote: "The app transformed how we operate. Our customers love the live tracking and our team finally has full visibility.", author: "Priya Sharma", role: "COO, SwiftDeliver Logistics", initial: "P" },
    { quote: "We went from Notion chaos to a proper hiring pipeline in one afternoon. It's exactly what a growing startup needs.", author: "Ankita Joshi", role: "Head of People, HireBoard", initial: "A" },
    { quote: "Our old website felt like a bazaar stall. Now it feels like a luxury boutique — and the conversion numbers prove it.", author: "Sneha Kapoor", role: "Founder, LuxCart India", initial: "S" },
]

const industries = [
    "Retail", "Logistics", "Healthcare", "HR Tech",
    "E-Commerce", "Construction", "Finance", "Real Estate",
    "Agriculture", "Legal", "Interior Design", "Wellness",
]

/* ── Client Card ── */
function ClientCard({ client, index }) {
    return (
        <div className="oc-client-card sp-card" style={{ "--delay": `${(index % 4) * 0.07}s` }}>
            <div className="oc-client-icon sp-card-icon">{client.icon}</div>
            <div className="oc-client-info">
                <h4 className="sp-card-title">{client.name}</h4>
                <span className="sp-card-tag">{client.industry}</span>
                <p className="sp-card-desc">{client.service}</p>
            </div>
        </div>
    )
}

/* ── Testimonial Card ── */
function TestimonialCard({ t, index }) {
    return (
        <div className="oc-testi-card sp-card" style={{ "--delay": `${index * 0.1}s` }}>
            <div className="oc-stars">
                {[...Array(5)].map((_, i) => <FiStar key={i} className="oc-star" />)}
            </div>
            <p className="oc-quote">"{t.quote}"</p>
            <div className="oc-author">
                <div className="oc-avatar">{t.initial}</div>
                <div>
                    <div className="oc-author-name">{t.author}</div>
                    <div className="oc-author-role">{t.role}</div>
                </div>
            </div>
        </div>
    )
}

/* ══ MAIN ══ */
export default function OurClientsPage() {
    const statsRef = useReveal()
    const clientsRef = useReveal()
    const industryRef = useReveal()
    const testiRef = useReveal()

    return (
        <div className="sp-page">
            <PageHero
                breadcrumbs={[{ label: "Our Clients" }]}
                pill="Our Clients"
                pillIcon={<FiStar />}
                title={<>Trusted by <span className="ph-gradient">50+ Businesses</span></>}
                subtitle="From early-stage startups to established enterprises — we've helped businesses across 6 industries and 5 countries build better digital products."
                tag="50+ Clients · 98% Retention Rate"
            />

            <div className="sp-body">

                {/* ── Stats ── */}
                <div className="sp-stats-strip sp-anim" ref={statsRef}>
                    {stats.map((s, i) => (
                        <div key={s.lbl} className="sp-stat-card" style={{ "--delay": `${i * 0.08}s` }}>
                            <span className="sp-stat-val">{s.val}</span>
                            <span className="sp-stat-lbl">{s.lbl}</span>
                        </div>
                    ))}
                </div>

                {/* ── Client Grid ── */}
                <div>
                    <div className="sp-section-header">
                        <div className="sp-pill"><FiGlobe /> Client Portfolio</div>
                        <h2 className="sp-section-title">Businesses We've <span className="sp-hl">Worked With</span></h2>
                        <p className="sp-section-sub">Real companies, real results — every client here trusted us with their digital growth.</p>
                    </div>
                    <div className="sp-cards-grid sp-cols-4 sp-anim" ref={clientsRef}>
                        {clients.map((c, i) => (
                            <ClientCard key={c.name} client={c} index={i} />
                        ))}
                    </div>
                </div>

                {/* ── Industries ── */}
                <div className="oc-industry-section sp-anim" ref={industryRef}>
                    <div className="sp-section-header">
                        <div className="sp-pill"><FiPackage /> Industries</div>
                        <h2 className="sp-section-title">Industries We <span className="sp-hl">Serve</span></h2>
                    </div>
                    <div className="oc-industry-tags">
                        {industries.map((ind, i) => (
                            <span
                                key={ind}
                                className="oc-ind-tag"
                                style={{ "--delay": `${i * 0.05}s` }}
                            >
                                {ind}
                            </span>
                        ))}
                    </div>
                </div>

                {/* ── Testimonials ── */}
                <div>
                    <div className="sp-section-header">
                        <div className="sp-pill"><FiStar /> Testimonials</div>
                        <h2 className="sp-section-title">What Our Clients <span className="sp-hl">Say</span></h2>
                    </div>
                    <div className="sp-cards-grid sp-cols-2 sp-anim" ref={testiRef}>
                        {testimonials.map((t, i) => (
                            <TestimonialCard key={t.author} t={t} index={i} />
                        ))}
                    </div>
                </div>

                {/* ── CTA ── */}
                <div className="sp-cta sp-anim">
                    <h2 className="sp-cta-title">Ready to Join Our Client List?</h2>
                    <p className="sp-cta-sub">Tell us about your project and let's build something great together.</p>
                <Link to="/contact" className="sp-btn-primary">Start a Conversation <FiArrowRight /></Link>
                </div>

            </div>
        </div>
    )
}