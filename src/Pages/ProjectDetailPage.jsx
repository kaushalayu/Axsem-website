import { useParams, Link } from "react-router-dom"
import { useEffect, useRef, useState, useMemo } from "react"
import {
    FiArrowRight, FiArrowLeft, FiExternalLink, FiGithub,
    FiCalendar, FiClock, FiUser, FiTag, FiCheckCircle,
    FiTrendingUp, FiCode, FiMessageSquare, FiLayers, FiLoader
} from "react-icons/fi"
import PageHero from "../Components/PageHero"
import { api } from "../services/api"
import { getProjectById, PROJECTS } from "../data/projects"
import { normalizeText } from "../utils/textUtils"
import "../Styles/ProjectDetailPage.css"

const normalizeProject = (p) => ({
  ...p,
  title: normalizeText(p.title),
  tagline: normalizeText(p.tagline),
  overview: normalizeText(p.overview),
  description: normalizeText(p.description),
  category: normalizeText(p.category),
  status: normalizeText(p.status),
  client: normalizeText(p.client),
  industry: normalizeText(p.industry),
  challenge: normalizeText(p.challenge),
  solution: normalizeText(p.solution),
});

const DEFAULT_PROJECT = {
    id: "",
    title: "Project Not Found",
    tagline: "",
    category: "",
    tags: [],
    color: "#f05a28",
    year: "",
    duration: "",
    client: "",
    industry: "",
    status: "",
    overview: "",
    description: "",
    challenge: "",
    solution: "",
    results: [],
    techStack: [],
    gallery: [],
    links: { live: null, github: null },
    testimonial: null
}

/* ── Reveal ── */
function useReveal(threshold = 0) {
    const ref = useRef(null)
    useEffect(() => {
        const el = ref.current
        if (!el) return
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) el.classList.add("pd-revealed") },
            { threshold, rootMargin: "0px 0px -40px 0px" }
        )
        obs.observe(el)
        return () => obs.disconnect()
    }, [threshold])
    return ref
}

/* ── Section wrapper ── */
function Section({ title, icon, children, className = "", sectionRef, alwaysVisible = false }) {
    const ref = useReveal()
    return (
        <section 
            className={`pd-section pd-anim ${className}`}
            ref={sectionRef || ref}
            style={alwaysVisible ? { opacity: 1, transform: 'none', marginBottom: '30px' } : {}}
        >
            {title && (
                <div className="pd-section-label">
                    {icon}
                    <span>{title}</span>
                </div>
            )}
            {children}
        </section>
    )
}

/* ── Gallery placeholder ── */
function GalleryItem({ label, index, color, isLoading }) {
    if (isLoading) {
        return (
            <div className="pd-gallery-item" style={{ "--gc": color, "--delay": `${index * 0.1}s` }}>
                <div className="pd-gallery-inner pd-skeleton">
                    <div className="pd-skeleton-box" style={{ width: "60%", height: "20px" }}></div>
                </div>
            </div>
        )
    }
    return (
        <div className="pd-gallery-item" style={{ "--gc": color, "--delay": `${index * 0.1}s` }}>
            <div className="pd-gallery-inner">
                <div className="pd-gallery-lines">
                    <span /><span /><span />
                </div>
                <span className="pd-gallery-label">{label}</span>
            </div>
        </div>
    )
}

/* ── Related project card ── */
function RelatedCard({ project, isLoading }) {
    if (isLoading) {
        return (
            <div className="pd-related-card pd-skeleton-card">
                <div className="pd-related-thumb pd-skeleton-box" style={{ width: "60px", height: "60px", borderRadius: "50%" }}></div>
                <div className="pd-related-info">
                    <div className="pd-skeleton-box" style={{ width: "80px", height: "12px", marginBottom: "8px" }}></div>
                    <div className="pd-skeleton-box" style={{ width: "100%", height: "18px", marginBottom: "6px" }}></div>
                    <div className="pd-skeleton-box" style={{ width: "60%", height: "14px" }}></div>
                </div>
            </div>
        )
    }
    return (
        <Link to={`/portfolio/project/${project.id}`} className="pd-related-card" style={{ "--rc": project.color }}>
            <div className="pd-related-thumb">
                <span>{typeof project.title === 'string' ? project.title[0] : 'P'}</span>
            </div>
            <div className="pd-related-info">
                <span className="pd-related-cat">{project.category}</span>
                <h4 className="pd-related-title">{typeof project.title === 'string' ? project.title : 'Untitled'}</h4>
                <p className="pd-related-tag">{typeof project.tagline === 'string' ? project.tagline : ''}</p>
            </div>
            <FiArrowRight className="pd-related-arrow" />
        </Link>
    )
}

/* ══ SKELETON LOADERS ══ */
function SkeletonMetaItem() {
    return (
        <div className="pd-meta-item pd-skeleton-item">
            <div className="pd-skeleton-box" style={{ width: "20px", height: "20px", borderRadius: "4px" }}></div>
            <div>
                <div className="pd-skeleton-box" style={{ width: "50px", height: "10px", marginBottom: "4px" }}></div>
                <div className="pd-skeleton-box" style={{ width: "80px", height: "14px" }}></div>
            </div>
        </div>
    )
}

function SkeletonMetaBar() {
    return (
        <div className="pd-meta-bar pd-revealed">
            <div className="pd-meta-grid">
                <SkeletonMetaItem />
                <SkeletonMetaItem />
                <SkeletonMetaItem />
                <SkeletonMetaItem />
                <SkeletonMetaItem />
            </div>
        </div>
    )
}

function SkeletonSection({ title, icon }) {
    return (
        <section className="pd-section pd-anim pd-revealed">
            {title && (
                <div className="pd-section-label">
                    {icon}
                    <span>{title}</span>
                </div>
            )}
            <div className="pd-skeleton-content">
                <div className="pd-skeleton-box" style={{ width: "100%", height: "16px", marginBottom: "12px" }}></div>
                <div className="pd-skeleton-box" style={{ width: "100%", height: "16px", marginBottom: "12px" }}></div>
                <div className="pd-skeleton-box" style={{ width: "70%", height: "16px" }}></div>
            </div>
        </section>
    )
}

function SkeletonResults() {
    return (
        <section className="pd-section pd-anim pd-revealed">
            <div className="pd-section-label">
                <FiTrendingUp />
                <span>Results & Impact</span>
            </div>
            <div className="pd-results-grid pd-revealed">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="pd-result-card pd-skeleton-card">
                        <div className="pd-skeleton-box" style={{ width: "50px", height: "36px", marginBottom: "8px" }}></div>
                        <div className="pd-skeleton-box" style={{ width: "80px", height: "14px" }}></div>
                    </div>
                ))}
            </div>
        </section>
    )
}

function SkeletonTechStack() {
    return (
        <section className="pd-section pd-anim pd-revealed">
            <div className="pd-section-label">
                <FiCode />
                <span>Tech Stack</span>
            </div>
            <div className="pd-stack-grid pd-revealed">
                {[1, 2, 3].map(i => (
                    <div key={i} className="pd-stack-group" style={{ "--delay": `${i * 0.08}s` }}>
                        <div className="pd-skeleton-box" style={{ width: "80px", height: "20px", marginBottom: "12px" }}></div>
                        <div className="pd-stack-items">
                            <div className="pd-skeleton-box" style={{ width: "60px", height: "28px", marginRight: "8px" }}></div>
                            <div className="pd-skeleton-box" style={{ width: "70px", height: "28px", marginRight: "8px" }}></div>
                            <div className="pd-skeleton-box" style={{ width: "50px", height: "28px" }}></div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

function SkeletonGallery() {
    return (
        <section className="pd-section pd-anim pd-revealed">
            <div className="pd-section-label">
                <FiLayers />
                <span>Project Gallery</span>
            </div>
            <div className="pd-gallery pd-revealed">
                {[1, 2, 3, 4].map(i => (
                    <GalleryItem key={i} label="" index={i - 1} color="#6366f1" isLoading={true} />
                ))}
            </div>
        </section>
    )
}

function SkeletonRelated() {
    return (
        <section className="pd-section pd-anim pd-revealed">
            <div className="pd-section-label">
                <FiArrowRight />
                <span>More Projects</span>
            </div>
            <div className="pd-related-grid pd-revealed">
                <RelatedCard project={{}} isLoading={true} />
                <RelatedCard project={{}} isLoading={true} />
                <RelatedCard project={{}} isLoading={true} />
            </div>
        </section>
    )
}

/* ══ ERROR STATE ══ */
function ErrorState({ projectId, onRetry }) {
    return (
        <div className="pd-page">
            <PageHero
                breadcrumbs={[
                    { label: "Projects", href: "/portfolio/project" },
                    { label: "Error" },
                ]}
                pill="Error"
                title="Project Not Found"
                subtitle="We couldn't load this project. It may not exist or there might be a connection issue."
                tag=""
            />
            <div className="pd-body">
                <div className="pd-error-container">
                    <div className="pd-error-icon">!</div>
                    <h2>Unable to Load Project</h2>
                    <p>The project "{projectId}" could not be found or the server is not responding.</p>
                    <div className="pd-error-actions">
                        <button onClick={onRetry} className="pd-cta-btn-primary">
                            <FiLoader /> Try Again
                        </button>
                        <Link to="/portfolio/project" className="pd-cta-btn-outline">
                            <FiArrowLeft /> Back to Projects
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

/* ══ MAIN COMPONENT ══ */
export default function ProjectDetailPage({ projectId: propProjectId }) {
    const { id: urlId } = useParams()
    const projectId = propProjectId || urlId
    
    const [project, setProject] = useState(null)
    const [allProjects, setAllProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    
    const overviewRef = useReveal()
    const challengeRef = useReveal()
    const solutionRef = useReveal()
    const resultsRef = useReveal()
    const techRef = useReveal()
    const galleryRef = useReveal()
    const testimonialRef = useReveal()
    const relatedRef = useReveal()

    const fetchData = async () => {
        setLoading(true)
        setError(null)
        
        try {
            const [projectRes, allProjectsRes] = await Promise.all([
                api.getProjectById(projectId),
                api.getProjects()
            ])
            
            if (projectRes && !projectRes.message) {
                setProject(normalizeProject(projectRes))
            } else {
                // Try to find in allProjectsRes by id
                const foundProject = allProjectsRes?.find(p => p.id === projectId || p._id === projectId)
                setProject(foundProject ? normalizeProject(foundProject) : { ...DEFAULT_PROJECT, id: projectId })
            }
            
            const apiProjects = Array.isArray(allProjectsRes) ? allProjectsRes.map(normalizeProject) : []
            setAllProjects(apiProjects.length > 0 ? apiProjects : PROJECTS)
        } catch (err) {
            // Try local projects
            const localProject = getProjectById(projectId)
            setError(err.message)
            setProject(localProject || { ...DEFAULT_PROJECT, id: projectId })
            setAllProjects(PROJECTS)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [projectId])

    const handleRetry = () => {
        fetchData()
    }

    const relatedFinal = useMemo(() => {
        if (!project) return []
        const category = project.category
        const related = allProjects
            .filter(p => (p.id || p._id) !== projectId && p.category === category)
            .slice(0, 3)
        
        return related.length >= 2
            ? related
            : allProjects.filter(p => (p.id || p._id) !== projectId).slice(0, 3)
    }, [project, allProjects, projectId])

    const mergedProject = useMemo(() => {
        if (!project) return DEFAULT_PROJECT
        const safeTitle = typeof project.title === 'string' ? project.title : "Untitled Project"
        const safeTagline = typeof project.tagline === 'string' ? project.tagline : "A unique digital solution"
        return {
            ...DEFAULT_PROJECT,
            ...project,
            title: safeTitle,
            tagline: safeTagline,
            category: project.category || "Web Development",
            description: project.description || project.overview || "A comprehensive digital solution built with modern technologies.",
            overview: project.overview || project.description || "A comprehensive digital solution built with modern technologies.",
            tags: project.tags && project.tags.length > 0 ? project.tags : ["React", "Node.js", "MongoDB"],
            results: project.results && project.results.length > 0 ? project.results : [
                { metric: "99%", label: "Uptime" },
                { metric: "50+", label: "Users" }
            ],
            techStack: project.techStack && project.techStack.length > 0 ? project.techStack : [
                { category: "Frontend", items: ["React", "Tailwind"] },
                { category: "Backend", items: ["Node.js", "Express"] }
            ],
            gallery: project.gallery && project.gallery.length > 0 ? project.gallery : [],
            links: project.links || { live: null, github: null },
            challenge: project.challenge || "The client needed a modern, scalable solution to streamline their business operations and improve user experience.",
            solution: project.solution || "We developed a full-stack application with modern technologies, ensuring performance, security, and scalability."
        }
    }, [project])

    const {
        title, tagline, category, tags = [], color = "#6366f1", year = "2024", duration = "TBD",
        client = "TBD", industry = "TBD", status = "In Progress", description = "", overview = "",
        challenge = "", solution = "", results = [], techStack = [],
        gallery = [], testimonial, links
    } = mergedProject

    // Loading State
    if (loading) {
        const sampleProject = getProjectById(projectId) || { ...DEFAULT_PROJECT, id: projectId }
        
        return (
            <div className="pd-page">
                <PageHero
                    breadcrumbs={[
                        { label: "Projects", href: "/portfolio/project" },
                        { label: sampleProject.title || "Loading..." },
                    ]}
                    pill={sampleProject.category || "Project"}
                    title={<>{sampleProject.title || "Loading..."}</>}
                    subtitle={sampleProject.tagline || "Please wait..."}
                    tag={`${sampleProject.year || ''} · ${sampleProject.duration || ''} · ${sampleProject.industry || ''}`}
                />
                <div className="pd-body">
                    <SkeletonMetaBar />
                    <SkeletonSection icon={<FiLayers />} title="Project Overview" />
                    <SkeletonSection icon={<FiMessageSquare />} title="The Challenge" />
                    <SkeletonSection icon={<FiCode />} title="Our Solution" />
                    <SkeletonResults />
                    <SkeletonTechStack />
                    <SkeletonGallery />
                    <SkeletonRelated />
                </div>
            </div>
        )
    }

    // Error State
    if (error && !project) {
        return <ErrorState projectId={projectId} onRetry={handleRetry} />
    }

    if (!project) {
        return <ErrorState projectId={projectId} onRetry={handleRetry} />
    }

    return (
        <div className="pd-page">
            <PageHero
                breadcrumbs={[
                    { label: "Projects", href: "/portfolio/project" },
                    { label: title },
                ]}
                pill={category}
                title={<>{title}</>}
                subtitle={tagline}
                tag={`${year} · ${duration} · ${industry}`}
            />

            <div className="pd-body">
                {/* Meta bar */}
                <div className="pd-meta-bar pd-anim" ref={overviewRef}>
                    <div className="pd-meta-grid">
                        <div className="pd-meta-item">
                            <FiUser className="pd-meta-icon" />
                            <div><span className="pd-meta-key">Client</span><span className="pd-meta-val">{client}</span></div>
                        </div>
                        <div className="pd-meta-item">
                            <FiTag className="pd-meta-icon" />
                            <div><span className="pd-meta-key">Industry</span><span className="pd-meta-val">{industry}</span></div>
                        </div>
                        <div className="pd-meta-item">
                            <FiCalendar className="pd-meta-icon" />
                            <div><span className="pd-meta-key">Year</span><span className="pd-meta-val">{year}</span></div>
                        </div>
                        <div className="pd-meta-item">
                            <FiClock className="pd-meta-icon" />
                            <div><span className="pd-meta-key">Duration</span><span className="pd-meta-val">{duration}</span></div>
                        </div>
                        <div className="pd-meta-item">
                            <FiCheckCircle className="pd-meta-icon" />
                            <div>
                                <span className="pd-meta-key">Status</span>
                                <span className="pd-meta-val pd-status" style={{ "--sc": status === "Live" ? "#0e9e6e" : status === "In Progress" ? "#f5a623" : "#6060a0" }}>
                                    {status}
                                </span>
                            </div>
                        </div>
                        <div className="pd-meta-links">
                            {links?.live && links.live !== "#" && <a href={links.live} target="_blank" rel="noopener noreferrer" className="pd-ext-btn pd-live-btn"><FiExternalLink /> Live Site</a>}
                            {links?.github && links.github !== "#" && <a href={links.github} target="_blank" rel="noopener noreferrer" className="pd-ext-btn pd-gh-btn"><FiGithub /> GitHub</a>}
                        </div>
                    </div>
                    <div className="pd-meta-accent" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
                </div>

                {/* Overview */}
                <Section icon={<FiLayers />} title="Project Overview" alwaysVisible={true}>
                    <div className="pd-overview-grid">
                        <p className="pd-overview-text">{description || "No description available."}</p>
                        <div className="pd-tags-block">
                            <span className="pd-tags-title">Tech Used</span>
                            <div className="pd-tags-list">
                                {tags.map((t, i) => (
                                    <span key={i} className="pd-tech-tag" style={{ "--tc": color }}>{t}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </Section>

                {/* Challenge */}
                {challenge && (
                    <Section icon={<FiMessageSquare />} title="The Challenge" sectionRef={challengeRef} alwaysVisible={true}>
                        <div className="pd-text-card pd-challenge-card">
                            <div className="pd-text-card-icon">!</div>
                            <p className="pd-text-body">{challenge}</p>
                        </div>
                    </Section>
                )}

                {/* Solution */}
                {solution && (
                    <Section icon={<FiCode />} title="Our Solution" sectionRef={solutionRef} alwaysVisible={true}>
                        <div className="pd-text-card pd-solution-card">
                            <div className="pd-text-card-icon">+</div>
                            <p className="pd-text-body">{solution}</p>
                        </div>
                    </Section>
                )}

                {/* Results */}
                {results && results.length > 0 && (
                    <Section icon={<FiTrendingUp />} title="Results & Impact" className="pd-results-section" sectionRef={resultsRef} alwaysVisible={true}>
                        <div className="pd-results-grid pd-anim">
                            {results.map((r, i) => (
                                <div
                                    key={i}
                                    className="pd-result-card"
                                    style={{ "--rc": color, "--delay": `${i * 0.1}s` }}
                                >
                                    <span className="pd-result-metric">{r.metric}</span>
                                    <span className="pd-result-label">{r.label}</span>
                                    <div className="pd-result-glow" />
                                </div>
                            ))}
                        </div>
                    </Section>
                )}

                {/* Tech Stack */}
                {techStack && techStack.length > 0 && (
                    <Section icon={<FiCode />} title="Tech Stack" sectionRef={techRef} alwaysVisible={true}>
                        <div className="pd-stack-grid pd-anim">
                            {techStack.map((group, i) => (
                                <div key={i} className="pd-stack-group" style={{ "--delay": `${i * 0.08}s` }}>
                                    <h4 className="pd-stack-cat">{group.category}</h4>
                                    <div className="pd-stack-items">
                                        {group.items && group.items.map((item, j) => (
                                            <span key={j} className="pd-stack-item" style={{ "--sc": color }}>{item}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Section>
                )}

                {/* Gallery */}
                {gallery.length > 0 && (
                    <Section icon={<FiLayers />} title="Project Gallery" sectionRef={galleryRef} alwaysVisible={true}>
                        <div className="pd-gallery-grid">
                            {gallery.map((item, i) => (
                                <div key={i} className="pd-gallery-image-wrap">
                                    <img 
                                        src={item} 
                                        alt={`Project screenshot ${i + 1}`}
                                        className="pd-gallery-image"
                                        onError={(e) => {
                                            e.target.style.display = 'none'
                                            e.target.nextSibling.style.display = 'flex'
                                        }}
                                    />
                                    <div className="pd-gallery-fallback" style={{ display: 'none' }}>
                                        <span>{i + 1}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Section>
                )}

                {/* Testimonial */}
                {testimonial && (
                    <Section icon={<FiMessageSquare />} title="Client Feedback" sectionRef={testimonialRef} alwaysVisible={true}>
                        <div className="pd-testimonial pd-anim">
                            <div className="pd-quote-mark">"</div>
                            <blockquote className="pd-quote">{testimonial.quote}</blockquote>
                            <div className="pd-quote-author">
                                <div className="pd-quote-avatar">
                                    {testimonial.author?.split(" ").map(n => n[0]).join("")}
                                </div>
                                <div>
                                    <div className="pd-quote-name">{testimonial.author}</div>
                                    <div className="pd-quote-role">{testimonial.role}</div>
                                </div>
                            </div>
                            <div className="pd-testimonial-glow" style={{ background: `radial-gradient(circle, ${color}22, transparent 60%)` }} />
                        </div>
                    </Section>
                )}

                {/* Related */}
                {relatedFinal.length > 0 && (
                    <Section icon={<FiArrowRight />} title="More Projects" sectionRef={relatedRef} alwaysVisible={true}>
                        <div className="pd-related-grid pd-anim">
                            {relatedFinal.map(p => (
                                <RelatedCard key={p.id || p._id} project={p} />
                            ))}
                        </div>
                    </Section>
                )}

                {/* Bottom CTA */}
                <div className="pd-bottom-cta pd-anim">
                    <div className="pd-cta-glow" />
                    <div className="pd-cta-inner">
                        <h2 className="pd-cta-title">Want Something Similar?</h2>
                        <p className="pd-cta-sub">Let's talk about your project and see how we can help.</p>
                        <div className="pd-cta-actions">
                            <Link to="/contact" className="pd-cta-btn-primary">Start a Project <FiArrowRight /></Link>
                            <Link to="/portfolio/project" className="pd-cta-btn-outline"><FiArrowLeft /> All Projects</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
