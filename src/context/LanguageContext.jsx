import { createContext, useContext, useState } from 'react'
import de from '../translations/de'
import en from '../translations/en'

const translations = { de, en }

const LanguageContext = createContext(null)

function getNestedValue(obj, path) {
  return path.split('.').reduce((acc, key) => acc?.[key], obj)
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('bruchmann_lang') || 'de')

  const t = (key) => {
    const val = getNestedValue(translations[lang], key)
    if (val !== undefined) return val
    return getNestedValue(translations['de'], key) ?? key
  }

  const setLanguage = (newLang) => {
    setLang(newLang)
    localStorage.setItem('bruchmann_lang', newLang)
  }

  return (
    <LanguageContext.Provider value={{ lang, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
