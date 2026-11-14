import { Link } from 'react-router-dom'
import { IconChevronRight } from './Icons'

export interface Crumb {
  label: string
  to?: string
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="breadcrumbs">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={`${item.label}-${index}`}>
              {index > 0 && (
                <span className="sep" aria-hidden="true">
                  <IconChevronRight size={11} />
                </span>
              )}
              {item.to && !isLast ? (
                <Link to={item.to}>{item.label}</Link>
              ) : (
                <span aria-current="page">{item.label}</span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
