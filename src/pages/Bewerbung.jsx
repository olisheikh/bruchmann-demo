import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './Bewerbung.css'

/* ── derive requirements from position title ── */
function getRequirements(pos) {
  const p = pos.toLowerCase()
  if (p.includes('electric') || p.includes('mechatro')) {
    return {
      must: [
        'Completed apprenticeship in electrical engineering or mechatronics',
        'Experience with electronic assemblies and circuit testing',
        'Knowledge of relevant safety and quality standards',
        'Ability to read technical drawings and schematics',
      ],
      nice: [
        'Experience with DIN rail protection systems',
        'Familiarity with ISO 9001 documentation',
        'PLC or automation knowledge',
        'English language skills',
      ],
    }
  }
  if (p.includes('sales') || p.includes('vertrieb')) {
    return {
      must: [
        'Technical background in electrical engineering or related field',
        'Experience in B2B industrial sales or customer consulting',
        'Strong communication and presentation skills',
        'Driving licence (Class B)',
      ],
      nice: [
        'Existing network in the electrical distribution sector',
        'CRM system experience',
        'English language skills',
        'Home-office setup for hybrid work',
      ],
    }
  }
  return {
    must: [
      'Relevant vocational training or university degree',
      'Hands-on experience in a comparable role',
      'Team-oriented mindset with reliable work ethic',
      'German language skills (B2 or higher)',
    ],
    nice: [
      'Experience in the electrical engineering industry',
      'Knowledge of quality management systems',
      'Additional language skills (English, French)',
      'Willingness for occasional travel',
    ],
  }
}

const GENDERS = ['Please select', 'Male', 'Female', 'Non-binary', 'Prefer not to say']
const COUNTRIES = [
  'Germany', 'Austria', 'Switzerland', 'France', 'Netherlands', 'Belgium',
  'Italy', 'Spain', 'Poland', 'Czech Republic', 'United Kingdom', 'Other',
]

export default function Bewerbung() {
  useScrollReveal()
  const location = useLocation()
  const params   = new URLSearchParams(location.search)
  const position = params.get('stelle') || 'Unsolicited Application'
  const reqs     = getRequirements(position)

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', mobile: '',
    street: '', houseNo: '', postalCode: '', city: '',
    country: 'Germany', gender: '',
    message: '', file: null,
  })
  const [sent, setSent]         = useState(false)
  const [dragOver, setDragOver] = useState(false)

  const handleChange = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }
  const handleFileChange = e => {
    const file = e.target.files?.[0] || null
    setForm(f => ({ ...f, file }))
  }
  const handleDrop = e => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files?.[0] || null
    if (file) setForm(f => ({ ...f, file }))
  }
  const removeFile    = () => setForm(f => ({ ...f, file: null }))
  const handleSubmit  = e  => { e.preventDefault(); setSent(true) }

  return (
    <main className="bew-page">

      {/* ══ HERO ══ */}
      <section className="bew-hero">
        <div className="bew-hero-bg" />
        <div className="container bew-hero-inner">
          <nav className="bew-breadcrumb reveal" style={{'--sr-delay':'0s'}}>
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/karriere">Careers</Link>
            <span>/</span>
            <span>Apply</span>
          </nav>
          <div className="section-label reveal-blur" style={{'--sr-delay':'0.08s'}}>Job Application</div>
          <h1 className="bew-hero-h1 reveal-blur" style={{'--sr-delay':'0.18s'}}>
            Apply for<br />
            <span className="bew-green">{position}</span>
          </h1>
          <p className="bew-hero-desc reveal" style={{'--sr-delay':'0.3s'}}>
            Fill in the form below and attach your documents. Our HR team at{' '}
            <strong>info@bruchmann-gmbh.de</strong> will review your application
            and get back to you shortly.
          </p>
        </div>
      </section>

      {/* ══ REQUIREMENTS ══ */}
      <section className="bew-reqs-section">
        <div className="container">
          <div className="bew-reqs-grid">

            <div className="bew-reqs-card bew-reqs-must reveal" data-tilt data-tilt-strength="5">
              <div className="bew-reqs-card-header">
                <div className="bew-reqs-icon bew-reqs-icon--must">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" strokeLinecap="round"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                </div>
                <div>
                  <p className="bew-reqs-label">Requirements</p>
                  <h3 className="bew-reqs-title">What we look for</h3>
                </div>
              </div>
              <ul className="bew-reqs-list">
                {reqs.must.map((r, i) => (
                  <li key={i} className="bew-req-item bew-req-item--must">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bew-reqs-card bew-reqs-nice reveal" data-tilt data-tilt-strength="5" style={{'--sr-delay':'0.1s'}}>
              <div className="bew-reqs-card-header">
                <div className="bew-reqs-icon bew-reqs-icon--nice">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                </div>
                <div>
                  <p className="bew-reqs-label">Nice to have</p>
                  <h3 className="bew-reqs-title">Bonus qualifications</h3>
                </div>
              </div>
              <ul className="bew-reqs-list">
                {reqs.nice.map((r, i) => (
                  <li key={i} className="bew-req-item bew-req-item--nice">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/><path d="M8 5v3.5l2 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    {r}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ══ FORM SECTION ══ */}
      <section className="section bew-section">
        <div className="container bew-layout">

          {/* Sidebar */}
          <aside className="bew-aside reveal-stagger">
            <div className="bew-aside-card" data-tilt data-tilt-strength="7">
              <div className="bew-aside-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" strokeLinecap="round"/></svg>
              </div>
              <h3>Position</h3>
              <p className="bew-aside-position">{position}</p>
            </div>
            <div className="bew-aside-card" data-tilt data-tilt-strength="7">
              <div className="bew-aside-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              </div>
              <h3>Location</h3>
              <p>Klaus Bruchmann GmbH<br />Am Steinernen Kreuz 8<br />96110 Scheßlitz, Germany</p>
            </div>
            <div className="bew-aside-card" data-tilt data-tilt-strength="7">
              <div className="bew-aside-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 012 1.14 2 2 0 014 .96h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <h3>Contact HR</h3>
              <p>
                <a href="tel:+4995427736060">+49 9542 7736-0</a><br />
                <a href="mailto:info@bruchmann-gmbh.de">info@bruchmann-gmbh.de</a>
              </p>
            </div>
            <div className="bew-aside-card" data-tilt data-tilt-strength="7">
              <div className="bew-aside-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2" strokeLinecap="round"/></svg>
              </div>
              <h3>Office Hours</h3>
              <p>Mon–Thu: 08:00–16:00<br />Fri: 08:00–14:00</p>
            </div>
          </aside>

          {/* Form */}
          <div className="bew-form-wrap reveal" style={{'--sr-delay':'0.1s'}}>
            {sent ? (
              <div className="bew-success">
                <div className="bew-success-icon">
                  <svg width="52" height="52" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="22" stroke="var(--green)" strokeWidth="2"/>
                    <path d="M14 24l7 7 13-13" stroke="var(--green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h2>Application Received!</h2>
                <p>Thank you for applying for <strong>{position}</strong>. Our HR team will review your documents and get back to you within a few business days.</p>
                <div className="bew-success-actions">
                  <Link to="/karriere" className="btn-dark">Back to Careers</Link>
                  <Link to="/" className="btn-primary">Go to Home</Link>
                </div>
              </div>
            ) : (
              <form className="bew-form" onSubmit={handleSubmit}>
                <div className="bew-form-header">
                  <h2>Your Application</h2>
                  <p>Fields marked with <span className="bew-req-star">*</span> are required.</p>
                </div>

                {/* Position chip */}
                <div className="bew-form-group">
                  <label>Applying for</label>
                  <div className="bew-position-chip">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" strokeLinecap="round"/></svg>
                    {position}
                  </div>
                </div>

                {/* ── Personal details ── */}
                <div className="bew-form-section-title">Personal Information</div>

                <div className="bew-form-row">
                  <div className="bew-form-group">
                    <label htmlFor="bew-firstName">First Name <span className="bew-req-star">*</span></label>
                    <input id="bew-firstName" name="firstName" type="text" required placeholder="First name" value={form.firstName} onChange={handleChange} />
                  </div>
                  <div className="bew-form-group">
                    <label htmlFor="bew-lastName">Last Name <span className="bew-req-star">*</span></label>
                    <input id="bew-lastName" name="lastName" type="text" required placeholder="Last name" value={form.lastName} onChange={handleChange} />
                  </div>
                </div>

                <div className="bew-form-group">
                  <label htmlFor="bew-gender">Gender</label>
                  <select id="bew-gender" name="gender" value={form.gender} onChange={handleChange}>
                    {GENDERS.map(g => <option key={g} value={g === 'Please select' ? '' : g}>{g}</option>)}
                  </select>
                </div>

                {/* ── Contact ── */}
                <div className="bew-form-section-title">Contact Details</div>

                <div className="bew-form-row">
                  <div className="bew-form-group">
                    <label htmlFor="bew-email">Email Address <span className="bew-req-star">*</span></label>
                    <input id="bew-email" name="email" type="email" required placeholder="your@email.com" value={form.email} onChange={handleChange} />
                  </div>
                  <div className="bew-form-group">
                    <label htmlFor="bew-mobile">Mobile Number <span className="bew-req-star">*</span></label>
                    <input id="bew-mobile" name="mobile" type="tel" required placeholder="+49 ..." value={form.mobile} onChange={handleChange} />
                  </div>
                </div>

                {/* ── Address ── */}
                <div className="bew-form-section-title">Address</div>

                <div className="bew-form-row bew-form-row--7-3">
                  <div className="bew-form-group">
                    <label htmlFor="bew-street">Street Name <span className="bew-req-star">*</span></label>
                    <input id="bew-street" name="street" type="text" required placeholder="Street name" value={form.street} onChange={handleChange} />
                  </div>
                  <div className="bew-form-group">
                    <label htmlFor="bew-houseNo">House No. <span className="bew-req-star">*</span></label>
                    <input id="bew-houseNo" name="houseNo" type="text" required placeholder="12a" value={form.houseNo} onChange={handleChange} />
                  </div>
                </div>

                <div className="bew-form-row bew-form-row--3-7">
                  <div className="bew-form-group">
                    <label htmlFor="bew-postalCode">Postal Code <span className="bew-req-star">*</span></label>
                    <input id="bew-postalCode" name="postalCode" type="text" required placeholder="00000" value={form.postalCode} onChange={handleChange} />
                  </div>
                  <div className="bew-form-group">
                    <label htmlFor="bew-city">City <span className="bew-req-star">*</span></label>
                    <input id="bew-city" name="city" type="text" required placeholder="City" value={form.city} onChange={handleChange} />
                  </div>
                </div>

                <div className="bew-form-group">
                  <label htmlFor="bew-country">Country <span className="bew-req-star">*</span></label>
                  <select id="bew-country" name="country" required value={form.country} onChange={handleChange}>
                    {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                {/* ── Cover letter ── */}
                <div className="bew-form-section-title">Application</div>

                <div className="bew-form-group">
                  <label htmlFor="bew-message">Cover Letter / Message <span className="bew-req-star">*</span></label>
                  <textarea id="bew-message" name="message" rows={5} required placeholder="Tell us briefly about yourself and why you'd like to join the Bruchmann team…" value={form.message} onChange={handleChange} />
                </div>

                {/* ── File upload ── */}
                <div className="bew-form-group">
                  <label>Documents (CV, certificates) <span className="bew-req-star">*</span></label>
                  {form.file ? (
                    <div className="bew-file-selected">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg>
                      <span className="bew-file-name">{form.file.name}</span>
                      <span className="bew-file-size">({(form.file.size / 1024).toFixed(0)} KB)</span>
                      <button type="button" className="bew-file-remove" onClick={removeFile} aria-label="Remove file">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/></svg>
                      </button>
                    </div>
                  ) : (
                    <label
                      className={`bew-dropzone${dragOver ? ' drag-over' : ''}`}
                      onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={handleDrop}
                    >
                      <input type="file" accept=".pdf,.doc,.docx" style={{display:'none'}} onChange={handleFileChange} required />
                      <div className="bew-dropzone-icon">
                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                      </div>
                      <p className="bew-dropzone-text"><strong>Click to upload</strong> or drag & drop</p>
                      <p className="bew-dropzone-hint">PDF, DOC, DOCX — max 10 MB</p>
                    </label>
                  )}
                </div>

                <button type="submit" className="btn-primary bew-submit">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                  Submit Application
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

    </main>
  )
}
