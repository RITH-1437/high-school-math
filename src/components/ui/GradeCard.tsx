import { Link } from 'react-router-dom'
import type { Grade } from '../../types/content'
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
  const levelText = isLower ? 'Lower Secondary · អនុវិទ្យាល័យ' : 'Upper Secondary · វិទ្យាល័យ'
  const formulaCount = gradeFormulaCount(grade)
  const topicCount = gradeTopicCount(grade)

  return (
    <Link className="grade-card" to={`/grades/${grade.id}`} aria-label={`Explore Grade ${grade.number}`}>
      <div className="grade-card__top">
        <span className="grade-card__number">
          {String(grade.number).padStart(2, '0')}
          <span>grade</span>
        </span>
        <span
          className="badge badge--outline"
          style={{
            fontSize: '0.68rem',
            background: isLower ? '#EAF2FF' : '#FEF3C7',
            color: isLower ? '#2457A7' : '#92400E',
            borderColor: isLower ? 'rgba(36, 87, 167, 0.25)' : 'rgba(214, 168, 75, 0.35)',
          }}
        >
          {isLower ? 'Grades 7–9' : 'Grades 10–12'}
        </span>
      </div>
      <span className="grade-card__level">{levelText}</span>
      <span className="grade-card__title">{grade.tagline}</span>
      <span className="grade-card__label">
        {grade.subjects.length} subjects · {topicCount} topics
      </span>
      <span className="grade-card__foot">
        <span>{formulaCount} formulas</span>
        <span className="grade-card__action">
          Explore Grade {grade.number}
          <span className="grade-card__arrow">
            <IconArrowRight size={13} />
          </span>
        </span>
      </span>
    </Link>
  )
}
