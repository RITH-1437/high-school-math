import katex from 'katex'
import { describe, expect, it } from 'vitest'
import {
  findTopicInSubject,
  formulaRefs,
  getSubject,
  getSubjectRef,
  grades,
  libraryStats,
  topicBySlug,
  topicRefs,
} from './index'
import { shapes } from './shapes'
import { GRADE_IDS } from '../types/content'
import { splitInlineMath } from '../lib/inline-math'

function texErrors(tex: string): string | null {
  try {
    katex.renderToString(tex, { throwOnError: true, strict: 'ignore' })
    return null
  } catch (error) {
    return (error as Error).message
  }
}

function inlineMath(text: string): string[] {
  return splitInlineMath(text)
    .filter((segment) => segment.type === 'math')
    .map((segment) => segment.value)
}

describe('grade structure', () => {
  it('has exactly grades 7–12 in order', () => {
    expect(grades.map((g) => g.id)).toEqual(GRADE_IDS)
    expect(grades.map((g) => g.number)).toEqual([7, 8, 9, 10, 11, 12])
  })

  it('every grade has subjects and every subject has topics', () => {
    for (const grade of grades) {
      expect(grade.subjects.length, `${grade.id} subjects`).toBeGreaterThan(0)
      for (const subject of grade.subjects) {
        expect(subject.topics.length, `${grade.id}/${subject.id} topics`).toBeGreaterThan(0)
      }
    }
  })

  it('subject ids are unique within a grade', () => {
    for (const grade of grades) {
      const ids = grade.subjects.map((s) => s.id)
      expect(new Set(ids).size, `${grade.id}: ${ids.join(',')}`).toBe(ids.length)
    }
  })

  it('resolves subject aliases such as 12:calculus to advanced', () => {
    const ref = getSubjectRef('12', 'calculus')
    expect(ref).toBeDefined()
    expect(ref?.subject.id).toBe('advanced')
    expect(getSubject('12', 'calculus')?.id).toBe('advanced')
    expect(findTopicInSubject('12', 'calculus', 'differentiation')?.topic.id).toBe('differentiation')
  })
})

describe('topics', () => {
  it('topic ids are globally unique', () => {
    const ids = topicRefs.map((r) => r.topic.id)
    const dupes = ids.filter((id, i) => ids.indexOf(id) !== i)
    expect(dupes).toEqual([])
  })

  it('every topic has the required teaching content', () => {
    for (const { topic, grade } of topicRefs) {
      const where = `grade ${grade.id} / ${topic.id}`
      expect(topic.introduction.length, `${where} introduction`).toBeGreaterThan(40)
      expect(topic.theory.length, `${where} theory`).toBeGreaterThan(0)
      expect(topic.formulas.length, `${where} formulas`).toBeGreaterThan(0)
      expect(topic.examples.length, `${where} examples`).toBeGreaterThan(0)
      expect(topic.exercises.length, `${where} exercises`).toBeGreaterThanOrEqual(4)
      expect(topic.mistakes.length, `${where} mistakes`).toBeGreaterThan(0)
    }
  })

  it('related topics reference existing topics', () => {
    const missing: string[] = []
    for (const { topic } of topicRefs) {
      for (const id of topic.related) if (!topicBySlug.has(id)) missing.push(`${topic.id} -> ${id}`)
    }
    expect(missing).toEqual([])
  })

  it('topic shape references exist', () => {
    const shapeIds = new Set(shapes.map((s) => s.id))
    const bad = topicRefs.filter((r) => r.topic.shapeId && !shapeIds.has(r.topic.shapeId)).map((r) => r.topic.id)
    expect(bad).toEqual([])
  })
})

describe('formulas', () => {
  it('formula ids are globally unique', () => {
    const ids = formulaRefs.map((r) => r.formula.id)
    const dupes = ids.filter((id, i) => ids.indexOf(id) !== i)
    expect(dupes).toEqual([])
  })

  it('every formula defines variables, has tags and no delimiters', () => {
    for (const { formula } of formulaRefs) {
      expect(formula.variables.length, `${formula.id} variables`).toBeGreaterThan(0)
      expect(formula.tags.length, `${formula.id} tags`).toBeGreaterThanOrEqual(2)
      expect(formula.description.length, `${formula.id} description`).toBeGreaterThan(10)
      expect(formula.expression.includes('$'), `${formula.id} must not contain $`).toBe(false)
    }
  })

  it('every formula expression and variable symbol renders in KaTeX', () => {
    const failures: string[] = []
    for (const { formula } of formulaRefs) {
      const err = texErrors(formula.expression)
      if (err) failures.push(`${formula.id} expression: ${err}`)
      for (const v of formula.variables) {
        const e = texErrors(v.symbol)
        if (e) failures.push(`${formula.id} variable ${v.symbol}: ${e}`)
      }
    }
    expect(failures).toEqual([])
  })

  it('has no LaTeX control-character corruption (\\f \\t \\b \\r \\v) in expressions', () => {
    const bad = formulaRefs.filter(({ formula }) => /[\f\t\b\r\v\0]/.test(formula.expression)).map((r) => r.formula.id)
    expect(bad).toEqual([])
  })
})

describe('inline math in prose renders', () => {
  it('every $...$ fragment in topics compiles', () => {
    const failures: string[] = []
    for (const { topic } of topicRefs) {
      const texts: string[] = [
        topic.introduction,
        topic.subtitle,
        ...(topic.keyIdeas ?? []),
        ...topic.theory.flatMap((t) => [...t.body, ...(t.bullets ?? [])]),
        ...topic.mistakes.flatMap((m) => [m.mistake, m.correction]),
        ...topic.examples.flatMap((e) => [e.problem, e.answer, ...e.given, ...e.steps.map((s) => s.text)]),
        ...topic.exercises.flatMap((x) => [x.prompt, x.explanation, x.hint ?? '']),
      ]
      for (const text of texts) {
        for (const tex of inlineMath(text)) {
          const err = texErrors(tex)
          if (err) failures.push(`${topic.id}: "${tex}" → ${err}`)
        }
      }
      for (const example of topic.examples) {
        for (const step of example.steps) {
          if (step.math) {
            const err = texErrors(step.math)
            if (err) failures.push(`${topic.id} step math "${step.math}" → ${err}`)
          }
        }
      }
    }
    expect(failures.slice(0, 20)).toEqual([])
  })
})

describe('exercises', () => {
  const all = topicRefs.flatMap((r) => r.topic.exercises.map((exercise) => ({ exercise, topic: r.topic })))

  it('exercise ids are globally unique', () => {
    const ids = all.map((a) => a.exercise.id)
    const dupes = ids.filter((id, i) => ids.indexOf(id) !== i)
    expect(dupes).toEqual([])
  })

  it('multiple-choice questions have exactly one valid correct option', () => {
    for (const { exercise } of all) {
      if (exercise.type !== 'multiple-choice') continue
      expect(exercise.options.length, `${exercise.id} options`).toBeGreaterThanOrEqual(3)
      expect(Number.isInteger(exercise.correctOption), `${exercise.id} index integer`).toBe(true)
      expect(exercise.correctOption, `${exercise.id} index range`).toBeGreaterThanOrEqual(0)
      expect(exercise.correctOption, `${exercise.id} index range`).toBeLessThan(exercise.options.length)
      expect(new Set(exercise.options).size, `${exercise.id} duplicate options`).toBe(exercise.options.length)
    }
  })

  it('numeric questions have finite answers', () => {
    for (const { exercise } of all) {
      if (exercise.type !== 'numeric') continue
      expect(Number.isFinite(exercise.answer), `${exercise.id} answer`).toBe(true)
    }
  })

  it('every exercise has an explanation', () => {
    for (const { exercise } of all) {
      expect(exercise.explanation.length, `${exercise.id} explanation`).toBeGreaterThan(15)
    }
  })

  it('has a mix of question types and difficulties', () => {
    expect(all.some((a) => a.exercise.type === 'multiple-choice')).toBe(true)
    expect(all.some((a) => a.exercise.type === 'numeric')).toBe(true)
    for (const level of ['easy', 'medium', 'hard']) {
      expect(all.some((a) => a.exercise.difficulty === level), level).toBe(true)
    }
  })
})

describe('library statistics', () => {
  it('derives counts from data rather than constants', () => {
    expect(libraryStats.topicCount).toBe(topicRefs.length)
    expect(libraryStats.formulaCount).toBe(formulaRefs.length)
    expect(libraryStats.shapeCount).toBe(shapes.length)
  })
})
