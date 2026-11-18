/**
 * Small, dependency-free SVG icon set.
 * Icons inherit `currentColor` and use a 1.7 stroke line style for consistency.
 */
import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

function IconBase({ size = 20, children, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  )
}

export const IconHome = (props: IconProps) => (
  <IconBase {...props}>
    <path d="m3 10.8 9-7.2 9 7.2" />
    <path d="M5.5 9.4V21h13V9.4" />
    <path d="M9.5 21v-6.2h5V21" />
  </IconBase>
)

export const IconGrades = (props: IconProps) => (
  <IconBase {...props}>
    <path d="M4 5.5h5.2v13H4z" />
    <path d="M14.8 5.5H20v13h-5.2z" />
    <path d="M9.2 9.4h5.6M9.2 12h5.6M9.2 14.6h5.6" />
  </IconBase>
)

export const IconShapes = (props: IconProps) => (
  <IconBase {...props}>
    <circle cx="8" cy="8" r="4.4" />
    <path d="M14.2 19.8 19 11.3l4.8 8.5z" transform="translate(-4 -1.5) scale(.92)" />
    <path d="M4 20.2h7" />
  </IconBase>
)

export const IconLanguage = (props: IconProps) => (
  <IconBase {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3.4 9h17.2M3.4 15h17.2" />
    <path d="M12 3c2.3 2.4 3.5 5.4 3.5 9s-1.2 6.6-3.5 9c-2.3-2.4-3.5-5.4-3.5-9S9.7 5.4 12 3z" />
  </IconBase>
)

export const IconSearch = (props: IconProps) => (
  <IconBase {...props}>
    <circle cx="10.8" cy="10.8" r="6.8" />
    <path d="m16 16 4.4 4.4" />
  </IconBase>
)

export const IconBookmark = ({ filled = false, ...props }: IconProps & { filled?: boolean }) => (
  <IconBase {...props} fill={filled ? 'currentColor' : 'none'}>
    <path d="M6 4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V21l-6-4-6 4z" />
  </IconBase>
)

export const IconArrowRight = (props: IconProps) => (
  <IconBase {...props}>
    <path d="M4.5 12h15" />
    <path d="m13.5 6 6 6-6 6" />
  </IconBase>
)

export const IconArrowLeft = (props: IconProps) => (
  <IconBase {...props}>
    <path d="M19.5 12h-15" />
    <path d="m10.5 6-6 6 6 6" />
  </IconBase>
)

export const IconChevronDown = (props: IconProps) => (
  <IconBase {...props}>
    <path d="m6 9 6 6 6-6" />
  </IconBase>
)

export const IconChevronRight = (props: IconProps) => (
  <IconBase {...props}>
    <path d="m9 6 6 6-6 6" />
  </IconBase>
)

export const IconSun = (props: IconProps) => (
  <IconBase {...props}>
    <circle cx="12" cy="12" r="4.1" />
    <path d="M12 2.2v2M12 19.8v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.2 12h2M19.8 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
  </IconBase>
)

export const IconMoon = (props: IconProps) => (
  <IconBase {...props}>
    <path d="M20.2 14.2A8.4 8.4 0 0 1 9.8 3.8a8.4 8.4 0 1 0 10.4 10.4Z" />
  </IconBase>
)

export const IconClose = (props: IconProps) => (
  <IconBase {...props}>
    <path d="m5.5 5.5 13 13M18.5 5.5l-13 13" />
  </IconBase>
)

export const IconMenu = (props: IconProps) => (
  <IconBase {...props}>
    <path d="M3.5 6.5h17M3.5 12h17M3.5 17.5h17" />
  </IconBase>
)

export const IconCheck = (props: IconProps) => (
  <IconBase {...props}>
    <path d="m4.5 12.5 5 5L19.5 6" />
  </IconBase>
)

export const IconSpark = (props: IconProps) => (
  <IconBase {...props}>
    <path d="M12 2.5c.7 5.4 4.1 8.8 9.5 9.5-5.4.7-8.8 4.1-9.5 9.5-.7-5.4-4.1-8.8-9.5-9.5 5.4-.7 8.8-4.1 9.5-9.5Z" />
  </IconBase>
)

export const IconBook = (props: IconProps) => (
  <IconBase {...props}>
    <path d="M4 4.5h6a2 2 0 0 1 2 2V21a3 3 0 0 0-3-3H4z" />
    <path d="M20 4.5h-6a2 2 0 0 0-2 2V21a3 3 0 0 1 3-3h5z" />
  </IconBase>
)

export const IconCompass = (props: IconProps) => (
  <IconBase {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="m15.5 8.5-2 5-5 2 2-5z" />
  </IconBase>
)

export const IconFunction = (props: IconProps) => (
  <IconBase {...props}>
    <path d="M14.8 3.8a2.8 2.8 0 0 0-2.8 2.8v10.8a2.8 2.8 0 0 1-2.8 2.8" />
    <path d="M7.2 9h6.3M7.2 15h6.3" />
    <path d="M17.2 9v10" />
  </IconBase>
)

export const IconGrid = (props: IconProps) => (
  <IconBase {...props}>
    <rect x="3.5" y="3.5" width="7" height="7" rx="1" />
    <rect x="13.5" y="3.5" width="7" height="7" rx="1" />
    <rect x="3.5" y="13.5" width="7" height="7" rx="1" />
    <rect x="13.5" y="13.5" width="7" height="7" rx="1" />
  </IconBase>
)

export const IconFormula = (props: IconProps) => (
  <IconBase {...props}>
    <path d="M13.2 3.8h-1.8a2.6 2.6 0 0 0-2.6 2.6v11.2a2.6 2.6 0 0 1-2.6 2.6H4.6" />
    <path d="M6.6 9.2h6.1" />
    <path d="m14.4 10.2 4.6 6.2M19 10.2l-4.6 6.2" />
  </IconBase>
)

export const IconShuffle = (props: IconProps) => (
  <IconBase {...props}>
    <path d="M3.5 7h3.2c4.6 0 5.8 10 10.6 10h3.2" />
    <path d="m17.5 14 3 3-3 3" />
    <path d="M3.5 17h3.2c1.6 0 2.7-1.2 3.7-2.8M14.2 9.3c1-1.4 2-2.3 3.1-2.3h3.2" />
    <path d="m17.5 4 3 3-3 3" />
  </IconBase>
)

export const IconRotate = (props: IconProps) => (
  <IconBase {...props}>
    <path d="M20.5 8.5A9 9 0 1 0 21 15" />
    <path d="M20.5 3v5.5H15" />
  </IconBase>
)

export const IconPlay = (props: IconProps) => (
  <IconBase {...props}>
    <polygon points="6,3 20,12 6,21" fill="currentColor" stroke="none" />
  </IconBase>
)

export const IconPause = (props: IconProps) => (
  <IconBase {...props}>
    <rect x="5" y="3" width="4" height="18" rx="1" fill="currentColor" stroke="none" />
    <rect x="15" y="3" width="4" height="18" rx="1" fill="currentColor" stroke="none" />
  </IconBase>
)

export const IconZoom = (props: IconProps) => (
  <IconBase {...props}>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="m15.4 15.4 5 5M8 10.5h5M10.5 8v5" />
  </IconBase>
)

export const IconTag = (props: IconProps) => (
  <IconBase {...props}>
    <path d="M3.8 11.4V4.5a.7.7 0 0 1 .7-.7h6.9l9.2 9.2a1.4 1.4 0 0 1 0 2l-5.2 5.2a1.4 1.4 0 0 1-2 0z" />
    <circle cx="8.2" cy="8.2" r="1.3" />
  </IconBase>
)

export const IconExternal = (props: IconProps) => (
  <IconBase {...props}>
    <path d="M14 4.5h5.5V10" />
    <path d="M19.5 4.5 11 13" />
    <path d="M18.5 14.5v4a1.5 1.5 0 0 1-1.5 1.5H5.5A1.5 1.5 0 0 1 4 18.5V7a1.5 1.5 0 0 1 1.5-1.5h4" />
  </IconBase>
)

export const IconPrint = (props: IconProps) => (
  <IconBase {...props}>
    <path d="M7 8V3.5h10V8" />
    <path d="M7 17H4.5A1.5 1.5 0 0 1 3 15.5v-5A1.5 1.5 0 0 1 4.5 9h15a1.5 1.5 0 0 1 1.5 1.5v5a1.5 1.5 0 0 1-1.5 1.5H17" />
    <rect x="7" y="14" width="10" height="6.5" rx="1" />
    <path d="M17.5 12h.01" />
  </IconBase>
)

export const IconEye = (props: IconProps) => (
  <IconBase {...props}>
    <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
    <circle cx="12" cy="12" r="3" />
  </IconBase>
)

export const IconEyeOff = (props: IconProps) => (
  <IconBase {...props}>
    <path d="M4 4 20 20" />
    <path d="M9.7 5.9A8.6 8.6 0 0 1 12 5.5c6 0 9.5 6.5 9.5 6.5a17 17 0 0 1-3 3.6M6.4 7.4A17.7 17.7 0 0 0 2.5 12S6 18.5 12 18.5a9 9 0 0 0 3.2-.6" />
    <path d="M10.5 10.7a2.8 2.8 0 0 0 3.7 3.7" />
  </IconBase>
)

export const IconExam = (props: IconProps) => (
  <IconBase {...props}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
    <path d="m9 15 2 2 4-4" />
  </IconBase>
)

export const IconCopy = (props: IconProps) => (
  <IconBase {...props}>
    <rect width="13" height="13" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </IconBase>
)
