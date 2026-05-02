import { useEffect, useRef, useState } from "react"
import { FiArrowUpRight, FiBox, FiGrid, FiLayers, FiShield, FiCpu, FiUsers, FiBook, FiShoppingBag, FiHome, FiMap, FiHeart, FiCheck } from "react-icons/fi"
import { api } from "../services/api"
import "../Styles/ProductSection.css"

const DEFAULT_PRODUCTS = [
  { id: 1, name: "TripAxis", tagline: "Tour & Travel Management", description: "Complete booking, itinerary & GST solution", color: "#f05a28", icon: "FiMap", category: "Business", tag: "50+ Agencies", path: "/products/tour-booking" },
  { id: 2, name: "AxsemAI", tagline: "AI Automation", description: "Smart automation & AI solutions", color: "#6366f1", icon: "FiCpu", category: "Business", tag: "30+ Automations", path: "/products/ai-solutions" },
  { id: 3, name: "SchoolAxis", tagline: "School Management", description: "Complete school ERP solution", color: "#10b981", icon: "FiBook", category: "Education", tag: "15k+ Students", path: "/products/school-management" },
  { id: 4, name: "PeopleAxis", tagline: "HR & Payroll", description: "Human resource management", color: "#8b5cf6", icon: "FiUsers", category: "Business", tag: "50k+ Employees", path: "/products/hr-payroll" },
  { id: 5, name: "LearnAxis", tagline: "Learning Management", description: "Online courses & assessments", color: "#ec4899", icon: "FiBook", category: "Education", tag: "50k+ Users", path: "/products/lms" },
  { id: 6, name: "ShopAxis", tagline: "E-Commerce Platform", description: "Multi-vendor marketplace", color: "#f59e0b", icon: "FiShoppingBag", category: "Business", tag: "100+ Stores", path: "/products/ecommerce" },
  { id: 7, name: "CRMAxis", tagline: "CRM for Sales", description: "Pipeline management", color: "#06b6d4", icon: "FiGrid", category: "Business", tag: "300+ Teams", path: "/products/crm" },
  { id: 8, name: "HotelAxis", tagline: "Property Management", description: "Hotel & booking system", color: "#84cc16", icon: "FiHome", category: "Business", tag: "40+ Hotels", path: "/products/hotel" },
]

const TABS = ["All", "Business", "Education"]

function ProductCard({ product, index }) {
  const IconComp = {
    FiMap: FiMap, FiCpu: FiCpu, FiBook: FiBook, FiUsers: FiUsers,
    FiShoppingBag: FiShoppingBag, FiGrid: FiGrid, FiHome: FiHome, FiHeart: FiHeart
  }[product.icon] || FiBox

  return (
    <a
      href={product.path}
      className="product-card"
      style={{
        '--p-color': product.color,
        '-- delay': `${index * 0.1}s`
      }}
    >
      <div className="p-card-glow" />
      <div className="p-card-header">
        <div className="p-icon-wrap" style={{ background: `${product.color}20` }}>
          <IconComp style={{ color: product.color }} />
        </div>
        <span className="p-tag" style={{ background: `${product.color}15`, color: product.color }}>{product.tag}</span>
      </div>
      <h3 className="p-name">{product.name}</h3>
      <p className="p-tagline">{product.tagline}</p>
      <p className="p-desc">{product.desc || product.description}</p>
      <div className="p-arrow-wrap">
        <FiArrowUpRight />
      </div>
    </a>
  )
}

export default function ProductsSection() {
  const [tab, setTab] = useState("All")
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const sectionRef = useRef(null)

  useEffect(() => {
    api.getProducts()
      .then(data => {
        if (data?.data) setProducts(data.data)
        else if (Array.isArray(data)) setProducts(data)
      })
      .catch(() => setProducts(DEFAULT_PRODUCTS))
      .finally(() => setLoading(false))
  }, [])

  const productsData = products.length > 0 ? products : DEFAULT_PRODUCTS
  const filtered = tab === "All" ? productsData : productsData.filter(p => p.category === tab)

  return (
    <section className="our-products-section" ref={sectionRef}>
      <div className="ops-bg">
        <div className="ops-gradient-1" />
        <div className="ops-gradient-2" />
        <div className="ops-dots" />
      </div>

      <div className="ops-container">
        <div className="ops-header">
          <span className="ops-badge">
            <FiBox /> Our Products
          </span>
          <h2 className="ops-title">
            Software Built to
            <span className="ops-highlight"> Scale</span>
          </h2>
          <p className="ops-subtitle">
            Industry-leading solutions designed to transform your business operations and drive measurable growth.
          </p>
        </div>

        <div className="ops-filters">
          {TABS.map(t => (
            <button
              key={t}
              className={`ops-filter ${tab === t ? 'ops-filter-active' : ''}`}
              onClick={() => setTab(t)}
            >
              <span>{t}</span>
              {tab === t && <FiCheck />}
            </button>
          ))}
        </div>

        <div className="ops-grid">
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="ops-skeleton" />
            ))
          ) : (
            filtered.map((p, i) => (
              <ProductCard key={p._id || p.id || i} product={p} index={i} />
            ))
          )}
        </div>

        <div className="ops-stats">
          <div className="ops-stat-item">
            <span className="ops-stat-num">12+</span>
            <span className="ops-stat-label">Software Products</span>
          </div>
          <div className="ops-stat-sep" />
          <div className="ops-stat-item">
            <span className="ops-stat-num">500+</span>
            <span className="ops-stat-label">Businesses</span>
          </div>
          <div className="ops-stat-sep" />
          <div className="ops-stat-item">
            <span className="ops-stat-num">99%</span>
            <span className="ops-stat-label">Retention</span>
          </div>
        </div>

        <div className="ops-cta">
          <a href="/contact" className="ops-btn-primary">
            Get Started <FiArrowUpRight />
          </a>
          <a href="/product" className="ops-btn-outline">
            View All Products
          </a>
        </div>
      </div>

      <style>{`
        .our-products-section {
          position: relative;
          padding: 100px 20px;
          background: var(--ops-bg, #f8f8ff);
          overflow: hidden;
          transition: background 0.4s;
        }
        body.dark .our-products-section {
          --ops-bg: #0f0f0f;
        }
        .ops-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .ops-gradient-1 {
          position: absolute;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(240,90,40,0.15) 0%, transparent 70%);
          top: -200px;
          left: -100px;
        }
        .ops-gradient-2 {
          position: absolute;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%);
          bottom: -150px;
          right: -100px;
        }
        .ops-dots {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(61,61,158,0.06) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        body.dark .ops-dots {
          background-image: radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px);
        }
        .ops-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        .ops-header {
          text-align: center;
          margin-bottom: 50px;
        }
        .ops-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: rgba(240,90,40,0.08);
          border: 1px solid rgba(240,90,40,0.2);
          border-radius: 50px;
          color: #f05a28;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 20px;
        }
        body.dark .ops-badge {
          background: rgba(255,255,255,0.04);
          border-color: rgba(255,255,255,0.08);
        }
        .ops-title {
          font-size: clamp(38px, 5vw, 58px);
          font-weight: 700;
          color: #1a1a2e;
          margin-bottom: 16px;
          line-height: 1.1;
          transition: color 0.4s;
        }
        body.dark .ops-title {
          color: #fff;
        }
        .ops-highlight {
          background: linear-gradient(135deg, #f05a28, #ff8a5c);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .ops-subtitle {
          font-size: 18px;
          color: #5a5a7a;
          max-width: 480px;
          margin: 0 auto;
          transition: color 0.4s;
        }
        body.dark .ops-subtitle {
          color: #888;
        }
        .ops-filters {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-bottom: 40px;
        }
        .ops-filter {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 12px 24px;
          background: rgba(61,61,158,0.04);
          border: 1px solid rgba(61,61,158,0.1);
          border-radius: 10px;
          color: #5a5a7a;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        body.dark .ops-filter {
          background: rgba(255,255,255,0.03);
          border-color: rgba(255,255,255,0.08);
          color: #888;
        }
        .ops-filter:hover {
          background: rgba(61,61,158,0.08);
          color: #1a1a2e;
        }
        body.dark .ops-filter:hover {
          background: rgba(255,255,255,0.06);
          color: #fff;
        }
        .ops-filter-active {
          background: rgba(240,90,40,0.1) !important;
          border-color: #f05a28 !important;
          color: #f05a28 !important;
        }
        .ops-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 50px;
        }
        .product-card {
          position: relative;
          padding: 28px;
          background: rgba(255,255,255,0.9);
          border: 1px solid rgba(61,61,158,0.1);
          border-radius: 20px;
          text-decoration: none;
          transition: all 0.4s ease;
          animation: fadeInUp 0.6s ease forwards;
          animation-delay: var(--delay);
          opacity: 0;
          display: flex;
          flex-direction: column;
          min-height: 260px;
          box-shadow: 0 4px 20px rgba(61,61,158,0.06);
        }
        body.dark .product-card {
          background: rgba(255,255,255,0.02);
          border-color: rgba(255,255,255,0.06);
          box-shadow: none;
        }
        .product-card:hover {
          background: #fff;
          border-color: var(--p-color);
          transform: translateY(-8px);
          box-shadow: 0 20px 56px rgba(61,61,158,0.12);
        }
        body.dark .product-card:hover {
          background: rgba(255,255,255,0.04);
          box-shadow: 0 20px 56px rgba(0,0,0,0.4);
        }
        .p-card-glow {
          position: absolute;
          inset: 0;
          border-radius: 20px;
          background: radial-gradient(circle at top right, var(--p-color), transparent 60%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .product-card:hover .p-card-glow {
          opacity: 0.08;
        }
        .p-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
        }
        .p-icon-wrap {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
        }
        .p-tag {
          font-size: 11px;
          font-weight: 600;
          padding: 6px 10px;
          border-radius: 8px;
        }
        .p-name {
          font-size: 22px;
          font-weight: 700;
          color: #1a1a2e;
          margin-bottom: 6px;
          transition: color 0.4s;
        }
        body.dark .p-name {
          color: #fff;
        }
        .p-tagline {
          font-size: 15px;
          color: #5a5a7a;
          margin-bottom: 8px;
          font-weight: 500;
          transition: color 0.4s;
        }
        body.dark .p-tagline {
          color: #ccc;
        }
        .p-desc {
          font-size: 13px;
          color: #9090b0;
          line-height: 1.5;
          margin-top: auto;
          transition: color 0.4s;
        }
        body.dark .p-desc {
          color: #777;
        }
        .p-arrow-wrap {
          position: absolute;
          bottom: 28px;
          right: 28px;
          width: 40px;
          height: 40px;
          background: var(--p-color);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          opacity: 0;
          transform: translate(-10px, 10px);
          transition: all 0.3s ease;
        }
        .product-card:hover .p-arrow-wrap {
          opacity: 1;
          transform: translate(0, 0);
        }
        .ops-skeleton {
          height: 260px;
          background: linear-gradient(90deg, rgba(61,61,158,0.04), rgba(61,61,158,0.08), rgba(61,61,158,0.04));
          border-radius: 20px;
          animation: shimmer 1.5s infinite;
          background-size: 200% 100%;
        }
        body.dark .ops-skeleton {
          background: linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.05), rgba(255,255,255,0.02));
          background-size: 200% 100%;
        }
        .ops-stats {
          display: flex;
          justify-content: center;
          gap: 60px;
          padding: 40px;
          background: rgba(61,61,158,0.03);
          border-radius: 20px;
          border: 1px solid rgba(61,61,158,0.08);
          margin-bottom: 40px;
          transition: background 0.4s, border-color 0.4s;
        }
        body.dark .ops-stats {
          background: rgba(255,255,255,0.02);
          border-color: rgba(255,255,255,0.04);
        }
        .ops-stat-item {
          text-align: center;
        }
        .ops-stat-num {
          display: block;
          font-size: 44px;
          font-weight: 700;
          color: #1a1a2e;
          transition: color 0.4s;
        }
        body.dark .ops-stat-num {
          color: #fff;
        }
        .ops-stat-label {
          color: #9090b0;
          font-size: 14px;
          transition: color 0.4s;
        }
        body.dark .ops-stat-label {
          color: #666;
        }
        .ops-stat-sep {
          width: 1px;
          background: rgba(61,61,158,0.1);
          transition: background 0.4s;
        }
        body.dark .ops-stat-sep {
          background: rgba(255,255,255,0.1);
        }
        .ops-cta {
          display: flex;
          justify-content: center;
          gap: 16px;
        }
        .ops-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 16px 32px;
          background: #f05a28;
          color: #fff;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        .ops-btn-primary:hover {
          background: #e04d1f;
          transform: translateY(-2px);
        }
        .ops-btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 16px 32px;
          background: transparent;
          border: 1px solid rgba(61,61,158,0.2);
          color: #1a1a2e;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        body.dark .ops-btn-outline {
          border-color: rgba(255,255,255,0.2);
          color: #fff;
        }
        .ops-btn-outline:hover {
          border-color: #f05a28;
          color: #f05a28;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @media (max-width: 1024px) {
          .ops-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .ops-grid { grid-template-columns: 1fr; }
          .ops-stats { gap: 30px; }
        }
        @media (max-width: 480px) {
          .ops-stats { flex-wrap: wrap; gap: 24px; }
          .ops-stat-sep { display: none; }
        }
      `}</style>
    </section>
  )
}