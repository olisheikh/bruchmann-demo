import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import FloatingParticles from '../components/FloatingParticles'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './UeberUns.css'

function useTimelineAnimation() {
  useEffect(() => {
    const items = document.querySelectorAll('.uu-timeline-item')
    const timelineEl = document.querySelector('.uu-timeline')

    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('tl-visible')
        else e.target.classList.remove('tl-visible')
      }),
      { threshold: 0.15 }
    )
    items.forEach(el => obs.observe(el))

    const onScroll = () => {
      if (!timelineEl) return
      const rect = timelineEl.getBoundingClientRect()
      const progress = Math.max(0, Math.min(1,
        (window.innerHeight * 0.65 - rect.top) / (rect.height - window.innerHeight * 0.25)
      ))
      timelineEl.style.setProperty('--line-progress', progress)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => { obs.disconnect(); window.removeEventListener('scroll', onScroll) }
  })
}

const ACC_SUBTITLES = ['Product Range & Expertise', 'Quality & Innovation', 'Purpose & Values']

function Accordion({ items }) {
  const [open, setOpen] = useState(0)
  return (
    <div className="uu-accordion">
      {items.map((item, i) => (
        <div key={item.title} className={`uu-acc-item ${open === i ? 'open' : ''}`}>
          <button className="uu-acc-trigger" onClick={() => setOpen(open === i ? -1 : i)}>
            <span className="uu-acc-num">0{i + 1}</span>
            <span className="uu-acc-title-wrap">
              <span className="uu-acc-title">{item.title}</span>
              <span className="uu-acc-subtitle">{ACC_SUBTITLES[i]}</span>
            </span>
            <span className="uu-acc-icon">{open === i ? '−' : '+'}</span>
          </button>
          <div className="uu-acc-body">
            <div className="uu-acc-content">
              <div className="uu-acc-content-inner">
                {item.paragraphs.map((p, j) => <p key={j}>{p}</p>)}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function SideVideo() {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { video.play().catch(() => {}); setPlaying(true) }
        else { video.pause(); setPlaying(false) }
      },
      { threshold: 0.4 }
    )
    obs.observe(video)
    return () => obs.disconnect()
  }, [])

  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) { v.play(); setPlaying(true) }
    else { v.pause(); setPlaying(false) }
  }

  const toggleMute = () => {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }

  return (
    <div className="uu-side-video-wrap">
      <div className="uu-side-video-frame">

        <video
          ref={videoRef}
          className="uu-side-video-el"
          src="/videos/Klaus_Bruchmann_about.mov"
          muted
          loop
          playsInline
          poster="/images/banners/employees.jpg"
        />
        {/* Play overlay shown when paused */}
        {!playing && (
          <button className="uu-side-play-overlay" onClick={togglePlay} aria-label="Play">
            <div className="uu-side-play-btn">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="currentColor">
                <path d="M5 3l14 8L5 19V3z"/>
              </svg>
            </div>
          </button>
        )}
        {/* Controls bar */}
        <div className="uu-side-controls">
          <button className="uu-side-ctrl-btn" onClick={togglePlay} aria-label="Play/Pause">
            {playing
              ? <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><rect x="2" y="1" width="3" height="12" rx="1"/><rect x="9" y="1" width="3" height="12" rx="1"/></svg>
              : <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M3 1l10 6L3 13V1z"/></svg>
            }
          </button>
          <div className="uu-side-ctrl-spacer" />
          <button className="uu-side-ctrl-btn" onClick={toggleMute} aria-label="Mute">
            {muted
              ? <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M1 5h3l4-3v10l-4-3H1V5z"/><path d="M10 4l3 3m0-3l-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none"/></svg>
              : <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M1 5h3l4-3v10l-4-3H1V5z"/><path d="M10 4a4 4 0 010 6" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round"/></svg>
            }
          </button>
        </div>
      </div>

      {/* Caption card below video */}
      <div className="uu-side-video-caption">
        <div className="uu-side-caption-icon">⚡</div>
        <div className="uu-side-caption-text">
          <span className="uu-side-caption-year">1985 – 2025</span>
          <h3 className="uu-side-caption-title">40 Years Bruchmann!</h3>
          <p className="uu-side-caption-sub">Trusted specialist in electrical safety — made in Germany.</p>
        </div>
      </div>
    </div>
  )
}

export default function UeberUns() {
  const { t } = useLanguage()
  useScrollReveal()
  useTimelineAnimation()

  const hero = t('about.hero')
  const mission = t('about.mission')
  const values = t('about.values')
  const stats = t('about.stats')
  const timeline = t('about.timeline')
  const timelineItems = t('about.timeline_items')
  const accordion = t('about.accordion')
  const cta = t('about.cta')

  return (
    <main>
      {/* HERO */}
      <section className="uu-hero">
        <video
          className="uu-hero-video"
          src="/videos/Klaus_Bruchmann_about.mov"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/banners/employees.jpg"
        />
        <div className="uu-hero-overlay" />
        <div className="uu-hero-bg" />
        <div className="uu-hero-particles" aria-hidden="true">
          <FloatingParticles />
        </div>
        <div className="container uu-hero-inner">
          <div className="uu-hero-text">
            <div className="section-label">{hero.label}</div>
            <h1>
              {hero.title.split('\n').map((line, i) => (
                <span key={i}>{line}{i === 0 && <br />}</span>
              ))}
            </h1>
            <p>{hero.description}</p>
          </div>
        </div>
        <div className="uu-hero-scroll"><span /></div>
      </section>

      {/* ACCORDION + VIDEO */}
      <section className="uu-accordion-section">

        {/* Top header banner — full width */}
        <div className="uu-acc-section-header reveal-blur">
          <div className="section-label">Who We Are</div>
          <h2>The <em>Spirit</em> Behind the Brand</h2>
          <p>Forty years of commitment — to quality, to safety, and to you.</p>
        </div>

        {/* Side-by-side content */}
        <div className="uu-split-wrap">
          <div className="uu-split-left reveal-left">
            <Accordion items={accordion} />
          </div>
          <div className="uu-split-right reveal-right">
            <SideVideo />
          </div>
        </div>

      </section>

      {/* CEO SPEECH */}
      <section className="uu-ceo-section">
        {/* Background decorative text */}
        <div className="uu-ceo-bg-word" aria-hidden="true">VISION</div>

        <div className="container uu-ceo-inner">

          {/* Left — phone mockup with reel */}
          <div className="uu-ceo-video reveal-scale">
            {/* Floating badges */}
            <div className="uu-ceo-badge uu-ceo-badge-top">
              <span>⚡</span> CEO Message
            </div>
            <div className="uu-ceo-badge uu-ceo-badge-bottom">
              <span className="uu-ceo-live-dot" /> 40 Years
            </div>

            {/* Phone frame */}
            <div className="uu-ceo-phone">
              <div className="uu-ceo-phone-notch" />
              <div className="uu-ceo-phone-screen">
                <iframe
                  src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F2700029687002081%2F&show_text=false&width=267&t=0"
                  width="267"
                  height="476"
                  style={{border:'none', overflow:'hidden', display:'block', width:'100%', height:'100%'}}
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  title="CEO Speech"
                />
              </div>
              <div className="uu-ceo-phone-chin" />
            </div>

            {/* Glow behind phone */}
            <div className="uu-ceo-phone-glow" />
          </div>

          {/* Right — text */}
          <div className="uu-ceo-text reveal-left">
            <div className="uu-ceo-label-row">
              <span className="uu-ceo-pill">Leadership</span>
              <span className="uu-ceo-year-tag">Since 1985</span>
            </div>

            <h2 className="uu-ceo-heading">
              A Word<br/>
              <span className="uu-ceo-heading-accent">From Our</span><br/>
              CEO
            </h2>

            <p className="uu-ceo-desc">
              Klaus Bruchmann shares his vision on safety, innovation, and what it means to build a company that has protected people for over four decades.
            </p>

            <div className="uu-ceo-quote-block">
              <div className="uu-ceo-quote-line" />
              <blockquote>
                "Safety carries our name — it is our promise, our standard, and our purpose every single day."
              </blockquote>
            </div>

            <div className="uu-ceo-author">
              <div className="uu-ceo-avatar">KB</div>
              <div className="uu-ceo-author-info">
                <strong>Klaus Bruchmann</strong>
                <span>Founder & CEO · Klaus Bruchmann GmbH</span>
              </div>
              <div className="uu-ceo-author-arrow">→</div>
            </div>

          </div>

        </div>
      </section>

      {/* MISSION */}
      <section className="section uu-mission">
        <div className="container uu-mission-grid">
          <div className="reveal">
            <div className="section-label">{mission.label}</div>
            <h2>
              <span className="uu-mission-accent">{mission.title.split(' ')[0]}</span>
              {' '}{mission.title.split(' ').slice(1).join(' ')}
            </h2>
            <p>{mission.p1}</p>
            <p className="uu-mission-p2">{mission.p2}</p>
            <div className="uu-mission-trust">
              <span>✓ ISO 9001</span>
              <span>✓ ISO 14001</span>
              <span>✓ Est. 1985</span>
              <span>✓ 25M+ Products</span>
            </div>
          </div>
          <div className="uu-values reveal-stagger">
            {values.map((v, i) => (
              <div key={v.label} className="uu-value-card">
                <div className="uu-value-num">0{i + 1}</div>
                <strong>{v.label}</strong>
                <span>{v.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="uu-stats-bar">
        <div className="container uu-stats-grid">
          {stats.map(s => (
            <div key={s.label} className="uu-stat reveal-scale">
              <span className="uu-stat-value">{s.value}</span>
              <span className="uu-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* TIMELINE */}
      <section className="section uu-timeline-section">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-label">{timeline.label}</div>
            <h2 className="section-title">{timeline.title}</h2>
          </div>
          <div className="uu-timeline">
            {timelineItems.map((item, i) => (
              <div key={item.year} className={`uu-timeline-item ${i % 2 === 0 ? 'left' : 'right'}`}>
                <div className="uu-timeline-card">
                  <span className="uu-timeline-year">{item.year}</span>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
                <div className="uu-timeline-dot" />
              </div>
            ))}
            <div className="uu-timeline-line" />
            <div className="uu-timeline-line-fill" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="uu-cta">
        <div className="container uu-cta-inner reveal-blur">
          <h2>{cta.title}</h2>
          <p>{cta.subtitle}</p>
          <div style={{display:'flex',gap:14,flexWrap:'wrap',justifyContent:'center',marginTop:32}}>
            <Link to="/kontakt" className="btn-primary">{cta.btn_contact}</Link>
            <Link to="/karriere" className="btn-outline">{cta.btn_careers}</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
