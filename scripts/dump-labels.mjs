import { createServer } from 'vite'
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' })
const mod = await server.ssrLoadModule('/src/data/shapes.ts')
const dims = new Set(), metrics = new Set(), formulaLabels = new Set()
for (const s of mod.shapes) {
  for (const d of s.dimensions) dims.add(d.label)
  for (const m of s.metrics) metrics.add(m.label)
  for (const f of s.formulas) formulaLabels.add(f.label)
}
console.log('DIMS', JSON.stringify([...dims]))
console.log('METRICS', JSON.stringify([...metrics]))
console.log('FORMULA LABELS', JSON.stringify([...formulaLabels]))
await server.close()
