import { Suspense, useRef, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls, ContactShadows, Environment } from '@react-three/drei'
import { useLanguage } from '../context/LanguageContext'
import { productDetailContent } from '../content/pageContent'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './Sicherungsschaltgeraete.css'

const GLB = '/3D_images/fuse_combination_3D.glb'
useGLTF.preload(GLB)

/* ── 3D components ── */
function RotatingFuse() {
  const { scene } = useGLTF(GLB)
  const cloned = useMemo(() => scene.clone(true), [scene])
  const ref = useRef()
  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.elapsedTime * 0.4
    ref.current.position.y = Math.sin(clock.elapsedTime * 0.7) * 0.09 - 0.4
  })
  return <primitive ref={ref} object={cloned} scale={1.6} position={[0, -0.2, 0]} />
}

function ExplorerFuse() {
  const { scene } = useGLTF(GLB)
  return <primitive object={scene} scale={2.2} position={[0, -0.85, 0]} />
}

function WireFallback() {
  const ref = useRef()
  useFrame(({ clock }) => { ref.current.rotation.y = clock.elapsedTime * 1.1 })
  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[0.75, 0.24, 128, 16]} />
      <meshStandardMaterial color="#13A538" wireframe opacity={0.7} transparent />
    </mesh>
  )
}


export default function Sicherungsschaltgeraete() {
  useScrollReveal()
  const { lang, t } = useLanguage()
  const [activePdf, setActivePdf] = useState(null)
  const [activePdfName, setActivePdfName] = useState('')
  const content = productDetailContent[lang] || productDetailContent.de
  const page = content.sicherungsschaltgeraete

  const openPdf = (pdf, name) => { setActivePdf(pdf); setActivePdfName(name) }
  const closePdf = () => { setActivePdf(null); setActivePdfName('') }

  return (
    <main className="ssg-page">

      {/* ══ HERO ══ */}
      <section className="ssg-hero">
        <div className="ssg-hero-mesh" />
        <div className="container ssg-hero-inner">

          <div className="ssg-hero-text">
            <nav className="ssg-breadcrumb reveal" style={{'--sr-delay':'0s'}}>
              <Link to="/">{t('productPage.breadcrumb_home')}</Link>
              <span>/</span>
              <button className="ssg-bc-btn" onClick={() => { window.location.href = '/'; setTimeout(() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }), 150) }}>{t('productPage.breadcrumb_products')}</button>
              <span>/</span>
              <span>{page.breadcrumbCurrent}</span>
            </nav>

            <div className="section-label reveal-blur" style={{'--sr-delay':'0.08s'}}>{page.heroLabel}</div>
            <h1 className="ssg-hero-h1 reveal-blur" style={{'--sr-delay':'0.18s'}}>
              {page.heroTitle1}<br />
              <span className="ssg-green">{page.heroTitle2}</span>
            </h1>
            <p className="ssg-hero-desc reveal" style={{'--sr-delay':'0.28s'}}>
              {page.heroDesc}
            </p>

            <div className="ssg-hero-actions reveal" style={{'--sr-delay':'0.38s'}}>
              <Link to="/kontakt?produkt=Sicherungsschaltger%C3%A4te" className="btn-primary ssg-quote-btn">
                {t('productPage.request_btn')}
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
              <a href="#models" className="btn-dark">
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M8 3v7M5 7l3 3 3-3M3 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                {t('productPage.all_datasheets')}
              </a>
            </div>

            <div className="ssg-hero-badges reveal-stagger">
              {page.badges.map(b => (
                <span key={b} className="ssg-badge">{b}</span>
              ))}
            </div>
          </div>

          {/* Hero 3D canvas — auto-rotating */}
          <div className="ssg-hero-3d">
            <div className="ssg-ring ssg-ring-1" />
            <div className="ssg-ring ssg-ring-2" />
            <div className="ssg-ring ssg-ring-3" />
            <div
              className="ssg-canvas-wrap"
              onClick={() => document.getElementById('explorer')?.scrollIntoView({ behavior: 'smooth' })}
              title={t('productPage.hint')}
            >
              <Canvas
                camera={{ position: [0, 0.3, 9.0], fov: 38 }}
                gl={{ alpha: true, antialias: true }}
                style={{ width: '100%', height: '100%' }}
              >
                <ambientLight intensity={1.4} />
                <directionalLight position={[4, 8, 5]} intensity={3.5} color="#ffffff" />
                <directionalLight position={[-3, 3, -2]} intensity={1.2} color="#b0ffcc" />
                <pointLight position={[2, 0, 3]} intensity={1.0} color="#FFC704" />
                <Suspense fallback={<WireFallback />}>
                  <RotatingFuse />
                  <Environment preset="city" />
                </Suspense>
              </Canvas>
            </div>
            <div className="ssg-3d-hint">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
              {t('productPage.hint')}
            </div>
          </div>
        </div>
      </section>

      {/* ══ STATS BAR ══ */}
      <div className="ssg-stats-bar">
        {page.stats.map((s, i) => (
          <div key={i} className="ssg-stat-item">
            <strong>{s.v}</strong>
            <span>{s.l}</span>
          </div>
        ))}
      </div>

      {/* ══ PRODUCT MODELS + DATASHEETS ══ */}
      <section id="models" className="section ssg-models-section">
        <div className="container">
          <div className="section-header reveal-blur">
            <div className="section-label">{t('productPage.complete_range_label')}</div>
            <h2 className="section-title">{page.rangeTitle}</h2>
            <p className="section-sub">{page.rangeSub}</p>
            <div className="ssg-ds-strip">
              <div className="ssg-ds-strip-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <strong>10</strong> {t('productPage.official_datasheets_label')}
              </div>
              <span className="ssg-ds-sep" />
              <div className="ssg-ds-strip-item">
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M1 8s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z" stroke="currentColor" strokeWidth="1.5"/><circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5"/></svg>
                {t('productPage.view_in_browser')}
              </div>
              <span className="ssg-ds-sep" />
              <div className="ssg-ds-strip-item">
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M8 3v7M5 7l3 3 3-3M3 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                {t('productPage.download_directly')}
              </div>
            </div>
          </div>
          <div className="ssg-models-grid">
            {page.models.map((m, i) => (
              <div key={m.id} className="ssg-model-card reveal" style={{ '--sr-delay': `${i * 0.045}s` }}>
                <div className="ssg-model-icon">
                  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="10" y="3" width="12" height="26" rx="2.5"/>
                    <path d="M16 10l-3 7h5l-3 6 7-8h-5l4-5z"/>
                    <circle cx="16" cy="5.5" r="1.2" fill="currentColor" stroke="none"/>
                  </svg>
                </div>
                {m.tag && <span className="ssg-model-tag">{m.tag}</span>}
                <div className="ssg-model-num">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="ssg-model-name">{m.name}</h3>
                <p className="ssg-model-tagline">{m.tagline}</p>
                <p className="ssg-model-desc">{m.desc}</p>
                <div className="ssg-model-actions">
                  <button className="ssg-model-view" onClick={() => openPdf(m.pdf, m.name)}>
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M1 8s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z" stroke="currentColor" strokeWidth="1.5"/><circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5"/></svg>
                    {t('productPage.view_datasheet')}
                  </button>
                  <a href={m.pdf} download target="_blank" rel="noreferrer" className="ssg-model-dl">
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M8 3v7M5 7l3 3 3-3M3 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 3D EXPLORER ══ */}
      <section id="explorer" className="ssg-3d-section">
        <div className="ssg-3d-glow" />
        <div className="container ssg-3d-layout">
          <div className="ssg-3d-text reveal">
            <div className="section-label">{t('productPage.viewer_label')}</div>
            <h2 className="ssg-3d-heading">{t('productPage.explore_heading')}</h2>
            <p className="ssg-3d-body">{page.explorerBody}</p>
            <ul className="ssg-3d-controls">
              <li><span>⟳</span> {t('productPage.drag_rotate')}</li>
              <li><span>⊕</span> {t('productPage.scroll_zoom')}</li>
              <li><span>↕</span> {t('productPage.pan')}</li>
            </ul>
            <Link to="/kontakt?produkt=Sicherungsschaltger%C3%A4te" className="btn-primary ssg-quote-btn" style={{ marginTop: 28 }}>
              {t('productPage.technical_info_btn')}
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>

          <div className="ssg-3d-viewer reveal">
            <div className="ssg-viewer-badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
              {page.viewerBadge}
            </div>
            <Canvas camera={{ position: [0, 1.2, 5], fov: 44 }} gl={{ antialias: true }}>
              <color attach="background" args={['#060d18']} />
              <ambientLight intensity={0.6} />
              <spotLight position={[5, 8, 5]} intensity={2.0} angle={0.3} penumbra={0.6} color="#ffffff" castShadow />
              <spotLight position={[-5, 4, -4]} intensity={0.7} color="#13A538" />
              <pointLight position={[0, -1, 4]} intensity={0.4} color="#FFC704" />
              <Suspense fallback={<WireFallback />}>
                <ExplorerFuse />
                <ContactShadows position={[0, -1.5, 0]} opacity={0.5} scale={8} blur={2.5} far={5} />
                <Environment preset="city" />
              </Suspense>
              <OrbitControls enablePan minDistance={2.5} maxDistance={9} enableDamping dampingFactor={0.05} autoRotate autoRotateSpeed={0.6} />
            </Canvas>
          </div>
        </div>
      </section>

      {/* ══ SPECS + IMAGE ══ */}
      <section className="section ssg-specs-section">
        <div className="container">
          {/* Title centered above both columns */}
          <div className="section-header reveal">
            <div className="section-label">{t('productPage.specs_section_label')}</div>
            <h2 className="section-title">{t('productPage.specs_section_title')}</h2>
            <p className="section-sub">{page.specsSub}</p>
          </div>
          {/* Image + table, same height */}
          <div className="ssg-specs-layout reveal">
            <div className="ssg-specs-image-wrap">
              <img src="/images/products/fust_combination.png" alt={page.imageAlt} className="ssg-specs-img" />
              <div className="ssg-specs-img-overlay">
                <span className="ssg-specs-cert">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 4" stroke="#13A538" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  {page.certLabel}
                </span>
              </div>
            </div>
            <div className="ssg-specs-table-wrap">
              {page.specs.map((s, i) => (
                <div key={i} className="ssg-spec-row">
                  <span className="ssg-spec-key">{s.key}</span>
                  <span className="ssg-spec-val">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="pp-cta">
        <div className="container pp-cta-inner reveal">
          <div>
            <h2>{page.ctaTitle}</h2>
            <p>{t('productPage.cta_body')}</p>
          </div>
          <Link to="/kontakt?produkt=Sicherungsschaltger%C3%A4te" className="btn-primary ssg-quote-btn">
            {t('productPage.inquire_btn')}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </section>

      {/* ══ PDF MODAL ══ */}
      {activePdf && (
        <div className="ssg-pdf-overlay" onClick={closePdf}>
          <div className="ssg-pdf-modal" onClick={e => e.stopPropagation()}>
            <div className="ssg-pdf-header">
              <div className="ssg-pdf-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg>
                {activePdfName} — {t('productPage.datasheet')}
              </div>
              <div className="ssg-pdf-header-actions">
                <a href={activePdf} download target="_blank" rel="noreferrer" className="ssg-pdf-dl-btn">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 3v7M5 7l3 3 3-3M3 12h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  {t('productPage.download')}
                </a>
                <button className="ssg-pdf-close" onClick={closePdf} aria-label={lang === 'de' ? 'Schließen' : 'Close'}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/></svg>
                </button>
              </div>
            </div>
            <iframe
              src={activePdf}
              className="ssg-pdf-frame"
              title={`${activePdfName} ${t('productPage.datasheet')}`}
            />
          </div>
        </div>
      )}

    </main>
  )
}
