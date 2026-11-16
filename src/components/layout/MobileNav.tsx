import { NavLink } from 'react-router-dom'
import type { TranslationKey } from '../../i18n/en'
import { useBookmarks } from '../../lib/bookmarks'
import { useI18n } from '../../lib/i18n'
import { IconBookmark, IconExam, IconGrades, IconHome, IconSearch, IconShapes } from '../ui/Icons'

const items: { to: string; label: TranslationKey; icon: typeof IconHome; end?: boolean }[] = [
  { to: '/', label: 'nav.home', icon: IconHome, end: true },
  { to: '/grades', label: 'nav.grades', icon: IconGrades },
  { to: '/shapes', label: 'nav.shapes', icon: IconShapes },
  { to: '/exam', label: 'nav.exams', icon: IconExam },
  { to: '/search', label: 'nav.search', icon: IconSearch },
  { to: '/bookmarks', label: 'nav.saved', icon: IconBookmark },
]

export function MobileNav() {
  const { count } = useBookmarks()
  const { t } = useI18n()

  return (
    <nav className="mobile-nav" aria-label={t('nav.mobile')}>
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
                <span>{t(item.label)}</span>
                {item.to === '/bookmarks' && count > 0 && (
                  <span className="visually-hidden">{t('nav.bookmarksSaved', { count })}</span>
                )}
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
