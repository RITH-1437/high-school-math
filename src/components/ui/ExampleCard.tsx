import { useState } from 'react'
import type { WorkedExample } from '../../types/content'
import { MathBlock, RichText } from './Math'
import { IconCheck, IconChevronRight } from './Icons'

export function ExampleCard({ example, index }: { example: WorkedExample; index: number }) {
  const [revealed, setRevealed] = useState(1)
  const total = example.steps.length
  const done = revealed >= total

  return (
    <article className="example-card">
      <header className="example-card__head">
        <span className="example-card__index">Example {String(index + 1).padStart(2, '0')}</span>
        <h3>{example.title}</h3>
      </header>

      <div className="example-card__section">
        <h4 className="example-card__label">Problem</h4>
        <p>
          <RichText text={example.problem} />
        </p>
      </div>

      <div className="example-card__section">
        <h4 className="example-card__label">Given</h4>
        <ul className="example-card__given">
          {example.given.map((item, i) => (
            <li key={i}>
              <RichText text={item} />
            </li>
          ))}
        </ul>
      </div>

      <div className="example-card__section">
        <div className="example-card__steps-head">
          <h4 className="example-card__label">Solution</h4>
          <span className="example-card__progress" aria-live="polite">
            Step {Math.min(revealed, total)} of {total}
          </span>
        </div>
        <ol className="example-steps">
          {example.steps.slice(0, revealed).map((step, i) => (
            <li key={i} className="example-step">
              <span className="example-step__num" aria-hidden="true">
                {i + 1}
              </span>
              <div>
                <p>
                  <RichText text={step.text} />
                </p>
                {step.math && (
                  <div className="example-step__math">
                    <MathBlock tex={step.math} />
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
        {!done && (
          <div className="cluster" style={{ marginTop: '1rem' }}>
            <button type="button" className="btn btn--secondary btn--sm" onClick={() => setRevealed((n) => n + 1)}>
              Reveal next step <IconChevronRight size={14} />
            </button>
            <button type="button" className="btn btn--ghost btn--sm" onClick={() => setRevealed(total)}>
              Show all steps
            </button>
          </div>
        )}
      </div>

      {done && (
        <div className="example-card__answer">
          <IconCheck size={18} />
          <div>
            <span className="example-card__label">Answer</span>
            <p>
              <RichText text={example.answer} />
            </p>
          </div>
        </div>
      )}
      {done && total > 1 && (
        <button type="button" className="btn btn--ghost btn--sm" onClick={() => setRevealed(1)} style={{ marginTop: '0.75rem' }}>
          Hide steps and try it yourself
        </button>
      )}
    </article>
  )
}
