import { Link } from 'react-router-dom'
import type { Grade, Subject } from '../../types/content'
import { subjectFamilyMeta, subjectHref, topicHref } from '../../data'
import { familyLabelFor, subjectCopy, topicCopy } from '../../i18n/content'
import { useI18n } from '../../lib/i18n'
import { IconArrowRight, IconChevronRight } from './Icons'

export function SubjectCard({ grade, subject }: { grade: Grade; subject: Subject }) {
  const family = subjectFamilyMeta.get(subject.family)
  const { language, t, num } = useI18n()
  const copy = subjectCopy(grade.id, subject, language)
  const formulaCount = subject.topics.reduce((total, topic) => total + topic.formulas.length, 0)

  return (
    <article className="subject-card" data-family={subject.family}>
      <div className="subject-card__top">
        <span className="subject-card__mark" aria-hidden="true">
          {family?.mark ?? '∑'}
        </span>
        <span className="badge badge--family">{familyLabelFor(subject.family, language)}</span>
      </div>
      <h3 className="subject-card__title">
        <Link to={subjectHref(grade.id, subject.id)}>{copy.title}</Link>
      </h3>
      <p className="subject-card__desc">{copy.description}</p>
      <ul className="subject-card__topics" aria-label={t('subject.topicsAria', { subject: copy.title })}>
        {subject.topics.map((topic, index) => (
          <li key={topic.id}>
            <Link to={topicHref(grade.id, subject.id, topic.id)}>
              <span>{topicCopy(topic, language).title}</span>
              <span>
                {num(String(index + 1).padStart(2, '0'))}
                <IconChevronRight size={11} style={{ display: 'inline', marginLeft: 4, verticalAlign: 'middle' }} />
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="subject-card__foot">
        <span>{t('subject.footCount', { formulas: formulaCount, topics: subject.topics.length })}</span>
        <Link className="text-link" to={subjectHref(grade.id, subject.id)}>
          {t('common.explore')} <IconArrowRight size={13} />
        </Link>
      </div>
    </article>
  )
}
