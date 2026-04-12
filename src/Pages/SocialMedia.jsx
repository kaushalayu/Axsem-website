import { useEffect, useRef } from "react"
import { FiInstagram, FiImage, FiCalendar, FiMessageCircle, FiBarChart2, FiVideo, FiArrowRight, FiCheck } from "react-icons/fi"
import PageHero from "../Components/PageHero"
import { usePricing } from "../hooks/usePricing"
import "../Styles/ServicePageShared.css"
import "../Styles/PackagePage.css"
import "../Styles/DevelopmentPage.css"

function useRevealCards() {
    const ref = useRef(null)
    useEffect(() => {
        const el = ref.current; if (!el) return
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) el.querySelectorAll(".pkg-feat-card").forEach((c, i) => setTimeout(() => c.classList.add("pkg-in"), i * 70))
        }, { threshold: 0.04 })
        obs.observe(el); return () => obs.disconnect()
    }, [])
    return ref
}

const PACKAGES = [
    { name: "Starter", price: "₹12,000/mo", platforms: "2 platforms", posts: "12 posts/mo", reels: "2 reels/mo", ads: "❌", manager: "✓" },
    { name: "Growth", price: "₹22,000/mo", platforms: "3 platforms", posts: "20 posts/mo", reels: "4 reels/mo", ads: "✓ (setup)", manager: "✓" },
    { name: "Pro", price: "₹40,000/mo", platforms: "All platforms", posts: "30 posts/mo", reels: "8 reels/mo", ads: "✓ (managed)", manager: "✓" },
]

const FEATS = [
    { icon: <FiCalendar />, t: "Content Calendar", d: "Monthly content plan approved by you before any post goes live — full visibility." },
    { icon: <FiImage />, t: "Graphic Design Included", d: "Every post designed in your brand colours and style — no stock template look." },
    { icon: <FiVideo />, t: "Reels & Short Videos", d: "Scripted, edited reels and short-form videos — the highest-reach content format right now." },
    { icon: <FiMessageCircle />, t: "Community Management", d: "Reply to comments and DMs in your brand voice — no query left unanswered." },
    { icon: <FiInstagram />, t: "Multi-Platform Posting", d: "Instagram, Facebook, LinkedIn, YouTube Shorts — all scheduled and posted for you." },
    { icon: <FiBarChart2 />, t: "Monthly Analytics Report", d: "Reach, engagement, follower growth, best performing posts — clear monthly report." },
]
const ALL_STARTER = ["2 platforms (Instagram + Facebook)", "12 posts per month", "2 reels per month", "Branded graphic design", "Content calendar", "Caption writing", "Hashtag strategy", "Community management", "Monthly analytics report", "Brand voice guidelines"]
const ALL_GROWTH = ["3 platforms", "20 posts per month", "4 reels per month", "Ad creative setup (not spend)", "Story designs", "Weekly content review", "Competitor analysis", "Monthly strategy call"]
const ALL_PRO = ["All platforms", "30 posts per month", "8 reels per month", "Paid ad management (₹10k+ spend)", "Influencer coordination", "Bi-weekly strategy call", "Dedicated social manager"]

export default function SocialMediaPage() {
    const featRef = useRevealCards()
    const { getPrice } = usePricing()

    const PACKAGES = [
        { name: "Starter", price: getPrice('socialMedia', 'starter'), platforms: "2 platforms", posts: "12 posts/mo", reels: "2 reels/mo", ads: "❌", manager: "✓" },
        { name: "Growth", price: getPrice('socialMedia', 'growth'), platforms: "3 platforms", posts: "20 posts/mo", reels: "4 reels/mo", ads: "✓ (setup)", manager: "✓" },
        { name: "Pro", price: getPrice('socialMedia', 'pro'), platforms: "All platforms", posts: "30 posts/mo", reels: "8 reels/mo", ads: "✓ (managed)", manager: "✓" },
    ]
    return (
        <div className="sp-page dp-page">
            <PageHero
                breadcrumbs={[{ label: "Packages", }, { label: "Social Media" }]}
                pill="Social Media Management"
                title={<>Social Media That<br /><span className="ph-gradient">Actually Grows Your Brand</span></>}
                subtitle="Content creation, graphic design, reels, scheduling, community management, and monthly analytics — your social media completely handled."
                tag="Instagram · Facebook · LinkedIn · YouTube Shorts"
            />
            <div className="sp-body dp-body">
                <div className="dp-cubes" aria-hidden><div className="dp-cube dp-c1" /><div className="dp-cube dp-c2" /><div className="dp-cube dp-c3" /></div>

                {/* Package comparison table */}
                <div>
                    <div className="sp-section-header sp-center">
                        <div className="sp-pill">Pricing Plans</div>
                        <h2 className="sp-section-title">Choose Your <span className="sp-hl">Plan</span></h2>
                        <p className="sp-section-sub">All plans include graphic design, captions, scheduling, and monthly reporting. Cancel after 3 months.</p>
                    </div>
                    <div className="dp-pcard-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
                        {[
                            {
                                name: "Starter", price: getPrice('socialMedia', 'starter'), per: "per month", highlight: false, badge: null,
                                items: ["2 platforms", "12 posts/month", "2 reels/month", "Branded design", "Community management", "Monthly report"]
                            },
                            {
                                name: "Growth", price: getPrice('socialMedia', 'growth'), per: "per month", highlight: true, badge: "Most Popular",
                                items: ["3 platforms", "20 posts/month", "4 reels/month", "Ad creative setup", "Competitor analysis", "Monthly strategy call"]
                            },
                            {
                                name: "Pro", price: getPrice('socialMedia', 'pro'), per: "per month", highlight: false, badge: null,
                                items: ["All platforms", "30 posts/month", "8 reels/month", "Paid ad management", "Influencer coordination", "Dedicated social manager"]
                            },
                        ].map((p, i) => (
                            <div key={p.name} className={`dp-pcard${p.highlight ? " dp-pcard-hl" : ""}`} style={{ "--delay": `${i * .1}s`, opacity: 1, transform: "none" }}>
                                {p.badge && <div className="dp-pcard-badge" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 50, background: "var(--sp-orange)", color: "#fff", fontSize: 11, fontWeight: 800, textTransform: "uppercase", width: "fit-content", marginBottom: 4 }}>{p.badge}</div>}
                                <div className="dp-pcard-name">{p.name}</div>
                                <div className="dp-pcard-price">{p.price}</div>
                                <div className="dp-pcard-per">{p.per}</div>
                                <ul className="dp-pcard-list" style={{ margin: "12px 0" }}>
                                    {p.items.map(f => <li key={f}><FiCheck style={{ color: "var(--sp-orange)", fontSize: 15, flexShrink: 0 }} />{f}</li>)}
                                </ul>
                                <a href="/contact" className={`dp-pcard-btn${p.highlight ? " dp-pcard-btn-hl" : ""}`} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "13px 22px", borderRadius: 50, textDecoration: "none", fontWeight: 700, fontSize: 14 }}>
                                    Get Started <FiArrowRight />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>

                {/* What we do */}
                <div>
                    <div className="sp-section-header">
                        <div className="sp-pill">What We Handle</div>
                        <h2 className="sp-section-title">Everything <span className="sp-hl">Taken Care Of</span></h2>
                        <p className="sp-section-sub">You focus on your business — we handle every aspect of your social presence.</p>
                    </div>
                    <div className="pkg-feat-grid" ref={featRef}>
                        {FEATS.map((f, i) => (
                            <div key={f.t} className="pkg-feat-card" style={{ "--delay": `${i * .07}s` }}>
                                <div className="pkg-fi">{f.icon}</div>
                                <div><p className="pkg-ft">{f.t}</p><p className="pkg-fd">{f.d}</p></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Checklist all plans */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
                    {[
                        { name: "Starter Includes", items: ALL_STARTER },
                        { name: "Growth Includes (+ Starter)", items: ALL_GROWTH },
                        { name: "Pro Includes (+ Growth)", items: ALL_PRO },
                    ].map(col => (
                        <div key={col.name} style={{ padding: "22px 24px", borderRadius: 16, border: "1.5px solid var(--sp-border)", background: "var(--sp-white)" }}>
                            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--sp-orange)", marginBottom: 14 }}>{col.name}</div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                {col.items.map(f => <div key={f} className="pkg-check-row"><span className="pkg-check-dot">✓</span>{f}</div>)}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="sp-cta sp-anim">
                    <h2 className="sp-cta-title">Stop Posting Randomly — Start Growing</h2>
                    <p className="sp-cta-sub">Get a free social media audit — we'll review your current profiles and tell you what to fix.</p>
                    <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                        <a href="/contact" className="sp-btn-primary" >Get Free Audit <FiArrowRight /></a>
                        <a href="/projects" className="sp-btn-primary" >View Our Work <FiArrowRight /></a>
                    </div>
                </div>
            </div>
        </div>
    )
}