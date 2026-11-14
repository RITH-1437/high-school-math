import { useBookmarks, type BookmarkKind } from '../../lib/bookmarks'
import { IconBookmark } from './Icons'

interface BookmarkButtonProps {
  kind: BookmarkKind
  id: string
  label: string
  iconOnly?: boolean
  onDark?: boolean
  showLabel?: boolean
}

export function BookmarkButton({
  kind,
  id,
  label,
  iconOnly = false,
  onDark = false,
  showLabel = false,
}: BookmarkButtonProps) {
  const { isBookmarked, toggleBookmark } = useBookmarks()
  const saved = isBookmarked(kind, id)
  const action = saved ? 'Remove bookmark from' : 'Save bookmark for'

  return (
    <button
      type="button"
      className={[
        'bookmark-toggle',
        iconOnly ? 'bookmark-toggle--icon' : '',
        onDark ? 'bookmark-toggle--on-dark' : '',
        saved ? 'is-saved' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-pressed={saved}
      aria-label={`${action} ${label}`}
      title={`${action} ${label}`}
      onClick={(event) => {
        event.stopPropagation()
        toggleBookmark(kind, id)
      }}
    >
      <IconBookmark size={15} filled={saved} />
      {!iconOnly && (showLabel || saved) && <span>{saved ? 'Saved' : 'Save'}</span>}
    </button>
  )
}
