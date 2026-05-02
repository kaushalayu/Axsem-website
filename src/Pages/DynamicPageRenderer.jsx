import { useState, useEffect, useMemo } from "react"
import { useParams, Link, useLocation } from "react-router-dom"
import {
  FiArrowRight, FiCheck, FiStar, FiUsers, FiBarChart2, FiHelpCircle,
  FiImage, FiFileText, FiExternalLink, FiCreditCard, FiChevronRight
} from "react-icons/fi"
import PageHero from "../Components/PageHero"
import PageLoader from "../Components/PageLoader"
import { api } from "../services/api"

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const SECTION_RENDERERS = {
  features: FeaturesSection,
  stats: StatsSection,
  testimonials: TestimonialsSection,
  faq: FAQSection,
  gallery: GallerySection,
  content: ContentSection,
  cta: CTASection,
  pricing: PricingSection
}

function FeaturesSection({ title, content }) {
  const items = content?.items || []
  return (
    <section className="features-section">
      <div className="container">
        {title && <h2 className="section-title">{title}</h2>}
        <div className="features-grid">
          {items.length > 0 ? items.map((item, i) => (
            <div key={i} className="feature-card">
              <div className="feature-icon">{item.icon || <FiStar />}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          )) : (
            [1, 2, 3].map(i => (
              <div key={i} className="feature-card">
                <div className="feature-icon"><FiStar /></div>
                <h3>Feature {i}</h3>
                <p>Add your feature description from the page builder</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}

function StatsSection({ title, content }) {
  const stats = content?.items || [
    { metric: "500+", label: "Projects Completed" },
    { metric: "50+", label: "Team Members" },
    { metric: "98%", label: "Client Satisfaction" },
    { metric: "10+", label: "Years Experience" }
  ]
  return (
    <section className="stats-section">
      <div className="container">
        {title && <h2 className="section-title">{title}</h2>}
        <div className="stats-grid">
          {stats.map((stat, i) => (
            <div key={i} className="stat-card">
              <span className="stat-number">{stat.metric}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialsSection({ title }) {
  const [testimonials, setTestimonials] = useState([])
  
  useEffect(() => {
    api.getTestimonials()
      .then(data => setTestimonials(data || []))
      .catch(() => setTestimonials([]))
  }, [])
  
  if (testimonials.length === 0) return null
  
  return (
    <section className="testimonials-section">
      <div className="container">
        {title && <h2 className="section-title">{title}</h2>}
        <div className="testimonials-grid">
          {testimonials.slice(0, 3).map((t, i) => (
            <div key={i} className="testimonial-card">
              <div className="testimonial-stars">
                {[...Array(t.rating || 5)].map((_, j) => <FiStar key={j} />)}
              </div>
              <p>{t.review}</p>
              <div className="testimonial-author">
                <strong>{t.name}</strong>
                <span>{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQSection({ title, content }) {
  const faqs = content?.items || []
  const [openIndex, setOpenIndex] = useState(null)
  
  const defaultFAQs = [
    { question: "What is your development process?", answer: "We follow an agile development process with regular deliverables and feedback loops." },
    { question: "How long does it take to build a project?", answer: "Timeline depends on project complexity. We provide estimates after detailed scoping." },
    { question: "Do you provide post-launch support?", answer: "Yes, we offer comprehensive post-launch support and maintenance packages." }
  ]
  
  const displayFAQs = faqs.length > 0 ? faqs : defaultFAQs
  
  return (
    <section className="faq-section">
      <div className="container">
        {title && <h2 className="section-title">{title}</h2>}
        <div className="faq-list">
          {displayFAQs.map((faq, i) => (
            <div key={i} className={`faq-item ${openIndex === i ? 'open' : ''}`}>
              <button className="faq-question" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                {faq.question}
                <FiChevronRight />
              </button>
              {openIndex === i && <div className="faq-answer">{faq.answer}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function GallerySection({ title, content }) {
  const images = content?.items || []
  const placeholders = [
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600',
    'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600'
  ]
  
  return (
    <section className="gallery-section">
      <div className="container">
        {title && <h2 className="section-title">{title}</h2>}
        <div className="gallery-grid">
          {images.length > 0 ? images.map((img, i) => (
            <div key={i} className="gallery-item">
              <img src={img.url || img} alt={img.alt || `Gallery ${i + 1}`} />
            </div>
          )) : placeholders.map((src, i) => (
            <div key={i} className="gallery-item">
              <img src={src} alt={`Gallery ${i + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContentSection({ title, content }) {
  return (
    <section className="content-section">
      <div className="container">
        {title && <h2 className="section-title">{title}</h2>}
        <div className="content-block" dangerouslySetInnerHTML={{ __html: content?.description || '' }} />
      </div>
    </section>
  )
}

function CTASection({ title }) {
  return (
    <section className="cta-section">
      <div className="container">
        {title && <h2 className="cta-title">{title}</h2>}
        <Link to="/contact" className="cta-button">
          Get Started <FiArrowRight />
        </Link>
      </div>
    </section>
  )
}

function PricingSection({ title }) {
  return (
    <section className="pricing-section">
      <div className="container">
        {title && <h2 className="section-title">{title}</h2>}
        <div className="pricing-grid">
          <div className="pricing-card">
            <h3>Basic</h3>
            <div className="price"><span>₹</span>49,999</div>
            <ul>
              <li><FiCheck /> Custom Design</li>
              <li><FiCheck /> 5 Pages</li>
              <li><FiCheck /> Contact Form</li>
              <li><FiCheck /> Mobile Responsive</li>
            </ul>
            <Link to="/contact" className="pricing-btn">Get Started</Link>
          </div>
          <div className="pricing-card featured">
            <h3>Professional</h3>
            <div className="price"><span>₹</span>99,999</div>
            <ul>
              <li><FiCheck /> Everything in Basic</li>
              <li><FiCheck /> 15 Pages</li>
              <li><FiCheck /> CMS Integration</li>
              <li><FiCheck /> SEO Setup</li>
            </ul>
            <Link to="/contact" className="pricing-btn">Get Started</Link>
          </div>
          <div className="pricing-card">
            <h3>Enterprise</h3>
            <div className="price"><span>₹</span>2,49,999</div>
            <ul>
              <li><FiCheck /> Unlimited Pages</li>
              <li><FiCheck /> Custom Features</li>
              <li><FiCheck /> API Integration</li>
              <li><FiCheck /> Priority Support</li>
            </ul>
            <Link to="/contact" className="pricing-btn">Get Started</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function DynamicPageRenderer() {
  const location = useLocation()
  const [page, setPage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPage = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const path = location.pathname
        const response = await fetch(`${API_URL}/pages/slug${path}`)
        
        if (!response.ok) {
          throw new Error('Page not found')
        }
        
        const data = await response.json()
        setPage(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    
    fetchPage()
  }, [location.pathname])

  useEffect(() => {
    if (page?.seo?.title) {
      document.title = page.seo.title
    }
    if (page?.seo?.description) {
      const metaDesc = document.querySelector('meta[name="description"]')
      if (metaDesc) metaDesc.setAttribute('content', page.seo.description)
    }
  }, [page])

  const sortedSections = useMemo(() => {
    if (!page?.sections) return []
    return [...page.sections]
      .filter(s => s.enabled)
      .sort((a, b) => a.order - b.order)
  }, [page?.sections])

  if (loading) {
    return <PageLoader />
  }

  if (error || !page) {
    return (
      <div className="dynamic-page-error">
        <div className="error-content">
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>The page you're looking for doesn't exist or hasn't been published.</p>
          <Link to="/" className="error-btn">Go Home</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="dynamic-page">
      {page.hero?.enabled && (
        <PageHero
          title={page.hero.heading || page.title}
          subtitle={page.hero.subheading}
          ctaText={page.hero.ctaText}
          ctaLink={page.hero.ctaLink}
          backgroundImage={page.hero.backgroundImage}
        />
      )}

      {sortedSections.map((section, index) => {
        const SectionComponent = SECTION_RENDERERS[section.type]
        if (!SectionComponent) return null
        
        return (
          <SectionComponent
            key={index}
            title={section.title}
            content={section.content}
          />
        )
      })}

      {page.content?.body && (
        <section className="content-body-section">
          <div className="container">
            <div className="content-body" dangerouslySetInnerHTML={{ __html: page.content.body }} />
          </div>
        </section>
      )}

      <style>{`
        .dynamic-page { padding-top: 80px; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        .section-title { font-size: 2.5rem; font-weight: 700; text-align: center; margin-bottom: 40px; color: #1a1a2e; }

        .features-section { padding: 80px 0; }
        .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; }
        .feature-card { padding: 30px; background: white; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
        .feature-icon { width: 60px; height: 60px; background: linear-gradient(135deg, #f05a28, #ff7a45); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px; margin-bottom: 16px; }
        .feature-card h3 { font-size: 1.25rem; margin-bottom: 12px; }
        .feature-card p { color: #6b7280; line-height: 1.6; }

        .stats-section { padding: 80px 0; background: #1a1a2e; }
        .stats-section .section-title { color: white; }
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 40px; text-align: center; }
        .stat-card { color: white; }
        .stat-number { display: block; font-size: 3rem; font-weight: 700; color: #f05a28; }
        .stat-label { font-size: 1rem; opacity: 0.8; }

        .testimonials-section { padding: 80px 0; background: #f9fafb; }
        .testimonials-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; }
        .testimonial-card { padding: 30px; background: white; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
        .testimonial-stars { color: #f59e0b; margin-bottom: 16px; display: flex; gap: 4px; }
        .testimonial-author { margin-top: 20px; display: flex; flex-direction: column; }
        .testimonial-author strong { color: #1a1a2e; }
        .testimonial-author span { font-size: 0.875rem; color: #6b7280; }

        .faq-section { padding: 80px 0; }
        .faq-list { max-width: 800px; margin: 0 auto; }
        .faq-item { border: 1px solid #e5e7eb; border-radius: 12px; margin-bottom: 12px; overflow: hidden; }
        .faq-question { width: 100%; padding: 20px; display: flex; justify-content: space-between; align-items: center; background: white; border: none; cursor: pointer; font-size: 1rem; font-weight: 600; color: #1a1a2e; }
        .faq-question svg { transition: transform 0.3s; }
        .faq-item.open .faq-question svg { transform: rotate(90deg); }
        .faq-answer { padding: 0 20px 20px; color: #6b7280; line-height: 1.6; }

        .gallery-section { padding: 80px 0; }
        .gallery-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; }
        .gallery-item { border-radius: 12px; overflow: hidden; }
        .gallery-item img { width: 100%; height: 250px; object-fit: cover; }

        .content-section { padding: 80px 0; }
        .content-block { max-width: 800px; margin: 0 auto; line-height: 1.8; color: #374151; }

        .cta-section { padding: 80px 0; background: linear-gradient(135deg, #f05a28, #ff7a45); text-align: center; }
        .cta-title { font-size: 2.5rem; color: white; margin-bottom: 30px; }
        .cta-button { display: inline-flex; align-items: center; gap: 10px; padding: 16px 32px; background: white; color: #f05a28; border-radius: 12px; font-weight: 600; font-size: 1.1rem; transition: transform 0.3s; }
        .cta-button:hover { transform: translateY(-3px); }

        .pricing-section { padding: 80px 0; }
        .pricing-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; }
        .pricing-card { padding: 40px; background: white; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); text-align: center; }
        .pricing-card.featured { border: 2px solid #f05a28; transform: scale(1.05); }
        .pricing-card h3 { font-size: 1.5rem; margin-bottom: 16px; }
        .pricing-card .price { font-size: 2.5rem; font-weight: 700; color: #f05a28; margin-bottom: 20px; }
        .pricing-card .price span { font-size: 1.5rem; }
        .pricing-card ul { list-style: none; padding: 0; margin: 0 0 30px 0; text-align: left; }
        .pricing-card li { padding: 10px 0; display: flex; align-items: center; gap: 10px; color: #6b7280; }
        .pricing-card li svg { color: #10b981; }
        .pricing-btn { display: block; padding: 14px; background: #f05a28; color: white; border-radius: 10px; font-weight: 600; }
        .pricing-btn:hover { background: #e04a1a; }

        .dynamic-page-error { padding: 150px 20px; text-align: center; }
        .error-content h1 { font-size: 6rem; font-weight: 700; color: #f05a28; margin: 0; }
        .error-content h2 { font-size: 2rem; color: #1a1a2e; margin-bottom: 16px; }
        .error-content p { color: #6b7280; margin-bottom: 30px; }
        .error-btn { display: inline-block; padding: 14px 28px; background: #f05a28; color: white; border-radius: 10px; font-weight: 600; }

        .content-body-section { padding: 60px 0; }
        .content-body { max-width: 800px; margin: 0 auto; font-size: 1.1rem; line-height: 1.8; color: #374151; }
        .content-body h2 { font-size: 2rem; margin: 40px 0 20px; }
        .content-body h3 { font-size: 1.5rem; margin: 30px 0 16px; }
        .content-body p { margin-bottom: 20px; }
        .content-body ul, .content-body ol { margin: 0 0 20px 20px; }
        .content-body li { margin-bottom: 10px; }

        @media (max-width: 768px) {
          .section-title { font-size: 1.75rem; margin-bottom: 24px; }
          .features-section, .stats-section, .testimonials-section, .faq-section, .gallery-section, .content-section, .cta-section, .pricing-section { padding: 50px 0; }
          .features-grid { grid-template-columns: 1fr; gap: 20px; }
          .feature-card { padding: 24px; }
          .feature-icon { width: 50px; height: 50px; font-size: 20px; }
          .feature-card h3 { font-size: 1.1rem; }
          .feature-card p { font-size: 0.9rem; }
          
          .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 24px; }
          .stat-number { font-size: 2rem; }
          .stat-label { font-size: 0.85rem; }
          
          .testimonials-grid { grid-template-columns: 1fr; gap: 20px; }
          .testimonial-card { padding: 24px; }
          
          .faq-question { padding: 16px; font-size: 0.95rem; }
          .faq-answer { font-size: 0.9rem; }
          
          .gallery-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
          .gallery-item img { height: 180px; }
          
          .cta-title { font-size: 1.75rem; }
          .cta-button { padding: 14px 24px; font-size: 1rem; }
          
          .pricing-grid { grid-template-columns: 1fr; gap: 20px; }
          .pricing-card { padding: 30px; }
          .pricing-card.featured { transform: none; }
          .pricing-card .price { font-size: 2rem; }
          .pricing-card .price span { font-size: 1.2rem; }
          
          .content-body { font-size: 1rem; }
          .content-body h2 { font-size: 1.5rem; }
          .content-body h3 { font-size: 1.25rem; }
          
          .dynamic-page-error { padding: 100px 20px; }
          .error-content h1 { font-size: 4rem; }
          .error-content h2 { font-size: 1.5rem; }
          .error-btn { padding: 12px 24px; font-size: 1rem; }
        }

        @media (max-width: 480px) {
          .container { padding: 0 16px; }
          .section-title { font-size: 1.5rem; }
          
          .features-grid { grid-template-columns: 1fr; }
          .feature-card { padding: 20px; }
          
          .stats-grid { grid-template-columns: 1fr 1fr; gap: 16px; }
          .stat-number { font-size: 1.75rem; }
          .stat-label { font-size: 0.8rem; }
          
          .pricing-grid { grid-template-columns: 1fr; }
          .pricing-card { padding: 24px; }
          .pricing-card .price { font-size: 1.75rem; }
          
          .gallery-grid { grid-template-columns: 1fr; }
          .gallery-item img { height: 150px; }
        }
      `}</style>
    </div>
  )
}