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
import type { GraphPoint, GraphSpec } from '../types/content'
import {
  analyzeFunction,
  cleanEquationInput,
  parseMathExpression,
} from '../lib/math-parser'

const PRESETS = [
  { label: 'y = x + 2', expr: 'y = x + 2', group: 'linear', nameEn: 'Linear (Default)', nameKm: 'អនុគមន៍លីនេអ៊ែរ' },
  { label: 'y = 2x − 3', expr: 'y = 2x - 3', group: 'linear', nameEn: 'Steep slope', nameKm: 'មេគុណប្រាប់ទិសធំ' },
  { label: 'y = −0.5x + 2', expr: 'y = -0.5x + 2', group: 'linear', nameEn: 'Negative slope', nameKm: 'មេគុណប្រាប់ទិសអវិជ្ជមាន' },
  { label: 'y = x² − 4', expr: 'y = x^2 - 4', group: 'quadratic', nameEn: 'Parabola', nameKm: 'អនុគមន៍ដឺក្រេទី ២ (ប៉ារ៉ាបូល)' },
  { label: 'y = −x² + 2x + 3', expr: 'y = -x^2 + 2x + 3', group: 'quadratic', nameEn: 'Inverted parabola', nameKm: 'ប៉ារ៉ាបូលផ្កាប់ (a < 0)' },
  { label: 'y = x³ − 3x', expr: 'y = x^3 - 3x', group: 'polynomial', nameEn: 'Cubic', nameKm: 'អនុគមន៍ដឺក្រេទី ៣' },
  { label: 'y = 1 / x', expr: 'y = 1 / x', group: 'rational', nameEn: 'Hyperbola', nameKm: 'អនុគមន៍ប្រភាគ (អ៊ីពែបូល)' },
  { label: 'y = sin(x)', expr: 'y = sin(x)', group: 'trig', nameEn: 'Sine wave', nameKm: 'អនុគមន៍ស៊ីនុស' },
  { label: 'y = 2cos(x)', expr: 'y = 2*cos(x)', group: 'trig', nameEn: 'Cosine wave', nameKm: 'អនុគមន៍កូស៊ីនុស' },
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
  const [rangePreset, setRangePreset] = useState<6 | 10 | 15>(10)
  const [tracerX, setTracerX] = useState(1)
  const [showTable, setShowTable] = useState(true)

  const pick = useCallback((en: string, km: string) => (isKhmer ? km : en), [isKhmer])

  const { fn, analysis, parseError } = useMemo(() => {
    try {
      const parsedFn = parseMathExpression(equation)
      const analyzed = analyzeFunction(parsedFn, equation, [-rangePreset, rangePreset])
      return { fn: parsedFn, analysis: analyzed, parseError: null }
    } catch (err: unknown) {
      const raw = err instanceof Error ? err.message : 'Invalid formula expression'
      return { fn: null, analysis: null, parseError: isKhmer ? translateParseError(raw) : raw }
    }
  }, [equation, rangePreset, isKhmer])

  const graphSpec = useMemo<GraphSpec | null>(() => {
    if (!fn || !analysis) return null

    const points: GraphPoint[] = []

    // Y-intercept
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

    // Vertex / Extrema
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

    // Interactive Tracer Point
    const tracerY = fn(tracerX)
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

    const clean = cleanEquationInput(equation)

    return {
      id: 'dynamic-graph-plotter',
      title: `Graph of y = ${clean}`,
      titleKm: `ក្រាហ្វនៃ y = ${clean}`,
      caption: `Exact coordinate plane graph with domain [−${rangePreset}, ${rangePreset}].`,
      captionKm: `ប្លង់កូអ័រដោនេពិតប្រាកដក្នុងដែនកំណត់ [−${rangePreset}, ${rangePreset}]។`,
      xRange: [-rangePreset, rangePreset],
      yRange: [-rangePreset, rangePreset],
      xStep: rangePreset >= 15 ? 2 : 1,
      yStep: rangePreset >= 15 ? 2 : 1,
      equalScale: true,
      curves: [
        {
          fn,
          label: `y = ${clean}`,
          color: 1,
        },
      ],
      points,
    }
  }, [fn, analysis, equation, rangePreset, tracerX, pick])

  const tracerYVal = fn ? fn(tracerX) : NaN

  return (
    <div className="graph-page">
      <PageHero
        crumbs={[
          { label: pick('Home', 'ទំព័រដើម'), to: '/' },
          { label: pick('Function Grapher', 'ម៉ាស៊ីនគូសក្រាហ្វ') },
        ]}
        eyebrow={pick('Interactive Tool · Grades 7–12', 'ឧបករណ៍អន្តរកម្ម · ថ្នាក់ទី៧–១២')}
        title={pick('Interactive Function Grapher', 'ម៉ាស៊ីនគូសក្រាហ្វ និងវិភាគអនុគមន៍')}
        intro={pick(
          'Input any mathematical equation such as y = x + 2, y = x² − 4, or y = sin(x) to generate an exact Cartesian graph, identify intercepts, and explore coordinate tables.',
          'បញ្ចូលសមីការណាមួយដូចជា y = x + 2, y = x² − 4 ឬ y = sin(x) ដើម្បីបង្កើតក្រាហ្វកូអ័រដោនេពិតប្រាកដ រកចំណុចប្រសព្វ និងពិនិត្យមើលតារាងតម្លៃលេខ។',
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
              <span>{pick('Enter Equation or Expression:', 'បញ្ចូលសមីការ ឬកន្សោមគណិតវិទ្យា៖')}</span>
            </label>

            <div className="graph-input-row">
              <div className="graph-input-wrapper">
                <input
                  id="eq-input"
                  type="text"
                  value={equation}
                  onChange={(e) => setEquation(e.target.value)}
                  placeholder={pick('e.g. y = x + 2, y = 2x - 3, y = x^2 - 4', 'ឧ. y = x + 2, y = 2x - 3, y = x^2 - 4')}
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
                    onClick={() => setEquation(preset.expr)}
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
                    {([6, 10, 15] as const).map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setRangePreset(r)}
                        className={`graph-range-btn${rangePreset === r ? ' is-active' : ''}`}
                      >
                        ±{num(r)}
                      </button>
                    ))}
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
              {fn && (
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
                  <li className="graph-prop-item">
                    <span className="graph-prop-item__label">{pick('Function Type', 'ប្រភេទអនុគមន៍')}</span>
                    <strong className="graph-prop-item__val">
                      {analysis.isLinear
                        ? pick('Linear function (Line)', 'អនុគមន៍លីនេអ៊ែរ (បន្ទាត់)')
                        : analysis.isQuadratic
                          ? pick('Quadratic function (Parabola)', 'អនុគមន៍ដឺក្រេទី ២ (ប៉ារ៉ាបូល)')
                          : pick('Non-linear function', 'អនុគមន៍មិនលីនេអ៊ែរ')}
                    </strong>
                  </li>

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

                  <li className="graph-prop-item">
                    <span className="graph-prop-item__label">
                      {pick('y-intercept (crosses y-axis)', 'ចំណុចប្រសព្វអ័ក្ស y (អ័រដោនេ)')}
                    </span>
                    <strong className="graph-prop-item__val graph-prop-item__val--blue">
                      {analysis.yIntercept !== null ? `(0, ${num(analysis.yIntercept)})` : pick('None', 'គ្មាន')}
                    </strong>
                  </li>

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

                  {analysis.vertex && (
                    <li className="graph-prop-item">
                      <span className="graph-prop-item__label">{pick('Vertex (Extreme point)', 'កំពូលប៉ារ៉ាបូល')}</span>
                      <strong className="graph-prop-item__val graph-prop-item__val--gold">
                        ({num(analysis.vertex.x)}, {num(analysis.vertex.y)})
                      </strong>
                    </li>
                  )}

                  <li className="graph-prop-item">
                    <span className="graph-prop-item__label">{pick('Domain & Range', 'ដែនកំណត់ និងសំណុំតម្លៃ')}</span>
                    <strong className="graph-prop-item__val">
                      {analysis.isLinear
                        ? 'x ∈ ℝ, y ∈ ℝ'
                        : analysis.isQuadratic && analysis.vertex
                          ? analysis.extrema[0]?.kind === 'min'
                            ? `x ∈ ℝ, y ≥ ${num(analysis.vertex.y)}`
                            : `x ∈ ℝ, y ≤ ${num(analysis.vertex.y)}`
                          : 'x ∈ Df'}
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
                  <span>{pick('Table of Values (x vs y)', 'តារាងតម្លៃលេខ (x និង y)')}</span>
                </h3>
                <p className="graph-table-sub">
                  {pick(
                    'Values sampled around the origin. Plotting these coordinates gives the exact shape.',
                    'តម្លៃគណនានៅជុំវិញគល់កូអ័រដោនេ។ ដៅចំណុចទាំងនេះលើក្រដាសក្រឡាការ៉ូដើម្បីបានរាងក្រាហ្វពិតប្រាកដ។',
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
                    {analysis.table.map((row) => {
                      const isYInt = row.x === 0
                      const isXInt = row.y !== null && Math.abs(row.y) < 1e-6
                      const rowClass = isYInt ? 'is-yint' : isXInt ? 'is-xint' : ''
                      return (
                        <tr key={row.x} className={rowClass}>
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
                            {isYInt && (
                              <span className="tag-pill tag-pill--blue">
                                {pick('y-intercept', 'កាត់អ័ក្ស y')}
                              </span>
                            )}
                            {isXInt && (
                              <span className="tag-pill tag-pill--red">
                                {pick('x-intercept (root)', 'កាត់អ័ក្ស x (ឫស)')}
                              </span>
                            )}
                            {!isYInt && !isXInt && <span className="dim-dash">—</span>}
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
