import { createServer } from 'vite'
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' })
const data = await server.ssrLoadModule('/src/data/index.ts')
const shapesMod = await server.ssrLoadModule('/src/data/shapes.ts')
const out = { grades: [], subjects: [], topics: [], shapes: [], counts: {} }
for (const g of data.grades) {
  out.grades.push({ id: g.id, title: g.title, tagline: g.tagline, description: g.description, focus: g.focus })
  for (const s of g.subjects) {
    out.subjects.push({ key: `${g.id}:${s.id}`, grade: g.id, id: s.id, family: s.family, title: s.title, description: s.description, topicCount: s.topics.length })
    for (const t of s.topics) {
      out.topics.push({ id: t.id, grade: g.id, subject: s.id, title: t.title, subtitle: t.subtitle, formulas: t.formulas.length, exercises: t.exercises.length })
    }
  }
}
for (const s of shapesMod.shapes) out.shapes.push({ id: s.id, name: s.name, tagline: s.tagline, category: s.category })
out.counts = data.libraryStats
console.log(JSON.stringify(out, null, 2))
await server.close()
