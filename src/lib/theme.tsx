import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'axiom.theme.v1'

interface ThemeContextValue {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

/**
 * Swaps only the theme-aware tab icon. The static square icons (favicon.ico,
 * 48/96/192px PNGs, apple-touch-icon) stay fixed so search engines always see
 * the same π favicon.
 */
function syncFavicons(theme: Theme) {
  if (typeof document === 'undefined') return
  const iconHref = theme === 'dark' ? '/icons/pi-dark-96.png' : '/icons/pi-96.png'
  document.querySelectorAll<HTMLLinkElement>('link[data-theme-icon]').forEach((link) => {
    link.href = iconHref
  })
}

function readInitialTheme(): Theme {
  if (typeof document === 'undefined') return 'light'
  const current = document.documentElement.getAttribute('data-theme')
  return current === 'dark' ? 'dark' : 'light'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(readInitialTheme)

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next)
    document.documentElement.setAttribute('data-theme', next)
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', next === 'dark' ? '#091B38' : '#102A56')
    syncFavicons(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Storage can be unavailable in private browsing; theme still applies.
    }
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }, [setTheme, theme])

  useEffect(() => {
    // Synchronize favicons on mount with initial theme
    syncFavicons(theme)

    // Follow the operating-system preference only when the user has not chosen yet.
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (event: MediaQueryListEvent) => {
      try {
        if (!localStorage.getItem(STORAGE_KEY)) setTheme(event.matches ? 'dark' : 'light')
      } catch {
        // Ignore storage failures.
      }
    }
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [setTheme, theme])

  const value = useMemo(() => ({ theme, setTheme, toggleTheme }), [theme, setTheme, toggleTheme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used inside ThemeProvider')
  return context
}
