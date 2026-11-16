import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { flushSync } from 'react-dom'
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
  /** A number written in the current language's digits. */
  num: (value: number | string) => string
  tn: (base: PluralKey, count: number, values?: TranslationValues) => string
}

const I18nContext = createContext<I18nContextValue | null>(null)

const KHMER_DIGITS = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩']

/** Write Western digits as Khmer digits (០–៩). Other characters are untouched. */
export function toKhmerNumerals(value: number | string): string {
  return String(value).replace(/[0-9]/g, (d) => KHMER_DIGITS[Number(d)])
}

/** Numbers in running text follow the interface language; strings are left alone. */
export function localizeNumber(value: number | string, language: Language): string {
  return language === 'km' ? toKhmerNumerals(value) : String(value)
}

function interpolate(template: string, values: TranslationValues | undefined, language: Language): string {
  if (!values) return template
  return template.replace(/\{(\w+)\}/g, (match, name: string) => {
    const value = values[name]
    if (value === undefined) return match
    return typeof value === 'number' ? localizeNumber(value, language) : value
  })
}

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true
}

type ViewTransitionDocument = Document & { startViewTransition?: (update: () => void) => unknown }

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
    const apply = () => {
      setLanguageState(next)
      document.documentElement.lang = next
      document.documentElement.setAttribute('data-lang', next)
    }
    // Cross-fade the whole page instead of letting text and fonts jump in place.
    const doc = document as ViewTransitionDocument
    if (doc.startViewTransition && !prefersReducedMotion()) {
      doc.startViewTransition(() => flushSync(apply))
    } else {
      apply()
    }
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
    (key: TranslationKey, values?: TranslationValues) =>
      interpolate(DICTIONARIES[language][key] ?? en[key], values, language),
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

  const num = useCallback((value: number | string) => localizeNumber(value, language), [language])

  useEffect(() => {
    // Warm the Khmer fonts once the page is idle so the first switch does not flash.
    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts
    if (!fonts?.load) return
    const warm = () => {
      void fonts.load('1em "Noto Sans Khmer Variable"', 'ក').catch(() => undefined)
      void fonts.load('1em "Noto Serif Khmer Variable"', 'ក').catch(() => undefined)
    }
    const idle = (window as Window & { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback
    if (idle) idle(warm)
    else window.setTimeout(warm, 1200)
  }, [])

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
    () => ({ language, setLanguage, toggleLanguage, isKhmer: language === 'km', t, num, tn }),
    [language, setLanguage, toggleLanguage, t, num, tn],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext)
  if (!context) throw new Error('useI18n must be used inside I18nProvider')
  return context
}
