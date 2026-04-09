import useScrollFade from "../hooks/useScrollFade"
import "../Styles/Services3D.css"

export default function Services3D() {
    useScrollFade(".service-card")

    return (
        <section className="services-section">
            <h2>Our Services</h2>

            <div className="services-grid">
                <div className="service-card">
                    <h3>Web Development</h3>
                    <p>Modern & scalable apps.</p>
                </div>
                <div className="service-card">
                    <h3>SaaS Platforms</h3>
                    <p>Enterprise SaaS systems.</p>
                </div>
                <div className="service-card">
                    <h3>UI/UX Design</h3>
                    <p>Conversion-focused design.</p>
                </div>
            </div>
        </section>
    )
}
