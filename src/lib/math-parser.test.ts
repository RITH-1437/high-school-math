import { describe, expect, it } from 'vitest'
import {
  analyzeFunction,
  cleanEquationInput,
  exprToLatex,
  insertImplicitMultiplication,
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
