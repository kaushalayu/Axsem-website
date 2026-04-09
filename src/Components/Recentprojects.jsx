import { useEffect, useRef, useState, memo } from "react"
import { Link } from "react-router-dom"
import { FiArrowRight, FiExternalLink, FiGithub, FiLayers, FiTrendingUp } from "react-icons/fi"
import { api } from "../services/api"
import { useToast } from "../Components/Toast"
import { PROJECTS } from "../data/projects"
import "../Styles/RecentProjects.css"
import { normalizeText } from "../utils/textUtils"

const normalizeProject = (project) => ({
  ...project,
  title: normalizeText(project.title),
  tagline: normalizeText(project.tagline),
  desc: normalizeText(project.desc),
  overview: normalizeText(project.overview),
  category: normalizeText(project.category),
});

const ProjectsFallback = () => (
    <div className="proj-grid" style={{ minHeight: '400px' }}>
        {[1, 2, 3, 4].map(i => (
            <div key={i} className="proj-card proj-small" style={{ opacity: 0.5 }}>
                <div className="proj-thumb">
                    <div className="proj-thumb-inner" style={{ background: 'rgba(255,255,255,0.05)' }} />
                </div>
                <div className="proj-body">
                    <div className="proj-top-row">
                        <span className="proj-tag" style={{ width: '60px', height: '16px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }} />
                    </div>
                    <h3 className="proj-title" style={{ width: '80%', height: '24px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', margin: '12px 0' }} />
                    <p className="proj-desc" style={{ width: '100%', height: '40px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }} />
                </div>
            </div>
        ))}
    </div>
)

function useReveal(threshold = 0.1) {
    const ref = useRef(null)
    useEffect(() => {
        const el = ref.current
        if (!el) return
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) el.classList.add("revealed") },
            { threshold, rootMargin: "50px" }
        )
        obs.observe(el)
        return () => obs.disconnect()
    }, [threshold])
    return ref
}

const ProjectCard = memo(function ProjectCard({ project, index }) {
    const ref = useReveal()
    const isApiFormat = !!project.category
    
    const cardStyle = isApiFormat 
        ? { size: project.featured ? "large" : "small", color: project.color || "#f05a28" }
        : { size: project.size, color: project.color }
    
    return (
        <div
            className={`proj-card proj-${cardStyle.size}`}
            ref={ref}
            style={{ "--proj-color": cardStyle.color, "--delay": `${index * 0.1}s` }}
        >
            <div className="proj-thumb">
                <div className="proj-thumb-inner">
                    <div className="thumb-lines">
                        <span /><span /><span />
                    </div>
                    <div className="thumb-icon" style={{ color: cardStyle.color }}>
                        <FiLayers />
                    </div>
                    <p className="thumb-label">Project Screenshot</p>
                </div>
                <div className="proj-overlay">
                    <Link to={`/portfolio/project/${project.id || project._id}`} className="proj-view-btn">
                        <FiExternalLink /> View Project
                    </Link>
                </div>
            </div>

            <div className="proj-body">
                <div className="proj-top-row">
                    <span className="proj-tag">{isApiFormat ? project.category : project.tag}</span>
                    <div className="proj-links">
                        {isApiFormat && project.links?.github && (
                            <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="proj-link-btn"><FiGithub /></a>
                        )}
                        {isApiFormat && project.links?.live && (
                            <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="proj-link-btn"><FiExternalLink /></a>
                        )}
                    </div>
                </div>

                <h3 className="proj-title">{typeof project.title === 'string' ? project.title : 'Untitled Project'}</h3>
                <p className="proj-desc">{isApiFormat ? (typeof project.tagline === 'string' ? project.tagline : '') : (typeof project.desc === 'string' ? project.desc : '')}</p>

                <div className="proj-stack">
                    {(isApiFormat ? project.tags : project.stack)?.slice(0, 4).map(s => (
                        <span key={s} className="proj-tech">{s}</span>
                    ))}
                </div>

                <div className="proj-metrics">
                    {(isApiFormat ? project.results : project.metrics)?.slice(0, 2).map((m, i) => (
                        <div key={i} className="proj-metric">
                            <span className="metric-val">{m.metric || m.val}</span>
                            <span className="metric-label">{m.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="proj-card-glow" />
        </div>
    )
})

export default function RecentProjects() {
    const headerRef = useReveal()
    const gridRef = useReveal(0.05)
    const [projects, setProjects] = useState(null)
    const [loading, setLoading] = useState(true)
    const { addToast } = useToast()

    const loadProjects = () => {
        api.getProjects()
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    const normalized = data.map(normalizeProject)
                    const featured = normalized.filter(p => p.featured).slice(0, 4)
                    setProjects(featured.length >= 2 ? featured : normalized.slice(0, 4))
                } else {
                    const localFeatured = PROJECTS.filter(p => p.featured).slice(0, 4)
                    setProjects(localFeatured.length >= 2 ? localFeatured : PROJECTS.slice(0, 4))
                }
            })
            .catch(err => {
                console.error("Error loading projects:", err)
                const localFeatured = PROJECTS.filter(p => p.featured).slice(0, 4)
                setProjects(localFeatured.length >= 2 ? localFeatured : PROJECTS.slice(0, 4))
            })
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        loadProjects()
        
        const handleFocus = () => loadProjects()
        window.addEventListener('focus', handleFocus)
        return () => window.removeEventListener('focus', handleFocus)
    }, [])

    return (
        <section className="proj-section">
            <div className="proj-bg">
                <div className="proj-orb proj-orb-1" />
                <div className="proj-orb proj-orb-2" />
                <div className="proj-grid-lines" />
            </div>

            <div className="proj-container">

                <div className="proj-header" ref={headerRef}>
                    <span className="proj-pill">
                        <FiTrendingUp /> Recent Work
                    </span>
                    <h2 className="proj-heading">
                        Projects That
                        <span className="proj-heading-accent"> Speak for Themselves</span>
                    </h2>
                    <p className="proj-subheading">
                        A glimpse into what we've built — scalable, impactful, and delivered on time.
                    </p>
                </div>

                {loading ? (
                    <ProjectsFallback />
                ) : projects && projects.length > 0 ? (
                    <div className="proj-grid" ref={gridRef}>
                        {projects.map((p, i) => (
                            <ProjectCard key={p._id || p.id || i} project={p} index={i} />
                        ))}
                    </div>
                ) : (
                    <div className="proj-empty">
                        <p>No projects available</p>
                    </div>
                )}

                <div className="proj-cta-row">
                    <Link to="/portfolio" className="proj-cta-btn">
                        View All Projects <FiArrowRight />
                    </Link>
                </div>

            </div>
        </section>
    )
}