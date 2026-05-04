import { useEffect, useRef, useState, useCallback } from "react"
import PageHero from "../Components/PageHero"
import PageLoader from "../Components/PageLoader"
import "../Styles/JourneyPage.css"
import Journay1 from "../assets/journay1.jpeg"
import Journay2 from "../assets/journay2.jpeg"
import Journay3 from "../assets/journay3.jpeg"
import Journay4 from "../assets/journay4.jpeg"
import Journay5 from "../assets/journay5.jpeg"
import Journay6 from "../assets/journay6.jpeg"
import Journay7 from "../assets/journay7.jpeg"

/* ═══════════════════════════════════════════
   PREMIUM SVG ICONS — one per milestone
═══════════════════════════════════════════ */
const Icons = {
    founding: ({ c }) => (
        <svg viewBox="0 0 64 64" fill="none" className="jp-icon-svg">
            <circle cx="32" cy="32" r="30" stroke={c} strokeWidth="1.5" strokeDasharray="4 3" opacity=".25" />
            {/* House */}
            <path d="M12 30L32 14L52 30" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="19" y="30" width="26" height="20" rx="2" stroke={c} strokeWidth="2" />
            <rect x="27" y="38" width="10" height="12" rx="1.5" stroke={c} strokeWidth="1.8" />
            {/* Spark */}
            <circle cx="49" cy="18" r="3" fill={c} opacity=".8" />
            <path d="M49 12V10M49 26V24M55 18H57M41 18H43M54.2 13.8l1.4-1.4M43.4 24.6l-1.4 1.4M54.2 22.2l1.4 1.4M43.4 13.8l-1.4-1.4" stroke={c} strokeWidth="1.5" strokeLinecap="round" opacity=".6" />
        </svg>
    ),
    growth: ({ c }) => (
        <svg viewBox="0 0 64 64" fill="none" className="jp-icon-svg">
            <circle cx="32" cy="32" r="30" stroke={c} strokeWidth="1.5" strokeDasharray="4 3" opacity=".25" />
            {/* Bar chart */}
            <rect x="10" y="42" width="9" height="12" rx="2" fill={c} opacity=".3" stroke={c} strokeWidth="1.5" />
            <rect x="22" y="34" width="9" height="20" rx="2" fill={c} opacity=".5" stroke={c} strokeWidth="1.5" />
            <rect x="34" y="24" width="9" height="30" rx="2" fill={c} opacity=".7" stroke={c} strokeWidth="1.5" />
            <rect x="46" y="16" width="9" height="38" rx="2" fill={c} opacity=".9" stroke={c} strokeWidth="1.5" />
            {/* Trend arrow */}
            <path d="M10 40L24 28L36 32L55 16" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M49 16H55V22" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    saas: ({ c }) => (
        <svg viewBox="0 0 64 64" fill="none" className="jp-icon-svg">
            <circle cx="32" cy="32" r="30" stroke={c} strokeWidth="1.5" strokeDasharray="4 3" opacity=".25" />
            {/* Cloud */}
            <path d="M44 38H20a8 8 0 0 1 0-16 8 8 0 0 1 15.5-2A8 8 0 0 1 44 38Z" stroke={c} strokeWidth="2" />
            {/* Plane inside cloud */}
            <path d="M22 32l6-4 8 2 4-2" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
            {/* Launch indicator */}
            <path d="M32 42V54M28 50l4 4 4-4" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity=".7" />
            <circle cx="50" cy="16" r="5" fill={c} opacity=".15" stroke={c} strokeWidth="1.5" />
            <path d="M48 16h4M50 14v4" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    ),
    team: ({ c }) => (
        <svg viewBox="0 0 64 64" fill="none" className="jp-icon-svg">
            <circle cx="32" cy="32" r="30" stroke={c} strokeWidth="1.5" strokeDasharray="4 3" opacity=".25" />
            {/* Three people */}
            <circle cx="32" cy="20" r="7" stroke={c} strokeWidth="2" />
            <path d="M20 46c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke={c} strokeWidth="2" strokeLinecap="round" />
            <circle cx="14" cy="25" r="5" stroke={c} strokeWidth="1.8" opacity=".7" />
            <path d="M5 46c0-5 4-9 9-9" stroke={c} strokeWidth="1.8" strokeLinecap="round" opacity=".7" />
            <circle cx="50" cy="25" r="5" stroke={c} strokeWidth="1.8" opacity=".7" />
            <path d="M59 46c0-5-4-9-9-9" stroke={c} strokeWidth="1.8" strokeLinecap="round" opacity=".7" />
            {/* Star above center person */}
            <path d="M32 10l.9 2.7h2.8l-2.3 1.7.9 2.7-2.3-1.7-2.3 1.7.9-2.7-2.3-1.7h2.8z" fill={c} opacity=".8" />
        </svg>
    ),
    products: ({ c }) => (
        <svg viewBox="0 0 64 64" fill="none" className="jp-icon-svg">
            <circle cx="32" cy="32" r="30" stroke={c} strokeWidth="1.5" strokeDasharray="4 3" opacity=".25" />
            {/* Grid of 6 boxes */}
            {[[10, 10], [27, 10], [44, 10], [10, 30], [27, 30], [44, 30]].map(([x, y], i) => (
                <rect key={i} x={x} y={y} width="14" height="14" rx="3" stroke={c} strokeWidth="1.8"
                    fill={c} fillOpacity={0.08 + i * 0.07} />
            ))}
            {/* Bottom row partial */}
            <rect x="10" y="50" width="14" height="8" rx="2" stroke={c} strokeWidth="1.5" fill={c} fillOpacity=".35" />
            <rect x="27" y="50" width="14" height="8" rx="2" stroke={c} strokeWidth="1.5" fill={c} fillOpacity=".2" />
            {/* Plus for "more" */}
            <path d="M49 50v8M45 54h8" stroke={c} strokeWidth="2" strokeLinecap="round" />
        </svg>
    ),
    brand: ({ c }) => (
        <svg viewBox="0 0 64 64" fill="none" className="jp-icon-svg">
            <circle cx="32" cy="32" r="30" stroke={c} strokeWidth="1.5" strokeDasharray="4 3" opacity=".25" />
            {/* Megaphone */}
            <path d="M14 24v16l8-4V28l-8-4z" stroke={c} strokeWidth="2" strokeLinejoin="round" />
            <path d="M22 28l18-10v28L22 36V28z" stroke={c} strokeWidth="2" strokeLinejoin="round" fill={c} fillOpacity=".1" />
            <ellipse cx="40" cy="32" rx="4" ry="12" stroke={c} strokeWidth="1.8" fill={c} fillOpacity=".15" />
            <path d="M14 36v8" stroke={c} strokeWidth="2.5" strokeLinecap="round" opacity=".5" />
            {/* Signal waves */}
            <path d="M46 24c2.5 2 4 5 4 8s-1.5 6-4 8" stroke={c} strokeWidth="2" strokeLinecap="round" />
            <path d="M50 20c4 3.5 6.5 8 6.5 12s-2.5 8.5-6.5 12" stroke={c} strokeWidth="1.5" strokeLinecap="round" opacity=".5" />
        </svg>
    ),
    ai: ({ c }) => (
        <svg viewBox="0 0 64 64" fill="none" className="jp-icon-svg">
            <circle cx="32" cy="32" r="30" stroke={c} strokeWidth="1.5" strokeDasharray="4 3" opacity=".25" />
            {/* CPU / chip */}
            <rect x="18" y="18" width="28" height="28" rx="4" stroke={c} strokeWidth="2" fill={c} fillOpacity=".08" />
            {/* Inner grid */}
            <rect x="24" y="24" width="16" height="16" rx="2" stroke={c} strokeWidth="1.5" fill={c} fillOpacity=".15" />
            {/* Pins */}
            {[22, 30, 38].map(p => (
                <g key={p}>
                    <line x1={p} y1="14" x2={p} y2="18" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
                    <line x1={p} y1="46" x2={p} y2="50" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
                    <line x1="14" y1={p} x2="18" y2={p} stroke={c} strokeWidth="1.8" strokeLinecap="round" />
                    <line x1="46" y1={p} x2="50" y2={p} stroke={c} strokeWidth="1.8" strokeLinecap="round" />
                </g>
            ))}
            {/* Spark / AI symbol */}
            <path d="M29 28l1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5z" fill={c} opacity=".9" />
        </svg>
    ),
    present: ({ c }) => (
        <svg viewBox="0 0 64 64" fill="none" className="jp-icon-svg">
            <circle cx="32" cy="32" r="30" stroke={c} strokeWidth="1.5" strokeDasharray="4 3" opacity=".25" />
            {/* Rocket */}
            <path d="M32 52c0 0-8-10-8-22C24 18 32 10 32 10s8 8 8 20c0 12-8 22-8 22z" stroke={c} strokeWidth="2" fill={c} fillOpacity=".12" />
            <circle cx="32" cy="28" r="5" stroke={c} strokeWidth="2" />
            {/* Fins */}
            <path d="M24 42l-6 6M40 42l6 6" stroke={c} strokeWidth="2" strokeLinecap="round" opacity=".6" />
            {/* Exhaust */}
            <path d="M29 52c0 2 1.5 4 3 4s3-2 3-4" stroke={c} strokeWidth="1.8" strokeLinecap="round" fill={c} fillOpacity=".2" />
            {/* Stars */}
            <circle cx="14" cy="18" r="1.5" fill={c} /><circle cx="52" cy="22" r="1.5" fill={c} />
            <circle cx="10" cy="34" r="1" fill={c} opacity=".7" /><circle cx="56" cy="38" r="1" fill={c} opacity=".7" />
        </svg>
    ),
}

/* ═══════════════════════════════════════════
   JOURNEY DATA
═══════════════════════════════════════════ */
const FALLBACK_MILESTONES = [
    {
        id: 1, year: "2020", month: "March 2020", era: "The Founding",
        headline: "A Garage, a Laptop & a Dream",
        body: "Axsem Softwares was born in a small rented room in Lucknow with nothing but a second-hand laptop and relentless ambition. Our first project — a basic inventory system — was delivered in 22 sleepless days to a local retailer who couldn't afford expensive software.",
        image: Journay1, photoLabel: "Founding Day",
        stat: { val: "1st", lbl: "Client Delivered" },
        tags: ["Founded", "Lucknow", "Vision"],
        color: "#f05a28", side: "right",
    },
    {
        id: 2, year: "2020", month: "Jan 2020", era: "First Growth",
        headline: "10 Clients. Pandemic. Pivot.",
        body: "By early 2020 we had delivered 10 projects across retail, education & hospitality. The pandemic hit hard — but it accelerated digital adoption. We pivoted quickly, helping local businesses move online and build contactless workflows.",
        image: Journay2, photoLabel: "Growth Phase",
        stat: { val: "10+", lbl: "Projects Done" },
        tags: ["Growth", "Pandemic Pivot", "10 Projects"],
        color: "#3d3d9e", side: "left",
    },
    {
        id: 3, year: "2021", month: "June 2021", era: "Product Era",
        headline: "From Services to SaaS — TripAxis Born",
        body: "We stopped just building for clients and started building for industries. TripAxis — our first SaaS for tour & travel — launched in June 2021 and signed 12 agencies in 90 days. Product-market fit found. This moment changed everything.",
        image: Journay3, photoLabel: "TripAxis Launch",
        stat: { val: "12", lbl: "Agencies in 90 Days" },
        tags: ["SaaS", "TripAxis", "Product-Market Fit"],
        color: "#0e9e6e", side: "right",
    },
    {
        id: 4, year: "2022", month: "Feb 2022", era: "Team Era",
        headline: "Building the Team That Builds",
        body: "We hired our first 5 full-time engineers and a dedicated design lead. A proper office. Processes. Code reviews. Standup meetings. We stopped being a freelance shop and became a real software company. Delivery speed tripled.",
        image: Journay4, photoLabel: "Team Building",
        stat: { val: "5×", lbl: "Team Growth" },
        tags: ["Team", "Culture", "Engineering"],
        color: "#6b3fa0", side: "left",
    },
    {
        id: 5, year: "2022", month: "Sept 2022", era: "Product Suite",
        headline: "6 SaaS Products. One Mission.",
        body: "SchoolAxis, HotelAxis, FoodAxis, PeopleAxis, NGOAxis — each product built for a specific Indian industry with compliance baked in. GST. FCRA. PF/ESI. By September 2022 we had 6 live SaaS products serving 200+ businesses.",
        image: Journay5, photoLabel: "Product Suite",
        stat: { val: "200+", lbl: "Active Businesses" },
        tags: ["6 Products", "200+ Clients", "Multi-Industry"],
        color: "#e63b2a", side: "right",
    },
    {
        id: 6, year: "2023", month: "May 2023", era: "Brand Era",
        headline: "Becoming Known, Not Just Good",
        body: "We launched our full digital marketing arm — SEO, social media, paid ads, content. Organic traffic grew 4× in 6 months. We won our first enterprise client — a 200-employee logistics company that replaced their legacy ERP with our custom platform.",
        image: Journay6, photoLabel: "Marketing Launch",
        stat: { val: "4×", lbl: "Organic Traffic" },
        tags: ["Digital Marketing", "Brand", "Enterprise"],
        color: "#f5a623", side: "left",
    },
    {
        id: 7, year: "2024", month: "Jan 2024", era: "AI Era",
        headline: "Embedding Intelligence Into Everything",
        body: "We integrated AI across our entire product suite — AI resume parsing in HireBoard, demand forecasting in RetailFlow, chatbots for FoodAxis. We also launched AxsemAI as a standalone automation platform. The future arrived and we were ready.",
        image: Journay7, photoLabel: "AI Integration",
        stat: { val: "30+", lbl: "AI Automations" },
        tags: ["AI", "Automation", "AxsemAI"],
        color: "#f05a28", side: "right",
    },
    {
        id: 8, year: "2025", month: "2025 & Beyond", era: "Present",
        headline: "500+ Businesses. 12 Products. Infinite Ambition.",
        body: "Today Axsem Softwares is a full-stack technology company — 12 SaaS products, a 20+ member team, 500+ clients across India and an unwavering commitment to solving uniquely Indian business problems with world-class software. The journey has just begun.",
        image: "", photoLabel: "Present Day",
        stat: { val: "500+", lbl: "Businesses Powered" },
        tags: ["500+ Clients", "12 Products", "20+ Team"],
        color: "#3d3d9e", side: "left",
    },
]

import { api } from "../services/api"

/* ═══════════════════════════════════════════
   PARTICLE CANVAS
═══════════════════════════════════════════ */
function Particles({ dark }) {
    const ref = useRef(null)
    useEffect(() => {
        const canvas = ref.current; if (!canvas) return
        const ctx = canvas.getContext("2d")
        let W, H, pts = [], raf

        const mk = () => ({
            x: Math.random() * W, y: Math.random() * H,
            r: .5 + Math.random() * 1.4, vx: (Math.random() - .5) * .18, vy: -.08 - Math.random() * .16,
            a: .1 + Math.random() * .28, p: Math.random() * Math.PI * 2
        })

        const resize = () => {
            W = canvas.width = canvas.offsetWidth
            H = canvas.height = canvas.offsetHeight
            pts = Array.from({ length: 55 }, mk)
        }
        resize()
        window.addEventListener("resize", resize)

        let t = 0
        const draw = () => {
            ctx.clearRect(0, 0, W, H); t += .01
            const rgb = dark ? "255,255,255" : "61,61,158"
            pts.forEach((p, i) => {
                p.x += p.vx; p.y += p.vy
                if (p.y < -8) { pts[i] = mk(); pts[i].y = H + 8 }
                if (p.x < -8) p.x = W + 8; if (p.x > W + 8) p.x = -8
                const a = p.a * (0.65 + 0.35 * Math.sin(t + p.p))
                ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(${rgb},${a})`; ctx.fill()
            })
            raf = requestAnimationFrame(draw)
        }
        draw()
        return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize) }
    }, [dark])
    return <canvas ref={ref} className="jp-canvas" />
}

/* ═══════════════════════════════════════════
   SPINE — scroll progress
═══════════════════════════════════════════ */
function Spine() {
    const [pct, setPct] = useState(0)
    useEffect(() => {
        const fn = () => {
            const wrap = document.querySelector(".jp-items-wrap")
            if (!wrap) return
            const { top, height } = wrap.getBoundingClientRect()
            setPct(Math.max(0, Math.min(100, (-top / (height - window.innerHeight * .5)) * 100)))
        }
        window.addEventListener("scroll", fn, { passive: true })
        return () => window.removeEventListener("scroll", fn)
    }, [])
    return (
        <div className="jp-spine">
            <div className="jp-spine-bg" />
            <div className="jp-spine-prog" style={{ height: `${pct}%` }} />
        </div>
    )
}

/* ═══════════════════════════════════════════
   MILESTONE ITEM
   — 200ms hover delay before panels open
   — 120ms delay on leave before closing
═══════════════════════════════════════════ */
function Item({ m, idx }) {
    const [on, setOn] = useState(false)
    const [vis, setVis] = useState(false)
    const ref = useRef(null)
    const enterTimer = useRef(null)
    const leaveTimer = useRef(null)

    useEffect(() => {
        const el = ref.current; if (!el) return
        const io = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setVis(true) },
            { threshold: 0.12 }
        )
        io.observe(el)
        return () => io.disconnect()
    }, [])

    const handleEnter = useCallback(() => {
        clearTimeout(leaveTimer.current)
        enterTimer.current = setTimeout(() => setOn(true), 200)
    }, [])

    const handleLeave = useCallback(() => {
        clearTimeout(enterTimer.current)
        leaveTimer.current = setTimeout(() => setOn(false), 120)
    }, [])

    useEffect(() => () => {
        clearTimeout(enterTimer.current)
        clearTimeout(leaveTimer.current)
    }, [])

    const isR = m.side === "right"

    return (
        <article
            ref={ref}
            className={`jp-item ${isR ? "jp-r" : "jp-l"} ${vis ? "jp-vis" : ""} ${on ? "jp-on" : ""}`}
            style={{ "--c": m.color, "--idx": idx }}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
        >
            {/* ── PHOTO PANEL ── slides opposite direction to text */}
            <div className={`jp-photo ${isR ? "jp-photo-l" : "jp-photo-r"}`}>
                <div className="jp-photo-card">
                    <div className="jp-glow" style={{ background: `radial-gradient(circle at 50% 40%, ${m.color}22, transparent 65%)` }} />
                    <div className="jp-c-tl" /><div className="jp-c-tr" />
                    <div className="jp-c-bl" /><div className="jp-c-br" />

                    {/* Premium SVG icon with rings */}
                    <div className="jp-rings">
                        {m.image ? (
                            <img src={m.image} alt={m.photoLabel} className="jp-img" />
                        ) : (
                            <div className="jp-no-img" style={{ color: m.color }}>Add Image</div>
                        )}
                    </div>

                    <p className="jp-plbl" style={{ color: m.color }}>{m.photoLabel}</p>

                    <div className="jp-stat-box">
                        <span className="jp-sv" style={{ color: m.color }}>{m.stat.val}</span>
                        <span className="jp-sl">{m.stat.lbl}</span>
                    </div>
                </div>
            </div>

            {/* ── CENTER: date pill + spine dot ── */}
            <div className="jp-center">
                <div className="jp-pill">
                    <span className="jp-year">{m.year}</span>
                    <span className="jp-month">{m.month}</span>
                </div>
                <div className="jp-dot" style={{ background: m.color, boxShadow: `0 0 14px ${m.color}70` }} />
            </div>

            {/* ── TEXT PANEL ── slides from opposite side */}
            <div className={`jp-text ${isR ? "jp-text-r" : "jp-text-l"}`}>
                <div className="jp-text-card">
                    <div className="jp-era" style={{ color: m.color }}>
                        <span className="jp-era-dash" style={{ background: m.color }} />
                        {m.era}
                    </div>
                    <h2 className="jp-headline">{m.headline}</h2>
                    <p className="jp-body">{m.body}</p>
                    <div className="jp-tags">
                        {m.tags.map(t => (
                            <span key={t} className="jp-tag" style={{ "--c": m.color }}>#{t}</span>
                        ))}
                    </div>
                    <div className="jp-underline" style={{ background: `linear-gradient(90deg,${m.color},${m.color}40,transparent)` }} />
                </div>
            </div>
        </article>
    )
}

/* ═══════════════════════════════════════════
   PAGE
═══════════════════════════════════════════ */
export default function JourneyPage() {
    const [dark, setDark] = useState(false)
    const [milestones, setMilestones] = useState([])
    const [loading, setLoading] = useState(true)

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

    useEffect(() => {
        const fetchMilestones = async () => {
            try {
                const data = await api.getJourney()
                if (data && data.length > 0) {
                    setMilestones(data)
                } else {
                    setMilestones(FALLBACK_MILESTONES)
                }
            } catch (err) {
                console.error("Failed to fetch journey:", err)
                setMilestones(FALLBACK_MILESTONES)
            } finally {
                setLoading(false)
            }
        }
        fetchMilestones()
    }, [])

    useEffect(() => {
        const fn = () => setDark(document.body.classList.contains("dark"))
        fn()
        const obs = new MutationObserver(fn)
        obs.observe(document.body, { attributes: true, attributeFilter: ["class"] })
        return () => obs.disconnect()
    }, [])

    if (loading) return <PageLoader />

    return (
        <div className="jp-page">
            <PageHero
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "About" },
                ]}
                pill="Our Journey"
                title={
                    <>
                        From <span className="ph-gradient">One Laptop</span> to
                        <br />
                        500+ Businesses
                    </>
                }
                subtitle="From a single laptop in Lucknow to 500+ businesses powered across India — this is the story of how Axsem Softwares was built, one sleepless night at a time."
                tag="Est. 2020 · Axsem Softwares"
            />
            <Particles dark={dark} />
            <div className="jp-ambient" aria-hidden>
                <div className="jp-b1" /><div className="jp-b2" />
                <div className="jp-b3" /><div className="jp-b4" />
            </div>
            <div className="jp-noise" aria-hidden />

            <div className="jp-timeline-wrap">
                <Spine />
                <div className="jp-items-wrap">
                    {milestones.map((m, i) => (
                        <Item 
                            key={m._id || m.id} 
                            m={{
                                ...m,
                                image: m.image?.startsWith('/uploads') ? `${API_URL}${m.image}` : m.image
                            }} 
                            idx={i} 
                        />
                    ))}
                </div>
            </div>

            <div className="jp-end">
                <div className="jp-end-line" />
                <div className="jp-end-orb" />
                <p className="jp-end-txt">The story continues…</p>
            </div>
        </div>
    )
}