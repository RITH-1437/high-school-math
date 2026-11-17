import { defineConfig, type Plugin } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { generateSitemap } from './scripts/generate-sitemap'
import { prerender } from './scripts/prerender'

function sitemapPlugin(): Plugin {
  return {
    name: 'generate-sitemap',
    apply: 'build',
    buildStart() {
      generateSitemap()
    },
    async closeBundle() {
      const distDir = path.resolve(__dirname, './dist')
      const sitemap = generateSitemap(distDir)
      const result = await prerender(distDir, __dirname)
      console.log(`[seo] sitemap: ${sitemap.count} URLs · prerendered ${result.count} pages + 404.html in ${result.ms} ms`)
    },
  }
}

export default defineConfig({
  plugins: [react(), sitemapPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'es2020',
    manifest: true,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          katex: ['katex'],
          router: ['react-router-dom'],
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    css: false,
    include: ['src/**/*.test.{ts,tsx}'],
    exclude: ['e2e/**', 'node_modules/**'],
  },
})
