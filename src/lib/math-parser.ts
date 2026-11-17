/**
 * Safe, dependency-free mathematical expression parser and function/conic analyzer
 * for high school algebra, geometry, conics, trigonometry, and calculus.
 * Strictly adheres to Cambodian MoEYS high school curriculum terminology.
 */

export interface ConicAnalysis {
  type: 'parabola' | 'ellipse' | 'circle' | 'hyperbola' | 'line'
  orientation?: 'horizontal' | 'vertical'
  openingDirection?: 'upward' | 'downward' | 'right' | 'left'
  openingDirectionKm?: string
  center?: { x: number; y: number }
  vertex?: { x: number; y: number }
  vertices?: { x: number; y: number }[]
  coVertices?: { x: number; y: number }[]
  focus?: { x: number; y: number }
  foci?: { x: number; y: number }[]
  directrix?: { axis: 'x' | 'y'; val: number }
  directrices?: { axis: 'x' | 'y'; val: number }[]
  axisOfSymmetry?: { axis: 'x' | 'y'; val: number }
  majorAxis?: { line: string; length: number; axis: 'x' | 'y'; val: number }
  minorAxis?: { line: string; length: number; axis: 'x' | 'y'; val: number }
  asymptotes?: { slope: number; m: number; b: number; label: string; fn: (x: number) => number }[]
  a?: number
  b?: number
  c?: number
  e?: number
  p?: number
  latusRectum?: number
  domain?: string
  range?: string
  domainKm?: string
  rangeKm?: string
  radius?: number
  standardLatex: string
  nameEn: string
  nameKm: string
  suggestedRange: number
}

export interface ParsedEquation {
  raw: string
  type: 'explicit_y' | 'explicit_x' | 'implicit'
  fn1D?: (x: number) => number
  fnX?: (y: number) => number
  fn2D: (x: number, y: number) => number
  lhs: string
  rhs: string
  cleanExpr: string
}

export interface FunctionAnalysis {
  isValid: boolean
  error?: string
  cleanExpr: string
  latexExpr: string
  isLinear: boolean
  isQuadratic: boolean
  isConic?: boolean
  conic?: ConicAnalysis | null
  slope: number | null
  yIntercept: number | null
  xIntercepts: number[]
  yIntercepts?: number[]
  vertex: { x: number; y: number } | null
  extrema: { x: number; y: number; kind: 'min' | 'max' }[]
  table: { x: number; y: number | null; label?: string }[]
  stepsEn: string[]
  stepsKm: string[]
  parsedEq?: ParsedEquation
  suggestedRange?: number
}

type ASTNode =
  | { type: 'num'; val: number }
  | { type: 'varX' }
  | { type: 'varY' }
  | { type: 'unary'; op: '-' | '+'; arg: ASTNode }
  | { type: 'bin'; op: '+' | '-' | '*' | '/' | '^' | '%'; left: ASTNode; right: ASTNode }
  | { type: 'call'; fn: string; arg: ASTNode }

export function cleanEquationInput(raw: string): string {
  let s = raw.trim()
  // Remove leading y = or f(x) =
  s = s.replace(/^(?:y|f\s*\(\s*x\s*\)|g\s*\(\s*x\s*\)|h\s*\(\s*x\s*\))\s*[:=]\s*/i, '')
  // Normalize unicode symbols
  s = s.replace(/−/g, '-')
  s = s.replace(/[×·]/g, '*')
  s = s.replace(/÷/g, '/')
  s = s.replace(/²/g, '^2')
  s = s.replace(/³/g, '^3')
  s = s.replace(/π/gi, 'pi')
  // Convert absolute value |expr| to abs(expr)
  s = s.replace(/\|([^|]+)\|/g, 'abs($1)')
  return s
}

export function insertImplicitMultiplication(s: string): string {
  let res = s
  // 12x or 12.5x or 12y or 12(
  res = res.replace(/(\d+(?:\.\d+)?)\s*([a-zA-Z(])/g, (match, p1, p2) => {
    if ((p2 === 'e' || p2 === 'E') && /\d/.test(match)) {
      return match
    }
    return `${p1}*${p2}`
  })
  // ) followed by ( or variable/number/function
  res = res.replace(/\)\s*([a-zA-Z0-9(])/g, ')*$1')
  // x or y followed by function, variable, or (
  res = res.replace(/\b([xy])\s*(\(|[a-zA-Z_]\w*)/g, (match, p1, p2) => {
    if (p2 === 'pi') return `${p1}*${p2}`
    if (['sin', 'cos', 'tan', 'sqrt', 'cbrt', 'abs', 'ln', 'log', 'exp', 'asin', 'acos', 'atan'].includes(p2)) return `${p1}*${p2}`
    if (p2 === 'x' || p2 === 'y') return `${p1}*${p2}`
    if (p2.startsWith('(')) return `${p1}*${p2}`
    return match
  })
  return res
}

/** Parses a single side mathematical expression containing x, y, constants and functions */
export function parseSingleExpr(input: string): (x: number, y: number) => number {
  const prepared = insertImplicitMultiplication(cleanEquationInput(input))
  if (!prepared.trim()) {
    throw new Error('Please enter a mathematical expression.')
  }

  type Token =
    | { type: 'num'; value: number }
    | { type: 'ident'; value: string }
    | { type: 'op'; value: string }
    | { type: 'lparen' }
    | { type: 'rparen' }

  const tokens: Token[] = []
  let i = 0
  while (i < prepared.length) {
    const ch = prepared[i]
    if (/\s/.test(ch)) {
      i++
      continue
    }
    if (/\d|\./.test(ch)) {
      let numStr = ''
      while (i < prepared.length && /[\d.]/.test(prepared[i])) {
        numStr += prepared[i]
        i++
      }
      const val = parseFloat(numStr)
      if (Number.isNaN(val)) throw new Error(`Invalid number "${numStr}"`)
      tokens.push({ type: 'num', value: val })
      continue
    }
    if (/[a-zA-Z_]/.test(ch)) {
      let idStr = ''
      while (i < prepared.length && /[a-zA-Z0-9_]/.test(prepared[i])) {
        idStr += prepared[i]
        i++
      }
      tokens.push({ type: 'ident', value: idStr.toLowerCase() })
      continue
    }
    if (ch === '(') {
      tokens.push({ type: 'lparen' })
      i++
      continue
    }
    if (ch === ')') {
      tokens.push({ type: 'rparen' })
      i++
      continue
    }
    if (['+', '-', '*', '/', '^', '%'].includes(ch)) {
      tokens.push({ type: 'op', value: ch })
      i++
      continue
    }
    throw new Error(`Unexpected character: "${ch}"`)
  }

  let pos = 0
  function peek(): Token | undefined {
    return tokens[pos]
  }
  function consume(): Token {
    return tokens[pos++]
  }

  function parseExpression(precedence = 0): ASTNode {
    const token = consume()
    if (!token) throw new Error('Unexpected end of expression')

    let left: ASTNode

    if (token.type === 'num') {
      left = { type: 'num', val: token.value }
    } else if (token.type === 'ident') {
      const name = token.value
      if (name === 'x') {
        left = { type: 'varX' }
      } else if (name === 'y') {
        left = { type: 'varY' }
      } else if (name === 'pi') {
        left = { type: 'num', val: Math.PI }
      } else if (name === 'e') {
        left = { type: 'num', val: Math.E }
      } else if (['sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'sqrt', 'cbrt', 'abs', 'ln', 'log', 'exp'].includes(name)) {
        if (peek()?.type !== 'lparen') {
          throw new Error(`Expected "(" after function ${name}`)
        }
        consume() // (
        const arg = parseExpression(0)
        const close = consume()
        if (!close || close.type !== 'rparen') {
          throw new Error(`Missing ")" after ${name}(...`)
        }
        left = { type: 'call', fn: name, arg }
      } else {
        throw new Error(`Unknown variable or function: "${name}"`)
      }
    } else if (token.type === 'op' && (token.value === '-' || token.value === '+')) {
      const op = token.value as '-' | '+'
      const arg = parseExpression(2.5)
      left = { type: 'unary', op, arg }
    } else if (token.type === 'lparen') {
      left = parseExpression(0)
      const close = consume()
      if (!close || close.type !== 'rparen') {
        throw new Error('Missing closing parenthesis ")"')
      }
    } else {
      throw new Error(`Unexpected token`)
    }

    const OP_PRECEDENCE: Record<string, number> = {
      '+': 1,
      '-': 1,
      '*': 2,
      '/': 2,
      '%': 2,
      '^': 3,
    }

    while (pos < tokens.length) {
      const nextToken = peek()
      if (!nextToken || nextToken.type !== 'op') break

      const prec = OP_PRECEDENCE[nextToken.value] ?? 0
      if (prec <= precedence) break

      consume()
      const rightPrec = nextToken.value === '^' ? prec - 0.1 : prec
      const right = parseExpression(rightPrec)
      left = {
        type: 'bin',
        op: nextToken.value as '+' | '-' | '*' | '/' | '^' | '%',
        left,
        right,
      }
    }

    return left
  }

  const ast = parseExpression(0)
  if (pos < tokens.length) {
    throw new Error(`Extra unexpected input after valid formula`)
  }

  return function evaluate(x: number, y: number): number {
    function evalNode(node: ASTNode): number {
      switch (node.type) {
        case 'num':
          return node.val
        case 'varX':
          return x
        case 'varY':
          return y
        case 'unary': {
          const val = evalNode(node.arg)
          return node.op === '-' ? -val : val
        }
        case 'bin': {
          const l = evalNode(node.left)
          const r = evalNode(node.right)
          switch (node.op) {
            case '+':
              return l + r
            case '-':
              return l - r
            case '*':
              return l * r
            case '/':
              return Math.abs(r) < 1e-12 ? NaN : l / r
            case '^':
              if (l < 0 && Math.floor(r) !== r) return NaN
              return Math.pow(l, r)
            default:
              return NaN
          }
        }
        case 'call': {
          const v = evalNode(node.arg)
          switch (node.fn) {
            case 'sin':
              return Math.sin(v)
            case 'cos':
              return Math.cos(v)
            case 'tan': {
              const cosVal = Math.cos(v)
              if (Math.abs(cosVal) < 1e-12) return NaN
              return Math.tan(v)
            }
            case 'asin':
              return v < -1 || v > 1 ? NaN : Math.asin(v)
            case 'acos':
              return v < -1 || v > 1 ? NaN : Math.acos(v)
            case 'atan':
              return Math.atan(v)
            case 'sqrt':
              return v < 0 ? NaN : Math.sqrt(v)
            case 'cbrt':
              return Math.cbrt(v)
            case 'abs':
              return Math.abs(v)
            case 'ln':
              return v <= 0 ? NaN : Math.log(v)
            case 'log':
              return v <= 0 ? NaN : Math.log10(v)
            case 'exp':
              return Math.exp(v)
            default:
              return NaN
          }
        }
      }
    }
    return evalNode(ast)
  }
}

/** Parses an equation or expression into explicit (y=f(x), x=g(y)) or implicit F(x, y)=0 forms. */
export function parseEquation(raw: string): ParsedEquation {
  let s = raw.trim()
  s = s.replace(/^(?:f\s*\(\s*x\s*\)|g\s*\(\s*x\s*\)|h\s*\(\s*x\s*\))\s*[:=]\s*/i, 'y = ')
  s = s.replace(/−/g, '-')
  s = s.replace(/[×·]/g, '*')
  s = s.replace(/÷/g, '/')
  s = s.replace(/²/g, '^2')
  s = s.replace(/³/g, '^3')
  s = s.replace(/π/gi, 'pi')
  s = s.replace(/\|([^|]+)\|/g, 'abs($1)')

  if (!s.trim()) {
    throw new Error('Please enter a mathematical expression.')
  }

  const parts = s.split('=')
  if (parts.length > 2) {
    throw new Error('Equation can have at most one "=" sign.')
  }

  if (parts.length === 2) {
    const lhs = parts[0].trim()
    const rhs = parts[1].trim()
    if (!lhs || !rhs) {
      throw new Error('Please enter both left and right sides of the equation.')
    }

    const evalLhs = parseSingleExpr(lhs)
    const evalRhs = parseSingleExpr(rhs)
    const fn2D = (x: number, y: number) => evalLhs(x, y) - evalRhs(x, y)

    const isLhsY = lhs.toLowerCase() === 'y'
    const isLhsX = lhs.toLowerCase() === 'x'
    const rhsHasY = /\by\b/i.test(rhs)
    const rhsHasX = /\bx\b/i.test(rhs)

    if (isLhsY && !rhsHasY) {
      return {
        raw,
        type: 'explicit_y',
        fn1D: (x: number) => evalRhs(x, 0),
        fn2D,
        lhs,
        rhs,
        cleanExpr: cleanEquationInput(rhs),
      }
    }

    if (isLhsX && !rhsHasX) {
      return {
        raw,
        type: 'explicit_x',
        fnX: (y: number) => evalRhs(0, y),
        fn2D,
        lhs,
        rhs,
        cleanExpr: cleanEquationInput(rhs),
      }
    }

    return {
      raw,
      type: 'implicit',
      fn2D,
      lhs,
      rhs,
      cleanExpr: s,
    }
  }

  // No '=' present
  const evalExpr = parseSingleExpr(s)
  const hasY = /\by\b/i.test(s)

  if (hasY) {
    return {
      raw,
      type: 'implicit',
      fn2D: evalExpr,
      lhs: s,
      rhs: '0',
      cleanExpr: s,
    }
  }

  return {
    raw,
    type: 'explicit_y',
    fn1D: (x: number) => evalExpr(x, 0),
    fn2D: (x: number, y: number) => y - evalExpr(x, 0),
    lhs: 'y',
    rhs: s,
    cleanExpr: cleanEquationInput(s),
  }
}

/** Legacy & standard 1D function evaluator wrapper for backward compatibility */
export function parseMathExpression(input: string): (x: number) => number {
  const parsed = parseEquation(input)
  if (parsed.fn1D) {
    return parsed.fn1D
  }
  return (x: number) => {
    // If it's x = g(y), or implicit F(x, y) = 0, find root for y given x
    const F = (y: number) => parsed.fn2D(x, y)
    // quick bisection / search near 0
    let bestY = 0
    let bestVal = Math.abs(F(0))
    for (let tryY = -20; tryY <= 20; tryY += 0.5) {
      const v = Math.abs(F(tryY))
      if (v < bestVal) {
        bestVal = v
        bestY = tryY
      }
    }
    return bestVal < 0.1 ? bestY : NaN
  }
}

/** Formats mathematical string to KaTeX display notation */
export function exprToLatex(raw: string): string {
  let s = raw.trim()
  s = s.replace(/−/g, '-')
  s = s.replace(/[×·]/g, ' \\cdot ')
  s = s.replace(/²/g, '^{2}')
  s = s.replace(/³/g, '^{3}')
  s = s.replace(/π/gi, '\\pi')
  // fractions like ((x-2)^2)/25 or (x-2)^2/25 or x^2/9 or 1/x
  s = s.replace(/\(([^)]+)\)\^([0-9a-zA-Z.]+)\s*\/\s*([0-9a-zA-Z.]+)/g, '\\frac{($1)^{$2}}{$3}')
  s = s.replace(/\(([^)]+)\)\s*\/\s*([0-9a-zA-Z.]+)/g, '\\frac{$1}{$2}')
  s = s.replace(/([0-9a-zA-Z_]+)\^([0-9a-zA-Z.]+)\s*\/\s*([0-9a-zA-Z.]+)/g, '\\frac{$1^{$2}}{$3}')
  s = s.replace(/([0-9a-zA-Z_]+)\s*\/\s*([0-9a-zA-Z.]+)/g, '\\frac{$1}{$2}')
  s = s.replace(/\^([0-9a-zA-Z]+)/g, '^{$1}')
  s = s.replace(/\*/g, ' \\cdot ')
  s = s.replace(/\bsqrt\(([^)]+)\)/g, '\\sqrt{$1}')
  s = s.replace(/\bsin\(([^)]+)\)/g, '\\sin($1)')
  s = s.replace(/\bcos\(([^)]+)\)/g, '\\cos($1)')
  s = s.replace(/\btan\(([^)]+)\)/g, '\\tan($1)')
  s = s.replace(/\babs\(([^)]+)\)/g, '|$1|')

  if (!s.includes('=')) {
    return `y = ${cleanEquationInput(s)}`
  }
  return s
}

function cleanZero(n: number): number {
  const rounded = Math.round(n * 100) / 100
  return Object.is(rounded, -0) || Math.abs(rounded) < 1e-12 ? 0 : rounded
}

function formatLinearTerm(varName: string, offset: number): string {
  if (offset === 0) return varName
  if (offset > 0) return `(${varName} - ${offset})`
  return `(${varName} + ${Math.abs(offset)})`
}

function formatSquaredTerm(varName: string, offset: number): string {
  if (offset === 0) return `${varName}^{2}`
  if (offset > 0) return `(${varName} - ${offset})^{2}`
  return `(${varName} + ${Math.abs(offset)})^{2}`
}

/** Identifies conic section type and calculates exact geometric elements according to MoEYS curriculum. */
export function detectConic(F: (x: number, y: number) => number): ConicAnalysis | null {
  const f00 = F(0, 0)
  const f10 = F(1, 0)
  const fm10 = F(-1, 0)
  const f01 = F(0, 1)
  const f0m1 = F(0, -1)
  const f11 = F(1, 1)

  if (![f00, f10, fm10, f01, f0m1, f11].every(Number.isFinite)) return null

  const constTerm = f00
  const A = (f10 + fm10 - 2 * constTerm) / 2
  const D = (f10 - fm10) / 2
  const C = (f01 + f0m1 - 2 * constTerm) / 2
  const E = (f01 - f0m1) / 2
  const B = f11 - (A + C + D + E + constTerm)

  // Verify quadratic fit on test points
  const testPoints = [
    [2, 3],
    [-2, 4],
    [0.5, -0.5],
    [3, -2],
  ]
  for (const [tx, ty] of testPoints) {
    const actual = F(tx, ty)
    const expected = A * tx * tx + B * tx * ty + C * ty * ty + D * tx + E * ty + constTerm
    if (Math.abs(actual - expected) > 1e-4) {
      return null // Not a quadratic equation
    }
  }

  if (Math.abs(A) < 1e-9 && Math.abs(B) < 1e-9 && Math.abs(C) < 1e-9) {
    return {
      type: 'line',
      standardLatex: `${cleanZero(D)}x + ${cleanZero(E)}y + ${cleanZero(constTerm)} = 0`,
      nameEn: 'Linear equation (Line)',
      nameKm: 'សមីការបន្ទាត់',
      suggestedRange: 10,
    }
  }

  // Axis-aligned conics (MoEYS standard curriculum)
  if (Math.abs(B) < 1e-5) {
    // 1. Horizontal parabola: C y^2 + E y + D x + F = 0
    if (Math.abs(A) < 1e-5 && Math.abs(C) > 1e-5) {
      const k = -E / (2 * C)
      const D_eff = D
      if (Math.abs(D_eff) < 1e-5) return null
      const h = -(constTerm - (E * E) / (4 * C)) / D_eff
      const p = -D_eff / (4 * C)
      const roundedH = cleanZero(h)
      const roundedK = cleanZero(k)
      const roundedP = cleanZero(p)
      const latusRectum = cleanZero(Math.abs(4 * roundedP))
      const isRight = roundedP > 0
      const openingDirection = isRight ? 'right' : 'left'
      const openingDirectionKm = isRight ? 'បែរទៅស្តាំ' : 'បែរទៅឆ្វេង'
      const domain = isRight ? `[${roundedH}, +∞)` : `(-∞, ${roundedH}]`
      const range = '(-∞, +∞)'

      const ySq = formatSquaredTerm('y', roundedK)
      const xLin = formatLinearTerm('x', roundedH)
      const coeff = cleanZero(4 * roundedP)
      const standardLatex =
        roundedH === 0
          ? `${ySq} = ${coeff === 1 ? 'x' : coeff === -1 ? '-x' : `${coeff}x`}`
          : `${ySq} = ${coeff === 1 ? '' : coeff === -1 ? '-' : `${coeff}`}${xLin}`

      const rawRange = Math.max(Math.abs(roundedH), Math.abs(roundedH + roundedP), Math.abs(roundedK)) + 4
      const sRange = Math.max(10, Math.ceil(rawRange / 5) * 5)

      return {
        type: 'parabola',
        orientation: 'horizontal',
        openingDirection,
        openingDirectionKm,
        vertex: { x: roundedH, y: roundedK },
        focus: { x: cleanZero(roundedH + roundedP), y: roundedK },
        directrix: { axis: 'x', val: cleanZero(roundedH - roundedP) },
        axisOfSymmetry: { axis: 'y', val: roundedK },
        p: roundedP,
        latusRectum,
        domain,
        range,
        domainKm: domain,
        rangeKm: 'ℝ',
        standardLatex,
        nameEn: 'Horizontal Parabola',
        nameKm: 'ប៉ារ៉ាបូលដេក (អ័ក្សឆ្លុះស្របនឹងអ័ក្ស x)',
        suggestedRange: sRange,
      }
    }

    // 2. Vertical parabola: A x^2 + D x + E y + F = 0
    if (Math.abs(C) < 1e-5 && Math.abs(A) > 1e-5) {
      const h = -D / (2 * A)
      const E_eff = E
      if (Math.abs(E_eff) < 1e-5) return null
      const k = -(constTerm - (D * D) / (4 * A)) / E_eff
      const p = -E_eff / (4 * A)
      const roundedH = cleanZero(h)
      const roundedK = cleanZero(k)
      const roundedP = cleanZero(p)
      const latusRectum = cleanZero(Math.abs(4 * roundedP))
      const isUpward = roundedP > 0
      const openingDirection = isUpward ? 'upward' : 'downward'
      const openingDirectionKm = isUpward ? 'បែរទៅលើ' : 'បែរទៅក្រោម'
      const domain = '(-∞, +∞)'
      const range = isUpward ? `[${roundedK}, +∞)` : `(-∞, ${roundedK}]`

      const xSq = formatSquaredTerm('x', roundedH)
      const yLin = formatLinearTerm('y', roundedK)
      const coeff = cleanZero(4 * roundedP)
      const standardLatex =
        roundedK === 0
          ? `${xSq} = ${coeff === 1 ? 'y' : coeff === -1 ? '-y' : `${coeff}y`}`
          : `${xSq} = ${coeff === 1 ? '' : coeff === -1 ? '-' : `${coeff}`}${yLin}`

      const rawRange = Math.max(Math.abs(roundedH), Math.abs(roundedK), Math.abs(roundedK + roundedP)) + 4
      const sRange = Math.max(10, Math.ceil(rawRange / 5) * 5)

      return {
        type: 'parabola',
        orientation: 'vertical',
        openingDirection,
        openingDirectionKm,
        vertex: { x: roundedH, y: roundedK },
        focus: { x: roundedH, y: cleanZero(roundedK + roundedP) },
        directrix: { axis: 'y', val: cleanZero(roundedK - roundedP) },
        axisOfSymmetry: { axis: 'x', val: roundedH },
        p: roundedP,
        latusRectum,
        domain,
        range,
        domainKm: 'ℝ',
        rangeKm: range,
        standardLatex,
        nameEn: 'Vertical Parabola',
        nameKm: 'ប៉ារ៉ាបូលឈរ (អ័ក្សឆ្លុះស្របនឹងអ័ក្ស y)',
        suggestedRange: sRange,
      }
    }

    // 3. Ellipse or Circle (A and C share same sign)
    if (A * C > 0) {
      const h = -D / (2 * A)
      const k = -E / (2 * C)
      const K = A * h * h + C * k * k - constTerm
      if (K / A <= 0 || K / C <= 0) return null

      const rx = Math.sqrt(K / A)
      const ry = Math.sqrt(K / C)
      const roundedH = cleanZero(h)
      const roundedK = cleanZero(k)

      if (Math.abs(rx - ry) < 1e-5) {
        const radius = cleanZero(rx)
        const rawRange = Math.max(Math.abs(roundedH), Math.abs(roundedK)) + radius + 2
        const sRange = Math.max(10, Math.ceil(rawRange / 5) * 5)
        const xSq = formatSquaredTerm('x', roundedH)
        const ySq = formatSquaredTerm('y', roundedK)
        const r2 = cleanZero(radius * radius)

        return {
          type: 'circle',
          center: { x: roundedH, y: roundedK },
          radius,
          domain: `[${cleanZero(roundedH - radius)}, ${cleanZero(roundedH + radius)}]`,
          range: `[${cleanZero(roundedK - radius)}, ${cleanZero(roundedK + radius)}]`,
          domainKm: `[${cleanZero(roundedH - radius)}, ${cleanZero(roundedH + radius)}]`,
          rangeKm: `[${cleanZero(roundedK - radius)}, ${cleanZero(roundedK + radius)}]`,
          standardLatex: `${xSq} + ${ySq} = ${r2}`,
          nameEn: 'Circle',
          nameKm: 'រង្វង់ (Circle)',
          suggestedRange: sRange,
        }
      }

      const horizontal = rx > ry
      const a = horizontal ? rx : ry
      const b = horizontal ? ry : rx
      const c = Math.sqrt(a * a - b * b)
      const e = c / a

      const roundedA = cleanZero(a)
      const roundedB = cleanZero(b)
      const roundedC = cleanZero(c)
      const roundedE = Math.round(e * 1000) / 1000

      const vertices = horizontal
        ? [
            { x: cleanZero(roundedH - roundedA), y: roundedK },
            { x: cleanZero(roundedH + roundedA), y: roundedK },
          ]
        : [
            { x: roundedH, y: cleanZero(roundedK - roundedA) },
            { x: roundedH, y: cleanZero(roundedK + roundedA) },
          ]

      const coVertices = horizontal
        ? [
            { x: roundedH, y: cleanZero(roundedK - roundedB) },
            { x: roundedH, y: cleanZero(roundedK + roundedB) },
          ]
        : [
            { x: cleanZero(roundedH - roundedB), y: roundedK },
            { x: cleanZero(roundedH + roundedB), y: roundedK },
          ]

      const foci = horizontal
        ? [
            { x: cleanZero(roundedH - roundedC), y: roundedK },
            { x: cleanZero(roundedH + roundedC), y: roundedK },
          ]
        : [
            { x: roundedH, y: cleanZero(roundedK - roundedC) },
            { x: roundedH, y: cleanZero(roundedK + roundedC) },
          ]

      const majorAxis = {
        line: horizontal ? `y = ${roundedK}` : `x = ${roundedH}`,
        length: cleanZero(2 * roundedA),
        axis: horizontal ? ('y' as const) : ('x' as const),
        val: horizontal ? roundedK : roundedH,
      }

      const minorAxis = {
        line: horizontal ? `x = ${roundedH}` : `y = ${roundedK}`,
        length: cleanZero(2 * roundedB),
        axis: horizontal ? ('x' as const) : ('y' as const),
        val: horizontal ? roundedH : roundedK,
      }

      const dirDist = roundedE > 0 ? cleanZero(roundedA / roundedE) : 0
      const directrices = horizontal
        ? [
            { axis: 'x' as const, val: cleanZero(roundedH - dirDist) },
            { axis: 'x' as const, val: cleanZero(roundedH + dirDist) },
          ]
        : [
            { axis: 'y' as const, val: cleanZero(roundedK - dirDist) },
            { axis: 'y' as const, val: cleanZero(roundedK + dirDist) },
          ]

      const domain = horizontal
        ? `[${cleanZero(roundedH - roundedA)}, ${cleanZero(roundedH + roundedA)}]`
        : `[${cleanZero(roundedH - roundedB)}, ${cleanZero(roundedH + roundedB)}]`

      const range = horizontal
        ? `[${cleanZero(roundedK - roundedB)}, ${cleanZero(roundedK + roundedB)}]`
        : `[${cleanZero(roundedK - roundedA)}, ${cleanZero(roundedK + roundedA)}]`

      const rawRange = Math.max(Math.abs(roundedH) + roundedA, Math.abs(roundedK) + roundedA) + 3
      const sRange = Math.max(10, Math.ceil(rawRange / 5) * 5)

      const a2 = cleanZero(a * a)
      const b2 = cleanZero(b * b)
      const xSq = formatSquaredTerm('x', roundedH)
      const ySq = formatSquaredTerm('y', roundedK)

      const standardLatex = horizontal
        ? `\\frac{${xSq}}{${a2}} + \\frac{${ySq}}{${b2}} = 1`
        : `\\frac{${ySq}}{${a2}} + \\frac{${xSq}}{${b2}} = 1`

      return {
        type: 'ellipse',
        orientation: horizontal ? 'horizontal' : 'vertical',
        center: { x: roundedH, y: roundedK },
        a: roundedA,
        b: roundedB,
        c: roundedC,
        e: roundedE,
        majorAxis,
        minorAxis,
        directrices,
        vertices,
        coVertices,
        foci,
        domain,
        range,
        domainKm: domain,
        rangeKm: range,
        standardLatex,
        nameEn: horizontal ? 'Horizontal Ellipse' : 'Vertical Ellipse',
        nameKm: horizontal ? 'អេលីបមានអ័ក្សធំដេក (ស្របនឹងអ័ក្ស x)' : 'អេលីបមានអ័ក្សធំឈរ (ស្របនឹងអ័ក្ស y)',
        suggestedRange: sRange,
      }
    }

    // 4. Hyperbola (A and C have opposite signs)
    if (A * C < 0) {
      const h = -D / (2 * A)
      const k = -E / (2 * C)
      const K = A * h * h + C * k * k - constTerm
      if (Math.abs(K) < 1e-7) return null

      const horizontal = K / A > 0
      const a = Math.sqrt(horizontal ? K / A : K / C)
      const b = Math.sqrt(horizontal ? -K / C : -K / A)
      const c = Math.sqrt(a * a + b * b)
      const e = c / a

      const roundedH = cleanZero(h)
      const roundedK = cleanZero(k)
      const roundedA = cleanZero(a)
      const roundedB = cleanZero(b)
      const roundedC = cleanZero(c)
      const roundedE = Math.round(e * 1000) / 1000

      const vertices = horizontal
        ? [
            { x: cleanZero(roundedH - roundedA), y: roundedK },
            { x: cleanZero(roundedH + roundedA), y: roundedK },
          ]
        : [
            { x: roundedH, y: cleanZero(roundedK - roundedA) },
            { x: roundedH, y: cleanZero(roundedK + roundedA) },
          ]

      const foci = horizontal
        ? [
            { x: cleanZero(roundedH - roundedC), y: roundedK },
            { x: cleanZero(roundedH + roundedC), y: roundedK },
          ]
        : [
            { x: roundedH, y: cleanZero(roundedK - roundedC) },
            { x: roundedH, y: cleanZero(roundedK + roundedC) },
          ]

      const majorAxis = {
        line: horizontal ? `y = ${roundedK}` : `x = ${roundedH}`,
        length: cleanZero(2 * roundedA),
        axis: horizontal ? ('y' as const) : ('x' as const),
        val: horizontal ? roundedK : roundedH,
      }

      const minorAxis = {
        line: horizontal ? `x = ${roundedH}` : `y = ${roundedK}`,
        length: cleanZero(2 * roundedB),
        axis: horizontal ? ('x' as const) : ('y' as const),
        val: horizontal ? roundedH : roundedK,
      }

      const slope = horizontal ? b / a : a / b
      const roundedSlope = cleanZero(slope)

      const asymptotes = [
        {
          slope: roundedSlope,
          m: roundedSlope,
          b: cleanZero(roundedK - roundedSlope * roundedH),
          label: `y - ${roundedK} = ${roundedSlope}(x - ${roundedH})`,
          fn: (x: number) => roundedK + roundedSlope * (x - roundedH),
        },
        {
          slope: -roundedSlope,
          m: -roundedSlope,
          b: cleanZero(roundedK + roundedSlope * roundedH),
          label: `y - ${roundedK} = -${roundedSlope}(x - ${roundedH})`,
          fn: (x: number) => roundedK - roundedSlope * (x - roundedH),
        },
      ]

      const a2 = cleanZero(a * a)
      const b2 = cleanZero(b * b)
      const xSq = formatSquaredTerm('x', roundedH)
      const ySq = formatSquaredTerm('y', roundedK)

      const rawRange = Math.max(Math.abs(roundedH) + roundedC, Math.abs(roundedK) + roundedC) + 3
      const sRange = Math.max(10, Math.ceil(rawRange / 5) * 5)

      return {
        type: 'hyperbola',
        orientation: horizontal ? 'horizontal' : 'vertical',
        center: { x: roundedH, y: roundedK },
        a: roundedA,
        b: roundedB,
        c: roundedC,
        e: roundedE,
        majorAxis,
        minorAxis,
        vertices,
        foci,
        asymptotes,
        standardLatex: horizontal
          ? `\\frac{${xSq}}{${a2}} - \\frac{${ySq}}{${b2}} = 1`
          : `\\frac{${ySq}}{${a2}} - \\frac{${xSq}}{${b2}} = 1`,
        nameEn: horizontal ? 'Horizontal Hyperbola' : 'Vertical Hyperbola',
        nameKm: horizontal ? 'អ៊ីពែបូលមានអ័ក្សទទឹងដេក (ស្របនឹងអ័ក្ស x)' : 'អ៊ីពែបូលមានអ័ក្សទទឹងឈរ (ស្របនឹងអ័ក្ស y)',
        suggestedRange: sRange,
      }
    }
  }

  // Rectangular hyperbola xy = c
  if (Math.abs(B) > 1e-5 && Math.abs(A) < 1e-5 && Math.abs(C) < 1e-5) {
    return {
      type: 'hyperbola',
      standardLatex: `xy = ${cleanZero(-constTerm)}`,
      nameEn: 'Rectangular Hyperbola',
      nameKm: 'អ៊ីពែបូលកែង (Rectangular Hyperbola)',
      suggestedRange: 10,
    }
  }

  return null
}

/**
 * Deeply analyzes a mathematical function or conic equation to extract key features:
 * - Conic elements (Center, Vertices, Foci, Directrix, Asymptotes, Axes)
 * - Slope and intercepts
 * - Quadratic vertex and roots
 * - Table of values
 * - Step-by-step hand graphing guide in English and authentic Cambodian MoEYS Khmer terminology
 */
export function analyzeEquation(
  parsed: ParsedEquation,
  rawInput: string,
  viewport: [number, number] = [-10, 10],
): FunctionAnalysis {
  const [xMin, xMax] = viewport
  const cleanExpr = parsed.cleanExpr || cleanEquationInput(rawInput)
  const latexExpr = exprToLatex(rawInput)

  const conic = detectConic(parsed.fn2D)
  const isConic = conic !== null && conic.type !== 'line'

  // Intercept calculation with axes:
  // x-intercepts: where y = 0, F(x, 0) = 0
  const xIntercepts: number[] = []
  const yIntercepts: number[] = []

  const scanSteps = 120
  const stepX = (xMax - xMin) / scanSteps
  for (let x = xMin; x < xMax; x += stepX) {
    const v1 = parsed.fn2D(x, 0)
    const v2 = parsed.fn2D(x + stepX, 0)
    if (Number.isFinite(v1) && Number.isFinite(v2)) {
      if (Math.abs(v1) < 1e-5) {
        const rx = Math.round(x * 100) / 100
        if (!xIntercepts.includes(rx)) xIntercepts.push(rx)
      } else if (v1 * v2 < 0) {
        let a = x
        let b = x + stepX
        for (let iter = 0; iter < 20; iter++) {
          const mid = (a + b) / 2
          const vm = parsed.fn2D(mid, 0)
          if (Math.abs(vm) < 1e-6) {
            a = mid
            break
          }
          if (v1 * vm < 0) b = mid
          else a = mid
        }
        const root = Math.round(((a + b) / 2) * 100) / 100
        if (!xIntercepts.some((r) => Math.abs(r - root) < 0.05)) {
          xIntercepts.push(root)
        }
      }
    }
  }

  // y-intercepts: where x = 0, F(0, y) = 0
  for (let y = xMin; y < xMax; y += stepX) {
    const v1 = parsed.fn2D(0, y)
    const v2 = parsed.fn2D(0, y + stepX)
    if (Number.isFinite(v1) && Number.isFinite(v2)) {
      if (Math.abs(v1) < 1e-5) {
        const ry = Math.round(y * 100) / 100
        if (!yIntercepts.includes(ry)) yIntercepts.push(ry)
      } else if (v1 * v2 < 0) {
        let a = y
        let b = y + stepX
        for (let iter = 0; iter < 20; iter++) {
          const mid = (a + b) / 2
          const vm = parsed.fn2D(0, mid)
          if (Math.abs(vm) < 1e-6) {
            a = mid
            break
          }
          if (v1 * vm < 0) b = mid
          else a = mid
        }
        const root = Math.round(((a + b) / 2) * 100) / 100
        if (!yIntercepts.some((r) => Math.abs(r - root) < 0.05)) {
          yIntercepts.push(root)
        }
      }
    }
  }

  xIntercepts.sort((a, b) => a - b)
  yIntercepts.sort((a, b) => a - b)

  const stepsEn: string[] = []
  const stepsKm: string[] = []
  const table: { x: number; y: number | null; label?: string }[] = []

  let isLinear = false
  let isQuadratic = false
  let slope: number | null = null
  let vertex: { x: number; y: number } | null = conic?.vertex ?? null
  const extrema: { x: number; y: number; kind: 'min' | 'max' }[] = []

  if (conic) {
    switch (conic.type) {
      case 'parabola': {
        const v = conic.vertex!
        const p = conic.p!
        const dir = conic.directrix!
        const axis = conic.axisOfSymmetry!

        if (conic.orientation === 'horizontal') {
          stepsEn.push(
            `Identify standard horizontal parabola form: ${conic.standardLatex} with vertex V(${v.x}, ${v.y}) and focal parameter p = ${p}.`,
            `The parabola opens ${p > 0 ? 'to the right' : 'to the left'} with horizontal axis of symmetry ${axis.axis} = ${axis.val}.`,
            `Plot the focus at F(${conic.focus!.x}, ${conic.focus!.y}) inside the curve (distance |p| = ${Math.abs(p)} from vertex).`,
            `Draw the vertical directrix line ${dir.axis} = ${dir.val} outside the curve and latus rectum chord of length |4p| = ${conic.latusRectum}.`,
            `Domain: ${conic.domain}, Range: ${conic.range}. Plot sample points using y values around k = ${v.y} to sketch the symmetric curve.`,
          )
          stepsKm.push(
            `កំណត់ទម្រង់ស្តង់ដាប៉ារ៉ាបូលដេក៖ ${conic.standardLatex} ដែលមានកំពូល V(${v.x}, ${v.y}) និងប៉ារ៉ាម៉ែត្រកំណុំ p = ${p}។`,
            `ប៉ារ៉ាបូលនេះបែរខ្នង${p > 0 ? 'ទៅស្តាំ' : 'ទៅឆ្វេង'} ដោយមានអ័ក្សឆ្លុះដេក ${axis.axis} = ${axis.val}។`,
            `សម្គាល់កំណុំ F(${conic.focus!.x}, ${conic.focus!.y}) នៅខាងក្នុងខ្សែកោង (ចម្ងាយ |p| = ${Math.abs(p)} ពីកំពូល)។`,
            `គូសបន្ទាត់ប្រាប់ទិសឈរ ${dir.axis} = ${dir.val} និងអង្កត់ឡាទុសរ៉ិចទុមប្រវែង |4p| = ${conic.latusRectum}។`,
            `ដែនកំណត់៖ ${conic.domainKm}, សំណុំតម្លៃ៖ ${conic.rangeKm}។ ដៅចំណុចគំរូសងខាងអ័ក្សឆ្លុះ រួចគូសខ្សែកោងប៉ារ៉ាបូលស៊ីមេទ្រី។`,
          )
        } else {
          isQuadratic = true
          extrema.push({ x: v.x, y: v.y, kind: p > 0 ? 'min' : 'max' })
          stepsEn.push(
            `Identify standard vertical parabola form: ${conic.standardLatex} with vertex V(${v.x}, ${v.y}) and focal parameter p = ${p}.`,
            `The parabola opens ${p > 0 ? 'upward (U-shape)' : 'downward'} with vertical axis of symmetry ${axis.axis} = ${axis.val}.`,
            `Plot the focus at F(${conic.focus!.x}, ${conic.focus!.y}) inside the curve (distance |p| = ${Math.abs(p)} from vertex).`,
            `Draw the horizontal directrix line ${dir.axis} = ${dir.val} outside the curve and latus rectum chord of length |4p| = ${conic.latusRectum}.`,
            `Domain: ${conic.domain}, Range: ${conic.range}. Plot the vertex, intercepts, and sketch the smooth symmetric curve.`,
          )
          stepsKm.push(
            `កំណត់ទម្រង់ស្តង់ដាប៉ារ៉ាបូលឈរ៖ ${conic.standardLatex} ដែលមានកំពូល V(${v.x}, ${v.y}) និងប៉ារ៉ាម៉ែត្រកំណុំ p = ${p}។`,
            `ប៉ារ៉ាបូលនេះបែរខ្នង${p > 0 ? 'ទៅលើ' : 'ទៅក្រោម'} ដោយមានអ័ក្សឆ្លុះឈរ ${axis.axis} = ${axis.val}។`,
            `សម្គាល់កំណុំ F(${conic.focus!.x}, ${conic.focus!.y}) នៅខាងក្នុងខ្សែកោង (ចម្ងាយ |p| = ${Math.abs(p)} ពីកំពូល)។`,
            `គូសបន្ទាត់ប្រាប់ទិសដេក ${dir.axis} = ${dir.val} និងអង្កត់ឡាទុសរ៉ិចទុមប្រវែង |4p| = ${conic.latusRectum}។`,
            `ដែនកំណត់៖ ${conic.domainKm}, សំណុំតម្លៃ៖ ${conic.rangeKm}។ ដៅកំពូល ចំណុចប្រសព្វអ័ក្ស រួចគូសខ្សែកោងប៉ារ៉ាបូលស៊ីមេទ្រី។`,
          )
        }
        break
      }
      case 'ellipse': {
        const c = conic.center!
        const v = conic.vertices!
        const f = conic.foci!
        const coV = conic.coVertices!
        const horiz = conic.orientation === 'horizontal'

        stepsEn.push(
          `Identify the standard ellipse form: ${conic.standardLatex} with center C(${c.x}, ${c.y}).`,
          `Major axis is ${horiz ? 'horizontal (parallel to x-axis)' : 'vertical (parallel to y-axis)'}: semi-major a = ${conic.a} (length 2a = ${conic.majorAxis?.length}), semi-minor b = ${conic.b} (length 2b = ${conic.minorAxis?.length}).`,
          `Calculate focal distance c = √(a² − b²) = ${conic.c}, giving eccentricity e = c/a ≈ ${conic.e}.`,
          `Plot major vertices V₁(${v[0].x}, ${v[0].y}), V₂(${v[1].x}, ${v[1].y}) and co-vertices B₁(${coV[0].x}, ${coV[0].y}), B₂(${coV[1].x}, ${coV[1].y}).`,
          `Plot foci F₁(${f[0].x}, ${f[0].y}), F₂(${f[1].x}, ${f[1].y}) on the major axis and draw the smooth oval.`,
        )
        stepsKm.push(
          `កំណត់ទម្រង់ស្តង់ដាអេលីប៖ ${conic.standardLatex} ដែលមានផ្ចិត C(${c.x}, ${c.y})។`,
          `អ័ក្សធំស្ថិតនៅតាមទិស${horiz ? 'ដេក (ស្របនឹងអ័ក្ស x)' : 'ឈរ (ស្របនឹងអ័ក្ស y)'}៖ ពាក់កណ្ដាលអ័ក្សធំ a = ${conic.a} (ប្រវែង 2a = ${conic.majorAxis?.length}), ពាក់កណ្ដាលអ័ក្សតូច b = ${conic.b} (ប្រវែង 2b = ${conic.minorAxis?.length})។`,
          `គណនាចម្ងាយពីផ្ចិតទៅកំណុំ c = √(a² − b²) = ${conic.c} និងអ៊ិចសង់ទ្រីស៊ីតេ e = c/a ≈ ${conic.e}។`,
          `សម្គាល់កំពូលអ័ក្សធំ V₁(${v[0].x}, ${v[0].y}), V₂(${v[1].x}, ${v[1].y}) និងកំពូលអ័ក្សតូច B₁(${coV[0].x}, ${coV[0].y}), B₂(${coV[1].x}, ${coV[1].y})។`,
          `សម្គាល់កំណុំ F₁(${f[0].x}, ${f[0].y}), F₂(${f[1].x}, ${f[1].y}) នៅលើអ័ក្សធំ រួចគូសខ្សែកោងអេលីបរលូន។`,
        )
        break
      }
      case 'hyperbola': {
        const c = conic.center ?? { x: 0, y: 0 }
        const v = conic.vertices ?? []
        const f = conic.foci ?? []
        const horiz = conic.orientation === 'horizontal'

        stepsEn.push(
          `Identify the standard hyperbola form: ${conic.standardLatex} with center C(${c.x}, ${c.y}).`,
          `Transverse axis is ${horiz ? 'horizontal' : 'vertical'}: a = ${conic.a}, conjugate semi-axis b = ${conic.b}.`,
          `Calculate focal distance c = √(a² + b²) = ${conic.c}, giving eccentricity e = c/a ≈ ${conic.e}.`,
          `Plot vertices ${v.map((pt) => `(${pt.x}, ${pt.y})`).join(', ')} and foci ${f.map((pt) => `(${pt.x}, ${pt.y})`).join(', ')}.`,
          `Draw the two dashed asymptote lines and sketch both open branches approaching them.`,
        )
        stepsKm.push(
          `កំណត់ទម្រង់ស្តង់ដាអ៊ីពែបូល៖ ${conic.standardLatex} ដែលមានផ្ចិត C(${c.x}, ${c.y})។`,
          `អ័ក្សទទឹងស្ថិតនៅតាមទិស${horiz ? 'ដេក (ស្របនឹងអ័ក្ស x)' : 'ឈរ (ស្របនឹងអ័ក្ស y)'}៖ ពាក់កណ្ដាលអ័ក្សទទឹង a = ${conic.a}, ពាក់កណ្ដាលអ័ក្សឆ្លាស់ b = ${conic.b}។`,
          `គណនាចម្ងាយកំណុំ c = √(a² + b²) = ${conic.c} និងអ៊ិចសង់ទ្រីស៊ីតេ e = c/a ≈ ${conic.e}។`,
          `សម្គាល់កំពូល ${v.map((pt) => `(${pt.x}, ${pt.y})`).join(', ')} និងកំណុំ ${f.map((pt) => `(${pt.x}, ${pt.y})`).join(', ')}។`,
          `គូសបន្ទាត់អាស៊ីមតូតទាំងពីរ (បន្ទាត់ដាច់ៗ) រួចសង់ខ្សែកោងមែកទាំងសងខាងរបស់អ៊ីពែបូល។`,
        )
        break
      }
      case 'circle': {
        const c = conic.center!
        const r = conic.radius!
        stepsEn.push(
          `Identify the standard circle form: (x − h)² + (y − k)² = r² with center C(${c.x}, ${c.y}) and radius r = ${r}.`,
          `Plot the center point C(${c.x}, ${c.y}) on the Cartesian plane.`,
          `Mark the 4 cardinal points at distance r = ${r} from center: (${c.x + r}, ${c.y}), (${c.x - r}, ${c.y}), (${c.x}, ${c.y + r}), (${c.x}, ${c.y - r}).`,
          `Use a compass to draw the perfect circle passing through all 4 cardinal points.`,
        )
        stepsKm.push(
          `កំណត់ទម្រង់ស្តង់ដារង្វង់៖ (x − h)² + (y − k)² = r² ដែលមានផ្ចិត C(${c.x}, ${c.y}) និងកាំ r = ${r}។`,
          `សម្គាល់ចំណុចផ្ចិត C(${c.x}, ${c.y}) នៅលើប្លង់កូអ័រដោនេ។`,
          `ដៅចំណុចទាំងបួននៅចម្ងាយ r = ${r} ពីផ្ចិត៖ (${c.x + r}, ${c.y}), (${c.x - r}, ${c.y}), (${c.x}, ${c.y + r}), (${c.x}, ${c.y - r})។`,
          `ប្រើដែកឈានដើម្បីគូសរង្វង់មូលឥតខ្ចោះកាត់តាមចំណុចទាំងបួន។`,
        )
        break
      }
      default:
        break
    }
  }

  // Generate Table of Values
  if (parsed.type === 'explicit_y' && parsed.fn1D) {
    const fn = parsed.fn1D
    for (let x = -5; x <= 5; x++) {
      const yVal = fn(x)
      const finite = Number.isFinite(yVal)
      let label: string | undefined
      if (x === 0 && yIntercepts.length > 0) label = 'y-intercept'
      else if (finite && Math.abs(yVal) < 1e-5) label = 'x-intercept (root)'
      table.push({
        x,
        y: finite ? Math.round(yVal * 100) / 100 : null,
        label,
      })
    }
  } else if (parsed.type === 'explicit_x' && parsed.fnX) {
    const fnX = parsed.fnX
    for (let y = -5; y <= 5; y++) {
      const xVal = fnX(y)
      const finite = Number.isFinite(xVal)
      let label: string | undefined
      if (y === 0) label = 'x-intercept (vertex/axis)'
      table.push({
        x: finite ? Math.round(xVal * 100) / 100 : 0,
        y,
        label,
      })
    }
  } else {
    // Implicit table sampling
    if (conic?.vertices && conic.vertices.length > 0) {
      for (const pt of conic.vertices) {
        table.push({ x: pt.x, y: pt.y, label: 'Vertex' })
      }
    }
    if (xIntercepts.length > 0) {
      for (const rx of xIntercepts) {
        table.push({ x: rx, y: 0, label: 'x-intercept' })
      }
    }
    if (yIntercepts.length > 0) {
      for (const ry of yIntercepts) {
        table.push({ x: 0, y: ry, label: 'y-intercept' })
      }
    }
    // Fill sample x from -4 to 4 if few
    if (table.length < 5) {
      for (let x = -4; x <= 4; x += 2) {
        // find a y where F(x, y) = 0
        let foundY: number | null = null
        for (let y = -15; y <= 15; y += 0.5) {
          if (Math.abs(parsed.fn2D(x, y)) < 0.1) {
            foundY = Math.round(y * 10) / 10
            break
          }
        }
        table.push({ x, y: foundY })
      }
    }
  }

  // If not conic, use default analyzeFunction steps
  if (!conic) {
    if (parsed.type === 'explicit_y' && parsed.fn1D) {
      const baseAnalysis = analyzeFunction(parsed.fn1D, rawInput, viewport)
      return {
        ...baseAnalysis,
        latexExpr,
        parsedEq: parsed,
        suggestedRange: 10,
      }
    }

    stepsEn.push(
      `Plot zero-crossings of implicit equation F(x, y) = 0 on Cartesian grid.`,
      xIntercepts.length > 0 ? `Real x-intercepts at: ${xIntercepts.join(', ')}.` : `No real x-intercepts in viewport.`,
      yIntercepts.length > 0 ? `Real y-intercepts at: ${yIntercepts.join(', ')}.` : `No real y-intercepts in viewport.`,
      `Evaluate coordinates (x, y) satisfying the equation and connect them smoothly.`,
    )
    stepsKm.push(
      `កំណត់ចំណុចដែលសមីការ F(x, y) = 0 ផ្ទៀងផ្ទាត់នៅលើប្លង់កូអ័រដោនេ។`,
      xIntercepts.length > 0 ? `ចំណុចកាត់អ័ក្ស x៖ ${xIntercepts.join(', ')}។` : `គ្មានចំណុចកាត់អ័ក្ស x ក្នុងដែននេះទេ។`,
      yIntercepts.length > 0 ? `ចំណុចកាត់អ័ក្ស y៖ ${yIntercepts.join(', ')}។` : `គ្មានចំណុចកាត់អ័ក្ស y ក្នុងដែននេះទេ។`,
      `ដៅចំណុចកូអ័រដោនេ (x, y) ដែលផ្ទៀងផ្ទាត់សមីការ រួចគូសខ្សែកោងរលូន។`,
    )
  }

  const primaryYInt = yIntercepts.length > 0 ? yIntercepts[0] : null

  return {
    isValid: true,
    cleanExpr,
    latexExpr,
    isLinear,
    isQuadratic,
    isConic,
    conic,
    slope,
    yIntercept: primaryYInt,
    xIntercepts,
    yIntercepts,
    vertex,
    extrema,
    table,
    stepsEn,
    stepsKm,
    parsedEq: parsed,
    suggestedRange: conic?.suggestedRange ?? 10,
  }
}

/** Legacy analyzer for 1D function */
export function analyzeFunction(
  fn: (x: number) => number,
  rawInput: string,
  viewport: [number, number] = [-10, 10],
): FunctionAnalysis {
  const [xMin, xMax] = viewport
  const cleanExpr = cleanEquationInput(rawInput)
  const latexExpr = exprToLatex(rawInput)

  const f0 = fn(0)
  const f1 = fn(1)
  const f2 = fn(2)
  const fm1 = fn(-1)

  let isLinear = false
  let isQuadratic = false
  let slope: number | null = null
  let yIntercept: number | null = Number.isFinite(f0) ? f0 : null
  const xIntercepts: number[] = []
  let vertex: { x: number; y: number } | null = null
  const extrema: { x: number; y: number; kind: 'min' | 'max' }[] = []

  // 1. Check for linear: y = mx + b
  if (Number.isFinite(f0) && Number.isFinite(f1) && Number.isFinite(f2) && Number.isFinite(fm1)) {
    const d1 = f1 - f0
    const d2 = f2 - f1
    const dm1 = f0 - fm1
    const d3 = fn(3) - f2
    if (
      Math.abs(d1 - d2) < 1e-6 &&
      Math.abs(d1 - dm1) < 1e-6 &&
      (Number.isNaN(d3) || Math.abs(d1 - d3) < 1e-6)
    ) {
      isLinear = true
      slope = Math.round(d1 * 1000) / 1000
      if (Math.abs(slope) > 1e-6 && yIntercept !== null) {
        xIntercepts.push(Math.round((-yIntercept / slope) * 1000) / 1000)
      }
    }
  }

  // 2. Check for quadratic: y = ax^2 + bx + c
  if (!isLinear && Number.isFinite(f0) && Number.isFinite(f1) && Number.isFinite(fm1) && Number.isFinite(f2)) {
    const c = f0
    const a = (f1 + fm1 - 2 * c) / 2
    const b = (f1 - fm1) / 2
    const testF2 = a * 4 + b * 2 + c
    if (Math.abs(a) > 1e-6 && Math.abs(f2 - testF2) < 1e-6) {
      isQuadratic = true
      const vx = -b / (2 * a)
      const vy = fn(vx)
      vertex = { x: Math.round(vx * 1000) / 1000, y: Math.round(vy * 1000) / 1000 }
      extrema.push({
        x: vertex.x,
        y: vertex.y,
        kind: a > 0 ? 'min' : 'max',
      })
      const disc = b * b - 4 * a * c
      if (disc >= 0) {
        const r1 = (-b - Math.sqrt(disc)) / (2 * a)
        const r2 = (-b + Math.sqrt(disc)) / (2 * a)
        xIntercepts.push(Math.round(r1 * 1000) / 1000)
        if (Math.abs(r1 - r2) > 1e-6) {
          xIntercepts.push(Math.round(r2 * 1000) / 1000)
        }
      }
    }
  }

  // 3. General root finding across viewport if not linear or quadratic
  if (!isLinear && !isQuadratic) {
    const scanSteps = 120
    const step = (xMax - xMin) / scanSteps
    for (let x = xMin; x < xMax; x += step) {
      const y1 = fn(x)
      const y2 = fn(x + step)
      if (Number.isFinite(y1) && Number.isFinite(y2)) {
        if (Math.abs(y1) < 1e-6) {
          const rx = Math.round(x * 1000) / 1000
          if (!xIntercepts.includes(rx)) xIntercepts.push(rx)
        } else if (y1 * y2 < 0) {
          let a = x
          let b = x + step
          for (let iter = 0; iter < 24; iter++) {
            const mid = (a + b) / 2
            const ym = fn(mid)
            if (Math.abs(ym) < 1e-6) {
              a = mid
              break
            }
            if (y1 * ym < 0) b = mid
            else a = mid
          }
          const root = Math.round(((a + b) / 2) * 1000) / 1000
          if (!xIntercepts.some((r) => Math.abs(r - root) < 1e-2)) {
            xIntercepts.push(root)
          }
        }
      }
    }
  }

  xIntercepts.sort((a, b) => a - b)

  const table: { x: number; y: number | null; label?: string }[] = []
  for (let x = -5; x <= 5; x++) {
    const yVal = fn(x)
    const finite = Number.isFinite(yVal)
    let label: string | undefined
    if (x === 0 && yIntercept !== null) label = 'y-intercept'
    else if (finite && Math.abs(yVal) < 1e-6) label = 'x-intercept (root)'
    table.push({
      x,
      y: finite ? Math.round(yVal * 100) / 100 : null,
      label,
    })
  }

  const stepsEn: string[] = []
  const stepsKm: string[] = []

  if (isLinear && slope !== null && yIntercept !== null) {
    const yIntSign = yIntercept >= 0 ? `+ ${yIntercept}` : `- ${Math.abs(yIntercept)}`
    const rootStr = xIntercepts.length > 0 ? String(xIntercepts[0]) : 'None'

    stepsEn.push(
      `Identify the slope-intercept form y = mx + b: Slope m = ${slope}, y-intercept b = ${yIntercept}.`,
      `Plot the y-intercept at point (0, ${yIntercept}) on the vertical y-axis.`,
      xIntercepts.length > 0
        ? `Find the x-intercept by setting y = 0: ${slope}x ${yIntSign} = 0 → x = ${rootStr}. Plot point (${rootStr}, 0) on the horizontal x-axis.`
        : `Since slope m = 0, this is a horizontal line passing through y = ${yIntercept}.`,
      `Use a straightedge to draw the line passing through (${rootStr}, 0) and (0, ${yIntercept}). For every 1 step to the right, the line changes by ${slope} step(s) vertically.`,
    )

    stepsKm.push(
      `កំណត់ទម្រង់សមីការបន្ទាត់ y = mx + b៖ មេគុណប្រាប់ទិស m = ${slope}, ចំណុចកាត់អ័ក្ស y គឺ b = ${yIntercept}។`,
      `សម្គាល់ចំណុចប្រសព្វអ័ក្សអ័រដោនេ (0, ${yIntercept}) នៅលើអ័ក្សឈរ y។`,
      xIntercepts.length > 0
        ? `រកចំណុចកាត់អ័ក្សអាប់ស៊ីស ដោយជំនួស y = 0៖ ${slope}x ${yIntSign} = 0 → x = ${rootStr}។ សម្គាល់ចំណុច (${rootStr}, 0) លើអ័ក្សដេក x។`
        : `ដោយសារមេគុណប្រាប់ទិស m = 0 នេះជាបន្ទាត់ដេកស្របនឹងអ័ក្ស x កាត់ត្រង់ y = ${yIntercept}។`,
      `គូសបន្ទាត់ត្រង់កាត់តាមចំណុចទាំងពីរ។ រាល់ពេលដើរទៅស្តាំ 1 ឯកតា បន្ទាត់នេះនឹងឡើង ឬចុះ ${slope} ឯកតា។`,
    )
  } else if (isQuadratic && vertex !== null) {
    stepsEn.push(
      `Identify the quadratic form y = ax² + bx + c. The parabola opens ${vertex.y < f0 ? 'upward (U-shape)' : 'downward'}.`,
      `Calculate the vertex (peak or valley): x = -b/(2a) = ${vertex.x}, y = ${vertex.y} → Vertex is at (${vertex.x}, ${vertex.y}).`,
      `Find the y-intercept at (0, ${yIntercept}).`,
      xIntercepts.length > 0
        ? `Find the x-intercepts (roots) by solving ax² + bx + c = 0: x = ${xIntercepts.join(', ')}.`
        : `The discriminant is negative (Δ < 0), so the parabola does not touch the x-axis.`,
      `Plot the vertex, intercepts, and sketch a symmetric U-curve through them.`,
    )

    stepsKm.push(
      `កំណត់ទម្រង់សមីការប៉ារ៉ាបូល y = ax² + bx + c។ ប៉ារ៉ាបូលបែរខ្នងទៅលើ ឬក្រោម។`,
      `គណនាកំពូលប៉ារ៉ាបូល៖ x = -b/(2a) = ${vertex.x}, y = ${vertex.y} → កំពូលស្ថិតនៅត្រង់ (${vertex.x}, ${vertex.y})។`,
      `សម្គាល់ចំណុចកាត់អ័ក្សអ័រដោនេត្រង់ (0, ${yIntercept})។`,
      xIntercepts.length > 0
        ? `រកឫសនៃសមីការ (ចំណុចកាត់អ័ក្ស x) ដោយដោះស្រាយ ax² + bx + c = 0៖ x = ${xIntercepts.join(', ')}។`
        : `ឌីសគ្រីមីណង់អវិជ្ជមាន (Δ < 0) ដូច្នេះប៉ារ៉ាបូលមិនកាត់អ័ក្ស x ទេ។`,
      `គូសភ្ជាប់កំពូល និងចំណុចប្រសព្វដើម្បីបានខ្សែកោងប៉ារ៉ាបូលស៊ីមេទ្រី។`,
    )
  } else {
    stepsEn.push(
      `Evaluate the function at key points: find f(0) = ${yIntercept !== null ? yIntercept : 'undefined'} for the y-intercept.`,
      xIntercepts.length > 0
        ? `Identify real roots (where y = 0): x ≈ ${xIntercepts.join(', ')}.`
        : `No real x-intercepts detected within the viewport.`,
      `Generate the table of values for x from -5 to 5 to find corresponding y values.`,
      `Plot the calculated points on the Cartesian plane and smoothly connect them.`,
    )

    stepsKm.push(
      `គណនាតម្លៃអនុគមន៍ត្រង់ចំណុចសំខាន់ៗ៖ f(0) = ${yIntercept !== null ? yIntercept : 'មិនកំណត់'} ជាចំណុចកាត់អ័ក្ស y។`,
      xIntercepts.length > 0
        ? `កំណត់ឫសពិតនៃអនុគមន៍ (ត្រង់ y = 0)៖ x ≈ ${xIntercepts.join(', ')}។`
        : `មិនមានចំណុចប្រសព្វជាមួយអ័ក្ស x នៅក្នុងដែនមើលឃើញនេះទេ។`,
      `បង្កើតតារាងតម្លៃលេខសម្រាប់ x ចាប់ពី -5 ដល់ 5។`,
      `ដៅចំណុចកូអ័រដោនេនៅលើប្លង់ ហើយគូសភ្ជាប់ដោយខ្សែកោងរលោង។`,
    )
  }

  return {
    isValid: true,
    cleanExpr,
    latexExpr,
    isLinear,
    isQuadratic,
    slope,
    yIntercept,
    xIntercepts,
    vertex,
    extrema,
    table,
    stepsEn,
    stepsKm,
  }
}
