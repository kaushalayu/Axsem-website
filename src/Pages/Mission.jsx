import { useEffect, useRef } from "react"
import {
    FiBriefcase,
    FiUsers,
    FiTrendingUp,
    FiHeart,
    FiCode,
    FiLayers,
    FiCpu,
    FiArrowRight,
    FiCheckCircle
} from "react-icons/fi"
import PageHero from "../Components/PageHero"
import "../Styles/MissionVision.css"

/* ── Reveal Hook ── */
function useReveal(threshold = 0.1) {
    const ref = useRef(null)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) el.classList.add("mv-revealed")
            },
            { threshold, rootMargin: "0px 0px -40px 0px" }
        )

        obs.observe(el)
        return () => obs.disconnect()
    }, [])

    return ref
}

/* ── Culture Data ── */
const culture = [
    {
        icon: <FiHeart />,
        color: "#f05a28",
        title: "People First",
        desc: "We value humans over hierarchy. Respect, trust, and empathy guide how we work together."
    },
    {
        icon: <FiTrendingUp />,
        color: "#3d3d9e",
        title: "Growth Mindset",
        desc: "We invest in learning, mentorship, and continuous improvement at every career stage."
    },
    {
        icon: <FiUsers />,
        color: "#6b3fa0",
        title: "Ownership Culture",
        desc: "You own your work end-to-end. Accountability and autonomy go hand in hand here."
    }
]

/* ── Roles Data ── */
const roles = [
    {
        icon: <FiCode />,
        title: "Frontend Developer",
        desc: "Build modern, performant interfaces using React, Tailwind, and animation-driven UX.",
        type: "Full Time · Remote / Hybrid",
        applyLink: "mailto:careers@axsemsoftwares.com?subject=Frontend Developer Application"
    },
    {
        icon: <FiLayers />,
        title: "Backend Developer",
        desc: "Design scalable APIs, databases, and secure backend systems for real-world products.",
        type: "Full Time · Onsite",
        applyLink: "mailto:careers@axsemsoftwares.com?subject=Backend Developer Application"
    },
    {
        icon: <FiCpu />,
        title: "AI / Automation Engineer",
        desc: "Work on AI-driven tools, automation pipelines, and next-gen SaaS products.",
        type: "Intern / Full Time",
        applyLink: "mailto:careers@axsemsoftwares.com?subject=AI Engineer Application"
    }
]

export default function CareersPage() {
    const cultureRef = useReveal(0.06)
    const rolesRef = useReveal(0.06)
    const perksRef = useReveal(0.08)
    const ctaRef = useReveal(0.1)

    return (
        <div className="mv-page">

            {/* ══ HERO ══ */}
            <PageHero
                breadcrumbs={[
                    { label: "About", href: "/about" },
                    { label: "Careers" }
                ]}
                pill="Join AXSEM"
                pillIcon={<FiBriefcase />}
                title={
                    <>
                        Build Your Career<br />
                        <span className="ph-gradient">With Purpose</span>
                    </>
                }
                subtitle="We’re building a team of curious, driven, and kind people who want to create meaningful technology and grow together."
                tag="Careers · AXSEM Softwares"
            />

            <div className="mv-body">

                {/* ══ CULTURE ══ */}
                <section className="mv-section">
                    <div className="mv-section-header">
                        <span className="mv-section-pill"><FiHeart /> Our Culture</span>
                        <h2 className="mv-section-title">
                            What It’s Like to <span className="mv-accent">Work With Us</span>
                        </h2>
                        <p className="mv-section-sub">
                            We believe in clarity, growth, ownership, and meaningful work.
                        </p>
                    </div>

                    <div className="mv-values-grid mv-anim" ref={cultureRef}>
                        {culture.map((c, i) => (
                            <div
                                key={typeof c.title === 'string' ? c.title : i}
                                className="mv-value-card"
                                style={{ "--vc": c.color, "--delay": `${i * 0.08}s` }}
                            >
                                <div className="mv-value-icon">{c.icon}</div>
                                <h3 className="mv-value-title">{typeof c.title === 'string' ? c.title : 'Untitled'}</h3>
                                <p className="mv-value-desc">{typeof c.desc === 'string' ? c.desc : ''}</p>
                                <div className="mv-value-bar" />
                            </div>
                        ))}
                    </div>
                </section>

                {/* ══ OPEN ROLES ══ */}
                <section className="mv-section">
                    <div className="mv-section-header">
                        <span className="mv-section-pill"><FiBriefcase /> Open Positions</span>
                        <h2 className="mv-section-title">
                            Current <span className="mv-accent">Openings</span>
                        </h2>
                        <p className="mv-section-sub">
                            Join us at any stage — internship, full-time, or growth roles.
                        </p>
                    </div>

                    <div className="mv-goals-grid mv-anim" ref={rolesRef}>
                        {roles.map((r, i) => (
                            <div
                                key={typeof r.title === 'string' ? r.title : i}
                                className="mv-goal-card"
                                style={{ "--gc": "#f05a28", "--delay": `${i * 0.1}s` }}
                            >
                                <div className="mv-goal-icon">{r.icon}</div>

                                <h4 className="mv-goal-title">{typeof r.title === 'string' ? r.title : 'Untitled'}</h4>
                                <p className="mv-goal-desc">{typeof r.desc === 'string' ? r.desc : ''}</p>

                                <span className="mv-goal-year">{typeof r.type === 'string' ? r.type : ''}</span>

                                {/* ✅ PROFESSIONAL APPLY BUTTON */}
                                <a
                                    href={r.applyLink}
                                    className="mv-btn-apply"
                                    style={{ marginTop: "14px", alignSelf: "flex-start" }}
                                >
                                    Apply Now <FiArrowRight />
                                </a>

                                <div className="mv-goal-glow" />
                            </div>
                        ))}
                    </div>
                </section>

                {/* ══ WHY JOIN US ══ */}
                <section className="mv-section mv-promises-section">
                    <div className="mv-promises-inner mv-anim" ref={perksRef}>
                        <div className="mv-promises-text">
                            <span className="mv-section-pill"><FiCheckCircle /> Why AXSEM</span>
                            <h2 className="mv-section-title">
                                What You <span className="mv-accent">Get</span>
                            </h2>
                            <p className="mv-section-sub">
                                We care about long-term careers, not short-term output.
                            </p>
                        </div>

                        <div className="mv-promises-list">
                            {[
                                "Flexible work culture",
                                "Learning & mentorship support",
                                "Real project ownership",
                                "Fast growth opportunities",
                                "Supportive leadership",
                                "Performance-based growth path"
                            ].map((p, i) => (
                                <div
                                    key={i}
                                    className="mv-promise-item"
                                    style={{ "--delay": `${i * 0.08}s` }}
                                >
                                    <span className="mv-promise-icon"><FiCheckCircle /></span>
                                    <span className="mv-promise-text">{p}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══ CTA ══ */}
                <section className="mv-cta-section mv-anim" ref={ctaRef}>
                    <div className="mv-cta-glow" />
                    <div className="mv-cta-content">
                        <span className="mv-cta-pill">We’re Hiring</span>
                        <h2 className="mv-cta-title">
                            Ready to Build Something Meaningful?
                        </h2>
                        <p className="mv-cta-sub">
                            Send us your resume and portfolio — let’s start the conversation.
                        </p>
                        <div className="mv-cta-actions">
                            <a
                                href="mailto:careers@axsemsoftwares.com"
                                className="mv-btn-primary"
                            >
                                Send Resume <FiArrowRight />
                            </a>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    )
}