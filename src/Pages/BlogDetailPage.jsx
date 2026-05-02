import { useEffect, useState, useRef } from "react"
import { useParams, Link } from "react-router-dom"
import { FiCalendar, FiUser, FiTag, FiArrowLeft, FiShare2, FiClock, FiEye, FiArrowRight } from "react-icons/fi"
import { motion, AnimatePresence } from "framer-motion"
import PageHero from "../Components/PageHero"
import { api } from "../services/api"
import { normalizeText } from "../utils/textUtils"
import "../Styles/BlogDetailPage.css"

const normalizeBlog = (b) => ({
    ...b,
    title: normalizeText(b.title),
    excerpt: normalizeText(b.excerpt),
    content: normalizeText(b.content),
    author: normalizeText(b.author),
    category: normalizeText(b.category),
});

export default function BlogDetailPage() {
    const { slug } = useParams()
    const [blog, setBlog] = useState(null)
    const [loading, setLoading] = useState(true)
    const [relatedBlogs, setRelatedBlogs] = useState([])
    const contentRef = useRef(null)

    useEffect(() => {
        if (!slug) {
            setLoading(false)
            return
        }

        Promise.all([
            api.getBlogBySlug(slug),
            api.getBlogs()
        ])
            .then(([blogData, allBlogs]) => {
                setBlog(blogData ? normalizeBlog(blogData) : null)
                if (allBlogs && Array.isArray(allBlogs)) {
                    const related = allBlogs
                        .filter(b => b.slug !== slug)
                        .slice(0, 3)
                        .map(normalizeBlog)
                    setRelatedBlogs(related)
                }
            })
            .catch((err) => {
                console.error("Blog fetch error:", err)
                setBlog(null)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [slug])

    const formatDate = (date) => {
        if (!date) return "Unknown Date"
        const parsed = new Date(date)
        if (isNaN(parsed)) return "Unknown Date"
        return parsed.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        })
    }

    const shareBlog = () => {
        if (navigator.share) {
            navigator.share({
                title: blog?.title,
                url: window.location.href
            })
        } else {
            navigator.clipboard.writeText(window.location.href)
            alert("Link copied to clipboard!")
        }
    }

    if (loading) {
        return (
            <div className="blog-detail-page-modern">
                <PageHero
                    breadcrumbs={[
                        { label: "Home", href: "/" },
                        { label: "Blog", href: "/blogs" },
                    ]}
                    pill="Loading"
                    title={<><span className="ph-gradient">Loading...</span></>}
                    subtitle="Fetching latest insights"
                    tag="Please wait"
                />
                <section className="blog-detail-content-modern">
                    <div className="blog-detail-hero-loading">
                        <div className="blog-detail-image-skeleton" />
                    </div>
                    <div className="blog-detail-body-loading">
                        <div className="blog-detail-meta-loading">
                            <span style={{ width: '100px', height: '14px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }} />
                            <span style={{ width: '150px', height: '14px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }} />
                        </div>
                        <div style={{ width: '80%', height: '40px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', marginBottom: '20px' }} />
                        <div style={{ width: '100%', height: '200px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }} />
                    </div>
                </section>
            </div>
        )
    }

    if (!blog) {
        return (
            <div className="blog-detail-page-modern">
                <PageHero
                    breadcrumbs={[
                        { label: "Home", href: "/" },
                        { label: "Blog", href: "/blogs" },
                    ]}
                    pill="Not Found"
                    title="Blog Post Not Found"
                    subtitle="The blog post you're looking for doesn't exist."
                />
                <motion.div
                    className="blog-detail-notfound"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <span>🔍</span>
                    <h2>Article Not Found</h2>
                    <p>The article you're looking for doesn't exist or has been removed.</p>
                    <Link to="/blogs" className="blog-detail-back-btn">
                        <FiArrowLeft /> Back to Blog
                    </Link>
                </motion.div>
            </div>
        )
    }

    const safeTitle = typeof blog?.title === 'string' ? blog.title : "Blog Post"
    const words = safeTitle.split(" ")
    const firstPart = words.slice(0, Math.ceil(words.length / 2)).join(" ")
    const secondPart = words.slice(Math.ceil(words.length / 2)).join(" ")

    return (
        <div className="blog-detail-page-modern">
            {/* Hero Image */}
            <motion.div
                className="blog-detail-hero"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <img
                    src={blog.image || "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1600"}
                    alt={safeTitle}
                />
                <div className="blog-detail-hero-overlay" />
            </motion.div>

            {/* Breadcrumb */}
            <div className="blog-detail-breadcrumb">
                <Link to="/">Home</Link>
                <span>/</span>
                <Link to="/blogs">Blog</Link>
                <span>/</span>
                <span>{safeTitle.substring(0, 30)}...</span>
            </div>

            {/* Content */}
            <section className="blog-detail-content-modern">
                <motion.div
                    className="blog-detail-main"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {/* Category & Meta */}
                    <div className="blog-detail-meta-top">
                        <span className="blog-detail-category">{blog.category || 'General'}</span>
                        <div className="blog-detail-meta-icons">
                            <span><FiEye /> 1.2k views</span>
                            <span><FiClock /> 5 min read</span>
                        </div>
                    </div>

                    {/* Title */}
                    <motion.h1
                        className="blog-detail-title"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        {firstPart} <span className="blog-detail-title-accent">{secondPart}</span>
                    </motion.h1>

                    {/* Author Card */}
                    <motion.div
                        className="blog-detail-author-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <div className="blog-detail-author-avatar">
                            <FiUser size={20} />
                        </div>
                        <div className="blog-detail-author-info">
                            <span className="blog-detail-author-name">{blog.author || 'Axsem Team'}</span>
                            <span className="blog-detail-author-date">
                                <FiCalendar /> {formatDate(blog.createdAt)}
                            </span>
                        </div>
                        <button className="blog-detail-share-btn" onClick={shareBlog}>
                            <FiShare2 /> Share
                        </button>
                    </motion.div>

                    {/* Excerpt */}
                    {typeof blog.excerpt === 'string' && blog.excerpt && (
                        <motion.blockquote
                            className="blog-detail-excerpt"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            {blog.excerpt}
                        </motion.blockquote>
                    )}

                    {/* Article Content */}
                    <motion.article
                        className="blog-detail-article"
                        ref={contentRef}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        dangerouslySetInnerHTML={{ __html: typeof blog?.content === 'string' ? blog.content : "<p>No content available.</p>" }}
                    />

                    {/* Tags */}
                    {blog.tags && blog.tags.length > 0 && (
                        <motion.div
                            className="blog-detail-tags"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                        >
                            <FiTag />
                            {blog.tags.map((tag, i) => (
                                <span key={i} className="blog-detail-tag">{tag}</span>
                            ))}
                        </motion.div>
                    )}

                    {/* Navigation */}
                    <motion.div
                        className="blog-detail-nav"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                    >
                        <Link to="/blogs" className="blog-detail-back-btn">
                            <FiArrowLeft /> Back to Blog
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Related Articles */}
                {relatedBlogs.length > 0 && (
                    <motion.div
                        className="blog-detail-related"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.9 }}
                    >
                        <h2>Related Articles</h2>
                        <div className="blog-detail-related-grid">
                            {relatedBlogs.map((rb, i) => (
                                <Link
                                    key={i}
                                    to={`/blog-detail/${rb.slug}`}
                                    className="blog-detail-related-card"
                                >
                                    <div className="blog-detail-related-image">
                                        <img
                                            src={rb.image || "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=400"}
                                            alt={typeof rb.title === 'string' ? rb.title : 'Blog Post'}
                                        />
                                    </div>
                                    <div className="blog-detail-related-content">
                                        <span>{rb.category}</span>
                                        <h4>{typeof rb.title === 'string' ? rb.title : 'Untitled'}</h4>
                                        <p>{typeof rb.excerpt === 'string' ? rb.excerpt.substring(0, 60) + '...' : ''}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </section>
        </div>
    )
}
