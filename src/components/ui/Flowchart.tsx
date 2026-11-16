import type { Flowchart as FlowchartData, FlowNodeKind } from '../../types/content'
import { useI18n } from '../../lib/i18n'
import { MathBlock, RichText } from './Math'

const KIND_LABEL: Record<FlowNodeKind, { en: string; km: string }> = {
  start: { en: 'Start', km: 'ចាប់ផ្ដើម' },
  step: { en: 'Step', km: 'ជំហាន' },
  decision: { en: 'Decide', km: 'សម្រេចចិត្ត' },
  end: { en: 'Finish', km: 'បញ្ចប់' },
}

/**
 * Renders a data-driven flowchart as an ordered list, so it reads in order for
 * screen readers, reflows on narrow screens and never needs hand-placed
 * coordinates. Decisions show their branches side by side (stacked on mobile).
 */
export function Flowchart({ chart, headingLevel = 3 }: { chart: FlowchartData; headingLevel?: 3 | 4 }) {
  const { isKhmer } = useI18n()
  const pick = (en: string, km?: string) => (isKhmer && km ? km : en)
  const Heading = headingLevel === 3 ? 'h3' : 'h4'
  const titleId = `${chart.id}-title`
  let stepNumber = 0

  return (
    <figure className="flow" aria-labelledby={titleId}>
      <figcaption className="flow__head">
        <Heading id={titleId} className="flow__title">
          {pick(chart.title, chart.titleKm)}
        </Heading>
        <p className="flow__summary">
          <RichText text={pick(chart.summary, chart.summaryKm)} />
        </p>
      </figcaption>

      <ol className="flow__list">
        {chart.nodes.map((node, index) => {
          if (node.kind === 'step') stepNumber += 1
          const kindLabel = isKhmer ? KIND_LABEL[node.kind].km : KIND_LABEL[node.kind].en
          return (
            <li key={index} className={`flow__node flow__node--${node.kind}`}>
              <div className="flow__card">
                <span className="flow__kind">
                  {kindLabel}
                  {node.kind === 'step' ? ` ${stepNumber}` : ''}
                </span>
                <p className="flow__text">
                  <RichText text={pick(node.text, node.textKm)} />
                </p>
                {node.math && (
                  <div className="flow__math">
                    <MathBlock tex={node.math} />
                  </div>
                )}
              </div>
              {node.branches && node.branches.length > 0 && (
                <ul className="flow__branches" data-count={Math.min(node.branches.length, 4)}>
                  {node.branches.map((branch, b) => (
                    <li key={b} className="flow__branch">
                      <span className="flow__branch-label">{pick(branch.label, branch.labelKm)}</span>
                      <p>
                        <RichText text={pick(branch.text, branch.textKm)} />
                      </p>
                      {branch.math && <MathBlock tex={branch.math} />}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          )
        })}
      </ol>
    </figure>
  )
}
