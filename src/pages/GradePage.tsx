import { Link, useParams } from 'react-router-dom'
import { getGrade, grades, gradeHref, topicUrl } from '../data'
import type { FormulaRef } from '../types/content'
import { FormulaCard } from '../components/ui/FormulaCard'
import { PageHero } from '../components/ui/PageHero'
import { SubjectCard } from '../components/ui/SubjectCard'
import { gradeFormulaCount, gradeTopicCount } from '../components/ui/GradeCard'
import { Reveal } from '../components/ui/Reveal'
import { IconArrowLeft, IconArrowRight } from '../components/ui/Icons'
import { gradeCopy, topicCopy } from '../i18n/content'
import { useI18n } from '../lib/i18n'
import NotFoundPage from './NotFoundPage'

export default function GradePage() {
  const { gradeId } = useParams()
  const { language, t } = useI18n()
  const grade = getGrade(gradeId)
  if (!grade) return <NotFoundPage message={t('grade.notFound', { id: gradeId ?? '' })} />

  const copy = gradeCopy(grade, language)
  const index = grades.findIndex((g) => g.id === grade.id)
  const previous = grades[index - 1]
  const next = grades[index + 1]

  const featured: FormulaRef[] = grade.subjects
    .flatMap((subject) =>
      subject.topics.slice(0, 1).flatMap((topic) =>
        topic.formulas.slice(0, 1).map((formula) => ({ formula, topic, grade, subject })),
      ),
    )
    .slice(0, 6)

  const start = grade.subjects[0]?.topics[0]
  const startSubject = grade.subjects[0]

  return (
    <>
      <PageHero
        crumbs={[
          { label: t('common.home'), to: '/' },
          { label: t('common.grades'), to: '/grades' },
          { label: t('common.gradeN', { n: grade.number }) },
        ]}
        eyebrow={t('common.gradeN', { n: grade.number })}
        title={copy.tagline}
        titlePrefix={`${t('common.gradeN', { n: grade.number })}:`}
        wideTitle
        intro={copy.description}
        meta={
          <>
            <span>
              <strong>{grade.subjects.length}</strong> {t('common.subjects').toLowerCase()}
            </span>
            <span>
              <strong>{gradeTopicCount(grade)}</strong> {t('common.topics').toLowerCase()}
            </span>
            <span>
              <strong>{gradeFormulaCount(grade)}</strong> {t('common.formulas').toLowerCase()}
            </span>
          </>
        }
        aside={
          <>
            <span className="eyebrow">{t('grade.thisYearFocus')}</span>
            <ul className="focus-list">
              {copy.focus.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {start && startSubject && (
              <Link className="btn btn--lime" to={topicUrl({ topic: start, grade, subject: startSubject, key: '' })}>
                {t('grade.startWith', { topic: topicCopy(start, language).title })} <IconArrowRight size={15} />
              </Link>
            )}
          </>
        }
      />

      <section className="section" aria-labelledby="subjects-heading">
        <div className="container">
          <div className="section-head">
            <div className="section-head__copy">
              <span className="eyebrow">{t('grade.subjectsEyebrow')}</span>
              <h2 id="subjects-heading">{t('grade.whatYouStudy', { n: grade.number })}</h2>
            </div>
          </div>
          <div className="subject-grid">
            {grade.subjects.map((subject, i) => (
              <Reveal key={subject.id} delay={Math.min(i, 5) as 0 | 1 | 2 | 3 | 4 | 5}>
                <SubjectCard grade={grade} subject={subject} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="section section--sunken" aria-labelledby="featured-heading">
          <div className="container">
            <div className="section-head">
              <div className="section-head__copy">
                <span className="eyebrow">{t('grade.featuredEyebrow')}</span>
                <h2 id="featured-heading">{t('grade.keyFormulas', { n: grade.number })}</h2>
              </div>
            </div>
            <div className="formula-shelf formula-shelf--three">
              {featured.map((ref) => (
                <FormulaCard key={ref.formula.id} formulaRef={ref} />
              ))}
            </div>
          </div>
        </section>
      )}

      <nav className="container pager" aria-label={t('grade.navigation')}>
        {previous ? (
          <Link className="pager__link" to={gradeHref(previous.id)}>
            <IconArrowLeft size={16} />
            <span>
              <small>{t('common.previous')}</small>
              {t('common.gradeN', { n: previous.number })}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link className="pager__link pager__link--next" to={gradeHref(next.id)}>
            <span>
              <small>{t('common.next')}</small>
              {t('common.gradeN', { n: next.number })}
            </span>
            <IconArrowRight size={16} />
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </>
  )
}
