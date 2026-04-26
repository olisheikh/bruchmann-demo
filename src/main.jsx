import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

/* ── Global scroll-reveal observer ──────────────────────────────────────── *
 * Runs once. MutationObserver re-scans when React adds new DOM nodes
 * (route changes). IntersectionObserver fires only once per element.       */
function initScrollAnimations() {
  const SEL = '.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-blur, .reveal-flip, .reveal-stagger > *, .count-up'

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return
      e.target.classList.add('sr-visible')

      /* counter animation */
      if (e.target.classList.contains('count-up')) {
        const target = parseFloat(e.target.dataset.target)
        const suffix = e.target.dataset.suffix || ''
        const prefix = e.target.dataset.prefix || ''
        const duration = 1400
        const start = performance.now()
        const update = (now) => {
          const p = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          const val = Math.round(eased * target)
          e.target.textContent = prefix + val + suffix
          if (p < 1) requestAnimationFrame(update)
        }
        requestAnimationFrame(update)
      }

      io.unobserve(e.target)
    })
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' })

  let rafId = null
  const scan = () => {
    document.querySelectorAll(SEL).forEach((el) => {
      if (!el.classList.contains('sr-visible')) io.observe(el)
    })
  }

  /* debounce DOM mutations so we don't scan every single React fiber commit */
  const mo = new MutationObserver(() => {
    cancelAnimationFrame(rafId)
    rafId = requestAnimationFrame(scan)
  })
  mo.observe(document.body, { childList: true, subtree: true })
  scan()
}

initScrollAnimations()

/* ── Global 3D tilt effect ─────────────────────────────────────────────── *
 * Any element with [data-tilt] gets a smooth mouse-tracking perspective    *
 * tilt. data-tilt-strength overrides the default rotation amount (°).     */
function initTiltEffect() {
  const noHover = () => window.matchMedia('(hover: none)').matches

  const attach = (el) => {
    if (el._tiltAttached) return
    el._tiltAttached = true
    const strength = parseFloat(el.dataset.tiltStrength || 10)

    const onMove = (e) => {
      if (noHover()) return
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left)  / r.width  - 0.5
      const y = (e.clientY - r.top)   / r.height - 0.5
      el.style.transition = 'transform 0.08s linear, box-shadow 0.08s linear'
      el.style.transform  = `perspective(900px) rotateY(${x * strength}deg) rotateX(${-y * strength}deg) translateZ(14px)`
      el.style.boxShadow  = `${-x * 16}px ${y * 16}px 48px rgba(0,0,0,0.25), 0 0 0 1px rgba(19,165,56,0.12)`
      const g = el.querySelector('.tilt-glare')
      if (g) {
        g.style.opacity    = '1'
        g.style.background = `radial-gradient(circle at ${(x+.5)*100}% ${(y+.5)*100}%, rgba(255,255,255,0.13) 0%, transparent 60%)`
      }
    }
    const onLeave = () => {
      el.style.transition = 'transform 0.6s cubic-bezier(0.22,1,0.36,1), box-shadow 0.6s ease'
      el.style.transform  = ''
      el.style.boxShadow  = ''
      const g = el.querySelector('.tilt-glare')
      if (g) g.style.opacity = '0'
    }

    el.addEventListener('mousemove',  onMove)
    el.addEventListener('mouseleave', onLeave)

    if (!el.querySelector('.tilt-glare')) {
      const g = document.createElement('div')
      g.className = 'tilt-glare'
      el.appendChild(g)
    }
  }

  let rafId = null
  const scan = () => document.querySelectorAll('[data-tilt]').forEach(attach)
  const mo = new MutationObserver(() => { cancelAnimationFrame(rafId); rafId = requestAnimationFrame(scan) })
  mo.observe(document.body, { childList: true, subtree: true })
  scan()
}

initTiltEffect()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
