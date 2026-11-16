import { useState } from 'react'
import type { WorkedExample } from '../../types/content'
import { useI18n } from '../../lib/i18n'
import { MathBlock, RichText } from './Math'
import { IconCheck, IconChevronRight } from './Icons'

export function ExampleCard({ example, index }: { example: WorkedExample; index: number }) {
  const [revealed, setRevealed] = useState(1)
  const { t, num } = useI18n()
  const total = example.steps.length
  const done = revealed >= total

  return (
    <article className="example-card">
      <header className="example-card__head">
        <span className="example-card__index">
          {t('example.label', { n: num(String(index + 1).padStart(2, '0')) })}
        </span>
        <h3>{example.title}</h3>
      </header>

      <div className="example-card__section">
        <h4 className="example-card__label">{t('example.problem')}</h4>
        <p>
          <RichText text={example.problem} />
        </p>
      </div>

      <div className="example-card__section">
        <h4 className="example-card__label">{t('example.given')}</h4>
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
          <h4 className="example-card__label">{t('example.solution')}</h4>
          <span className="example-card__progress" aria-live="polite">
            {t('example.stepOf', { current: Math.min(revealed, total), total })}
          </span>
        </div>
        <ol className="example-steps">
          {example.steps.slice(0, revealed).map((step, i) => (
            <li key={i} className="example-step">
              <span className="example-step__num" aria-hidden="true">
                {num(i + 1)}
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
              {t('example.revealNext')} <IconChevronRight size={14} />
            </button>
            <button type="button" className="btn btn--ghost btn--sm" onClick={() => setRevealed(total)}>
              {t('example.showAll')}
            </button>
          </div>
        )}
      </div>

      {done && (
        <div className="example-card__answer">
          <IconCheck size={18} />
          <div>
            <span className="example-card__label">{t('example.answer')}</span>
            <p>
              <RichText text={example.answer} />
            </p>
          </div>
        </div>
      )}
      {done && total > 1 && (
        <button type="button" className="btn btn--ghost btn--sm" onClick={() => setRevealed(1)} style={{ marginTop: '0.75rem' }}>
          {t('example.hideSteps')}
        </button>
      )}
    </article>
  )
}
