export interface ExactAngle {
  deg: number
  radTex: string
  radLabel: string
  cosTex: string
  sinTex: string
  tanTex: string
  cosVal: number
  sinVal: number
  tanVal: number | null
  quadrant: 1 | 2 | 3 | 4 | 0
}

export const SQRT2_OVER_2 = Math.SQRT2 / 2
export const SQRT3_OVER_2 = Math.sqrt(3) / 2
export const SQRT3_OVER_3 = Math.sqrt(3) / 3
export const SQRT3 = Math.sqrt(3)

export const EXACT_ANGLES: ExactAngle[] = [
  {
    deg: 0,
    radTex: '0',
    radLabel: '0 rad',
    cosTex: '1',
    sinTex: '0',
    tanTex: '0',
    cosVal: 1,
    sinVal: 0,
    tanVal: 0,
    quadrant: 0,
  },
  {
    deg: 30,
    radTex: '\\frac{\\pi}{6}',
    radLabel: 'π/6',
    cosTex: '\\frac{\\sqrt{3}}{2}',
    sinTex: '\\frac{1}{2}',
    tanTex: '\\frac{\\sqrt{3}}{3}',
    cosVal: SQRT3_OVER_2,
    sinVal: 0.5,
    tanVal: SQRT3_OVER_3,
    quadrant: 1,
  },
  {
    deg: 45,
    radTex: '\\frac{\\pi}{4}',
    radLabel: 'π/4',
    cosTex: '\\frac{\\sqrt{2}}{2}',
    sinTex: '\\frac{\\sqrt{2}}{2}',
    tanTex: '1',
    cosVal: SQRT2_OVER_2,
    sinVal: SQRT2_OVER_2,
    tanVal: 1,
    quadrant: 1,
  },
  {
    deg: 60,
    radTex: '\\frac{\\pi}{3}',
    radLabel: 'π/3',
    cosTex: '\\frac{1}{2}',
    sinTex: '\\frac{\\sqrt{3}}{2}',
    tanTex: '\\sqrt{3}',
    cosVal: 0.5,
    sinVal: SQRT3_OVER_2,
    tanVal: SQRT3,
    quadrant: 1,
  },
  {
    deg: 90,
    radTex: '\\frac{\\pi}{2}',
    radLabel: 'π/2',
    cosTex: '0',
    sinTex: '1',
    tanTex: '\\text{undef}',
    cosVal: 0,
    sinVal: 1,
    tanVal: null,
    quadrant: 0,
  },
  {
    deg: 120,
    radTex: '\\frac{2\\pi}{3}',
    radLabel: '2π/3',
    cosTex: '-\\frac{1}{2}',
    sinTex: '\\frac{\\sqrt{3}}{2}',
    tanTex: '-\\sqrt{3}',
    cosVal: -0.5,
    sinVal: SQRT3_OVER_2,
    tanVal: -SQRT3,
    quadrant: 2,
  },
  {
    deg: 135,
    radTex: '\\frac{3\\pi}{4}',
    radLabel: '3π/4',
    cosTex: '-\\frac{\\sqrt{2}}{2}',
    sinTex: '\\frac{\\sqrt{2}}{2}',
    tanTex: '-1',
    cosVal: -SQRT2_OVER_2,
    sinVal: SQRT2_OVER_2,
    tanVal: -1,
    quadrant: 2,
  },
  {
    deg: 150,
    radTex: '\\frac{5\\pi}{6}',
    radLabel: '5π/6',
    cosTex: '-\\frac{\\sqrt{3}}{2}',
    sinTex: '\\frac{1}{2}',
    tanTex: '-\\frac{\\sqrt{3}}{3}',
    cosVal: -SQRT3_OVER_2,
    sinVal: 0.5,
    tanVal: -SQRT3_OVER_3,
    quadrant: 2,
  },
  {
    deg: 180,
    radTex: '\\pi',
    radLabel: 'π',
    cosTex: '-1',
    sinTex: '0',
    tanTex: '0',
    cosVal: -1,
    sinVal: 0,
    tanVal: 0,
    quadrant: 0,
  },
  {
    deg: 210,
    radTex: '\\frac{7\\pi}{6}',
    radLabel: '7π/6',
    cosTex: '-\\frac{\\sqrt{3}}{2}',
    sinTex: '-\\frac{1}{2}',
    tanTex: '\\frac{\\sqrt{3}}{3}',
    cosVal: -SQRT3_OVER_2,
    sinVal: -0.5,
    tanVal: SQRT3_OVER_3,
    quadrant: 3,
  },
  {
    deg: 225,
    radTex: '\\frac{5\\pi}{4}',
    radLabel: '5π/4',
    cosTex: '-\\frac{\\sqrt{2}}{2}',
    sinTex: '-\\frac{\\sqrt{2}}{2}',
    tanTex: '1',
    cosVal: -SQRT2_OVER_2,
    sinVal: -SQRT2_OVER_2,
    tanVal: 1,
    quadrant: 3,
  },
  {
    deg: 240,
    radTex: '\\frac{4\\pi}{3}',
    radLabel: '4π/3',
    cosTex: '-\\frac{1}{2}',
    sinTex: '-\\frac{\\sqrt{3}}{2}',
    tanTex: '\\sqrt{3}',
    cosVal: -0.5,
    sinVal: -SQRT3_OVER_2,
    tanVal: SQRT3,
    quadrant: 3,
  },
  {
    deg: 270,
    radTex: '\\frac{3\\pi}{2}',
    radLabel: '3π/2',
    cosTex: '0',
    sinTex: '-1',
    tanTex: '\\text{undef}',
    cosVal: 0,
    sinVal: -1,
    tanVal: null,
    quadrant: 0,
  },
  {
    deg: 300,
    radTex: '\\frac{5\\pi}{3}',
    radLabel: '5π/3',
    cosTex: '\\frac{1}{2}',
    sinTex: '-\\frac{\\sqrt{3}}{2}',
    tanTex: '-\\sqrt{3}',
    cosVal: 0.5,
    sinVal: -SQRT3_OVER_2,
    tanVal: -SQRT3,
    quadrant: 4,
  },
  {
    deg: 315,
    radTex: '\\frac{7\\pi}{4}',
    radLabel: '7π/4',
    cosTex: '\\frac{\\sqrt{2}}{2}',
    sinTex: '-\\frac{\\sqrt{2}}{2}',
    tanTex: '-1',
    cosVal: SQRT2_OVER_2,
    sinVal: -SQRT2_OVER_2,
    tanVal: -1,
    quadrant: 4,
  },
  {
    deg: 330,
    radTex: '\\frac{11\\pi}{6}',
    radLabel: '11π/6',
    cosTex: '\\frac{\\sqrt{3}}{2}',
    sinTex: '-\\frac{1}{2}',
    tanTex: '-\\frac{\\sqrt{3}}{3}',
    cosVal: SQRT3_OVER_2,
    sinVal: -0.5,
    tanVal: -SQRT3_OVER_3,
    quadrant: 4,
  },
]

export function findExactAngle(deg: number): ExactAngle | undefined {
  const normalized = ((Math.round(deg) % 360) + 360) % 360
  return EXACT_ANGLES.find((a) => a.deg === normalized)
}

export function nearestExactAngle(deg: number): ExactAngle {
  const normalized = ((deg % 360) + 360) % 360
  let closest = EXACT_ANGLES[0]
  let minDiff = 360
  for (const a of EXACT_ANGLES) {
    const diff = Math.min(Math.abs(a.deg - normalized), 360 - Math.abs(a.deg - normalized))
    if (diff < minDiff) {
      minDiff = diff
      closest = a
    }
  }
  return closest
}

export function getQuadrantInfo(deg: number): {
  quadrant: 1 | 2 | 3 | 4 | 0
  en: string
  km: string
  signs: string
} {
  const norm = ((deg % 360) + 360) % 360
  if (norm === 0 || norm === 90 || norm === 180 || norm === 270) {
    return { quadrant: 0, en: 'Axis', km: 'លើអ័ក្សកូអរដោណេ', signs: '—' }
  }
  if (norm > 0 && norm < 90) {
    return { quadrant: 1, en: 'Quadrant I', km: 'កាដ្រង់ទី ១', signs: 'cos > 0, sin > 0, tan > 0' }
  }
  if (norm > 90 && norm < 180) {
    return { quadrant: 2, en: 'Quadrant II', km: 'កាដ្រង់ទី ២', signs: 'cos < 0, sin > 0, tan < 0' }
  }
  if (norm > 180 && norm < 270) {
    return { quadrant: 3, en: 'Quadrant III', km: 'កាដ្រង់ទី ៣', signs: 'cos < 0, sin < 0, tan > 0' }
  }
  return { quadrant: 4, en: 'Quadrant IV', km: 'កាដ្រង់ទី ៤', signs: 'cos > 0, sin < 0, tan < 0' }
}
