import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { api } from "../services/api"
import { useCompany } from "../contexts/CompanyContext"
import {
    FiTarget, FiEye, FiHeart, FiZap, FiShield, FiUsers,
    FiArrowRight, FiCheckCircle, FiAward, FiTrendingUp, FiStar
} from "react-icons/fi"
import "../Styles/AboutSection.css"

// Icon mapping
const iconMap = {
    zap: FiZap,
    shield: FiShield,
    heart: FiHeart,
    users: FiUsers,
    star: FiStar,
    trophy: FiAward
}

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

function ValueCard({ icon, title, desc, color, index }) {
    const ref = useReveal()
    const IconComponent = iconMap[icon] || FiZap
    
    return (
        <div
            className="value-card"
            ref={ref}
            style={{ "--card-color": color, "--delay": `${index * 0.1}s` }}
        >
            <div className="value-icon-wrap">
                <span className="value-icon"><IconComponent /></span>
            </div>
            <h4 className="value-title">{title}</h4>
            <p className="value-desc">{desc}</p>
        </div>
    )
}

function StatCard({ value, label }) {
    const ref = useReveal(0.1)
    return (
        <div className="stat-card" ref={ref}>
            <span className="stat-value">{value}</span>
            <span className="stat-label">{label}</span>
        </div>
    )
}

export default function AboutSection() {
    const { companyInfo } = useCompany()
    const [portfolio, setPortfolio] = useState([])
    
    const storyRef = useReveal(0.1)
    const mvRef = useReveal(0.1)
    const valuesRef = useReveal(0.1)
    const ctaRef = useReveal(0.1)
    const statsRef = useReveal(0.1)

    // Fetch portfolio for stats
    useEffect(() => {
        api.getProjects().then(setPortfolio).catch(() => {})
    }, [])

    // Extract dynamic data
    const aboutStory = companyInfo?.aboutStory || {}
    const aboutMission = companyInfo?.aboutMission || {}
    const aboutVision = companyInfo?.aboutVision || {}
    const aboutValues = companyInfo?.aboutValues || []
    const stats = aboutStory?.stats || {}
    const foundedYear = companyInfo?.foundedYear || "2020"

    return (
        <section className="about-section"> 
            <div className="about-bg">
                <div className="about-orb about-orb-1" />
                <div className="about-orb about-orb-2" />
                <div className="about-grid" />
            </div> 

            <div className="about-container">

                {/* SECTION HEADER */}
                <div className="section-header" ref={useReveal()}>
                    <span className="section-pill">
                        <FiAward /> About Axsem
                    </span>
                    <h2 className="section-title">
                        More Than a Software Company —<br />
                        <span className="title-accent">We're Your Growth Partner</span>
                    </h2>
                    <p className="section-subtitle">
                        Since {foundedYear}, we've been engineering digital products that don't just work —
                        they scale, adapt, and drive measurable business results.
                    </p>
                </div>

                {/* STORY */}
                <div className="story-grid" ref={storyRef}>
                    <div className="story-visual">
                        <div className="story-img-wrap">
                            <img
                                src={aboutStory.image || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&auto=format&fit=crop&q=60"}
                                alt="Axsem Team"
                                className="story-img"
                            />
                            <div className="story-badge sb-1">
                                <FiCheckCircle />
                                <span>{stats.years || "5+"} Years Experience</span>
                            </div>
                            <div className="story-badge sb-2">
                                <FiAward />
                                <span>{stats.satisfaction || "99%"} Satisfaction</span>
                            </div>
                        </div>
                    </div>

                    <div className="story-text">
                        <h3 className="story-heading">
                            {aboutStory.heading || "Built on Passion, Driven by Purpose"}
                        </h3>
                        <p className="story-para">
                            {aboutStory.description1 || "Axsem Softwares was born from a simple belief — that small and mid-sized businesses deserve the same quality of software as Fortune 500 companies."}
                        </p>
                        <p className="story-para">
                            {aboutStory.description2 || "Today, we're a full-stack digital agency delivering web applications, mobile solutions, ERP systems, and cloud infrastructure to clients across industries."}
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

                {/* STATS STRIP */}
                <div className="stats-strip" ref={statsRef}>
                    <StatCard value={stats.years || "5+"} label="Years Experience" />
                    <StatCard value={stats.clients || (portfolio.length > 0 ? portfolio.length.toString() : "50+")} label="Clients Served" />
                    <StatCard value={stats.projects || "100+"} label="Projects Delivered" />
                    <StatCard value={stats.satisfaction || "99%"} label="Client Satisfaction" />
                </div>

                {/* MISSION & VISION */}
                <div className="mv-grid" ref={mvRef}>
                    <div className="mv-card mv-mission">
                        <div className="mv-icon-wrap">
                            <FiTarget />
                        </div>
                        <div className="mv-tag">Our Mission</div>
                        <h3 className="mv-heading">{aboutMission.title || "Empower Businesses Through Technology"}</h3>
                        <p className="mv-body">
                            {aboutMission.description || "To deliver innovative, reliable, and scalable software solutions that help businesses of all sizes compete in the digital world."}
                        </p>
                        <div className="mv-accent-line" />
                    </div>

                    <div className="mv-card mv-vision">
                        <div className="mv-icon-wrap">
                            <FiEye />
                        </div>
                        <div className="mv-tag">Our Vision</div>
                        <h3 className="mv-heading">{aboutVision.title || "India's Most Trusted Software Partner"}</h3>
                        <p className="mv-body">
                            {aboutVision.description || "To be the go-to technology partner for growing businesses."}
                        </p>
                        <div className="mv-accent-line" />
                    </div>
                </div>

                {/* CORE VALUES */}
                <div className="values-section" ref={valuesRef}>
                    <div className="sub-header">
                        <span className="section-pill small">Core Values</span>
                        <h3 className="sub-title">The Principles We Never Compromise On</h3>
                    </div>
                    <div className="values-grid">
                        {aboutValues.length > 0 ? (
                            aboutValues.map((v, i) => (
                                <ValueCard 
                                    key={i} 
                                    icon={v.icon} 
                                    title={v.title} 
                                    desc={v.description} 
                                    color={v.color} 
                                    index={i} 
                                />
                            ))
                        ) : (
                            // Default values if none from API
                            [
                                { icon: "zap", title: "Innovation First", desc: "We push boundaries with cutting-edge tech.", color: "#f05a28" },
                                { icon: "shield", title: "Uncompromising Quality", desc: "Every line of code is crafted with precision.", color: "#3d3d9e" },
                                { icon: "heart", title: "Client-Centric", desc: "Your success is our success.", color: "#e63b2a" },
                                { icon: "users", title: "Collaborative Spirit", desc: "Transparent communication, agile execution.", color: "#6b3fa0" }
                            ].map((v, i) => (
                                <ValueCard key={i} {...v} index={i} />
                            ))
                        )}
                    </div>
                </div>

                {/* CTA */}
                <div className="about-cta" ref={ctaRef}>
                    <div className="cta-glow" />
                    <div className="cta-content">
                        <span className="cta-pill">Ready to Build?</span>
                        <h3 className="cta-heading">Let's Turn Your Vision Into Reality</h3>
                        <p className="cta-sub">
                            Whether you have a rough idea or a detailed spec — we're ready to build something extraordinary together.
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