import { Suspense, useRef, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls, ContactShadows, Environment } from '@react-three/drei'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './Relais.css'

const GLB = '/3D_images/plug_in_3D.glb'
useGLTF.preload(GLB)

const MODELS = [
  { id: 'net-monitor',    name: 'Network Monitoring Relay',    tagline: '3-phase · neutral · LED',          desc: 'All-in-one three-phase network relay with undervoltage, phase failure, phase sequence and neutral conductor monitoring. Integrated LED fault indicator.',       pdf: '/pdfs/Alle-Relais_datasheet_katalog_update.pdf', tag: 'Flagship' },
  { id: 'undervoltage',   name: 'Undervoltage Relay',          tagline: 'Adjustable trip threshold',         desc: 'Monitors phase voltages continuously against an adjustable threshold. Trips output relay and lights fault LED when voltage drops below setpoint.',             pdf: '/pdfs/Alle-Relais_datasheet_katalog_update.pdf', tag: null       },
  { id: 'phase-failure',  name: 'Phase Failure Monitor',       tagline: 'Individual phase detection',        desc: 'Reliably detects the loss of any individual phase in three-phase systems. Protects motors and equipment from running single-phase.',                         pdf: '/pdfs/Alle-Relais_datasheet_katalog_update.pdf', tag: null       },
  { id: 'phase-seq',      name: 'Phase Sequence Relay',        tagline: 'Rotation direction guard',          desc: 'Verifies correct L1–L2–L3 rotation order before enabling load. Prevents costly motor damage caused by phase reversal in industrial installations.',          pdf: '/pdfs/Alle-Relais_datasheet_katalog_update.pdf', tag: null       },
  { id: 'neutral-mon',    name: 'Neutral Conductor Monitor',   tagline: 'Full network supervision',          desc: 'Extends monitoring to the neutral conductor for complete four-wire network supervision. Ideal for TN-S systems requiring full fault coverage.',                pdf: '/pdfs/Alle-Relais_datasheet_katalog_update.pdf', tag: null       },
  { id: 'compact-din',    name: 'Compact DIN Rail Relay',      tagline: '17.5 mm · universal mount',         desc: 'Slim 17.5 mm DIN rail relay providing network monitoring in minimal panel space. Universal 3 × 400 V AC supply, IP20, suitable for all standard rail sizes.', pdf: '/pdfs/Alle-Relais_datasheet_katalog_update.pdf', tag: 'Compact'  },
]

const SPECS = [
  { key: 'Monitoring',          value: 'Undervoltage, Phase Failure, Phase Sequence' },
  { key: 'Rated Voltage',       value: '3 × 400 V AC'                                },
  { key: 'Frequency',           value: '50 / 60 Hz'                                  },
  { key: 'Trip Threshold',      value: 'adjustable'                                  },
  { key: 'Output Relay',        value: '1 changeover contact'                        },
  { key: 'Contact Rated Current', value: '8 A / 250 V'                               },
  { key: 'Protection Class',    value: 'IP20'                                        },
  { key: 'Certification',       value: 'CE, VDE'                                     },
]

/* ── 3D: hero (auto-rotating, cloned scene) ── */
function RotatingRelay() {
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
function ExplorerRelay() {
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

export default function Relais() {
  useScrollReveal()
  const [activePdf, setActivePdf]         = useState(null)
  const [activePdfName, setActivePdfName] = useState('')

  const openPdf  = (pdf, name) => { if (!pdf) return; setActivePdf(pdf); setActivePdfName(name) }
  const closePdf = () => { setActivePdf(null); setActivePdfName('') }

  return (
    <main className="rl-page">

      {/* ══ HERO ══ */}
      <section className="rl-hero">
        <div className="rl-hero-mesh" />
        <div className="container rl-hero-inner">

          <div className="rl-hero-text">
            <nav className="rl-breadcrumb reveal" style={{'--sr-delay':'0s'}}>
              <Link to="/">Home</Link>
              <span>/</span>
              <button className="rl-bc-btn" onClick={() => { window.location.href = '/'; setTimeout(() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }), 150) }}>Products</button>
              <span>/</span>
              <span>Relays</span>
            </nav>

            <div className="section-label reveal-blur" style={{'--sr-delay':'0.08s'}}>Network Monitoring · Phase Protection</div>
            <h1 className="rl-hero-h1 reveal-blur" style={{'--sr-delay':'0.18s'}}>
              Monitoring<br />
              <span className="rl-green">Relays</span>
            </h1>
            <p className="rl-hero-desc reveal" style={{'--sr-delay':'0.28s'}}>
              Reliable network monitoring relays for three-phase systems — undervoltage protection, phase failure detection and phase sequence supervision in a compact DIN rail package. Klaus Bruchmann GmbH, since 1985.
            </p>

            <div className="rl-hero-actions reveal" style={{'--sr-delay':'0.38s'}}>
              <Link to="/kontakt?produkt=Relais" className="btn-primary rl-quote-btn">
                Request a Quote
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
              <a href="#models" className="btn-dark">
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M8 3v7M5 7l3 3 3-3M3 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                All Datasheets
              </a>
            </div>

            <div className="rl-hero-badges reveal-stagger">
              {['ISO 9001', 'ISO 14001', 'CE / VDE', 'Made in Germany'].map(b => (
                <span key={b} className="rl-badge">{b}</span>
              ))}
            </div>
          </div>

          {/* Hero 3D canvas — auto-rotating */}
          <div className="rl-hero-3d">
            <div className="rl-ring rl-ring-1" />
            <div className="rl-ring rl-ring-2" />
            <div className="rl-ring rl-ring-3" />
            <div
              className="rl-canvas-wrap"
              onClick={() => document.getElementById('rl-explorer')?.scrollIntoView({ behavior: 'smooth' })}
              title="Click to explore the 3D model"
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
                  <RotatingRelay />
                  <Environment preset="city" />
                </Suspense>
              </Canvas>
            </div>
            <div className="rl-3d-hint">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
              Click model · Open interactive viewer
            </div>
          </div>
        </div>
      </section>

      {/* ══ STATS BAR ══ */}
      <div className="rl-stats-bar">
        {[
          { v: '6',     l: 'Relay Types'         },
          { v: '400V',  l: 'Rated Voltage'        },
          { v: '8A',    l: 'Contact Current'      },
          { v: '1985',  l: 'Year Founded'         },
        ].map((s, i) => (
          <div key={i} className="rl-stat-item">
            <strong>{s.v}</strong>
            <span>{s.l}</span>
          </div>
        ))}
      </div>

      {/* ══ PRODUCT MODELS + DATASHEETS ══ */}
      <section id="models" className="section rl-models-section">
        <div className="container">
          <div className="section-header reveal-blur">
            <div className="section-label">Complete Product Range</div>
            <h2 className="section-title">Network Monitoring Relays</h2>
            <p className="section-sub">6 monitoring relay types — from all-in-one network supervisors to dedicated undervoltage, phase failure and phase sequence guards.</p>
            <div className="rl-ds-strip">
              <div className="rl-ds-strip-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <strong>1</strong> Official PDF Catalog
              </div>
              <span className="rl-ds-sep" />
              <div className="rl-ds-strip-item">
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M1 8s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z" stroke="currentColor" strokeWidth="1.5"/><circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5"/></svg>
                View in browser
              </div>
              <span className="rl-ds-sep" />
              <div className="rl-ds-strip-item">
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M8 3v7M5 7l3 3 3-3M3 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Download directly
              </div>
            </div>
          </div>

          <div className="rl-models-grid">
            {MODELS.map((m, i) => (
              <div key={m.id} className="rl-model-card reveal" style={{ '--sr-delay': `${i * 0.06}s` }}>
                <div className="rl-model-icon">
                  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="16" cy="16" r="10"/>
                    <circle cx="16" cy="16" r="5"/>
                    <path d="M16 6V3M16 29v-3M6 16H3M29 16h-3"/>
                    <path d="M9.17 9.17L7.05 7.05M24.95 24.95l-2.12-2.12"/>
                  </svg>
                </div>
                {m.tag && <span className="rl-model-tag">{m.tag}</span>}
                <div className="rl-model-num">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="rl-model-name">{m.name}</h3>
                <p className="rl-model-tagline">{m.tagline}</p>
                <p className="rl-model-desc">{m.desc}</p>
                <div className="rl-model-actions">
                  <button
                    className="rl-model-view"
                    onClick={() => openPdf(m.pdf, m.name)}
                    disabled={!m.pdf}
                    style={{ opacity: m.pdf ? 1 : 0.38, cursor: m.pdf ? 'pointer' : 'default' }}
                  >
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M1 8s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z" stroke="currentColor" strokeWidth="1.5"/><circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5"/></svg>
                    View Datasheet
                  </button>
                  <a
                    href={m.pdf || '#'}
                    download={!!m.pdf}
                    target={m.pdf ? '_blank' : undefined}
                    rel="noreferrer"
                    className="rl-model-dl"
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
      <section id="rl-explorer" className="rl-3d-section">
        <div className="rl-3d-glow" />
        <div className="container rl-3d-layout">
          <div className="rl-3d-text reveal">
            <div className="section-label">Interactive Viewer</div>
            <h2 className="rl-3d-heading">Explore in 3D</h2>
            <p className="rl-3d-body">Inspect the relay module from every angle. Drag, zoom and pan to examine the DIN rail form factor and connection terminals in detail.</p>
            <ul className="rl-3d-controls">
              <li><span>⟳</span> Drag — Rotate</li>
              <li><span>⊕</span> Scroll — Zoom</li>
              <li><span>↕</span> Right-drag — Pan</li>
            </ul>
            <Link to="/kontakt?produkt=Relais" className="btn-primary rl-quote-btn" style={{ marginTop: 28 }}>
              Request Technical Info
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>

          <div className="rl-3d-viewer reveal">
            <div className="rl-viewer-badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
              Bruchmann Monitoring Relay
            </div>
            <Canvas camera={{ position: [0, 1.2, 5], fov: 44 }} gl={{ antialias: true }}>
              <color attach="background" args={['#060d18']} />
              <ambientLight intensity={0.6} />
              <spotLight position={[5, 8, 5]} intensity={2.0} angle={0.3} penumbra={0.6} color="#ffffff" castShadow />
              <spotLight position={[-5, 4, -4]} intensity={0.7} color="#13A538" />
              <pointLight position={[0, -1, 4]} intensity={0.4} color="#FFC704" />
              <Suspense fallback={<WireFallback />}>
                <ExplorerRelay />
                <ContactShadows position={[0, -1.5, 0]} opacity={0.5} scale={8} blur={2.5} far={5} />
                <Environment preset="city" />
              </Suspense>
              <OrbitControls enablePan minDistance={2.5} maxDistance={9} enableDamping dampingFactor={0.05} autoRotate autoRotateSpeed={0.6} />
            </Canvas>
          </div>
        </div>
      </section>

      {/* ══ SPECS ══ */}
      <section className="section rl-specs-section">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-label">Technical Data</div>
            <h2 className="section-title">General Specifications</h2>
            <p className="section-sub">Key parameters for the Bruchmann monitoring relay range. Refer to the product catalog for complete specifications.</p>
          </div>
          <div className="rl-specs-layout reveal">
            <div className="rl-specs-image-wrap">
              <img src="/images/products/relays.png" alt="Monitoring Relay" className="rl-specs-img" />
              <div className="rl-specs-img-overlay">
                <span className="rl-specs-cert">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 4" stroke="#13A538" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  ISO 9001 · ISO 14001 Certified
                </span>
              </div>
            </div>
            <div className="rl-specs-table-wrap">
              {SPECS.map((s, i) => (
                <div key={i} className="rl-spec-row">
                  <span className="rl-spec-key">{s.key}</span>
                  <span className="rl-spec-val">{s.value}</span>
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
            <h2>Interested in the Relay Range?</h2>
            <p>Our team will advise you personally — contact us today.</p>
          </div>
          <Link to="/kontakt?produkt=Relais" className="btn-primary rl-quote-btn">
            Inquire Now
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
                {activePdfName} — Datasheet
              </div>
              <div className="ssg-pdf-header-actions">
                <a href={activePdf} download target="_blank" rel="noreferrer" className="ssg-pdf-dl-btn">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 3v7M5 7l3 3 3-3M3 12h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Download
                </a>
                <button className="ssg-pdf-close" onClick={closePdf} aria-label="Close">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/></svg>
                </button>
              </div>
            </div>
            <iframe src={activePdf} className="ssg-pdf-frame" title={`${activePdfName} Datasheet`} />
          </div>
        </div>
      )}

    </main>
  )
}
