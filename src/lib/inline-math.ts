export type InlineSegment = { type: 'text' | 'math'; value: string }

/**
 * Split prose into text and inline-math segments.
 * Math spans are delimited by `$...$` and may contain escaped characters such as `\$`.
 */
export function splitInlineMath(text: string): InlineSegment[] {
  const segments: InlineSegment[] = []
  const pattern = /\$((?:\\.|[^$\\])+)\$/g
  let last = 0
  let match: RegExpExecArray | null
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) segments.push({ type: 'text', value: text.slice(last, match.index) })
    segments.push({ type: 'math', value: match[1] })
    last = match.index + match[0].length
  }
  if (last < text.length) segments.push({ type: 'text', value: text.slice(last) })
  return segments
}
