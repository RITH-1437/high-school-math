/**
 * Build-time prerender entry. Loaded in Node by scripts/prerender.ts through
 * Vite's SSR module loader; never shipped to the browser.
 *
 * Renders the real application for a URL so crawlers and first paint receive
 * the same headings, text and links the client renders.
 */
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App, { preloadRoute } from './App'
import { I18nProvider } from './lib/i18n'
import { ThemeProvider } from './lib/theme'
import { BookmarksProvider } from './lib/bookmarks'
import { SearchProvider } from './lib/search-ui'

export { getRouteMeta, listPrerenderRoutes, notFoundMeta, renderHeadTags } from './lib/seo'

export async function render(url: string): Promise<string> {
  // Resolve the code-split page first so rendering is synchronous and complete.
  await preloadRoute(url)
  const html = renderToString(
    <StaticRouter location={url}>
      <I18nProvider>
        <ThemeProvider>
          <BookmarksProvider>
            <SearchProvider>
              <App />
            </SearchProvider>
          </BookmarksProvider>
        </ThemeProvider>
      </I18nProvider>
    </StaticRouter>,
  )
  // A pending Suspense boundary means the page would ship a loading spinner.
  if (html.includes('<!--$?-->') || html.includes('<!--$!-->')) {
    throw new Error(`Prerender of ${url} left a Suspense boundary unresolved.`)
  }
  return html
}
