import { useId } from 'react'
import { Link } from 'react-router-dom'

interface BrandProps {
  size?: number
}

export function BrandMark({ size = 36 }: { size?: number }) {
  const rawId = useId().replace(/:/g, '')
  const bgGradId = `brand-mark-bg-${rawId}`
  const goldGradId = `brand-mark-gold-${rawId}`

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
      <defs>
        <linearGradient id={bgGradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#102A56" />
          <stop offset="100%" stopColor="#183D73" />
        </linearGradient>
        <linearGradient id={goldGradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5D78E" />
          <stop offset="100%" stopColor="#D6A84B" />
        </linearGradient>
      </defs>
      <rect
        x="0.5"
        y="0.5"
        width="47"
        height="47"
        rx="12"
        fill={`url(#${bgGradId})`}
        stroke="rgba(255, 255, 255, 0.18)"
        strokeWidth="1"
      />
      <path
        d="M 13 17.2 C 13 14.8 15 13.2 17.5 13.2 H 35"
        stroke={`url(#${goldGradId})`}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 20 13.2 V 34.8"
        stroke={`url(#${goldGradId})`}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 28 13.2 V 30.8 C 28 32.8 29.8 34.8 32.2 34.8"
        stroke={`url(#${goldGradId})`}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
