import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  enrichedGlossaryTerms,
  KHMER_CONSONANTS_ALPHABET,
  ENGLISH_ALPHABET,
  type EnrichedTerm,
  type IndexingSystem,
  type GlossaryViewMode,
} from '../data/glossary-enriched'
import { type GlossaryGroup } from '../i18n/glossary'
import { useI18n } from '../lib/i18n'
import { normalizeSearchText } from '../lib/search'
import { PageHero } from '../components/ui/PageHero'
import { EmptyState } from '../components/ui/EmptyState'
import {
  IconBook,
  IconCheck,
  IconCopy,
  IconEye,
  IconEyeOff,
  IconSearch,
  IconSpark,
} from '../components/ui/Icons'
import { MathBlock, RichText } from '../components/ui/Math'
import '../styles/pages.css'

type FilterGroup = 'all' | GlossaryGroup
type ExamFilter = 'all' | 'diploma' | 'bac2'

const GROUP_LABELS: Record<GlossaryGroup, { en: string; km: string; color: string; bg: string }> = {
  number: {
    en: 'Number & Algebra',
    km: 'ចំនួន និងពិជគណិត',
    color: '#2457A7',
    bg: 'rgba(36, 87, 167, 0.12)',
  },
  geometry: {
    en: 'Geometry & Shapes',
    km: 'ធរណីមាត្រ និងរាង',
    color: '#0D9488',
    bg: 'rgba(13, 148, 136, 0.12)',
  },
  trigonometry: {
    en: 'Trigonometry',
    km: 'ត្រីកោណមាត្រ',
    color: '#D6A84B',
    bg: 'rgba(214, 168, 75, 0.15)',
  },
  data: {
    en: 'Statistics & Probability',
    km: 'ស្ថិតិ និងប្រូបាប',
    color: '#8B5CF6',
    bg: 'rgba(139, 92, 246, 0.12)',
  },
  calculus: {
    en: 'Functions & Calculus',
    km: 'អនុគមន៍ និងគណិតវិភាគ',
    color: '#C83B45',
    bg: 'rgba(200, 59, 69, 0.12)',
  },
}

export default function GlossaryPage() {
  const { isKhmer, t } = useI18n()
  const [query, setQuery] = useState('')
  const [selectedGroup, setSelectedGroup] = useState<FilterGroup>('all')
  const [indexingSystem, setIndexingSystem] = useState<IndexingSystem>(isKhmer ? 'km' : 'en')
  const [selectedLetter, setSelectedLetter] = useState<string>('all')
  const [viewMode, setViewMode] = useState<GlossaryViewMode>('lexicon')
  const [examFilter, setExamFilter] = useState<ExamFilter>('all')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [revealedCardIds, setRevealedCardIds] = useState<Set<string>>(new Set())
  const [showPreface, setShowPreface] = useState(true)

  // Sync indexing system when language toggles
  useEffect(() => {
    setIndexingSystem(isKhmer ? 'km' : 'en')
    setSelectedLetter('all')
  }, [isKhmer])

  // Filtered terms
  const filteredTerms = useMemo(() => {
    const q = normalizeSearchText(query)
    return enrichedGlossaryTerms.filter((term) => {
      // Group filter
      if (selectedGroup !== 'all' && term.group !== selectedGroup) return false

      // Exam focus filter
      if (examFilter !== 'all' && term.examFocus !== examFilter) return false

      // Letter filter
      if (selectedLetter !== 'all') {
        const initial = indexingSystem === 'km' ? term.khmerConsonant : term.englishLetter
        if (initial !== selectedLetter) return false
      }

      // Query filter
      if (!q) return true
      const haystack = normalizeSearchText(
        `${term.en} ${term.km} ${term.note ?? ''} ${term.etymology?.label ?? ''} ${term.symbol ?? ''}`
      )
      return q.split(' ').every((token) => haystack.includes(token))
    })
  }, [query, selectedGroup, examFilter, selectedLetter, indexingSystem])

  // Count by group
  const groupCounts = useMemo(() => {
    const counts: Record<string, number> = { all: enrichedGlossaryTerms.length }
    enrichedGlossaryTerms.forEach((term) => {
      counts[term.group] = (counts[term.group] ?? 0) + 1
    })
    return counts
  }, [])

  // Counts by letter for current indexing system
  const letterCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    enrichedGlossaryTerms.forEach((term) => {
      if (selectedGroup !== 'all' && term.group !== selectedGroup) return
      if (examFilter !== 'all' && term.examFocus !== examFilter) return
      const char = indexingSystem === 'km' ? term.khmerConsonant : term.englishLetter
      counts[char] = (counts[char] ?? 0) + 1
    })
    return counts
  }, [selectedGroup, examFilter, indexingSystem])

  // Alphabet sequence
  const currentAlphabet = useMemo(() => {
    return indexingSystem === 'km' ? KHMER_CONSONANTS_ALPHABET : ENGLISH_ALPHABET
  }, [indexingSystem])

  // Group terms into alphabetical chapters for Lexicon mode
  const chapterSections = useMemo(() => {
    const map = new Map<string, EnrichedTerm[]>()
    currentAlphabet.forEach((letter) => {
      map.set(letter, [])
    })

    filteredTerms.forEach((term) => {
      const char = indexingSystem === 'km' ? term.khmerConsonant : term.englishLetter
      const list = map.get(char)
      if (list) {
        list.push(term)
      } else {
        map.set(char, [term])
      }
    })

    const result: { letter: string; terms: EnrichedTerm[] }[] = []
    currentAlphabet.forEach((letter) => {
      const terms = map.get(letter) ?? []
      if (terms.length > 0) {
        result.push({ letter, terms })
      }
    })
    return result
  }, [filteredTerms, currentAlphabet, indexingSystem])

  // Copy LaTeX action handler
  const handleCopySymbol = (term: EnrichedTerm) => {
    const textToCopy = term.symbol ?? (isKhmer ? term.km : term.en)
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopiedId(term.id)
      setTimeout(() => {
        setCopiedId(null)
      }, 1800)
    })
  }

  // Toggle flashcard secret
  const toggleFlashcard = (id: string) => {
    setRevealedCardIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  // Reveal all flashcards
  const revealAllCards = () => {
    setRevealedCardIds(new Set(filteredTerms.map((t) => t.id)))
  }

  // Hide all flashcards
  const hideAllCards = () => {
    setRevealedCardIds(new Set())
  }

  return (
    <div className="glossary-page">
      <PageHero
        crumbs={[
          { label: t('common.home'), to: '/' },
          { label: t('glossary.title') },
        ]}
        eyebrow={t('glossary.eyebrow')}
        title={t('glossary.title')}
        intro={t('glossary.intro')}
        meta={
          <>
            <span>
              <strong>{enrichedGlossaryTerms.length}</strong> {t('glossary.count', { count: enrichedGlossaryTerms.length })}
            </span>
            <span>
              <strong>5</strong> {isKhmer ? 'ផ្នែកគណិតវិទ្យា' : 'Curriculum Areas'}
            </span>
            <span>
              <strong>7–12</strong> {isKhmer ? 'កម្រិតថ្នាក់ស្តង់ដារក្រសួង' : 'MoEYS Secondary Standard'}
            </span>
          </>
        }
        aside={
          <div className="search-field search-field--dark" role="search" style={{ width: '100%' }}>
            <IconSearch size={20} />
            <label htmlFor="glossary-search" className="visually-hidden">
              {t('glossary.searchLabel')}
            </label>
            <input
              id="glossary-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('glossary.searchPlaceholder')}
              autoComplete="off"
            />
          </div>
        }
      />

      <div className="container" style={{ paddingBlock: 'var(--space-6) var(--space-9)' }}>
        {/* Cambodian Linguistic Heritage & MoEYS Standard Notice */}
        {showPreface && (
          <aside className="glossary-preface" aria-label="Linguistic context">
            <div className="glossary-preface__icon">
              <IconSpark size={22} />
            </div>
            <div className="glossary-preface__content" style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3 style={{ fontFamily: isKhmer ? 'var(--font-khmer)' : 'var(--font-display)' }}>
                  {t('glossary.prefaceTitle')}
                </h3>
                <button
                  type="button"
                  className="icon-button"
                  style={{ width: '1.8rem', height: '1.8rem', opacity: 0.6 }}
                  onClick={() => setShowPreface(false)}
                  aria-label="Dismiss notice"
                  title="Dismiss notice"
                >
                  ✕
                </button>
              </div>
              <p>{t('glossary.prefaceBody')}</p>
            </div>
          </aside>
        )}

        {/* Master Toolbar */}
        <div className="glossary-toolbar">
          {/* Row 1: Subject Area Filter Chips */}
          <div className="filter-bar" style={{ margin: 0 }}>
            <div className="filter-group" role="group" aria-label="Filter by subject group">
              <button
                type="button"
                className={`chip${selectedGroup === 'all' ? ' is-active' : ''}`}
                onClick={() => {
                  setSelectedGroup('all')
                  setSelectedLetter('all')
                }}
              >
                <span>{t('common.all')}</span>
                <span className="chip__count">{groupCounts.all}</span>
              </button>

              {(Object.keys(GROUP_LABELS) as GlossaryGroup[]).map((grp) => {
                const label = isKhmer ? GROUP_LABELS[grp].km : GROUP_LABELS[grp].en
                const count = groupCounts[grp] ?? 0
                const active = selectedGroup === grp
                return (
                  <button
                    key={grp}
                    type="button"
                    className={`chip${active ? ' is-active' : ''}`}
                    onClick={() => {
                      setSelectedGroup(grp)
                      setSelectedLetter('all')
                    }}
                  >
                    <span>{label}</span>
                    <span className="chip__count">{count}</span>
                  </button>
                )
              })}
            </div>

            {(selectedGroup !== 'all' || selectedLetter !== 'all' || examFilter !== 'all' || query.trim()) && (
              <button
                type="button"
                className="btn btn--ghost btn--sm"
                onClick={() => {
                  setQuery('')
                  setSelectedGroup('all')
                  setSelectedLetter('all')
                  setExamFilter('all')
                }}
              >
                {t('common.reset')}
              </button>
            )}
          </div>

          {/* Row 2: Secondary Controls (Indexing Mode, View Mode, Exam Focus) */}
          <div className="glossary-controls-row">
            {/* Indexing System Toggle (Khmer Consonants vs English A-Z) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {isKhmer ? 'ប្រព័ន្ធអក្ខរក្រម' : 'Alphabet'}:
              </span>
              <div className="segmented-control" role="radiogroup" aria-label="Indexing alphabet system">
                <button
                  type="button"
                  className={`segmented-control__btn${indexingSystem === 'km' ? ' is-active' : ''}`}
                  onClick={() => {
                    setIndexingSystem('km')
                    setSelectedLetter('all')
                  }}
                  role="radio"
                  aria-checked={indexingSystem === 'km'}
                >
                  {t('glossary.indexKhmer')}
                </button>
                <button
                  type="button"
                  className={`segmented-control__btn${indexingSystem === 'en' ? ' is-active' : ''}`}
                  onClick={() => {
                    setIndexingSystem('en')
                    setSelectedLetter('all')
                  }}
                  role="radio"
                  aria-checked={indexingSystem === 'en'}
                >
                  {t('glossary.indexEnglish')}
                </button>
              </div>
            </div>

            {/* Exam Level Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {isKhmer ? 'ប្រឡងជាតិ' : 'Exam'}:
              </span>
              <div className="segmented-control" role="radiogroup" aria-label="Filter by national exam">
                <button
                  type="button"
                  className={`segmented-control__btn${examFilter === 'all' ? ' is-active' : ''}`}
                  onClick={() => setExamFilter('all')}
                  role="radio"
                  aria-checked={examFilter === 'all'}
                >
                  {t('glossary.filterExamAll')}
                </button>
                <button
                  type="button"
                  className={`segmented-control__btn${examFilter === 'diploma' ? ' is-active' : ''}`}
                  onClick={() => setExamFilter('diploma')}
                  role="radio"
                  aria-checked={examFilter === 'diploma'}
                >
                  {t('glossary.filterExamDiploma')}
                </button>
                <button
                  type="button"
                  className={`segmented-control__btn${examFilter === 'bac2' ? ' is-active' : ''}`}
                  onClick={() => setExamFilter('bac2')}
                  role="radio"
                  aria-checked={examFilter === 'bac2'}
                >
                  {t('glossary.filterExamBac2')}
                </button>
              </div>
            </div>

            {/* View Mode Switcher (Lexicon vs Flashcards) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: 'auto' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {isKhmer ? 'ទម្រង់' : 'View'}:
              </span>
              <div className="segmented-control" role="radiogroup" aria-label="Glossary view mode">
                <button
                  type="button"
                  className={`segmented-control__btn${viewMode === 'lexicon' ? ' is-active' : ''}`}
                  onClick={() => setViewMode('lexicon')}
                  role="radio"
                  aria-checked={viewMode === 'lexicon'}
                  title="Editorial Lexicon Book view"
                >
                  <IconBook size={15} />
                  <span>{t('glossary.viewModeLexicon')}</span>
                </button>
                <button
                  type="button"
                  className={`segmented-control__btn${viewMode === 'flashcards' ? ' is-active' : ''}`}
                  onClick={() => setViewMode('flashcards')}
                  role="radio"
                  aria-checked={viewMode === 'flashcards'}
                  title="Interactive Study Flashcards"
                >
                  <IconSpark size={15} />
                  <span>{t('glossary.viewModeFlashcards')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Alphabet Bar */}
        <div className="glossary-alphabet-bar" role="navigation" aria-label="Alphabetical jump filter">
          <button
            type="button"
            className={`alphabet-chip${selectedLetter === 'all' ? ' is-active' : ''}`}
            onClick={() => setSelectedLetter('all')}
          >
            {t('common.all')}
          </button>

          {currentAlphabet.map((char) => {
            const count = letterCounts[char] ?? 0
            const active = selectedLetter === char
            const disabled = count === 0

            return (
              <button
                key={char}
                type="button"
                className={`alphabet-chip${active ? ' is-active' : ''}`}
                disabled={disabled}
                onClick={() => setSelectedLetter(char)}
                title={`${char}: ${count} ${isKhmer ? 'ពាក្យ' : 'terms'}`}
              >
                <span>{char}</span>
                {count > 0 && <span className="alphabet-chip__badge">{count}</span>}
              </button>
            )
          })}
        </div>

        {/* Results count & Quick actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBlock: '1.25rem 1.5rem' }}>
          <p className="muted" style={{ fontSize: '0.88rem', margin: 0 }}>
            {isKhmer
              ? `បង្ហាញ ${filteredTerms.length} ក្នុងចំណោម ${enrichedGlossaryTerms.length} ពាក្យបច្ចេកសព្ទគណិតវិទ្យា`
              : `Showing ${filteredTerms.length} of ${enrichedGlossaryTerms.length} verified mathematical terms`}
          </p>

          {viewMode === 'flashcards' && filteredTerms.length > 0 && (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button type="button" className="btn btn--ghost btn--sm" onClick={revealAllCards}>
                <IconEye size={15} />
                <span>{isKhmer ? 'បង្ហាញទាំងអស់' : 'Reveal all'}</span>
              </button>
              <button type="button" className="btn btn--ghost btn--sm" onClick={hideAllCards}>
                <IconEyeOff size={15} />
                <span>{isKhmer ? 'លាក់ទាំងអស់' : 'Hide all'}</span>
              </button>
            </div>
          )}
        </div>

        {/* MAIN CONTENT VIEW */}
        {filteredTerms.length === 0 ? (
          <EmptyState
            title={t('glossary.emptyTitle', { query: query.trim() || selectedLetter })}
            icon={<IconSearch size={24} />}
          >
            {t('glossary.emptyBody')}
            <div style={{ marginTop: '1rem' }}>
              <button
                type="button"
                className="btn btn--primary btn--sm"
                onClick={() => {
                  setQuery('')
                  setSelectedGroup('all')
                  setSelectedLetter('all')
                  setExamFilter('all')
                }}
              >
                {t('common.reset')}
              </button>
            </div>
          </EmptyState>
        ) : viewMode === 'lexicon' ? (
          /* =========================================================================
           * MODE 1: LEXICON / DICTIONARY BOOK VIEW (សទ្ទានុក្រមសិក្សា)
           * ========================================================================= */
          <div className="glossary-lexicon-book">
            {chapterSections.map(({ letter, terms }) => (
              <section key={letter} id={`chapter-${letter}`} className="glossary-chapter">
                {/* Chapter Heading Banner */}
                <div className="glossary-chapter__header">
                  <div className="glossary-chapter__stamp">{letter}</div>
                  <div>
                    <h2 className="glossary-chapter__title">
                      {indexingSystem === 'km' ? `ព្យញ្ជនៈ «${letter}»` : `Letter “${letter}”`}
                    </h2>
                    <span style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>
                      {terms.length} {isKhmer ? 'ពាក្យបច្ចេកសព្ទ' : 'terms in this section'}
                    </span>
                  </div>
                  <span className="glossary-chapter__count">
                    {indexingSystem === 'km' ? 'វចនានុក្រមគណិតវិទ្យា' : 'Academic Lexicon'}
                  </span>
                </div>

                {/* Chapter Term Entries */}
                <div className="glossary-chapter__entries">
                  {terms.map((term) => {
                    const grpMeta = GROUP_LABELS[term.group]
                    const isCopied = copiedId === term.id

                    return (
                      <article key={term.id} className="glossary-entry">
                        <div>
                          {/* Top row: Subject Badge & Exam Badges */}
                          <div className="glossary-entry__top">
                            <span
                              className="badge"
                              style={{
                                background: grpMeta.bg,
                                color: grpMeta.color,
                                fontWeight: 700,
                                fontSize: '0.72rem',
                              }}
                            >
                              {isKhmer ? grpMeta.km : grpMeta.en}
                            </span>

                            <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                              {term.lesson && (
                                <span className="glossary-badge glossary-badge--grade">
                                  {isKhmer ? term.lesson.gradeLabelKm : term.lesson.gradeLabelEn}
                                </span>
                              )}
                              {term.examFocus === 'diploma' && (
                                <span className="glossary-badge glossary-badge--exam-diploma">
                                  {isKhmer ? 'ឌីប្លូម' : 'Diploma'}
                                </span>
                              )}
                              {term.examFocus === 'bac2' && (
                                <span className="glossary-badge glossary-badge--exam-bac2">
                                  {isKhmer ? 'បាក់ឌុប' : 'Bac II'}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Headwords (Bilingual: primary & secondary) */}
                          <div className="glossary-entry__headwords" style={{ marginTop: '0.5rem' }}>
                            <h3
                              className="glossary-entry__primary"
                              style={{ fontFamily: isKhmer ? 'var(--font-khmer)' : 'var(--font-display)' }}
                            >
                              {isKhmer ? term.km : term.en}
                            </h3>
                            <h4
                              className="glossary-entry__secondary"
                              style={{ fontFamily: isKhmer ? 'var(--font-display)' : 'var(--font-khmer)' }}
                            >
                              {isKhmer ? term.en : term.km}
                            </h4>
                          </div>

                          {/* Etymology & Grammar Badges */}
                          <div className="glossary-entry__tags">
                            {term.partOfSpeech && (
                              <span className="glossary-badge glossary-badge--pos">
                                {term.partOfSpeech === 'n' ? (isKhmer ? 'ន.' : 'noun') : term.partOfSpeech === 'v' ? (isKhmer ? 'កិ.' : 'verb') : (isKhmer ? 'គុ.' : 'adj')}
                              </span>
                            )}
                            {term.etymology && (
                              <span className="glossary-badge glossary-badge--etym">
                                {term.etymology.label}
                              </span>
                            )}
                          </div>

                          {/* Mathematical Notation Box (KaTeX) */}
                          {term.symbol && (
                            <div className="glossary-entry__formula-box">
                              <div className="glossary-entry__formula-render">
                                <MathBlock tex={term.symbol} display={false} />
                              </div>
                              <button
                                type="button"
                                className={`btn-copy-symbol${isCopied ? ' is-copied' : ''}`}
                                onClick={() => handleCopySymbol(term)}
                                title="Copy LaTeX formula or symbol"
                              >
                                {isCopied ? <IconCheck size={13} /> : <IconCopy size={13} />}
                                <span>{isCopied ? t('glossary.copied') : t('glossary.copySymbol')}</span>
                              </button>
                            </div>
                          )}

                          {/* Definition & Context */}
                          {term.note && (
                            <div className="glossary-entry__definition" style={{ marginTop: '0.65rem' }}>
                              <RichText text={term.note} />
                            </div>
                          )}
                        </div>

                        {/* Footer: Lesson Cross-Reference & Search Link */}
                        <div className="glossary-entry__foot">
                          {term.lesson ? (
                            <Link to={term.lesson.path} className="glossary-lesson-pill">
                              <IconBook size={13} />
                              <span>
                                {isKhmer
                                  ? `${term.lesson.gradeLabelKm} · ${term.lesson.topicTitleKm} →`
                                  : `${term.lesson.gradeLabelEn} · ${term.lesson.topicTitleEn} →`}
                              </span>
                            </Link>
                          ) : (
                            <span />
                          )}

                          <Link
                            to={`/search?q=${encodeURIComponent(isKhmer ? term.km.split(' ')[0] : term.en)}`}
                            className="glossary-search-link"
                          >
                            {isKhmer ? 'ស្វែងរករូបមន្តពាក់ព័ន្ធ →' : 'Search formulas →'}
                          </Link>
                        </div>
                      </article>
                    )
                  })}
                </div>
              </section>
            ))}
          </div>
        ) : (
          /* =========================================================================
           * MODE 2: STUDY FLASHCARDS VIEW (ប័ណ្ណសិក្សា និងទន្ទេញ)
           * ========================================================================= */
          <div className="glossary-flashcards-grid">
            {filteredTerms.map((term) => {
              const grpMeta = GROUP_LABELS[term.group]
              const isRevealed = revealedCardIds.has(term.id)
              const isCopied = copiedId === term.id

              return (
                <div key={term.id} className="flashcard">
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span
                        className="badge"
                        style={{
                          background: grpMeta.bg,
                          color: grpMeta.color,
                          fontWeight: 700,
                          fontSize: '0.72rem',
                        }}
                      >
                        {isKhmer ? grpMeta.km : grpMeta.en}
                      </span>
                      <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                        {term.lesson && (
                          <span className="glossary-badge glossary-badge--grade">
                            {isKhmer ? term.lesson.gradeLabelKm : term.lesson.gradeLabelEn}
                          </span>
                        )}
                        {term.examFocus && (
                          <span
                            className={`glossary-badge ${
                              term.examFocus === 'diploma'
                                ? 'glossary-badge--exam-diploma'
                                : 'glossary-badge--exam-bac2'
                            }`}
                          >
                            {term.examFocus === 'diploma'
                              ? isKhmer ? 'ឌីប្លូម' : 'Diploma'
                              : isKhmer ? 'បាក់ឌុប' : 'Bac II'}
                          </span>
                        )}
                      </div>
                    </div>

                    <h3
                      style={{
                        fontSize: '1.35rem',
                        margin: '0.85rem 0 0.35rem',
                        color: 'var(--ink)',
                        fontFamily: isKhmer ? 'var(--font-khmer)' : 'var(--font-display)',
                      }}
                    >
                      {isKhmer ? term.km : term.en}
                    </h3>

                    <h4
                      style={{
                        fontSize: '1rem',
                        fontWeight: 500,
                        margin: '0 0 0.85rem',
                        color: 'var(--accent)',
                        fontFamily: isKhmer ? 'var(--font-display)' : 'var(--font-khmer)',
                      }}
                    >
                      {isKhmer ? term.en : term.km}
                    </h4>

                    {term.etymology && (
                      <span className="glossary-badge glossary-badge--etym" style={{ marginBottom: '0.75rem' }}>
                        {term.etymology.label}
                      </span>
                    )}

                    {/* Interactive Reveal Area */}
                    {isRevealed ? (
                      <div className="flashcard__secret">
                        {term.symbol && (
                          <div style={{ marginBottom: '0.65rem' }}>
                            <MathBlock tex={term.symbol} display={false} />
                          </div>
                        )}
                        {term.note && (
                          <div style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.55 }}>
                            <RichText text={term.note} />
                          </div>
                        )}
                      </div>
                    ) : (
                      <div
                        style={{
                          padding: '1.25rem',
                          background: 'var(--surface-sunken)',
                          borderRadius: 'var(--radius-md)',
                          textAlign: 'center',
                          color: 'var(--muted)',
                          fontSize: '0.85rem',
                          border: '1px dashed var(--line)',
                          cursor: 'pointer',
                        }}
                        onClick={() => toggleFlashcard(term.id)}
                      >
                        {isKhmer ? 'ចុចដើម្បីបង្ហាញនិយមន័យ និងរូបមន្ត' : 'Click to reveal definition & formula'}
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid var(--line)' }}>
                    <button
                      type="button"
                      className="btn btn--ghost btn--sm"
                      onClick={() => toggleFlashcard(term.id)}
                      style={{ fontSize: '0.8rem' }}
                    >
                      {isRevealed ? (
                        <>
                          <IconEyeOff size={14} />
                          <span>{t('glossary.hideCard')}</span>
                        </>
                      ) : (
                        <>
                          <IconEye size={14} />
                          <span>{t('glossary.revealCard')}</span>
                        </>
                      )}
                    </button>

                    {term.symbol && (
                      <button
                        type="button"
                        className={`btn-copy-symbol${isCopied ? ' is-copied' : ''}`}
                        onClick={() => handleCopySymbol(term)}
                      >
                        {isCopied ? <IconCheck size={12} /> : <IconCopy size={12} />}
                        <span>{isCopied ? t('glossary.copied') : t('glossary.copySymbol')}</span>
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
