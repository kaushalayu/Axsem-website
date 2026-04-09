import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import {
    FiBook, FiUsers, FiDollarSign, FiFileText,
    FiSmartphone, FiBriefcase, FiArrowRight,
    FiCheckCircle, FiPlus, FiZap
} from "react-icons/fi"
import PageHero from "../Components/PageHero"
import ProductPricingSection from "../Components/ProductPricingSection"
import "../Styles/ServicePage.css"
import TourImg from "../assets/erp.jpeg"

function useReveal() {
    const ref = useRef(null)
    useEffect(() => {
        const el = ref.current
        if (!el) return
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) el.classList.add("sp-revealed") },
            { threshold: 0, rootMargin: "0px 0px -40px 0px" }
        )
        obs.observe(el)
        return () => obs.disconnect()
    }, [])
    return ref
}

function FaqItem({ q, a }) {
    const [open, setOpen] = useState(false)
    return (
        <div className={`sp-faq-item${open ? " sp-faq-open" : ""}`}>
            <button className="sp-faq-q" onClick={() => setOpen(!open)}>
                <span>{q}</span>
                <FiPlus className="sp-faq-icon" />
            </button>
            <div className="sp-faq-a">{a}</div>
        </div>
    )
}

/* ================= FEATURES ================= */

const features = [
    { icon: <FiUsers />, title: "Customer Management", desc: "Store traveler profiles, passport details, preferences, and booking history securely in one system." },
    { icon: <FiBook />, title: "Tour Package Management", desc: "Create domestic and international packages with itinerary, pricing, and seasonal offers." },
    { icon: <FiDollarSign />, title: "Online Payments", desc: "Accept UPI, cards, net banking and auto-generate invoices with real-time payment tracking." },
    { icon: <FiFileText />, title: "Itinerary Builder", desc: "Generate professional branded PDF itineraries including hotels, transport and activities." },
    { icon: <FiSmartphone />, title: "Customer Portal", desc: "Customers can view bookings, download tickets, itineraries and receive updates." },
    { icon: <FiBriefcase />, title: "Agent & Vendor Management", desc: "Manage travel agents, hotel vendors, commissions and settlements easily." },
]

/* ================= TECH STACK ================= */

const techStack = [
    { cat: "Frontend", items: ["React", "Next.js"] },
    { cat: "Backend", items: ["Node.js", "MongoDB"] },
    { cat: "Comms", items: ["Twilio", "WhatsApp API", "Email Automation"] },
    { cat: "Payments", items: ["Razorpay", "Stripe", "UPI Integration"] },
]

/* ================= ONBOARDING STEPS ================= */

const steps = [
    { num: "01", title: "Setup Agency", desc: "Configure agency profile, branding and payment settings." },
    { num: "02", title: "Add Packages", desc: "Create tour packages with itinerary, pricing and inclusions." },
    { num: "03", title: "Enable Payments", desc: "Integrate secure online payment gateways." },
    { num: "04", title: "Train Staff", desc: "Quick onboarding session for booking and operations team." },
    { num: "05", title: "Go Live", desc: "Start accepting online bookings instantly." },
    { num: "06", title: "Ongoing Support", desc: "Dedicated technical and operational support provided." },
]

/* ================= STATS ================= */

const stats = [
    { val: "50+", lbl: "Travel Agencies Onboarded" },
    { val: "25k+", lbl: "Bookings Managed" },
    { val: "70%", lbl: "Faster Booking Process" },
    { val: "4.9★", lbl: "Customer Satisfaction" },
]

/* ================= FAQ ================= */

const faqs = [
    { q: "Can customers book tours online?", a: "Yes. Customers can browse packages, select travel dates and complete secure payment with instant confirmation." },
    { q: "Does it support international packages?", a: "Yes. You can create multi-country itineraries with flexible pricing and inclusions." },
    { q: "Can we generate branded itineraries?", a: "Yes. The system generates professional PDF itineraries with your company logo and branding." },
    { q: "Is agent commission tracking available?", a: "Yes. You can track agent commissions, vendor payments and profit margins in real time." },
]

export default function TourBookingPage() {

    const statsRef = useReveal()
    const overviewRef = useReveal()
    const featRef = useReveal()
    const stepsRef = useReveal()
    const techRef = useReveal()
    const faqRef = useReveal()

    return (
        <div className="sp-page">

            <PageHero
                breadcrumbs={[{ label: "Products" }, { label: "Tour Booking Software" }]}
                pill="Travel & Tour Management System"
                title={<>Complete Tour Booking Software<br /><span className="ph-gradient">For Travel Agencies</span></>}
                subtitle="Manage packages, bookings, payments, itineraries, agents and customer communication — all from one powerful dashboard."
                tag="50+ Agencies · 25,000+ Bookings Managed"
            />

            <div className="sp-body">

                {/* ================= STATS ================= */}
                <div className="sp-stats-strip sp-anim" ref={statsRef}>
                    {stats.map((s, i) => (
                        <div key={s.lbl} className="sp-stat-card" style={{ "--delay": `${i * 0.08}s` }}>
                            <span className="sp-stat-val">{s.val}</span>
                            <span className="sp-stat-lbl">{s.lbl}</span>
                        </div>
                    ))}
                </div>

                {/* ================= OVERVIEW ================= */}
                <div className="sp-overview-grid sp-anim" ref={overviewRef}>
                    <div className="sp-overview-text">
                        <h2 className="sp-overview-title">
                            Run Your Travel Business<br />
                            <span className="sp-hl">Without the Manual Hassle</span>
                        </h2>
                        <p className="sp-overview-para">
                            From inquiry to booking confirmation — our software automates every process.
                            Reduce operational workload, increase booking conversions and provide customers real-time updates.
                        </p>

                        <ul className="sp-checklist">
                            {[
                                "Online booking with instant confirmation",
                                "Automated invoice & payment tracking",
                                "Professional itinerary PDF generation",
                                "WhatsApp & email booking notifications"
                            ].map(item => (
                                <li key={item}>
                                    <span className="sp-check-icon">✓</span>
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
                            <Link to="/contact" className="sp-btn-primary">
                                Book a Free Demo <FiArrowRight />
                            </Link>
                            <Link to="/portfolio/project" className="sp-btn-primary">
                                View Projects <FiArrowRight />
                            </Link>
                        </div>
                    </div>

                    <div className="sp-overview-visual">
                        <div className="sp-visual-box">
                            <FiBook className="sp-visual-icon" />
                            <img src={TourImg} alt="Tour Booking" />
                            <span className="sp-visual-label">Tour Booking Software</span>
                        </div>
                        <div className="sp-visual-badge sp-vb-1">
                            <FiCheckCircle /> 70% Faster Operations
                        </div>
                        <div className="sp-visual-badge sp-vb-2">
                            <FiZap /> 4.9★ Customer Rating
                        </div>
                    </div>
                </div>

                {/* ================= FEATURES ================= */}
                <div>
                    <div className="sp-section-header">
                        <div className="sp-pill">Features</div>
                        <h2 className="sp-section-title">
                            Everything Your Travel Agency <span className="sp-hl">Needs</span>
                        </h2>
                        <p className="sp-section-sub">
                            From inquiry management to final ticket confirmation — all in one system.
                        </p>
                    </div>

                    <div className="sp-cards-grid sp-cols-3 sp-anim" ref={featRef}>
                        {features.map((f, i) => (
                            <div key={f.title} className="sp-card" style={{ "--delay": `${i * 0.08}s` }}>
                                <div className="sp-card-icon">{f.icon}</div>
                                <h3 className="sp-card-title">{f.title}</h3>
                                <p className="sp-card-desc">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ================= STEPS ================= */}
                <div>
                    <div className="sp-section-header sp-center">
                        <div className="sp-pill">How It Works</div>
                        <h2 className="sp-section-title">
                            Simple <span className="sp-hl">Onboarding Process</span>
                        </h2>
                        <p className="sp-section-sub">
                            Most agencies go live within a few days.
                        </p>
                    </div>

                    <div className="sp-steps-grid sp-anim" ref={stepsRef}>
                        {steps.map((s, i) => (
                            <div key={s.num} className="sp-step" style={{ "--delay": `${i * 0.08}s` }}>
                                <div className="sp-step-num"><span>{s.num}</span></div>
                                <div className="sp-step-title">{s.title}</div>
                                <div className="sp-step-desc">{s.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ================= TECH STACK ================= */}
                <div>
                    <div className="sp-section-header">
                        <div className="sp-pill">Tech Stack</div>
                        <h2 className="sp-section-title">
                            Built With <span className="sp-hl">Reliable Technology</span>
                        </h2>
                    </div>

                    <div className="sp-tech-grid sp-anim" ref={techRef}>
                        {techStack.map((t, i) => (
                            <div key={t.cat} className="sp-tech-card" style={{ "--delay": `${i * 0.08}s` }}>
                                <span className="sp-tech-cat">{t.cat}</span>
                                <div className="sp-tech-items">
                                    {t.items.map(item => (
                                        <span key={item} className="sp-tech-item">{item}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ================= FAQ ================= */}
                <div>
                    <div className="sp-section-header">
                        <div className="sp-pill">FAQ</div>
                        <h2 className="sp-section-title">
                            Common <span className="sp-hl">Questions</span>
                        </h2>
                    </div>

                    <div className="sp-faq-list sp-anim" ref={faqRef}>
                        {faqs.map((f, i) => (
                            <div key={i} style={{ "--delay": `${i * 0.07}s` }}>
                                <FaqItem q={f.q} a={f.a} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* ================= CTA ================= */}
                <div className="sp-cta sp-anim">
                    <h2 className="sp-cta-title">Ready to Grow Your Travel Business?</h2>
                    <p className="sp-cta-sub">
                        Book a free demo and see how our tour booking software can automate your agency.
                    </p>
                    <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                        <Link to="/contact" className="sp-btn-primary">
                            Book a Free Demo <FiArrowRight />
                        </Link>
                        <Link to="/portfolio/project" className="sp-btn-primary">
                            View Our Work <FiArrowRight />
                        </Link>
                    </div>
                </div>

                <ProductPricingSection productRoute="/products/tour-booking" color="#f05a28" />

            </div>
        </div>
    )
}