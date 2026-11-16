import { Link, useLocation } from 'react-router-dom'
import { PageHero } from '../components/ui/PageHero'
import { IconArrowRight } from '../components/ui/Icons'
import { useI18n } from '../lib/i18n'

export default function NotFoundPage({ message }: { message?: string }) {
  const location = useLocation()
  const { t } = useI18n()
  return (
    <>
      <PageHero
        eyebrow={t('notFound.eyebrow')}
        title={t('notFound.title')}
        intro={message ?? t('notFound.intro', { path: location.pathname })}
        aside={
          <div className="cluster">
            <Link className="btn btn--lime" to="/">
              {t('notFound.goHome')}
            </Link>
            <Link className="btn btn--on-dark" to="/grades">
              {t('notFound.browseGrades')} <IconArrowRight size={15} />
            </Link>
            <Link className="btn btn--on-dark" to="/search">
              {t('notFound.search')}
            </Link>
          </div>
        }
      />
    </>
  )
}
