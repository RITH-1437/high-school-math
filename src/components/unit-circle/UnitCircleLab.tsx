import { useCallback, useMemo, useRef, useState } from 'react'
import {
  EXACT_ANGLES,
  findExactAngle,
  getQuadrantInfo,
  nearestExactAngle,
} from '../../data/unit-circle'
import { MathBlock } from '../ui/Math'
import { useI18n } from '../../lib/i18n'

const RADIUS = 150
const SVG_SIZE = 420
const CENTER = SVG_SIZE / 2

export function UnitCircleLab() {
  const [angleDeg, setAngleDeg] = useState<number>(45)
  const [snapToExact, setSnapToExact] = useState<boolean>(true)
  const [showTangent, setShowTangent] = useState<boolean>(false)
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const svgRef = useRef<SVGSVGElement | null>(null)
  const { language } = useI18n()
  const isKm = language === 'km'

  const currentExact = useMemo(() => findExactAngle(angleDeg), [angleDeg])

  // Active angle in radians
  const angleRad = (angleDeg * Math.PI) / 180
  const cosVal = currentExact ? currentExact.cosVal : Math.cos(angleRad)
  const sinVal = currentExact ? currentExact.sinVal : Math.sin(angleRad)
  const tanVal = currentExact
    ? currentExact.tanVal
    : Math.abs(Math.cos(angleRad)) < 1e-6
      ? null
      : Math.tan(angleRad)

  // Coordinate in SVG space
  const pointX = CENTER + cosVal * RADIUS
  const pointY = CENTER - sinVal * RADIUS

  // Tangent intersection at x = 1 (SVG X = CENTER + RADIUS)
  const tanY = tanVal !== null ? CENTER - tanVal * RADIUS : null

  // Quadrant metadata
  const quadInfo = useMemo(() => getQuadrantInfo(angleDeg), [angleDeg])

  // Pointer drag calculation
  const updateAngleFromPointer = useCallback(
    (clientX: number, clientY: number) => {
      const svg = svgRef.current
      if (!svg) return
      const rect = svg.getBoundingClientRect()
      const x = clientX - rect.left - (rect.width * CENTER) / SVG_SIZE
      const y = clientY - rect.top - (rect.height * CENTER) / SVG_SIZE
      let deg = (Math.atan2(-y, x) * 180) / Math.PI
      if (deg < 0) deg += 360

      if (snapToExact) {
        const near = nearestExactAngle(deg)
        const diff = Math.min(Math.abs(near.deg - deg), 360 - Math.abs(near.deg - deg))
        if (diff < 7) {
          deg = near.deg
        }
      }
      setAngleDeg(Math.round(deg * 10) / 10)
    },
    [snapToExact],
  )

  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    setIsDragging(true)
    ;(e.target as Element).setPointerCapture?.(e.pointerId)
    updateAngleFromPointer(e.clientX, e.clientY)
  }

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!isDragging) return
    updateAngleFromPointer(e.clientX, e.clientY)
  }

  const handlePointerUp = (e: React.PointerEvent<SVGSVGElement>) => {
    setIsDragging(false)
    ;(e.target as Element).releasePointerCapture?.(e.pointerId)
  }

  // Generate arc path for angle theta
  const arcPath = useMemo(() => {
    const arcRadius = 34
    const startX = CENTER + arcRadius
    const startY = CENTER
    const endX = CENTER + arcRadius * Math.cos(angleRad)
    const endY = CENTER - arcRadius * Math.sin(angleRad)
    const largeArc = angleDeg > 180 ? 1 : 0
    return `M ${startX} ${startY} A ${arcRadius} ${arcRadius} 0 ${largeArc} 0 ${endX} ${endY}`
  }, [angleDeg, angleRad])

  return (
    <div className="unit-circle-lab" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Interactive Main Area: Canvas + Live Readout */}
      <div
        className="unit-circle-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          alignItems: 'start',
        }}
      >
        {/* SVG Canvas Card */}
        <div
          className="unit-circle-canvas-card"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            borderRadius: '16px',
            padding: '1.5rem',
            boxShadow: '0 2px 10px rgba(16, 42, 86, 0.05)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            userSelect: 'none',
          }}
        >
          <div style={{ width: '100%', maxWidth: '420px', position: 'relative' }}>
            <svg
              ref={svgRef}
              viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
              style={{
                width: '100%',
                height: 'auto',
                touchAction: 'none',
                cursor: isDragging ? 'grabbing' : 'crosshair',
                overflow: 'visible',
              }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              role="img"
              aria-label={
                isKm
                  ? `រង្វង់ត្រីកោណមាត្រ មុំ ${angleDeg} ដឺក្រេ`
                  : `Interactive Trigonometric Unit Circle at ${angleDeg} degrees`
              }
            >
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="var(--faint)" />
                </marker>
              </defs>

              {/* Background grid circular rings */}
              <circle cx={CENTER} cy={CENTER} r={RADIUS * 0.5} fill="none" stroke="var(--line)" strokeDasharray="3 3" opacity="0.6" />
              <circle cx={CENTER} cy={CENTER} r={RADIUS * 0.707} fill="none" stroke="var(--line)" strokeDasharray="3 3" opacity="0.5" />
              <circle cx={CENTER} cy={CENTER} r={RADIUS * 0.866} fill="none" stroke="var(--line)" strokeDasharray="3 3" opacity="0.4" />

              {/* Quadrant labels */}
              <text x={CENTER + 80} y={CENTER - 80} fill="var(--faint)" fontSize="13" fontWeight="bold" opacity="0.4">Q₁ (+, +)</text>
              <text x={CENTER - 110} y={CENTER - 80} fill="var(--faint)" fontSize="13" fontWeight="bold" opacity="0.4">Q₂ (−, +)</text>
              <text x={CENTER - 110} y={CENTER + 95} fill="var(--faint)" fontSize="13" fontWeight="bold" opacity="0.4">Q₃ (−, −)</text>
              <text x={CENTER + 80} y={CENTER + 95} fill="var(--faint)" fontSize="13" fontWeight="bold" opacity="0.4">Q₄ (+, −)</text>

              {/* The Unit Circle */}
              <circle
                cx={CENTER}
                cy={CENTER}
                r={RADIUS}
                fill="rgba(36, 87, 167, 0.03)"
                stroke="var(--palette-academic-blue)"
                strokeWidth="2.5"
              />

              {/* Shaded right triangle inside the circle */}
              <polygon
                points={`${CENTER},${CENTER} ${pointX},${CENTER} ${pointX},${pointY}`}
                fill="rgba(36, 87, 167, 0.12)"
                stroke="none"
              />

              {/* Coordinate axes */}
              <line x1="20" y1={CENTER} x2={SVG_SIZE - 20} y2={CENTER} stroke="var(--ink)" strokeWidth="1.5" markerEnd="url(#arrow)" />
              <line x1={CENTER} y1={SVG_SIZE - 20} x2={CENTER} y2="20" stroke="var(--ink)" strokeWidth="1.5" markerEnd="url(#arrow)" />

              {/* Axis labels */}
              <text x={SVG_SIZE - 12} y={CENTER + 16} fill="var(--palette-academic-blue)" fontSize="12" fontWeight="bold">
                cos (x)
              </text>
              <text x={CENTER + 8} y="16" fill="var(--palette-academic-gold)" fontSize="12" fontWeight="bold">
                sin (y)
              </text>
              <text x={CENTER - 14} y={CENTER + 16} fill="var(--faint)" fontSize="11">O</text>

              {/* Angle arc */}
              {angleDeg > 1 && (
                <path d={arcPath} fill="none" stroke="var(--palette-cambodian-red)" strokeWidth="2" />
              )}

              {/* 16 MoEYS exact angle radial lines & click points */}
              {EXACT_ANGLES.map((a) => {
                const rad = (a.deg * Math.PI) / 180
                const tickX = CENTER + Math.cos(rad) * RADIUS
                const tickY = CENTER - Math.sin(rad) * RADIUS
                const labelRadius = RADIUS + 20
                const lblX = CENTER + Math.cos(rad) * labelRadius
                const lblY = CENTER - Math.sin(rad) * labelRadius
                const isSelected = currentExact?.deg === a.deg

                return (
                  <g
                    key={a.deg}
                    style={{ cursor: 'pointer' }}
                    onClick={(e) => {
                      e.stopPropagation()
                      setAngleDeg(a.deg)
                    }}
                  >
                    <line
                      x1={CENTER}
                      y1={CENTER}
                      x2={tickX}
                      y2={tickY}
                      stroke="var(--line)"
                      strokeWidth={isSelected ? 1.5 : 1}
                      strokeDasharray={isSelected ? 'none' : '2 3'}
                      opacity={isSelected ? 0.9 : 0.4}
                    />
                    <circle
                      cx={tickX}
                      cy={tickY}
                      r={isSelected ? 5 : 3}
                      fill={isSelected ? 'var(--palette-cambodian-red)' : 'var(--palette-academic-blue)'}
                      opacity={isSelected ? 1 : 0.6}
                    />
                    <text
                      x={lblX}
                      y={lblY + 4}
                      textAnchor="middle"
                      fontSize="10"
                      fontWeight={isSelected ? 'bold' : 'normal'}
                      fill={isSelected ? 'var(--palette-cambodian-red)' : 'var(--muted)'}
                    >
                      {a.radLabel}
                    </text>
                  </g>
                )
              })}

              {/* Projections */}
              {/* Cosine projection (horizontal leg on x-axis) */}
              <line
                x1={CENTER}
                y1={CENTER}
                x2={pointX}
                y2={CENTER}
                stroke="var(--palette-academic-blue)"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <line
                x1={pointX}
                y1={pointY}
                x2={pointX}
                y2={CENTER}
                stroke="var(--palette-academic-blue)"
                strokeWidth="1.2"
                strokeDasharray="3 3"
              />

              {/* Sine projection (vertical leg to point) */}
              <line
                x1={pointX}
                y1={CENTER}
                x2={pointX}
                y2={pointY}
                stroke="var(--palette-academic-gold)"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <line
                x1={pointX}
                y1={pointY}
                x2={CENTER}
                y2={pointY}
                stroke="var(--palette-academic-gold)"
                strokeWidth="1.2"
                strokeDasharray="3 3"
              />

              {/* Tangent line at x = 1 if enabled */}
              {showTangent && tanY !== null && Math.abs(cosVal) > 0.05 && (
                <>
                  <line
                    x1={CENTER + RADIUS}
                    y1={20}
                    x2={CENTER + RADIUS}
                    y2={SVG_SIZE - 20}
                    stroke="var(--palette-cambodian-red)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    opacity="0.7"
                  />
                  <line
                    x1={CENTER}
                    y1={CENTER}
                    x2={CENTER + RADIUS}
                    y2={tanY}
                    stroke="var(--palette-cambodian-red)"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                  />
                  <circle cx={CENTER + RADIUS} cy={tanY} r="4" fill="var(--palette-cambodian-red)" />
                  <text x={CENTER + RADIUS + 8} y={tanY + 4} fill="var(--palette-cambodian-red)" fontSize="11" fontWeight="bold">
                    tan
                  </text>
                </>
              )}

              {/* Hypotenuse (Terminal ray) */}
              <line
                x1={CENTER}
                y1={CENTER}
                x2={pointX}
                y2={pointY}
                stroke="var(--ink)"
                strokeWidth="2"
              />

              {/* Draggable Terminal Point P(x, y) */}
              <g style={{ cursor: isDragging ? 'grabbing' : 'grab' }}>
                <circle
                  cx={pointX}
                  cy={pointY}
                  r="12"
                  fill="rgba(200, 59, 69, 0.2)"
                />
                <circle
                  cx={pointX}
                  cy={pointY}
                  r="6.5"
                  fill="var(--palette-cambodian-red)"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                />
              </g>

              {/* Coordinate label beside the point */}
              <text
                x={pointX + (cosVal >= 0 ? 12 : -12)}
                y={pointY + (sinVal >= 0 ? -12 : 16)}
                textAnchor={cosVal >= 0 ? 'start' : 'end'}
                fill="var(--ink)"
                fontSize="11"
                fontWeight="bold"
                style={{ filter: 'drop-shadow(0 1px 2px rgba(255,255,255,0.8))' }}
              >
                P(cos, sin)
              </text>
            </svg>
          </div>

          {/* Interactive controls */}
          <div style={{ width: '100%', marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label htmlFor="angle-slider" style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ink)' }}>
                {isKm ? 'កែសម្រួលមុំ (θ)' : 'Adjust Angle (θ)'}: <strong style={{ color: 'var(--palette-academic-blue)' }}>{angleDeg}°</strong>
              </label>
              <span style={{ fontSize: '0.8rem', color: 'var(--muted)', background: 'var(--bg-deep)', padding: '2px 8px', borderRadius: '4px' }}>
                {currentExact ? currentExact.radLabel : `${((angleDeg * Math.PI) / 180).toFixed(3)} rad`}
              </span>
            </div>

            <input
              id="angle-slider"
              type="range"
              min="0"
              max="360"
              step={snapToExact ? '1' : '0.5'}
              value={angleDeg}
              onChange={(e) => {
                const val = parseFloat(e.target.value)
                if (snapToExact) {
                  const near = nearestExactAngle(val)
                  setAngleDeg(Math.abs(near.deg - val) <= 5 ? near.deg : val)
                } else {
                  setAngleDeg(val)
                }
              }}
              style={{ width: '100%', accentColor: 'var(--palette-academic-blue)' }}
            />

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', marginTop: '0.25rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.825rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={snapToExact}
                  onChange={(e) => setSnapToExact(e.target.checked)}
                />
                <span>{isKm ? 'ភ្ជាប់ទៅមុំស្តង់ដា MoEYS' : 'Snap to MoEYS Angles'}</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.825rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={showTangent}
                  onChange={(e) => setShowTangent(e.target.checked)}
                />
                <span>{isKm ? 'បង្ហាញបន្ទាត់តង់សង់ (tan)' : 'Show Tangent Line'}</span>
              </label>
            </div>
          </div>
        </div>

        {/* Live Mathematical Readout Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Main Values Card */}
          <div
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: '16px',
              padding: '1.5rem',
              boxShadow: '0 2px 10px rgba(16, 42, 86, 0.05)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.15rem', color: 'var(--palette-deep-navy)' }}>
                {isKm ? 'តម្លៃត្រីកោណមាត្រជាក់លាក់' : 'Exact Trigonometric Values'}
              </h3>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  padding: '3px 8px',
                  borderRadius: '12px',
                  background: 'var(--palette-light-blue)',
                  color: 'var(--palette-academic-blue)',
                }}
              >
                {isKm ? quadInfo.km : quadInfo.en}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              {/* Cosine */}
              <div
                style={{
                  background: 'var(--bg-deep)',
                  borderRadius: '10px',
                  padding: '0.75rem 1rem',
                  borderLeft: '4px solid var(--palette-academic-blue)',
                }}
              >
                <div style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 600 }}>
                  {isKm ? 'កូស៊ីនុស (Cosine · x)' : 'Cosine (cos θ · x)'}
                </div>
                <div style={{ marginTop: '0.35rem', fontSize: '1.25rem' }}>
                  {currentExact ? (
                    <MathBlock tex={`\\cos(${currentExact.radTex}) = ${currentExact.cosTex}`} display={false} />
                  ) : (
                    <span>{cosVal.toFixed(4)}</span>
                  )}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--faint)', marginTop: '0.2rem' }}>
                  ≈ {cosVal.toFixed(4)}
                </div>
              </div>

              {/* Sine */}
              <div
                style={{
                  background: 'var(--bg-deep)',
                  borderRadius: '10px',
                  padding: '0.75rem 1rem',
                  borderLeft: '4px solid var(--palette-academic-gold)',
                }}
              >
                <div style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 600 }}>
                  {isKm ? 'ស៊ីនុស (Sine · y)' : 'Sine (sin θ · y)'}
                </div>
                <div style={{ marginTop: '0.35rem', fontSize: '1.25rem' }}>
                  {currentExact ? (
                    <MathBlock tex={`\\sin(${currentExact.radTex}) = ${currentExact.sinTex}`} display={false} />
                  ) : (
                    <span>{sinVal.toFixed(4)}</span>
                  )}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--faint)', marginTop: '0.2rem' }}>
                  ≈ {sinVal.toFixed(4)}
                </div>
              </div>

              {/* Tangent */}
              <div
                style={{
                  background: 'var(--bg-deep)',
                  borderRadius: '10px',
                  padding: '0.75rem 1rem',
                  borderLeft: '4px solid var(--palette-cambodian-red)',
                }}
              >
                <div style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 600 }}>
                  {isKm ? 'តង់សង់ (Tangent · y/x)' : 'Tangent (tan θ = sin/cos)'}
                </div>
                <div style={{ marginTop: '0.35rem', fontSize: '1.25rem' }}>
                  {currentExact ? (
                    <MathBlock tex={`\\tan(${currentExact.radTex}) = ${currentExact.tanTex}`} display={false} />
                  ) : tanVal !== null ? (
                    <span>{tanVal.toFixed(4)}</span>
                  ) : (
                    <span style={{ color: 'var(--palette-cambodian-red)', fontSize: '0.95rem' }}>
                      {isKm ? 'មិនកំណត់' : 'Undefined'}
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--faint)', marginTop: '0.2rem' }}>
                  {tanVal !== null ? `≈ ${tanVal.toFixed(4)}` : 'x = 0'}
                </div>
              </div>

              {/* Point Coordinates */}
              <div
                style={{
                  background: 'var(--bg-deep)',
                  borderRadius: '10px',
                  padding: '0.75rem 1rem',
                  borderLeft: '4px solid var(--ink)',
                }}
              >
                <div style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 600 }}>
                  {isKm ? 'កូអរដោណេចំណុច P' : 'Point Coordinates P(x, y)'}
                </div>
                <div style={{ marginTop: '0.35rem', fontSize: '1.1rem' }}>
                  <code>({cosVal.toFixed(3)}, {sinVal.toFixed(3)})</code>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--faint)', marginTop: '0.2rem' }}>
                  {quadInfo.signs}
                </div>
              </div>
            </div>

            {/* Pythagorean Identity verification */}
            <div
              style={{
                marginTop: '1.25rem',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                background: 'rgba(36, 87, 167, 0.05)',
                border: '1px solid rgba(36, 87, 167, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.5rem',
              }}
            >
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--palette-deep-navy)' }}>
                {isKm ? 'រូបមន្តគ្រឹះត្រីកោណមាត្រ:' : 'Fundamental Pythagorean Identity:'}
              </div>
              <div style={{ fontSize: '0.95rem' }}>
                <MathBlock tex="\sin^2\theta + \cos^2\theta = 1" display={false} />
              </div>
            </div>
          </div>

          {/* Quick MoEYS Radian Presets */}
          <div
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: '16px',
              padding: '1.25rem 1.5rem',
            }}
          >
            <div style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--ink)' }}>
              {isKm ? 'ជ្រើសរើសមុំស្តង់ដា MoEYS (Standard Angles):' : 'MoEYS Standard Angles:'}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              {EXACT_ANGLES.map((a) => {
                const isActive = angleDeg === a.deg
                return (
                  <button
                    key={a.deg}
                    type="button"
                    onClick={() => setAngleDeg(a.deg)}
                    style={{
                      padding: '4px 9px',
                      fontSize: '0.775rem',
                      borderRadius: '6px',
                      border: '1px solid',
                      borderColor: isActive ? 'var(--palette-academic-blue)' : 'var(--line)',
                      background: isActive ? 'var(--palette-academic-blue)' : 'var(--bg-deep)',
                      color: isActive ? '#FFFFFF' : 'var(--ink)',
                      cursor: 'pointer',
                      fontWeight: isActive ? 600 : 400,
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {a.deg}° ({a.radLabel})
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Curriculum Reference Table */}
      <section
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--line)',
          borderRadius: '16px',
          padding: '1.5rem',
          boxShadow: '0 2px 10px rgba(16, 42, 86, 0.05)',
        }}
      >
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.2rem', color: 'var(--palette-deep-navy)' }}>
          {isKm
            ? 'តារាងតម្លៃមុំពិសេសក្នុងរង្វង់ត្រីកោណមាត្រ (MoEYS Grade 10–12 Table)'
            : 'Special Angles Trigonometric Table (MoEYS Grades 10–12)'}
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem', textAlign: 'center' }}>
            <thead>
              <tr style={{ background: 'var(--bg-deep)', borderBottom: '2px solid var(--line)' }}>
                <th style={{ padding: '0.6rem 0.75rem', textAlign: 'left' }}>{isKm ? 'ដឺក្រេ (Deg)' : 'Degrees'}</th>
                <th style={{ padding: '0.6rem 0.75rem' }}>{isKm ? 'រ៉ាដ្យង់ (Rad)' : 'Radians'}</th>
                <th style={{ padding: '0.6rem 0.75rem' }}>cos θ</th>
                <th style={{ padding: '0.6rem 0.75rem' }}>sin θ</th>
                <th style={{ padding: '0.6rem 0.75rem' }}>tan θ</th>
                <th style={{ padding: '0.6rem 0.75rem' }}>{isKm ? 'កាដ្រង់' : 'Quadrant'}</th>
              </tr>
            </thead>
            <tbody>
              {EXACT_ANGLES.map((a, idx) => {
                const isCurrent = angleDeg === a.deg
                return (
                  <tr
                    key={a.deg}
                    onClick={() => setAngleDeg(a.deg)}
                    style={{
                      borderBottom: '1px solid var(--line)',
                      background: isCurrent ? 'rgba(36, 87, 167, 0.08)' : idx % 2 === 0 ? 'transparent' : 'var(--bg-deep)',
                      cursor: 'pointer',
                      fontWeight: isCurrent ? 'bold' : 'normal',
                    }}
                  >
                    <td style={{ padding: '0.5rem 0.75rem', textAlign: 'left', color: isCurrent ? 'var(--palette-academic-blue)' : 'inherit' }}>
                      {a.deg}°
                    </td>
                    <td style={{ padding: '0.5rem 0.75rem' }}>
                      <MathBlock tex={a.radTex} display={false} />
                    </td>
                    <td style={{ padding: '0.5rem 0.75rem' }}>
                      <MathBlock tex={a.cosTex} display={false} />
                    </td>
                    <td style={{ padding: '0.5rem 0.75rem' }}>
                      <MathBlock tex={a.sinTex} display={false} />
                    </td>
                    <td style={{ padding: '0.5rem 0.75rem' }}>
                      <MathBlock tex={a.tanTex} display={false} />
                    </td>
                    <td style={{ padding: '0.5rem 0.75rem', fontSize: '0.75rem', color: 'var(--muted)' }}>
                      {a.quadrant === 0 ? (isKm ? 'អ័ក្ស' : 'Axis') : `Q${a.quadrant}`}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
