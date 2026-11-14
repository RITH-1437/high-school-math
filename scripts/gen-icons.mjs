/**
 * Generates favicon.png (64x64) and logo.png (200x60) from SVG
 * using Playwright's screenshot capability — no extra deps needed.
 */
import { chromium } from 'playwright'
import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dir = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dir, '..')

const faviconSvg = readFileSync(resolve(root, 'public/favicon.svg'), 'utf8')

// --- Favicon HTML (64x64 icon) ---
const faviconHtml = `<!DOCTYPE html>
<html><head><style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { width: 64px; height: 64px; overflow: hidden; background: transparent; }
  svg { width: 64px; height: 64px; display: block; }
</style></head><body>${faviconSvg}</body></html>`

// --- Logo HTML (wider lockup: icon + wordmark) ---
const logoHtml = `<!DOCTYPE html>
<html><head><style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 240px; height: 60px; overflow: hidden; background: transparent;
    display: flex; align-items: center; gap: 10px;
    font-family: system-ui, -apple-system, sans-serif;
  }
  svg { width: 44px; height: 44px; flex-shrink: 0; }
  .words { display: flex; flex-direction: column; gap: 1px; }
  .name { font-size: 15px; font-weight: 700; color: #102A56; line-height: 1.1; letter-spacing: -0.01em; }
  .meta { font-size: 9px; font-weight: 500; color: #64748B; letter-spacing: 0.04em; text-transform: uppercase; }
</style></head><body>
  ${faviconSvg}
  <div class="words">
    <span class="name">High School Math</span>
    <span class="meta">Formula Library · Grades 7–12</span>
  </div>
</body></html>`

const browser = await chromium.launch()
const page = await browser.newPage()

// Generate favicon.png 64x64
await page.setViewportSize({ width: 64, height: 64 })
await page.setContent(faviconHtml)
await page.waitForTimeout(200)
const faviconPng = await page.screenshot({ type: 'png', omitBackground: true })
mkdirSync(resolve(root, 'public/img'), { recursive: true })
writeFileSync(resolve(root, 'public/img/favicon.png'), faviconPng)
console.log('✓ public/img/favicon.png (64×64)')

// Generate favicon@2x 128x128
await page.setViewportSize({ width: 128, height: 128 })
const faviconHtml2x = faviconHtml.replace(/64px/g, '128px')
await page.setContent(faviconHtml2x)
await page.waitForTimeout(200)
const favicon2xPng = await page.screenshot({ type: 'png', omitBackground: true })
writeFileSync(resolve(root, 'public/img/favicon@2x.png'), favicon2xPng)
console.log('✓ public/img/favicon@2x.png (128×128)')

// Generate logo.png 240x60
await page.setViewportSize({ width: 240, height: 60 })
await page.setContent(logoHtml)
await page.waitForTimeout(200)
const logoPng = await page.screenshot({ type: 'png', omitBackground: true })
writeFileSync(resolve(root, 'public/img/logo.png'), logoPng)
console.log('✓ public/img/logo.png (240×60)')

await browser.close()
console.log('\nAll icons generated successfully.')
