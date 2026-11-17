import type { ReactNode } from 'react'
import { Breadcrumbs, type Crumb } from './Breadcrumbs'

interface PageHeroProps {
  crumbs?: Crumb[]
  eyebrow?: string
  title: string
  intro?: ReactNode
  meta?: ReactNode
  aside?: ReactNode
  variant?: 'light' | 'dark' | 'lab'
  wideTitle?: boolean
  /** Read before the title by assistive tech and crawlers, e.g. "Grade 10 mathematics:". */
  titlePrefix?: string
}

export function PageHero({ crumbs, eyebrow, title, intro, meta, aside, variant = 'dark', wideTitle, titlePrefix }: PageHeroProps) {
  const className = variant === 'light' ? 'page-hero' : variant === 'lab' ? 'page-hero page-hero--lab' : 'page-hero page-hero--dark'
  return (
    <section className={className}>
      <div className="container">
        {crumbs && crumbs.length > 0 && (
          <div style={{ marginBottom: '1.75rem' }}>
            <Breadcrumbs items={crumbs} />
          </div>
        )}
        <div className="page-hero__grid">
          <div>
            {eyebrow && <span className="eyebrow eyebrow--lime">{eyebrow}</span>}
            <h1 className={`page-hero__title${wideTitle ? ' page-hero__title--wide' : ''}`} style={{ marginTop: eyebrow ? '1rem' : 0 }}>
              {titlePrefix && <span className="visually-hidden">{titlePrefix} </span>}
              {title}
            </h1>
            {intro && <p className="page-hero__intro">{intro}</p>}
            {meta && <div className="page-hero__meta">{meta}</div>}
          </div>
          {aside && <div className="page-hero__aside">{aside}</div>}
        </div>
      </div>
    </section>
  )
}
