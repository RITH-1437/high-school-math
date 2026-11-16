import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { findFormula, findShape, findTopic, formulaHref, shapeHref, topicUrl } from '../data'
import { formulaContent, shapeCopy, subjectCopy, topicCopy } from '../i18n/content'
import { useBookmarks, type BookmarkKind } from '../lib/bookmarks'
import { useI18n } from '../lib/i18n'
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
  const { language, t } = useI18n()
  const [filter, setFilter] = useState<Filter>('all')
  const [confirming, setConfirming] = useState(false)

  const { items, orphans } = useMemo(() => {
    const resolved: Item[] = []
    const missing: { kind: BookmarkKind; id: string }[] = []
    for (const entry of bookmarks) {
      if (entry.kind === 'formula') {
        const ref = findFormula(entry.id)
        if (!ref) missing.push(entry)
        else {
          const localizedFormula = formulaContent(ref.formula, language)
          const localizedTopic = topicCopy(ref.topic, language)
          resolved.push({
            key: `formula:${entry.id}`,
            kind: 'formula',
            id: entry.id,
            title: localizedFormula.title,
            context: `${t('common.gradeN', { n: ref.grade.number })} · ${localizedTopic.title}`,
            href: formulaHref(entry.id),
            expression: ref.formula.expression,
            savedAt: entry.savedAt,
          })
        }
      } else if (entry.kind === 'topic') {
        const ref = findTopic(entry.id)
        if (!ref) missing.push(entry)
        else {
          const localizedTopic = topicCopy(ref.topic, language)
          const localizedSubject = subjectCopy(ref.grade.id, ref.subject, language)
          resolved.push({
            key: `topic:${entry.id}`,
            kind: 'topic',
            id: entry.id,
            title: localizedTopic.title,
            context: `${t('common.gradeN', { n: ref.grade.number })} · ${localizedSubject.title}`,
            href: topicUrl(ref),
            savedAt: entry.savedAt,
          })
        }
      } else {
        const shape = findShape(entry.id)
        if (!shape) missing.push(entry)
        else {
          const localizedShape = shapeCopy(shape, language)
          const categoryLabel = shape.category === '2d' ? t('shapes.category2d') : t('shapes.category3d')
          resolved.push({
            key: `shape:${entry.id}`,
            kind: 'shape',
            id: entry.id,
            title: localizedShape.name,
            context: `${categoryLabel} · ${t('shapes.eyebrow')}`,
            href: shapeHref(entry.id),
            savedAt: entry.savedAt,
          })
        }
      }
    }
    return { items: resolved, orphans: missing }
  }, [bookmarks, language, t])

  const counts = {
    all: items.length,
    formula: items.filter((i) => i.kind === 'formula').length,
    topic: items.filter((i) => i.kind === 'topic').length,
    shape: items.filter((i) => i.kind === 'shape').length,
  }
  const visible = filter === 'all' ? items : items.filter((item) => item.kind === filter)

  const kindLabels: Record<BookmarkKind, string> = {
    formula: t('search.kindFormula'),
    topic: t('search.kindTopic'),
    shape: t('search.kindShape'),
  }

  return (
    <>
      <PageHero
        crumbs={[{ label: t('common.home'), to: '/' }, { label: t('nav.bookmarks') }]}
        eyebrow={t('bookmarks.eyebrow')}
        title={t('bookmarks.title')}
        intro={t('bookmarks.intro')}
      />
      <section className="section section--tight">
        <div className="container container--narrow">
          {items.length === 0 && orphans.length === 0 ? (
            <EmptyState
              icon={<IconBookmark size={22} />}
              title={t('bookmarks.emptyTitle')}
              actions={[
                { label: t('search.browseGrades'), to: '/grades' },
                { label: t('home.ctaShapes'), to: '/shapes' },
                { label: t('common.search'), to: '/search' },
              ]}
            >
              {t('bookmarks.emptyBody')}
            </EmptyState>
          ) : (
            <>
              <div className="filter-bar">
                <div className="filter-group" role="group" aria-label={t('bookmarks.filterLabel')}>
                  {(
                    [
                      ['all', t('common.all')],
                      ['formula', t('common.formulas')],
                      ['topic', t('common.topics')],
                      ['shape', t('common.shapes')],
                    ] as [Filter, string][]
                  ).map(([value, label]) => (
                    <button key={value} type="button" className="chip" aria-pressed={filter === value} onClick={() => setFilter(value)}>
                      {label} <span className="chip__count">{counts[value]}</span>
                    </button>
                  ))}
                </div>
                {confirming ? (
                  <div className="cluster" role="alertdialog" aria-label={t('bookmarks.confirmLabel')}>
                    <span style={{ fontSize: '0.85rem' }}>{t('bookmarks.confirmQuestion', { count: bookmarks.length })}</span>
                    <button
                      type="button"
                      className="btn btn--sm btn--primary"
                      onClick={() => {
                        clearBookmarks()
                        setConfirming(false)
                      }}
                    >
                      {t('bookmarks.yesClear')}
                    </button>
                    <button type="button" className="btn btn--sm btn--ghost" onClick={() => setConfirming(false)}>
                      {t('common.cancel')}
                    </button>
                  </div>
                ) : (
                  <button type="button" className="btn btn--ghost btn--sm" onClick={() => setConfirming(true)}>
                    {t('bookmarks.clearAll')}
                  </button>
                )}
              </div>

              {visible.length === 0 ? (
                <div style={{ marginTop: '2rem' }}>
                  <EmptyState title={t('bookmarks.emptyCategoryTitle')}>{t('bookmarks.emptyCategoryBody')}</EmptyState>
                </div>
              ) : (
                <ul className="bookmark-list">
                  {visible.map((item) => (
                    <li key={item.key} className="bookmark-item">
                      <Link to={item.href} className="bookmark-item__link">
                        <span className="badge badge--outline">{kindLabels[item.kind]}</span>
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
                    {orphans.length === 1
                      ? t('bookmarks.orphanOne')
                      : t('bookmarks.orphanMany', { count: orphans.length })}{' '}
                    <button
                      type="button"
                      className="text-link"
                      onClick={() => orphans.forEach((orphan) => removeBookmark(orphan.kind, orphan.id))}
                    >
                      {orphans.length === 1 ? t('bookmarks.removeIt') : t('bookmarks.removeThem')}
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
