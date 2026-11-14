import { Link } from 'react-router-dom'
import type { Grade, Subject } from '../../types/content'
import { familyLabel, subjectFamilyMeta, subjectHref, topicHref } from '../../data'
import { IconArrowRight, IconChevronRight } from './Icons'

export function SubjectCard({ grade, subject }: { grade: Grade; subject: Subject }) {
  const family = subjectFamilyMeta.get(subject.family)
  const formulaCount = subject.topics.reduce((total, topic) => total + topic.formulas.length, 0)

  return (
    <article className="subject-card" data-family={subject.family}>
      <div className="subject-card__top">
        <span className="subject-card__mark" aria-hidden="true">
          {family?.mark ?? '∑'}
        </span>
        <span className="badge badge--family">{familyLabel(subject.family)}</span>
      </div>
      <h3 className="subject-card__title">
        <Link to={subjectHref(grade.id, subject.id)}>{subject.title}</Link>
      </h3>
      <p className="subject-card__desc">{subject.description}</p>
      <ul className="subject-card__topics" aria-label={`${subject.title} topics`}>
        {subject.topics.map((topic, index) => (
          <li key={topic.id}>
            <Link to={topicHref(grade.id, subject.id, topic.id)}>
              <span>{topic.title}</span>
              <span>
                {String(index + 1).padStart(2, '0')}
                <IconChevronRight size={11} style={{ display: 'inline', marginLeft: 4, verticalAlign: 'middle' }} />
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="subject-card__foot">
        <span>
          <strong>{formulaCount}</strong> formulas · <strong>{subject.topics.length}</strong> topics
        </span>
        <Link className="text-link" to={subjectHref(grade.id, subject.id)}>
          Explore <IconArrowRight size={13} />
        </Link>
      </div>
    </article>
  )
}
