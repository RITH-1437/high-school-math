import { useId, useMemo } from 'react'
import type { Shape, ShapeDimensions } from '../../types/content'
import type { Language } from '../../i18n/types'
import { formatMetricValue, formatNumber } from '../../lib/format'
import { useI18n } from '../../lib/i18n'

interface Vec2 {
  x: number
  y: number
}

interface Guide2D {
  from: Vec2
  to: Vec2
  label?: string
  dimensionKey?: string
  offset?: Vec2
  dashed?: boolean
}

interface ShapeSpec {
  polygon?: Vec2[]
  circle?: { radius: number }
  semicircle?: { radius: number }
  guides: Guide2D[]
  center?: Vec2
  labelSides?: { from: Vec2; to: Vec2; label: string; offset: Vec2 }[]
}

function dimValue(dims: ShapeDimensions, key: string, fallback: number): number {
  const raw = dims[key]
  return Number.isFinite(raw) && raw > 0 ? raw : fallback
}

function findDimension(shape: Shape, key: string) {
  return shape.dimensions.find((dimension) => dimension.key === key)
}

function dimensionText(shape: Shape, dims: ShapeDimensions, key: string): string | undefined {
  const definition = findDimension(shape, key)
  const raw = dims[key]
  if (!definition || !Number.isFinite(raw)) return undefined
  const symbol = definition.symbol.replace(/[\\{}]/g, '').trim()
  const compactSymbol = /^[a-zA-Z]{1,3}$/.test(symbol) ? symbol : definition.label.toLowerCase()
  const unit = definition.unit ? ` ${definition.unit}` : ''
  return `${compactSymbol} = ${formatNumber(raw)}${unit}`
}

function buildSpec(shape: Shape, dims: ShapeDimensions, language: Language = 'en'): ShapeSpec {
  switch (shape.id) {
    case 'triangle': {
      const base = dimValue(dims, 'base', 10)
      const height = dimValue(dims, 'height', 7)
      const apex = Math.min(Math.max(dimValue(dims, 'apexOffset', base / 2), 0.01), base - 0.01)
      return {
        polygon: [
          { x: 0, y: 0 },
          { x: base, y: 0 },
          { x: apex, y: height },
        ],
        guides: [
          {
            from: { x: 0, y: 0 },
            to: { x: base, y: 0 },
            label: dimensionText(shape, dims, 'base'),
            dimensionKey: 'base',
            offset: { x: 0, y: 22 },
          },
          {
            from: { x: apex, y: 0 },
            to: { x: apex, y: height },
            label: dimensionText(shape, dims, 'height'),
            dimensionKey: 'height',
            offset: { x: 20, y: 0 },
            dashed: true,
          },
        ],
      }
    }
    case 'square': {
      const side = dimValue(dims, 'side', 6)
      return {
        polygon: [
          { x: 0, y: 0 },
          { x: side, y: 0 },
          { x: side, y: side },
          { x: 0, y: side },
        ],
        guides: [
          {
            from: { x: 0, y: 0 },
            to: { x: side, y: 0 },
            label: dimensionText(shape, dims, 'side'),
            dimensionKey: 'side',
            offset: { x: 0, y: 22 },
          },
        ],
      }
    }
    case 'rectangle': {
      const length = dimValue(dims, 'length', 8)
      const width = dimValue(dims, 'width', 5)
      return {
        polygon: [
          { x: 0, y: 0 },
          { x: length, y: 0 },
          { x: length, y: width },
          { x: 0, y: width },
        ],
        guides: [
          {
            from: { x: 0, y: 0 },
            to: { x: length, y: 0 },
            label: dimensionText(shape, dims, 'length'),
            dimensionKey: 'length',
            offset: { x: 0, y: 22 },
          },
          {
            from: { x: length, y: 0 },
            to: { x: length, y: width },
            label: dimensionText(shape, dims, 'width'),
            dimensionKey: 'width',
            offset: { x: 26, y: 0 },
          },
        ],
      }
    }
    case 'circle': {
      const radius = dimValue(dims, 'radius', 5)
      return {
        circle: { radius },
        center: { x: 0, y: 0 },
        guides: [
          {
            from: { x: 0, y: 0 },
            to: { x: radius, y: 0 },
            label: dimensionText(shape, dims, 'radius'),
            dimensionKey: 'radius',
            offset: { x: 0, y: -18 },
          },
        ],
      }
    }
    case 'semicircle': {
      const radius = dimValue(dims, 'radius', 5)
      return {
        semicircle: { radius },
        center: { x: 0, y: 0 },
        guides: [
          {
            from: { x: 0, y: 0 },
            to: { x: radius, y: 0 },
            label: dimensionText(shape, dims, 'radius'),
            dimensionKey: 'radius',
            offset: { x: 0, y: 18 },
          },
        ],
      }
    }
    case 'parallelogram': {
      const base = dimValue(dims, 'base', 8)
      const height = dimValue(dims, 'height', 4)
      const side = Math.max(dimValue(dims, 'side', 5), height + 0.05)
      const skew = Math.sqrt(Math.max(side ** 2 - height ** 2, 0.01))
      return {
        polygon: [
          { x: 0, y: 0 },
          { x: base, y: 0 },
          { x: base + skew, y: height },
          { x: skew, y: height },
        ],
        guides: [
          {
            from: { x: 0, y: 0 },
            to: { x: base, y: 0 },
            label: dimensionText(shape, dims, 'base'),
            dimensionKey: 'base',
            offset: { x: 0, y: 22 },
          },
          {
            from: { x: skew, y: 0 },
            to: { x: skew, y: height },
            label: dimensionText(shape, dims, 'height'),
            dimensionKey: 'height',
            offset: { x: -20, y: 0 },
            dashed: true,
          },
          {
            from: { x: 0, y: 0 },
            to: { x: skew, y: height },
            label: dimensionText(shape, dims, 'side'),
            dimensionKey: 'side',
            offset: { x: -28, y: -4 },
          },
        ],
      }
    }
    case 'rhombus': {
      const d1 = dimValue(dims, 'diagonal1', 8)
      const d2 = dimValue(dims, 'diagonal2', 5)
      return {
        polygon: [
          { x: -d1 / 2, y: 0 },
          { x: 0, y: d2 / 2 },
          { x: d1 / 2, y: 0 },
          { x: 0, y: -d2 / 2 },
        ],
        center: { x: 0, y: 0 },
        guides: [
          {
            from: { x: -d1 / 2, y: 0 },
            to: { x: d1 / 2, y: 0 },
            label: dimensionText(shape, dims, 'diagonal1'),
            dimensionKey: 'diagonal1',
            offset: { x: 0, y: 20 },
            dashed: true,
          },
          {
            from: { x: 0, y: -d2 / 2 },
            to: { x: 0, y: d2 / 2 },
            label: dimensionText(shape, dims, 'diagonal2'),
            dimensionKey: 'diagonal2',
            offset: { x: 34, y: 0 },
            dashed: true,
          },
        ],
      }
    }
    case 'trapezoid': {
      const baseA = dimValue(dims, 'baseA', 6)
      const baseB = dimValue(dims, 'baseB', 10)
      const height = dimValue(dims, 'height', 4)
      return {
        polygon: [
          { x: -baseB / 2, y: 0 },
          { x: baseB / 2, y: 0 },
          { x: baseA / 2, y: height },
          { x: -baseA / 2, y: height },
        ],
        guides: [
          {
            from: { x: -baseB / 2, y: 0 },
            to: { x: baseB / 2, y: 0 },
            label: dimensionText(shape, dims, 'baseB'),
            dimensionKey: 'baseB',
            offset: { x: 0, y: 22 },
          },
          {
            from: { x: -baseA / 2, y: height },
            to: { x: baseA / 2, y: height },
            label: dimensionText(shape, dims, 'baseA'),
            dimensionKey: 'baseA',
            offset: { x: 0, y: -18 },
          },
          {
            from: { x: 0, y: 0 },
            to: { x: 0, y: height },
            label: dimensionText(shape, dims, 'height'),
            dimensionKey: 'height',
            offset: { x: 22, y: 0 },
            dashed: true,
          },
        ],
      }
    }
    case 'kite': {
      const d1 = dimValue(dims, 'diagonal1', 9)
      const d2 = dimValue(dims, 'diagonal2', 6)
      const top = Math.min(Math.max(dimValue(dims, 'topSegment', 3), 0.1), d1 - 0.1)
      const intersectionY = d1 / 2 - top
      return {
        polygon: [
          { x: 0, y: d1 / 2 },
          { x: d2 / 2, y: intersectionY },
          { x: 0, y: -d1 / 2 },
          { x: -d2 / 2, y: intersectionY },
        ],
        guides: [
          {
            from: { x: 0, y: -d1 / 2 },
            to: { x: 0, y: d1 / 2 },
            label: dimensionText(shape, dims, 'diagonal1'),
            dimensionKey: 'diagonal1',
            offset: { x: 24, y: 0 },
            dashed: true,
          },
          {
            from: { x: -d2 / 2, y: intersectionY },
            to: { x: d2 / 2, y: intersectionY },
            label: dimensionText(shape, dims, 'diagonal2'),
            dimensionKey: 'diagonal2',
            offset: { x: 0, y: 20 },
            dashed: true,
          },
          {
            from: { x: 0, y: d1 / 2 },
            to: { x: 0, y: intersectionY },
            label: dimensionText(shape, dims, 'topSegment'),
            dimensionKey: 'topSegment',
            offset: { x: -30, y: 0 },
          },
        ],
      }
    }
    case 'pentagon':
    case 'hexagon':
    case 'regular-polygon': {
      const sides =
        shape.id === 'pentagon'
          ? 5
          : shape.id === 'hexagon'
            ? 6
            : Math.max(3, Math.min(20, Math.round(dimValue(dims, 'sides', 7))))
      const side = dimValue(dims, 'side', 5)
      const radius = side / (2 * Math.sin(Math.PI / sides))
      const points = Array.from({ length: sides }, (_, index) => {
        const angle = Math.PI / 2 + (index / sides) * Math.PI * 2
        return { x: radius * Math.cos(angle), y: radius * Math.sin(angle) }
      })
      const second = points[1] ?? { x: radius, y: 0 }
      const apothemPoint = {
        x: (points[0].x + second.x) / 2,
        y: (points[0].y + second.y) / 2,
      }
      const guides: Guide2D[] = [
        {
          from: points[0],
          to: second,
          label: dimensionText(shape, dims, 'side'),
          dimensionKey: 'side',
          offset: { x: 30, y: 0 },
        },
        {
          from: { x: 0, y: 0 },
          to: apothemPoint,
          label: shape.metrics.find((metric) => metric.key === 'apothem')?.label ?? 'apothem',
          offset: { x: 8, y: 0 },
          dashed: true,
        },
      ]
      if (shape.id === 'regular-polygon') {
        guides.push({
          from: { x: -radius, y: -radius },
          to: { x: radius, y: -radius },
          label:
            language === 'km'
              ? `${sides} ${findDimension(shape, 'sides')?.label ?? ''}`.trim()
              : `${sides} sides`,
          dimensionKey: 'sides',
          offset: { x: 0, y: 20 },
        })
      }
      return { polygon: points, center: { x: 0, y: 0 }, guides }
    }
    default:
      return { guides: [] }
  }
}

function circlePath(cx: number, cy: number, radius: number): string {
  return `M ${cx - radius} ${cy} a ${radius} ${radius} 0 1 0 ${radius * 2} 0 a ${radius} ${radius} 0 1 0 -${radius * 2} 0`
}

export function Shape2D({
  shape,
  dimensions,
  showLabels = true,
  highlight,
  className = '',
}: {
  shape: Shape
  dimensions: ShapeDimensions
  showLabels?: boolean
  highlight?: string
  className?: string
}) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const { language, num, t } = useI18n()
  const spec = useMemo(() => buildSpec(shape, dimensions, language), [shape, dimensions, language])

  const allPoints: Vec2[] = [...(spec.polygon ?? [])]
  if (spec.circle) {
    allPoints.push(
      { x: -spec.circle.radius, y: -spec.circle.radius },
      { x: spec.circle.radius, y: spec.circle.radius },
    )
  }
  if (spec.semicircle) {
    allPoints.push(
      { x: -spec.semicircle.radius, y: 0 },
      { x: spec.semicircle.radius, y: spec.semicircle.radius },
    )
  }
  for (const guide of spec.guides) allPoints.push(guide.from, guide.to)
  if (spec.center) allPoints.push(spec.center)
  if (allPoints.length === 0) allPoints.push({ x: -1, y: -1 }, { x: 1, y: 1 })

  const xs = allPoints.map((point) => point.x)
  const ys = allPoints.map((point) => point.y)
  const rawMinX = Math.min(...xs)
  const rawMaxX = Math.max(...xs)
  const rawMinY = Math.min(...ys)
  const rawMaxY = Math.max(...ys)
  const rawWidth = Math.max(rawMaxX - rawMinX, 0.001)
  const rawHeight = Math.max(rawMaxY - rawMinY, 0.001)
  const viewWidth = 640
  const viewHeight = 400
  const paddingX = 105
  const paddingY = 85
  const scale = Math.min((viewWidth - paddingX * 2) / rawWidth, (viewHeight - paddingY * 2) / rawHeight)
  const offsetX = viewWidth / 2 - ((rawMinX + rawMaxX) / 2) * scale
  const offsetY = viewHeight / 2 + ((rawMinY + rawMaxY) / 2) * scale

  const toScreen = (point: Vec2) => ({
    x: offsetX + point.x * scale,
    y: offsetY - point.y * scale,
  })

  const pointsAttribute = spec.polygon
    ?.map((point) => {
      const screen = toScreen(point)
      return `${screen.x.toFixed(2)},${screen.y.toFixed(2)}`
    })
    .join(' ')

  const ariaMetrics = shape.metrics
    .filter((metric) => metric.kind === 'area' || metric.kind === 'length')
    .slice(0, 2)
    .map((metric) => `${metric.label} ${num(formatMetricValue(metric.compute(dimensions), metric.precision ?? 2))}`)

  return (
    <div className={`shape-figure ${className}`.trim()}>
      <svg
        viewBox={`0 0 ${viewWidth} ${viewHeight}`}
        role="img"
        aria-label={t('lab.diagramAria', { name: shape.name, metrics: ariaMetrics.join('; ') })}
        className="shape-svg"
      >
        <defs>
          <pattern id={`grid-${uid}`} width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(201,238,110,0.07)" strokeWidth="1" />
          </pattern>
          <linearGradient id={`fill-${uid}`} x1="0" y1="0" x2="0.9" y2="1">
            <stop offset="0%" stopColor="#c9ee6e" stopOpacity="0.17" />
            <stop offset="100%" stopColor="#1b5c43" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <rect width={viewWidth} height={viewHeight} fill={`url(#grid-${uid})`} opacity="0.85" />

        {spec.polygon && (
          <polygon
            points={pointsAttribute}
            fill={`url(#fill-${uid})`}
            stroke="#e8f4cf"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        )}
        {spec.circle && (
          <circle
            cx={toScreen({ x: 0, y: 0 }).x}
            cy={toScreen({ x: 0, y: 0 }).y}
            r={spec.circle.radius * scale}
            fill={`url(#fill-${uid})`}
            stroke="#e8f4cf"
            strokeWidth="1.8"
          />
        )}
        {spec.semicircle && (
          <path
            d={`M ${toScreen({ x: -spec.semicircle.radius, y: 0 }).x} ${toScreen({ x: 0, y: 0 }).y} A ${spec.semicircle.radius * scale} ${spec.semicircle.radius * scale} 0 0 1 ${toScreen({ x: spec.semicircle.radius, y: 0 }).x} ${toScreen({ x: 0, y: 0 }).y} Z`}
            fill={`url(#fill-${uid})`}
            stroke="#e8f4cf"
            strokeWidth="1.8"
          />
        )}

        {spec.center && (
          <circle
            cx={toScreen(spec.center).x}
            cy={toScreen(spec.center).y}
            r="3"
            fill="#c9ee6e"
            stroke="#0d1310"
            strokeWidth="1"
          />
        )}

        {showLabels &&
          spec.guides.map((guide, index) => {
            const start = toScreen(guide.from)
            const end = toScreen(guide.to)
            const midpoint = { x: (start.x + end.x) / 2, y: (start.y + end.y) / 2 }
            const labelPoint = {
              x: midpoint.x + (guide.offset?.x ?? 0),
              y: midpoint.y + (guide.offset?.y ?? 0),
            }
            const isHighlighted = highlight === guide.dimensionKey
            return (
              <g key={`${guide.dimensionKey ?? 'guide'}-${index}`}>
                <line
                  x1={start.x}
                  y1={start.y}
                  x2={end.x}
                  y2={end.y}
                  stroke={isHighlighted ? '#e8ffab' : 'rgba(201,238,110,0.58)'}
                  strokeWidth={isHighlighted ? 2.2 : 1}
                  strokeDasharray={guide.dashed ? '4 5' : undefined}
                  opacity={guide.dashed ? 0.9 : 1}
                />
                {guide.label && (
                  <text
                    x={labelPoint.x}
                    y={labelPoint.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={isHighlighted ? '#e8ffab' : '#f0eee3'}
                    stroke="#0d1310"
                    strokeWidth="4"
                    paintOrder="stroke"
                    fontFamily="Inter Variable, Inter, sans-serif"
                    fontSize="12.5"
                    fontWeight="550"
                  >
                    {guide.label}
                  </text>
                )}
                <circle cx={start.x} cy={start.y} r="2" fill="rgba(201,238,110,.8)" />
                <circle cx={end.x} cy={end.y} r="2" fill="rgba(201,238,110,.8)" />
              </g>
            )
          })}
      </svg>
    </div>
  )
}

/** Tiny static preview for cards and lists. */
export function Shape2DGlyph({ shape }: { shape: Shape }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const defaults = useMemo(() => {
    const values: ShapeDimensions = {}
    for (const dimension of shape.dimensions) {
      const safeDefault =
        shape.id === 'triangle' ? dimension.defaultValue : (dimension.defaultValue ?? dimension.min)
      values[dimension.key] = safeDefault
    }
    return values
  }, [shape])
  const spec = buildSpec(shape, defaults)

  return (
    <svg viewBox="0 0 160 120" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`card-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c9ee6e" stopOpacity=".18" />
          <stop offset="100%" stopColor="#1b5c43" stopOpacity=".12" />
        </linearGradient>
      </defs>
      {spec.polygon && (
        <polygon
          points={spec.polygon
            .map((point) => {
              const xs = spec.polygon!.map((value) => value.x)
              const ys = spec.polygon!.map((value) => value.y)
              const minX = Math.min(...xs)
              const maxX = Math.max(...xs)
              const minY = Math.min(...ys)
              const maxY = Math.max(...ys)
              const scale = Math.min(105 / Math.max(maxX - minX, 0.01), 80 / Math.max(maxY - minY, 0.01))
              return `${80 + (point.x - (minX + maxX) / 2) * scale},${60 - (point.y - (minY + maxY) / 2) * scale}`
            })
            .join(' ')}
          fill={`url(#card-${uid})`}
          stroke="#c9ee6e"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      )}
      {spec.circle && <circle cx="80" cy="60" r="37" fill={`url(#card-${uid})`} stroke="#c9ee6e" strokeWidth="1.5" />}
      {spec.semicircle && (
        <path d="M 42 74 A 38 38 0 0 1 118 74 Z" fill={`url(#card-${uid})`} stroke="#c9ee6e" strokeWidth="1.5" />
      )}
    </svg>
  )
}

export { circlePath }
