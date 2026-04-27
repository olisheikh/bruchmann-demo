import { useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'

const SEO_CONTENT = {
  de: {
    defaults: {
      title: 'Klaus Bruchmann GmbH - Strom sicher schalten',
      description: 'Klaus Bruchmann GmbH ist Ihr Fachpartner fuer Sicherungslasttrennschalter, Hauptschutz, Sammelschienensysteme, Relais und Zaehlersteckklemmen seit 1985.',
      keywords: 'Klaus Bruchmann GmbH, Sicherungslasttrennschalter, Hauptschutz, Sammelschienensysteme, Relais, Zaehlersteckklemmen, Elektrotechnik, Schaltgeraete',
      locale: 'de_DE',
    },
    routes: {
      '/': {
        title: 'Klaus Bruchmann GmbH - Strom sicher schalten',
        description: 'Sichere Elektrotechnik von Klaus Bruchmann GmbH: Sicherungsschaltgeraete, Hauptschutz, Sammelschienensysteme, Relais und Zaehlersteckklemmen.',
      },
      '/sicherungsschaltgeraete': {
        title: 'Sicherungsschaltgeraete - Klaus Bruchmann GmbH',
        description: 'Sicherungsschaltgeraete fuer Hutschienen mit Blinkmelder, Messstecker und Temperaturueberwachung von Klaus Bruchmann GmbH.',
      },
      '/hauptschutz': {
        title: 'Hauptschutz - Klaus Bruchmann GmbH',
        description: 'Moderner Hauptschutz mit vollcodierten Sicherungssteckern, Blinkmelder, Temperaturueberwachung und Modbus-Anbindung.',
      },
      '/sammelschienensystem': {
        title: 'Sammelschienensystem - Klaus Bruchmann GmbH',
        description: 'Kompakte und flexible Sammelschienensysteme fuer effiziente Energieverteilung mit hoher Stromtragfaehigkeit.',
      },
      '/relais': {
        title: 'Relais - Klaus Bruchmann GmbH',
        description: 'Zuverlaessige Netzueberwachungsrelais fuer Dreiphasensysteme mit Unterspannungs-, Phasenausfall- und Phasenfolgeueberwachung.',
      },
      '/zaehlersteckklemmen': {
        title: 'Zaehlersteckklemmen - Klaus Bruchmann GmbH',
        description: 'ADOCK Zaehlersteckklemmen fuer den sicheren Zaehlertausch ohne Unterbrechung nachgeschalteter Verbraucher.',
      },
      '/ueber-uns': {
        title: 'Ueber Uns - Klaus Bruchmann GmbH',
        description: 'Erfahren Sie mehr ueber Klaus Bruchmann GmbH, unsere Geschichte, Werte und ueber 40 Jahre Erfahrung in der elektrischen Sicherheit.',
      },
      '/karriere': {
        title: 'Karriere - Klaus Bruchmann GmbH',
        description: 'Karriere bei Klaus Bruchmann GmbH: Entdecken Sie offene Stellen und werden Sie Teil eines Teams fuer elektrische Sicherheit.',
      },
      '/bewerbung': {
        title: 'Bewerbung - Klaus Bruchmann GmbH',
        description: 'Bewerben Sie sich bei Klaus Bruchmann GmbH und werden Sie Teil eines erfahrenen Teams in der Elektrotechnik.',
      },
      '/kontakt': {
        title: 'Kontakt - Klaus Bruchmann GmbH',
        description: 'Kontaktieren Sie Klaus Bruchmann GmbH fuer Beratung zu Sicherungsschaltgeraeten, Hauptschutz, Relais und weiteren Elektrotechnikloesungen.',
      },
    },
  },
  en: {
    defaults: {
      title: 'Klaus Bruchmann GmbH - Switching Power Safely',
      description: 'Klaus Bruchmann GmbH is your specialist partner for fuse switch disconnectors, main protection, busbar systems, relays and meter terminal blocks since 1985.',
      keywords: 'Klaus Bruchmann GmbH, fuse switch disconnectors, main protection, busbar systems, relays, meter terminal blocks, electrical engineering, switchgear',
      locale: 'en_GB',
    },
    routes: {
      '/': {
        title: 'Klaus Bruchmann GmbH - Switching Power Safely',
        description: 'Safe electrical engineering from Klaus Bruchmann GmbH: circuit protection devices, main protection, busbar systems, relays and meter terminal blocks.',
      },
      '/sicherungsschaltgeraete': {
        title: 'Fuse-Combination Units - Klaus Bruchmann GmbH',
        description: 'Circuit protection devices for DIN rails with blink indicator, measuring plug and temperature monitoring from Klaus Bruchmann GmbH.',
      },
      '/hauptschutz': {
        title: 'Main Protection - Klaus Bruchmann GmbH',
        description: 'Modern main protection with fully coded fuse plugs, blink indicator, temperature monitoring and Modbus connectivity.',
      },
      '/sammelschienensystem': {
        title: 'Busbar System - Klaus Bruchmann GmbH',
        description: 'Compact and flexible busbar systems for efficient energy distribution with high current carrying capacity.',
      },
      '/relais': {
        title: 'Relays - Klaus Bruchmann GmbH',
        description: 'Reliable network monitoring relays for three-phase systems with undervoltage, phase failure and phase sequence supervision.',
      },
      '/zaehlersteckklemmen': {
        title: 'Meter Terminal Blocks - Klaus Bruchmann GmbH',
        description: 'ADOCK meter terminal blocks for safe meter replacement without interrupting downstream loads.',
      },
      '/ueber-uns': {
        title: 'About Us - Klaus Bruchmann GmbH',
        description: 'Learn more about Klaus Bruchmann GmbH, our history, values and more than 40 years of expertise in electrical safety.',
      },
      '/karriere': {
        title: 'Careers - Klaus Bruchmann GmbH',
        description: 'Careers at Klaus Bruchmann GmbH: explore open positions and join a team focused on electrical safety.',
      },
      '/bewerbung': {
        title: 'Application - Klaus Bruchmann GmbH',
        description: 'Apply to Klaus Bruchmann GmbH and become part of an experienced team in electrical engineering.',
      },
      '/kontakt': {
        title: 'Contact - Klaus Bruchmann GmbH',
        description: 'Contact Klaus Bruchmann GmbH for advice on circuit protection devices, main protection, relays and more electrical solutions.',
      },
    },
  },
}

function setMeta(selector, attr, value) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, selector.match(/"([^"]+)"/)?.[1] || '')
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

function setLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export default function SeoManager({ pathname }) {
  const { lang } = useLanguage()

  useEffect(() => {
    const bundle = SEO_CONTENT[lang] || SEO_CONTENT.de
    const route = bundle.routes[pathname] || bundle.defaults
    const title = route.title || bundle.defaults.title
    const description = route.description || bundle.defaults.description
    const keywords = bundle.defaults.keywords
    const origin = window.location.origin
    const url = `${origin}${pathname || '/'}`
    const image = `${origin}/images/icons/bruchmann_logo_with_title.png`

    document.title = title
    document.documentElement.lang = lang

    setMeta('meta[name="description"]', 'name', description)
    setMeta('meta[name="keywords"]', 'name', keywords)
    setMeta('meta[name="robots"]', 'name', 'index, follow, max-image-preview:large')
    setMeta('meta[name="author"]', 'name', 'Klaus Bruchmann GmbH')
    setMeta('meta[name="theme-color"]', 'name', '#00274E')

    setMeta('meta[property="og:title"]', 'property', title)
    setMeta('meta[property="og:description"]', 'property', description)
    setMeta('meta[property="og:type"]', 'property', 'website')
    setMeta('meta[property="og:site_name"]', 'property', 'Klaus Bruchmann GmbH')
    setMeta('meta[property="og:locale"]', 'property', bundle.defaults.locale)
    setMeta('meta[property="og:url"]', 'property', url)
    setMeta('meta[property="og:image"]', 'property', image)

    setMeta('meta[name="twitter:card"]', 'name', 'summary_large_image')
    setMeta('meta[name="twitter:title"]', 'name', title)
    setMeta('meta[name="twitter:description"]', 'name', description)
    setMeta('meta[name="twitter:image"]', 'name', image)

    setLink('canonical', url)
  }, [lang, pathname])

  return null
}
