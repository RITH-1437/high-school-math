import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: 0 | 1 | 2 | 3 | 4 | 5
  as?: 'div' | 'section' | 'article' | 'li'
}

/**
 * Progressive reveal on scroll. Content is always present in the DOM and
 * becomes visible immediately for users who prefer reduced motion.
 */
export function Reveal({ children, className = '', delay = 0, as = 'div' }: RevealProps) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion || typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const Tag = as
  return (
    <Tag
      ref={ref as never}
      className={`reveal${visible ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
      data-delay={delay || undefined}
    >
      {children}
    </Tag>
  )
}
