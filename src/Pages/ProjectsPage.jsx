import { useState, useMemo, useEffect, useRef } from "react"
import { FiArrowRight, FiExternalLink, FiGithub, FiSearch, FiFilter, FiRefreshCw } from "react-icons/fi"
import PageHero from "../Components/PageHero"
import { api } from "../services/api"
import { useToast } from "../Components/Toast"
import { PROJECTS } from "../data/projects"
import { normalizeText } from "../utils/textUtils"
import "../Styles/ProjectsPage.css"
import { Link } from "react-router-dom"

const normalizeProject = (p) => ({
  ...p,
  title: normalizeText(p.title),
  tagline: normalizeText(p.tagline),
  overview: normalizeText(p.overview),
  category: normalizeText(p.category),
  status: normalizeText(p.status),
});

/* ── Reveal hook ── */
function useReveal(threshold = 0) {
    const ref = useRef(null)
    useEffect(() => {
        const el = ref.current
        if (!el) return
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) el.classList.add("pp-revealed") },
            { threshold, rootMargin: "0px 0px -40px 0px" }
        )
        obs.observe(el)
        return () => obs.disconnect()
    }, [])
    return ref
}

/* ── Status badge color ── */
const statusColor = { Live: "#0e9e6e", "In Progress": "#f5a623", Completed: "#6060a0" }

/* ── Project Card ── */
function ProjectCard({ project, index }) {
    const {
        _id,
        id,
        title = "Project",
        tagline = "",
        category = "",
        tags = [],
        color = "#f05a28",
        year = "",
        status = "",
        overview = "",
        results = [],
        links = {}
    } = project || {}

    const projectId = _id || id
    if (!projectId || !title || title.trim().length === 0) {
        return null
    }
    const delay = (index % 3) * 0.1

    return (
        <article
            className="pp-card pp-anim"
            style={{ "--pc": color, "--delay": `${delay}s` }}
        >
            {/* Thumbnail */}
            <div className="pp-thumb">
                <div className="pp-thumb-inner">
                    <div className="pp-thumb-lines">
                        <span /><span /><span />
                    </div>
                    <div className="pp-thumb-icon-wrap">
                        <span className="pp-thumb-letter">{title[0]}</span>
                    </div>
                    <div className="pp-thumb-overlay">
                        <Link to={`/portfolio/project/${projectId}`} className="pp-view-btn">
                            View Project <FiArrowRight />
                        </Link>
                    </div>
                </div>
                <div className="pp-thumb-gradient" />
            </div>

            {/* Body */}
            <div className="pp-card-body">
                <div className="pp-card-top">
                    <span className="pp-category">{category}</span>
                    <span className="pp-year">{year}</span>
                    <span className="pp-status" style={{ "--sc": statusColor[status] }}>{status}</span>
                </div>

                <h3 className="pp-card-title">{typeof title === 'string' ? title : 'Untitled Project'}</h3>
                <p className="pp-card-tagline">{typeof tagline === 'string' ? tagline : ''}</p>
                <p className="pp-card-overview">{typeof overview === 'string' ? overview : ''}</p>

                {/* Tags */}
                <div className="pp-tags">
                    {tags.slice(0, 4).map(t => (
                        <span key={t} className="pp-tag">{t}</span>
                    ))}
                    {tags.length > 4 && <span className="pp-tag pp-tag-more">+{tags.length - 4}</span>}
                </div>

                {/* Result highlights */}
                {results.length > 0 && (
                    <div className="pp-results">
                        {results.slice(0, 2).map(r => (
                            <div key={r.label} className="pp-result-chip">
                                <span className="pp-result-metric">{r.metric}</span>
                                <span className="pp-result-label">{r.label}</span>
                            </div>
                        ))}
                    </div>
                )}

                {/* Footer */}
                <div className="pp-card-footer">
                    <Link to={`/portfolio/project/${projectId}`} className="pp-detail-btn">
                        Case Study <FiArrowRight />
                    </Link>
                    <div className="pp-card-links">
                        {links?.live && <Link to={links.live} target="_blank" rel="noopener noreferrer" className="pp-link-btn" title="Live site"><FiExternalLink /></Link>}
                        {links?.github && <Link to={links.github} target="_blank" rel="noopener noreferrer" className="pp-link-btn" title="GitHub"><FiGithub /></Link>}
                    </div>
                </div>
            </div>

            <div className="pp-card-glow" />
        </article>
    )
}

/* ══ MAIN PAGE ══ */
export default function ProjectsPage() {
    const [activeCategory, setActiveCategory] = useState("All")
    const [searchQuery, setSearchQuery] = useState("")
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const gridRef = useReveal(0)
    const statsRef = useReveal(0)
    const { addToast } = useToast()

    const loadProjects = async () => {
        setLoading(true)
        try {
            const data = await api.getProjects()

            const cleanProjects = Array.isArray(data)
                ? data.map(normalizeProject).filter(p => {
                    if (!p) return false
                    if (!(p._id || p.id)) return false
                    if (!p.title) return false
                    if (typeof p.title !== "string") return false
                    if (p.title.trim().length === 0) return false
                    return true
                })
                : []

            setProjects(cleanProjects.length > 0 ? cleanProjects : PROJECTS)
        } catch (err) {
            setProjects(PROJECTS)
        }
        setLoading(false)
    }

    useEffect(() => {
        loadProjects()
    }, [])

    useEffect(() => {
        const handleFocus = () => loadProjects()
        window.addEventListener('focus', handleFocus)
        return () => window.removeEventListener('focus', handleFocus)
    }, [])

    const categories = ["All", ...new Set(projects.map(p => p.category).filter(Boolean))]

    const filtered = useMemo(() => {
        return projects.filter(p => {
            // 🛑 HARD BLOCK invalid projects
            if (!p) return false
            if (!(p._id || p.id)) return false
            if (!p.title || typeof p.title !== "string") return false
            if (p.title.trim().length === 0) return false

            // ✅ Category filter
            const matchCat =
                activeCategory === "All" || p.category === activeCategory

            // ✅ Search filter
            const q = searchQuery.trim().toLowerCase()
            const matchSearch =
                !q ||
                (p.title?.toLowerCase().includes(q)) ||
                (p.tagline?.toLowerCase().includes(q)) ||
                (Array.isArray(p.tags) && p.tags.some(t => t?.toLowerCase().includes(q))) ||
                (p.industry?.toLowerCase().includes(q))

            return matchCat && matchSearch
        })
    }, [activeCategory, searchQuery, projects])

    return (
        <div className="projects-page">

            <PageHero
                breadcrumbs={[{ label: "Projects" }]}
                pill="Our Work"
                title={<>Projects We're <span className="ph-gradient">Proud Of</span></>}
                subtitle="Real products, real clients, real results. Every project here is a story of a problem solved and a business transformed."
                tag={`${filtered.length} Projects Delivered`}
            />

            <div className="pp-body">

                {/* ── Stats strip ── */}
                <div className="pp-stats-strip pp-anim" ref={statsRef}>
                    {[
                        { val: `${filtered.length}+`, label: "Projects" },
                        { val: "6+", label: "Industries" },
                        { val: "100%", label: "On-time delivery" },
                        { val: "50+", label: "Happy clients" },
                    ].map(s => (
                        <div key={s.label} className="pp-stat">
                            <span className="pp-stat-val">{s.val}</span>
                            <span className="pp-stat-label">{s.label}</span>
                        </div>
                    ))}
                </div>

                {/* ── Filters ── */}
                <div className="pp-filters-wrap">
                    <div className="pp-filters">

                        {/* Search */}
                        <div className="pp-search-wrap">
                            <FiSearch className="pp-search-icon" />
                            <input
                                type="text"
                                className="pp-search"
                                placeholder="Search projects, tech, industry…"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                            />
                            {searchQuery && (
                                <button className="pp-search-clear" onClick={() => setSearchQuery("")}>✕</button>
                            )}
                            <button
                                className="pp-refresh-btn"
                                onClick={loadProjects}
                                title="Refresh projects"
                                disabled={loading}
                            >
                                <FiRefreshCw className={loading ? "spinning" : ""} />
                            </button>
                        </div>

                        {/* Category pills */}
                        <div className="pp-cats">
                            <FiFilter className="pp-filter-icon" />
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    className={`pp-cat-btn ${activeCategory === cat ? "pp-cat-active" : ""}`}
                                    onClick={() => setActiveCategory(cat)}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                    </div>

                    {/* Result count */}
                    <p className="pp-result-count">
                        {filtered.length === 0
                            ? "No projects found"
                            : `${filtered.length} project${filtered.length !== 1 ? "s" : ""} found`}
                    </p>
                </div>

                {/* ── Grid ── */}
                {filtered.length > 0 ? (
                    <div className="pp-grid pp-anim" ref={gridRef}>
                        {filtered.map((p, i) => (
                            <ProjectCard key={p._id || p.id || i} project={p} index={i} />
                        ))}
                    </div>
                ) : (
                    <div className="pp-empty">
                        <span className="pp-empty-icon">🔍</span>
                        <h3>No projects found</h3>
                        <p>Try a different category or search term.</p>
                        <button className="pp-reset-btn" onClick={() => { setActiveCategory("All"); setSearchQuery("") }}>
                            Reset Filters
                        </button>
                    </div>
                )}

                {/* ── CTA ── */}
                <div className="pp-cta">
                    <div className="pp-cta-glow" />
                    <div className="pp-cta-inner">
                        <h2 className="pp-cta-title">Have a Project in Mind?</h2>
                        <p className="pp-cta-sub">Let's add it to this list. Tell us what you need to build.</p>
                        <Link to="/contact" className="pp-cta-btn">
                            Start a Conversation <FiArrowRight />
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )
}