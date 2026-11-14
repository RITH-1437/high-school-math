import { NavLink } from 'react-router-dom'
import { useBookmarks } from '../../lib/bookmarks'
import { useSearchUI } from '../../lib/search-ui'
import { useTheme } from '../../lib/theme'
import { Brand } from './Brand'
import {
  IconBookmark,
  IconGrades,
  IconHome,
  IconMoon,
  IconSearch,
  IconShapes,
  IconSun,
} from '../ui/Icons'

const navItems = [
  { to: '/', label: 'Home', icon: IconHome, end: true },
  { to: '/grades', label: 'Grades', icon: IconGrades },
  { to: '/shapes', label: 'Shapes', icon: IconShapes },
  { to: '/search', label: 'Search', icon: IconSearch },
  { to: '/bookmarks', label: 'Bookmarks', icon: IconBookmark },
]

export function Header() {
  const { theme, toggleTheme } = useTheme()
  const { count } = useBookmarks()
  const { openSearch } = useSearchUI()

  return (
    <header className="site-header">
      <div className="header-inner">
        <Brand />
        <nav className="primary-nav" aria-label="Primary navigation">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}
              >
                <Icon size={16} />
                <span>{item.label}</span>
                {item.to === '/bookmarks' && count > 0 && (
                  <span className="bookmark-count" aria-label={`${count} saved`}>
                    {count > 99 ? '99+' : count}
                  </span>
                )}
              </NavLink>
            )
          })}
        </nav>
        <div className="header-actions">
          <button
            type="button"
            className="icon-button search-trigger"
            aria-label="Open search"
            onClick={() => openSearch()}
          >
            <IconSearch size={19} />
          </button>
          <button
            type="button"
            className="icon-button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          >
            {theme === 'light' ? <IconMoon size={18} /> : <IconSun size={18} />}
          </button>
        </div>
      </div>
    </header>
  )
}
