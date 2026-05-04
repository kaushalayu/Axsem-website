import { useState, useEffect, useRef } from "react"
import { usePageData } from "../hooks/usePageData"
import { Link } from "react-router-dom"
import {
  FiCode, FiLayers, FiSettings, FiShield, FiTrendingUp,
  FiCheckCircle, FiArrowRight, FiPlus, FiMonitor,
  FiDatabase, FiCloud, FiCpu, FiGitBranch, FiPackage
} from "react-icons/fi"
import PageHero from "../Components/PageHero"
import "../Styles/SoftwareDevelopment.css"
import SoftImg from "../assets/erp.jpeg"

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add("sp-revealed") },
      { threshold: 0, rootMargin: "0px 0px -40px 0px" }
    )
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return ref
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`sp-faq-item${open ? " sp-faq-open" : ""}`}>
      <button className="sp-faq-q" onClick={() => setOpen(!open)}>
        <span>{q}</span>
        <FiPlus className="sp-faq-icon" />
      </button>
      <div className="sp-faq-a">{a}</div>
    </div>
  )
}

const services = [
  { icon: <FiMonitor />, title: "Custom Web Applications", desc: "Scalable, secure web apps tailored to your exact business logic — from MVPs to enterprise-grade platforms.", tag: "Web" },
  { icon: <FiDatabase />, title: "ERP & CRM Systems", desc: "End-to-end business management systems that centralize operations, automate workflows, and give real-time visibility.", tag: "ERP" },
  { icon: <FiCloud />, title: "Cloud-Native Development", desc: "Applications built for AWS, GCP, or Azure from day one — elastic, distributed, and production-hardened.", tag: "Cloud" },
  { icon: <FiCpu />, title: "API Development & Integration", desc: "RESTful and GraphQL APIs that connect your products, third-party services, and data pipelines seamlessly.", tag: "API" },
  { icon: <FiGitBranch />, title: "Legacy System Modernisation", desc: "We migrate outdated codebases to modern stacks without disrupting your business operations.", tag: "Modernisation" },
  { icon: <FiPackage />, title: "SaaS Product Engineering", desc: "Multi-tenant SaaS products with subscription billing, role-based access, and CI/CD pipelines built to ship fast.", tag: "SaaS" },
]

const techStack = [
  { cat: "Frontend", items: ["React", "Next.js", "TypeScript", "Vue.js"] },
  { cat: "Backend", items: ["Node.js", "Django", "Laravel", "Go"] },
  { cat: "Database", items: ["PostgreSQL", "MongoDB", "Redis", "MySQL"] },
  { cat: "DevOps", items: ["Docker", "Kubernetes", "AWS", "CI/CD"] },
]

const process = [
  { num: "01", title: "Discovery", desc: "Requirements, stakeholder interviews, technical audit" },
  { num: "02", title: "Architecture", desc: "System design, DB schema, API contracts, tech stack" },
  { num: "03", title: "Sprints", desc: "2-week agile sprints with demos and client feedback" },
  { num: "04", title: "QA & Testing", desc: "Unit, integration, load & security testing" },
  { num: "05", title: "Deployment", desc: "CI/CD pipelines, infra setup, zero-downtime launch" },
  { num: "06", title: "Support", desc: "Post-launch monitoring, bug fixes, feature iterations" },
]

const stats = [
  { val: "80+", lbl: "Software Projects" },
  { val: "99%", lbl: "On-time Delivery" },
  { val: "6+", lbl: "Years Building" },
  { val: "0", lbl: "Critical Post-Launch Bugs avg." },
]

const faqs = [
  { q: "How long does a typical software project take?", a: "Depending on scope — an MVP takes 6–12 weeks, a mid-size web app 3–5 months, and enterprise platforms 6–12 months. We always define a clear timeline during discovery." },
  { q: "Do you work with clients outside India?", a: "Yes. We have delivered projects for clients in UK, UAE, and Southeast Asia. We work async-first and schedule overlapping meeting windows for all time zones." },
  { q: "Can you join an existing project mid-way?", a: "Absolutely. We do thorough code audits before onboarding, provide a clear assessment, and integrate into your existing team and workflow." },
  { q: "Do you provide source code and IP ownership?", a: "Yes — you own 100% of the source code, IP, and infrastructure. We hand over all credentials, repos, and documentation on project completion." },
  { q: "What engagement models do you offer?", a: "Fixed-price (for well-defined scopes), Time & Material (for evolving products), and Dedicated Team (monthly retainer with a dedicated dev team)." },
]

export default function SoftwareDevelopmentPage() {
  const pageData = usePageData("/services/software-development", { faqs, gallery: [{ url: SoftImg }] })
  
  const overviewRef = useReveal()
  const statsRef = useReveal()
  const servicesRef = useReveal()
  const processRef = useReveal()
  const techRef = useReveal()
  const faqRef = useReveal()

  const displayImage = pageData.gallery?.[0]?.url || SoftImg
  const displayFaqs = pageData.faqs
  const displayHero = pageData.hero || {}

  return (
    <div className="sp-page">
      <PageHero
        breadcrumbs={[{ label: "Services", }, { label: "Software Development" }]}
        pill="Software Development"
        pillIcon={<FiCode />}
        title={displayHero.title || <>Custom Software <span className="ph-gradient">Built to Scale</span></>}
        subtitle={displayHero.subtitle || "We engineer software that solves real problems — from MVPs to enterprise platforms. Clean architecture, agile execution, on-time delivery."}
        tag="80+ Projects Delivered"
      />

      <div className="sp-body">

        {/* OVERVIEW */}
        <div className="sp-overview-grid sp-anim" ref={overviewRef}>
          <div className="sp-overview-text">
            <h2 className="sp-overview-title">
              Software That Works<br />
              <span className="sp-hl">The Way You Think</span>
            </h2>
            <p className="sp-overview-para">
              Off-the-shelf software rarely fits. We build custom software that maps perfectly to your workflows, scales with your growth, and gives you a competitive edge that no generic tool can offer.
            </p>
            <p className="sp-overview-para">
              From greenfield MVPs to complex multi-tenant SaaS platforms, our engineering team brings both technical depth and product thinking to every engagement.
            </p>
            <ul className="sp-checklist">
              {["Clean, documented, handover-ready code", "Agile sprints with fortnightly demos", "Dedicated project manager on every project", "Full IP ownership transferred to you"].map(i => (
                <li key={i}><span className="sp-check-icon">✓</span>{i}</li>
              ))}
            </ul>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
              <Link to="/contact" className="sp-btn-primary">Start a Project <FiArrowRight /></Link>
            </div>
          </div>
          <div className="sp-overview-visual">
            <div className="sp-visual-box">
              <FiCode className="sp-visual-icon" />
              <img src={displayImage} alt="Software Development" />
              <span className="sp-visual-label">Software Development</span>
            </div>
            <div className="sp-visual-badge sp-vb-1"><FiCheckCircle style={{ color: "var(--sp-orange)" }} /> 99% On-time</div>
            <div className="sp-visual-badge sp-vb-2"><FiShield style={{ color: "var(--sp-orange)" }} /> Secure by Design</div>
          </div>
        </div>

        {/* STATS */}
        <div className="sp-stats-strip sp-anim" ref={statsRef}>
          {stats.map((s, i) => (
            <div key={s.lbl} className="sp-stat-card" style={{ "--delay": `${i * 0.08}s` }}>
              <span className="sp-stat-val">{s.val}</span>
              <span className="sp-stat-lbl">{s.lbl}</span>
            </div>
          ))}
        </div>

        {/* SERVICES */}
        <div>
          <div className="sp-section-header">
            <div className="sp-pill"><FiLayers /> What We Build</div>
            <h2 className="sp-section-title">Software Development <span className="sp-hl">Services</span></h2>
            <p className="sp-section-sub">From idea to production — every type of software product we specialise in.</p>
          </div>
          <div className="sp-cards-grid sp-cols-3 sp-anim" ref={servicesRef}>
            {services.map((s, i) => (
              <div key={s.title} className="sp-card" style={{ "--delay": `${i * 0.08}s` }}>
                <div className="sp-card-icon">{s.icon}</div>
                <div className="sp-card-tag">{s.tag}</div>
                <h3 className="sp-card-title">{s.title}</h3>
                <p className="sp-card-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* PROCESS */}
        <div>
          <div className="sp-section-header sp-center">
            <div className="sp-pill"><FiSettings /> How We Work</div>
            <h2 className="sp-section-title">Our Development <span className="sp-hl">Process</span></h2>
            <p className="sp-section-sub">A proven 6-step process that keeps projects on track and clients informed at every stage.</p>
          </div>
          <div className="sp-steps-grid sp-anim" ref={processRef}>
            {process.map((p, i) => (
              <div key={p.num} className="sp-step" style={{ "--delay": `${i * 0.08}s` }}>
                <div className="sp-step-num"><span>{p.num}</span></div>
                <div className="sp-step-title">{p.title}</div>
                <div className="sp-step-desc">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* TECH STACK */}
        <div>
          <div className="sp-section-header">
            <div className="sp-pill"><FiCpu /> Tech Stack</div>
            <h2 className="sp-section-title">Technologies We <span className="sp-hl">Use</span></h2>
            <p className="sp-section-sub">Modern, battle-tested technologies chosen for reliability and long-term maintainability.</p>
          </div>
          <div className="sp-tech-grid sp-anim" ref={techRef}>
            {techStack.map((t, i) => (
              <div key={t.cat} className="sp-tech-card" style={{ "--delay": `${i * 0.08}s` }}>
                <span className="sp-tech-cat">{t.cat}</span>
                <div className="sp-tech-items">
                  {t.items.map(item => <span key={item} className="sp-tech-item">{item}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div>
          <div className="sp-section-header">
            <div className="sp-pill"><FiTrendingUp /> FAQ</div>
            <h2 className="sp-section-title">Common <span className="sp-hl">Questions</span></h2>
          </div>
          <div className="sp-faq-list sp-anim" ref={faqRef}>
            {displayFaqs.map((f, i) => (
              <div key={i} style={{ "--delay": `${i * 0.07}s` }} className="sp-faq-item-wrap">
                <FaqItem q={f.q} a={f.a} />
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="sp-cta sp-anim">
          <h2 className="sp-cta-title">Ready to Build Something Great?</h2>
          <p className="sp-cta-sub">Tell us about your project and we'll get back within 24 hours with a free technical consultation.</p>
          <Link to="/contact" className="sp-btn-primary">Get a Free Consultation <FiArrowRight /></Link>
        </div>

      </div>
    </div>
  )
}