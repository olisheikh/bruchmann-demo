import { Link } from 'react-router-dom'
import './ProductCard.css'

const icons = {
  lightning: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M28 6L12 26h14l-6 16L42 22H28L34 6z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M24 4l16 6v14c0 8-6 16-16 20C8 40 2 32 2 24V10l16-6 6 3z" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 24l5 5 10-10" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  grid: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="4" y="12" width="40" height="6" rx="2"/>
      <path d="M8 18v18M24 18v18M40 18v18M4 30h40" strokeLinecap="round"/>
    </svg>
  ),
  relay: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="24" cy="24" r="16"/>
      <circle cx="24" cy="24" r="7"/>
      <path d="M24 8V4M24 44v-4M8 24H4M44 24h-4" strokeLinecap="round"/>
    </svg>
  ),
  plug: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="14" y="8" width="20" height="14" rx="3"/>
      <path d="M24 22v10M18 32h12M18 40a6 6 0 0012 0" strokeLinecap="round"/>
      <path d="M17 8V4M31 8V4" strokeLinecap="round"/>
    </svg>
  ),
}

export default function ProductCard({ title, description, path, icon = 'lightning', image, highlight = false, number }) {
  if (image) {
    return (
      <Link to={path} className="product-card product-card--visual" data-tilt data-tilt-strength="7">
        <img src={image} alt={title} loading="lazy" className="pc-img" />
        <div className="pc-overlay" />
        {number && <span className="pc-badge">0{number}</span>}
        <div className="pc-body">
          <h3 className="pc-title">{title}</h3>
          <div className="pc-reveal">
            <p>{description}</p>
            <span className="pc-cta">
              Explore
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </div>
        </div>
        <div className="pc-glow" />
      </Link>
    )
  }

  return (
    <Link to={path} className={`product-card ${highlight ? 'highlight' : ''}`} data-tilt data-tilt-strength="8">
      <div className="product-card-icon">{icons[icon] || icons.lightning}</div>
      <div className="product-card-body">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="product-card-footer">
        <span className="product-card-learn-more">
          <svg className="learn-3d-icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5"/>
            <path d="M2 12l10 5 10-5"/>
          </svg>
          <span className="learn-3d-text">Learn more with 3D designs</span>
          <svg className="learn-3d-arrow" width="15" height="15" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </div>
    </Link>
  )
}
