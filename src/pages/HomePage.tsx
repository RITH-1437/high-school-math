import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  featuredFormulas,
  findFormula,
  findShape,
  findTopic,
  grades,
  libraryStats,
  popularSubjectFamilies,
  subjectFamilyMeta,
  subjectRefs,
  topicUrl,
  formulaHref,
  shapeHref,
} from '../data'
import { popularSearches, resultsHref } from '../lib/search'
import { getRecentVisits, type RecentVisit } from '../lib/progress'
import { useBookmarks } from '../lib/bookmarks'
import { useI18n } from '../lib/i18n'
import { familyLabelFor, shapeCopy, topicCopy } from '../i18n/content'
import { GradeCard, gradeFormulaCount } from '../components/ui/GradeCard'
import { FormulaCard } from '../components/ui/FormulaCard'
import { ShapeCard } from '../components/shapes/ShapeCard'
import { Reveal } from '../components/ui/Reveal'
import { IconArrowRight, IconBookmark, IconExam, IconSearch, IconShapes } from '../components/ui/Icons'

const FLOATING = [
  { symbol: 'π', top: '15%', left: '3%', size: '3.2rem', delay: '0s', color: '#D6A84B' },
  { symbol: '∑', top: '65%', left: '4%', size: '2.6rem', delay: '1.2s', color: '#2457A7' },
  { symbol: '√x', top: '16%', right: '3%', size: '2.4rem', delay: '0.6s', color: '#2457A7' },
  { symbol: '∞', top: '50%', right: '4%', size: '2.6rem', delay: '1.8s', color: '#D6A84B' },
  { symbol: 'θ', top: '78%', right: '3%', size: '2.5rem', delay: '2.4s', color: '#2457A7' },
]

const FEATURED_SHAPE_IDS = ['circle', 'triangle', 'cylinder', 'cone', 'sphere', 'cube']

export default function HomePage() {
  const [query, setQuery] = useState('')
  const [recents, setRecents] = useState<RecentVisit[]>([])
  const navigate = useNavigate()
  const { bookmarks } = useBookmarks()
  const { language, t } = useI18n()
  const isKhmer = language === 'km'

  useEffect(() => {
    const read = () => setRecents(getRecentVisits(4))
    read()
    window.addEventListener('axiom:progress', read)
    return () => window.removeEventListener('axiom:progress', read)
  }, [])

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (query.trim()) navigate(resultsHref(query.trim()))
    else navigate('/search')
  }

  const formulas = featuredFormulas(4)
  const featuredShapes = FEATURED_SHAPE_IDS.map(findShape).filter((shape): shape is NonNullable<typeof shape> => Boolean(shape))
  const lowerGrades = grades.filter((grade) => grade.number <= 9)
  const upperGrades = grades.filter((grade) => grade.number >= 10)

  const familySummaries = popularSubjectFamilies.map((family) => {
    const refs = subjectRefs.filter((ref) => ref.subject.family === family)
    return {
      family,
      meta: subjectFamilyMeta.get(family),
      topics: refs.reduce((total, ref) => total + ref.topicCount, 0),
      formulas: refs.reduce((total, ref) => total + ref.formulaCount, 0),
      gradeNumbers: [...new Set(refs.map((ref) => ref.grade.number))].sort((a, b) => a - b),
      firstGrade: refs[0]?.grade.id,
      firstSubject: refs[0]?.subject.id,
    }
  })

  return (
    <>
      <section
        className="hero"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% -10%, rgba(234, 242, 255, 0.8), transparent 70%), linear-gradient(180deg, #FFFFFF 0%, #F7F9FC 100%)',
          color: '#17263D',
          borderBottom: '1px solid #E2E8F0',
          ['--hero-bg' as string]: '#FFFFFF',
          ['--hero-ink' as string]: '#102A56',
          ['--hero-muted' as string]: '#64748B',
          ['--hero-faint' as string]: '#94A3B8',
          ['--hero-line' as string]: 'rgba(16, 42, 86, 0.08)',
          ['--hero-accent' as string]: '#2457A7',
        }}
      >
        <div className="hero__symbols" aria-hidden="true">
          {FLOATING.map((item) => (
            <span
              key={item.symbol}
              className="hero__symbol"
              style={{
                top: item.top,
                left: 'left' in item ? (item as { left: string }).left : undefined,
                right: 'right' in item ? (item as { right: string }).right : undefined,
                fontSize: item.size,
                animationDelay: item.delay,
                color: item.color,
                opacity: 0.22,
              }}
            >
              {item.symbol}
            </span>
          ))}
        </div>
        <div className="container hero__inner">
          <div className="hero__rise" style={{ ['--i' as string]: 0 }}>
            <span
              className="hero-kicker"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.3rem 0.95rem 0.3rem 0.35rem',
                borderRadius: 'var(--radius-pill)',
                background: 'rgba(234, 242, 255, 0.9)',
                border: '1px solid rgba(36, 87, 167, 0.25)',
                fontSize: '0.84rem',
                fontWeight: 500,
                color: '#102A56',
                boxShadow: '0 1px 3px rgba(16, 42, 86, 0.06)',
              }}
            >
              <span
                className="badge badge--cultural"
                style={{
                  background: '#C83B45',
                  color: '#FFFFFF',
                  borderColor: 'transparent',
                }}
              >
                {t('home.kickerBadge')}
              </span>{' '}
              {t('home.kickerText')}
            </span>
          </div>

          <h1 className="hero__title hero__rise" style={{ ['--i' as string]: 1, color: '#102A56' }}>
            {t('home.titleA')}<br />
            <span className="serif-italic hero__title-accent" style={{ color: '#2457A7' }}>
              {t('home.titleB')}
            </span>
            <span className="visually-hidden">{t('home.titleSr')}</span>
          </h1>

          <p className="hero__lead hero__rise" style={{ ['--i' as string]: 2, color: '#64748B' }}>
            {t('home.lead')}
          </p>

          <div
            className="hero__actions hero__rise"
            style={{
              ['--i' as string]: 3,
              marginTop: '1.75rem',
              display: 'flex',
              gap: '0.85rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <Link
              className="btn btn--primary btn--lg"
              to="/grades"
              style={{
                background: '#102A56',
                color: '#FFFFFF',
                borderColor: '#102A56',
                boxShadow: '0 4px 14px rgba(16, 42, 86, 0.18)',
              }}
            >
              {t('home.ctaGrades')} <IconArrowRight className="icon-arrow" size={18} />
            </Link>
            <Link
              className="btn btn--outline btn--lg"
              to="/shapes"
              style={{
                background: '#FFFFFF',
                color: '#17263D',
                borderColor: '#CBD5E1',
              }}
            >
              <IconShapes size={18} /> {t('home.ctaShapes')}
            </Link>
          </div>

          <form
            className="hero__search hero__rise"
            style={{ ['--i' as string]: 4, marginTop: '2rem' }}
            onSubmit={onSubmit}
            role="search"
          >
            <div
              className="search-field"
              style={{
                background: '#FFFFFF',
                borderColor: '#CBD5E1',
                boxShadow: '0 4px 20px -4px rgba(16, 42, 86, 0.08)',
              }}
            >
              <IconSearch size={20} style={{ color: '#2457A7' }} />
              <label htmlFor="hero-search" className="visually-hidden">
                {t('home.searchLabel')}
              </label>
              <input
                id="hero-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t('home.searchPlaceholder')}
                autoComplete="off"
                style={{ color: '#17263D' }}
              />
              <button
                type="submit"
                className="search-field__submit"
                aria-label={t('home.searchButton')}
                style={{ background: '#102A56', color: '#FFFFFF' }}
              >
                <IconArrowRight size={18} />
              </button>
            </div>
            <div className="hero__suggestions">
              {popularSearches(language).map((term) => (
                <Link
                  key={term}
                  className="chip chip--sm"
                  to={resultsHref(term)}
                  style={{
                    background: '#FFFFFF',
                    borderColor: '#E2E8F0',
                    color: '#243B5A',
                  }}
                >
                  {term}
                </Link>
              ))}
            </div>
          </form>

          <dl
            className="hero__stats hero__rise"
            style={{ ['--i' as string]: 5, borderColor: '#E2E8F0' }}
          >
            <div>
              <dt style={{ color: '#64748B' }}>{t('home.statsGrades')}</dt>
              <dd style={{ color: '#102A56' }}>{libraryStats.gradeCount}</dd>
            </div>
            <div>
              <dt style={{ color: '#64748B' }}>{t('home.statsTopics')}</dt>
              <dd style={{ color: '#102A56' }}>{libraryStats.topicCount}</dd>
            </div>
            <div>
              <dt style={{ color: '#64748B' }}>{t('home.statsFormulas')}</dt>
              <dd style={{ color: '#102A56' }}>{libraryStats.formulaCount}</dd>
            </div>
            <div>
              <dt style={{ color: '#64748B' }}>{t('home.statsQuestions')}</dt>
              <dd style={{ color: '#102A56' }}>{libraryStats.exerciseCount}</dd>
            </div>
            <div>
              <dt style={{ color: '#64748B' }}>{t('home.statsShapes')}</dt>
              <dd style={{ color: '#102A56' }}>{libraryStats.shapeCount}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="section" id="curriculum" aria-labelledby="grades-heading">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <div className="section-head__copy">
                <span className="eyebrow">{t('home.curriculumEyebrow')}</span>
                <h2 id="grades-heading">{t('home.curriculumTitle')}</h2>
                <p className="section-head__intro">
                  {t('home.curriculumIntro')}
                </p>
              </div>
              <Link className="text-link section-head__link" to="/grades">
                {t('home.allGrades')} <IconArrowRight size={14} />
              </Link>
            </div>
          </Reveal>

          {/* Lower Secondary Track (Grades 7–9) */}
          <div className="curriculum-stage" style={{ marginBottom: '3.5rem' }}>
            <Reveal>
              <div
                className="curriculum-stage__header"
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  padding: '1.25rem 1.5rem',
                  marginBottom: '1.5rem',
                  borderRadius: 'var(--radius-md)',
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '0.35rem' }}>
                    <span className="badge badge--accent" style={{ background: '#EAF2FF', color: '#2457A7' }}>
                      {t('home.lowerBadge')}
                    </span>
                    <span className="badge badge--cultural" style={{ background: '#C83B45', color: '#FFFFFF' }}>
                      {t('home.lowerTrack')}
                    </span>
                    <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 650, color: '#102A56' }}>
                      {t('home.lowerTitle')}
                    </h3>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.92rem', color: '#64748B' }}>
                    {t('home.lowerDesc')}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.82rem', color: '#64748B' }}>
                  <span><strong style={{ color: '#102A56' }}>{t('home.lowerGrades', { count: lowerGrades.length })}</strong></span>
                  <span><strong style={{ color: '#102A56' }}>{t('home.lowerSubjects', { count: lowerGrades.reduce((sum, g) => sum + g.subjects.length, 0) })}</strong></span>
                  <span><strong style={{ color: '#102A56' }}>{t('home.lowerFormulas', { count: lowerGrades.reduce((sum, g) => sum + gradeFormulaCount(g), 0) })}</strong></span>
                </div>
              </div>
            </Reveal>
            <div className="grade-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))' }}>
              {lowerGrades.map((grade, index) => (
                <Reveal key={grade.id} delay={Math.min(index, 5) as 0 | 1 | 2 | 3 | 4 | 5}>
                  <GradeCard grade={grade} />
                </Reveal>
              ))}
            </div>
          </div>

          {/* Upper Secondary Track (Grades 10–12) */}
          <div className="curriculum-stage">
            <Reveal>
              <div
                className="curriculum-stage__header"
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  padding: '1.25rem 1.5rem',
                  marginBottom: '1.5rem',
                  borderRadius: 'var(--radius-md)',
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '0.35rem' }}>
                    <span className="badge badge--accent" style={{ background: '#EAF2FF', color: '#2457A7' }}>
                      {t('home.upperBadge')}
                    </span>
                    <span className="badge badge--cultural" style={{ background: '#C83B45', color: '#FFFFFF' }}>
                      {t('home.upperTrack')}
                    </span>
                    <span className="badge" style={{ background: '#FEF3C7', color: '#92400E', borderColor: '#FDE68A' }}>
                      {t('home.upperTrackNote')}
                    </span>
                    <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 650, color: '#102A56' }}>
                      {t('home.upperTitle')}
                    </h3>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.92rem', color: '#64748B' }}>
                    {t('home.upperDesc')}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.82rem', color: '#64748B' }}>
                  <span><strong style={{ color: '#102A56' }}>{t('home.upperGrades', { count: upperGrades.length })}</strong></span>
                  <span><strong style={{ color: '#102A56' }}>{t('home.upperSubjects', { count: upperGrades.reduce((sum, g) => sum + g.subjects.length, 0) })}</strong></span>
                  <span><strong style={{ color: '#102A56' }}>{t('home.upperFormulas', { count: upperGrades.reduce((sum, g) => sum + gradeFormulaCount(g), 0) })}</strong></span>
                </div>
              </div>
            </Reveal>
            <div className="grade-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))' }}>
              {upperGrades.map((grade, index) => (
                <Reveal key={grade.id} delay={Math.min(index, 5) as 0 | 1 | 2 | 3 | 4 | 5}>
                  <GradeCard grade={grade} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--sunken" id="subjects" aria-labelledby="subjects-heading">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <div className="section-head__copy">
                <span className="eyebrow">{t('home.subjectsEyebrow')}</span>
                <h2 id="subjects-heading">{t('home.subjectsTitle')}</h2>
              </div>
            </div>
          </Reveal>
          <div className="family-grid">
            {familySummaries.map((item, index) => (
              <Reveal key={item.family} delay={Math.min(index, 5) as 0 | 1 | 2 | 3 | 4 | 5}>
                <Link
                  className="family-card"
                  data-family={item.family}
                  to={`/search?subject=${item.family}`}
                >
                  <span className="family-card__mark" aria-hidden="true">
                    {item.meta?.mark}
                  </span>
                  <span className="family-card__title">{familyLabelFor(item.family, language)}</span>
                  <span className="family-card__desc">{item.meta?.description}</span>
                  <span className="family-card__foot">
                    {t('home.familyFoot', {
                      topics: item.topics,
                      formulas: item.formulas,
                      range:
                        item.gradeNumbers.length > 1
                          ? `${item.gradeNumbers[0]}–${item.gradeNumbers[item.gradeNumbers.length - 1]}`
                          : String(item.gradeNumbers[0]),
                    })}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="formulas-heading">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <div className="section-head__copy">
                <span className="eyebrow">{t('home.formulasEyebrow')}</span>
                <h2 id="formulas-heading">{t('home.formulasTitle')}</h2>
                <p className="section-head__intro">{t('home.formulasIntro')}</p>
              </div>
              <Link className="text-link section-head__link" to="/formulas">
                {t('home.formulaIndex')} <IconArrowRight size={14} />
              </Link>
            </div>
          </Reveal>
          <div className="formula-shelf">
            {formulas.map((ref, index) => (
              <Reveal key={ref.formula.id} delay={Math.min(index, 5) as 0 | 1 | 2 | 3 | 4 | 5}>
                <FormulaCard formulaRef={ref} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dark" id="shapes" aria-labelledby="shapes-heading">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <div className="section-head__copy">
                <span className="eyebrow eyebrow--lime">{t('home.shapesEyebrow')}</span>
                <h2 id="shapes-heading">{t('home.shapesTitle')}</h2>
                <p className="section-head__intro" style={{ color: 'var(--hero-muted)' }}>
                  {t('home.shapesIntro', { twoD: libraryStats.shape2dCount, threeD: libraryStats.shape3dCount })}
                </p>
              </div>
              <Link className="btn btn--lime" to="/shapes">
                <IconShapes size={16} /> {t('home.openShapeLab')}
              </Link>
            </div>
          </Reveal>
          <div className="shape-grid shape-grid--six">
            {featuredShapes.map((shape, index) => (
              <Reveal key={shape.id} delay={Math.min(index, 5) as 0 | 1 | 2 | 3 | 4 | 5}>
                <ShapeCard shape={shape} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>


      <section className="section" id="exams" aria-labelledby="exams-heading" style={{ background: 'var(--surface-sunken)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="container">
          <Reveal>
            <div className="section-head" style={{ marginBottom: '1.5rem' }}>
              <div className="section-head__copy">
                <span className="eyebrow">{isKhmer ? 'មន្ទីរពិសោធន៍ប្រឡងជាតិ' : 'National Examination Testing Lab'}</span>
                <h2 id="exams-heading">{isKhmer ? 'វិញ្ញាសាប្រឡងគណិតវិទ្យាថ្នាក់ជាតិ' : 'National Mathematics Examination Papers'}</h2>
                <p className="section-head__intro">
                  {isKhmer
                    ? 'បង្កើតវិញ្ញាសាប្រឡងស្វ័យប្រវត្តិសម្រាប់គ្រប់កម្រិតថ្នាក់ (ឌីប្លូម ថ្នាក់ទី៩, បាក់ឌុប ថ្នាក់ទី១២ និងប្រឡងឆមាស) ជាមួយមុខងារកំណត់ម៉ោងប្រឡងសាកល្បង និងទម្រង់ក្រដាសប្រឡងផ្លូវការសម្រាប់បោះពុម្ព។'
                    : 'Auto-generate authentic Cambodian examination papers for Grades 7–12 with Grade 9 Diploma and Grade 12 Bac II standards, interactive timed self-testing, and printable MoEYS exam sheets.'}
                </p>
              </div>
              <Link className="btn btn--primary" to="/exam">
                <IconExam size={16} /> {isKhmer ? 'ចូលទៅកាន់មន្ទីរពិសោធន៍ប្រឡង' : 'Open Exam Lab'}
              </Link>
            </div>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '1.25rem', marginTop: '1.5rem' }}>
            <Link to="/exam" style={{ textDecoration: 'none' }}>
              <div className="panel panel__pad" style={{ height: '100%', borderLeft: '4px solid #C83B45' }}>
                <span className="badge" style={{ background: 'rgba(200, 59, 69, 0.12)', color: '#C83B45', fontWeight: 700, marginBottom: '0.75rem' }}>
                  {isKhmer ? 'ឌីប្លូម · ថ្នាក់ទី ៩' : 'Diploma · Grade 9'}
                </span>
                <h3 style={{ fontSize: '1.25rem', margin: '0 0 0.5rem', color: 'var(--ink)' }}>
                  {isKhmer ? 'វិញ្ញាសាប្រឡងឌីប្លូម (Grade 9 Diploma)' : 'Grade 9 Diploma Exam Paper'}
                </h3>
                <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--muted)', lineHeight: 1.55 }}>
                  {isKhmer
                    ? 'វិញ្ញាសា ១០០ ពិន្ទុ រយៈពេល ៩០ នាទី គ្របដណ្ដប់លើរ៉ាឌីកាល់ សមីការដឺក្រេទីពីរ ប្រព័ន្ធសមីការ ធរណីមាត្រ និងស្ថិតិ។'
                    : 'Standard 100-mark, 90-minute examination covering radicals, quadratics, linear systems, geometry, and statistics.'}
                </p>
              </div>
            </Link>

            <Link to="/exam" style={{ textDecoration: 'none' }}>
              <div className="panel panel__pad" style={{ height: '100%', borderLeft: '4px solid #D6A84B' }}>
                <span className="badge" style={{ background: 'rgba(214, 168, 75, 0.15)', color: '#B45309', fontWeight: 700, marginBottom: '0.75rem' }}>
                  {isKhmer ? 'បាក់ឌុប · ថ្នាក់ទី ១២' : 'Bac II · Grade 12'}
                </span>
                <h3 style={{ fontSize: '1.25rem', margin: '0 0 0.5rem', color: 'var(--ink)' }}>
                  {isKhmer ? 'វិញ្ញាសាប្រឡងបាក់ឌុប (Grade 12 Bac II)' : 'Grade 12 Bac II Exam Paper'}
                </h3>
                <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--muted)', lineHeight: 1.55 }}>
                  {isKhmer
                    ? 'វិញ្ញាសា ១០០ ពិន្ទុ រយៈពេល ១៥០ នាទី គ្របដណ្ដប់លើចំនួនកុំផ្លិច លីមីត ដេរីវេ អាំងតេក្រាល ធរណីមាត្រក្នុងលំហ និងប្រូបាប។'
                    : 'Official 100-mark, 150-minute examination covering complex numbers, limits, calculus, 3D vectors, and probability.'}
                </p>
              </div>
            </Link>

            <Link to="/exam" style={{ textDecoration: 'none' }}>
              <div className="panel panel__pad" style={{ height: '100%', borderLeft: '4px solid #2457A7' }}>
                <span className="badge" style={{ background: 'rgba(36, 87, 167, 0.12)', color: '#2457A7', fontWeight: 700, marginBottom: '0.75rem' }}>
                  {isKhmer ? 'ប្រឡងឆមាស · ថ្នាក់ទី ៧-១១' : 'Semester Exams · Grades 7–11'}
                </span>
                <h3 style={{ fontSize: '1.25rem', margin: '0 0 0.5rem', color: 'var(--ink)' }}>
                  {isKhmer ? 'វិញ្ញាសាប្រឡងឆមាសទី១ និងទី២' : 'Semester Assessment Papers'}
                </h3>
                <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--muted)', lineHeight: 1.55 }}>
                  {isKhmer
                    ? 'វិញ្ញាសាវាស់ស្ទង់សមត្ថភាពសិស្សតាមកម្រិតថ្នាក់នីមួយៗ ជាមួយការវាយតម្លៃលទ្ធផល និងដំណោះស្រាយលម្អិត។'
                    : 'Targeted semester evaluations for each individual grade level with instant MoEYS scoring and step-by-step solutions.'}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="personal-heading">
        <div className="container">
          <h2 id="personal-heading" className="visually-hidden">
            {t('home.personalHeading')}
          </h2>
          <div className="duo">
            <Reveal className="panel panel__pad">
              <span className="eyebrow">{t('home.recentEyebrow')}</span>
              {recents.length === 0 ? (
                <p className="muted" style={{ marginTop: '1rem' }}>
                  {t('home.recentEmpty')}
                </p>
              ) : (
                <ul className="recent-list">
                  {recents.map((visit) => {
                    let label = visit.id
                    let href = '/'
                    let kind = visit.kind as string
                    if (visit.kind === 'topic') {
                      const ref = findTopic(visit.id)
                      if (!ref) return null
                      label = topicCopy(ref.topic, language).title
                      href = topicUrl(ref)
                      kind = t('home.recentTopic', { n: ref.grade.number })
                    } else if (visit.kind === 'shape') {
                      const shape = findShape(visit.id)
                      if (!shape) return null
                      label = shapeCopy(shape, language).name
                      href = shapeHref(shape.id)
                      kind = t('home.recentShape')
                    } else {
                      const ref = findFormula(visit.id)
                      if (!ref) return null
                      label = ref.formula.title
                      href = formulaHref(ref.formula.id)
                      kind = t('home.recentFormula')
                    }
                    return (
                      <li key={`${visit.kind}-${visit.id}`}>
                        <Link to={href}>
                          <span>{label}</span>
                          <span className="faint">{kind}</span>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              )}
            </Reveal>
            <Reveal className="panel panel__pad" delay={1}>
              <span className="eyebrow">{t('home.bookmarksEyebrow')}</span>
              <p style={{ marginTop: '1rem', fontSize: '1.05rem' }}>
                {bookmarks.length === 0
                  ? t('home.bookmarksEmpty')
                  : bookmarks.length === 1
                    ? t('home.bookmarksCountOne', { count: 1 })
                    : t('home.bookmarksCountMany', { count: bookmarks.length })}
              </p>
              <Link to="/bookmarks" className="btn btn--secondary" style={{ marginTop: '1.25rem' }}>
                <IconBookmark size={16} /> {t('home.openBookmarks')}
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--sunken" id="method" aria-labelledby="method-heading">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <div className="section-head__copy">
                <span className="eyebrow">{t('home.methodEyebrow')}</span>
                <h2 id="method-heading">{t('home.methodTitle')}</h2>
                <p className="section-head__intro">
                  {t('home.methodIntro')}
                </p>
              </div>
            </div>
          </Reveal>
          <ol className="method" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 210px), 1fr))', gap: '1.5rem' }}>
            {[
              [t('home.method1Title'), t('home.method1Text')],
              [t('home.method2Title'), t('home.method2Text')],
              [t('home.method3Title'), t('home.method3Text')],
              [t('home.method4Title'), t('home.method4Text')],
              [t('home.method5Title'), t('home.method5Text')],
            ].map(([title, text], index) => (
              <Reveal as="li" key={title} delay={Math.min(index, 5) as 0 | 1 | 2 | 3 | 4 | 5} className="method__step">
                <span className="method__num">0{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    </>
  )
}
