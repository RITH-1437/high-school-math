import { Link } from 'react-router-dom'
import { useI18n } from '../../lib/i18n'
import { useTheme } from '../../lib/theme'

interface BrandProps {
  size?: number
}

export function BrandMark({ size = 36 }: { size?: number }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const logoSrc = isDark ? '/img/white-pi.png' : '/img/pi.png'

  return (
    <span
      className={`brand-mark-wrap brand-mark-wrap--${theme}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        borderRadius: '8px',
        background: isDark ? 'transparent' : '#FFFFFF',
        boxShadow: isDark ? 'none' : '0 1px 4px rgba(0, 0, 0, 0.22)',
        padding: isDark ? 0 : '3px',
        overflow: 'hidden',
        flexShrink: 0,
        transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <img
        src={logoSrc}
        alt="High School Math Pi Logo"
        width={size}
        height={size}
        className="brand-mark"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          display: 'block',
        }}
      />
    </span>
  )
}

export function Brand({ size = 36 }: BrandProps) {
  const { t } = useI18n()
  return (
    <Link className="brand" to="/" aria-label={t('brand.home')}>
      <BrandMark size={size} />
      <span className="brand-words">
        <span className="brand-name">{t('brand.name')}</span>
        <span className="brand-meta">{t('brand.meta')}</span>
      </span>
    </Link>
  )
}
