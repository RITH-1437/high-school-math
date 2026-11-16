import { Link } from 'react-router-dom'
import type { FormulaRef } from '../../data'
import { formulaHref, topicUrl } from '../../data'
import { familyLabelFor, formulaContent, topicCopy } from '../../i18n/content'
import { useI18n } from '../../lib/i18n'
import { BookmarkButton } from './BookmarkButton'
import { MathBlock } from './Math'
import { IconArrowRight } from './Icons'

interface FormulaCardProps {
  formulaRef: FormulaRef
  showContext?: boolean
  compact?: boolean
}

export function FormulaCard({ formulaRef, showContext = true, compact = false }: FormulaCardProps) {
  const { topic, grade, subject } = formulaRef
  const { language, t, tn } = useI18n()
  const formula = formulaContent(formulaRef.formula, language)
  const topicTitle = topicCopy(topic, language).title

  return (
    <article className="formula-card" data-family={subject.family}>
      <div className="formula-card__head">
        <div>
          <div className="formula-card__eyebrow">
            {showContext && (
              <Link className="badge badge--family" to={topicUrl({ topic, grade, subject, key: '' })}>
                {familyLabelFor(subject.family, language)}
              </Link>
            )}
            <span className="badge badge--outline">{t('common.gradeN', { n: grade.number })}</span>
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
          {showContext ? `${topicTitle} · ` : ''}
          {tn('formula.variable', formula.variables.length)}
        </span>
        <Link className="text-link" to={formulaHref(formula.id)} aria-label={t('formula.viewDetailsFor', { title: formula.title })}>
          {t('formula.viewDetails')} <IconArrowRight size={13} />
        </Link>
      </div>
    </article>
  )
}
