import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './Kontakt.css'

// Canonical product indices (language-independent)
const DE_PRODUCTS = ['Sicherungsschaltgeräte', 'Hauptschutz', 'Sammelschienensystem', 'Relais', 'Zählersteckklemmen', 'Allgemeine Anfrage', 'Karriere / Bewerbung']
const EN_PRODUCTS = ['Circuit Protection Devices', 'Main Protection', 'Busbar System', 'Relays', 'Meter Terminal Blocks', 'General Inquiry', 'Careers / Application']

function resolveProductIndex(preProduct) {
  if (!preProduct) return 5
  const deIdx = DE_PRODUCTS.indexOf(preProduct)
  if (deIdx >= 0) return deIdx
  const enIdx = EN_PRODUCTS.indexOf(preProduct)
  if (enIdx >= 0) return enIdx
  return 5
}

export default function Kontakt() {
  const { t } = useLanguage()
  useScrollReveal()

  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const preProduct = params.get('produkt') || ''
  const preStelle = params.get('stelle') || ''

  const productIdx = preStelle ? 6 : resolveProductIndex(preProduct)

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    productIdx,
    message: preStelle ? `${t('contact.application_prefix')} ${preStelle}` : '',
  })
  const [sent, setSent] = useState(false)

  const products = t('contact.products')
  const hero = t('contact.hero')
  const info = t('contact.info')
  const formT = t('contact.form')
  const success = t('contact.success')

  const handleChange = e => {
    const { name, value } = e.target
    if (name === 'productIdx') {
      setForm(f => ({ ...f, productIdx: Number(value) }))
    } else {
      setForm(f => ({ ...f, [name]: value }))
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <main>
      <section className="kontakt-hero">
        <div className="kontakt-hero-bg" />
        <div className="container kontakt-hero-inner">
          <div className="section-label reveal-blur">{hero.label}</div>
          <h1 className="reveal-blur" style={{'--sr-delay':'0.1s'}}>{hero.title}</h1>
          <p className="reveal" style={{'--sr-delay':'0.22s'}}>{hero.description}</p>
        </div>
      </section>

      <section className="section kontakt-section">
        <div className="container kontakt-grid">
          {/* INFO */}
          <div className="kontakt-info reveal-left">
            <div className="kontakt-info-card" data-tilt data-tilt-strength="5">
              <h3>{info.title}</h3>
              <div className="kontakt-detail">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="var(--green)" strokeWidth="1.5">
                  <path d="M17.05 13.97l-2.39-2.39a1.5 1.5 0 00-2.12 0l-.9.9a14.3 14.3 0 01-4.12-4.12l.9-.9a1.5 1.5 0 000-2.12L6.03 2.95a1.5 1.5 0 00-2.12 0L2.5 4.36C2.5 11.6 8.4 17.5 15.64 17.5l1.41-1.41a1.5 1.5 0 000-2.12z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div>
                  <strong>{info.phone}</strong>
                  <a href="tel:+4995427736060">+49 9542 7736-0</a>
                </div>
              </div>
              <div className="kontakt-detail">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="var(--green)" strokeWidth="1.5">
                  <path d="M2.5 5.5l7.5 5.5 7.5-5.5M2.5 14.5h15a1 1 0 001-1v-8a1 1 0 00-1-1h-15a1 1 0 00-1 1v8a1 1 0 001 1z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div>
                  <strong>{info.email}</strong>
                  <a href="mailto:info@bruchmann-gmbh.de">info@bruchmann-gmbh.de</a>
                </div>
              </div>
              <div className="kontakt-detail">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="var(--green)" strokeWidth="1.5">
                  <path d="M10 2a6 6 0 00-6 6c0 4 6 10 6 10s6-6 6-10a6 6 0 00-6-6z" strokeLinecap="round"/><circle cx="10" cy="8" r="2"/>
                </svg>
                <div>
                  <strong>{info.address}</strong>
                  <span>Am Steinernen Kreuz 8<br/>96110 Scheßlitz</span>
                </div>
              </div>
              <div className="kontakt-detail">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="var(--green)" strokeWidth="1.5">
                  <circle cx="10" cy="10" r="8"/><path d="M10 6v4l3 3" strokeLinecap="round"/>
                </svg>
                <div>
                  <strong>{info.hours}</strong>
                  <span>
                    {info.hours_value.split('\n').map((line, i) => (
                      <span key={i}>{line}{i === 0 && <br />}</span>
                    ))}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* FORM */}
          <div className="kontakt-form-wrap reveal-right" style={{'--sr-delay':'0.15s'}}>
            {sent ? (
              <div className="kontakt-success">
                <div className="kontakt-success-icon">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="22" stroke="var(--green)" strokeWidth="2"/>
                    <path d="M14 24l7 7 13-13" stroke="var(--green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>{success.title}</h3>
                <p>{success.message}</p>
                <button className="btn-primary" onClick={() => setSent(false)} style={{marginTop:20}}>{success.new_request}</button>
              </div>
            ) : (
              <form className="kontakt-form" onSubmit={handleSubmit}>
                <h3>{formT.title}</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">{formT.name} *</label>
                    <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} placeholder={formT.name_placeholder} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">{formT.email} *</label>
                    <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder={formT.email_placeholder} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">{formT.phone}</label>
                    <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder={formT.phone_placeholder} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="company">{formT.company}</label>
                    <input id="company" name="company" type="text" value={form.company} onChange={handleChange} placeholder={formT.company_placeholder} />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="productIdx">{formT.subject} *</label>
                  <select id="productIdx" name="productIdx" required value={form.productIdx} onChange={handleChange}>
                    {products.map((p, i) => <option key={i} value={i}>{p}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="message">{formT.message} *</label>
                  <textarea id="message" name="message" required rows={6} value={form.message} onChange={handleChange} placeholder={formT.message_placeholder} />
                </div>
                <button type="submit" className="btn-primary kontakt-submit">
                  {formT.submit}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 8h12M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
