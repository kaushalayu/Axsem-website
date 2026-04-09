import { useEffect, useRef, useState, memo } from "react"
import { FiCalendar, FiArrowRight, FiTag, FiRefreshCw, FiSearch, FiClock, FiUser } from "react-icons/fi"
import { motion, AnimatePresence } from "framer-motion"
import PageHero from "../Components/PageHero"
import { api } from "../services/api"
import { useToast } from "../Components/Toast"
import { normalizeText } from "../utils/textUtils"
import "../Styles/BlogPage.css"
import { Link } from "react-router-dom"

const normalizeBlog = (blog) => ({
  ...blog,
  title: normalizeText(blog.title),
  excerpt: normalizeText(blog.excerpt),
  content: normalizeText(blog.content),
  author: normalizeText(blog.author),
  category: normalizeText(blog.category),
});

const BlogFallback = () => (
    <div className="blog-grid-modern">
        {[1, 2, 3, 4, 5, 6].map(i => (
            <motion.div 
                key={i}
                className="blog-card-modern"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 0.3, y: 0 }}
                transition={{ delay: i * 0.1 }}
            >
                <div className="blog-card-image-modern" style={{ background: 'rgba(255,255,255,0.05)' }} />
                <div className="blog-card-body-modern">
                    <div className="blog-card-meta-modern" style={{ width: '50%', height: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }} />
                    <h3 style={{ width: '90%', height: '24px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', margin: '12px 0' }} />
                    <p style={{ width: '100%', height: '40px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }} />
                </div>
            </motion.div>
        ))}
    </div>
)

const BlogCard = memo(function BlogCard({ blog, index, onClick }) {
    const ref = useRef(null)
    
    useEffect(() => {
        const el = ref.current
        if (!el) return
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) el.classList.add("blog-revealed-modern")
            },
            { threshold: 0.1, rootMargin: "50px" }
        )
        obs.observe(el)
        return () => obs.disconnect()
    }, [])

    const formatDate = (date) => {
        if (!date) return ""
        const parsed = new Date(date)
        if (isNaN(parsed)) return ""
        return parsed.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    }

    return (
        <motion.div 
            ref={ref}
            className="blog-card-modern"
            style={{ "--delay": `${index * 0.1}s` }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            onClick={() => onClick(blog)}
        >
            <div className="blog-card-image-modern">
                <img 
                    src={blog.image || 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800'} 
                    alt={blog.title} 
                    loading="lazy" 
                />
                <div className="blog-card-image-overlay" />
                <span className="blog-card-category">{blog.category || 'General'}</span>
            </div>
            
            <div className="blog-card-body-modern">
                <div className="blog-card-meta-modern">
                    <span><FiCalendar /> {formatDate(blog.createdAt) || blog.date}</span>
                    <span><FiClock /> 5 min read</span>
                </div>
                
                <h3>{typeof blog.title === 'string' ? blog.title : 'Untitled'}</h3>
                <p>{typeof blog.excerpt === 'string' ? blog.excerpt : ''}</p>
                
                <div className="blog-card-footer-modern">
                    <div className="blog-card-author">
                        <div className="blog-card-avatar">
                            <FiUser />
                        </div>
                        <span>{blog.author || 'AXSEM Team'}</span>
                    </div>
                    <motion.span 
                        className="blog-card-readmore"
                        whileHover={{ x: 5 }}
                    >
                        Read More <FiArrowRight />
                    </motion.span>
                </div>
            </div>

            <div className="blog-card-border-modern" />
        </motion.div>
    )
})

export default function BlogPage() {
    const gridRef = useRef(null)
    const [blogs, setBlogs] = useState(null)
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [selectedBlog, setSelectedBlog] = useState(null)
    const { addToast } = useToast()

    const categories = ["All", "Technology", "Design", "Business", "Development", "Marketing"]

    const loadBlogs = () => {
        setLoading(true)
        api.getBlogs()
            .then(data => {
                const normalized = data && data.length > 0 ? data.map(normalizeBlog) : []
                setBlogs(normalized)
            })
            .catch(() => {
                setBlogs([])
            })
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        loadBlogs()
    }, [])

    useEffect(() => {
        const handleFocus = () => {
            api.getBlogs()
                .then(data => {
                    if (data && data.length > 0) {
                        setBlogs(data.map(normalizeBlog))
                    }
                })
        }
        window.addEventListener('focus', handleFocus)
        return () => window.removeEventListener('focus', handleFocus)
    }, [])

    const filteredBlogs = blogs?.filter(blog => {
        const matchesSearch = !searchQuery || 
            blog.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
        
        const matchesCategory = selectedCategory === "All" || 
            blog.category?.toLowerCase() === selectedCategory.toLowerCase()
        
        return matchesSearch && matchesCategory
    }) || []

    return (
        <div className="blog-page-modern">
            <PageHero
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "Blog" },
                ]}
                pill="Insights"
                title={
                    <>
                        Ideas That <span className="ph-gradient">Shape Technology</span>
                    </>
                }
                subtitle="Insights, lessons, and perspectives from building modern software products."
                tag="AXSEM Blog"
            />

            <section className="blog-section-modern">
                {/* Search & Filter */}
                <div className="blog-controls">
                    <div className="blog-search-wrapper">
                        <FiSearch className="blog-search-icon" />
                        <input
                            type="text"
                            className="blog-search"
                            placeholder="Search articles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button className="blog-search-clear" onClick={() => setSearchQuery("")}>×</button>
                        )}
                    </div>

                    <div className="blog-categories">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                className={`blog-category-btn ${selectedCategory === cat ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <button className="blog-refresh-btn" onClick={loadBlogs} disabled={loading}>
                        <FiRefreshCw className={loading ? "spinning" : ""} />
                        Refresh
                    </button>
                </div>

                {/* Results Count */}
                <p className="blog-results-count">
                    {filteredBlogs.length} {filteredBlogs.length === 1 ? 'article' : 'articles'} found
                </p>

                {loading ? (
                    <BlogFallback />
                ) : filteredBlogs.length > 0 ? (
                    <div className="blog-grid-modern" ref={gridRef}>
                        {filteredBlogs.map((b, i) => (
                            <BlogCard 
                                key={b._id || b.slug || i} 
                                blog={b} 
                                index={i}
                                onClick={(blog) => window.location.href = `/blog-detail/${blog.slug}`}
                            />
                        ))}
                    </div>
                ) : (
                    <motion.div 
                        className="blog-empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <span className="blog-empty-icon">📝</span>
                        <h3>No articles found</h3>
                        <p>Try adjusting your search or filter to find what you're looking for.</p>
                        <button onClick={() => { setSearchQuery(""); setSelectedCategory("All") }}>
                            Clear Filters
                        </button>
                    </motion.div>
                )}

                {/* Newsletter CTA */}
                <motion.div 
                    className="blog-newsletter"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="blog-newsletter-glow" />
                    <div className="blog-newsletter-content">
                        <h2>Stay Updated</h2>
                        <p>Get the latest insights delivered directly to your inbox. No spam, unsubscribe anytime.</p>
                        <form className="blog-newsletter-form" onSubmit={(e) => e.preventDefault()}>
                            <input type="email" placeholder="Enter your email" />
                            <button type="submit">Subscribe</button>
                        </form>
                    </div>
                </motion.div>
            </section>
        </div>
    )
}
