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
import { GradeCard, gradeFormulaCount } from '../components/ui/GradeCard'
import { FormulaCard } from '../components/ui/FormulaCard'
import { ShapeCard } from '../components/shapes/ShapeCard'
import { Reveal } from '../components/ui/Reveal'
import { IconArrowRight, IconBookmark, IconSearch, IconShapes } from '../components/ui/Icons'

const FLOATING = [
  { symbol: 'π', top: '12%', left: '8%', size: '3.4rem', delay: '0s', color: '#D6A84B' },
  { symbol: '∑', top: '65%', left: '6%', size: '2.8rem', delay: '1.2s', color: '#2457A7' },
  { symbol: '√x', top: '16%', left: '88%', size: '2.5rem', delay: '0.6s', color: '#2457A7' },
  { symbol: '∞', top: '48%', left: '92%', size: '2.7rem', delay: '1.8s', color: '#D6A84B' },
  { symbol: 'θ', top: '78%', left: '85%', size: '2.8rem', delay: '2.4s', color: '#2457A7' },
  { symbol: '∫', top: '9%', left: '52%', size: '3.0rem', delay: '3.0s', color: '#D6A84B' },
  { symbol: 'Δ', top: '86%', left: '46%', size: '2.4rem', delay: '1.5s', color: '#D6A84B' },
]

const FEATURED_SHAPE_IDS = ['circle', 'triangle', 'cylinder', 'cone', 'sphere', 'cube']

export default function HomePage() {
  const [query, setQuery] = useState('')
  const [recents, setRecents] = useState<RecentVisit[]>([])
  const navigate = useNavigate()
  const { bookmarks } = useBookmarks()

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
                left: item.left,
                fontSize: item.size,
                animationDelay: item.delay,
                color: item.color,
                opacity: 0.28,
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
                MoEYS Aligned
              </span>{' '}
              Cambodian National Curriculum · Grades 7–12
            </span>
          </div>

          <h1 className="hero__title hero__rise" style={{ ['--i' as string]: 1, color: '#102A56' }}>
            Explore Mathematics.{' '}
            <span className="serif-italic" style={{ color: '#2457A7' }}>
              Understand Every Formula.
            </span>
            <span className="visually-hidden">Essential mathematics formulas</span>
          </h1>

          <p className="hero__lead hero__rise" style={{ ['--i' as string]: 2, color: '#64748B' }}>
            Your complete mathematics companion aligned with the Cambodian national curriculum for Grades 7–12. Discover verified formulas, master step-by-step problem solving, and explore interactive geometry.
          </p>

          <div
            className="hero__actions hero__rise"
            style={{
              ['--i' as string]: 3,
              marginTop: '2rem',
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
              Explore Mathematics <IconArrowRight className="icon-arrow" size={18} />
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
              <IconShapes size={18} /> Browse Shapes &amp; Lab
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
                Search formulas, topics and shapes
              </label>
              <input
                id="hero-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Try “quadratic formula”, “pythagorean theorem”, or “cone volume”"
                autoComplete="off"
                style={{ color: '#17263D' }}
              />
              <button
                type="submit"
                className="search-field__submit"
                aria-label="Search"
                style={{ background: '#102A56', color: '#FFFFFF' }}
              >
                <IconArrowRight size={18} />
              </button>
            </div>
            <div className="hero__suggestions">
              {popularSearches().map((term) => (
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
              <dt style={{ color: '#64748B' }}>Grades</dt>
              <dd style={{ color: '#102A56' }}>{libraryStats.gradeCount}</dd>
            </div>
            <div>
              <dt style={{ color: '#64748B' }}>Topics</dt>
              <dd style={{ color: '#102A56' }}>{libraryStats.topicCount}</dd>
            </div>
            <div>
              <dt style={{ color: '#64748B' }}>Formulas</dt>
              <dd style={{ color: '#102A56' }}>{libraryStats.formulaCount}</dd>
            </div>
            <div>
              <dt style={{ color: '#64748B' }}>Practice questions</dt>
              <dd style={{ color: '#102A56' }}>{libraryStats.exerciseCount}</dd>
            </div>
            <div>
              <dt style={{ color: '#64748B' }}>Shapes</dt>
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
                <span className="eyebrow">National Curriculum Framework</span>
                <h2 id="grades-heading">Secondary Mathematics Curriculum Tracks</h2>
                <p className="section-head__intro">
                  Structured across Cambodia's two secondary educational stages, strictly aligned with Ministry of Education, Youth and Sport (MoEYS) standards.
                </p>
              </div>
              <Link className="text-link section-head__link" to="/grades">
                All 6 grades <IconArrowRight size={14} />
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
                      Grades 7–9
                    </span>
                    <span className="badge badge--cultural" style={{ background: '#C83B45', color: '#FFFFFF' }}>
                      Diploma Track
                    </span>
                    <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 650, color: '#102A56' }}>
                      Lower Secondary Education
                    </h3>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.92rem', color: '#64748B' }}>
                    អនុវិទ្យាល័យ · Core mathematical foundations in signed numbers, linear algebra, synthetic plane geometry, and statistics leading to the National Lower Secondary Examination.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.82rem', color: '#64748B' }}>
                  <span><strong style={{ color: '#102A56' }}>3</strong> Grades</span>
                  <span><strong style={{ color: '#102A56' }}>{lowerGrades.reduce((sum, g) => sum + g.subjects.length, 0)}</strong> Subjects</span>
                  <span><strong style={{ color: '#102A56' }}>{lowerGrades.reduce((sum, g) => sum + gradeFormulaCount(g), 0)}</strong> Formulas</span>
                </div>
              </div>
            </Reveal>
            <div className="grade-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
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
                      Grades 10–12
                    </span>
                    <span className="badge badge--cultural" style={{ background: '#C83B45', color: '#FFFFFF' }}>
                      Bac II Exam (បាក់ឌុប)
                    </span>
                    <span className="badge" style={{ background: '#FEF3C7', color: '#92400E', borderColor: '#FDE68A' }}>
                      Basic &amp; Advanced Tracks
                    </span>
                    <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 650, color: '#102A56' }}>
                      Upper Secondary Education
                    </h3>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.92rem', color: '#64748B' }}>
                    វិទ្យាល័យ · Higher mathematics encompassing calculus, trigonometry, spatial coordinate geometry, probability, and complex numbers for Basic and Advanced science tracks.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.82rem', color: '#64748B' }}>
                  <span><strong style={{ color: '#102A56' }}>3</strong> Grades</span>
                  <span><strong style={{ color: '#102A56' }}>{upperGrades.reduce((sum, g) => sum + g.subjects.length, 0)}</strong> Subjects</span>
                  <span><strong style={{ color: '#102A56' }}>{upperGrades.reduce((sum, g) => sum + gradeFormulaCount(g), 0)}</strong> Formulas</span>
                </div>
              </div>
            </Reveal>
            <div className="grade-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
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
                <span className="eyebrow">Popular subjects</span>
                <h2 id="subjects-heading">Jump straight to a branch of mathematics.</h2>
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
                  <span className="family-card__title">{item.meta?.label}</span>
                  <span className="family-card__desc">{item.meta?.description}</span>
                  <span className="family-card__foot">
                    {item.topics} topics · {item.formulas} formulas · Grades{' '}
                    {item.gradeNumbers.length > 1
                      ? `${item.gradeNumbers[0]}–${item.gradeNumbers[item.gradeNumbers.length - 1]}`
                      : item.gradeNumbers[0]}
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
                <span className="eyebrow">Featured formulas</span>
                <h2 id="formulas-heading">Formulas worth knowing by heart.</h2>
                <p className="section-head__intro">Every formula lists its variables, conditions and a worked example.</p>
              </div>
              <Link className="text-link section-head__link" to="/formulas">
                Formula index <IconArrowRight size={14} />
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
                <span className="eyebrow eyebrow--lime">Shape Lab</span>
                <h2 id="shapes-heading">Change a dimension. Watch the mathematics respond.</h2>
                <p className="section-head__intro" style={{ color: 'var(--hero-muted)' }}>
                  {libraryStats.shape2dCount} flat shapes and {libraryStats.shape3dCount} solids. Drag to rotate, zoom, and
                  see perimeter, area, surface area and volume update live.
                </p>
              </div>
              <Link className="btn btn--lime" to="/shapes">
                <IconShapes size={16} /> Open the Shape Lab
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

      <section className="section section--tight" aria-labelledby="personal-heading">
        <div className="container">
          <h2 id="personal-heading" className="visually-hidden">
            Your recent activity and bookmarks
          </h2>
          <div className="duo">
            <Reveal className="panel panel__pad">
              <span className="eyebrow">Recently explored</span>
              {recents.length === 0 ? (
                <p className="muted" style={{ marginTop: '1rem' }}>
                  Topics, formulas and shapes you open will appear here, saved only in this browser.
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
                      label = ref.topic.title
                      href = topicUrl(ref)
                      kind = `Grade ${ref.grade.number} topic`
                    } else if (visit.kind === 'shape') {
                      const shape = findShape(visit.id)
                      if (!shape) return null
                      label = shape.name
                      href = shapeHref(shape.id)
                      kind = 'Shape'
                    } else {
                      const ref = findFormula(visit.id)
                      if (!ref) return null
                      label = ref.formula.title
                      href = formulaHref(ref.formula.id)
                      kind = 'Formula'
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
              <span className="eyebrow">Your bookmarks</span>
              <p style={{ marginTop: '1rem', fontSize: '1.05rem' }}>
                {bookmarks.length === 0
                  ? 'Nothing saved yet. Tap the bookmark icon on any formula, topic or shape.'
                  : `${bookmarks.length} saved ${bookmarks.length === 1 ? 'item' : 'items'}, ready whenever you are.`}
              </p>
              <Link to="/bookmarks" className="btn btn--secondary" style={{ marginTop: '1.25rem' }}>
                <IconBookmark size={16} /> Open bookmarks
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
                <span className="eyebrow">Learning resources</span>
                <h2 id="method-heading">A three-pass method that actually sticks.</h2>
              </div>
            </div>
          </Reveal>
          <ol className="method">
            {[
              ['Understand', 'Read the introduction and theory. Ask why the formula is true before memorising it.'],
              ['Follow', 'Step through a worked example one line at a time, then cover the solution and redo it.'],
              ['Practise', 'Answer the exercises, read each explanation, and retry until you can explain every step.'],
            ].map(([title, text], index) => (
              <Reveal as="li" key={title} delay={Math.min(index, 5) as 0 | 1 | 2 | 3 | 4 | 5} className="method__step">
                <span className="method__num">{index + 1}</span>
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
