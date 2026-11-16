import { useId } from 'react'
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

/**
 * An exact coordinate-plane plot: every curve is sampled from its function and
 * every point is placed by its real coordinates, so what students read off the
 * grid is mathematically true. Colours come from the --plot-* tokens and adapt
 * to the dark theme.
 */
export function Graph({ spec }: { spec: GraphSpec }) {
  const { isKhmer } = useI18n()
  const uid = useId().replace(/:/g, '')
  const clipId = `${spec.id}-clip-${uid}`
  const arrowId = `${spec.id}-arrow-${uid}`
  const [x0, x1] = spec.xRange
  const [y0, y1] = spec.yRange
  const { width, height, sx, sy } = graphGeometry(spec)
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

  return (
    <figure className="graph">
      <figcaption className="graph__head">
        <strong className="graph__title">{title}</strong>
        <span className="graph__caption">{caption}</span>
      </figcaption>
      <svg
        className="graph__svg"
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={`${title}. ${caption}${pointsText ? ` ${pointsText}.` : ''}`}
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
