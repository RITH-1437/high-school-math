import { Link } from 'react-router-dom'
import { grades, libraryStats } from '../data'
import { GradeCard } from '../components/ui/GradeCard'
import { PageHero } from '../components/ui/PageHero'
import { Reveal } from '../components/ui/Reveal'

export default function GradesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Grades' }]}
        eyebrow="Grades 7–12"
        title="Choose a grade"
        intro="Each grade page lists its subjects, topics and featured formulas. Topics build on one another, so earlier grades make a good refresher."
        meta={
          <>
            <span>
              <strong>{libraryStats.subjectCount}</strong> subject sections
            </span>
            <span>
              <strong>{libraryStats.topicCount}</strong> topics
            </span>
            <span>
              <strong>{libraryStats.formulaCount}</strong> formulas
            </span>
          </>
        }
      />
      <section className="section">
        <div className="container">
          <div className="grade-grid">
            {grades.map((grade, index) => (
              <Reveal key={grade.id} delay={Math.min(index, 5) as 0 | 1 | 2 | 3 | 4 | 5}>
                <GradeCard grade={grade} />
              </Reveal>
            ))}
          </div>
          <p className="muted" style={{ marginTop: '2.5rem', maxWidth: '46rem', fontSize: '0.9rem' }}>
            This library does not claim to follow any single official curriculum. Topic placement reflects a common
            progression; your school may teach topics in a different order. Looking for something specific? Try{' '}
            <Link to="/search">search</Link>.
          </p>
        </div>
      </section>
    </>
  )
}
