import "../Styles/CaseStudies.css"

export default function CaseStudies() {
    return (
        <section className="casestudies-section">
            <h2>Case Studies</h2>

            <div className="casestudies-grid">
                {[1, 2, 3].map((i) => (
                    <div className="case-card" key={i}>
                        <div className="case-card-image" />
                        <div className="case-card-body">
                            <h3>Enterprise Platform</h3>
                            <p>Increased performance by 3x with scalable architecture.</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
