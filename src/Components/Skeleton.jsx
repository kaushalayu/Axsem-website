import '../Styles/Skeleton.css'

export function Skeleton({ className = '', style = {}, variant = 'text' }) {
  const variants = {
    text: 'skeleton skeleton-text',
    title: 'skeleton skeleton-title',
    avatar: 'skeleton skeleton-avatar',
    button: 'skeleton skeleton-button',
    image: 'skeleton skeleton-image',
    card: 'skeleton skeleton-card',
  }

  return (
    <div 
      className={`${variants[variant]} ${className}`}
      style={style}
    />
  )
}

export function SkeletonGroup({ count = 1, gap = 8, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i}>{children}</div>
      ))}
    </div>
  )
}

export function SkeletonStatsGrid({ count = 4 }) {
  return (
    <div className="skeleton-grid">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton-stats-card">
          <div className="skeleton skeleton-stats-icon" />
          <div className="skeleton-stats-content">
            <div className="skeleton skeleton-stats-label" />
            <div className="skeleton skeleton-stats-value" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function SkeletonTable({ rows = 5 }) {
  return (
    <div className="skeleton-wrapper">
      <div className="skeleton-table-header">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="skeleton skeleton-table-header-cell" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="skeleton-table-row">
          {Array.from({ length: 5 }).map((_, j) => (
            <div key={j} className="skeleton skeleton-table-cell" />
          ))}
        </div>
      ))}
    </div>
  )
}

export function SkeletonCard({ showHeader = true, showBody = true }) {
  return (
    <div className="skeleton-card">
      {showHeader && (
        <div className="skeleton-card-header">
          <div className="skeleton skeleton-card-icon" />
          <div className="skeleton skeleton-card-title" />
        </div>
      )}
      {showBody && (
        <div className="skeleton-card-body">
          <div className="skeleton skeleton-text long" />
          <div className="skeleton skeleton-text medium" />
          <div className="skeleton skeleton-text short" />
        </div>
      )}
    </div>
  )
}

export function SkeletonGrid({ count = 3, cardHeight = 200 }) {
  return (
    <div className="skeleton-grid">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{ height: cardHeight }}>
          <div className="skeleton skeleton-card" style={{ height: '100%' }} />
        </div>
      ))}
    </div>
  )
}

export function SkeletonServiceCard() {
  return (
    <div className="skeleton-service-card">
      <div className="skeleton skeleton-service-icon" />
      <div className="skeleton skeleton-service-title" />
      <div className="skeleton skeleton-service-desc" />
      <div className="skeleton skeleton-service-desc" />
      <div className="skeleton skeleton-service-desc" />
    </div>
  )
}

export function SkeletonServiceGrid({ count = 6 }) {
  return (
    <div className="skeleton-grid">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonServiceCard key={i} />
      ))}
    </div>
  )
}

export function SkeletonPricingCard() {
  return (
    <div className="skeleton-pricing-card">
      <div className="skeleton-pricing-header">
        <div className="skeleton skeleton-pricing-title" />
        <div className="skeleton skeleton-pricing-price" />
      </div>
      <div className="skeleton-pricing-features">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="skeleton skeleton-pricing-feature" />
        ))}
      </div>
      <div className="skeleton skeleton-pricing-button" />
    </div>
  )
}

export function SkeletonPricingGrid({ count = 3 }) {
  return (
    <div className="skeleton-grid">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonPricingCard key={i} />
      ))}
    </div>
  )
}

export function SkeletonBlogCard() {
  return (
    <div className="skeleton-blog-card">
      <div className="skeleton skeleton-blog-image" />
      <div className="skeleton-blog-content">
        <div className="skeleton skeleton-blog-category" />
        <div className="skeleton skeleton-blog-title" />
        <div className="skeleton skeleton-blog-excerpt" />
        <div className="skeleton skeleton-blog-excerpt" />
        <div className="skeleton skeleton-blog-meta" />
      </div>
    </div>
  )
}

export function SkeletonBlogGrid({ count = 3 }) {
  return (
    <div className="skeleton-grid">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonBlogCard key={i} />
      ))}
    </div>
  )
}

export function SkeletonTeamCard() {
  return (
    <div className="skeleton-partner-card">
      <div className="skeleton skeleton-partner-avatar" />
      <div className="skeleton skeleton-partner-name" />
      <div className="skeleton skeleton-partner-role" />
    </div>
  )
}

export function SkeletonTeamGrid({ count = 4 }) {
  return (
    <div className="skeleton-grid">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonTeamCard key={i} />
      ))}
    </div>
  )
}

export function SkeletonForm({ fields = 3 }) {
  return (
    <div>
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i} className="skeleton-form-group">
          <div className="skeleton skeleton-form-label" />
          <div className="skeleton skeleton-form-input" />
        </div>
      ))}
    </div>
  )
}

export function SkeletonHero() {
  return (
    <div className="skeleton-hero">
      <div className="skeleton skeleton-hero-title" />
      <div className="skeleton skeleton-hero-subtitle" />
      <div className="skeleton skeleton-hero-button" />
    </div>
  )
}

export function SkeletonBanner() {
  return (
    <div className="skeleton skeleton-banner" />
  )
}

export function SkeletonList({ count = 5 }) {
  return (
    <div className="skeleton-list">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton-list-item">
          <div className="skeleton skeleton-list-avatar" />
          <div className="skeleton-list-content">
            <div className="skeleton skeleton-list-title" />
            <div className="skeleton skeleton-list-subtitle" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default Skeleton
