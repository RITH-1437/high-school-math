#!/usr/bin/env node
/**
 * Research data merge + independent verification.
 *
 *   node research/scripts/merge-and-verify.mjs            # merge, validate, generate docs
 *   node research/scripts/merge-and-verify.mjs --check    # validate only, write nothing
 *
 * - Concatenates research/data/fragments/*.<kind>.json into research/data/*.json
 * - Re-evaluates every `check` block with a restricted evaluator
 * - Enforces the VERIFIED rules from RESEARCH_METHODOLOGY.md
 * - Writes research/reports/validation-output.json and generated markdown indexes
 * All counts are computed here; nothing is typed by hand.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(here, '..')
const fragDir = path.join(root, 'data', 'fragments')
const checkOnly = process.argv.includes('--check')

const KINDS = ['sources', 'topics', 'formulas', 'theorems', 'examples', 'exercises', 'shapes']
const OUTPUT_NAMES = {
  sources: 'sources.json',
  topics: 'curriculum.json',
  formulas: 'formulas.json',
  theorems: 'theorems.json',
  examples: 'examples.json',
  exercises: 'exercises.json',
  shapes: 'shapes.json',
}
const STATUSES = ['VERIFIED', 'PARTIALLY_VERIFIED', 'UNVERIFIED', 'REJECTED']
const errors = []
const warnings = []
const err = (kind, id, msg) => errors.push({ kind, id, msg })
const warn = (kind, id, msg) => warnings.push({ kind, id, msg })

/* ---------------------------------------------------------------- load */
const data = Object.fromEntries(KINDS.map((k) => [k, []]))
const fragmentFiles = fs.existsSync(fragDir) ? fs.readdirSync(fragDir).filter((f) => f.endsWith('.json')) : []
const fileStats = []

for (const file of fragmentFiles.sort()) {
  const match = file.match(/^(.+)\.(sources|topics|formulas|theorems|examples|exercises|shapes)\.json$/)
  if (!match) {
    warn('file', file, 'Unrecognised fragment filename; ignored')
    continue
  }
  const [, basename, kind] = match
  try {
    const parsed = JSON.parse(fs.readFileSync(path.join(fragDir, file), 'utf8'))
    if (!Array.isArray(parsed)) {
      err('file', file, 'Top-level JSON value must be an array')
      continue
    }
    for (const record of parsed) data[kind].push({ ...record, __fragment: basename })
    fileStats.push({ file, basename, kind, records: parsed.length })
  } catch (error) {
    err('file', file, `Invalid JSON: ${error.message}`)
  }
}

/* ------------------------------------------------------ safe evaluator */
function evaluateExpr(expr) {
  if (typeof expr !== 'string' || !expr.trim()) return { ok: false, reason: 'empty expression' }
  if (expr.length > 500) return { ok: false, reason: 'expression too long' }
  const stripped = expr.replace(/Math\.[A-Za-z0-9_]+/g, '').replace(/\d+(\.\d+)?[eE][+-]?\d+/g, '0')
  if (/[A-Za-z_$]/.test(stripped)) return { ok: false, reason: 'only numbers, Math.* and operators allowed' }
  if (/[;={}\[\]`'"\\]/.test(expr)) return { ok: false, reason: 'forbidden characters' }
  try {
    const value = new Function('"use strict"; return (' + expr + ')')()
    if (typeof value !== 'number' || !Number.isFinite(value)) return { ok: false, reason: `non-finite result (${value})` }
    return { ok: true, value }
  } catch (error) {
    return { ok: false, reason: `evaluation error: ${error.message}` }
  }
}

const checkResults = { total: 0, passed: 0, failed: 0, skippedNull: 0 }
function runCheck(kind, id, check, label) {
  if (check === null || check === undefined) {
    checkResults.skippedNull += 1
    return { has: false, pass: false }
  }
  checkResults.total += 1
  const { expr, expected, tolerance } = check
  const result = evaluateExpr(expr)
  if (!result.ok) {
    checkResults.failed += 1
    err(kind, id, `${label}: check not evaluable — ${result.reason}`)
    return { has: true, pass: false }
  }
  if (typeof expected !== 'number' || !Number.isFinite(expected)) {
    checkResults.failed += 1
    err(kind, id, `${label}: check.expected must be a finite number`)
    return { has: true, pass: false }
  }
  const tol = typeof tolerance === 'number' && tolerance >= 0 ? tolerance : 0.01
  if (Math.abs(result.value - expected) > tol) {
    checkResults.failed += 1
    err(kind, id, `${label}: check FAILED — expr evaluates to ${result.value}, claimed ${expected} (tol ${tol})`)
    return { has: true, pass: false }
  }
  checkResults.passed += 1
  return { has: true, pass: true }
}

/* ----------------------------------------------------------- id checks */
const idSets = {}
for (const kind of KINDS) {
  const seen = new Set()
  idSets[kind] = seen
  for (const record of data[kind]) {
    if (!record.id || typeof record.id !== 'string') {
      err(kind, record.id ?? '(missing)', `record in ${record.__fragment} has no string id`)
      continue
    }
    if (seen.has(record.id)) err(kind, record.id, 'duplicate id')
    seen.add(record.id)
  }
}

const sourceById = new Map(data.sources.map((s) => [s.id, s]))
const formulaIds = idSets.formulas
const topicIds = idSets.topics

/* ------------------------------------------------------------- sources */
for (const s of data.sources) {
  for (const field of ['title', 'website', 'url', 'tier', 'accessed', 'type', 'quality']) {
    if (s[field] === undefined || s[field] === null || s[field] === '') err('sources', s.id, `missing field: ${field}`)
  }
  if (s.url && !/^https?:\/\//.test(s.url)) err('sources', s.id, 'url must be http(s)')
  if (s.url && /khanacademy\.org/.test(s.url)) {
    warn('sources', s.id, 'Khan Academy is blocked to automated retrieval; confirm this page was truly read')
  }
}
const sourceHosts = (ids) => {
  const hosts = new Set()
  for (const id of ids ?? []) {
    const src = sourceById.get(id)
    if (src?.url) {
      try {
        hosts.add(new URL(src.url).hostname.replace(/^www\./, ''))
      } catch {
        /* handled elsewhere */
      }
    }
  }
  return hosts
}

function checkSourceRefs(kind, record, ids, label = 'sourceIds') {
  for (const id of ids ?? []) {
    if (!sourceById.has(id)) err(kind, record.id, `${label} references unknown source ${id}`)
  }
}

/* ------------------------------------------------- verification rules */
function checkVerification(kind, record, checks) {
  const v = record.verification
  if (!v || typeof v !== 'object') {
    err(kind, record.id, 'missing verification block')
    return
  }
  if (!STATUSES.includes(v.status)) {
    err(kind, record.id, `invalid verification.status "${v.status}"`)
    return
  }
  checkSourceRefs(kind, record, v.sourcesChecked, 'verification.sourcesChecked')
  if (v.status === 'VERIFIED') {
    const hosts = sourceHosts(v.sourcesChecked)
    if (hosts.size < 2) {
      err(kind, record.id, `VERIFIED requires sources from ≥2 distinct websites (found ${hosts.size}: ${[...hosts].join(', ') || 'none'})`)
    }
    if (v.recomputed !== true) err(kind, record.id, 'VERIFIED requires recomputed: true')
    if (checks.length === 0) err(kind, record.id, 'VERIFIED requires at least one passing machine check')
    if (checks.some((c) => c.has && !c.pass)) err(kind, record.id, 'VERIFIED but a machine check failed')
  }
  if (v.status === 'PARTIALLY_VERIFIED' && (!v.sourcesChecked || v.sourcesChecked.length === 0)) {
    warn(kind, record.id, 'PARTIALLY_VERIFIED with no sourcesChecked')
  }
}

/* ------------------------------------------------------------- formulas */
for (const f of data.formulas) {
  for (const field of ['name', 'expression', 'subject', 'topicId', 'description', 'meaning', 'variables', 'sourceIds']) {
    if (f[field] === undefined || f[field] === null || f[field] === '') err('formulas', f.id, `missing field: ${field}`)
  }
  if (!Number.isInteger(f.recommendedGrade) || f.recommendedGrade < 7 || f.recommendedGrade > 12) {
    err('formulas', f.id, `recommendedGrade must be an integer 7–12 (got ${f.recommendedGrade})`)
  }
  if (!Array.isArray(f.variables) || f.variables.length === 0) err('formulas', f.id, 'variables must be a non-empty array')
  if (f.topicId && !topicIds.has(f.topicId)) warn('formulas', f.id, `topicId ${f.topicId} not in topics`)
  checkSourceRefs('formulas', f, f.sourceIds)
  for (const rid of f.relatedFormulaIds ?? []) {
    if (!formulaIds.has(rid)) warn('formulas', f.id, `relatedFormulaIds references unknown ${rid}`)
  }
  const ex = f.example
  const checks = []
  if (!ex) err('formulas', f.id, 'missing example')
  else {
    for (const field of ['problem', 'given', 'required', 'answer', 'explanation']) {
      if (!ex[field] || (Array.isArray(ex[field]) && ex[field].length === 0)) err('formulas', f.id, `example missing ${field}`)
    }
    if (ex.check === undefined) err('formulas', f.id, 'example.check is required (null only for symbolic examples)')
    checks.push(runCheck('formulas', f.id, ex.check, 'example'))
  }
  checkVerification('formulas', f, checks)
}

/* ------------------------------------------------------------- theorems */
for (const t of data.theorems) {
  for (const field of ['name', 'subject', 'statement', 'conditions', 'explanation', 'sourceIds']) {
    if (!t[field] || (Array.isArray(t[field]) && t[field].length === 0)) err('theorems', t.id, `missing field: ${field}`)
  }
  checkSourceRefs('theorems', t, t.sourceIds)
  const checks = []
  if (t.application) checks.push(runCheck('theorems', t.id, t.application.check, 'application'))
  else err('theorems', t.id, 'missing application')
  checkVerification('theorems', t, checks)
}

/* ------------------------------------------------------------- examples */
for (const e of data.examples) {
  for (const field of ['subject', 'topicId', 'problem', 'steps', 'answer', 'explanation', 'level']) {
    if (!e[field] || (Array.isArray(e[field]) && e[field].length === 0)) err('examples', e.id, `missing field: ${field}`)
  }
  for (const fid of e.formulaIds ?? []) {
    if (!formulaIds.has(fid)) warn('examples', e.id, `formulaIds references unknown ${fid}`)
  }
  if (e.check === undefined) err('examples', e.id, 'check is required (null only for symbolic examples)')
  runCheck('examples', e.id, e.check, 'example')
}

/* ------------------------------------------------------------ exercises */
const letters = 'ABCDEFGH'
for (const q of data.exercises) {
  for (const field of ['grade', 'subject', 'topicId', 'type', 'difficulty', 'question', 'steps', 'explanation']) {
    if (!q[field] || (Array.isArray(q[field]) && q[field].length === 0)) err('exercises', q.id, `missing field: ${field}`)
  }
  if (!Number.isInteger(q.grade) || q.grade < 7 || q.grade > 12) err('exercises', q.id, `grade must be 7–12 (got ${q.grade})`)
  if (q.type === 'multiple-choice') {
    if (!Array.isArray(q.options) || q.options.length < 3) err('exercises', q.id, 'multiple-choice needs ≥3 options')
    else {
      if (!Number.isInteger(q.correctOptionIndex) || q.correctOptionIndex < 0 || q.correctOptionIndex >= q.options.length) {
        err('exercises', q.id, 'correctOptionIndex out of range')
      } else if (q.correctAnswer && q.correctAnswer !== letters[q.correctOptionIndex]) {
        err('exercises', q.id, `correctAnswer "${q.correctAnswer}" does not match correctOptionIndex ${q.correctOptionIndex}`)
      }
      if (new Set(q.options.map((o) => String(o).trim())).size !== q.options.length) err('exercises', q.id, 'duplicate options')
    }
  } else if (q.type === 'numeric' || q.type === 'word-problem') {
    if (typeof q.answerValue !== 'number' && q.check == null) warn('exercises', q.id, 'numeric/word problem without answerValue or check')
  }
  if (q.check === undefined) err('exercises', q.id, 'check is required (null for non-numeric)')
  const r = runCheck('exercises', q.id, q.check, 'exercise')
  if (r.has && r.pass && typeof q.answerValue === 'number') {
    const ev = evaluateExpr(q.check.expr)
    if (ev.ok && Math.abs(ev.value - q.answerValue) > (q.check.tolerance ?? 0.01)) {
      err('exercises', q.id, `answerValue ${q.answerValue} disagrees with check result ${ev.value}`)
    }
  }
  for (const fid of q.formulaIds ?? []) {
    if (!formulaIds.has(fid)) warn('exercises', q.id, `formulaIds references unknown ${fid}`)
  }
}

/* --------------------------------------------------------------- topics */
for (const t of data.topics) {
  for (const field of ['subject', 'topic', 'recommendedGrade', 'difficulty', 'learningObjectives', 'sourceIds']) {
    if (t[field] === undefined || t[field] === null || (Array.isArray(t[field]) && t[field].length === 0)) {
      err('topics', t.id, `missing field: ${field}`)
    }
  }
  if (!Number.isInteger(t.recommendedGrade) || t.recommendedGrade < 7 || t.recommendedGrade > 12) {
    err('topics', t.id, `recommendedGrade must be 7–12 (got ${t.recommendedGrade})`)
  }
  if (!['introductory', 'intermediate', 'advanced'].includes(t.difficulty)) err('topics', t.id, `invalid difficulty ${t.difficulty}`)
  if (!['source-backed', 'recommendation'].includes(t.gradeBasis)) err('topics', t.id, 'gradeBasis must be source-backed | recommendation')
  if (t.gradeBasis === 'source-backed' && (!t.gradeEvidence || t.gradeEvidence.length === 0)) {
    err('topics', t.id, 'source-backed grade placement needs gradeEvidence source IDs')
  }
  checkSourceRefs('topics', t, t.sourceIds)
  checkSourceRefs('topics', t, t.gradeEvidence, 'gradeEvidence')
  for (const fid of t.formulaIds ?? []) if (!formulaIds.has(fid)) warn('topics', t.id, `formulaIds references unknown ${fid}`)
  for (const pid of t.prerequisites ?? []) if (!topicIds.has(pid)) warn('topics', t.id, `prerequisite ${pid} not in topics`)
}

/* --------------------------------------------------------------- shapes */
for (const s of data.shapes) {
  for (const field of ['name', 'dimension', 'definition', 'properties', 'measures', 'sourceIds']) {
    if (!s[field] || (Array.isArray(s[field]) && s[field].length === 0)) err('shapes', s.id, `missing field: ${field}`)
  }
  if (!['2d', '3d'].includes(s.dimension)) err('shapes', s.id, 'dimension must be "2d" or "3d"')
  checkSourceRefs('shapes', s, s.sourceIds)
  for (const m of s.measures ?? []) {
    if (m.formulaId && !formulaIds.has(m.formulaId)) warn('shapes', s.id, `measure formulaId ${m.formulaId} not in formulas`)
  }
  if (s.verification) checkVerification('shapes', s, [])
}

/* -------------------------------------------------- duplicate formulas */
const normalized = new Map()
for (const f of data.formulas) {
  const key = String(f.expression ?? '').replace(/\s+/g, '').replace(/\\left|\\right/g, '')
  if (!key) continue
  if (!normalized.has(key)) normalized.set(key, [])
  normalized.get(key).push(f)
}
for (const [, list] of normalized) {
  if (list.length > 1) {
    warn('formulas', list.map((f) => f.id).join(', '), `identical expression appears ${list.length} times — duplicate or intentional?`)
  }
}

/* ----------------------------------------------------------- statistics */
const countBy = (arr, fn) => {
  const out = {}
  for (const item of arr) {
    const key = fn(item)
    out[key] = (out[key] ?? 0) + 1
  }
  return Object.fromEntries(Object.entries(out).sort(([a], [b]) => String(a).localeCompare(String(b), undefined, { numeric: true })))
}

const stats = {
  generatedAt: new Date().toISOString(),
  fragmentFiles: fileStats.length,
  records: Object.fromEntries(KINDS.map((k) => [k, data[k].length])),
  sourcesByTier: countBy(data.sources, (s) => `tier${s.tier}`),
  sourcesByType: countBy(data.sources, (s) => s.type),
  formulasByGrade: countBy(data.formulas, (f) => `grade${f.recommendedGrade}`),
  formulasBySubject: countBy(data.formulas, (f) => f.subject),
  formulasByStatus: countBy(data.formulas, (f) => f.verification?.status ?? 'MISSING'),
  theoremsByStatus: countBy(data.theorems, (t) => t.verification?.status ?? 'MISSING'),
  theoremsBySubject: countBy(data.theorems, (t) => t.subject),
  topicsByGrade: countBy(data.topics, (t) => `grade${t.recommendedGrade}`),
  topicsBySubject: countBy(data.topics, (t) => t.subject),
  topicGradeBasis: countBy(data.topics, (t) => t.gradeBasis ?? 'MISSING'),
  examplesByLevel: countBy(data.examples, (e) => e.level),
  examplesByGrade: countBy(data.examples, (e) => `grade${e.grade ?? 'n/a'}`),
  exercisesByGrade: countBy(data.exercises, (q) => `grade${q.grade}`),
  exercisesByType: countBy(data.exercises, (q) => q.type),
  exercisesByDifficulty: countBy(data.exercises, (q) => q.difficulty),
  exercisesBySubject: countBy(data.exercises, (q) => q.subject),
  shapesByDimension: countBy(data.shapes, (s) => s.dimension),
  machineChecks: checkResults,
  validation: { errors: errors.length, warnings: warnings.length },
}

/* -------------------------------------------------------------- output */
const summary = {
  stats,
  errors,
  warnings,
  fragments: fileStats,
}

function clean(records) {
  return records.map(({ __fragment, ...rest }) => ({ ...rest, researchArea: __fragment }))
}

if (!checkOnly) {
  fs.mkdirSync(path.join(root, 'reports'), { recursive: true })
  for (const kind of KINDS) {
    const target = path.join(root, 'data', OUTPUT_NAMES[kind])
    fs.writeFileSync(target, JSON.stringify(clean(data[kind]), null, 2) + '\n')
  }
  fs.writeFileSync(path.join(root, 'reports', 'validation-output.json'), JSON.stringify(summary, null, 2) + '\n')
  generateMarkdown()
}

console.log(JSON.stringify({ stats, errorCount: errors.length, warningCount: warnings.length }, null, 2))
if (errors.length) {
  console.log('\nFirst 40 errors:')
  for (const e of errors.slice(0, 40)) console.log(`  [${e.kind}] ${e.id}: ${e.msg}`)
}
if (warnings.length) {
  console.log(`\nFirst 25 warnings:`)
  for (const w of warnings.slice(0, 25)) console.log(`  [${w.kind}] ${w.id}: ${w.msg}`)
}
process.exitCode = errors.length ? 1 : 0

/* ---------------------------------------------------- markdown outputs */
function esc(text) {
  return String(text ?? '').replace(/\|/g, '\\|').replace(/\r?\n/g, ' ')
}
function write(rel, content) {
  const target = path.join(root, rel)
  fs.mkdirSync(path.dirname(target), { recursive: true })
  fs.writeFileSync(target, content)
}

function generateMarkdown() {
  const generatedNote = `> Generated by \`research/scripts/merge-and-verify.mjs\` from \`research/data/\`. Do not edit by hand; edit the fragments and re-run.\n\n`

  // SOURCE_REGISTRY
  const srcLines = [`# Source Registry\n`, generatedNote, `${data.sources.length} sources, all fetched and read in this research session (see methodology).\n`]
  srcLines.push('| ID | Title | Website | Tier | Type | Quality | Topics | Accessed |', '|---|---|---|---|---|---|---|---|')
  for (const s of [...data.sources].sort((a, b) => a.id.localeCompare(b.id))) {
    srcLines.push(`| ${s.id} | [${esc(s.title)}](${s.url}) | ${esc(s.website)} | ${s.tier} | ${esc(s.type)} | ${esc(s.quality)} | ${esc((s.topics ?? []).join('; '))} | ${s.accessed} |`)
  }
  srcLines.push('', '## Verification notes and usage considerations', '')
  for (const s of [...data.sources].sort((a, b) => a.id.localeCompare(b.id))) {
    srcLines.push(`- **${s.id}** — ${esc(s.verificationNotes ?? 'n/a')} _Copyright:_ ${esc(s.copyright ?? 'n/a')}`)
  }
  write('SOURCE_REGISTRY.md', srcLines.join('\n') + '\n')

  // Grade files
  const topicsByGrade = new Map()
  for (const g of [7, 8, 9, 10, 11, 12]) topicsByGrade.set(g, [])
  for (const t of data.topics) topicsByGrade.get(t.recommendedGrade)?.push(t)
  const gradeTitle = { 7: 'Foundational mathematics and introductory algebra and geometry', 8: 'Intermediate algebra, geometry, percentages, ratios and introductory statistics', 9: 'Advanced foundational algebra, geometry, quadratic concepts and coordinate geometry', 10: 'Functions, advanced algebra, geometry, trigonometry and statistics', 11: 'Advanced functions, trigonometry, probability, vectors, sequences and introductory advanced mathematics', 12: 'Advanced secondary mathematics, introductory calculus where appropriate, matrices and other suitable topics' }
  const formulaName = new Map(data.formulas.map((f) => [f.id, f.name]))
  for (const [grade, topics] of topicsByGrade) {
    const pad = String(grade).padStart(2, '0')
    const lines = [`# Grade ${grade} — Research Summary\n`, generatedNote, `Working hypothesis (not a mandated curriculum): ${gradeTitle[grade]}.\n`, `Topics with a primary recommended placement at Grade ${grade}: **${topics.length}**.\n`]
    const bySubject = new Map()
    for (const t of topics) {
      if (!bySubject.has(t.subject)) bySubject.set(t.subject, [])
      bySubject.get(t.subject).push(t)
    }
    for (const [subject, list] of [...bySubject].sort(([a], [b]) => a.localeCompare(b))) {
      lines.push(`## ${subject}\n`)
      for (const t of list.sort((a, b) => a.topic.localeCompare(b.topic))) {
        lines.push(`### ${t.topic}`, '')
        lines.push(`- **ID:** ${t.id} · **Difficulty:** ${t.difficulty} · **Grade range:** ${(t.gradeRange ?? [t.recommendedGrade]).join('–')} · **Basis:** ${t.gradeBasis}`)
        if (t.subtopics?.length) lines.push(`- **Subtopics:** ${esc(t.subtopics.join('; '))}`)
        if (t.prerequisites?.length) lines.push(`- **Prerequisites:** ${esc(t.prerequisites.join(', '))}`)
        if (t.learningObjectives?.length) lines.push(`- **Learning objectives:** ${esc(t.learningObjectives.join('; '))}`)
        if (t.formulaIds?.length) lines.push(`- **Formulas:** ${esc(t.formulaIds.map((id) => formulaName.get(id) ?? id).join('; '))}`)
        if (t.theoremIds?.length) lines.push(`- **Theorems:** ${esc(t.theoremIds.join(', '))}`)
        if (t.recommendedVisualizations?.length) lines.push(`- **Recommended visualizations (recommendation):** ${esc(t.recommendedVisualizations.join('; '))}`)
        if (t.internationalVariation) lines.push(`- **International variation:** ${esc(t.internationalVariation)}`)
        lines.push(`- **Sources:** ${(t.sourceIds ?? []).join(', ')}`, '')
      }
    }
    if (topics.length === 0) lines.push('_No topics recorded for this grade — see CONTENT_GAP_REPORT._\n')
    write(`GRADE_${pad}.md`, lines.join('\n') + '\n')
  }

  // CURRICULUM_MAPPING
  const cm = [`# Curriculum Mapping\n`, generatedNote, '| Subject | Topic | Rec. grade | Range | Difficulty | Basis | Sources |', '|---|---|---|---|---|---|---|']
  for (const t of [...data.topics].sort((a, b) => a.recommendedGrade - b.recommendedGrade || a.subject.localeCompare(b.subject) || a.topic.localeCompare(b.topic))) {
    cm.push(`| ${esc(t.subject)} | ${esc(t.topic)} | ${t.recommendedGrade} | ${(t.gradeRange ?? []).join('–')} | ${t.difficulty} | ${t.gradeBasis} | ${(t.sourceIds ?? []).join(', ')} |`)
  }
  cm.push('', '## Grade placement variation notes', '')
  for (const t of data.topics) if (t.internationalVariation) cm.push(`- **${esc(t.topic)}** — ${esc(t.internationalVariation)}`)
  write('CURRICULUM_MAPPING.md', cm.join('\n') + '\n')

  // formulas index
  const fi = [`# Formulas Index\n`, generatedNote, `${data.formulas.length} formula records.\n`, '| ID | Name | Expression (LaTeX) | Subject | Grade | Status |', '|---|---|---|---|---|---|']
  for (const f of [...data.formulas].sort((a, b) => a.subject.localeCompare(b.subject) || a.recommendedGrade - b.recommendedGrade || a.name.localeCompare(b.name))) {
    fi.push(`| ${f.id} | ${esc(f.name)} | \`${esc(f.expression)}\` | ${esc(f.subject)} | ${f.recommendedGrade} | ${f.verification?.status ?? 'MISSING'} |`)
  }
  write('formulas/formulas-index.md', fi.join('\n') + '\n')

  // formula verification
  const fv = [`# Formula Verification\n`, generatedNote, `Machine checks: **${checkResults.passed} passed / ${checkResults.failed} failed** of ${checkResults.total} evaluated (${checkResults.skippedNull} records with no numeric check).\n`, '| ID | Status | Distinct source sites | Recomputed | Notes |', '|---|---|---|---|---|']
  for (const f of data.formulas) {
    const v = f.verification ?? {}
    fv.push(`| ${f.id} | ${v.status ?? 'MISSING'} | ${sourceHosts(v.sourcesChecked).size} | ${v.recomputed ? 'yes' : 'no'} | ${esc(v.notes ?? '')} |`)
  }
  write('formulas/formula-verification.md', fv.join('\n') + '\n')

  // solved examples
  const ex = [`# Solved Examples\n`, generatedNote, 'Embedded formula examples first, then standalone examples.\n']
  for (const f of data.formulas) {
    if (!f.example) continue
    const e = f.example
    ex.push(`## ${f.name} (${f.id}, grade ${f.recommendedGrade}, ${e.level ?? 'n/a'})`, '', `**Problem:** ${e.problem}`, '', `**Given:** ${(e.given ?? []).join('; ')}`, '', `**Required:** ${e.required}`, '', `**Formula:** \`${e.formula ?? f.expression}\``, '', `**Substitution:** \`${e.substitution ?? ''}\``, '', `**Calculation:**`)
    for (const c of e.calculation ?? []) ex.push(`- \`${c}\``)
    ex.push('', `**Answer:** ${e.answer}`, '', `**Explanation:** ${e.explanation}`, '')
  }
  for (const e of data.examples) {
    ex.push(`## ${e.id} — ${e.subject}, grade ${e.grade ?? 'n/a'}, ${e.level}`, '', `**Problem:** ${e.problem}`, '', `**Given:** ${(e.given ?? []).join('; ')}`, '', `**Required:** ${e.required ?? ''}`, '', '**Steps:**')
    ;(e.steps ?? []).forEach((s, i) => ex.push(`${i + 1}. ${s}`))
    ex.push('', `**Answer:** ${e.answer}${e.units ? ` (${e.units})` : ''}`, '', `**Explanation:** ${e.explanation}`, '')
  }
  write('examples/solved-examples.md', ex.join('\n') + '\n')

  // exercise bank
  const eb = [`# Exercise Bank\n`, generatedNote, `${data.exercises.length} original practice questions.\n`]
  for (const grade of [7, 8, 9, 10, 11, 12]) {
    const list = data.exercises.filter((q) => q.grade === grade)
    eb.push(`## Grade ${grade} (${list.length})`, '')
    for (const q of list) {
      eb.push(`### ${q.id} — ${q.subject} · ${q.type} · ${q.difficulty}`, '', q.question, '')
      if (q.options) q.options.forEach((o, i) => eb.push(`- ${letters[i]}. ${o}`))
      eb.push('', `**Answer:** ${q.correctAnswer ?? q.answerValue ?? ''}`, '', '**Solution steps:**')
      ;(q.steps ?? []).forEach((s, i) => eb.push(`${i + 1}. ${s}`))
      eb.push('', `**Explanation:** ${q.explanation}`, '')
    }
  }
  write('exercises/exercise-bank.md', eb.join('\n') + '\n')
}
