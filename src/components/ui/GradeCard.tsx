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
  return (
    <Link className="grade-card" to={`/grades/${grade.id}`} aria-label={`Explore Grade ${grade.number}`}>
      <span className="grade-card__number">
        {String(grade.number).padStart(2, '0')}
        <span>grade</span>
      </span>
      <span className="grade-card__label">
        {grade.subjects.length} subjects · {gradeTopicCount(grade)} topics
      </span>
      <span className="grade-card__title">{grade.tagline}</span>
      <span className="grade-card__foot">
        <span>{gradeFormulaCount(grade)} formulas</span>
        <span className="grade-card__arrow">
          <IconArrowRight size={15} />
        </span>
      </span>
    </Link>
  )
}
