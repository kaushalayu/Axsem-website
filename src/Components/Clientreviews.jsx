import { useEffect, useRef, useState } from "react"
import { FiStar, FiChevronLeft, FiChevronRight, FiMessageSquare, FiPlay } from "react-icons/fi"
import { api } from "../services/api"
import "../Styles/ClientReviews.css"

function useReveal(threshold = 0.1) {
    const ref = useRef(null)
    useEffect(() => {
        const el = ref.current
        if (!el) return
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) el.classList.add("revealed") },
            { threshold }
        )
        obs.observe(el)
        return () => obs.disconnect()
    }, [])
    return ref
}

const reviews = [
    {
        id: 1,
        name: "Rajesh Sharma",
        role: "CEO, RetailFlow Pvt Ltd",
        avatar: "RS",
        color: "#f05a28",
        rating: 5,
        review: "Axsem completely transformed our operations. The ERP system they built reduced our billing time by 60% and gave us real-time visibility across all 12 stores. Truly outstanding team.",
        project: "ERP System",
        location: "Delhi, India",
    },
    {
        id: 2,
        name: "Priya Mehta",
        role: "Founder, SwiftDeliver",
        avatar: "PM",
        color: "#3d3d9e",
        rating: 5,
        review: "We launched our delivery app in just 3 months — on time, within budget, and with zero critical bugs. The Flutter app performs flawlessly on both iOS and Android. Highly recommend Axsem.",
        project: "Mobile App",
        location: "Mumbai, India",
    },
    {
        id: 3,
        name: "Amit Verma",
        role: "CTO, HireBoard Technologies",
        avatar: "AV",
        color: "#6b3fa0",
        rating: 5,
        review: "What impressed me most was their technical depth. They implemented AI resume parsing from scratch, and the system now processes 500+ applications per day without any issues.",
        project: "SaaS Platform",
        location: "Bangalore, India",
    },
    {
        id: 4,
        name: "Sarah Johnson",
        role: "Director, LuxCart Global",
        avatar: "SJ",
        color: "#e63b2a",
        rating: 5,
        review: "Axsem delivered our multi-vendor marketplace in record time. Their attention to UI detail and performance optimization is remarkable. Our conversion rate increased by 35% post-launch.",
        project: "E-Commerce",
        location: "London, UK",
    },
    {
        id: 5,
        name: "Vikram Singh",
        role: "MD, BuildTech Solutions",
        avatar: "VS",
        color: "#f05a28",
        rating: 5,
        review: "Professional, responsive, and technically brilliant. They took our vague requirements and turned them into a polished construction management tool our team actually loves using.",
        project: "Web Application",
        location: "Pune, India",
    },
    {
        id: 6,
        name: "Neha Gupta",
        role: "Head of Product, EduSpark",
        avatar: "NG",
        color: "#3d3d9e",
        rating: 5,
        review: "Working with Axsem felt like having a co-founder who understood both tech and business. They proactively suggested features we hadn't even thought of — and they were all game-changing.",
        project: "EdTech Platform",
        location: "Hyderabad, India",
    },
]

function StarRating({ count = 5 }) {
    return (
        <div className="star-row">
            {Array.from({ length: count }).map((_, i) => (
                <FiStar key={i} className="star-icon" />
            ))}
        </div>
    )
}

export default function ClientReviews() {
    const [active, setActive] = useState(0)
    const [paused, setPaused] = useState(false)
    const [testimonials, setTestimonials] = useState([])
    const [loading, setLoading] = useState(true)
    const headerRef = useReveal()
    const bodyRef = useReveal(0.08)
    const timerRef = useRef(null)

    useEffect(() => {
        api.getTestimonials()
            .then(data => {
                if (data?.data) {
                    setTestimonials(data.data)
                } else if (Array.isArray(data)) {
                    setTestimonials(data)
                }
            })
            .catch(() => { })
            .finally(() => setLoading(false))
    }, [])

    const reviewsData = testimonials.length > 0 ? testimonials : reviews
    const total = reviewsData.length

    const next = () => setActive(p => (p + 1) % total)
    const prev = () => setActive(p => (p - 1 + total) % total)

    useEffect(() => {
        if (paused) return
        timerRef.current = setInterval(next, 4500)
        return () => clearInterval(timerRef.current)
    }, [paused, active, total])

    const current = reviewsData[active]

    return (
        <section className="rev-section">
            <div className="rev-bg">
                <div className="rev-orb rev-orb-1" />
                <div className="rev-orb rev-orb-2" />
                <div className="rev-grid-lines" />
            </div>

            <div className="rev-container">

                {/* Header */}
                <div className="rev-header" ref={headerRef}>
                    <span className="rev-pill">
                        <FiMessageSquare /> Client Reviews
                    </span>
                    <h2 className="rev-heading">
                        What Our Clients
                        <span className="rev-heading-accent"> Say About Us</span>
                    </h2>
                    <p className="rev-subheading">
                        Don't just take our word for it — hear from the businesses we've helped grow.
                    </p>

                    {/* Global rating bar */}
                    <div className="rev-global-rating">
                        <div className="global-stars">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <FiStar key={i} className="g-star" />
                            ))}
                        </div>
                        <span className="global-score">5.0</span>
                        <span className="global-label">from 50+ verified reviews</span>
                    </div>
                </div>

                {/* Main carousel body */}
                <div
                    className="rev-body"
                    ref={bodyRef}
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                >

                    {/* Featured card */}
                    <div className="rev-featured" key={active} style={{ "--rev-color": current.color || '#f05a28' }}>
                        {current.type === 'video' && current.videoUrl ? (
                            <div className="rev-video-container" style={{ marginBottom: '20px' }}>
                                <video
                                    src={current.videoUrl}
                                    controls
                                    poster={current.thumbnail}
                                    style={{ width: '100%', borderRadius: '12px', maxHeight: '250px' }}
                                />
                            </div>
                        ) : (
                            <div className="rev-quote-mark">"</div>
                        )}
                        <StarRating count={current.rating || 5} />
                        {current.review && <p className="rev-text">{current.review}</p>}

                        <div className="rev-author">
                            <div className="rev-avatar" style={{ background: current.color || '#f05a28' }}>
                                {current.avatar || current.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                            </div>
                            <div className="rev-author-info">
                                <span className="rev-name">{current.name}</span>
                                <span className="rev-role">{current.role}</span>
                                <span className="rev-location">{current.location}</span>
                            </div>
                            <div className="rev-project-badge">
                                {current.project}
                            </div>
                        </div>

                        <div className="rev-card-glow" />
                    </div>

                    {/* Mini cards row */}
                    <div className="rev-mini-row">
                        {reviews.map((r, i) => (
                            <button
                                key={r.id}
                                className={`rev-mini ${i === active ? "rev-mini-active" : ""}`}
                                onClick={() => { setActive(i); setPaused(true) }}
                                style={{ "--mini-color": r.color }}
                            >
                                <div className="mini-avatar" style={{ background: r.color }}>{r.avatar}</div>
                                <div className="mini-info">
                                    <span className="mini-name">{r.name.split(" ")[0]}</span>
                                    <span className="mini-project">{r.project}</span>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Controls */}
                    <div className="rev-controls">
                        <button className="rev-ctrl-btn" onClick={prev}><FiChevronLeft /></button>

                        <div className="rev-dots">
                            {reviews.map((_, i) => (
                                <button
                                    key={i}
                                    className={`rev-dot ${i === active ? "rev-dot-active" : ""}`}
                                    onClick={() => { setActive(i); setPaused(true) }}
                                />
                            ))}
                        </div>

                        <button className="rev-ctrl-btn" onClick={next}><FiChevronRight /></button>
                    </div>

                </div>

            </div>
        </section>
    )
}