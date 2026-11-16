import { useEffect, useMemo, useRef, useState } from 'react'
import type { Exercise } from '../../types/content'
import { isNumericAnswerCorrect } from '../../lib/format'
import { getExerciseAttempt, saveExerciseAttempt } from '../../lib/progress'
import { useI18n } from '../../lib/i18n'
import { MathBlock, RichText } from '../ui/Math'
import { IconCheck, IconClose, IconRotate } from '../ui/Icons'

/** Option letters as printed in Khmer textbooks and exam papers. */
const KHMER_OPTION_LETTERS = ['ក', 'ខ', 'គ', 'ឃ', 'ង', 'ច']

interface Answer {
  choice?: number
  text?: string
  correct: boolean
}

export function ExercisePlayer({ exercises, topicId }: { exercises: Exercise[]; topicId: string }) {
  const { t, num, isKhmer } = useI18n()
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, Answer>>({})
  const [draftChoice, setDraftChoice] = useState<number | null>(null)
  const [draftText, setDraftText] = useState('')
  const [showHint, setShowHint] = useState(false)
  const [finished, setFinished] = useState(false)
  const [formError, setFormError] = useState('')
  const headingRef = useRef<HTMLHeadingElement>(null)
  const previous = useMemo(() => getExerciseAttempt(topicId), [topicId, finished])

  const exercise = exercises[index]
  const answered = exercise ? answers[exercise.id] : undefined
  const total = exercises.length
  const correctCount = Object.values(answers).filter((a) => a.correct).length

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true })
  }, [index, finished])

  if (total === 0) return null

  const submit = () => {
    if (!exercise || answered) return
    if (exercise.type === 'multiple-choice') {
      if (draftChoice === null) {
        setFormError(t('exercise.errorChoose'))
        return
      }
      setFormError('')
      setAnswers((current) => ({
        ...current,
        [exercise.id]: { choice: draftChoice, correct: draftChoice === exercise.correctOption },
      }))
    } else {
      if (!draftText.trim()) {
        setFormError(t('exercise.errorType'))
        return
      }
      const correct = isNumericAnswerCorrect(draftText, exercise.answer, exercise.tolerance)
      if (!/^-?[\d.,\s/]+$|^pi$|^π$/i.test(draftText.trim())) {
        setFormError(t('exercise.errorInvalid'))
        return
      }
      setFormError('')
      setAnswers((current) => ({ ...current, [exercise.id]: { text: draftText, correct } }))
    }
  }

  const next = () => {
    setDraftChoice(null)
    setDraftText('')
    setShowHint(false)
    setFormError('')
    if (index + 1 >= total) {
      const correct = Object.values(answers).filter((a) => a.correct).length
      saveExerciseAttempt(topicId, correct, total)
      setFinished(true)
    } else {
      setIndex((current) => current + 1)
    }
  }

  const retry = () => {
    setAnswers({})
    setIndex(0)
    setDraftChoice(null)
    setDraftText('')
    setShowHint(false)
    setFormError('')
    setFinished(false)
  }

  const difficultyLabel = (difficulty: Exercise['difficulty']) => {
    switch (difficulty) {
      case 'easy':
        return t('exercise.difficultyEasy')
      case 'medium':
        return t('exercise.difficultyMedium')
      case 'hard':
        return t('exercise.difficultyHard')
    }
  }

  if (finished) {
    const percent = Math.round((correctCount / total) * 100)
    return (
      <div className="exercise-player" aria-live="polite">
        <div className="exercise-summary">
          <h3 ref={headingRef} tabIndex={-1}>
            {t('exercise.scoreSummary')}
          </h3>
          <p className="exercise-summary__score">
            <strong>{num(correctCount)}</strong> / {num(total)}
            <span> · {num(percent)}%</span>
          </p>
          <p className="muted">
            {percent === 100
              ? t('exercise.perfect')
              : percent >= 60
                ? t('exercise.good')
                : t('exercise.keepGoing')}
          </p>
          <ul className="exercise-review">
            {exercises.map((item, i) => {
              const result = answers[item.id]
              return (
                <li key={item.id} className={result?.correct ? 'is-correct' : 'is-wrong'}>
                  <span className="exercise-review__icon" aria-hidden="true">
                    {result?.correct ? <IconCheck size={15} /> : <IconClose size={15} />}
                  </span>
                  <span>
                    <strong>{t('exercise.questionN', { n: i + 1 })}</strong> — {result?.correct ? t('exercise.correctLabel') : t('exercise.incorrectLabel')}
                  </span>
                </li>
              )
            })}
          </ul>
          <button type="button" className="btn btn--accent" onClick={retry}>
            <IconRotate size={16} /> {t('exercise.tryAgain')}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="exercise-player">
      <div className="exercise-player__top">
        <span className="badge badge--outline">
          {t('exercise.questionOf', { current: index + 1, total })}
        </span>
        <span className={`badge badge--difficulty badge--${exercise.difficulty}`}>{difficultyLabel(exercise.difficulty)}</span>
        {previous && (
          <span className="faint" style={{ fontSize: '0.72rem' }}>
            {t('exercise.lastScore', { correct: previous.correct, total: previous.total })}
          </span>
        )}
      </div>
      <div
        className="exercise-progress"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={index + (answered ? 1 : 0)}
        aria-label={t('exercise.progressLabel')}
      >
        <span style={{ width: `${((index + (answered ? 1 : 0)) / total) * 100}%` }} />
      </div>

      <h3 ref={headingRef} tabIndex={-1} className="exercise-prompt">
        <RichText text={exercise.prompt} />
      </h3>
      {exercise.promptMath && (
        <div className="formula-expression">
          <MathBlock tex={exercise.promptMath} />
        </div>
      )}

      <form
        onSubmit={(event) => {
          event.preventDefault()
          submit()
        }}
      >
        {exercise.type === 'multiple-choice' ? (
          <fieldset className="choice-list" disabled={Boolean(answered)}>
            <legend className="visually-hidden">{t('exercise.chooseOne')}</legend>
            {exercise.options.map((option, optionIndex) => {
              const selected = answered ? answered.choice === optionIndex : draftChoice === optionIndex
              const isCorrect = answered && optionIndex === exercise.correctOption
              const isWrong = answered && selected && !answered.correct
              return (
                <label
                  key={optionIndex}
                  className={`choice${selected ? ' is-selected' : ''}${isCorrect ? ' is-correct' : ''}${isWrong ? ' is-wrong' : ''}`}
                >
                  <input
                    type="radio"
                    name={`exercise-${exercise.id}`}
                    checked={selected}
                    onChange={() => setDraftChoice(optionIndex)}
                  />
                  <span className="choice__letter">
                    {isKhmer && optionIndex < KHMER_OPTION_LETTERS.length
                      ? KHMER_OPTION_LETTERS[optionIndex]
                      : String.fromCharCode(65 + optionIndex)}
                  </span>
                  <span className="choice__text">
                    <RichText text={option} />
                  </span>
                  {isCorrect && <IconCheck size={16} />}
                  {isWrong && <IconClose size={16} />}
                </label>
              )
            })}
          </fieldset>
        ) : (
          <div className="numeric-answer">
            <label htmlFor={`answer-${exercise.id}`}>
              {t('exercise.yourAnswer')}{exercise.answerUnit ? ` (${exercise.answerUnit})` : ''}
            </label>
            <input
              id={`answer-${exercise.id}`}
              inputMode="decimal"
              autoComplete="off"
              value={answered?.text ?? draftText}
              onChange={(event) => setDraftText(event.target.value)}
              disabled={Boolean(answered)}
              placeholder={t('exercise.placeholder')}
              aria-invalid={Boolean(formError)}
              aria-describedby={formError ? `error-${exercise.id}` : undefined}
            />
          </div>
        )}

        {formError && (
          <p className="form-error" id={`error-${exercise.id}`} role="alert">
            {formError}
          </p>
        )}

        {!answered && (
          <div className="cluster" style={{ marginTop: '1.25rem' }}>
            <button type="submit" className="btn btn--primary">
              {t('exercise.check')}
            </button>
            {exercise.hint && (
              <button type="button" className="btn btn--ghost" onClick={() => setShowHint((v) => !v)} aria-expanded={showHint}>
                {showHint ? t('exercise.hideHint') : t('exercise.showHint')}
              </button>
            )}
          </div>
        )}
      </form>

      {showHint && !answered && exercise.hint && (
        <div className="callout" style={{ marginTop: '1rem' }}>
          <p>
            <RichText text={exercise.hint} />
          </p>
        </div>
      )}

      {answered && (
        <div
          className={`feedback ${answered.correct ? 'feedback--correct' : 'feedback--wrong'}`}
          role="status"
          aria-live="polite"
        >
          <h4>{answered.correct ? t('exercise.correct') : t('exercise.notQuite')}</h4>
          {!answered.correct && exercise.type === 'numeric' && (
            <p>
              {t('exercise.correctAnswer', {
                answer: `${exercise.answer}${exercise.answerUnit ? ` ${exercise.answerUnit}` : ''}`,
              })}
            </p>
          )}
          <p>
            <RichText text={exercise.explanation} />
          </p>
          <button type="button" className="btn btn--primary" onClick={next} style={{ marginTop: '1rem' }}>
            {index + 1 >= total ? t('exercise.seeScore') : t('exercise.next')}
          </button>
        </div>
      )}
    </div>
  )
}
