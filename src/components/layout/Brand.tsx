import { Link } from 'react-router-dom'
import { useI18n } from '../../lib/i18n'

interface BrandProps {
  size?: number
}

export function BrandMark({ size = 36 }: { size?: number }) {
  return (
    <img
      src="/img/pi.png"
      alt="High School Math Pi Logo"
      width={size}
      height={size}
      className="brand-mark"
      style={{
        objectFit: 'cover',
        borderRadius: '8px',
        display: 'inline-block',
      }}
    />
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
