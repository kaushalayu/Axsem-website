import { useEffect, useRef, useState, useMemo } from "react"
import { FiArrowRight, FiCpu } from "react-icons/fi"
import { FaReact, FaVuejs, FaNodeJs, FaPython, FaDocker, FaAws, FaGoogle, FaGithub, FaSwift, FaAndroid } from "react-icons/fa"
import { SiFlutter } from "react-icons/si"
import { DiPostgresql, DiMysql, DiMongodb, DiRedis, DiFirebase } from "react-icons/di"
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiDjango, SiLaravel, SiGo, SiKubernetes, SiTensorflow, SiPytorch, SiLangchain, SiOpenai } from "react-icons/si"
import { api } from "../services/api"
import "../Styles/TechStack.css"

const ICON_MAP = {
    FaReact, FaVuejs, FaNodeJs, FaPython, FaDocker, FaAws, FaGoogle, FaGithub, FaSwift, FaAndroid,
    SiFlutter, DiPostgresql, DiMysql, DiMongodb, DiRedis, DiFirebase,
    SiTypescript, SiNextdotjs, SiTailwindcss, SiDjango, SiLaravel, SiGo, SiKubernetes,
    SiTensorflow, SiPytorch, SiLangchain, SiOpenai
}

function useReveal(threshold = 0.08) {
    const ref = useRef(null)
    useEffect(() => {
        const el = ref.current; if (!el) return
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) el.classList.add("revealed") },
            { threshold }
        )
        obs.observe(el); return () => obs.disconnect()
    }, [])
    return ref
}

const CATEGORIES = [
    {
        name: "Frontend",
        color: "#f05a28",
        techs: [
            { name: "React", icon: FaReact, color: "#61DAFB" },
            { name: "Next.js", icon: SiNextdotjs, color: "#000" },
            { name: "Vue.js", icon: FaVuejs, color: "#4FC08D" },
            { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38B2AC" },
            { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
        ],
    },
    {
        name: "Mobile",
        color: "#3d3d9e",
        techs: [
            { name: "Flutter", icon: SiFlutter, color: "#02569B" },
            { name: "React Native", icon: FaReact, color: "#61DAFB" },
            { name: "Swift", icon: FaSwift, color: "#F05138" },
            { name: "Kotlin", icon: FaAndroid, color: "#3DDC84" },
        ],
    },
    {
        name: "Backend",
        color: "#0e9e6e",
        techs: [
            { name: "Node.js", icon: FaNodeJs, color: "#339933" },
            { name: "Python", icon: FaPython, color: "#3776AB" },
            { name: "Django", icon: SiDjango, color: "#092E20" },
            { name: "Laravel", icon: SiLaravel, color: "#FF2D20" },
            { name: "Go", icon: SiGo, color: "#00ADD8" },
        ],
    },
    {
        name: "Database",
        color: "#6b3fa0",
        techs: [
            { name: "PostgreSQL", icon: DiPostgresql, color: "#336791" },
            { name: "MySQL", icon: DiMysql, color: "#4479A1" },
            { name: "MongoDB", icon: DiMongodb, color: "#47A248" },
            { name: "Redis", icon: DiRedis, color: "#DC382D" },
            { name: "Firebase", icon: DiFirebase, color: "#FFCA28" },
        ],
    },
    {
        name: "Cloud & DevOps",
        color: "#f5a623",
        techs: [
            { name: "AWS", icon: FaAws, color: "#FF9900" },
            { name: "GCP", icon: FaGoogle, color: "#4285F4" },
            { name: "Docker", icon: FaDocker, color: "#2496ED" },
            { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
            { name: "GitHub CI/CD", icon: FaGithub, color: "#181717" },
        ],
    },
    {
        name: "AI & Tools",
        color: "#e63b2a",
        techs: [
            { name: "ChatGPT", icon: SiOpenai, color: "#74AA9C" },
            { name: "GPT-4", icon: SiOpenai, color: "#74AA9C" },
            { name: "LangChain", icon: SiLangchain, color: "#2C2C2C" },
            { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00" },
            { name: "PyTorch", icon: SiPytorch, color: "#EE4C2C" },
        ],
    },
]

function TechCard({ tech, accent, delay }) {
    const IconComponent = tech.icon && ICON_MAP[tech.icon] ? ICON_MAP[tech.icon] : FiCpu
    return (
        <div className="ts-tech-chip" style={{ "--accent": accent, "--delay": delay }}>
            <span className="ts-tech-icon" style={{ color: tech.color || '#666' }}>
                <IconComponent />
            </span>
            <span className="ts-tech-name">{tech.name}</span>
        </div>
    )
}

export default function TechStackSection() {
    const [active, setActive] = useState(null)
    const [techData, setTechData] = useState([])
    const [loading, setLoading] = useState(true)
    const headerRef = useReveal()
    const gridRef = useReveal(0.05)
    const bottomRef = useReveal(0.1)

    useEffect(() => {
        api.getTechStack()
            .then(data => {
                if (data?.data) {
                    setTechData(data.data)
                } else if (Array.isArray(data)) {
                    setTechData(data)
                }
            })
            .catch(() => {})
            .finally(() => setLoading(false))
    }, [])

    const categories = useMemo(() => {
        if (techData.length === 0) return CATEGORIES
        
        const grouped = {}
        techData.forEach(t => {
            const cat = t.category || 'Other'
            if (!grouped[cat]) {
                grouped[cat] = { name: cat, color: t.color || '#666', techs: [] }
            }
            grouped[cat].techs.push({ name: t.name, icon: t.icon, color: t.color })
        })
        return Object.values(grouped)
    }, [techData])

    const displayed = active
        ? categories.filter(c => c.name === active)
        : categories

    return (
        <section className="ts-section">
            <div className="ts-bg" aria-hidden>
                <div className="ts-orb ts-orb-1" /><div className="ts-orb ts-orb-2" />
                <div className="ts-grid-overlay" />
            </div>

            <div className="ts-container">

                {/* Header */}
                <div className="ts-header" ref={headerRef}>
                    <div className="ts-eyebrow"><span className="ts-dot" /><FiCpu /> Technologies We Use</div>
                    <h2 className="ts-heading">
                        Built With the<br /><span className="ts-heading-hl">Best Tech Stack</span>
                    </h2>
                    <p className="ts-subheading">
                        Modern, battle-tested technologies chosen for performance, scalability, and long-term maintainability.
                    </p>
                </div>

                {/* Category filter pills */}
                <div className="ts-filters">
                    <button
                        className={`ts-filter${active === null ? " ts-filter-active" : ""}`}
                        onClick={() => setActive(null)}
                    ><span>All</span></button>
                    {CATEGORIES.map(c => (
                        <button
                            key={c.name}
                            className={`ts-filter${active === c.name ? " ts-filter-active" : ""}`}
                            style={{ "--accent": c.color }}
                            onClick={() => setActive(active === c.name ? null : c.name)}
                        >
                            <span>{c.name}</span>
                        </button>
                    ))}
                </div>

                {/* Category blocks */}
                <div className="ts-grid revealed" ref={gridRef}>
                    {displayed.map((cat, ci) => (
                        <div key={cat.name} className="ts-cat-block" style={{ "--accent": cat.color, "--ci": ci }}>
                            <div className="ts-cat-header">
                                <div className="ts-cat-dot" style={{ background: cat.color }} />
                                <span className="ts-cat-name">{cat.name}</span>
                                <span className="ts-cat-count">{cat.techs.length}</span>
                            </div>
                            <div className="ts-chips">
                                {cat.techs.map((t, ti) => (
                                    <TechCard
                                        key={t.name} tech={t}
                                        accent={cat.color}
                                        delay={`${(ci * 0.05) + (ti * 0.04)}s`}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA row */}
                <div className="ts-bottom" ref={bottomRef}>
                    <div className="ts-bottom-text">
                        <span className="ts-bottom-stat">30+</span>
                        <span className="ts-bottom-label">Technologies mastered across web, mobile, cloud, and AI</span>
                    </div>
                    <div className="ts-bottom-btns">
                        <a href="/services/web-development" className="ts-btn-primary">Explore Services <FiArrowRight /></a>
                        <a href="/contact" className="ts-btn-outline"><span>Discuss Tech Stack</span> <FiArrowRight /></a>
                    </div>
                </div>

            </div>
        </section>
    )
}
