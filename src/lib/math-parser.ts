/**
 * Safe, dependency-free mathematical expression parser and function analyzer
 * for high school algebra, trigonometry, and calculus.
 */

export interface FunctionAnalysis {
  isValid: boolean
  error?: string
  cleanExpr: string
  latexExpr: string
  isLinear: boolean
  isQuadratic: boolean
  slope: number | null
  yIntercept: number | null
  xIntercepts: number[]
  vertex: { x: number; y: number } | null
  extrema: { x: number; y: number; kind: 'min' | 'max' }[]
  table: { x: number; y: number | null; label?: string }[]
  stepsEn: string[]
  stepsKm: string[]
}

type ASTNode =
  | { type: 'num'; val: number }
  | { type: 'var' }
  | { type: 'unary'; op: '-' | '+'; arg: ASTNode }
  | { type: 'bin'; op: '+' | '-' | '*' | '/' | '^'; left: ASTNode; right: ASTNode }
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
  // 12x or 12.5x or 12(
  res = res.replace(/(\d+(?:\.\d+)?)\s*([a-zA-Z(])/g, (match, p1, p2) => {
    if ((p2 === 'e' || p2 === 'E') && /\d/.test(match)) {
      return match
    }
    return `${p1}*${p2}`
  })
  // ) followed by ( or variable/number/function
  res = res.replace(/\)\s*([a-zA-Z0-9(])/g, ')*$1')
  // x followed by function or (
  res = res.replace(/\b(x)\s*(\(|[a-zA-Z_]\w*)/g, (match, p1, p2) => {
    if (p2 === 'pi') return `${p1}*${p2}`
    if (['sin', 'cos', 'tan', 'sqrt', 'abs', 'ln', 'log', 'exp', 'asin', 'acos', 'atan'].includes(p2)) return `${p1}*${p2}`
    if (p2.startsWith('(')) return `${p1}*${p2}`
    return match
  })
  return res
}

export function parseMathExpression(input: string): (x: number) => number {
  const cleaned = cleanEquationInput(input)
  if (!cleaned.trim()) {
    throw new Error('Please enter a mathematical expression.')
  }
  const prepared = insertImplicitMultiplication(cleaned)

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
        left = { type: 'var' }
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
      // Unary signs bind less tightly than exponentiation, so −x² is −(x²),
      // but more tightly than multiplication, so −2x is (−2)·x.
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
        op: nextToken.value as '+' | '-' | '*' | '/' | '^',
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

  return function evaluate(x: number): number {
    function evalNode(node: ASTNode): number {
      switch (node.type) {
        case 'num':
          return node.val
        case 'var':
          return x
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
              // Handle negative base with fractional exponent
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

/** Convert a simple math expression string to formatted LaTeX */
export function exprToLatex(raw: string): string {
  let s = cleanEquationInput(raw)
  s = s.replace(/\^([0-9a-zA-Z]+)/g, '^{$1}')
  s = s.replace(/\*/g, ' \\cdot ')
  s = s.replace(/\bsqrt\(([^)]+)\)/g, '\\sqrt{$1}')
  s = s.replace(/\bsin\(([^)]+)\)/g, '\\sin($1)')
  s = s.replace(/\bcos\(([^)]+)\)/g, '\\cos($1)')
  s = s.replace(/\btan\(([^)]+)\)/g, '\\tan($1)')
  s = s.replace(/\babs\(([^)]+)\)/g, '|$1|')
  s = s.replace(/\bpi\b/g, '\\pi')
  return `y = ${s}`
}

/**
 * Deeply analyzes a mathematical function to extract key algebraic and geometric features:
 * - Linearity and slope
 * - Quadratic coefficients and vertex
 * - Intercepts (x and y)
 * - Table of values
 * - Step-by-step graphing guide in English and Khmer
 */
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
          // Bisection
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

  // 4. Generate Table of Values from -5 to 5
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

  // 5. Step-by-step guidance
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
