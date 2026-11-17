import { useId, useRef, useState } from 'react'
import type { GraphLine, GraphPoint, GraphSpec, PlotColor } from '../../types/content'
import { useI18n } from '../../lib/i18n'

const WIDTH = 600
const PAD = { top: 18, right: 22, bottom: 30, left: 34 }
const SAMPLES = 600

/** Format a coordinate: at most two decimals, trailing zeros trimmed, true minus sign. */
export function formatCoord(value: number): string {
  const rounded = Math.round(value * 100) / 100
  const text = Object.is(rounded, -0) ? '0' : String(rounded)
  return text.replace('-', '−')
}

export function pointLabel(point: Pick<GraphPoint, 'x' | 'y' | 'label' | 'showCoords'>): string {
  const coords = `(${formatCoord(point.x)}, ${formatCoord(point.y)})`
  if (point.showCoords === false) return point.label ?? ''
  return point.label ? `${point.label}${coords}` : coords
}

/** Pixel geometry for a spec. Exported for tests: the mapping must be exact. */
export function graphGeometry(spec: Pick<GraphSpec, 'xRange' | 'yRange' | 'equalScale'>) {
  const [x0, x1] = spec.xRange
  const [y0, y1] = spec.yRange
  const innerW = WIDTH - PAD.left - PAD.right
  const equal = spec.equalScale ?? true
  const innerH = equal ? Math.min(Math.max((innerW * (y1 - y0)) / (x1 - x0), 220), 640) : 360
  const height = innerH + PAD.top + PAD.bottom
  const sx = (x: number) => PAD.left + ((x - x0) / (x1 - x0)) * innerW
  const sy = (y: number) => PAD.top + ((y1 - y) / (y1 - y0)) * innerH
  return { width: WIDTH, height, innerW, innerH, sx, sy }
}

function ticks(min: number, max: number, step: number): number[] {
  const out: number[] = []
  const first = Math.ceil(min / step - 1e-9) * step
  for (let v = first; v <= max + 1e-9; v += step) out.push(Math.round(v * 1e6) / 1e6)
  return out
}

/** Build an SVG path from samples, breaking at undefined values and vertical jumps. */
function samplePath(
  fx: (t: number) => number,
  fy: (t: number) => number,
  t0: number,
  t1: number,
  sx: (x: number) => number,
  sy: (y: number) => number,
  ySpan: number,
): string {
  let d = ''
  let penDown = false
  let lastY = NaN
  for (let i = 0; i <= SAMPLES; i++) {
    const t = t0 + ((t1 - t0) * i) / SAMPLES
    const x = fx(t)
    const y = fy(t)
    if (!Number.isFinite(x) || !Number.isFinite(y) || Math.abs(y) > ySpan * 50) {
      penDown = false
      continue
    }
    if (penDown && Math.abs(y - lastY) > ySpan * 1.5) penDown = false
    d += `${penDown ? 'L' : 'M'}${sx(x).toFixed(2)} ${sy(y).toFixed(2)} `
    penDown = true
    lastY = y
  }
  return d.trim()
}

function interpContour(vA: number, vB: number, pA: number, pB: number): number {
  if (Math.abs(vB - vA) < 1e-12) return pA
  const t = Math.max(0, Math.min(1, -vA / (vB - vA)))
  return pA + t * (pB - pA)
}

/**
 * Traces zero-crossings of F(x, y) = 0 via Marching Squares and chains segments
 * into clean SVG polyline paths. Works for any implicit equation (conics, ellipses,
 * hyperbolas, circles, and implicit algebraic curves).
 */
export function sampleImplicitContour(
  fn: (x: number, y: number) => number,
  x0: number,
  x1: number,
  y0: number,
  y1: number,
  sx: (x: number) => number,
  sy: (y: number) => number,
  gridRes = 140,
): string {
  const GRID_X = gridRes
  const GRID_Y = gridRes
  const vals = new Float64Array((GRID_X + 1) * (GRID_Y + 1))
  const dx = (x1 - x0) / GRID_X
  const dy = (y1 - y0) / GRID_Y
  for (let j = 0; j <= GRID_Y; j++) {
    const y = y0 + j * dy
    for (let i = 0; i <= GRID_X; i++) {
      const x = x0 + i * dx
      const v = fn(x, y)
      vals[j * (GRID_X + 1) + i] = Number.isFinite(v) ? v : NaN
    }
  }

  const segments: [{ x: number; y: number }, { x: number; y: number }][] = []
  for (let j = 0; j < GRID_Y; j++) {
    const yB = y0 + j * dy
    const yT = yB + dy
    for (let i = 0; i < GRID_X; i++) {
      const xL = x0 + i * dx
      const xR = xL + dx

      const v0 = vals[j * (GRID_X + 1) + i]
      const v1 = vals[j * (GRID_X + 1) + (i + 1)]
      const v2 = vals[(j + 1) * (GRID_X + 1) + (i + 1)]
      const v3 = vals[(j + 1) * (GRID_X + 1) + i]

      if (!Number.isFinite(v0) || !Number.isFinite(v1) || !Number.isFinite(v2) || !Number.isFinite(v3)) continue

      let idx = 0
      if (v0 > 0) idx |= 1
      if (v1 > 0) idx |= 2
      if (v2 > 0) idx |= 4
      if (v3 > 0) idx |= 8

      if (idx === 0 || idx === 15) continue

      const pBottom = { x: interpContour(v0, v1, xL, xR), y: yB }
      const pRight = { x: xR, y: interpContour(v1, v2, yB, yT) }
      const pTop = { x: interpContour(v3, v2, xL, xR), y: yT }
      const pLeft = { x: xL, y: interpContour(v0, v3, yB, yT) }

      const edgePts = [pBottom, pRight, pTop, pLeft]

      const pairs: [number, number][] = []
      switch (idx) {
        case 1: pairs.push([3, 0]); break
        case 2: pairs.push([0, 1]); break
        case 3: pairs.push([3, 1]); break
        case 4: pairs.push([1, 2]); break
        case 5: {
          const vc = (v0 + v1 + v2 + v3) / 4
          if (vc > 0) { pairs.push([3, 2]); pairs.push([0, 1]); }
          else { pairs.push([3, 0]); pairs.push([1, 2]); }
          break
        }
        case 6: pairs.push([0, 2]); break
        case 7: pairs.push([3, 2]); break
        case 8: pairs.push([2, 3]); break
        case 9: pairs.push([2, 0]); break
        case 10: {
          const vc = (v0 + v1 + v2 + v3) / 4
          if (vc > 0) { pairs.push([0, 3]); pairs.push([2, 1]); }
          else { pairs.push([0, 1]); pairs.push([2, 3]); }
          break
        }
        case 11: pairs.push([2, 1]); break
        case 12: pairs.push([1, 3]); break
        case 13: pairs.push([1, 0]); break
        case 14: pairs.push([0, 3]); break
      }

      for (const [e1, e2] of pairs) {
        segments.push([edgePts[e1], edgePts[e2]])
      }
    }
  }

  if (segments.length === 0) return ''

  const tol = Math.max(dx, dy) * 1.5
  const remaining = new Set(segments.map((_, i) => i))
  const polylines: { x: number; y: number }[][] = []

  while (remaining.size > 0) {
    const firstIdx = remaining.values().next().value!
    remaining.delete(firstIdx)
    const seg = segments[firstIdx]
    const poly = [seg[0], seg[1]]

    let extended = true
    while (extended) {
      extended = false
      const tail = poly[poly.length - 1]
      for (const idx of remaining) {
        const s = segments[idx]
        const d0 = Math.hypot(s[0].x - tail.x, s[0].y - tail.y)
        const d1 = Math.hypot(s[1].x - tail.x, s[1].y - tail.y)
        if (d0 < tol) {
          poly.push(s[1])
          remaining.delete(idx)
          extended = true
          break
        } else if (d1 < tol) {
          poly.push(s[0])
          remaining.delete(idx)
          extended = true
          break
        }
      }
    }

    extended = true
    while (extended) {
      extended = false
      const head = poly[0]
      for (const idx of remaining) {
        const s = segments[idx]
        const d0 = Math.hypot(s[0].x - head.x, s[0].y - head.y)
        const d1 = Math.hypot(s[1].x - head.x, s[1].y - head.y)
        if (d1 < tol) {
          poly.unshift(s[0])
          remaining.delete(idx)
          extended = true
          break
        } else if (d0 < tol) {
          poly.unshift(s[1])
          remaining.delete(idx)
          extended = true
          break
        }
      }
    }

    polylines.push(poly)
  }

  let d = ''
  for (const poly of polylines) {
    if (poly.length < 2) continue
    d += `M${sx(poly[0].x).toFixed(2)} ${sy(poly[0].y).toFixed(2)} `
    for (let k = 1; k < poly.length; k++) {
      d += `L${sx(poly[k].x).toFixed(2)} ${sy(poly[k].y).toFixed(2)} `
    }
  }
  return d.trim()
}

const colorClass = (c: PlotColor | undefined, fallback: PlotColor) => `plot-c${c ?? fallback}`

const ANCHOR_OFFSET: Record<NonNullable<GraphPoint['anchor']>, [number, number, 'start' | 'middle' | 'end']> = {
  ne: [8, -9, 'start'],
  nw: [-8, -9, 'end'],
  se: [8, 17, 'start'],
  sw: [-8, 17, 'end'],
  n: [0, -11, 'middle'],
  s: [0, 20, 'middle'],
  e: [10, 4, 'start'],
  w: [-10, 4, 'end'],
}

export interface GraphProps {
  spec: GraphSpec
  interactive?: boolean
  onPan?: (dx: number, dy: number) => void
  onZoom?: (factor: number) => void
}

/**
 * An exact coordinate-plane plot: every curve is sampled from its function and
 * every point is placed by its real coordinates, so what students read off the
 * grid is mathematically true. Colours come from the --plot-* tokens and adapt
 * to the dark theme.
 */
export function Graph({ spec, interactive = false, onPan, onZoom }: GraphProps) {
  const { isKhmer } = useI18n()
  const uid = useId().replace(/:/g, '')
  const svgRef = useRef<SVGSVGElement>(null)
  const [hoverCoord, setHoverCoord] = useState<{ x: number; y: number } | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const dragStartRef = useRef<{ clientX: number; clientY: number } | null>(null)

  const clipId = `${spec.id}-clip-${uid}`
  const arrowId = `${spec.id}-arrow-${uid}`
  const [x0, x1] = spec.xRange
  const [y0, y1] = spec.yRange
  const { width, height, innerW, innerH, sx, sy } = graphGeometry(spec)
  const ySpan = y1 - y0
  const xStep = spec.xStep ?? 1
  const yStep = spec.yStep ?? 1
  const xTicks = ticks(x0, x1, xStep)
  const yTicks = ticks(y0, y1, yStep)
  const axisY = y0 <= 0 && y1 >= 0 ? sy(0) : sy(y0)
  const axisX = x0 <= 0 && x1 >= 0 ? sx(0) : sx(x0)
  const title = isKhmer && spec.titleKm ? spec.titleKm : spec.title
  const caption = isKhmer && spec.captionKm ? spec.captionKm : spec.caption
  const legend = [
    ...(spec.curves ?? []).map((c, i) => ({ label: c.label, color: c.color ?? (((i % 4) + 1) as PlotColor), dashed: c.dashed })),
    ...(spec.parametric ?? []).map((c) => ({ label: c.label, color: c.color ?? 1, dashed: c.dashed })),
    ...(spec.implicit ?? []).map((c, i) => ({ label: c.label, color: c.color ?? (((i % 4) + 1) as PlotColor), dashed: c.dashed })),
    ...(spec.paths ?? []).map((c, i) => ({ label: c.label, color: c.color ?? (((i % 4) + 1) as PlotColor), dashed: c.dashed })),
    ...(spec.lines ?? []).filter((l) => l.dashed && l.label).map((l) => ({ label: l.label, color: l.color ?? 2, dashed: true })),
  ].filter((item): item is { label: string; color: PlotColor; dashed: boolean | undefined } => Boolean(item.label))
  const pointsText = (spec.points ?? []).map(pointLabel).filter(Boolean).join(', ')

  const lineCoords = (line: GraphLine): [number, number, number, number] | null => {
    if (line.kind === 'vertical' && line.at !== undefined) return [line.at, y0, line.at, y1]
    if (line.kind === 'horizontal' && line.at !== undefined) return [x0, line.at, x1, line.at]
    if (!line.from || !line.to) return null
    if (line.kind === 'segment') return [...line.from, ...line.to]
    const [ax, ay] = line.from
    const [bx, by] = line.to
    if (ax === bx) return [ax, y0, ax, y1]
    const m = (by - ay) / (bx - ax)
    return [x0, ay + m * (x0 - ax), x1, ay + m * (x1 - ax)]
  }

  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!interactive) return
    if (e.button !== 0 && e.pointerType === 'mouse') return
    try {
      ;(e.currentTarget as Element).setPointerCapture?.(e.pointerId)
    } catch {
      // Ignore
    }
    setIsDragging(true)
    dragStartRef.current = { clientX: e.clientX, clientY: e.clientY }
  }

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!interactive) return
    const svg = svgRef.current
    if (!svg) return
    const rect = svg.getBoundingClientRect()
    if (rect.width <= 0 || rect.height <= 0) return

    if (isDragging && dragStartRef.current && onPan) {
      const screenDx = e.clientX - dragStartRef.current.clientX
      const screenDy = e.clientY - dragStartRef.current.clientY
      dragStartRef.current = { clientX: e.clientX, clientY: e.clientY }
      const mathDx = -(screenDx / rect.width) * (x1 - x0)
      const mathDy = (screenDy / rect.height) * (y1 - y0)
      onPan(mathDx, mathDy)
      return
    }

    const clientX = e.clientX - rect.left
    const clientY = e.clientY - rect.top
    const scaleX = width / rect.width
    const scaleY = height / rect.height
    const svgX = clientX * scaleX
    const svgY = clientY * scaleY

    const mathX = x0 + ((svgX - PAD.left) / innerW) * (x1 - x0)
    const mathY = y1 - ((svgY - PAD.top) / innerH) * (y1 - y0)

    if (mathX >= x0 && mathX <= x1 && mathY >= y0 && mathY <= y1) {
      setHoverCoord({
        x: Math.round(mathX * 100) / 100,
        y: Math.round(mathY * 100) / 100,
      })
    } else {
      setHoverCoord(null)
    }
  }

  const handlePointerUp = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!interactive) return
    setIsDragging(false)
    dragStartRef.current = null
    try {
      ;(e.currentTarget as Element).releasePointerCapture?.(e.pointerId)
    } catch {
      // Ignore
    }
  }

  const handlePointerLeave = () => {
    if (!isDragging) {
      setHoverCoord(null)
    }
  }

  const handleWheel = (e: React.WheelEvent<SVGSVGElement>) => {
    if (!interactive || !onZoom) return
    e.preventDefault()
    if (e.deltaY < 0) {
      onZoom(0.85)
    } else if (e.deltaY > 0) {
      onZoom(1.18)
    }
  }

  return (
    <figure className="graph">
      <figcaption className="graph__head">
        <strong className="graph__title">{title}</strong>
        <span className="graph__caption">{caption}</span>
      </figcaption>
      <svg
        ref={svgRef}
        className={`graph__svg${interactive ? ' is-interactive' : ''}${isDragging ? ' is-dragging' : ''}`}
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={`${title}. ${caption}${pointsText ? ` ${pointsText}.` : ''}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        onWheel={handleWheel}
      >
        <defs>
          <clipPath id={clipId}>
            <rect x={sx(x0)} y={sy(y1)} width={sx(x1) - sx(x0)} height={sy(y0) - sy(y1)} />
          </clipPath>
          <marker id={arrowId} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" className="graph__arrowhead" />
          </marker>
        </defs>

        <g className="graph__grid" aria-hidden="true">
          {xTicks.map((x) => (
            <line key={`gx${x}`} x1={sx(x)} x2={sx(x)} y1={sy(y0)} y2={sy(y1)} />
          ))}
          {yTicks.map((y) => (
            <line key={`gy${y}`} x1={sx(x0)} x2={sx(x1)} y1={sy(y)} y2={sy(y)} />
          ))}
        </g>

        <g clipPath={`url(#${clipId})`}>
          {(spec.areas ?? []).map((area, i) => {
            const lower = area.lower ?? (() => 0)
            let d = ''
            for (let k = 0; k <= 200; k++) {
              const x = area.from + ((area.to - area.from) * k) / 200
              d += `${k === 0 ? 'M' : 'L'}${sx(x).toFixed(2)} ${sy(area.fn(x)).toFixed(2)} `
            }
            for (let k = 200; k >= 0; k--) {
              const x = area.from + ((area.to - area.from) * k) / 200
              d += `L${sx(x).toFixed(2)} ${sy(lower(x)).toFixed(2)} `
            }
            return <path key={`a${i}`} d={`${d}Z`} className={`graph__area ${colorClass(area.color, 1)}`} />
          })}

          {(spec.lines ?? []).map((line, i) => {
            const c = lineCoords(line)
            if (!c) return null
            return (
              <line
                key={`l${i}`}
                x1={sx(c[0])}
                y1={sy(c[1])}
                x2={sx(c[2])}
                y2={sy(c[3])}
                className={`graph__line ${colorClass(line.color, 2)}${line.dashed ? ' is-dashed' : ''}`}
                markerEnd={line.arrow ? `url(#${arrowId})` : undefined}
              />
            )
          })}

          {(spec.curves ?? []).map((curve, i) => {
            const [d0, d1] = curve.domain ?? [x0, x1]
            const from = Math.max(d0, x0)
            const to = Math.min(d1, x1)
            const d = samplePath((t) => t, curve.fn, from, to, sx, sy, ySpan)
            return (
              <path
                key={`c${i}`}
                d={d}
                className={`graph__curve ${colorClass(curve.color, ((i % 4) + 1) as PlotColor)}${curve.dashed ? ' is-dashed' : ''}`}
              />
            )
          })}

          {(spec.parametric ?? []).map((curve, i) => (
            <path
              key={`p${i}`}
              d={samplePath(curve.x, curve.y, curve.t[0], curve.t[1], sx, sy, ySpan)}
              className={`graph__curve ${colorClass(curve.color, 1)}${curve.dashed ? ' is-dashed' : ''}`}
            />
          ))}

          {(spec.implicit ?? []).map((imp, i) => {
            const d = sampleImplicitContour(imp.fn, x0, x1, y0, y1, sx, sy)
            if (!d) return null
            return (
              <path
                key={`imp${i}`}
                d={d}
                className={`graph__curve ${colorClass(imp.color, ((i % 4) + 1) as PlotColor)}${imp.dashed ? ' is-dashed' : ''}`}
              />
            )
          })}

          {(spec.paths ?? []).map((pathItem, i) => (
            <path
              key={`path${i}`}
              d={pathItem.d}
              className={`graph__curve ${colorClass(pathItem.color, ((i % 4) + 1) as PlotColor)}${pathItem.dashed ? ' is-dashed' : ''}`}
            />
          ))}
        </g>

        <g className="graph__axes" aria-hidden="true">
          <line x1={sx(x0)} x2={sx(x1)} y1={axisY} y2={axisY} markerEnd={`url(#${arrowId})`} />
          <line x1={axisX} x2={axisX} y1={sy(y0)} y2={sy(y1)} markerEnd={`url(#${arrowId})`} />
          <text x={sx(x1) - 4} y={axisY - 8} textAnchor="end" className="graph__axis-name">
            {spec.xLabel ?? 'x'}
          </text>
          <text x={axisX + 8} y={sy(y1) + 12} className="graph__axis-name">
            {spec.yLabel ?? 'y'}
          </text>
          {xTicks
            .filter((x) => Math.abs(x) > 1e-9 && x < x1 - 1e-9 && x > x0 + 1e-9)
            .map((x) => (
              <g key={`tx${x}`}>
                <line x1={sx(x)} x2={sx(x)} y1={axisY - 3} y2={axisY + 3} />
                <text x={sx(x)} y={axisY + 15} textAnchor="middle" className="graph__tick">
                  {formatCoord(x)}
                </text>
              </g>
            ))}
          {yTicks
            .filter((y) => Math.abs(y) > 1e-9 && y < y1 - 1e-9 && y > y0 + 1e-9)
            .map((y) => (
              <g key={`ty${y}`}>
                <line x1={axisX - 3} x2={axisX + 3} y1={sy(y)} y2={sy(y)} />
                <text x={axisX - 6} y={sy(y) + 4} textAnchor="end" className="graph__tick">
                  {formatCoord(y)}
                </text>
              </g>
            ))}
          {x0 <= 0 && x1 >= 0 && y0 <= 0 && y1 >= 0 && (
            <text x={sx(0) - 6} y={sy(0) + 15} textAnchor="end" className="graph__tick">
              O
            </text>
          )}
        </g>

        <g>
          {(spec.points ?? []).map((point, i) => {
            const [dx, dy, anchor] = ANCHOR_OFFSET[point.anchor ?? 'ne']
            const text = pointLabel(point)
            return (
              <g key={`pt${i}`} className={colorClass(point.color, 2)}>
                <circle cx={sx(point.x)} cy={sy(point.y)} r={4.5} className={`graph__point${point.open ? ' is-open' : ''}`} />
                {text && (
                  <text x={sx(point.x) + dx} y={sy(point.y) + dy} textAnchor={anchor} className="graph__point-label">
                    {text}
                  </text>
                )}
              </g>
            )
          })}
        </g>

        {hoverCoord && (
          <g className="graph__crosshair" pointerEvents="none" aria-hidden="true">
            <line
              x1={sx(x0)}
              x2={sx(x1)}
              y1={sy(hoverCoord.y)}
              y2={sy(hoverCoord.y)}
              stroke="var(--plot-1, #2457A7)"
              strokeWidth="1.2"
              strokeDasharray="4 3"
              opacity="0.55"
            />
            <line
              x1={sx(hoverCoord.x)}
              x2={sx(hoverCoord.x)}
              y1={sy(y0)}
              y2={sy(y1)}
              stroke="var(--plot-1, #2457A7)"
              strokeWidth="1.2"
              strokeDasharray="4 3"
              opacity="0.55"
            />
            <circle
              cx={sx(hoverCoord.x)}
              cy={sy(hoverCoord.y)}
              r="5"
              fill="var(--plot-1, #2457A7)"
              stroke="#fff"
              strokeWidth="2"
            />
            <g
              transform={`translate(${Math.min(
                Math.max(sx(hoverCoord.x) + 10, PAD.left + 5),
                width - PAD.right - 95,
              )}, ${Math.max(sy(hoverCoord.y) - 30, PAD.top + 5)})`}
            >
              <rect
                x="0"
                y="0"
                width="90"
                height="24"
                rx="5"
                fill="var(--surface, #ffffff)"
                stroke="var(--line, #CBD5E1)"
                strokeWidth="1.2"
                filter="drop-shadow(0 2px 4px rgba(0,0,0,0.12))"
              />
              <text
                x="45"
                y="16"
                textAnchor="middle"
                fill="var(--ink, #102A56)"
                fontSize="11.5"
                fontWeight="700"
                fontFamily="var(--font-mono, monospace)"
              >
                ({formatCoord(hoverCoord.x)}, {formatCoord(hoverCoord.y)})
              </text>
            </g>
          </g>
        )}
      </svg>
      {legend.length > 0 && (
        <ul className="graph__legend">
          {legend.map((item, i) => (
            <li key={i} className={colorClass(item.color, 1)}>
              <span className={`graph__swatch${item.dashed ? ' is-dashed' : ''}`} aria-hidden="true" />
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </figure>
  )
}
