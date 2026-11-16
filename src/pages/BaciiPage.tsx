import { Link, useParams } from 'react-router-dom'
import {
  EXAM_DAY_TIPS,
  PART_KIND_LABEL,
  STUDY_PLAN,
  TRACKS,
  blueprintFor,
  isBacTrack,
  kindFrequency,
  paperLabel,
  papersFor,
  patternsFor,
  timeBudget,
} from '../data/bacii'
import { topicBySlug, topicUrl } from '../data'
import { BAC_TRACKS, type BacPartKind, type BacTrack } from '../types/exam'
import { PageHero } from '../components/ui/PageHero'
import { Flowchart } from '../components/ui/Flowchart'
import { Graph } from '../components/ui/Graph'
import { RichText } from '../components/ui/Math'
import { IconArrowRight } from '../components/ui/Icons'
import { topicCopy } from '../i18n/content'
import { useI18n } from '../lib/i18n'
import NotFoundPage from './NotFoundPage'

function useCopy() {
  const { isKhmer, num } = useI18n()
  const pick = (en: string, km: string) => (isKhmer ? km : en)
  return { isKhmer, num, pick }
}

function TrackSwitch({ current }: { current?: BacTrack }) {
  const { pick, num } = useCopy()
  return (
    <nav className="track-switch" aria-label={pick('Choose your track', 'ជ្រើសរើសថ្នាក់របស់អ្នក')}>
      {BAC_TRACKS.map((track) => (
        <Link
          key={track}
          to={`/bacii/${track}`}
          className={`track-switch__item${current === track ? ' is-active' : ''}`}
          aria-current={current === track ? 'page' : undefined}
        >
          <strong>{pick(TRACKS[track].title, TRACKS[track].titleKm)}</strong>
          <span>
            {num(TRACKS[track].mathMarks)} {pick('marks', 'ពិន្ទុ')} · {num(TRACKS[track].durationMinutes)} {pick('min', 'នាទី')}
          </span>
        </Link>
      ))}
    </nav>
  )
}

function TrackChooser() {
  const { pick, num } = useCopy()
  return (
    <>
      <PageHero
        crumbs={[{ label: pick('Home', 'ទំព័រដើម'), to: '/' }, { label: pick('BacII Guide', 'មគ្គុទ្ទេសក៍បាក់ឌុប') }]}
        eyebrow={pick('Grade 12 · National examination', 'ថ្នាក់ទី១២ · ប្រឡងសញ្ញាបត្រមធ្យមសិក្សាទុតិយភូមិ')}
        title={pick('BacII mathematics guide', 'មគ្គុទ្ទេសក៍គណិតវិទ្យាប្រឡងបាក់ឌុប')}
        wideTitle
        intro={pick(
          'Built from real past papers: what each part asks, how many marks it carries, how to solve it step by step, and how to plan your revision. Choose your track.',
          'រៀបចំពីវិញ្ញាសាប្រឡងពិតៗ៖ ផ្នែកនីមួយៗសួរអ្វី មានពិន្ទុប៉ុន្មាន វិធីដោះស្រាយជាជំហានៗ និងរបៀបរៀបចំផែនការរំលឹកមេរៀន។ សូមជ្រើសរើសថ្នាក់របស់អ្នក។',
        )}
      />
      <section className="section">
        <div className="container">
          <div className="track-cards">
            {BAC_TRACKS.map((track) => {
              const info = TRACKS[track]
              const papers = papersFor(track)
              return (
                <Link key={track} to={`/bacii/${track}`} className="track-card">
                  <span className="track-card__eyebrow">{pick(info.short, info.shortKm)}</span>
                  <strong className="track-card__title">{pick(info.title, info.titleKm)}</strong>
                  <span className="track-card__desc">{pick(info.description, info.descriptionKm)}</span>
                  <dl className="track-card__facts">
                    <div>
                      <dt>{pick('Marks', 'ពិន្ទុ')}</dt>
                      <dd>{num(info.mathMarks)}</dd>
                    </div>
                    <div>
                      <dt>{pick('Minutes', 'នាទី')}</dt>
                      <dd>{num(info.durationMinutes)}</dd>
                    </div>
                    <div>
                      <dt>{pick('Papers studied', 'វិញ្ញាសាបានសិក្សា')}</dt>
                      <dd>{num(papers.length)}</dd>
                    </div>
                  </dl>
                  <span className="text-link">
                    {pick('Open the guide', 'បើកមគ្គុទ្ទេសក៍')} <IconArrowRight size={14} />
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}

function kindLabel(kind: BacPartKind, isKhmer: boolean) {
  return isKhmer ? PART_KIND_LABEL[kind].km : PART_KIND_LABEL[kind].en
}

export default function BaciiPage() {
  const { track } = useParams()
  const { isKhmer, num, pick } = useCopy()
  const { language } = useI18n()

  if (track === undefined) return <TrackChooser />
  if (!isBacTrack(track)) return <NotFoundPage message={pick('That track does not exist.', 'មិនមានថ្នាក់នេះទេ។')} />

  const info = TRACKS[track]
  const papers = papersFor(track)
  const blueprint = blueprintFor(track)
  const budget = timeBudget(blueprint)
  const patterns = patternsFor(track)
  const frequency = kindFrequency(track)
  const kinds = frequency.map((f) => f.kind)
  const official = papers.filter((p) => p.kind === 'official')
  const firstYear = Math.min(...papers.map((p) => p.year))
  const lastYear = Math.max(...papers.map((p) => p.year))

  return (
    <div className="bacii-page">
      <PageHero
        crumbs={[
          { label: pick('Home', 'ទំព័រដើម'), to: '/' },
          { label: pick('BacII Guide', 'មគ្គុទ្ទេសក៍បាក់ឌុប'), to: '/bacii' },
          { label: pick(info.title, info.titleKm) },
        ]}
        eyebrow={pick('BacII mathematics · Grade 12', 'គណិតវិទ្យាបាក់ឌុប · ថ្នាក់ទី១២')}
        title={pick(info.title, info.titleKm)}
        wideTitle
        intro={pick(info.description, info.descriptionKm)}
        meta={
          <>
            <span>
              <strong>{num(info.mathMarks)}</strong> {pick('marks', 'ពិន្ទុ')}
            </span>
            <span>
              <strong>{num(info.durationMinutes)}</strong> {pick('minutes', 'នាទី')}
            </span>
            <span>
              <strong>{num(papers.length)}</strong> {pick('papers analysed', 'វិញ្ញាសាបានវិភាគ')}
            </span>
          </>
        }
        aside={
          <div className="stack" style={{ gap: '0.75rem' }}>
            <Link className="btn btn--lime" to={`/exam?grade=12&track=${track}`}>
              {pick('Take a practice paper', 'ធ្វើវិញ្ញាសាសាកល្បង')} <IconArrowRight size={15} />
            </Link>
            <Link className="btn btn--on-dark btn--sm" to={`/grades/12?track=${track}`}>
              {pick('Grade 12 topics for this track', 'មេរៀនថ្នាក់ទី១២ សម្រាប់ថ្នាក់នេះ')}
            </Link>
          </div>
        }
      />

      <div className="container bacii-body">
        <TrackSwitch current={track} />

        {/* 1. Blueprint ------------------------------------------------ */}
        <section className="bacii-section" aria-labelledby="blueprint-h">
          <h2 id="blueprint-h">{pick('The paper at a glance', 'ទិដ្ឋភាពទូទៅនៃវិញ្ញាសា')}</h2>
          <p className="muted">
            {pick(
              `Structure of the ${paperLabel(blueprint)} paper: ${blueprint.parts.length} parts, ${blueprint.totalMarks} marks, ${blueprint.durationMinutes} minutes. ${info.durationNote}`,
              `រចនាសម្ព័ន្ធវិញ្ញាសា ${num(blueprint.year)}៖ ${num(blueprint.parts.length)} ផ្នែក ${num(blueprint.totalMarks)} ពិន្ទុ ${num(blueprint.durationMinutes)} នាទី។ ${info.durationNoteKm}`,
            )}
          </p>
          <div className="blueprint" role="img" aria-label={budget.map((s) => `${s.numeral} ${kindLabel(s.part.kind, false)} ${s.part.marks}`).join(', ')}>
            {budget.map((slot) => (
              <div
                key={slot.numeral}
                className={`blueprint__part blueprint__part--${slot.part.kind}`}
                style={{ flexGrow: slot.part.marks }}
              >
                <span className="blueprint__numeral">{slot.numeral}</span>
                <span className="blueprint__kind">{kindLabel(slot.part.kind, isKhmer)}</span>
                <span className="blueprint__marks">
                  {num(slot.part.marks)} {pick('pts', 'ពិន្ទុ')}
                </span>
              </div>
            ))}
          </div>

          <div className="table-scroll">
            <table className="data-table">
              <caption>{pick('Suggested time per part (10 minutes kept for checking)', 'ពេលវេលាណែនាំសម្រាប់ផ្នែកនីមួយៗ (ទុក ១០ នាទីសម្រាប់ពិនិត្យ)')}</caption>
              <thead>
                <tr>
                  <th scope="col">{pick('Part', 'ផ្នែក')}</th>
                  <th scope="col">{pick('Question type', 'ប្រភេទសំណួរ')}</th>
                  <th scope="col">{pick('Marks', 'ពិន្ទុ')}</th>
                  <th scope="col">{pick('Minutes', 'នាទី')}</th>
                </tr>
              </thead>
              <tbody>
                {budget.map((slot) => (
                  <tr key={slot.numeral}>
                    <td>{slot.numeral}</td>
                    <td>
                      <a href={`#pattern-${slot.part.kind}`}>{kindLabel(slot.part.kind, isKhmer)}</a>
                    </td>
                    <td>{num(slot.part.marks)}</td>
                    <td>{num(slot.minutes)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 2. Year by year -------------------------------------------- */}
        <section className="bacii-section" aria-labelledby="history-h">
          <h2 id="history-h">{pick('What came up, year by year', 'អ្វីដែលបានចេញ តាមឆ្នាំនីមួយៗ')}</h2>
          <p className="muted">
            {official.length > 0
              ? pick(
                  `Marks per question type on ${official.length} official papers (${firstYear}–${lastYear}). An empty cell means the type was not on that paper. There was no 2020 paper in our collection.`,
                  `ពិន្ទុតាមប្រភេទសំណួរ លើវិញ្ញាសាផ្លូវការ ${num(official.length)} (${num(firstYear)}–${num(lastYear)})។ ក្រឡាទទេមានន័យថាប្រភេទនោះមិនបានចេញ។ គ្មានវិញ្ញាសាឆ្នាំ២០២០ ក្នុងបណ្ដុំរបស់យើងទេ។`,
                )
              : pick(
                  'Our collection has one Science paper so far: the 2025 mock in the national format. Use the Social Science history to see how stable each part type is, and add papers as you find them.',
                  'បណ្ដុំរបស់យើងមានវិញ្ញាសាថ្នាក់វិទ្យាសាស្ត្រពិតតែមួយ៖ វិញ្ញាសាសាកល្បងឆ្នាំ២០២៥ តាមទម្រង់ជាតិ។ មើលប្រវត្តិថ្នាក់វិទ្យាសាស្ត្រសង្គម ដើម្បីដឹងថាប្រភេទសំណួរនីមួយៗមានស្ថិរភាពប៉ុណ្ណា។',
                )}
          </p>
          <div className="table-scroll">
            <table className="data-table heatmap">
              <caption className="visually-hidden">{pick('Marks per question type and year', 'ពិន្ទុតាមប្រភេទសំណួរ និងឆ្នាំ')}</caption>
              <thead>
                <tr>
                  <th scope="col">{pick('Question type', 'ប្រភេទសំណួរ')}</th>
                  {papers.map((paper) => (
                    <th scope="col" key={paperLabel(paper)}>
                      {isKhmer ? num(paperLabel(paper).replace('mock', 'សាកល្បង')) : paperLabel(paper)}
                    </th>
                  ))}
                  <th scope="col">{pick('Papers', 'វិញ្ញាសា')}</th>
                </tr>
              </thead>
              <tbody>
                {kinds.map((kind) => {
                  const f = frequency.find((item) => item.kind === kind)!
                  return (
                    <tr key={kind}>
                      <th scope="row">{kindLabel(kind, isKhmer)}</th>
                      {papers.map((paper) => {
                        const part = paper.parts.find((p) => p.kind === kind)
                        return (
                          <td key={paperLabel(paper)} className={part ? `heat heat--${Math.min(4, Math.ceil(part.marks / 10))}` : 'heat heat--0'}>
                            {part ? num(part.marks) : ''}
                          </td>
                        )
                      })}
                      <td>
                        {num(f.papers)}/{num(f.totalPapers)}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* 3. Patterns ------------------------------------------------- */}
        <section className="bacii-section" aria-labelledby="patterns-h">
          <h2 id="patterns-h">{pick('Every question type, solved step by step', 'ប្រភេទសំណួរនីមួយៗ ដោះស្រាយជាជំហានៗ')}</h2>
          <p className="muted">
            {pick(
              'For each part: what examiners ask, a flowchart to follow, an exact graph where it helps, and checks to run before moving on.',
              'សម្រាប់ផ្នែកនីមួយៗ៖ អ្វីដែលគណៈកម្មការសួរ ផែនទីលំហូរដើម្បីធ្វើតាម ក្រាបពិតប្រាកដ និងចំណុចត្រូវពិនិត្យមុនបន្ត។',
            )}
          </p>
          <div className="pattern-stack">
            {patterns.map((pattern) => {
              const ref = topicBySlug.get(pattern.topicId)
              const marks = blueprint.parts.find((p) => p.kind === pattern.kind)?.marks
              return (
                <article key={pattern.kind} id={`pattern-${pattern.kind}`} className="pattern" aria-labelledby={`pattern-${pattern.kind}-h`}>
                  <header className="pattern__head">
                    <span className="pattern__tag">
                      {kindLabel(pattern.kind, isKhmer)}
                      {marks ? ` · ${num(marks)} ${pick('marks', 'ពិន្ទុ')}` : ''}
                    </span>
                    <h3 id={`pattern-${pattern.kind}-h`}>{pick(pattern.title, pattern.titleKm)}</h3>
                  </header>
                  <div className="pattern__grid">
                    <div>
                      <h4>{pick('What is asked', 'អ្វីដែលគេសួរ')}</h4>
                      <ul className="plain-list">
                        {(isKhmer ? pattern.asksKm : pattern.asks).map((line) => (
                          <li key={line}>
                            <RichText text={line} />
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4>{pick('Check before moving on', 'ពិនិត្យមុនបន្ត')}</h4>
                      <ul className="plain-list">
                        {(isKhmer ? pattern.checksKm : pattern.checks).map((line) => (
                          <li key={line}>
                            <RichText text={line} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="visual-stack">
                    <Flowchart chart={pattern.flowchart} headingLevel={4} />
                    {pattern.graph && <Graph spec={pattern.graph} />}
                  </div>
                  {ref && (
                    <Link className="text-link" to={topicUrl(ref)}>
                      {pick('Study the full topic', 'សិក្សាមេរៀនពេញលេញ')}: {topicCopy(ref.topic, language).title} <IconArrowRight size={14} />
                    </Link>
                  )}
                </article>
              )
            })}
          </div>
        </section>

        {/* 4. Study plan ----------------------------------------------- */}
        <section className="bacii-section" aria-labelledby="plan-h">
          <h2 id="plan-h">{pick('A six-week study plan', 'ផែនការរៀនប្រាំមួយសប្ដាហ៍')}</h2>
          <ol className="plan">
            {STUDY_PLAN.map((phase) => (
              <li key={phase.weeks} className="plan__phase">
                <span className="plan__weeks">{pick(phase.weeks, phase.weeksKm)}</span>
                <h3>{pick(phase.title, phase.titleKm)}</h3>
                <ul className="plain-list">
                  {(isKhmer ? phase.actionsKm : phase.actions).map((action) => (
                    <li key={action}>{action}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        {/* 5. Exam day ------------------------------------------------- */}
        <section className="bacii-section" aria-labelledby="day-h">
          <h2 id="day-h">{pick('On exam day', 'នៅថ្ងៃប្រឡង')}</h2>
          <ul className="tips">
            {EXAM_DAY_TIPS.map((tip) => (
              <li key={tip.en}>
                <RichText text={pick(tip.en, tip.km)} />
              </li>
            ))}
          </ul>
        </section>

        {/* 6. Topics --------------------------------------------------- */}
        <section className="bacii-section" aria-labelledby="topics-h">
          <h2 id="topics-h">{pick('Grade 12 topics for this track', 'មេរៀនថ្នាក់ទី១២ សម្រាប់ថ្នាក់នេះ')}</h2>
          <ul className="related-list">
            {info.topicIds.map((id) => {
              const ref = topicBySlug.get(id)
              if (!ref) return null
              return (
                <li key={id}>
                  <Link to={topicUrl(ref)}>
                    <span>
                      <strong>{topicCopy(ref.topic, language).title}</strong>
                    </span>
                    <IconArrowRight size={15} />
                  </Link>
                </li>
              )
            })}
          </ul>
          <p className="muted bacii-source">
            {pick(
              'Source: past papers kept in this project’s research folder (structure only; no question text is reproduced). This guide makes no claim of official endorsement.',
              'ប្រភព៖ វិញ្ញាសាចាស់ៗក្នុងថតស្រាវជ្រាវរបស់គម្រោងនេះ (តែរចនាសម្ព័ន្ធ មិនចម្លងអត្ថបទសំណួរ)។ មគ្គុទ្ទេសក៍នេះមិនអះអាងថាជាឯកសារផ្លូវការទេ។',
            )}
          </p>
        </section>
      </div>
    </div>
  )
}
