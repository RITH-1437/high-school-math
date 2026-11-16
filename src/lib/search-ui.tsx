import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react'
import type { FormEvent, KeyboardEvent, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  highlightParts,
  popularSearches,
  resultsHref,
  searchContent,
  type SearchHit,
} from './search'
import { IconArrowRight, IconBook, IconClose, IconFormula, IconSearch, IconShapes } from '../components/ui/Icons'
import { useI18n } from './i18n'

interface SearchUIContextValue {
  isOpen: boolean
  openSearch: (query?: string) => void
  closeSearch: () => void
}

const SearchUIContext = createContext<SearchUIContextValue | null>(null)

function resultIcon(kind: SearchHit['kind']) {
  if (kind === 'formula') return <IconFormula size={15} />
  if (kind === 'shape') return <IconShapes size={15} />
  return <IconBook size={15} />
}

function Highlighted({ text, query }: { text: string; query: string }) {
  return (
    <>
      {highlightParts(text, query).map((part, index) =>
        part.match ? <mark key={index}>{part.text}</mark> : <span key={index}>{part.text}</span>,
      )}
    </>
  )
}

function SearchDialog() {
  const { isOpen, closeSearch } = useSearchUI()
  const { language, t } = useI18n()
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const previousFocus = useRef<Element | null>(null)
  const navigate = useNavigate()
  const location = useLocation()
  const titleId = useId()
  const inputId = useId()

  const results = useMemo(() => (query.trim() ? searchContent(query, { limit: 16, language }) : []), [query, language])
  const suggestions = useMemo(() => popularSearches(language), [language])

  useEffect(() => {
    if (!isOpen) return
    previousFocus.current = document.activeElement
    document.body.classList.add('no-scroll')
    const timer = window.setTimeout(() => inputRef.current?.focus(), 20)
    return () => {
      window.clearTimeout(timer)
      document.body.classList.remove('no-scroll')
      if (previousFocus.current instanceof HTMLElement) previousFocus.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    setActiveIndex(0)
  }, [query, isOpen])

  useEffect(() => {
    if (!isOpen) return
    closeSearch()
    // Close when navigating to a new page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  const openResult = useCallback(
    (href: string) => {
      closeSearch()
      navigate(href)
    },
    [closeSearch, navigate],
  )

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (results.length > 0) {
      openResult(results[activeIndex]?.href ?? results[0].href)
    } else if (query.trim()) {
      closeSearch()
      navigate(resultsHref(query))
    }
  }

  const onInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((index) => (results.length === 0 ? 0 : Math.min(index + 1, results.length - 1)))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((index) => Math.max(index - 1, 0))
    } else if (event.key === 'Escape') {
      event.preventDefault()
      closeSearch()
    }
  }

  const onDialogKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab') return
    const container = dialogRef.current
    if (!container) return
    const focusables = container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )
    if (focusables.length === 0) return
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  if (!isOpen) return null

  return createPortal(
    <div
      className="search-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closeSearch()
      }}
    >
      <div
        ref={dialogRef}
        className="search-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onKeyDown={onDialogKeyDown}
      >
        <h2 id={titleId} className="visually-hidden">
          {t('search.dialogTitle')}
        </h2>
        <form className="search-dialog__head" onSubmit={onSubmit} role="search">
          <IconSearch size={21} />
          <label htmlFor={inputId} className="visually-hidden">
            {t('search.dialogInputLabel')}
          </label>
          <input
            ref={inputRef}
            id={inputId}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={onInputKeyDown}
            placeholder={t('search.placeholder')}
            autoComplete="off"
            spellCheck={false}
            aria-controls="search-dialog-results"
            aria-activedescendant={results[activeIndex] ? `search-option-${activeIndex}` : undefined}
          />
          <button type="button" className="icon-button" aria-label={t('search.dialogClose')} onClick={closeSearch}>
            <IconClose size={19} />
          </button>
        </form>

        <div className="search-dialog__body" id="search-dialog-results">
          {!query.trim() && (
            <div style={{ padding: '0.8rem 0.6rem 1.2rem' }}>
              <div className="search-dialog__group-label">{t('search.dialogTry')}</div>
              <div className="cluster" style={{ paddingInline: '0.3rem' }}>
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    className="chip chip--sm"
                    onClick={() => {
                      setQuery(suggestion)
                      inputRef.current?.focus()
                    }}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
              <div style={{ padding: '1rem 0.3rem 0', color: 'var(--muted)', fontSize: '0.82rem' }}>
                {t('search.dialogHint')}{' '}
                <button type="button" className="text-link" onClick={() => setQuery('sin cos tan')}>
                  {t('search.dialogTrySin')}
                </button>
                .
              </div>
            </div>
          )}

          {query.trim() && results.length === 0 && (
            <div className="search-dialog__empty">
              <h3>{t('search.noResults', { query: query.trim() })}</h3>
              <p>
                {t('search.dialogEmptyBody')}
              </p>
              <div className="empty-state__actions">
                <Link className="btn btn--sm btn--secondary" to="/grades" onClick={closeSearch}>
                  {t('search.dialogBrowse')}
                </Link>
                <Link className="btn btn--sm btn--secondary" to="/shapes" onClick={closeSearch}>
                  {t('search.dialogOpenLab')}
                </Link>
              </div>
            </div>
          )}

          {results.length > 0 && (
            <ul style={{ listStyle: 'none' }}>
              {results.map((result, index) => {
                const kindLabel =
                  result.kind === 'formula'
                    ? t('search.kindFormula')
                    : result.kind === 'shape'
                      ? t('search.kindShape')
                      : result.kind === 'topic'
                        ? t('search.kindTopic')
                        : t('search.kindSubject')
                return (
                  <li key={result.id}>
                    <Link
                      to={result.href}
                      id={`search-option-${index}`}
                      className={`search-result${index === activeIndex ? ' is-active' : ''}`}
                      aria-selected={index === activeIndex}
                      role="option"
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={(event) => {
                        event.preventDefault()
                        openResult(result.href)
                      }}
                    >
                      <span className="search-result__icon">{resultIcon(result.kind)}</span>
                      <span className="search-result__body">
                        <span className="search-result__title">
                          <Highlighted text={result.title} query={query} />
                          <span className="search-result__kind">{kindLabel}</span>
                        </span>
                        <span className="search-result__path">
                          {result.badges.slice(1).join(' · ')} — <Highlighted text={result.description} query={query} />
                        </span>
                      </span>
                      <IconArrowRight size={15} className="search-result__enter" />
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        <div className="search-dialog__foot">
          <div className="search-dialog__keys">
            <span>
              <kbd className="kbd">↑</kbd>
              <kbd className="kbd">↓</kbd> {t('search.navigate')}
            </span>
            <span>
              <kbd className="kbd">↵</kbd> {t('search.open')}
            </span>
            <span>
              <kbd className="kbd">esc</kbd> {t('search.closeKey')}
            </span>
          </div>
          {query.trim() && (
            <Link
              to={resultsHref(query)}
              className="text-link"
              onClick={closeSearch}
              style={{ fontSize: '0.74rem' }}
            >
              {t('search.allResults')} <IconArrowRight size={13} />
            </Link>
          )}
        </div>
      </div>
    </div>,
    document.body,
  )
}

export function SearchProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openSearch = useCallback(() => setIsOpen(true), [])
  const closeSearch = useCallback(() => setIsOpen(false), [])

  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      const typing =
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.tagName === 'SELECT' ||
        target?.isContentEditable
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setIsOpen((open) => !open)
      } else if (event.key === '/' && !typing && !event.metaKey && !event.ctrlKey && !event.altKey) {
        event.preventDefault()
        setIsOpen(true)
      } else if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const value = useMemo(() => ({ isOpen, openSearch, closeSearch }), [isOpen, openSearch, closeSearch])

  return (
    <SearchUIContext.Provider value={value}>
      {children}
      <SearchDialog />
    </SearchUIContext.Provider>
  )
}

export function useSearchUI(): SearchUIContextValue {
  const context = useContext(SearchUIContext)
  if (!context) throw new Error('useSearchUI must be used inside SearchProvider')
  return context
}
