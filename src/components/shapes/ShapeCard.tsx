import { Link } from 'react-router-dom'
import type { Shape } from '../../types/content'
import { shapeHref } from '../../data'
import { shapeCopy } from '../../i18n/content'
import { useI18n } from '../../lib/i18n'
import { BookmarkButton } from '../ui/BookmarkButton'
import { IconArrowRight } from '../ui/Icons'
import { ShapeGlyph } from './ShapeGlyph'

export function ShapeCard({ shape, active = false }: { shape: Shape; active?: boolean }) {
  const { language, t } = useI18n()
  const copy = shapeCopy(shape, language)

  return (
    <article className={`shape-card${active ? ' is-active' : ''}`}>
      <Link
        to={shapeHref(shape.id)}
        className="shape-card__link"
        aria-label={t('shapes.openShape', { name: copy.name })}
        aria-current={active ? 'page' : undefined}
      >
        <span className="shape-card__preview">
          <ShapeGlyph shape={shape} />
        </span>
        <span className="shape-card__name">{copy.name}</span>
        <span className="shape-card__meta">
          <span>{shape.category === '2d' ? t('shapes.category2d') : t('shapes.category3d')}</span>
          <IconArrowRight size={14} className="shape-card__arrow" />
        </span>
      </Link>
      <span className="shape-card__bookmark">
        <BookmarkButton kind="shape" id={shape.id} label={copy.name} iconOnly onDark />
      </span>
    </article>
  )
}
