import { useEffect, useMemo, useRef, useState } from 'react'
import type { Exercise } from '../../types/content'
import { isNumericAnswerCorrect } from '../../lib/format'
import { getExerciseAttempt, saveExerciseAttempt } from '../../lib/progress'
import { MathBlock, RichText } from '../ui/Math'
import { IconCheck, IconClose, IconRotate } from '../ui/Icons'

interface Answer {
  choice?: number
  text?: string
  correct: boolean
}

export function ExercisePlayer({ exercises, topicId }: { exercises: Exercise[]; topicId: string }) {
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
        setFormError('Choose an answer before checking.')
        return
      }
      setFormError('')
      setAnswers((current) => ({
        ...current,
        [exercise.id]: { choice: draftChoice, correct: draftChoice === exercise.correctOption },
      }))
    } else {
      if (!draftText.trim()) {
        setFormError('Type a number before checking.')
        return
      }
      const correct = isNumericAnswerCorrect(draftText, exercise.answer, exercise.tolerance)
      if (!/^-?[\d.,\s/]+$|^pi$|^π$/i.test(draftText.trim())) {
        setFormError('Enter a number such as 12, -3.5 or 3/4.')
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

  if (finished) {
    const percent = Math.round((correctCount / total) * 100)
    return (
      <div className="exercise-player" aria-live="polite">
        <div className="exercise-summary">
          <h3 ref={headingRef} tabIndex={-1}>
            Score summary
          </h3>
          <p className="exercise-summary__score">
            <strong>{correctCount}</strong> / {total}
            <span> · {percent}%</span>
          </p>
          <p className="muted">
            {percent === 100
              ? 'Perfect. Every answer was correct.'
              : percent >= 60
                ? 'Good work. Review the explanations below for the ones you missed.'
                : 'Keep going. Re-read the theory and examples, then try again.'}
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
                    <strong>Question {i + 1}</strong> — {result?.correct ? 'Correct' : 'Incorrect'}
                  </span>
                </li>
              )
            })}
          </ul>
          <button type="button" className="btn btn--accent" onClick={retry}>
            <IconRotate size={16} /> Try again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="exercise-player">
      <div className="exercise-player__top">
        <span className="badge badge--outline">
          Question {index + 1} of {total}
        </span>
        <span className={`badge badge--difficulty badge--${exercise.difficulty}`}>{exercise.difficulty}</span>
        {previous && (
          <span className="faint" style={{ fontSize: '0.72rem' }}>
            Last score: {previous.correct}/{previous.total}
          </span>
        )}
      </div>
      <div
        className="exercise-progress"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={index + (answered ? 1 : 0)}
        aria-label="Exercise progress"
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
            <legend className="visually-hidden">Choose one answer</legend>
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
                  <span className="choice__letter">{String.fromCharCode(65 + optionIndex)}</span>
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
              Your answer{exercise.answerUnit ? ` (${exercise.answerUnit})` : ''}
            </label>
            <input
              id={`answer-${exercise.id}`}
              inputMode="decimal"
              autoComplete="off"
              value={answered?.text ?? draftText}
              onChange={(event) => setDraftText(event.target.value)}
              disabled={Boolean(answered)}
              placeholder="e.g. 12.5 or 3/4"
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
              Check answer
            </button>
            {exercise.hint && (
              <button type="button" className="btn btn--ghost" onClick={() => setShowHint((v) => !v)} aria-expanded={showHint}>
                {showHint ? 'Hide hint' : 'Show hint'}
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
          <h4>{answered.correct ? 'Correct' : 'Not quite'}</h4>
          {!answered.correct && exercise.type === 'numeric' && (
            <p>
              The correct answer is <strong>{exercise.answer}</strong>
              {exercise.answerUnit ? ` ${exercise.answerUnit}` : ''}.
            </p>
          )}
          <p>
            <RichText text={exercise.explanation} />
          </p>
          <button type="button" className="btn btn--primary" onClick={next} style={{ marginTop: '1rem' }}>
            {index + 1 >= total ? 'See score' : 'Next question'}
          </button>
        </div>
      )}
    </div>
  )
}
