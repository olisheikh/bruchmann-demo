import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import './Footer.css'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <img src="/images/icons/bruchmann_logo.png" alt="Bruchmann" className="footer-logo-img" />
              <span>BRUCHMANN</span>
            </Link>
            <p>{t('footer.tagline')}</p>
            <p className="footer-copy-text">{t('footer.description')}</p>
            <div className="footer-badge">
              <span>ISO 9001</span>
              <span>ISO 14001</span>
              <span>{t('footer.since')}</span>
            </div>
            <div className="footer-social">
              <a href="https://www.facebook.com/profile.php?id=61584717095028" target="_blank" rel="noreferrer" className="social-link" aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>{t('footer.columns.products')}</h4>
            <ul>
              <li><Link to="/sicherungsschaltgeraete">{t('products.sicherungsschaltgeraete.title')}</Link></li>
              <li><Link to="/hauptschutz">{t('products.hauptschutz.title')}</Link></li>
              <li><Link to="/sammelschienensystem">{t('products.sammelschienensystem.title')}</Link></li>
              <li><Link to="/relais">{t('products.relais.title')}</Link></li>
              <li><Link to="/zaehlersteckklemmen">{t('products.zaehlersteckklemmen.title')}</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>{t('footer.columns.company')}</h4>
            <ul>
              <li><Link to="/ueber-uns">{t('footer.company_links.about')}</Link></li>
              <li><Link to="/karriere">{t('footer.company_links.careers')}</Link></li>
              <li><Link to="/kontakt">{t('footer.company_links.contact')}</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>{t('footer.columns.contact')}</h4>
            <address>
              <p>Am Steinernen Kreuz 8</p>
              <p>96110 Scheßlitz</p>
              <a href="tel:+4995427736060">+49 9542 7736-0</a>
              <a href="mailto:info@bruchmann-gmbh.de">info@bruchmann-gmbh.de</a>
              <p className="footer-hours">
                {t('footer.hours').split('\n').map((line, i) => (
                  <span key={i}>{line}{i === 0 && <br />}</span>
                ))}
              </p>
            </address>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>{t('footer.copyright').replace('{year}', new Date().getFullYear())}</p>
          <div className="footer-links">
            <a href="#">{t('footer.legal.imprint')}</a>
            <a href="#">{t('footer.legal.privacy')}</a>
            <a href="#">{t('footer.legal.cookies')}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
