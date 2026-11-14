import { Link } from 'react-router-dom'
import type { FormulaRef } from '../../data'
import { familyLabel, formulaHref, topicUrl } from '../../data'
import { BookmarkButton } from './BookmarkButton'
import { MathBlock } from './Math'
import { IconArrowRight } from './Icons'

interface FormulaCardProps {
  formulaRef: FormulaRef
  showContext?: boolean
  compact?: boolean
}

export function FormulaCard({ formulaRef, showContext = true, compact = false }: FormulaCardProps) {
  const { formula, topic, grade, subject } = formulaRef

  return (
    <article className="formula-card" data-family={subject.family}>
      <div className="formula-card__head">
        <div>
          <div className="formula-card__eyebrow">
            {showContext && (
              <Link className="badge badge--family" to={topicUrl({ topic, grade, subject, key: '' })}>
                {familyLabel(subject.family)}
              </Link>
            )}
            <span className="badge badge--outline">Grade {grade.number}</span>
          </div>
          <h3 className="formula-card__title">
            <Link to={formulaHref(formula.id)}>{formula.title}</Link>
          </h3>
        </div>
        <BookmarkButton kind="formula" id={formula.id} label={formula.title} iconOnly />
      </div>
      <div className="formula-card__body">
        <div className="formula-expression">
          <MathBlock tex={formula.expression} />
        </div>
        {!compact && <p className="formula-card__desc">{formula.description}</p>}
      </div>
      <div className="formula-card__foot">
        <span>
          {showContext ? `${topic.title} · ` : ''}
          {formula.variables.length} {formula.variables.length === 1 ? 'variable' : 'variables'}
        </span>
        <Link className="text-link" to={formulaHref(formula.id)} aria-label={`Open ${formula.title}`}>
          Open <IconArrowRight size={13} />
        </Link>
      </div>
    </article>
  )
}
