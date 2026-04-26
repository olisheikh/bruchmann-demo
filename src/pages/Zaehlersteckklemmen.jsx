import { Suspense, useRef, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls, ContactShadows, Environment } from '@react-three/drei'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './Zaehlersteckklemmen.css'

const GLB = '/3D_images/plug_in_3D.glb'
useGLTF.preload(GLB)

const MODELS = [
  { id: 'adock-3phase',   name: 'ADOCK® 3-Phase Standard',    tagline: 'DIN 43857 · 3-point mount',        desc: 'Three-phase plug-in meter terminal for kWh meters per DIN 43857 with 3-point mounting. Patented ADOCK® contact system for safe, tool-free meter exchange.',           pdf: '/pdfs/adock_datasheet_katalog-update-1.pdf', tag: 'Flagship' },
  { id: 'adock-vfree',    name: 'ADOCK® Voltage-Free Exchange', tagline: 'No power interruption required',   desc: 'Exchange kWh meters without cutting the operating voltage to downstream systems. The ADOCK® isolation principle keeps circuits live throughout the swap.',            pdf: '/pdfs/adock_datasheet_katalog-update-1.pdf', tag: null       },
  { id: 'adock-bottom',   name: 'ADOCK® Bottom Connection',   tagline: 'Downward cable exit',               desc: 'Variant with all cable connections routed downward. Ideal for flush-mounted distribution boards where top cable routing is restricted or undesirable.',             pdf: '/pdfs/adock_datasheet_katalog-update-1.pdf', tag: null       },
  { id: 'adock-rear',     name: 'ADOCK® Rear Connection',     tagline: 'Rear cable exit',                   desc: 'Rear-exiting connection variant for installations requiring cables to enter from behind the panel. Compatible with all standard DIN 43857 electricity meters.',      pdf: '/pdfs/adock_datasheet_katalog-update-1.pdf', tag: null       },
  { id: 'adock-compact',  name: 'ADOCK® Compact',             tagline: 'Minimal footprint · IP20',          desc: 'Slim-profile ADOCK® design for confined installation situations. Minimal panel space requirement while maintaining full DIN 43857 compliance and 100 A rating.',    pdf: '/pdfs/adock_datasheet_katalog-update-1.pdf', tag: 'Compact'  },
  { id: 'adock-cover',    name: 'ADOCK® with Terminal Cover', tagline: 'Integrated cover · tamper-safe',    desc: 'Supplied with integrated terminal compartment cover. Compatible with standard meter terminal covers — provides additional protection and tamper evidence for utility use.', pdf: '/pdfs/adock_datasheet_katalog-update-1.pdf', tag: null       },
]

const SPECS = [
  { key: 'System',         value: 'ADOCK®'                       },
  { key: 'Compatibility',  value: 'DIN 43857, 3-point mounting'  },
  { key: 'Rated Current',  value: 'up to 100 A'                  },
  { key: 'Rated Voltage',  value: '230 / 400 V AC'               },
  { key: 'Connection',     value: 'bottom or rear'               },
  { key: 'Protection Class', value: 'IP20'                       },
  { key: 'Mounting',       value: 'DIN Rail EN 60715'            },
  { key: 'Certification',  value: 'CE, VDE, MID'                 },
]

/* ── 3D: hero (auto-rotating, cloned scene) ── */
function RotatingMeter() {
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
function ExplorerMeter() {
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

export default function Zaehlersteckklemmen() {
  useScrollReveal()
  const [activePdf, setActivePdf]         = useState(null)
  const [activePdfName, setActivePdfName] = useState('')

  const openPdf  = (pdf, name) => { if (!pdf) return; setActivePdf(pdf); setActivePdfName(name) }
  const closePdf = () => { setActivePdf(null); setActivePdfName('') }

  return (
    <main className="zt-page">

      {/* ══ HERO ══ */}
      <section className="zt-hero">
        <div className="zt-hero-mesh" />
        <div className="container zt-hero-inner">

          <div className="zt-hero-text">
            <nav className="zt-breadcrumb reveal" style={{'--sr-delay':'0s'}}>
              <Link to="/">Home</Link>
              <span>/</span>
              <button className="zt-bc-btn" onClick={() => { window.location.href = '/'; setTimeout(() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }), 150) }}>Products</button>
              <span>/</span>
              <span>Meter Terminal Blocks</span>
            </nav>

            <div className="section-label reveal-blur" style={{'--sr-delay':'0.08s'}}>ADOCK® System · DIN 43857</div>
            <h1 className="zt-hero-h1 reveal-blur" style={{'--sr-delay':'0.18s'}}>
              Meter Terminal<br />
              <span className="zt-green">Blocks</span>
            </h1>
            <p className="zt-hero-desc reveal" style={{'--sr-delay':'0.28s'}}>
              Plug-in meter connection terminals for kWh meters — patented ADOCK® system enables voltage-free meter exchange without interrupting downstream loads. Klaus Bruchmann GmbH, since 1985.
            </p>

            <div className="zt-hero-actions reveal" style={{'--sr-delay':'0.38s'}}>
              <Link to="/kontakt?produkt=Zählersteckklemmen" className="btn-primary zt-quote-btn">
                Request a Quote
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
              <a href="#models" className="btn-dark">
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M8 3v7M5 7l3 3 3-3M3 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                All Datasheets
              </a>
            </div>

            <div className="zt-hero-badges reveal-stagger">
              {['ISO 9001', 'ISO 14001', 'CE / VDE / MID', 'Made in Germany'].map(b => (
                <span key={b} className="zt-badge">{b}</span>
              ))}
            </div>
          </div>

          {/* Hero 3D canvas — auto-rotating */}
          <div className="zt-hero-3d">
            <div className="zt-ring zt-ring-1" />
            <div className="zt-ring zt-ring-2" />
            <div className="zt-ring zt-ring-3" />
            <div
              className="zt-canvas-wrap"
              onClick={() => document.getElementById('zt-explorer')?.scrollIntoView({ behavior: 'smooth' })}
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
                  <RotatingMeter />
                  <Environment preset="city" />
                </Suspense>
              </Canvas>
            </div>
            <div className="zt-3d-hint">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
              Click model · Open interactive viewer
            </div>
          </div>
        </div>
      </section>

      {/* ══ STATS BAR ══ */}
      <div className="zt-stats-bar">
        {[
          { v: '6',     l: 'Product Variants'   },
          { v: '100A',  l: 'Max Rated Current'  },
          { v: '400V',  l: 'Max Rated Voltage'  },
          { v: '1985',  l: 'Year Founded'       },
        ].map((s, i) => (
          <div key={i} className="zt-stat-item">
            <strong>{s.v}</strong>
            <span>{s.l}</span>
          </div>
        ))}
      </div>

      {/* ══ PRODUCT MODELS + DATASHEETS ══ */}
      <section id="models" className="section zt-models-section">
        <div className="container">
          <div className="section-header reveal-blur">
            <div className="section-label">Complete Product Range</div>
            <h2 className="section-title">ADOCK® Meter Terminal Blocks</h2>
            <p className="section-sub">6 ADOCK® variants — from standard 3-phase terminals to rear-connection and compact configurations for every panel layout.</p>
            <div className="zt-ds-strip">
              <div className="zt-ds-strip-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <strong>1</strong> Official PDF Catalog
              </div>
              <span className="zt-ds-sep" />
              <div className="zt-ds-strip-item">
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M1 8s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z" stroke="currentColor" strokeWidth="1.5"/><circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5"/></svg>
                View in browser
              </div>
              <span className="zt-ds-sep" />
              <div className="zt-ds-strip-item">
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M8 3v7M5 7l3 3 3-3M3 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Download directly
              </div>
            </div>
          </div>

          <div className="zt-models-grid">
            {MODELS.map((m, i) => (
              <div key={m.id} className="zt-model-card reveal" style={{ '--sr-delay': `${i * 0.06}s` }}>
                <div className="zt-model-icon">
                  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="8" width="22" height="16" rx="2"/>
                    <path d="M10 8V5M16 8V5M22 8V5"/>
                    <path d="M10 24v3M16 24v3M22 24v3"/>
                    <path d="M10 14h12M10 18h8"/>
                  </svg>
                </div>
                {m.tag && <span className="zt-model-tag">{m.tag}</span>}
                <div className="zt-model-num">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="zt-model-name">{m.name}</h3>
                <p className="zt-model-tagline">{m.tagline}</p>
                <p className="zt-model-desc">{m.desc}</p>
                <div className="zt-model-actions">
                  <button
                    className="zt-model-view"
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
                    className="zt-model-dl"
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
      <section id="zt-explorer" className="zt-3d-section">
        <div className="zt-3d-glow" />
        <div className="container zt-3d-layout">
          <div className="zt-3d-text reveal">
            <div className="section-label">Interactive Viewer</div>
            <h2 className="zt-3d-heading">Explore in 3D</h2>
            <p className="zt-3d-body">Inspect the ADOCK® meter terminal block from every angle. Drag, zoom and pan to examine the plug-in contact system and connection terminals in detail.</p>
            <ul className="zt-3d-controls">
              <li><span>⟳</span> Drag — Rotate</li>
              <li><span>⊕</span> Scroll — Zoom</li>
              <li><span>↕</span> Right-drag — Pan</li>
            </ul>
            <Link to="/kontakt?produkt=Zählersteckklemmen" className="btn-primary zt-quote-btn" style={{ marginTop: 28 }}>
              Request Technical Info
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>

          <div className="zt-3d-viewer reveal">
            <div className="zt-viewer-badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
              ADOCK® Meter Terminal
            </div>
            <Canvas camera={{ position: [0, 1.2, 5], fov: 44 }} gl={{ antialias: true }}>
              <color attach="background" args={['#060d18']} />
              <ambientLight intensity={0.6} />
              <spotLight position={[5, 8, 5]} intensity={2.0} angle={0.3} penumbra={0.6} color="#ffffff" castShadow />
              <spotLight position={[-5, 4, -4]} intensity={0.7} color="#13A538" />
              <pointLight position={[0, -1, 4]} intensity={0.4} color="#FFC704" />
              <Suspense fallback={<WireFallback />}>
                <ExplorerMeter />
                <ContactShadows position={[0, -1.5, 0]} opacity={0.5} scale={8} blur={2.5} far={5} />
                <Environment preset="city" />
              </Suspense>
              <OrbitControls enablePan minDistance={2.5} maxDistance={9} enableDamping dampingFactor={0.05} autoRotate autoRotateSpeed={0.6} />
            </Canvas>
          </div>
        </div>
      </section>

      {/* ══ SPECS ══ */}
      <section className="section zt-specs-section">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-label">Technical Data</div>
            <h2 className="section-title">General Specifications</h2>
            <p className="section-sub">Key parameters for the ADOCK® meter terminal block range. Refer to the product catalog for complete specifications.</p>
          </div>
          <div className="zt-specs-layout reveal">
            <div className="zt-specs-image-wrap">
              <img src="/images/products/plug_in_meter_connection_terminals.png" alt="ADOCK® Meter Terminal Block" className="zt-specs-img" />
              <div className="zt-specs-img-overlay">
                <span className="zt-specs-cert">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 4" stroke="#13A538" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  ISO 9001 · CE · VDE · MID Certified
                </span>
              </div>
            </div>
            <div className="zt-specs-table-wrap">
              {SPECS.map((s, i) => (
                <div key={i} className="zt-spec-row">
                  <span className="zt-spec-key">{s.key}</span>
                  <span className="zt-spec-val">{s.value}</span>
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
            <h2>Interested in the ADOCK® System?</h2>
            <p>Our team will advise you personally — contact us today.</p>
          </div>
          <Link to="/kontakt?produkt=Zählersteckklemmen" className="btn-primary zt-quote-btn">
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
