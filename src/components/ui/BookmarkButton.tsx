import { useBookmarks, type BookmarkKind } from '../../lib/bookmarks'
import { useI18n } from '../../lib/i18n'
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
  const { t } = useI18n()
  const saved = isBookmarked(kind, id)
  const action = saved ? t('bookmarks.removeFrom', { label }) : t('bookmarks.saveFor', { label })

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
      aria-label={action}
      title={action}
      onClick={(event) => {
        event.stopPropagation()
        toggleBookmark(kind, id)
      }}
    >
      <IconBookmark size={15} filled={saved} />
      {!iconOnly && (showLabel || saved) && <span>{saved ? t('common.saved') : t('common.save')}</span>}
    </button>
  )
}
