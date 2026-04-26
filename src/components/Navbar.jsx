import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'
import ThemeToggle from './ThemeToggle'
import './Navbar.css'

export default function Navbar() {
  const { t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [produkteOpen, setProdukte] = useState(false)

  const products = [
    { labelKey: 'products.sicherungsschaltgeraete.title', path: '/sicherungsschaltgeraete' },
    { labelKey: 'products.hauptschutz.title', path: '/hauptschutz' },
    { labelKey: 'products.sammelschienensystem.title', path: '/sammelschienensystem' },
    { labelKey: 'products.relais.title', path: '/relais' },
    { labelKey: 'products.zaehlersteckklemmen.title', path: '/zaehlersteckklemmen' },
  ]

  const navigate = useNavigate()
  const { pathname } = useLocation()
  const produkteRef = useRef(null)

  const handleProductsClick = () => {
    setProdukte(false)
    setMenuOpen(false)
    if (pathname === '/') {
      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/')
      setTimeout(() => {
        document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
      }, 150)
    }
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!produkteOpen) return
    const handleOutside = (e) => {
      if (produkteRef.current && !produkteRef.current.contains(e.target)) setProdukte(false)
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [produkteOpen])

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      {menuOpen && <div className="navbar-backdrop" onClick={() => setMenuOpen(false)} />}
      <div className="navbar-inner container">
        <Link to="/" className="navbar-logo">
          <div className="logo-icon">
            <img src="/images/icons/bruchmann_logo.png" alt="Bruchmann Logo" className="logo-img" />
          </div>
          <div className="logo-wordmark">
            <span className="logo-text">BRUCHMANN</span>
            <span className="logo-tagline">Electrical Solutions</span>
          </div>
        </Link>

        <nav className={`navbar-nav ${menuOpen ? 'open' : ''}`}>
          <NavLink to="/" className="nav-link" onClick={() => setMenuOpen(false)}>{t('nav.home')}</NavLink>
          <NavLink to="/ueber-uns" className="nav-link" onClick={() => setMenuOpen(false)}>{t('nav.about')}</NavLink>
          <div
            className={`nav-dropdown ${produkteOpen ? 'open' : ''}`}
            ref={produkteRef}
            onMouseEnter={() => setProdukte(true)}
            onMouseLeave={() => setProdukte(false)}
          >
            <button className="nav-link dropdown-trigger" onClick={handleProductsClick}>
              {t('nav.products')}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
              </svg>
            </button>
            <div className="dropdown-menu">
              <div className="dropdown-menu-inner">
                {products.map(p => (
                  <NavLink key={p.path} to={p.path} className="dropdown-item" onClick={() => { setMenuOpen(false); setProdukte(false) }}>
                    {t(p.labelKey)}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
          <NavLink to="/karriere" className="nav-link" onClick={() => setMenuOpen(false)}>{t('nav.careers')}</NavLink>
          <span className="nav-divider" />
          <span className="electric-border-wrap">
            <NavLink to="/kontakt" className="btn-primary nav-cta" onClick={() => setMenuOpen(false)}>{t('nav.contact')}</NavLink>
          </span>
        </nav>

        <div className="navbar-controls">
          <LanguageSwitcher />
          <ThemeToggle />
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label={t('nav.menu')}>
            <span className={menuOpen ? 'open' : ''}></span>
            <span className={menuOpen ? 'open' : ''}></span>
            <span className={menuOpen ? 'open' : ''}></span>
          </button>
        </div>
      </div>
    </header>
  )
}
