const DEPARTMENTS = ["All", "Leadership", "Engineering", "Design", "Marketing", "AI"]

export default function FilterBar({ active, onChange }) {
    return (
        <div className="tm-filter-wrap">
            <div className="tm-filter-bar">
                <div className="tm-filter-ink" />
                {DEPARTMENTS.map((dept) => (
                    <button
                        key={dept}
                        className={`tm-filter-btn ${active === dept ? "tm-filter-active" : ""}`}
                        onClick={() => onChange(dept)}
                    >
                        {dept}
                    </button>
                ))}
            </div>
        </div>
    )
}
