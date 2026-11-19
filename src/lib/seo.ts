/**
 * Route-level SEO metadata, derived entirely from content data.
 *
 * This module is pure (no DOM access) so the same function drives:
 *   - the build-time prerender (static <head> + HTML for every public URL),
 *   - the sitemap generator,
 *   - the runtime <SeoHead> that keeps the head in sync during client navigation.
 *
 * Never hand-write per-page titles elsewhere; add a case here instead.
 */
import {
  findFormula,
  findShape,
  formulaRefs,
  getGrade,
  grades,
  libraryStats,
  resolveSubjectId,
  shapes,
  subjectAliases,
  topicRefs,
} from '../data/index'
import { TRACKS, isBacTrack } from '../data/bacii'
import { glossaryTerms } from '../i18n/glossary'

export const SITE_ORIGIN = 'https://math-high-school.vercel.app'
export const SITE_NAME = 'High School Math'
/** Other names people use for the site; feeds WebSite.alternateName. */
export const SITE_ALTERNATE_NAMES = ['Math High School', 'គណិតវិទ្យា ថ្នាក់ទី៧–១២']
export const OG_IMAGE = `${SITE_ORIGIN}/og-image.png`
export const OG_IMAGE_WIDTH = 1200
export const OG_IMAGE_HEIGHT = 630
export const LOGO_URL = `${SITE_ORIGIN}/icons/pi-512.png`

export type Robots = 'index,follow' | 'noindex,follow'

export interface Crumb {
  name: string
  path: string
}

export interface RouteMeta {
  /** Canonical path (no origin, no trailing slash except root). */
  path: string
  title: string
  description: string
  robots: Robots
  ogType: 'website' | 'article'
  /** HTTP status the static file should represent. */
  status: 200 | 404
  breadcrumbs: Crumb[]
  jsonLd: Record<string, unknown>[]
}

/* ------------------------------------------------------------------ */
/* Text helpers                                                        */
/* ------------------------------------------------------------------ */

const LATEX_SYMBOLS: [RegExp, string][] = [
  [/\\pi\b/g, 'π'],
  [/\\theta\b/g, 'θ'],
  [/\\alpha\b/g, 'α'],
  [/\\beta\b/g, 'β'],
  [/\\Delta\b/g, 'Δ'],
  [/\\times\b/g, '×'],
  [/\\cdot\b/g, '·'],
  [/\\div\b/g, '÷'],
  [/\\pm\b/g, '±'],
  [/\\leq?\b/g, '≤'],
  [/\\geq?\b/g, '≥'],
  [/\\neq?\b/g, '≠'],
  [/\\approx\b/g, '≈'],
  [/\\infty\b/g, '∞'],
  [/\\degree\b|\^\\circ|\\circ\b/g, '°'],
  [/\\sqrt/g, '√'],
  [/\\(sin|cos|tan|log|ln|lim)\b/g, '$1'],
  [/\\frac\{([^{}]*)\}\{([^{}]*)\}/g, '($1)/($2)'],
  [/\\(left|right|,|;|!|quad|qquad)/g, ''],
  [/\^2\b|\^\{2\}/g, '²'],
  [/\^3\b|\^\{3\}/g, '³'],
  [/\\[a-zA-Z]+/g, ''],
  [/[{}]/g, ''],
]

/** Converts prose with inline `$...$` LaTeX into readable plain text for meta tags. */
export function toPlainText(input: string): string {
  const withMath = input.replace(/\$([^$]+)\$/g, (_match, tex: string) => {
    let out = tex
    for (const [pattern, replacement] of LATEX_SYMBOLS) out = out.replace(pattern, replacement)
    return out
  })
  return withMath
    .replace(/\*\*|__|`/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

/** Trims to a search-snippet-friendly length on a word boundary. */
export function truncate(text: string, max = 158): string {
  const plain = toPlainText(text)
  if (plain.length <= max) return plain
  const cut = plain.slice(0, max - 1)
  const lastSpace = cut.lastIndexOf(' ')
  return `${(lastSpace > 80 ? cut.slice(0, lastSpace) : cut).replace(/[,;:.\s—–-]+$/, '')}…`
}

function withBrand(title: string): string {
  return `${title} | ${SITE_NAME}`
}

export function absoluteUrl(path: string): string {
  return path === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}`
}

/* ------------------------------------------------------------------ */
/* Structured data builders (Schema.org)                               */
/* ------------------------------------------------------------------ */

const WEBSITE_ID = `${SITE_ORIGIN}/#website`
const PUBLISHER_ID = `${SITE_ORIGIN}/#publisher`

function breadcrumbLd(crumbs: Crumb[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  }
}

function learningResourceLd(options: {
  path: string
  name: string
  description: string
  resourceType: string
  educationalLevel?: string
  about?: string[]
  teaches?: string[]
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    '@id': `${absoluteUrl(options.path)}#resource`,
    name: options.name,
    description: options.description,
    url: absoluteUrl(options.path),
    inLanguage: ['en', 'km'],
    isAccessibleForFree: true,
    learningResourceType: options.resourceType,
    ...(options.educationalLevel ? { educationalLevel: options.educationalLevel } : {}),
    ...(options.about?.length ? { about: options.about.map((name) => ({ '@type': 'Thing', name })) } : {}),
    ...(options.teaches?.length ? { teaches: options.teaches } : {}),
    audience: { '@type': 'EducationalAudience', educationalRole: 'student' },
    educationalAlignment: {
      '@type': 'AlignmentObject',
      alignmentType: 'educationalSubject',
      educationalFramework: 'MoEYS Cambodia High School Mathematics Curriculum',
      targetName: options.educationalLevel || 'Secondary Education Grade 7-12',
    },
    isPartOf: { '@id': WEBSITE_ID },
    publisher: { '@id': PUBLISHER_ID },
  }
}

function collectionPageLd(path: string, name: string, description: string): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url: absoluteUrl(path),
    inLanguage: ['en', 'km'],
    isPartOf: { '@id': WEBSITE_ID },
  }
}

function webAppLd(options: {
  path: string
  name: string
  description: string
  applicationCategory: string
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': `${absoluteUrl(options.path)}#app`,
    name: options.name,
    description: options.description,
    url: absoluteUrl(options.path),
    applicationCategory: options.applicationCategory,
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript and HTML5 Canvas or SVG support',
    isAccessibleForFree: true,
    inLanguage: ['en', 'km'],
    isPartOf: { '@id': WEBSITE_ID },
  }
}

function faqPageLd(faqs: { question: string; answer: string }[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export const HOME_FAQS = [
  {
    question: 'What is High School Math (គណិតវិទ្យា ថ្នាក់ទី៧-១២)?',
    answer:
      'High School Math is a free, privacy-first, bilingual English and Khmer mathematics platform for Cambodian students and educators in Grades 7 to 12. It includes comprehensive formula derivations, 7-step worked solutions, BacII exam guides, and visual STEM laboratories.',
  },
  {
    question: 'Is High School Math aligned with the Cambodian MoEYS curriculum?',
    answer:
      'Yes, all lessons, formulas, definitions, and worked examples strictly follow the Cambodian Ministry of Education, Youth and Sport (MoEYS) national curriculum standards and BacII national examination formats.',
  },
  {
    question: 'What interactive mathematics laboratories are available?',
    answer:
      'The platform provides interactive STEM labs including the Unit Circle Lab (រង្វង់ត្រីកោណមាត្រ), Conic Sections Playground, 3D Volume of Revolution Lab, Complex Numbers Argand Plane Lab, Probability Tree Lab, 2D and 3D Shape Lab, and a Function Grapher.',
  },
  {
    question: 'How does High School Math help students prepare for the Grade 12 BacII exam?',
    answer:
      'It offers complete examination guides for both Science and Social Science tracks, formula summaries from past national papers, and an interactive timed BacII Sprint Drill mode for rapid formula recall.',
  },
  {
    question: 'Are mathematical formulas and lessons available in Khmer?',
    answer:
      'Yes, the entire library features standardized MoEYS Khmer mathematical terminology alongside international notation, including an English-Khmer glossary of over 230 mathematical terms.',
  },
]

export const BACII_FAQS = [
  {
    question: 'What is the structure of the Grade 12 BacII mathematics exam in Cambodia?',
    answer:
      'The BacII mathematics examination is divided into two tracks: Science Track (focused on limits, derivatives, integrals, complex numbers, differential equations, and 3D space geometry) and Social Science Track (focused on statistics, probability, financial mathematics, and foundational calculus).',
  },
  {
    question: 'What are the highest-yield topics on the BacII Science Track math exam?',
    answer:
      'High-yield topics include Indeterminate Limits (0/0 and trig limits), Derivative curve sketching and optimization, Definite Integrals and Volumes of Revolution, Complex Numbers in the Argand Plane, and 3D Vector Geometry.',
  },
  {
    question: 'How can students practice timed BacII math problems?',
    answer:
      'Students can use the interactive BacII Sprint Drill mode (/exam/sprint) for 3-minute, 5-minute, or untimed rapid formula drills with instant feedback and step-by-step explanations.',
  },
]

export const SITE_KEYWORDS =
  'High School Math, Math High School Cambodia, Cambodian Mathematics, Khmer Mathematics, Mathematics Grade 7-12, MoEYS math, BacII math, គណិតវិទ្យា ថ្នាក់ទី៧-១២, បាក់ឌុប, រូបមន្តគណិតវិទ្យា, ប្រឡងបាក់ឌុប'

function siteIdentityLd(description: string): Record<string, unknown>[] {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      name: SITE_NAME,
      alternateName: SITE_ALTERNATE_NAMES,
      url: `${SITE_ORIGIN}/`,
      description,
      inLanguage: ['en', 'km'],
      publisher: { '@id': PUBLISHER_ID },
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${SITE_ORIGIN}/search?q={search_term_string}` },
        'query-input': 'required name=search_term_string',
      },
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', '.hero__lead', '.seo-summary'],
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': PUBLISHER_ID,
      name: SITE_NAME,
      alternateName: SITE_ALTERNATE_NAMES,
      url: `${SITE_ORIGIN}/`,
      logo: { '@type': 'ImageObject', url: LOGO_URL, width: 512, height: 512 },
      knowsAbout: [
        'Mathematics',
        'Cambodian High School Curriculum',
        'MoEYS Cambodia',
        'Grade 7-12 Mathematics',
        'BacII Examination',
        'Trigonometry',
        'Calculus',
        'Algebra',
        'Geometry',
        'Probability',
      ],
    },
  ]
}

/* ------------------------------------------------------------------ */
/* Route resolution                                                    */
/* ------------------------------------------------------------------ */

/** Formula titles reused by more than one formula in the same grade (disambiguated with the topic). */
const AMBIGUOUS_FORMULA_TITLES = (() => {
  const counts = new Map<string, number>()
  for (const ref of formulaRefs) {
    const key = `${ref.grade.id}|${ref.formula.title.toLowerCase()}`
    counts.set(key, (counts.get(key) ?? 0) + 1)
  }
  return new Set([...counts].filter(([, count]) => count > 1).map(([key]) => key))
})()

const HOME: Crumb = { name: 'Home', path: '/' }
const GRADES: Crumb = { name: 'Grades', path: '/grades' }

function page(
  path: string,
  title: string,
  description: string,
  crumbs: Crumb[],
  extraLd: Record<string, unknown>[] = [],
  ogType: RouteMeta['ogType'] = 'website',
): RouteMeta {
  return {
    path,
    title,
    description: truncate(description),
    robots: 'index,follow',
    ogType,
    status: 200,
    breadcrumbs: crumbs,
    jsonLd: [...extraLd, ...(crumbs.length > 1 ? [breadcrumbLd(crumbs)] : [])],
  }
}

function utilityPage(path: string, title: string, description: string): RouteMeta {
  return {
    path,
    title: withBrand(title),
    description,
    robots: 'noindex,follow',
    ogType: 'website',
    status: 200,
    breadcrumbs: [],
    jsonLd: [],
  }
}

export function notFoundMeta(pathname: string): RouteMeta {
  return {
    path: pathname,
    title: withBrand('Page not found'),
    description: 'This page does not exist. Browse mathematics formulas and lessons for Grades 7–12 instead.',
    robots: 'noindex,follow',
    ogType: 'website',
    status: 404,
    breadcrumbs: [],
    jsonLd: [],
  }
}

export function homeDescription(): string {
  return (
    `Free Khmer & English math library for Cambodian students in Grades 7–12: ${libraryStats.formulaCount} formulas, ` +
    `${libraryStats.topicCount} lessons with worked examples, exercises, BacII guides and a Shape Lab.`
  )
}

/** Normalizes a pathname: strips query/hash, collapses slashes, removes the trailing slash. */
export function normalizePath(pathname: string): string {
  const clean = pathname.split(/[?#]/)[0].replace(/\/{2,}/g, '/')
  if (clean.length > 1 && clean.endsWith('/')) return clean.slice(0, -1)
  return clean || '/'
}

/** Routes that render the same page as another URL; the client redirects or both resolve to one canonical. */
export const ROUTE_ALIASES: Record<string, string> = {
  '/exams': '/exam',
  '/plotter': '/graph',
  '/circle': '/unit-circle',
  '/sprint': '/exam/sprint',
}

export function getRouteMeta(rawPathname: string): RouteMeta {
  const pathname = normalizePath(rawPathname)
  const alias = ROUTE_ALIASES[pathname]
  if (alias) return getRouteMeta(alias)

  const segments = pathname.split('/').filter(Boolean).map((part) => {
    try {
      return decodeURIComponent(part)
    } catch {
      return part
    }
  })

  if (segments.length === 0) {
    const description = homeDescription()
    return {
      path: '/',
      title: `${SITE_NAME} - Grade 7–12 Mathematics for Cambodian Students`,
      description,
      robots: 'index,follow',
      ogType: 'website',
      status: 200,
      breadcrumbs: [HOME],
      jsonLd: [...siteIdentityLd(description), faqPageLd(HOME_FAQS)],
    }
  }

  const [section, second, third, fourth, fifth, ...rest] = segments

  switch (section) {
    case 'grades': {
      if (!second) {
        const description =
          'Choose a grade from 7 to 12 to study mathematics by subject: number, algebra, geometry, trigonometry, statistics, probability and calculus — in English and Khmer.'
        return page('/grades', withBrand('Mathematics by Grade, 7–12'), description, [HOME, GRADES], [
          collectionPageLd('/grades', 'Mathematics by Grade, 7–12', description),
        ])
      }
      const grade = getGrade(second)
      if (!grade) break
      const gradePath = `/grades/${grade.id}`
      const gradeCrumb: Crumb = { name: grade.title, path: gradePath }
      if (!third) {
        const subjectNames = grade.subjects.map((subject) => subject.title).join(', ')
        const description = `${grade.title} mathematics: ${toPlainText(grade.tagline).replace(/\.$/, '')}. Lessons, formulas, worked examples and exercises in ${subjectNames}.`
        return page(
          gradePath,
          withBrand(`${grade.title} Math: Formulas, Lessons & Exercises`),
          description,
          [HOME, GRADES, gradeCrumb],
          [collectionPageLd(gradePath, `${grade.title} Mathematics`, truncate(description))],
        )
      }
      if (third !== 'subjects' || !fourth) break
      const resolvedSubjectId = resolveSubjectId(grade.id, fourth)
      const subject = grade.subjects.find((item) => item.id === resolvedSubjectId)
      if (!subject) break
      const subjectPath = `/grades/${grade.id}/subjects/${subject.id}`
      const subjectCrumb: Crumb = { name: subject.title, path: subjectPath }
      if (!fifth) {
        const description = `${grade.title} ${subject.title}: ${toPlainText(subject.description)}`
        return page(
          subjectPath,
          withBrand(`${subject.title} — ${grade.title} Math`),
          description,
          [HOME, GRADES, gradeCrumb, subjectCrumb],
          [collectionPageLd(subjectPath, `${grade.title} ${subject.title}`, truncate(description))],
        )
      }
      if (fifth !== 'topics' || rest.length !== 1) break
      const topic = subject.topics.find((item) => item.id === rest[0])
      if (!topic) break
      const topicPath = `${subjectPath}/topics/${topic.id}`
      const description = `${topic.title} (${grade.title} ${subject.title}): ${toPlainText(topic.subtitle).replace(/\.$/, '')}. ${toPlainText(topic.introduction)}`
      return page(
        topicPath,
        withBrand(`${topic.title} — ${grade.title} ${subject.title}`),
        description,
        [HOME, GRADES, gradeCrumb, subjectCrumb, { name: topic.title, path: topicPath }],
        [
          learningResourceLd({
            path: topicPath,
            name: topic.title,
            description: truncate(description),
            resourceType: 'Lesson',
            educationalLevel: grade.title,
            about: [subject.title],
            teaches: topic.formulas.map((formula) => formula.title).slice(0, 12),
          }),
        ],
        'article',
      )
    }

    case 'formulas': {
      if (!second) {
        const description = `Every formula in the library — ${libraryStats.formulaCount} formulas for Grades 7–12, each with its meaning, variables, conditions and a link to the full lesson.`
        return page('/formulas', withBrand('All Math Formulas, Grades 7–12'), description, [
          HOME,
          { name: 'Formulas', path: '/formulas' },
        ], [collectionPageLd('/formulas', 'All Math Formulas, Grades 7–12', truncate(description))])
      }
      if (third) break
      const ref = findFormula(second)
      if (!ref) break
      const { formula, topic, grade, subject } = ref
      const formulaPath = `/formulas/${formula.id}`
      const topicPath = `/grades/${grade.id}/subjects/${subject.id}/topics/${topic.id}`
      const description = `${formula.title} (${grade.title} ${topic.title}): ${toPlainText(formula.description)}`
      return page(
        formulaPath,
        withBrand(
          AMBIGUOUS_FORMULA_TITLES.has(`${grade.id}|${formula.title.toLowerCase()}`)
            ? `${formula.title} (${topic.title}) — ${grade.title}`
            : `${formula.title} — ${grade.title} Formula`,
        ),
        description,
        [
          HOME,
          GRADES,
          { name: grade.title, path: `/grades/${grade.id}` },
          { name: topic.title, path: topicPath },
          { name: formula.title, path: formulaPath },
        ],
        [
          learningResourceLd({
            path: formulaPath,
            name: formula.title,
            description: truncate(description),
            resourceType: 'Formula reference',
            educationalLevel: grade.title,
            about: [topic.title, subject.title],
          }),
        ],
        'article',
      )
    }

    case 'shapes': {
      if (!second) {
        const description = `Interactive Shape Lab: resize ${libraryStats.shape2dCount} flat shapes and ${libraryStats.shape3dCount} solids and watch area, perimeter, surface area and volume recalculate with the formulas.`
        return page('/shapes', withBrand('Shape Lab: Area, Perimeter & Volume Formulas'), description, [
          HOME,
          { name: 'Shapes', path: '/shapes' },
        ], [
          collectionPageLd('/shapes', 'Shape Lab', truncate(description)),
          webAppLd({
            path: '/shapes',
            name: 'Interactive Shape Lab (2D & 3D)',
            description: truncate(description),
            applicationCategory: 'EducationalApplication',
          }),
        ])
      }
      if (third) break
      const shape = findShape(second)
      if (!shape) break
      const shapePath = `/shapes/${shape.id}`
      const measures = shape.category === '3d' ? 'Surface Area & Volume' : 'Area & Perimeter'
      const description = `${shape.name}: ${toPlainText(shape.definition)} Interactive ${measures.toLowerCase()} calculator with formulas and a worked example.`
      return page(
        shapePath,
        withBrand(`${shape.name} ${measures} Formulas`),
        description,
        [HOME, { name: 'Shapes', path: '/shapes' }, { name: shape.name, path: shapePath }],
        [
          learningResourceLd({
            path: shapePath,
            name: `${shape.name} - ${measures}`,
            description: truncate(description),
            resourceType: 'Interactive resource',
            about: ['Geometry', shape.name],
          }),
        ],
      )
    }

    case 'graph': {
      if (second) break
      const description =
        'Free interactive grapher for Grades 7–12: plot functions, parabolas, circles, ellipses and hyperbolas, then pan, zoom and inspect coordinates.'
      return page('/graph', withBrand('Function & Conics Grapher'), description, [
        HOME,
        { name: 'Grapher', path: '/graph' },
      ], [
        learningResourceLd({
          path: '/graph',
          name: 'Function & Conics Grapher',
          description,
          resourceType: 'Interactive resource',
          about: ['Functions', 'Conic sections'],
        }),
        webAppLd({
          path: '/graph',
          name: 'Function & Conics Grapher',
          description,
          applicationCategory: 'EducationalApplication',
        }),
      ])
    }

    case 'unit-circle':
    case 'circle': {
      if (second) break
      const description =
        'Interactive Unit Circle Lab (រង្វង់ត្រីកោណមាត្រ): explore exact radian angles, sine, cosine and tangent coordinate projections, and MoEYS Cambodian high school formulas for Grades 10–12.'
      return page(
        '/unit-circle',
        withBrand('Unit Circle Lab (រង្វង់ត្រីកោណមាត្រ)'),
        description,
        [HOME, { name: 'Unit Circle', path: '/unit-circle' }],
        [
          learningResourceLd({
            path: '/unit-circle',
            name: 'Interactive Unit Circle Lab',
            description,
            resourceType: 'Interactive resource',
            about: ['Trigonometry', 'Unit Circle', 'Sine', 'Cosine', 'Radians'],
          }),
          webAppLd({
            path: '/unit-circle',
            name: 'Interactive Unit Circle Lab (រង្វង់ត្រីកោណមាត្រ)',
            description,
            applicationCategory: 'EducationalApplication',
          }),
        ],
      )
    }

    case 'conics': {
      if (second) break
      const description =
        'Interactive Conic Sections Playground (បន្ទះពិសោធន៍កោនិក): explore Parabola, Ellipse, and Hyperbola with draggable point P, live focal-distance verification, and parameter sliders. Grades 11–12 MoEYS curriculum.'
      return page(
        '/conics',
        withBrand('Conic Sections Playground (បន្ទះពិសោធន៍កោនិក)'),
        description,
        [HOME, { name: 'Conic Sections', path: '/conics' }],
        [
          learningResourceLd({
            path: '/conics',
            name: 'Conic Sections Playground',
            description,
            resourceType: 'Interactive resource',
            educationalLevel: 'Grades 11–12',
            about: ['Conic sections', 'Parabola', 'Ellipse', 'Hyperbola'],
          }),
          webAppLd({
            path: '/conics',
            name: 'Conic Sections Playground (បន្ទះពិសោធន៍កោនិក)',
            description,
            applicationCategory: 'EducationalApplication',
          }),
        ],
      )
    }

    case 'labs': {
      if (second === 'revolution') {
        const description =
          'Volume of Revolution Lab (បន្ទះពិសោធន៍បរិមាណវិលបង្វិល): interactive 3D solid built by rotating y = x², y = √x, or y = x around the x-axis. Watch the sweep animation, adjust limits a and b, and verify closed-form integrals. Grade 12 BacII core.'
        return page(
          '/labs/revolution',
          withBrand('Volume of Revolution Lab (Grade 12 BacII)'),
          description,
          [HOME, { name: 'Volume of Revolution', path: '/labs/revolution' }],
          [
            learningResourceLd({
              path: '/labs/revolution',
              name: 'Volume of Revolution Lab',
              description,
              resourceType: 'Interactive resource',
              educationalLevel: 'Grade 12',
              about: ['Integral calculus', 'Volume of revolution', 'BacII'],
            }),
            webAppLd({
              path: '/labs/revolution',
              name: 'Volume of Revolution Lab (Grade 12 BacII)',
              description,
              applicationCategory: 'EducationalApplication',
            }),
          ],
        )
      }
      if (second === 'argand') {
        const description =
          'Argand Plane Lab (បន្ទះពិសោធន៍ប្លង់អាកង់): place any complex number z = a + bi and explore its modulus, argument, and polar form z = r(cosθ + isinθ). Toggle conjugate, negation, and product rules, Grade 12 BacII core.'
        return page(
          '/labs/argand',
          withBrand('Argand Plane Lab (Complex Numbers, Grade 12)'),
          description,
          [HOME, { name: 'Argand Plane', path: '/labs/argand' }],
          [
            learningResourceLd({
              path: '/labs/argand',
              name: 'Argand Plane Lab',
              description,
              resourceType: 'Interactive resource',
              educationalLevel: 'Grade 12',
              about: ['Complex numbers', 'Argand plane', 'Polar form', 'BacII'],
            }),
            webAppLd({
              path: '/labs/argand',
              name: 'Argand Plane Lab (Complex Numbers, Grade 12)',
              description,
              applicationCategory: 'EducationalApplication',
            }),
          ],
        )
      }
      if (second === 'probability') {
        const description =
          'Probability Tree & Counting Lab (ដើមឈើប្រូបាប): build a 2-stage probability tree, verify branch sums, and read off P(A∩B), conditional probability P(B|A), and total probability live. Includes Permutations and Combinations calculators. Grades 10–12 MoEYS.'
        return page(
          '/labs/probability',
          withBrand('Probability Tree & Counting Lab (Grades 10–12)'),
          description,
          [HOME, { name: 'Probability Tree', path: '/labs/probability' }],
          [
            learningResourceLd({
              path: '/labs/probability',
              name: 'Probability Tree & Counting Lab',
              description,
              resourceType: 'Interactive resource',
              educationalLevel: 'Grades 10–12',
              about: ['Probability', 'Conditional probability', 'Permutations', 'Combinations', 'BacII'],
            }),
            webAppLd({
              path: '/labs/probability',
              name: 'Probability Tree & Counting Lab (Grades 10–12)',
              description,
              applicationCategory: 'EducationalApplication',
            }),
          ],
        )
      }
      break
    }

    case 'bacii': {
      const baciiCrumb: Crumb = { name: 'BacII Guide', path: '/bacii' }
      if (!second) {
        const description =
          'Grade 12 BacII mathematics guide for Cambodian students: paper structure, marks, question patterns from past papers, timing and a revision plan for the science and social science tracks.'
        return page('/bacii', withBrand('BacII Math Exam Guide (Grade 12)'), description, [HOME, baciiCrumb], [
          learningResourceLd({
            path: '/bacii',
            name: 'BacII Mathematics Exam Guide',
            description,
            resourceType: 'Study guide',
            educationalLevel: 'Grade 12',
          }),
          faqPageLd(BACII_FAQS),
        ])
      }
      if (third || !isBacTrack(second)) break
      const track = TRACKS[second]
      const trackPath = `/bacii/${second}`
      const description = `BacII mathematics, ${track.title}: ${toPlainText(track.description)}`
      return page(
        trackPath,
        withBrand(`BacII Math - ${track.title}`),
        description,
        [HOME, baciiCrumb, { name: track.title, path: trackPath }],
        [
          learningResourceLd({
            path: trackPath,
            name: `BacII Mathematics - ${track.title}`,
            description: truncate(description),
            resourceType: 'Study guide',
            educationalLevel: 'Grade 12',
          }),
        ],
      )
    }

    case 'exam': {
      if (second === 'sprint') {
        const description =
          'BacII Sprint Drill Mode (ការហ្វឹកហាត់ល្បឿនបាក់ឌុប): rapid formula recall for Grade 12 MoEYS limits, derivatives, integrals, complex numbers, and probability with instant feedback.'
        return page(
          '/exam/sprint',
          withBrand('BacII Sprint Drill Mode (ការហ្វឹកហាត់ល្បឿនបាក់ឌុប)'),
          description,
          [HOME, { name: 'Exams', path: '/exam' }, { name: 'Sprint Drill', path: '/exam/sprint' }],
          [
            learningResourceLd({
              path: '/exam/sprint',
              name: 'BacII Sprint Drill Mode',
              description,
              resourceType: 'Quiz',
              educationalLevel: 'Grade 12',
            }),
            webAppLd({
              path: '/exam/sprint',
              name: 'BacII Sprint Drill Mode (ការហ្វឹកហាត់ល្បឿនបាក់ឌុប)',
              description,
              applicationCategory: 'EducationalApplication',
            }),
          ],
        )
      }
      if (second) break
      const description =
        'Practice mathematics exam papers for Grades 7–12 in the Cambodian format: Grade 9 Diploma, Grade 12 BacII and semester papers, with timed self-testing and step-by-step solutions.'
      return page('/exam', withBrand('Math Exam Practice Papers, Grades 7–12'), description, [
        HOME,
        { name: 'Exams', path: '/exam' },
      ], [
        learningResourceLd({
          path: '/exam',
          name: 'Mathematics Exam Practice',
          description,
          resourceType: 'Practice exam',
        }),
      ])
    }

    case 'glossary': {
      if (second) break
      const description = `English–Khmer mathematics glossary with ${glossaryTerms.length} terms (វចនានុក្រមគណិតវិទ្យា): definitions for number, geometry, trigonometry, statistics and calculus vocabulary.`
      return page('/glossary', withBrand('English–Khmer Math Glossary'), description, [
        HOME,
        { name: 'Glossary', path: '/glossary' },
      ], [
        {
          '@context': 'https://schema.org',
          '@type': 'DefinedTermSet',
          '@id': `${absoluteUrl('/glossary')}#terms`,
          name: 'English–Khmer Mathematics Glossary',
          description: truncate(description),
          url: absoluteUrl('/glossary'),
          inLanguage: ['en', 'km'],
          isPartOf: { '@id': WEBSITE_ID },
        },
      ])
    }

    case 'search':
      if (second) break
      return utilityPage('/search', 'Search Formulas & Topics', 'Search every formula, topic and shape for Grades 7–12.')

    case 'bookmarks':
      if (second) break
      return utilityPage('/bookmarks', 'Your Bookmarks', 'Formulas, topics and shapes you saved in this browser.')

    default:
      break
  }

  return notFoundMeta(pathname)
}

/* ------------------------------------------------------------------ */
/* Route inventory                                                     */
/* ------------------------------------------------------------------ */

export interface SitemapRoute {
  path: string
  priority: string
  changefreq: 'daily' | 'weekly' | 'monthly'
}

/** Every public, indexable URL (the sitemap). Derived from content; never hand-maintained. */
export function listIndexableRoutes(): SitemapRoute[] {
  const routes: SitemapRoute[] = []
  const seen = new Set<string>()
  const add = (path: string, priority = '0.7', changefreq: SitemapRoute['changefreq'] = 'weekly') => {
    if (seen.has(path)) return
    seen.add(path)
    routes.push({ path, priority, changefreq })
  }

  add('/', '1.0', 'weekly')
  add('/grades', '0.9')
  add('/formulas', '0.9')
  add('/shapes', '0.9')
  add('/graph', '0.8')
  add('/unit-circle', '0.8')
  add('/conics', '0.8')
  add('/labs/revolution', '0.8')
  add('/labs/argand', '0.8')
  add('/labs/probability', '0.8')
  add('/bacii', '0.9')
  for (const track of Object.keys(TRACKS)) add(`/bacii/${track}`, '0.8')
  add('/exam', '0.8')
  add('/exam/sprint', '0.8')
  add('/glossary', '0.8')

  for (const grade of grades) {
    add(`/grades/${grade.id}`, '0.9')
    for (const subject of grade.subjects) {
      add(`/grades/${grade.id}/subjects/${subject.id}`, '0.8')
    }
  }
  for (const ref of topicRefs) {
    add(`/grades/${ref.grade.id}/subjects/${ref.subject.id}/topics/${ref.topic.id}`, '0.8')
  }
  for (const ref of formulaRefs) add(`/formulas/${ref.formula.id}`, '0.6')
  for (const shape of shapes) add(`/shapes/${shape.id}`, '0.6', 'monthly')

  return routes
}

/** Every URL that must exist as a static file: indexable pages plus noindex utility pages. */
export function listPrerenderRoutes(): string[] {
  return [...listIndexableRoutes().map((route) => route.path), '/search', '/bookmarks']
}

/** Permanent redirects for alias URLs (consumed by vercel.json and tests). */
export function listRedirects(): { source: string; destination: string }[] {
  const redirects = Object.entries(ROUTE_ALIASES).map(([source, destination]) => ({ source, destination }))
  for (const [key, target] of Object.entries(subjectAliases)) {
    const [gradeId, alias] = key.split(':')
    redirects.push({ source: `/grades/${gradeId}/subjects/${alias}`, destination: `/grades/${gradeId}/subjects/${target}` })
    redirects.push({
      source: `/grades/${gradeId}/subjects/${alias}/topics/:topicId`,
      destination: `/grades/${gradeId}/subjects/${target}/topics/:topicId`,
    })
  }
  return redirects
}

/* ------------------------------------------------------------------ */
/* Head rendering (build time)                                         */
/* ------------------------------------------------------------------ */

function escapeAttr(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

/** JSON for a <script type="application/ld+json"> block, safe against `</script>` injection. */
export function serializeJsonLd(data: Record<string, unknown>[]): string {
  const payload = data.length === 1 ? data[0] : data
  return JSON.stringify(payload).replace(/</g, '\\u003c')
}

/** The managed <head> tags for a route. The runtime SeoHead updates exactly these elements. */
export function renderHeadTags(meta: RouteMeta): string {
  const url = absoluteUrl(meta.path)
  const robotsTag =
    meta.robots === 'index,follow'
      ? 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'
      : meta.robots

  const tags = [
    `<title>${escapeAttr(meta.title)}</title>`,
    `<meta name="description" content="${escapeAttr(meta.description)}" />`,
    `<meta name="keywords" content="${SITE_KEYWORDS}" />`,
    `<meta name="author" content="High School Math Cambodia" />`,
    `<meta name="robots" content="${robotsTag}" />`,
  ]
  if (meta.status === 200) tags.push(`<link rel="canonical" href="${url}" />`)
  tags.push(
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:type" content="${meta.ogType}" />`,
    `<meta property="og:title" content="${escapeAttr(meta.title)}" />`,
    `<meta property="og:description" content="${escapeAttr(meta.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="og:locale:alternate" content="km_KH" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta property="og:image:width" content="${OG_IMAGE_WIDTH}" />`,
    `<meta property="og:image:height" content="${OG_IMAGE_HEIGHT}" />`,
    `<meta property="og:image:alt" content="${SITE_NAME} - π logo, mathematics for Grades 7–12" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeAttr(meta.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(meta.description)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
  )
  if (meta.jsonLd.length) {
    tags.push(`<script type="application/ld+json" id="seo-jsonld">${serializeJsonLd(meta.jsonLd)}</script>`)
  }
  return tags.join('\n    ')
}
