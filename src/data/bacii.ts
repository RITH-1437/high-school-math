/**
 * BacII (Grade 12 national examination) research data.
 *
 * Every paper record below was transcribed from the scanned papers kept in
 * `research/pdfs/` (see `research/BACII_EXAM_ANALYSIS.md`). Only the structure
 * is recorded (question type and marks per part); question wording is not
 * copied. Counts, frequencies and time budgets are derived from these records.
 */
import type { BacPaperPart, BacPaperRecord, BacPartKind, BacTrack } from '../types/exam'
import type { Flowchart, GraphSpec } from '../types/content'

/* ------------------------------------------------------------------ */
/* Tracks                                                             */
/* ------------------------------------------------------------------ */

export interface TrackInfo {
  id: BacTrack
  title: string
  titleKm: string
  short: string
  shortKm: string
  description: string
  descriptionKm: string
  /** Mathematics paper format, from the most recent paper on record. */
  mathMarks: number
  durationMinutes: number
  durationNote: string
  durationNoteKm: string
  /** Grade 12 topic ids studied for this track's mathematics paper. */
  topicIds: string[]
}

export const TRACKS: Record<BacTrack, TrackInfo> = {
  science: {
    id: 'science',
    title: 'Science track',
    titleKm: 'ថ្នាក់វិទ្យាសាស្ត្រពិត',
    short: 'Science',
    shortKm: 'វិទ្យាសាស្ត្រពិត',
    description:
      'The full Grade 12 programme: calculus with exponential and logarithmic functions, complex numbers, vectors in space, conics and probability. Mathematics is the heaviest paper of this track.',
    descriptionKm:
      'កម្មវិធីថ្នាក់ទី១២ពេញលេញ៖ គណិតវិភាគជាមួយអនុគមន៍អិចស្ប៉ូណង់ស្យែល និងលោការីត ចំនួនកុំផ្លិច វ៉ិចទ័រក្នុងលំហ កោនិក និងប្រូបាប។ គណិតវិទ្យាជាវិញ្ញាសាធំជាងគេនៃថ្នាក់នេះ។',
    mathMarks: 125,
    durationMinutes: 120,
    durationNote: 'Time printed on the 2025 Science mock paper. Always check your official timetable.',
    durationNoteKm: 'រយៈពេលដែលបោះពុម្ពលើវិញ្ញាសាប្រឡងសាកល្បងឆ្នាំ២០២៥។ សូមពិនិត្យកាលវិភាគផ្លូវការជានិច្ច។',
    topicIds: [
      'limits-and-continuity',
      'differentiation',
      'integration',
      'complex-numbers',
      'permutations-and-combinations',
      'binomial-theorem',
      'random-variables-and-distributions',
      'normal-distribution',
      'conic-sections',
      'vectors-in-three-dimensions',
      'matrices-and-linear-systems',
    ],
  },
  social: {
    id: 'social',
    title: 'Social Science track',
    titleKm: 'ថ្នាក់វិទ្យាសាស្ត្រសង្គម',
    short: 'Social Science',
    shortKm: 'វិទ្យាសាស្ត្រសង្គម',
    description:
      'A focused calculus-and-probability programme: limits, simple integrals, counting probability, the ellipse and parabola, and the study of a rational function.',
    descriptionKm:
      'កម្មវិធីផ្ដោតលើគណិតវិភាគ និងប្រូបាប៖ លីមីត អាំងតេក្រាលងាយៗ ប្រូបាបដោយការរាប់ អេលីប និងប៉ារ៉ាបូល និងការសិក្សាអនុគមន៍សនិទាន។',
    mathMarks: 75,
    durationMinutes: 90,
    durationNote: 'Printed on every Social Science paper from 2011 to 2025.',
    durationNoteKm: 'បោះពុម្ពលើគ្រប់វិញ្ញាសាថ្នាក់វិទ្យាសាស្ត្រសង្គម ពីឆ្នាំ២០១១ ដល់ ២០២៥។',
    topicIds: ['limits-and-continuity', 'differentiation', 'integration', 'permutations-and-combinations', 'conic-sections'],
  },
}

export function tracksForTopic(topicId: string): BacTrack[] {
  return (Object.keys(TRACKS) as BacTrack[]).filter((track) => TRACKS[track].topicIds.includes(topicId))
}

export function isBacTrack(value: string | undefined | null): value is BacTrack {
  return value === 'science' || value === 'social'
}

/* ------------------------------------------------------------------ */
/* Past papers (structure only)                                       */
/* ------------------------------------------------------------------ */

const SOCIAL_SOURCE = 'research/pdfs/baccII.pdf'

function social(year: number, parts: [BacPartKind, number, string?][], session?: string): BacPaperRecord {
  return {
    track: 'social',
    year,
    session,
    kind: 'official',
    durationMinutes: 90,
    totalMarks: 75,
    parts: parts.map(([kind, marks, variant]): BacPaperPart => ({ kind, marks, ...(variant ? { variant } : {}) })),
    source: SOCIAL_SOURCE,
  }
}

/** Social Science papers 2011–2025. There is no 2020 paper in the collection. */
export const PAST_PAPERS: BacPaperRecord[] = [
  social(2011, [['integrals', 15, 'partial-fractions'], ['limits', 15], ['continuity', 15], ['differential-equations', 15], ['probability', 15]]),
  social(2012, [['probability', 10], ['conics', 15, 'ellipse'], ['differential-equations', 20], ['function-study', 30, 'rational-oblique']]),
  social(2013, [['probability', 10], ['differential-equations', 15], ['conics', 20, 'ellipse'], ['function-study', 30, 'rational-horizontal']]),
  social(2014, [['limits', 15], ['probability', 15], ['function-study', 30, 'exponential'], ['integrals', 15]], 'Session 1'),
  social(2014, [['limits', 15], ['probability', 10], ['function-study', 25, 'rational-oblique'], ['integrals', 15], ['conics', 10, 'ellipse']], 'Session 2'),
  social(2015, [['probability', 10], ['limits', 10], ['integrals', 15], ['conics', 10, 'parabola'], ['function-study', 30, 'rational-oblique']]),
  social(2016, [['limits', 10], ['integrals', 15], ['probability', 10], ['conics', 10, 'ellipse'], ['function-study', 30, 'rational-horizontal']]),
  social(2017, [['limits', 10], ['probability', 10], ['integrals', 15], ['conics', 10, 'ellipse'], ['function-study', 30, 'rational-oblique']]),
  social(2018, [['limits', 10], ['probability', 10], ['integrals', 15], ['conics', 10, 'parabola'], ['function-study', 30, 'rational-horizontal']]),
  social(2019, [['limits', 15], ['integrals', 10], ['probability', 10], ['conics', 10, 'ellipse'], ['function-study', 30, 'rational-oblique']]),
  social(2021, [['limits', 15], ['integrals', 10], ['probability', 10], ['conics', 10, 'ellipse'], ['function-study', 30, 'rational-oblique']]),
  social(2022, [['limits', 15], ['integrals', 10], ['probability', 10], ['conics', 10, 'ellipse'], ['function-study', 30, 'rational-oblique']]),
  social(2023, [['limits', 15], ['integrals', 10], ['probability', 10], ['conics', 10, 'parabola'], ['function-study', 30, 'rational-horizontal']]),
  social(2024, [['limits', 15], ['integrals', 10], ['probability', 10], ['conics', 10, 'ellipse'], ['function-study', 30, 'rational-oblique']]),
  social(2025, [['limits', 15], ['integrals', 10], ['probability', 10], ['conics', 10, 'parabola'], ['function-study', 30, 'rational-oblique']]),
  {
    track: 'science',
    year: 2025,
    kind: 'mock',
    durationMinutes: 120,
    totalMarks: 125,
    parts: [
      { kind: 'limits', marks: 15 },
      { kind: 'complex-numbers', marks: 15 },
      { kind: 'probability', marks: 15 },
      { kind: 'integrals', marks: 15 },
      { kind: 'vectors-3d', marks: 15 },
      { kind: 'conics', marks: 15, variant: 'ellipse' },
      { kind: 'function-study', marks: 35, variant: 'exponential' },
    ],
    source: 'research/pdfs/exam2025.pdf (answer key: research/pdfs/exam2015.pdf)',
  },
]

export function papersFor(track: BacTrack): BacPaperRecord[] {
  return PAST_PAPERS.filter((paper) => paper.track === track)
}

/** Paper label such as "2014 · S1". */
export function paperLabel(paper: BacPaperRecord): string {
  const session = paper.session ? ` · S${paper.session.replace(/\D/g, '')}` : ''
  return `${paper.year}${session}${paper.kind === 'mock' ? ' · mock' : ''}`
}

export interface KindFrequency {
  kind: BacPartKind
  papers: number
  totalPapers: number
  averageMarks: number
  /** Most recent year this kind appeared. */
  lastYear: number
}

/** How often each kind of question appears on a track's papers (derived, never hand-counted). */
export function kindFrequency(track: BacTrack, sinceYear = 0): KindFrequency[] {
  const papers = papersFor(track).filter((paper) => paper.year >= sinceYear)
  const kinds = new Map<BacPartKind, { papers: number; marks: number; lastYear: number }>()
  for (const paper of papers) {
    for (const part of paper.parts) {
      const entry = kinds.get(part.kind) ?? { papers: 0, marks: 0, lastYear: 0 }
      entry.papers += 1
      entry.marks += part.marks
      entry.lastYear = Math.max(entry.lastYear, paper.year)
      kinds.set(part.kind, entry)
    }
  }
  return [...kinds.entries()]
    .map(([kind, entry]) => ({
      kind,
      papers: entry.papers,
      totalPapers: papers.length,
      averageMarks: Math.round((entry.marks / entry.papers) * 10) / 10,
      lastYear: entry.lastYear,
    }))
    .sort((a, b) => b.papers - a.papers || b.averageMarks - a.averageMarks)
}

/* ------------------------------------------------------------------ */
/* Current paper blueprint and time budget                            */
/* ------------------------------------------------------------------ */

/** The latest paper on record is the best model of the current format. */
export function blueprintFor(track: BacTrack): BacPaperRecord {
  const papers = papersFor(track)
  return papers.reduce((latest, paper) => (paper.year > latest.year ? paper : latest), papers[0])
}

export const CHECKING_MINUTES = 10

export interface TimeSlot {
  part: BacPaperPart
  numeral: string
  minutes: number
}

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII']

/** Split the paper time in proportion to marks, keeping 10 minutes to check. */
export function timeBudget(paper: BacPaperRecord): TimeSlot[] {
  const working = paper.durationMinutes - CHECKING_MINUTES
  const raw = paper.parts.map((part) => (part.marks / paper.totalMarks) * working)
  const minutes = raw.map((m) => Math.floor(m))
  let spare = working - minutes.reduce((a, b) => a + b, 0)
  const order = raw.map((m, i) => [m - Math.floor(m), i] as const).sort((a, b) => b[0] - a[0])
  for (const [, i] of order) {
    if (spare <= 0) break
    minutes[i] += 1
    spare -= 1
  }
  return paper.parts.map((part, i) => ({ part, numeral: ROMAN[i] ?? String(i + 1), minutes: minutes[i] }))
}

/* ------------------------------------------------------------------ */
/* Question patterns: what is asked and how to solve it               */
/* ------------------------------------------------------------------ */

export interface QuestionPattern {
  kind: BacPartKind
  title: string
  titleKm: string
  /** What examiners ask, summarised from the papers. */
  asks: string[]
  asksKm: string[]
  /** Self-check before moving on. */
  checks: string[]
  checksKm: string[]
  topicId: string
  /** Pattern appears on these tracks' papers. */
  tracks: BacTrack[]
  flowchart: Flowchart
  graph?: GraphSpec
}

export const PART_KIND_LABEL: Record<BacPartKind, { en: string; km: string }> = {
  limits: { en: 'Limits', km: 'លីមីត' },
  continuity: { en: 'Continuity', km: 'ភាពជាប់' },
  integrals: { en: 'Integrals', km: 'អាំងតេក្រាល' },
  probability: { en: 'Probability', km: 'ប្រូបាប' },
  conics: { en: 'Conics', km: 'កោនិក' },
  'differential-equations': { en: 'Differential equations', km: 'សមីការឌីផេរ៉ង់ស្យែល' },
  'function-study': { en: 'Function study', km: 'សិក្សាអនុគមន៍' },
  'complex-numbers': { en: 'Complex numbers', km: 'ចំនួនកុំផ្លិច' },
  'vectors-3d': { en: 'Vectors in space', km: 'វ៉ិចទ័រក្នុងលំហ' },
}

export const QUESTION_PATTERNS: QuestionPattern[] = [
  {
    kind: 'function-study',
    title: 'Study and sketch a function',
    titleKm: 'សិក្សាអថេរភាព និងសង់ក្រាបអនុគមន៍',
    asks: [
      'Find the domain of a rational function such as $f(x)=\\dfrac{ax^2+bx+c}{x+d}$.',
      'Rewrite it as $f(x)=mx+p+\\dfrac{k}{x+d}$ and state the asymptotes.',
      'Compute the limits at $\\pm\\infty$ and on both sides of the forbidden value.',
      'Find $f\'(x)$, its sign, the table of variation, and sketch the curve.',
    ],
    asksKm: [
      'រកដែនកំណត់នៃអនុគមន៍សនិទាន ដូចជា $f(x)=\\dfrac{ax^2+bx+c}{x+d}$។',
      'សរសេរជា $f(x)=mx+p+\\dfrac{k}{x+d}$ ហើយរកអាស៊ីមតូត។',
      'គណនាលីមីតត្រង់ $\\pm\\infty$ និងសងខាងនៃតម្លៃហាមឃាត់។',
      'រក $f\'(x)$ សញ្ញារបស់វា តារាងអថេរភាព ហើយសង់ក្រាប។',
    ],
    checks: [
      'The vertical asymptote is the value removed from the domain.',
      'Every arrow in the table matches the sign of $f\'(x)$ above it.',
      'The curve approaches each asymptote from the side your sign study predicts.',
    ],
    checksKm: [
      'អាស៊ីមតូតឈរ គឺតម្លៃដែលដកចេញពីដែនកំណត់។',
      'ព្រួញនីមួយៗក្នុងតារាង ត្រូវនឹងសញ្ញា $f\'(x)$ ខាងលើវា។',
      'ក្រាបខិតជិតអាស៊ីមតូត តាមខាងដែលការសិក្សាសញ្ញាបានទាយ។',
    ],
    topicId: 'differentiation',
    tracks: ['science', 'social'],
    flowchart: {
      id: 'bac-flow-function-study',
      topicIds: ['differentiation'],
      title: 'The function-study question, step by step',
      titleKm: 'សំណួរសិក្សាអនុគមន៍ ជំហានម្ដងមួយៗ',
      summary: 'Use this order on every paper: each line earns marks, and later parts reuse earlier answers.',
      summaryKm: 'ប្រើលំដាប់នេះគ្រប់វិញ្ញាសា៖ បន្ទាត់នីមួយៗមានពិន្ទុ ហើយសំណួរក្រោយៗប្រើចម្លើយមុន។',
      nodes: [
        { kind: 'start', text: 'Read the whole question: which parts give you a result to reuse?', textKm: 'អានសំណួរទាំងមូល៖ តើផ្នែកណាផ្ដល់លទ្ធផលឲ្យប្រើបន្ត?' },
        { kind: 'step', text: 'Domain: exclude every value that makes a denominator zero.', textKm: 'ដែនកំណត់៖ ដកចេញគ្រប់តម្លៃដែលធ្វើឲ្យភាគបែងស្មើសូន្យ។', math: 'D=\\mathbb{R}\\setminus\\{-d\\}' },
        { kind: 'step', text: 'Divide (or identify coefficients) to write $f$ as a line plus a fraction.', textKm: 'ចែក (ឬផ្ទឹមមេគុណ) ដើម្បីសរសេរ $f$ ជាបន្ទាត់បូកប្រភាគ។', math: 'f(x)=mx+p+\\frac{k}{x+d}' },
        {
          kind: 'decision',
          text: 'Which limit are you computing?',
          textKm: 'តើអ្នកកំពុងគណនាលីមីតមួយណា?',
          branches: [
            { label: '$x\\to\\pm\\infty$', text: 'The fraction tends to 0, so $y=mx+p$ is an oblique asymptote (horizontal if $m=0$).', textKm: 'ប្រភាគខិតទៅ 0 ដូច្នេះ $y=mx+p$ ជាអាស៊ីមតូតទ្រេត (ដេកបើ $m=0$)។' },
            { label: '$x\\to -d^{\\pm}$', text: 'Sign of $\\frac{k}{x+d}$ on each side gives $\\pm\\infty$: $x=-d$ is a vertical asymptote.', textKm: 'សញ្ញា $\\frac{k}{x+d}$ សងខាងផ្ដល់ $\\pm\\infty$៖ $x=-d$ ជាអាស៊ីមតូតឈរ។' },
          ],
        },
        { kind: 'step', text: 'Position against the asymptote: sign of $f(x)-(mx+p)=\\frac{k}{x+d}$.', textKm: 'ទីតាំងធៀបនឹងអាស៊ីមតូត៖ សញ្ញានៃ $f(x)-(mx+p)=\\frac{k}{x+d}$។' },
        { kind: 'step', text: 'Differentiate, factor $f\'(x)$ and find where it is zero; build the sign row.', textKm: 'គណនាដេរីវេ ដាក់ $f\'(x)$ ជាផលគុណកត្តា រកឫស ហើយបង្កើតជួរសញ្ញា។' },
        { kind: 'step', text: 'Table of variation: arrows from the signs, values at the extrema, limits at the ends.', textKm: 'តារាងអថេរភាព៖ ព្រួញតាមសញ្ញា តម្លៃត្រង់បរមា និងលីមីតនៅចុង។' },
        { kind: 'end', text: 'Sketch: asymptotes first (dashed), then extrema and intercepts, then the curve.', textKm: 'សង់ក្រាប៖ អាស៊ីមតូតមុន (ដាច់ៗ) បន្ទាប់មកបរមា និងចំណុចប្រសព្វ ចុងក្រោយខ្សែកោង។' },
      ],
    },
    graph: {
      id: 'bac-graph-function-study',
      title: 'Worked sketch: f(x) = (x² − 2x + 2)/(x − 1)',
      titleKm: 'គំរូក្រាប៖ f(x) = (x² − 2x + 2)/(x − 1)',
      caption:
        'f(x) = x − 1 + 1/(x − 1). Vertical asymptote x = 1, oblique asymptote y = x − 1. f′(x) = 1 − 1/(x − 1)² is zero at x = 0 (local maximum −2) and x = 2 (local minimum 2).',
      captionKm:
        'f(x) = x − 1 + 1/(x − 1)។ អាស៊ីមតូតឈរ x = 1 អាស៊ីមតូតទ្រេត y = x − 1។ f′(x) = 1 − 1/(x − 1)² ស្មើសូន្យត្រង់ x = 0 (អតិបរមាធៀប −2) និង x = 2 (អប្បបរមាធៀប 2)។',
      xRange: [-4, 6],
      yRange: [-7, 7],
      curves: [{ fn: (x) => x - 1 + 1 / (x - 1), label: 'y = f(x)', color: 1 }],
      lines: [
        { kind: 'vertical', at: 1, dashed: true, label: 'x = 1', color: 2 },
        { kind: 'line', from: [0, -1], to: [1, 0], dashed: true, label: 'y = x − 1', color: 3 },
      ],
      points: [
        { x: 0, y: -2, label: 'Max', anchor: 'nw' },
        { x: 2, y: 2, label: 'Min', anchor: 'se' },
      ],
    },
  },
  {
    kind: 'limits',
    title: 'Evaluate limits',
    titleKm: 'គណនាលីមីត',
    asks: [
      'Three or four limits: polynomial or rational at a point, at $\\pm\\infty$, with a square root, with $e^x$ or $\\ln x$.',
      'Most hide an indeterminate form $\\frac{0}{0}$ or $\\frac{\\infty}{\\infty}$ that must be removed first.',
    ],
    asksKm: [
      'លីមីតបី ឬបួន៖ ពហុធា ឬសនិទានត្រង់ចំណុចមួយ ត្រង់ $\\pm\\infty$ មានឫសការ៉េ មាន $e^x$ ឬ $\\ln x$។',
      'ភាគច្រើនលាក់រាងមិនកំណត់ $\\frac{0}{0}$ ឬ $\\frac{\\infty}{\\infty}$ ដែលត្រូវលុបចោលជាមុន។',
    ],
    checks: [
      'Always try direct substitution first and write the form you get.',
      'After simplifying, substitute again: the answer must be a number or $\\pm\\infty$.',
    ],
    checksKm: [
      'សាកជំនួសផ្ទាល់ជាមុនជានិច្ច ហើយសរសេររាងដែលទទួលបាន។',
      'ក្រោយសម្រួល ជំនួសម្ដងទៀត៖ ចម្លើយត្រូវជាចំនួន ឬ $\\pm\\infty$។',
    ],
    topicId: 'limits-and-continuity',
    tracks: ['science', 'social'],
    flowchart: {
      id: 'bac-flow-limits',
      topicIds: ['limits-and-continuity'],
      title: 'Which technique removes the indeterminate form?',
      titleKm: 'តើវិធីណាលុបរាងមិនកំណត់?',
      summary: 'Substitute, name the form, then apply the matching technique.',
      summaryKm: 'ជំនួស ដាក់ឈ្មោះរាង បន្ទាប់មកប្រើវិធីដែលត្រូវគ្នា។',
      nodes: [
        { kind: 'start', text: 'Substitute the value directly.', textKm: 'ជំនួសតម្លៃដោយផ្ទាល់។' },
        {
          kind: 'decision',
          text: 'What form do you get?',
          textKm: 'តើទទួលបានរាងអ្វី?',
          branches: [
            { label: 'A number', labelKm: 'ចំនួនមួយ', text: 'That number is the limit. Stop.', textKm: 'ចំនួននោះជាលីមីត។ បញ្ចប់។' },
            { label: '$\\frac{k}{0}$, $k\\neq0$', text: 'Study the sign of the denominator on each side: the limit is $+\\infty$ or $-\\infty$.', textKm: 'សិក្សាសញ្ញាភាគបែងសងខាង៖ លីមីតគឺ $+\\infty$ ឬ $-\\infty$។' },
            { label: '$\\frac{0}{0}$', text: 'Factor and cancel $(x-a)$; with a root, multiply by the conjugate; with $\\sin$ or $e^x$, use a standard limit.', textKm: 'ដាក់ជាកត្តា ហើយសម្រួល $(x-a)$; មានឫស គុណនឹងកន្សោមឆ្លាស់; មាន $\\sin$ ឬ $e^x$ ប្រើលីមីតគោល។' },
            { label: '$\\frac{\\infty}{\\infty}$ or $\\infty-\\infty$', labelKm: '$\\frac{\\infty}{\\infty}$ ឬ $\\infty-\\infty$', text: 'Factor the highest power of $x$ (top and bottom); compare growth: $e^x \\gg x^n \\gg \\ln x$.', textKm: 'ដាក់ស្វ័យគុណខ្ពស់បំផុតនៃ $x$ ជាកត្តា; ប្រៀបកំណើន៖ $e^x \\gg x^n \\gg \\ln x$។' },
          ],
        },
        { kind: 'step', text: 'Standard limits you may quote:', textKm: 'លីមីតគោលដែលអាចប្រើបាន៖', math: '\\lim_{x\\to0}\\frac{\\sin x}{x}=1,\\quad \\lim_{x\\to0}\\frac{e^x-1}{x}=1,\\quad \\lim_{x\\to0}\\frac{1-\\cos x}{x^2}=\\frac12' },
        { kind: 'end', text: 'Substitute into the simplified expression and write the final value.', textKm: 'ជំនួសក្នុងកន្សោមដែលបានសម្រួល ហើយសរសេរតម្លៃចុងក្រោយ។' },
      ],
    },
    graph: {
      id: 'bac-graph-limit-hole',
      title: 'A 0/0 limit is a hole, not a gap in the answer',
      titleKm: 'លីមីតរាង 0/0 គឺជារន្ធ មិនមែនគ្មានចម្លើយទេ',
      caption: 'f(x) = (x² − 1)/(x − 1) is undefined at x = 1, but it equals x + 1 elsewhere, so the limit at 1 is 2.',
      captionKm: 'f(x) = (x² − 1)/(x − 1) មិនកំណត់ត្រង់ x = 1 ប៉ុន្តែស្មើ x + 1 នៅកន្លែងផ្សេង ដូច្នេះលីមីតត្រង់ 1 គឺ 2។',
      xRange: [-3, 4],
      yRange: [-2, 5],
      curves: [{ fn: (x) => (Math.abs(x - 1) < 1e-9 ? NaN : (x * x - 1) / (x - 1)), label: 'y = (x² − 1)/(x − 1)', color: 1 }],
      points: [{ x: 1, y: 2, label: 'limit', open: true, anchor: 'se' }],
    },
  },
  {
    kind: 'integrals',
    title: 'Compute definite integrals',
    titleKm: 'គណនាអាំងតេក្រាលកំណត់',
    asks: [
      'Two or three integrals: a polynomial, a sum with $\\frac1x$ or $\\frac{1}{x+a}$, an exponential, $\\frac{u\'}{u}$ forms.',
      'Often a first part asks you to verify an identity (partial fractions) that you then integrate.',
    ],
    asksKm: [
      'អាំងតេក្រាលពីរ ឬបី៖ ពហុធា ផលបូកមាន $\\frac1x$ ឬ $\\frac{1}{x+a}$ អិចស្ប៉ូណង់ស្យែល និងរាង $\\frac{u\'}{u}$។',
      'ជាញឹកញាប់ សំណួរទីមួយឲ្យផ្ទៀងផ្ទាត់សមភាព (ប្រភាគដាច់) ដែលអ្នកប្រើវាធ្វើអាំងតេក្រាលបន្ត។',
    ],
    checks: ['Differentiate your antiderivative: you must get the integrand back.', 'Write $F(b)-F(a)$ with brackets before simplifying.'],
    checksKm: ['ធ្វើដេរីវេព្រីមីទីវ៖ ត្រូវបានអនុគមន៍ដើមវិញ។', 'សរសេរ $F(b)-F(a)$ ក្នុងវង់ក្រចកមុនសម្រួល។'],
    topicId: 'integration',
    tracks: ['science', 'social'],
    flowchart: {
      id: 'bac-flow-integrals',
      topicIds: ['integration'],
      title: 'Choose the antiderivative rule',
      titleKm: 'ជ្រើសរើសរូបមន្តព្រីមីទីវ',
      summary: 'Match the shape of each term to a known derivative, then evaluate between the bounds.',
      summaryKm: 'ផ្ទឹមរាងនៃតួនីមួយៗទៅនឹងដេរីវេដែលស្គាល់ រួចគណនារវាងព្រំដែន។',
      nodes: [
        { kind: 'start', text: 'Split the integrand into a sum of simple terms.', textKm: 'បំបែកអនុគមន៍ជាផលបូកនៃតួងាយៗ។' },
        {
          kind: 'decision',
          text: 'What does each term look like?',
          textKm: 'តើតួនីមួយៗមានរាងបែបណា?',
          branches: [
            { label: '$x^n$, $n\\neq-1$', text: 'Power rule.', textKm: 'រូបមន្តស្វ័យគុណ។', math: '\\int x^n\\,dx=\\frac{x^{n+1}}{n+1}+C' },
            { label: '$\\frac{u\'}{u}$', text: 'Logarithm, e.g. $\\frac{1}{x+a}\\to\\ln|x+a|$.', textKm: 'លោការីត ឧ. $\\frac{1}{x+a}\\to\\ln|x+a|$។', math: '\\int\\frac{u\'}{u}\\,dx=\\ln|u|+C' },
            { label: '$u\'e^{u}$', text: 'Exponential, e.g. $e^{2x}\\to\\frac12e^{2x}$.', textKm: 'អិចស្ប៉ូណង់ស្យែល ឧ. $e^{2x}\\to\\frac12e^{2x}$។', math: '\\int u\'e^{u}\\,dx=e^{u}+C' },
            { label: 'Rational fraction', labelKm: 'ប្រភាគសនិទាន', text: 'Use the given decomposition $\\frac{a}{x-p}+\\frac{b}{x-q}$, then integrate each part.', textKm: 'ប្រើការបំបែកដែលឲ្យ $\\frac{a}{x-p}+\\frac{b}{x-q}$ រួចធ្វើអាំងតេក្រាលផ្នែកនីមួយៗ។' },
          ],
        },
        { kind: 'step', text: 'Write one antiderivative $F$ (no $+C$ needed for definite integrals).', textKm: 'សរសេរព្រីមីទីវ $F$ មួយ (មិនចាំបាច់ $+C$ សម្រាប់អាំងតេក្រាលកំណត់)។' },
        { kind: 'end', text: 'Evaluate and simplify exact values ($\\ln$, $e$) before any decimal.', textKm: 'គណនា និងសម្រួលតម្លៃពិត ($\\ln$, $e$) មុនប្ដូរជាទសភាគ។', math: '\\int_a^b f(x)\\,dx=F(b)-F(a)' },
      ],
    },
    graph: {
      id: 'bac-graph-integral-area',
      title: 'A definite integral as an area',
      titleKm: 'អាំងតេក្រាលកំណត់ជាក្រឡាផ្ទៃ',
      caption: '∫₀² (x² + 1) dx = [x³/3 + x]₀² = 8/3 + 2 = 14/3 ≈ 4.67 square units.',
      captionKm: '∫₀² (x² + 1) dx = [x³/3 + x]₀² = 8/3 + 2 = 14/3 ≈ 4.67 ឯកតាការ៉េ។',
      xRange: [-2, 4],
      yRange: [-1, 7],
      curves: [{ fn: (x) => x * x + 1, label: 'y = x² + 1', color: 1 }],
      areas: [{ fn: (x) => x * x + 1, from: 0, to: 2, color: 1 }],
      points: [
        { x: 0, y: 1, anchor: 'nw' },
        { x: 2, y: 5, anchor: 'e' },
      ],
    },
  },
  {
    kind: 'probability',
    title: 'Probability by counting',
    titleKm: 'ប្រូបាបដោយការរាប់',
    asks: [
      'A bag or box with balls of two or three colours; several are drawn at the same time.',
      'Find the probability of: all one colour, exactly $k$ of a colour, at least one, same colour.',
      'Recent papers add a draw with replacement (multiply probabilities).',
    ],
    asksKm: [
      'ថង់ ឬប្រអប់មានប៊ូលពីរ ឬបីពណ៌; ចាប់ច្រើនគ្រាប់ព្រមគ្នា។',
      'រកប្រូបាប៖ ពណ៌តែមួយទាំងអស់ ចំនួន $k$ គ្រាប់នៃពណ៌មួយ យ៉ាងតិចមួយ ពណ៌ដូចគ្នា។',
      'វិញ្ញាសាថ្មីៗបន្ថែមការចាប់ហើយដាក់វិញ (គុណប្រូបាប)។',
    ],
    checks: ['Every probability is between 0 and 1.', 'Complementary cases must add up to 1.'],
    checksKm: ['ប្រូបាបនីមួយៗស្ថិតនៅចន្លោះ 0 និង 1។', 'ករណីបំពេញគ្នាត្រូវមានផលបូកស្មើ 1។'],
    topicId: 'permutations-and-combinations',
    tracks: ['science', 'social'],
    flowchart: {
      id: 'bac-flow-probability',
      topicIds: ['permutations-and-combinations'],
      title: 'Counting the favourable cases',
      titleKm: 'រាប់ករណីស្រប',
      summary: 'Probability = favourable cases ÷ possible cases, both counted with combinations.',
      summaryKm: 'ប្រូបាប = ករណីស្រប ÷ ករណីអាច ដែលរាប់ដោយបន្សំទាំងពីរ។',
      nodes: [
        { kind: 'start', text: 'Total objects $n$, number drawn $k$ at the same time.', textKm: 'វត្ថុសរុប $n$ ចាប់ $k$ ព្រមគ្នា។', math: '\\text{possible cases}=\\binom{n}{k}' },
        {
          kind: 'decision',
          text: 'What does the event ask for?',
          textKm: 'តើព្រឹត្តិការណ៍សួររកអ្វី?',
          branches: [
            { label: 'Exact numbers per colour', labelKm: 'ចំនួនជាក់លាក់តាមពណ៌', text: 'Multiply one combination per colour, e.g. 2 red of 4 and 1 white of 3.', textKm: 'គុណបន្សំមួយសម្រាប់ពណ៌នីមួយៗ ឧ. ក្រហម 2 ក្នុង 4 និងស 1 ក្នុង 3។', math: '\\binom{4}{2}\\binom{3}{1}' },
            { label: '"At least one"', labelKm: '«យ៉ាងតិចមួយ»', text: 'Use the complement: $1-P(\\text{none})$.', textKm: 'ប្រើព្រឹត្តិការណ៍បំពេញ៖ $1-P(\\text{គ្មាន})$។' },
            { label: '"Same colour"', labelKm: '«ពណ៌ដូចគ្នា»', text: 'Add the separate cases: all red + all white + …', textKm: 'បូកករណីដាច់ពីគ្នា៖ ក្រហមទាំងអស់ + សទាំងអស់ + …' },
            { label: 'With replacement', labelKm: 'ចាប់ហើយដាក់វិញ', text: 'Draws are independent: multiply the single-draw probabilities.', textKm: 'ការចាប់ឯករាជ្យ៖ គុណប្រូបាបនៃការចាប់ម្ដងៗ។' },
          ],
        },
        { kind: 'end', text: 'Divide by the possible cases and simplify the fraction.', textKm: 'ចែកនឹងករណីអាច ហើយសម្រួលប្រភាគ។' },
      ],
    },
  },
  {
    kind: 'conics',
    title: 'Ellipse and parabola',
    titleKm: 'អេលីប និងប៉ារ៉ាបូល',
    asks: [
      'Turn a general equation into standard form (complete the square, divide by the constant).',
      'Give the centre, vertices, foci, axis lengths (ellipse) or vertex, focus, directrix (parabola), then sketch.',
      'Or build the equation from given vertices and a focus.',
    ],
    asksKm: [
      'បំប្លែងសមីការទូទៅជាទម្រង់ស្តង់ដា (បំពេញការ៉េ ចែកនឹងចំនួនថេរ)។',
      'ផ្ដល់ផ្ចិត កំពូល កំណុំ ប្រវែងអ័ក្ស (អេលីប) ឬកំពូល កំណុំ បន្ទាត់ប្រាប់ទិស (ប៉ារ៉ាបូល) រួចសង់។',
      'ឬបង្កើតសមីការពីកំពូល និងកំណុំដែលឲ្យ។',
    ],
    checks: ['For an ellipse $a>b$ and $c^2=a^2-b^2$.', 'For a parabola the vertex is halfway between focus and directrix.'],
    checksKm: ['ចំពោះអេលីប $a>b$ និង $c^2=a^2-b^2$។', 'ចំពោះប៉ារ៉ាបូល កំពូលនៅពាក់កណ្ដាលរវាងកំណុំ និងបន្ទាត់ប្រាប់ទិស។'],
    topicId: 'conic-sections',
    tracks: ['science', 'social'],
    flowchart: {
      id: 'bac-flow-conics',
      topicIds: ['conic-sections'],
      title: 'From a general equation to a sketch',
      titleKm: 'ពីសមីការទូទៅ ទៅការសង់ក្រាប',
      summary: 'Identify the conic from the squared terms, then read every element from the standard form.',
      summaryKm: 'កំណត់ប្រភេទកោនិកពីតួការ៉េ រួចអានធាតុទាំងអស់ពីទម្រង់ស្តង់ដា។',
      nodes: [
        { kind: 'start', text: 'Group $x$ terms and $y$ terms; complete each square.', textKm: 'ដាក់តួ $x$ ជាមួយគ្នា តួ $y$ ជាមួយគ្នា; បំពេញការ៉េនីមួយៗ។' },
        {
          kind: 'decision',
          text: 'Which squares remain?',
          textKm: 'តើនៅសល់ការ៉េមួយណា?',
          branches: [
            { label: '$x^2$ and $y^2$, same sign', labelKm: '$x^2$ និង $y^2$ សញ្ញាដូចគ្នា', text: 'Ellipse. Divide to get 1 on the right.', textKm: 'អេលីប។ ចែកឲ្យខាងស្ដាំស្មើ 1។', math: '\\frac{(x-h)^2}{a^2}+\\frac{(y-k)^2}{b^2}=1' },
            { label: 'Only one square', labelKm: 'ការ៉េតែមួយ', text: 'Parabola. Isolate the square.', textKm: 'ប៉ារ៉ាបូល។ ទុកការ៉េម្ខាង។', math: '(y-k)^2=4p(x-h)\\ \\text{or}\\ (x-h)^2=4p(y-k)' },
          ],
        },
        { kind: 'step', text: 'Ellipse: $c=\\sqrt{a^2-b^2}$, vertices $h\\pm a$, foci $h\\pm c$ on the major axis, $e=\\frac{c}{a}$.', textKm: 'អេលីប៖ $c=\\sqrt{a^2-b^2}$ កំពូល $h\\pm a$ កំណុំ $h\\pm c$ លើអ័ក្សធំ $e=\\frac{c}{a}$។' },
        { kind: 'step', text: 'Parabola: vertex $(h,k)$, focus $p$ units inside, directrix $p$ units outside.', textKm: 'ប៉ារ៉ាបូល៖ កំពូល $(h,k)$ កំណុំនៅខាងក្នុង $p$ ឯកតា បន្ទាត់ប្រាប់ទិសនៅខាងក្រៅ $p$ ឯកតា។' },
        { kind: 'end', text: 'Plot centre/vertex, vertices, foci, then draw a smooth curve.', textKm: 'ដៅផ្ចិត/កំពូល កំពូលទាំងឡាយ កំណុំ រួចគូសខ្សែកោងរលូន។' },
      ],
    },
    graph: {
      id: 'bac-graph-ellipse',
      title: 'Ellipse x²/9 + y²/4 = 1',
      titleKm: 'អេលីប x²/9 + y²/4 = 1',
      caption: 'a = 3, b = 2, c = √(9 − 4) = √5 ≈ 2.24. Vertices (±3, 0), co-vertices (0, ±2), foci (±√5, 0), eccentricity e = √5/3 ≈ 0.75.',
      captionKm: 'a = 3, b = 2, c = √(9 − 4) = √5 ≈ 2.24។ កំពូល (±3, 0) កំពូលអ័ក្សតូច (0, ±2) កំណុំ (±√5, 0) អ៊ិចសង់ទ្រីស៊ីតេ e = √5/3 ≈ 0.75។',
      xRange: [-4, 4],
      yRange: [-3, 3],
      parametric: [{ x: (t) => 3 * Math.cos(t), y: (t) => 2 * Math.sin(t), t: [0, 2 * Math.PI], label: 'x²/9 + y²/4 = 1', color: 1 }],
      points: [
        { x: -3, y: 0, label: 'V₁', anchor: 'nw' },
        { x: 3, y: 0, label: 'V₂', anchor: 'ne' },
        { x: -Math.sqrt(5), y: 0, label: 'F₁', anchor: 's', color: 2 },
        { x: Math.sqrt(5), y: 0, label: 'F₂', anchor: 's', color: 2 },
        { x: 0, y: 2, anchor: 'ne', color: 3 },
      ],
    },
  },
  {
    kind: 'complex-numbers',
    title: 'Complex numbers in trigonometric form',
    titleKm: 'ចំនួនកុំផ្លិចទម្រង់ត្រីកោណមាត្រ',
    asks: [
      'Write $z_1$, $z_2$ and $\\frac{z_1}{z_2}$ in trigonometric form.',
      'Write the quotient in algebraic form and compare to find exact values such as $\\cos\\frac{\\pi}{12}$.',
    ],
    asksKm: [
      'សរសេរ $z_1$, $z_2$ និង $\\frac{z_1}{z_2}$ ជាទម្រង់ត្រីកោណមាត្រ។',
      'សរសេរផលចែកជាទម្រង់ពិជគណិត ហើយផ្ទឹមដើម្បីរកតម្លៃពិតដូចជា $\\cos\\frac{\\pi}{12}$។',
    ],
    checks: ['The argument must match the quadrant of the point $(a, b)$.', 'Modulus is never negative.'],
    checksKm: ['អាគុយម៉ង់ត្រូវស្របនឹងកាដ្រង់នៃចំណុច $(a, b)$។', 'ម៉ូឌុលមិនដែលអវិជ្ជមានទេ។'],
    topicId: 'complex-numbers',
    tracks: ['science'],
    flowchart: {
      id: 'bac-flow-complex',
      topicIds: ['complex-numbers'],
      title: 'Algebraic form → trigonometric form',
      titleKm: 'ទម្រង់ពិជគណិត → ទម្រង់ត្រីកោណមាត្រ',
      summary: 'Find the modulus, then the angle from cosine and sine together.',
      summaryKm: 'រកម៉ូឌុល បន្ទាប់មករកមុំពីកូស៊ីនុស និងស៊ីនុសរួមគ្នា។',
      nodes: [
        { kind: 'start', text: 'Write $z=a+bi$ with $a$ and $b$ real.', textKm: 'សរសេរ $z=a+bi$ ដែល $a$ និង $b$ ជាចំនួនពិត។' },
        { kind: 'step', text: 'Modulus:', textKm: 'ម៉ូឌុល៖', math: 'r=|z|=\\sqrt{a^2+b^2}' },
        { kind: 'step', text: 'Find $\\theta$ with $\\cos\\theta=\\frac{a}{r}$ and $\\sin\\theta=\\frac{b}{r}$ (both, to fix the quadrant).', textKm: 'រក $\\theta$ ដោយ $\\cos\\theta=\\frac{a}{r}$ និង $\\sin\\theta=\\frac{b}{r}$ (ទាំងពីរ ដើម្បីកំណត់កាដ្រង់)។' },
        {
          kind: 'decision',
          text: 'Product or quotient?',
          textKm: 'ផលគុណ ឬផលចែក?',
          branches: [
            { label: 'Product', labelKm: 'ផលគុណ', text: 'Multiply moduli, add arguments.', textKm: 'គុណម៉ូឌុល បូកអាគុយម៉ង់។' },
            { label: 'Quotient', labelKm: 'ផលចែក', text: 'Divide moduli, subtract arguments.', textKm: 'ចែកម៉ូឌុល ដកអាគុយម៉ង់។' },
          ],
        },
        { kind: 'end', text: 'Write the result; equate real and imaginary parts with the algebraic form to get exact values.', textKm: 'សរសេរលទ្ធផល; ផ្ទឹមផ្នែកពិត និងផ្នែកនិម្មិតជាមួយទម្រង់ពិជគណិត ដើម្បីបានតម្លៃពិត។', math: 'z=r(\\cos\\theta+i\\sin\\theta)' },
      ],
    },
    graph: {
      id: 'bac-graph-argand',
      title: 'z = 1 + i√3 on the complex plane',
      titleKm: 'z = 1 + i√3 លើប្លង់កុំផ្លិច',
      caption: 'r = √(1 + 3) = 2 and cos θ = 1/2, sin θ = √3/2, so θ = π/3 (60°): z = 2(cos π/3 + i sin π/3).',
      captionKm: 'r = √(1 + 3) = 2 និង cos θ = 1/2, sin θ = √3/2 ដូច្នេះ θ = π/3 (60°)៖ z = 2(cos π/3 + i sin π/3)។',
      xRange: [-1, 3],
      yRange: [-1, 3],
      xLabel: 'Re',
      yLabel: 'Im',
      lines: [
        { kind: 'segment', from: [0, 0], to: [1, Math.sqrt(3)], arrow: true, color: 1, label: '|z| = 2' },
        { kind: 'segment', from: [1, 0], to: [1, Math.sqrt(3)], dashed: true, color: 3 },
      ],
      parametric: [{ x: (t) => 0.5 * Math.cos(t), y: (t) => 0.5 * Math.sin(t), t: [0, Math.PI / 3], color: 4 }],
      points: [{ x: 1, y: Math.sqrt(3), label: 'z', anchor: 'ne', color: 1 }],
    },
  },
  {
    kind: 'vectors-3d',
    title: 'Vectors, planes and lines in space',
    titleKm: 'វ៉ិចទ័រ ប្លង់ និងបន្ទាត់ក្នុងលំហ',
    asks: [
      'Three points $A$, $B$, $C$: components of $\\overrightarrow{AB}$ and $\\overrightarrow{AC}$, the angle between them, a right angle check.',
      'Cross product, equation of plane $(ABC)$, area of triangle $ABC$, a line through a point perpendicular to the plane.',
    ],
    asksKm: [
      'ចំណុចបី $A$, $B$, $C$៖ កូអរដោនេ $\\overrightarrow{AB}$ និង $\\overrightarrow{AC}$ មុំរវាងពួកវា និងផ្ទៀងផ្ទាត់មុំកែង។',
      'ផលគុណវ៉ិចទ័រ សមីការប្លង់ $(ABC)$ ក្រឡាផ្ទៃត្រីកោណ $ABC$ និងបន្ទាត់កាត់តាមចំណុចមួយកែងនឹងប្លង់។',
    ],
    checks: ['The normal vector is perpendicular to both $\\overrightarrow{AB}$ and $\\overrightarrow{AC}$: both dot products are 0.', 'Each of $A$, $B$, $C$ satisfies the plane equation.'],
    checksKm: ['វ៉ិចទ័រណរម៉ាល់កែងនឹង $\\overrightarrow{AB}$ និង $\\overrightarrow{AC}$៖ ផលគុណស្កាលែទាំងពីរស្មើ 0។', 'ចំណុច $A$, $B$, $C$ នីមួយៗផ្ទៀងផ្ទាត់សមីការប្លង់។'],
    topicId: 'vectors-in-three-dimensions',
    tracks: ['science'],
    flowchart: {
      id: 'bac-flow-vectors-3d',
      topicIds: ['vectors-in-three-dimensions'],
      title: 'Three points → plane → perpendicular line',
      titleKm: 'ចំណុចបី → ប្លង់ → បន្ទាត់កែង',
      summary: 'Every later answer reuses the cross product, so compute it carefully once.',
      summaryKm: 'ចម្លើយក្រោយៗប្រើផលគុណវ៉ិចទ័រ ដូច្នេះគណនាវាឲ្យត្រឹមត្រូវម្ដង។',
      nodes: [
        { kind: 'start', text: 'Components: $\\overrightarrow{AB}=B-A$, $\\overrightarrow{AC}=C-A$.', textKm: 'កូអរដោនេ៖ $\\overrightarrow{AB}=B-A$, $\\overrightarrow{AC}=C-A$។' },
        { kind: 'step', text: 'Angle: dot product over the product of lengths. Dot product 0 means a right angle at $A$.', textKm: 'មុំ៖ ផលគុណស្កាលែចែកនឹងផលគុណប្រវែង។ ផលគុណស្កាលែ 0 មានន័យថាកែងត្រង់ $A$។', math: '\\cos\\theta=\\frac{\\overrightarrow{AB}\\cdot\\overrightarrow{AC}}{AB\\cdot AC}' },
        { kind: 'step', text: 'Normal vector $\\vec n=\\overrightarrow{AB}\\times\\overrightarrow{AC}=(a,b,c)$.', textKm: 'វ៉ិចទ័រណរម៉ាល់ $\\vec n=\\overrightarrow{AB}\\times\\overrightarrow{AC}=(a,b,c)$។' },
        { kind: 'step', text: 'Plane: substitute $A$ to find $d$.', textKm: 'ប្លង់៖ ជំនួស $A$ ដើម្បីរក $d$។', math: 'ax+by+cz+d=0' },
        { kind: 'step', text: 'Area of triangle $ABC$:', textKm: 'ក្រឡាផ្ទៃត្រីកោណ $ABC$៖', math: 'S=\\tfrac12\\left\\|\\overrightarrow{AB}\\times\\overrightarrow{AC}\\right\\|' },
        { kind: 'end', text: 'Line through $D$ perpendicular to the plane has direction $\\vec n$.', textKm: 'បន្ទាត់កាត់តាម $D$ កែងនឹងប្លង់ មានវ៉ិចទ័រប្រាប់ទិស $\\vec n$។', math: '(L):\\ x=x_D+at,\\ y=y_D+bt,\\ z=z_D+ct' },
      ],
    },
  },
  {
    kind: 'differential-equations',
    title: 'First-order differential equations (older papers)',
    titleKm: 'សមីការឌីផេរ៉ង់ស្យែលលំដាប់ទី១ (វិញ្ញាសាចាស់ៗ)',
    asks: ['Appeared on Social Science papers 2011–2013: solve $y\'=f(x)$ or $y\'+ay=b$, sometimes with an initial condition.'],
    asksKm: ['មាននៅវិញ្ញាសាថ្នាក់វិទ្យាសាស្ត្រសង្គម ២០១១–២០១៣៖ ដោះស្រាយ $y\'=f(x)$ ឬ $y\'+ay=b$ ពេលខ្លះមានលក្ខខណ្ឌដើម។'],
    checks: ['Substitute your solution back into the equation.'],
    checksKm: ['ជំនួសចម្លើយត្រឡប់ទៅក្នុងសមីការវិញ។'],
    topicId: 'integration',
    tracks: ['social'],
    flowchart: {
      id: 'bac-flow-differential-equations',
      topicIds: ['integration'],
      title: 'Solving $y\'+ay=b$',
      titleKm: 'ដោះស្រាយ $y\'+ay=b$',
      summary: 'General solution of the homogeneous equation plus one particular solution.',
      summaryKm: 'ចម្លើយទូទៅនៃសមីការគ្មានអង្គទីពីរ បូកចម្លើយពិសេសមួយ។',
      nodes: [
        { kind: 'start', text: 'Put the equation in the form $y\'+ay=g(x)$.', textKm: 'សរសេរសមីការជារាង $y\'+ay=g(x)$។' },
        {
          kind: 'decision',
          text: 'Is $a=0$?',
          textKm: 'តើ $a=0$ ឬទេ?',
          branches: [
            { label: 'Yes', labelKm: 'បាទ/ចាស', text: 'Integrate directly: $y=\\int g(x)\\,dx$.', textKm: 'ធ្វើអាំងតេក្រាលផ្ទាល់៖ $y=\\int g(x)\\,dx$។' },
            { label: 'No', labelKm: 'ទេ', text: 'Homogeneous part: $y_h=Ce^{-ax}$.', textKm: 'ផ្នែកគ្មានអង្គទីពីរ៖ $y_h=Ce^{-ax}$។' },
          ],
        },
        { kind: 'step', text: 'Particular solution of the same shape as $g$ (constant, or $px+q$).', textKm: 'ចម្លើយពិសេសមានរាងដូច $g$ (ចំនួនថេរ ឬ $px+q$)។' },
        { kind: 'end', text: 'Add them, then use the initial condition to find $C$.', textKm: 'បូកវាចូលគ្នា រួចប្រើលក្ខខណ្ឌដើមដើម្បីរក $C$។', math: 'y=Ce^{-ax}+y_p' },
      ],
    },
  },
]

export function patternsFor(track: BacTrack): QuestionPattern[] {
  const kinds = new Set(papersFor(track).flatMap((paper) => paper.parts.map((part) => part.kind)))
  return QUESTION_PATTERNS.filter((pattern) => pattern.tracks.includes(track) && kinds.has(pattern.kind))
}

export function patternsForTopic(topicId: string): QuestionPattern[] {
  return QUESTION_PATTERNS.filter((pattern) => pattern.topicId === topicId)
}

/* ------------------------------------------------------------------ */
/* Study guideline                                                    */
/* ------------------------------------------------------------------ */

export interface StudyPhase {
  weeks: string
  weeksKm: string
  title: string
  titleKm: string
  actions: string[]
  actionsKm: string[]
}

export const STUDY_PLAN: StudyPhase[] = [
  {
    weeks: 'Weeks 1–2',
    weeksKm: 'សប្ដាហ៍ ១–២',
    title: 'Learn the patterns',
    titleKm: 'រៀនគំរូសំណួរ',
    actions: [
      'One question type per day, in the order of the paper.',
      'Read the flowchart, then redo the worked example without looking.',
      'Write the key formulas of the day on one card.',
    ],
    actionsKm: [
      'មួយថ្ងៃមួយប្រភេទសំណួរ តាមលំដាប់វិញ្ញាសា។',
      'អានផែនទីលំហូរ រួចធ្វើឧទាហរណ៍គំរូឡើងវិញដោយមិនមើល។',
      'សរសេររូបមន្តសំខាន់ៗនៃថ្ងៃលើកាតមួយ។',
    ],
  },
  {
    weeks: 'Weeks 3–4',
    weeksKm: 'សប្ដាហ៍ ៣–៤',
    title: 'Practise by part',
    titleKm: 'ហាត់តាមផ្នែក',
    actions: [
      'Do the same part from several years in one sitting (for example every limits question).',
      'Keep an error log: the mistake, the cause, the correct line.',
      'Finish the topic exercises on this site until you score at least 80%.',
    ],
    actionsKm: [
      'ធ្វើផ្នែកដូចគ្នាពីច្រើនឆ្នាំក្នុងពេលតែមួយ (ឧ. គ្រប់សំណួរលីមីត)។',
      'កត់ត្រាកំហុស៖ កំហុស មូលហេតុ និងបន្ទាត់ត្រឹមត្រូវ។',
      'ធ្វើលំហាត់ប្រធានបទលើគេហទំព័រនេះ រហូតបានយ៉ាងតិច ៨០%។',
    ],
  },
  {
    weeks: 'Weeks 5–6',
    weeksKm: 'សប្ដាហ៍ ៥–៦',
    title: 'Full timed papers',
    titleKm: 'វិញ្ញាសាពេញ កំណត់ម៉ោង',
    actions: [
      'Two full papers per week under the real time limit, using the time budget below.',
      'Mark yourself part by part and re-study the weakest part next day.',
    ],
    actionsKm: [
      'វិញ្ញាសាពេញពីរក្នុងមួយសប្ដាហ៍ តាមរយៈពេលពិត ដោយប្រើការបែងចែកពេលខាងក្រោម។',
      'ដាក់ពិន្ទុខ្លួនឯងតាមផ្នែក ហើយរៀនផ្នែកខ្សោយបំផុតឡើងវិញនៅថ្ងៃបន្ទាប់។',
    ],
  },
  {
    weeks: 'Final week',
    weeksKm: 'សប្ដាហ៍ចុងក្រោយ',
    title: 'Consolidate',
    titleKm: 'ពង្រឹង',
    actions: [
      'Reread your error log and formula cards only; no new material.',
      'One last full paper three days before the exam, then rest and sleep well.',
    ],
    actionsKm: [
      'អានតែកំណត់ត្រាកំហុស និងកាតរូបមន្តឡើងវិញ; កុំរៀនមេរៀនថ្មី។',
      'វិញ្ញាសាពេញចុងក្រោយមួយ បីថ្ងៃមុនប្រឡង រួចសម្រាក និងគេងឲ្យបានគ្រប់គ្រាន់។',
    ],
  },
]

export const EXAM_DAY_TIPS: { en: string; km: string }[] = [
  { en: 'Start with the part you are surest of; come back to the hardest.', km: 'ចាប់ផ្ដើមពីផ្នែកដែលអ្នកប្រាកដបំផុត; ត្រឡប់មកផ្នែកពិបាកវិញនៅពេលក្រោយ។' },
  { en: 'Never leave the function study blank: domain, limits and the derivative earn marks on their own.', km: 'កុំទុកសំណួរសិក្សាអនុគមន៍ទទេ៖ ដែនកំណត់ លីមីត និងដេរីវេ មានពិន្ទុរៀងខ្លួន។' },
  { en: 'Write every step. Marking keys award marks line by line, not only for the final answer.', km: 'សរសេរគ្រប់ជំហាន។ គន្លឹះកែពិន្ទុផ្ដល់ពិន្ទុតាមបន្ទាត់ មិនមែនតែចម្លើយចុងក្រោយទេ។' },
  { en: 'Box each final answer and keep exact values ($\\sqrt5$, $\\ln2$, $\\frac{14}{3}$) unless a decimal is asked.', km: 'គូសប្រអប់ចម្លើយចុងក្រោយ ហើយរក្សាតម្លៃពិត ($\\sqrt5$, $\\ln2$, $\\frac{14}{3}$) លើកលែងតែគេសួររកទសភាគ។' },
  { en: 'Use the last 10 minutes to check signs, domains and that probabilities lie in $[0,1]$.', km: 'ប្រើ ១០ នាទីចុងក្រោយ ពិនិត្យសញ្ញា ដែនកំណត់ និងថាប្រូបាបស្ថិតក្នុង $[0,1]$។' },
]
