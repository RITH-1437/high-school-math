import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useBookmarks } from '../../lib/bookmarks'
import { useI18n } from '../../lib/i18n'
import { useSearchUI } from '../../lib/search-ui'
import { useTheme } from '../../lib/theme'
import { Brand } from './Brand'
import { LanguageSwitcher } from './LanguageSwitcher'
import {
  IconBookmark,
  IconBook,
  IconChevronDown,
  IconExam,
  IconFormula,
  IconGrades,
  IconHome,
  IconMoon,
  IconSearch,
  IconShapes,
  IconSun,
} from '../ui/Icons'

export function Header() {
  const { theme, toggleTheme } = useTheme()
  const { count } = useBookmarks()
  const { openSearch } = useSearchUI()
  const { isKhmer, t, tn } = useI18n()
  const [activeMenu, setActiveMenu] = useState<string | null>(null)

  const themeLabel = theme === 'light' ? t('nav.themeToDark') : t('nav.themeToLight')

  return (
    <header className="site-header">
      <div className="header-inner">
        <Brand />
        <nav className="primary-nav" aria-label={t('nav.primary')}>
          {/* 1. Home with Comprehensive Platform Mega Menu */}
          <div
            className={`nav-dropdown nav-dropdown--mega${activeMenu === 'home' ? ' is-open' : ''}`}
            onMouseEnter={() => setActiveMenu('home')}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <NavLink
              to="/"
              end
              className={({ isActive }) => `nav-link nav-link--has-dropdown${isActive ? ' is-active' : ''}`}
            >
              <IconHome size={16} />
              <span>{t('nav.home')}</span>
              <IconChevronDown size={13} className="nav-dropdown__caret" />
            </NavLink>

            <div className="nav-dropdown__panel nav-dropdown__panel--mega">
              <div className="nav-dropdown__head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="nav-dropdown__eyebrow">
                  {isKhmer ? 'មាតិកា និងផ្នែកទាំងអស់នៃបណ្ណាល័យគណិតវិទ្យា' : 'High School Math Platform Index & Directory'}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.65)' }}>
                  Grades 7–12 · MoEYS Standard
                </span>
              </div>

              <div className="mega-menu-grid">
                {/* Column 1: Curriculum by Grade */}
                <div className="mega-menu-col">
                  <div className="mega-col-header">
                    <IconGrades size={16} />
                    <h4>{isKhmer ? 'កម្មវិធីសិក្សាតាមថ្នាក់' : 'Curriculum by Grade'}</h4>
                  </div>
                  <ul className="mega-links-list">
                    <li>
                      <Link to="/grades/7" onClick={() => setActiveMenu(null)}>
                        <strong>{isKhmer ? 'ថ្នាក់ទី ៧' : 'Grade 7'}</strong>
                        <span>{isKhmer ? 'ចំនួនគត់ ប្រភាគ ស្វ័យគុណ' : 'Integers, rationals, powers'}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/grades/8" onClick={() => setActiveMenu(null)}>
                        <strong>{isKhmer ? 'ថ្នាក់ទី ៨' : 'Grade 8'}</strong>
                        <span>{isKhmer ? 'សមីការលីនេអ៊ែរ ពីតាករ ស៊ីឡាំង' : 'Linear equations, Pythagoras'}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/grades/9" onClick={() => setActiveMenu(null)}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <strong>{isKhmer ? 'ថ្នាក់ទី ៩' : 'Grade 9'}</strong>
                          <span className="nav-dropdown__badge nav-dropdown__badge--red">{isKhmer ? 'ឌីប្លូម' : 'Diploma'}</span>
                        </div>
                        <span>{isKhmer ? 'សមីការដឺក្រេទីពីរ ត្រីកោណមាត្រ' : 'Quadratics, systems, trig'}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/grades/10" onClick={() => setActiveMenu(null)}>
                        <strong>{isKhmer ? 'ថ្នាក់ទី ១០' : 'Grade 10'}</strong>
                        <span>{isKhmer ? 'អនុគមន៍ ទ្រឹស្តីបទរង្វង់ ស្ថិតិ' : 'Functions, circle theorems'}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/grades/11" onClick={() => setActiveMenu(null)}>
                        <strong>{isKhmer ? 'ថ្នាក់ទី ១១' : 'Grade 11'}</strong>
                        <span>{isKhmer ? 'រង្វង់ត្រីកោណមាត្រ វ៉ិចទ័រ លីមីត' : 'Trig unit circle, vectors, limits'}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/grades/12" onClick={() => setActiveMenu(null)}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <strong>{isKhmer ? 'ថ្នាក់ទី ១២' : 'Grade 12'}</strong>
                          <span className="nav-dropdown__badge nav-dropdown__badge--gold">{isKhmer ? 'បាក់ឌុប' : 'Bac II'}</span>
                        </div>
                        <span>{isKhmer ? 'ដេរីវេ អាំងតេក្រាល កុំផ្លិច លំហ' : 'Calculus, complex, 3D vectors'}</span>
                      </Link>
                    </li>
                  </ul>
                  <Link to="/grades" className="mega-col-foot-link" onClick={() => setActiveMenu(null)}>
                    {isKhmer ? 'មើលគ្រប់កម្រិតថ្នាក់ទាំងអស់ →' : 'View all 6 grades →'}
                  </Link>
                </div>

                {/* Column 2: Interactive Laboratories */}
                <div className="mega-menu-col">
                  <div className="mega-col-header">
                    <IconShapes size={16} />
                    <h4>{isKhmer ? 'មន្ទីរពិសោធន៍គណិតវិទ្យា' : 'Interactive Labs'}</h4>
                  </div>
                  <ul className="mega-links-list">
                    <li>
                      <Link to="/shapes" onClick={() => setActiveMenu(null)}>
                        <strong>{isKhmer ? 'មន្ទីរពិសោធន៍ធរណីមាត្រ (Shape Lab)' : 'Geometry Shape Lab'}</strong>
                        <span>{isKhmer ? 'រាង ២D និង ៣D អន្តរកម្មជាមួយរង្វាស់ផ្ទៃនិងមាឌ' : '2D shapes & 3D solid recalculations'}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/shapes/cylinder" onClick={() => setActiveMenu(null)}>
                        <strong>{isKhmer ? 'រូបធរណីមាត្រ ៣D (3D Solids)' : '3D Solid Visualizer'}</strong>
                        <span>{isKhmer ? 'ស៊ីឡាំង កោណ ស្វ៊ែរ គូប ព្រីស' : 'Cylinders, cones, spheres, cubes'}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/grades/9/subjects/algebra/topics/quadratic-equations-intro#visual-guide" onClick={() => setActiveMenu(null)}>
                        <strong>{isKhmer ? 'ដ្យាក្រាម និង Flowcharts' : 'Decision Flowcharts'}</strong>
                        <span>{isKhmer ? 'វិធីដោះស្រាយសមីការ ដេរីវេ និងធរណីមាត្រ' : 'Step-by-step mathematical algorithms'}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/exam" onClick={() => setActiveMenu(null)}>
                        <strong>{isKhmer ? 'មន្ទីរពិសោធន៍ប្រឡង (Exam Lab)' : 'Testing Laboratory'}</strong>
                        <span>{isKhmer ? 'ធ្វើតេស្តកំណត់ម៉ោង ជាមួយការដាក់ពិន្ទុស្វ័យប្រវត្តិ' : 'Timed interactive tests with scoring'}</span>
                      </Link>
                    </li>
                  </ul>
                  <Link to="/shapes" className="mega-col-foot-link" onClick={() => setActiveMenu(null)}>
                    {isKhmer ? 'ចូលទៅកាន់មន្ទីរពិសោធន៍រាង →' : 'Explore Shape Lab →'}
                  </Link>
                </div>

                {/* Column 3: Formulas & Reference */}
                <div className="mega-menu-col">
                  <div className="mega-col-header">
                    <IconFormula size={16} />
                    <h4>{isKhmer ? 'បណ្ណាល័យរូបមន្ត & វចនានុក្រម' : 'Formulas & Glossary'}</h4>
                  </div>
                  <ul className="mega-links-list">
                    <li>
                      <Link to="/formulas" onClick={() => setActiveMenu(null)}>
                        <strong>{isKhmer ? 'តារាងរូបមន្តទាំងអស់ (Formula Index)' : 'Formula Index'}</strong>
                        <span>{isKhmer ? 'រូបមន្តគណិតវិទ្យា ២៥២ ផ្ទៀងផ្ទាត់ត្រឹមត្រូវ ១០០%' : 'Complete directory of 252 verified formulas'}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/glossary" onClick={() => setActiveMenu(null)}>
                        <strong>{isKhmer ? 'វចនានុក្រមគណិតវិទ្យា (Glossary)' : 'Mathematics Glossary'}</strong>
                        <span>{isKhmer ? 'ពាក្យបច្ចេកសព្ទ ២២៧ ខ្មែរ-អង់គ្លេស និងនិមិត្តសញ្ញា' : '227 bilingual definitions & notations'}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/grades/10/subjects/algebra" onClick={() => setActiveMenu(null)}>
                        <strong>{isKhmer ? 'ពីជគណិត និងអនុគមន៍' : 'Algebra & Functions'}</strong>
                        <span>{isKhmer ? 'សមីការ វិសមីការ ពហុធា និងអិចស្បូណង់ស្យែល' : 'Quadratics, polynomials, systems'}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/grades/12/subjects/calculus" onClick={() => setActiveMenu(null)}>
                        <strong>{isKhmer ? 'គណិតវិភាគ និងដេរីវេ' : 'Calculus & Analysis'}</strong>
                        <span>{isKhmer ? 'លីមីត ដេរីវេ អាំងតេក្រាល និងសមីការឌីផេរ៉ង់ស្យែល' : 'Limits, derivatives, integrals'}</span>
                      </Link>
                    </li>
                  </ul>
                  <Link to="/formulas" className="mega-col-foot-link" onClick={() => setActiveMenu(null)}>
                    {isKhmer ? 'ស្វែងរករូបមន្តទាំងអស់ →' : 'Browse all 252 formulas →'}
                  </Link>
                </div>

                {/* Column 4: National Examination Papers */}
                <div className="mega-menu-col">
                  <div className="mega-col-header">
                    <IconExam size={16} />
                    <h4>{isKhmer ? 'វិញ្ញាសាប្រឡងជាតិ' : 'National Examinations'}</h4>
                  </div>
                  <ul className="mega-links-list">
                    <li>
                      <Link to="/exam" onClick={() => setActiveMenu(null)}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <strong>{isKhmer ? 'វិញ្ញាសាឌីប្លូម' : 'Diploma Paper'}</strong>
                          <span className="nav-dropdown__badge nav-dropdown__badge--red">{isKhmer ? 'ថ្នាក់ទី ៩' : 'Grade 9'}</span>
                        </div>
                        <span>{isKhmer ? '១០០ ពិន្ទុ រយៈពេល ៩០ នាទី ជាមួយចម្លើយលម្អិត' : '100-mark paper, 90 mins with solutions'}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/exam" onClick={() => setActiveMenu(null)}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <strong>{isKhmer ? 'វិញ្ញាសាបាក់ឌុប' : 'Bac II Paper'}</strong>
                          <span className="nav-dropdown__badge nav-dropdown__badge--gold">{isKhmer ? 'ថ្នាក់ទី ១២' : 'Grade 12'}</span>
                        </div>
                        <span>{isKhmer ? '១០០ ពិន្ទុ រយៈពេល ១៥០ នាទី ស្តង់ដារក្រសួង' : '100-mark paper, 150 mins MoEYS standard'}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/exam" onClick={() => setActiveMenu(null)}>
                        <strong>{isKhmer ? 'ទម្រង់ក្រដាសប្រឡងផ្លូវការ' : 'Printable MoEYS Sheets'}</strong>
                        <span>{isKhmer ? 'ទម្រង់ក្បាលក្រសួងសម្រាប់បោះពុម្ពឬរក្សាទុកជា PDF' : 'Official MoEYS layout ready for print / PDF'}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/bookmarks" onClick={() => setActiveMenu(null)}>
                        <strong>{isKhmer ? 'ចំណាំរបស់អ្នក (Bookmarks)' : 'Saved Bookmarks'}</strong>
                        <span>{isKhmer ? 'រូបមន្ត និងប្រធានបទដែលបានរក្សាទុក' : 'Personal saved formulas & topics'}</span>
                      </Link>
                    </li>
                  </ul>
                  <Link to="/exam" className="mega-col-foot-link" onClick={() => setActiveMenu(null)}>
                    {isKhmer ? 'ចូលធ្វើតេស្តសាកល្បង →' : 'Start exam practice →'}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Grades Dropdown */}
          <div
            className={`nav-dropdown${activeMenu === 'grades' ? ' is-open' : ''}`}
            onMouseEnter={() => setActiveMenu('grades')}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <NavLink
              to="/grades"
              className={({ isActive }) => `nav-link nav-link--has-dropdown${isActive ? ' is-active' : ''}`}
            >
              <IconGrades size={16} />
              <span>{t('nav.grades')}</span>
              <IconChevronDown size={13} className="nav-dropdown__caret" />
            </NavLink>

            <div className="nav-dropdown__panel nav-dropdown__panel--grades">
              <div className="nav-dropdown__head">
                <span className="nav-dropdown__eyebrow">
                  {isKhmer ? 'កម្រិតថ្នាក់ (Curriculum Grades 7–12)' : 'Secondary Curriculum (Grades 7–12)'}
                </span>
              </div>
              <div className="nav-dropdown__grid nav-dropdown__grid--grades">
                <Link to="/grades/7" className="nav-dropdown__card" onClick={() => setActiveMenu(null)}>
                  <div className="nav-dropdown__card-top">
                    <strong className="nav-dropdown__card-title">{isKhmer ? 'ថ្នាក់ទី ៧' : 'Grade 7'}</strong>
                  </div>
                  <span className="nav-dropdown__card-desc">
                    {isKhmer ? 'ចំនួនគត់ ប្រភាគ ស្វ័យគុណ ធរណីមាត្រគ្រឹះ' : 'Integers, rational numbers, powers, plane figures'}
                  </span>
                </Link>

                <Link to="/grades/8" className="nav-dropdown__card" onClick={() => setActiveMenu(null)}>
                  <div className="nav-dropdown__card-top">
                    <strong className="nav-dropdown__card-title">{isKhmer ? 'ថ្នាក់ទី ៨' : 'Grade 8'}</strong>
                  </div>
                  <span className="nav-dropdown__card-desc">
                    {isKhmer ? 'សមីការលីនេអ៊ែរ ពីតាករ ស៊ីឡាំង ស្ថិតិ' : 'Linear equations, Pythagoras, cylinders, probability'}
                  </span>
                </Link>

                <Link to="/grades/9" className="nav-dropdown__card" onClick={() => setActiveMenu(null)}>
                  <div className="nav-dropdown__card-top">
                    <strong className="nav-dropdown__card-title">{isKhmer ? 'ថ្នាក់ទី ៩' : 'Grade 9'}</strong>
                    <span className="nav-dropdown__badge nav-dropdown__badge--red">{isKhmer ? 'ឌីប្លូម' : 'Diploma'}</span>
                  </div>
                  <span className="nav-dropdown__card-desc">
                    {isKhmer ? 'សមីការដឺក្រេទីពីរ ប្រព័ន្ធសមីការ ត្រីកោណមាត្រ' : 'Quadratics, systems, right-triangle trig, statistics'}
                  </span>
                </Link>

                <Link to="/grades/10" className="nav-dropdown__card" onClick={() => setActiveMenu(null)}>
                  <div className="nav-dropdown__card-top">
                    <strong className="nav-dropdown__card-title">{isKhmer ? 'ថ្នាក់ទី ១០' : 'Grade 10'}</strong>
                  </div>
                  <span className="nav-dropdown__card-desc">
                    {isKhmer ? 'អនុគមន៍ ទ្រឹស្តីបទរង្វង់ ការវាស់ស្ទង់បម្រែបម្រួល' : 'Function families, circle theorems, triangle trig'}
                  </span>
                </Link>

                <Link to="/grades/11" className="nav-dropdown__card" onClick={() => setActiveMenu(null)}>
                  <div className="nav-dropdown__card-top">
                    <strong className="nav-dropdown__card-title">{isKhmer ? 'ថ្នាក់ទី ១១' : 'Grade 11'}</strong>
                  </div>
                  <span className="nav-dropdown__card-desc">
                    {isKhmer ? 'រង្វង់ត្រីកោណមាត្រ វ៉ិចទ័រ ស្វ៊ីត លីមីត' : 'Trig unit circle, vectors, sequences, limits'}
                  </span>
                </Link>

                <Link to="/grades/12" className="nav-dropdown__card" onClick={() => setActiveMenu(null)}>
                  <div className="nav-dropdown__card-top">
                    <strong className="nav-dropdown__card-title">{isKhmer ? 'ថ្នាក់ទី ១២' : 'Grade 12'}</strong>
                    <span className="nav-dropdown__badge nav-dropdown__badge--gold">{isKhmer ? 'បាក់ឌុប' : 'Bac II'}</span>
                  </div>
                  <span className="nav-dropdown__card-desc">
                    {isKhmer ? 'ដេរីវេ អាំងតេក្រាល ចំនួនកុំផ្លិច ធរណីមាត្រក្នុងលំហ' : 'Derivatives, integrals, complex numbers, 3D vectors'}
                  </span>
                </Link>
              </div>
              <div className="nav-dropdown__foot">
                <Link to="/grades" className="nav-dropdown__foot-link" onClick={() => setActiveMenu(null)}>
                  {isKhmer ? 'មើលកម្រិតថ្នាក់ទាំងអស់ទាំង ៦ →' : 'View all 6 grades overview →'}
                </Link>
              </div>
            </div>
          </div>

          {/* 3. Formulas & Library Dropdown */}
          <div
            className={`nav-dropdown${activeMenu === 'formulas' ? ' is-open' : ''}`}
            onMouseEnter={() => setActiveMenu('formulas')}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <NavLink
              to="/formulas"
              className={({ isActive }) => `nav-link nav-link--has-dropdown${isActive ? ' is-active' : ''}`}
            >
              <IconFormula size={16} />
              <span>{t('nav.formulas')}</span>
              <IconChevronDown size={13} className="nav-dropdown__caret" />
            </NavLink>

            <div className="nav-dropdown__panel nav-dropdown__panel--library">
              <div className="nav-dropdown__head">
                <span className="nav-dropdown__eyebrow">
                  {isKhmer ? 'បណ្ណាល័យរូបមន្ត និងឧបករណ៍គណិតវិទ្យា' : 'Formulas & Mathematical Laboratory'}
                </span>
              </div>
              <div className="nav-dropdown__menu-list">
                <Link to="/formulas" className="nav-dropdown__item" onClick={() => setActiveMenu(null)}>
                  <div className="nav-dropdown__item-icon">
                    <IconFormula size={18} />
                  </div>
                  <div className="nav-dropdown__item-body">
                    <strong>{isKhmer ? 'តារាងរូបមន្តទាំងអស់ (Formula Index)' : 'Formula Index'}</strong>
                    <span>{isKhmer ? 'រូបមន្តគណិតវិទ្យាចំនួន ២៥២ គ្របដណ្ដប់គ្រប់ផ្នែក' : 'Complete directory of 252 verified formulas'}</span>
                  </div>
                </Link>

                <Link to="/shapes" className="nav-dropdown__item" onClick={() => setActiveMenu(null)}>
                  <div className="nav-dropdown__item-icon">
                    <IconShapes size={18} />
                  </div>
                  <div className="nav-dropdown__item-body">
                    <strong>{isKhmer ? 'មន្ទីរពិសោធន៍ធរណីមាត្រ (Shape Lab)' : 'Shape Laboratory'}</strong>
                    <span>{isKhmer ? 'រាង ២D និង ៣D អន្តរកម្ម ជាមួយការគណនាផ្ទៃនិងមាឌ' : 'Interactive 2D & 3D geometry recalculations'}</span>
                  </div>
                </Link>

                <Link to="/glossary" className="nav-dropdown__item" onClick={() => setActiveMenu(null)}>
                  <div className="nav-dropdown__item-icon">
                    <IconBook size={18} />
                  </div>
                  <div className="nav-dropdown__item-body">
                    <strong>{isKhmer ? 'វចនានុក្រមគណិតវិទ្យា (Glossary)' : 'Mathematics Glossary'}</strong>
                    <span>{isKhmer ? 'ពាក្យបច្ចេកសព្ទគណិតវិទ្យា ២២៧ ពាក្យ ខ្មែរ-អង់គ្លេស' : '227 bilingual English-Khmer definitions & terms'}</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* 4. Shapes Lab Direct Link */}
          <NavLink
            to="/shapes"
            className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}
          >
            <IconShapes size={16} />
            <span>{t('nav.shapes')}</span>
          </NavLink>

          {/* 5. Exams Dropdown */}
          <div
            className={`nav-dropdown${activeMenu === 'exams' ? ' is-open' : ''}`}
            onMouseEnter={() => setActiveMenu('exams')}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <NavLink
              to="/exam"
              className={({ isActive }) => `nav-link nav-link--has-dropdown${isActive ? ' is-active' : ''}`}
            >
              <IconExam size={16} />
              <span>{t('nav.exams')}</span>
              <IconChevronDown size={13} className="nav-dropdown__caret" />
            </NavLink>

            <div className="nav-dropdown__panel nav-dropdown__panel--exams">
              <div className="nav-dropdown__head">
                <span className="nav-dropdown__eyebrow">
                  {isKhmer ? 'វិញ្ញាសាប្រឡងជាតិ និងការធ្វើតេស្តសាកល្បង' : 'National Examination Testing Lab'}
                </span>
              </div>
              <div className="nav-dropdown__menu-list">
                <Link to="/exam" className="nav-dropdown__item" onClick={() => setActiveMenu(null)}>
                  <div className="nav-dropdown__item-icon" style={{ color: '#ffb4ba' }}>
                    <IconExam size={18} />
                  </div>
                  <div className="nav-dropdown__item-body">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                      <strong>{isKhmer ? 'វិញ្ញាសាឌីប្លូម (Grade 9 Diploma)' : 'Grade 9 Diploma Paper'}</strong>
                      <span className="nav-dropdown__badge nav-dropdown__badge--red">{isKhmer ? 'ថ្នាក់ទី ៩' : 'Grade 9'}</span>
                    </div>
                    <span>{isKhmer ? '១០០ ពិន្ទុ រយៈពេល ៩០ នាទី ជាមួយការកំណត់ម៉ោង និងពិន្ទុស្វ័យប្រវត្តិ' : '100 marks, 90 mins with timed testing & answers'}</span>
                  </div>
                </Link>

                <Link to="/exam" className="nav-dropdown__item" onClick={() => setActiveMenu(null)}>
                  <div className="nav-dropdown__item-icon" style={{ color: '#fde68a' }}>
                    <IconExam size={18} />
                  </div>
                  <div className="nav-dropdown__item-body">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                      <strong>{isKhmer ? 'វិញ្ញាសាបាក់ឌុប (Grade 12 Bac II)' : 'Grade 12 Bac II Paper'}</strong>
                      <span className="nav-dropdown__badge nav-dropdown__badge--gold">{isKhmer ? 'ថ្នាក់ទី ១២' : 'Grade 12'}</span>
                    </div>
                    <span>{isKhmer ? '១០០ ពិន្ទុ រយៈពេល ១៥០ នាទី គ្របដណ្ដប់លើកុំផ្លិច លីមីត ដេរីវេ' : '100 marks, 150 mins with calculus, vectors & solutions'}</span>
                  </div>
                </Link>

                <Link to="/exam" className="nav-dropdown__item" onClick={() => setActiveMenu(null)}>
                  <div className="nav-dropdown__item-icon">
                    <IconBook size={18} />
                  </div>
                  <div className="nav-dropdown__item-body">
                    <strong>{isKhmer ? 'ទម្រង់ក្រដាសប្រឡងផ្លូវការ (Printable MoEYS Documents)' : 'Printable Examination Sheets'}</strong>
                    <span>{isKhmer ? 'ទម្រង់ក្បាលក្រសួងអប់រំ យុវជន និងកីឡា សម្រាប់បោះពុម្ពឬរក្សាទុកជា PDF' : 'Official MoEYS examination format ready for printing'}</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* 6. Search */}
          <NavLink
            to="/search"
            className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}
          >
            <IconSearch size={16} />
            <span>{t('nav.search')}</span>
          </NavLink>

          {/* 7. Bookmarks */}
          <NavLink
            to="/bookmarks"
            className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}
          >
            <IconBookmark size={16} />
            <span>{t('nav.bookmarks')}</span>
            {count > 0 && (
              <span className="bookmark-count" aria-label={tn('nav.savedCount', count)}>
                {count > 99 ? '99+' : count}
              </span>
            )}
          </NavLink>
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="icon-button search-trigger"
            aria-label={t('nav.openSearch')}
            onClick={() => openSearch()}
          >
            <IconSearch size={19} />
          </button>
          <LanguageSwitcher />
          <button
            type="button"
            className="icon-button theme-toggle"
            onClick={toggleTheme}
            aria-label={themeLabel}
            title={themeLabel}
          >
            {theme === 'light' ? <IconMoon size={18} /> : <IconSun size={18} />}
          </button>
        </div>
      </div>
    </header>
  )
}
