import { Link } from 'react-router-dom'
import { grades, libraryStats } from '../data'
import { GradeCard } from '../components/ui/GradeCard'
import { PageHero } from '../components/ui/PageHero'
import { Reveal } from '../components/ui/Reveal'
import { useI18n } from '../lib/i18n'

export default function GradesPage() {
  const { t } = useI18n()

  return (
    <>
      <PageHero
        crumbs={[{ label: t('common.home'), to: '/' }, { label: t('common.grades') }]}
        eyebrow={t('grades.eyebrow')}
        title={t('grades.title')}
        intro={t('grades.intro')}
        meta={
          <>
            <span>
              <strong>{libraryStats.subjectCount}</strong> {t('grades.metaSubjects')}
            </span>
            <span>
              <strong>{libraryStats.topicCount}</strong> {t('common.topics').toLowerCase()}
            </span>
            <span>
              <strong>{libraryStats.formulaCount}</strong> {t('common.formulas').toLowerCase()}
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
            {t('grades.disclaimer', { search: '' }).trim()}{' '}
            <Link to="/search">{t('grades.searchLink')}</Link>.
          </p>
        </div>
      </section>
    </>
  )
}
