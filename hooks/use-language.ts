"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { type Language, languages, translations, type TranslationKey } from "@/lib/i18n"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: TranslationKey) => string
  dir: "ltr" | "rtl"
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")

  useEffect(() => {
    // Load saved language from localStorage
    const saved = localStorage.getItem("parksmart-language") as Language
    if (saved && saved in languages) {
      setLanguageState(saved)
    } else {
      // Auto-detect browser language
      const browserLang = navigator.language.split("-")[0] as Language
      if (browserLang in languages) {
        setLanguageState(browserLang)
      }
    }
  }, [])

  useEffect(() => {
    // Update document direction and language
    document.documentElement.dir = languages[language].dir
    document.documentElement.lang = language

    // Save to localStorage
    localStorage.setItem("parksmart-language", language)
  }, [language])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
  }

  const t = (key: TranslationKey): string => {
    return translations[language][key] || translations.en[key] || key
  }

  const dir = languages[language].dir

  return <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
