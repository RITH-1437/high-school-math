import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import {
  DEFAULT_PRODUCTION_ORIGIN,
  buildSitemapEntries,
  generateSitemapXml,
  generateSitemap,
} from '../../scripts/generate-sitemap'

describe('SEO & Sitemap generation', () => {
  it('uses https://math-high-school.vercel.app as default production origin', () => {
    expect(DEFAULT_PRODUCTION_ORIGIN).toBe('https://math-high-school.vercel.app')
  })

  it('generates all expected route entries without duplicates', () => {
    const entries = buildSitemapEntries()
    expect(entries.length).toBe(402)

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
    expect(paths).toContain('/bacii')
    expect(paths).toContain('/bacii/science')
    expect(paths).toContain('/bacii/social')
    expect(paths).toContain('/exam')
    expect(paths).toContain('/glossary')
    expect(paths).toContain('/search')
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
    expect(matches?.length).toBe(402)
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

    expect(res.count).toBe(402)
    expect(fs.existsSync(res.path)).toBe(true)

    const content = fs.readFileSync(res.path, 'utf-8')
    expect(content).toContain('<loc>https://math-high-school.vercel.app/</loc>')
    expect(content).not.toContain('high-school-math-formula.vercel.app')

    // Cleanup
    fs.rmSync(testDir, { recursive: true, force: true })
  })
})
