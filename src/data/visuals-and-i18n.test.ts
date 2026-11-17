import katex from 'katex'
import { describe, expect, it } from 'vitest'
import { grades, topicBySlug } from './index'
import { shapes } from './shapes'
import { visualsByGrade } from './visuals'
import { kmGrade7 } from '../i18n/km/grade7'
import { kmGrade8 } from '../i18n/km/grade8'
import { kmGrade9 } from '../i18n/km/grade9'
import { kmGrade10 } from '../i18n/km/grade10'
import { kmGrade11 } from '../i18n/km/grade11'
import { kmGrade12 } from '../i18n/km/grade12'
import { kmShapeContent, localizeShape } from '../i18n/shapes-km'
import type { GradeTranslation } from '../i18n/content'
import { splitInlineMath } from '../lib/inline-math'
import type { Flowchart, GraphSpec } from '../types/content'

function texError(tex: string): string | null {
  try {
    katex.renderToString(tex, { throwOnError: true, strict: 'ignore' })
    return null
  } catch (error) {
    return (error as Error).message
  }
}

/** Every inline `$...$` segment and every display string must compile. */
function mathErrors(text: string | undefined, where: string): string[] {
  if (!text) return []
  return splitInlineMath(text)
    .filter((s) => s.type === 'math')
    .map((s) => texError(s.value))
    .filter((e): e is string => Boolean(e))
    .map((e) => `${where}: ${e}`)
}

const kmFiles: Record<string, GradeTranslation> = {
  '7': kmGrade7,
  '8': kmGrade8,
  '9': kmGrade9,
  '10': kmGrade10,
  '11': kmGrade11,
  '12': kmGrade12,
}

const KHMER = /[ក-៿]/

describe('Khmer grade translations', () => {
  for (const grade of grades) {
    const file = kmFiles[grade.id]
    const topicIds = new Set(grade.subjects.flatMap((s) => s.topics.map((t) => t.id)))

    it(`grade ${grade.id}: topic keys belong to this grade`, () => {
      for (const id of Object.keys(file.topics)) expect(topicIds.has(id), id).toBe(true)
    })

    it(`grade ${grade.id}: localized structure mirrors the English content`, () => {
      for (const [topicId, km] of Object.entries(file.topics)) {
        const topic = topicBySlug.get(topicId)!.topic
        if (km.theory) expect(km.theory.length, `${topicId} theory`).toBe(topic.theory.length)
        if (km.examples) expect(km.examples.length, `${topicId} examples`).toBe(topic.examples.length)
        if (km.mistakes) expect(km.mistakes.length, `${topicId} mistakes`).toBe(topic.mistakes.length)
        km.examples?.forEach((ex, i) => {
          if (ex.steps) expect(ex.steps.length, `${topicId} example ${i} steps`).toBe(topic.examples[i].steps.length)
        })
        const exercises = new Map(topic.exercises.map((e) => [e.id, e]))
        for (const [exId, kmEx] of Object.entries(km.exercises ?? {})) {
          const ex = exercises.get(exId)
          expect(ex, `${topicId}: unknown exercise ${exId}`).toBeDefined()
          if (ex?.type === 'multiple-choice' && kmEx.options) {
            expect(kmEx.options.length, `${exId} options`).toBe(ex.options.length)
          }
          if (ex?.type === 'numeric') expect(kmEx.options, `${exId} numeric has no options`).toBeUndefined()
        }
      }
    })

    it(`grade ${grade.id}: Khmer text is Khmer and its math compiles`, () => {
      const errors: string[] = []
      for (const [topicId, km] of Object.entries(file.topics)) {
        if (km.introduction) {
          expect(KHMER.test(km.introduction), `${topicId} introduction is Khmer`).toBe(true)
          errors.push(...mathErrors(km.introduction, `${topicId} intro`))
        }
        km.theory?.forEach((s, i) => s.body.forEach((p) => errors.push(...mathErrors(p, `${topicId} theory ${i}`))))
        km.keyIdeas?.forEach((p) => errors.push(...mathErrors(p, `${topicId} keyIdea`)))
        km.mistakes?.forEach((m) => errors.push(...mathErrors(m.mistake, topicId), ...mathErrors(m.correction, topicId)))
        km.examples?.forEach((ex, i) => {
          errors.push(...mathErrors(ex.problem, `${topicId} ex${i}`), ...mathErrors(ex.answer, `${topicId} ex${i}`))
          ex.steps?.forEach((st) => {
            errors.push(...mathErrors(st.text, `${topicId} ex${i} step`))
            if (st.math) {
              const e = texError(st.math)
              if (e) errors.push(`${topicId} ex${i} step math: ${e}`)
            }
          })
        })
        for (const [exId, ex] of Object.entries(km.exercises ?? {})) {
          errors.push(...mathErrors(ex.prompt, exId), ...mathErrors(ex.explanation, exId), ...mathErrors(ex.hint, exId))
          ex.options?.forEach((o) => errors.push(...mathErrors(o, `${exId} option`)))
        }
      }
      expect(errors).toEqual([])
    })
  }
})

describe('Khmer shape content', () => {
  it('covers every shape and mirrors its structure', () => {
    const errors: string[] = []
    for (const shape of shapes) {
      const km = kmShapeContent[shape.id]
      if (!km) {
        errors.push(`${shape.id}: missing Khmer copy`)
        continue
      }
      if (km.properties.length !== shape.properties.length) {
        errors.push(`${shape.id}: ${km.properties.length} properties, expected ${shape.properties.length}`)
      }
      if (km.formulas.length !== shape.formulas.length) {
        errors.push(`${shape.id}: ${km.formulas.length} formulas, expected ${shape.formulas.length}`)
      }
      if (km.example.steps.length !== shape.example.steps.length) {
        errors.push(`${shape.id}: ${km.example.steps.length} example steps, expected ${shape.example.steps.length}`)
      }
      for (const dimension of shape.dimensions) {
        if (!km.dimensions[dimension.key]) errors.push(`${shape.id}: missing dimension ${dimension.key}`)
      }
      for (const metric of shape.metrics) {
        if (!km.metrics[metric.key]) errors.push(`${shape.id}: missing metric ${metric.key}`)
      }
    }
    expect(errors).toEqual([])
  })

  it('writes Khmer prose and keeps every math segment compilable', () => {
    const errors: string[] = []
    for (const shape of shapes) {
      const km = kmShapeContent[shape.id]
      if (!km) continue
      expect(KHMER.test(km.definition), `${shape.id} definition is Khmer`).toBe(true)
      errors.push(...mathErrors(km.definition, `${shape.id} definition`))
      km.properties.forEach((property, i) => errors.push(...mathErrors(property, `${shape.id} property ${i}`)))
      km.formulas.forEach((formula, i) => errors.push(...mathErrors(formula.note, `${shape.id} formula ${i}`)))
      errors.push(...mathErrors(km.example.problem, `${shape.id} example`), ...mathErrors(km.example.answer, `${shape.id} answer`))
      km.example.steps.forEach((step, i) => errors.push(...mathErrors(step, `${shape.id} step ${i}`)))
    }
    expect(errors).toEqual([])
  })

  it('localizes only text and leaves ids, formulas and calculations untouched', () => {
    for (const shape of shapes) {
      const localized = localizeShape(shape, 'km')
      expect(localized.id).toBe(shape.id)
      expect(localized.category).toBe(shape.category)
      expect(localized.name).not.toBe(shape.name)
      expect(KHMER.test(localized.name), `${shape.id} name`).toBe(true)
      expect(localized.formulas.map((f) => f.expression)).toEqual(shape.formulas.map((f) => f.expression))
      expect(localized.dimensions.map((d) => [d.key, d.min, d.max, d.step, d.defaultValue])).toEqual(
        shape.dimensions.map((d) => [d.key, d.min, d.max, d.step, d.defaultValue]),
      )
      for (const [index, metric] of shape.metrics.entries()) {
        const dims = Object.fromEntries(shape.dimensions.map((d) => [d.key, d.defaultValue]))
        expect(localized.metrics[index].compute(dims)).toBe(metric.compute(dims))
      }
    }
    expect(localizeShape(shapes[0], 'en')).toBe(shapes[0])
  })
})

function flowchartProblems(chart: Flowchart): string[] {
  const problems: string[] = []
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(chart.id)) problems.push(`${chart.id}: id must be kebab-case`)
  if (chart.nodes[0]?.kind !== 'start') problems.push(`${chart.id}: first node must be start`)
  if (chart.nodes[chart.nodes.length - 1]?.kind !== 'end') problems.push(`${chart.id}: last node must be end`)
  if (chart.nodes.length < 3) problems.push(`${chart.id}: needs at least 3 nodes`)
  for (const node of chart.nodes) {
    if (node.kind === 'decision' && (node.branches?.length ?? 0) < 2) problems.push(`${chart.id}: decision needs 2+ branches`)
    if (node.kind !== 'decision' && node.branches?.length) problems.push(`${chart.id}: only decisions branch`)
    problems.push(...mathErrors(node.text, chart.id), ...mathErrors(node.textKm, chart.id))
    if (node.math) {
      const e = texError(node.math)
      if (e) problems.push(`${chart.id} math: ${e}`)
    }
    for (const b of node.branches ?? []) {
      problems.push(...mathErrors(b.text, chart.id), ...mathErrors(b.textKm, chart.id))
      if (b.math) {
        const e = texError(b.math)
        if (e) problems.push(`${chart.id} branch math: ${e}`)
      }
    }
  }
  return problems
}

function graphProblems(g: GraphSpec): string[] {
  const p: string[] = []
  const [x0, x1] = g.xRange
  const [y0, y1] = g.yRange
  if (!(x1 > x0 && y1 > y0)) p.push(`${g.id}: ranges must increase`)
  if ((x1 - x0) / (g.xStep ?? 1) > 40 || (y1 - y0) / (g.yStep ?? 1) > 40) p.push(`${g.id}: too many ticks; raise the step`)
  for (const pt of g.points ?? []) {
    if (pt.x < x0 || pt.x > x1 || pt.y < y0 || pt.y > y1) p.push(`${g.id}: point ${pt.label ?? ''}(${pt.x}, ${pt.y}) outside the view`)
  }
  for (const [i, c] of (g.curves ?? []).entries()) {
    let visible = 0
    for (let k = 0; k <= 100; k++) {
      const x = x0 + ((x1 - x0) * k) / 100
      const y = c.fn(x)
      if (Number.isFinite(y) && y >= y0 && y <= y1) visible++
    }
    if (visible < 5) p.push(`${g.id}: curve ${i} is barely visible in the window`)
  }
  for (const a of g.areas ?? []) if (!(a.to > a.from)) p.push(`${g.id}: area bounds must increase`)
  return p
}

describe('topic visuals', () => {
  for (const grade of grades) {
    const visuals = visualsByGrade[grade.id]
    const topicIds = new Set(grade.subjects.flatMap((s) => s.topics.map((t) => t.id)))

    it(`grade ${grade.id}: visuals are keyed by this grade's topics and are well formed`, () => {
      const problems: string[] = []
      for (const [topicId, set] of Object.entries(visuals)) {
        if (!topicIds.has(topicId)) problems.push(`unknown topic ${topicId}`)
        for (const chart of set.flowcharts ?? []) {
          problems.push(...flowchartProblems(chart))
          if (!chart.topicIds.includes(topicId)) problems.push(`${chart.id}: topicIds must include ${topicId}`)
        }
        for (const g of set.graphs ?? []) problems.push(...graphProblems(g))
      }
      expect(problems).toEqual([])
    })
  }

  it('flowchart and graph ids are globally unique', () => {
    const ids = Object.values(visualsByGrade).flatMap((v) =>
      Object.values(v).flatMap((set) => [...(set.flowcharts ?? []).map((f) => f.id), ...(set.graphs ?? []).map((g) => g.id)]),
    )
    expect(new Set(ids).size).toBe(ids.length)
  })
})
