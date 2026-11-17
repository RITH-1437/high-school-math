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

const PRESETS = [
  { label: 'y = x + 2', expr: 'y = x + 2', group: 'linear', nameEn: 'Linear (Default)', nameKm: 'អនុគមន៍លីនេអ៊ែរ' },
  { label: 'y = x² − 4', expr: 'y = x^2 - 4', group: 'quadratic', nameEn: 'Parabola (Vertical)', nameKm: 'ប៉ារ៉ាបូលឈរ (U-shape)' },
  { label: 'y² = 4x', expr: 'y^2 = 4x', group: 'conics', nameEn: 'Parabola (Horizontal)', nameKm: 'ប៉ារ៉ាបូលដេក (y² = 4px)' },
  { label: 'x = y² − 4', expr: 'x = y^2 - 4', group: 'conics', nameEn: 'Parabola (x = y² - 4)', nameKm: 'ប៉ារ៉ាបូលដេក (x = y² - 4)' },
  { label: '(y²)/25 + x² = 25', expr: '(y^2)/25 + x^2 = 25', group: 'conics', nameEn: 'Ellipse (User Equation)', nameKm: 'អេលីប (a=25, b=5)' },
  { label: 'x² − y² = 4', expr: 'x^2 - y^2 = 4', group: 'conics', nameEn: 'Hyperbola (Horizontal)', nameKm: 'អ៊ីពែបូលដេក (x² - y² = 4)' },
  { label: '(y²)/25 − x² = 1', expr: '(y^2)/25 - x^2 = 1', group: 'conics', nameEn: 'Hyperbola (Vertical)', nameKm: 'អ៊ីពែបូលឈរ' },
  { label: 'x² + y² = 25', expr: 'x^2 + y^2 = 25', group: 'conics', nameEn: 'Circle (R = 5)', nameKm: 'រង្វង់ (R = 5)' },
  { label: 'y = 1 / x', expr: 'y = 1 / x', group: 'rational', nameEn: 'Hyperbola (Rational)', nameKm: 'អនុគមន៍ប្រភាគ (អ៊ីពែបូល)' },
  { label: 'y = sin(x)', expr: 'y = sin(x)', group: 'trig', nameEn: 'Sine wave', nameKm: 'អនុគមន៍ស៊ីនុស' },
  { label: 'y = √(x + 4)', expr: 'y = sqrt(x + 4)', group: 'root', nameEn: 'Square root', nameKm: 'អនុគមន៍ឫសការេ' },
  { label: 'y = |x − 2| − 1', expr: 'y = |x - 2| - 1', group: 'abs', nameEn: 'V-shape', nameKm: 'អនុគមន៍តម្លៃដាច់ខាត' },
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
  const [equation, setEquation] = useState('y = x + 2')
  const [rangePreset, setRangePreset] = useState<number>(10)
  const [tracerX, setTracerX] = useState(1)
  const [showTable, setShowTable] = useState(true)

  const pick = useCallback((en: string, km: string) => (isKhmer ? km : en), [isKhmer])

  const { parsedEq, analysis, parseError } = useMemo(() => {
    try {
      const parsed = parseEquation(equation)
      const analyzed = analyzeEquation(parsed, equation, [-rangePreset, rangePreset])
      return { parsedEq: parsed, analysis: analyzed, parseError: null }
    } catch (err: unknown) {
      const raw = err instanceof Error ? err.message : 'Invalid formula expression'
      return { parsedEq: null, analysis: null, parseError: isKhmer ? translateParseError(raw) : raw }
    }
  }, [equation, rangePreset, isKhmer])

  const graphSpec = useMemo<GraphSpec | null>(() => {
    if (!parsedEq || !analysis) return null

    const points: GraphPoint[] = []
    const lines: GraphLine[] = []

    // 1. Conic points and lines
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

      // Parabola directrix & axis of symmetry
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
      if (conic.axisOfSymmetry) {
        lines.push({
          kind: conic.axisOfSymmetry.axis === 'x' ? 'vertical' : 'horizontal',
          at: conic.axisOfSymmetry.val,
          label: pick(
            `Axis ${conic.axisOfSymmetry.axis} = ${conic.axisOfSymmetry.val}`,
            `អ័ក្សឆ្លុះ ${conic.axisOfSymmetry.axis} = ${num(conic.axisOfSymmetry.val)}`,
          ),
          color: 3,
          dashed: true,
        })
      }

      // Hyperbola asymptotes
      for (const asy of conic.asymptotes ?? []) {
        lines.push({
          kind: 'line',
          from: [-rangePreset, asy.fn(-rangePreset)],
          to: [rangePreset, asy.fn(rangePreset)],
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
        if (rx >= -rangePreset && rx <= rangePreset) {
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
        if (vx >= -rangePreset && vx <= rangePreset && vy >= -rangePreset && vy <= rangePreset) {
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
      if (Number.isFinite(tracerY) && tracerY >= -rangePreset * 1.5 && tracerY <= rangePreset * 1.5) {
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

    // Determine curves, parametric or implicit representation
    const curves =
      parsedEq.type === 'explicit_y' && parsedEq.fn1D && !analysis.isConic
        ? [
            {
              fn: parsedEq.fn1D,
              label: `y = ${clean}`,
              color: 1 as const,
            },
          ]
        : []

    const parametric =
      parsedEq.type === 'explicit_x' && parsedEq.fnX
        ? [
            {
              x: (t: number) => parsedEq.fnX!(t),
              y: (t: number) => t,
              t: [-rangePreset, rangePreset] as [number, number],
              label: equation,
              color: 1 as const,
            },
          ]
        : []

    // For conics or implicit equations, use Marching Squares implicit contour rendering
    const implicit =
      parsedEq.type === 'implicit' || analysis.isConic || (parsedEq.type === 'explicit_x' && parametric.length === 0)
        ? [
            {
              fn: parsedEq.fn2D,
              label: equation,
              color: 1 as const,
            },
          ]
        : []

    const xStep = rangePreset >= 25 ? 5 : rangePreset >= 15 ? 2 : 1
    const yStep = rangePreset >= 25 ? 5 : rangePreset >= 15 ? 2 : 1

    return {
      id: 'dynamic-graph-plotter',
      title: `Graph of ${clean}`,
      titleKm: `ក្រាហ្វនៃ ${clean}`,
      caption: `Exact coordinate plane graph with domain [−${rangePreset}, ${rangePreset}].`,
      captionKm: `ប្លង់កូអ័រដោនេពិតប្រាកដក្នុងដែនកំណត់ [−${rangePreset}, ${rangePreset}]។`,
      xRange: [-rangePreset, rangePreset],
      yRange: [-rangePreset, rangePreset],
      xStep,
      yStep,
      equalScale: true,
      curves,
      parametric,
      implicit,
      lines,
      points,
    }
  }, [parsedEq, analysis, equation, rangePreset, tracerX, pick, num])

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
          'Input any explicit or implicit equation including lines, parabolas (y = x² − 4, y² = 4x), hyperbolas (x² − y² = 4), ellipses ((y²)/25 + x² = 25), circles, and trigonometric functions to plot exact Cartesian graphs with complete geometric elements.',
          'បញ្ចូលសមីការទូទៅ ឬស្តង់ដាររួមមាន បន្ទាត់ ប៉ារ៉ាបូល (ឈរ ឬដេក y² = 4x) អ៊ីពែបូល (x² − y² = 4) អេលីប ((y²)/25 + x² = 25) រង្វង់ និងអនុគមន៍ត្រីកោណមាត្រ ដើម្បីបង្កើតក្រាហ្វកូអ័រដោនេ និងធាតុធរណីមាត្រពេញលេញ។',
        )}
      />

      <div className="page-wrap graph-page__content">
        {/* Top Control Bar: Equation Input & Preset Chips */}
        <section className="graph-controls-panel" aria-labelledby="controls-heading">
          <h2 id="controls-heading" className="visually-hidden">
            {pick('Equation Controls', 'ផ្ទាំងបញ្ជាសមីការ')}
          </h2>

          <div className="graph-input-card">
            <label htmlFor="eq-input" className="graph-input-label">
              <span className="graph-input-label__icon">
                <IconFunction size={18} />
              </span>
              <span>{pick('Enter Equation or Expression (e.g. conics, parabolas, hyperbolas):', 'បញ្ចូលសមីការ ឬកន្សោមគណិតវិទ្យា (កោនិក ប៉ារ៉ាបូល អ៊ីពែបូល អេលីប)៖')}</span>
            </label>

            <div className="graph-input-row">
              <div className="graph-input-wrapper">
                <input
                  id="eq-input"
                  type="text"
                  value={equation}
                  onChange={(e) => setEquation(e.target.value)}
                  placeholder={pick('e.g. (y^2)/25 + x^2 = 25, y^2 = 4x, x^2 - y^2 = 4', 'ឧ. (y^2)/25 + x^2 = 25, y^2 = 4x, x^2 - y^2 = 4')}
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

            {/* Preset chips */}
            <div className="graph-presets-bar">
              <span className="graph-presets-label">{pick('Presets:', 'គំរូសមីការ៖')}</span>
              <div className="graph-presets-list">
                {PRESETS.map((preset) => (
                  <button
                    key={preset.expr}
                    type="button"
                    onClick={() => {
                      setEquation(preset.expr)
                      if (preset.expr.includes('/25') || preset.expr.includes('25')) {
                        setRangePreset(30)
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
          </div>
        </section>

        {/* Main Grid: Graph Visualizer on Left/Center, Key Metrics on Right */}
        <div className="graph-grid-layout">
          {/* Main Visualizer Figure */}
          <div className="graph-viewport-column">
            <div className="graph-viewport-card">
              {/* Toolbar above the graph: Zoom/Range & Grid */}
              <div className="graph-toolbar">
                <div className="graph-toolbar__group">
                  <span className="graph-toolbar__label">
                    <IconZoom size={14} />
                    <span>{pick('Grid Viewport:', 'ទំហំដែនក្រឡា៖')}</span>
                  </span>
                  <div className="graph-toolbar__btn-group">
                    {([6, 10, 15, 30] as const).map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setRangePreset(r)}
                        className={`graph-range-btn${rangePreset === r ? ' is-active' : ''}`}
                      >
                        ±{num(r)}
                      </button>
                    ))}
                    {analysis?.suggestedRange && analysis.suggestedRange !== rangePreset && (
                      <button
                        type="button"
                        onClick={() => setRangePreset(analysis.suggestedRange!)}
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
                  onClick={() => {
                    setEquation('y = x + 2')
                    setRangePreset(10)
                    setTracerX(1)
                  }}
                  className="graph-reset-btn"
                  title={pick('Reset to y = x + 2', 'កំណត់ឡើងវិញ y = x + 2')}
                >
                  <IconRotate size={14} />
                  <span>{pick('Reset', 'កំណត់ឡើងវិញ')}</span>
                </button>
              </div>

              {/* Render the Exact SVG Graph */}
              {graphSpec ? (
                <div className="graph-render-wrapper">
                  <Graph spec={graphSpec} />
                </div>
              ) : (
                <div className="graph-empty-state">
                  <p>{pick('Please enter a valid equation to display the graph.', 'សូមបញ្ចូលសមីការត្រឹមត្រូវដើម្បីបង្ហាញក្រាហ្វ។')}</p>
                </div>
              )}

              {/* Interactive Tracer Slider */}
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
                    min={-rangePreset}
                    max={rangePreset}
                    step={0.5}
                    value={tracerX}
                    onChange={(e) => setTracerX(parseFloat(e.target.value))}
                    className="graph-tracer-slider"
                    aria-label={pick('Move tracer x along graph', 'រំកិលចំណុច x លើក្រាហ្វ')}
                  />
                  <div className="graph-tracer-scale">
                    <span>−{rangePreset}</span>
                    <span>0</span>
                    <span>+{rangePreset}</span>
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

                  {/* Conic Center or Vertex */}
                  {analysis.conic?.center && (
                    <li className="graph-prop-item">
                      <span className="graph-prop-item__label">{pick('Center C(h, k)', 'ផ្ចិត C(h, k)')}</span>
                      <strong className="graph-prop-item__val graph-prop-item__val--blue">
                        ({num(analysis.conic.center.x)}, {num(analysis.conic.center.y)})
                      </strong>
                    </li>
                  )}

                  {analysis.conic?.vertex && (
                    <li className="graph-prop-item">
                      <span className="graph-prop-item__label">{pick('Vertex V(h, k)', 'កំពូល V(h, k)')}</span>
                      <strong className="graph-prop-item__val graph-prop-item__val--gold">
                        ({num(analysis.conic.vertex.x)}, {num(analysis.conic.vertex.y)})
                      </strong>
                    </li>
                  )}

                  {/* Focus / Foci */}
                  {analysis.conic?.focus && (
                    <li className="graph-prop-item">
                      <span className="graph-prop-item__label">{pick('Focus F', 'កំណុំ F')}</span>
                      <strong className="graph-prop-item__val graph-prop-item__val--red">
                        ({num(analysis.conic.focus.x)}, {num(analysis.conic.focus.y)})
                      </strong>
                    </li>
                  )}

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

                  {/* Asymptotes for Hyperbola */}
                  {analysis.conic?.asymptotes && analysis.conic.asymptotes.length > 0 && (
                    <li className="graph-prop-item">
                      <span className="graph-prop-item__label">{pick('Asymptotes', 'អាស៊ីមតូត')}</span>
                      <strong className="graph-prop-item__val">
                        {analysis.conic.asymptotes.map((a) => a.label).join('; ')}
                      </strong>
                    </li>
                  )}

                  {/* Semi-axes & Eccentricity */}
                  {analysis.conic?.a !== undefined && (
                    <li className="graph-prop-item">
                      <span className="graph-prop-item__label">{pick('Semi-axes (a, b)', 'ពាក់កណ្ដាលអ័ក្ស (a, b)')}</span>
                      <strong className="graph-prop-item__val">
                        a = {num(analysis.conic.a)}, b = {num(analysis.conic.b ?? 0)}{' '}
                        {analysis.conic.e !== undefined && (
                          <span className="graph-prop-sub">(e = {num(analysis.conic.e)})</span>
                        )}
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
                                {pick(row.label, row.label === 'Vertex' ? 'កំពូល' : row.label === 'y-intercept' ? 'កាត់អ័ក្ស y' : 'កាត់អ័ក្ស x')}
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
