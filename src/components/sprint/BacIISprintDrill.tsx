import { useEffect, useRef, useState } from 'react'
import {
  BACII_SPRINT_QUESTIONS,
  BACII_SPRINT_TOPICS,
  type SprintQuestion,
  type SprintTopic,
} from '../../data/bacii-sprint'
import { MathBlock } from '../ui/Math'
import { useI18n } from '../../lib/i18n'

interface SavedStats {
  highScore: number
  bestStreak: number
  totalRounds: number
}

const STATS_STORAGE_KEY = 'math_bacii_sprint_stats'

function loadSavedStats(): SavedStats {
  try {
    const raw = localStorage.getItem(STATS_STORAGE_KEY)
    if (raw) return JSON.parse(raw) as SavedStats
  } catch {
    // fallback
  }
  return { highScore: 0, bestStreak: 0, totalRounds: 0 }
}

function saveStats(stats: SavedStats) {
  try {
    localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(stats))
  } catch {
    // ignore
  }
}

export function BacIISprintDrill() {
  const { language } = useI18n()
  const isKm = language === 'km'
  const pick = (en: string, km: string) => (isKm ? km : en)

  // Game Phases: setup | running | summary
  const [phase, setPhase] = useState<'setup' | 'running' | 'summary'>('setup')

  // Setup options
  const [selectedTopics, setSelectedTopics] = useState<Set<SprintTopic>>(
    new Set(['limits', 'derivatives', 'integrals', 'complex', 'probability']),
  )
  const [timerMode, setTimerMode] = useState<number>(180) // 180s, 300s, 0 (untimed)

  // Running State
  const [activeQuestions, setActiveQuestions] = useState<SprintQuestion[]>([])
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState<boolean>(false)
  const [showDrawer, setShowDrawer] = useState<boolean>(false)
  const [score, setScore] = useState<number>(0)
  const [streak, setStreak] = useState<number>(0)
  const [maxStreak, setMaxStreak] = useState<number>(0)
  const [timeLeft, setTimeLeft] = useState<number>(180)
  const [elapsedTime, setElapsedTime] = useState<number>(0)
  const [userAnswers, setUserAnswers] = useState<{ question: SprintQuestion; choice: number; isCorrect: boolean }[]>([])

  // Persistence
  const [stats, setStats] = useState<SavedStats>(loadSavedStats)

  const timerRef = useRef<number | null>(null)

  const toggleTopic = (topic: SprintTopic) => {
    setSelectedTopics((prev) => {
      const next = new Set(prev)
      if (next.has(topic)) {
        if (next.size > 1) next.delete(topic)
      } else {
        next.add(topic)
      }
      return next
    })
  }

  // Start round
  const startRound = (questionsToUse?: SprintQuestion[]) => {
    const pool = questionsToUse || BACII_SPRINT_QUESTIONS.filter((q) => selectedTopics.has(q.topic))
    // Shuffle pool
    const shuffled = [...pool].sort(() => Math.random() - 0.5)

    setActiveQuestions(shuffled)
    setCurrentIndex(0)
    setSelectedChoice(null)
    setIsAnswered(false)
    setShowDrawer(false)
    setScore(0)
    setStreak(0)
    setMaxStreak(0)
    setTimeLeft(timerMode)
    setElapsedTime(0)
    setUserAnswers([])
    setPhase('running')
  }

  // Retry only missed
  const retryMissed = () => {
    const missed = userAnswers.filter((a) => !a.isCorrect).map((a) => a.question)
    if (missed.length > 0) {
      startRound(missed)
    }
  }

  // Timer loop
  useEffect(() => {
    if (phase !== 'running') return

    timerRef.current = window.setInterval(() => {
      setElapsedTime((prev) => prev + 1)
      if (timerMode > 0) {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Time up! End round
            finishRound()
            return 0
          }
          return prev - 1
        })
      }
    }, 1000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [phase, timerMode])

  const finishRound = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    setPhase('summary')
  }

  // Update high score stats on finish
  useEffect(() => {
    if (phase === 'summary') {
      const updated: SavedStats = {
        highScore: Math.max(stats.highScore, score),
        bestStreak: Math.max(stats.bestStreak, maxStreak),
        totalRounds: stats.totalRounds + 1,
      }
      setStats(updated)
      saveStats(updated)
    }
  }, [phase])

  const currentQ = activeQuestions[currentIndex]

  // Answer handler
  const handleSelectChoice = (choiceIndex: number) => {
    if (isAnswered || !currentQ) return

    setSelectedChoice(choiceIndex)
    setIsAnswered(true)

    const isCorrect = choiceIndex === currentQ.correctIndex
    const newStreak = isCorrect ? streak + 1 : 0
    const newMaxStreak = Math.max(maxStreak, newStreak)

    if (isCorrect) {
      setScore((s) => s + 10 + streak * 2) // base + streak bonus
      setStreak(newStreak)
      setMaxStreak(newMaxStreak)
      // Auto advance on correct answer after 500ms
      setTimeout(() => {
        advanceNext(isCorrect, choiceIndex)
      }, 550)
    } else {
      setStreak(0)
      setShowDrawer(true) // Open "Why?" explanation drawer
      setUserAnswers((prev) => [...prev, { question: currentQ, choice: choiceIndex, isCorrect: false }])
    }
  }

  const advanceNext = (wasCorrect = true, choiceIdx = selectedChoice ?? -1) => {
    if (wasCorrect && currentQ) {
      setUserAnswers((prev) => [...prev, { question: currentQ, choice: choiceIdx, isCorrect: true }])
    }

    if (currentIndex + 1 < activeQuestions.length) {
      setCurrentIndex((i) => i + 1)
      setSelectedChoice(null)
      setIsAnswered(false)
      setShowDrawer(false)
    } else {
      finishRound()
    }
  }

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  const accuracyPct = userAnswers.length > 0
    ? Math.round((userAnswers.filter((a) => a.isCorrect).length / userAnswers.length) * 100)
    : 0

  return (
    <div className="sprint-drill-container" style={{ maxWidth: '720px', margin: '0 auto', fontFamily: 'var(--font-sans)' }}>
      {/* ----------------- SETUP PHASE ----------------- */}
      {phase === 'setup' && (
        <div
          className="sprint-card"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <span
              style={{
                display: 'inline-block',
                background: 'var(--light-blue)',
                color: 'var(--academic-blue)',
                fontWeight: 600,
                fontSize: '0.85rem',
                padding: '0.35rem 0.85rem',
                borderRadius: '999px',
                marginBottom: '0.75rem',
              }}
            >
              {pick('Speed & Recall Trainer · Grade 12', 'ការហ្វឹកហាត់ល្បឿន និងការចងចាំរូបមន្ត · ថ្នាក់ទី១២')}
            </span>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '0 0 0.5rem', color: 'var(--ink)' }}>
              {pick('BacII Sprint Drill', 'ការហ្វឹកហាត់ល្បឿនបាក់ឌុប (BacII Sprint)')}
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.95rem', margin: 0 }}>
              {pick(
                'Rapid formula recall for high-yield MoEYS BacII exam questions. Clean cards, instant explanations, and local streak tracking.',
                'ហ្វឹកហាត់ល្បឿនដោះស្រាយរូបមន្តគណិតវិទ្យាសម្រាប់ប្រឡងបាក់ឌុប។ កាតសំណួរច្បាស់ៗ ការពន្យល់ភ្លាមៗ និងកត់ត្រាពិន្ទុដោយស្វ័យប្រវត្តិ។',
              )}
            </p>
          </div>

          {/* Time mode selector */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.5rem', color: 'var(--ink)' }}>
              {pick('Select Timer Mode', 'ជ្រើសរើសរយៈពេល')}
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
              {[
                { time: 180, labelEn: '3 Mins (Speed)', labelKm: '៣ នាទី (ល្បឿន)' },
                { time: 300, labelEn: '5 Mins (Standard)', labelKm: '៥ នាទី (ស្តង់ដារ)' },
                { time: 0, labelEn: 'Untimed (Practice)', labelKm: 'មិនកំណត់ពេល' },
              ].map((m) => (
                <button
                  key={m.time}
                  type="button"
                  onClick={() => setTimerMode(m.time)}
                  style={{
                    minHeight: '48px',
                    padding: '0.6rem 0.5rem',
                    borderRadius: '10px',
                    border: timerMode === m.time ? '2px solid var(--academic-blue)' : '1px solid var(--border)',
                    background: timerMode === m.time ? 'var(--light-blue)' : 'var(--surface)',
                    color: timerMode === m.time ? 'var(--academic-blue)' : 'var(--ink)',
                    fontWeight: timerMode === m.time ? 700 : 500,
                    cursor: 'pointer',
                    fontSize: '0.88rem',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {isKm ? m.labelKm : m.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* Topic toggles */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.5rem', color: 'var(--ink)' }}>
              {pick('Select Topics (MoEYS Grade 12 High-Yield)', 'ជ្រើសរើសប្រធានបទ (កម្មវិធីថ្នាក់ទី១២)')}
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {BACII_SPRINT_TOPICS.map((topic) => {
                const isSelected = selectedTopics.has(topic.id)
                return (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => toggleTopic(topic.id)}
                    style={{
                      minHeight: '44px',
                      padding: '0.5rem 1rem',
                      borderRadius: '8px',
                      border: isSelected ? '2px solid var(--academic-blue)' : '1px solid var(--border)',
                      background: isSelected ? 'var(--light-blue)' : 'var(--surface-sunken)',
                      color: isSelected ? 'var(--academic-blue)' : 'var(--muted)',
                      fontWeight: isSelected ? 600 : 400,
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {isKm ? topic.labelKm : topic.labelEn} {isSelected ? '✓' : '+'}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Stats teaser */}
          {stats.totalRounds > 0 && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                padding: '0.85rem',
                borderRadius: '10px',
                background: 'var(--surface-sunken)',
                marginBottom: '1.75rem',
                fontSize: '0.88rem',
                color: 'var(--muted)',
              }}
            >
              <div>
                {pick('High Score:', 'ពិន្ទុខ្ពស់បំផុត:')}{' '}
                <strong style={{ color: 'var(--ink)' }}>{stats.highScore}</strong>
              </div>
              <div>
                {pick('Best Streak:', 'ជាប់គ្នាច្រើនបំផុត:')}{' '}
                <strong style={{ color: 'var(--ink)' }}>{stats.bestStreak} 🔥</strong>
              </div>
              <div>
                {pick('Rounds Played:', 'ជុំបានហ្វឹកហាត់:')}{' '}
                <strong style={{ color: 'var(--ink)' }}>{stats.totalRounds}</strong>
              </div>
            </div>
          )}

          {/* Start CTA */}
          <button
            type="button"
            onClick={() => startRound()}
            style={{
              width: '100%',
              minHeight: '52px',
              borderRadius: '12px',
              background: 'var(--academic-blue)',
              color: '#FFFFFF',
              border: 'none',
              fontSize: '1.05rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(36, 87, 167, 0.35)',
              transition: 'transform 0.1s ease',
            }}
          >
            {pick('Start Sprint Drill', 'ចាប់ផ្តើមហ្វឹកហាត់ល្បឿន')}
          </button>
        </div>
      )}

      {/* ----------------- RUNNING DRILL PHASE ----------------- */}
      {phase === 'running' && currentQ && (
        <div
          className="sprint-card"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '1.75rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          }}
        >
          {/* Header Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.25rem',
              borderBottom: '1px solid var(--line)',
              paddingBottom: '0.75rem',
            }}
          >
            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
                {pick('Question', 'សំណួរ')} {currentIndex + 1} / {activeQuestions.length}
              </span>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--academic-blue)' }}>
                {isKm ? currentQ.topicLabel.km : currentQ.topicLabel.en}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              {/* Streak */}
              {streak > 1 && (
                <span
                  style={{
                    background: '#FFF3E0',
                    color: '#E65100',
                    padding: '0.25rem 0.6rem',
                    borderRadius: '999px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                  }}
                >
                  {streak} {pick('Streak', 'ជាប់គ្នា')} 🔥
                </span>
              )}

              {/* Timer */}
              {timerMode > 0 ? (
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    color: timeLeft <= 30 ? 'var(--palette-cambodian-red)' : 'var(--ink)',
                  }}
                >
                  ⏱ {formatTime(timeLeft)}
                </div>
              ) : (
                <div style={{ fontSize: '0.88rem', color: 'var(--muted)' }}>
                  ⏱ {formatTime(elapsedTime)}
                </div>
              )}

              {/* Score */}
              <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--ink)' }}>
                {score} <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>pts</span>
              </div>
            </div>
          </div>

          {/* Question Prompt Card */}
          <div
            style={{
              background: 'var(--surface-sunken)',
              borderRadius: '12px',
              padding: '1.5rem',
              marginBottom: '1.5rem',
              textAlign: 'center',
              border: '1px solid var(--line)',
            }}
          >
            <div style={{ fontSize: '1.25rem', minHeight: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MathBlock tex={currentQ.prompt} display={true} />
            </div>
          </div>

          {/* 4 Thumb-Friendly Option Buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.85rem', marginBottom: '1.25rem' }}>
            {currentQ.options.map((optTex, idx) => {
              const isSelected = selectedChoice === idx
              const isCorrectOpt = idx === currentQ.correctIndex

              let btnBg = 'var(--surface)'
              let btnBorder = '1px solid var(--border)'
              let btnColor = 'var(--ink)'

              if (isAnswered) {
                if (isCorrectOpt) {
                  btnBg = '#E8F5E9'
                  btnBorder = '2px solid #2E7D32'
                  btnColor = '#1B5E20'
                } else if (isSelected && !isCorrectOpt) {
                  btnBg = '#FFEBEE'
                  btnBorder = '2px solid var(--palette-cambodian-red)'
                  btnColor = 'var(--palette-cambodian-red)'
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={isAnswered}
                  onClick={() => handleSelectChoice(idx)}
                  style={{
                    minHeight: '52px',
                    borderRadius: '12px',
                    border: btnBorder,
                    background: btnBg,
                    color: btnColor,
                    fontSize: '1rem',
                    cursor: isAnswered ? 'default' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1.25rem',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <span
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: 'rgba(0,0,0,0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      marginRight: '0.75rem',
                    }}
                  >
                    {['A', 'B', 'C', 'D'][idx]}
                  </span>
                  <div style={{ flex: 1, textAlign: 'center' }}>
                    <MathBlock tex={optTex} display={false} />
                  </div>
                  <span style={{ width: '28px' }}>
                    {isAnswered && isCorrectOpt && '✓'}
                    {isAnswered && isSelected && !isCorrectOpt && '✗'}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Micro-Feedback "Why?" (ហេតុអ្វី?) Drawer */}
          {showDrawer && (
            <div
              style={{
                borderRadius: '10px',
                background: '#FFF8E1',
                border: '1px solid #FFE082',
                padding: '1rem 1.25rem',
                marginBottom: '1.25rem',
              }}
            >
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#B78103', marginBottom: '0.35rem' }}>
                💡 {pick('Why? (MoEYS Rule):', 'ហេតុអ្វី? (រូបមន្តក្រសួង):')}
              </div>
              <div style={{ fontSize: '0.95rem', color: '#4E342E' }}>
                <MathBlock tex={isKm ? currentQ.explanation.km : currentQ.explanation.en} display={false} />
              </div>
            </div>
          )}

          {/* Action Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button
              type="button"
              onClick={finishRound}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--muted)',
                fontSize: '0.88rem',
                cursor: 'pointer',
                padding: '0.5rem',
              }}
            >
              {pick('Finish Early', 'បញ្ចប់មុនកំណត់')}
            </button>

            {isAnswered && !showDrawer ? (
              <span style={{ fontSize: '0.85rem', color: '#2E7D32', fontWeight: 600 }}>
                {pick('Correct! Advancing...', 'ត្រឹមត្រូវ! កំពុងបន្ត...')}
              </span>
            ) : isAnswered && showDrawer ? (
              <button
                type="button"
                onClick={() => advanceNext(false)}
                style={{
                  minHeight: '44px',
                  padding: '0.5rem 1.5rem',
                  borderRadius: '10px',
                  background: 'var(--academic-blue)',
                  color: '#FFFFFF',
                  border: 'none',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                }}
              >
                {pick('Next Question →', 'សំណួរបន្ទាប់ →')}
              </button>
            ) : null}
          </div>
        </div>
      )}

      {/* ----------------- SUMMARY SCORECARD PHASE ----------------- */}
      {phase === 'summary' && (
        <div
          className="sprint-card"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <span style={{ fontSize: '2.5rem' }}>
              {accuracyPct >= 80 ? '🏆' : accuracyPct >= 50 ? '🎯' : '💪'}
            </span>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '0.5rem 0', color: 'var(--ink)' }}>
              {pick('Round Complete!', 'បញ្ចប់ការហ្វឹកហាត់!')}
            </h2>
            <p style={{ color: 'var(--muted)', margin: 0, fontSize: '0.95rem' }}>
              {pick('Here is your speed & accuracy scorecard.', 'នេះជាលទ្ធផលពិន្ទុ និងល្បឿនរបស់អ្នក។')}
            </p>
          </div>

          {/* Stats Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1rem',
              marginBottom: '1.75rem',
              textAlign: 'center',
            }}
          >
            <div style={{ background: 'var(--surface-sunken)', padding: '1rem', borderRadius: '12px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '0.25rem' }}>
                {pick('Final Score', 'ពិន្ទុសរុប')}
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--academic-blue)' }}>
                {score}
              </div>
            </div>

            <div style={{ background: 'var(--surface-sunken)', padding: '1rem', borderRadius: '12px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '0.25rem' }}>
                {pick('Accuracy', 'ភាពត្រឹមត្រូវ')}
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: accuracyPct >= 70 ? '#2E7D32' : 'var(--ink)' }}>
                {accuracyPct}%
              </div>
            </div>

            <div style={{ background: 'var(--surface-sunken)', padding: '1rem', borderRadius: '12px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '0.25rem' }}>
                {pick('Max Streak', 'ជាប់គ្នាច្រើនបំផុត')}
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#E65100' }}>
                {maxStreak} 🔥
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem' }}>
            {userAnswers.some((a) => !a.isCorrect) && (
              <button
                type="button"
                onClick={retryMissed}
                style={{
                  flex: 1,
                  minHeight: '48px',
                  borderRadius: '10px',
                  background: 'var(--palette-cambodian-red)',
                  color: '#FFFFFF',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                }}
              >
                {pick('Retry Missed Only', 'ហ្វឹកហាត់សំណួរខុសឡើងវិញ')}
              </button>
            )}

            <button
              type="button"
              onClick={() => setPhase('setup')}
              style={{
                flex: 1,
                minHeight: '48px',
                borderRadius: '10px',
                background: 'var(--academic-blue)',
                color: '#FFFFFF',
                border: 'none',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
              }}
            >
              {pick('New Sprint Round', 'ហ្វឹកហាត់ជុំថ្មី')}
            </button>
          </div>

          {/* Expandable Review of Questions */}
          {userAnswers.length > 0 && (
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--ink)' }}>
                {pick('Question Breakdown', 'ពិនិត្យចម្លើយឡើងវិញ')} ({userAnswers.filter((a) => a.isCorrect).length}/{userAnswers.length})
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {userAnswers.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      borderRadius: '8px',
                      border: `1px solid ${item.isCorrect ? '#C8E6C9' : '#FFCDD2'}`,
                      background: item.isCorrect ? '#F1F8E9' : '#FFEBEE',
                      padding: '0.75rem 1rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.35rem',
                      fontSize: '0.9rem',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 600, color: item.isCorrect ? '#2E7D32' : 'var(--palette-cambodian-red)' }}>
                        {item.isCorrect ? '✓ ' + pick('Correct', 'ត្រឹមត្រូវ') : '✗ ' + pick('Incorrect', 'មិនត្រឹមត្រូវ')}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>
                        {isKm ? item.question.topicLabel.km : item.question.topicLabel.en}
                      </span>
                    </div>

                    <div style={{ margin: '0.25rem 0' }}>
                      <MathBlock tex={item.question.prompt} display={false} />
                    </div>

                    <div style={{ fontSize: '0.85rem', color: 'var(--ink-soft)' }}>
                      💡 <MathBlock tex={isKm ? item.question.explanation.km : item.question.explanation.en} display={false} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
