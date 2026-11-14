import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { findFormula, findShape, findTopic, formulaHref, shapeHref, topicUrl } from '../data'
import { useBookmarks, type BookmarkKind } from '../lib/bookmarks'
import { BookmarkButton } from '../components/ui/BookmarkButton'
import { EmptyState } from '../components/ui/EmptyState'
import { MathBlock } from '../components/ui/Math'
import { PageHero } from '../components/ui/PageHero'
import { IconBookmark } from '../components/ui/Icons'

interface Item {
  key: string
  kind: BookmarkKind
  id: string
  title: string
  context: string
  href: string
  expression?: string
  savedAt: number
}

type Filter = 'all' | BookmarkKind

export default function BookmarksPage() {
  const { bookmarks, clearBookmarks, removeBookmark } = useBookmarks()
  const [filter, setFilter] = useState<Filter>('all')
  const [confirming, setConfirming] = useState(false)

  const { items, orphans } = useMemo(() => {
    const resolved: Item[] = []
    const missing: { kind: BookmarkKind; id: string }[] = []
    for (const entry of bookmarks) {
      if (entry.kind === 'formula') {
        const ref = findFormula(entry.id)
        if (!ref) missing.push(entry)
        else
          resolved.push({
            key: `formula:${entry.id}`,
            kind: 'formula',
            id: entry.id,
            title: ref.formula.title,
            context: `Grade ${ref.grade.number} · ${ref.topic.title}`,
            href: formulaHref(entry.id),
            expression: ref.formula.expression,
            savedAt: entry.savedAt,
          })
      } else if (entry.kind === 'topic') {
        const ref = findTopic(entry.id)
        if (!ref) missing.push(entry)
        else
          resolved.push({
            key: `topic:${entry.id}`,
            kind: 'topic',
            id: entry.id,
            title: ref.topic.title,
            context: `Grade ${ref.grade.number} · ${ref.subject.title}`,
            href: topicUrl(ref),
            savedAt: entry.savedAt,
          })
      } else {
        const shape = findShape(entry.id)
        if (!shape) missing.push(entry)
        else
          resolved.push({
            key: `shape:${entry.id}`,
            kind: 'shape',
            id: entry.id,
            title: shape.name,
            context: `${shape.category === '2d' ? '2D shape' : '3D solid'} · Shape Lab`,
            href: shapeHref(entry.id),
            savedAt: entry.savedAt,
          })
      }
    }
    return { items: resolved, orphans: missing }
  }, [bookmarks])

  const counts = {
    all: items.length,
    formula: items.filter((i) => i.kind === 'formula').length,
    topic: items.filter((i) => i.kind === 'topic').length,
    shape: items.filter((i) => i.kind === 'shape').length,
  }
  const visible = filter === 'all' ? items : items.filter((item) => item.kind === filter)

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Bookmarks' }]}
        eyebrow="Saved on this device"
        title="Your bookmarks"
        intro="Formulas, topics and shapes you’ve saved. They are stored only in this browser, so they stay private and survive a refresh."
      />
      <section className="section section--tight">
        <div className="container container--narrow">
          {items.length === 0 && orphans.length === 0 ? (
            <EmptyState
              icon={<IconBookmark size={22} />}
              title="No bookmarks yet"
              actions={[
                { label: 'Browse grades', to: '/grades' },
                { label: 'Explore shapes', to: '/shapes' },
                { label: 'Search', to: '/search' },
              ]}
            >
              Tap the bookmark icon on any formula, topic or shape to keep it here for quick access.
            </EmptyState>
          ) : (
            <>
              <div className="filter-bar">
                <div className="filter-group" role="group" aria-label="Filter bookmarks">
                  {(
                    [
                      ['all', 'All'],
                      ['formula', 'Formulas'],
                      ['topic', 'Topics'],
                      ['shape', 'Shapes'],
                    ] as [Filter, string][]
                  ).map(([value, label]) => (
                    <button key={value} type="button" className="chip" aria-pressed={filter === value} onClick={() => setFilter(value)}>
                      {label} <span className="chip__count">{counts[value]}</span>
                    </button>
                  ))}
                </div>
                {confirming ? (
                  <div className="cluster" role="alertdialog" aria-label="Confirm clearing all bookmarks">
                    <span style={{ fontSize: '0.85rem' }}>Remove all {bookmarks.length} bookmarks?</span>
                    <button
                      type="button"
                      className="btn btn--sm btn--primary"
                      onClick={() => {
                        clearBookmarks()
                        setConfirming(false)
                      }}
                    >
                      Yes, clear
                    </button>
                    <button type="button" className="btn btn--sm btn--ghost" onClick={() => setConfirming(false)}>
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button type="button" className="btn btn--ghost btn--sm" onClick={() => setConfirming(true)}>
                    Clear all
                  </button>
                )}
              </div>

              {visible.length === 0 ? (
                <div style={{ marginTop: '2rem' }}>
                  <EmptyState title="Nothing in this category yet">Save a few items and they’ll appear here.</EmptyState>
                </div>
              ) : (
                <ul className="bookmark-list">
                  {visible.map((item) => (
                    <li key={item.key} className="bookmark-item">
                      <Link to={item.href} className="bookmark-item__link">
                        <span className="badge badge--outline">{item.kind}</span>
                        <span className="bookmark-item__title">{item.title}</span>
                        <span className="muted" style={{ fontSize: '0.8rem' }}>
                          {item.context}
                        </span>
                        {item.expression && (
                          <span className="bookmark-item__math">
                            <MathBlock tex={item.expression} display={false} />
                          </span>
                        )}
                      </Link>
                      <BookmarkButton kind={item.kind} id={item.id} label={item.title} iconOnly />
                    </li>
                  ))}
                </ul>
              )}

              {orphans.length > 0 && (
                <div className="callout callout--warn" style={{ marginTop: '2rem' }}>
                  <div>
                    {orphans.length} saved {orphans.length === 1 ? 'item is' : 'items are'} no longer in the library.{' '}
                    <button
                      type="button"
                      className="text-link"
                      onClick={() => orphans.forEach((orphan) => removeBookmark(orphan.kind, orphan.id))}
                    >
                      Remove {orphans.length === 1 ? 'it' : 'them'}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}
