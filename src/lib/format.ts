export function formatNumber(value: number, precision = 2): string {
  if (!Number.isFinite(value)) return '—'
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: precision,
    minimumFractionDigits: 0,
  }).format(value)
}

export function formatMetricValue(value: number, precision = 2): string {
  if (!Number.isFinite(value)) return '—'
  if (Math.abs(value) >= 1_000_000) return value.toExponential(3)
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: precision,
    minimumFractionDigits: 0,
  }).format(value)
}

export function formatWithUnit(value: number, unit: string, precision = 2): string {
  return `${formatMetricValue(value, precision)} ${unit}`.trim()
}

export function pluralize(count: number, singular: string, plural?: string): string {
  return `${count} ${count === 1 ? singular : (plural ?? `${singular}s`)}`
}

/**
 * Parse a student's numeric answer.
 * Accepts decimals, negatives, thousands separators, and simple fractions like 3/4.
 */
export function parseNumericAnswer(raw: string): number | null {
  const value = raw.trim().replace(/,/g, '').replace(/\s+/g, '')
  if (!value) return null
  if (/^-?\d+(\.\d+)?$/.test(value)) {
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : null
  }
  const fraction = value.match(/^(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)$/)
  if (fraction) {
    const numerator = Number(fraction[1])
    const denominator = Number(fraction[2])
    if (!Number.isFinite(numerator) || !Number.isFinite(denominator) || denominator === 0) return null
    return numerator / denominator
  }
  if (/^-?\.\d+$/.test(value)) {
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : null
  }
  if (value === 'pi' || value === 'π') return Math.PI
  return null
}

export function isNumericAnswerCorrect(raw: string, answer: number, tolerance = 0.01): boolean {
  const parsed = parseNumericAnswer(raw)
  if (parsed === null) return false
  return Math.abs(parsed - answer) <= Math.max(tolerance, 0.0001)
}

export function readingTime(words: number): string {
  const minutes = Math.max(1, Math.round(words / 210))
  return `${minutes} min read`
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

export function roundTo(value: number, places = 2): number {
  const factor = 10 ** places
  return Math.round((value + Number.EPSILON) * factor) / factor
}
