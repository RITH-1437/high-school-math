import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { grades } from '../src/data/index'
import { shapes } from '../src/data/shapes'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BASE_URL = 'https://high-school-math-formula.vercel.app'
const today = new Date().toISOString().split('T')[0]

interface SitemapEntry {
  path: string
  priority: string
  changefreq: string
}

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

// Generate XML
const xmlLines = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
]

for (const entry of entries) {
  xmlLines.push('  <url>')
  xmlLines.push(`    <loc>${BASE_URL}${entry.path}</loc>`)
  xmlLines.push(`    <lastmod>${today}</lastmod>`)
  xmlLines.push(`    <changefreq>${entry.changefreq}</changefreq>`)
  xmlLines.push(`    <priority>${entry.priority}</priority>`)
  xmlLines.push('  </url>')
}

xmlLines.push('</urlset>')
xmlLines.push('')

const xmlContent = xmlLines.join('\n')
const publicDir = path.resolve(__dirname, '../public')
const sitemapPath = path.join(publicDir, 'sitemap.xml')

fs.writeFileSync(sitemapPath, xmlContent, 'utf-8')
console.log(`Generated sitemap.xml with ${entries.length} URLs at ${sitemapPath}`)
