import katex from 'katex'
import { describe, expect, it } from 'vitest'
import {
  PAST_PAPERS,
  QUESTION_PATTERNS,
  TRACKS,
  blueprintFor,
  kindFrequency,
  papersFor,
  patternsFor,
  timeBudget,
  tracksForTopic,
  CHECKING_MINUTES,
} from './bacii'
import { getGrade, topicBySlug } from './index'
import { splitInlineMath } from '../lib/inline-math'
import { BAC_TRACKS } from '../types/exam'

const compiles = (tex: string) => {
  try {
    katex.renderToString(tex, { throwOnError: true, strict: 'ignore' })
    return true
  } catch {
    return false
  }
}
const inlineOk = (text: string) => splitInlineMath(text).every((s) => s.type !== 'math' || compiles(s.value))

describe('BacII tracks', () => {
  const grade12 = getGrade('12')!
  const g12Topics = grade12.subjects.flatMap((s) => s.topics.map((t) => t.id))

  it('every track topic is a Grade 12 topic', () => {
    for (const track of BAC_TRACKS) {
      for (const id of TRACKS[track].topicIds) expect(g12Topics, `${track}: ${id}`).toContain(id)
    }
  })

  it('every Grade 12 topic belongs to at least one track', () => {
    for (const id of g12Topics) expect(tracksForTopic(id).length, id).toBeGreaterThan(0)
  })

  it('the social track is a subset of the science track', () => {
    for (const id of TRACKS.social.topicIds) expect(TRACKS.science.topicIds).toContain(id)
  })

  it('track paper format matches the latest paper on record', () => {
    for (const track of BAC_TRACKS) {
      const latest = blueprintFor(track)
      expect(latest.totalMarks).toBe(TRACKS[track].mathMarks)
      expect(latest.durationMinutes).toBe(TRACKS[track].durationMinutes)
    }
  })
})

describe('BacII past papers', () => {
  it('parts add up to the paper total', () => {
    for (const paper of PAST_PAPERS) {
      const sum = paper.parts.reduce((total, part) => total + part.marks, 0)
      expect(sum, `${paper.track} ${paper.year} ${paper.session ?? ''}`).toBe(paper.totalMarks)
    }
  })

  it('records the 15 social papers from 2011–2025 (no 2020 sitting)', () => {
    const social = papersFor('social')
    expect(social).toHaveLength(15)
    expect(social.some((p) => p.year === 2020)).toBe(false)
  })

  it('the social paper has kept the same five parts since 2019', () => {
    const recent = papersFor('social').filter((p) => p.year >= 2019)
    for (const paper of recent) {
      expect(paper.parts.map((p) => `${p.kind}:${p.marks}`)).toEqual([
        'limits:15',
        'integrals:10',
        'probability:10',
        'conics:10',
        'function-study:30',
      ])
    }
  })

  it('function study appears on every social paper since 2014', () => {
    const freq = kindFrequency('social', 2014).find((f) => f.kind === 'function-study')!
    expect(freq.papers).toBe(freq.totalPapers)
  })
})

describe('BacII time budget', () => {
  for (const track of BAC_TRACKS) {
    it(`${track}: minutes add up to the paper time minus checking time`, () => {
      const paper = blueprintFor(track)
      const slots = timeBudget(paper)
      expect(slots.reduce((t, s) => t + s.minutes, 0)).toBe(paper.durationMinutes - CHECKING_MINUTES)
      const fs = slots.find((s) => s.part.kind === 'function-study')!
      expect(fs.minutes).toBe(Math.max(...slots.map((s) => s.minutes)))
    })
  }
})

describe('BacII question patterns', () => {
  it('every pattern points to a real topic and is well formed', () => {
    for (const pattern of QUESTION_PATTERNS) {
      expect(topicBySlug.has(pattern.topicId), pattern.topicId).toBe(true)
      expect(pattern.asks.length).toBe(pattern.asksKm.length)
      expect(pattern.checks.length).toBe(pattern.checksKm.length)
      const nodes = pattern.flowchart.nodes
      expect(nodes[0].kind).toBe('start')
      expect(nodes[nodes.length - 1].kind).toBe('end')
      for (const node of nodes) {
        expect(inlineOk(node.text), node.text).toBe(true)
        if (node.textKm) expect(inlineOk(node.textKm), node.textKm).toBe(true)
        if (node.math) expect(compiles(node.math), node.math).toBe(true)
        if (node.kind === 'decision') expect(node.branches!.length).toBeGreaterThanOrEqual(2)
        for (const b of node.branches ?? []) {
          expect(inlineOk(b.label) && inlineOk(b.text), b.text).toBe(true)
          if (b.math) expect(compiles(b.math), b.math).toBe(true)
        }
      }
      for (const line of [...pattern.asks, ...pattern.asksKm, ...pattern.checks, ...pattern.checksKm]) {
        expect(inlineOk(line), line).toBe(true)
      }
    }
  })

  it('every kind that appears on a track paper since 2014 has a pattern for that track', () => {
    for (const track of BAC_TRACKS) {
      const covered = new Set(patternsFor(track).map((p) => p.kind))
      for (const f of kindFrequency(track, 2014)) expect(covered.has(f.kind), `${track}: ${f.kind}`).toBe(true)
    }
  })

  it('graph points sit on their curves', () => {
    const fs = QUESTION_PATTERNS.find((p) => p.kind === 'function-study')!.graph!
    const f = fs.curves![0].fn
    for (const pt of fs.points!) expect(f(pt.x)).toBeCloseTo(pt.y, 9)
    const ellipse = QUESTION_PATTERNS.find((p) => p.kind === 'conics')!.graph!
    const foci = ellipse.points!.filter((p) => p.label?.startsWith('F'))
    for (const fpt of foci) expect(Math.abs(fpt.x)).toBeCloseTo(Math.sqrt(9 - 4), 9)
  })
})
