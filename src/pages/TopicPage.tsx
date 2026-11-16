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
import { shapeCopy, subjectCopy, topicContent, topicCopy } from '../i18n/content'
import { useI18n } from '../lib/i18n'
import { hasTopicDiagram, TopicDiagram } from '../components/ui/TopicDiagram'
import NotFoundPage from './NotFoundPage'

export default function TopicPage() {
  const { gradeId, subjectId, topicId } = useParams()
  const { language, t } = useI18n()
  const ref = findTopicInSubject(gradeId, subjectId, topicId)

  useEffect(() => {
    if (ref) recordVisit('topic', ref.topic.id)
  }, [ref])

  if (!ref) {
    return <NotFoundPage message={t('topic.notFound')} />
  }

  const { grade, subject } = ref
  const topic = topicContent(ref.topic, language)
  const topicTitle = topicCopy(topic, language).title
  const subjectTitle = subjectCopy(grade.id, subject, language).title
  const shape = findShape(topic.shapeId)
  const shapeName = shape ? shapeCopy(shape, language).name : ''
  const related = topic.related
    .map((id) => findTopic(id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
  const siblings = subject.topics
  const position = siblings.findIndex((item) => item.id === topic.id)
  const previous = siblings[position - 1]
  const next = siblings[position + 1]
  const showDiagram = hasTopicDiagram(topic.id)

  const sections = [
    { id: 'introduction', label: t('topic.introduction') },
    ...(topic.theory.length ? [{ id: 'theory', label: t('topic.theory') }] : []),
    ...(topic.formulas.length ? [{ id: 'formulas', label: t('topic.formulas') }] : []),
    ...(showDiagram ? [{ id: 'visual-guide', label: t('topic.visualGuide') }] : []),
    ...(shape ? [{ id: 'diagram', label: t('topic.diagram') }] : []),
    ...(topic.examples.length ? [{ id: 'examples', label: t('topic.examples') }] : []),
    ...(topic.mistakes.length ? [{ id: 'mistakes', label: t('topic.mistakes') }] : []),
    ...(topic.exercises.length ? [{ id: 'exercises', label: t('topic.exercises') }] : []),
    ...(related.length ? [{ id: 'related', label: t('topic.related') }] : []),
    { id: 'references', label: t('topic.references') },
  ]

  return (
    <div data-family={subject.family}>
      <PageHero
        crumbs={[
          { label: t('common.home'), to: '/' },
          { label: t('common.grades'), to: '/grades' },
          { label: t('common.gradeN', { n: grade.number }), to: gradeHref(grade.id) },
          { label: subjectTitle, to: subjectHref(grade.id, subject.id) },
          { label: topicTitle },
        ]}
        eyebrow={t('topic.eyebrow', { n: grade.number, subject: subjectTitle })}
        title={topicTitle}
        wideTitle
        intro={topicCopy(topic, language).subtitle}
        meta={
          <>
            <span>
              <strong>{topic.formulas.length}</strong> {t('common.formulas').toLowerCase()}
            </span>
            <span>
              <strong>{topic.examples.length}</strong> {t('common.examples').toLowerCase()}
            </span>
            <span>
              <strong>{topic.exercises.length}</strong> {t('common.exercises').toLowerCase()}
            </span>
          </>
        }
        aside={
          <div className="cluster no-print">
            <BookmarkButton kind="topic" id={topic.id} label={topicTitle} onDark showLabel />
            <button type="button" className="btn btn--on-dark btn--sm" onClick={() => window.print()}>
              <IconPrint size={15} /> {t('topic.print')}
            </button>
          </div>
        }
      />

      <div className="container topic-layout">
        <aside className="topic-toc no-print" aria-label={t('topic.onThisPage')}>
          <span className="eyebrow eyebrow--plain">{t('topic.onThisPage')}</span>
          <ol>
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>{section.label}</a>
              </li>
            ))}
          </ol>
          {topic.keyIdeas && topic.keyIdeas.length > 0 && (
            <div className="topic-toc__ideas">
              <span className="eyebrow eyebrow--plain">{t('topic.keyIdeas')}</span>
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
            <h2 id="introduction-h">{t('topic.introduction')}</h2>
            <p className="lead">
              <RichText text={topic.introduction} />
            </p>

            <div className="bilingual-notice no-print">
              <div>
                <strong>{t('content.bannerTitle')}</strong>
                <p>{t('content.bannerBody')}</p>
              </div>
              <Link className="text-link" to="/glossary">
                {t('content.bannerGlossary')} <IconArrowRight size={14} />
              </Link>
            </div>

            {topic.prerequisites && topic.prerequisites.length > 0 && (
              <div className="callout callout--quiet" style={{ marginTop: '1.5rem' }}>
                <div>
                  <strong>{t('topic.beforeYouStart')}</strong>{' '}
                  <RichText text={topic.prerequisites.join(' · ')} />
                </div>
              </div>
            )}
            {topic.keyIdeas && topic.keyIdeas.length > 0 && (
              <div
                className="panel panel__pad"
                style={{
                  marginTop: '1.5rem',
                  border: '1px solid #E2E8F0',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--surface-sunken)',
                }}
              >
                <h3 style={{ fontSize: '0.98rem', fontWeight: 650, color: '#102A56', marginBottom: '0.6rem' }}>
                  {t('topic.objectives')}
                </h3>
                <ul className="plain-list" style={{ gap: '0.45rem' }}>
                  {topic.keyIdeas.map((idea, index) => (
                    <li key={index} style={{ fontSize: '0.92rem', color: 'var(--ink)' }}>
                      <RichText text={idea} />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {topic.theory.length > 0 && (
            <section id="theory" aria-labelledby="theory-h">
              <h2 id="theory-h">{t('topic.theoryTitle')}</h2>
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
              <h2 id="formulas-h">{t('topic.formulasTitle')}</h2>
              <div className="formula-stack">
                {topic.formulas.map((formula) => (
                  <FormulaDetail key={formula.id} formula={formula} />
                ))}
              </div>
            </section>
          )}

          {showDiagram && (
            <section id="visual-guide" aria-labelledby="visual-guide-h">
              <h2 id="visual-guide-h">{t('topic.visualGuideTitle')}</h2>
              <p className="muted" style={{ marginBlock: '-0.3rem 0.8rem', fontSize: '0.92rem' }}>
                {t('topic.visualGuideCaption')}
              </p>
              <TopicDiagram topicId={topic.id} language={language} />
            </section>
          )}

          {shape && (
            <section id="diagram" aria-labelledby="diagram-h">
              <h2 id="diagram-h">{t('topic.diagramTitle')}</h2>
              <Link className="diagram-card" to={shapeHref(shape.id)}>
                <span className="diagram-card__preview">
                  <ShapeGlyph shape={shape} />
                </span>
                <span>
                  <strong>{t('topic.exploreShape', { shape: shapeName })}</strong>
                  <span className="muted" style={{ display: 'block', marginTop: '0.35rem' }}>
                    {topic.shapeCaption ?? t('topic.diagramCaption')}
                  </span>
                  <span className="text-link" style={{ marginTop: '0.75rem' }}>
                    {t('topic.openLab')} <IconArrowRight size={14} />
                  </span>
                </span>
              </Link>
            </section>
          )}

          {topic.examples.length > 0 && (
            <section id="examples" aria-labelledby="examples-h">
              <h2 id="examples-h">{t('topic.examplesTitle')}</h2>
              <div className="stack" style={{ gap: '1.5rem' }}>
                {topic.examples.map((example, index) => (
                  <ExampleCard key={example.title} example={example} index={index} />
                ))}
              </div>
            </section>
          )}

          {topic.mistakes.length > 0 && (
            <section id="mistakes" aria-labelledby="mistakes-h">
              <h2 id="mistakes-h">{t('topic.mistakesTitle')}</h2>
              <ul className="mistakes">
                {topic.mistakes.map((item, index) => (
                  <li key={index}>
                    <p className="mistakes__wrong">
                      <span className="mistakes__tag mistakes__tag--wrong">{t('topic.mistake')}</span> <RichText text={item.mistake} />
                    </p>
                    <p className="mistakes__right">
                      <span className="mistakes__tag mistakes__tag--right">{t('topic.instead')}</span> <RichText text={item.correction} />
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {topic.exercises.length > 0 && (
            <section id="exercises" aria-labelledby="exercises-h">
              <h2 id="exercises-h">{t('topic.exercisesTitle')}</h2>
              <ExercisePlayer key={topic.id} exercises={topic.exercises} topicId={topic.id} />
            </section>
          )}

          {related.length > 0 && (
            <section id="related" aria-labelledby="related-h">
              <h2 id="related-h">{t('topic.relatedTitle')}</h2>
              <ul className="related-list">
                {related.map((item) => (
                  <li key={item.topic.id}>
                    <Link to={topicUrl(item)}>
                      <span>
                        <strong>{topicCopy(item.topic, language).title}</strong>
                        <span className="muted" style={{ display: 'block', fontSize: '0.82rem' }}>
                          {t('common.gradeN', { n: item.grade.number })} ·{' '}
                          {subjectCopy(item.grade.id, item.subject, language).title}
                        </span>
                      </span>
                      <IconArrowRight size={15} />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section id="references" aria-labelledby="references-h" style={{ marginTop: '3.5rem', paddingTop: '1.75rem', borderTop: '1px solid var(--line)' }}>
            <h2 id="references-h" style={{ fontSize: '1.25rem', marginBottom: '0.6rem' }}>
              {t('topic.referencesTitle')}
            </h2>
            <p className="muted" style={{ fontSize: '0.88rem', lineHeight: '1.65' }}>
              {t('topic.referencesNote')}
            </p>
          </section>
        </article>
      </div>

      <nav className="container pager no-print" aria-label={t('topic.navigation')}>
        {previous ? (
          <Link className="pager__link" to={topicUrl({ topic: previous, grade, subject, key: '' })}>
            <span>
              <small>{t('topic.previousTopic')}</small>
              {topicCopy(previous, language).title}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link className="pager__link pager__link--next" to={topicUrl({ topic: next, grade, subject, key: '' })}>
            <span>
              <small>{t('topic.nextTopic')}</small>
              {topicCopy(next, language).title}
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
