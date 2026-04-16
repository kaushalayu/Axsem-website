import { useEffect, useRef, useState, useMemo } from "react"
import { FiArrowRight, FiCpu, FiCode, FiDatabase, FiCloud, FiSmartphone, FiTool, FiActivity, FiZap, FiLayers, FiBox } from "react-icons/fi"
import { api } from "../services/api"
import "../Styles/TechStack.css"

const DEFAULT_CATEGORIES = [
  { name: "Frontend", color: "#f05a28" },
  { name: "Mobile", color: "#6366f1" },
  { name: "Backend", color: "#10b981" },
  { name: "Database", color: "#8b5cf6" },
  { name: "Cloud", color: "#f59e0b" },
  { name: "DevOps", color: "#ec4899" },
]

const TECH_DEFAULTS = {
  Frontend: ["React", "Next.js", "Vue.js", "TypeScript", "Tailwind CSS"],
  Mobile: ["Flutter", "React Native", "Swift", "Kotlin"],
  Backend: ["Node.js", "Python", "Django", "Laravel", "Go"],
  Database: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Firebase"],
  Cloud: ["AWS", "GCP", "Azure"],
  DevOps: ["Docker", "Kubernetes", "GitHub CI/CD"],
}

const LOGO_MAP = {
  React: "R", "Next.js": "N", "Vue.js": "V", "TypeScript": "TS", "Tailwind CSS": "TW",
  Flutter: "F", "React Native": "RN", Swift: "S", Kotlin: "K",
  "Node.js": "N", Python: "PY", Django: "D", Laravel: "L", Go: "G",
  PostgreSQL: "PG", MySQL: "MY", MongoDB: "M", Redis: "R", Firebase: "FB",
  AWS: "AWS", GCP: "GCP", Azure: "AZ", Docker: "DK", Kubernetes: "K8", "GitHub CI/CD": "GH"
}

function TechLogo({ name, color, isActive }) {
  return (
    <div 
      className={`tech-logo-card ${isActive ? 'active' : ''}`}
      style={{ '--brand-color': color }}
    >
      <div className="tech-logo-icon" style={{ background: `${color}15`, color: color }}>
        {LOGO_MAP[name] || name[0]}
      </div>
      <span className="tech-logo-name">{name}</span>
    </div>
  )
}

export default function TechStackSection() {
  const [activeTab, setActiveTab] = useState("Frontend")
  const [techData, setTechData] = useState([])
  const [loading, setLoading] = useState(true)
  const sectionRef = useRef(null)

  useEffect(() => {
    api.getTechStack()
      .then(data => {
        if (data?.data) setTechData(data.data)
        else if (Array.isArray(data)) setTechData(data)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const categories = useMemo(() => {
    if (techData.length === 0) return DEFAULT_CATEGORIES
    const cats = {}
    techData.forEach(t => {
      const cat = t.category || 'Other'
      if (!cats[cat]) cats[cat] = { name: cat, color: t.color || '#666', techs: [] }
      cats[cat].techs.push({ name: t.name, color: t.color })
    })
    return Object.values(cats)
  }, [techData])

  const currentCategory = useMemo(() => 
    categories.find(c => c.name === activeTab) || categories[0]
  , [categories, activeTab])

  const currentTechs = useMemo(() => {
    const catData = categories.find(c => c.name === activeTab)
    if (catData?.techs?.length > 0) return catData.techs
    const defaultTechs = TECH_DEFAULTS[activeTab] || []
    return defaultTechs.map(name => ({ name, color: currentCategory?.color || '#666' }))
  }, [categories, activeTab, currentCategory])

  return (
    <section className="premium-tech-section" ref={sectionRef}>
      <div className="pts-bg-effects">
        <div className="pts-orb-1" />
        <div className="pts-orb-2" />
        <div className="pts-grid" />
      </div>

      <div className="pts-container">
        <div className="pts-header">
          <div className="pts-badge-premium">
            <FiZap size={14} /> Technologies We Use
          </div>
          <h2 className="pts-title">
            Powering Digital
            <span className="pts-title-accent"> Excellence</span>
          </h2>
          <p className="pts-subtitle">
            We leverage cutting-edge technologies to build scalable, 
            high-performance solutions that drive real business growth.
          </p>
        </div>

        <div className="pts-tabs-wrapper">
          <div className="pts-tabs">
            {categories.map((cat, idx) => (
              <button
                key={cat.name}
                className={`pts-tab ${activeTab === cat.name ? 'active' : ''}`}
                style={{ 
                  '--tab-color': cat.color,
                  '--tabIndex': idx
                }}
                onClick={() => setActiveTab(cat.name)}
              >
                <span className="pts-tab-name">{cat.name}</span>
                {activeTab === cat.name && <div className="pts-tab-bar" style={{ background: cat.color }} />}
              </button>
            ))}
          </div>
        </div>

        <div className="pts-grid-wrapper">
          <div className="pts-grid-premium">
            {loading ? (
              <>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="pts-skeleton" />
              ))}
              </>
            ) : (
              <>
              {currentTechs.map((tech, i) => (
                <TechLogo 
                  key={tech.name}
                  name={tech.name}
                  color={tech.color || currentCategory?.color || '#666'}
                  isActive={activeTab === currentCategory?.name}
                />
              ))}
              </>
            )}
          </div>
        </div>

        <div className="pts-stats-bar">
          <div className="pts-stat-box">
            <span className="pts-stat-icon"><FiLayers /></span>
            <div className="pts-stat-content">
              <span className="pts-stat-value">50+</span>
              <span className="pts-stat-label">Technologies</span>
            </div>
          </div>
          <div className="pts-stat-box">
            <span className="pts-stat-icon"><FiBox /></span>
            <div className="pts-stat-content">
              <span className="pts-stat-value">500+</span>
              <span className="pts-stat-label">Projects</span>
            </div>
          </div>
          <div className="pts-stat-box">
            <span className="pts-stat-icon"><FiCpu /></span>
            <div className="pts-stat-content">
              <span className="pts-stat-value">10+</span>
              <span className="pts-stat-label">Years Exp.</span>
            </div>
          </div>
        </div>

        <div className="pts-footer-cta">
          <a href="/contact" className="pts-btn-primary">
            Start Your Project <FiArrowRight />
          </a>
          <a href="/services/web-development" className="pts-btn-outline">
            Explore Services
          </a>
        </div>
      </div>

      <style>{`
        .premium-tech-section {
          position: relative;
          padding: 120px 20px;
          background: #0a0a0a;
          overflow: hidden;
        }
        .pts-bg-effects {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .pts-orb-1 {
          position: absolute;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(240,90,40,0.25) 0%, transparent 70%);
          top: -150px;
          right: -100px;
          filter: blur(60px);
        }
        .pts-orb-2 {
          position: absolute;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%);
          bottom: -100px;
          left: -100px;
          filter: blur(60px);
        }
        .pts-grid {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse at center, black 30%, transparent 70%);
        }
        .pts-container {
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        .pts-header {
          text-align: center;
          margin-bottom: 60px;
        }
        .pts-badge-premium {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 50px;
          color: #f05a28;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.5px;
          margin-bottom: 24px;
        }
        .pts-title {
          font-size: clamp(40px, 5vw, 64px);
          font-weight: 700;
          color: #fff;
          line-height: 1.1;
          margin-bottom: 20px;
        }
        .pts-title-accent {
          display: block;
          background: linear-gradient(135deg, #f05a28 0%, #ff8a5c 50%, #f05a28 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientMove 3s linear infinite;
        }
        @keyframes gradientMove {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        .pts-subtitle {
          font-size: 18px;
          color: #888;
          max-width: 520px;
          margin: 0 auto;
          line-height: 1.6;
        }
        .pts-tabs-wrapper {
          display: flex;
          justify-content: center;
          margin-bottom: 40px;
        }
        .pts-tabs {
          display: inline-flex;
          gap: 4px;
          padding: 6px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
        }
        .pts-tab {
          position: relative;
          padding: 14px 28px;
          background: transparent;
          border: none;
          border-radius: 10px;
          color: #666;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .pts-tab:hover {
          color: #999;
        }
        .pts-tab.active {
          color: #fff;
          background: rgba(255,255,255,0.05);
        }
        .pts-tab-bar {
          position: absolute;
          bottom: 4px;
          left: 50%;
          transform: translateX(-50%);
          width: 6px;
          height: 6px;
          border-radius: 50%;
          animation: pulse 2s ease infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: translateX(-50%) scale(1); }
          50% { opacity: 0.5; transform: translateX(-50%) scale(0.8); }
        }
        .pts-grid-wrapper {
          margin-bottom: 50px;
        }
        .pts-grid-premium {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .tech-logo-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          padding: 28px 16px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 20px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0;
          animation: fadeInUp 0.6s ease forwards;
        }
        .tech-logo-card:nth-child(1) { animation-delay: 0.05s; }
        .tech-logo-card:nth-child(2) { animation-delay: 0.1s; }
        .tech-logo-card:nth-child(3) { animation-delay: 0.15s; }
        .tech-logo-card:nth-child(4) { animation-delay: 0.2s; }
        .tech-logo-card:nth-child(5) { animation-delay: 0.25s; }
        .tech-logo-card:nth-child(6) { animation-delay: 0.3s; }
        .tech-logo-card:nth-child(7) { animation-delay: 0.35s; }
        .tech-logo-card:nth-child(8) { animation-delay: 0.4s; }
        .tech-logo-card:hover {
          background: rgba(255,255,255,0.04);
          border-color: var(--brand-color);
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }
        .tech-logo-card.active:hover {
          border-color: var(--brand-color);
          box-shadow: 0 0 30px rgba(var(--brand-color), 0.2);
        }
        .tech-logo-icon {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: 700;
        }
        .tech-logo-name {
          color: #fff;
          font-size: 14px;
          font-weight: 600;
        }
        .pts-skeleton {
          height: 160px;
          background: linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.05), rgba(255,255,255,0.02));
          border-radius: 20px;
          animation: shimmer 1.5s infinite;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .pts-stats-bar {
          display: flex;
          justify-content: center;
          gap: 40px;
          padding: 40px 60px;
          background: radial-gradient(ellipse at center, rgba(255,255,255,0.05) 0%, transparent 70%);
          border-radius: 24px;
          border: 1px solid rgba(255,255,255,0.05);
          margin-bottom: 40px;
        }
        .pts-stat-box {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .pts-stat-icon {
          width: 52px;
          height: 52px;
          background: rgba(255,255,255,0.05);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #f05a28;
          font-size: 22px;
        }
        .pts-stat-value {
          display: block;
          font-size: 36px;
          font-weight: 700;
          color: #fff;
          line-height: 1;
        }
        .pts-stat-label {
          font-size: 14px;
          color: #666;
        }
        .pts-footer-cta {
          display: flex;
          justify-content: center;
          gap: 16px;
        }
        .pts-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 18px 36px;
          background: linear-gradient(135deg, #f05a28, #e04d1f);
          color: #fff;
          border-radius: 14px;
          font-size: 16px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        .pts-btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 30px rgba(240,90,40,0.35);
        }
        .pts-btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 18px 36px;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.15);
          color: #fff;
          border-radius: 14px;
          font-size: 16px;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        .pts-btn-outline:hover {
          border-color: #f05a28;
          color: #f05a28;
        }
        @media (max-width: 968px) {
          .pts-grid-premium { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 768px) {
          .pts-grid-premium { grid-template-columns: repeat(2, 1fr); }
          .pts-tabs { overflow-x: auto; justify-content: flex-start; }
          .pts-tab { white-space: nowrap; padding: 12px 20px; }
          .pts-stats-bar { flex-wrap: wrap; gap: 24px; padding: 30px; }
          .pts-footer-cta { flex-direction: column; align-items: center; }
        }
        @media (max-width: 480px) {
          .pts-grid-premium { grid-template-columns: repeat(2, 1fr); }
          .pts-stat-box { flex: 1 1 40%; }
        }
      `}</style>
    </section>
  )
}