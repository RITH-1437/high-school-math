import { Link } from 'react-router-dom'
import { grades } from '../../data'
import { Brand } from './Brand'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <Brand size={38} />
            <p className="footer-tagline">
              A living mathematics reference for Grades 7–12. Read the idea, follow the proof, turn the shape,
              and practise until it clicks.
            </p>
            <p className="footer-note">
              No accounts. No tracking. Bookmarks and progress stay in your browser.
            </p>
          </div>

          <div className="footer-column">
            <h2>Explore</h2>
            <ul className="footer-links">
              <li>
                <Link to="/grades">All grades</Link>
              </li>
              <li>
                <Link to="/shapes">Shape Lab</Link>
              </li>
              <li>
                <Link to="/formulas">Formula index</Link>
              </li>
              <li>
                <Link to="/search">Search the library</Link>
              </li>
              <li>
                <Link to="/bookmarks">Your bookmarks</Link>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h2>Grades</h2>
            <ul className="footer-links">
              {grades.map((grade) => (
                <li key={grade.id}>
                  <Link to={`/grades/${grade.id}`}>Grade {grade.number}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-column">
            <h2>How to use this site</h2>
            <ul className="footer-links">
              <li>
                <Link to="/#method">A three-pass study method</Link>
              </li>
              <li>
                <Link to="/#subjects">Browse by subject</Link>
              </li>
              <li>
                <Link to="/#shapes">Explore geometry</Link>
              </li>
              <li>
                <Link to="/search?q=quadratic%20formula">A worked formula</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} High School Math. Made for curious minds. <span className="footer-symbol">∀</span>
          </p>
          <p>Grades 7–12 · English · Works offline after first load</p>
        </div>
      </div>
    </footer>
  )
}
