import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import {
    FiTarget, FiEye, FiHeart, FiZap, FiShield, FiUsers,
    FiArrowRight, FiCheckCircle, FiAward, FiTrendingUp
} from "react-icons/fi"
import "../Styles/AboutSection.css"

/* ── Intersection Observer Hook ── */
function useReveal(threshold = 0.15) {
    const ref = useRef(null)
    useEffect(() => {
        const el = ref.current
        if (!el) return
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) el.classList.add("revealed") },
            { threshold }
        )
        obs.observe(el)
        return () => obs.disconnect()
    }, [])
    return ref
}

/* ── Core Values Data ── */
const values = [
    {
        icon: <FiZap />,
        title: "Innovation First",
        desc: "We push boundaries with cutting-edge tech to deliver solutions that keep you ahead of the curve.",
        color: "#f05a28",
    },
    {
        icon: <FiShield />,
        title: "Uncompromising Quality",
        desc: "Every line of code is crafted with precision, reviewed rigorously, and tested exhaustively.",
        color: "#3d3d9e",
    },
    {
        icon: <FiHeart />,
        title: "Client-Centric",
        desc: "Your success is our success. We build long-term partnerships, not just one-time projects.",
        color: "#e63b2a",
    },
    {
        icon: <FiUsers />,
        title: "Collaborative Spirit",
        desc: "Transparent communication, agile execution, and a team that works as an extension of yours.",
        color: "#6b3fa0",
    },
]

/* ── Timeline Milestones ── */
const timeline = [
    { year: "2020", title: "Founded", desc: "AXSEM Softwares started with a vision to democratize enterprise-grade software." },
    { year: "2020", title: "First 10 Clients", desc: "Delivered 15+ projects across web, mobile & ERP in our first full year." },
    { year: "2022", title: "Team Expansion", desc: "Grew to 12 developers, designers & strategists serving clients across India." },
    { year: "2024", title: "50+ Projects", desc: "Crossed 50 successful deliveries with a 99% client satisfaction rate." },
]

/* ── Value Card ── */
function ValueCard({ icon, title, desc, color, index }) {
    const ref = useReveal()
    return (
        <div
            className="value-card"
            ref={ref}
            style={{ "--card-color": color, "--delay": `${index * 0.1}s` }}
        >
            <div className="value-icon-wrap">
                <span className="value-icon">{icon}</span>
            </div>
            <h4 className="value-title">{title}</h4>
            <p className="value-desc">{desc}</p>
        </div>
    )
}

/* ── Main Component ── */
export default function AboutSection() {
    const storyRef = useReveal(0.1)
    const mvRef = useReveal(0.1)
    const valuesRef = useReveal(0.1)
    const timelineRef = useReveal(0.1)
    const ctaRef = useReveal(0.1)

    return (
        <section className="about-section">

            {/* ── Decorative BG ── */}
            <div className="about-bg">
                <div className="about-orb about-orb-1" />
                <div className="about-orb about-orb-2" />
                <div className="about-grid" />
            </div>

            <div className="about-container">

                {/* ══════════════════════════════
            1. SECTION HEADER
        ══════════════════════════════ */}
                <div className="section-header" ref={useReveal()}>
                    <span className="section-pill">
                        <FiAward /> About AXSEM
                    </span>
                    <h2 className="section-title">
                        More Than a Software Company —<br />
                        <span className="title-accent">We're Your Growth Partner</span>
                    </h2>
                    <p className="section-subtitle">
                        Since 2020, we've been engineering digital products that don't just work —
                        they scale, adapt, and drive measurable business results.
                    </p>
                </div>

                {/* ══════════════════════════════
            2. STORY — TWO COLUMN
        ══════════════════════════════ */}
                <div className="story-grid" ref={storyRef}>

                    {/* Left — visual */}
                    <div className="story-visual">
                        <div className="story-img-wrap">
                            <img
                                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmdvfGVufDB8fDB8fHww"
                                alt="AXSEM Team"
                                className="story-img"
                            />
                            {/* Floating accent cards */}
                            <div className="story-badge sb-1">
                                <FiCheckCircle />
                                <span>5+ Years Experience</span>
                            </div>
                            <div className="story-badge sb-2">
                                <FiAward />
                                <span>99% Satisfaction</span>
                            </div>
                        </div>
                    </div>

                    {/* Right — text */}
                    <div className="story-text">
                        <h3 className="story-heading">
                            Built on Passion,<br />Driven by Purpose
                        </h3>
                        <p className="story-para">
                            AXSEM Softwares was born from a simple belief — that small and
                            mid-sized businesses deserve the same quality of software as Fortune
                            500 companies. We started in 2020 with a team of three, a handful of
                            ideas, and an unwavering commitment to excellence.
                        </p>
                        <p className="story-para">
                            Today, we're a full-stack digital agency delivering web applications,
                            mobile solutions, ERP systems, and cloud infrastructure to clients
                            across industries. Our work doesn't end at deployment — we build
                            lasting partnerships and evolve your product as your business grows.
                        </p>

                        <ul className="story-checklist">
                            {[
                                "Full-cycle product development",
                                "Dedicated post-launch support",
                                "Agile & transparent process",
                                "Domain-driven architecture",
                            ].map((item) => (
                                <li key={item}>
                                    <FiCheckCircle className="check-icon" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* ══════════════════════════════
            3. MISSION & VISION
        ══════════════════════════════ */}
                <div className="mv-grid" ref={mvRef}>
                    <div className="mv-card mv-mission">
                        <div className="mv-icon-wrap">
                            <FiTarget />
                        </div>
                        <div className="mv-tag">Our Mission</div>
                        <h3 className="mv-heading">Empower Businesses Through Technology</h3>
                        <p className="mv-body">
                            To deliver innovative, reliable, and scalable software solutions that
                            help businesses of all sizes compete in the digital world — reducing
                            complexity and increasing efficiency at every step.
                        </p>
                        <div className="mv-accent-line" />
                    </div>

                    <div className="mv-card mv-vision">
                        <div className="mv-icon-wrap">
                            <FiEye />
                        </div>
                        <div className="mv-tag">Our Vision</div>
                        <h3 className="mv-heading">India's Most Trusted Software Partner</h3>
                        <p className="mv-body">
                            To be the go-to technology partner for growing businesses — known for
                            our integrity, craftsmanship, and ability to turn ambitious ideas into
                            products that create real-world impact.
                        </p>
                        <div className="mv-accent-line" />
                    </div>
                </div>

                {/* ══════════════════════════════
            4. CORE VALUES
        ══════════════════════════════ */}
                <div className="values-section" ref={valuesRef}>
                    <div className="sub-header">
                        <span className="section-pill small">Core Values</span>
                        <h3 className="sub-title">The Principles We Never Compromise On</h3>
                    </div>
                    <div className="values-grid">
                        {values.map((v, i) => (
                            <ValueCard key={v.title} {...v} index={i} />
                        ))}
                    </div>
                </div>

                {/* ══════════════════════════════
            5. TIMELINE / JOURNEY
        ══════════════════════════════ */}
                {/* ══════════════════════════════
    JOURNEY SHOWCASE (REPLACES TIMELINE)
══════════════════════════════ */}
                {/* ══════════════════════════════
    MINI JOURNEY TIMELINE STRIP
══════════════════════════════ */}
                <section className="mini-journey">

                    <div className="mj-track">
                        <div className="mj-progress" />
                        <span className="mj-dot d1" />
                        <span className="mj-dot d2" />
                        <span className="mj-dot d3" />
                        <span className="mj-dot d4" />
                    </div>

                    <div className="mj-content">
                        <h4 className="mj-title">A Journey of Growth Since 2020</h4>

                        <Link to="/about/journay" className="mj-btn">
                            View Full Journey <FiArrowRight />
                        </Link>
                    </div>

                </section>

                {/* ══════════════════════════════
            6. CTA BANNER
        ══════════════════════════════ */}
                <div className="about-cta" ref={ctaRef}>
                    <div className="cta-glow" />
                    <div className="cta-content">
                        <span className="cta-pill">Ready to Build?</span>
                        <h3 className="cta-heading">Let's Turn Your Vision Into Reality</h3>
                        <p className="cta-sub">
                            Whether you have a rough idea or a detailed spec — we're ready to build
                            something extraordinary together.
                        </p>
                        <div className="cta-actions">
                            <Link to="/contact" className="cta-btn-primary">
                                Start a Project <FiArrowRight />
                            </Link>
                            <Link to="/portfolio" className="cta-btn-secondary">
                                See Our Work
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}