import { NavLink } from 'react-router-dom'
import { useBookmarks } from '../../lib/bookmarks'
import { IconBookmark, IconGrades, IconHome, IconSearch, IconShapes } from '../ui/Icons'

const items = [
  { to: '/', label: 'Home', icon: IconHome, end: true },
  { to: '/grades', label: 'Grades', icon: IconGrades },
  { to: '/shapes', label: 'Shapes', icon: IconShapes },
  { to: '/search', label: 'Search', icon: IconSearch },
  { to: '/bookmarks', label: 'Saved', icon: IconBookmark },
]

export function MobileNav() {
  const { count } = useBookmarks()

  return (
    <nav className="mobile-nav" aria-label="Mobile primary navigation">
      <ul className="mobile-nav__list">
        {items.map((item) => {
          const Icon = item.icon
          return (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) => `mobile-nav__link${isActive ? ' is-active' : ''}`}
              >
                <span style={{ position: 'relative', display: 'inline-flex' }}>
                  <Icon size={21} />
                  {item.to === '/bookmarks' && count > 0 && (
                    <span
                      aria-hidden="true"
                      style={{
                        position: 'absolute',
                        top: '-2px',
                        right: '-5px',
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: 'var(--accent)',
                      }}
                    />
                  )}
                </span>
                <span>{item.label}</span>
                {item.to === '/bookmarks' && count > 0 && (
                  <span className="visually-hidden">{count} bookmarks saved</span>
                )}
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
