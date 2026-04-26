import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './Karriere.css'

export default function Karriere() {
  const { t } = useLanguage()
  useScrollReveal()

  const hero     = t('careers.hero')
  const benefits = t('careers.benefits')
  const jobs     = t('careers.jobs')
  const cta      = t('careers.cta')

  return (
    <main className="karriere-page">

      {/* ══ HERO ══ */}
      <section className="karriere-hero">
        <div className="karriere-hero-bg" />
        <div className="container karriere-hero-inner">

          <div className="karriere-hero-text">
            <div className="section-label">{hero.label}</div>
            <h1>{hero.title}</h1>
            <p>{hero.description}</p>
            <div className="karriere-hero-stats">
              {[
                { v: '40+',  l: 'Years of excellence',   n: 40,  suffix: '+' },
                { v: '25M+', l: 'Products manufactured', n: 25,  suffix: 'M+' },
                { v: '100%', l: 'Made in Germany',       n: 100, suffix: '%' },
              ].map((s, i) => (
                <div key={i} className="karriere-hero-stat">
                  <strong
                    className="count-up"
                    data-target={s.n}
                    data-suffix={s.suffix}
                  >{s.v}</strong>
                  <span>{s.l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Photo only */}
          <div className="karriere-hero-image">
            <div className="karriere-hero-img-frame">
              <img src="/images/banners/employees.jpg" alt="Bruchmann Team" className="karriere-hero-img" />
              <div className="karriere-hero-img-badge">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Bruchmann GmbH Team
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ BENEFITS ══ */}
      <section className="section karriere-benefits">
        <div className="container">
          <div className="karriere-benefits-layout">

            {/* Left: header + cards */}
            <div className="karriere-benefits-left">
              <div className="karriere-benefits-header reveal-blur">
                <div className="section-label">{benefits.label}</div>
                <h2 className="section-title">{benefits.title}</h2>
              </div>
              <div className="karriere-benefits-grid">
                {benefits.items.map((b, i) => (
                  <div key={i} className="karriere-benefit reveal" data-tilt data-tilt-strength="8" style={{'--sr-delay':`${i*0.09}s`}}>
                    <div className="karriere-benefit-icon">{b.icon}</div>
                    <h3>{b.title}</h3>
                    <p>{b.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: employee story video */}
            <div className="karriere-benefits-video reveal">
              <div className="karriere-bv-inner">
                <div className="karriere-bv-label">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <circle cx="5" cy="5" r="4" fill="var(--green)" opacity="0.25"/>
                    <circle cx="5" cy="5" r="2" fill="var(--green)"/>
                  </svg>
                  Employee Story
                </div>
                <div className="karriere-bv-frame">
                  <div className="karriere-bv-glow" />
                  <iframe
                    src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F906875218658990&show_text=false&width=370"
                    width="370"
                    height="476"
                    style={{border:'none',overflow:'hidden',display:'block'}}
                    allowFullScreen={true}
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  />
                </div>
                <div className="karriere-bv-quote">
                  <svg width="20" height="14" viewBox="0 0 20 14" fill="none"><path d="M0 14V8.4C0 5.6 1.4 3.2 4.2 1.2L6 3.2C4.4 4.4 3.6 5.6 3.6 6.8H7V14H0ZM13 14V8.4C13 5.6 14.4 3.2 17.2 1.2L19 3.2C17.4 4.4 16.6 5.6 16.6 6.8H20V14H13Z" fill="currentColor"/></svg>
                  <p>Real voices from our team — hear what it's like to grow with Bruchmann.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══ OPEN POSITIONS ══ */}
      <section className="section karriere-jobs">
        <div className="container">
          <div className="section-header reveal-blur">
            <div className="section-label">{jobs.label}</div>
            <h2 className="section-title">{jobs.title}</h2>
          </div>
          <div className="karriere-jobs-list">
            {jobs.items.map((j, i) => (
              <div key={i} className="karriere-job reveal" data-tilt data-tilt-strength="4" style={{'--sr-delay':`${i*0.1}s`}}>
                <div className="karriere-job-header">
                  <div className="karriere-job-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" strokeLinecap="round"/></svg>
                  </div>
                  <div className="karriere-job-meta-top">
                    <span className="karriere-job-type">{j.type}</span>
                    <span className="karriere-job-loc">
                      <svg width="11" height="11" viewBox="0 0 16 16" fill="none"><path d="M8 2a4 4 0 00-4 4c0 3 4 8 4 8s4-5 4-8a4 4 0 00-4-4z" stroke="currentColor" strokeWidth="1.4"/><circle cx="8" cy="6" r="1.2" stroke="currentColor" strokeWidth="1.2"/></svg>
                      {j.location}
                    </span>
                  </div>
                </div>
                <div className="karriere-job-body">
                  <h3>{j.title}</h3>
                  <p>{j.desc}</p>
                  <div className="karriere-job-tags">
                    {j.tags.map(tag => <span key={tag} className="karriere-tag">{tag}</span>)}
                  </div>
                </div>
                <Link
                  to={`/bewerbung?stelle=${encodeURIComponent(j.title)}`}
                  className="btn-primary karriere-apply-btn"
                >
                  {jobs.apply}
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="karriere-cta">
        <div className="karriere-cta-glow" />
        <div className="container karriere-cta-inner reveal-blur">
          <div className="karriere-cta-text">
            <h2>{cta.title}</h2>
            <p>{cta.subtitle}</p>
          </div>
          <Link
            to={`/bewerbung?stelle=${encodeURIComponent('Unsolicited Application')}`}
            className="btn-primary karriere-cta-btn"
          >
            {cta.btn}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
        </div>
      </section>

    </main>
  )
}
