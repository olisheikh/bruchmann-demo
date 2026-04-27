import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { useLanguage } from '../context/LanguageContext'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './Home.css'

const productImages = [
  '/images/products/fust_combination.png',
  '/images/products/main_protection.png',
  '/images/products/busbar_system.png',
  '/images/products/relays.png',
  '/images/products/plug_in_meter_connection_terminals.png',
]
const productPaths = [
  '/sicherungsschaltgeraete',
  '/hauptschutz',
  '/sammelschienensystem',
  '/relais',
  '/zaehlersteckklemmen',
]
const productKeys = [
  'sicherungsschaltgeraete',
  'hauptschutz',
  'sammelschienensystem',
  'relais',
  'zaehlersteckklemmen',
]

const diffIcons = [
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 3l3.5 7 7.5 1-5.5 5.5 1.3 7.5L16 21l-6.8 3 1.3-7.5L5 11l7.5-1z"/>
  </svg>,
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <circle cx="16" cy="16" r="12"/><path d="M16 8v8l5 3"/>
  </svg>,
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 3l11 4.5v10c0 6-4.5 11-11 13C5 28.5 5 22.5 5 17.5V7.5z"/><path d="M11 16l3 3 7-7"/>
  </svg>,
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <path d="M4 26h24M10 26V14l6-8 6 8v12"/><path d="M13 26v-6h6v6"/>
  </svg>,
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="7" width="26" height="18" rx="3"/><path d="M3 13h26M9 7V5M23 7V5"/>
  </svg>,
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="16" cy="10" r="5"/><path d="M6 26c0-5.5 4.5-10 10-10s10 4.5 10 10"/><path d="M12 22l2 2 6-6"/>
  </svg>,
]

const partners = [
  { name: 'K-Electric GmbH', tagline: 'We connect to protect.', logo: '/images/icons/k_electric.png', href: 'https://k-electric-gmbh.de' },
  { name: 'Forma GmbH', tagline: 'Sicherheit durch Präzision.', logo: '/images/icons/forma.png', href: 'https://www.forma-gmbh.de' },
  { name: 'Samid', tagline: 'Wir bringen Kunststoff in Form.', logo: '/images/icons/samid.png', href: 'https://samid.de' },
]

function TypeWrite({ text, delay = 1200 }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const hasRun = useRef(false)
  const elRef = useRef(null)

  useEffect(() => {
    const el = elRef.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasRun.current) {
        hasRun.current = true
        let i = 0
        const timer = setTimeout(() => {
          const interval = setInterval(() => {
            i++
            setDisplayed(text.slice(0, i))
            if (i >= text.length) { clearInterval(interval); setDone(true) }
          }, 160)
          return () => clearInterval(interval)
        }, delay)
        return () => clearTimeout(timer)
      }
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, []) // eslint-disable-line

  return (
    <span ref={elRef} className="typewrite">
      {displayed || ' '}
      {!done && <span className="typewrite-cursor" />}
    </span>
  )
}

function CountUp({ value }) {
  const str = String(value)
  const match = str.match(/^(\d+)(.*)$/)
  const [count, setCount] = useState(0)
  const hasRun = useRef(false)
  const elRef = useRef(null)

  useEffect(() => {
    if (!match) return
    const target = parseInt(match[1])
    const el = elRef.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasRun.current) {
        hasRun.current = true
        const start = performance.now()
        const duration = 1800
        const animate = (now) => {
          const progress = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setCount(Math.floor(eased * target))
          if (progress < 1) requestAnimationFrame(animate)
          else setCount(target)
        }
        requestAnimationFrame(animate)
      }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, []) // eslint-disable-line

  if (!match) return <span ref={elRef}>{value}</span>
  return <span ref={elRef}>{count}{match[2]}</span>
}

export default function Home() {
  const { t } = useLanguage()
  useScrollReveal()

  const stats = t('home.stats')
  const productCards = t('home.product_cards')
  const aboutTeaser = t('home.about_teaser')
  const ctaBanner = t('home.cta_banner')
  const location = t('home.location')
  const whyDiff = t('home.why_different')

  return (
    <main className="home">
      {/* HERO */}
      <section className="hero">
        <video className="hero-video" autoPlay muted loop playsInline>
          <source src="/videos/banner_video_1.mp4" type="video/mp4" />
          <source src="/videos/Klaus-Bruchmann-40-Jahre-1.mov" type="video/mp4" />
        </video>
        <div className="hero-overlay" />

        {/* 3D floating orb — decorative */}
        <div className="hero-3d-orb" aria-hidden="true">
          <div className="orb-ring" />
          <div className="orb-ring" />
          <div className="orb-ring" />
          <div className="orb-ring" />
          <div className="orb-core" />
          <div className="orb-dot" />
        </div>

        {/* floating particles */}
        <div className="hero-3d-particles" aria-hidden="true">
          {[
            {left:'8%',  top:'30%', dur:'11s', del:'0s'},
            {left:'18%', top:'60%', dur:'14s', del:'2s'},
            {left:'30%', top:'80%', dur:'9s',  del:'4s'},
            {left:'55%', top:'25%', dur:'13s', del:'1s'},
            {left:'70%', top:'70%', dur:'10s', del:'3s'},
            {left:'82%', top:'45%', dur:'15s', del:'5s'},
            {left:'92%', top:'20%', dur:'12s', del:'0.5s'},
            {left:'45%', top:'55%', dur:'8s',  del:'2.5s'},
          ].map((p, i) => (
            <div key={i} className="h3p" style={{left:p.left, top:p.top, '--dur':p.dur, '--del':p.del}} />
          ))}
        </div>
        <div className="container hero-content">
          <div className="hero-text">
            <div className="hero-eyebrow">{t('home.hero.eyebrow')}</div>
            <h1 className="hero-title">
              <span className="hero-line">{t('home.hero.line1')}</span>
              <span className="hero-line">
                {t('home.hero.line2').split('40')[0]}
                <span className="hero-accent"><TypeWrite text="40" delay={900} /></span>
                {t('home.hero.line2').split('40')[1]}
              </span>
            </h1>
            <p className="hero-subtitle">{t('home.hero.subtitle')}</p>
            <div className="hero-actions">
              <span className="electric-border-wrap">
                <button
                  className="btn-primary hero-btn"
                  onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}
                >
                  {t('home.hero.cta_contact')}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </span>
              <Link to="/ueber-uns" className="btn-outline hero-btn">{t('home.hero.cta_about')}</Link>
            </div>
          </div>
          <div className="hero-stats">
            {stats.map((s, i) => (
              <div key={s.label} className="hero-stat">
                {i > 0 && <div className="hero-stat-sep" />}
                <span className="stat-value"><CountUp value={s.value} /></span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-scroll-mouse">
          <div className="hero-scroll-pill"><span /></div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="trust-bar">
        <div className="trust-bar-bg" />
        <div className="container trust-inner">

          <a className="trust-cert-card" href="https://www.iso.org/iso-9001-quality-management.html" target="_blank" rel="noreferrer">
            <div className="trust-cert-logo-wrap">
              <img src="/images/icons/iso9001.png" alt="ISO 9001" className="trust-cert-logo" />
            </div>
            <div className="trust-cert-info">
              <strong>ISO 9001</strong>
              <span>Qualitätsmanagementsystem</span>
            </div>
            <div className="trust-cert-badge">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8l3.5 3.5L13 4" stroke="#13A538" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Zertifiziert
            </div>
          </a>

          <div className="trust-vdivider" />

          <a className="trust-cert-card" href="https://www.iso.org/iso-14001-environmental-management.html" target="_blank" rel="noreferrer">
            <div className="trust-cert-logo-wrap">
              <img src="/images/icons/iso14001.png" alt="ISO 14001" className="trust-cert-logo" />
            </div>
            <div className="trust-cert-info">
              <strong>ISO 14001</strong>
              <span>Umweltmanagementsystem</span>
            </div>
            <div className="trust-cert-badge">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8l3.5 3.5L13 4" stroke="#13A538" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Zertifiziert
            </div>
          </a>

        </div>
      </div>

      {/* PRODUCTS */}
      <section id="products" className="section products-section">
        <div className="container">
          <div className="section-header reveal-blur">
            <div className="section-label">{t('home.products_section.label')}</div>
            <h2 className="section-title">{t('home.products_section.title')}</h2>
            <p className="section-sub">{t('home.products_section.subtitle')}</p>
          </div>
          <div className="products-grid">
            {productKeys.map((key, i) => (
              <div key={key} className="reveal-scale" style={{ '--sr-delay': `${i * 0.09}s` }}>
                <ProductCard
                  title={t(`products.${key}.title`)}
                  description={productCards[i]}
                  path={productPaths[i]}
                  icon={['lightning','shield','grid','relay','plug'][i]}
                  image={productImages[i]}
                  number={i + 1}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT TEASER */}
      <section className="section about-teaser">
        <div className="container about-inner">
          <div className="about-visual reveal-right">
            <div className="about-visual-bg" />
            <div className="about-card">
              <div className="about-card-photo">
                <video
                  className="about-card-video"
                  src="/videos/Klaus_Bruchmann_about.mov"
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster="/images/banners/employees.jpg"
                />
                <div className="about-card-photo-overlay" />
              </div>
              <div className="about-card-content">
                <h3>{aboutTeaser.card_title}</h3>
                <p>{aboutTeaser.card_subtitle}</p>
                <div className="about-card-stats">
                  <div><strong>25 Mio.</strong><span>{aboutTeaser.card_stat1_label}</span></div>
                  <div><strong>1985</strong><span>{aboutTeaser.card_stat2_label}</span></div>
                </div>
              </div>
            </div>
            <div className="about-badges">
              <a className="about-badge-iso" href="https://www.iso.org/iso-9001-quality-management.html" target="_blank" rel="noreferrer">
                <img src="/images/icons/iso9001.png" alt="ISO 9001" className="iso-badge-img" />
                <span className="iso-badge-label">ISO 9001</span>
              </a>
              <a className="about-badge-iso" href="https://www.iso.org/iso-14001-environmental-management.html" target="_blank" rel="noreferrer">
                <img src="/images/icons/iso14001.png" alt="ISO 14001" className="iso-badge-img" />
                <span className="iso-badge-label">ISO 14001</span>
              </a>
            </div>
          </div>
          <div className="about-text reveal-left">
            <div className="section-label">{aboutTeaser.label}</div>
            <h2>
              {aboutTeaser.title.split('\n').map((line, i) => (
                <span key={i}>{line}{i === 0 && <br />}</span>
              ))}
            </h2>
            <p>{aboutTeaser.p1}</p>
            <p>{aboutTeaser.p2}</p>
            <div className="about-values">
              {aboutTeaser.values.map(v => (
                <div key={v} className="value-item">
                  <div className="value-dot" />
                  <span>{v}</span>
                </div>
              ))}
            </div>
            <Link to="/ueber-uns" className="btn-dark">
              {aboutTeaser.cta}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* WHY DIFFERENT */}
      <section className="section why-different">
        <div className="container">
          <div className="section-header reveal-blur">
            <div className="section-label">{whyDiff.label}</div>
            <h2 className="section-title">{whyDiff.title}</h2>
            <p className="section-sub">{whyDiff.subtitle}</p>
          </div>
          <div className="why-grid">
            {whyDiff.items.map((item, i) => (
              <div key={i} className="why-card reveal-flip" data-tilt data-tilt-strength="8" style={{ '--sr-delay': `${i * 0.08}s` }}>
                <div className="why-card-icon">{diffIcons[i]}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <div className="why-card-num">{String(i + 1).padStart(2, '0')}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="cta-banner">
        <div className="cta-banner-bg" />
        <div className="container cta-inner reveal-blur">
          <div className="cta-text">
            <h2>{ctaBanner.title}</h2>
            <p>{ctaBanner.subtitle}</p>
          </div>
          <Link to="/kontakt" className="btn-primary cta-btn">
            {ctaBanner.btn}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </section>

      {/* LOCATION MAP */}
      <section className="section home-map-section">
        <div className="container">
          <div className="section-header reveal-blur">
            <div className="section-label">{location.label}</div>
            <h2 className="section-title">{location.title}</h2>
            <p className="section-sub">{location.subtitle}</p>
          </div>

          <div className="home-map-layout">

            {/* Info panel */}
            <div className="home-map-info reveal-left">
              <div className="home-map-detail" data-tilt data-tilt-strength="5">
                <div className="home-map-detail-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
                </div>
                <div>
                  <p className="home-map-detail-label">{location.address_label}</p>
                  <p className="home-map-detail-value">
                    {location.address_value.split('\n').map((line, i) => (
                      <span key={i}>{line}{i === 0 && <br />}</span>
                    ))}
                  </p>
                </div>
              </div>

              <div className="home-map-detail" data-tilt data-tilt-strength="5">
                <div className="home-map-detail-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.64A2 2 0 012 .96h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                </div>
                <div>
                  <p className="home-map-detail-label">{location.phone_label}</p>
                  <a href="tel:+4995427736060" className="home-map-detail-value home-map-detail-link">+49 9542 7736-0</a>
                </div>
              </div>

              <div className="home-map-detail" data-tilt data-tilt-strength="5">
                <div className="home-map-detail-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </div>
                <div>
                  <p className="home-map-detail-label">{location.email_label}</p>
                  <a href="mailto:info@bruchmann-gmbh.de" className="home-map-detail-value home-map-detail-link">info@bruchmann-gmbh.de</a>
                </div>
              </div>

              <div className="home-map-detail" data-tilt data-tilt-strength="5">
                <div className="home-map-detail-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                </div>
                <div>
                  <p className="home-map-detail-label">{location.hours_label}</p>
                  <p className="home-map-detail-value">
                    {location.hours_value.split('\n').map((line, i) => (
                      <span key={i}>{line}{i === 0 && <br />}</span>
                    ))}
                  </p>
                </div>
              </div>

              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Am+Steinernen+Kreuz+8,+96110+Sche%C3%9Flitz,+Germany"
                target="_blank"
                rel="noreferrer"
                className="btn-primary home-map-directions-btn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
                {location.directions}
              </a>
            </div>

            {/* Map */}
            <div className="home-map-frame reveal-right">
              <div className="home-map-glow" />
              <div className="home-map-badge">
                <svg width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="4" fill="var(--green)" opacity="0.25"/><circle cx="5" cy="5" r="2" fill="var(--green)"/></svg>
                {location.map_badge}
              </div>
              <iframe
                title={location.map_title}
                src="https://maps.google.com/maps?q=Am+Steinernen+Kreuz+8,+96110+Sche%C3%9Flitz,+Germany&output=embed&z=15"
                style={{border:'none',display:'block',width:'100%',height:'100%'}}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </div>
        </div>
      </section>

      {/* PARTNER LOGOS */}
      <section className="section partners-section">
        <div className="container">
          <p className="partners-label reveal-blur">{t('home.partners.label')}</p>
          <div className="partners-grid reveal-stagger">
            {partners.map(p => (
              <a key={p.name} href={p.href} target="_blank" rel="noreferrer" className="partner-item" data-tilt data-tilt-strength="6">
                <div className="partner-logo-wrap">
                  <img src={p.logo} alt={p.name} className="partner-logo-img" />
                </div>
                <div className="partner-text">
                  <span className="partner-name">{p.name}</span>
                  <span className="partner-tagline">{p.tagline}</span>
                </div>
                <svg className="partner-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
