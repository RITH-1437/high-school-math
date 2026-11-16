import { Link } from 'react-router-dom'
import type { TopicRef } from '../../data'
import { topicUrl } from '../../data'
import { subjectCopy, topicCopy } from '../../i18n/content'
import { useI18n } from '../../lib/i18n'
import { IconArrowRight } from './Icons'

interface TopicRowProps {
  topicRef: TopicRef
  index: number
}

export function TopicRow({ topicRef, index }: TopicRowProps) {
  const { topic, grade, subject } = topicRef
  const { language, t } = useI18n()
  const copy = topicCopy(topic, language)
  const subjectTitle = subjectCopy(grade.id, subject, language).title

  return (
    <li>
      <Link className="topic-row" to={topicUrl(topicRef)}>
        <span className="topic-row__index">{String(index + 1).padStart(2, '0')}</span>
        <span className="topic-row__body">
          <span className="topic-row__title">{copy.title}</span>
          <span className="topic-row__subtitle" style={{ display: 'block' }}>
            {copy.subtitle}
          </span>
          <span className="topic-row__meta">
            <span>{t('subject.formulaCount', { count: topic.formulas.length })}</span>
            <span aria-hidden="true">·</span>
            <span>{t('subject.exampleCount', { count: topic.examples.length })}</span>
            <span aria-hidden="true">·</span>
            <span>{t('subject.exerciseCount', { count: topic.exercises.length })}</span>
            <span aria-hidden="true">·</span>
            <span>
              {t('common.gradeN', { n: grade.number })} / {subjectTitle}
            </span>
          </span>
        </span>
        <span className="topic-row__arrow" aria-hidden="true">
          <IconArrowRight size={17} />
        </span>
      </Link>
    </li>
  )
}
