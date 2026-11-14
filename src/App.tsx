import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
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

const ShapesPage = lazy(() => import('./pages/ShapesPage'))

function Loading() {
  return (
    <div className="loading" role="status" aria-live="polite">
      <span className="loading__spinner" aria-hidden="true" />
      <span>Loading…</span>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="grades" element={<GradesPage />} />
        <Route path="grades/:gradeId" element={<GradePage />} />
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
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
