import { Link } from 'react-router-dom'
import { grades } from '../../data'
import { gradeCopy } from '../../i18n/content'
import { useI18n } from '../../lib/i18n'
import { Brand } from './Brand'
import { LanguageSwitcher } from './LanguageSwitcher'

export function Footer() {
  const { language, t } = useI18n()

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <Brand size={38} />
            <p className="footer-tagline">{t('footer.tagline')}</p>
            <p className="footer-note">{t('footer.privacy')}</p>
            <div className="footer-language">
              <LanguageSwitcher onDark />
            </div>
          </div>

          <div className="footer-column">
            <h2>{t('footer.explore')}</h2>
            <ul className="footer-links">
              <li>
                <Link to="/grades">{t('footer.allGrades')}</Link>
              </li>
              <li>
                <Link to="/shapes">{t('footer.shapeLab')}</Link>
              </li>
              <li>
                <Link to="/formulas">{t('footer.formulaIndex')}</Link>
              </li>
              <li>
                <Link to="/search">{t('footer.searchLibrary')}</Link>
              </li>
              <li>
                <Link to="/bookmarks">{t('footer.yourBookmarks')}</Link>
              </li>
              <li>
                <Link to="/glossary">{t('footer.glossary')}</Link>
              </li>
              <li>
                <Link to="/graph">{t('footer.grapher')}</Link>
              </li>
              <li>
                <Link to="/bacii">{t('footer.baciiGuide')}</Link>
              </li>
              <li>
                <Link to="/exam">{t('footer.examPapers')}</Link>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h2>{t('footer.grades')}</h2>
            <ul className="footer-links">
              {grades.map((grade) => (
                <li key={grade.id}>
                  <Link to={`/grades/${grade.id}`}>{gradeCopy(grade, language).title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-column">
            <h2>{t('footer.howToUse')}</h2>
            <ul className="footer-links">
              <li>
                <Link to="/#method">{t('footer.studyMethod')}</Link>
              </li>
              <li>
                <Link to="/#subjects">{t('footer.browseSubject')}</Link>
              </li>
              <li>
                <Link to="/#shapes">{t('footer.exploreGeometry')}</Link>
              </li>
              <li>
                <Link to="/search?q=quadratic%20formula">{t('footer.workedFormula')}</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            {t('footer.copyright', { year: new Date().getFullYear() })}{' '}
            <span className="footer-symbol">∀</span>
          </p>
          <p>{t('footer.meta')}</p>
        </div>
      </div>
    </footer>
  )
}
