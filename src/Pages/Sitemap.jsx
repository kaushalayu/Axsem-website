import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import PageHero from "../Components/PageHero"
import "../Styles/ServicePage.css"

function useReveal() {
    const ref = useRef(null)
    useEffect(() => {
        const el = ref.current; if (!el) return
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add("sp-revealed") }, { threshold: 0, rootMargin: "0px 0px -40px 0px" })
        obs.observe(el); return () => obs.disconnect()
    }, [])
    return ref
}

const siteSections = [
    {
        title: "Home",
        links: [
            { label: "Home", path: "/" },
        ]
    },
    {
        title: "About Us",
        links: [
            { label: "Company Overview", path: "/about/company" },
            { label: "Vision & Mission", path: "/about/vision" },
            { label: "Our Team", path: "/about/team" },
            { label: "Careers", path: "/about/careers" },
        ]
    },
    {
        title: "Services",
        links: [
            { label: "Web Development", path: "/services/web-development" },
            { label: "Mobile Apps", path: "/services/mobile-apps" },
            { label: "UI/UX Design", path: "/services/ui-ux" },
            { label: "Software Development", path: "/services/software-development" },
            { label: "Graphic Design", path: "/services/graphic-design" },
            { label: "Digital Marketing", path: "/services/digital-marketing" },
            { label: "IT Maintenance", path: "/services/it-maintenance" },
            { label: "SEO", path: "/services/seo" },
        ]
    },
    {
        title: "Products",
        links: [
            { label: "CRM Software", path: "/products/crm" },
            { label: "LMS System", path: "/products/lms" },
            { label: "E-Commerce", path: "/products/ecommerce" },
            { label: "Real Estate CRM", path: "/products/real-estate" },
            { label: "HR & Payroll", path: "/products/hr-payroll" },
            { label: "School Management", path: "/products/school-management" },
            { label: "Tour Booking", path: "/products/tour-booking" },
            { label: "AI Solutions", path: "/products/ai-solutions" },
        ]
    },
    {
        title: "Portfolio",
        links: [
            { label: "Our Projects", path: "/portfolio/project" },
            { label: "Our Clients", path: "/portfolio/clients" },
        ]
    },
    {
        title: "Resources",
        links: [
            { label: "Blog", path: "/blogs" },
            { label: "Contact Us", path: "/contact" },
        ]
    },
    {
        title: "Legal",
        links: [
            { label: "Privacy Policy", path: "/privacy" },
            { label: "Terms of Service", path: "/terms" },
        ]
    },
]

export default function SitemapPage() {
    const sectionRef = useReveal()

    return (
        <div className="sp-page">
            <PageHero
                breadcrumbs={[{ label: "Home", href: "/" }, { label: "Sitemap" }]}
                title={<>Site <span className="ph-gradient">Map</span></>}
                subtitle="Find all the pages on our website in one place."
            />
            <div className="sp-body">
                <div className="sp-section-header sp-center" ref={sectionRef}>
                    <div className="sp-pill">All Pages</div>
                    <h2 className="sp-section-title">Browse Our <span className="sp-hl">Website</span></h2>
                </div>

                <div className="sp-cards-grid sp-cols-2 sp-cols-md-1 sp-anim" style={{ gap: "40px" }}>
                    {siteSections.map((section, idx) => (
                        <div key={section.title} className="sp-card" style={{ 
                            "--delay": `${idx * 0.1}s`,
                            padding: "32px",
                            background: "var(--sp-card-bg, white)",
                            borderRadius: "12px",
                            boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
                        }}>
                            <h3 style={{ 
                                fontSize: "20px", 
                                fontWeight: "700", 
                                color: "var(--sp-orange)", 
                                marginBottom: "20px",
                                borderBottom: "2px solid var(--sp-orange)",
                                paddingBottom: "10px",
                                display: "inline-block"
                            }}>
                                {section.title}
                            </h3>
                            <ul style={{ 
                                listStyle: "none", 
                                padding: 0, 
                                margin: 0,
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                                gap: "12px"
                            }}>
                                {section.links.map((link) => (
                                    <li key={link.path}>
                                        <Link 
                                            to={link.path}
                                            style={{
                                                color: "var(--sp-text)",
                                                textDecoration: "none",
                                                fontSize: "15px",
                                                transition: "color 0.2s",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "8px"
                                            }}
                                            onMouseOver={(e) => e.target.style.color = "var(--sp-orange)"}
                                            onMouseOut={(e) => e.target.style.color = "var(--sp-text)"}
                                        >
                                            <span style={{ color: "var(--sp-orange)", fontSize: "12px" }}>→</span>
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="sp-cta sp-anim" style={{ marginTop: "60px" }}>
                    <h2 className="sp-cta-title">Can't Find What You're Looking For?</h2>
                    <p className="sp-cta-sub">We're here to help. Reach out and we'll point you in the right direction.</p>
                    <Link to="/contact" className="sp-btn-primary">Contact Us</Link>
                </div>
            </div>
        </div>
    )
}
