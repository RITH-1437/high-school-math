import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { findFormula, gradeHref, subjectHref, topicUrl } from '../data'
import { recordVisit } from '../lib/progress'
import { ExampleCard } from '../components/ui/ExampleCard'
import { FormulaCard } from '../components/ui/FormulaCard'
import { FormulaDetail } from '../components/ui/FormulaDetail'
import { PageHero } from '../components/ui/PageHero'
import { IconArrowRight } from '../components/ui/Icons'
import { familyLabelFor, formulaContent, subjectCopy, topicContent, topicCopy } from '../i18n/content'
import { useI18n } from '../lib/i18n'
import NotFoundPage from './NotFoundPage'

export default function FormulaPage() {
  const { formulaId } = useParams()
  const { language, t } = useI18n()
  const ref = findFormula(formulaId)

  useEffect(() => {
    if (ref) recordVisit('formula', ref.formula.id)
  }, [ref])

  if (!ref) return <NotFoundPage message={t('formula.notFound')} />

  const { grade, subject } = ref
  const topic = topicContent(ref.topic, language)
  const formula = formulaContent(ref.formula, language)
  const topicRef = { topic, grade, subject, key: '' }
  const siblings = topic.formulas.filter((item) => item.id !== formula.id)
  const topicTitle = topicCopy(topic, language).title

  return (
    <div data-family={subject.family}>
      <PageHero
        crumbs={[
          { label: t('common.home'), to: '/' },
          { label: t('common.gradeN', { n: grade.number }), to: gradeHref(grade.id) },
          { label: subjectCopy(grade.id, subject, language).title, to: subjectHref(grade.id, subject.id) },
          { label: topicTitle, to: topicUrl(topicRef) },
          { label: formula.title },
        ]}
        eyebrow={t('formula.eyebrow', { family: familyLabelFor(subject.family, language) })}
        title={formula.title}
        wideTitle
        intro={formula.description}
      />
      <div className="container container--narrow" style={{ paddingBlock: 'clamp(2rem, 5vw, 4rem)' }}>
        <FormulaDetail formula={formula} headingLevel={2} />

        {topic.examples[0] && (
          <section style={{ marginTop: '3rem' }} aria-labelledby="formula-example-h">
            <h2 id="formula-example-h" className="section-title">
              {t('formula.exampleTitle')}
            </h2>
            <ExampleCard example={topic.examples[0]} index={0} />
          </section>
        )}

        {siblings.length > 0 && (
          <section style={{ marginTop: '3rem' }} aria-labelledby="related-formulas-h">
            <h2 id="related-formulas-h" className="section-title">
              {t('formula.relatedTitle', { topic: topicTitle })}
            </h2>
            <div className="formula-shelf formula-shelf--two">
              {siblings.map((item) => (
                <FormulaCard key={item.id} formulaRef={{ formula: item, topic, grade, subject }} showContext={false} />
              ))}
            </div>
          </section>
        )}

        <p style={{ marginTop: '3rem' }}>
          <Link className="btn btn--secondary" to={topicUrl(topicRef)}>
            {t('formula.readTopic', { topic: topicTitle })} <IconArrowRight size={15} />
          </Link>
        </p>
      </div>
    </div>
  )
}
