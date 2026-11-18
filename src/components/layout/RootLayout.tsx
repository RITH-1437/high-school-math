import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { SeoHead } from './SeoHead'
import { Footer } from './Footer'
import { MobileNav } from './MobileNav'
import { useI18n } from '../../lib/i18n'

function ScrollToTop() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const id = decodeURIComponent(location.hash.replace('#', ''))
      const timer = window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ block: 'start' })
      }, 60)
      return () => window.clearTimeout(timer)
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    return undefined
  }, [location.pathname, location.hash])

  return null
}

/**
 * Prerendered pages ship with `<html data-boot>`, which suppresses entrance
 * animations so the static HTML and the first client render look identical.
 * The first client-side navigation restores normal page animations. Removing
 * the attribute during render (idempotent) guarantees the next page's nodes
 * are created without it, so they animate exactly as before.
 */
function useEndBootOnNavigation(locationKey: string) {
  const initialKey = useRef(locationKey)
  if (initialKey.current !== locationKey && typeof document !== 'undefined') {
    document.documentElement.removeAttribute('data-boot')
  }
}

export function RootLayout() {
  const location = useLocation()
  const { isKhmer } = useI18n()
  useEndBootOnNavigation(location.key)

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        {isKhmer ? 'រំលងទៅខ្លឹមសារ' : 'Skip to content'}
      </a>
      <ScrollToTop />
      <SeoHead />
      <Header />
      <main id="main-content" className="site-main" tabIndex={-1}>
        <div key={location.pathname} className="page-enter">
          <Outlet />
        </div>
      </main>
      <Footer />
      <MobileNav />
    </div>
  )
}
