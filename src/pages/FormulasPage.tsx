import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { familyLabel, formulaRefs, grades } from '../data'
import type { GradeId } from '../types/content'
import { EmptyState } from '../components/ui/EmptyState'
import { FormulaCard } from '../components/ui/FormulaCard'
import { PageHero } from '../components/ui/PageHero'

const PAGE_SIZE = 24

export default function FormulasPage() {
  const [params, setParams] = useSearchParams()
  const [visible, setVisible] = useState(PAGE_SIZE)
  const grade = (params.get('grade') ?? 'all') as GradeId | 'all'
  const subject = params.get('subject') ?? 'all'

  const subjects = useMemo(() => {
    const set = new Map<string, string>()
    for (const ref of formulaRefs) set.set(ref.subject.family, familyLabel(ref.subject.family))
    return [...set.entries()]
  }, [])

  const filtered = useMemo(
    () =>
      formulaRefs.filter(
        (ref) => (grade === 'all' || ref.grade.id === grade) && (subject === 'all' || ref.subject.family === subject),
      ),
    [grade, subject],
  )

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params)
    if (value === 'all') next.delete(key)
    else next.set(key, value)
    setParams(next, { replace: true })
    setVisible(PAGE_SIZE)
  }

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Formula index' }]}
        eyebrow="Reference"
        title="Every formula, in one place."
        intro="Filter by grade and subject. Open any formula for its variables, conditions and a worked example."
      />
      <section className="section">
        <div className="container">
          <div className="filter-bar">
            <div className="filter-group" role="group" aria-label="Filter by grade">
              <span className="filter-group__label">Grade</span>
              <button type="button" className="chip" aria-pressed={grade === 'all'} onClick={() => update('grade', 'all')}>
                All
              </button>
              {grades.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="chip"
                  aria-pressed={grade === item.id}
                  onClick={() => update('grade', item.id)}
                >
                  {item.number}
                </button>
              ))}
            </div>
            <div className="filter-group">
              <label className="filter-group__label" htmlFor="formula-subject">
                Subject
              </label>
              <select id="formula-subject" className="select" value={subject} onChange={(e) => update('subject', e.target.value)}>
                <option value="all">All subjects</option>
                {subjects.map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <p className="muted" style={{ margin: '1.5rem 0', fontSize: '0.85rem' }} aria-live="polite">
            Showing {Math.min(visible, filtered.length)} of {filtered.length} formulas
          </p>
          {filtered.length === 0 ? (
            <EmptyState title="No formulas match these filters" actions={[{ label: 'Browse all grades', to: '/grades' }]}>
              Try choosing a different grade or subject.
            </EmptyState>
          ) : (
            <>
              <div className="formula-shelf formula-shelf--three">
                {filtered.slice(0, visible).map((ref) => (
                  <FormulaCard key={ref.formula.id} formulaRef={ref} />
                ))}
              </div>
              {visible < filtered.length && (
                <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
                  <button type="button" className="btn btn--secondary" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
                    Show more formulas
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}
