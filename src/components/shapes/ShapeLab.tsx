import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Shape, ShapeDimensions } from '../../types/content'
import { topicsForShape, topicUrl } from '../../data'
import { formatMetricValue } from '../../lib/format'
import { useI18n } from '../../lib/i18n'
import { topicCopy } from '../../i18n/content'
import { BookmarkButton } from '../ui/BookmarkButton'
import { MathBlock, RichText } from '../ui/Math'
import { IconEye, IconEyeOff, IconRotate } from '../ui/Icons'
import { Shape2D } from './Shape2D'
import { Shape3D } from './Shape3D'

function defaultsFor(shape: Shape): ShapeDimensions {
  return Object.fromEntries(shape.dimensions.map((d) => [d.key, d.defaultValue]))
}

function metricUnit(kind: string, baseUnit: string): string {
  if (kind === 'angle') return '°'
  if (!baseUnit) return ''
  if (kind === 'area' || kind === 'surface') return `${baseUnit}²`
  if (kind === 'volume') return `${baseUnit}³`
  return baseUnit
}

export function ShapeLab({ shape }: { shape: Shape }) {
  const { num, t } = useI18n()
  const [dims, setDims] = useState<ShapeDimensions>(() => defaultsFor(shape))
  const [showLabels, setShowLabels] = useState(true)
  const [highlight, setHighlight] = useState<string | undefined>()

  const baseUnit = shape.dimensions.find((d) => d.unit)?.unit ?? ''

  const values = useMemo(
    () =>
      shape.metrics.map((metric) => {
        let computed = Number.NaN
        let exact: string | null = null
        try {
          computed = metric.compute(dims)
          exact = metric.exact ? metric.exact(dims) : null
        } catch {
          computed = Number.NaN
        }
        return { metric, computed, exact }
      }),
    [shape, dims],
  )

  const isDefault = shape.dimensions.every((d) => dims[d.key] === d.defaultValue)

  return (
    <div className="lab">
      <div className="lab__stage">
        <div className="lab__viewer">
          {shape.category === '2d' ? (
            <Shape2D shape={shape} dimensions={dims} showLabels={showLabels} highlight={highlight} />
          ) : (
            <Shape3D shape={shape} dimensions={dims} showLabels={showLabels} highlight={highlight} />
          )}
        </div>
        <div className="lab__toolbar">
          <button
            type="button"
            className="btn btn--on-dark btn--sm"
            aria-pressed={showLabels}
            onClick={() => setShowLabels((v) => !v)}
          >
            {showLabels ? <IconEyeOff size={15} /> : <IconEye size={15} />}
            {showLabels ? t('lab.hideLabels') : t('lab.showLabels')}
          </button>
          <button
            type="button"
            className="btn btn--on-dark btn--sm"
            onClick={() => setDims(defaultsFor(shape))}
            disabled={isDefault}
          >
            <IconRotate size={15} /> {t('lab.resetDimensions')}
          </button>
        </div>
      </div>

      <div className="lab__panel">
        <section aria-labelledby="dims-heading">
          <h2 id="dims-heading" className="lab__heading">
            {t('lab.dimensions')}
          </h2>
          <div className="lab__controls">
            {shape.dimensions.map((dimension) => {
              const id = `dim-${shape.id}-${dimension.key}`
              const current = dims[dimension.key]
              return (
                <div
                  key={dimension.key}
                  className="slider"
                  onMouseEnter={() => setHighlight(dimension.key)}
                  onMouseLeave={() => setHighlight(undefined)}
                  onFocusCapture={() => setHighlight(dimension.key)}
                  onBlurCapture={() => setHighlight(undefined)}
                >
                  <div className="slider__head">
                    <label htmlFor={id}>
                      {dimension.label} <MathBlock tex={dimension.symbol} display={false} />
                    </label>
                    <output htmlFor={id}>
                      {t('lab.dimensionValue', {
                        value: num(formatMetricValue(current, 2)),
                        unit: dimension.unit,
                      })}
                    </output>
                  </div>
                  <input
                    id={id}
                    type="range"
                    min={dimension.min}
                    max={dimension.max}
                    step={dimension.step}
                    value={current}
                    aria-valuetext={`${current} ${dimension.unit}`}
                    onChange={(event) => {
                      const next = Number(event.target.value)
                      if (Number.isFinite(next)) setDims((c) => ({ ...c, [dimension.key]: next }))
                    }}
                  />
                  {dimension.description && <p className="slider__hint">{dimension.description}</p>}
                </div>
              )
            })}
          </div>
        </section>

        <section aria-labelledby="values-heading" aria-live="polite">
          <h2 id="values-heading" className="lab__heading">
            {t('lab.liveMeasurements')}
          </h2>
          <dl className="readouts">
            {values.map(({ metric, computed, exact }) => (
              <div key={metric.key} className="readout">
                <dt>{metric.label}</dt>
                <dd>
                  <strong>
                    {num(formatMetricValue(computed, metric.precision ?? 2))} {metricUnit(metric.kind, baseUnit)}
                  </strong>
                  {exact && <span className="readout__exact">= {exact}</span>}
                  <span className="readout__formula">
                    <MathBlock tex={metric.formula} display={false} />
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </div>
  )
}

export function ShapeReference({ shape }: { shape: Shape }) {
  const { language, t } = useI18n()
  const related = topicsForShape(shape.id)
  return (
    <div className="shape-reference">
      <div className="shape-reference__main">
        <header className="shape-reference__head">
          <div>
            <span className="eyebrow">{shape.category === '2d' ? t('lab.shape2d') : t('lab.shape3d')}</span>
            <h2>{shape.name}</h2>
          </div>
          <BookmarkButton kind="shape" id={shape.id} label={shape.name} showLabel />
        </header>
        <p className="lead">
          <RichText text={shape.definition} />
        </p>

        <h3 className="lab__heading">{t('lab.properties')}</h3>
        <ul className="plain-list">
          {shape.properties.map((property, index) => (
            <li key={index}>
              <RichText text={property} />
            </li>
          ))}
        </ul>

        {related.length > 0 && (
          <>
            <h3 className="lab__heading">{t('lab.learnInContext')}</h3>
            <ul className="plain-list">
              {related.map((ref) => (
                <li key={ref.key}>
                  <Link to={topicUrl(ref)}>{topicCopy(ref.topic, language).title}</Link>{' '}
                  <span className="muted">— {t('lab.grade', { n: ref.grade.number })}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <div className="shape-reference__side">
        <h3 className="lab__heading">{t('lab.formulas')}</h3>
        <ul className="formula-lines">
          {shape.formulas.map((formula, index) => (
            <li key={index}>
              <span className="formula-lines__label">{formula.label}</span>
              <MathBlock tex={formula.expression} />
              {formula.note && (
                <span className="formula-lines__note">
                  <RichText text={formula.note} />
                </span>
              )}
            </li>
          ))}
        </ul>

        <h3 className="lab__heading">{t('lab.solvedExample')}</h3>
        <div className="example-card example-card--compact">
          <p>
            <RichText text={shape.example.problem} />
          </p>
          <ol className="plain-list plain-list--numbered">
            {shape.example.steps.map((step, index) => (
              <li key={index}>
                <RichText text={step} />
              </li>
            ))}
          </ol>
          <div className="example-card__answer">
            <p>
              <strong>{t('lab.answer')}</strong> <RichText text={shape.example.answer} />
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
