import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { findFormula, gradeHref, subjectHref, topicUrl, familyLabel } from '../data'
import { recordVisit } from '../lib/progress'
import { ExampleCard } from '../components/ui/ExampleCard'
import { FormulaCard } from '../components/ui/FormulaCard'
import { FormulaDetail } from '../components/ui/FormulaDetail'
import { PageHero } from '../components/ui/PageHero'
import { IconArrowRight } from '../components/ui/Icons'
import NotFoundPage from './NotFoundPage'

export default function FormulaPage() {
  const { formulaId } = useParams()
  const ref = findFormula(formulaId)

  useEffect(() => {
    if (ref) recordVisit('formula', ref.formula.id)
  }, [ref])

  if (!ref) return <NotFoundPage message="That formula could not be found. Try searching by name instead." />

  const { formula, topic, grade, subject } = ref
  const topicRef = { topic, grade, subject, key: '' }
  const siblings = topic.formulas.filter((item) => item.id !== formula.id)

  return (
    <div data-family={subject.family}>
      <PageHero
        crumbs={[
          { label: 'Home', to: '/' },
          { label: `Grade ${grade.number}`, to: gradeHref(grade.id) },
          { label: subject.title, to: subjectHref(grade.id, subject.id) },
          { label: topic.title, to: topicUrl(topicRef) },
          { label: formula.title },
        ]}
        eyebrow={`Formula · ${familyLabel(subject.family)}`}
        title={formula.title}
        wideTitle
        intro={formula.description}
      />
      <div className="container container--narrow" style={{ paddingBlock: 'clamp(2rem, 5vw, 4rem)' }}>
        <FormulaDetail formula={formula} headingLevel={2} />

        {topic.examples[0] && (
          <section style={{ marginTop: '3rem' }} aria-labelledby="formula-example-h">
            <h2 id="formula-example-h" className="section-title">
              A worked example from this topic
            </h2>
            <ExampleCard example={topic.examples[0]} index={0} />
          </section>
        )}

        {siblings.length > 0 && (
          <section style={{ marginTop: '3rem' }} aria-labelledby="related-formulas-h">
            <h2 id="related-formulas-h" className="section-title">
              Related formulas in {topic.title}
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
            Read the full topic: {topic.title} <IconArrowRight size={15} />
          </Link>
        </p>
      </div>
    </div>
  )
}
