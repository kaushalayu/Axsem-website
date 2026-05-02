import {
    FiAward,
    FiClock,
    FiHeadphones,
    FiShield,
    FiTrendingUp,
    FiUsers,
    FiArrowRight,
} from "react-icons/fi"
import "../Styles/WhyChoose.css"

const REASONS = [
    {
        icon: <FiAward />,
        title: "6+ Years of Proven Experience",
        short: "Real-world execution",
        desc:
            "80+ products delivered across industries. We help you avoid costly mistakes and build scalable software.",
        stat: "80+ Projects",
        image:
            "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1200",
    },
    {
        icon: <FiClock />,
        title: "On-Time Delivery",
        short: "Predictable timelines",
        desc:
            "Agile sprints with weekly demos ensure transparency and on-time project delivery.",
        stat: "99% On-Time",
        image:
            "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200",
    },
    {
        icon: <FiHeadphones />,
        title: "Post-Launch Support",
        short: "We stay with you",
        desc:
            "Dedicated support team for enhancements, bug fixes, and scaling after launch.",
        stat: "24/7 Support",
        image:
            "https://images.unsplash.com/photo-1581091870627-3d5c4b6c4b3c?q=80&w=1200",
    },
    {
        icon: <FiShield />,
        title: "100% Code Ownership",
        short: "No vendor lock-in",
        desc:
            "You own the full source code, database, and documentation. Your product, your control.",
        stat: "Full Ownership",
        image:
            "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=1200",
    },
    {
        icon: <FiTrendingUp />,
        title: "Results-Driven Approach",
        short: "Focused on ROI",
        desc:
            "We measure success by business growth, efficiency, and measurable outcomes.",
        stat: "3x Avg ROI",
        image:
            "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1200",
    },
    {
        icon: <FiUsers />,
        title: "Indian Business Experts",
        short: "Local market mastery",
        desc:
            "Deep expertise in GST, Razorpay, compliance, and Indian business workflows.",
        stat: "500+ Clients",
        image:
            "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200",
    },
]

export default function WhyChooseUs() {
    return (
        <section className="wcu-section">
            <div className="wcu-container">

                {/* Header */}
                <div className="wcu-header">
                    <div className="wcu-badge">
                        <span className="wcu-badge-dot"></span>
                        WHY CHOOSE US
                    </div>

                    <h2 className="wcu-title">
                        The Axsem <span>Difference</span>
                    </h2>

                    <p className="wcu-sub">
                        A technology partner trusted for quality, performance,
                        and long-term success.
                    </p>
                </div>

                {/* Cards */}
                <div className="wcu-grid">
                    {REASONS.map(r => (
                        <div key={r.title} className="wcu-card-wrap">

                            <div className="wcu-outside">
                                <h3>{typeof r.title === 'string' ? r.title : 'Untitled'}</h3>
                                <span>{typeof r.short === 'string' ? r.short : ''}</span>
                            </div>

                            <div className="wcu-card">
                                <div className="wcu-card-inner">

                                    <div className="wcu-card-front">
                                        <img src={r.image} alt={typeof r.title === 'string' ? r.title : 'Feature'} />
                                        <div className="wcu-front-overlay" />
                                    </div>

                                    <div className="wcu-card-back">
                                        <div className="wcu-back-icon">{r.icon}</div>
                                        <h4>{typeof r.title === 'string' ? r.title : 'Untitled'}</h4>
                                        <p>{typeof r.desc === 'string' ? r.desc : ''}</p>
                                        <div className="wcu-back-stat">{r.stat}</div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="wcu-bottom-card">
                    <div className="wcu-bottom-text">
                        <h3>Get a free consultation with our experts</h3>
                        <p>
                            Discuss your idea, get a technical roadmap,
                            and clear cost estimates — no obligation.
                        </p>
                    </div>

                    <a href="/contact" className="wcu-btn-primary">
                        Get Free Consultation <FiArrowRight />
                    </a>
                </div>

            </div>
        </section>
    )
}