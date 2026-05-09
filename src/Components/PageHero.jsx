import { Link } from "react-router-dom"
import { FiHome, FiChevronRight } from "react-icons/fi"
import { FaGithub, FaLinkedinIn, FaXTwitter, FaInstagram } from "react-icons/fa6"
import OrbitNav from "./OrbitNav"
import "../Styles/PageHero.css"

const SOCIALS = [
    { icon: <FaLinkedinIn />, href: "https://linkedin.com/company/Axsem", label: "LinkedIn" },
    { icon: <FaXTwitter />, href: "https://twitter.com/Axsem", label: "Twitter" },
    { icon: <FaGithub />, href: "https://github.com/Axsem", label: "GitHub" },
    { icon: <FaInstagram />, href: "https://instagram.com/Axsem", label: "Instagram" },
]

/* ─────────────────────────────────────────────────
   TITLE RENDERER — handles array of {text, gradient} objects
───────────────────────────────────────────────── */
function renderTitle(title) {
    if (!title) return null;

    if (Array.isArray(title)) {
        return title.map((part, i) => {
            if (part.gradient) {
                return <span key={i} className="ph-gradient">{part.text}</span>;
            }
            return <span key={i}>{part.text}</span>;
        });
    }

    return title;
}

/* ─────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────── */
export default function PageHero({ breadcrumbs = [], pill, pillIcon, title, subtitle, tag }) {

    return (
        <section className="ph-hero">
            <div className="ph-bg" aria-hidden="true">
                <div className="ph-orb ph-orb-1" /><div className="ph-orb ph-orb-2" />
                <div className="ph-orb ph-orb-3" /><div className="ph-grid" />
                <div className="ph-slash ph-slash-1" /><div className="ph-slash ph-slash-2" />
            </div>

            <div className="ph-layout">
                {/* ── LEFT ── */}
                <div className="ph-left">
                    <nav className="ph-breadcrumb" aria-label="Breadcrumb">
                        <Link to="/" className="ph-bc-item ph-bc-home" aria-label="Home">
                            <FiHome /><span>Home</span>
                        </Link>
                        {breadcrumbs.map((crumb, i) => (
                            <span key={i} className="ph-bc-group">
                                <FiChevronRight className="ph-bc-sep" />
                                {crumb.href && i < breadcrumbs.length - 1
                                    ? <Link to={crumb.href} className="ph-bc-item">{crumb.label}</Link>
                                    : <span className="ph-bc-item ph-bc-active">{crumb.label}</span>
                                }
                            </span>
                        ))}
                    </nav>

                    <div className="ph-content">
                        {pill && (
                            <div className="ph-pill">
                                {pillIcon && <span className="ph-pill-icon">{pillIcon}</span>}
                                {pill}
                            </div>
                        )}
                        <h1 className="ph-title">{renderTitle(title)}</h1>
                        {subtitle && <p className="ph-subtitle">{subtitle}</p>}
                        <div className="ph-bottom-row">
                            {tag && <span className="ph-tag">{tag}</span>}
                            <div className="ph-divider-line" />
                        </div>
                    </div>
                </div>

                {/* ── RIGHT ── */}
                <div className="ph-right">
                    <div className="ph-3d-wrap">
                        <OrbitNav />
                    </div>
                </div>
            </div>
        </section>
    )
}