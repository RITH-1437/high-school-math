import { Link } from 'react-router-dom'
import type { TopicRef } from '../../data'
import { topicUrl } from '../../data'
import { IconArrowRight } from './Icons'

interface TopicRowProps {
  topicRef: TopicRef
  index: number
}

export function TopicRow({ topicRef, index }: TopicRowProps) {
  const { topic, grade, subject } = topicRef
  return (
    <li>
      <Link className="topic-row" to={topicUrl(topicRef)}>
        <span className="topic-row__index">{String(index + 1).padStart(2, '0')}</span>
        <span className="topic-row__body">
          <span className="topic-row__title">{topic.title}</span>
          <span className="topic-row__subtitle" style={{ display: 'block' }}>
            {topic.subtitle}
          </span>
          <span className="topic-row__meta">
            <span>{topic.formulas.length} formulas</span>
            <span aria-hidden="true">·</span>
            <span>{topic.examples.length} worked examples</span>
            <span aria-hidden="true">·</span>
            <span>{topic.exercises.length} exercises</span>
            <span aria-hidden="true">·</span>
            <span>
              Grade {grade.number} / {subject.title}
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
