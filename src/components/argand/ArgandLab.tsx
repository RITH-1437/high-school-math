/**
 * Argand Plane Lab (បន្ទះពិសោធន៍ប្លង់អាកង់)
 * Interactive complex number visualizer for Grade 12 BacII.
 * MoEYS polar form: z = r(cosθ + isinθ)  — never re^{iθ}
 *
 * SVG coordinate system: W=500, H=500, centre at (250,250), SCALE=46px/unit
 * Range: [-5, 5] on both axes.
 */
import { useCallback, useRef, useState } from 'react'
import { MathBlock } from '../ui/Math'
import { useI18n } from '../../lib/i18n'

/* ------------------------------------------------------------------ */
/* SVG helpers                                                          */
/* ------------------------------------------------------------------ */
const W = 500
const H = 500
const CX = W / 2
const CY = H / 2
const SCALE = 46   // px per unit

function sx(x: number) { return CX + x * SCALE }
function sy(y: number) { return CY - y * SCALE }
function fx(svgX: number) { return (svgX - CX) / SCALE }
function fy(svgY: number) { return -(svgY - CY) / SCALE }

function clamp(v: number, lo: number, hi: number) { return Math.max(lo, Math.min(hi, v)) }
function fmt(n: number, dp = 3) { return n.toFixed(dp).replace(/\.?0+$/, '') || '0' }
function fmtDeg(r: number) { return fmt((r * 180) / Math.PI, 1) }

/* ------------------------------------------------------------------ */
/* Grid                                                                 */
/* ------------------------------------------------------------------ */
function ArgandGrid() {
  const ticks: React.ReactNode[] = []
  for (let i = -5; i <= 5; i++) {
    if (i === 0) continue
    ticks.push(
      <line key={`v${i}`} x1={sx(i)} y1={sy(-5)} x2={sx(i)} y2={sy(5)}
        stroke="var(--line)" strokeWidth={0.6} />,
      <line key={`h${i}`} x1={sx(-5)} y1={sy(i)} x2={sx(5)} y2={sy(i)}
        stroke="var(--line)" strokeWidth={0.6} />,
      <text key={`xl${i}`} x={sx(i)} y={sy(0) + 14} fontSize={9}
        textAnchor="middle" fill="var(--muted)" fontFamily="'Inter Variable',Inter,sans-serif">{i}</text>,
      <text key={`yl${i}`} x={sx(0) - 10} y={sy(i) + 3} fontSize={9}
        textAnchor="end" fill="var(--muted)" fontFamily="'Inter Variable',Inter,sans-serif">{i}</text>,
    )
  }
  return (
    <g>
      {ticks}
      {/* Axes */}
      <line x1={sx(-5)} y1={sy(0)} x2={sx(5)} y2={sy(0)} stroke="var(--line-strong)" strokeWidth={1.2} />
      <line x1={sx(0)} y1={sy(-5)} x2={sx(0)} y2={sy(5)} stroke="var(--line-strong)" strokeWidth={1.2} />
      {/* Axis labels */}
      <text x={sx(5) - 4} y={sy(0) - 7} fontSize={11} fill="var(--muted)"
        fontFamily="'Inter Variable',Inter,sans-serif" fontWeight={600}>Re</text>
      <text x={sx(0) + 7} y={sy(5) + 4} fontSize={11} fill="var(--muted)"
        fontFamily="'Inter Variable',Inter,sans-serif" fontWeight={600}>Im</text>
    </g>
  )
}

/* ------------------------------------------------------------------ */
/* Arc helper: draws argument arc from +Re axis to angle θ            */
/* ------------------------------------------------------------------ */
function ArgArc({ cx: pcx, cy: pcy, r, theta, color }: {
  cx: number; cy: number; r: number; theta: number; color: string
}) {
  if (Math.abs(r) < 0.05) return null
  const arcR = 28  // px radius for arc
  const x1 = pcx + arcR
  const y1 = pcy
  const x2 = pcx + arcR * Math.cos(-theta)   // SVG y is inverted
  const y2 = pcy + arcR * Math.sin(-theta)
  const large = Math.abs(theta) > Math.PI ? 1 : 0
  const sweep = theta > 0 ? 0 : 1   // counter-clockwise in SVG coords
  return (
    <path
      d={`M ${x1} ${y1} A ${arcR} ${arcR} 0 ${large} ${sweep} ${x2} ${y2}`}
      fill="none" stroke={color} strokeWidth={1.5} opacity={0.8}
    />
  )
}

/* ================================================================== */
/* Main component                                                       */
/* ================================================================== */
export function ArgandLab() {
  const { language } = useI18n()
  const isKm = language === 'km'
  const pick = (en: string, km: string) => (isKm ? km : en)

  // z = a + bi
  const [a, setA] = useState(2)
  const [b, setB] = useState(2)
  // z₂ for product demonstration
  const [a2, setA2] = useState(1)
  const [b2, setB2] = useState(1)
  const [showConjugate, setShowConjugate] = useState(false)
  const [showNegation, setShowNegation] = useState(false)
  const [showProduct, setShowProduct] = useState(false)

  const svgRef = useRef<SVGSVGElement>(null)
  const dragging = useRef(false)

  // Derived values for z₁
  const r = Math.sqrt(a * a + b * b)
  const theta = Math.atan2(b, a)   // argument in radians, range (-π, π]

  // Derived values for z₂ and z₁·z₂
  const r2 = Math.sqrt(a2 * a2 + b2 * b2)
  const theta2 = Math.atan2(b2, a2)
  // (a + bi)(a2 + b2i) = (aa2 - bb2) + (ab2 + ba2)i
  const productA = a * a2 - b * b2
  const productB = a * b2 + b * a2
  const rProduct = r * r2
  // Wrap to MoEYS principal argument range (-π, π]
  const rawProduct = theta + theta2
  const thetaProduct = rawProduct > Math.PI
    ? rawProduct - 2 * Math.PI
    : rawProduct <= -Math.PI
      ? rawProduct + 2 * Math.PI
      : rawProduct

  /* Polar form TeX (MoEYS: r(cosθ + isinθ), never re^{iθ}) */
  const polarTex = `z = ${fmt(r, 3)}(\\cos${fmtDeg(theta)}^{\\circ} + i\\sin${fmtDeg(theta)}^{\\circ})`

  /* ---------------------------------------------------------------- */
  /* Pointer handling                                                  */
  /* ---------------------------------------------------------------- */
  const handlePointer = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    if (!dragging.current) return
    const rect = svgRef.current?.getBoundingClientRect()
    if (!rect) return
    const rawX = fx((e.clientX - rect.left) * (W / rect.width))
    const rawY = fy((e.clientY - rect.top) * (H / rect.height))
    setA(clamp(parseFloat(rawX.toFixed(2)), -5, 5))
    setB(clamp(parseFloat(rawY.toFixed(2)), -5, 5))
  }, [])

  const onDown = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    dragging.current = true
    ;(e.currentTarget as SVGSVGElement).setPointerCapture(e.pointerId)
    handlePointer(e)
  }, [handlePointer])

  /* ---------------------------------------------------------------- */
  /* Render                                                            */
  /* ---------------------------------------------------------------- */
  const MAIN_COLOR   = '#2457A7'
  const CONJ_COLOR   = '#C83B45'
  const NEG_COLOR    = '#D6A84B'
  const PROD_COLOR   = '#0F7A5C'

  return (
    <div className="argand-lab">
      <div className="argand-lab__inner">

        {/* SVG plane */}
        <div className="argand-lab__svg-wrap">
          <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} className="argand-lab__svg"
            role="img"
            aria-label={pick(
              `Argand plane. z = ${fmt(a)} + ${fmt(b)}i, |z| = ${fmt(r)}, arg(z) = ${fmtDeg(theta)}°`,
              `ប្លង់អាកង់។ z = ${fmt(a)} + ${fmt(b)}i, |z| = ${fmt(r)}`,
            )}
            onPointerDown={onDown}
            onPointerMove={handlePointer}
            onPointerUp={() => { dragging.current = false }}
            onPointerCancel={() => { dragging.current = false }}>

            <ArgandGrid />

            {/* Modulus line from origin to z — always visible */}
            <line x1={sx(0)} y1={sy(0)} x2={sx(a)} y2={sy(b)}
              stroke={MAIN_COLOR} strokeWidth={2} opacity={0.7} />

            {/* Argument arc */}
            <ArgArc cx={sx(0)} cy={sy(0)} r={r} theta={theta} color={MAIN_COLOR} />

            {/* Conjugate z̄ = a - bi */}
            {showConjugate && (
              <g>
                <line x1={sx(0)} y1={sy(0)} x2={sx(a)} y2={sy(-b)}
                  stroke={CONJ_COLOR} strokeWidth={1.5} strokeDasharray="5 3" opacity={0.8} />
                <circle cx={sx(a)} cy={sy(-b)} r={5} fill={CONJ_COLOR} />
                <text x={sx(a) + 8} y={sy(-b) - 6} fontSize={11}
                  fontFamily="'Inter Variable',Inter,sans-serif" fontWeight={600} fill={CONJ_COLOR}>
                  z̄({fmt(a)}, {fmt(-b)})
                </text>
              </g>
            )}

            {/* Negation -z = -a - bi */}
            {showNegation && (
              <g>
                <line x1={sx(0)} y1={sy(0)} x2={sx(-a)} y2={sy(-b)}
                  stroke={NEG_COLOR} strokeWidth={1.5} strokeDasharray="5 3" opacity={0.8} />
                <circle cx={sx(-a)} cy={sy(-b)} r={5} fill={NEG_COLOR} />
                <text x={sx(-a) + 8} y={sy(-b) - 6} fontSize={11}
                  fontFamily="'Inter Variable',Inter,sans-serif" fontWeight={600} fill={NEG_COLOR}>
                  -z({fmt(-a)}, {fmt(-b)})
                </text>
              </g>
            )}

            {/* Product: z₂ and z₁·z₂ */}
            {showProduct && (
              <g>
                {/* z₂ vector */}
                <line x1={sx(0)} y1={sy(0)} x2={sx(a2)} y2={sy(b2)}
                  stroke={PROD_COLOR} strokeWidth={1.5} opacity={0.6} />
                <circle cx={sx(a2)} cy={sy(b2)} r={5} fill={PROD_COLOR} opacity={0.8} />
                <text x={sx(a2) + 8} y={sy(b2) - 6} fontSize={11}
                  fontFamily="'Inter Variable',Inter,sans-serif" fontWeight={600} fill={PROD_COLOR}>
                  z₂({fmt(a2)}, {fmt(b2)})
                </text>
                {/* z₁·z₂ result vector */}
                <line x1={sx(0)} y1={sy(0)} x2={sx(productA)} y2={sy(productB)}
                  stroke={PROD_COLOR} strokeWidth={2.5} opacity={0.9} />
                <ArgArc cx={sx(0)} cy={sy(0)} r={rProduct} theta={thetaProduct} color={PROD_COLOR} />
                <circle cx={sx(productA)} cy={sy(productB)} r={6} fill={PROD_COLOR} />
                <text x={sx(productA) + 8} y={sy(productB) - 6} fontSize={11}
                  fontFamily="'Inter Variable',Inter,sans-serif" fontWeight={600} fill={PROD_COLOR}>
                  z₁z₂({fmt(productA)}, {fmt(productB)})
                </text>
              </g>
            )}

            {/* Dashed rectangle to axes (shows a and b visually) */}
            <line x1={sx(a)} y1={sy(b)} x2={sx(a)} y2={sy(0)}
              stroke={MAIN_COLOR} strokeWidth={1} strokeDasharray="3 3" opacity={0.4} />
            <line x1={sx(a)} y1={sy(b)} x2={sx(0)} y2={sy(b)}
              stroke={MAIN_COLOR} strokeWidth={1} strokeDasharray="3 3" opacity={0.4} />

            {/* Main point z — draggable */}
            <circle cx={sx(a)} cy={sy(b)} r={9} fill={MAIN_COLOR} opacity={0.15} style={{ cursor: 'grab' }} />
            <circle cx={sx(a)} cy={sy(b)} r={6} fill={MAIN_COLOR} />
            <text x={sx(a) + 9} y={sy(b) - 7} fontSize={12}
              fontFamily="'Inter Variable',Inter,sans-serif" fontWeight={700} fill={MAIN_COLOR}>
              z({fmt(a)}, {fmt(b)})
            </text>

            {/* Drag hint */}
            <text x={sx(-4.8)} y={sy(4.6)} fontSize={10} fill="var(--muted)"
              fontFamily="'Inter Variable',Inter,sans-serif">
              {pick('Click or drag to place z', 'ចុច ឬអូស ដើម្បីដាក់ z')}
            </text>
          </svg>
        </div>

        {/* Panel */}
        <div className="argand-lab__panel">

          {/* Rectangular form */}
          <div className="argand-lab__formula">
            <MathBlock tex={`z = ${fmt(a)} + ${fmt(b)}i`} />
          </div>

          {/* Polar form (MoEYS notation) */}
          <div className="argand-lab__formula">
            <MathBlock tex={polarTex} />
          </div>

          {/* Key values */}
          <div className="argand-lab__values">
            <div className="argand-lab__val-row">
              <span className="argand-lab__val-label">{pick('Modulus |z|', 'ម៉ូឌុល |z|')}</span>
              <span className="argand-lab__val-num">{fmt(r)}</span>
            </div>
            <div className="argand-lab__val-row">
              <span className="argand-lab__val-label">{pick('Argument θ', 'អាគីម៉ង់ θ')}</span>
              <span className="argand-lab__val-num">{fmtDeg(theta)}° ({fmt(theta)} {pick('rad', 'រ៉ាដ')})</span>
            </div>
            <div className="argand-lab__val-row">
              <span className="argand-lab__val-label">{pick('Conjugate z̄', 'ចំនួនផ្ចិត z̄')}</span>
              <span className="argand-lab__val-num">{fmt(a)} - {fmt(b)}i</span>
            </div>
          </div>

          {/* Modulus formula */}
          <div className="argand-lab__formula argand-lab__formula--small">
            <MathBlock tex={`|z| = \\sqrt{(${fmt(a)})^2 + (${fmt(b)})^2} = ${fmt(r)}`} />
          </div>

          {/* Toggles */}
          <div className="argand-lab__toggles">
            <p className="argand-lab__toggle-label">{pick('Show on plane:', 'បង្ហាញលើប្លង់:')}</p>
            <div className="argand-lab__toggle-row">
              <button
                type="button"
                className={`argand-lab__toggle${showConjugate ? ' is-active' : ''}`}
                style={showConjugate ? { borderColor: CONJ_COLOR, color: CONJ_COLOR } : {}}
                onClick={() => setShowConjugate((v) => !v)}
              >
                {pick('Conjugate z̄', 'ចំនួនផ្ចិត z̄')}
              </button>
              <button
                type="button"
                className={`argand-lab__toggle${showNegation ? ' is-active' : ''}`}
                style={showNegation ? { borderColor: NEG_COLOR, color: NEG_COLOR } : {}}
                onClick={() => setShowNegation((v) => !v)}
              >
                {pick('Negation -z', 'ចំនួនអវិជ្ជមាន -z')}
              </button>
              <button
                type="button"
                className={`argand-lab__toggle${showProduct ? ' is-active' : ''}`}
                style={showProduct ? { borderColor: PROD_COLOR, color: PROD_COLOR } : {}}
                onClick={() => setShowProduct((v) => !v)}
              >
                {pick('Product z₁·z₂', 'គុណ z₁·z₂')}
              </button>
            </div>
          </div>

          {/* Conjugate identity */}
          {showConjugate && (
            <div className="argand-lab__identity" style={{ borderColor: CONJ_COLOR }}>
              <MathBlock tex={`z \\cdot \\bar{z} = |z|^2 = ${fmt(r * r, 3)}`} />
            </div>
          )}

          {/* Product BacII rules */}
          {showProduct && (
            <div className="argand-lab__identity" style={{ borderColor: PROD_COLOR }}>
              <MathBlock tex={`|z_1 z_2| = |z_1||z_2| = ${fmt(r)} \\times ${fmt(r2)} = ${fmt(rProduct)}`} />
              <MathBlock tex={`\\arg(z_1 z_2) = \\arg(z_1) + \\arg(z_2) = ${fmtDeg(theta)}^\\circ + ${fmtDeg(theta2)}^\\circ = ${fmtDeg(thetaProduct)}^\\circ`} />
              {/* z₂ sliders */}
              <div className="argand-lab__slider-row" style={{ marginTop: '0.5rem' }}>
                <label className="argand-lab__slider-label">
                  z₂: {pick('Real a₂', 'ពិត a₂')} = {fmt(a2, 2)}
                </label>
                <input type="range" min={-5} max={5} step={0.1} value={a2}
                  onChange={(e) => setA2(Number(e.target.value))}
                  className="argand-lab__range" />
              </div>
              <div className="argand-lab__slider-row">
                <label className="argand-lab__slider-label">
                  z₂: {pick('Imag b₂', 'ស្រមើ b₂')} = {fmt(b2, 2)}
                </label>
                <input type="range" min={-5} max={5} step={0.1} value={b2}
                  onChange={(e) => setB2(Number(e.target.value))}
                  className="argand-lab__range" />
              </div>
            </div>
          )}

          {/* Sliders for z₁ */}
          <div className="argand-lab__sliders">
            <div className="argand-lab__slider-row">
              <label className="argand-lab__slider-label">
                {showProduct ? `z₁: ${pick('Real a', 'ពិត a')}` : pick('Real part a', 'ផ្នែកពិត a')} = {fmt(a, 2)}
              </label>
              <input type="range" min={-5} max={5} step={0.1} value={a}
                onChange={(e) => setA(Number(e.target.value))}
                className="argand-lab__range" />
            </div>
            <div className="argand-lab__slider-row">
              <label className="argand-lab__slider-label">
                {showProduct ? `z₁: ${pick('Imag b', 'ស្រមើ b')}` : pick('Imaginary part b', 'ផ្នែកស្រមើ b')} = {fmt(b, 2)}
              </label>
              <input type="range" min={-5} max={5} step={0.1} value={b}
                onChange={(e) => setB(Number(e.target.value))}
                className="argand-lab__range" />
            </div>
          </div>

          {/* Terms */}
          <div className="argand-lab__terms">
            <span>z = {fmt(a, 2)} + {fmt(b, 2)}i</span>
            <span>r = {fmt(r)}</span>
            <span>θ = {fmtDeg(theta)}°</span>
          </div>
        </div>
      </div>
    </div>
  )
}
