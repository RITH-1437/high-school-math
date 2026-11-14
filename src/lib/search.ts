import type {
  GradeId,
  SearchDocument,
  SearchFilters,
  SearchResultKind,
  SubjectFamily,
} from '../types/content'
import {
  familyLabel,
  formulaRefs,
  gradeHref,
  grades,
  shapeHref,
  subjectHref,
  topicUrl,
} from '../data'
import { shapes } from '../data/shapes'
import { POPULAR_SEARCHES, SEARCH_STOP_WORDS, SEARCH_SYNONYMS } from '../data/search-synonyms'

interface WeightedField {
  text: string
  tokens: string[]
  weight: number
}

export interface IndexedSearchDocument extends SearchDocument {
  titleNorm: string
  titleTokens: string[]
  keywordFields: WeightedField[]
  descriptionNorm: string
  allNorm: string
  kindRank: number
}

export interface SearchHit extends SearchDocument {
  score: number
  matchedTerms: string[]
}

const KIND_RANK: Record<SearchResultKind, number> = {
  formula: 5,
  topic: 3,
  shape: 3,
  subject: 2,
}

/** Lower-case, strip accents and normalise common mathematical symbols. */
export function normalizeSearchText(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/π/g, ' pi ')
    .replace(/√/g, ' sqrt ')
    .replace(/[²]/g, '2')
    .replace(/[³]/g, '3')
    .replace(/[⁴]/g, '4')
    .replace(/±/g, ' plus minus ')
    .replace(/θ/g, ' theta ')
    .replace(/Σ/g, ' sigma ')
    .replace(/σ/g, ' sigma ')
    .replace(/μ/g, ' mu ')
    .replace(/∫/g, ' integral ')
    .replace(/∞/g, ' infinity ')
    .replace(/[×·]/g, ' x ')
    .replace(/÷/g, ' / ')
    .replace(/[−–—]/g, '-')
    .replace(/[’']/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function tokenizeQuery(value: string): string[] {
  const normalized = normalizeSearchText(value)
  if (!normalized) return []
  return normalized.split(' ').filter((term) => term.length > 0 && !SEARCH_STOP_WORDS.has(term))
}

/** Remove LaTeX commands enough for expression search to be useful. */
function plainMath(value: string): string {
  return value
    .replace(/\\(?:left|right|quad|qquad|displaystyle|text|mathrm|operatorname)\b/g, ' ')
    .replace(/\\[,;!]/g, ' ')
    .replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, ' $1 / $2 ')
    .replace(/\\sqrt\{?([^{}]+)\}?/g, ' sqrt $1 ')
    .replace(/\\pi\b/g, ' pi ')
    .replace(/\\(sin|cos|tan|log|ln|lim)\b/g, ' $1 ')
    .replace(/\\[a-zA-Z]+/g, ' ')
    .replace(/[{}]/g, ' ')
}

function buildIndexedDocument(doc: SearchDocument): IndexedSearchDocument {
  return {
    ...doc,
    titleNorm: normalizeSearchText(doc.title),
    titleTokens: normalizeSearchText(doc.title).split(' ').filter(Boolean),
    keywordFields: doc.keywords
      .filter(Boolean)
      .map((keyword, index) => ({
        text: keyword,
        tokens: normalizeSearchText(keyword).split(' ').filter(Boolean),
        weight: index < 4 ? 9 : index < 9 ? 6 : 4,
      })),
    descriptionNorm: normalizeSearchText(doc.description),
    allNorm: normalizeSearchText([doc.title, doc.subtitle, doc.description, ...doc.keywords].join(' ')),
    kindRank: KIND_RANK[doc.kind],
  }
}

function buildDocuments(): IndexedSearchDocument[] {
  const docs: SearchDocument[] = []

  for (const grade of grades) {
    for (const subject of grade.subjects) {
      const theoremText = (subject.theorems ?? []).flatMap((theorem) => [
        theorem.title,
        theorem.statement,
        theorem.note ?? '',
      ])
      const topicTitles = subject.topics.map((topic) => topic.title)
      const formulaCount = subject.topics.reduce((total, topic) => total + topic.formulas.length, 0)

      docs.push({
        id: `subject:${grade.id}:${subject.id}`,
        kind: 'subject',
        title: subject.title,
        subtitle: `${grade.title} · ${subject.topics.length} topics · ${formulaCount} formulas`,
        description: subject.description,
        href: subjectHref(grade.id, subject.id),
        gradeId: grade.id,
        gradeNumber: grade.number,
        subjectFamily: subject.family,
        subjectTitle: subject.title,
        keywords: [
          subject.title,
          `grade ${grade.number}`,
          ...topicTitles,
          ...theoremText,
          subject.description,
          familyLabel(subject.family),
          grade.tagline,
        ],
        badges: ['Subject', grade.title, familyLabel(subject.family)],
      })

      for (const topic of subject.topics) {
        const formulaKeywords = topic.formulas.flatMap((formula) => [
          formula.title,
          formula.expression,
          plainMath(formula.expression),
          ...formula.tags,
          ...(formula.spoken ? [formula.spoken] : []),
          ...formula.variables.map((variable) => `${variable.symbol} ${variable.name}`),
        ])
        const theoremMatches = theoremText.join(' ')

        docs.push({
          id: `topic:${topic.id}`,
          kind: 'topic',
          title: topic.title,
          subtitle: `${grade.title} · ${subject.title}`,
          description: topic.subtitle || topic.introduction,
          href: topicUrl({ topic, grade, subject, key: `${grade.id}:${subject.id}:${topic.id}` }),
          gradeId: grade.id,
          gradeNumber: grade.number,
          subjectFamily: subject.family,
          subjectTitle: subject.title,
          keywords: [
            topic.title,
            ...(topic.aliases ?? []),
            topic.subtitle,
            subject.title,
            `grade ${grade.number}`,
            ...topic.formulas.map((formula) => formula.title),
            ...formulaKeywords,
            ...topic.theory.map((section) => section.title),
            ...topic.examples.map((example) => example.title),
            ...(topic.prerequisites ?? []),
            ...(topic.keyIdeas ?? []),
            theoremMatches,
            topic.introduction,
          ],
          badges: ['Topic', grade.title, subject.title],
        })
      }

      for (const formula of subject.topics.flatMap((topic) => topic.formulas)) {
        const parentTopic = subject.topics.find((topic) =>
          topic.formulas.some((candidate) => candidate.id === formula.id),
        )
        if (!parentTopic) continue
        docs.push({
          id: `formula:${formula.id}`,
          kind: 'formula',
          title: formula.title,
          subtitle: `${parentTopic.title} · ${subject.title}`,
          description: formula.description,
          href: `/formulas/${formula.id}`,
          gradeId: grade.id,
          gradeNumber: grade.number,
          subjectFamily: subject.family,
          subjectTitle: subject.title,
          keywords: [
            formula.title,
            ...formula.tags,
            plainMath(formula.expression),
            formula.expression,
            formula.description,
            formula.spoken ?? '',
            ...formula.variables.map((variable) => `${variable.symbol} ${variable.name}`),
            parentTopic.title,
            subject.title,
            `grade ${grade.number}`,
            ...(formula.conditions ?? []),
          ],
          badges: ['Formula', grade.title, subject.title],
        })
      }
    }
  }

  for (const shape of shapes) {
    docs.push({
      id: `shape:${shape.id}`,
      kind: 'shape',
      title: shape.name,
      subtitle: `${shape.category === '2d' ? '2D shape' : '3D solid'} · Shape Lab`,
      description: shape.definition,
      href: shapeHref(shape.id),
      keywords: [
        shape.name,
        ...(shape.aliases ?? []),
        shape.tagline,
        shape.definition,
        shape.category,
        shape.category === '2d' ? '2d shape plane figure' : '3d solid object',
        ...shape.properties,
        ...shape.metrics.flatMap((metric) => [metric.label, metric.description, plainMath(metric.formula)]),
        ...shape.formulas.map((formula) => `${formula.label} ${plainMath(formula.expression)}`),
      ],
      badges: ['Shape Lab', shape.category === '2d' ? '2D' : '3D'],
    })
  }

  return docs.map(buildIndexedDocument)
}

export const SEARCH_DOCUMENTS: IndexedSearchDocument[] = buildDocuments()

export const SEARCH_DOCUMENT_COUNT = SEARCH_DOCUMENTS.length

function variantsForTerm(term: string): string[] {
  const variants = new Set<string>([term])
  for (const synonym of SEARCH_SYNONYMS[term] ?? []) {
    const normalized = normalizeSearchText(synonym)
    if (normalized) {
      variants.add(normalized)
      // Multi-word synonyms also contribute their individual words for token matching.
      for (const word of normalized.split(' ')) {
        if (word.length > 2 && !SEARCH_STOP_WORDS.has(word)) variants.add(word)
      }
    }
  }
  if (term.length > 4) {
    if (term.endsWith('ies')) variants.add(term.slice(0, -3) + 'y')
    else if (term.endsWith('s')) variants.add(term.slice(0, -1))
    else variants.add(term + 's')
  }
  return [...variants]
}

function fieldScore(field: WeightedField, variants: string[]): number {
  let best = 0
  for (const variant of variants) {
    if (!variant) continue
    for (const token of field.tokens) {
      if (token === variant) {
        best = Math.max(best, field.weight + 5)
      } else if (token.startsWith(variant) && variant.length > 2) {
        best = Math.max(best, field.weight + 1)
      }
    }
    const phrase = normalizeSearchText(field.text)
    if (phrase.includes(variant)) {
      best = Math.max(best, field.weight)
    }
  }
  return best
}

function termGroupScore(doc: IndexedSearchDocument, variants: string[]): number {
  let best = 0
  for (const variant of variants) {
    if (!variant) continue
    for (const token of doc.titleTokens) {
      if (token === variant) best = Math.max(best, 28)
      else if (token.startsWith(variant) && variant.length > 2) best = Math.max(best, 20)
    }
    if (doc.titleNorm.includes(variant)) best = Math.max(best, doc.titleNorm.startsWith(variant) ? 24 : 16)
  }
  for (const field of doc.keywordFields) {
    best = Math.max(best, fieldScore(field, variants))
  }
  for (const variant of variants) {
    if (variant && doc.descriptionNorm.includes(variant)) best = Math.max(best, 4)
    if (variant && doc.allNorm.includes(variant)) best = Math.max(best, 2)
  }
  return best
}

export interface SearchOptions {
  filters?: SearchFilters
  limit?: number
}

/** Ranked, deterministic search. Queries require every meaningful term to match. */
export function searchContent(query: string, options: SearchOptions = {}): SearchHit[] {
  const normalizedQuery = normalizeSearchText(query)
  if (!normalizedQuery) return []

  const terms = tokenizeQuery(query)
  if (terms.length === 0) return []

  const { filters = { grade: 'all', subject: 'all' }, limit } = options
  const groups = terms.map(variantsForTerm)
  const hits: SearchHit[] = []

  for (const doc of SEARCH_DOCUMENTS) {
    if (doc.kind === 'shape' && filters.subject !== 'all') continue
    if (filters.grade !== 'all' && doc.kind !== 'shape' && doc.gradeId !== filters.grade) continue
    if (filters.subject !== 'all' && doc.subjectFamily !== filters.subject) continue

    let total = 0
    let matchedAll = true
    const matchedTerms: string[] = []

    for (let index = 0; index < groups.length; index += 1) {
      const score = termGroupScore(doc, groups[index])
      if (score <= 0) {
        matchedAll = false
        break
      }
      total += score
      matchedTerms.push(terms[index])
    }

    if (!matchedAll) continue

    // Phrase-level bonuses.
    if (doc.titleNorm === normalizedQuery) total += 120
    else if (doc.titleNorm.startsWith(normalizedQuery)) total += 70
    else if (doc.titleNorm.includes(normalizedQuery)) total += 45
    for (const field of doc.keywordFields.slice(0, 4)) {
      if (normalizeSearchText(field.text) === normalizedQuery) total += 44
    }

    total += doc.kindRank

    hits.push({
      id: doc.id,
      kind: doc.kind,
      title: doc.title,
      subtitle: doc.subtitle,
      description: doc.description,
      href: doc.href,
      gradeId: doc.gradeId,
      gradeNumber: doc.gradeNumber,
      subjectFamily: doc.subjectFamily,
      subjectTitle: doc.subjectTitle,
      keywords: doc.keywords,
      badges: doc.badges,
      score: total,
      matchedTerms,
    })
  }

  hits.sort((a, b) => b.score - a.score || a.title.length - b.title.length || a.title.localeCompare(b.title))
  return typeof limit === 'number' ? hits.slice(0, limit) : hits
}

/** Split text for safe, React-rendered highlighting. Never returns HTML. */
export function highlightParts(text: string, query: string): { text: string; match: boolean }[] {
  const terms = tokenizeQuery(query)
  if (terms.length === 0) return [{ text, match: false }]
  const escaped = [...new Set(terms)]
    .filter((term) => term.length >= 2)
    .sort((a, b) => b.length - a.length)
    .map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  if (escaped.length === 0) return [{ text, match: false }]
  const pattern = new RegExp(`(${escaped.join('|')})`, 'gi')
  const parts = text.split(pattern)
  return parts
    .filter((part) => part.length > 0)
    .map((part) => ({ text: part, match: terms.includes(part.toLowerCase()) }))
}

export function gradeOptions(): { value: GradeId; label: string }[] {
  return grades.map((grade) => ({ value: grade.id, label: grade.title }))
}

export function popularSearches(): string[] {
  return POPULAR_SEARCHES
}

export function resultsHref(term: string): string {
  return `/search?q=${encodeURIComponent(term)}`
}

export function subjectFilterOptions(): { value: SubjectFamily; label: string }[] {
  const families = new Set<SubjectFamily>()
  for (const grade of grades) {
    for (const subject of grade.subjects) families.add(subject.family)
  }
  return [...families].map((family) => ({ value: family, label: familyLabel(family) }))
}

export { gradeHref, formulaRefs }
