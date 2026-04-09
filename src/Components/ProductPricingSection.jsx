import { useState, useEffect } from "react"
import { FiCheck, FiArrowRight, FiZap } from "react-icons/fi"
import { usePricing } from "../hooks/usePricing"

const styles = {
  section: { padding: '60px 20px', background: '#f9f9f9' },
  container: { maxWidth: '1200px', margin: '0 auto' },
  header: { textAlign: 'center', marginBottom: '40px' },
  pill: { display: 'inline-block', padding: '6px 16px', background: '#f05a2815', color: '#f05a28', borderRadius: '20px', fontSize: '13px', fontWeight: '600', marginBottom: '12px' },
  title: { fontSize: '32px', fontWeight: '700', margin: '0 0 10px', color: '#1a1a2e' },
  titleHighlight: { color: '#f05a28' },
  subtitle: { fontSize: '16px', color: '#666', margin: 0 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' },
  card: { background: '#fff', borderRadius: '16px', padding: '28px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', position: 'relative', border: '2px solid transparent', transition: 'all 0.3s ease' },
  cardHighlight: { borderColor: '#f05a28', transform: 'scale(1.02)' },
  badge: { position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: '#f05a28', color: '#fff', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' },
  planName: { fontSize: '20px', fontWeight: '700', margin: '0 0 8px', color: '#1a1a2e' },
  priceRow: { display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '4px' },
  price: { fontSize: '36px', fontWeight: '800', color: '#f05a28' },
  per: { fontSize: '14px', color: '#666' },
  desc: { fontSize: '14px', color: '#888', marginBottom: '20px' },
  features: { listStyle: 'none', padding: 0, margin: '0 0 24px' },
  feature: { display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '8px 0', fontSize: '14px', color: '#555' },
  featureIcon: { color: '#f05a28', fontSize: '18px', marginTop: '2px' },
  cta: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '14px 24px', background: '#f05a28', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', width: '100%', textDecoration: 'none', transition: 'all 0.2s ease' },
  ctaSecondary: { background: 'transparent', color: '#f05a28', border: '2px solid #f05a28' },
}

export default function ProductPricingSection({ productRoute, color = '#f05a28' }) {
  const { getPricingByRoute, loading } = usePricing()
  const [pricing, setPricing] = useState(null)

  useEffect(() => {
    const fetchPricing = async () => {
      const data = await getPricingByRoute(productRoute)
      if (data) {
        setPricing(data)
      }
    }
    if (productRoute) {
      fetchPricing()
    }
  }, [productRoute, getPricingByRoute])

  if (loading || !pricing) {
    return null
  }

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <span style={{...styles.pill, background: `${color}15`, color}}>Pricing</span>
          <h2 style={styles.title}>
            Choose Your <span style={{...styles.titleHighlight, color}}>Plan</span>
          </h2>
          <p style={styles.subtitle}>Transparent pricing — no hidden charges. Cancel anytime.</p>
        </div>

        <div style={styles.grid}>
          {pricing.tiers?.map((tier, idx) => (
            <div 
              key={idx} 
              style={{
                ...styles.card,
                ...(tier.highlight ? styles.cardHighlight : {}),
                borderColor: tier.highlight ? color : 'transparent'
              }}
            >
              {tier.highlight && (
                <div style={{...styles.badge, background: color}}>
                  <FiZap size={12} /> Most Popular
                </div>
              )}
              <h3 style={{...styles.planName, color: tier.highlight ? color : '#1a1a2e'}}>{tier.name}</h3>
              <div style={styles.priceRow}>
                <span style={{...styles.price, color}}>{tier.price}</span>
                <span style={styles.per}>{tier.per}</span>
              </div>
              <p style={styles.desc}>{tier.desc}</p>
              <ul style={styles.features}>
                {tier.features?.map((feature, i) => (
                  <li key={i} style={styles.feature}>
                    <FiCheck style={{...styles.featureIcon, color}} />
                    {feature}
                  </li>
                ))}
              </ul>
              <a href="/contact" style={styles.cta}>
                Get Started <FiArrowRight />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
