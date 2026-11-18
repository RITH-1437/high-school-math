import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import {
  DEFAULT_PRODUCTION_ORIGIN,
  buildSitemapEntries,
  generateSitemapXml,
  generateSitemap,
} from '../../scripts/generate-sitemap'
import { formulaRefs, shapes, topicRefs } from '../data/index'
import {
  getRouteMeta,
  listIndexableRoutes,
  listPrerenderRoutes,
  listRedirects,
  renderHeadTags,
  serializeJsonLd,
  toPlainText,
  truncate,
} from './seo'

describe('SEO & Sitemap generation', () => {
  it('uses https://math-high-school.vercel.app as default production origin', () => {
    expect(DEFAULT_PRODUCTION_ORIGIN).toBe('https://math-high-school.vercel.app')
  })

  it('generates all expected route entries without duplicates', () => {
    const entries = buildSitemapEntries()
    const expected = 1 + 6 + 2 + 3 + 6 + topicRefs.length + formulaRefs.length + shapes.length
    const subjectCount = new Set(topicRefs.map((ref) => `${ref.grade.id}:${ref.subject.id}`)).size
    expect(entries.length).toBe(expected + subjectCount)

    // Check unique paths
    const paths = entries.map((e) => e.path)
    const uniquePaths = new Set(paths)
    expect(uniquePaths.size).toBe(entries.length)

    // Essential routes
    expect(paths).toContain('/')
    expect(paths).toContain('/grades')
    expect(paths).toContain('/formulas')
    expect(paths).toContain('/shapes')
    expect(paths).toContain('/graph')
    expect(paths).toContain('/unit-circle')
    expect(paths).toContain('/bacii')
    expect(paths).toContain('/bacii/science')
    expect(paths).toContain('/bacii/social')
    expect(paths).toContain('/exam')
    expect(paths).toContain('/exam/sprint')
    expect(paths).toContain('/glossary')
    // Internal search results and bookmarks are noindex utility pages.
    expect(paths).not.toContain('/search')
    expect(paths).not.toContain('/bookmarks')
  })

  it('generates valid sitemap XML with correct production URLs and https', () => {
    const xml = generateSitemapXml('https://math-high-school.vercel.app')

    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>')
    expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
    expect(xml).toContain('<loc>https://math-high-school.vercel.app/</loc>')
    expect(xml).toContain('<loc>https://math-high-school.vercel.app/graph</loc>')
    expect(xml).toContain('<loc>https://math-high-school.vercel.app/bacii</loc>')

    // Must NEVER reference old domain
    expect(xml).not.toContain('high-school-math-formula.vercel.app')

    // Count URLs in XML
    const matches = xml.match(/<loc>/g)
    expect(matches?.length).toBe(buildSitemapEntries().length)
  })

  it('supports custom base URLs without trailing slash issues', () => {
    const xml = generateSitemapXml('https://custom-math.vercel.app/')
    expect(xml).toContain('<loc>https://custom-math.vercel.app/</loc>')
    expect(xml).not.toContain('https://custom-math.vercel.app//')
  })

  it('verifies public/robots.txt references the correct new sitemap', () => {
    const robotsPath = path.resolve(__dirname, '../../public/robots.txt')
    expect(fs.existsSync(robotsPath)).toBe(true)

    const robotsContent = fs.readFileSync(robotsPath, 'utf-8')
    expect(robotsContent).toContain('Sitemap: https://math-high-school.vercel.app/sitemap.xml')
    expect(robotsContent).not.toContain('high-school-math-formula.vercel.app')
  })

  it('writes sitemap file cleanly to disk via generateSitemap', () => {
    const testDir = path.resolve(__dirname, '../../scratch/test-seo')
    const res = generateSitemap(testDir)

    expect(res.count).toBe(buildSitemapEntries().length)
    expect(fs.existsSync(res.path)).toBe(true)

    const content = fs.readFileSync(res.path, 'utf-8')
    expect(content).toContain('<loc>https://math-high-school.vercel.app/</loc>')
    expect(content).not.toContain('high-school-math-formula.vercel.app')

    // Cleanup
    fs.rmSync(testDir, { recursive: true, force: true })
  })

  it('gives every indexable route a unique title, description and self-canonical', () => {
    const titles = new Set<string>()
    const descriptions = new Set<string>()
    for (const route of listIndexableRoutes()) {
      const meta = getRouteMeta(route.path)
      expect(meta.status, route.path).toBe(200)
      expect(meta.robots, route.path).toBe('index,follow')
      expect(meta.path, route.path).toBe(route.path)
      expect(meta.title.length, route.path).toBeGreaterThan(10)
      expect(meta.description.length, route.path).toBeGreaterThan(50)
      expect(meta.description.length, route.path).toBeLessThanOrEqual(160)
      expect(meta.description, route.path).not.toMatch(/\$|\\[a-z]/)
      titles.add(meta.title)
      descriptions.add(meta.description)
    }
    const count = listIndexableRoutes().length
    expect(titles.size).toBe(count)
    expect(descriptions.size).toBe(count)
  })

  it('marks unknown URLs as noindex 404 without a canonical', () => {
    for (const path of ['/nope', '/formulas/not-a-formula', '/grades/6', '/grades/10/subjects/x', '/shapes/x/y']) {
      const meta = getRouteMeta(path)
      expect(meta.status, path).toBe(404)
      expect(meta.robots, path).toBe('noindex,follow')
      expect(renderHeadTags(meta)).not.toContain('rel="canonical"')
    }
  })

  it('canonicalizes aliases, trailing slashes and query strings', () => {
    expect(getRouteMeta('/exams').path).toBe('/exam')
    expect(getRouteMeta('/plotter').path).toBe('/graph')
    expect(getRouteMeta('/grades/12/subjects/calculus').path).toBe('/grades/12/subjects/advanced')
    expect(getRouteMeta('/grades/').path).toBe('/grades')
    expect(getRouteMeta('/glossary?x=1').path).toBe('/glossary')
  })

  it('keeps search and bookmarks prerendered but noindex', () => {
    expect(listPrerenderRoutes()).toEqual(expect.arrayContaining(['/search', '/bookmarks']))
    expect(getRouteMeta('/search').robots).toBe('noindex,follow')
    expect(getRouteMeta('/bookmarks').robots).toBe('noindex,follow')
  })

  it('home page declares WebSite identity with alternate names', () => {
    const meta = getRouteMeta('/')
    const site = meta.jsonLd.find((item) => item['@type'] === 'WebSite')
    expect(site?.name).toBe('High School Math')
    expect(site?.alternateName).toContain('Math High School')
    expect(meta.title).toContain('High School Math')
  })

  it('matches vercel.json redirects to the route aliases', () => {
    const vercel = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../vercel.json'), 'utf-8')) as {
      redirects: { source: string; destination: string }[]
      cleanUrls: boolean
      rewrites?: unknown
    }
    expect(vercel.cleanUrls).toBe(true)
    expect(vercel.rewrites).toBeUndefined()
    for (const redirect of listRedirects()) {
      expect(vercel.redirects).toEqual(expect.arrayContaining([expect.objectContaining(redirect)]))
    }
  })

  it('produces safe, readable meta text', () => {
    expect(toPlainText('Area $A = \\pi r^2$ of a circle')).toBe('Area A = π r² of a circle')
    expect(truncate('word '.repeat(80)).length).toBeLessThanOrEqual(158)
    expect(serializeJsonLd([{ name: '</script><script>' }])).not.toContain('</script>')
  })

  it('prerendered home page has exactly one visible H1 with Math High School branding', () => {
    const indexPath = path.resolve(__dirname, '../../dist/index.html')
    if (fs.existsSync(indexPath)) {
      const html = fs.readFileSync(indexPath, 'utf-8')
      const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || []
      expect(h1Matches.length).toBe(1)
      const h1 = h1Matches[0]
      expect(h1).toBeDefined()
      if (!h1) return
      expect(h1).toContain('Math High School')
      expect(h1).toContain('Grade 7–12 Mathematics')
      expect(h1).not.toContain('visually-hidden')
      const plainText = h1.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
      expect(plainText.length).toBeLessThanOrEqual(150)
    }
  })
})
