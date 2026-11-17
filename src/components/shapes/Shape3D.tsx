import { useEffect, useMemo, useRef, useState } from 'react'
import type { Shape, ShapeDimensions } from '../../types/content'
import { formatMetricValue, formatNumber } from '../../lib/format'
import { useI18n } from '../../lib/i18n'
import { IconRotate, IconZoom } from '../ui/Icons'

type Vec3 = [number, number, number]

interface Guide {
  from: Vec3
  to: Vec3
  label: string
}

interface Mesh {
  vertices: Vec3[]
  faces: number[][]
  guides: Guide[]
  strokeAlpha?: number
  labels?: { text: string; position: Vec3 }[]
}

function value(dims: ShapeDimensions, key: string, fallback = 1): number {
  const raw = dims[key]
  return Number.isFinite(raw) && raw > 0 ? raw : fallback
}

function boxMesh(l: number, h: number, w: number, mode: 'cube' | 'cuboid'): Mesh {
  const x = l / 2
  const y = h / 2
  const z = w / 2
  const vertices: Vec3[] = [
    [-x, -y, -z],
    [x, -y, -z],
    [x, y, -z],
    [-x, -y, -z + 0],
  ]
  // Replace the placeholder above with the full set in a clear order.
  vertices.splice(3, 1, [-x, y, -z])
  vertices.push(
    [-x, -y, z],
    [x, -y, z],
    [x, y, z],
    [-x, y, z],
  )
  const faces = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [0, 4, 7, 3],
    [1, 2, 6, 5],
    [0, 1, 5, 4],
    [3, 7, 6, 2],
  ]
  const guides: Guide[] =
    mode === 'cube'
      ? [
          { from: [-x, -y, z], to: [x, -y, z], label: `a = ${formatNumber(l)}` },
        ]
      : [
          { from: [-x, -y, z], to: [x, -y, z], label: `l = ${formatNumber(l)}` },
          { from: [x, -y, z], to: [x, y, z], label: `h = ${formatNumber(h)}` },
          { from: [x, -y, -z], to: [x, -y, z], label: `w = ${formatNumber(w)}` },
        ]
  return { vertices, faces, guides, labels: [] }
}

function sphereMesh(r: number): Mesh {
  const latSegments = 14
  const lonSegments = 28
  const vertices: Vec3[] = []
  const faces: number[][] = []

  for (let i = 1; i < latSegments; i += 1) {
    const phi = -Math.PI / 2 + (i / latSegments) * Math.PI
    const ringRadius = r * Math.cos(phi)
    const y = r * Math.sin(phi)
    for (let j = 0; j < lonSegments; j += 1) {
      const theta = (j / lonSegments) * Math.PI * 2
      vertices.push([ringRadius * Math.cos(theta), y, ringRadius * Math.sin(theta)])
    }
  }
  const north = vertices.length
  vertices.push([0, r, 0])
  const south = vertices.length
  vertices.push([0, -r, 0])

  for (let i = 0; i < latSegments - 2; i += 1) {
    for (let j = 0; j < lonSegments; j += 1) {
      const next = (j + 1) % lonSegments
      const a = i * lonSegments + j
      const b = i * lonSegments + next
      const c = (i + 1) * lonSegments + next
      const d = (i + 1) * lonSegments + j
      faces.push([a, b, c, d])
    }
  }
  for (let j = 0; j < lonSegments; j += 1) {
    const next = (j + 1) % lonSegments
    faces.push([north, next, j])
    faces.push([south, (latSegments - 2) * lonSegments + j, (latSegments - 2) * lonSegments + next])
  }

  return {
    vertices,
    faces,
    guides: [{ from: [0, 0, 0], to: [r, 0, 0], label: `r = ${formatNumber(r)}` }],
    strokeAlpha: 0.11,
  }
}

function cylinderMesh(r: number, h: number): Mesh {
  const segments = 32
  const yTop = h / 2
  const yBottom = -h / 2
  const vertices: Vec3[] = []
  for (let i = 0; i < segments; i += 1) {
    const angle = (i / segments) * Math.PI * 2
    vertices.push([r * Math.cos(angle), yBottom, r * Math.sin(angle)])
  }
  for (let i = 0; i < segments; i += 1) {
    const angle = (i / segments) * Math.PI * 2
    vertices.push([r * Math.cos(angle), yTop, r * Math.sin(angle)])
  }
  const bottomCenter = vertices.length
  vertices.push([0, yBottom, 0])
  const topCenter = vertices.length
  vertices.push([0, yTop, 0])

  const faces: number[][] = []
  for (let i = 0; i < segments; i += 1) {
    const next = (i + 1) % segments
    faces.push([i, next, segments + next, segments + i])
    faces.push([bottomCenter, next, i])
    faces.push([topCenter, segments + i, segments + next])
  }

  return {
    vertices,
    faces,
    guides: [
      { from: [0, yTop, 0], to: [r, yTop, 0], label: `r = ${formatNumber(r)}` },
      { from: [r, yBottom, 0], to: [r, yTop, 0], label: `h = ${formatNumber(h)}` },
    ],
    strokeAlpha: 0.16,
  }
}

function coneMesh(r: number, h: number): Mesh {
  const segments = 32
  const yBase = -h / 2
  const vertices: Vec3[] = []
  for (let i = 0; i < segments; i += 1) {
    const angle = (i / segments) * Math.PI * 2
    vertices.push([r * Math.cos(angle), yBase, r * Math.sin(angle)])
  }
  const apex = vertices.length
  vertices.push([0, h / 2, 0])
  const baseCenter = vertices.length
  vertices.push([0, yBase, 0])

  const faces: number[][] = []
  for (let i = 0; i < segments; i += 1) {
    const next = (i + 1) % segments
    faces.push([i, next, apex])
    faces.push([baseCenter, next, i])
  }

  return {
    vertices,
    faces,
    guides: [
      { from: [0, yBase, 0], to: [r, yBase, 0], label: `r = ${formatNumber(r)}` },
      { from: [0, yBase, 0], to: [0, h / 2, 0], label: `h = ${formatNumber(h)}` },
    ],
    strokeAlpha: 0.15,
  }
}

function pyramidMesh(base: number, h: number): Mesh {
  const b = base / 2
  const yBase = -h / 2
  const vertices: Vec3[] = [
    [-b, yBase, -b],
    [b, yBase, -b],
    [b, yBase, b],
    [-b, yBase, b],
    [0, h / 2, 0],
  ]
  const faces = [
    [0, 1, 4],
    [1, 2, 4],
    [2, 3, 4],
    [3, 0, 4],
    [0, 3, 2, 1],
  ]
  return {
    vertices,
    faces,
    guides: [
      { from: [-b, yBase, b], to: [b, yBase, b], label: `b = ${formatNumber(base)}` },
      { from: [0, yBase, 0], to: [0, h / 2, 0], label: `h = ${formatNumber(h)}` },
    ],
    strokeAlpha: 0.24,
  }
}

function triangularPrismMesh(base: number, triangleHeight: number, length: number): Mesh {
  const halfBase = base / 2
  const halfHeight = triangleHeight / 2
  const halfLength = length / 2
  const vertices: Vec3[] = [
    [-halfBase, -halfHeight, -halfLength],
    [halfBase, -halfHeight, -halfLength],
    [0, halfHeight, -halfLength],
    [-halfBase, -halfHeight, halfLength],
    [halfBase, -halfHeight, halfLength],
    [0, halfHeight, halfLength],
  ]
  const faces = [
    [0, 1, 2],
    [3, 5, 4],
    [0, 3, 4, 1],
    [1, 4, 5, 2],
    [2, 5, 3, 0],
  ]
  return {
    vertices,
    faces,
    guides: [
      { from: [0, -halfHeight, halfLength], to: [0, halfHeight, halfLength], label: `h = ${formatNumber(triangleHeight)}` },
      { from: [-halfBase, -halfHeight, halfLength], to: [halfBase, -halfHeight, halfLength], label: `b = ${formatNumber(base)}` },
      { from: [halfBase, -halfHeight, -halfLength], to: [halfBase, -halfHeight, halfLength], label: `l = ${formatNumber(length)}` },
    ],
    strokeAlpha: 0.25,
  }
}

export function buildShapeMesh(shapeId: string, dimensions: ShapeDimensions): Mesh | null {
  switch (shapeId) {
    case 'cube': {
      const a = value(dimensions, 'side', 5)
      return boxMesh(a, a, a, 'cube')
    }
    case 'cuboid':
    case 'rectangular-prism': {
      return boxMesh(
        value(dimensions, 'length', 6),
        value(dimensions, 'height', 4),
        value(dimensions, 'width', 3),
        'cuboid',
      )
    }
    case 'sphere':
      return sphereMesh(value(dimensions, 'radius', 5))
    case 'cylinder':
      return cylinderMesh(value(dimensions, 'radius', 4), value(dimensions, 'height', 10))
    case 'cone':
      return coneMesh(value(dimensions, 'radius', 4), value(dimensions, 'height', 9))
    case 'pyramid':
      return pyramidMesh(value(dimensions, 'base', 7), value(dimensions, 'height', 8))
    case 'triangular-prism':
      return triangularPrismMesh(
        value(dimensions, 'base', 6),
        value(dimensions, 'triangleHeight', 5),
        value(dimensions, 'length', 10),
      )
    default:
      return null
  }
}

function rotatePoint(point: Vec3, yaw: number, pitch: number): Vec3 {
  const cosY = Math.cos(yaw)
  const sinY = Math.sin(yaw)
  const x1 = point[0] * cosY + point[2] * sinY
  const z1 = -point[0] * sinY + point[2] * cosY
  const cosP = Math.cos(pitch)
  const sinP = Math.sin(pitch)
  return [x1, point[1] * cosP - z1 * sinP, point[1] * sinP + z1 * cosP]
}

export function Shape3D({
  shape,
  dimensions,
  showLabels,
  className = '',
}: {
  shape: Shape
  dimensions: ShapeDimensions
  showLabels: boolean
  className?: string
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { num, t } = useI18n()
  const [size, setSize] = useState({ width: 640, height: 460 })
  const [yaw, setYaw] = useState(-0.62)
  const [pitch, setPitch] = useState(0.34)
  const [zoom, setZoom] = useState(1)
  const drag = useRef<{ x: number; y: number; yaw: number; pitch: number } | null>(null)
  const mesh = useMemo(() => buildShapeMesh(shape.id, dimensions), [shape.id, dimensions])

  useEffect(() => {
    const element = containerRef.current
    if (!element) return
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (!entry) return
      const { width, height } = entry.contentRect
      if (width > 0 && height > 0) setSize({ width, height })
    })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      let frame = 0
      const startTime = performance.now()
      const startYaw = -1.18
      const endYaw = -0.62
      const animate = (time: number) => {
        const progress = Math.min(1, (time - startTime) / 900)
        const eased = 1 - (1 - progress) ** 3
        setYaw(startYaw + (endYaw - startYaw) * eased)
        if (progress < 1) frame = requestAnimationFrame(animate)
      }
      frame = requestAnimationFrame(animate)
      return () => cancelAnimationFrame(frame)
    }
    return undefined
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !mesh) return
    const context = canvas.getContext('2d')
    if (!context) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const width = size.width
    const height = size.height
    canvas.width = Math.max(1, Math.round(width * dpr))
    canvas.height = Math.max(1, Math.round(height * dpr))
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    context.setTransform(dpr, 0, 0, dpr, 0, 0)
    context.clearRect(0, 0, width, height)

    const maxExtent = Math.max(...mesh.vertices.flatMap((vertex) => vertex.map((coordinate) => Math.abs(coordinate))), 0.0001)
    const normalized = mesh.vertices.map((vertex) => vertex.map((coordinate) => coordinate / maxExtent) as Vec3)
    const rotated = normalized.map((vertex) => rotatePoint(vertex, yaw, pitch))
    const focal = Math.min(width, height) * 1.08 * zoom
    const distance = 3.55
    const cx = width / 2
    const cy = height / 2

    const project = (point: Vec3) => {
      const depth = distance - point[2]
      const scale = focal / Math.max(depth, 0.6)
      return { x: cx + point[0] * scale, y: cy - point[1] * scale, depth }
    }

    const light: Vec3 = [-0.35, 0.72, 0.8]
    const lightLength = Math.hypot(...light)
    const lightUnit = light.map((component) => component / lightLength)

    const faceData = mesh.faces.map((face) => {
      const points = face.map((index) => rotated[index])
      const projected = points.map(project)
      const avgZ = points.reduce((total, point) => total + point[2], 0) / points.length
      const normal = normalOf(points)
      const brightness = Math.abs(normal[0] * lightUnit[0] + normal[1] * lightUnit[1] + normal[2] * lightUnit[2])
      return { face, points, projected, avgZ, brightness }
    })

    faceData.sort((a, b) => a.avgZ - b.avgZ)

    for (const { projected, brightness } of faceData) {
      if (projected.length < 3) continue
      context.beginPath()
      context.moveTo(projected[0].x, projected[0].y)
      for (let index = 1; index < projected.length; index += 1) {
        context.lineTo(projected[index].x, projected[index].y)
      }
      context.closePath()
      const shade = 0.38 + 0.62 * brightness
      context.fillStyle = `rgb(${Math.round(31 * shade + 5)}, ${Math.round(88 * shade + 10)}, ${Math.round(65 * shade + 8)})`
      context.fill()
      if (mesh.strokeAlpha) {
        context.strokeStyle = `rgba(201, 238, 110, ${mesh.strokeAlpha})`
        context.lineWidth = 0.8
        context.stroke()
      }
    }

    // Ground reference ellipse gives the object a sense of place without pretending to be a shadow.
    context.save()
    context.strokeStyle = 'rgba(201, 238, 110, 0.16)'
    context.lineWidth = 1
    context.beginPath()
    context.ellipse(cx, cy + Math.min(width, height) * 0.3, Math.min(width, height) * 0.23, Math.min(width, height) * 0.055, 0, 0, Math.PI * 2)
    context.stroke()
    context.restore()

    if (showLabels) {
      context.font = '500 11px "Inter Variable", Inter, sans-serif'
      context.textBaseline = 'middle'
      for (const guide of mesh.guides) {
        const start = project(rotatePoint([guide.from[0] / maxExtent, guide.from[1] / maxExtent, guide.from[2] / maxExtent], yaw, pitch))
        const end = project(rotatePoint([guide.to[0] / maxExtent, guide.to[1] / maxExtent, guide.to[2] / maxExtent], yaw, pitch))
        context.save()
        context.strokeStyle = 'rgba(201, 238, 110, 0.72)'
        context.lineWidth = 1.2
        context.setLineDash([4, 4])
        context.beginPath()
        context.moveTo(start.x, start.y)
        context.lineTo(end.x, end.y)
        context.stroke()
        context.restore()

        const labelX = (start.x + end.x) / 2
        const labelY = (start.y + end.y) / 2 - 14
        drawLabel(context, guide.label, labelX, labelY)
        context.save()
        context.fillStyle = 'rgba(201, 238, 110, 0.9)'
        context.beginPath()
        context.arc(end.x, end.y, 2.4, 0, Math.PI * 2)
        context.fill()
        context.restore()
      }
    }

    if (mesh.vertices.length === 0) {
      context.fillStyle = '#a4aa9e'
      context.font = '13px Inter, sans-serif'
      context.fillText(t('lab.previewUnavailable'), 16, 28)
    }
  }, [mesh, size, yaw, pitch, zoom, showLabels, t])

  if (!mesh) {
    return (
      <div className={`shape-canvas shape-canvas--empty ${className}`}>
        <p>{t('lab.staticReference')}</p>
      </div>
    )
  }

  const liveMetrics = shape.metrics
    .filter((metric) => metric.kind === 'volume' || metric.kind === 'surface' || metric.kind === 'area')
    .slice(0, 2)
    .map((metric) => {
      const computed = metric.compute(dimensions)
      const unit = metric.kind === 'volume' ? 'cm³' : 'cm²'
      return `${metric.label}: ${num(formatMetricValue(computed, metric.precision ?? 2))} ${unit}`
    })

  return (
    <div
      ref={containerRef}
      className={`shape-canvas ${className}`.trim()}
      style={{ position: 'relative', touchAction: 'none' }}
    >
      <canvas
        ref={canvasRef}
        tabIndex={0}
        role="img"
        aria-label={t('lab.interactive3dAria', { name: shape.name, metrics: liveMetrics.join('; ') })}
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId)
          drag.current = { x: event.clientX, y: event.clientY, yaw, pitch }
        }}
        onPointerMove={(event) => {
          if (!drag.current) return
          const deltaX = event.clientX - drag.current.x
          const deltaY = event.clientY - drag.current.y
          setYaw(drag.current.yaw + deltaX * 0.007)
          setPitch(Math.max(-1.15, Math.min(1.15, drag.current.pitch + deltaY * 0.006)))
        }}
        onPointerUp={(event) => {
          drag.current = null
          event.currentTarget.releasePointerCapture(event.pointerId)
        }}
        onPointerCancel={() => {
          drag.current = null
        }}
        onWheel={(event) => {
          event.preventDefault()
          setZoom((current) => Math.max(0.6, Math.min(2.1, current - event.deltaY * 0.0012)))
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') {
            event.preventDefault()
            setYaw((current) => current - 0.12)
          } else if (event.key === 'ArrowRight') {
            event.preventDefault()
            setYaw((current) => current + 0.12)
          } else if (event.key === 'ArrowUp') {
            event.preventDefault()
            setPitch((current) => Math.max(-1.15, current - 0.1))
          } else if (event.key === 'ArrowDown') {
            event.preventDefault()
            setPitch((current) => Math.min(1.15, current + 0.1))
          } else if (event.key === '+' || event.key === '=') {
            event.preventDefault()
            setZoom((current) => Math.min(2.1, current + 0.12))
          } else if (event.key === '-' || event.key === '_') {
            event.preventDefault()
            setZoom((current) => Math.max(0.6, current - 0.12))
          } else if (event.key === '0') {
            event.preventDefault()
            setZoom(1)
            setYaw(-0.62)
            setPitch(0.34)
          }
        }}
      />
      <div className="viewer-toolbar" aria-label={t('lab.viewControls')}>
        <button
          type="button"
          className="viewer-control"
          onClick={() => setZoom((current) => Math.min(2.1, current + 0.12))}
          aria-label={t('lab.zoomIn')}
        >
          <IconZoom size={15} />
        </button>
        <button
          type="button"
          className="viewer-control"
          onClick={() => setZoom((current) => Math.max(0.6, current - 0.12))}
          aria-label={t('lab.zoomOut')}
          style={{ fontSize: '1rem', lineHeight: 1 }}
        >
          −
        </button>
        <button
          type="button"
          className="viewer-control"
          onClick={() => {
            setYaw(-0.62)
            setPitch(0.34)
            setZoom(1)
          }}
          aria-label={t('lab.resetView')}
        >
          <IconRotate size={15} />
        </button>
      </div>
      <p className="viewer-hint">
        <IconRotate size={12} /> {t('lab.dragToRotate')} <span aria-hidden="true">·</span> {t('lab.scrollToZoom')}
      </p>
    </div>
  )
}

function normalOf(points: Vec3[]): Vec3 {
  if (points.length < 3) return [0, 0, 1]
  const a = points[0]
  const b = points[1]
  const c = points[2]
  const ab: Vec3 = [b[0] - a[0], b[1] - a[1], b[2] - a[2]]
  const ac: Vec3 = [c[0] - a[0], c[1] - a[1], c[2] - a[2]]
  const normal: Vec3 = [
    ab[1] * ac[2] - ab[2] * ac[1],
    ab[2] * ac[0] - ab[0] * ac[2],
    ab[0] * ac[1] - ab[1] * ac[0],
  ]
  const length = Math.hypot(...normal) || 1
  return [normal[0] / length, normal[1] / length, normal[2] / length]
}

function drawLabel(context: CanvasRenderingContext2D, text: string, x: number, y: number) {
  const metrics = context.measureText(text)
  const paddingX = 7
  const paddingY = 5
  const width = metrics.width + paddingX * 2
  const height = 20
  const left = Math.max(6, Math.min(x - width / 2, context.canvas.width - width - 6))
  const top = Math.max(6, y - height / 2)
  context.save()
  context.fillStyle = 'rgba(12, 18, 14, 0.86)'
  context.strokeStyle = 'rgba(201, 238, 110, 0.26)'
  context.lineWidth = 1
  context.beginPath()
  context.roundRect(left, top, width, height, 5)
  context.fill()
  context.stroke()
  context.fillStyle = '#f0eee3'
  context.fillText(text, left + paddingX, top + height / 2 + paddingY / 2)
  context.restore()
}

/** A compact static isometric preview for 3D shape cards. */
export function Shape3DGlyph({ shapeId }: { shapeId: string }) {
  const common = {
    fill: 'rgba(201,238,110,0.09)',
    stroke: '#c9ee6e',
    strokeWidth: 1.35,
    strokeLinejoin: 'round' as const,
    strokeLinecap: 'round' as const,
  }
  const line = { stroke: 'rgba(201,238,110,0.55)', strokeWidth: 1, strokeLinecap: 'round' as const }

  return (
    <svg viewBox="0 0 160 120" aria-hidden="true" focusable="false">
      {shapeId === 'sphere' && (
        <>
          <circle cx="80" cy="60" r="38" {...common} />
          <ellipse cx="80" cy="60" rx="38" ry="13" {...line} fill="none" />
          <ellipse cx="80" cy="60" rx="14" ry="38" {...line} fill="none" opacity=".55" />
        </>
      )}
      {shapeId === 'cylinder' && (
        <>
          <path d="M48 35v50c0 9 64 9 64 0V35" {...common} />
          <ellipse cx="80" cy="35" rx="32" ry="10" {...common} />
          <path d="M48 35c0 9 64 9 64 0" {...line} fill="none" />
        </>
      )}
      {shapeId === 'cone' && (
        <>
          <path d="M80 20 48 86c0 10 64 10 64 0Z" {...common} />
          <ellipse cx="80" cy="86" rx="32" ry="10" {...line} fill="none" />
          <path d="M80 20v55" {...line} opacity=".5" />
        </>
      )}
      {shapeId === 'pyramid' && (
        <>
          <path d="M48 84 28 62 58 44l36 8-10 28Z" {...common} />
          <path d="m80 17 24 35 0 28M80 17 58 44M80 17l24 35M28 62l22 22 42 0 24-35" {...line} fill="none" />
        </>
      )}
      {shapeId === 'triangular-prism' && (
        <>
          <path d="M35 82 56 34l22 48Z" {...common} />
          <path d="m56 34 45-14 22 48-23 14M35 82l43 0 45-14M78 82V34" {...line} fill="none" />
          <path d="M35 82 56 34l22 48Z" fill="none" stroke="#c9ee6e" strokeWidth="1.1" />
        </>
      )}
      {(shapeId === 'cube' || shapeId === 'cuboid' || shapeId === 'rectangular-prism') && (
        <>
          <path d="M48 38h50l18 18v38H66L48 76Z" {...common} />
          <path d="M48 38l18 18h50M66 56v38M66 94l18-18V56" {...line} fill="none" />
        </>
      )}
    </svg>
  )
}
