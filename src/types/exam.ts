import type { GradeId, MultipleChoiceExercise, NumericExercise } from './content'

export type ExamType = 'diploma' | 'bacII' | 'semester'

export interface ExamQuestionMeta {
  /** Sequential question number in the exam (1, 2, 3...) */
  questionNumber: number
  /** Parent section identifier */
  sectionId: string
  /** Section title in English and Khmer */
  sectionTitle: string
  sectionTitleKm: string
  /** Topic ID the exercise originated from */
  topicId: string
  /** Topic human-readable title */
  topicTitle: string
  topicTitleKm?: string
  /** Subject ID */
  subjectId: string
  subjectTitle: string
  subjectTitleKm?: string
  /** Allocated marks for this question */
  marks: number
}

export type ExamQuestion =
  | (MultipleChoiceExercise & ExamQuestionMeta)
  | (NumericExercise & ExamQuestionMeta)

export interface ExamSection {
  id: string
  title: string
  titleKm: string
  description?: string
  descriptionKm?: string
  marks: number
  questions: ExamQuestion[]
}

export interface ExamPaper {
  id: string
  title: string
  titleKm: string
  subtitle: string
  subtitleKm: string
  gradeId: GradeId
  gradeNumber: number
  examType: ExamType
  academicYear: string
  durationMinutes: number
  totalMarks: number
  instructions: string[]
  instructionsKm: string[]
  sections: ExamSection[]
  allQuestions: ExamQuestion[]
  seed: number
  createdAt: string
}

export interface QuestionAnswerRecord {
  questionId: string
  questionNumber: number
  choice?: number
  text?: string
  correct: boolean
  earnedMarks: number
  maxMarks: number
  userResponse: string
}

export type GradeLetter = 'A' | 'B' | 'C' | 'D' | 'E' | 'F'

export interface ExamGradeClassification {
  letter: GradeLetter
  labelEn: string
  labelKm: string
  descriptionEn: string
  descriptionKm: string
  color: string
  minPercentage: number
}

export interface ExamScoreSummary {
  totalQuestions: number
  answeredCount: number
  correctCount: number
  incorrectCount: number
  skippedCount: number
  earnedMarks: number
  totalMarks: number
  percentage: number
  timeSpentSeconds: number
  classification: ExamGradeClassification
  topicPerformance: Array<{
    topicId: string
    topicTitle: string
    earnedMarks: number
    totalMarks: number
    percentage: number
  }>
}

export interface ExamAttempt {
  id: string
  paperId: string
  gradeId: GradeId
  examType: ExamType
  seed: number
  startedAt: number
  completedAt?: number
  timeSpentSeconds: number
  answers: Record<string, QuestionAnswerRecord>
  summary?: ExamScoreSummary
  isSubmitted: boolean
}
