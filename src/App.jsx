import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useState, useCallback } from 'react'
import { LanguageProvider } from './context/LanguageContext'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingContact from './components/FloatingContact'
import MessengerChat from './components/MessengerChat'
import Loader from './components/Loader'
import Home from './pages/Home'
import Sicherungsschaltgeraete from './pages/Sicherungsschaltgeraete'
import Hauptschutz from './pages/Hauptschutz'
import Sammelschienensystem from './pages/Sammelschienensystem'
import Relais from './pages/Relais'
import Zaehlersteckklemmen from './pages/Zaehlersteckklemmen'
import UeberUns from './pages/UeberUns'
import Karriere from './pages/Karriere'
import Bewerbung from './pages/Bewerbung'
import Kontakt from './pages/Kontakt'

export default function App() {
  const { pathname } = useLocation()
  const [loading, setLoading] = useState(true)
  const handleLoaderDone = useCallback(() => setLoading(false), [])

  useEffect(() => { window.scrollTo(0, 0) }, [pathname])

  useEffect(() => {
    const bar = document.getElementById('scroll-progress')
    if (!bar) return
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      const pct = scrollHeight <= clientHeight ? 0 : (scrollTop / (scrollHeight - clientHeight)) * 100
      bar.style.width = `${pct}%`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  return (
    <ThemeProvider>
    <LanguageProvider>
      {loading && <Loader onDone={handleLoaderDone} />}
      <div id="scroll-progress" />
      <Navbar />
      <FloatingContact />
      <MessengerChat />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sicherungsschaltgeraete" element={<Sicherungsschaltgeraete />} />
        <Route path="/hauptschutz" element={<Hauptschutz />} />
        <Route path="/sammelschienensystem" element={<Sammelschienensystem />} />
        <Route path="/relais" element={<Relais />} />
        <Route path="/zaehlersteckklemmen" element={<Zaehlersteckklemmen />} />
        <Route path="/ueber-uns" element={<UeberUns />} />
        <Route path="/karriere" element={<Karriere />} />
        <Route path="/bewerbung" element={<Bewerbung />} />
        <Route path="/kontakt" element={<Kontakt />} />
      </Routes>
      <Footer />
    </LanguageProvider>
    </ThemeProvider>
  )
}
