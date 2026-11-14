import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import type { GradeId, SearchResultKind, SubjectFamily } from '../types/content'
import { grades } from '../data'
import { highlightParts, popularSearches, resultsHref, searchContent, subjectFilterOptions, type SearchHit } from '../lib/search'
import { EmptyState } from '../components/ui/EmptyState'
import { PageHero } from '../components/ui/PageHero'
import { IconBook, IconFormula, IconSearch, IconShapes } from '../components/ui/Icons'

const GROUPS: { kind: SearchResultKind; label: string }[] = [
  { kind: 'formula', label: 'Formulas' },
  { kind: 'topic', label: 'Topics' },
  { kind: 'subject', label: 'Subjects' },
  { kind: 'shape', label: 'Shapes' },
]

function Highlight({ text, query }: { text: string; query: string }) {
  return (
    <>
      {highlightParts(text, query).map((part, index) =>
        part.match ? <mark key={index}>{part.text}</mark> : <span key={index}>{part.text}</span>,
      )}
    </>
  )
}

function ResultItem({ hit, query }: { hit: SearchHit; query: string }) {
  const icon = hit.kind === 'formula' ? <IconFormula size={16} /> : hit.kind === 'shape' ? <IconShapes size={16} /> : <IconBook size={16} />
  return (
    <li>
      <Link className="result-card" to={hit.href}>
        <span className="search-result__icon">{icon}</span>
        <span className="result-card__body">
          <span className="result-card__title">
            <Highlight text={hit.title} query={query} />
          </span>
          <span className="result-card__meta">
            {hit.badges.slice(1).map((badge) => (
              <span key={badge} className="badge badge--outline">
                {badge}
              </span>
            ))}
          </span>
          <span className="result-card__desc">
            <Highlight text={hit.description.length > 170 ? `${hit.description.slice(0, 167)}…` : hit.description} query={query} />
          </span>
        </span>
      </Link>
    </li>
  )
}

export default function SearchPage() {
  const [params, setParams] = useSearchParams()
  const query = params.get('q') ?? ''
  const grade = (params.get('grade') ?? 'all') as GradeId | 'all'
  const subject = (params.get('subject') ?? 'all') as SubjectFamily | 'all'
  const subjects = useMemo(() => subjectFilterOptions(), [])

  const hits = useMemo(
    () => (query.trim() ? searchContent(query, { filters: { grade, subject } }) : []),
    [query, grade, subject],
  )
  const grouped = useMemo(
    () => GROUPS.map((group) => ({ ...group, items: hits.filter((hit) => hit.kind === group.kind) })).filter((group) => group.items.length > 0),
    [hits],
  )

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params)
    if (!value || value === 'all') next.delete(key)
    else next.set(key, value)
    setParams(next, { replace: true })
  }

  const hasFilters = grade !== 'all' || subject !== 'all'

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Search' }]}
        eyebrow="Search"
        title="Find any formula, topic or shape."
        intro="Search by name, symbol or alternative term, for example “Pythagoras”, “area of a circle” or “sin cos tan”."
        aside={
          <form className="search-field search-field--dark" role="search" style={{ width: '100%' }} onSubmit={(event) => event.preventDefault()}>
            <IconSearch size={20} />
            <label htmlFor="search-page-input" className="visually-hidden">
              Search the library
            </label>
            <input
              id="search-page-input"
              type="search"
              value={query}
              onChange={(event) => update('q', event.target.value)}
              placeholder="Search formulas, topics, shapes…"
              autoComplete="off"
              autoFocus
            />
          </form>
        }
      />

      <section className="section section--tight">
        <div className="container container--narrow">
          <div className="filter-bar">
            <div className="filter-group">
              <label className="filter-group__label" htmlFor="search-grade">
                Grade
              </label>
              <select id="search-grade" className="select" value={grade} onChange={(e) => update('grade', e.target.value)}>
                <option value="all">All grades</option>
                {grades.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
              </select>
              <label className="filter-group__label" htmlFor="search-subject" style={{ marginLeft: '0.75rem' }}>
                Subject
              </label>
              <select id="search-subject" className="select" value={subject} onChange={(e) => update('subject', e.target.value)}>
                <option value="all">All subjects</option>
                {subjects.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
            {hasFilters && (
              <button type="button" className="btn btn--ghost btn--sm" onClick={() => setParams(query ? { q: query } : {}, { replace: true })}>
                Clear filters
              </button>
            )}
          </div>

          <p className="muted" style={{ margin: '1.5rem 0', fontSize: '0.85rem' }} aria-live="polite" role="status">
            {query.trim()
              ? `${hits.length} ${hits.length === 1 ? 'result' : 'results'} for “${query.trim()}”`
              : 'Type to search the whole library.'}
          </p>

          {!query.trim() && (
            <EmptyState title="What would you like to find?" icon={<IconSearch size={22} />}>
              Try one of these popular searches.
              <span className="empty-state__actions" style={{ display: 'flex' }}>
                {popularSearches().map((term) => (
                  <Link key={term} className="chip" to={resultsHref(term)}>
                    {term}
                  </Link>
                ))}
              </span>
            </EmptyState>
          )}

          {query.trim() && hits.length === 0 && (
            <EmptyState
              title={`No results for “${query.trim()}”`}
              actions={[
                { label: 'Browse grades', to: '/grades' },
                { label: 'Open the Shape Lab', to: '/shapes' },
                { label: 'Formula index', to: '/formulas' },
              ]}
            >
              {hasFilters
                ? 'Your grade or subject filter may be too narrow. Clear the filters, or try a broader term.'
                : 'Check the spelling, or try a broader term such as “triangle”, “quadratic” or “probability”.'}
            </EmptyState>
          )}

          {grouped.map((group) => (
            <section key={group.kind} className="result-group" aria-labelledby={`group-${group.kind}`}>
              <h2 id={`group-${group.kind}`} className="result-group__title">
                {group.label} <span>{group.items.length}</span>
              </h2>
              <ul className="result-list">
                {group.items.slice(0, 30).map((hit) => (
                  <ResultItem key={hit.id} hit={hit} query={query} />
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>
    </>
  )
}
