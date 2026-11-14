import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { findShape } from '../data'
import { shapes } from '../data/shapes'
import { normalizeSearchText } from '../lib/search'
import { recordVisit } from '../lib/progress'
import { EmptyState } from '../components/ui/EmptyState'
import { PageHero } from '../components/ui/PageHero'
import { IconSearch } from '../components/ui/Icons'
import { ShapeCard } from '../components/shapes/ShapeCard'
import { ShapeLab, ShapeReference } from '../components/shapes/ShapeLab'
import NotFoundPage from './NotFoundPage'

type Category = 'all' | '2d' | '3d'

export default function ShapesPage() {
  const { shapeId } = useParams()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<Category>('all')

  const requested = shapeId ? findShape(shapeId) : undefined
  const selected = requested ?? shapes[0]

  useEffect(() => {
    if (requested) recordVisit('shape', requested.id)
  }, [requested])

  const filtered = useMemo(() => {
    const normalized = normalizeSearchText(query)
    return shapes.filter((shape) => {
      if (category !== 'all' && shape.category !== category) return false
      if (!normalized) return true
      const haystack = normalizeSearchText([shape.name, shape.tagline, ...(shape.aliases ?? [])].join(' '))
      return normalized.split(' ').every((term) => haystack.includes(term))
    })
  }, [query, category])

  if (shapeId && !requested) {
    return <NotFoundPage message={`There is no shape called “${shapeId}”. Pick one from the Shape Lab.`} />
  }

  const count2d = shapes.filter((s) => s.category === '2d').length
  const count3d = shapes.filter((s) => s.category === '3d').length

  return (
    <>
      <PageHero
        variant="lab"
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Shapes', to: shapeId ? '/shapes' : undefined }, ...(shapeId ? [{ label: selected.name }] : [])]}
        eyebrow="Shape Lab"
        title={selected.name}
        intro={selected.tagline}
        meta={
          <>
            <span>
              <strong>{count2d}</strong> 2D shapes
            </span>
            <span>
              <strong>{count3d}</strong> 3D solids
            </span>
            <span>Drag, zoom and resize to explore</span>
          </>
        }
      />

      <section className="lab-section" aria-label={`${selected.name} interactive lab`}>
        <div className="container">
          <ShapeLab key={selected.id} shape={selected} />
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <ShapeReference key={selected.id} shape={selected} />
        </div>
      </section>

      <section className="section section--sunken" id="collection" aria-labelledby="collection-heading">
        <div className="container">
          <div className="section-head">
            <div className="section-head__copy">
              <span className="eyebrow">Collection</span>
              <h2 id="collection-heading">All shapes</h2>
            </div>
          </div>
          <div className="filter-bar" style={{ marginBottom: '2rem' }}>
            <div className="search-field" style={{ maxWidth: '26rem' }}>
              <IconSearch size={18} />
              <label htmlFor="shape-search" className="visually-hidden">
                Search shapes
              </label>
              <input
                id="shape-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search shapes, e.g. cone or trapezium"
                autoComplete="off"
              />
            </div>
            <div className="filter-group" role="group" aria-label="Filter by category">
              {(
                [
                  ['all', `All (${shapes.length})`],
                  ['2d', `2D (${count2d})`],
                  ['3d', `3D (${count3d})`],
                ] as [Category, string][]
              ).map(([value, label]) => (
                <button key={value} type="button" className="chip" aria-pressed={category === value} onClick={() => setCategory(value)}>
                  {label}
                </button>
              ))}
            </div>
          </div>
          <p className="visually-hidden" aria-live="polite">
            {filtered.length} shapes shown
          </p>
          {filtered.length === 0 ? (
            <EmptyState
              title={`No shapes match “${query}”`}
              actions={[{ label: 'Browse the formula index', to: '/formulas' }]}
            >
              Try a different name, such as “circle”, “prism” or “trapezium”, or clear the category filter.
            </EmptyState>
          ) : (
            <div className="shape-grid shape-grid--gallery">
              {filtered.map((shape) => (
                <ShapeCard key={shape.id} shape={shape} active={shape.id === selected.id} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
