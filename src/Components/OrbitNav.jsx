import React, { useState } from "react"
import { FiX } from "react-icons/fi"
import { FaReact, FaDocker, FaNodeJs, FaPython } from "react-icons/fa6"
import { SiMongodb, SiPhp } from "react-icons/si"
import logo from "../assets/logo-full.jpeg"
import "../Styles/OrbitNav.css"

const MENUS = {
    react: {
        icon: <FaReact />,
        label: "Frontend Development",
        items: [
            "React.js & Next.js",
            "TypeScript",
            "Tailwind CSS",
            "Component Libraries",
            "Progressive Web Apps",
        ],
    },
    docker: {
        icon: <FaDocker />,
        label: "DevOps & Deployment",
        items: [
            "Docker & Containerization",
            "Kubernetes Orchestration",
            "CI/CD Pipelines",
            "Cloud Infrastructure",
            "Monitoring & Logging",
        ],
    },
    node: {
        icon: <FaNodeJs />,
        label: "APIs & Microservices",
        items: [
            "Express.js & Nest.js",
            "GraphQL APIs",
            "WebSocket Servers",
            "Serverless Functions",
            "API Gateway Integration",
        ],
    },
    python: {
        icon: <FaPython />,
        label: "AI & Data Science",
        items: [
            "Machine Learning Models",
            "Data Analytics",
            "Django & FastAPI",
            "Automation Scripts",
            "Web Scraping & ETL",
        ],
    },
    mongo: {
        icon: <SiMongodb />,
        label: "Database Solutions",
        items: [
            "MongoDB & PostgreSQL",
            "Data Modeling",
            "Replication & Sharding",
            "Backup & Recovery",
            "Query Optimization",
        ],
    },
    php: {
        icon: <SiPhp />,
        label: "Backend Development",
        items: [
            "Laravel & Symfony",
            "RESTful APIs",
            "Microservices Architecture",
            "Authentication & Security",
            "Payment Gateway Integration",
        ],
    },
}

export default function OrbitNav() {
    const [activeMenu, setActiveMenu] = useState(null)

    const handleClick = (key) => {
        setActiveMenu(activeMenu === key ? null : key)
    }

    const active = activeMenu ? MENUS[activeMenu] : null

    return (
        <div className="orbitnav">
            <div className="orbitnav-center">
                <img src={logo} alt="Axsem" className="orbitnav-logo" />
            </div>
            <div className="orbitnav-ring-inner" />

            <div className="orbitnav-ring orbitnav-ring-mid">
                <div className="orbitnav-ring-circle" />
                <button
                    className="orbitnav-dot orbitnav-dot-l"
                    onClick={() => handleClick("react")}
                    aria-label="Frontend Development"
                >
                    <FaReact />
                    <span className="orbitnav-tip">Frontend Development</span>
                </button>
                <button
                    className="orbitnav-dot orbitnav-dot-r"
                    onClick={() => handleClick("docker")}
                    aria-label="DevOps & Deployment"
                >
                    <FaDocker />
                    <span className="orbitnav-tip">DevOps &amp; Deployment</span>
                </button>
            </div>

            <div className="orbitnav-ring orbitnav-ring-mid-2">
                <div className="orbitnav-ring-circle" />
                <button
                    className="orbitnav-dot orbitnav-dot-l"
                    onClick={() => handleClick("node")}
                    aria-label="APIs & Microservices"
                >
                    <FaNodeJs />
                    <span className="orbitnav-tip">APIs &amp; Microservices</span>
                </button>
                <button
                    className="orbitnav-dot orbitnav-dot-r"
                    onClick={() => handleClick("python")}
                    aria-label="AI & Data Science"
                >
                    <FaPython />
                    <span className="orbitnav-tip">AI &amp; Data Science</span>
                </button>
            </div>

            <div className="orbitnav-ring orbitnav-ring-out">
                <div className="orbitnav-ring-circle" />
                <button
                    className="orbitnav-dot orbitnav-dot-l"
                    onClick={() => handleClick("mongo")}
                    aria-label="Database Solutions"
                >
                    <SiMongodb />
                    <span className="orbitnav-tip">Database Solutions</span>
                </button>
                <button
                    className="orbitnav-dot orbitnav-dot-r"
                    onClick={() => handleClick("php")}
                    aria-label="Backend Development"
                >
                    <SiPhp />
                    <span className="orbitnav-tip">Backend Development</span>
                </button>
            </div>

            {active && (
                <div className="orbitnav-overlay" onClick={() => setActiveMenu(null)}>
                    <div className="orbitnav-menu" onClick={(e) => e.stopPropagation()}>
                        <button
                            className="orbitnav-menu-close"
                            onClick={() => setActiveMenu(null)}
                            aria-label="Close"
                        >
                            <FiX />
                        </button>
                        <div className="orbitnav-menu-icon">{active.icon}</div>
                        <h3 className="orbitnav-menu-title">{active.label}</h3>
                        <ul className="orbitnav-menu-list">
                            {active.items.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    )
}
