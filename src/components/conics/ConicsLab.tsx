/**
 * Conic Sections Playground (បន្ទះពិសោធន៍កោនិក)
 * Interactive SVG lab for Parabola, Ellipse, and Hyperbola.
 * Grades 11-12 MoEYS curriculum.
 */
import { useState, useRef, useCallback } from 'react'
import { MathBlock } from '../ui/Math'
import { useI18n } from '../../lib/i18n'

type ConicTab = 'parabola' | 'ellipse' | 'hyperbola'

/* ------------------------------------------------------------------ */
/* SVG coordinate helpers                                               */
/* ------------------------------------------------------------------ */
const W = 500
const H = 400
const CX = W / 2
const CY = H / 2
const SCALE = 46

function sx(x: number): number { return CX + x * SCALE }
function sy(y: number): number { return CY - y * SCALE }
function fx(svgX: number): number { return (svgX - CX) / SCALE }
function fy(svgY: number): number { return -(svgY - CY) / SCALE }
function dist(x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
}
function fmt(n: number): string {
  return Math.abs(n) < 0.005 ? '0' : n.toFixed(2).replace(/\.?0+$/, '')
}

/* ------------------------------------------------------------------ */
/* Axis + Grid                                                          */
/* ------------------------------------------------------------------ */
function ConicGrid() {
  const ticks: React.ReactNode[] = []
  for (let i = -5; i <= 5; i++) {
    if (i === 0) continue
    ticks.push(
      <line key={`v${i}`} x1={sx(i)} y1={sy(-4.5)} x2={sx(i)} y2={sy(4.5)}
        stroke="var(--line)" strokeWidth={0.5} />,
      <line key={`h${i}`} x1={sx(-5)} y1={sy(i)} x2={sx(5)} y2={sy(i)}
        stroke="var(--line)" strokeWidth={0.5} />,
    )
  }
  return (
    <g>
      {ticks}
      {/* axes */}
      <line x1={sx(-5)} y1={sy(0)} x2={sx(5)} y2={sy(0)} stroke="var(--line-strong)" strokeWidth={1} />
      <line x1={sx(0)} y1={sy(-4.5)} x2={sx(0)} y2={sy(4.5)} stroke="var(--line-strong)" strokeWidth={1} />
    </g>
  )
}

/* ------------------------------------------------------------------ */
/* Point marker + label                                                 */
/* ------------------------------------------------------------------ */
function ConicPoint({ x, y, label, color = '#3978D6', r = 5 }: {
  x: number; y: number; label?: string; color?: string; r?: number
}) {
  const px = sx(x); const py = sy(y)
  return (
    <g>
      <circle cx={px} cy={py} r={r} fill={color} />
      {label && (
        <text x={px + 7} y={py - 5} fontSize={11} fontFamily="'Inter Variable',Inter,sans-serif"
          fontWeight={600} fill={color}>{label}</text>
      )}
    </g>
  )
}

/* ------------------------------------------------------------------ */
/* Dashed distance line                                                 */
/* ------------------------------------------------------------------ */
function DistLine({ x1, y1, x2, y2, color = '#3978D6' }: {
  x1: number; y1: number; x2: number; y2: number; color?: string
}) {
  return (
    <line x1={sx(x1)} y1={sy(y1)} x2={sx(x2)} y2={sy(y2)}
      stroke={color} strokeWidth={1.5} strokeDasharray="4 3" opacity={0.8} />
  )
}

/* ================================================================== */
/* PARABOLA                                                            */
/* ================================================================== */
function ParabolaLab({ isKm }: { isKm: boolean }) {
  const [p, setP] = useState(1.2)
  const [pT, setPT] = useState(1.5)      // x-coordinate of dragged point P
  const svgRef = useRef<SVGSVGElement>(null)
  const dragging = useRef(false)

  // Parabola: x² = 4py  =>  P(t) = (t, t²/(4p))
  const pX = pT
  const pY = (pT * pT) / (4 * p)
  const focusY = p
  const directrixY = -p

  const dPF = dist(pX, pY, 0, focusY)
  const dPD = pY - directrixY   // vertical distance to directrix

  // path for parabola
  const pts: string[] = []
  for (let t = -4.5; t <= 4.5; t += 0.08) {
    const x = t
    const y = (t * t) / (4 * p)
    if (y > 4.5) continue
    pts.push(`${sx(x).toFixed(1)},${sy(y).toFixed(1)}`)
  }

  const handlePointer = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    if (!dragging.current) return
    const rect = svgRef.current?.getBoundingClientRect()
    if (!rect) return
    const rawX = fx((e.clientX - rect.left) * (W / rect.width))
    setPT(Math.max(-4.4, Math.min(4.4, rawX)))
  }, [])

  return (
    <div className="conic-lab__inner">
      <div className="conic-lab__svg-wrap">
        <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} className="conic-lab__svg"
          onPointerDown={(e) => { dragging.current = true; (e.currentTarget as SVGSVGElement).setPointerCapture(e.pointerId); handlePointer(e) }}
          onPointerMove={handlePointer}
          onPointerUp={() => { dragging.current = false }}
          onPointerCancel={() => { dragging.current = false }}>
          <ConicGrid />
          {/* directrix */}
          <line x1={sx(-5)} y1={sy(directrixY)} x2={sx(5)} y2={sy(directrixY)}
            stroke="#C83B45" strokeWidth={1.5} strokeDasharray="6 4" opacity={0.75} />
          <text x={sx(3.8)} y={sy(directrixY) - 5} fontSize={11} fill="#C83B45"
            fontFamily="'Inter Variable',Inter,sans-serif" fontWeight={600}>
            {isKm ? 'បន្ទាត់ប្រាប់ទិស' : 'Directrix'} y={fmt(-p)}
          </text>
          {/* parabola */}
          <polyline points={pts.join(' ')} fill="none" stroke="#2457A7" strokeWidth={2.5} />
          {/* focus */}
          <ConicPoint x={0} y={focusY} label={`F(0,${fmt(p)})`} color="#D6A84B" />
          {/* locus lines */}
          <DistLine x1={pX} y1={pY} x2={0} y2={focusY} color="#D6A84B" />
          {/* vertical to directrix */}
          <line x1={sx(pX)} y1={sy(pY)} x2={sx(pX)} y2={sy(directrixY)}
            stroke="#C83B45" strokeWidth={1.5} strokeDasharray="4 3" opacity={0.8} />
          {/* draggable P */}
          <circle cx={sx(pX)} cy={sy(pY)} r={8} fill="#2457A7" opacity={0.18} />
          <ConicPoint x={pX} y={pY} label={`P(${fmt(pX)}, ${fmt(pY)})`} color="#2457A7" r={6} />
          <text x={sx(-4.8)} y={sy(4.2)} fontSize={10} fill="var(--muted)"
            fontFamily="'Inter Variable',Inter,sans-serif">
            {isKm ? 'អូសចំណុច P' : 'Drag point P'}
          </text>
        </svg>
      </div>

      <div className="conic-lab__panel">
        <div className="conic-lab__formula">
          <MathBlock tex={`x^2 = 4p(y) \\quad p = ${fmt(p)}`} />
        </div>

        <div className="conic-lab__slider-row">
          <label className="conic-lab__label">
            {isKm ? 'ប៉ារ៉ាម៉ែត្រ p' : 'Focal parameter p'} = {fmt(p)}
          </label>
          <input type="range" min={0.3} max={2.5} step={0.05} value={p}
            onChange={(e) => setP(Number(e.target.value))} className="conic-lab__range" />
        </div>

        <div className="conic-lab__distances">
          <div className="conic-lab__dist-row">
            <span className="conic-lab__dist-label" style={{ color: '#D6A84B' }}>
              d(P, F) =
            </span>
            <span className="conic-lab__dist-val">{dPF.toFixed(3)}</span>
          </div>
          <div className="conic-lab__dist-row">
            <span className="conic-lab__dist-label" style={{ color: '#C83B45' }}>
              d(P, {isKm ? 'បន្ទាត់ប្រាប់ទិស' : 'Directrix'}) =
            </span>
            <span className="conic-lab__dist-val">{dPD.toFixed(3)}</span>
          </div>
          <div className="conic-lab__locus-check" style={{ color: Math.abs(dPF - dPD) < 0.01 ? '#0F7A5C' : '#C83B45' }}>
            {isKm ? 'ចំងាយស្មើគ្នា' : 'Equal distances'}: d(P,F) = d(P,{isKm ? 'ប.ប.ទ' : 'dir'})
          </div>
        </div>

        <div className="conic-lab__terms">
          <span>{isKm ? 'កំណុំ' : 'Focus'} F(0, p)</span>
          <span>{isKm ? 'កំពូល' : 'Vertex'} (0, 0)</span>
          <span>{isKm ? 'ប.ប.ទ' : 'Directrix'} y = -p</span>
        </div>
      </div>
    </div>
  )
}

/* ================================================================== */
/* ELLIPSE                                                             */
/* ================================================================== */
function EllipseLab({ isKm }: { isKm: boolean }) {
  const [a, setA] = useState(2.8)
  const [ecc, setEcc] = useState(0.6)        // eccentricity e = c/a
  const [theta, setTheta] = useState(Math.PI / 4)
  const svgRef = useRef<SVGSVGElement>(null)
  const dragging = useRef(false)

  const c = a * ecc
  const b = Math.sqrt(Math.max(0.01, a * a - c * c))
  const pX = a * Math.cos(theta)
  const pY = b * Math.sin(theta)
  const d1 = dist(pX, pY, -c, 0)
  const d2 = dist(pX, pY, c, 0)

  // path for ellipse
  const epts: string[] = []
  for (let t = 0; t <= Math.PI * 2 + 0.01; t += 0.04) {
    epts.push(`${sx(a * Math.cos(t)).toFixed(1)},${sy(b * Math.sin(t)).toFixed(1)}`)
  }

  const handlePointer = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    if (!dragging.current) return
    const rect = svgRef.current?.getBoundingClientRect()
    if (!rect) return
    const mx = fx((e.clientX - rect.left) * (W / rect.width))
    const my = fy((e.clientY - rect.top) * (H / rect.height))
    setTheta(Math.atan2(my / b, mx / a))
  }, [b])

  return (
    <div className="conic-lab__inner">
      <div className="conic-lab__svg-wrap">
        <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} className="conic-lab__svg"
          onPointerDown={(e) => { dragging.current = true; (e.currentTarget as SVGSVGElement).setPointerCapture(e.pointerId); handlePointer(e) }}
          onPointerMove={handlePointer}
          onPointerUp={() => { dragging.current = false }}
          onPointerCancel={() => { dragging.current = false }}>
          <ConicGrid />
          {/* ellipse */}
          <polyline points={epts.join(' ')} fill="none" stroke="#2457A7" strokeWidth={2.5} />
          {/* foci */}
          <ConicPoint x={-c} y={0} label={`F₁(-${fmt(c)},0)`} color="#D6A84B" />
          <ConicPoint x={c} y={0} label={`F₂(${fmt(c)},0)`} color="#D6A84B" />
          {/* locus strings */}
          <DistLine x1={pX} y1={pY} x2={-c} y2={0} color="#D6A84B" />
          <DistLine x1={pX} y1={pY} x2={c} y2={0} color="#C83B45" />
          {/* P */}
          <circle cx={sx(pX)} cy={sy(pY)} r={8} fill="#2457A7" opacity={0.18} />
          <ConicPoint x={pX} y={pY} label={`P`} color="#2457A7" r={6} />
          <text x={sx(-4.8)} y={sy(4.2)} fontSize={10} fill="var(--muted)"
            fontFamily="'Inter Variable',Inter,sans-serif">
            {isKm ? 'អូសចំណុច P' : 'Drag point P'}
          </text>
        </svg>
      </div>

      <div className="conic-lab__panel">
        <div className="conic-lab__formula">
          <MathBlock tex={`\\frac{x^2}{${fmt(a)}^2} + \\frac{y^2}{${fmt(b)}^2} = 1`} />
        </div>

        <div className="conic-lab__slider-row">
          <label className="conic-lab__label">
            {isKm ? 'អ័ក្សវែង a' : 'Semi-major a'} = {fmt(a)}
          </label>
          <input type="range" min={1} max={4} step={0.1} value={a}
            onChange={(e) => setA(Number(e.target.value))} className="conic-lab__range" />
        </div>
        <div className="conic-lab__slider-row">
          <label className="conic-lab__label">
            {isKm ? 'អិចសង់ទ្រិស៊ីតេ e' : 'Eccentricity e'} = {fmt(ecc)}
          </label>
          <input type="range" min={0} max={0.95} step={0.01} value={ecc}
            onChange={(e) => setEcc(Number(e.target.value))} className="conic-lab__range" />
        </div>

        <div className="conic-lab__distances">
          <div className="conic-lab__dist-row">
            <span className="conic-lab__dist-label" style={{ color: '#D6A84B' }}>d(P, F₁) =</span>
            <span className="conic-lab__dist-val">{d1.toFixed(3)}</span>
          </div>
          <div className="conic-lab__dist-row">
            <span className="conic-lab__dist-label" style={{ color: '#C83B45' }}>d(P, F₂) =</span>
            <span className="conic-lab__dist-val">{d2.toFixed(3)}</span>
          </div>
          <div className="conic-lab__dist-row" style={{ fontWeight: 650 }}>
            <span className="conic-lab__dist-label">d₁ + d₂ =</span>
            <span className="conic-lab__dist-val" style={{ color: '#0F7A5C' }}>{(d1+d2).toFixed(3)} = 2a = {fmt(2*a)}</span>
          </div>
        </div>

        <div className="conic-lab__terms">
          <span>a = {fmt(a)}, b = {fmt(b)}, c = {fmt(c)}</span>
          <span>e = c/a = {fmt(ecc)}</span>
        </div>
      </div>
    </div>
  )
}

/* ================================================================== */
/* HYPERBOLA                                                           */
/* ================================================================== */
function HyperbolaLab({ isKm }: { isKm: boolean }) {
  const [a, setA] = useState(1.5)
  const [b, setB] = useState(1.2)
  const [pT, setPT] = useState(0.6)   // sinh param: P = (a*cosh(t), b*sinh(t)) right branch
  const svgRef = useRef<SVGSVGElement>(null)
  const dragging = useRef(false)

  const c = Math.sqrt(a * a + b * b)
  const e = c / a

  const pX = a * Math.cosh(pT)
  const pY = b * Math.sinh(pT)
  const d1 = dist(pX, pY, -c, 0)   // farther focus
  const d2 = dist(pX, pY, c, 0)    // nearer focus (right branch)

  // path for right branch
  const rPts: string[] = []
  const lPts: string[] = []
  for (let t = -1.9; t <= 1.9; t += 0.04) {
    const x = a * Math.cosh(t)
    const y = b * Math.sinh(t)
    if (Math.abs(sx(x) - CX) < W / 2 && Math.abs(sy(y) - CY) < H / 2 + 20) {
      rPts.push(`${sx(x).toFixed(1)},${sy(y).toFixed(1)}`)
      lPts.push(`${sx(-x).toFixed(1)},${sy(y).toFixed(1)}`)
    }
  }

  // asymptote endpoints
  const slope = b / a
  const asymPts1 = [[sx(-5), sy(-5 * slope)], [sx(5), sy(5 * slope)]]
  const asymPts2 = [[sx(-5), sy(5 * slope)], [sx(5), sy(-5 * slope)]]

  const handlePointer = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    if (!dragging.current) return
    const rect = svgRef.current?.getBoundingClientRect()
    if (!rect) return
    const my = fy((e.clientY - rect.top) * (H / rect.height))
    // from y = b*sinh(t), t = asinh(y/b)
    const t = Math.asinh(my / b)
    setPT(Math.max(-1.8, Math.min(1.8, t)))
  }, [b])

  return (
    <div className="conic-lab__inner">
      <div className="conic-lab__svg-wrap">
        <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} className="conic-lab__svg"
          onPointerDown={(e) => { dragging.current = true; (e.currentTarget as SVGSVGElement).setPointerCapture(e.pointerId); handlePointer(e) }}
          onPointerMove={handlePointer}
          onPointerUp={() => { dragging.current = false }}
          onPointerCancel={() => { dragging.current = false }}>
          <ConicGrid />
          {/* asymptotes */}
          <line x1={asymPts1[0][0]} y1={asymPts1[0][1]} x2={asymPts1[1][0]} y2={asymPts1[1][1]}
            stroke="#94A3B8" strokeWidth={1} strokeDasharray="5 4" opacity={0.6} />
          <line x1={asymPts2[0][0]} y1={asymPts2[0][1]} x2={asymPts2[1][0]} y2={asymPts2[1][1]}
            stroke="#94A3B8" strokeWidth={1} strokeDasharray="5 4" opacity={0.6} />
          <text x={sx(3.5)} y={sy(3.5*slope) - 7} fontSize={10} fill="var(--muted)"
            fontFamily="'Inter Variable',Inter,sans-serif">
            y=±{fmt(slope)}x
          </text>
          {/* hyperbola branches */}
          {rPts.length > 1 && <polyline points={rPts.join(' ')} fill="none" stroke="#2457A7" strokeWidth={2.5} />}
          {lPts.length > 1 && <polyline points={lPts.join(' ')} fill="none" stroke="#2457A7" strokeWidth={2.5} opacity={0.5} />}
          {/* foci */}
          <ConicPoint x={-c} y={0} label={`F₁`} color="#D6A84B" />
          <ConicPoint x={c} y={0} label={`F₂`} color="#D6A84B" />
          {/* locus lines */}
          <DistLine x1={pX} y1={pY} x2={-c} y2={0} color="#D6A84B" />
          <DistLine x1={pX} y1={pY} x2={c} y2={0} color="#C83B45" />
          {/* P on right branch */}
          <circle cx={sx(pX)} cy={sy(pY)} r={8} fill="#2457A7" opacity={0.18} />
          <ConicPoint x={pX} y={pY} label="P" color="#2457A7" r={6} />
          <text x={sx(-4.8)} y={sy(4.2)} fontSize={10} fill="var(--muted)"
            fontFamily="'Inter Variable',Inter,sans-serif">
            {isKm ? 'អូសចំណុច P (ការ Y)' : 'Drag P vertically'}
          </text>
        </svg>
      </div>

      <div className="conic-lab__panel">
        <div className="conic-lab__formula">
          <MathBlock tex={`\\frac{x^2}{${fmt(a)}^2} - \\frac{y^2}{${fmt(b)}^2} = 1`} />
        </div>

        <div className="conic-lab__slider-row">
          <label className="conic-lab__label">
            {isKm ? 'អ័ក្សទទឹង a' : 'Transverse a'} = {fmt(a)}
          </label>
          <input type="range" min={0.5} max={3} step={0.1} value={a}
            onChange={(e) => setA(Number(e.target.value))} className="conic-lab__range" />
        </div>
        <div className="conic-lab__slider-row">
          <label className="conic-lab__label">
            {isKm ? 'អ័ក្សប្ដូរ b' : 'Conjugate b'} = {fmt(b)}
          </label>
          <input type="range" min={0.5} max={3} step={0.1} value={b}
            onChange={(e) => setB(Number(e.target.value))} className="conic-lab__range" />
        </div>

        <div className="conic-lab__distances">
          <div className="conic-lab__dist-row">
            <span className="conic-lab__dist-label" style={{ color: '#D6A84B' }}>d(P, F₁) =</span>
            <span className="conic-lab__dist-val">{d1.toFixed(3)}</span>
          </div>
          <div className="conic-lab__dist-row">
            <span className="conic-lab__dist-label" style={{ color: '#C83B45' }}>d(P, F₂) =</span>
            <span className="conic-lab__dist-val">{d2.toFixed(3)}</span>
          </div>
          <div className="conic-lab__dist-row" style={{ fontWeight: 650 }}>
            <span className="conic-lab__dist-label">|d₁ - d₂| =</span>
            <span className="conic-lab__dist-val" style={{ color: '#0F7A5C' }}>
              {Math.abs(d1-d2).toFixed(3)} = 2a = {fmt(2*a)}
            </span>
          </div>
        </div>

        <div className="conic-lab__terms">
          <span>a={fmt(a)}, b={fmt(b)}, c={fmt(c)}</span>
          <span>e=c/a={fmt(e)}, e&gt;1</span>
          <span>{isKm ? 'អាស៊ីមតូត: y=±(b/a)x' : 'Asymptotes: y=±(b/a)x'}</span>
        </div>
      </div>
    </div>
  )
}

/* ================================================================== */
/* Main exported component                                             */
/* ================================================================== */
export function ConicsLab() {
  const [tab, setTab] = useState<ConicTab>('parabola')
  const { language } = useI18n()
  const isKm = language === 'km'

  const tabs: { id: ConicTab; en: string; km: string }[] = [
    { id: 'parabola', en: 'Parabola', km: 'ប៉ារ៉ាបូល' },
    { id: 'ellipse', en: 'Ellipse', km: 'អេលីប' },
    { id: 'hyperbola', en: 'Hyperbola', km: 'អ៊ីពែបូល' },
  ]

  return (
    <div className="conic-lab">
      <div className="tabs" role="tablist" aria-label={isKm ? 'ប្រភេទកោនិក' : 'Conic sections'}>
        {tabs.map(({ id, en, km }) => (
          <button
            key={id}
            role="tab"
            aria-selected={tab === id}
            className={`tab${tab === id ? ' is-active' : ''}`}
            onClick={() => setTab(id)}
          >
            {isKm ? km : en}
          </button>
        ))}
      </div>

      <div role="tabpanel">
        {tab === 'parabola' && <ParabolaLab isKm={isKm} />}
        {tab === 'ellipse' && <EllipseLab isKm={isKm} />}
        {tab === 'hyperbola' && <HyperbolaLab isKm={isKm} />}
      </div>
    </div>
  )
}
