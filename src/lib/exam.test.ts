import { describe, expect, it } from 'vitest'
import {
  calculateExamScore,
  classifyExamGrade,
  generateExamPaper,
  toKhmerDigits,
} from './exam'

describe('exam library', () => {
  it('converts digits to Khmer numerals accurately', () => {
    expect(toKhmerDigits(9)).toBe('៩')
    expect(toKhmerDigits(12)).toBe('១២')
    expect(toKhmerDigits(100)).toBe('១០០')
    expect(toKhmerDigits('Year 2026')).toBe('Year ២០២៦')
  })

  it('generates authentic Grade 9 Diploma examination paper', () => {
    const paper = generateExamPaper({ gradeId: '9', examType: 'diploma', seed: 12345 })

    expect(paper.gradeId).toBe('9')
    expect(paper.examType).toBe('diploma')
    expect(paper.durationMinutes).toBe(90)
    expect(paper.totalMarks).toBe(100)
    expect(paper.sections.length).toBe(3)
    expect(paper.allQuestions.length).toBe(10)

    // Sum of question marks must equal exactly 100
    const sumMarks = paper.allQuestions.reduce((sum, q) => sum + q.marks, 0)
    expect(sumMarks).toBe(100)

    // Check title in English & Khmer
    expect(paper.title).toContain('Grade 9')
    expect(paper.titleKm).toContain('ឌីប្លូម')
  })

  it('generates authentic Grade 12 Bac II examination paper', () => {
    const paper = generateExamPaper({ gradeId: '12', examType: 'bacII', seed: 67890 })

    expect(paper.gradeId).toBe('12')
    expect(paper.examType).toBe('bacII')
    expect(paper.durationMinutes).toBe(150)
    expect(paper.totalMarks).toBe(100)
    expect(paper.sections.length).toBe(4)
    expect(paper.allQuestions.length).toBe(9)

    const sumMarks = paper.allQuestions.reduce((sum, q) => sum + q.marks, 0)
    expect(sumMarks).toBe(100)

    expect(paper.title).toContain('Grade 12')
    expect(paper.titleKm).toContain('បាក់ឌុប')
  })

  it('generates deterministic papers with same seed and different with another', () => {
    const paper1 = generateExamPaper({ gradeId: '9', seed: 42 })
    const paper2 = generateExamPaper({ gradeId: '9', seed: 42 })
    const paper3 = generateExamPaper({ gradeId: '9', seed: 999999 })

    expect(paper1.allQuestions.map((q) => q.id)).toEqual(paper2.allQuestions.map((q) => q.id))
    expect(paper1.allQuestions.map((q) => q.id)).not.toEqual(paper3.allQuestions.map((q) => q.id))
  })

  it('evaluates scoring and classifications correctly according to MoEYS standards', () => {
    const paper = generateExamPaper({ gradeId: '9', seed: 42 })
    const userAnswers: Record<string, { choice?: number; text?: string }> = {}

    // Answer first 5 questions correctly
    for (let i = 0; i < 5; i++) {
      const q = paper.allQuestions[i]
      if (q.type === 'multiple-choice') {
        userAnswers[q.id] = { choice: q.correctOption }
      } else {
        userAnswers[q.id] = { text: String(q.answer) }
      }
    }

    const summary = calculateExamScore(paper, userAnswers, 1200)
    expect(summary.answeredCount).toBe(5)
    expect(summary.correctCount).toBe(5)
    expect(summary.earnedMarks).toBe(50)
    expect(summary.percentage).toBe(50)
    expect(summary.classification.letter).toBe('E')

    expect(classifyExamGrade(95).letter).toBe('A')
    expect(classifyExamGrade(85).letter).toBe('B')
    expect(classifyExamGrade(75).letter).toBe('C')
    expect(classifyExamGrade(65).letter).toBe('D')
    expect(classifyExamGrade(55).letter).toBe('E')
    expect(classifyExamGrade(45).letter).toBe('F')
  })
})
