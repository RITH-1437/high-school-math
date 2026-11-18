/**
 * Volume of Revolution Lab (បន្ទះពិសោធន៍បរិមាណវិលបង្វិល)
 * Interactive 3D canvas: V = pi * integral_a^b [f(x)]^2 dx
 * Grade 12 BacII core. MoEYS curriculum.
 *
 * Canvas renderer mirrors the custom pipeline in Shape3D.tsx:
 *   - rotatePoint (yaw/pitch)
 *   - perspective project
 *   - painter's algorithm (sort by avgZ)
 *   - no Three.js / WebGL
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { MathBlock } from '../ui/Math'
import { useI18n } from '../../lib/i18n'

type FuncId = 'x2' | 'sqrtx' | 'x'
type Vec3 = [number, number, number]

/* ------------------------------------------------------------------ */
/* Math helpers                                                         */
/* ------------------------------------------------------------------ */
function getFunc(id: FuncId): (x: number) => number {
  if (id === 'x2') return (x) => x * x
  if (id === 'sqrtx') return (x) => Math.sqrt(Math.max(0, x))
  return (x) => x  // y = x
}

/** Simpson's composite rule, n must be even */
function integrate(f: (x: number) => number, a: number, b: number, n = 200): number {
  if (b <= a + 1e-9) return 0
  const even = n % 2 === 0 ? n : n + 1
  const h = (b - a) / even
  let sum = f(a) + f(b)
  for (let i = 1; i < even; i++) {
    sum += (i % 2 === 0 ? 2 : 4) * f(a + i * h)
  }
  return (h / 3) * sum
}

function computeVolume(f: (x: number) => number, a: number, b: number): number {
  return Math.PI * integrate((x) => f(x) ** 2, a, b)
}

/** Returns KaTeX for the closed-form V when a=0 */
function closedFormTex(id: FuncId, b: number): string | null {
  const bFmt = b.toFixed(2).replace(/\.?0+$/, '')
  if (id === 'x2') return `\\frac{\\pi b^5}{5} = \\frac{\\pi \\cdot ${bFmt}^5}{5}`
  if (id === 'sqrtx') return `\\frac{\\pi b^2}{2} = \\frac{\\pi \\cdot ${bFmt}^2}{2}`
  if (id === 'x') return `\\frac{\\pi b^3}{3} = \\frac{\\pi \\cdot ${bFmt}^3}{3}`
  return null
}

function fmt(n: number, dp = 4): string {
  return n.toFixed(dp).replace(/\.?0+$/, '')
}

/* ------------------------------------------------------------------ */
/* Geometry helpers (same pattern as Shape3D.tsx)                      */
/* ------------------------------------------------------------------ */
function normalOf(pts: Vec3[]): Vec3 {
  if (pts.length < 3) return [0, 0, 1]
  const ab: Vec3 = [pts[1][0] - pts[0][0], pts[1][1] - pts[0][1], pts[1][2] - pts[0][2]]
  const ac: Vec3 = [pts[2][0] - pts[0][0], pts[2][1] - pts[0][1], pts[2][2] - pts[0][2]]
  const n: Vec3 = [
    ab[1] * ac[2] - ab[2] * ac[1],
    ab[2] * ac[0] - ab[0] * ac[2],
    ab[0] * ac[1] - ab[1] * ac[0],
  ]
  const len = Math.hypot(...n) || 1
  return [n[0] / len, n[1] / len, n[2] / len]
}

function rotatePoint(p: Vec3, yaw: number, pitch: number): Vec3 {
  const cosY = Math.cos(yaw), sinY = Math.sin(yaw)
  const x1 = p[0] * cosY + p[2] * sinY
  const z1 = -p[0] * sinY + p[2] * cosY
  const cosP = Math.cos(pitch), sinP = Math.sin(pitch)
  return [x1, p[1] * cosP - z1 * sinP, p[1] * sinP + z1 * cosP]
}

/* ------------------------------------------------------------------ */
/* Revolution mesh                                                     */
/* ------------------------------------------------------------------ */
const N_RINGS = 44   // x-axis steps
const N_SEGS  = 30   // circumference steps

interface RevMesh {
  vertices: Vec3[]
  faces: number[][]
}

function buildRevolutionMesh(
  f: (x: number) => number,
  a: number,
  b: number,
  progress: number,
): RevMesh {
  const sweepB = a + (b - a) * Math.max(0, Math.min(1, progress))
  if (sweepB - a < 1e-4) return { vertices: [], faces: [] }

  const nRings = Math.max(2, Math.round(N_RINGS * progress))
  const mcx = (a + b) / 2  // mesh center x (keep solid centered at origin)

  const vertices: Vec3[] = []
  const faces: number[][] = []

  // Ring vertices
  for (let i = 0; i <= nRings; i++) {
    const x = a + (sweepB - a) * (i / nRings)
    const r = Math.max(0, f(x))
    for (let j = 0; j < N_SEGS; j++) {
      const angle = (j / N_SEGS) * Math.PI * 2
      vertices.push([x - mcx, r * Math.cos(angle), r * Math.sin(angle)])
    }
  }

  // Side quads
  for (let i = 0; i < nRings; i++) {
    for (let j = 0; j < N_SEGS; j++) {
      const nxt = (j + 1) % N_SEGS
      faces.push([
        i * N_SEGS + j,
        i * N_SEGS + nxt,
        (i + 1) * N_SEGS + nxt,
        (i + 1) * N_SEGS + j,
      ])
    }
  }

  // Start cap (at x=a)
  const startCtr = vertices.length
  vertices.push([a - mcx, 0, 0])
  for (let j = 0; j < N_SEGS; j++) {
    faces.push([startCtr, (j + 1) % N_SEGS, j])
  }

  // End cap (at x=sweepB)
  const endCtr = vertices.length
  vertices.push([sweepB - mcx, 0, 0])
  const off = nRings * N_SEGS
  for (let j = 0; j < N_SEGS; j++) {
    faces.push([endCtr, off + j, off + (j + 1) % N_SEGS])
  }

  return { vertices, faces }
}

/* ------------------------------------------------------------------ */
/* Canvas draw utility                                                 */
/* ------------------------------------------------------------------ */
const LIGHT: Vec3 = [-0.4, 0.68, 0.88]
const lLen = Math.hypot(...LIGHT)
const LIGHT_UNIT: Vec3 = [LIGHT[0] / lLen, LIGHT[1] / lLen, LIGHT[2] / lLen]

function drawRevolution(
  ctx: CanvasRenderingContext2D,
  mesh: RevMesh,
  width: number,
  height: number,
  yaw: number,
  pitch: number,
  zoom: number,
  aVal: number,
  bVal: number,
) {
  ctx.clearRect(0, 0, width, height)
  const { vertices, faces } = mesh
  if (vertices.length === 0) return

  const maxExtent = Math.max(
    ...vertices.flatMap((v) => v.map((c) => Math.abs(c))),
    0.001,
  )
  const normed = vertices.map((v) => v.map((c) => c / maxExtent) as Vec3)
  const rotated = normed.map((v) => rotatePoint(v, yaw, pitch))

  const focal = Math.min(width, height) * 1.08 * zoom
  const dist3D = 3.55
  const cx = width / 2
  const cy = height / 2

  const project = (p: Vec3) => {
    const depth = dist3D - p[2]
    const scale = focal / Math.max(depth, 0.6)
    return { x: cx + p[0] * scale, y: cy - p[1] * scale }
  }

  // Mesh center x in model space
  const mcx = (aVal + bVal) / 2
  const xRange = Math.max(0.001, bVal - aVal)

  // Build face data
  const faceData = faces.map((face) => {
    const pts = face.map((i) => rotated[i])
    const proj = pts.map(project)
    const avgZ = pts.reduce((s, p) => s + p[2], 0) / pts.length
    const normal = normalOf(pts)
    const brightness = Math.abs(
      normal[0] * LIGHT_UNIT[0] + normal[1] * LIGHT_UNIT[1] + normal[2] * LIGHT_UNIT[2],
    )
    // x in model space for color gradient (0=a, 1=b)
    const xModel = (vertices[face[0]][0] + mcx)
    const t = Math.max(0, Math.min(1, (xModel - aVal) / xRange))
    return { proj, avgZ, brightness, t }
  })

  faceData.sort((a, b) => a.avgZ - b.avgZ)

  // Draw axis of rotation (dashed, behind solid)
  const axisA = project(rotatePoint([(aVal - mcx) / maxExtent, 0, 0], yaw, pitch))
  const axisB = project(rotatePoint([(bVal - mcx) / maxExtent, 0, 0], yaw, pitch))
  ctx.save()
  ctx.strokeStyle = 'rgba(214, 168, 75, 0.45)'
  ctx.lineWidth = 1.5
  ctx.setLineDash([5, 4])
  ctx.beginPath()
  ctx.moveTo(axisA.x, axisA.y)
  ctx.lineTo(axisB.x, axisB.y)
  ctx.stroke()
  ctx.setLineDash([])

  // Axis endpoint dots
  ctx.fillStyle = 'rgba(214, 168, 75, 0.7)'
  ctx.beginPath()
  ctx.arc(axisA.x, axisA.y, 3, 0, Math.PI * 2)
  ctx.arc(axisB.x, axisB.y, 3, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()

  // Draw solid faces (blue-to-teal gradient by x position)
  for (const { proj, brightness, t } of faceData) {
    if (proj.length < 3) continue
    ctx.beginPath()
    ctx.moveTo(proj[0].x, proj[0].y)
    for (let i = 1; i < proj.length; i++) ctx.lineTo(proj[i].x, proj[i].y)
    ctx.closePath()

    const shade = 0.32 + 0.68 * brightness
    const r = Math.round((18 + 44 * t) * shade)
    const g = Math.round((72 + 60 * t) * shade)
    const bl = Math.round((168 - 60 * t) * shade)
    ctx.fillStyle = `rgb(${r},${g},${bl})`
    ctx.fill()
    ctx.strokeStyle = 'rgba(90, 190, 240, 0.07)'
    ctx.lineWidth = 0.5
    ctx.stroke()
  }

  // Axis label (top-right of axis end)
  ctx.save()
  ctx.fillStyle = 'rgba(214, 168, 75, 0.75)'
  ctx.font = '500 10px "Inter Variable", Inter, sans-serif'
  ctx.textBaseline = 'bottom'
  ctx.fillText('x', axisB.x + 7, axisB.y - 2)
  ctx.restore()
}

/* ================================================================== */
/* Main component                                                       */
/* ================================================================== */
export function RevolutionLab() {
  const { language } = useI18n()
  const isKm = language === 'km'

  const [funcId, setFuncId] = useState<FuncId>('x2')
  const [aVal, setAVal] = useState(0)
  const [bVal, setBVal] = useState(2)
  const [animProg, setAnimProg] = useState(1)
  const [playing, setPlaying] = useState(false)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ width: 560, height: 400 })
  const [yaw, setYaw] = useState(0.55)
  const [pitch, setPitch] = useState(0.28)
  const [zoom, setZoom] = useState(1)
  const drag = useRef<{ x: number; y: number; yaw: number; pitch: number } | null>(null)
  const animRef = useRef<number>(0)
  const reducedMotion = useRef(
    typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  const f = useMemo(() => getFunc(funcId), [funcId])
  const mesh = useMemo(() => buildRevolutionMesh(f, aVal, bVal, animProg), [f, aVal, bVal, animProg])
  const volume = useMemo(() => computeVolume(f, aVal, bVal), [f, aVal, bVal])
  const cfTex = Math.abs(aVal) < 0.01 ? closedFormTex(funcId, bVal) : null

  /* Play sweep animation */
  const playAnimation = useCallback(() => {
    cancelAnimationFrame(animRef.current)
    if (reducedMotion.current) {
      setAnimProg(1)
      return
    }
    setAnimProg(0)
    setPlaying(true)
    const startTime = performance.now()
    const DURATION = 1500
    const tick = (time: number) => {
      const elapsed = Math.min(1, (time - startTime) / DURATION)
      // ease-in-out cubic
      const eased = elapsed < 0.5 ? 4 * elapsed ** 3 : 1 - (-2 * elapsed + 2) ** 3 / 2
      setAnimProg(eased)
      if (elapsed < 1) {
        animRef.current = requestAnimationFrame(tick)
      } else {
        setPlaying(false)
      }
    }
    animRef.current = requestAnimationFrame(tick)
  }, [])

  /* Reset to full solid when parameters change */
  useEffect(() => {
    cancelAnimationFrame(animRef.current)
    setAnimProg(1)
    setPlaying(false)
  }, [funcId, aVal, bVal])

  /* Cleanup on unmount */
  useEffect(() => () => cancelAnimationFrame(animRef.current), [])

  /* ResizeObserver */
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const obs = new ResizeObserver((entries) => {
      const e = entries[0]
      if (e && e.contentRect.width > 0 && e.contentRect.height > 0) {
        setSize({ width: e.contentRect.width, height: e.contentRect.height })
      }
    })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  /* Canvas draw */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = Math.max(1, Math.round(size.width * dpr))
    canvas.height = Math.max(1, Math.round(size.height * dpr))
    canvas.style.width = `${size.width}px`
    canvas.style.height = `${size.height}px`
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    drawRevolution(ctx, mesh, size.width, size.height, yaw, pitch, zoom, aVal, bVal)
  }, [mesh, size, yaw, pitch, zoom, aVal, bVal])

  /* Drag + scroll */
  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      e.currentTarget.setPointerCapture(e.pointerId)
      drag.current = { x: e.clientX, y: e.clientY, yaw, pitch }
    },
    [yaw, pitch],
  )
  const onPointerMove = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drag.current) return
    setYaw(drag.current.yaw + (e.clientX - drag.current.x) * 0.007)
    setPitch(
      Math.max(-1.1, Math.min(1.1, drag.current.pitch + (e.clientY - drag.current.y) * 0.006)),
    )
  }, [])
  const onPointerUp = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    drag.current = null
    e.currentTarget.releasePointerCapture(e.pointerId)
  }, [])
  const onWheel = useCallback((e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    setZoom((z) => Math.max(0.6, Math.min(2.2, z - e.deltaY * 0.0012)))
  }, [])

  /* i18n helpers */
  const pick = (en: string, km: string) => (isKm ? km : en)

  const funcLabels: Record<FuncId, string> = {
    x2: 'y = x²',
    sqrtx: 'y = √x',
    x: 'y = x',
  }

  const integrandTeX: Record<FuncId, string> = {
    x2: 'x^4',
    sqrtx: 'x',
    x: 'x^2',
  }

  return (
    <div className="rev-lab">
      <div className="rev-lab__inner">
        {/* 3D Canvas */}
        <div ref={containerRef} className="rev-lab__canvas-wrap">
          <canvas
            ref={canvasRef}
            className="rev-lab__canvas"
            tabIndex={0}
            role="img"
            aria-label={pick(
              `Volume of revolution solid, V = ${fmt(volume)} cubic units`,
              `បរិមាណវិលបង្វិល V = ${fmt(volume)} ឯកតាគូប`,
            )}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onWheel={onWheel}
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft') { e.preventDefault(); setYaw((y) => y - 0.12) }
              else if (e.key === 'ArrowRight') { e.preventDefault(); setYaw((y) => y + 0.12) }
              else if (e.key === 'ArrowUp') { e.preventDefault(); setPitch((p) => Math.max(-1.1, p - 0.1)) }
              else if (e.key === 'ArrowDown') { e.preventDefault(); setPitch((p) => Math.min(1.1, p + 0.1)) }
              else if (e.key === '+' || e.key === '=') { e.preventDefault(); setZoom((z) => Math.min(2.2, z + 0.12)) }
              else if (e.key === '-' || e.key === '_') { e.preventDefault(); setZoom((z) => Math.max(0.6, z - 0.12)) }
              else if (e.key === '0') { e.preventDefault(); setZoom(1); setYaw(0.55); setPitch(0.28) }
            }}
          />
          <p className="rev-lab__hint">
            {pick('Drag to rotate · scroll or +/- to zoom', 'អូសដើម្បីបង្វិល · រំកិល ឬ +/- ដើម្បីពង្រីក')}
          </p>
        </div>

        {/* Control panel */}
        <div className="rev-lab__panel">
          {/* Function selector */}
          <div className="rev-lab__section">
            <p className="rev-lab__label">{pick('Function', 'អនុគមន៍')}</p>
            <div className="rev-lab__func-row">
              {(['x2', 'sqrtx', 'x'] as FuncId[]).map((id) => (
                <button
                  key={id}
                  type="button"
                  className={`rev-lab__func-btn${funcId === id ? ' is-active' : ''}`}
                  onClick={() => setFuncId(id)}
                >
                  {funcLabels[id]}
                </button>
              ))}
            </div>
          </div>

          {/* Sliders */}
          <div className="rev-lab__section">
            <div className="rev-lab__slider-row">
              <label className="rev-lab__label">
                {pick('Lower limit a', 'ដែនកំណត់ទាប a')} = {fmt(aVal, 2)}
              </label>
              <input
                type="range" min={0} max={1.5} step={0.05} value={aVal}
                className="rev-lab__range"
                onChange={(e) => {
                  const v = Number(e.target.value)
                  setAVal(v)
                  if (v >= bVal) setBVal(Math.min(3, v + 0.5))
                }}
              />
            </div>
            <div className="rev-lab__slider-row">
              <label className="rev-lab__label">
                {pick('Upper limit b', 'ដែនកំណត់លើ b')} = {fmt(bVal, 2)}
              </label>
              <input
                type="range" min={0.5} max={3} step={0.05} value={bVal}
                className="rev-lab__range"
                onChange={(e) => {
                  const v = Number(e.target.value)
                  setBVal(v)
                  if (v <= aVal) setAVal(Math.max(0, v - 0.5))
                }}
              />
            </div>
          </div>

          {/* Integral formula */}
          <div className="rev-lab__section rev-lab__formula-block">
            <MathBlock tex={`V = \\pi\\int_{${fmt(aVal, 2)}}^{${fmt(bVal, 2)}} ${integrandTeX[funcId]}\\,dx`} />
          </div>

          {/* Numerical + closed-form result */}
          <div className="rev-lab__section rev-lab__result">
            <div className="rev-lab__result-row">
              <span className="rev-lab__result-label">
                {pick('Volume (numerical)', 'បរិមាណ (លេខ)')}
              </span>
              <span className="rev-lab__result-val">
                {`V ≈ ${fmt(volume, 4)}`}
              </span>
            </div>
            {cfTex && (
              <div className="rev-lab__closed-form">
                <p className="rev-lab__label rev-lab__label--small">
                  {pick('Closed form (a = 0):', 'រូបមន្តបិទ (a = 0):')}
                </p>
                <MathBlock tex={cfTex} />
                <span className="rev-lab__result-val">
                  {`= ${fmt(volume, 4)}`}
                </span>
              </div>
            )}
          </div>

          {/* Animate button */}
          <button
            type="button"
            className={`rev-lab__play-btn${playing ? ' is-playing' : ''}`}
            onClick={playAnimation}
            disabled={playing}
            aria-label={pick('Animate sweep from a to b', 'បង្ហាញចលនាពី a ដល់ b')}
          >
            {playing
              ? pick('Sweeping…', 'កំពុងបង្ហាញចលនា…')
              : pick('Animate sweep', 'បង្ហាញចលនា')}
          </button>

          {/* Terms */}
          <div className="rev-lab__terms">
            <span>a = {fmt(aVal, 2)}</span>
            <span>b = {fmt(bVal, 2)}</span>
            <span>f(x) = {funcLabels[funcId]}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
