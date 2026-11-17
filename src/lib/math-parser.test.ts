import { describe, expect, it } from 'vitest'
import {
  analyzeEquation,
  analyzeFunction,
  cleanEquationInput,
  detectConic,
  exprToLatex,
  insertImplicitMultiplication,
  parseEquation,
  parseMathExpression,
} from './math-parser'

describe('cleanEquationInput', () => {
  it('removes a leading y = and function notation', () => {
    expect(cleanEquationInput('y = 2x + 1')).toBe('2x + 1')
    expect(cleanEquationInput('f(x) = x^2')).toBe('x^2')
    expect(cleanEquationInput('  g(x): 3x  ')).toBe('3x')
  })

  it('normalizes unicode operators, powers, pi and absolute value', () => {
    expect(cleanEquationInput('y = −x² + 3')).toBe('-x^2 + 3')
    expect(cleanEquationInput('y = 2 × x ÷ 4')).toBe('2 * x / 4')
    expect(cleanEquationInput('y = πx')).toBe('pix')
    expect(cleanEquationInput('y = |x − 2| − 1')).toBe('abs(x - 2) - 1')
  })
})

describe('insertImplicitMultiplication', () => {
  it('inserts products for numbers, variables and brackets', () => {
    expect(insertImplicitMultiplication('2x')).toBe('2*x')
    expect(insertImplicitMultiplication('3(x + 1)')).toBe('3*(x + 1)')
    expect(insertImplicitMultiplication('(x + 1)(x - 1)')).toBe('(x + 1)*(x - 1)')
    expect(insertImplicitMultiplication('xsin(x)')).toBe('x*sin(x)')
  })

  it('leaves scientific notation untouched', () => {
    expect(insertImplicitMultiplication('2e3')).toBe('2e3')
  })
})

describe('parseMathExpression', () => {
  it('evaluates linear, quadratic and rational expressions', () => {
    expect(parseMathExpression('y = 2x + 1')(3)).toBe(7)
    expect(parseMathExpression('y = x^2 - 4')(-2)).toBe(0)
    expect(parseMathExpression('y = 1 / x')(4)).toBe(0.25)
    expect(parseMathExpression('y = 1 / x')(0)).toBeNaN()
  })

  it('evaluates roots, absolute values, trigonometry and pi', () => {
    expect(parseMathExpression('y = sqrt(x + 4)')(5)).toBe(3)
    expect(parseMathExpression('y = |x - 2| - 1')(5)).toBe(2)
    expect(parseMathExpression('y = sin(x)')(Math.PI / 2)).toBeCloseTo(1, 12)
    expect(parseMathExpression('y = 2cos(x)')(0)).toBe(2)
    expect(parseMathExpression('y = pi')(0)).toBe(Math.PI)
  })

  it('applies unary signs correctly around powers', () => {
    expect(parseMathExpression('y = -x^2')(2)).toBe(-4)
    expect(parseMathExpression('y = (-x)^2')(2)).toBe(4)
    expect(parseMathExpression('y = -2^2')(0)).toBe(-4)
    expect(parseMathExpression('y = -2x')(3)).toBe(-6)
  })

  it('rejects empty, malformed and unknown input with helpful errors', () => {
    expect(() => parseMathExpression('   ')).toThrow(/enter a mathematical expression/i)
    expect(() => parseMathExpression('y = x^')).toThrow()
    expect(() => parseMathExpression('y = (x + 1')).toThrow(/missing closing parenthesis/i)
    expect(() => parseMathExpression('y = mystery(x)')).toThrow(/unknown variable or function/i)
    expect(() => parseMathExpression('y = x @ 2')).toThrow(/unexpected character/i)
  })
})

describe('exprToLatex', () => {
  it('formats common operations for KaTeX', () => {
    expect(exprToLatex('y = x^2 - 4')).toBe('y = x^{2} - 4')
    expect(exprToLatex('y = 2x + 3')).toBe('y = 2x + 3')
    expect(exprToLatex('y = sqrt(x)')).toBe('y = \\sqrt{x}')
    expect(exprToLatex('y = 2*sin(x)')).toBe('y = 2 \\cdot \\sin(x)')
    expect(exprToLatex('y = |x|')).toBe('y = |x|')
  })
})

describe('analyzeFunction', () => {
  it('finds the slope, intercepts and steps of a line', () => {
    const analysis = analyzeFunction(parseMathExpression('y = 2x + 1'), 'y = 2x + 1', [-10, 10])
    expect(analysis.isLinear).toBe(true)
    expect(analysis.isQuadratic).toBe(false)
    expect(analysis.slope).toBe(2)
    expect(analysis.yIntercept).toBe(1)
    expect(analysis.xIntercepts).toEqual([-0.5])
    expect(analysis.vertex).toBeNull()
    expect(analysis.stepsEn.length).toBeGreaterThanOrEqual(3)
    expect(analysis.stepsKm.length).toBe(analysis.stepsEn.length)
  })

  it('finds the vertex and two roots of a parabola', () => {
    const analysis = analyzeFunction(parseMathExpression('y = x^2 - 4'), 'y = x^2 - 4', [-10, 10])
    expect(analysis.isLinear).toBe(false)
    expect(analysis.isQuadratic).toBe(true)
    expect(analysis.vertex).toMatchObject({ y: -4 })
    expect(Math.abs(analysis.vertex?.x ?? NaN)).toBeLessThan(1e-9)
    expect(analysis.extrema).toHaveLength(1)
    expect(analysis.extrema[0]?.kind).toBe('min')
    expect(analysis.extrema[0]?.y).toBe(-4)
    expect(Math.abs(analysis.extrema[0]?.x ?? NaN)).toBeLessThan(1e-9)
    expect(analysis.xIntercepts).toEqual([-2, 2])
    expect(analysis.yIntercept).toBe(-4)
  })

  it('detects an inverted parabola and its maximum', () => {
    const analysis = analyzeFunction(parseMathExpression('y = -x^2 + 2x + 3'), 'y = -x^2 + 2x + 3', [-10, 10])
    expect(analysis.isQuadratic).toBe(true)
    expect(analysis.vertex).toEqual({ x: 1, y: 4 })
    expect(analysis.extrema[0]?.kind).toBe('max')
    expect(analysis.xIntercepts).toEqual([-1, 3])
  })
  it('builds an eleven-row table and flags its intercepts', () => {
    const analysis = analyzeFunction(parseMathExpression('y = 2x + 1'), 'y = 2x + 1', [-10, 10])
    expect(analysis.table).toHaveLength(11)
    const row0 = analysis.table.find((row) => row.x === 0)
    expect(row0).toMatchObject({ y: 1, label: 'y-intercept' })
    expect(analysis.table.map((row) => row.x)).toEqual([-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5])
  })

  it('finds a real root of a non-polynomial function by bisection', () => {
    const analysis = analyzeFunction(parseMathExpression('y = x^3 - 3x'), 'y = x^3 - 3x', [-5, 5])
    expect(analysis.isLinear).toBe(false)
    expect(analysis.isQuadratic).toBe(false)
    expect(analysis.xIntercepts.some((root) => Math.abs(root - Math.sqrt(3)) < 0.01)).toBe(true)
    expect(analysis.xIntercepts.some((root) => Math.abs(root) < 0.01)).toBe(true)
  })

  it('treats undefined points as null in the table', () => {
    const analysis = analyzeFunction(parseMathExpression('y = 1 / x'), 'y = 1 / x', [-10, 10])
    expect(analysis.table.find((row) => row.x === 0)?.y).toBeNull()
    expect(analysis.yIntercept).toBeNull()
  })
})

describe('parseEquation and conic sections', () => {
  it('parses implicit ellipse (y^2)/25 + x^2 = 25 accurately', () => {
    const parsed = parseEquation('(y^2)/25 + x^2 = 25')
    expect(parsed.type).toBe('implicit')
    expect(parsed.fn2D(0, 25)).toBeCloseTo(0, 5)
    expect(parsed.fn2D(0, -25)).toBeCloseTo(0, 5)
    expect(parsed.fn2D(5, 0)).toBeCloseTo(0, 5)
    expect(parsed.fn2D(-5, 0)).toBeCloseTo(0, 5)

    const conic = detectConic(parsed.fn2D)
    expect(conic).not.toBeNull()
    expect(conic?.type).toBe('ellipse')
    expect(conic?.orientation).toBe('vertical')
    expect(conic?.a).toBe(25)
    expect(conic?.b).toBe(5)
    expect(conic?.vertices).toEqual([
      { x: 0, y: -25 },
      { x: 0, y: 25 },
    ])
    expect(conic?.suggestedRange).toBe(30)
  })

  it('detects and analyzes horizontal parabola y^2 = 4x', () => {
    const parsed = parseEquation('y^2 = 4x')
    expect(parsed.type).toBe('implicit')
    expect(parsed.fn2D(1, 2)).toBeCloseTo(0, 5)
    expect(parsed.fn2D(1, -2)).toBeCloseTo(0, 5)

    const conic = detectConic(parsed.fn2D)
    expect(conic).not.toBeNull()
    expect(conic?.type).toBe('parabola')
    expect(conic?.orientation).toBe('horizontal')
    expect(conic?.vertex).toEqual({ x: 0, y: 0 })
    expect(conic?.p).toBe(1)
    expect(conic?.focus).toEqual({ x: 1, y: 0 })
    expect(conic?.directrix).toEqual({ axis: 'x', val: -1 })
    expect(conic?.axisOfSymmetry).toEqual({ axis: 'y', val: 0 })
  })

  it('detects horizontal parabola x = y^2 - 4', () => {
    const parsed = parseEquation('x = y^2 - 4')
    expect(parsed.type).toBe('explicit_x')
    expect(parsed.fnX!(0)).toBe(-4)
    expect(parsed.fnX!(2)).toBe(0)

    const conic = detectConic(parsed.fn2D)
    expect(conic?.type).toBe('parabola')
    expect(conic?.orientation).toBe('horizontal')
    expect(conic?.vertex).toEqual({ x: -4, y: 0 })
    expect(conic?.p).toBe(0.25)
  })

  it('detects horizontal hyperbola x^2 - y^2 = 4', () => {
    const parsed = parseEquation('x^2 - y^2 = 4')
    const conic = detectConic(parsed.fn2D)
    expect(conic?.type).toBe('hyperbola')
    expect(conic?.orientation).toBe('horizontal')
    expect(conic?.a).toBe(2)
    expect(conic?.b).toBe(2)
    expect(conic?.vertices).toEqual([
      { x: -2, y: 0 },
      { x: 2, y: 0 },
    ])
    expect(conic?.asymptotes).toHaveLength(2)
  })

  it('detects vertical hyperbola (y^2)/25 - x^2 = 1', () => {
    const parsed = parseEquation('(y^2)/25 - x^2 = 1')
    const conic = detectConic(parsed.fn2D)
    expect(conic?.type).toBe('hyperbola')
    expect(conic?.orientation).toBe('vertical')
    expect(conic?.a).toBe(5)
    expect(conic?.b).toBe(1)
    expect(conic?.vertices).toEqual([
      { x: 0, y: -5 },
      { x: 0, y: 5 },
    ])
  })

  it('detects circle x^2 + y^2 = 25', () => {
    const parsed = parseEquation('x^2 + y^2 = 25')
    const conic = detectConic(parsed.fn2D)
    expect(conic?.type).toBe('circle')
    expect(conic?.center).toEqual({ x: 0, y: 0 })
    expect(conic?.radius).toBe(5)
  })

  it('provides authentic Khmer MoEYS steps in analyzeEquation', () => {
    const parsed = parseEquation('(y^2)/25 + x^2 = 25')
    const analysis = analyzeEquation(parsed, '(y^2)/25 + x^2 = 25', [-30, 30])
    expect(analysis.isConic).toBe(true)
    expect(analysis.conic?.nameKm).toContain('អេលីប')
    expect(analysis.stepsKm.length).toBeGreaterThanOrEqual(4)
    expect(analysis.stepsKm[0]).toContain('ទម្រង់ស្តង់ដាអេលីប')
    expect(analysis.stepsKm[2]).toContain('ចម្ងាយពីផ្ចិតទៅកំណុំ')
  })

  describe('Parabola verification (Section 2 & 11)', () => {
    it('detects standard vertical parabola y = x^2', () => {
      const parsed = parseEquation('y = x^2')
      const conic = detectConic(parsed.fn2D)
      expect(conic).not.toBeNull()
      expect(conic?.type).toBe('parabola')
      expect(conic?.orientation).toBe('vertical')
      expect(conic?.openingDirection).toBe('upward')
      expect(conic?.vertex).toEqual({ x: 0, y: 0 })
      expect(conic?.focus).toEqual({ x: 0, y: 0.25 })
      expect(conic?.directrix).toEqual({ axis: 'y', val: -0.25 })
      expect(conic?.axisOfSymmetry).toEqual({ axis: 'x', val: 0 })
      expect(conic?.p).toBe(0.25)
      expect(conic?.latusRectum).toBe(1)
      expect(conic?.range).toBe('[0, +∞)')
    })

    it('detects vertical parabola y = 2x^2 - 4', () => {
      const parsed = parseEquation('y = 2x^2 - 4')
      const conic = detectConic(parsed.fn2D)
      expect(conic?.type).toBe('parabola')
      expect(conic?.orientation).toBe('vertical')
      expect(conic?.vertex).toEqual({ x: 0, y: -4 })
      expect(conic?.p).toBe(0.13)
      expect(conic?.openingDirection).toBe('upward')
      expect(conic?.axisOfSymmetry).toEqual({ axis: 'x', val: 0 })
    })

    it('detects translated vertex form y = (x - 2)^2 + 3', () => {
      const parsed = parseEquation('y = (x - 2)^2 + 3')
      const conic = detectConic(parsed.fn2D)
      expect(conic).not.toBeNull()
      expect(conic?.vertex).toEqual({ x: 2, y: 3 })
      expect(conic?.openingDirection).toBe('upward')
      expect(conic?.axisOfSymmetry).toEqual({ axis: 'x', val: 2 })
      expect(conic?.focus).toEqual({ x: 2, y: 3.25 })
      expect(conic?.directrix).toEqual({ axis: 'y', val: 2.75 })
      expect(conic?.p).toBe(0.25)
      expect(conic?.latusRectum).toBe(1)
      expect(conic?.range).toBe('[3, +∞)')
    })

    it('detects horizontal parabola x = (y - 1)^2', () => {
      const parsed = parseEquation('x = (y - 1)^2')
      const conic = detectConic(parsed.fn2D)
      expect(conic?.type).toBe('parabola')
      expect(conic?.orientation).toBe('horizontal')
      expect(conic?.vertex).toEqual({ x: 0, y: 1 })
      expect(conic?.focus).toEqual({ x: 0.25, y: 1 })
      expect(conic?.directrix).toEqual({ axis: 'x', val: -0.25 })
      expect(conic?.axisOfSymmetry).toEqual({ axis: 'y', val: 1 })
      expect(conic?.openingDirection).toBe('right')
      expect(conic?.domain).toBe('[0, +∞)')
    })

    it('detects focus-directrix vertical parabola x^2 = 8y', () => {
      const parsed = parseEquation('x^2 = 8y')
      const conic = detectConic(parsed.fn2D)
      expect(conic?.type).toBe('parabola')
      expect(conic?.orientation).toBe('vertical')
      expect(conic?.vertex).toEqual({ x: 0, y: 0 })
      expect(conic?.p).toBe(2)
      expect(conic?.focus).toEqual({ x: 0, y: 2 })
      expect(conic?.directrix).toEqual({ axis: 'y', val: -2 })
      expect(conic?.axisOfSymmetry).toEqual({ axis: 'x', val: 0 })
      expect(conic?.latusRectum).toBe(8)
      expect(conic?.openingDirection).toBe('upward')
    })
  })

  describe('Ellipse verification (Section 3 & 11)', () => {
    it('detects standard horizontal ellipse x^2/9 + y^2/4 = 1', () => {
      const parsed = parseEquation('x^2/9 + y^2/4 = 1')
      const conic = detectConic(parsed.fn2D)
      expect(conic).not.toBeNull()
      expect(conic?.type).toBe('ellipse')
      expect(conic?.orientation).toBe('horizontal')
      expect(conic?.center).toEqual({ x: 0, y: 0 })
      expect(conic?.a).toBe(3)
      expect(conic?.b).toBe(2)
      expect(conic?.majorAxis?.length).toBe(6)
      expect(conic?.minorAxis?.length).toBe(4)
      expect(conic?.vertices).toEqual([
        { x: -3, y: 0 },
        { x: 3, y: 0 },
      ])
      expect(conic?.coVertices).toEqual([
        { x: 0, y: -2 },
        { x: 0, y: 2 },
      ])
      expect(conic?.c).toBeCloseTo(Math.sqrt(5), 2)
      expect(conic?.e).toBeCloseTo(Math.sqrt(5) / 3, 2)
    })

    it('detects horizontal ellipse x^2/16 + y^2/9 = 1', () => {
      const parsed = parseEquation('x^2/16 + y^2/9 = 1')
      const conic = detectConic(parsed.fn2D)
      expect(conic?.type).toBe('ellipse')
      expect(conic?.a).toBe(4)
      expect(conic?.b).toBe(3)
      expect(conic?.majorAxis?.length).toBe(8)
      expect(conic?.minorAxis?.length).toBe(6)
      expect(conic?.c).toBeCloseTo(Math.sqrt(7), 2)
    })

    it('detects translated horizontal ellipse (x-2)^2/25 + (y+1)^2/9 = 1', () => {
      const parsed = parseEquation('(x-2)^2/25 + (y+1)^2/9 = 1')
      const conic = detectConic(parsed.fn2D)
      expect(conic?.type).toBe('ellipse')
      expect(conic?.orientation).toBe('horizontal')
      expect(conic?.center).toEqual({ x: 2, y: -1 })
      expect(conic?.a).toBe(5)
      expect(conic?.b).toBe(3)
      expect(conic?.c).toBe(4)
      expect(conic?.e).toBe(0.8)
      expect(conic?.vertices).toEqual([
        { x: -3, y: -1 },
        { x: 7, y: -1 },
      ])
      expect(conic?.coVertices).toEqual([
        { x: 2, y: -4 },
        { x: 2, y: 2 },
      ])
      expect(conic?.foci).toEqual([
        { x: -2, y: -1 },
        { x: 6, y: -1 },
      ])
      expect(conic?.majorAxis?.line).toBe('y = -1')
      expect(conic?.minorAxis?.line).toBe('x = 2')
    })

    it('detects translated vertical ellipse (x-1)^2/4 + (y-2)^2/16 = 1', () => {
      const parsed = parseEquation('(x-1)^2/4 + (y-2)^2/16 = 1')
      const conic = detectConic(parsed.fn2D)
      expect(conic?.type).toBe('ellipse')
      expect(conic?.orientation).toBe('vertical')
      expect(conic?.center).toEqual({ x: 1, y: 2 })
      expect(conic?.a).toBe(4)
      expect(conic?.b).toBe(2)
      expect(conic?.c).toBeCloseTo(Math.sqrt(12), 2)
      expect(conic?.vertices).toEqual([
        { x: 1, y: -2 },
        { x: 1, y: 6 },
      ])
      expect(conic?.coVertices).toEqual([
        { x: -1, y: 2 },
        { x: 3, y: 2 },
      ])
      expect(conic?.majorAxis?.line).toBe('x = 1')
      expect(conic?.minorAxis?.line).toBe('y = 2')
    })

    it('detects circle x^2 + y^2 = 4 and x^2 + y^2 = 25', () => {
      const c1 = detectConic(parseEquation('x^2 + y^2 = 4').fn2D)
      expect(c1?.type).toBe('circle')
      expect(c1?.radius).toBe(2)

      const c2 = detectConic(parseEquation('x^2 + y^2 = 25').fn2D)
      expect(c2?.type).toBe('circle')
      expect(c2?.radius).toBe(5)
    })
  })

  describe('Degenerate and non-conics', () => {
    it('returns null for empty or non-quadratic curves', () => {
      expect(detectConic(parseEquation('x^2 + y^2 = -5').fn2D)).toBeNull()
      expect(detectConic(parseEquation('y = x^3').fn2D)).toBeNull()
      expect(detectConic(parseEquation('y = sin(x)').fn2D)).toBeNull()
    })
  })
})
