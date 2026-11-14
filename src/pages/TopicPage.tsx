import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { findShape, findTopic, findTopicInSubject, gradeHref, shapeHref, subjectHref, topicUrl } from '../data'
import { recordVisit } from '../lib/progress'
import { BookmarkButton } from '../components/ui/BookmarkButton'
import { ExampleCard } from '../components/ui/ExampleCard'
import { FormulaDetail } from '../components/ui/FormulaDetail'
import { PageHero } from '../components/ui/PageHero'
import { RichText } from '../components/ui/Math'
import { ExercisePlayer } from '../components/exercises/ExercisePlayer'
import { ShapeGlyph } from '../components/shapes/ShapeGlyph'
import { IconArrowRight, IconPrint } from '../components/ui/Icons'
import NotFoundPage from './NotFoundPage'

export default function TopicPage() {
  const { gradeId, subjectId, topicId } = useParams()
  const ref = findTopicInSubject(gradeId, subjectId, topicId)

  useEffect(() => {
    if (ref) recordVisit('topic', ref.topic.id)
  }, [ref])

  if (!ref) {
    return <NotFoundPage message="That topic could not be found. It may belong to a different grade or subject." />
  }

  const { topic, grade, subject } = ref
  const shape = findShape(topic.shapeId)
  const related = topic.related
    .map((id) => findTopic(id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
  const siblings = subject.topics
  const position = siblings.findIndex((item) => item.id === topic.id)
  const previous = siblings[position - 1]
  const next = siblings[position + 1]

  const sections = [
    { id: 'introduction', label: 'Introduction' },
    ...(topic.theory.length ? [{ id: 'theory', label: 'Theory' }] : []),
    ...(topic.formulas.length ? [{ id: 'formulas', label: 'Formulas' }] : []),
    ...(shape ? [{ id: 'diagram', label: 'Interactive diagram' }] : []),
    ...(topic.examples.length ? [{ id: 'examples', label: 'Worked examples' }] : []),
    ...(topic.mistakes.length ? [{ id: 'mistakes', label: 'Common mistakes' }] : []),
    ...(topic.exercises.length ? [{ id: 'exercises', label: 'Practice exercises' }] : []),
    ...(related.length ? [{ id: 'related', label: 'Related topics' }] : []),
  ]

  return (
    <div data-family={subject.family}>
      <PageHero
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Grades', to: '/grades' },
          { label: `Grade ${grade.number}`, to: gradeHref(grade.id) },
          { label: subject.title, to: subjectHref(grade.id, subject.id) },
          { label: topic.title },
        ]}
        eyebrow={`Grade ${grade.number} · ${subject.title}`}
        title={topic.title}
        wideTitle
        intro={topic.subtitle}
        meta={
          <>
            <span>
              <strong>{topic.formulas.length}</strong> formulas
            </span>
            <span>
              <strong>{topic.examples.length}</strong> worked examples
            </span>
            <span>
              <strong>{topic.exercises.length}</strong> exercises
            </span>
          </>
        }
        aside={
          <div className="cluster no-print">
            <BookmarkButton kind="topic" id={topic.id} label={topic.title} onDark showLabel />
            <button type="button" className="btn btn--on-dark btn--sm" onClick={() => window.print()}>
              <IconPrint size={15} /> Print
            </button>
          </div>
        }
      />

      <div className="container topic-layout">
        <aside className="topic-toc no-print" aria-label="On this page">
          <span className="eyebrow eyebrow--plain">On this page</span>
          <ol>
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>{section.label}</a>
              </li>
            ))}
          </ol>
          {topic.keyIdeas && topic.keyIdeas.length > 0 && (
            <div className="topic-toc__ideas">
              <span className="eyebrow eyebrow--plain">Key ideas</span>
              <ul>
                {topic.keyIdeas.map((idea, index) => (
                  <li key={index}>
                    <RichText text={idea} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>

        <article className="topic-body">
          <section id="introduction" aria-labelledby="introduction-h">
            <h2 id="introduction-h">Introduction</h2>
            <p className="lead">
              <RichText text={topic.introduction} />
            </p>
            {topic.prerequisites && topic.prerequisites.length > 0 && (
              <div className="callout callout--quiet" style={{ marginTop: '1.5rem' }}>
                <div>
                  <strong>Before you start:</strong>{' '}
                  <RichText text={topic.prerequisites.join(' · ')} />
                </div>
              </div>
            )}
          </section>

          {topic.theory.length > 0 && (
            <section id="theory" aria-labelledby="theory-h">
              <h2 id="theory-h">Theory and definitions</h2>
              {topic.theory.map((part) => (
                <div key={part.title} className="theory-block">
                  <h3>{part.title}</h3>
                  {part.body.map((paragraph, index) => (
                    <p key={index}>
                      <RichText text={paragraph} />
                    </p>
                  ))}
                  {part.bullets && part.bullets.length > 0 && (
                    <ul className="plain-list">
                      {part.bullets.map((bullet, index) => (
                        <li key={index}>
                          <RichText text={bullet} />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          )}

          {topic.formulas.length > 0 && (
            <section id="formulas" aria-labelledby="formulas-h">
              <h2 id="formulas-h">Formulas</h2>
              <div className="formula-stack">
                {topic.formulas.map((formula) => (
                  <FormulaDetail key={formula.id} formula={formula} />
                ))}
              </div>
            </section>
          )}

          {shape && (
            <section id="diagram" aria-labelledby="diagram-h">
              <h2 id="diagram-h">Interactive diagram</h2>
              <Link className="diagram-card" to={shapeHref(shape.id)}>
                <span className="diagram-card__preview">
                  <ShapeGlyph shape={shape} />
                </span>
                <span>
                  <strong>Explore the {shape.name.toLowerCase()} in the Shape Lab</strong>
                  <span className="muted" style={{ display: 'block', marginTop: '0.35rem' }}>
                    {topic.shapeCaption ??
                      'Change the dimensions and watch the perimeter, area and volume update live.'}
                  </span>
                  <span className="text-link" style={{ marginTop: '0.75rem' }}>
                    Open the Shape Lab <IconArrowRight size={14} />
                  </span>
                </span>
              </Link>
            </section>
          )}

          {topic.examples.length > 0 && (
            <section id="examples" aria-labelledby="examples-h">
              <h2 id="examples-h">Worked examples</h2>
              <div className="stack" style={{ gap: '1.5rem' }}>
                {topic.examples.map((example, index) => (
                  <ExampleCard key={example.title} example={example} index={index} />
                ))}
              </div>
            </section>
          )}

          {topic.mistakes.length > 0 && (
            <section id="mistakes" aria-labelledby="mistakes-h">
              <h2 id="mistakes-h">Common mistakes</h2>
              <ul className="mistakes">
                {topic.mistakes.map((item, index) => (
                  <li key={index}>
                    <p className="mistakes__wrong">
                      <span>Mistake</span> <RichText text={item.mistake} />
                    </p>
                    <p className="mistakes__right">
                      <span>Instead</span> <RichText text={item.correction} />
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {topic.exercises.length > 0 && (
            <section id="exercises" aria-labelledby="exercises-h">
              <h2 id="exercises-h">Practice exercises</h2>
              <ExercisePlayer key={topic.id} exercises={topic.exercises} topicId={topic.id} />
            </section>
          )}

          {related.length > 0 && (
            <section id="related" aria-labelledby="related-h">
              <h2 id="related-h">Related topics</h2>
              <ul className="related-list">
                {related.map((item) => (
                  <li key={item.topic.id}>
                    <Link to={topicUrl(item)}>
                      <span>
                        <strong>{item.topic.title}</strong>
                        <span className="muted" style={{ display: 'block', fontSize: '0.82rem' }}>
                          Grade {item.grade.number} · {item.subject.title}
                        </span>
                      </span>
                      <IconArrowRight size={15} />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>
      </div>

      <nav className="container pager no-print" aria-label="Topic navigation">
        {previous ? (
          <Link className="pager__link" to={topicUrl({ topic: previous, grade, subject, key: '' })}>
            <span>
              <small>Previous topic</small>
              {previous.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link className="pager__link pager__link--next" to={topicUrl({ topic: next, grade, subject, key: '' })}>
            <span>
              <small>Next topic</small>
              {next.title}
            </span>
            <IconArrowRight size={16} />
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  )
}
