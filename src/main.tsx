import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@fontsource-variable/fraunces/wght.css'
import '@fontsource-variable/fraunces/wght-italic.css'
import '@fontsource-variable/inter/wght.css'
import 'katex/dist/katex.min.css'
import './styles/tokens.css'
import './styles/base.css'
import './styles/layout.css'
import './styles/components.css'
import './styles/pages.css'
import App from './App'
import { ThemeProvider } from './lib/theme'
import { BookmarksProvider } from './lib/bookmarks'
import { SearchProvider } from './lib/search-ui'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <BookmarksProvider>
          <SearchProvider>
            <App />
          </SearchProvider>
        </BookmarksProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
