/**
 * Static prerender for every public route.
 *
 * Runs after `vite build` (see vite.config.ts). For each URL it writes
 * `dist/<path>.html` containing:
 *   - route-specific <title>, description, canonical, robots, Open Graph and JSON-LD,
 *   - the fully rendered page body (headings, text, KaTeX, internal links),
 *   - CSS + modulepreload for code-split pages so first paint is styled.
 *
 * Vercel serves these through `cleanUrls` (`/grades/10` → `grades/10.html`).
 * Unknown URLs fall through to `404.html`, which returns a real 404 status.
 */
import fs from 'node:fs'
import path from 'node:path'
import { createServer } from 'vite'
import react from '@vitejs/plugin-react'
import type { RouteMeta } from '../src/lib/seo'

interface PrerenderModule {
  render: (url: string) => Promise<string>
  getRouteMeta: (pathname: string) => RouteMeta
  notFoundMeta: (pathname: string) => RouteMeta
  renderHeadTags: (meta: RouteMeta) => string
  listPrerenderRoutes: () => string[]
}

type Manifest = Record<string, { file: string; css?: string[]; imports?: string[]; isEntry?: boolean }>

/** Code-split page modules by first URL segment (mirrors LAZY_SECTIONS in App.tsx). */
const LAZY_PAGE_SOURCES: Record<string, string> = {
  shapes: 'src/pages/ShapesPage.tsx',
  exam: 'src/pages/ExamPage.tsx',
  glossary: 'src/pages/GlossaryPage.tsx',
  bacii: 'src/pages/BaciiPage.tsx',
  graph: 'src/pages/GraphPage.tsx',
  'unit-circle': 'src/pages/UnitCirclePage.tsx',
  sprint: 'src/pages/BacIISprintPage.tsx',
  conics: 'src/pages/ConicsPage.tsx',
  labs: 'src/pages/RevolutionPage.tsx',
}

const SEO_REGION = /<!--seo:start-->[\s\S]*?<!--seo:end-->/
const APP_SLOT = '<!--app-html-->'

function collectChunkAssets(manifest: Manifest, key: string, seen = new Set<string>()) {
  const css = new Set<string>()
  const js = new Set<string>()
  const visit = (id: string) => {
    if (seen.has(id)) return
    seen.add(id)
    const chunk = manifest[id]
    if (!chunk || chunk.isEntry) return
    js.add(chunk.file)
    chunk.css?.forEach((file) => css.add(file))
    chunk.imports?.forEach(visit)
  }
  visit(key)
  return { css: [...css], js: [...js] }
}

function routeAssetTags(manifest: Manifest | null, routePath: string, template: string): string {
  if (!manifest) return ''
  const segments = routePath.split('/').filter(Boolean)
  const source =
    segments[0] === 'exam' && segments[1] === 'sprint'
      ? 'src/pages/BacIISprintPage.tsx'
      : segments[0] === 'labs' && segments[1] === 'argand'
        ? 'src/pages/ArgandPage.tsx'
        : segments[0] === 'labs' && segments[1] === 'probability'
          ? 'src/pages/ProbabilityPage.tsx'
          : LAZY_PAGE_SOURCES[segments[0] ?? '']
  if (!source) return ''
  const { css, js } = collectChunkAssets(manifest, source)
  const tags: string[] = []
  for (const file of css) if (!template.includes(`/${file}`)) tags.push(`<link rel="stylesheet" crossorigin href="/${file}">`)
  for (const file of js) if (!template.includes(`/${file}`)) tags.push(`<link rel="modulepreload" crossorigin href="/${file}">`)
  return tags.join('\n    ')
}

function outputFileFor(distDir: string, routePath: string): string {
  if (routePath === '/') return path.join(distDir, 'index.html')
  return path.join(distDir, `${routePath.replace(/^\//, '')}.html`)
}

function buildDocument(template: string, headTags: string, appHtml: string, extraHead: string): string {
  const head = extraHead ? `${headTags}
    ${extraHead}` : headTags
  return template
    .replace('<html lang="en"', '<html lang="en" data-boot')
    .replace(SEO_REGION, () => `<!--seo:start-->
    ${head}
    <!--seo:end-->`)
    .replace(APP_SLOT, () => `<div data-ssr style="display:contents">${appHtml}</div>`)
}

export async function prerender(distDir: string, rootDir: string): Promise<{ count: number; ms: number }> {
  const started = Date.now()
  const templatePath = path.join(distDir, 'index.html')
  const template = fs.readFileSync(templatePath, 'utf-8')
  if (!SEO_REGION.test(template) || !template.includes(APP_SLOT)) {
    throw new Error('[prerender] index.html is missing the <!--seo:start/end--> region or <!--app-html--> slot.')
  }

  const manifestPath = path.join(distDir, '.vite', 'manifest.json')
  const manifest: Manifest | null = fs.existsSync(manifestPath)
    ? (JSON.parse(fs.readFileSync(manifestPath, 'utf-8')) as Manifest)
    : null

  const server = await createServer({
    root: rootDir,
    configFile: false,
    logLevel: 'error',
    appType: 'custom',
    plugins: [react()],
    resolve: { alias: { '@': path.join(rootDir, 'src') } },
    server: { middlewareMode: true, hmr: false, watch: null },
    optimizeDeps: { noDiscovery: true, include: [] },
  })

  try {
    const mod = (await server.ssrLoadModule('/src/entry-prerender.tsx')) as PrerenderModule
    const routes = mod.listPrerenderRoutes()
    const failures: string[] = []

    for (const routePath of routes) {
      const meta = mod.getRouteMeta(routePath)
      if (meta.status !== 200 || meta.path !== routePath) {
        failures.push(`${routePath} → resolved as ${meta.status} ${meta.path}`)
        continue
      }
      const appHtml = await mod.render(routePath)
      const html = buildDocument(template, mod.renderHeadTags(meta), appHtml, routeAssetTags(manifest, routePath, template))
      const outFile = outputFileFor(distDir, routePath)
      fs.mkdirSync(path.dirname(outFile), { recursive: true })
      fs.writeFileSync(outFile, html, 'utf-8')
    }

    // 404.html: Vercel serves it (status 404) for every URL without a file.
    const missingPath = '/__not-found__'
    const notFoundHtml = await mod.render(missingPath)
    fs.writeFileSync(
      path.join(distDir, '404.html'),
      buildDocument(template, mod.renderHeadTags(mod.notFoundMeta(missingPath)), notFoundHtml, ''),
      'utf-8',
    )

    // The build manifest is only needed here; don't deploy it.
    fs.rmSync(path.join(distDir, '.vite'), { recursive: true, force: true })

    if (failures.length) {
      throw new Error(`[prerender] ${failures.length} route(s) did not resolve:\n  ${failures.join('\n  ')}`)
    }
    return { count: routes.length, ms: Date.now() - started }
  } finally {
    await server.close()
  }
}
