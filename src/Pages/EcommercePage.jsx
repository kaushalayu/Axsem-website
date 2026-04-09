import { useState, useEffect, useRef } from "react"
import { FiShoppingCart, FiPackage, FiTruck, FiCreditCard, FiTag, FiBarChart2, FiArrowRight, FiCheckCircle, FiPlus, FiZap } from "react-icons/fi"
import PageHero from "../Components/PageHero"
import ProductPricingSection from "../Components/ProductPricingSection"
import "../Styles/ServicePage.css"
import { Link } from "react-router-dom"
import EcomImg from "../assets/erp.jpeg"

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add("sp-revealed") }, { threshold: 0, rootMargin: "0px 0px -40px 0px" })
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return ref
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`sp-faq-item${open ? " sp-faq-open" : ""}`}>
      <button className="sp-faq-q" onClick={() => setOpen(!open)}><span>{q}</span><FiPlus className="sp-faq-icon" /></button>
      <div className="sp-faq-a">{a}</div>
    </div>
  )
}

const features = [
  { icon: <FiShoppingCart />, title: "Storefront Builder", desc: "Mobile-optimised storefronts with customisable themes — no coding required to launch and manage." },
  { icon: <FiPackage />, title: "Product & Inventory", desc: "Unlimited products, variants, SKUs, stock levels, and automatic low-stock alerts for your team." },
  { icon: <FiTruck />, title: "Orders & Fulfilment", desc: "Order management, packing slips, and one-click shipping label generation with courier partners." },
  { icon: <FiCreditCard />, title: "Payments", desc: "All Indian payment methods — UPI, cards, EMI, wallets, and BNPL via Razorpay and Cashfree." },
  { icon: <FiTruck />, title: "Shipping Integrations", desc: "Direct integrations with Shiprocket, Delhivery, BlueDart — real-time tracking for your buyers." },
  { icon: <FiTag />, title: "Marketing Tools", desc: "Discount codes, abandoned cart recovery, email campaigns, and WhatsApp order notifications built in." },
]

const techStack = [
  { cat: "Frontend", items: ["Next.js", "React"] },
  { cat: "Backend", items: ["Node.js", "PostgreSQL"] },
  { cat: "Payments", items: ["Razorpay", "Cashfree", "UPI"] },
  { cat: "Shipping", items: ["Shiprocket", "Delhivery", "BlueDart"] },
]

const steps = [
  { num: "01", title: "Store Setup", desc: "Configure store name, logo, custom domain, and theme" },
  { num: "02", title: "Products", desc: "Upload product catalogue with images and pricing" },
  { num: "03", title: "Payments", desc: "Connect Razorpay/Cashfree and test the checkout flow" },
  { num: "04", title: "Shipping", desc: "Set up delivery zones, rates, and courier integrations" },
  { num: "05", title: "Launch", desc: "Store goes live — start promoting and selling" },
  { num: "06", title: "Optimise", desc: "Analytics review and conversion rate optimisation" },
]

const stats = [
  { val: "100+", lbl: "Stores on ShopAxis" },
  { val: "7 days", lbl: "Average Launch Time" },
  { val: "₹0", lbl: "Transaction Fee" },
  { val: "3.2%", lbl: "Avg. Conversion Rate" },
]

const faqs = [
  { q: "Do I need technical skills to manage my store?", a: "No. The store admin is designed for non-technical users — add products, process orders, and track inventory without any coding." },
  { q: "Can I use my own custom domain?", a: "Yes. Connect your existing domain or buy a new one — fully custom domain with SSL included in all plans." },
  { q: "Which payment methods are supported?", a: "UPI, credit/debit cards, net banking, wallets (Paytm, PhonePe), EMI, and BNPL via Razorpay and Cashfree." },
  { q: "How does the Shiprocket integration work?", a: "Orders on your store auto-appear in Shiprocket. Book shipments, print labels, and track deliveries without leaving the dashboard." },
]

export default function EcommercePage() {
  const statsRef = useReveal()
  const overviewRef = useReveal()
  const featRef = useReveal()
  const stepsRef = useReveal()
  const techRef = useReveal()
  const faqRef = useReveal()

  return (
    <div className="sp-page">
      <PageHero
        breadcrumbs={[{ label: "Products", }, { label: "E-Commerce" }]}
        pill="E-Commerce Platform"
        title={<>Launch Your Store, Sell More,<br /><span className="ph-gradient">Grow Faster</span></>}
        subtitle="Storefront builder, inventory, orders, Razorpay payments, Shiprocket shipping, and marketing tools — launch your D2C store in 7 days."
        tag="100+ Stores · Zero Transaction Fee"
      />
      <div className="sp-body">

        <div className="sp-stats-strip sp-anim" ref={statsRef}>
          {stats.map((s, i) => (<div key={s.lbl} className="sp-stat-card" style={{ "--delay": `${i * 0.08}s` }}><span className="sp-stat-val">{s.val}</span><span className="sp-stat-lbl">{s.lbl}</span></div>))}
        </div>

        <div className="sp-overview-grid sp-anim" ref={overviewRef}>
          <div className="sp-overview-text">
            <h2 className="sp-overview-title">Your Own Store,<br /><span className="sp-hl">Zero Commission</span></h2>
            <p className="sp-overview-para">Stop paying 25–30% commission to Flipkart and Amazon. ShopAxis gives you a fully branded storefront, your own checkout, and direct payments to your account — with professional tools for inventory, shipping, and customer marketing built in.</p>
            <ul className="sp-checklist">
              {["Beautiful mobile-first storefront in 7 days", "Accept UPI, cards, EMI, and wallets via Razorpay", "Shiprocket and Delhivery shipping integration", "Abandoned cart recovery and WhatsApp notifications"].map(item => (<li key={item}><span className="sp-check-icon">✓</span>{item}</li>))}
            </ul>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
              <Link to="/contact" className="sp-btn-primary" style={{ background: "var(--sp-white)", color: "var(--sp-orange)", border: "1.5px solid var(--sp-orange)" }}>Launch Your Store Free <FiArrowRight /></Link>
              <Link to="/portfolio/project" className="sp-btn-primary" style={{ background: "var(--sp-white)", color: "var(--sp-orange)", border: "1.5px solid var(--sp-orange)" }}>View Projects <FiArrowRight /></Link>
            </div>
          </div>
          <div className="sp-overview-visual">
            <div className="sp-visual-box"><FiShoppingCart className="sp-visual-icon" /><img src={EcomImg} alt="E-Commerce" /><span className="sp-visual-label">E-Commerce Platform</span></div>
            <div className="sp-visual-badge sp-vb-1"><FiCheckCircle style={{ color: "var(--sp-orange)" }} /> Zero Commission</div>
            <div className="sp-visual-badge sp-vb-2"><FiZap style={{ color: "var(--sp-orange)" }} /> Live in 7 Days</div>
          </div>
        </div>

        <div>
          <div className="sp-section-header"><div className="sp-pill">Features</div><h2 className="sp-section-title">Everything Your Store <span className="sp-hl">Needs</span></h2><p className="sp-section-sub">Storefront to shipping — every e-commerce operation in one platform.</p></div>
          <div className="sp-cards-grid sp-cols-3 sp-anim" ref={featRef}>
            {features.map((f, i) => (<div key={f.title} className="sp-card" style={{ "--delay": `${i * 0.08}s` }}><div className="sp-card-icon">{f.icon}</div><h3 className="sp-card-title">{f.title}</h3><p className="sp-card-desc">{f.desc}</p></div>))}
          </div>
        </div>

        <div>
          <div className="sp-section-header sp-center"><div className="sp-pill">How It Works</div><h2 className="sp-section-title">Store <span className="sp-hl">Launch Process</span></h2><p className="sp-section-sub">From setup to first sale — most stores go live within 7 days.</p></div>
          <div className="sp-steps-grid sp-anim" ref={stepsRef}>
            {steps.map((s, i) => (<div key={s.num} className="sp-step" style={{ "--delay": `${i * 0.08}s` }}><div className="sp-step-num"><span>{s.num}</span></div><div className="sp-step-title">{s.title}</div><div className="sp-step-desc">{s.desc}</div></div>))}
          </div>
        </div>

        <div>
          <div className="sp-section-header"><div className="sp-pill">Tech Stack</div><h2 className="sp-section-title">Built With <span className="sp-hl">Modern Technology</span></h2></div>
          <div className="sp-tech-grid sp-anim" ref={techRef}>
            {techStack.map((t, i) => (<div key={t.cat} className="sp-tech-card" style={{ "--delay": `${i * 0.08}s` }}><span className="sp-tech-cat">{t.cat}</span><div className="sp-tech-items">{t.items.map(item => <span key={item} className="sp-tech-item">{item}</span>)}</div></div>))}
          </div>
        </div>

        <div>
          <div className="sp-section-header"><div className="sp-pill">FAQ</div><h2 className="sp-section-title">Common <span className="sp-hl">Questions</span></h2></div>
          <div className="sp-faq-list sp-anim" ref={faqRef}>
            {faqs.map((f, i) => (<div key={i} style={{ "--delay": `${i * 0.07}s` }}><FaqItem q={f.q} a={f.a} /></div>))}
          </div>
        </div>

        <div className="sp-cta sp-anim">
          <h2 className="sp-cta-title">Ready to Launch Your D2C Store?</h2>
          <p className="sp-cta-sub">Start free — no credit card needed. Your store can be live today.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/contact" className="sp-btn-primary">Launch My Store <FiArrowRight /></Link>
            <Link to="/portfolio/project" className="sp-btn-primary">View Our Work <FiArrowRight /></Link>
          </div>
        </div>

        <ProductPricingSection productRoute="/products/ecommerce" color="#f05a28" />

      </div>
    </div>
  )
}