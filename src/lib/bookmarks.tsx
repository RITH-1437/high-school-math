import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

export type BookmarkKind = 'formula' | 'topic' | 'shape'

export interface BookmarkEntry {
  kind: BookmarkKind
  id: string
  savedAt: number
}

const STORAGE_KEY = 'axiom.bookmarks.v1'
const MAX_BOOKMARKS = 500

interface BookmarksContextValue {
  bookmarks: BookmarkEntry[]
  count: number
  isBookmarked: (kind: BookmarkKind, id: string) => boolean
  toggleBookmark: (kind: BookmarkKind, id: string) => void
  removeBookmark: (kind: BookmarkKind, id: string) => void
  clearBookmarks: () => void
}

const BookmarksContext = createContext<BookmarksContextValue | null>(null)

function isBookmarkKind(value: unknown): value is BookmarkKind {
  return value === 'formula' || value === 'topic' || value === 'shape'
}

function readBookmarks(): BookmarkEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed
      .filter((value): value is BookmarkEntry => {
        if (!value || typeof value !== 'object') return false
        const candidate = value as Record<string, unknown>
        return (
          isBookmarkKind(candidate.kind) &&
          typeof candidate.id === 'string' &&
          candidate.id.length > 0 &&
          candidate.id.length < 200 &&
          typeof candidate.savedAt === 'number' &&
          Number.isFinite(candidate.savedAt)
        )
      })
      .sort((a, b) => b.savedAt - a.savedAt)
      .slice(0, MAX_BOOKMARKS)
  } catch {
    return []
  }
}

function writeBookmarks(entries: BookmarkEntry[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
  } catch {
    // Bookmarks are a convenience; storage failure should not break the app.
  }
}

export function BookmarksProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<BookmarkEntry[]>(readBookmarks)

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) setBookmarks(readBookmarks())
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const persist = useCallback((next: BookmarkEntry[]) => {
    const capped = next.slice(0, MAX_BOOKMARKS)
    setBookmarks(capped)
    writeBookmarks(capped)
  }, [])

  const toggleBookmark = useCallback(
    (kind: BookmarkKind, id: string) => {
      if (!id) return
      setBookmarks((current) => {
        const exists = current.some((entry) => entry.kind === kind && entry.id === id)
        const next = exists
          ? current.filter((entry) => !(entry.kind === kind && entry.id === id))
          : [{ kind, id, savedAt: Date.now() }, ...current]
        const capped = next.slice(0, MAX_BOOKMARKS)
        writeBookmarks(capped)
        return capped
      })
    },
    [],
  )

  const removeBookmark = useCallback(
    (kind: BookmarkKind, id: string) => {
      setBookmarks((current) => {
        const next = current.filter((entry) => !(entry.kind === kind && entry.id === id))
        writeBookmarks(next)
        return next
      })
    },
    [],
  )

  const clearBookmarks = useCallback(() => persist([]), [persist])

  const isBookmarked = useCallback(
    (kind: BookmarkKind, id: string) => bookmarks.some((entry) => entry.kind === kind && entry.id === id),
    [bookmarks],
  )

  const value = useMemo(
    () => ({
      bookmarks,
      count: bookmarks.length,
      isBookmarked,
      toggleBookmark,
      removeBookmark,
      clearBookmarks,
    }),
    [bookmarks, isBookmarked, toggleBookmark, removeBookmark, clearBookmarks],
  )

  return <BookmarksContext.Provider value={value}>{children}</BookmarksContext.Provider>
}

export function useBookmarks(): BookmarksContextValue {
  const context = useContext(BookmarksContext)
  if (!context) throw new Error('useBookmarks must be used inside BookmarksProvider')
  return context
}
