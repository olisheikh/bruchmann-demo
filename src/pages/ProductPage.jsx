import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './ProductPage.css'

export default function ProductPage({ title, subtitle, description, features, specs, icon, accentColor, titleKey }) {
  const { t } = useLanguage()
  useScrollReveal()

  // Use titleKey for URL params (always the translated title at time of click)
  const contactParam = titleKey || title

  return (
    <main className="product-page">
      {/* HERO */}
      <section className="pp-hero" style={{ '--accent': accentColor || 'var(--green)' }}>
        <div className="pp-hero-bg" />
        <div className="container pp-hero-inner">
          <div className="pp-breadcrumb">
            <Link to="/">{t('productPage.breadcrumb_home')}</Link>
            <span>/</span>
            <Link to="/#produkte">{t('productPage.breadcrumb_products')}</Link>
            <span>/</span>
            <span>{title}</span>
          </div>
          <div className="pp-hero-content">
            <div className="pp-hero-text">
              <div className="section-label">{subtitle}</div>
              <h1>{title}</h1>
              <p className="pp-hero-desc">{description}</p>
              <div className="pp-hero-actions">
                <Link to={`/kontakt?produkt=${encodeURIComponent(contactParam)}`} className="btn-primary">
                  {t('productPage.request_btn')}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                <Link to="/kontakt" className="btn-outline">{t('productPage.questions_btn')}</Link>
              </div>
            </div>
            <div className="pp-hero-visual">
              <div className="pp-product-icon">{icon}</div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      {features && (
        <section className="section pp-features">
          <div className="container">
            <div className="section-label reveal-left">{t('productPage.features_label')}</div>
            <h2 className="pp-section-h2 reveal-blur">{t('productPage.features_title')}</h2>
            <div className="pp-features-grid">
              {features.map((f, i) => (
                <div key={i} className="pp-feature reveal-flip" style={{ '--sr-delay': `${i * 0.08}s` }}>
                  <div className="pp-feature-icon">{f.icon}</div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SPECS */}
      {specs && (
        <section className="section pp-specs-section">
          <div className="container">
            <div className="pp-specs-inner">
              <div className="pp-specs-text reveal-left">
                <div className="section-label">{t('productPage.specs_label')}</div>
                <h2>{t('productPage.specs_title')}</h2>
                <p>{t('productPage.specs_note')}</p>
                <Link to={`/kontakt?produkt=${encodeURIComponent(contactParam)}`} className="btn-dark" style={{ marginTop: 24 }}>
                  {t('productPage.datasheet_btn')}
                </Link>
              </div>
              <div className="pp-specs-table reveal-right">
                {specs.map((s, i) => (
                  <div key={i} className="pp-spec-row">
                    <span className="pp-spec-key">{s.key}</span>
                    <span className="pp-spec-val">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="pp-cta">
        <div className="container pp-cta-inner reveal-blur">
          <div>
            <h2>{t('productPage.cta_interest')} {title}?</h2>
            <p>{t('productPage.cta_subtitle')}</p>
          </div>
          <Link to={`/kontakt?produkt=${encodeURIComponent(contactParam)}`} className="btn-primary">
            {t('productPage.inquire_btn')}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </section>
    </main>
  )
}
