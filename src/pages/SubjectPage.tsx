import { Link, useParams } from 'react-router-dom'
import { getSubjectRef, gradeHref, topicUrl, subjectFamilyMeta, familyLabel } from '../data'
import type { FormulaRef, TopicRef } from '../types/content'
import { FormulaCard } from '../components/ui/FormulaCard'
import { PageHero } from '../components/ui/PageHero'
import { RichText } from '../components/ui/Math'
import { TopicRow } from '../components/ui/TopicRow'
import NotFoundPage from './NotFoundPage'

export default function SubjectPage() {
  const { gradeId, subjectId } = useParams()
  const ref = getSubjectRef(gradeId ?? '', subjectId ?? '')
  if (!ref) {
    return <NotFoundPage message="That subject doesn’t exist for this grade. Choose a grade to see its subjects." />
  }
  const { grade, subject } = ref

  const topicRefs: TopicRef[] = subject.topics.map((topic) => ({
    topic,
    grade,
    subject,
    key: `${grade.id}:${subject.id}:${topic.id}`,
  }))
  const previews: FormulaRef[] = subject.topics
    .flatMap((topic) => topic.formulas.slice(0, 1).map((formula) => ({ formula, topic, grade, subject })))
    .slice(0, 6)
  const exampleCount = subject.topics.reduce((total, topic) => total + topic.examples.length, 0)
  const exerciseCount = subject.topics.reduce((total, topic) => total + topic.exercises.length, 0)
  const meta = subjectFamilyMeta.get(subject.family)

  return (
    <div data-family={subject.family}>
      <PageHero
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Grades', to: '/grades' },
          { label: `Grade ${grade.number}`, to: gradeHref(grade.id) },
          { label: subject.title },
        ]}
        eyebrow={`Grade ${grade.number} · ${familyLabel(subject.family)}`}
        title={subject.title}
        intro={subject.description}
        meta={
          <>
            <span>
              <strong>{ref.topicCount}</strong> topics
            </span>
            <span>
              <strong>{ref.formulaCount}</strong> formulas
            </span>
            <span>
              <strong>{exampleCount}</strong> worked examples
            </span>
            <span>
              <strong>{exerciseCount}</strong> exercises
            </span>
          </>
        }
        aside={
          meta ? (
            <span className="subject-hero-mark" aria-hidden="true">
              {meta.mark}
            </span>
          ) : undefined
        }
      />

      <section className="section" aria-labelledby="topics-heading">
        <div className="container container--narrow">
          <div className="section-head">
            <div className="section-head__copy">
              <span className="eyebrow">Topics</span>
              <h2 id="topics-heading">Work through the topics in order</h2>
            </div>
          </div>
          <ul className="topic-list">
            {topicRefs.map((topicRef, index) => (
              <TopicRow key={topicRef.key} topicRef={topicRef} index={index} />
            ))}
          </ul>
        </div>
      </section>

      {previews.length > 0 && (
        <section className="section section--sunken" aria-labelledby="previews-heading">
          <div className="container">
            <div className="section-head">
              <div className="section-head__copy">
                <span className="eyebrow">Formula previews</span>
                <h2 id="previews-heading">A first look at the key formulas</h2>
              </div>
            </div>
            <div className="formula-shelf formula-shelf--three">
              {previews.map((preview) => (
                <FormulaCard key={preview.formula.id} formulaRef={preview} />
              ))}
            </div>
          </div>
        </section>
      )}

      {subject.theorems && subject.theorems.length > 0 && (
        <section className="section" aria-labelledby="theorems-heading">
          <div className="container container--narrow">
            <div className="section-head">
              <div className="section-head__copy">
                <span className="eyebrow">Important theorems</span>
                <h2 id="theorems-heading">Results you can rely on</h2>
              </div>
            </div>
            <div className="theorem-list">
              {subject.theorems.map((theorem) => (
                <article key={theorem.title} className="theorem">
                  <h3>{theorem.title}</h3>
                  <p>
                    <RichText text={theorem.statement} />
                  </p>
                  {theorem.note && (
                    <p className="muted" style={{ marginTop: '0.5rem', fontSize: '0.88rem' }}>
                      <RichText text={theorem.note} />
                    </p>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section section--tight" aria-labelledby="practice-heading">
        <div className="container container--narrow">
          <div className="section-head">
            <div className="section-head__copy">
              <span className="eyebrow">Related examples and exercises</span>
              <h2 id="practice-heading">Practise by topic</h2>
              <p className="section-head__intro">
                Every topic page has worked examples and a scored exercise set. Pick one to practise.
              </p>
            </div>
          </div>
          <ul className="practice-list">
            {topicRefs.map((topicRef) => (
              <li key={topicRef.key}>
                <Link to={`${topicUrl(topicRef)}#exercises`}>
                  <span>{topicRef.topic.title}</span>
                  <span className="faint">
                    {topicRef.topic.examples.length} examples · {topicRef.topic.exercises.length} exercises
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
