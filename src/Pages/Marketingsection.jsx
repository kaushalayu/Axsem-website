import { useEffect, useRef, useState, useCallback } from "react"
import {
    FiSearch, FiInstagram, FiMail, FiBarChart2, FiTarget, FiVideo,
    FiTrendingUp, FiStar, FiArrowRight, FiCheck, FiZap, FiUsers,
    FiMousePointer, FiShare2, FiMessageSquare
} from "react-icons/fi"
import { usePricing } from "../hooks/usePricing"
import "../Styles/MarketingSection.css"

/* ─────────────────────────────────
   DATA — 6 marketing fields
───────────────────────────────────*/
const FIELDS = [
    {
        id: "seo",
        label: "SEO",
        icon: <FiSearch />,
        color: "#f05a28",
        colorRgb: "240,90,40",
        tagline: "Rank #1 on Google",
        headline: "Search Engine Optimisation",
        desc: "Dominate organic search results with technical SEO, content strategy, and authoritative link building. We've grown organic traffic by 3x for clients in 90 days.",
        stats: [{ val: "3x", lbl: "Organic Traffic Growth" }, { val: "90", lbl: "Days to First Page" }, { val: "25+", lbl: "Keywords Tracked" }],
        packages: [
            { name: "Basic SEO", price: "₹15,000/mo", features: ["10 keywords", "Technical audit", "On-page SEO", "5 backlinks/mo", "Monthly report"] },
            { name: "Advanced SEO", price: "₹35,000/mo", features: ["25+ keywords", "4 blog posts/mo", "15+ backlinks", "Core Web Vitals", "Weekly updates"], highlight: true },
        ],
        cta: "Get Free SEO Audit",
        process: ["Site Audit", "Keyword Research", "On-Page Fixes", "Content Creation", "Link Building", "Rank & Report"],
    },
    {
        id: "social",
        label: "Social Media",
        icon: <FiInstagram />,
        color: "#e63b2a",
        colorRgb: "230,59,42",
        tagline: "Grow Your Audience",
        headline: "Social Media Management",
        desc: "Strategic content creation, community management, and paid social — across Instagram, Facebook, LinkedIn, and YouTube Shorts. We handle everything so you can focus on your business.",
        stats: [{ val: "10x", lbl: "Engagement Growth" }, { val: "4", lbl: "Platforms Managed" }, { val: "100%", lbl: "Branded Content" }],
        packages: [
            { name: "Starter", price: "₹12,000/mo", features: ["2 platforms", "12 posts/mo", "2 reels/mo", "Community mgmt", "Monthly report"] },
            { name: "Growth", price: "₹22,000/mo", features: ["3 platforms", "20 posts/mo", "4 reels/mo", "Ad creatives", "Strategy calls"], highlight: true },
            { name: "Pro", price: "₹40,000/mo", features: ["All platforms", "30 posts/mo", "8 reels/mo", "Paid ads mgmt", "Dedicated mgr"] },
        ],
        cta: "Get Free Social Audit",
        process: ["Brand Voice", "Content Calendar", "Design & Create", "Schedule & Post", "Engage", "Analyse & Grow"],
    },
    {
        id: "email",
        label: "Email Marketing",
        icon: <FiMail />,
        color: "#3d3d9e",
        colorRgb: "61,61,158",
        tagline: "4200% Average ROI",
        headline: "Email & WhatsApp Marketing",
        desc: "Automated email sequences, broadcast campaigns, and WhatsApp marketing that convert leads into paying customers. Average ROI of 42x on every rupee spent.",
        stats: [{ val: "42x", lbl: "Average ROI" }, { val: "65%", lbl: "Open Rate Achieved" }, { val: "₹0.05", lbl: "Cost Per Message" }],
        packages: [
            { name: "Email Basic", price: "₹8,000/mo", features: ["4 campaigns/mo", "List management", "Basic automation", "Open rate report"] },
            { name: "Full Stack", price: "₹20,000/mo", features: ["8 campaigns/mo", "WhatsApp blasts", "Advanced automation", "A/B testing", "Revenue attribution"], highlight: true },
        ],
        cta: "See Email Strategy",
        process: ["List Build", "Segmentation", "Copy & Design", "Automation Setup", "Send & Test", "Revenue Report"],
    },
    {
        id: "ads",
        label: "Paid Ads",
        icon: <FiTarget />,
        color: "#6b3fa0",
        colorRgb: "107,63,160",
        tagline: "4.2x Average ROAS",
        headline: "Google & Meta Ads",
        desc: "Data-driven paid campaigns on Google Search, Display, Shopping, and Meta (Facebook + Instagram). We've managed ₹2Cr+ in ad spend with an average ROAS of 4.2x.",
        stats: [{ val: "4.2x", lbl: "Average ROAS" }, { val: "₹2Cr+", lbl: "Ad Spend Managed" }, { val: "60%", lbl: "Lower CPL" }],
        packages: [
            { name: "Ads Starter", price: "₹15,000/mo", features: ["Google Search ads", "1 campaign", "Ad copy creation", "Weekly report", "Min ₹10k spend"] },
            { name: "Ads Pro", price: "₹30,000/mo", features: ["Google + Meta ads", "5 campaigns", "Creative design", "Conversion tracking", "ROAS optimisation"], highlight: true },
        ],
        cta: "Get Free Ads Audit",
        process: ["Research", "Campaign Build", "Ad Creative", "Launch & Track", "Optimise", "Scale Winners"],
    },
    {
        id: "content",
        label: "Content",
        icon: <FiVideo />,
        color: "#0e9e6e",
        colorRgb: "14,158,110",
        tagline: "Content That Converts",
        headline: "Content Marketing",
        desc: "SEO blogs, video scripts, reels, case studies, and whitepapers — content that builds authority, earns backlinks, and brings warm leads to your door every month.",
        stats: [{ val: "400%", lbl: "More Leads from Content" }, { val: "48hr", lbl: "First Draft Delivery" }, { val: "1500+", lbl: "Articles Written" }],
        packages: [
            { name: "Content Basic", price: "₹12,000/mo", features: ["4 blog posts", "2 social scripts", "SEO optimised", "1 revision round"] },
            { name: "Content Pro", price: "₹25,000/mo", features: ["8 blog posts", "4 video scripts", "2 case studies", "Infographic design", "Distribution strategy"], highlight: true },
        ],
        cta: "See Content Samples",
        process: ["Topic Research", "Brief Creation", "Expert Writing", "SEO Tuning", "Visual Design", "Publish & Promote"],
    },
    {
        id: "analytics",
        label: "Analytics",
        icon: <FiBarChart2 />,
        color: "#f5a623",
        colorRgb: "245,166,35",
        tagline: "Data-Driven Decisions",
        headline: "Analytics & CRO",
        desc: "GA4 setup, heatmaps, conversion funnel analysis, and A/B testing to turn more of your existing traffic into paying customers — without spending more on ads.",
        stats: [{ val: "40%", lbl: "Avg Conversion Lift" }, { val: "GA4", lbl: "Advanced Setup" }, { val: "100%", lbl: "Data Accuracy" }],
        packages: [
            { name: "Analytics Setup", price: "₹12,000", features: ["GA4 full setup", "Search Console", "Event tracking", "Goal configuration", "Dashboard build"] },
            { name: "CRO Monthly", price: "₹20,000/mo", features: ["Heatmap analysis", "A/B testing", "Funnel optimisation", "Monthly CRO report", "UX recommendations"], highlight: true },
        ],
        cta: "Get Analytics Audit",
        process: ["Audit Current Data", "Set Up Tracking", "Heatmaps & Replays", "A/B Test", "Implement Wins", "Report & Repeat"],
    },
]

/* ─────────────────────────────────
   3D SPHERE CANVAS
───────────────────────────────────*/
function MarketingSphere({ activeColor, isDark }) {
    const canvasRef = useRef(null)
    const animRef = useRef(null)
    const rotRef = useRef({ x: 0.3, y: 0, vx: 0.001, vy: 0.004 })
    const mouseRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        let W = canvas.offsetWidth, H = canvas.offsetHeight
        canvas.width = W; canvas.height = H

        const resize = () => {
            W = canvas.offsetWidth; H = canvas.offsetHeight
            canvas.width = W; canvas.height = H
        }
        window.addEventListener("resize", resize)

        // Mouse interaction
        const onMove = (e) => {
            const rect = canvas.getBoundingClientRect()
            mouseRef.current = { x: e.clientX - rect.left - W / 2, y: e.clientY - rect.top - H / 2 }
        }
        const onLeave = () => { mouseRef.current = null }
        canvas.addEventListener("mousemove", onMove)
        canvas.addEventListener("mouseleave", onLeave)

        // Sphere dots
        const N = 160
        const pts = Array.from({ length: N }, () => {
            const phi = Math.acos(2 * Math.random() - 1)
            const theta = Math.random() * Math.PI * 2
            return {
                phi, theta,
                r: 0.8 + Math.random() * 1.8,
                pulse: Math.random() * Math.PI * 2,
                speed: 0.3 + Math.random() * 0.7,
            }
        })

        // Ring lines
        const RINGS = [0.3, 0.6, 1.0, 1.4, 1.8].map(v => ({ angle: v, speed: 0.003 + Math.random() * 0.003 }))

        let t = 0
        const RADIUS = Math.min(W, H) * 0.38

        const draw = () => {
            ctx.clearRect(0, 0, W, H)
            t += 0.012

            const rot = rotRef.current
            if (mouseRef.current) {
                rot.vy += mouseRef.current.x * 0.00003
                rot.vx += mouseRef.current.y * 0.00003
            }
            rot.vx *= 0.97; rot.vy *= 0.97
            rot.x += rot.vx; rot.y += rot.vy

            const cx = W / 2, cy = H / 2
            const col = activeColor

            // Glow pulse
            const glowR = RADIUS * (0.85 + 0.05 * Math.sin(t * 0.5))
            const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowR)
            grd.addColorStop(0, `${col}22`)
            grd.addColorStop(0.5, `${col}0a`)
            grd.addColorStop(1, "transparent")
            ctx.beginPath(); ctx.arc(cx, cy, glowR, 0, Math.PI * 2)
            ctx.fillStyle = grd; ctx.fill()

            // Orbit rings
            RINGS.forEach((ring, ri) => {
                ring.angle += ring.speed
                ctx.save()
                ctx.translate(cx, cy)
                ctx.rotate(ring.angle)
                ctx.scale(1, 0.35 - ri * 0.04)
                ctx.beginPath()
                ctx.arc(0, 0, RADIUS * (0.7 + ri * 0.07), 0, Math.PI * 2)
                ctx.strokeStyle = `${col}${ri < 2 ? "30" : "18"}`
                ctx.lineWidth = ri === 1 ? 2 : 1
                ctx.stroke()
                ctx.restore()
            })

            // Sphere dots — project 3D → 2D
            const project = (phi, theta) => {
                let sx = Math.sin(phi) * Math.cos(theta)
                let sy = Math.sin(phi) * Math.sin(theta)
                let sz = Math.cos(phi)
                // rotate Y
                let nx = sx * Math.cos(rot.y) - sz * Math.sin(rot.y)
                let nz = sx * Math.sin(rot.y) + sz * Math.cos(rot.y)
                sx = nx; sz = nz
                // rotate X
                let ny = sy * Math.cos(rot.x) - sz * Math.sin(rot.x)
                nz = sy * Math.sin(rot.x) + sz * Math.cos(rot.x)
                sy = ny; sz = nz
                const scale = (sz + 1.4) / 2.4
                return { x: cx + sx * RADIUS, y: cy + sy * RADIUS, z: sz, scale }
            }

            // Sort by z
            const projected = pts.map(p => ({ ...p, ...project(p.phi, p.theta) }))
            projected.sort((a, b) => a.z - b.z)

            projected.forEach(p => {
                const alpha = (p.z + 1) / 2
                const pulse = 0.7 + 0.3 * Math.sin(t * p.speed + p.pulse)
                const r = p.r * pulse * p.scale

                if (p.z > -0.2) {
                    // Glow dot
                    const dg = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 3)
                    dg.addColorStop(0, `${col}${Math.round(alpha * 40).toString(16).padStart(2, "0")}`)
                    dg.addColorStop(1, "transparent")
                    ctx.beginPath(); ctx.arc(p.x, p.y, r * 3, 0, Math.PI * 2)
                    ctx.fillStyle = dg; ctx.fill()
                }

                ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
                ctx.fillStyle = `${col}${Math.round(alpha * 200).toString(16).padStart(2, "0")}`
                ctx.fill()
            })

            // Equator ring
            ctx.save()
            ctx.translate(cx, cy)
            ctx.rotate(rot.y)
            ctx.scale(1, 0.28)
            ctx.beginPath(); ctx.arc(0, 0, RADIUS, 0, Math.PI * 2)
            ctx.strokeStyle = `${col}50`; ctx.lineWidth = 1.5; ctx.stroke()
            ctx.restore()

            animRef.current = requestAnimationFrame(draw)
        }

        draw()
        return () => {
            cancelAnimationFrame(animRef.current)
            window.removeEventListener("resize", resize)
            canvas.removeEventListener("mousemove", onMove)
            canvas.removeEventListener("mouseleave", onLeave)
        }
    }, [activeColor, isDark])

    return <canvas ref={canvasRef} className="mkt-sphere-canvas" />
}

/* ─────────────────────────────────
   FLOATING ICON (animated)
───────────────────────────────────*/
function FloatingIcon({ icon, style, delay }) {
    return (
        <div className="mkt-float-icon" style={{ ...style, animationDelay: delay }}>
            {icon}
        </div>
    )
}

/* ─────────────────────────────────
   PACKAGE CARD (neomorphism)
───────────────────────────────────*/
function PackageCard({ pkg, color }) {
    return (
        <div className={`mkt-pkg-card${pkg.highlight ? " mkt-pkg-hl" : ""}`} style={{ "--fc": color }}>
            {pkg.highlight && <div className="mkt-pkg-badge"><FiZap /> Best Value</div>}
            <div className="mkt-pkg-name">{pkg.name}</div>
            <div className="mkt-pkg-price">{pkg.price}</div>
            <ul className="mkt-pkg-list">
                {pkg.features.map(f => (
                    <li key={f}><FiCheck className="mkt-pkg-check" />{f}</li>
                ))}
            </ul>
            <a href="/contact" className="mkt-pkg-cta">
                Get Started <FiArrowRight />
            </a>
        </div>
    )
}

/* ─────────────────────────────────
   PROCESS STEP
───────────────────────────────────*/
function ProcessStep({ step, idx, color }) {
    return (
        <div className="mkt-step" style={{ "--fc": color, "--di": idx }}>
            <div className="mkt-step-num">{String(idx + 1).padStart(2, "0")}</div>
            <div className="mkt-step-label">{step}</div>
        </div>
    )
}

/* ─────────────────────────────────
   MAIN COMPONENT
──────────────────────────────────*/
export default function MarketingSection() {
    const [active, setActive] = useState(0)
    const [prev, setPrev] = useState(null)
    const [isDark, setIsDark] = useState(false)
    const [animating, setAnim] = useState(false)
    const contentRef = useRef(null)
    const { getPrice } = usePricing()

    const getDynamicPrice = (category, plan) => {
        return getPrice(category, plan)
    }

    const field = FIELDS[active]

    const getUpdatedPackages = (fieldId) => {
        if (fieldId === 'seo') {
            return [
                { name: "Basic SEO", price: getDynamicPrice('seo', 'basic') + "/mo", features: ["10 keywords", "Technical audit", "On-page SEO", "5 backlinks/mo", "Monthly report"] },
                { name: "Advanced SEO", price: getDynamicPrice('seo', 'advanced') + "/mo", features: ["25+ keywords", "4 blog posts/mo", "15+ backlinks", "Core Web Vitals", "Weekly updates"], highlight: true },
            ]
        }
        if (fieldId === 'social') {
            return [
                { name: "Starter", price: getDynamicPrice('socialMedia', 'starter') + "/mo", features: ["2 platforms", "12 posts/mo", "2 reels/mo", "Community mgmt", "Monthly report"] },
                { name: "Growth", price: getDynamicPrice('socialMedia', 'growth') + "/mo", features: ["3 platforms", "20 posts/mo", "4 reels/mo", "Ad creatives", "Strategy calls"], highlight: true },
                { name: "Pro", price: getDynamicPrice('socialMedia', 'pro') + "/mo", features: ["All platforms", "30 posts/mo", "8 reels/mo", "Paid ads mgmt", "Dedicated mgr"] },
            ]
        }
        return field.packages
    }

    // Sync with body.dark
    useEffect(() => {
        const check = () => setIsDark(document.body.classList.contains("dark"))
        check()
        const obs = new MutationObserver(check)
        obs.observe(document.body, { attributes: true, attributeFilter: ["class"] })
        return () => obs.disconnect()
    }, [])

    const switchField = useCallback((idx) => {
        if (idx === active || animating) return
        setAnim(true)
        setPrev(active)
        if (contentRef.current) contentRef.current.classList.add("mkt-content-exit")
        setTimeout(() => {
            setActive(idx)
            if (contentRef.current) {
                contentRef.current.classList.remove("mkt-content-exit")
                contentRef.current.classList.add("mkt-content-enter")
                setTimeout(() => contentRef.current?.classList.remove("mkt-content-enter"), 500)
            }
            setAnim(false)
        }, 280)
    }, [active, animating])

    return (
        <section className="mkt-section">
            {/* Subtle background mesh */}
            <div className="mkt-bg" aria-hidden>
                <div className="mkt-mesh" style={{ "--fc": field.color }} />
                <div className="mkt-noise" />
            </div>

            <div className="mkt-container">

                {/* ══ TOP SPLIT ══ */}
                <div className="mkt-top">

                    {/* LEFT — 3D sphere + floating icons */}
                    <div className="mkt-visual">
                        <div className="mkt-sphere-wrap">
                            <MarketingSphere activeColor={field.color} isDark={isDark} />

                            {/* Floating marketing icons around sphere */}
                            <FloatingIcon icon={<FiSearch />} style={{ top: "8%", left: "10%" }} delay="0s" />
                            <FloatingIcon icon={<FiInstagram />} style={{ top: "15%", right: "6%" }} delay="0.4s" />
                            <FloatingIcon icon={<FiMail />} style={{ top: "42%", left: "2%" }} delay="0.8s" />
                            <FloatingIcon icon={<FiTarget />} style={{ top: "42%", right: "2%" }} delay="1.2s" />
                            <FloatingIcon icon={<FiVideo />} style={{ bottom: "18%", left: "8%" }} delay="1.6s" />
                            <FloatingIcon icon={<FiBarChart2 />} style={{ bottom: "10%", right: "10%" }} delay="0.2s" />
                            <FloatingIcon icon={<FiTrendingUp />} style={{ top: "70%", left: "35%" }} delay="1s" />
                            <FloatingIcon icon={<FiUsers />} style={{ top: "5%", left: "42%" }} delay="1.4s" />

                            {/* Active field label in center */}
                            <div className="mkt-sphere-label" style={{ color: field.color }}>
                                <div className="mkt-sphere-icon">{field.icon}</div>
                                <span>{field.tagline}</span>
                            </div>
                        </div>

                        {/* Stat badges floating */}
                        {field.stats.map((s, i) => (
                            <div key={s.lbl} className={`mkt-stat-badge mkt-sb-${i}`} style={{ "--fc": field.color }}>
                                <span className="mkt-sb-val">{s.val}</span>
                                <span className="mkt-sb-lbl">{s.lbl}</span>
                            </div>
                        ))}
                    </div>

                    {/* RIGHT — tabs + header */}
                    <div className="mkt-right">
                        <div className="mkt-eyebrow">
                            <span className="mkt-eyebrow-dot" style={{ background: field.color }} />
                            Marketing Services
                        </div>
                        <h2 className="mkt-main-heading">
                            Every Channel.<br />
                            <span className="mkt-heading-hl" style={{ color: field.color }}>
                                Maximum Impact.
                            </span>
                        </h2>
                        <p className="mkt-main-sub">
                            From search rankings to social feeds to your customer's inbox —
                            we run marketing that drives real, measurable business growth.
                        </p>

                        {/* Field selector tabs */}
                        <div className="mkt-tabs">
                            {FIELDS.map((f, i) => (
                                <button
                                    key={f.id}
                                    className={`mkt-tab${active === i ? " mkt-tab-active" : ""}`}
                                    style={{ "--fc": f.color }}
                                    onClick={() => switchField(i)}
                                >
                                    <span className="mkt-tab-icon">{f.icon}</span>
                                    <span className="mkt-tab-label">{f.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ══ BOTTOM — changes on tab click ══ */}
                <div className="mkt-content" ref={contentRef} style={{ "--fc": field.color }}>

                    {/* Field hero */}
                    <div className="mkt-field-hero">
                        <div className="mkt-field-icon-big" style={{ "--fc": field.color }}>
                            {field.icon}
                        </div>
                        <div className="mkt-field-text">
                            <h3 className="mkt-field-headline">{field.headline}</h3>
                            <p className="mkt-field-desc">{field.desc}</p>
                        </div>
                        <button 
                            className="btn-primary" 
                            onClick={() => window.location.href='/contact'}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '18px 36px',
                                borderRadius: '50px',
                                background: 'linear-gradient(135deg, #f05a28, #ff7a45)',
                                color: '#fff',
                                fontFamily: '"Plus Jakarta Sans", sans-serif',
                                fontWeight: 700,
                                fontSize: '16px',
                                border: 'none',
                                cursor: 'pointer',
                                boxShadow: '0 8px 28px rgba(240, 90, 40, 0.35)',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            Get Started <FiArrowRight className="btn-arrow" />
                        </button>
                    </div>

                    {/* Process strip */}
                    <div className="mkt-process-strip">
                        <div className="mkt-process-label">Our Process</div>
                        <div className="mkt-process-steps">
                            {field.process.map((step, i) => (
                                <ProcessStep key={step} step={step} idx={i} color={field.color} />
                            ))}
                        </div>
                    </div>

                    {/* Packages */}
                    <div className="mkt-packages">
                        <div className="mkt-packages-header">
                            <span className="mkt-packages-title">Packages & Pricing</span>
                            <a href="/packages" className="mkt-packages-link" style={{ color: field.color }}>
                                See all packages <FiArrowRight style={{ fontSize: 13 }} />
                            </a>
                        </div>
                        <div className={`mkt-pkg-grid mkt-pkg-grid-${getUpdatedPackages(field.id).length}`}>
                            {getUpdatedPackages(field.id).map(pkg => (
                                <PackageCard key={pkg.name} pkg={pkg} color={field.color} />
                            ))}
                        </div>
                    </div>

                </div>

            </div>
        </section>
    )
}