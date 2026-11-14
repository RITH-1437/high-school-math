import katex from 'katex'
import { useMemo } from 'react'
import { splitInlineMath } from '../../lib/inline-math'

interface MathProps {
  tex: string
  display?: boolean
  className?: string
  ariaLabel?: string
}

function renderMath(tex: string, display: boolean): string {
  try {
    return katex.renderToString(tex, {
      displayMode: display,
      throwOnError: false,
      strict: 'ignore',
      trust: false,
      output: 'htmlAndMathml',
      macros: {
        '\\R': '\\mathbb{R}',
        '\\N': '\\mathbb{N}',
        '\\Z': '\\mathbb{Z}',
        '\\Q': '\\mathbb{Q}',
        '\\C': '\\mathbb{C}',
        '\\deg': '^{\\circ}',
      },
    })
  } catch {
    return ''
  }
}

/**
 * Renders trusted, local LaTeX with KaTeX.
 * KaTeX output is the only markup inserted via innerHTML; user input is never rendered here.
 */
export function MathBlock({ tex, display = true, className = '', ariaLabel }: MathProps) {
  const html = useMemo(() => renderMath(tex, display), [tex, display])

  if (!tex.trim()) return null

  if (!html) {
    return (
      <code className={className} aria-label={ariaLabel}>
        {tex}
      </code>
    )
  }

  return (
    <span
      className={`${display ? 'math-display' : 'math-inline'} ${className}`.trim()}
      aria-label={ariaLabel}
      // KaTeX-generated, sanitised markup from local content only.
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

/** Render prose with inline `$...$` mathematics as React nodes (never as raw HTML). */
export function RichText({ text, className }: { text: string; className?: string }) {
  const parts = useMemo(() => splitInlineMath(text).map((segment, key) => ({ ...segment, key })), [text])

  return (
    <span className={className}>
      {parts.map((part) =>
        part.type === 'math' ? (
          <MathBlock key={part.key} tex={part.value} display={false} />
        ) : (
          <span key={part.key}>{part.value}</span>
        ),
      )}
    </span>
  )
}
