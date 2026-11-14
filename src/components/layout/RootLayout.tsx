import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { MobileNav } from './MobileNav'

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
  }, [location.pathname, location.hash, location.key])

  return null
}

export function RootLayout() {
  const location = useLocation()

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <ScrollToTop />
      <Header />
      <main id="main-content" className="site-main" tabIndex={-1}>
        <div key={`${location.pathname}${location.search}`} className="page-enter">
          <Outlet />
        </div>
      </main>
      <Footer />
      <MobileNav />
    </div>
  )
}
