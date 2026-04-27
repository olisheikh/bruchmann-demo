import { Suspense, useRef, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls, ContactShadows, Environment } from '@react-three/drei'
import { useLanguage } from '../context/LanguageContext'
import { productDetailContent } from '../content/pageContent'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './Sammelschienensystem.css'

const GLB = '/3D_images/busbar_3D.glb'
useGLTF.preload(GLB)

const MODELS = [
  { id: 'tytan-r',          name: 'TYTAN® R',                        tagline: '27 mm · all-pole switching',      desc: 'Flashing indicator, all-pole switching, fuse plug, lockable. Optional current measurement & signaling. Compatible with 5–10 mm busbars, 12–30 mm wide.',       pdf: '/pdfs/tytan_r_datasheet_katalog.pdf',                        tag: 'Popular'  },
  { id: 'coron-r',          name: 'CORON® R',                        tagline: 'Compact low-profile design',       desc: 'Compact, low-profile design with flashing indicator, fuse plug, lockable construction and optional extension for flexible busbar system integration.',        pdf: '/pdfs/coron_r_datasheet_katalog.pdf',                        tag: null       },
  { id: 'tytan-ii-bs',      name: 'TYTAN® II on Device Adapters',    tagline: '2-pole & 3-pole variants',         desc: '2-pole 81 mm / 3-pole 108 mm. Mounted on 60 mm system device adapters. Compatible copper busbar widths 12–30 mm, thickness 5 or 10 mm.',                    pdf: '/pdfs/tytanII_geraeteadapter_hs_datasheet_katalog-update_2.pdf', tag: 'Flagship' },
  { id: 'tytan-adapter',    name: 'TYTAN® Device Adapter',           tagline: 'DO load break switch ready',       desc: 'Load break switch capability with TYTAN® D0. Ready for 60 mm busbar adapter connection with integrated feed-in and touch protection.',                       pdf: '/pdfs/tytan_geraeteadapter_datasheet_katalog.pdf',            tag: null       },
  { id: 'device-adapter',   name: 'Device Adapter',                  tagline: 'Adjustable mounting rail',         desc: 'Mounting rail adjustable in millimeter increments. Features low-loss double contacting and attachable extension functionality for maximum flexibility.',       pdf: '/pdfs/adapter_sammelschiene_geraete_datasheet_bm.pdf',        tag: null       },
  { id: 'tytan-rh1-bs',     name: 'TYTAN® RH1 Main Protection',      tagline: 'Fuse & temperature monitoring',    desc: 'Fuse monitoring and temperature supervision with potential-free relay contacts for direct integration into building management or monitoring systems.',         pdf: '/pdfs/rh1_datasheet_katalog-update.pdf',                      tag: null       },
  { id: 'tytan-rhbus-bs',   name: 'TYTAN® RHBus',                   tagline: 'Modbus RTU — up to 28 devices',    desc: 'Detailed fuse monitoring for up to 28 devices via Modbus RTU. Tracks individual temperatures and fuse switching positions simultaneously.',                  pdf: '/pdfs/rhbus_datasheet_katalog-update.pdf',                    tag: 'Smart'    },
  { id: 'tytan-rh4-bs',     name: 'TYTAN® RH4 Main Protection',      tagline: 'Self-powered · 36 mm / 2 HP',      desc: 'Self-powered flashing indicator in a 36 mm / 2 HP lockable housing with fuse plug — operates without any auxiliary power supply.',                            pdf: '/pdfs/rh4_datasheet_katalog-update.pdf',                      tag: null       },
  { id: 'd0-clip',          name: 'D0 Clip Fuse Base',               tagline: 'E18 stainless-steel clamp',        desc: 'Distinctive labeling field, stainless-steel clamp, lateral finger protection and plug-in rear contact guard for safe D0 fuse base installations.',           pdf: '/pdfs/d0_sicherungssockele18_datasheet_katalog.pdf',          tag: null       },
  { id: 'pancero',          name: 'PANCERO Protection Profile',      tagline: 'Tool-secured · 1000 mm',           desc: 'Snap-lock closure requiring tool access. High-temperature-resistant PA66 plastic, 1000 mm length. Compatible widths 12–30 mm — individually cuttable.',    pdf: null,                                                          tag: null       },
  { id: 'busbar-support',   name: 'Busbar Support',                  tagline: 'Reversible · 12–30 mm busbars',    desc: 'Reversible base for 12–30 mm busbars (5 and 10 mm thickness). Compatible with Striebel & John distribution boards, internal mounting capability.',        pdf: '/pdfs/sammelschienentraeger_datasheet_katalog-update.pdf',    tag: null       },
]

const SPECS = [
  { key: 'System Voltage',   value: 'up to 690 V AC'       },
  { key: 'Rated Current',    value: 'up to 1000 A'         },
  { key: 'Busbar Widths',    value: '12 / 15 / 20 / 25 / 30 mm' },
  { key: 'Busbar Thickness', value: '5 mm / 10 mm'         },
  { key: 'Material',         value: 'Copper / Aluminium'   },
  { key: 'Protection Class', value: 'IP20 – IP40'          },
  { key: 'Mounting',         value: 'Vertical / Horizontal'},
  { key: 'Certification',    value: 'CE, EN 61439'         },
]

/* ── 3D: hero (auto-rotating, cloned scene) ── */
function RotatingBusbar() {
  const { scene } = useGLTF(GLB)
  const cloned = useMemo(() => scene.clone(true), [scene])
  const ref = useRef()
  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.elapsedTime * 0.4
    ref.current.position.y = Math.sin(clock.elapsedTime * 0.7) * 0.06 - 0.2
  })
  return <primitive ref={ref} object={cloned} scale={1.4} position={[0, -0.2, 0]} />
}

/* ── 3D: interactive explorer ── */
function ExplorerBusbar() {
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

export default function Sammelschienensystem() {
  useScrollReveal()
  const { lang, t } = useLanguage()
  const [activePdf, setActivePdf]         = useState(null)
  const [activePdfName, setActivePdfName] = useState('')
  const page = (productDetailContent[lang] || productDetailContent.de).sammelschienensystem

  const openPdf  = (pdf, name) => { if (!pdf) return; setActivePdf(pdf); setActivePdfName(name) }
  const closePdf = () => { setActivePdf(null); setActivePdfName('') }

  return (
    <main className="bs-page">

      {/* ══ HERO ══ */}
      <section className="bs-hero">
        <div className="bs-hero-mesh" />
        <div className="container bs-hero-inner">

          <div className="bs-hero-text">
            <nav className="bs-breadcrumb reveal" style={{'--sr-delay':'0s'}}>
              <Link to="/">{t('productPage.breadcrumb_home')}</Link>
              <span>/</span>
              <button className="bs-bc-btn" onClick={() => { window.location.href = '/'; setTimeout(() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }), 150) }}>{t('productPage.breadcrumb_products')}</button>
              <span>/</span>
              <span>{page.breadcrumbCurrent}</span>
            </nav>

            <div className="section-label reveal-blur" style={{'--sr-delay':'0.08s'}}>{page.heroLabel}</div>
            <h1 className="bs-hero-h1 reveal-blur" style={{'--sr-delay':'0.18s'}}>
              {page.heroTitle1}<br />
              <span className="bs-green">{page.heroTitle2}</span>
            </h1>
            <p className="bs-hero-desc reveal" style={{'--sr-delay':'0.28s'}}>{page.heroDesc}</p>

            <div className="bs-hero-actions reveal" style={{'--sr-delay':'0.38s'}}>
              <Link to="/kontakt?produkt=Sammelschienensystem" className="btn-primary bs-quote-btn">
                {t('productPage.request_btn')}
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
              <a href="#models" className="btn-dark">
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M8 3v7M5 7l3 3 3-3M3 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                {t('productPage.all_datasheets')}
              </a>
            </div>

            <div className="bs-hero-badges reveal-stagger">
              {page.badges.map(b => (
                <span key={b} className="bs-badge">{b}</span>
              ))}
            </div>
          </div>

          {/* Hero 3D canvas — auto-rotating */}
          <div className="bs-hero-3d">
            <div className="bs-ring bs-ring-1" />
            <div className="bs-ring bs-ring-2" />
            <div className="bs-ring bs-ring-3" />
            <div
              className="bs-canvas-wrap"
              onClick={() => document.getElementById('bs-explorer')?.scrollIntoView({ behavior: 'smooth' })}
              title={t('productPage.hint')}
            >
              <Canvas
                camera={{ position: [0, 0.5, 7.5], fov: 52 }}
                gl={{ alpha: true, antialias: true }}
                style={{ width: '100%', height: '100%' }}
              >
                <ambientLight intensity={1.4} />
                <directionalLight position={[4, 8, 5]} intensity={3.5} color="#ffffff" />
                <directionalLight position={[-3, 3, -2]} intensity={1.2} color="#b0ffcc" />
                <pointLight position={[2, 0, 3]} intensity={1.0} color="#FFC704" />
                <Suspense fallback={<WireFallback />}>
                  <RotatingBusbar />
                  <Environment preset="city" />
                </Suspense>
              </Canvas>
            </div>
            <div className="bs-3d-hint">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
              {t('productPage.hint')}
            </div>
          </div>
        </div>
      </section>

      {/* ══ STATS BAR ══ */}
      <div className="bs-stats-bar">
        {page.stats.map((s, i) => (
          <div key={i} className="bs-stat-item">
            <strong>{s.v}</strong>
            <span>{s.l}</span>
          </div>
        ))}
      </div>

      {/* ══ PRODUCT MODELS + DATASHEETS ══ */}
      <section id="models" className="section bs-models-section">
        <div className="container">
          <div className="section-header reveal-blur">
            <div className="section-label">{t('productPage.complete_range_label')}</div>
            <h2 className="section-title">{page.rangeTitle}</h2>
            <p className="section-sub">{page.rangeSub}</p>
            <div className="bs-ds-strip">
              <div className="bs-ds-strip-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <strong>10</strong> {t('productPage.official_datasheets_label')}
              </div>
              <span className="bs-ds-sep" />
              <div className="bs-ds-strip-item">
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M1 8s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z" stroke="currentColor" strokeWidth="1.5"/><circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5"/></svg>
                {t('productPage.view_in_browser')}
              </div>
              <span className="bs-ds-sep" />
              <div className="bs-ds-strip-item">
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M8 3v7M5 7l3 3 3-3M3 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                {t('productPage.download_directly')}
              </div>
            </div>
          </div>

          <div className="bs-models-grid">
            {page.models.map((m, i) => (
              <div key={m.id} className="bs-model-card reveal" style={{ '--sr-delay': `${i * 0.06}s` }}>
                <div className="bs-model-icon">
                  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="11" width="24" height="4" rx="1"/>
                    <rect x="4" y="18" width="24" height="4" rx="1"/>
                    <path d="M8 11V8M16 11V8M24 11V8M8 22v3M16 22v3M24 22v3"/>
                  </svg>
                </div>
                {m.tag && <span className="bs-model-tag">{m.tag}</span>}
                <div className="bs-model-num">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="bs-model-name">{m.name}</h3>
                <p className="bs-model-tagline">{m.tagline}</p>
                <p className="bs-model-desc">{m.desc}</p>
                <div className="bs-model-actions">
                  <button
                    className="bs-model-view"
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
                    className="bs-model-dl"
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
      <section id="bs-explorer" className="bs-3d-section">
        <div className="bs-3d-glow" />
        <div className="container bs-3d-layout">
          <div className="bs-3d-text reveal">
            <div className="section-label">{t('productPage.viewer_label')}</div>
            <h2 className="bs-3d-heading">{t('productPage.explore_heading')}</h2>
            <p className="bs-3d-body">{page.explorerBody}</p>
            <ul className="bs-3d-controls">
              <li><span>⟳</span> {t('productPage.drag_rotate')}</li>
              <li><span>⊕</span> {t('productPage.scroll_zoom')}</li>
              <li><span>↕</span> {t('productPage.pan')}</li>
            </ul>
            <Link to="/kontakt?produkt=Sammelschienensystem" className="btn-primary bs-quote-btn" style={{ marginTop: 28 }}>
              {t('productPage.technical_info_btn')}
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>

          <div className="bs-3d-viewer reveal">
            <div className="bs-viewer-badge">
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
                <ExplorerBusbar />
                <ContactShadows position={[0, -1.5, 0]} opacity={0.5} scale={8} blur={2.5} far={5} />
                <Environment preset="city" />
              </Suspense>
              <OrbitControls enablePan minDistance={2.5} maxDistance={9} enableDamping dampingFactor={0.05} autoRotate autoRotateSpeed={0.6} />
            </Canvas>
          </div>
        </div>
      </section>

      {/* ══ SPECS ══ */}
      <section className="section bs-specs-section">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-label">{t('productPage.specs_section_label')}</div>
            <h2 className="section-title">{t('productPage.specs_section_title')}</h2>
            <p className="section-sub">{page.specsSub}</p>
          </div>
          <div className="bs-specs-layout reveal">
            <div className="bs-specs-image-wrap">
              <img src="/images/products/busbar_system.png" alt={page.imageAlt} className="bs-specs-img" />
              <div className="bs-specs-img-overlay">
                <span className="bs-specs-cert">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 4" stroke="#13A538" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  {page.certLabel}
                </span>
              </div>
            </div>
            <div className="bs-specs-table-wrap">
              {page.specs.map((s, i) => (
                <div key={i} className="bs-spec-row">
                  <span className="bs-spec-key">{s.key}</span>
                  <span className="bs-spec-val">{s.value}</span>
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
          <Link to="/kontakt?produkt=Sammelschienensystem" className="btn-primary bs-quote-btn">
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
