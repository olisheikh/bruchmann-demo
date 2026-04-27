import { Suspense, useRef, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls, ContactShadows, Environment } from '@react-three/drei'
import { useLanguage } from '../context/LanguageContext'
import { productDetailContent } from '../content/pageContent'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './Hauptschutz.css'

const GLB = '/3D_images/main_protection.glb'
useGLTF.preload(GLB)

const MODELS = [
  { id: 'tytan-ii-hs',      name: 'TYTAN® II',                    tagline: 'Full-coded main protection',    desc: 'Flashing indicator in plug, full coding for all current ratings. Sealable and lockable design for maximum security.',                                         pdf: '/pdfs/tytanII_hs_datasheet_katalog-neu-1.pdf',              tag: 'Flagship' },
  { id: 'tytan-ii-adapter', name: 'TYTAN® II Device Adapters',    tagline: '2-pole & 3-pole adapters',      desc: '2-pole 81 mm / 3-pole 108 mm. Mounted on 60 mm system adapters for copper conductors 12–30 mm wide.',                                                       pdf: '/pdfs/tytanII_geraeteadapter_hs_datasheet_katalog-update_2.pdf', tag: null   },
  { id: 'tytan-t4h-hs',     name: 'TYTAN® T4H / T4HP / T4HR',    tagline: 'Multi-phase monitoring',        desc: 'Compact 4 HP width. Potential-free changeover contact for fuse monitoring L1, L2, L3. Includes flashing indicator and universal fuse plug.',                  pdf: '/pdfs/t4h_p_r_datasheet_katalog-1.pdf',                     tag: null       },
  { id: 'tytan-rh4',        name: 'TYTAN® RH4',                   tagline: 'Self-powered indicator',        desc: 'Flashing indicator, self-powered design. Width 36 mm / 2 HP, lockable housing with fuse plug — operates without any auxiliary power supply.',               pdf: '/pdfs/rh4_datasheet_katalog-update.pdf',                    tag: null       },
  { id: 'tytan-rh1',        name: 'TYTAN® RH1 Main Protection',   tagline: 'Fuse & temperature monitoring', desc: 'Combines fuse and temperature monitoring with potential-free relay contacts for direct integration into building management systems.',                      pdf: '/pdfs/rh1_datasheet_katalog-update.pdf',                    tag: null       },
  { id: 'tytan-th1',        name: 'TYTAN® TH1 Main Protection',   tagline: 'Fuse & temperature monitoring', desc: 'Offers fuse and temperature monitoring with potential-free relay contacts — individual unit design for flexible panel installation.',                        pdf: '/pdfs/th1_datasheet_katalog-1.pdf',                         tag: null       },
  { id: 'tytan-rhbus',      name: 'TYTAN® RHBus',                 tagline: 'Modbus RTU — up to 28 devices', desc: 'Detailed fuse monitoring for up to 28 devices via Modbus RTU. Tracks individual temperatures and fuse switching positions simultaneously.',               pdf: '/pdfs/rhbus_datasheet_katalog-update.pdf',                  tag: 'Smart'    },
  { id: 'tytan-thbus',      name: 'TYTAN® THBus',                 tagline: 'Modbus RTU — temp & position',  desc: 'Monitors up to 28 devices via Modbus RTU — individual temperature and switching-position tracking for smart building integration.',                        pdf: '/pdfs/thbus_datasheet_katalog-2.pdf',                       tag: 'Smart'    },
  { id: 'rj-fuse',          name: 'RJ Fuse Monitoring',           tagline: '17.8 mm · 1 HP compact',        desc: 'Single-unit fuse monitoring at just 17.8 mm / 1 HP width — minimal footprint for tight panel and switchgear installations.',                              pdf: '/pdfs/rjueberwachung_datasheet_katalog.pdf',                tag: null       },
]

const SPECS = [
  { key: 'System',           value: 'TYTAN® II'         },
  { key: 'Rated Current',    value: 'up to 160 A'       },
  { key: 'Rated Voltage',    value: '230 / 400 V AC'    },
  { key: 'Protection Class', value: 'IP20'              },
  { key: 'Lockable',         value: 'Yes'               },
  { key: 'Sealable',         value: 'Yes'               },
  { key: 'Mounting',         value: 'DIN Rail EN 60715' },
  { key: 'Certification',    value: 'CE, VDE, EN 60269' },
]

/* ── 3D: hero (auto-rotating, cloned scene) ── */
function RotatingProtection() {
  const { scene } = useGLTF(GLB)
  const cloned = useMemo(() => scene.clone(true), [scene])
  const ref = useRef()
  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.elapsedTime * 0.4
    ref.current.position.y = Math.sin(clock.elapsedTime * 0.7) * 0.06 - 0.2
  })
  return <primitive ref={ref} object={cloned} scale={0.9} position={[0, -0.2, 0]} />
}

/* ── 3D: interactive explorer ── */
function ExplorerProtection() {
  const { scene } = useGLTF(GLB)
  return <primitive object={scene} scale={0.85} position={[0, -0.4, 0]} />
}

/* ── Fallback mesh while GLB loads ── */
function WireFallback() {
  const ref = useRef()
  useFrame(({ clock }) => { ref.current.rotation.y = clock.elapsedTime * 0.8 })
  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[0.75, 0.24, 128, 16]} />
      <meshStandardMaterial color="#13A538" wireframe opacity={0.7} transparent />
    </mesh>
  )
}

export default function Hauptschutz() {
  useScrollReveal()
  const { lang, t } = useLanguage()
  const [activePdf, setActivePdf]         = useState(null)
  const [activePdfName, setActivePdfName] = useState('')
  const page = (productDetailContent[lang] || productDetailContent.de).hauptschutz

  const openPdf  = (pdf, name) => { if (!pdf) return; setActivePdf(pdf); setActivePdfName(name) }
  const closePdf = () => { setActivePdf(null); setActivePdfName('') }

  return (
    <main className="hs-page">

      {/* ══ HERO ══ */}
      <section className="hs-hero">
        <div className="hs-hero-mesh" />
        <div className="container hs-hero-inner">

          <div className="hs-hero-text">
            <nav className="hs-breadcrumb reveal" style={{'--sr-delay':'0s'}}>
              <Link to="/">{t('productPage.breadcrumb_home')}</Link>
              <span>/</span>
              <button className="hs-bc-btn" onClick={() => { window.location.href = '/'; setTimeout(() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }), 150) }}>{t('productPage.breadcrumb_products')}</button>
              <span>/</span>
              <span>{page.breadcrumbCurrent}</span>
            </nav>

            <div className="section-label reveal-blur" style={{'--sr-delay':'0.08s'}}>{page.heroLabel}</div>
            <h1 className="hs-hero-h1 reveal-blur" style={{'--sr-delay':'0.18s'}}>
              {page.heroTitle1}<br />
              <span className="hs-green">{page.heroTitle2}</span>
            </h1>
            <p className="hs-hero-desc reveal" style={{'--sr-delay':'0.28s'}}>{page.heroDesc}</p>

            <div className="hs-hero-actions reveal" style={{'--sr-delay':'0.38s'}}>
              <Link to="/kontakt?produkt=Hauptschutz" className="btn-primary hs-quote-btn">
                {t('productPage.request_btn')}
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
              <a href="#models" className="btn-dark">
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M8 3v7M5 7l3 3 3-3M3 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                {t('productPage.all_datasheets')}
              </a>
            </div>

            <div className="hs-hero-badges reveal-stagger">
              {page.badges.map(b => (
                <span key={b} className="hs-badge">{b}</span>
              ))}
            </div>
          </div>

          {/* Hero 3D canvas — auto-rotating */}
          <div className="hs-hero-3d">
            <div className="hs-ring hs-ring-1" />
            <div className="hs-ring hs-ring-2" />
            <div className="hs-ring hs-ring-3" />
            <div
              className="hs-canvas-wrap"
              onClick={() => document.getElementById('hs-explorer')?.scrollIntoView({ behavior: 'smooth' })}
              title={t('productPage.hint')}
            >
              <Canvas
                camera={{ position: [0, 0.5, 9.5], fov: 48 }}
                gl={{ alpha: true, antialias: true }}
                style={{ width: '100%', height: '100%' }}
              >
                <ambientLight intensity={1.4} />
                <directionalLight position={[4, 8, 5]} intensity={3.5} color="#ffffff" />
                <directionalLight position={[-3, 3, -2]} intensity={1.2} color="#b0ffcc" />
                <pointLight position={[2, 0, 3]} intensity={1.0} color="#FFC704" />
                <Suspense fallback={<WireFallback />}>
                  <RotatingProtection />
                  <Environment preset="city" />
                </Suspense>
              </Canvas>
            </div>
            <div className="hs-3d-hint">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
              {t('productPage.hint')}
            </div>
          </div>
        </div>
      </section>

      {/* ══ STATS BAR ══ */}
      <div className="hs-stats-bar">
        {page.stats.map((s, i) => (
          <div key={i} className="hs-stat-item">
            <strong>{s.v}</strong>
            <span>{s.l}</span>
          </div>
        ))}
      </div>

      {/* ══ PRODUCT MODELS + DATASHEETS ══ */}
      <section id="models" className="section hs-models-section">
        <div className="container">
          <div className="section-header reveal-blur">
            <div className="section-label">{t('productPage.complete_range_label')}</div>
            <h2 className="section-title">{page.rangeTitle}</h2>
            <p className="section-sub">{page.rangeSub}</p>
            <div className="hs-ds-strip">
              <div className="hs-ds-strip-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <strong>9</strong> {t('productPage.official_datasheets_label')}
              </div>
              <span className="hs-ds-sep" />
              <div className="hs-ds-strip-item">
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M1 8s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z" stroke="currentColor" strokeWidth="1.5"/><circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5"/></svg>
                {t('productPage.view_in_browser')}
              </div>
              <span className="hs-ds-sep" />
              <div className="hs-ds-strip-item">
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M8 3v7M5 7l3 3 3-3M3 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                {t('productPage.download_directly')}
              </div>
            </div>
          </div>

          <div className="hs-models-grid">
            {page.models.map((m, i) => (
              <div key={m.id} className="hs-model-card reveal" style={{ '--sr-delay': `${i * 0.07}s` }}>
                <div className="hs-model-icon">
                  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 3L5 7.5v8c0 6 4.5 11.5 11 13.5 6.5-2 11-7.5 11-13.5v-8z"/>
                    <path d="M11 16l3.5 3.5L21 13" strokeWidth="1.6"/>
                  </svg>
                </div>
                {m.tag && <span className="hs-model-tag">{m.tag}</span>}
                <div className="hs-model-num">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="hs-model-name">{m.name}</h3>
                <p className="hs-model-tagline">{m.tagline}</p>
                <p className="hs-model-desc">{m.desc}</p>
                <div className="hs-model-actions">
                  <button
                    className="hs-model-view"
                    onClick={() => openPdf(m.pdf, m.name)}
                    disabled={!m.pdf}
                    style={{ opacity: m.pdf ? 1 : 0.38, cursor: m.pdf ? 'pointer' : 'default' }}
                  >
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M1 8s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z" stroke="currentColor" strokeWidth="1.5"/><circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5"/></svg>
                    {t('productPage.view_datasheet')}
                  </button>
                  <a
                    href={m.pdf || '#'}
                    download={!!m.pdf}
                    target={m.pdf ? '_blank' : undefined}
                    rel="noreferrer"
                    className="hs-model-dl"
                    style={{ opacity: m.pdf ? 1 : 0.38, pointerEvents: m.pdf ? 'auto' : 'none' }}
                    onClick={e => { if (!m.pdf) e.preventDefault() }}
                  >
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M8 3v7M5 7l3 3 3-3M3 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 3D EXPLORER ══ */}
      <section id="hs-explorer" className="hs-3d-section">
        <div className="hs-3d-glow" />
        <div className="container hs-3d-layout">
          <div className="hs-3d-text reveal">
            <div className="section-label">{t('productPage.viewer_label')}</div>
            <h2 className="hs-3d-heading">{t('productPage.explore_heading')}</h2>
            <p className="hs-3d-body">{page.explorerBody}</p>
            <ul className="hs-3d-controls">
              <li><span>⟳</span> {t('productPage.drag_rotate')}</li>
              <li><span>⊕</span> {t('productPage.scroll_zoom')}</li>
              <li><span>↕</span> {t('productPage.pan')}</li>
            </ul>
            <Link to="/kontakt?produkt=Hauptschutz" className="btn-primary hs-quote-btn" style={{ marginTop: 28 }}>
              {t('productPage.technical_info_btn')}
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>

          <div className="hs-3d-viewer reveal">
            <div className="hs-viewer-badge">
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
                <ExplorerProtection />
                <ContactShadows position={[0, -1.5, 0]} opacity={0.5} scale={8} blur={2.5} far={5} />
                <Environment preset="city" />
              </Suspense>
              <OrbitControls enablePan minDistance={2.5} maxDistance={9} enableDamping dampingFactor={0.05} autoRotate autoRotateSpeed={0.6} />
            </Canvas>
          </div>
        </div>
      </section>

      {/* ══ SPECS ══ */}
      <section className="section hs-specs-section">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-label">{t('productPage.specs_section_label')}</div>
            <h2 className="section-title">{t('productPage.specs_section_title')}</h2>
            <p className="section-sub">{page.specsSub}</p>
          </div>
          <div className="hs-specs-layout reveal">
            <div className="hs-specs-image-wrap">
              <img src="/images/products/main_protection.png" alt={page.imageAlt} className="hs-specs-img" />
              <div className="hs-specs-img-overlay">
                <span className="hs-specs-cert">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 4" stroke="#13A538" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  {page.certLabel}
                </span>
              </div>
            </div>
            <div className="hs-specs-table-wrap">
              {page.specs.map((s, i) => (
                <div key={i} className="hs-spec-row">
                  <span className="hs-spec-key">{s.key}</span>
                  <span className="hs-spec-val">{s.value}</span>
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
          <Link to="/kontakt?produkt=Hauptschutz" className="btn-primary hs-quote-btn">
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
            <iframe src={activePdf} className="ssg-pdf-frame" title={`${activePdfName} ${t('productPage.datasheet')}`} />
          </div>
        </div>
      )}

    </main>
  )
}
