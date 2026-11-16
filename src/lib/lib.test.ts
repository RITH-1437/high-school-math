import { describe, expect, it } from 'vitest'
import { clamp, formatMetricValue, formatNumber, isNumericAnswerCorrect, parseNumericAnswer, pluralize, roundTo } from './format'
import { normalizeSearchText, searchContent, tokenizeQuery, highlightParts } from './search'
import { shapes } from '../data/shapes'

describe('formatNumber', () => {
  it('formats with up to two decimals by default', () => {
    expect(formatNumber(3.14159)).toBe('3.14')
    expect(formatNumber(12)).toBe('12')
    expect(formatNumber(0.5)).toBe('0.5')
  })

  it('respects precision', () => {
    expect(formatNumber(2.3456, 3)).toBe('2.346')
    expect(formatNumber(2.3456, 0)).toBe('2')
  })

  it('handles non-finite input safely', () => {
    expect(formatNumber(Number.NaN)).toBe('—')
    expect(formatNumber(Infinity)).toBe('—')
    expect(formatMetricValue(Number.NaN)).toBe('—')
  })

  it('formats large values in exponential form', () => {
    expect(formatMetricValue(12_345_678)).toContain('e')
  })
})

describe('parseNumericAnswer', () => {
  it('parses integers, decimals and negatives', () => {
    expect(parseNumericAnswer('12')).toBe(12)
    expect(parseNumericAnswer('-3.5')).toBe(-3.5)
    expect(parseNumericAnswer(' 7 ')).toBe(7)
    expect(parseNumericAnswer('1,250')).toBe(1250)
  })

  it('parses simple fractions', () => {
    expect(parseNumericAnswer('3/4')).toBe(0.75)
    expect(parseNumericAnswer('-1/2')).toBe(-0.5)
  })

  it('parses pi written as a word or symbol', () => {
    expect(parseNumericAnswer('pi')).toBeCloseTo(Math.PI, 10)
    expect(parseNumericAnswer('π')).toBeCloseTo(Math.PI, 10)
  })

  it('rejects invalid input instead of guessing', () => {
    expect(parseNumericAnswer('')).toBeNull()
    expect(parseNumericAnswer('abc')).toBeNull()
    expect(parseNumericAnswer('1/0')).toBeNull()
    expect(parseNumericAnswer('12x')).toBeNull()
  })

  it('compares answers with tolerance', () => {
    expect(isNumericAnswerCorrect('3.14', Math.PI, 0.01)).toBe(true)
    expect(isNumericAnswerCorrect('3.1', Math.PI, 0.01)).toBe(false)
    expect(isNumericAnswerCorrect('3/4', 0.75)).toBe(true)
    expect(isNumericAnswerCorrect('nope', 0.75)).toBe(false)
  })
})

describe('small helpers', () => {
  it('clamps and rounds', () => {
    expect(clamp(5, 0, 3)).toBe(3)
    expect(clamp(-1, 0, 3)).toBe(0)
    expect(roundTo(2.345, 2)).toBeCloseTo(2.35, 10)
  })

  it('pluralises', () => {
    expect(pluralize(1, 'formula')).toBe('1 formula')
    expect(pluralize(3, 'formula')).toBe('3 formulas')
    expect(pluralize(2, 'entry', 'entries')).toBe('2 entries')
  })
})

describe('normalizeSearchText', () => {
  it('converts mathematical symbols to words', () => {
    expect(normalizeSearchText('πr²')).toBe('pi r2')
    expect(normalizeSearchText('√x')).toBe('sqrt x')
    expect(normalizeSearchText('θ')).toBe('theta')
    expect(normalizeSearchText('a² + b² = c²')).toBe('a2 b2 c2')
  })

  it('strips accents and punctuation', () => {
    expect(normalizeSearchText('  Quadratic—Formula!  ')).toBe('quadratic formula')
  })
})

describe('tokenizeQuery', () => {
  it('drops stop words', () => {
    expect(tokenizeQuery('What is the area of a circle')).toEqual(['area', 'circle'])
  })

  it('returns nothing for empty or stop-word-only input', () => {
    expect(tokenizeQuery('')).toEqual([])
    expect(tokenizeQuery('the of and')).toEqual([])
  })
})

describe('searchContent', () => {
  it('finds the Pythagorean theorem by name', () => {
    const hits = searchContent('pythagorean theorem')
    expect(hits.length).toBeGreaterThan(0)
    expect(hits[0].title.toLowerCase()).toContain('pythag')
  })

  it('finds a formula by its mathematical description', () => {
    const hits = searchContent('area of a circle')
    expect(hits.some((hit) => hit.kind === 'formula')).toBe(true)
  })

  it('finds shapes, not only formulas', () => {
    const hits = searchContent('cylinder')
    expect(hits.some((hit) => hit.kind === 'shape')).toBe(true)
  })

  it('handles trigonometric abbreviations', () => {
    const hits = searchContent('sin cos tan')
    expect(hits.length).toBeGreaterThan(0)
  })

  it('ranks a more specific query above a broad one', () => {
    const broad = searchContent('quadratic')
    const specific = searchContent('quadratic formula')
    expect(specific[0].score).toBeGreaterThanOrEqual(broad[0].score - 0.001)
  })

  it('filters by grade', () => {
    const all = searchContent('circle', { limit: 100 })
    const grade7 = searchContent('circle', { filters: { grade: '7', subject: 'all' }, limit: 100 })
    expect(grade7.length).toBeLessThanOrEqual(all.length)
    expect(grade7.every((hit) => hit.kind === 'shape' || hit.gradeId === '7')).toBe(true)
  })

  it('returns nothing for an empty query', () => {
    expect(searchContent('')).toEqual([])
    expect(searchContent('   ')).toEqual([])
  })

  it('searches successfully in Khmer language', () => {
    const pythag = searchContent('ពីតាករ', { language: 'km' })
    expect(pythag.length).toBeGreaterThan(0)
    expect(pythag.some((h) => h.title.includes('ពីតាករ'))).toBe(true)

    const pythagThm = searchContent('ទ្រឹស្តីបទពីតាករ', { language: 'km' })
    expect(pythagThm.length).toBeGreaterThan(0)
    expect(pythagThm[0].title).toBe('ទ្រឹស្តីបទពីតាករ')

    const pythagFormula = searchContent('រូបមន្តពីតាករ', { language: 'km' })
    expect(pythagFormula.length).toBeGreaterThan(0)

    const quad = searchContent('សមីការដឺក្រេទីពីរ', { language: 'km' })
    expect(quad.length).toBeGreaterThan(0)
    expect(quad.some((h) => h.title.includes('សមីការដឺក្រេទីពីរ'))).toBe(true)

    const deriv = searchContent('ដេរីវេ', { language: 'km' })
    expect(deriv.length).toBeGreaterThan(0)
    expect(deriv.some((h) => h.title.includes('ដេរីវេ'))).toBe(true)

    const integ = searchContent('អាំងតេក្រាល', { language: 'km' })
    expect(integ.length).toBeGreaterThan(0)
    expect(integ.some((h) => h.title.includes('អាំងតេក្រាល'))).toBe(true)

    const circleArea = searchContent('ផ្ទៃក្រឡារង្វង់', { language: 'km' })
    expect(circleArea.length).toBeGreaterThan(0)

    const cyl = searchContent('ស៊ីឡាំង', { language: 'km' })
    expect(cyl.length).toBeGreaterThan(0)
    expect(cyl.some((h) => h.kind === 'shape')).toBe(true)

    const dist = searchContent('ចម្ងាយ', { language: 'km' })
    expect(dist.length).toBeGreaterThan(0)

    const grade10Khmer = searchContent('ថ្នាក់ទី១០', { language: 'km' })
    expect(grade10Khmer.length).toBeGreaterThan(0)
    expect(grade10Khmer.every((h) => h.kind === 'shape' || h.gradeId === '10')).toBe(true)
  }, 15_000)
})

describe('highlightParts', () => {
  it('marks matching text without producing HTML', () => {
    const parts = highlightParts('Area of a Circle', 'circle')
    expect(parts.some((part) => part.match && part.text.toLowerCase() === 'circle')).toBe(true)
  })

  it('returns the whole string when nothing matches', () => {
    const parts = highlightParts('Area', 'zzz')
    expect(parts).toEqual([{ text: 'Area', match: false }])
  })
})

describe('shape metrics', () => {
  it('produces finite, non-negative values at default dimensions', () => {
    for (const shape of shapes) {
      const dims = Object.fromEntries(shape.dimensions.map((d) => [d.key, d.defaultValue]))
      for (const metric of shape.metrics) {
        const value = metric.compute(dims)
        expect(Number.isFinite(value), `${shape.id}/${metric.key} default`).toBe(true)
        expect(value, `${shape.id}/${metric.key} default`).toBeGreaterThanOrEqual(0)
      }
    }
  })

  it('stays finite across the whole slider range (minimum and maximum)', () => {
    for (const shape of shapes) {
      for (const bound of ['min', 'max'] as const) {
        const dims = Object.fromEntries(
          shape.dimensions.map((d) => [d.key, d[bound] === 0 ? d.min || 1 : d[bound]]),
        )
        for (const metric of shape.metrics) {
          const value = metric.compute(dims)
          expect(Number.isFinite(value), `${shape.id}/${metric.key} at ${bound} (${JSON.stringify(dims)})`).toBe(true)
          expect(value, `${shape.id}/${metric.key} at ${bound}`).toBeGreaterThanOrEqual(0)
        }
      }
    }
  })

  it('computes known values correctly', () => {
    const circle = shapes.find((s) => s.id === 'circle')!
    const area = circle.metrics.find((m) => m.key === 'area')!
    expect(area.compute({ radius: 3 })).toBeCloseTo(9 * Math.PI, 10)

    const cylinder = shapes.find((s) => s.id === 'cylinder')!
    const volume = cylinder.metrics.find((m) => m.key === 'volume')!
    expect(volume.compute({ radius: 2, height: 5 })).toBeCloseTo(20 * Math.PI, 10)

    const sphere = shapes.find((s) => s.id === 'sphere')!
    const surface = sphere.metrics.find((m) => m.key === 'surface-area')!
    expect(surface.compute({ radius: 3 })).toBeCloseTo(36 * Math.PI, 10)
  })

  it('gives an exact form for whole multiples of pi', () => {
    const circle = shapes.find((s) => s.id === 'circle')!
    const area = circle.metrics.find((m) => m.key === 'area')!
    expect(area.exact?.({ radius: 5 })).toBe('25π')
  })
})