import { getGrade, grades } from '../data'
import { isNumericAnswerCorrect } from './format'
import type { Exercise, GradeId, Topic } from '../types/content'
import { exerciseContent, kmTopicEntry } from '../i18n/content'
import type { Language } from '../i18n/types'
import type {
  ExamAttempt,
  ExamGradeClassification,
  ExamPaper,
  ExamQuestion,
  ExamScoreSummary,
  ExamSection,
  ExamType,
  GradeLetter,
  QuestionAnswerRecord,
} from '../types/exam'

/**
 * Deterministic pseudo-random number generator (Mulberry32).
 */
export function createRng(seed: number) {
  let s = seed >>> 0
  return function nextFloat(): number {
    s = (s + 0x6d2b79f5) >>> 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * Convert western numerals (0-9) to Khmer numerals (០-៩).
 */
export function toKhmerDigits(value: number | string): string {
  const digits = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩']
  return String(value).replace(/[0-9]/g, (d) => digits[Number(d)] ?? d)
}

/**
 * MoEYS official grade classification scales for Bac II and national examinations.
 */
export const GRADE_CLASSIFICATIONS: Record<GradeLetter, ExamGradeClassification> = {
  A: {
    letter: 'A',
    labelEn: 'Grade A · Outstanding',
    labelKm: 'និទ្ទេស A · ល្អប្រសើរ',
    descriptionEn: 'Exceptional mastery of mathematical concepts and problem solving.',
    descriptionKm: 'ចំណេះដឹងគណិតវិទ្យាល្អឥតខ្ចោះ យល់ដឹងស៊ីជម្រៅគ្រប់ផ្នែក។',
    color: '#10b981',
    minPercentage: 90,
  },
  B: {
    letter: 'B',
    labelEn: 'Grade B · Very Good',
    labelKm: 'និទ្ទេស B · ល្អណាស់',
    descriptionEn: 'Very strong performance with comprehensive accuracy.',
    descriptionKm: 'សមត្ថភាពគណិតវិទ្យាល្អណាស់ អាចដោះស្រាយលំហាត់ស្មុគស្មាញបានល្អ។',
    color: '#06b6d4',
    minPercentage: 80,
  },
  C: {
    letter: 'C',
    labelEn: 'Grade C · Good',
    labelKm: 'និទ្ទេស C · ល្អ',
    descriptionEn: 'Good conceptual grasp and consistent calculation skills.',
    descriptionKm: 'កម្រិតយល់ដឹងល្អ និងមានមូលដ្ឋានគ្រឹះរឹងមាំក្នុងការដោះស្រាយ។',
    color: '#3b82f6',
    minPercentage: 70,
  },
  D: {
    letter: 'D',
    labelEn: 'Grade D · Fair / Above Average',
    labelKm: 'និទ្ទេស D · ល្អបង្គួរ',
    descriptionEn: 'Satisfactory mathematical knowledge with minor gaps.',
    descriptionKm: 'មានចំណេះដឹងសមរម្យ អាចដោះស្រាយលំហាត់មូលដ្ឋានបានច្រើន។',
    color: '#f59e0b',
    minPercentage: 60,
  },
  E: {
    letter: 'E',
    labelEn: 'Grade E · Passing / Average',
    labelKm: 'និទ្ទេស E · មធ្យម',
    descriptionEn: 'Demonstrated minimum acceptable competency for passing.',
    descriptionKm: 'ជាប់កម្រិតមធ្យម ឆ្លងកាត់ការប្រឡងជាស្ថាពរ។',
    color: '#ec4899',
    minPercentage: 50,
  },
  F: {
    letter: 'F',
    labelEn: 'Grade F · Needs Improvement',
    labelKm: 'និទ្ទេស F · ធ្លាក់ (ខ្វះសមត្ថភាព)',
    descriptionEn: 'Score below passing threshold. Review core topics and formulas.',
    descriptionKm: 'ពិន្ទុមិនទាន់គ្រប់កម្រិតជាប់។ គួរបន្តអនុវត្ត និងរំលឹកមេរៀនឡើងវិញ។',
    color: '#ef4444',
    minPercentage: 0,
  },
}

export function classifyExamGrade(percentage: number): ExamGradeClassification {
  const p = Math.max(0, Math.min(100, Math.round(percentage)))
  if (p >= 90) return GRADE_CLASSIFICATIONS.A
  if (p >= 80) return GRADE_CLASSIFICATIONS.B
  if (p >= 70) return GRADE_CLASSIFICATIONS.C
  if (p >= 60) return GRADE_CLASSIFICATIONS.D
  if (p >= 50) return GRADE_CLASSIFICATIONS.E
  return GRADE_CLASSIFICATIONS.F
}

export function getRecommendedExamType(gradeId: GradeId): ExamType {
  if (gradeId === '9') return 'diploma'
  if (gradeId === '12') return 'bacII'
  return 'semester'
}

interface GenerateExamOptions {
  gradeId?: GradeId
  examType?: ExamType
  seed?: number
  language?: Language
}

interface SectionBlueprint {
  id: string
  title: string
  titleKm: string
  description?: string
  descriptionKm?: string
  topicSlugs: string[]
  questionCount: number
  marks: number
}

function getBlueprintsForGrade(gradeId: GradeId, examType: ExamType): SectionBlueprint[] {
  if (gradeId === '9' || examType === 'diploma') {
    return [
      {
        id: 'sec-g9-algebra',
        title: 'Part I: Algebra & Radical Expressions',
        titleKm: 'ផ្នែកទី១៖ ពិជគណិត និងកន្សោមរ៉ាឌីកាល់',
        description: 'Radical simplification, polynomial factoring, quadratic equations and linear systems.',
        descriptionKm: 'សម្រួលរ៉ាឌីកាល់ ការដាក់ជាផលគុណកត្តា សមីការដឺក្រេទី២ និងប្រព័ន្ធសមីការ។',
        topicSlugs: [
          'radical-expressions',
          'polynomial-factorization',
          'quadratic-equations-intro',
          'systems-of-linear-equations',
          'functions-intro',
        ],
        questionCount: 4,
        marks: 40,
      },
      {
        id: 'sec-g9-geometry',
        title: 'Part II: Circle Geometry & Similar Figures',
        titleKm: 'ផ្នែកទី២៖ ធរណីមាត្ររង្វង់ និងរូបរាងដូចគ្នា',
        description: 'Angle properties of circles, chords, tangents, similarity and spatial solids.',
        descriptionKm: 'លក្ខណៈមុំក្នុងរង្វង់ អង្កត់ធ្នូ បន្ទាត់ប៉ះ ភាពដូចគ្នានិងសូលីត។',
        topicSlugs: ['circle-geometry', 'similarity-and-dilations', 'surface-area-and-volume'],
        questionCount: 3,
        marks: 30,
      },
      {
        id: 'sec-g9-coords-stats',
        title: 'Part III: Coordinate Geometry & Statistics',
        titleKm: 'ផ្នែកទី៣៖ ធរណីមាត្រវិភាគ និងស្ថិតិ-ប្រូបាប',
        description: 'Cartesian distance, midpoints, linear slopes, data distribution and probability.',
        descriptionKm: 'ចម្ងាយក្នុងប្លង់កូអរដោណេ ចំណុចកណ្តាល មេគុណប្រាប់ទិស ប្លង់ទិន្នន័យ និងប្រូបាប។',
        topicSlugs: [
          'distance-midpoint-slope',
          'cartesian-plane',
          'measures-of-spread',
          'scatter-plots',
          'probability-compound-and-two-way',
        ],
        questionCount: 3,
        marks: 30,
      },
    ]
  }

  if (gradeId === '12' || examType === 'bacII') {
    return [
      {
        id: 'sec-g12-complex-comb',
        title: 'Part I: Complex Numbers & Combinatorics',
        titleKm: 'ផ្នែកទី១៖ ចំនួនកុំផ្លិច និងការរាប់ (បន្សំ-តម្រៀប)',
        description: 'Algebraic and polar forms, De Moivre theorem, permutations and combinations.',
        descriptionKm: 'ទម្រង់ពិជគណិត និងត្រីកោណមាត្រនៃចំនួនកុំផ្លិច រូបមន្តដឺម័រ បន្សំ និងតម្រៀប។',
        topicSlugs: ['complex-numbers', 'permutations-and-combinations', 'binomial-theorem'],
        questionCount: 2,
        marks: 20,
      },
      {
        id: 'sec-g12-calculus',
        title: 'Part II: Differential & Integral Calculus',
        titleKm: 'ផ្នែកទី២៖ គណិតវិភាគ (លីមីត ដេរីវេ និងអាំងតេក្រាល)',
        description: 'Function limits, derivative rules, tangent lines, primitives and definite integrals.',
        descriptionKm: 'លីមីតនៃអនុគមន៍ ដេរីវេ បន្ទាត់ប៉ះ ព្រីមីទីវ និងអាំងតេក្រាលកំណត់។',
        topicSlugs: ['limits-and-continuity', 'differentiation', 'integration'],
        questionCount: 4,
        marks: 40,
      },
      {
        id: 'sec-g12-space-geom',
        title: 'Part III: Spatial Geometry & 3D Vectors',
        titleKm: 'ផ្នែកទី៣៖ ធរណីមាត្រក្នុងលំហ និងម៉ាទ្រីស',
        description: '3D dot and cross products, planes, lines in space, and system determinants.',
        descriptionKm: 'ផលគុណស្កាលែ និងផលគុណវ៉ិចទ័រ ប្លង់ និងបន្ទាត់ក្នុងលំហ ដេទែមីណង់ និងម៉ាទ្រីស។',
        topicSlugs: ['vectors-in-three-dimensions', 'matrices-and-linear-systems', 'conic-sections'],
        questionCount: 2,
        marks: 25,
      },
      {
        id: 'sec-g12-probability',
        title: 'Part IV: Probability & Random Variables',
        titleKm: 'ផ្នែកទី៤៖ ប្រូបាប និងអថេរចៃដន្យ',
        description: 'Discrete probability distributions, expected value, variance and normal distribution.',
        descriptionKm: 'បំណែងចែកប្រូបាប សង្ឃឹមគណិត វ៉ារ្យ៉ង់ និងបំណែងចែកប្រក្រតី។',
        topicSlugs: ['random-variables-and-distributions', 'normal-distribution'],
        questionCount: 1,
        marks: 15,
      },
    ]
  }

  // Semester exam fallback for Grades 7, 8, 10, 11
  const grade = getGrade(gradeId) ?? grades[0]
  const subjectList = grade.subjects
  const perSectionMarks = [35, 35, 30]

  return subjectList.slice(0, 3).map((subj, idx) => ({
    id: `sec-g${gradeId}-${subj.id}`,
    title: `Part ${idx + 1}: ${subj.title}`,
    titleKm: `ផ្នែកទី${toKhmerDigits(idx + 1)}៖ ${subj.title}`,
    description: subj.description,
    descriptionKm: subj.description,
    topicSlugs: subj.topics.map((t) => t.id),
    questionCount: idx === 2 ? 2 : 3,
    marks: perSectionMarks[idx] ?? 30,
  }))
}

/**
 * Generate an authentic, randomized exam paper from textbook curriculum.
 */
export function generateExamPaper(options: GenerateExamOptions = {}): ExamPaper {
  const gradeId = options.gradeId ?? '9'
  const examType = options.examType ?? getRecommendedExamType(gradeId)
  const seed = options.seed ?? Math.floor(Math.random() * 900000 + 100000)
  const rng = createRng(seed)

  const grade = getGrade(gradeId) ?? grades.find((g) => g.id === '9')!
  const blueprints = getBlueprintsForGrade(grade.id, examType)

  // Map of all topics in this grade
  const topicMap = new Map<string, { topic: Topic; subjectId: string; subjectTitle: string }>()
  for (const subject of grade.subjects) {
    for (const topic of subject.topics) {
      topicMap.set(topic.id, { topic, subjectId: subject.id, subjectTitle: subject.title })
    }
  }

  let runningQuestionNumber = 1
  const sections: ExamSection[] = []
  const allQuestions: ExamQuestion[] = []

  for (const bp of blueprints) {
    // Gather candidate exercises from specified topics
    const candidates: Array<{ exercise: Exercise; topic: Topic; subjectId: string; subjectTitle: string }> = []

    for (const slug of bp.topicSlugs) {
      const entry = topicMap.get(slug)
      if (entry && entry.topic.exercises.length > 0) {
        for (const ex of entry.topic.exercises) {
          candidates.push({
            exercise: ex,
            topic: entry.topic,
            subjectId: entry.subjectId,
            subjectTitle: entry.subjectTitle,
          })
        }
      }
    }

    // Fallback: if candidates are sparse, pull from any topic in this grade
    if (candidates.length < bp.questionCount) {
      for (const [, entry] of topicMap) {
        for (const ex of entry.topic.exercises) {
          candidates.push({
            exercise: ex,
            topic: entry.topic,
            subjectId: entry.subjectId,
            subjectTitle: entry.subjectTitle,
          })
        }
      }
    }

    // Shuffle candidates with seeded RNG
    const shuffled = [...candidates]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1))
      const temp = shuffled[i]
      shuffled[i] = shuffled[j]
      shuffled[j] = temp
    }

    // Pick unique questions by exercise id
    const chosenItems: typeof candidates = []
    const usedIds = new Set<string>()

    for (const item of shuffled) {
      if (chosenItems.length >= bp.questionCount) break
      if (!usedIds.has(item.exercise.id)) {
        usedIds.add(item.exercise.id)
        chosenItems.push(item)
      }
    }

    // If still short, duplicate avoiding infinite loop
    let fillIdx = 0
    while (chosenItems.length < bp.questionCount && candidates.length > 0) {
      chosenItems.push(candidates[fillIdx % candidates.length])
      fillIdx++
    }

    // Calculate marks per question inside section to sum up to bp.marks
    const baseMark = Math.floor(bp.marks / chosenItems.length)
    const remainder = bp.marks % chosenItems.length

    const sectionQuestions: ExamQuestion[] = chosenItems.map((item, idx) => {
      const mark = baseMark + (idx < remainder ? 1 : 0)
      const meta = {
        questionNumber: runningQuestionNumber++,
        sectionId: bp.id,
        sectionTitle: bp.title,
        sectionTitleKm: bp.titleKm,
        topicId: item.topic.id,
        topicTitle: item.topic.title,
        subjectId: item.subjectId,
        subjectTitle: item.subjectTitle,
        marks: mark,
      }
      const localizedExercise =
        options.language === 'km'
          ? exerciseContent(item.exercise, kmTopicEntry(item.topic.id)?.exercises?.[item.exercise.id])
          : item.exercise

      return {
        ...localizedExercise,
        ...meta,
      } as ExamQuestion
    })

    const section: ExamSection = {
      id: bp.id,
      title: bp.title,
      titleKm: bp.titleKm,
      description: bp.description,
      descriptionKm: bp.descriptionKm,
      marks: bp.marks,
      questions: sectionQuestions,
    }

    sections.push(section)
    allQuestions.push(...sectionQuestions)
  }

  // Compute paper metadata
  let title = `Grade ${grade.number} Mathematics Semester Examination`
  let titleKm = `ការប្រឡងឆមាសគណិតវិទ្យា ថ្នាក់ទី${toKhmerDigits(grade.number)}`
  let subtitle = `Comprehensive Evaluation Paper · Academic Year 2025–2026`
  let subtitleKm = `វិញ្ញាសាប្រឡងវាស់ស្ទង់សមត្ថភាពសិស្ស · ឆ្នាំសិក្សា ២០២៥-២០២៦`
  let durationMinutes = 90

  if (examType === 'diploma' || grade.id === '9') {
    title = 'Grade 9 Mathematics Diploma Examination (ឌីប្លូម)'
    titleKm = 'ការប្រឡងសញ្ញាបត្រមធ្យមសិក្សាបឋមភូមិ (ឌីប្លូម) គណិតវិទ្យា'
    subtitle = 'National Examination Paper · Academic Year 2025–2026'
    subtitleKm = 'វិញ្ញាសាប្រឡងថ្នាក់ជាតិ · ក្រសួងអប់រំ យុវជន និងកីឡា'
    durationMinutes = 90
  } else if (examType === 'bacII' || grade.id === '12') {
    title = 'Grade 12 Baccalaureate Examination (បាក់ឌុប) - Mathematics'
    titleKm = 'ការប្រឡងសញ្ញាបត្រមធ្យមសិក្សាទុតិយភូមិ (បាក់ឌុប) គណិតវិទ្យា'
    subtitle = 'National Examination Paper (Scientific Stream) · Academic Year 2025–2026'
    subtitleKm = 'វិញ្ញាសាប្រឡងថ្នាក់ជាតិ (ថ្នាក់វិទ្យាសាស្ត្រ) · ក្រសួងអប់រំ យុវជន និងកីឡា'
    durationMinutes = 150
  }

  const instructions = [
    'Write down all steps, formulas, and reasoning clearly.',
    'Calculators may be used only according to standard exam regulations.',
    'Check final units, decimal precision, and algebraic signs before submitting.',
    'All answers and calculations must be recorded directly on this examination sheet.',
  ]

  const instructionsKm = [
    'បេក្ខជនត្រូវសរសេរចម្លើយ ដំណោះស្រាយ និងបង្ហាញជំហានគណនាឱ្យបានច្បាស់លាស់។',
    'គណៈមេប្រយោគមិនអនុញ្ញាតឱ្យប្រើប្រាស់ឯកសារជំនួយ ឬឧបករណ៍ទំនាក់ទំនងឡើយ។',
    'ពិនិត្យមើលលទ្ធផល ខ្នាតរង្វាស់ និងសញ្ញាគណិតវិទ្យាឱ្យបានត្រឹមត្រូវមុនពេលប្រគល់។',
    'រាល់ចម្លើយទាំងអស់ត្រូវសរសេរនៅលើក្រដាសកិច្ចការប្រឡងនេះ។',
  ]

  const totalMarks = sections.reduce((sum, s) => sum + s.marks, 0)

  return {
    id: `exam-${grade.id}-${examType}-${seed}`,
    title,
    titleKm,
    subtitle,
    subtitleKm,
    gradeId: grade.id,
    gradeNumber: grade.number,
    examType,
    academicYear: '2025–2026',
    durationMinutes,
    totalMarks,
    instructions,
    instructionsKm,
    sections,
    allQuestions,
    seed,
    createdAt: new Date().toISOString(),
  }
}

/**
 * Evaluate an exam attempt against an exam paper.
 */
export function calculateExamScore(
  paper: ExamPaper,
  userAnswers: Record<string, { choice?: number; text?: string }>,
  timeSpentSeconds: number = 0,
): ExamScoreSummary {
  let answeredCount = 0
  let correctCount = 0
  let earnedMarks = 0

  const topicTotals = new Map<string, { topicTitle: string; earned: number; total: number }>()

  for (const q of paper.allQuestions) {
    if (!topicTotals.has(q.topicId)) {
      topicTotals.set(q.topicId, { topicTitle: q.topicTitle, earned: 0, total: 0 })
    }
    const topicStat = topicTotals.get(q.topicId)!
    topicStat.total += q.marks

    const ans = userAnswers[q.id]
    let isCorrect = false

    if (ans) {
      if (q.type === 'multiple-choice') {
        if (ans.choice !== undefined) {
          answeredCount++
          if (ans.choice === q.correctOption) {
            isCorrect = true
          }
        }
      } else {
        if (ans.text && ans.text.trim().length > 0) {
          answeredCount++
          if (isNumericAnswerCorrect(ans.text, q.answer, q.tolerance)) {
            isCorrect = true
          }
        }
      }
    }

    if (isCorrect) {
      correctCount++
      earnedMarks += q.marks
      topicStat.earned += q.marks
    }
  }

  const totalMarks = paper.totalMarks
  const percentage = totalMarks > 0 ? Math.round((earnedMarks / totalMarks) * 100) : 0
  const classification = classifyExamGrade(percentage)

  const topicPerformance = Array.from(topicTotals.entries()).map(([topicId, stat]) => ({
    topicId,
    topicTitle: stat.topicTitle,
    earnedMarks: stat.earned,
    totalMarks: stat.total,
    percentage: stat.total > 0 ? Math.round((stat.earned / stat.total) * 100) : 0,
  }))

  return {
    totalQuestions: paper.allQuestions.length,
    answeredCount,
    correctCount,
    incorrectCount: answeredCount - correctCount,
    skippedCount: paper.allQuestions.length - answeredCount,
    earnedMarks,
    totalMarks,
    percentage,
    timeSpentSeconds,
    classification,
    topicPerformance,
  }
}

export function buildAnswerRecord(
  q: ExamQuestion,
  ans?: { choice?: number; text?: string },
): QuestionAnswerRecord {
  let isCorrect = false
  let userResponse = ''

  if (ans) {
    if (q.type === 'multiple-choice') {
      if (ans.choice !== undefined) {
        userResponse = q.options[ans.choice] ?? `Choice ${ans.choice}`
        isCorrect = ans.choice === q.correctOption
      }
    } else {
      if (ans.text) {
        userResponse = ans.text.trim()
        isCorrect = isNumericAnswerCorrect(userResponse, q.answer, q.tolerance)
      }
    }
  }

  return {
    questionId: q.id,
    questionNumber: q.questionNumber,
    choice: ans?.choice,
    text: ans?.text,
    correct: isCorrect,
    earnedMarks: isCorrect ? q.marks : 0,
    maxMarks: q.marks,
    userResponse,
  }
}

const EXAM_STORAGE_KEY = 'hsm.exam.history.v1'

export function saveExamAttempt(attempt: ExamAttempt): void {
  try {
    const raw = localStorage.getItem(EXAM_STORAGE_KEY)
    const list: ExamAttempt[] = raw ? JSON.parse(raw) : []
    const updated = [attempt, ...list.filter((a) => a.id !== attempt.id)].slice(0, 30)
    localStorage.setItem(EXAM_STORAGE_KEY, JSON.stringify(updated))
  } catch {
    // localStorage unavailable
  }
}

export function loadExamAttempts(gradeId?: GradeId): ExamAttempt[] {
  try {
    const raw = localStorage.getItem(EXAM_STORAGE_KEY)
    if (!raw) return []
    const list: ExamAttempt[] = JSON.parse(raw)
    if (!gradeId) return list
    return list.filter((a) => a.gradeId === gradeId)
  } catch {
    return []
  }
}

export function clearExamAttempts(): void {
  try {
    localStorage.removeItem(EXAM_STORAGE_KEY)
  } catch {
    // ignore
  }
}

export function formatTimeDisplay(totalSeconds: number): string {
  const mins = Math.floor(Math.max(0, totalSeconds) / 60)
  const secs = Math.max(0, totalSeconds) % 60
  const m = String(mins).padStart(2, '0')
  const s = String(secs).padStart(2, '0')
  return `${m}:${s}`
}
