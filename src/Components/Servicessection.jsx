import React, { useEffect, useRef, useState } from "react"
import {
    FiCode, FiSmartphone, FiCloud, FiLayers, FiDatabase,
    FiShield, FiArrowRight, FiCheckCircle, FiZap
} from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import { useCompany } from "../contexts/CompanyContext"
import "../Styles/ServicesSection.css"

const iconMap = {
    FiCode, FiSmartphone, FiCloud, FiLayers, FiDatabase, FiShield
}

/* ── Intersection Observer Hook ── */
function useReveal(threshold = 0.12) {
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

/* ── Services Data ── */
const services = [
    {
        id: "web",
        icon: <FiCode />,
        color: "#f05a28",
        tag: "Web Development",
        title: "Custom Web Applications",
        desc: "Scalable, high-performance web apps built with React, Next.js, and Node.js — from MVPs to enterprise platforms.",
        points: ["React / Next.js / Vue", "REST & GraphQL APIs", "SEO-optimized architecture", "Performance-first delivery"],
        stat: "80+",
        statLabel: "Web Projects",
    },
    {
        id: "mobile",
        icon: <FiSmartphone />,
        color: "#3d3d9e",
        tag: "Mobile Development",
        title: "iOS & Android Apps",
        desc: "Cross-platform mobile apps with Flutter and React Native — native performance, single codebase.",
        points: ["Flutter & React Native", "Offline-first apps", "Push notifications", "App Store deployment"],
        stat: "40+",
        statLabel: "Apps Launched",
    },
    {
        id: "cloud",
        icon: <FiCloud />,
        color: "#6b3fa0",
        tag: "Cloud & DevOps",
        title: "Cloud Infrastructure",
        desc: "AWS, GCP, and Azure deployment — CI/CD pipelines, containerization, monitoring, and 99.9% uptime.",
        points: ["AWS / GCP / Azure", "Docker & Kubernetes", "CI/CD pipelines", "24/7 monitoring"],
        stat: "99.9%",
        statLabel: "Uptime SLA",
    },
    {
        id: "ui",
        icon: <FiLayers />,
        color: "#e63b2a",
        tag: "UI/UX Design",
        title: "Product Design & UX",
        desc: "Research-driven design that converts — from wireframes to pixel-perfect Figma prototypes and design systems.",
        points: ["User research & flows", "Figma prototyping", "Design systems", "Usability testing"],
        stat: "100%",
        statLabel: "Client Approval",
    },
    {
        id: "erp",
        icon: <FiDatabase />,
        color: "#f05a28",
        tag: "ERP & CRM",
        title: "ERP & Business Systems",
        desc: "Custom ERP, CRM, and inventory systems that automate operations and give you real-time business insights.",
        points: ["Inventory management", "Billing & invoicing", "HR & payroll modules", "Custom dashboards"],
        stat: "30+",
        statLabel: "ERP Deployments",
    },
    {
        id: "security",
        icon: <FiShield />,
        color: "#3d3d9e",
        tag: "Security",
        title: "Security & Maintenance",
        desc: "Ongoing security audits, performance optimization, bug fixes, and dedicated support — post-launch and beyond.",
        points: ["Security audits", "Performance tuning", "Regular updates", "Dedicated support"],
        stat: "5+",
        statLabel: "Years Support",
    },
]

/* ── Service Card ── */
function ServiceCard({ service, index, isActive, onClick }) {
    return (
        <div
            className={`svc-card ${isActive ? "svc-active" : ""}`}
            style={{ "--svc-color": service.color, "--delay": `${index * 0.08}s` }}
            onClick={() => onClick(service.id)}
        >
            <div className="svc-card-top">
                <div className="svc-icon-wrap">
                    <span className="svc-icon">{service.icon}</span>
                </div>
                <span className="svc-tag">{service.tag}</span>
            </div>

            <h3 className="svc-title">{typeof service.title === 'string' ? service.title : 'Untitled'}</h3>
            <p className="svc-desc">{typeof service.desc === 'string' ? service.desc : ''}</p>

            <ul className="svc-points">
                {service.points.map(p => (
                    <li key={p}>
                        <FiCheckCircle className="svc-check" />
                        {p}
                    </li>
                ))}
            </ul>

            <div className="svc-footer">
                <div className="svc-stat">
                    <span className="svc-stat-num">{service.stat}</span>
                    <span className="svc-stat-label">{service.statLabel}</span>
                </div>
                <button className="svc-cta">
                    Learn More <FiArrowRight />
                </button>
            </div>

            <div className="svc-card-glow" />
        </div>
    )
}

/* ── Main Component ── */
export default function ServicesSection() {
    const { services } = useCompany()
    const [activeId, setActiveId] = useState(null)
    const navigate = useNavigate()
    const headerRef = useReveal()
    const gridRef = useReveal(0.05)
    const bannerRef = useReveal(0.1)

    const servicesData = services.length > 0 ? services : null

    const serviceRoutes = {
        web: "/services/web-development",
        mobile: "/services/mobile-apps",
        cloud: "/services/software-development",
        ui: "/services/ui-ux",
        erp: "/products/crm",
        security: "/services/it-maintenance"
    }

    const handleClick = (id) => {
        const route = serviceRoutes[id]
        if (route) {
            navigate(route)
        } else {
            setActiveId(prev => prev === id ? null : id)
        }
    }

    return (
        <section className="svc-section">

            {/* ── BG ── */}
            <div className="svc-bg">
                <div className="svc-orb svc-orb-1" />
                <div className="svc-orb svc-orb-2" />
                <div className="svc-grid-overlay" />
            </div>

            <div className="svc-container">

                {/* ══ HEADER ══ */}
                <div className="svc-header" ref={headerRef}>
                    <span className="svc-pill">
                        <FiZap /> Our Services
                    </span>
                    <h2 className="svc-heading">
                        Everything You Need to <span className="svc-heading-accent">Build, Launch & Scale</span>
                    </h2>
                    <p className="svc-subheading">
                        From idea to production — we cover the full spectrum of digital
                        product development under one roof.
                    </p>
                </div>

                {/* ══ CARDS GRID ══ */}
                <div className="svc-grid" ref={gridRef}>
                    {(servicesData || []).map((svc, i) => (
                        <ServiceCard
                            key={svc.id}
                            service={{
                                ...svc,
                                icon: (() => {
                                    if (!svc.icon) return <FiCode />
                                    if (React.isValidElement(svc.icon)) return svc.icon
                                    const IconComp = iconMap[svc.icon]
                                    return IconComp ? <IconComp /> : <FiCode />
                                })(),
                                points: svc.points || [],
                                desc: svc.description || svc.desc || ''
                            }}
                            index={i}
                            isActive={activeId === svc.id}
                            onClick={handleClick}
                        />
                    ))}
                </div>

                {/* ══ PROCESS STRIP ══ */}
                <div className="svc-process" ref={bannerRef}>
                    <div className="process-label">
                        <FiZap />
                        Our Process
                    </div>
                    <div className="process-steps">
                        {["Discovery", "Design", "Development", "Testing", "Launch", "Support"].map((step, i) => (
                            <div key={step} className="process-step">
                                <div className="step-num">0{i + 1}</div>
                                <div className="step-name">{step}</div>
                                {i < 5 && <div className="step-arrow">→</div>}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    )
}