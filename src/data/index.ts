import type {
  FormulaRef,
  Grade,
  GradeId,
  Subject,
  SubjectFamily,
  SubjectRef,
  TopicRef,
  Formula,
  Shape,
} from '../types/content'
import { grade7 } from './grades/grade7'
import { grade8 } from './grades/grade8'
import { grade9 } from './grades/grade9'
import { grade10 } from './grades/grade10'
import { grade11 } from './grades/grade11'
import { grade12 } from './grades/grade12'
import { shapes } from './shapes'
export { shapes }

export const grades: Grade[] = [grade7, grade8, grade9, grade10, grade11, grade12]

export const gradeById = new Map<GradeId, Grade>(grades.map((grade) => [grade.id, grade]))

export function getGrade(id: string | undefined): Grade | undefined {
  return grades.find((grade) => grade.id === id)
}

export const subjectAliases: Record<string, string> = {
  '12:calculus': 'advanced',
}

export function resolveSubjectId(gradeId: string, subjectId: string): string {
  return subjectAliases[`${gradeId}:${subjectId}`] ?? subjectId
}

export function getSubject(gradeId: string | undefined, subjectId: string | undefined): Subject | undefined {
  if (!gradeId || !subjectId) return undefined
  const resolved = resolveSubjectId(gradeId, subjectId)
  return getGrade(gradeId)?.subjects.find((subject) => subject.id === resolved)
}

export interface TopicLocation {
  grade: Grade
  subject: Subject
  topic: TopicRef['topic']
}

export const topicRefs: TopicRef[] = grades.flatMap((grade) =>
  grade.subjects.flatMap((subject) =>
    subject.topics.map((topic) => ({
      topic,
      grade,
      subject,
      key: `${grade.id}:${subject.id}:${topic.id}`,
    })),
  ),
)

export const topicBySlug = new Map<string, TopicRef>(topicRefs.map((ref) => [ref.topic.id, ref]))

export function findTopic(topicId: string | undefined): TopicRef | undefined {
  if (!topicId) return undefined
  return topicBySlug.get(topicId)
}

export function findTopicInSubject(
  gradeId: string | undefined,
  subjectId: string | undefined,
  topicId: string | undefined,
): TopicRef | undefined {
  const ref = findTopic(topicId)
  if (!ref) return undefined
  const resolved = gradeId && subjectId ? resolveSubjectId(gradeId, subjectId) : subjectId
  if (ref.grade.id !== gradeId || ref.subject.id !== resolved) return undefined
  return ref
}

export const formulaRefs: FormulaRef[] = topicRefs.flatMap((ref) =>
  ref.topic.formulas.map((formula) => ({
    formula,
    topic: ref.topic,
    grade: ref.grade,
    subject: ref.subject,
  })),
)

export const formulaById = new Map<string, FormulaRef>(formulaRefs.map((ref) => [ref.formula.id, ref]))

export function findFormula(formulaId: string | undefined): FormulaRef | undefined {
  if (!formulaId) return undefined
  return formulaById.get(formulaId)
}

export const subjectRefs: SubjectRef[] = grades.flatMap((grade) =>
  grade.subjects.map((subject) => ({
    subject,
    grade,
    topicCount: subject.topics.length,
    formulaCount: subject.topics.reduce((total, topic) => total + topic.formulas.length, 0),
  })),
)

export const subjectByKey = new Map<string, SubjectRef>(
  subjectRefs.map((ref) => [`${ref.grade.id}:${ref.subject.id}`, ref]),
)

export function getSubjectRef(gradeId: string, subjectId: string): SubjectRef | undefined {
  const resolved = resolveSubjectId(gradeId, subjectId)
  return subjectByKey.get(`${gradeId}:${resolved}`)
}

export const shapeById = new Map<string, Shape>(shapes.map((shape) => [shape.id, shape]))

export function findShape(shapeId: string | undefined): Shape | undefined {
  if (!shapeId) return undefined
  return shapeById.get(shapeId)
}

/** Topics that reference a shape in their lesson body. */
export function topicsForShape(shapeId: string): TopicRef[] {
  return topicRefs.filter((ref) => ref.topic.shapeId === shapeId)
}

export function formulasForTopic(topicId: string): Formula[] {
  return findTopic(topicId)?.topic.formulas ?? []
}

export const SIMILAR_FORMULAS_LIMIT = 3

export const libraryStats = {
  gradeCount: grades.length,
  subjectCount: subjectRefs.length,
  topicCount: topicRefs.length,
  formulaCount: formulaRefs.length,
  exampleCount: topicRefs.reduce((total, ref) => total + ref.topic.examples.length, 0),
  exerciseCount: topicRefs.reduce((total, ref) => total + ref.topic.exercises.length, 0),
  shapeCount: shapes.length,
  shape2dCount: shapes.filter((shape) => shape.category === '2d').length,
  shape3dCount: shapes.filter((shape) => shape.category === '3d').length,
} as const

export interface SubjectFamilyMeta {
  id: SubjectFamily
  label: string
  shortLabel: string
  description: string
  mark: string
}

export const SUBJECT_FAMILIES: SubjectFamilyMeta[] = [
  {
    id: 'number',
    label: 'Number Systems',
    shortLabel: 'Number',
    description: 'The grammar of quantity: integers, rational and real numbers, powers and roots.',
    mark: 'ℕ',
  },
  {
    id: 'algebra',
    label: 'Algebra',
    shortLabel: 'Algebra',
    description: 'Structure, equations, functions and the art of the unknown.',
    mark: 'x',
  },
  {
    id: 'geometry',
    label: 'Geometry',
    shortLabel: 'Geometry',
    description: 'Shape, space, measurement and deductive reasoning made visible.',
    mark: '△',
  },
  {
    id: 'trigonometry',
    label: 'Trigonometry',
    shortLabel: 'Trigonometry',
    description: 'Angles, triangles and the periodic patterns that model the world.',
    mark: 'θ',
  },
  {
    id: 'statistics-probability',
    label: 'Statistics & Probability',
    shortLabel: 'Statistics',
    description: 'Making sense of data, variation, chance and uncertainty.',
    mark: 'Σ',
  },
  {
    id: 'coordinate-geometry',
    label: 'Coordinate Geometry',
    shortLabel: 'Coordinates',
    description: 'Where algebra and geometry meet on the plane.',
    mark: '⟨x,y⟩',
  },
  {
    id: 'vectors-matrices',
    label: 'Vectors & Matrices',
    shortLabel: 'Vectors',
    description: 'Direction, transformation and systems expressed in compact arrays.',
    mark: '↗',
  },
  {
    id: 'advanced',
    label: 'Advanced Mathematics',
    shortLabel: 'Advanced',
    description: 'Limits, change and accumulation: the gateway to calculus.',
    mark: '∫',
  },
]

export const subjectFamilyMeta = new Map<SubjectFamily, SubjectFamilyMeta>(
  SUBJECT_FAMILIES.map((family) => [family.id, family]),
)

export function familyLabel(family: SubjectFamily | undefined): string {
  if (!family) return 'Mathematics'
  return subjectFamilyMeta.get(family)?.label ?? 'Mathematics'
}

export function familyShortLabel(family: SubjectFamily | undefined): string {
  if (!family) return 'Math'
  return subjectFamilyMeta.get(family)?.shortLabel ?? 'Math'
}

/* Route builders ------------------------------------------------- */

export function gradeHref(gradeId: GradeId | string): string {
  return `/grades/${gradeId}`
}

export function subjectHref(gradeId: GradeId | string, subjectId: string): string {
  return `/grades/${gradeId}/subjects/${subjectId}`
}

export function topicHref(gradeId: GradeId | string, subjectId: string, topicId: string): string {
  return `/grades/${gradeId}/subjects/${subjectId}/topics/${topicId}`
}

export function topicUrl(ref: TopicRef): string {
  return topicHref(ref.grade.id, ref.subject.id, ref.topic.id)
}

export function formulaHref(formulaId: string): string {
  return `/formulas/${formulaId}`
}

export function shapeHref(shapeId: string): string {
  return `/shapes/${shapeId}`
}

/* Curated discovery ---------------------------------------------- */

export const featuredTopicIds = [
  'pythagorean-theorem',
  'quadratic-equations',
  'right-triangle-trigonometry',
  'differentiation',
  'circles-intro',
  'limits-and-continuity',
  'probability-intro',
  'vectors-in-two-dimensions',
]

export const popularSubjectFamilies: SubjectFamily[] = [
  'algebra',
  'geometry',
  'trigonometry',
  'statistics-probability',
  'coordinate-geometry',
  'advanced',
]

export function featuredFormulas(limit = 4): FormulaRef[] {
  const selected: FormulaRef[] = []
  for (const topicId of featuredTopicIds) {
    const ref = findTopic(topicId)
    if (!ref) continue
    for (const formula of ref.topic.formulas.slice(0, 2)) {
      if (!selected.some((item) => item.formula.id === formula.id)) {
        selected.push({
          formula,
          topic: ref.topic,
          grade: ref.grade,
          subject: ref.subject,
        })
      }
      if (selected.length >= limit) return selected
    }
  }
  return selected
}

/** The first topic of the next subject, used for guided reading. */
export function suggestedStart(grade: Grade): TopicRef | undefined {
  for (const subject of grade.subjects) {
    const topic = subject.topics[0]
    if (topic) return { topic, grade, subject, key: `${grade.id}:${subject.id}:${topic.id}` }
  }
  return undefined
}

export type { FormulaRef, Grade, GradeId, Shape, Subject, SubjectFamily, SubjectRef, TopicRef }
