import { Link, useParams } from 'react-router-dom'
import { getGrade, grades, gradeHref, topicUrl } from '../data'
import type { FormulaRef } from '../types/content'
import { FormulaCard } from '../components/ui/FormulaCard'
import { PageHero } from '../components/ui/PageHero'
import { SubjectCard } from '../components/ui/SubjectCard'
import { gradeFormulaCount, gradeTopicCount } from '../components/ui/GradeCard'
import { Reveal } from '../components/ui/Reveal'
import { IconArrowLeft, IconArrowRight } from '../components/ui/Icons'
import NotFoundPage from './NotFoundPage'

export default function GradePage() {
  const { gradeId } = useParams()
  const grade = getGrade(gradeId)
  if (!grade) return <NotFoundPage message={`There is no Grade “${gradeId ?? ''}”. This library covers Grades 7 to 12.`} />

  const index = grades.findIndex((g) => g.id === grade.id)
  const previous = grades[index - 1]
  const next = grades[index + 1]

  const featured: FormulaRef[] = grade.subjects
    .flatMap((subject) =>
      subject.topics.slice(0, 1).flatMap((topic) =>
        topic.formulas.slice(0, 1).map((formula) => ({ formula, topic, grade, subject })),
      ),
    )
    .slice(0, 6)

  const start = grade.subjects[0]?.topics[0]
  const startSubject = grade.subjects[0]

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Grades', to: '/grades' }, { label: `Grade ${grade.number}` }]}
        eyebrow={`Grade ${grade.number}`}
        title={grade.tagline}
        wideTitle
        intro={grade.description}
        meta={
          <>
            <span>
              <strong>{grade.subjects.length}</strong> subjects
            </span>
            <span>
              <strong>{gradeTopicCount(grade)}</strong> topics
            </span>
            <span>
              <strong>{gradeFormulaCount(grade)}</strong> formulas
            </span>
          </>
        }
        aside={
          <>
            <span className="eyebrow">This year’s focus</span>
            <ul className="focus-list">
              {grade.focus.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {start && startSubject && (
              <Link className="btn btn--lime" to={topicUrl({ topic: start, grade, subject: startSubject, key: '' })}>
                Start with {start.title} <IconArrowRight size={15} />
              </Link>
            )}
          </>
        }
      />

      <section className="section" aria-labelledby="subjects-heading">
        <div className="container">
          <div className="section-head">
            <div className="section-head__copy">
              <span className="eyebrow">Subjects</span>
              <h2 id="subjects-heading">What you will study in Grade {grade.number}</h2>
            </div>
          </div>
          <div className="subject-grid">
            {grade.subjects.map((subject, i) => (
              <Reveal key={subject.id} delay={Math.min(i, 5) as 0 | 1 | 2 | 3 | 4 | 5}>
                <SubjectCard grade={grade} subject={subject} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="section section--sunken" aria-labelledby="featured-heading">
          <div className="container">
            <div className="section-head">
              <div className="section-head__copy">
                <span className="eyebrow">Featured formulas</span>
                <h2 id="featured-heading">Key formulas for Grade {grade.number}</h2>
              </div>
            </div>
            <div className="formula-shelf formula-shelf--three">
              {featured.map((ref) => (
                <FormulaCard key={ref.formula.id} formulaRef={ref} />
              ))}
            </div>
          </div>
        </section>
      )}

      <nav className="container pager" aria-label="Grade navigation">
        {previous ? (
          <Link className="pager__link" to={gradeHref(previous.id)}>
            <IconArrowLeft size={16} />
            <span>
              <small>Previous</small>
              Grade {previous.number}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link className="pager__link pager__link--next" to={gradeHref(next.id)}>
            <span>
              <small>Next</small>
              Grade {next.number}
            </span>
            <IconArrowRight size={16} />
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </>
  )
}
