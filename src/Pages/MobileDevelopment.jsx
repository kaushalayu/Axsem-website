import { useState, useEffect, useRef } from "react"
import { usePageData } from "../hooks/usePageData"
import { Link } from "react-router-dom"
import {
    FiSmartphone, FiTablet, FiBell, FiMapPin, FiShield,
    FiZap, FiArrowRight, FiPlus, FiCheckCircle,
    FiCode, FiLayers, FiTrendingUp, FiSettings, FiStar
} from "react-icons/fi"
import PageHero from "../Components/PageHero"
import "../Styles/SoftwareDevelopment.css"
import MobileImg from "../assets/ui.jpeg"

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

function FaqItem({ q, a }) {
    const [open, setOpen] = useState(false)
    return (
        <div className={`sp-faq-item${open ? " sp-faq-open" : ""}`}>
            <button className="sp-faq-q" onClick={() => setOpen(!open)}>
                <span>{q}</span><FiPlus className="sp-faq-icon" />
            </button>
            <div className="sp-faq-a">{a}</div>
        </div>
    )
}

const services = [
    { icon: <FiSmartphone />, title: "Flutter Cross-Platform Apps", desc: "One codebase, two platforms. Flutter apps that look and feel native on both Android and iOS — shipped faster.", tag: "Flutter" },
    { icon: <FiTablet />, title: "React Native Apps", desc: "JavaScript-powered native apps with access to device APIs, offline support, and fast iteration cycles.", tag: "React Native" },
    { icon: <FiStar />, title: "iOS (Swift) Development", desc: "Purpose-built iOS apps using Swift and SwiftUI for premium Apple device experiences.", tag: "iOS" },
    { icon: <FiStar />, title: "Android (Kotlin) Development", desc: "Native Android apps using Kotlin and Jetpack Compose optimised for the full Android ecosystem.", tag: "Android" },
    { icon: <FiBell />, title: "Push Notifications & Realtime", desc: "FCM/APNs integrations, WebSocket-powered live updates, and in-app messaging for real-time engagement.", tag: "Realtime" },
    { icon: <FiMapPin />, title: "Location & Maps Integration", desc: "GPS tracking, geofencing, route optimisation, and map-based UX using Google Maps and Mapbox SDKs.", tag: "Maps" },
]

const techStack = [
    { cat: "Cross-Platform", items: ["Flutter", "Dart", "React Native", "Expo"] },
    { cat: "Native", items: ["Swift", "Kotlin", "SwiftUI", "Jetpack Compose"] },
    { cat: "Backend/APIs", items: ["Firebase", "Node.js", "REST APIs", "GraphQL"] },
    { cat: "Services", items: ["FCM", "Google Maps", "Stripe", "Twilio"] },
]

const process = [
    { num: "01", title: "App Strategy", desc: "Define features, target platforms, monetisation model" },
    { num: "02", title: "UX Wireframes", desc: "Low-fidelity flows for every screen and interaction" },
    { num: "03", title: "UI Design", desc: "High-fidelity Figma designs following platform guidelines" },
    { num: "04", title: "Development", desc: "Sprint-based build with weekly TestFlight / APK builds" },
    { num: "05", title: "QA & Devices", desc: "Testing on 10+ physical devices across OS versions" },
    { num: "06", title: "Store Launch", desc: "App Store & Play Store submission, ASO, staged rollout" },
]

const stats = [
    { val: "25+", lbl: "Apps Launched" },
    { val: "4.7★", lbl: "Avg. Store Rating" },
    { val: "50k+", lbl: "Combined App Users" },
    { val: "2", lbl: "Platforms, 1 Codebase" },
]

const faqs = [
    { q: "Flutter vs React Native — which should I choose?", a: "Both are excellent for cross-platform. Flutter gives slightly better performance and pixel-perfect UI control. React Native is great if your team knows JavaScript. We recommend Flutter for most new projects — we'll advise based on your specific needs." },
    { q: "How much does a mobile app cost?", a: "A simple app with 5–8 screens starts around ₹3–5 lakhs. A mid-complexity app with backend, auth, and notifications is ₹8–15 lakhs. Complex apps with realtime features, maps, and custom integrations range from ₹15–40 lakhs." },
    { q: "Do you publish the app on App Store and Play Store?", a: "Yes. We handle full store submission — screenshots, descriptions, ASO metadata, and compliance review. You'll need your own developer accounts (Apple: $99/yr, Google: $25 one-time)." },
    { q: "What if the app needs a backend or API?", a: "We're a full-stack team. We build the mobile app and its backend together — REST or GraphQL APIs, databases, authentication, admin panels — everything in one engagement." },
    { q: "Do you provide app maintenance after launch?", a: "Yes. We offer monthly maintenance retainers that cover OS compatibility updates, bug fixes, minor feature additions, and performance monitoring. Most clients take a 3–6 month post-launch plan." },
]

export default function MobileAppDevelopmentPage() {
    const pageData = usePageData("/services/mobile-app-development", { faqs, gallery: [{ url: MobileImg }] })
    const overviewRef = useReveal()
    const statsRef = useReveal()
    const servicesRef = useReveal()
    const processRef = useReveal()
    const techRef = useReveal()
    const faqRef = useReveal()

    const displayImage = pageData.gallery?.[0]?.url || MobileImg
    const displayFaqs = pageData.faqs
    const displayHero = pageData.hero || {}

    return (
        <div className="sp-page">
            <PageHero
                breadcrumbs={[{ label: "Services" }, { label: "Mobile App Development" }]}
                pill="Mobile App Development"
                pillIcon={<FiSmartphone />}
                title={displayHero.title || <>Apps People <span className="ph-gradient">Actually Use</span></>}
                subtitle={displayHero.subtitle || "Flutter, React Native, Swift, Kotlin — we build cross-platform and native apps that are fast, reliable, and polished. From MVP to App Store launch."}
                tag="25+ Apps Launched · 4.7★ avg. rating"
            />

            <div className="sp-body">

                {/* OVERVIEW */}
                <div className="sp-overview-grid sp-anim" ref={overviewRef}>
                    <div className="sp-overview-text">
                        <h2 className="sp-overview-title">
                            Mobile-First Products<br />
                            <span className="sp-hl">Built to Delight</span>
                        </h2>
                        <p className="sp-overview-para">
                            A great app is more than working features — it's the micro-animations, the snappy load times, the intuitive flows that make users come back every day. We sweat the details so your users never have to think twice.
                        </p>
                        <p className="sp-overview-para">
                            We deliver cross-platform apps using Flutter (our default recommendation) with a single codebase for Android and iOS — cutting time-to-market by 40% without compromising on quality.
                        </p>
                        <ul className="sp-checklist">
                            {["One codebase for Android + iOS (Flutter)", "Delivered with full source code and CI/CD", "Real device testing on 10+ devices", "App Store & Play Store submission included"].map(i => (
                                <li key={i}><span className="sp-check-icon">✓</span>{i}</li>
                            ))}
                        </ul>
                        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
                            <Link to="/contact" className="sp-btn-primary" style={{ background: "var(--sp-white)", color: "var(--sp-orange)", border: "1.5px solid var(--sp-orange)" }}>Discuss Your App Idea <FiArrowRight /></Link>
                        </div>
                    </div>
                    <div className="sp-overview-visual">
                        <div className="sp-visual-box">
                            <FiSmartphone className="sp-visual-icon" />
                            <img src={displayImage} alt="Mobile Development" />
                            <span className="sp-visual-label">Mobile App Development</span>
                        </div>
                        <div className="sp-visual-badge sp-vb-1"><FiShield style={{ color: "var(--sp-orange)" }} /> iOS & Android</div>
                        <div className="sp-visual-badge sp-vb-2"><FiZap style={{ color: "var(--sp-orange)" }} /> 4.7★ Avg Rating</div>
                    </div>
                </div>

                {/* STATS */}
                <div className="sp-stats-strip sp-anim" ref={statsRef}>
                    {stats.map((s, i) => (
                        <div key={s.lbl} className="sp-stat-card" style={{ "--delay": `${i * 0.08}s` }}>
                            <span className="sp-stat-val">{s.val}</span>
                            <span className="sp-stat-lbl">{s.lbl}</span>
                        </div>
                    ))}
                </div>

                {/* SERVICES */}
                <div>
                    <div className="sp-section-header">
                        <div className="sp-pill"><FiLayers /> What We Build</div>
                        <h2 className="sp-section-title">Mobile App <span className="sp-hl">Services</span></h2>
                        <p className="sp-section-sub">Cross-platform and native — every kind of mobile product we specialise in.</p>
                    </div>
                    <div className="sp-cards-grid sp-cols-3 sp-anim" ref={servicesRef}>
                        {services.map((s, i) => (
                            <div key={s.title} className="sp-card" style={{ "--delay": `${i * 0.08}s` }}>
                                <div className="sp-card-icon">{s.icon}</div>
                                <div className="sp-card-tag">{s.tag}</div>
                                <h3 className="sp-card-title">{s.title}</h3>
                                <p className="sp-card-desc">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* PROCESS */}
                <div>
                    <div className="sp-section-header sp-center">
                        <div className="sp-pill"><FiSettings /> How We Work</div>
                        <h2 className="sp-section-title">Our App Development <span className="sp-hl">Process</span></h2>
                        <p className="sp-section-sub">Strategy to store submission — a proven process for shipping apps that users love.</p>
                    </div>
                    <div className="sp-steps-grid sp-anim" ref={processRef}>
                        {process.map((p, i) => (
                            <div key={p.num} className="sp-step" style={{ "--delay": `${i * 0.08}s` }}>
                                <div className="sp-step-num"><span>{p.num}</span></div>
                                <div className="sp-step-title">{p.title}</div>
                                <div className="sp-step-desc">{p.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* TECH STACK */}
                <div>
                    <div className="sp-section-header">
                        <div className="sp-pill"><FiCode /> Tech Stack</div>
                        <h2 className="sp-section-title">Technologies We <span className="sp-hl">Use</span></h2>
                        <p className="sp-section-sub">From Flutter to native Swift and Kotlin — we choose the right tool for your product.</p>
                    </div>
                    <div className="sp-tech-grid sp-anim" ref={techRef}>
                        {techStack.map((t, i) => (
                            <div key={t.cat} className="sp-tech-card" style={{ "--delay": `${i * 0.08}s` }}>
                                <span className="sp-tech-cat">{t.cat}</span>
                                <div className="sp-tech-items">
                                    {t.items.map(item => <span key={item} className="sp-tech-item">{item}</span>)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* FAQ */}
                <div>
                    <div className="sp-section-header">
                        <div className="sp-pill"><FiTrendingUp /> FAQ</div>
                        <h2 className="sp-section-title">Common <span className="sp-hl">Questions</span></h2>
                    </div>
                    <div className="sp-faq-list sp-anim" ref={faqRef}>
                        {displayFaqs.map((f, i) => (
                            <div key={i} style={{ "--delay": `${i * 0.07}s` }}>
                                <FaqItem q={f.q} a={f.a} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="sp-cta sp-anim">
                    <h2 className="sp-cta-title">Have an App Idea? Let's Build It.</h2>
                    <p className="sp-cta-sub">Share your concept and get a free feasibility assessment, tech recommendation, and ballpark estimate within 48 hours.</p>
                    <Link to="/contact" className="sp-btn-primary">Get a Free App Estimate <FiArrowRight /></Link>
                </div>

            </div>
        </div>
    )
}