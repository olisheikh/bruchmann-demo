import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import './LanguageSwitcher.css'

const languages = [
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
]

export default function LanguageSwitcher() {
  const { lang, setLanguage } = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const current = languages.find(l => l.code === lang) || languages[0]

  useEffect(() => {
    if (!open) return
    const handleOutsideClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [open])

  return (
    <div ref={ref} className={`lang-switcher ${open ? 'open' : ''}`}>
      <button
        className="lang-trigger"
        onClick={() => setOpen(prev => !prev)}
        aria-label="Select language"
        aria-expanded={open}
      >
        <span className="lang-flag">{current.flag}</span>
        <span className="lang-code">{current.code.toUpperCase()}</span>
        <svg className="lang-chevron" width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <div className="lang-dropdown">
        {languages.map(l => (
          <button
            key={l.code}
            className={`lang-option ${l.code === lang ? 'active' : ''}`}
            onClick={() => { setLanguage(l.code); setOpen(false) }}
          >
            <span className="lang-flag">{l.flag}</span>
            <span className="lang-option-label">{l.label}</span>
            {l.code === lang && (
              <svg className="lang-check" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
