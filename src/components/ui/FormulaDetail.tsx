import type { Formula } from '../../types/content'
import { formulaContent } from '../../i18n/content'
import { useI18n } from '../../lib/i18n'
import { BookmarkButton } from './BookmarkButton'
import { MathBlock, RichText } from './Math'

export function FormulaDetail({ formula: rawFormula, headingLevel = 3 }: { formula: Formula; headingLevel?: 2 | 3 }) {
  const { language, t } = useI18n()
  const formula = formulaContent(rawFormula, language)
  const Heading = headingLevel === 2 ? 'h2' : 'h3'
  return (
    <article className="formula-detail" id={formula.id}>
      <header className="formula-detail__head">
        <Heading>{formula.title}</Heading>
        <BookmarkButton kind="formula" id={formula.id} label={formula.title} showLabel />
      </header>
      <div className="formula-expression formula-expression--hero" role="math" aria-label={formula.spoken ?? formula.title}>
        <MathBlock tex={formula.expression} />
      </div>
      <p className="formula-detail__desc">
        <RichText text={formula.description} />
      </p>
      {formula.spoken && (
        <p className="formula-detail__spoken">
          <strong>{t('formula.inWords')}</strong> <RichText text={formula.spoken} />
        </p>
      )}

      <div className="formula-detail__grid">
        <div>
          <h4 className="example-card__label">{t('formula.variables')}</h4>
          <div className="data-table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th scope="col">{t('formula.symbol')}</th>
                  <th scope="col">{t('formula.meaning')}</th>
                  <th scope="col">{t('formula.unit')}</th>
                </tr>
              </thead>
              <tbody>
                {formula.variables.map((variable, index) => (
                  <tr key={`${variable.symbol}-${index}`}>
                    <td>
                      <MathBlock tex={variable.symbol} display={false} />
                    </td>
                    <td>
                      {variable.name}
                      {variable.note && <span className="muted"> — {variable.note}</span>}
                    </td>
                    <td className="muted">{variable.unit ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {(formula.conditions?.length || formula.notes) && (
          <div>
            {formula.conditions && formula.conditions.length > 0 && (
              <>
                <h4 className="example-card__label">{t('formula.conditions')}</h4>
                <ul className="plain-list">
                  {formula.conditions.map((condition, index) => (
                    <li key={index}>
                      <RichText text={condition} />
                    </li>
                  ))}
                </ul>
              </>
            )}
            {formula.notes && (
              <div className="callout callout--quiet" style={{ marginTop: '1rem' }}>
                <p>
                  <RichText text={formula.notes} />
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  )
}
