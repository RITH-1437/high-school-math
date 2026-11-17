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
import { useI18n } from '../lib/i18n'
import { kmAliases, kmShapes, shapeTerm } from '../i18n/content'
import { localizeShape } from '../i18n/shapes-km'

type Category = 'all' | '2d' | '3d'

export default function ShapesPage() {
  const { shapeId } = useParams()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<Category>('all')
  const { language, num, t } = useI18n()

  const requested = shapeId ? findShape(shapeId) : undefined
  const selected = requested ?? shapes[0]
  const localized = useMemo(() => localizeShape(selected, language), [selected, language])

  useEffect(() => {
    if (requested) recordVisit('shape', requested.id)
  }, [requested])

  const filtered = useMemo(() => {
    const normalized = normalizeSearchText(query)
    return shapes.filter((shape) => {
      if (category !== 'all' && shape.category !== category) return false
      if (!normalized) return true
      const copy = kmShapes[shape.id]
      const aliases = shape.aliases ?? []
      // Search both languages so a Khmer query still finds Latin-authored shapes.
      const haystack = normalizeSearchText(
        [
          shape.name,
          shape.tagline,
          ...aliases,
          ...aliases.map((alias) => shapeTerm(alias, 'km')),
          copy?.name,
          copy?.tagline,
          ...(kmAliases[shape.id] ?? []),
        ]
          .filter(Boolean)
          .join(' '),
      )
      return normalized.split(' ').every((term) => haystack.includes(term))
    })
  }, [query, category])

  if (shapeId && !requested) {
    return <NotFoundPage message={t('shapes.notFound', { id: shapeId })} />
  }

  const count2d = shapes.filter((s) => s.category === '2d').length
  const count3d = shapes.filter((s) => s.category === '3d').length

  return (
    <>
      <PageHero
        variant="lab"
        crumbs={[
          { label: t('common.home'), to: '/' },
          { label: t('shapes.crumb'), to: shapeId ? '/shapes' : undefined },
          ...(shapeId ? [{ label: localized.name }] : []),
        ]}
        eyebrow={t('shapes.eyebrow')}
        title={localized.name}
        intro={localized.tagline}
        meta={
          <>
            <span>
              <strong>{num(count2d)}</strong> {t('shapes.meta2d')}
            </span>
            <span>
              <strong>{num(count3d)}</strong> {t('shapes.meta3d')}
            </span>
            <span>{t('shapes.metaHint')}</span>
          </>
        }
      />

      <section className="lab-section" aria-label={t('shapes.labAria', { name: localized.name })}>
        <div className="container">
          <ShapeLab key={selected.id} shape={localized} />
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <ShapeReference key={selected.id} shape={localized} />
        </div>
      </section>

      <section className="section section--sunken" id="collection" aria-labelledby="collection-heading">
        <div className="container">
          <div className="section-head">
            <div className="section-head__copy">
              <span className="eyebrow">{t('shapes.collectionEyebrow')}</span>
              <h2 id="collection-heading">{t('shapes.allShapes')}</h2>
            </div>
          </div>
          <div className="filter-bar" style={{ marginBottom: '2rem' }}>
            <div className="search-field" style={{ maxWidth: '26rem' }}>
              <IconSearch size={18} />
              <label htmlFor="shape-search" className="visually-hidden">
                {t('shapes.searchLabel')}
              </label>
              <input
                id="shape-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t('shapes.searchPlaceholder')}
                autoComplete="off"
              />
            </div>
            <div className="filter-group" role="group" aria-label={t('shapes.filterLabel')}>
              {(
                [
                  ['all', t('shapes.allCount', { count: shapes.length })],
                  ['2d', t('shapes.twoDCount', { count: count2d })],
                  ['3d', t('shapes.threeDCount', { count: count3d })],
                ] as [Category, string][]
              ).map(([value, label]) => (
                <button key={value} type="button" className="chip" aria-pressed={category === value} onClick={() => setCategory(value)}>
                  {label}
                </button>
              ))}
            </div>
          </div>
          <p className="visually-hidden" aria-live="polite">
            {t('shapes.shown', { count: filtered.length })}
          </p>
          {filtered.length === 0 ? (
            <EmptyState
              title={t('shapes.emptyTitle', { query })}
              actions={[{ label: t('shapes.browseFormulaIndex'), to: '/formulas' }]}
            >
              {t('shapes.emptyBody')}
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
