import { Link } from 'react-router-dom'
import type { Grade } from '../../types/content'
import { gradeCopy } from '../../i18n/content'
import { useI18n } from '../../lib/i18n'
import { IconArrowRight } from './Icons'

export function gradeTopicCount(grade: Grade): number {
  return grade.subjects.reduce((total, subject) => total + subject.topics.length, 0)
}

export function gradeFormulaCount(grade: Grade): number {
  return grade.subjects.reduce(
    (total, subject) =>
      total + subject.topics.reduce((subtotal, topic) => subtotal + topic.formulas.length, 0),
    0,
  )
}

export function GradeCard({ grade }: { grade: Grade }) {
  const isLower = grade.number <= 9
  const { language, t } = useI18n()
  const copy = gradeCopy(grade, language)
  const formulaCount = gradeFormulaCount(grade)
  const topicCount = gradeTopicCount(grade)

  return (
    <Link
      className="grade-card"
      to={`/grades/${grade.id}`}
      aria-label={t('grade.explore', { n: grade.number })}
    >
      <div className="grade-card__top">
        <span className="grade-card__number">
          {String(grade.number).padStart(2, '0')}
          <span>{t('grade.badge')}</span>
        </span>
        <span className="badge badge--outline" style={{ fontSize: '0.68rem' }}>
          {isLower ? t('grade.lowerRange') : t('grade.upperRange')}
        </span>
      </div>
      <span className="grade-card__level">{isLower ? t('grade.lowerLevel') : t('grade.upperLevel')}</span>
      <span className="grade-card__title">{copy.tagline}</span>
      <span className="grade-card__label">
        {t('grade.summary', { subjects: grade.subjects.length, topics: topicCount })}
      </span>
      <span className="grade-card__foot">
        <span>{t('grade.formulaCount', { count: formulaCount })}</span>
        <span className="grade-card__action">
          {t('grade.explore', { n: grade.number })}
          <span className="grade-card__arrow">
            <IconArrowRight size={13} />
          </span>
        </span>
      </span>
    </Link>
  )
}
