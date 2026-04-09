import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import {
    FiTrendingUp, FiTarget, FiMail, FiInstagram, FiBarChart2,
    FiDollarSign, FiArrowRight, FiPlus, FiZap, FiSettings,
    FiCode, FiLayers, FiUsers, FiGlobe
} from "react-icons/fi"
import PageHero from "../Components/PageHero"
import "../Styles/ServicePageShared.css"
import DmImg from "../assets/ads.jpeg"

function useReveal() {
    const ref = useRef(null)
    useEffect(() => {
        const el = ref.current; if (!el) return
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) el.classList.add("sp-revealed") },
            { threshold: 0, rootMargin: "0px 0px -40px 0px" }
        )
        obs.observe(el); return () => obs.disconnect()
    }, [])
    return ref
}

function FaqItem({ q, a }) {
    const [open, setOpen] = useState(false)
    return (
        <div className={`sp-faq-item${open ? " sp-faq-open" : ""}`}>
            <button className="sp-faq-q" onClick={() => setOpen(!open)}>
                <span>{q}</span><FiPlus className="sp-faq-icon" />
            </button>
            <div className="sp-faq-a">{a}</div>
        </div>
    )
}

const services = [
    { icon: <FiTarget />, title: "Google Ads (PPC)", desc: "Search, Display, Shopping, and YouTube ads managed for maximum ROAS — keyword targeting, bid strategies, and conversion tracking.", tag: "Google Ads" },
    { icon: <FiInstagram />, title: "Social Media Advertising", desc: "Meta (Facebook/Instagram), LinkedIn, and Twitter ad campaigns that reach the right audience and drive measurable results.", tag: "Social Ads" },
    { icon: <FiMail />, title: "Email Marketing", desc: "Drip sequences, newsletters, and automated campaigns that nurture leads and convert them into paying customers.", tag: "Email" },
    { icon: <FiUsers />, title: "Social Media Management", desc: "Content calendars, post creation, community management, and growth strategy for Instagram, LinkedIn, and Twitter.", tag: "Social Media" },
    { icon: <FiBarChart2 />, title: "Analytics & Conversion CRO", desc: "GA4 setup, funnel analysis, A/B testing, and conversion rate optimisation that turns more visitors into customers.", tag: "Analytics" },
    { icon: <FiGlobe />, title: "Content Marketing", desc: "Blog strategy, content creation, distribution, and performance tracking that builds authority and drives organic growth.", tag: "Content" },
]

const process = [
    { num: "01", title: "Audit & Goals", desc: "Review current channels, set measurable KPIs and budgets" },
    { num: "02", title: "Audience Research", desc: "Build detailed buyer personas and targeting segments" },
    { num: "03", title: "Strategy", desc: "Channel mix, messaging, creative direction, and calendar" },
    { num: "04", title: "Campaign Launch", desc: "Set up tracking, launch campaigns, baseline measurement" },
    { num: "05", title: "Optimise", desc: "Weekly performance review, A/B testing, budget reallocation" },
    { num: "06", title: "Report & Scale", desc: "Monthly report with insights and scaling recommendations" },
]

const techStack = [
    { cat: "Paid Ads", items: ["Google Ads", "Meta Ads Manager", "LinkedIn Ads", "YouTube Ads"] },
    { cat: "Email", items: ["Mailchimp", "Klaviyo", "Brevo", "HubSpot"] },
    { cat: "Analytics", items: ["Google Analytics 4", "Looker Studio", "Hotjar", "Meta Pixel"] },
    { cat: "Social", items: ["Buffer", "Hootsuite", "Canva", "Later"] },
]

const stats = [
    { val: "4.2x", lbl: "Average ROAS on Google Ads" },
    { val: "60%", lbl: "Avg. CPL Reduction in 90 days" },
    { val: "25+", lbl: "Brands Marketed" },
    { val: "₹2Cr+", lbl: "Ad Spend Managed" },
]

const faqs = [
    { q: "What's the minimum budget for Google Ads?", a: "We recommend a minimum ad spend of ₹30,000/month to get statistically meaningful data for optimisation. Our management fee is separate. For Meta Ads, ₹20,000/month is a reasonable starting point." },
    { q: "How do you measure success?", a: "Every campaign is tied to clear KPIs upfront — Cost Per Lead, ROAS, Conversion Rate, or Revenue. We report monthly in Looker Studio dashboards with full transparency on spend and results." },
    { q: "Can you manage our social media accounts?", a: "Yes. Our social media management includes content calendar planning, post design, copywriting, scheduling, and community management (responding to comments/DMs). We handle Instagram, LinkedIn, Twitter, and Facebook." },
    { q: "Do you work with small businesses?", a: "Yes. We work with businesses of all sizes. Our entry-level digital marketing packages are designed for small businesses wanting to get started with Google Ads or social media marketing on a budget of ₹20–50k/month." },
    { q: "How soon will I see results from digital marketing?", a: "Paid ads (Google/Meta) show results from week 1. The first 4–6 weeks are optimisation phase — CPL typically improves by 30–60% by month 3. SEO and content marketing take 3–6 months to gain traction." },
]

export default function DigitalMarketingPage() {
    const overviewRef = useReveal(); const statsRef = useReveal(); const servicesRef = useReveal()
    const processRef = useReveal(); const techRef = useReveal(); const faqRef = useReveal()

    return (
        <div className="sp-page">
            <PageHero
                breadcrumbs={[{ label: "Services", }, { label: "Digital Marketing" }]}
                pill="Digital Marketing"
                pillIcon={<FiTrendingUp />}
                title={<>Marketing That <span className="ph-gradient">Drives Real Revenue</span></>}
                subtitle="Google Ads, social media, email marketing, and content strategy — full-funnel digital marketing that turns ad spend into measurable business growth."
                tag="₹2Cr+ Ad Spend Managed · 4.2x ROAS"
            />

            <div className="sp-body">

                <div className="sp-overview-grid sp-anim" ref={overviewRef}>
                    <div className="sp-overview-text">
                        <h2 className="sp-overview-title">Grow Revenue, <span className="sp-hl">Not Just Traffic</span></h2>
                        <p className="sp-overview-para">Most digital agencies chase vanity metrics — likes, impressions, followers. We measure what matters: leads, conversions, and revenue. Every rupee you spend on marketing should come back multiplied.</p>
                        <p className="sp-overview-para">We manage full-funnel campaigns — from the first ad impression to the final sale — with data-driven optimisation at every step.</p>
                        <ul className="sp-checklist">
                            {["Transparent reporting — no hidden metrics", "Dedicated account manager for every client", "Weekly optimisation calls during first 90 days", "Performance-linked goals agreed upfront"].map(i => (
                                <li key={i}><span className="sp-check-icon">✓</span>{i}</li>
                            ))}
                        </ul>
                        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
                            <Link to="/contact" className="sp-btn-primary">Get a Free Marketing Audit <FiArrowRight /></Link>
                        </div>
                    </div>
                    <div className="sp-overview-visual">
                        <div className="sp-visual-box">
                            <FiTrendingUp className="sp-visual-icon" />
                            <img src={DmImg} alt="Digital Marketing" />
                            <span className="sp-visual-label">Digital Marketing</span>
                        </div>
                        <div className="sp-visual-badge sp-vb-1"><FiDollarSign style={{ color: "var(--sp-orange)" }} /> 4.2x Avg. ROAS</div>
                        <div className="sp-visual-badge sp-vb-2"><FiZap style={{ color: "var(--sp-orange)" }} /> Results from Week 1</div>
                    </div>
                </div>

                <div className="sp-stats-strip sp-anim" ref={statsRef}>
                    {stats.map((s, i) => (
                        <div key={s.lbl} className="sp-stat-card" style={{ "--delay": `${i * .08}s` }}>
                            <span className="sp-stat-val">{s.val}</span>
                            <span className="sp-stat-lbl">{s.lbl}</span>
                        </div>
                    ))}
                </div>

                <div>
                    <div className="sp-section-header">
                        <div className="sp-pill"><FiLayers /> Services</div>
                        <h2 className="sp-section-title">Digital Marketing <span className="sp-hl">Services</span></h2>
                        <p className="sp-section-sub">Full-funnel digital marketing — from awareness to conversion — across every major channel.</p>
                    </div>
                    <div className="sp-cards-grid sp-cols-3 sp-anim" ref={servicesRef}>
                        {services.map((s, i) => (
                            <div key={s.title} className="sp-card" style={{ "--delay": `${i * .08}s` }}>
                                <div className="sp-card-icon">{s.icon}</div>
                                <div className="sp-card-tag">{s.tag}</div>
                                <h3 className="sp-card-title">{s.title}</h3>
                                <p className="sp-card-desc">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <div className="sp-section-header sp-center">
                        <div className="sp-pill"><FiSettings /> Process</div>
                        <h2 className="sp-section-title">Our Marketing <span className="sp-hl">Process</span></h2>
                        <p className="sp-section-sub">A data-driven 6-step process that compounds results with every month of optimisation.</p>
                    </div>
                    <div className="sp-steps-grid sp-anim" ref={processRef}>
                        {process.map((p, i) => (
                            <div key={p.num} className="sp-step" style={{ "--delay": `${i * .08}s` }}>
                                <div className="sp-step-num"><span>{p.num}</span></div>
                                <div className="sp-step-title">{p.title}</div>
                                <div className="sp-step-desc">{p.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <div className="sp-section-header">
                        <div className="sp-pill"><FiCode /> Tools</div>
                        <h2 className="sp-section-title">Platforms We <span className="sp-hl">Use</span></h2>
                        <p className="sp-section-sub">Best-in-class platforms for paid advertising, email automation, analytics, and social media.</p>
                    </div>
                    <div className="sp-tech-grid sp-anim" ref={techRef}>
                        {techStack.map((t, i) => (
                            <div key={t.cat} className="sp-tech-card" style={{ "--delay": `${i * .08}s` }}>
                                <span className="sp-tech-cat">{t.cat}</span>
                                <div className="sp-tech-items">
                                    {t.items.map(item => <span key={item} className="sp-tech-item">{item}</span>)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <div className="sp-section-header">
                        <div className="sp-pill"><FiTrendingUp /> FAQ</div>
                        <h2 className="sp-section-title">Common <span className="sp-hl">Questions</span></h2>
                    </div>
                    <div className="sp-faq-list sp-anim" ref={faqRef}>
                        {faqs.map((f, i) => (
                            <div key={i} style={{ "--delay": `${i * .07}s` }}>
                                <FaqItem q={f.q} a={f.a} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="sp-cta sp-anim">
                    <h2 className="sp-cta-title">Ready to Grow Your Business Online?</h2>
                    <p className="sp-cta-sub">Get a free digital marketing audit and a channel strategy tailored to your goals and budget.</p>
                    <Link to="/contact" className="sp-btn-primary">Get Free Marketing Audit <FiArrowRight /></Link>
                </div>

            </div>
        </div>
    )
}