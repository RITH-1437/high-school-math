import { useEffect, useMemo, useRef, useState } from 'react'
import type { Shape, ShapeDimensions } from '../../types/content'
import { formatMetricValue, formatNumber } from '../../lib/format'
import { useI18n } from '../../lib/i18n'
import { IconPause, IconPlay, IconRotate, IconZoom, IconLayers, IconConstruct } from '../ui/Icons'

type Vec3 = [number, number, number]

interface Guide {
  from: Vec3
  to: Vec3
  label: string
  dimensionKey?: string
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
          { from: [-x, -y, z], to: [x, -y, z], label: `a = ${formatNumber(l)}`, dimensionKey: 'side' },
        ]
      : [
          { from: [-x, -y, z], to: [x, -y, z], label: `l = ${formatNumber(l)}`, dimensionKey: 'length' },
          { from: [x, -y, z], to: [x, y, z], label: `h = ${formatNumber(h)}`, dimensionKey: 'height' },
          { from: [x, -y, -z], to: [x, -y, z], label: `w = ${formatNumber(w)}`, dimensionKey: 'width' },
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
    guides: [{ from: [0, 0, 0], to: [r, 0, 0], label: `r = ${formatNumber(r)}`, dimensionKey: 'radius' }],
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
      { from: [0, yTop, 0], to: [r, yTop, 0], label: `r = ${formatNumber(r)}`, dimensionKey: 'radius' },
      { from: [r, yBottom, 0], to: [r, yTop, 0], label: `h = ${formatNumber(h)}`, dimensionKey: 'height' },
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
      { from: [0, yBase, 0], to: [r, yBase, 0], label: `r = ${formatNumber(r)}`, dimensionKey: 'radius' },
      { from: [0, yBase, 0], to: [0, h / 2, 0], label: `h = ${formatNumber(h)}`, dimensionKey: 'height' },
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
      { from: [-b, yBase, b], to: [b, yBase, b], label: `b = ${formatNumber(base)}`, dimensionKey: 'base' },
      { from: [0, yBase, 0], to: [0, h / 2, 0], label: `h = ${formatNumber(h)}`, dimensionKey: 'height' },
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
      { from: [0, -halfHeight, halfLength], to: [0, halfHeight, halfLength], label: `h = ${formatNumber(triangleHeight)}`, dimensionKey: 'triangleHeight' },
      { from: [-halfBase, -halfHeight, halfLength], to: [halfBase, -halfHeight, halfLength], label: `b = ${formatNumber(base)}`, dimensionKey: 'base' },
      { from: [halfBase, -halfHeight, -halfLength], to: [halfBase, -halfHeight, halfLength], label: `l = ${formatNumber(length)}`, dimensionKey: 'length' },
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
  highlight,
  className = '',
}: {
  shape: Shape
  dimensions: ShapeDimensions
  showLabels: boolean
  highlight?: string
  className?: string
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { num, t } = useI18n()
  const [size, setSize] = useState({ width: 640, height: 460 })
  const [yaw, setYaw] = useState(-0.62)
  const [pitch, setPitch] = useState(0.34)
  const [zoom, setZoom] = useState(1)
  const [spinning, setSpinning] = useState(false)
  const [explodeAmount, setExplodeAmount] = useState(0) // 0 = normal, 1 = fully exploded
  const [buildProgress, setBuildProgress] = useState(1) // 0 = vertices only, 0.5 = edges, 1 = full faces
  const [isBuilding, setIsBuilding] = useState(false)
  const drag = useRef<{ x: number; y: number; yaw: number; pitch: number } | null>(null)
  const spinPaused = useRef(false)
  const spinResumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const spinFrameRef = useRef<number>(0)
  const buildFrameRef = useRef<number>(0)
  const reducedMotion = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
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
    if (!spinning || reducedMotion.current) {
      cancelAnimationFrame(spinFrameRef.current)
      return
    }
    let lastTime: number | null = null
    const tick = (time: number) => {
      if (!spinPaused.current) {
        const delta = lastTime !== null ? time - lastTime : 0
        setYaw((y) => y + delta * 0.00055)
      }
      lastTime = time
      spinFrameRef.current = requestAnimationFrame(tick)
    }
    spinFrameRef.current = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(spinFrameRef.current)
      if (spinResumeTimer.current) clearTimeout(spinResumeTimer.current)
    }
  }, [spinning])

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
      const avgZ = points.reduce((total, point) => total + point[2], 0) / points.length
      const normal = normalOf(points)
      const brightness = Math.abs(normal[0] * lightUnit[0] + normal[1] * lightUnit[1] + normal[2] * lightUnit[2])
      
      // Calculate face centroid for explode animation
      const centroid: Vec3 = [
        points.reduce((sum, p) => sum + p[0], 0) / points.length,
        points.reduce((sum, p) => sum + p[1], 0) / points.length,
        points.reduce((sum, p) => sum + p[2], 0) / points.length,
      ]
      
      // Apply explode offset: push each face outward from origin along its centroid direction
      let explodedPoints = points
      if (explodeAmount > 0) {
        const explodeScale = 0.4 * explodeAmount // Control how far faces move
        explodedPoints = points.map((point): Vec3 => [
          point[0] + centroid[0] * explodeScale,
          point[1] + centroid[1] * explodeScale,
          point[2] + centroid[2] * explodeScale,
        ])
      }
      const projected = explodedPoints.map(project)
      
      return { face, points: explodedPoints, projected, avgZ, brightness }
    })

    faceData.sort((a, b) => a.avgZ - b.avgZ)

    // Render based on build progress
    if (buildProgress < 0.33) {
      // Stage 1: Show only vertices as dots
      const vertexAlpha = Math.min(1, buildProgress * 3)
      for (let i = 0; i < rotated.length; i += 1) {
        const p = project(rotated[i])
        context.save()
        context.fillStyle = `rgba(56, 189, 248, ${vertexAlpha})`
        context.beginPath()
        context.arc(p.x, p.y, 4, 0, Math.PI * 2)
        context.fill()
        context.restore()
      }
    } else if (buildProgress < 0.66) {
      // Stage 2: Show vertices and edges (wireframe)
      const edgeAlpha = Math.min(1, (buildProgress - 0.33) * 3)
      
      // Draw edges
      context.save()
      context.strokeStyle = `rgba(56, 189, 248, ${edgeAlpha * 0.8})`
      context.lineWidth = 1.5
      for (const { projected } of faceData) {
        if (projected.length < 2) continue
        context.beginPath()
        context.moveTo(projected[0].x, projected[0].y)
        for (let i = 1; i < projected.length; i += 1) {
          context.lineTo(projected[i].x, projected[i].y)
        }
        context.closePath()
        context.stroke()
      }
      context.restore()
      
      // Draw vertices on top
      for (let i = 0; i < rotated.length; i += 1) {
        const p = project(rotated[i])
        context.save()
        context.fillStyle = `rgba(56, 189, 248, ${Math.min(1, edgeAlpha + 0.3)})`
        context.beginPath()
        context.arc(p.x, p.y, 3.5, 0, Math.PI * 2)
        context.fill()
        context.restore()
      }
    } else {
      // Stage 3: Transition from wireframe to solid faces
      const faceAlpha = Math.min(1, (buildProgress - 0.66) * 3)
      
      for (const { projected, brightness } of faceData) {
        if (projected.length < 3) continue
        context.beginPath()
        context.moveTo(projected[0].x, projected[0].y)
        for (let index = 1; index < projected.length; index += 1) {
          context.lineTo(projected[index].x, projected[index].y)
        }
        context.closePath()
        
        // Blend from wireframe to solid
        const shade = 0.38 + 0.62 * brightness
        context.fillStyle = `rgba(${Math.round(20 * shade + 10)}, ${Math.round(50 * shade + 25)}, ${Math.round(110 * shade + 45)}, ${faceAlpha})`
        context.fill()
        
        if (mesh.strokeAlpha || faceAlpha < 1) {
          const wireAlpha = mesh.strokeAlpha || 0.16
          context.strokeStyle = `rgba(56, 189, 248, ${wireAlpha * (1 - faceAlpha * 0.7)})`
          context.lineWidth = 0.8
          context.stroke()
        }
      }
    }

    // Ground reference ellipse gives the object a sense of place without pretending to be a shadow.
    context.save()
    context.strokeStyle = 'rgba(57, 120, 214, 0.22)'
    context.lineWidth = 1
    context.beginPath()
    context.ellipse(cx, cy + Math.min(width, height) * 0.3, Math.min(width, height) * 0.23, Math.min(width, height) * 0.055, 0, 0, Math.PI * 2)
    context.stroke()
    context.restore()

    if (showLabels) {
      context.font = '500 11px "Inter Variable", Inter, sans-serif'
      context.textBaseline = 'middle'
      for (const guide of mesh.guides) {
        const isHighlighted = highlight === guide.dimensionKey
        const start = project(rotatePoint([guide.from[0] / maxExtent, guide.from[1] / maxExtent, guide.from[2] / maxExtent], yaw, pitch))
        const end = project(rotatePoint([guide.to[0] / maxExtent, guide.to[1] / maxExtent, guide.to[2] / maxExtent], yaw, pitch))
        context.save()
        context.strokeStyle = isHighlighted ? '#93c5fd' : '#38bdf8'
        context.lineWidth = isHighlighted ? 2.4 : 1.5
        context.setLineDash([4, 4])
        context.beginPath()
        context.moveTo(start.x, start.y)
        context.lineTo(end.x, end.y)
        context.stroke()
        context.restore()

        const labelX = (start.x + end.x) / 2
        const labelY = (start.y + end.y) / 2 - 14
        drawLabel(context, guide.label, labelX, labelY, isHighlighted)
        context.save()
        context.fillStyle = isHighlighted ? '#bfdbfe' : '#38bdf8'
        context.beginPath()
        context.arc(end.x, end.y, isHighlighted ? 3.2 : 2.4, 0, Math.PI * 2)
        context.fill()
        context.restore()
      }
    }

    if (mesh.vertices.length === 0) {
      context.fillStyle = '#a4aa9e'
      context.font = '13px Inter, sans-serif'
      context.fillText(t('lab.previewUnavailable'), 16, 28)
    }
  }, [mesh, size, yaw, pitch, zoom, showLabels, highlight, explodeAmount, buildProgress, t])

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
          spinPaused.current = true
          if (spinResumeTimer.current) clearTimeout(spinResumeTimer.current)
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
          if (spinning && !reducedMotion.current) {
            spinResumeTimer.current = setTimeout(() => {
              spinPaused.current = false
            }, 2000)
          }
        }}
        onPointerCancel={() => {
          drag.current = null
          if (spinning && !reducedMotion.current) {
            spinResumeTimer.current = setTimeout(() => {
              spinPaused.current = false
            }, 2000)
          }
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
          className={`viewer-control${spinning ? ' viewer-control--active' : ''}`}
          onClick={() => {
            const next = !spinning
            setSpinning(next)
            if (!next) {
              spinPaused.current = false
              if (spinResumeTimer.current) clearTimeout(spinResumeTimer.current)
            }
          }}
          aria-label={spinning ? t('lab.autoRotateOff') : t('lab.autoRotateOn')}
          aria-pressed={spinning}
        >
          {spinning ? <IconPause size={14} /> : <IconPlay size={14} />}
        </button>
        <button
          type="button"
          className={`viewer-control${isBuilding ? ' viewer-control--active' : ''}`}
          onClick={() => {
            if (isBuilding) {
              // Stop the animation
              cancelAnimationFrame(buildFrameRef.current)
              setIsBuilding(false)
              setBuildProgress(1)
            } else {
              // Start the build animation sequence
              setIsBuilding(true)
              setBuildProgress(0)
              
              if (!reducedMotion.current) {
                const startTime = performance.now()
                const duration = 3000 // 3 seconds total animation
                
                const animate = (time: number) => {
                  const elapsed = time - startTime
                  const progress = Math.min(1, elapsed / duration)
                  
                  // Ease-in-out for smoother transitions between stages
                  const eased = progress < 0.5 
                    ? 2 * progress * progress 
                    : 1 - Math.pow(-2 * progress + 2, 2) / 2
                  
                  setBuildProgress(eased)
                  
                  if (progress < 1) {
                    buildFrameRef.current = requestAnimationFrame(animate)
                  } else {
                    setIsBuilding(false)
                  }
                }
                buildFrameRef.current = requestAnimationFrame(animate)
              } else {
                // No animation, just show final state
                setBuildProgress(1)
                setIsBuilding(false)
              }
            }
          }}
          aria-label={isBuilding ? 'Stop build animation' : 'Show build process'}
          aria-pressed={isBuilding}
        >
          <IconConstruct size={15} />
        </button>
        <button
          type="button"
          className={`viewer-control${explodeAmount > 0 ? ' viewer-control--active' : ''}`}
          onClick={() => {
            const target = explodeAmount > 0 ? 0 : 1
            if (!reducedMotion.current) {
              // Animate the explode transition
              const startTime = performance.now()
              const startValue = explodeAmount
              const animate = (time: number) => {
                const progress = Math.min(1, (time - startTime) / 600)
                const eased = target > startValue ? progress * progress : 1 - (1 - progress) ** 2
                setExplodeAmount(startValue + (target - startValue) * eased)
                if (progress < 1) requestAnimationFrame(animate)
              }
              requestAnimationFrame(animate)
            } else {
              setExplodeAmount(target)
            }
          }}
          aria-label={explodeAmount > 0 ? 'Show assembled' : 'Show exploded view'}
          aria-pressed={explodeAmount > 0}
        >
          <IconLayers size={15} />
        </button>
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
          -
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

function drawLabel(
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  isHighlighted = false,
) {
  const metrics = context.measureText(text)
  const paddingX = 7
  const paddingY = 5
  const width = metrics.width + paddingX * 2
  const height = 20
  const left = Math.max(6, Math.min(x - width / 2, context.canvas.width - width - 6))
  const top = Math.max(6, y - height / 2)
  context.save()
  context.fillStyle = 'rgba(9, 27, 56, 0.88)'
  context.strokeStyle = isHighlighted ? '#93c5fd' : 'rgba(56, 189, 248, 0.45)'
  context.lineWidth = isHighlighted ? 1.5 : 1
  context.beginPath()
  context.roundRect(left, top, width, height, 5)
  context.fill()
  context.stroke()
  context.fillStyle = isHighlighted ? '#bfdbfe' : '#eaf2ff'
  context.fillText(text, left + paddingX, top + height / 2 + paddingY / 2)
  context.restore()
}

/** A compact static isometric preview for 3D shape cards. */
export function Shape3DGlyph({ shapeId }: { shapeId: string }) {
  const common = {
    fill: 'rgba(57, 120, 214, 0.12)',
    stroke: '#3978d6',
    strokeWidth: 1.35,
    strokeLinejoin: 'round' as const,
    strokeLinecap: 'round' as const,
  }
  const line = { stroke: '#38bdf8', strokeWidth: 1.1, strokeLinecap: 'round' as const }

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
          <path d="M35 82 56 34l22 48Z" fill="none" stroke="#3978d6" strokeWidth="1.1" />
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
