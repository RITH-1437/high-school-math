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
import { GradeCard } from '../components/ui/GradeCard'
import { FormulaCard } from '../components/ui/FormulaCard'
import { ShapeCard } from '../components/shapes/ShapeCard'
import { Reveal } from '../components/ui/Reveal'
import { IconArrowRight, IconBookmark, IconSearch, IconShapes } from '../components/ui/Icons'

const FLOATING = [
  { symbol: 'π', top: '14%', left: '8%', size: '3.2rem', delay: '0s' },
  { symbol: '∑', top: '65%', left: '5%', size: '2.6rem', delay: '1.2s' },
  { symbol: '√x', top: '18%', left: '88%', size: '2.4rem', delay: '0.6s' },
  { symbol: '∞', top: '46%', left: '92%', size: '2.6rem', delay: '1.8s' },
  { symbol: 'θ', top: '76%', left: '84%', size: '2.8rem', delay: '2.4s' },
  { symbol: '∫', top: '10%', left: '52%', size: '2.8rem', delay: '3.0s' },
  { symbol: 'a²+b²', top: '86%', left: '46%', size: '1.5rem', delay: '1.5s' },
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
      <section className="hero on-dark">
        <div className="hero__symbols" aria-hidden="true">
          {FLOATING.map((item) => (
            <span
              key={item.symbol}
              className="hero__symbol"
              style={{ top: item.top, left: item.left, fontSize: item.size, animationDelay: item.delay }}
            >
              {item.symbol}
            </span>
          ))}
        </div>
        <div className="container hero__inner">
          <span className="eyebrow eyebrow--lime hero__rise" style={{ ['--i' as string]: 0 }}>
            Mathematics · Grades 7–12
          </span>
          <h1 className="hero__title hero__rise" style={{ ['--i' as string]: 1 }}>
            Explore Mathematics. <span className="serif-italic">Understand Every Formula.</span>
            <span className="visually-hidden">Essential mathematics formulas</span>
          </h1>
          <p className="hero__lead hero__rise" style={{ ['--i' as string]: 2 }}>
            Your complete mathematics companion for Grades 7–12. Discover formulas, understand concepts, explore geometry, and learn step by step.
          </p>
          <div className="hero__actions hero__rise" style={{ ['--i' as string]: 3, marginTop: '2rem' }}>
            <Link className="btn btn--lime btn--lg" to="/grades">
              Explore Mathematics <IconArrowRight className="icon-arrow" size={18} />
            </Link>
          </div>
          <form className="hero__search hero__rise" style={{ ['--i' as string]: 4, marginTop: '1.75rem' }} onSubmit={onSubmit} role="search">
            <div className="search-field search-field--dark">
              <IconSearch size={20} />
              <label htmlFor="hero-search" className="visually-hidden">
                Search formulas, topics and shapes
              </label>
              <input
                id="hero-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Try “quadratic formula” or “volume of a cylinder”"
                autoComplete="off"
              />
              <button type="submit" className="search-field__submit" aria-label="Search">
                <IconArrowRight size={18} />
              </button>
            </div>
            <div className="hero__suggestions">
              {popularSearches().map((term) => (
                <Link key={term} className="chip chip--sm btn--on-dark" to={resultsHref(term)}>
                  {term}
                </Link>
              ))}
            </div>
          </form>

          <dl className="hero__stats hero__rise" style={{ ['--i' as string]: 5 }}>
            <div>
              <dt>Grades</dt>
              <dd>{libraryStats.gradeCount}</dd>
            </div>
            <div>
              <dt>Topics</dt>
              <dd>{libraryStats.topicCount}</dd>
            </div>
            <div>
              <dt>Formulas</dt>
              <dd>{libraryStats.formulaCount}</dd>
            </div>
            <div>
              <dt>Practice questions</dt>
              <dd>{libraryStats.exerciseCount}</dd>
            </div>
            <div>
              <dt>Shapes</dt>
              <dd>{libraryStats.shapeCount}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="section" aria-labelledby="grades-heading">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <div className="section-head__copy">
                <span className="eyebrow">Choose your grade</span>
                <h2 id="grades-heading">Six years of mathematics, one clear path.</h2>
                <p className="section-head__intro">
                  Each grade builds on the last. Start where you are, or revisit an earlier year to fill a gap.
                </p>
              </div>
              <Link className="text-link section-head__link" to="/grades">
                All grades <IconArrowRight size={14} />
              </Link>
            </div>
          </Reveal>
          <div className="grade-grid">
            {grades.map((grade, index) => (
              <Reveal key={grade.id} delay={Math.min(index, 5) as 0 | 1 | 2 | 3 | 4 | 5}>
                <GradeCard grade={grade} />
              </Reveal>
            ))}
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
