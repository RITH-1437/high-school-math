import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { en, type TranslationKey } from '../i18n/en'
import { km } from '../i18n/km'
import type { Language } from '../i18n/types'

const STORAGE_KEY = 'axiom.lang.v1'

const DICTIONARIES: Record<Language, Record<TranslationKey, string>> = { en, km }

export type TranslationValues = Record<string, string | number>

/**
 * Plural keys are declared in pairs (`…One` / `…Many`) so Khmer, which has no
 * plural inflection, can supply a single natural sentence for each form without
 * depending on ICU plural syntax.
 */
export type PluralKey = {
  [K in TranslationKey]: K extends `${infer Base}One`
    ? `${Base}Many` extends TranslationKey
      ? Base
      : never
    : never
}[TranslationKey]

interface I18nContextValue {
  language: Language
  setLanguage: (next: Language) => void
  toggleLanguage: () => void
  isKhmer: boolean
  t: (key: TranslationKey, values?: TranslationValues) => string
  tn: (base: PluralKey, count: number, values?: TranslationValues) => string
}

const I18nContext = createContext<I18nContextValue | null>(null)

function interpolate(template: string, values?: TranslationValues): string {
  if (!values) return template
  return template.replace(/\{(\w+)\}/g, (match, name: string) => {
    const value = values[name]
    return value === undefined ? match : String(value)
  })
}

function readInitialLanguage(): Language {
  if (typeof document === 'undefined') return 'en'
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'en' || stored === 'km') return stored
  } catch {
    // Storage can be unavailable in private browsing; fall back to the document.
  }
  return document.documentElement.lang === 'km' ? 'km' : 'en'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(readInitialLanguage)

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next)
    document.documentElement.lang = next
    document.documentElement.setAttribute('data-lang', next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Storage can be unavailable in private browsing; the language still applies.
    }
  }, [])

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'en' ? 'km' : 'en')
  }, [language, setLanguage])

  const t = useCallback(
    (key: TranslationKey, values?: TranslationValues) => interpolate(DICTIONARIES[language][key] ?? en[key], values),
    [language],
  )

  const tn = useCallback(
    (base: PluralKey, count: number, values?: TranslationValues) => {
      const key = `${base}${count === 1 ? 'One' : 'Many'}` as TranslationKey
      return t(key, { count, ...values })
    },
    [t],
  )

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.setAttribute('data-lang', language)
    document.title = t('meta.title')
    const description = document.querySelector('meta[name="description"]')
    if (description) description.setAttribute('content', t('meta.description'))
  }, [language, t])

  useEffect(() => {
    // Keep a second tab in sync when the language changes elsewhere.
    const onStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) return
      if (event.newValue === 'en' || event.newValue === 'km') setLanguage(event.newValue)
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [setLanguage])

  const value = useMemo(
    () => ({ language, setLanguage, toggleLanguage, isKhmer: language === 'km', t, tn }),
    [language, setLanguage, toggleLanguage, t, tn],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext)
  if (!context) throw new Error('useI18n must be used inside I18nProvider')
  return context
}
