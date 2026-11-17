import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@fontsource-variable/fraunces/wght.css'
import '@fontsource-variable/fraunces/wght-italic.css'
import '@fontsource-variable/inter/wght.css'
import '@fontsource-variable/noto-sans-khmer/wght.css'
import '@fontsource-variable/noto-serif-khmer/wght.css'
import 'katex/dist/katex.min.css'
import './styles/tokens.css'
import './styles/base.css'
import './styles/layout.css'
import './styles/components.css'
import './styles/pages.css'
import './styles/visuals.css'
import App, { preloadRoute } from './App'
import { I18nProvider } from './lib/i18n'
import { ThemeProvider } from './lib/theme'
import { BookmarksProvider } from './lib/bookmarks'
import { SearchProvider } from './lib/search-ui'

function mount() {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <BrowserRouter>
        <I18nProvider>
          <ThemeProvider>
            <BookmarksProvider>
              <SearchProvider>
                <App />
              </SearchProvider>
            </BookmarksProvider>
          </ThemeProvider>
        </I18nProvider>
      </BrowserRouter>
    </StrictMode>,
  )
}

// Prerendered pages (`<html data-boot>`) already show their content; load the
// route's code-split chunk first so the first client render matches it.
if (document.documentElement.hasAttribute('data-boot')) {
  void preloadRoute(window.location.pathname).then(mount)
} else {
  mount()
}
