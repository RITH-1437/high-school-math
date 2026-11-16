import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import type { GradeId, SearchResultKind, SubjectFamily } from '../types/content'
import {
  gradeOptions,
  highlightParts,
  popularSearches,
  resultsHref,
  searchContent,
  subjectFilterOptions,
  type SearchHit,
} from '../lib/search'
import { EmptyState } from '../components/ui/EmptyState'
import { PageHero } from '../components/ui/PageHero'
import { IconBook, IconFormula, IconSearch, IconShapes } from '../components/ui/Icons'
import { useI18n } from '../lib/i18n'
import { findFormula, findShape, findTopic, getSubjectRef } from '../data'
import { formulaContent, shapeCopy, subjectCopy, topicContent } from '../i18n/content'
import type { Language } from '../i18n/types'

const KHMER_SCRIPT = /[ក-៿]/

/** The first candidate written in Khmer script, otherwise the English fallback. */
function preferKhmer(fallback: string, ...candidates: (string | undefined)[]): string {
  return candidates.find((text) => text && KHMER_SCRIPT.test(text)) ?? fallback
}

/** Result cards render plain text, so skip long-form copy that carries inline LaTeX. */
function plainOnly(text: string | undefined): string | undefined {
  return text && !text.includes('$') ? text : undefined
}

/**
 * Search documents carry Khmer titles, but some descriptions fall back to the
 * English source. Re-read the localized copy for the hit so Khmer mode shows
 * Khmer wherever a translation exists.
 */
function localizeHit(hit: SearchHit, language: Language): SearchHit {
  if (language !== 'km') return hit
  const [kind, ...rest] = hit.id.split(':')
  if (kind === 'formula') {
    const ref = findFormula(rest[0])
    if (!ref) return hit
    const formula = formulaContent(ref.formula, 'km')
    return {
      ...hit,
      title: preferKhmer(hit.title, formula.title),
      description: preferKhmer(hit.description, formula.description, plainOnly(formula.spoken)),
    }
  }
  if (kind === 'topic') {
    const ref = findTopic(rest[0])
    if (!ref) return hit
    const topic = topicContent(ref.topic, 'km')
    return {
      ...hit,
      title: preferKhmer(hit.title, topic.title),
      description: preferKhmer(hit.description, topic.subtitle, plainOnly(topic.introduction)),
    }
  }
  if (kind === 'subject') {
    const ref = getSubjectRef(rest[0], rest[1])
    if (!ref) return hit
    const copy = subjectCopy(ref.grade.id, ref.subject, 'km')
    return { ...hit, title: preferKhmer(hit.title, copy.title), description: preferKhmer(hit.description, copy.description) }
  }
  if (kind === 'shape') {
    const shape = findShape(rest[0])
    if (!shape) return hit
    const copy = shapeCopy(shape, 'km')
    return { ...hit, title: preferKhmer(hit.title, copy.name), description: preferKhmer(hit.description, copy.tagline) }
  }
  return hit
}

function Highlight({ text, query }: { text: string; query: string }) {
  return (
    <>
      {highlightParts(text, query).map((part, index) =>
        part.match ? <mark key={index}>{part.text}</mark> : <span key={index}>{part.text}</span>,
      )}
    </>
  )
}

function ResultItem({ hit: rawHit, query }: { hit: SearchHit; query: string }) {
  const { language } = useI18n()
  const hit = localizeHit(rawHit, language)
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
  const { language, isKhmer, t, num } = useI18n()
  const query = params.get('q') ?? ''
  const [inputValue, setInputValue] = useState(query)
  const grade = (params.get('grade') ?? 'all') as GradeId | 'all'
  const subject = (params.get('subject') ?? 'all') as SubjectFamily | 'all'
  const gradeOpts = useMemo(() => gradeOptions(language), [language])
  const subjects = useMemo(() => subjectFilterOptions(language), [language])

  // Sync local input with query param on external navigation
  useEffect(() => {
    setInputValue(query)
  }, [query])

  // Smoothly debounce URL updates to prevent reload loops and preserve Khmer IME composition
  useEffect(() => {
    const timer = setTimeout(() => {
      const currentParam = params.get('q') ?? ''
      if (inputValue !== currentParam) {
        const next = new URLSearchParams(params)
        if (!inputValue.trim()) next.delete('q')
        else next.set('q', inputValue)
        setParams(next, { replace: true })
      }
    }, 200)
    return () => clearTimeout(timer)
  }, [inputValue, params, setParams])

  const hits = useMemo(
    () => (query.trim() ? searchContent(query, { filters: { grade, subject }, language }) : []),
    [query, grade, subject, language],
  )

  const groups = useMemo(
    () => [
      { kind: 'formula' as SearchResultKind, label: t('search.groupFormulas') },
      { kind: 'topic' as SearchResultKind, label: t('search.groupTopics') },
      { kind: 'subject' as SearchResultKind, label: t('search.groupSubjects') },
      { kind: 'shape' as SearchResultKind, label: t('search.groupShapes') },
    ],
    [t],
  )

  const grouped = useMemo(
    () => groups.map((group) => ({ ...group, items: hits.filter((hit) => hit.kind === group.kind) })).filter((group) => group.items.length > 0),
    [hits, groups],
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
        crumbs={[{ label: t('common.home'), to: '/' }, { label: t('search.eyebrow') }]}
        eyebrow={t('search.eyebrow')}
        title={t('search.title')}
        intro={t('search.intro')}
        aside={
          <form className="search-field search-field--dark" role="search" style={{ width: '100%' }} onSubmit={(event) => event.preventDefault()}>
            <IconSearch size={20} />
            <label htmlFor="search-page-input" className="visually-hidden">
              {t('search.inputLabel')}
            </label>
            <input
              id="search-page-input"
              type="search"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault()
                  const next = new URLSearchParams(params)
                  if (!inputValue.trim()) next.delete('q')
                  else next.set('q', inputValue)
                  setParams(next, { replace: true })
                }
              }}
              placeholder={isKhmer ? 'ស្វែងរករូបមន្ត ប្រធានបទ ឬរាង…' : t('search.placeholder')}
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
                {t('search.grade')}
              </label>
              <select id="search-grade" className="select" value={grade} onChange={(e) => update('grade', e.target.value)}>
                <option value="all">{t('search.allGrades')}</option>
                {gradeOpts.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
              <label className="filter-group__label" htmlFor="search-subject" style={{ marginLeft: '0.75rem' }}>
                {t('search.subject')}
              </label>
              <select id="search-subject" className="select" value={subject} onChange={(e) => update('subject', e.target.value)}>
                <option value="all">{t('search.allSubjects')}</option>
                {subjects.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
            {hasFilters && (
              <button type="button" className="btn btn--ghost btn--sm" onClick={() => setParams(query ? { q: query } : {}, { replace: true })}>
                {t('search.clearFilters')}
              </button>
            )}
          </div>

          <p className="muted" style={{ margin: '1.5rem 0', fontSize: '0.85rem' }} aria-live="polite" role="status">
            {query.trim()
              ? hits.length === 1
                ? t('search.resultOne', { count: 1, query: query.trim() })
                : t('search.resultMany', { count: hits.length, query: query.trim() })
              : t('search.typeToSearch')}
          </p>

          {!query.trim() && (
            <EmptyState title={t('search.emptyTitle')} icon={<IconSearch size={22} />}>
              {t('search.emptyBody')}
              <span className="empty-state__actions" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.75rem' }}>
                {popularSearches(language).map((term) => (
                  <Link key={term} className="chip" to={resultsHref(term)}>
                    {term}
                  </Link>
                ))}
              </span>
            </EmptyState>
          )}

          {query.trim() && hits.length === 0 && (
            <EmptyState
              title={t('search.noResults', { query: query.trim() })}
              actions={[
                { label: t('search.browseGrades'), to: '/grades' },
                { label: t('search.openShapeLab'), to: '/shapes' },
                { label: t('search.formulaIndex'), to: '/formulas' },
              ]}
            >
              {hasFilters ? t('search.noResultsFiltered') : t('search.noResultsGeneral')}
            </EmptyState>
          )}

          {grouped.map((group) => (
            <section key={group.kind} className="result-group" aria-labelledby={`group-${group.kind}`}>
              <h2 id={`group-${group.kind}`} className="result-group__title">
                {group.label} <span>{num(group.items.length)}</span>
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
