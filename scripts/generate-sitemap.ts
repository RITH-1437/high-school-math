import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { grades } from '../src/data/index'
import { shapes } from '../src/data/shapes'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const DEFAULT_PRODUCTION_ORIGIN = 'https://math-high-school.vercel.app'

export interface SitemapEntry {
  path: string
  priority: string
  changefreq: string
}

export function buildSitemapEntries(): SitemapEntry[] {
  const entries: SitemapEntry[] = []

  function add(urlPath: string, priority = '0.7', changefreq = 'weekly') {
    const cleanPath = urlPath.startsWith('/') ? urlPath : `/${urlPath}`
    if (!entries.some((e) => e.path === cleanPath)) {
      entries.push({ path: cleanPath, priority, changefreq })
    }
  }

  // 1. Core top-level pages
  add('/', '1.0', 'daily')
  add('/grades', '0.9', 'weekly')
  add('/formulas', '0.9', 'weekly')
  add('/shapes', '0.9', 'weekly')
  add('/graph', '0.9', 'weekly')
  add('/bacii', '0.9', 'weekly')
  add('/bacii/science', '0.8', 'weekly')
  add('/bacii/social', '0.8', 'weekly')
  add('/exam', '0.9', 'weekly')
  add('/glossary', '0.8', 'weekly')
  add('/search', '0.7', 'weekly')

  // 2. Grade pages & sub-routes
  for (const grade of grades) {
    add(`/grades/${grade.id}`, '0.8', 'weekly')

    for (const subject of grade.subjects) {
      add(`/grades/${grade.id}/subjects/${subject.id}`, '0.8', 'weekly')

      for (const topic of subject.topics) {
        add(`/grades/${grade.id}/subjects/${subject.id}/topics/${topic.id}`, '0.7', 'weekly')

        for (const formula of topic.formulas) {
          add(`/formulas/${formula.id}`, '0.7', 'weekly')
        }
      }
    }
  }

  // 3. Shape Lab detail pages
  for (const shape of shapes) {
    add(`/shapes/${shape.id}`, '0.6', 'monthly')
  }

  return entries
}

export function generateSitemapXml(
  baseUrl = process.env.VITE_SITE_URL || process.env.SITE_URL || DEFAULT_PRODUCTION_ORIGIN,
  customDate?: string,
): string {
  const cleanBaseUrl = baseUrl.replace(/\/+$/, '')
  const today = customDate || new Date().toISOString().split('T')[0]
  const entries = buildSitemapEntries()

  const xmlLines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ]

  for (const entry of entries) {
    xmlLines.push('  <url>')
    xmlLines.push(`    <loc>${cleanBaseUrl}${entry.path}</loc>`)
    xmlLines.push(`    <lastmod>${today}</lastmod>`)
    xmlLines.push(`    <changefreq>${entry.changefreq}</changefreq>`)
    xmlLines.push(`    <priority>${entry.priority}</priority>`)
    xmlLines.push('  </url>')
  }

  xmlLines.push('</urlset>')
  xmlLines.push('')

  return xmlLines.join('\n')
}

export function generateSitemap(targetDir?: string, baseUrl?: string): { count: number; path: string } {
  const destinationDir = targetDir || path.resolve(__dirname, '../public')
  const xmlContent = generateSitemapXml(baseUrl)
  const sitemapPath = path.join(destinationDir, 'sitemap.xml')

  if (!fs.existsSync(destinationDir)) {
    fs.mkdirSync(destinationDir, { recursive: true })
  }

  fs.writeFileSync(sitemapPath, xmlContent, 'utf-8')
  const count = buildSitemapEntries().length
  return { count, path: sitemapPath }
}

// Auto-run if executed directly via CLI
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const res = generateSitemap()
  console.log(`Generated sitemap.xml with ${res.count} URLs at ${res.path}`)
}
