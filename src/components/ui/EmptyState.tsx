import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { IconSearch } from './Icons'

interface EmptyStateProps {
  title: string
  children?: ReactNode
  icon?: ReactNode
  actions?: { label: string; to: string }[]
}

export function EmptyState({ title, children, icon, actions }: EmptyStateProps) {
  return (
    <div className="empty-state" role="status">
      <span className="empty-state__icon">{icon ?? <IconSearch size={22} />}</span>
      <h3>{title}</h3>
      {children && <p>{children}</p>}
      {actions && actions.length > 0 && (
        <div className="empty-state__actions">
          {actions.map((action) => (
            <Link key={action.to} className="btn btn--secondary btn--sm" to={action.to}>
              {action.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
