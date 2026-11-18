import { lazy, Suspense } from 'react'
import type { ComponentType } from 'react'
import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import { RootLayout } from './components/layout/RootLayout'
import HomePage from './pages/HomePage'
import GradesPage from './pages/GradesPage'
import GradePage from './pages/GradePage'
import SubjectPage from './pages/SubjectPage'
import TopicPage from './pages/TopicPage'
import FormulaPage from './pages/FormulaPage'
import FormulasPage from './pages/FormulasPage'
import SearchPage from './pages/SearchPage'
import BookmarksPage from './pages/BookmarksPage'
import NotFoundPage from './pages/NotFoundPage'

type PageModule = { default: ComponentType }

/**
 * `React.lazy` with an explicit preload. When a prerendered page boots, the
 * matching chunk is loaded before the first client render so Suspense never
 * swaps the static HTML for a loading spinner.
 */
function lazyPage(factory: () => Promise<PageModule>) {
  let loaded: ComponentType | null = null
  const Lazy = lazy(factory)
  const preload = () =>
    factory().then((module) => {
      loaded = module.default
    })
  function Page() {
    const Loaded = loaded
    return Loaded ? <Loaded /> : <Lazy />
  }
  return Object.assign(Page, { preload })
}

const ShapesPage = lazyPage(() => import('./pages/ShapesPage'))
const ExamPage = lazyPage(() => import('./pages/ExamPage'))
const GlossaryPage = lazyPage(() => import('./pages/GlossaryPage'))
const BaciiPage = lazyPage(() => import('./pages/BaciiPage'))
const GraphPage = lazyPage(() => import('./pages/GraphPage'))
const UnitCirclePage = lazyPage(() => import('./pages/UnitCirclePage'))
const BacIISprintPage = lazyPage(() => import('./pages/BacIISprintPage'))

const LAZY_SECTIONS: Record<string, { preload: () => Promise<void> }> = {
  shapes: ShapesPage,
  exam: ExamPage,
  exams: ExamPage,
  glossary: GlossaryPage,
  bacii: BaciiPage,
  graph: GraphPage,
  plotter: GraphPage,
  'unit-circle': UnitCirclePage,
  circle: UnitCirclePage,
  sprint: BacIISprintPage,
}

/** Loads the code-split page for a pathname, if it has one. Never rejects. */
export function preloadRoute(pathname: string): Promise<void> {
  const segments = pathname.split('/').filter(Boolean)
  if (segments[0] === 'exam' && segments[1] === 'sprint') {
    return BacIISprintPage.preload().catch(() => undefined)
  }
  const section = segments[0] ?? ''
  const page = LAZY_SECTIONS[section]
  return page ? page.preload().catch(() => undefined) : Promise.resolve()
}

function Loading() {
  return (
    <div className="loading" role="status" aria-live="polite">
      <span className="loading__spinner" aria-hidden="true" />
      <span>Loading…</span>
    </div>
  )
}

function CalculusTopicRedirect() {
  const { topicId } = useParams()
  return <Navigate to={`/grades/12/subjects/advanced/topics/${topicId}`} replace />
}

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="grades" element={<GradesPage />} />
        <Route path="grades/:gradeId" element={<GradePage />} />
        <Route path="grades/12/subjects/calculus" element={<Navigate to="/grades/12/subjects/advanced" replace />} />
        <Route path="grades/12/subjects/calculus/topics/:topicId" element={<CalculusTopicRedirect />} />
        <Route path="grades/:gradeId/subjects/:subjectId" element={<SubjectPage />} />
        <Route path="grades/:gradeId/subjects/:subjectId/topics/:topicId" element={<TopicPage />} />
        <Route path="formulas" element={<FormulasPage />} />
        <Route path="formulas/:formulaId" element={<FormulaPage />} />
        <Route
          path="shapes"
          element={
            <Suspense fallback={<Loading />}>
              <ShapesPage />
            </Suspense>
          }
        />
        <Route
          path="shapes/:shapeId"
          element={
            <Suspense fallback={<Loading />}>
              <ShapesPage />
            </Suspense>
          }
        />
        <Route path="search" element={<SearchPage />} />
        <Route path="bookmarks" element={<BookmarksPage />} />
        <Route
          path="exam"
          element={
            <Suspense fallback={<Loading />}>
              <ExamPage />
            </Suspense>
          }
        />
        <Route
          path="exam/sprint"
          element={
            <Suspense fallback={<Loading />}>
              <BacIISprintPage />
            </Suspense>
          }
        />
        <Route path="sprint" element={<Navigate to="/exam/sprint" replace />} />
        <Route
          path="exams"
          element={
            <Suspense fallback={<Loading />}>
              <ExamPage />
            </Suspense>
          }
        />
        <Route
          path="bacii"
          element={
            <Suspense fallback={<Loading />}>
              <BaciiPage />
            </Suspense>
          }
        />
        <Route
          path="bacii/:track"
          element={
            <Suspense fallback={<Loading />}>
              <BaciiPage />
            </Suspense>
          }
        />
        <Route
          path="glossary"
          element={
            <Suspense fallback={<Loading />}>
              <GlossaryPage />
            </Suspense>
          }
        />
        <Route
          path="graph"
          element={
            <Suspense fallback={<Loading />}>
              <GraphPage />
            </Suspense>
          }
        />
        <Route
          path="plotter"
          element={
            <Suspense fallback={<Loading />}>
              <GraphPage />
            </Suspense>
          }
        />
        <Route
          path="unit-circle"
          element={
            <Suspense fallback={<Loading />}>
              <UnitCirclePage />
            </Suspense>
          }
        />
        <Route path="circle" element={<Navigate to="/unit-circle" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
