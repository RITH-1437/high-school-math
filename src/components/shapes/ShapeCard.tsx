import { Link } from 'react-router-dom'
import type { Shape } from '../../types/content'
import { shapeHref } from '../../data'
import { BookmarkButton } from '../ui/BookmarkButton'
import { IconArrowRight } from '../ui/Icons'
import { ShapeGlyph } from './ShapeGlyph'

export function ShapeCard({ shape, active = false }: { shape: Shape; active?: boolean }) {
  return (
    <article className={`shape-card${active ? ' is-active' : ''}`}>
      <Link
        to={shapeHref(shape.id)}
        className="shape-card__link"
        aria-label={`Open ${shape.name} in the Shape Lab`}
        aria-current={active ? 'page' : undefined}
      >
        <span className="shape-card__preview">
          <ShapeGlyph shape={shape} />
        </span>
        <span className="shape-card__name">{shape.name}</span>
        <span className="shape-card__meta">
          <span>{shape.category === '2d' ? '2D' : '3D'}</span>
          <IconArrowRight size={14} className="shape-card__arrow" />
        </span>
      </Link>
      <span className="shape-card__bookmark">
        <BookmarkButton kind="shape" id={shape.id} label={shape.name} iconOnly onDark />
      </span>
    </article>
  )
}
