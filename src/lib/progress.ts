/**
 * Local, account-free progress: recently explored pages and exercise results.
 * All data is validated on read and never leaves the browser.
 */

export type RecentKind = 'topic' | 'shape' | 'formula'

export interface RecentVisit {
  kind: RecentKind
  id: string
  visitedAt: number
}

export interface ExerciseAttempt {
  topicId: string
  correct: number
  total: number
  completedAt: number
}

const RECENTS_KEY = 'axiom.recents.v1'
const EXERCISES_KEY = 'axiom.exercises.v1'
const MAX_RECENTS = 8

function safeRead<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    const parsed: unknown = JSON.parse(raw)
    return parsed as T
  } catch {
    return fallback
  }
}

function safeWrite(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Quota or privacy mode: progress is optional, so fail silently.
  }
}

function emitUpdate(): void {
  window.dispatchEvent(new Event('axiom:progress'))
}

function isValidVisit(value: unknown): value is RecentVisit {
  if (!value || typeof value !== 'object') return false
  const candidate = value as Record<string, unknown>
  return (
    (candidate.kind === 'topic' || candidate.kind === 'shape' || candidate.kind === 'formula') &&
    typeof candidate.id === 'string' &&
    candidate.id.length > 0 &&
    typeof candidate.visitedAt === 'number' &&
    Number.isFinite(candidate.visitedAt)
  )
}

export function getRecentVisits(limit = MAX_RECENTS): RecentVisit[] {
  const stored = safeRead<unknown>(RECENTS_KEY, [])
  if (!Array.isArray(stored)) return []
  return stored
    .filter(isValidVisit)
    .sort((a, b) => b.visitedAt - a.visitedAt)
    .slice(0, limit)
}

export function recordVisit(kind: RecentKind, id: string): void {
  if (!id) return
  const now = Date.now()
  const existing = getRecentVisits(MAX_RECENTS).filter((visit) => !(visit.kind === kind && visit.id === id))
  safeWrite(RECENTS_KEY, [{ kind, id, visitedAt: now }, ...existing].slice(0, MAX_RECENTS))
  emitUpdate()
}

export function clearRecentVisits(): void {
  safeWrite(RECENTS_KEY, [])
  emitUpdate()
}

export function getExerciseAttempts(): ExerciseAttempt[] {
  const stored = safeRead<unknown>(EXERCISES_KEY, [])
  if (!Array.isArray(stored)) return []
  return stored.filter((value): value is ExerciseAttempt => {
    if (!value || typeof value !== 'object') return false
    const candidate = value as Record<string, unknown>
    return (
      typeof candidate.topicId === 'string' &&
      typeof candidate.correct === 'number' &&
      typeof candidate.total === 'number' &&
      candidate.total > 0 &&
      typeof candidate.completedAt === 'number'
    )
  })
}

export function getExerciseAttempt(topicId: string): ExerciseAttempt | undefined {
  return getExerciseAttempts().find((attempt) => attempt.topicId === topicId)
}

export function saveExerciseAttempt(topicId: string, correct: number, total: number): void {
  if (!topicId || total <= 0) return
  const attempts = getExerciseAttempts().filter((attempt) => attempt.topicId !== topicId)
  attempts.push({ topicId, correct, total, completedAt: Date.now() })
  safeWrite(EXERCISES_KEY, attempts.slice(-100))
  emitUpdate()
}
