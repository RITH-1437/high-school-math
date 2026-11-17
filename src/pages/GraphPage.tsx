import { useCallback, useMemo, useState } from 'react'
import { PageHero } from '../components/ui/PageHero'
import { Graph } from '../components/ui/Graph'
import { MathBlock } from '../components/ui/Math'
import {
  IconArrowRight,
  IconClose,
  IconFunction,
  IconGrid,
  IconRotate,
  IconZoom,
} from '../components/ui/Icons'
import { useI18n } from '../lib/i18n'
import type { GraphLine, GraphPoint, GraphSpec } from '../types/content'
import {
  analyzeEquation,
  cleanEquationInput,
  parseEquation,
} from '../lib/math-parser'

export type ConicMode = 'all' | 'parabola' | 'ellipse' | 'circle' | 'hyperbola' | 'functions'

export interface GraphPreset {
  label: string
  expr: string
  mode: ConicMode
  nameEn: string
  nameKm: string
  suggestedRange?: number
}

const PRESETS: GraphPreset[] = [
  // Parabola examples (Section 2)
  { label: 'y = x²', expr: 'y = x^2', mode: 'parabola', nameEn: 'Standard vertical parabola (y = x²)', nameKm: 'ប៉ារ៉ាបូលឈរស្តង់ដា (y = x²)' },
  { label: 'y = 2x² − 4', expr: 'y = 2x^2 - 4', mode: 'parabola', nameEn: 'Vertical parabola (y = 2x² − 4)', nameKm: 'ប៉ារ៉ាបូលឈរ (y = 2x² − 4)' },
  { label: 'y = (x − 2)² + 3', expr: 'y = (x - 2)^2 + 3', mode: 'parabola', nameEn: 'Vertex form (V(2, 3))', nameKm: 'ទម្រង់កំពូល V(2, 3)' },
  { label: 'x = (y − 1)²', expr: 'x = (y - 1)^2', mode: 'parabola', nameEn: 'Horizontal parabola (x = (y − 1)²)', nameKm: 'ប៉ារ៉ាបូលដេក (x = (y − 1)²)' },
  { label: 'x² = 8y', expr: 'x^2 = 8y', mode: 'parabola', nameEn: 'Focus-directrix form (x² = 8y, p = 2)', nameKm: 'ទម្រង់កំណុំ x² = 8y (p = 2)' },
  { label: 'y² = 4x', expr: 'y^2 = 4x', mode: 'parabola', nameEn: 'Standard horizontal (y² = 4px, p = 1)', nameKm: 'ប៉ារ៉ាបូលដេកស្តង់ដា (y² = 4x)' },
  { label: 'x = y² − 4', expr: 'x = y^2 - 4', mode: 'parabola', nameEn: 'Horizontal translated (x = y² − 4)', nameKm: 'ប៉ារ៉ាបូលដេករំកិល (x = y² − 4)' },

  // Ellipse examples (Section 3)
  { label: 'x²/9 + y²/4 = 1', expr: 'x^2/9 + y^2/4 = 1', mode: 'ellipse', nameEn: 'Standard horizontal ellipse (a = 3, b = 2)', nameKm: 'អេលីបដេក (a = 3, b = 2)' },
  { label: 'x²/16 + y²/9 = 1', expr: 'x^2/16 + y^2/9 = 1', mode: 'ellipse', nameEn: 'Horizontal ellipse (a = 4, b = 3)', nameKm: 'អេលីបដេក (a = 4, b = 3)' },
  { label: '(x − 2)²/25 + (y + 1)²/9 = 1', expr: '(x - 2)^2/25 + (y + 1)^2/9 = 1', mode: 'ellipse', nameEn: 'Translated horizontal ellipse C(2, −1)', nameKm: 'អេលីបរំកិល C(2, −1)' },
  { label: '(x − 1)²/4 + (y − 2)²/16 = 1', expr: '(x - 1)^2/4 + (y - 2)^2/16 = 1', mode: 'ellipse', nameEn: 'Translated vertical ellipse C(1, 2)', nameKm: 'អេលីបឈររំកិល C(1, 2)' },
  { label: '(y²)/25 + x² = 25', expr: '(y^2)/25 + x^2 = 25', mode: 'ellipse', nameEn: 'Vertical ellipse (a = 25, b = 5)', nameKm: 'អេលីបឈរ (a = 25, b = 5)', suggestedRange: 30 },
  { label: 'x²/25 + y²/9 = 1', expr: 'x^2/25 + y^2/9 = 1', mode: 'ellipse', nameEn: 'Horizontal ellipse (a = 5, b = 3)', nameKm: 'អេលីបដេក (a = 5, b = 3)' },

  // Circle examples
  { label: 'x² + y² = 4', expr: 'x^2 + y^2 = 4', mode: 'circle', nameEn: 'Standard circle (R = 2)', nameKm: 'រង្វង់ស្តង់ដា (R = 2)' },
  { label: 'x² + y² = 25', expr: 'x^2 + y^2 = 25', mode: 'circle', nameEn: 'Standard circle (R = 5)', nameKm: 'រង្វង់ស្តង់ដា (R = 5)' },
  { label: '(x − 2)² + (y + 3)² = 16', expr: '(x - 2)^2 + (y + 3)^2 = 16', mode: 'circle', nameEn: 'Translated circle C(2, −3), R = 4', nameKm: 'រង្វង់រំកិល C(2, −3), R = 4' },

  // Hyperbola examples
  { label: 'x²/9 − y²/4 = 1', expr: 'x^2/9 - y^2/4 = 1', mode: 'hyperbola', nameEn: 'Standard horizontal hyperbola', nameKm: 'អ៊ីពែបូលដេក (a = 3, b = 2)' },
  { label: '(y²)/25 − x² = 1', expr: '(y^2)/25 - x^2 = 1', mode: 'hyperbola', nameEn: 'Standard vertical hyperbola', nameKm: 'អ៊ីពែបូលឈរ (a = 5, b = 1)' },
  { label: 'x² − y² = 4', expr: 'x^2 - y^2 = 4', mode: 'hyperbola', nameEn: 'Equilateral hyperbola (x² − y² = 4)', nameKm: 'អ៊ីពែបូលសម័ង្ស (x² − y² = 4)' },
  { label: '(x − 2)²/16 − (y + 1)²/9 = 1', expr: '(x - 2)^2/16 - (y + 1)^2/9 = 1', mode: 'hyperbola', nameEn: 'Translated hyperbola C(2, −1)', nameKm: 'អ៊ីពែបូលរំកិល C(2, −1)' },

  // Basic functions
  { label: 'y = x + 2', expr: 'y = x + 2', mode: 'functions', nameEn: 'Linear function (Line)', nameKm: 'អនុគមន៍លីនេអ៊ែរ' },
  { label: 'y = 1 / x', expr: 'y = 1 / x', mode: 'functions', nameEn: 'Rational function (1/x)', nameKm: 'អនុគមន៍ប្រភាគ (1/x)' },
  { label: 'y = sin(x)', expr: 'y = sin(x)', mode: 'functions', nameEn: 'Sine wave', nameKm: 'អនុគមន៍ស៊ីនុស' },
  { label: 'y = √(x + 4)', expr: 'y = sqrt(x + 4)', mode: 'functions', nameEn: 'Square root', nameKm: 'អនុគមន៍ឫសការេ' },
  { label: 'y = |x − 2| − 1', expr: 'y = |x - 2| - 1', mode: 'functions', nameEn: 'Absolute value (V-shape)', nameKm: 'អនុគមន៍តម្លៃដាច់ខាត' },
]

const MODES: { id: ConicMode; nameEn: string; nameKm: string }[] = [
  { id: 'all', nameEn: 'All Types', nameKm: 'ទាំងអស់' },
  { id: 'parabola', nameEn: 'Parabola', nameKm: 'ប៉ារ៉ាបូល' },
  { id: 'ellipse', nameEn: 'Ellipse', nameKm: 'អេលីប' },
  { id: 'circle', nameEn: 'Circle', nameKm: 'រង្វង់' },
  { id: 'hyperbola', nameEn: 'Hyperbola', nameKm: 'អ៊ីពែបូល' },
  { id: 'functions', nameEn: 'Basic Functions', nameKm: 'អនុគមន៍មូលដ្ឋាន' },
]

/** The parser reports English diagnostics; mirror them for the Khmer interface. */
function translateParseError(message: string): string {
  if (message === 'Please enter a mathematical expression.') return 'សូមបញ្ចូលកន្សោមគណិតវិទ្យា។'
  if (message === 'Unexpected end of expression') return 'កន្សោមបានបញ្ចប់មិនពេញលេញ។'
  if (message === 'Missing closing parenthesis ")"') return 'ខ្វះវង់ក្រចកបិទ ")"។'
  if (message === 'Unexpected token') return 'តួអង្គមិនរំពឹងទុក។'
  if (message === 'Extra unexpected input after valid formula') return 'មានអត្ថបទបន្ថែមក្រោយរូបមន្តត្រឹមត្រូវ។'
  if (message === 'Invalid formula expression') return 'កន្សោមគណិតវិទ្យាមិនត្រឹមត្រូវ។'
  if (message === 'Equation can have at most one "=" sign.') return 'សមីការអាចមានសញ្ញា "=" តែមួយគត់។'
  if (message === 'Please enter both left and right sides of the equation.') return 'សូមបញ្ចូលអង្គសងខាងនៃសមីការ។'
  let match = message.match(/^Unexpected character: "(.+)"$/)
  if (match) return `តួអក្សរមិនរំពឹងទុក៖ "${match[1]}"។`
  match = message.match(/^Invalid number "(.+)"$/)
  if (match) return `លេខមិនត្រឹមត្រូវ "${match[1]}"។`
  match = message.match(/^Expected "\(" after function (\w+)$/)
  if (match) return `ត្រូវការ "(" បន្ទាប់ពីអនុគមន៍ ${match[1]}។`
  match = message.match(/^Missing "\)" after (\w+)\(\.\.\.$/)
  if (match) return `ខ្វះ ")" បន្ទាប់ពី ${match[1]}(...)។`
  match = message.match(/^Unknown variable or function: "(.+)"$/)
  if (match) return `អថេរ ឬអនុគមន៍មិនស្គាល់៖ "${match[1]}"។`
  return message
}

export default function GraphPage() {
  const { isKhmer, num } = useI18n()
  const [equation, setEquation] = useState('y = x^2')
  const [activeMode, setActiveMode] = useState<ConicMode>('all')
  const [viewportCenter, setViewportCenter] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [zoomSpan, setZoomSpan] = useState<number>(10)
  const [tracerX, setTracerX] = useState(1)
  const [showTable, setShowTable] = useState(true)

  const pick = useCallback((en: string, km: string) => (isKhmer ? km : en), [isKhmer])

  const { parsedEq, analysis, parseError } = useMemo(() => {
    try {
      const parsed = parseEquation(equation)
      const analyzed = analyzeEquation(parsed, equation, [
        viewportCenter.x - zoomSpan,
        viewportCenter.x + zoomSpan,
      ])
      return { parsedEq: parsed, analysis: analyzed, parseError: null }
    } catch (err: unknown) {
      const raw = err instanceof Error ? err.message : 'Invalid formula expression'
      return { parsedEq: null, analysis: null, parseError: isKhmer ? translateParseError(raw) : raw }
    }
  }, [equation, viewportCenter, zoomSpan, isKhmer])

  const handlePan = useCallback((dx: number, dy: number) => {
    setViewportCenter((prev) => ({
      x: Math.round((prev.x + dx) * 100) / 100,
      y: Math.round((prev.y + dy) * 100) / 100,
    }))
  }, [])

  const handleZoom = useCallback((factor: number) => {
    setZoomSpan((prev) => Math.max(2, Math.min(100, Math.round(prev * factor * 10) / 10)))
  }, [])

  const handleZoomIn = () => setZoomSpan((prev) => Math.max(2, Math.round(prev * 0.75 * 10) / 10))
  const handleZoomOut = () => setZoomSpan((prev) => Math.min(100, Math.round(prev * 1.33 * 10) / 10))

  const handleAutoFit = () => {
    if (analysis?.suggestedRange) {
      setZoomSpan(analysis.suggestedRange)
    }
    if (analysis?.conic?.center) {
      setViewportCenter({ x: analysis.conic.center.x, y: analysis.conic.center.y })
    } else if (analysis?.conic?.vertex) {
      setViewportCenter({ x: analysis.conic.vertex.x, y: analysis.conic.vertex.y })
    } else {
      setViewportCenter({ x: 0, y: 0 })
    }
  }

  const handleReset = () => {
    setEquation('y = x + 2')
    setViewportCenter({ x: 0, y: 0 })
    setZoomSpan(10)
    setTracerX(1)
  }

  const filteredPresets = useMemo(() => {
    if (activeMode === 'all') return PRESETS
    return PRESETS.filter((p) => p.mode === activeMode)
  }, [activeMode])

  const graphSpec = useMemo<GraphSpec | null>(() => {
    if (!parsedEq || !analysis) return null

    const points: GraphPoint[] = []
    const lines: GraphLine[] = []

    const x0 = viewportCenter.x - zoomSpan
    const x1 = viewportCenter.x + zoomSpan
    const y0 = viewportCenter.y - zoomSpan
    const y1 = viewportCenter.y + zoomSpan

    // 1. Conic points and reference lines
    if (analysis.conic) {
      const conic = analysis.conic

      // Center
      if (conic.center) {
        points.push({
          x: conic.center.x,
          y: conic.center.y,
          label: 'C',
          showCoords: true,
          color: 1,
          anchor: 'ne',
        })
      }

      // Vertex for parabola
      if (conic.vertex) {
        points.push({
          x: conic.vertex.x,
          y: conic.vertex.y,
          label: 'V',
          showCoords: true,
          color: 4,
          anchor: 'nw',
        })
      }

      // Focus for parabola
      if (conic.focus) {
        points.push({
          x: conic.focus.x,
          y: conic.focus.y,
          label: 'F',
          showCoords: true,
          color: 2,
          anchor: 'se',
        })
      }

      // Vertices for ellipse / hyperbola
      for (const [idx, v] of (conic.vertices ?? []).entries()) {
        points.push({
          x: v.x,
          y: v.y,
          label: `V${num(idx + 1)}`,
          showCoords: true,
          color: 4,
          anchor: 'nw',
        })
      }

      // Co-vertices for ellipse
      for (const [idx, b] of (conic.coVertices ?? []).entries()) {
        points.push({
          x: b.x,
          y: b.y,
          label: `B${num(idx + 1)}`,
          showCoords: true,
          color: 3,
          anchor: 'sw',
        })
      }

      // Foci for ellipse / hyperbola
      for (const [idx, f] of (conic.foci ?? []).entries()) {
        points.push({
          x: f.x,
          y: f.y,
          label: `F${num(idx + 1)}`,
          showCoords: true,
          color: 2,
          anchor: 'se',
        })
      }

      // Parabola directrix line
      if (conic.directrix) {
        lines.push({
          kind: conic.directrix.axis === 'x' ? 'vertical' : 'horizontal',
          at: conic.directrix.val,
          label: pick(
            `Directrix ${conic.directrix.axis} = ${conic.directrix.val}`,
            `បន្ទាត់ប្រាប់ទិស ${conic.directrix.axis} = ${num(conic.directrix.val)}`,
          ),
          color: 2,
          dashed: true,
        })
      }

      // Parabola axis of symmetry
      if (conic.axisOfSymmetry) {
        lines.push({
          kind: conic.axisOfSymmetry.axis === 'x' ? 'vertical' : 'horizontal',
          at: conic.axisOfSymmetry.val,
          label: pick(
            `Axis of symmetry ${conic.axisOfSymmetry.axis} = ${conic.axisOfSymmetry.val}`,
            `អ័ក្សឆ្លុះ ${conic.axisOfSymmetry.axis} = ${num(conic.axisOfSymmetry.val)}`,
          ),
          color: 3,
          dashed: true,
        })
      }

      // Ellipse major axis line segment
      if (conic.type === 'ellipse' && conic.vertices && conic.vertices.length >= 2) {
        lines.push({
          kind: 'segment',
          from: [conic.vertices[0].x, conic.vertices[0].y],
          to: [conic.vertices[1].x, conic.vertices[1].y],
          label: pick(
            `Major axis (2a = ${conic.majorAxis?.length ?? 0})`,
            `អ័ក្សធំ (2a = ${num(conic.majorAxis?.length ?? 0)})`,
          ),
          color: 1,
          dashed: true,
        })
      }

      // Ellipse minor axis line segment
      if (conic.type === 'ellipse' && conic.coVertices && conic.coVertices.length >= 2) {
        lines.push({
          kind: 'segment',
          from: [conic.coVertices[0].x, conic.coVertices[0].y],
          to: [conic.coVertices[1].x, conic.coVertices[1].y],
          label: pick(
            `Minor axis (2b = ${conic.minorAxis?.length ?? 0})`,
            `អ័ក្សតូច (2b = ${num(conic.minorAxis?.length ?? 0)})`,
          ),
          color: 3,
          dashed: true,
        })
      }

      // Ellipse directrices (if within viewport)
      if (conic.type === 'ellipse') {
        for (const dir of conic.directrices ?? []) {
          const val = dir.val
          if (dir.axis === 'x' && val >= x0 - 2 && val <= x1 + 2) {
            lines.push({
              kind: 'vertical',
              at: val,
              label: pick(`Directrix x = ${val}`, `បន្ទាត់ប្រាប់ទិស x = ${num(val)}`),
              color: 2,
              dashed: true,
            })
          } else if (dir.axis === 'y' && val >= y0 - 2 && val <= y1 + 2) {
            lines.push({
              kind: 'horizontal',
              at: val,
              label: pick(`Directrix y = ${val}`, `បន្ទាត់ប្រាប់ទិស y = ${num(val)}`),
              color: 2,
              dashed: true,
            })
          }
        }
      }

      // Hyperbola asymptotes
      for (const asy of conic.asymptotes ?? []) {
        lines.push({
          kind: 'line',
          from: [x0, asy.fn(x0)],
          to: [x1, asy.fn(x1)],
          label: asy.label,
          color: 3,
          dashed: true,
        })
      }
    } else {
      // General function points: Y-intercept
      if (analysis.yIntercept !== null) {
        points.push({
          x: 0,
          y: analysis.yIntercept,
          label: pick('y-int', 'ប្រសព្វ y'),
          showCoords: true,
          color: 1,
          anchor: 'ne',
        })
      }

      // X-intercepts
      for (const rx of analysis.xIntercepts) {
        if (rx >= x0 && rx <= x1) {
          points.push({
            x: rx,
            y: 0,
            label: pick('root', 'ប្រសព្វ x'),
            showCoords: true,
            color: 2,
            anchor: 'se',
          })
        }
      }

      // Vertex
      if (analysis.vertex) {
        const vx = analysis.vertex.x
        const vy = analysis.vertex.y
        if (vx >= x0 && vx <= x1 && vy >= y0 && vy <= y1) {
          points.push({
            x: vx,
            y: vy,
            label: pick('Vertex', 'កំពូល'),
            showCoords: true,
            color: 4,
            anchor: 'nw',
          })
        }
      }
    }

    // Interactive Tracer Point for explicit y=f(x)
    if (parsedEq.fn1D) {
      const tracerY = parsedEq.fn1D(tracerX)
      if (Number.isFinite(tracerY) && tracerY >= y0 * 1.5 && tracerY <= y1 * 1.5) {
        points.push({
          x: Math.round(tracerX * 100) / 100,
          y: Math.round(tracerY * 100) / 100,
          label: 'P',
          showCoords: true,
          color: 3,
          anchor: 'sw',
        })
      }
    }

    const clean = cleanEquationInput(equation)

    // Smooth curve representation:
    // 1. Explicit 1D functions (y = f(x)) are evaluated smoothly across the domain
    const curves =
      parsedEq.type === 'explicit_y' && parsedEq.fn1D
        ? [
            {
              fn: parsedEq.fn1D,
              label: `y = ${clean}`,
              color: 1 as const,
            },
          ]
        : []

    // 2. Explicit horizontal functions (x = g(y)) are drawn parametrically
    const parametric =
      parsedEq.type === 'explicit_x' && parsedEq.fnX
        ? [
            {
              x: (t: number) => parsedEq.fnX!(t),
              y: (t: number) => t,
              t: [y0, y1] as [number, number],
              label: equation,
              color: 1 as const,
            },
          ]
        : []

    // 3. Implicit 2D equations (ellipses, hyperbolas, circles, general F(x,y)=0)
    const implicit =
      parsedEq.type === 'implicit' || (parsedEq.type === 'explicit_x' && parametric.length === 0)
        ? [
            {
              fn: parsedEq.fn2D,
              label: equation,
              color: 1 as const,
            },
          ]
        : []

    const span = zoomSpan * 2
    const step = span > 40 ? 5 : span > 20 ? 2 : span > 8 ? 1 : 0.5

    return {
      id: 'dynamic-graph-plotter',
      title: `Graph of ${clean}`,
      titleKm: `ក្រាហ្វនៃ ${clean}`,
      caption: `Exact coordinate plane graph with domain [${formatVal(x0)}, ${formatVal(x1)}].`,
      captionKm: `ប្លង់កូអ័រដោនេពិតប្រាកដក្នុងដែនកំណត់ [${formatVal(x0)}, ${formatVal(x1)}]។`,
      xRange: [x0, x1],
      yRange: [y0, y1],
      xStep: step,
      yStep: step,
      equalScale: true,
      curves,
      parametric,
      implicit,
      lines,
      points,
    }
  }, [parsedEq, analysis, equation, viewportCenter, zoomSpan, tracerX, pick, num])

  const tracerYVal = parsedEq?.fn1D ? parsedEq.fn1D(tracerX) : NaN

  return (
    <div className="graph-page">
      <PageHero
        crumbs={[
          { label: pick('Home', 'ទំព័រដើម'), to: '/' },
          { label: pick('Function & Conics Grapher', 'ម៉ាស៊ីនគូសក្រាហ្វ និងកោនិក') },
        ]}
        eyebrow={pick('Interactive Tool · Grades 7–12 · Conics', 'ឧបករណ៍អន្តរកម្ម · ថ្នាក់ទី៧–១២ · កោនិក')}
        title={pick('Interactive Function & Conics Grapher', 'ម៉ាស៊ីនគូសក្រាហ្វ អនុគមន៍ និងកោនិក')}
        intro={pick(
          'Input any explicit or implicit equation including parabolas (y = x², x² = 8y, y² = 4x), ellipses (x²/9 + y²/4 = 1, (x−2)²/25 + (y+1)²/9 = 1), circles, hyperbolas, and functions. Features pan, zoom, coordinate inspection, and authentic Cambodian MoEYS geometric properties.',
          'បញ្ចូលសមីការទូទៅ ឬស្តង់ដាររួមមាន ប៉ារ៉ាបូល (y = x², x² = 8y, y² = 4x) អេលីប (x²/9 + y²/4 = 1, (x−2)²/25 + (y+1)²/9 = 1) រង្វង់ អ៊ីពែបូល និងអនុគមន៍នានា។ មានមុខងារអូសរំកិល ពង្រីកបង្រួម មើលកូអ័រដោនេ និងគណនាលក្ខណៈធរណីមាត្រតាមកម្មវិធីសិក្សាជាតិ។',
        )}
      />

      <div className="page-wrap graph-page__content">
        {/* Conic Sections Mode Selector Tabs */}
        <nav className="graph-mode-nav" aria-label={pick('Conic Sections Mode', 'ប្រភេទក្រាហ្វ និងកោនិក')}>
          <div className="graph-mode-selector" role="tablist">
            {MODES.map((m) => (
              <button
                key={m.id}
                type="button"
                role="tab"
                aria-selected={activeMode === m.id}
                onClick={() => setActiveMode(m.id)}
                className={`graph-mode-tab${activeMode === m.id ? ' is-active' : ''}`}
              >
                <span className="graph-mode-tab__name">{pick(m.nameEn, m.nameKm)}</span>
                <span className="graph-mode-tab__count">
                  {m.id === 'all' ? PRESETS.length : PRESETS.filter((p) => p.mode === m.id).length}
                </span>
              </button>
            ))}
          </div>
        </nav>

        {/* Top Control Bar: Equation Input & Filtered Preset Chips */}
        <section className="graph-controls-panel" aria-labelledby="controls-heading">
          <h2 id="controls-heading" className="visually-hidden">
            {pick('Equation Controls', 'ផ្ទាំងបញ្ជាសមីការ')}
          </h2>

          <div className="graph-input-card">
            <label htmlFor="eq-input" className="graph-input-label">
              <span className="graph-input-label__icon">
                <IconFunction size={18} />
              </span>
              <span>{pick('Enter Equation or Expression (e.g. conics, parabolas, ellipses, hyperbolas):', 'បញ្ចូលសមីការ ឬកន្សោមគណិតវិទ្យា (កោនិក ប៉ារ៉ាបូល អេលីប អ៊ីពែបូល)៖')}</span>
            </label>

            <div className="graph-input-row">
              <div className="graph-input-wrapper">
                <input
                  id="eq-input"
                  type="text"
                  value={equation}
                  onChange={(e) => setEquation(e.target.value)}
                  placeholder={pick('e.g. y = x^2, x^2 = 8y, x^2/9 + y^2/4 = 1, (x-2)^2/25 + (y+1)^2/9 = 1', 'ឧ. y = x^2, x^2 = 8y, x^2/9 + y^2/4 = 1')}
                  className={`graph-input-field${parseError ? ' has-error' : ''}`}
                  autoComplete="off"
                  spellCheck="false"
                />
                {equation && (
                  <button
                    type="button"
                    onClick={() => setEquation('')}
                    className="graph-input-clear"
                    aria-label={pick('Clear equation', 'លុបសមីការ')}
                  >
                    <IconClose size={16} />
                  </button>
                )}
              </div>

              {analysis?.latexExpr && !parseError && (
                <div className="graph-math-preview" aria-live="polite">
                  <span className="graph-math-preview__tag">{pick('Formula', 'រូបមន្ត')}</span>
                  <MathBlock tex={analysis.latexExpr} display={false} />
                </div>
              )}
            </div>

            {parseError && (
              <div className="graph-error-banner" role="alert">
                <strong>{pick('Equation Syntax Error:', 'កំហុសទម្រង់សមីការ៖')}</strong> {parseError}
              </div>
            )}

            {/* Filtered Preset chips */}
            <div className="graph-presets-bar">
              <span className="graph-presets-label">
                {pick(
                  `Presets (${activeMode === 'all' ? 'All' : MODES.find((m) => m.id === activeMode)?.nameEn}):`,
                  `គំរូសមីការ (${activeMode === 'all' ? 'ទាំងអស់' : MODES.find((m) => m.id === activeMode)?.nameKm})៖`,
                )}
              </span>
              <div className="graph-presets-list">
                {filteredPresets.map((preset) => (
                  <button
                    key={preset.expr}
                    type="button"
                    onClick={() => {
                      setEquation(preset.expr)
                      if (preset.suggestedRange) {
                        setZoomSpan(preset.suggestedRange)
                      }
                    }}
                    className={`preset-chip${equation.trim() === preset.expr ? ' is-active' : ''}`}
                    title={pick(preset.nameEn, preset.nameKm)}
                  >
                    <code>{preset.label}</code>
                  </button>
                ))}
              </div>
            </div>

            {/* Educational Quick Reference Card for Selected Mode */}
            {activeMode === 'parabola' && (
              <div className="graph-mode-guide">
                <div className="graph-mode-guide__header">
                  <strong>{pick('Parabola Quick Reference', 'មេរៀនសង្ខេបស្តីពីប៉ារ៉ាបូល')}</strong>
                  <span className="graph-mode-guide__badge">{pick('Grades 10–12 MoEYS', 'ថ្នាក់ទី១០–១២')}</span>
                </div>
                <div className="graph-mode-guide__grid">
                  <div className="graph-mode-guide__col">
                    <span className="guide-title">{pick('Vertical Parabola (អ័ក្សឈរ)', 'ប៉ារ៉ាបូលឈរ')}</span>
                    <code>(x − h)² = 4p(y − k)</code>
                    <p>{pick('Vertex V(h, k) · Focus F(h, k+p) · Directrix y = k−p · Axis x = h', 'កំពូល V(h, k) · កំណុំ F(h, k+p) · បន្ទាត់ប្រាប់ទិស y = k−p')}</p>
                  </div>
                  <div className="graph-mode-guide__col">
                    <span className="guide-title">{pick('Horizontal Parabola (អ័ក្សដេក)', 'ប៉ារ៉ាបូលដេក')}</span>
                    <code>(y − k)² = 4p(x − h)</code>
                    <p>{pick('Vertex V(h, k) · Focus F(h+p, k) · Directrix x = h−p · Axis y = k', 'កំពូល V(h, k) · កំណុំ F(h+p, k) · បន្ទាត់ប្រាប់ទិស x = h−p')}</p>
                  </div>
                </div>
              </div>
            )}

            {activeMode === 'ellipse' && (
              <div className="graph-mode-guide">
                <div className="graph-mode-guide__header">
                  <strong>{pick('Ellipse Quick Reference', 'មេរៀនសង្ខេបស្តីពីអេលីប')}</strong>
                  <span className="graph-mode-guide__badge">{pick('Grade 12 MoEYS', 'ថ្នាក់ទី១២')}</span>
                </div>
                <div className="graph-mode-guide__grid">
                  <div className="graph-mode-guide__col">
                    <span className="guide-title">{pick('Horizontal Ellipse (a > b)', 'អេលីបមានអ័ក្សធំដេក')}</span>
                    <code>(x − h)²/a² + (y − k)²/b² = 1</code>
                    <p>{pick('Center C(h, k) · Foci (h±c, k) · Vertices (h±a, k) · c² = a² − b²', 'ផ្ចិត C(h, k) · កំណុំ F(h±c, k) · កំពូល V(h±a, k)')}</p>
                  </div>
                  <div className="graph-mode-guide__col">
                    <span className="guide-title">{pick('Vertical Ellipse (a > b)', 'អេលីបមានអ័ក្សធំឈរ')}</span>
                    <code>(y − k)²/a² + (x − h)²/b² = 1</code>
                    <p>{pick('Center C(h, k) · Foci (h, k±c) · Vertices (h, k±a) · Eccentricity e = c/a < 1', 'ផ្ចិត C(h, k) · កំណុំ F(h, k±c) · អ៊ិចសង់ទ្រីស៊ីតេ e = c/a')}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Main Grid: Interactive Graph on Left/Center, Key Metrics on Right */}
        <div className="graph-grid-layout">
          {/* Main Visualizer Figure */}
          <div className="graph-viewport-column">
            <div className="graph-viewport-card">
              {/* Toolbar above the graph: Zoom, Range, Auto-fit & Reset */}
              <div className="graph-toolbar">
                <div className="graph-toolbar__group">
                  <span className="graph-toolbar__label">
                    <IconZoom size={14} />
                    <span>{pick('Viewport Controls:', 'ពង្រីក/បង្រួម និងដែនក្រឡា៖')}</span>
                  </span>

                  <div className="graph-toolbar__btn-group">
                    <button
                      type="button"
                      onClick={handleZoomIn}
                      className="graph-range-btn graph-zoom-btn"
                      title={pick('Zoom in (+)', 'ពង្រីក (+)')}
                      aria-label={pick('Zoom in', 'ពង្រីក')}
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={handleZoomOut}
                      className="graph-range-btn graph-zoom-btn"
                      title={pick('Zoom out (−)', 'បង្រួម (−)')}
                      aria-label={pick('Zoom out', 'បង្រួម')}
                    >
                      −
                    </button>
                    {([6, 10, 15, 30] as const).map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => {
                          setZoomSpan(r)
                          setViewportCenter({ x: 0, y: 0 })
                        }}
                        className={`graph-range-btn${zoomSpan === r && viewportCenter.x === 0 && viewportCenter.y === 0 ? ' is-active' : ''}`}
                      >
                        ±{num(r)}
                      </button>
                    ))}
                    {analysis?.suggestedRange && analysis.suggestedRange !== zoomSpan && (
                      <button
                        type="button"
                        onClick={handleAutoFit}
                        className="graph-range-btn is-suggested"
                        title={pick(
                          `Auto-fit to ±${analysis.suggestedRange}`,
                          `តម្រូវក្រឡាស្វ័យប្រវត្តិ ±${num(analysis.suggestedRange)}`,
                        )}
                      >
                        {pick(`Fit ±${analysis.suggestedRange}`, `តម្រូវ ±${num(analysis.suggestedRange)}`)}
                      </button>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="graph-reset-btn"
                  title={pick('Reset to y = x + 2', 'កំណត់ឡើងវិញ y = x + 2')}
                >
                  <IconRotate size={14} />
                  <span>{pick('Reset', 'កំណត់ឡើងវិញ')}</span>
                </button>
              </div>

              {/* Pan & Drag Instruction Note */}
              <div className="graph-interaction-hint" aria-hidden="true">
                <span>{pick('💡 Tip: Drag to pan · Scroll to zoom · Hover to inspect coordinates', '💡 ជំនួយ៖ អូសដើម្បីរំកិល · រមូរដើម្បីពង្រីកបង្រួម · ដាក់កណ្តុរលើដើម្បីមើលកូអ័រដោនេ')}</span>
              </div>

              {/* Render the Exact SVG Graph with Pan/Drag/Hover enabled */}
              {graphSpec ? (
                <div className="graph-render-wrapper">
                  <Graph
                    spec={graphSpec}
                    interactive
                    onPan={handlePan}
                    onZoom={handleZoom}
                  />
                </div>
              ) : (
                <div className="graph-empty-state">
                  <p>{pick('Please enter a valid equation to display the graph.', 'សូមបញ្ចូលសមីការត្រឹមត្រូវដើម្បីបង្ហាញក្រាហ្វ។')}</p>
                </div>
              )}

              {/* Interactive Tracer Slider for 1D Functions */}
              {parsedEq?.fn1D && (
                <div className="graph-tracer-box">
                  <div className="graph-tracer-header">
                    <div className="graph-tracer-title">
                      <span className="tracer-dot" aria-hidden="true" />
                      <strong>{pick('Interactive Point Tracer P(x, y)', 'រុករកចំណុចកូអ័រដោនេ P(x, y)')}</strong>
                    </div>
                    <div className="graph-tracer-coords">
                      <code>
                        x = {tracerX > 0 ? `+${tracerX}` : tracerX}, y ={' '}
                        {Number.isFinite(tracerYVal) ? (Math.round(tracerYVal * 100) / 100).toFixed(2) : 'undef'}
                      </code>
                    </div>
                  </div>
                  <input
                    type="range"
                    min={viewportCenter.x - zoomSpan}
                    max={viewportCenter.x + zoomSpan}
                    step={0.5}
                    value={tracerX}
                    onChange={(e) => setTracerX(parseFloat(e.target.value))}
                    className="graph-tracer-slider"
                    aria-label={pick('Move tracer x along graph', 'រំកិលចំណុច x លើក្រាហ្វ')}
                  />
                  <div className="graph-tracer-scale">
                    <span>{formatVal(viewportCenter.x - zoomSpan)}</span>
                    <span>{formatVal(viewportCenter.x)}</span>
                    <span>{formatVal(viewportCenter.x + zoomSpan)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Properties & Mathematical Insights */}
          <div className="graph-sidebar-column">
            {analysis && (
              <div className="graph-properties-card">
                <h3 className="graph-section-title">
                  <IconGrid size={16} />
                  <span>{pick('Key Mathematical Properties', 'លក្ខណៈគណិតវិទ្យាសំខាន់ៗ')}</span>
                </h3>

                <ul className="graph-props-list">
                  {/* Conic / Function Type */}
                  <li className="graph-prop-item">
                    <span className="graph-prop-item__label">{pick('Classification', 'ប្រភេទកោនិក / អនុគមន៍')}</span>
                    <strong className="graph-prop-item__val">
                      {analysis.conic
                        ? pick(analysis.conic.nameEn, analysis.conic.nameKm)
                        : analysis.isLinear
                          ? pick('Linear function (Line)', 'អនុគមន៍លីនេអ៊ែរ (បន្ទាត់)')
                          : analysis.isQuadratic
                            ? pick('Quadratic function (Parabola)', 'អនុគមន៍ដឺក្រេទី ២ (ប៉ារ៉ាបូល)')
                            : pick('Non-linear implicit curve', 'ខ្សែកោងមិនលីនេអ៊ែរ')}
                    </strong>
                  </li>

                  {/* Standard Form LaTeX */}
                  {analysis.conic?.standardLatex && (
                    <li className="graph-prop-item">
                      <span className="graph-prop-item__label">{pick('Standard Form', 'ទម្រង់ស្តង់ដា')}</span>
                      <strong className="graph-prop-item__val">
                        <MathBlock tex={analysis.conic.standardLatex} display={false} />
                      </strong>
                    </li>
                  )}

                  {/* Conic Center */}
                  {analysis.conic?.center && (
                    <li className="graph-prop-item">
                      <span className="graph-prop-item__label">{pick('Center C(h, k)', 'ផ្ចិត C(h, k)')}</span>
                      <strong className="graph-prop-item__val graph-prop-item__val--blue">
                        ({num(analysis.conic.center.x)}, {num(analysis.conic.center.y)})
                      </strong>
                    </li>
                  )}

                  {/* Vertex for Parabola */}
                  {analysis.conic?.vertex && (
                    <li className="graph-prop-item">
                      <span className="graph-prop-item__label">{pick('Vertex V(h, k)', 'កំពូល V(h, k)')}</span>
                      <strong className="graph-prop-item__val graph-prop-item__val--gold">
                        ({num(analysis.conic.vertex.x)}, {num(analysis.conic.vertex.y)})
                      </strong>
                    </li>
                  )}

                  {/* Opening Direction for Parabola */}
                  {analysis.conic?.openingDirection && (
                    <li className="graph-prop-item">
                      <span className="graph-prop-item__label">{pick('Opening Direction', 'ទិសបែរខ្នង')}</span>
                      <strong className="graph-prop-item__val">
                        {pick(
                          analysis.conic.openingDirection === 'upward'
                            ? 'Upward (U-shape)'
                            : analysis.conic.openingDirection === 'downward'
                              ? 'Downward'
                              : analysis.conic.openingDirection === 'right'
                                ? 'To the right (positive x)'
                                : 'To the left (negative x)',
                          analysis.conic.openingDirectionKm ?? '',
                        )}
                      </strong>
                    </li>
                  )}

                  {/* Focus for Parabola */}
                  {analysis.conic?.focus && (
                    <li className="graph-prop-item">
                      <span className="graph-prop-item__label">{pick('Focus F', 'កំណុំ F')}</span>
                      <strong className="graph-prop-item__val graph-prop-item__val--red">
                        ({num(analysis.conic.focus.x)}, {num(analysis.conic.focus.y)})
                      </strong>
                    </li>
                  )}

                  {/* Foci for Ellipse / Hyperbola */}
                  {analysis.conic?.foci && analysis.conic.foci.length > 0 && (
                    <li className="graph-prop-item">
                      <span className="graph-prop-item__label">{pick('Foci F₁, F₂', 'កំណុំ F₁, F₂')}</span>
                      <strong className="graph-prop-item__val graph-prop-item__val--red">
                        {analysis.conic.foci.map((f, i) => `F${num(i + 1)}(${num(f.x)}, ${num(f.y)})`).join('; ')}
                      </strong>
                    </li>
                  )}

                  {/* Vertices for Ellipse / Hyperbola */}
                  {analysis.conic?.vertices && analysis.conic.vertices.length > 0 && (
                    <li className="graph-prop-item">
                      <span className="graph-prop-item__label">{pick('Vertices V₁, V₂', 'កំពូល V₁, V₂')}</span>
                      <strong className="graph-prop-item__val graph-prop-item__val--gold">
                        {analysis.conic.vertices.map((v, i) => `V${num(i + 1)}(${num(v.x)}, ${num(v.y)})`).join('; ')}
                      </strong>
                    </li>
                  )}

                  {/* Co-vertices for Ellipse */}
                  {analysis.conic?.coVertices && analysis.conic.coVertices.length > 0 && (
                    <li className="graph-prop-item">
                      <span className="graph-prop-item__label">{pick('Co-vertices B₁, B₂', 'កំពូលអ័ក្សតូច B₁, B₂')}</span>
                      <strong className="graph-prop-item__val">
                        {analysis.conic.coVertices.map((b, i) => `B${num(i + 1)}(${num(b.x)}, ${num(b.y)})`).join('; ')}
                      </strong>
                    </li>
                  )}

                  {/* Directrix for Parabola */}
                  {analysis.conic?.directrix && (
                    <li className="graph-prop-item">
                      <span className="graph-prop-item__label">{pick('Directrix Line', 'បន្ទាត់ប្រាប់ទិស')}</span>
                      <strong className="graph-prop-item__val">
                        {analysis.conic.directrix.axis} = {num(analysis.conic.directrix.val)}
                      </strong>
                    </li>
                  )}

                  {/* Axis of symmetry for Parabola */}
                  {analysis.conic?.axisOfSymmetry && (
                    <li className="graph-prop-item">
                      <span className="graph-prop-item__label">{pick('Axis of Symmetry', 'អ័ក្សឆ្លុះ')}</span>
                      <strong className="graph-prop-item__val">
                        {analysis.conic.axisOfSymmetry.axis} = {num(analysis.conic.axisOfSymmetry.val)}
                      </strong>
                    </li>
                  )}

                  {/* Parameter p and Latus Rectum for Parabola */}
                  {analysis.conic?.p !== undefined && (
                    <li className="graph-prop-item">
                      <span className="graph-prop-item__label">{pick('Focal Parameter & Latus Rectum', 'ប៉ារ៉ាម៉ែត្រកំណុំ និងឡាទុសរ៉ិចទុម')}</span>
                      <strong className="graph-prop-item__val">
                        p = {num(analysis.conic.p)}, |4p| = {num(analysis.conic.latusRectum ?? Math.abs(analysis.conic.p * 4))}
                      </strong>
                    </li>
                  )}

                  {/* Major and Minor Axes for Ellipse */}
                  {analysis.conic?.majorAxis && (
                    <li className="graph-prop-item">
                      <span className="graph-prop-item__label">{pick('Major Axis (2a)', 'អ័ក្សធំ (2a)')}</span>
                      <strong className="graph-prop-item__val graph-prop-item__val--blue">
                        {analysis.conic.majorAxis.line} (2a = {num(analysis.conic.majorAxis.length)})
                      </strong>
                    </li>
                  )}

                  {analysis.conic?.minorAxis && (
                    <li className="graph-prop-item">
                      <span className="graph-prop-item__label">{pick('Minor Axis (2b)', 'អ័ក្សតូច (2b)')}</span>
                      <strong className="graph-prop-item__val">
                        {analysis.conic.minorAxis.line} (2b = {num(analysis.conic.minorAxis.length)})
                      </strong>
                    </li>
                  )}

                  {/* Semi-axes & Eccentricity */}
                  {analysis.conic?.a !== undefined && (
                    <li className="graph-prop-item">
                      <span className="graph-prop-item__label">{pick('Semi-axes (a, b) & Eccentricity', 'ពាក់កណ្ដាលអ័ក្ស (a, b) និងអ៊ិចសង់ទ្រីស៊ីតេ')}</span>
                      <strong className="graph-prop-item__val">
                        a = {num(analysis.conic.a)}, b = {num(analysis.conic.b ?? 0)}{' '}
                        {analysis.conic.e !== undefined && (
                          <span className="graph-prop-sub">(e = {num(analysis.conic.e)})</span>
                        )}
                      </strong>
                    </li>
                  )}

                  {/* Directrices for Ellipse */}
                  {analysis.conic?.directrices && analysis.conic.directrices.length > 0 && (
                    <li className="graph-prop-item">
                      <span className="graph-prop-item__label">{pick('Directrices', 'បន្ទាត់ប្រាប់ទិស')}</span>
                      <strong className="graph-prop-item__val">
                        {analysis.conic.directrices.map((d) => `${d.axis} = ${num(d.val)}`).join('; ')}
                      </strong>
                    </li>
                  )}

                  {/* Asymptotes for Hyperbola */}
                  {analysis.conic?.asymptotes && analysis.conic.asymptotes.length > 0 && (
                    <li className="graph-prop-item">
                      <span className="graph-prop-item__label">{pick('Asymptotes', 'អាស៊ីមតូត')}</span>
                      <strong className="graph-prop-item__val">
                        {analysis.conic.asymptotes.map((a) => a.label).join('; ')}
                      </strong>
                    </li>
                  )}

                  {/* Domain & Range */}
                  {analysis.conic?.domain && (
                    <li className="graph-prop-item">
                      <span className="graph-prop-item__label">{pick('Domain & Range', 'ដែនកំណត់ និងសំណុំតម្លៃ')}</span>
                      <strong className="graph-prop-item__val">
                        D = {analysis.conic.domain}, R = {analysis.conic.range}
                      </strong>
                    </li>
                  )}

                  {/* Linear Slope */}
                  {analysis.isLinear && analysis.slope !== null && (
                    <li className="graph-prop-item">
                      <span className="graph-prop-item__label">{pick('Slope (m)', 'មេគុណប្រាប់ទិស (m)')}</span>
                      <strong className="graph-prop-item__val">
                        m = {num(analysis.slope)}{' '}
                        <span className="graph-prop-sub">
                          ({analysis.slope > 0 ? pick('Ascending', 'ឡើង') : analysis.slope < 0 ? pick('Descending', 'ចុះ') : pick('Horizontal', 'ដេក')})
                        </span>
                      </strong>
                    </li>
                  )}

                  {/* Y-intercept */}
                  <li className="graph-prop-item">
                    <span className="graph-prop-item__label">
                      {pick('y-intercept (crosses y-axis)', 'ចំណុចប្រសព្វអ័ក្ស y (អ័រដោនេ)')}
                    </span>
                    <strong className="graph-prop-item__val graph-prop-item__val--blue">
                      {analysis.yIntercepts && analysis.yIntercepts.length > 0
                        ? analysis.yIntercepts.map((ry) => `(0, ${num(ry)})`).join(', ')
                        : analysis.yIntercept !== null
                          ? `(0, ${num(analysis.yIntercept)})`
                          : pick('None in viewport', 'គ្មានក្នុងដែននេះ')}
                    </strong>
                  </li>

                  {/* X-intercept */}
                  <li className="graph-prop-item">
                    <span className="graph-prop-item__label">
                      {pick('x-intercept / Roots (crosses x-axis)', 'ចំណុចប្រសព្វអ័ក្ស x (ឫស)')}
                    </span>
                    <strong className="graph-prop-item__val graph-prop-item__val--red">
                      {analysis.xIntercepts.length > 0
                        ? analysis.xIntercepts.map((rx) => `(${num(rx)}, 0)`).join(', ')
                        : pick('No real root in viewport', 'គ្មានឫសក្នុងដែននេះ')}
                    </strong>
                  </li>
                </ul>
              </div>
            )}

            {/* Step-by-Step Graphing Instructions */}
            {analysis && (
              <div className="graph-steps-card">
                <h3 className="graph-section-title">
                  <IconArrowRight size={16} />
                  <span>{pick('How to Plot This Graph by Hand', 'របៀបគូសក្រាហ្វនេះនៅលើក្រដាស')}</span>
                </h3>
                <ol className="graph-steps-list">
                  {(isKhmer ? analysis.stepsKm : analysis.stepsEn).map((step, idx) => (
                    <li key={idx} className="graph-step-item">
                      <span className="graph-step-badge">{num(idx + 1)}</span>
                      <span className="graph-step-text">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Section: Table of Values */}
        {analysis && (
          <section className="graph-table-section" aria-labelledby="table-heading">
            <div className="graph-table-header">
              <div>
                <h3 id="table-heading" className="graph-section-title">
                  <span>{pick('Table of Coordinates & Key Points', 'តារាងតម្លៃលេខ និងចំណុចសំខាន់ៗ')}</span>
                </h3>
                <p className="graph-table-sub">
                  {pick(
                    'Exact coordinates of vertices, intercepts, and points satisfying the equation. Plotting these coordinates gives the exact curve.',
                    'កូអ័រដោនេពិតប្រាកដនៃកំពូល ចំណុចកាត់អ័ក្ស និងចំណុចនានាដែលផ្ទៀងផ្ទាត់សមីការ។ ដៅចំណុចទាំងនេះលើក្រដាសដើម្បីបានរាងក្រាហ្វពិតប្រាកដ។',
                  )}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowTable(!showTable)}
                className="graph-toggle-table-btn"
              >
                {showTable ? pick('Hide table', 'លាក់តារាង') : pick('Show table', 'បង្ហាញតារាង')}
              </button>
            </div>

            {showTable && (
              <div className="graph-table-container">
                <table className="graph-table">
                  <thead>
                    <tr>
                      <th scope="col" className="col-x">x</th>
                      <th scope="col" className="col-y">y</th>
                      <th scope="col" className="col-coords">(x, y)</th>
                      <th scope="col" className="col-notes">{pick('Significance', 'ចំណាំ')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analysis.table.map((row, idx) => {
                      const isYInt = row.x === 0 && row.y !== null
                      const isXInt = row.y === 0
                      const rowClass = isYInt ? 'is-yint' : isXInt ? 'is-xint' : ''
                      return (
                        <tr key={idx} className={rowClass}>
                          <td className="col-x">
                            <strong>{num(row.x)}</strong>
                          </td>
                          <td className="col-y">
                            {row.y !== null ? num(row.y) : <em className="undef">{pick('Undefined', 'មិនកំណត់')}</em>}
                          </td>
                          <td className="col-coords">
                            <code>
                              ({num(row.x)}, {row.y !== null ? num(row.y) : '—'})
                            </code>
                          </td>
                          <td className="col-notes">
                            {row.label ? (
                              <span className="tag-pill tag-pill--blue">
                                {pick(
                                  row.label,
                                  row.label === 'Vertex'
                                    ? 'កំពូល'
                                    : row.label === 'y-intercept'
                                      ? 'កាត់អ័ក្ស y'
                                      : 'កាត់អ័ក្ស x',
                                )}
                              </span>
                            ) : isYInt ? (
                              <span className="tag-pill tag-pill--blue">
                                {pick('y-intercept', 'កាត់អ័ក្ស y')}
                              </span>
                            ) : isXInt ? (
                              <span className="tag-pill tag-pill--red">
                                {pick('x-intercept (root)', 'កាត់អ័ក្ស x (ឫស)')}
                              </span>
                            ) : (
                              <span className="dim-dash">—</span>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  )
}

function formatVal(v: number): string {
  const rounded = Math.round(v * 100) / 100
  return Object.is(rounded, -0) ? '0' : String(rounded)
}
