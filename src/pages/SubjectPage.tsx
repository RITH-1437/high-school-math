import { Link, useParams } from 'react-router-dom'
import { getSubjectRef, gradeHref, topicUrl, subjectFamilyMeta } from '../data'
import type { FormulaRef, TopicRef } from '../types/content'
import { FormulaCard } from '../components/ui/FormulaCard'
import { PageHero } from '../components/ui/PageHero'
import { RichText } from '../components/ui/Math'
import { TopicRow } from '../components/ui/TopicRow'
import { familyLabelFor, subjectCopy, topicCopy } from '../i18n/content'
import { useI18n } from '../lib/i18n'
import NotFoundPage from './NotFoundPage'

export default function SubjectPage() {
  const { gradeId, subjectId } = useParams()
  const { language, t } = useI18n()
  const ref = getSubjectRef(gradeId ?? '', subjectId ?? '')
  if (!ref) {
    return <NotFoundPage message={t('subject.notFound')} />
  }
  const { grade, subject } = ref
  const copy = subjectCopy(grade.id, subject, language)

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
          { label: t('common.home'), to: '/' },
          { label: t('common.grades'), to: '/grades' },
          { label: t('common.gradeN', { n: grade.number }), to: gradeHref(grade.id) },
          { label: copy.title },
        ]}
        eyebrow={t('subject.eyebrow', { n: grade.number, family: familyLabelFor(subject.family, language) })}
        title={copy.title}
        intro={copy.description}
        meta={
          <>
            <span>
              <strong>{ref.topicCount}</strong> {t('common.topics').toLowerCase()}
            </span>
            <span>
              <strong>{ref.formulaCount}</strong> {t('common.formulas').toLowerCase()}
            </span>
            <span>
              <strong>{exampleCount}</strong> {t('common.examples').toLowerCase()}
            </span>
            <span>
              <strong>{exerciseCount}</strong> {t('common.exercises').toLowerCase()}
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
              <span className="eyebrow">{t('subject.topicsEyebrow')}</span>
              <h2 id="topics-heading">{t('subject.topicsTitle')}</h2>
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
                <span className="eyebrow">{t('subject.previewsEyebrow')}</span>
                <h2 id="previews-heading">{t('subject.previewsTitle')}</h2>
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
                <span className="eyebrow">{t('subject.theoremsEyebrow')}</span>
                <h2 id="theorems-heading">{t('subject.theoremsTitle')}</h2>
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
              <span className="eyebrow">{t('subject.practiceEyebrow')}</span>
              <h2 id="practice-heading">{t('subject.practiceTitle')}</h2>
              <p className="section-head__intro">{t('subject.practiceIntro')}</p>
            </div>
          </div>
          <ul className="practice-list">
            {topicRefs.map((topicRef) => (
              <li key={topicRef.key}>
                <Link to={`${topicUrl(topicRef)}#exercises`}>
                  <span>{topicCopy(topicRef.topic, language).title}</span>
                  <span className="faint">
                    {t('subject.examplesShort', { count: topicRef.topic.examples.length })} ·{' '}
                    {t('subject.exercisesShort', { count: topicRef.topic.exercises.length })}
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
