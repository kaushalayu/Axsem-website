import { useEffect, useState, memo } from "react"
import { Link } from "react-router-dom"
import "../Styles/BlogSection.css";
import { api } from "../services/api"
import { normalizeText } from "../utils/textUtils"

const normalizeBlog = (blog) => ({
  ...blog,
  title: normalizeText(blog.title),
  excerpt: normalizeText(blog.excerpt),
  content: normalizeText(blog.content),
  author: normalizeText(blog.author),
});

const BlogFallback = () => (
    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', padding: '40px' }}>
        {[1, 2, 3].map(i => (
            <div key={i} style={{ width: '300px', height: '200px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', opacity: 0.5 }} />
        ))}
    </div>
)

const BlogCard = memo(function BlogCard({ blog }) {
    return (
        <article className="blog-strip-card">
            <div className="strip-image">
                <img src={blog.image || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmdvfGVufDB8fDB8fHww'} alt={blog.title} loading="lazy" />
                <div className="strip-overlay">
                    <Link to={`/blog-detail/${blog.slug}`} className="strip-btn">Read More →</Link>
                </div>
            </div>
            <div className="strip-content">
                <div className="blog-meta">
                    <span>{blog.author || 'AXSEM'}</span>
                    <span>•</span>
                    <span>{blog.createdAt ? new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent'}</span>
                </div>
                <h4>{typeof blog.title === 'string' ? blog.title : 'Untitled'}</h4>
            </div>
        </article>
    )
})

const BlogSection = () => {
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.getBlogs()
            .then(data => {
                const normalizedData = Array.isArray(data) ? data.map(normalizeBlog).slice(0, 4) : []
                setBlogs(normalizedData)
            })
            .catch(() => setBlogs([]))
            .finally(() => setLoading(false))
    }, [])

    const featuredBlog = blogs[0]
    const stripBlogs = blogs.slice(1, 4)

    return (
        <section className="blog-section">
            <div className="blog-container">

                <div className="blog-header reveal">
                    <span className="blog-label">INSIGHTS</span>
                    <h2>From Our Engineering Journal</h2>
                    <p>
                        Deep technical insights, architectural decisions, and product thinking
                        from the AXSEM engineering team.
                    </p>
                </div>

                {loading ? (
                    <BlogFallback />
                ) : featuredBlog ? (
                    <>
                        <div className="featured-blog reveal">
                            <div className="featured-image">
                                <img src={featuredBlog.image || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmdvfGVufDB8fDB8fHww'} alt={featuredBlog.title} loading="lazy" />
                            </div>
                            <div className="featured-content">
                                <div className="blog-meta">
                                    <span>{featuredBlog.author || 'AXSEM Engineering'}</span>
                                    <span>•</span>
                                    <span>{featuredBlog.createdAt ? new Date(featuredBlog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent'}</span>
                                </div>
                                <h3>{typeof featuredBlog.title === 'string' ? featuredBlog.title : 'Untitled'}</h3>
                                <p>{typeof featuredBlog.excerpt === 'string' ? featuredBlog.excerpt : ''}</p>
                                <Link to={`/blog-detail/${featuredBlog.slug}`} className="read-more">
                                    Read Full Article →
                                </Link>
                            </div>
                        </div>

                        {stripBlogs.length > 0 && (
                            <div className="blog-strip-wrapper reveal">
                                <div className="blog-strip">
                                    {[...stripBlogs, ...stripBlogs].map((blog, index) => (
                                        <BlogCard key={`${blog._id || blog.slug}-${index}`} blog={blog} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div style={{ textAlign: 'center', padding: '40px', color: 'rgba(255,255,255,0.5)' }}>
                        <p>No blog posts available</p>
                    </div>
                )}

            </div>
        </section>
    );
};

export default BlogSection;
