/**
 * Canonical content model for High School Math.
 *
 * Content is authored as plain TypeScript objects, validated by tests, and
 * indexed at runtime. Keep this file free of UI concerns.
 */

export type GradeId = '7' | '8' | '9' | '10' | '11' | '12'

export const GRADE_IDS: GradeId[] = ['7', '8', '9', '10', '11', '12']

export type SubjectFamily =
  | 'number'
  | 'algebra'
  | 'geometry'
  | 'trigonometry'
  | 'statistics-probability'
  | 'coordinate-geometry'
  | 'vectors-matrices'
  | 'advanced'

export interface VariableDefinition {
  /** LaTeX symbol, e.g. `r` or `\\theta`. */
  symbol: string
  /** Plain-language name, e.g. "radius". */
  name: string
  /** Optional unit, e.g. "cm" or "cm³". */
  unit?: string
  /** Clarifying note, e.g. "must be positive". */
  note?: string
}

export interface Formula {
  /** Globally unique, e.g. `g10-quadratic-formula`. */
  id: string
  title: string
  /** LaTeX without delimiters. */
  expression: string
  /** One or two plain-English sentences explaining what the formula does. */
  description: string
  /** Plain-language reading of the formula for screen readers. */
  spoken?: string
  variables: VariableDefinition[]
  /** Domain restrictions and assumptions. */
  conditions?: string[]
  /** Useful observations, alternate forms, or memory aids. */
  notes?: string
  /** Search terms and alternative names. */
  tags: string[]
}

export interface ExampleStep {
  /** What is being done and why. May contain inline `$...$` math. */
  text: string
  /** Optional display LaTeX for this step. */
  math?: string
}

export interface WorkedExample {
  title: string
  /** May contain inline `$...$` math. */
  problem: string
  /** Known values and conversions, each may contain inline math. */
  given: string[]
  /** Ordered solution steps, including substitution and calculation. */
  steps: ExampleStep[]
  /** Final answer, with units and approximation note. May contain inline math. */
  answer: string
}

export type ExerciseDifficulty = 'easy' | 'medium' | 'hard'

interface ExerciseBase {
  /** Globally unique, e.g. `g10-quadratic-ex-1`. */
  id: string
  prompt: string
  /** Optional display equation shown beneath the prompt. */
  promptMath?: string
  hint?: string
  explanation: string
  difficulty: ExerciseDifficulty
}

export interface MultipleChoiceExercise extends ExerciseBase {
  type: 'multiple-choice'
  options: string[]
  /** Zero-based index into `options`. */
  correctOption: number
}

export interface NumericExercise extends ExerciseBase {
  type: 'numeric'
  answer: number
  /** Accepted absolute difference. Defaults to 0.01. */
  tolerance?: number
  answerUnit?: string
}

export type Exercise = MultipleChoiceExercise | NumericExercise

export interface TheorySection {
  /** Section heading, e.g. "Why the formula works". */
  title: string
  /** Paragraphs; may contain inline `$...$` math. */
  body: string[]
  /** Optional bullet list. */
  bullets?: string[]
}

export interface CommonMistake {
  mistake: string
  correction: string
}

export interface Theorem {
  title: string
  /** May contain inline math. */
  statement: string
  note?: string
}

export interface Topic {
  /** Globally unique kebab-case slug; also the URL segment. */
  id: string
  title: string
  /** One-line framing shown on cards. */
  subtitle: string
  /** Opening explanation; may contain inline `$...$` math. */
  introduction: string
  /** Human-readable prerequisite concepts. */
  prerequisites?: string[]
  /** Core ideas surfaced in the topic sidebar. */
  keyIdeas?: string[]
  theory: TheorySection[]
  formulas: Formula[]
  examples: WorkedExample[]
  mistakes: CommonMistake[]
  exercises: Exercise[]
  /** Topic IDs from anywhere in the library. */
  related: string[]
  /** Optional link to an interactive shape in the Shape Lab. */
  shapeId?: string
  /** Optional description of the linked shape demonstration. */
  shapeCaption?: string
  /** Alternative search terms for the whole topic. */
  aliases?: string[]
}

export interface Subject {
  /** Unique within the grade, kebab-case. */
  id: string
  family: SubjectFamily
  title: string
  description: string
  topics: Topic[]
  /** Named theorems worth calling out on the subject page. */
  theorems?: Theorem[]
}

export interface Grade {
  id: GradeId
  number: number
  title: string
  /** Short editorial line for cards and heroes. */
  tagline: string
  description: string
  /** Three to five themes that define the year. */
  focus: string[]
  subjects: Subject[]
}

/* ------------------------------------------------------------------ */
/* Flowcharts                                                         */
/* ------------------------------------------------------------------ */

/**
 * Text fields may contain inline `$...$` math. `math` holds display LaTeX
 * without delimiters. Every `*Km` field is the Khmer counterpart and falls
 * back to the English field when omitted.
 */
export interface FlowBranch {
  /** Short answer to the decision, e.g. "Yes", "0/0", "Order matters". */
  label: string
  labelKm?: string
  /** What to do on this branch. */
  text: string
  textKm?: string
  math?: string
}

export type FlowNodeKind = 'start' | 'step' | 'decision' | 'end'

export interface FlowNode {
  kind: FlowNodeKind
  text: string
  textKm?: string
  math?: string
  /** Required (two or more) for `decision`, forbidden otherwise. */
  branches?: FlowBranch[]
}

export interface Flowchart {
  /** Globally unique kebab-case id, e.g. `flow-solve-linear-equation`. */
  id: string
  /** Topic IDs this flowchart is shown on. */
  topicIds: string[]
  title: string
  titleKm?: string
  /** One sentence: when to use this flowchart. */
  summary: string
  summaryKm?: string
  /** Read top to bottom. The first node is `start`, the last is `end`. */
  nodes: FlowNode[]
}

/* ------------------------------------------------------------------ */
/* Graphs (exact coordinate-plane plots)                              */
/* ------------------------------------------------------------------ */

/** Palette slot: 1 blue, 2 red, 3 green, 4 gold. */
export type PlotColor = 1 | 2 | 3 | 4

export interface GraphCurve {
  /** y = fn(x). Return NaN/Infinity where undefined; the path breaks there. */
  fn: (x: number) => number
  /** Plain-text legend label, e.g. "y = x² − 4". No LaTeX. */
  label?: string
  color?: PlotColor
  /** Restrict sampling, e.g. [0, Infinity) for √x. Defaults to the x-range. */
  domain?: [number, number]
  dashed?: boolean
}

export interface GraphParametric {
  x: (t: number) => number
  y: (t: number) => number
  t: [number, number]
  label?: string
  color?: PlotColor
  dashed?: boolean
}

export interface GraphLine {
  /** `vertical` x = c, `horizontal` y = c, `segment` from → to, `line` through two points (extended). */
  kind: 'vertical' | 'horizontal' | 'segment' | 'line'
  at?: number
  from?: [number, number]
  to?: [number, number]
  label?: string
  color?: PlotColor
  dashed?: boolean
  /** Draw an arrowhead at `to` (vectors). */
  arrow?: boolean
}

export interface GraphPoint {
  x: number
  y: number
  /** Name, e.g. "A". Shown as "A(1, 2)" when `showCoords` is not false. */
  label?: string
  showCoords?: boolean
  color?: PlotColor
  /** Hollow marker for excluded points (holes, open interval ends). */
  open?: boolean
  /** Label placement relative to the point. Defaults to 'ne'. */
  anchor?: 'ne' | 'nw' | 'se' | 'sw' | 'n' | 's' | 'e' | 'w'
}

export interface GraphArea {
  /** Upper boundary. */
  fn: (x: number) => number
  /** Lower boundary; defaults to y = 0. */
  lower?: (x: number) => number
  from: number
  to: number
  color?: PlotColor
  label?: string
}

export interface GraphSpec {
  id: string
  title: string
  titleKm?: string
  /** Plain-language description of what the graph shows (also the accessible description). */
  caption: string
  captionKm?: string
  xRange: [number, number]
  yRange: [number, number]
  /** Tick spacing; defaults to 1. */
  xStep?: number
  yStep?: number
  /** Axis names; default "x" and "y". */
  xLabel?: string
  yLabel?: string
  /** Use the same scale on both axes (circles look round). Default true. */
  equalScale?: boolean
  curves?: GraphCurve[]
  parametric?: GraphParametric[]
  lines?: GraphLine[]
  points?: GraphPoint[]
  areas?: GraphArea[]
}

/* ------------------------------------------------------------------ */
/* Shapes                                                             */
/* ------------------------------------------------------------------ */

export interface ShapeDimension {
  key: string
  label: string
  /** LaTeX symbol shown in controls and formulas. */
  symbol: string
  min: number
  max: number
  step: number
  defaultValue: number
  unit: string
  /** Short explanation, e.g. "distance from centre to edge". */
  description?: string
}

export type MetricKind = 'length' | 'area' | 'surface' | 'volume' | 'angle'

export interface ShapeMetric {
  key: string
  label: string
  formula: string
  /** Short reading of the formula's meaning. */
  description: string
  kind: MetricKind
  /** Pure calculation from the shape's current dimensions. */
  compute: (dimensions: Record<string, number>) => number
  /** Decimal places used in the live readout. Defaults to 2. */
  precision?: number
  /** Also show the exact expression where meaningful (e.g. multiples of π). */
  exact?: (dimensions: Record<string, number>) => string | null
}

export interface Shape {
  id: string
  name: string
  category: '2d' | '3d'
  /** Short editorial description shown on cards. */
  tagline: string
  definition: string
  properties: string[]
  dimensions: ShapeDimension[]
  metrics: ShapeMetric[]
  /** Display formula lines for the shape reference panel. */
  formulas: { label: string; expression: string; note?: string }[]
  example: {
    problem: string
    steps: string[]
    answer: string
  }
  /** Alternative names for search. */
  aliases?: string[]
}

export type ShapeDimensions = Record<string, number>

/* ------------------------------------------------------------------ */
/* Derived models used by navigation and search                       */
/* ------------------------------------------------------------------ */

export interface TopicRef {
  topic: Topic
  grade: Grade
  subject: Subject
  key: string
}

export interface FormulaRef {
  formula: Formula
  topic: Topic
  grade: Grade
  subject: Subject
}

export interface SubjectRef {
  subject: Subject
  grade: Grade
  topicCount: number
  formulaCount: number
}

export type SearchResultKind = 'formula' | 'topic' | 'shape' | 'subject'

export interface SearchDocument {
  id: string
  kind: SearchResultKind
  title: string
  subtitle: string
  description: string
  /** Route to open. */
  href: string
  gradeId?: GradeId
  gradeNumber?: number
  subjectFamily?: SubjectFamily
  subjectTitle?: string
  /** Terms fed to the matcher, in priority order. */
  keywords: string[]
  /** Buckets for category chips. */
  badges: string[]
}

export interface SearchFilters {
  grade: GradeId | 'all'
  subject: SubjectFamily | 'all'
}
