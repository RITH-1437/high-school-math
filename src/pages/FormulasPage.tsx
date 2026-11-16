import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { formulaRefs, grades } from '../data'
import type { GradeId, SubjectFamily } from '../types/content'
import { EmptyState } from '../components/ui/EmptyState'
import { FormulaCard } from '../components/ui/FormulaCard'
import { PageHero } from '../components/ui/PageHero'
import { familyLabelFor } from '../i18n/content'
import { useI18n } from '../lib/i18n'

const PAGE_SIZE = 24

export default function FormulasPage() {
  const [params, setParams] = useSearchParams()
  const [visible, setVisible] = useState(PAGE_SIZE)
  const { language, t } = useI18n()
  const grade = (params.get('grade') ?? 'all') as GradeId | 'all'
  const subject = params.get('subject') ?? 'all'

  const subjects = useMemo(() => {
    const set = new Map<SubjectFamily, string>()
    for (const ref of formulaRefs) set.set(ref.subject.family, familyLabelFor(ref.subject.family, language))
    return [...set.entries()]
  }, [language])

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
        crumbs={[{ label: t('common.home'), to: '/' }, { label: t('footer.formulaIndex') }]}
        eyebrow={t('formulas.eyebrow')}
        title={t('formulas.title')}
        intro={t('formulas.intro')}
      />
      <section className="section">
        <div className="container">
          <div className="filter-bar">
            <div className="filter-group" role="group" aria-label={t('formulas.filterGrade')}>
              <span className="filter-group__label">{t('common.grade')}</span>
              <button type="button" className="chip" aria-pressed={grade === 'all'} onClick={() => update('grade', 'all')}>
                {t('common.all')}
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
                {t('common.subject')}
              </label>
              <select id="formula-subject" className="select" value={subject} onChange={(e) => update('subject', e.target.value)}>
                <option value="all">{t('formulas.allSubjects')}</option>
                {subjects.map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <p className="muted" style={{ margin: '1.5rem 0', fontSize: '0.85rem' }} aria-live="polite">
            {t('formulas.showing', { shown: Math.min(visible, filtered.length), total: filtered.length })}
          </p>
          {filtered.length === 0 ? (
            <EmptyState title={t('formulas.emptyTitle')} actions={[{ label: t('formulas.browseAll'), to: '/grades' }]}>
              {t('formulas.emptyBody')}
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
                    {t('formulas.showMore')}
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
