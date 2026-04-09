import { useEffect, useRef, useState } from "react"
import { FiCheck, FiArrowRight, FiZap, FiX, FiSend } from "react-icons/fi"
import { api } from "../services/api"
import { normalizeText } from "../utils/textUtils"
import "../Styles/Pricing.css"

const normalizePricing = (pricing) => {
  if (!pricing || typeof pricing !== 'object') return pricing;
  return {
    ...pricing,
    category: normalizeText(pricing.category),
    plans: pricing.plans ? pricing.plans.map(plan => ({
      ...plan,
      name: normalizeText(plan.name),
      desc: normalizeText(plan.desc),
      price: normalizeText(plan.price),
      per: normalizeText(plan.per),
      tag: normalizeText(plan.tag),
      cta: normalizeText(plan.cta),
      features: plan.features ? plan.features.map(f => ({
        ...f,
        text: normalizeText(f.text),
      })) : [],
    })) : [],
  };
};

function useReveal(threshold = 0.08) {
    const ref = useRef(null)
    useEffect(() => {
        const el = ref.current; if (!el) return
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) el.classList.add("revealed") },
            { threshold }
        )
        obs.observe(el); return () => obs.disconnect()
    }, [])
    return ref
}

const DEFAULT_PRICING = [
    {
        category: "Website",
        color: "#f05a28",
        plans: [
            {
                name: "Basic",
                price: "₹25,000",
                per: "one-time",
                tag: null,
                desc: "Everything you need to get your business online.",
                features: [
                    { text: "5 custom designed pages", yes: true },
                    { text: "Mobile responsive design", yes: true },
                    { text: "Contact form + WhatsApp button", yes: true },
                    { text: "Basic on-page SEO", yes: true },
                    { text: "Google Analytics setup", yes: true },
                    { text: "1 month free support", yes: true },
                    { text: "Blog / CMS", yes: false },
                    { text: "E-commerce / payments", yes: false },
                ],
                cta: "Get Basic",
                path: "/packages/website-basic",
                highlight: false,
            },
            {
                name: "Standard",
                price: "₹50,000",
                per: "one-time",
                tag: "Most Popular",
                desc: "Full business website with CMS and advanced SEO.",
                features: [
                    { text: "Up to 10 custom pages", yes: true },
                    { text: "Full CMS — edit anything", yes: true },
                    { text: "Advanced SEO + schema markup", yes: true },
                    { text: "GA4 + Search Console setup", yes: true },
                    { text: "Lead capture with CRM", yes: true },
                    { text: "3 months free support", yes: true },
                    { text: "Progressive Web App (PWA)", yes: true },
                    { text: "E-commerce / payments", yes: false },
                ],
                cta: "Get Standard",
                path: "/packages/website-standard",
                highlight: true,
            },
            {
                name: "Dynamic",
                price: "₹90,000",
                per: "one-time",
                tag: null,
                desc: "Full web application with e-commerce and bookings.",
                features: [
                    { text: "Unlimited pages", yes: true },
                    { text: "E-commerce + payment gateway", yes: true },
                    { text: "Booking / appointment system", yes: true },
                    { text: "Multi-role user accounts", yes: true },
                    { text: "Admin dashboard", yes: true },
                    { text: "6 months free support", yes: true },
                    { text: "Third-party integrations", yes: true },
                    { text: "Cloud deployment on AWS", yes: true },
                ],
                cta: "Get Dynamic",
                path: "/packages/website-dynamic",
                highlight: false,
            },
        ],
    },
    {
        category: "Software",
        color: "#3d3d9e",
        plans: [
            {
                name: "Basic",
                price: "₹50,000",
                per: "one-time",
                tag: null,
                desc: "One well-built core module for your business.",
                features: [
                    { text: "1 custom module", yes: true },
                    { text: "Role-based user access", yes: true },
                    { text: "Admin panel + dashboard", yes: true },
                    { text: "Reports & CSV export", yes: true },
                    { text: "REST API included", yes: true },
                    { text: "2 months support", yes: true },
                    { text: "Payment gateway", yes: false },
                    { text: "Multi-module platform", yes: false },
                ],
                cta: "Get Basic",
                path: "/packages/basic-software",
                highlight: false,
            },
            {
                name: "Premium",
                price: "₹2,00,000",
                per: "one-time",
                tag: "Full Platform",
                desc: "Multi-module enterprise platform for scale.",
                features: [
                    { text: "Multi-module platform", yes: true },
                    { text: "Multi-role & multi-branch", yes: true },
                    { text: "Payment gateway integration", yes: true },
                    { text: "Third-party API integrations", yes: true },
                    { text: "AWS/GCP cloud deployment", yes: true },
                    { text: "CI/CD + automated backups", yes: true },
                    { text: "Security audit + compliance", yes: true },
                    { text: "6 months dedicated support", yes: true },
                ],
                cta: "Get Premium",
                path: "/packages/premium-software",
                highlight: true,
            },
            {
                name: "Enterprise",
                price: "Custom",
                per: "quote on request",
                tag: null,
                desc: "Large-scale platforms with AI integrations.",
                features: [
                    { text: "Everything in Premium", yes: true },
                    { text: "AI / ML integrations", yes: true },
                    { text: "Multi-tenant SaaS architecture", yes: true },
                    { text: "Dedicated project manager", yes: true },
                    { text: "12 months support & AMC", yes: true },
                    { text: "On-site training sessions", yes: true },
                    { text: "Performance SLA guarantee", yes: true },
                    { text: "Priority 24/7 support", yes: true },
                ],
                cta: "Get Quote",
                path: "/contact",
                highlight: false,
            },
        ],
    },
    {
        category: "SEO",
        color: "#0e9e6e",
        plans: [
            {
                name: "Basic SEO",
                price: "₹15,000",
                per: "per month",
                tag: null,
                desc: "Solid SEO foundation for your business.",
                features: [
                    { text: "10 keywords tracked", yes: true },
                    { text: "Technical SEO audit", yes: true },
                    { text: "On-page SEO (10 pages/mo)", yes: true },
                    { text: "Google Business Profile", yes: true },
                    { text: "5 backlinks per month", yes: true },
                    { text: "Monthly ranking report", yes: true },
                    { text: "Blog content writing", yes: false },
                    { text: "15+ backlinks / month", yes: false },
                ],
                cta: "Start Basic SEO",
                path: "/packages/seo-basic",
                highlight: false,
            },
            {
                name: "Advanced SEO",
                price: "₹35,000",
                per: "per month",
                tag: "Best Results",
                desc: "Full-spectrum SEO with weekly updates.",
                features: [
                    { text: "25+ keywords tracked", yes: true },
                    { text: "Full technical SEO", yes: true },
                    { text: "4 SEO blog posts per month", yes: true },
                    { text: "15+ backlinks per month", yes: true },
                    { text: "Core Web Vitals pass", yes: true },
                    { text: "Competitor gap analysis", yes: true },
                    { text: "Weekly rank updates", yes: true },
                    { text: "Dedicated SEO manager", yes: true },
                ],
                cta: "Start Advanced SEO",
                path: "/packages/seo-advanced",
                highlight: true,
            },
            {
                name: "Local SEO",
                price: "₹8,000",
                per: "per month",
                tag: null,
                desc: "Google Maps and local citations.",
                features: [
                    { text: "Google Business Profile", yes: true },
                    { text: "5 local keywords", yes: true },
                    { text: "Local citations (10/mo)", yes: true },
                    { text: "Review generation strategy", yes: true },
                    { text: "Map pack ranking focus", yes: true },
                    { text: "Monthly local report", yes: true },
                    { text: "Blog content", yes: false },
                    { text: "National keyword targeting", yes: false },
                ],
                cta: "Start Local SEO",
                path: "/contact",
                highlight: false,
            },
        ],
    },
    {
        category: "Social Media",
        color: "#e63b2a",
        plans: [
            {
                name: "Starter",
                price: "₹12,000",
                per: "per month",
                tag: null,
                desc: "2 platforms managed with posts and reels.",
                features: [
                    { text: "2 platforms (Insta + FB)", yes: true },
                    { text: "12 branded posts/month", yes: true },
                    { text: "2 reels per month", yes: true },
                    { text: "Content calendar", yes: true },
                    { text: "Community management", yes: true },
                    { text: "Monthly analytics report", yes: true },
                    { text: "Ad campaign management", yes: false },
                    { text: "LinkedIn + YouTube Shorts", yes: false },
                ],
                cta: "Start Starter",
                path: "/packages/social-media",
                highlight: false,
            },
            {
                name: "Growth",
                price: "₹22,000",
                per: "per month",
                tag: "Most Popular",
                desc: "3 platforms with more content and ads.",
                features: [
                    { text: "3 platforms", yes: true },
                    { text: "20 branded posts/month", yes: true },
                    { text: "4 reels per month", yes: true },
                    { text: "Ad creative setup (no spend)", yes: true },
                    { text: "Story designs", yes: true },
                    { text: "Competitor analysis", yes: true },
                    { text: "Monthly strategy call", yes: true },
                    { text: "Paid ad management", yes: false },
                ],
                cta: "Start Growth",
                path: "/packages/social-media",
                highlight: true,
            },
            {
                name: "Pro",
                price: "₹40,000",
                per: "per month",
                tag: null,
                desc: "All platforms with paid ad management.",
                features: [
                    { text: "All platforms", yes: true },
                    { text: "30 branded posts/month", yes: true },
                    { text: "8 reels per month", yes: true },
                    { text: "Paid ad management (₹10k+ spend)", yes: true },
                    { text: "Influencer coordination", yes: true },
                    { text: "Bi-weekly strategy calls", yes: true },
                    { text: "Dedicated social manager", yes: true },
                    { text: "YouTube Shorts included", yes: true },
                ],
                cta: "Start Pro",
                path: "/packages/social-media",
                highlight: false,
            },
        ],
    },
    {
        category: "Design",
        color: "#6b3fa0",
        plans: [
            {
                name: "Logo Design",
                price: "₹10,000",
                per: "one-time",
                tag: null,
                desc: "3 unique logo concepts with all formats.",
                features: [
                    { text: "3 logo concepts", yes: true },
                    { text: "Unlimited revisions", yes: true },
                    { text: "All formats (AI, SVG, PNG, PDF)", yes: true },
                    { text: "Light + dark versions", yes: true },
                    { text: "Favicon + app icon", yes: true },
                    { text: "Brand colour guide", yes: true },
                    { text: "Full brand style guide", yes: false },
                    { text: "Stationery design", yes: false },
                ],
                cta: "Start Logo",
                path: "/packages/graphic-logo",
                highlight: false,
            },
            {
                name: "Brand Identity",
                price: "₹35,000",
                per: "one-time",
                tag: "Complete Brand",
                desc: "Full brand package with style guide.",
                features: [
                    { text: "5 logo concepts", yes: true },
                    { text: "50+ page brand style guide", yes: true },
                    { text: "Colour + typography system", yes: true },
                    { text: "Business card + letterhead", yes: true },
                    { text: "Envelope + email signature", yes: true },
                    { text: "10 social media templates", yes: true },
                    { text: "Brand voice guidelines", yes: true },
                    { text: "All source files (AI, Figma)", yes: true },
                ],
                cta: "Start Branding",
                path: "/packages/graphic-branding",
                highlight: true,
            },
            {
                name: "Print Bundle",
                price: "₹18,000",
                per: "one-time",
                tag: null,
                desc: "Complete print collateral package.",
                features: [
                    { text: "Business card (front + back)", yes: true },
                    { text: "A4 letterhead", yes: true },
                    { text: "Tri-fold brochure", yes: true },
                    { text: "Roll-up standee", yes: true },
                    { text: "A5 flyer", yes: true },
                    { text: "Print-ready PDFs (CMYK 300dpi)", yes: true },
                    { text: "Unlimited revisions", yes: true },
                    { text: "Source files included", yes: true },
                ],
                cta: "Start Print",
                path: "/packages/graphic-print",
                highlight: false,
            },
        ],
    },
]

function PlanCard({ plan, accent, i }) {
    const ref = useRef(null)
    useEffect(() => {
        const el = ref.current; if (!el) return
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) el.classList.add("pr-card-in") },
            { threshold: 0.06 }
        )
        obs.observe(el); return () => obs.disconnect()
    }, [])

    const isLeft = i === 0
    const isMiddle = i === 1

    return (
        <div
            ref={ref}
            className={`pr-card${plan.highlight ? " pr-card-hl" : ""}${isLeft ? " pr-card-left" : ""}${isMiddle ? " pr-card-middle" : ""}`}
            style={{ "--accent": accent, "--delay": `${i * 0.1}s` }}
        >
            {plan.tag && (
                <div className="pr-badge">
                    <FiZap /> {plan.tag}
                </div>
            )}

            <div className="pr-card-top">
                <div className="pr-plan-name">{typeof plan.name === 'string' ? plan.name : 'Plan'}</div>
                <div className="pr-price-row">
                    <span className="pr-price">{typeof plan.price === 'string' ? plan.price : ''}</span>
                </div>
                <div className="pr-per">{typeof plan.per === 'string' ? plan.per : ''}</div>
                <p className="pr-desc">{typeof plan.desc === 'string' ? plan.desc : ''}</p>
            </div>

            <a href={plan.path} className="pr-cta-btn">
                <span>{plan.cta} <FiArrowRight /></span>
            </a>

            <div className="pr-divider" />

            <ul className="pr-features">
                {plan.features && plan.features.map((f, idx) => {
                    const featureText = typeof f.text === 'string' ? f.text : '';
                    return (
                        <li key={featureText || idx} className={`pr-feat${f.yes ? "" : " pr-feat-no"}`}>
                            <span className={`pr-feat-icon${f.yes ? "" : " pr-feat-icon-no"}`}>
                                {f.yes ? <FiCheck /> : <FiX />}
                            </span>
                            {featureText}
                        </li>
                    );
                })}
            </ul>
            <div className="pr-fly-plane">
                <a href="tel:+917860291285" aria-label="Call Now">
                    <FiSend />
                </a>
            </div>
        </div>
    )
}

export default function PricingSection() {
    const [pricingData, setPricingData] = useState(DEFAULT_PRICING)
    const [activeTab, setActiveTab] = useState("Website")
    const [loading, setLoading] = useState(true)
    const headerRef = useReveal()
    const tabsRef = useReveal(0.05)
    const bottomRef = useReveal(0.1)

    useEffect(() => {
        const fetchPricing = async () => {
            try {
                const data = await api.getPricing()
                if (Array.isArray(data) && data.length > 0) {
                    const normalized = data.map(normalizePricing)
                    setPricingData(normalized)
                    setActiveTab(normalized[0].category)
                }
            } catch (error) {
                console.error('Error fetching pricing:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchPricing()
    }, [])

    const current = pricingData.find(p => p.category === activeTab) || pricingData[0]

    return (
        <section className="pr-section">
            <div className="pr-bg" aria-hidden>
                <div className="pr-orb pr-orb-1" style={{ "--c": current?.color || "#f05a28" }} />
                <div className="pr-orb pr-orb-2" />
                <div className="pr-grid-overlay" />
            </div>

            <div className="pr-container">

                <div className="pr-header" ref={headerRef}>
                    <div className="pr-eyebrow">
                        <span className="pr-dot" />
                        Transparent Pricing
                    </div>
                    <h2 className="pr-heading">
                        Simple Pricing,<br />
                        <span className="pr-heading-hl">No Hidden Costs</span>
                    </h2>
                    <p className="pr-subheading">
                        Fixed pricing on every project. You know exactly what you're paying before we start —
                        no surprises, no scope creep charges.
                    </p>
                </div>

                <div className="pr-tabs" ref={tabsRef}>
                    {pricingData.map(tab => (
                        <button
                            key={typeof tab.category === 'string' ? tab.category : 'tab'}
                            className={`pr-tab${activeTab === tab.category ? " pr-tab-active" : ""}`}
                            style={{ "--accent": tab.color }}
                            onClick={() => setActiveTab(typeof tab.category === 'string' ? tab.category : 'tab')}
                        >
                            <span>{typeof tab.category === 'string' ? tab.category : 'Tab'}</span>
                        </button>
                    ))}
                </div>

                <div className="pr-cards-grid" key={activeTab}>
                    {current?.plans?.map((plan, i) => (
                        <PlanCard key={plan.name} plan={plan} accent={current.color} i={i} />
                    ))}
                </div>

                <div className="pr-trust" ref={bottomRef}>
                    {[
                        { icon: "🔒", text: "Fixed-price contracts — no surprise invoices" },
                        { icon: "📄", text: "Detailed scope document before we start" },
                        { icon: "🔄", text: "Unlimited revisions until you're 100% happy" },
                        { icon: "🏦", text: "Full source code ownership on delivery" },
                    ].map((t, i) => (
                        <div key={t.text} className="pr-trust-item" style={{ "--delay": `${i * 0.07}s` }}>
                            <span className="pr-trust-emoji">{t.icon}</span>
                            <span className="pr-trust-text">{t.text}</span>
                        </div>
                    ))}
                </div>

                <div className="pr-cta-row">
                    <div className="pr-cta-text">
                        <h3>Not sure which package fits you?</h3>
                        <p>Tell us your requirements — we'll recommend the right package and give you a detailed quote in 24 hours.</p>
                    </div>
                    <div className="pr-cta-btns">
                        <a href="/contact" className="pr-btn-primary">Get a Custom Quote <FiArrowRight /></a>
                        <a href="/packages/website-basic" className="pr-btn-outline">See All Packages <FiArrowRight /></a>
                    </div>
                </div>

            </div>
        </section>
    )
}
