import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { listIndexableRoutes, SITE_ORIGIN } from '../src/lib/seo'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const DEFAULT_PRODUCTION_ORIGIN = SITE_ORIGIN

export interface SitemapEntry {
  path: string
  priority: string
  changefreq: string
}

/**
 * Indexable URLs only. Utility pages (search, bookmarks) are `noindex` and
 * deliberately excluded; the list is derived from content in src/lib/seo.ts.
 */
export function buildSitemapEntries(): SitemapEntry[] {
  return listIndexableRoutes()
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
