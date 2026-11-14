import { Link } from 'react-router-dom'

interface BrandProps {
  size?: number
}

export function BrandMark({ size = 36 }: { size?: number }) {
  return (
    <svg
      className="brand-mark"
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="48" height="48" rx="12" fill="#0e1410" />
      <circle cx="24" cy="24" r="14.5" stroke="#c9ee6e" strokeOpacity="0.3" strokeWidth="1" />
      <path d="M24 10.5 37 36H11Z" stroke="#c9ee6e" strokeWidth="1.7" strokeLinejoin="round" />
      <circle cx="24" cy="24" r="2.3" fill="#c9ee6e" />
    </svg>
  )
}

export function Brand({ size = 36 }: BrandProps) {
  return (
    <Link className="brand" to="/" aria-label="High School Math home">
      <BrandMark size={size} />
      <span className="brand-words">
        <span className="brand-name">High School Math</span>
        <span className="brand-meta">Formula Library · Grades 7–12</span>
      </span>
    </Link>
  )
}
