import { Link, useLocation } from 'react-router-dom'
import { PageHero } from '../components/ui/PageHero'
import { IconArrowRight } from '../components/ui/Icons'

export default function NotFoundPage({ message }: { message?: string }) {
  const location = useLocation()
  return (
    <>
      <PageHero
        eyebrow="404 · Page not found"
        title="This page doesn’t add up."
        intro={message ?? `We couldn’t find anything at ${location.pathname}. It may have moved, or the link may be mistyped.`}
        aside={
          <div className="cluster">
            <Link className="btn btn--lime" to="/">
              Go home
            </Link>
            <Link className="btn btn--on-dark" to="/grades">
              Browse grades <IconArrowRight size={15} />
            </Link>
            <Link className="btn btn--on-dark" to="/search">
              Search
            </Link>
          </div>
        }
      />
    </>
  )
}
