import { useEffect, useMemo, useRef, useState } from 'react'
import { GRADE_IDS, type GradeId } from '../types/content'
import type { ExamPaper, ExamQuestion, ExamScoreSummary } from '../types/exam'
import {
  calculateExamScore,
  formatTimeDisplay,
  generateExamPaper,
  getRecommendedExamType,
  saveExamAttempt,
  toKhmerDigits,
} from '../lib/exam'
import { useI18n } from '../lib/i18n'
import { MathBlock, RichText } from '../components/ui/Math'
import {
  IconArrowLeft,
  IconArrowRight,
  IconRotate,
} from '../components/ui/Icons'
import '../styles/exam.css'

export default function ExamPage() {
  const { isKhmer } = useI18n()

  // Selected Grade and exam generation state
  const [gradeId, setGradeId] = useState<GradeId>('9')
  const [seed, setSeed] = useState<number>(() => Math.floor(Math.random() * 900000 + 100000))
  const [mode, setMode] = useState<'interactive' | 'document'>('interactive')

  // Generate current exam paper
  const paper: ExamPaper = useMemo(() => {
    return generateExamPaper({
      gradeId,
      examType: getRecommendedExamType(gradeId),
      seed,
      language: isKhmer ? 'km' : 'en',
    })
  }, [gradeId, seed, isKhmer])

  // Interactive testing state
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, { choice?: number; text?: string }>>({})
  const [flagged, setFlagged] = useState<Set<string>>(new Set())
  const [hasStarted, setHasStarted] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showSubmitModal, setShowSubmitModal] = useState(false)

  // Document mode options
  const [includeSolutionsKey, setIncludeSolutionsKey] = useState(false)

  // Timer state
  const totalSeconds = paper.durationMinutes * 60
  const [secondsRemaining, setSecondsRemaining] = useState(totalSeconds)
  const [isTimerPaused] = useState(false)
  const timerRef = useRef<number | null>(null)

  // Reset exam on grade switch or new paper generation
  const regeneratePaper = () => {
    const nextSeed = Math.floor(Math.random() * 900000 + 100000)
    setSeed(nextSeed)
    setAnswers({})
    setFlagged(new Set())
    setHasStarted(false)
    setIsSubmitted(false)
    setCurrentIndex(0)
    setSecondsRemaining(paper.durationMinutes * 60)
  }

  const handleSelectGrade = (nextGrade: GradeId) => {
    setGradeId(nextGrade)
    const nextSeed = Math.floor(Math.random() * 900000 + 100000)
    setSeed(nextSeed)
    setAnswers({})
    setFlagged(new Set())
    setHasStarted(false)
    setIsSubmitted(false)
    setCurrentIndex(0)
  }

  // Timer interval
  useEffect(() => {
    if (!hasStarted || isSubmitted || isTimerPaused || mode !== 'interactive') {
      if (timerRef.current) clearInterval(timerRef.current)
      return
    }

    timerRef.current = window.setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current)
          handleSubmitExam()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [hasStarted, isSubmitted, isTimerPaused, mode])

  // Active question
  const currentQuestion: ExamQuestion | undefined = paper.allQuestions[currentIndex]
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : undefined
  const answeredCount = Object.keys(answers).length
  const totalQuestions = paper.allQuestions.length

  // Record an answer
  const handleSelectChoice = (questionId: string, choiceIndex: number) => {
    if (isSubmitted) return
    setAnswers((prev) => ({
      ...prev,
      [questionId]: { choice: choiceIndex },
    }))
  }

  const handleNumericTextChange = (questionId: string, text: string) => {
    if (isSubmitted) return
    setAnswers((prev) => ({
      ...prev,
      [questionId]: { text },
    }))
  }

  const toggleFlagQuestion = (questionId: string) => {
    setFlagged((prev) => {
      const next = new Set(prev)
      if (next.has(questionId)) next.delete(questionId)
      else next.add(questionId)
      return next
    })
  }

  // Submission
  const handleSubmitExam = () => {
    setShowSubmitModal(false)
    setIsSubmitted(true)
    const timeSpent = totalSeconds - secondsRemaining
    const summary = calculateExamScore(paper, answers, timeSpent)

    // Save attempt to localStorage
    saveExamAttempt({
      id: `attempt-${paper.id}-${Date.now()}`,
      paperId: paper.id,
      gradeId: paper.gradeId,
      examType: paper.examType,
      seed: paper.seed,
      startedAt: Date.now() - timeSpent * 1000,
      completedAt: Date.now(),
      timeSpentSeconds: timeSpent,
      answers: {},
      summary,
      isSubmitted: true,
    })
  }

  const scoreSummary: ExamScoreSummary = useMemo(() => {
    const timeSpent = totalSeconds - secondsRemaining
    return calculateExamScore(paper, answers, timeSpent)
  }, [paper, answers, totalSeconds, secondsRemaining])

  const printDocument = () => {
    window.print()
  }

  // Localized grade & exam badge label
  const getGradeBadge = (gid: GradeId) => {
    if (gid === '9') {
      return (
        <span className="exam-badge exam-badge--diploma">
          <span>{isKhmer ? 'ឌីប្លូម' : 'Diploma'}</span>
        </span>
      )
    }
    if (gid === '12') {
      return (
        <span className="exam-badge exam-badge--bacii">
          <span>{isKhmer ? 'បាក់ឌុប' : 'Bac II'}</span>
        </span>
      )
    }
    return (
      <span className="exam-badge exam-badge--semester">
        <span>{isKhmer ? 'ឆមាស' : 'Semester'}</span>
      </span>
    )
  }

  return (
    <div className="exam-page">
      {/* Hero & Header Section */}
      <section className="exam-hero">
        <div className="container exam-hero__inner">
          <div className="exam-hero__badge-row">
            <span className="exam-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
              <span>{isKhmer ? 'មន្ទីរពិសោធន៍ប្រឡងថ្នាក់ជាតិ' : 'National Examination Testing Lab'}</span>
            </span>
            {getGradeBadge(gradeId)}
          </div>

          <h1 className="exam-hero__title">
            {isKhmer ? paper.titleKm : paper.title}
          </h1>

          <p className="exam-hero__desc">
            {isKhmer
              ? 'បង្កើតវិញ្ញាសាប្រឡងគណិតវិទ្យាស្វ័យប្រវត្តិតាមកម្រិតថ្នាក់ (ឌីប្លូម ថ្នាក់ទី៩, បាក់ឌុប ថ្នាក់ទី១២ និងប្រឡងឆមាស) ជាមួយមុខងារសាកល្បងធ្វើតេស្តផ្ទាល់ ឬបោះពុម្ពជាក្រដាសប្រឡងផ្លូវការ។'
              : 'Auto-generate authentic Cambodian mathematics examination papers for Grades 7–12, featuring Grade 9 Diploma (ឌីប្លូម) and Grade 12 Bac II (បាក់ឌុប), with timed interactive testing and official MoEYS printable documents.'}
          </p>

          {/* Grade Selector Pills */}
          <div className="exam-selector" role="tablist" aria-label="Select Grade for Examination">
            {GRADE_IDS.map((gid) => {
              const active = gid === gradeId
              const numStr = isKhmer ? toKhmerDigits(gid) : gid
              return (
                <button
                  key={gid}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  className={`exam-selector__pill${active ? ' is-active' : ''}`}
                  onClick={() => handleSelectGrade(gid)}
                >
                  <span>{isKhmer ? `ថ្នាក់ទី${numStr}` : `Grade ${numStr}`}</span>
                  {gid === '9' && <span className="exam-selector__pill-tag">{isKhmer ? 'ឌីប្លូម' : 'Diploma'}</span>}
                  {gid === '12' && <span className="exam-selector__pill-tag">{isKhmer ? 'បាក់ឌុប' : 'Bac II'}</span>}
                </button>
              )
            })}
          </div>

          {/* Control Bar: Mode Switcher & Actions */}
          <div className="exam-control-bar">
            <div className="exam-mode-switch" role="group" aria-label="Exam View Mode">
              <button
                type="button"
                className={`exam-mode-switch__btn${mode === 'interactive' ? ' is-active' : ''}`}
                onClick={() => setMode('interactive')}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>{isKhmer ? 'សាកល្បងធ្វើតេស្ត (Interactive)' : 'Interactive Test'}</span>
              </button>
              <button
                type="button"
                className={`exam-mode-switch__btn${mode === 'document' ? ' is-active' : ''}`}
                onClick={() => setMode('document')}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
                <span>{isKhmer ? 'ទម្រង់ក្រដាសប្រឡង (Printable)' : 'Printable Document'}</span>
              </button>
            </div>

            <div className="exam-actions-group">
              <button
                type="button"
                className="btn--exam-secondary"
                onClick={regeneratePaper}
                title={isKhmer ? 'បង្កើតវិញ្ញាសាថ្មី' : 'Generate New Exam Paper'}
              >
                <IconRotate size={16} />
                <span>{isKhmer ? 'បង្កើតវិញ្ញាសាថ្មី' : 'Generate New Paper'}</span>
              </button>

              {mode === 'document' && (
                <button
                  type="button"
                  className="btn--exam-primary"
                  onClick={printDocument}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 6 2 18 2 18 9" />
                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                    <rect x="6" y="14" width="12" height="8" />
                  </svg>
                  <span>{isKhmer ? 'បោះពុម្ព / រក្សាជា PDF' : 'Print / Save PDF'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="container">
        {mode === 'interactive' ? (
          /* ==========================================================
             MODE A: INTERACTIVE TESTING LABORATORY
             ========================================================== */
          <div className="exam-interactive-container">
            {isSubmitted ? (
              /* RESULTS DASHBOARD */
              <div className="exam-results-dashboard" aria-live="polite">
                <div
                  className="exam-score-banner"
                  style={{
                    background: `linear-gradient(135deg, ${scoreSummary.classification.color} 0%, #102A56 100%)`,
                  }}
                >
                  <div className="exam-score-banner__left">
                    <span className="exam-badge" style={{ background: 'rgba(255,255,255,0.2)' }}>
                      {isKhmer ? 'លទ្ធផលផ្លូវការ' : 'Official Evaluation Result'}
                    </span>
                    <h2 style={{ fontSize: '2.2rem', margin: '0.4rem 0 0.2rem', color: '#fff' }}>
                      {scoreSummary.earnedMarks} / {scoreSummary.totalMarks}{' '}
                      <span style={{ fontSize: '1.2rem', opacity: 0.9 }}>
                        ({scoreSummary.percentage}%)
                      </span>
                    </h2>
                    <p style={{ margin: 0, opacity: 0.9, fontSize: '1.05rem' }}>
                      {isKhmer
                        ? scoreSummary.classification.descriptionKm
                        : scoreSummary.classification.descriptionEn}
                    </p>
                  </div>

                  <div className="exam-grade-badge-huge">
                    <span className="exam-grade-letter">{scoreSummary.classification.letter}</span>
                    <span className="exam-grade-text">
                      {isKhmer ? scoreSummary.classification.labelKm : scoreSummary.classification.labelEn}
                    </span>
                  </div>
                </div>

                {/* Score Stats Grid */}
                <div className="exam-stats-grid">
                  <div className="exam-stat-card">
                    <div className="exam-stat-value">
                      {scoreSummary.correctCount} / {scoreSummary.totalQuestions}
                    </div>
                    <div className="exam-stat-label">{isKhmer ? 'សំណួរត្រឹមត្រូវ' : 'Correct Answers'}</div>
                  </div>
                  <div className="exam-stat-card">
                    <div className="exam-stat-value">
                      {scoreSummary.incorrectCount}
                    </div>
                    <div className="exam-stat-label">{isKhmer ? 'សំណួរខុស' : 'Incorrect Answers'}</div>
                  </div>
                  <div className="exam-stat-card">
                    <div className="exam-stat-value">
                      {formatTimeDisplay(scoreSummary.timeSpentSeconds)}
                    </div>
                    <div className="exam-stat-label">{isKhmer ? 'រយៈពេលចំណាយ' : 'Time Spent'}</div>
                  </div>
                  <div className="exam-stat-card">
                    <div className="exam-stat-value">
                      {scoreSummary.percentage}%
                    </div>
                    <div className="exam-stat-label">{isKhmer ? 'ភាគរយសរុប' : 'Total Score'}</div>
                  </div>
                </div>

                {/* Performance by Topic */}
                <div style={{ marginBottom: 'var(--space-7)' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: 'var(--space-3)' }}>
                    {isKhmer ? 'ការវាយតម្លៃតាមប្រធានបទ' : 'Performance by Topic'}
                  </h3>
                  <div style={{ display: 'grid', gap: 'var(--space-3)' }}>
                    {scoreSummary.topicPerformance.map((tp) => (
                      <div
                        key={tp.topicId}
                        style={{
                          background: 'var(--surface-sunken)',
                          padding: 'var(--space-3) var(--space-4)',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--line)',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                          <span style={{ fontWeight: 600 }}>{tp.topicTitle}</span>
                          <span style={{ fontWeight: 700, color: 'var(--accent)' }}>
                            {tp.earnedMarks} / {tp.totalMarks} ({tp.percentage}%)
                          </span>
                        </div>
                        <div
                          style={{
                            height: '6px',
                            background: 'var(--line)',
                            borderRadius: '3px',
                            overflow: 'hidden',
                          }}
                        >
                          <div
                            style={{
                              width: `${tp.percentage}%`,
                              height: '100%',
                              background: tp.percentage >= 70 ? '#10b981' : tp.percentage >= 50 ? '#f59e0b' : '#ef4444',
                              borderRadius: '3px',
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step-by-Step Question Review */}
                <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: 'var(--space-4)' }}>
                  {isKhmer ? 'ដំណោះស្រាយ និងកម្រងចម្លើយលម្អិត' : 'Detailed Question Review & Solutions'}
                </h3>
                <div className="exam-review-list">
                  {paper.allQuestions.map((q, idx) => {
                    const ans = answers[q.id]
                    let isCorrect = false
                    let answerLabel = ''

                    if (ans) {
                      if (q.type === 'multiple-choice') {
                        isCorrect = ans.choice === q.correctOption
                        answerLabel = ans.choice !== undefined ? String.fromCharCode(65 + ans.choice) : '—'
                      } else {
                        isCorrect = ans.text ? Number(ans.text.trim()) === q.answer : false
                        answerLabel = ans.text ?? '—'
                      }
                    }

                    return (
                      <div
                        key={q.id}
                        className={`exam-review-item ${isCorrect ? 'is-correct' : 'is-wrong'}`}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                          <span style={{ fontWeight: 700 }}>
                            {isKhmer ? `សំណួរទី ${toKhmerDigits(idx + 1)}` : `Question ${idx + 1}`} · {q.marks} {isKhmer ? 'ពិន្ទុ' : 'Marks'}
                          </span>
                          <span
                            className="badge"
                            style={{
                              background: isCorrect ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                              color: isCorrect ? '#059669' : '#dc2626',
                              fontWeight: 700,
                            }}
                          >
                            {isCorrect ? (isKhmer ? 'ត្រឹមត្រូវ' : 'Correct') : (isKhmer ? 'មិនត្រឹមត្រូវ' : 'Incorrect')}
                          </span>
                        </div>

                        <p style={{ margin: '0 0 0.5rem', fontSize: '1.05rem', lineHeight: 1.5 }}>
                          <RichText text={q.prompt} />
                        </p>

                        {q.promptMath && (
                          <div style={{ margin: '0.5rem 0' }}>
                            <MathBlock tex={q.promptMath} />
                          </div>
                        )}

                        <div style={{ fontSize: '0.92rem', color: 'var(--muted)', margin: '0.4rem 0' }}>
                          <span>{isKhmer ? 'ចម្លើយរបស់អ្នក៖ ' : 'Your answer: '}</span>
                          <strong style={{ color: isCorrect ? '#059669' : '#dc2626' }}>{answerLabel}</strong>
                          <span style={{ margin: '0 0.75rem' }}>·</span>
                          <span>{isKhmer ? 'ចម្លើយត្រឹមត្រូវ៖ ' : 'Correct answer: '}</span>
                          <strong style={{ color: '#059669' }}>
                            {q.type === 'multiple-choice'
                              ? `${String.fromCharCode(65 + q.correctOption)}. ${q.options[q.correctOption]}`
                              : `${q.answer} ${q.answerUnit ?? ''}`}
                          </strong>
                        </div>

                        <div className="exam-explanation-box">
                          <strong style={{ display: 'block', marginBottom: '0.3rem', color: 'var(--ink)' }}>
                            {isKhmer ? 'ដំណោះស្រាយលម្អិត៖' : 'Step-by-step Solution:'}
                          </strong>
                          <RichText text={q.explanation} />
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Bottom Actions */}
                <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-6)', flexWrap: 'wrap' }}>
                  <button type="button" className="btn--exam-primary" onClick={regeneratePaper}>
                    <IconRotate size={16} />
                    <span>{isKhmer ? 'សាកល្បងវិញ្ញាសាថ្មី' : 'Practice New Exam Paper'}</span>
                  </button>
                  <button type="button" className="btn--exam-secondary" onClick={() => setMode('document')}>
                    <span>{isKhmer ? 'មើលជាទម្រង់ក្រដាសប្រឡង' : 'View Printable Document'}</span>
                  </button>
                </div>
              </div>
            ) : !hasStarted ? (
              /* EXAM BRIEFING & START SCREEN BEFORE COUNTDOWN */
              <div className="exam-briefing-card">
                <div className="exam-briefing-head">
                  <div className="exam-briefing-emblem">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <path d="m9 15 2 2 4-4" />
                    </svg>
                  </div>
                  <div>
                    <div style={{ display: 'flex', gap: '0.45rem', alignItems: 'center', marginBottom: '0.35rem' }}>
                      <span className="exam-badge">
                        {isKhmer ? 'ការរៀបចំវិញ្ញាសាផ្លូវការ' : 'Official Examination Preparation'}
                      </span>
                      {getGradeBadge(gradeId)}
                    </div>
                    <h2 className="exam-briefing-title">
                      {isKhmer ? paper.titleKm : paper.title}
                    </h2>
                    <p className="exam-briefing-subtitle">
                      {isKhmer ? 'ក្រសួងអប់រំ យុវជន និងកីឡា · វិញ្ញាសាគណិតវិទ្យា' : 'Ministry of Education, Youth and Sport · Mathematics Examination'}
                    </p>
                  </div>
                </div>

                {/* Specification metrics grid */}
                <div className="exam-briefing-specs">
                  <div className="exam-spec-item">
                    <span className="exam-spec-icon">⏱️</span>
                    <div className="exam-spec-text">
                      <strong>{isKhmer ? `${toKhmerDigits(paper.durationMinutes)} នាទី` : `${paper.durationMinutes} Minutes`}</strong>
                      <span>{isKhmer ? 'ថិរវេលាប្រឡង' : 'Duration'}</span>
                    </div>
                  </div>
                  <div className="exam-spec-item">
                    <span className="exam-spec-icon">🎯</span>
                    <div className="exam-spec-text">
                      <strong>{isKhmer ? `${toKhmerDigits(paper.totalMarks)} ពិន្ទុ` : `${paper.totalMarks} Marks`}</strong>
                      <span>{isKhmer ? 'ពិន្ទុសរុប' : 'Total Score'}</span>
                    </div>
                  </div>
                  <div className="exam-spec-item">
                    <span className="exam-spec-icon">📋</span>
                    <div className="exam-spec-text">
                      <strong>{isKhmer ? `${toKhmerDigits(paper.allQuestions.length)} សំណួរ` : `${paper.allQuestions.length} Questions`}</strong>
                      <span>{isKhmer ? `${toKhmerDigits(paper.sections.length)} ផ្នែកធំ` : `${paper.sections.length} Sections`}</span>
                    </div>
                  </div>
                  <div className="exam-spec-item">
                    <span className="exam-spec-icon">🏆</span>
                    <div className="exam-spec-text">
                      <strong>{isKhmer ? 'និទ្ទេស E (≥ ៥០%)' : 'Grade E (≥ 50%)'}</strong>
                      <span>{isKhmer ? 'ពិន្ទុជាប់អប្បបរមា' : 'Passing Threshold'}</span>
                    </div>
                  </div>
                </div>

                {/* Instructions list */}
                <div className="exam-briefing-instructions">
                  <h4>{isKhmer ? 'សេចក្តីណែនាំ និងលក្ខខណ្ឌមុនចាប់ផ្តើមប្រឡង' : 'Instructions & Examination Rules'}</h4>
                  <ul>
                    <li>
                      <strong>{isKhmer ? 'ការកំណត់ម៉ោង៖' : 'Countdown timer:'}</strong>{' '}
                      {isKhmer
                        ? 'នាឡិការាប់ថយក្រោយនឹងចាប់ផ្តើមភ្លាមៗ នៅពេលអ្នកចុចប៊ូតុង «ចាប់ផ្តើមធ្វើវិញ្ញាសា» ខាងក្រោម។'
                        : 'The countdown timer will begin immediately when you click the "Start Examination Now" button below.'}
                    </li>
                    <li>
                      <strong>{isKhmer ? 'ការឆ្លើយ និងរំលង៖' : 'Navigation:'}</strong>{' '}
                      {isKhmer
                        ? 'អ្នកអាចរំលងសំណួរ ឬកត់ចំណាំទង់ (Flag) ដើម្បីត្រឡប់មកពិនិត្យឡើងវិញបានគ្រប់ពេលមុនពេលដាក់វិញ្ញាសា។'
                        : 'You can navigate freely, skip questions, or flag questions for review before submitting.'}
                    </li>
                    <li>
                      <strong>{isKhmer ? 'ការដាក់ពិន្ទុ៖' : 'Evaluation:'}</strong>{' '}
                      {isKhmer
                        ? 'នៅពេលចប់ម៉ោង ឬនៅពេលអ្នកចុច «ដាក់វិញ្ញាសា» ប្រព័ន្ធនឹងគណនាពិន្ទុ និងបង្ហាញដំណោះស្រាយលម្អិតគ្រប់សំណួរ។'
                        : 'Upon submission or time expiration, the system automatically scores your exam and presents complete step-by-step solutions.'}
                    </li>
                  </ul>
                </div>

                {/* Actions */}
                <div className="exam-briefing-actions">
                  <button
                    type="button"
                    className="btn--exam-start-huge"
                    onClick={() => setHasStarted(true)}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                    <span>{isKhmer ? 'ចាប់ផ្តើមធ្វើវិញ្ញាសាឥឡូវនេះ (Start Exam)' : 'Start Examination Now'}</span>
                  </button>

                  <button
                    type="button"
                    className="btn--exam-secondary"
                    onClick={() => setMode('document')}
                    style={{ padding: '0.85rem 1.4rem' }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                    <span>{isKhmer ? 'មើលជាទម្រង់ក្រដាសប្រឡង (Printable View)' : 'View Printable Document'}</span>
                  </button>
                </div>
              </div>
            ) : (
              /* LIVE TESTING INTERFACE */
              <div className="exam-test-layout">
                {/* Main Question Area */}
                <div className="exam-test-main">
                  {/* Timer & Live Status Bar */}
                  <div className="exam-timer-bar">
                    <div className={`exam-timer-clock ${secondsRemaining < 600 ? 'is-warning' : ''}`}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      <span>{formatTimeDisplay(secondsRemaining)}</span>
                      {secondsRemaining < 600 && (
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--cambodian-red)' }}>
                          {isKhmer ? '(ជិតផុតម៉ោង!)' : '(Time Running Out!)'}
                        </span>
                      )}
                    </div>

                    <div className="exam-progress-info">
                      <span>
                        {isKhmer
                          ? `ឆ្លើយបាន ${toKhmerDigits(answeredCount)} / ${toKhmerDigits(totalQuestions)}`
                          : `Answered: ${answeredCount} / ${totalQuestions}`}
                      </span>
                      <button
                        type="button"
                        className="btn--exam-primary"
                        style={{ padding: '0.35rem 0.8rem', fontSize: '0.85rem' }}
                        onClick={() => setShowSubmitModal(true)}
                      >
                        {isKhmer ? 'ប្រគល់កិច្ចការ' : 'Submit Exam'}
                      </button>
                    </div>
                  </div>

                  {/* Active Question Card */}
                  {currentQuestion && (
                    <div className="exam-question-card">
                      <div className="exam-question-header">
                        <div>
                          <span className="exam-question-number">
                            {isKhmer
                              ? `សំណួរទី ${toKhmerDigits(currentQuestion.questionNumber)}`
                              : `Question ${currentQuestion.questionNumber}`}
                          </span>
                          <span style={{ fontSize: '0.85rem', color: 'var(--muted)', marginLeft: '0.5rem' }}>
                            ({currentQuestion.topicTitle})
                          </span>
                        </div>
                        <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                          <span className="exam-question-marks">
                            {currentQuestion.marks} {isKhmer ? 'ពិន្ទុ' : 'Marks'}
                          </span>
                          <button
                            type="button"
                            onClick={() => toggleFlagQuestion(currentQuestion.id)}
                            style={{
                              background: flagged.has(currentQuestion.id) ? '#fef3c7' : 'transparent',
                              border: '1px solid var(--line)',
                              borderRadius: 'var(--radius-sm)',
                              padding: '0.25rem 0.5rem',
                              fontSize: '0.8rem',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.3rem',
                              color: flagged.has(currentQuestion.id) ? '#b45309' : 'var(--muted)',
                            }}
                          >
                            <span>🚩</span>
                            <span>{flagged.has(currentQuestion.id) ? (isKhmer ? 'បានចំណាំ' : 'Flagged') : (isKhmer ? 'ចំណាំ' : 'Flag')}</span>
                          </button>
                        </div>
                      </div>

                      {/* Prompt */}
                      <div className="exam-question-prompt">
                        <RichText text={currentQuestion.prompt} />
                      </div>

                      {currentQuestion.promptMath && (
                        <div className="exam-question-math">
                          <MathBlock tex={currentQuestion.promptMath} />
                        </div>
                      )}

                      {/* Answers Input */}
                      {currentQuestion.type === 'multiple-choice' ? (
                        <div className="exam-choices-grid">
                          {currentQuestion.options.map((option, optIdx) => {
                            const isSelected = currentAnswer?.choice === optIdx
                            return (
                              <label
                                key={optIdx}
                                className={`exam-choice-item${isSelected ? ' is-selected' : ''}`}
                                onClick={() => handleSelectChoice(currentQuestion.id, optIdx)}
                              >
                                <span className="exam-choice-letter">{String.fromCharCode(65 + optIdx)}</span>
                                <span className="exam-choice-text">
                                  <RichText text={option} />
                                </span>
                              </label>
                            )
                          })}
                        </div>
                      ) : (
                        <div className="exam-numeric-input-group">
                          <input
                            type="text"
                            className="exam-numeric-input"
                            value={currentAnswer?.text ?? ''}
                            placeholder={isKhmer ? 'វាយតម្លៃលេខ...' : 'Enter numeric value...'}
                            onChange={(e) => handleNumericTextChange(currentQuestion.id, e.target.value)}
                          />
                          {currentQuestion.answerUnit && (
                            <span className="exam-numeric-unit">{currentQuestion.answerUnit}</span>
                          )}
                        </div>
                      )}

                      {/* Navigation between questions */}
                      <div className="exam-question-footer">
                        <button
                          type="button"
                          className="btn--exam-secondary"
                          disabled={currentIndex === 0}
                          onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                          style={{ opacity: currentIndex === 0 ? 0.4 : 1 }}
                        >
                          <IconArrowLeft size={16} />
                          <span>{isKhmer ? 'សំណួរមុន' : 'Previous'}</span>
                        </button>

                        <span style={{ fontSize: '0.88rem', color: 'var(--muted)' }}>
                          {currentIndex + 1} / {totalQuestions}
                        </span>

                        {currentIndex + 1 < totalQuestions ? (
                          <button
                            type="button"
                            className="btn--exam-primary"
                            onClick={() => setCurrentIndex((prev) => Math.min(totalQuestions - 1, prev + 1))}
                          >
                            <span>{isKhmer ? 'សំណួរបន្ទាប់' : 'Next'}</span>
                            <IconArrowRight size={16} />
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="btn--exam-primary"
                            onClick={() => setShowSubmitModal(true)}
                          >
                            <span>{isKhmer ? 'បញ្ចប់ការប្រឡង' : 'Finish & Submit'}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Sidebar Question Navigator */}
                <aside className="exam-navigator-sidebar">
                  <h4 className="exam-navigator-title">
                    {isKhmer ? 'កម្រងសំណួរ' : 'Question Palette'}
                  </h4>

                  <div className="exam-nav-grid">
                    {paper.allQuestions.map((q, idx) => {
                      const isCurrent = idx === currentIndex
                      const isAns = answers[q.id] !== undefined
                      const isFlg = flagged.has(q.id)

                      return (
                        <button
                          key={q.id}
                          type="button"
                          className={`exam-nav-bubble ${isCurrent ? 'is-current' : ''} ${isAns ? 'is-answered' : ''} ${isFlg ? 'is-flagged' : ''}`}
                          onClick={() => setCurrentIndex(idx)}
                          aria-label={`Jump to Question ${idx + 1}`}
                        >
                          {isKhmer ? toKhmerDigits(idx + 1) : idx + 1}
                        </button>
                      )
                    })}
                  </div>

                  <div className="exam-nav-legend">
                    <div className="exam-nav-legend-item">
                      <span className="exam-nav-legend-dot" style={{ background: 'var(--accent)' }} />
                      <span>{isKhmer ? 'សំណួរកំពុងមើល' : 'Current'}</span>
                    </div>
                    <div className="exam-nav-legend-item">
                      <span className="exam-nav-legend-dot" style={{ background: 'var(--accent-soft)', border: '1px solid var(--accent)' }} />
                      <span>{isKhmer ? 'បានឆ្លើយរួច' : 'Answered'}</span>
                    </div>
                    <div className="exam-nav-legend-item">
                      <span className="exam-nav-legend-dot" style={{ background: '#f59e0b' }} />
                      <span>{isKhmer ? 'បានដាក់ចំណាំ' : 'Flagged for Review'}</span>
                    </div>
                    <div className="exam-nav-legend-item">
                      <span className="exam-nav-legend-dot" style={{ background: 'var(--surface-sunken)', border: '1px solid var(--line)' }} />
                      <span>{isKhmer ? 'មិនទាន់ឆ្លើយ' : 'Not Answered'}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="btn--exam-primary"
                    style={{ width: '100%', justifyContent: 'center' }}
                    onClick={() => setShowSubmitModal(true)}
                  >
                    {isKhmer ? 'ប្រគល់កិច្ចការ' : 'Submit Exam'}
                  </button>
                </aside>
              </div>
            )}

            {/* Submission Confirmation Modal */}
            {showSubmitModal && (
              <div
                style={{
                  position: 'fixed',
                  inset: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.65)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 9999,
                  padding: 'var(--space-4)',
                }}
              >
                <div
                  style={{
                    background: 'var(--surface)',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'var(--space-6)',
                    maxWidth: '460px',
                    width: '100%',
                    boxShadow: 'var(--shadow-lg)',
                    border: '1px solid var(--line)',
                  }}
                >
                  <h3 style={{ margin: '0 0 var(--space-2)', fontFamily: 'var(--font-display)' }}>
                    {isKhmer ? 'តើអ្នកចង់ប្រគល់កិច្ចការប្រឡងមែនទេ?' : 'Ready to submit your exam?'}
                  </h3>
                  <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: 1.5, margin: '0 0 var(--space-4)' }}>
                    {answeredCount < totalQuestions
                      ? isKhmer
                        ? `អ្នកបានឆ្លើយចំនួន ${toKhmerDigits(answeredCount)} ក្នុងចំណោម ${toKhmerDigits(totalQuestions)} សំណួរ។ នៅសល់ ${toKhmerDigits(totalQuestions - answeredCount)} សំណួរមិនទាន់បានឆ្លើយ។`
                        : `You have answered ${answeredCount} of ${totalQuestions} questions. You still have ${totalQuestions - answeredCount} unanswered questions.`
                      : isKhmer
                        ? 'អ្នកបានឆ្លើយសំណួរទាំងអស់រួចរាល់ហើយ! តើអ្នកប្រាកដថាចង់បញ្ចប់ និងទទួលលទ្ធផលឥឡូវនេះ?'
                        : 'You have answered all questions. Are you ready to see your final score and evaluation?'}
                  </p>
                  <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'flex-end' }}>
                    <button
                      type="button"
                      className="btn--exam-secondary"
                      onClick={() => setShowSubmitModal(false)}
                    >
                      {isKhmer ? 'ត្រឡប់ទៅធ្វើបន្ត' : 'Continue Testing'}
                    </button>
                    <button
                      type="button"
                      className="btn--exam-primary"
                      onClick={handleSubmitExam}
                    >
                      {isKhmer ? 'ប្រគល់ និងមើលពិន្ទុ' : 'Yes, Submit Now'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* ==========================================================
             MODE B: AUTHENTIC MoEYS PRINTABLE EXAM DOCUMENT
             ========================================================== */
          <div className="exam-document-view">
            {/* MoEYS Official Top Header */}
            <div className="moeys-header">
              <div className="moeys-header__left">
                <h3>ក្រសួងអប់រំ យុវជន និងកីឡា</h3>
                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Ministry of Education, Youth and Sport</div>
                <div style={{ marginTop: '0.4rem', fontSize: '0.88rem' }}>
                  <strong>មណ្ឌលប្រឡង / Center:</strong> ....................................
                </div>
                <div style={{ marginTop: '0.2rem', fontSize: '0.88rem' }}>
                  <strong>បន្ទប់ / Room:</strong> ......... <strong>តុលេខ / Seat:</strong> .........
                </div>
              </div>

              <div className="moeys-header__center">
                <h2>ព្រះរាជាណាចក្រកម្ពុជា</h2>
                <h4>ជាតិ សាសនា ព្រះមហាក្សត្រ</h4>
                <div className="moeys-header__emblem" />
              </div>

              <div className="moeys-header__right">
                <div><strong>កាលបរិច្ឆេទ / Date:</strong> ....................</div>
                <div style={{ marginTop: '0.35rem' }}><strong>ឈ្មោះបេក្ខជន / Name:</strong> ....................</div>
                <div style={{ marginTop: '0.35rem' }}><strong>ហត្ថលេខា / Sign:</strong> ....................</div>
              </div>
            </div>

            {/* Document Title & Meta Box */}
            <div className="document-title-block">
              <h2>{paper.titleKm}</h2>
              <div style={{ fontSize: '1.05rem', color: '#475569', fontWeight: 600 }}>
                {paper.title}
              </div>
              <div className="document-meta-row">
                <span>មុខវិជ្ជា៖ គណិតវិទ្យា (Mathematics)</span>
                <span>·</span>
                <span>
                  រយៈពេល៖ {isKhmer ? toKhmerDigits(paper.durationMinutes) : paper.durationMinutes} នាទី ({paper.durationMinutes} Mins)
                </span>
                <span>·</span>
                <span>ពិន្ទុពេញ៖ {isKhmer ? toKhmerDigits(paper.totalMarks) : paper.totalMarks} (100 Marks)</span>
              </div>
            </div>

            {/* Instructions Box */}
            <div className="document-instructions">
              <h5>ការណែនាំសម្រាប់បេក្ខជន / Instructions:</h5>
              <ul>
                {paper.instructionsKm.map((inst, i) => (
                  <li key={i}>{inst}</li>
                ))}
              </ul>
            </div>

            {/* Sections & Questions */}
            <div className="document-body">
              {paper.sections.map((section) => (
                <div key={section.id} className="document-section">
                  <div className="document-section__header">
                    <span>{section.titleKm} ({section.title})</span>
                    <span className="document-section__marks">
                      [{isKhmer ? toKhmerDigits(section.marks) : section.marks} ពិន្ទុ / Marks]
                    </span>
                  </div>

                  {section.questions.map((q) => (
                    <div key={q.id} className="document-question">
                      <div className="document-question__lead">
                        <span className="document-question__num">
                          {isKhmer
                            ? `សំណួរទី ${toKhmerDigits(q.questionNumber)}៖`
                            : `Question ${q.questionNumber}:`}
                        </span>
                        <span className="document-question__marks">
                          [{isKhmer ? toKhmerDigits(q.marks) : q.marks} ពិន្ទុ]
                        </span>
                        <span className="document-question__prompt">
                          <RichText text={q.prompt} />
                        </span>
                      </div>

                      {q.promptMath && (
                        <div className="document-question__math">
                          <MathBlock tex={q.promptMath} />
                        </div>
                      )}

                      {q.type === 'multiple-choice' ? (
                        <div className="document-choices-grid">
                          {q.options.map((option, optIdx) => (
                            <div key={optIdx} className="document-choice-opt">
                              <span className="document-choice-letter">{String.fromCharCode(65 + optIdx)}.</span>
                              <span><RichText text={option} /></span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="document-work-grid" title="Student workspace" />
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Print Options Toolbar */}
            <div className="no-print" style={{ margin: '2.5rem 0 1rem', padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #cbd5e1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', fontWeight: 600 }}>
                <input
                  type="checkbox"
                  checked={includeSolutionsKey}
                  onChange={(e) => setIncludeSolutionsKey(e.target.checked)}
                />
                <span>{isKhmer ? 'រួមបញ្ចូលកម្រងចម្លើយ និងដំណោះស្រាយលម្អិត' : 'Include Solution Key & Step-by-Step Explanations'}</span>
              </label>

              <button type="button" className="btn--exam-primary" onClick={printDocument}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 6 2 18 2 18 9" />
                  <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                  <rect x="6" y="14" width="12" height="8" />
                </svg>
                <span>{isKhmer ? 'បោះពុម្ពឥឡូវនេះ (Print)' : 'Print Document Now'}</span>
              </button>
            </div>

            {/* Optional Solution Key */}
            {includeSolutionsKey && (
              <div className="document-solutions-key">
                <h3 className="document-solutions-key__title">
                  {isKhmer ? 'កម្រងចម្លើយ និងដំណោះស្រាយលម្អិត (Official Solution Key)' : 'Official Solution Key & Explanations'}
                </h3>
                {paper.allQuestions.map((q) => (
                  <div key={q.id} style={{ marginBottom: '1.5rem', pageBreakInside: 'avoid', breakInside: 'avoid' }}>
                    <div style={{ fontWeight: 700, marginBottom: '0.25rem', color: '#102a56' }}>
                      {isKhmer ? `សំណួរទី ${toKhmerDigits(q.questionNumber)}៖` : `Question ${q.questionNumber}:`}{' '}
                      {q.type === 'multiple-choice'
                        ? `${String.fromCharCode(65 + q.correctOption)}. ${q.options[q.correctOption]}`
                        : `${q.answer} ${q.answerUnit ?? ''}`}
                    </div>
                    <div style={{ fontSize: '0.95rem', lineHeight: 1.6, color: '#334155' }}>
                      <RichText text={q.explanation} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
