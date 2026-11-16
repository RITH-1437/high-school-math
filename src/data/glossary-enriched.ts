import { glossaryTerms, type GlossaryTerm } from '../i18n/glossary'

export interface TermEtymology {
  lang: 'fr' | 'pali' | 'sanskrit' | 'greek' | 'lat'
  label: string
}

export interface TermLessonLink {
  grade: '7' | '8' | '9' | '10' | '11' | '12' | 'shapes'
  gradeLabelEn: string
  gradeLabelKm: string
  topicTitleEn: string
  topicTitleKm: string
  path: string
}

export interface EnrichedTerm extends GlossaryTerm {
  id: string
  khmerConsonant: string
  englishLetter: string
  symbol?: string
  etymology?: TermEtymology
  partOfSpeech?: 'n' | 'v' | 'adj'
  lesson?: TermLessonLink
  examFocus?: 'diploma' | 'bac2'
}

const ETYMOLOGY_PREFIX_KM: { prefix: string; km: string }[] = [
  { prefix: 'Fr. ', km: 'បារាំង៖ ' },
  { prefix: 'Greek ', km: 'ក្រិក៖ ' },
  { prefix: 'Lat. ', km: 'ឡាតាំង៖ ' },
  { prefix: 'Skt. ', km: 'សំស្ក្រឹត៖ ' },
]

/**
 * Etymology label for the active language. The source word itself (e.g. the
 * French "entier relatif") is kept; only the language prefix is localized.
 */
export function etymologyLabel(etymology: TermEtymology, isKhmer: boolean): string {
  if (!isKhmer) return etymology.label
  const match = ETYMOLOGY_PREFIX_KM.find(({ prefix }) => etymology.label.startsWith(prefix))
  return match ? match.km + etymology.label.slice(match.prefix.length) : etymology.label
}

/**
 * Definition text for the active language, falling back to English only when
 * no Khmer definition exists.
 */
export function termDefinition(term: GlossaryTerm, isKhmer: boolean): string | undefined {
  return isKhmer ? term.noteKm ?? term.note : term.note
}

/**
 * Extract leading Khmer consonant according to standard dictionary order.
 */
export function getKhmerInitial(kmText: string): string {
  const clean = kmText.replace(/^[^\u1780-\u17B3]+/, '')
  const match = clean.match(/^[\u1780-\u17A2]/)
  return match ? match[0] : 'អ'
}

/**
 * Extract leading English letter (A-Z).
 */
export function getEnglishInitial(enText: string): string {
  const match = enText.trim().toUpperCase().match(/^[A-Z]/)
  return match ? match[0] : 'A'
}

// Map of curated symbols, etymologies, lessons, and exam focus
const METADATA_MAP: Record<
  string,
  {
    symbol?: string
    etymology?: TermEtymology
    partOfSpeech?: 'n' | 'v' | 'adj'
    lesson?: TermLessonLink
    examFocus?: 'diploma' | 'bac2'
  }
> = {
  'Natural number': {
    symbol: '\\mathbb{N} = \\{1, 2, 3, \\dots\\}',
    partOfSpeech: 'n',
    lesson: {
      grade: '7',
      gradeLabelEn: 'Grade 7',
      gradeLabelKm: 'ថ្នាក់ទី ៧',
      topicTitleEn: 'Integers',
      topicTitleKm: 'ចំនួនគត់',
      path: '/grades/7/subjects/number-systems/topics/integers',
    },
  },
  'Integer': {
    symbol: '\\mathbb{Z} = \\{\\dots, -2, -1, 0, 1, 2, \\dots\\}',
    etymology: { lang: 'fr', label: 'Fr. entier relatif' },
    partOfSpeech: 'n',
    lesson: {
      grade: '7',
      gradeLabelEn: 'Grade 7',
      gradeLabelKm: 'ថ្នាក់ទី ៧',
      topicTitleEn: 'Integers',
      topicTitleKm: 'ចំនួនគត់',
      path: '/grades/7/subjects/number-systems/topics/integers',
    },
  },
  'Rational number': {
    symbol: '\\mathbb{Q} = \\left\\{\\frac{a}{b} \\mid a, b \\in \\mathbb{Z}, b \\neq 0\\right\\}',
    partOfSpeech: 'n',
    lesson: {
      grade: '7',
      gradeLabelEn: 'Grade 7',
      gradeLabelKm: 'ថ្នាក់ទី ៧',
      topicTitleEn: 'Rational Numbers',
      topicTitleKm: 'ចំនួនសនិទាន',
      path: '/grades/7/subjects/number-systems/topics/rational-numbers',
    },
  },
  'Irrational number': {
    symbol: '\\sqrt{2}, \\pi, e \\notin \\mathbb{Q}',
    partOfSpeech: 'n',
    lesson: {
      grade: '8',
      gradeLabelEn: 'Grade 8',
      gradeLabelKm: 'ថ្នាក់ទី ៨',
      topicTitleEn: 'Real Numbers',
      topicTitleKm: 'ចំនួនពិត',
      path: '/grades/8/subjects/number-systems/topics/real-numbers',
    },
  },
  'Real number': {
    symbol: '\\mathbb{R} = \\mathbb{Q} \\cup \\mathbb{I}',
    partOfSpeech: 'n',
    lesson: {
      grade: '8',
      gradeLabelEn: 'Grade 8',
      gradeLabelKm: 'ថ្នាក់ទី ៨',
      topicTitleEn: 'Real Numbers',
      topicTitleKm: 'ចំនួនពិត',
      path: '/grades/8/subjects/number-systems/topics/real-numbers',
    },
  },
  'Prime number': {
    symbol: 'p \\in \\{2, 3, 5, 7, 11, 13, \\dots\\}',
    partOfSpeech: 'n',
    lesson: {
      grade: '7',
      gradeLabelEn: 'Grade 7',
      gradeLabelKm: 'ថ្នាក់ទី ៧',
      topicTitleEn: 'Integers',
      topicTitleKm: 'ចំនួនគត់',
      path: '/grades/7/subjects/number-systems/topics/integers',
    },
  },
  'Greatest Common Divisor (GCD)': {
    symbol: '\\gcd(a, b) = \\text{PGCD}(a, b)',
    etymology: { lang: 'fr', label: 'Fr. PGCD' },
    partOfSpeech: 'n',
    examFocus: 'diploma',
    lesson: {
      grade: '7',
      gradeLabelEn: 'Grade 7',
      gradeLabelKm: 'ថ្នាក់ទី ៧',
      topicTitleEn: 'Integers',
      topicTitleKm: 'ចំនួនគត់',
      path: '/grades/7/subjects/number-systems/topics/integers',
    },
  },
  'Least Common Multiple (LCM)': {
    symbol: '\\operatorname{lcm}(a, b) = \\text{PPCM}(a, b)',
    etymology: { lang: 'fr', label: 'Fr. PPCM' },
    partOfSpeech: 'n',
    lesson: {
      grade: '7',
      gradeLabelEn: 'Grade 7',
      gradeLabelKm: 'ថ្នាក់ទី ៧',
      topicTitleEn: 'Integers',
      topicTitleKm: 'ចំនួនគត់',
      path: '/grades/7/subjects/number-systems/topics/integers',
    },
  },
  'Absolute value': {
    symbol: '|x| = \\begin{cases} x & \\text{if } x \\ge 0 \\\\ -x & \\text{if } x < 0 \\end{cases}',
    partOfSpeech: 'n',
    lesson: {
      grade: '7',
      gradeLabelEn: 'Grade 7',
      gradeLabelKm: 'ថ្នាក់ទី ៧',
      topicTitleEn: 'Integers',
      topicTitleKm: 'ចំនួនគត់',
      path: '/grades/7/subjects/number-systems/topics/integers',
    },
  },
  'Fraction': {
    symbol: '\\frac{a}{b} \\quad (b \\neq 0)',
    partOfSpeech: 'n',
    lesson: {
      grade: '7',
      gradeLabelEn: 'Grade 7',
      gradeLabelKm: 'ថ្នាក់ទី ៧',
      topicTitleEn: 'Rational Numbers',
      topicTitleKm: 'ចំនួនសនិទាន',
      path: '/grades/7/subjects/number-systems/topics/rational-numbers',
    },
  },
  'Power / exponentiation': {
    symbol: 'a^n = \\underbrace{a \\cdot a \\dots a}_{n \\text{ times}}',
    etymology: { lang: 'pali', label: 'បាលី (ស្វយ+គុណ)' },
    partOfSpeech: 'n',
    lesson: {
      grade: '7',
      gradeLabelEn: 'Grade 7',
      gradeLabelKm: 'ថ្នាក់ទី ៧',
      topicTitleEn: 'Exponents and Powers',
      topicTitleKm: 'ស្វ័យគុណ',
      path: '/grades/7/subjects/number-systems/topics/exponents-and-powers',
    },
  },
  'Product law for powers': {
    symbol: 'a^m \\cdot a^n = a^{m+n}',
    partOfSpeech: 'n',
    lesson: {
      grade: '7',
      gradeLabelEn: 'Grade 7',
      gradeLabelKm: 'ថ្នាក់ទី ៧',
      topicTitleEn: 'Exponents and Powers',
      topicTitleKm: 'ស្វ័យគុណ',
      path: '/grades/7/subjects/number-systems/topics/exponents-and-powers',
    },
  },
  'Square root': {
    symbol: '\\sqrt{x} \\ge 0 \\iff y^2 = x \\quad (x \\ge 0)',
    partOfSpeech: 'n',
    lesson: {
      grade: '8',
      gradeLabelEn: 'Grade 8',
      gradeLabelKm: 'ថ្នាក់ទី ៨',
      topicTitleEn: 'Square and Cube Roots',
      topicTitleKm: 'ឫសការ៉េ និងឫសគូប',
      path: '/grades/8/subjects/number-systems/topics/square-and-cube-roots',
    },
  },
  'Linear equation': {
    symbol: 'ax + b = 0 \\implies x = -\\frac{b}{a}',
    partOfSpeech: 'n',
    examFocus: 'diploma',
    lesson: {
      grade: '8',
      gradeLabelEn: 'Grade 8',
      gradeLabelKm: 'ថ្នាក់ទី ៨',
      topicTitleEn: 'Linear Equations and Inequalities',
      topicTitleKm: 'សមីការ និងវិសមីការលីនេអ៊ែរ',
      path: '/grades/8/subjects/algebra/topics/linear-equations-and-inequalities',
    },
  },
  'Quadratic equation': {
    symbol: 'ax^2 + bx + c = 0 \\quad (a \\neq 0)',
    partOfSpeech: 'n',
    examFocus: 'diploma',
    lesson: {
      grade: '9',
      gradeLabelEn: 'Grade 9',
      gradeLabelKm: 'ថ្នាក់ទី ៩ (ឌីប្លូម)',
      topicTitleEn: 'Quadratic Equations Introduction',
      topicTitleKm: 'សមីការដឺក្រេទីពីរ',
      path: '/grades/9/subjects/algebra/topics/quadratic-equations-intro',
    },
  },
  'Discriminant': {
    symbol: '\\Delta = b^2 - 4ac, \\quad x = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}',
    etymology: { lang: 'fr', label: 'Fr. discriminant' },
    partOfSpeech: 'n',
    examFocus: 'diploma',
    lesson: {
      grade: '9',
      gradeLabelEn: 'Grade 9',
      gradeLabelKm: 'ថ្នាក់ទី ៩ (ឌីប្លូម)',
      topicTitleEn: 'Quadratic Equations Introduction',
      topicTitleKm: 'សមីការដឺក្រេទីពីរ',
      path: '/grades/9/subjects/algebra/topics/quadratic-equations-intro',
    },
  },
  'System of equations': {
    symbol: '\\begin{cases} a_1 x + b_1 y = c_1 \\\\ a_2 x + b_2 y = c_2 \\end{cases}',
    etymology: { lang: 'fr', label: 'Fr. système' },
    partOfSpeech: 'n',
    examFocus: 'diploma',
    lesson: {
      grade: '9',
      gradeLabelEn: 'Grade 9',
      gradeLabelKm: 'ថ្នាក់ទី ៩ (ឌីប្លូម)',
      topicTitleEn: 'Systems of Equations',
      topicTitleKm: 'ប្រព័ន្ធសមីការ',
      path: '/grades/9/subjects/algebra/topics/systems-of-equations',
    },
  },
  'Polynomial': {
    symbol: 'P(x) = a_n x^n + \\dots + a_1 x + a_0',
    etymology: { lang: 'fr', label: 'Fr. polynôme' },
    partOfSpeech: 'n',
    lesson: {
      grade: '10',
      gradeLabelEn: 'Grade 10',
      gradeLabelKm: 'ថ្នាក់ទី ១០',
      topicTitleEn: 'Polynomial Functions',
      topicTitleKm: 'អនុគមន៍ពហុធា',
      path: '/grades/10/subjects/algebra/topics/polynomial-functions',
    },
  },
  'Function': {
    symbol: 'f: D \\to \\mathbb{R}, \\quad x \\mapsto f(x)',
    etymology: { lang: 'pali', label: 'បាលី (អនុ+គមន)' },
    partOfSpeech: 'n',
    lesson: {
      grade: '10',
      gradeLabelEn: 'Grade 10',
      gradeLabelKm: 'ថ្នាក់ទី ១០',
      topicTitleEn: 'Functions and Graphs',
      topicTitleKm: 'អនុគមន៍ និងក្រាប',
      path: '/grades/10/subjects/algebra/topics/functions-and-graphs',
    },
  },
  'Sequence': {
    symbol: '(u_n)_{n \\in \\mathbb{N}}, \\quad u_n = f(n)',
    etymology: { lang: 'fr', label: 'Fr. suite' },
    partOfSpeech: 'n',
    lesson: {
      grade: '11',
      gradeLabelEn: 'Grade 11',
      gradeLabelKm: 'ថ្នាក់ទី ១១',
      topicTitleEn: 'Sequences and Series',
      topicTitleKm: 'ស្វ៊ីត និងស៊េរី',
      path: '/grades/11/subjects/algebra/topics/sequences-and-series',
    },
  },
  'Logarithm': {
    symbol: '\\log_b(x) = y \\iff b^y = x \\quad (b > 0, b \\neq 1)',
    etymology: { lang: 'fr', label: 'Fr. logarithme' },
    partOfSpeech: 'n',
    examFocus: 'bac2',
    lesson: {
      grade: '11',
      gradeLabelEn: 'Grade 11',
      gradeLabelKm: 'ថ្នាក់ទី ១១',
      topicTitleEn: 'Exponential and Logarithmic Functions',
      topicTitleKm: 'អនុគមន៍អិចស្បូណង់ស្យែល និងលោការីត',
      path: '/grades/11/subjects/algebra/topics/exponential-and-logarithmic-functions',
    },
  },
  'Limit': {
    symbol: '\\lim_{x \\to x_0} f(x) = L',
    etymology: { lang: 'fr', label: 'Fr. limite' },
    partOfSpeech: 'n',
    examFocus: 'bac2',
    lesson: {
      grade: '12',
      gradeLabelEn: 'Grade 12',
      gradeLabelKm: 'ថ្នាក់ទី ១២ (បាក់ឌុប)',
      topicTitleEn: 'Limits & Continuity',
      topicTitleKm: 'លីមីត និងភាពជាប់',
      path: '/grades/12/subjects/advanced/topics/limits-and-continuity',
    },
  },
  'Derivative': {
    symbol: "f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h} = \\frac{df}{dx}",
    etymology: { lang: 'fr', label: 'Fr. dérivée' },
    partOfSpeech: 'n',
    examFocus: 'bac2',
    lesson: {
      grade: '12',
      gradeLabelEn: 'Grade 12',
      gradeLabelKm: 'ថ្នាក់ទី ១២ (បាក់ឌុប)',
      topicTitleEn: 'Differentiation',
      topicTitleKm: 'ដេរីវេ',
      path: '/grades/12/subjects/advanced/topics/differentiation',
    },
  },
  'Integral / Integration': {
    symbol: '\\int_a^b f(x)\\,dx = F(b) - F(a)',
    etymology: { lang: 'fr', label: 'Fr. intégrale' },
    partOfSpeech: 'n',
    examFocus: 'bac2',
    lesson: {
      grade: '12',
      gradeLabelEn: 'Grade 12',
      gradeLabelKm: 'ថ្នាក់ទី ១២ (បាក់ឌុប)',
      topicTitleEn: 'Integration',
      topicTitleKm: 'អាំងតេក្រាល',
      path: '/grades/12/subjects/advanced/topics/integration',
    },
  },
  'Complex number': {
    symbol: 'z = a + bi \\quad (i^2 = -1, \\; a, b \\in \\mathbb{R})',
    etymology: { lang: 'fr', label: 'Fr. nombre complexe' },
    partOfSpeech: 'n',
    examFocus: 'bac2',
    lesson: {
      grade: '12',
      gradeLabelEn: 'Grade 12',
      gradeLabelKm: 'ថ្នាក់ទី ១២ (បាក់ឌុប)',
      topicTitleEn: 'Complex Numbers',
      topicTitleKm: 'ចំនួនកុំផ្លិច',
      path: '/grades/12/subjects/algebra/topics/complex-numbers',
    },
  },
  'Pythagorean theorem': {
    symbol: 'a^2 + b^2 = c^2 \\quad (\\text{right triangle})',
    etymology: { lang: 'greek', label: 'Greek Pythagoras' },
    partOfSpeech: 'n',
    examFocus: 'diploma',
    lesson: {
      grade: '8',
      gradeLabelEn: 'Grade 8',
      gradeLabelKm: 'ថ្នាក់ទី ៨',
      topicTitleEn: 'The Pythagorean Theorem',
      topicTitleKm: 'ទ្រឹស្តីបទពីតាករ',
      path: '/grades/8/subjects/geometry/topics/pythagorean-theorem',
    },
  },
  'Hypotenuse': {
    symbol: 'c = \\sqrt{a^2 + b^2}',
    etymology: { lang: 'fr', label: 'Fr. hypoténuse' },
    partOfSpeech: 'n',
    examFocus: 'diploma',
    lesson: {
      grade: '8',
      gradeLabelEn: 'Grade 8',
      gradeLabelKm: 'ថ្នាក់ទី ៨',
      topicTitleEn: 'The Pythagorean Theorem',
      topicTitleKm: 'ទ្រឹស្តីបទពីតាករ',
      path: '/grades/8/subjects/geometry/topics/pythagorean-theorem',
    },
  },
  'Circle': {
    symbol: 'C = 2\\pi r, \\quad A = \\pi r^2',
    partOfSpeech: 'n',
    lesson: {
      grade: 'shapes',
      gradeLabelEn: 'Shape Lab',
      gradeLabelKm: 'មន្ទីរពិសោធន៍រាង',
      topicTitleEn: 'Circle',
      topicTitleKm: 'រង្វង់',
      path: '/shapes/circle',
    },
  },
  'Cylinder': {
    symbol: 'V = \\pi r^2 h, \\quad A = 2\\pi r h + 2\\pi r^2',
    etymology: { lang: 'fr', label: 'Fr. cylindre' },
    partOfSpeech: 'n',
    examFocus: 'diploma',
    lesson: {
      grade: 'shapes',
      gradeLabelEn: '3D Solid Lab',
      gradeLabelKm: 'មន្ទីរពិសោធន៍ ៣D',
      topicTitleEn: 'Cylinder',
      topicTitleKm: 'ស៊ីឡាំង',
      path: '/shapes/cylinder',
    },
  },
  'Cone': {
    symbol: 'V = \\frac{1}{3}\\pi r^2 h, \\quad A = \\pi r l + \\pi r^2',
    etymology: { lang: 'fr', label: 'Fr. cône' },
    partOfSpeech: 'n',
    lesson: {
      grade: 'shapes',
      gradeLabelEn: '3D Solid Lab',
      gradeLabelKm: 'មន្ទីរពិសោធន៍ ៣D',
      topicTitleEn: 'Cone',
      topicTitleKm: 'កោណ',
      path: '/shapes/cone',
    },
  },
  'Sphere': {
    symbol: 'V = \\frac{4}{3}\\pi r^3, \\quad A = 4\\pi r^2',
    etymology: { lang: 'fr', label: 'Fr. sphère' },
    partOfSpeech: 'n',
    lesson: {
      grade: 'shapes',
      gradeLabelEn: '3D Solid Lab',
      gradeLabelKm: 'មន្ទីរពិសោធន៍ ៣D',
      topicTitleEn: 'Sphere',
      topicTitleKm: 'ស្វ៊ែរ',
      path: '/shapes/sphere',
    },
  },
  'Cube': {
    symbol: 'V = a^3, \\quad A = 6a^2',
    etymology: { lang: 'fr', label: 'Fr. cube' },
    partOfSpeech: 'n',
    lesson: {
      grade: 'shapes',
      gradeLabelEn: '3D Solid Lab',
      gradeLabelKm: 'មន្ទីរពិសោធន៍ ៣D',
      topicTitleEn: 'Cube',
      topicTitleKm: 'គូប',
      path: '/shapes/cube',
    },
  },
  'Circle theorems': {
    symbol: '\\angle AOB = 2\\angle ACB',
    partOfSpeech: 'n',
    lesson: {
      grade: '10',
      gradeLabelEn: 'Grade 10',
      gradeLabelKm: 'ថ្នាក់ទី ១០',
      topicTitleEn: 'Circle Theorems',
      topicTitleKm: 'ទ្រឹស្តីបទរង្វង់',
      path: '/grades/10/subjects/geometry/topics/circle-theorems',
    },
  },
  'Tangent': {
    symbol: 'OT \\perp t \\quad (\\text{radius } \\perp \\text{ tangent})',
    etymology: { lang: 'fr', label: 'Fr. tangente' },
    partOfSpeech: 'n',
    lesson: {
      grade: '10',
      gradeLabelEn: 'Grade 10',
      gradeLabelKm: 'ថ្នាក់ទី ១០',
      topicTitleEn: 'Circle Theorems',
      topicTitleKm: 'ទ្រឹស្តីបទរង្វង់',
      path: '/grades/10/subjects/geometry/topics/circle-theorems',
    },
  },
  'Unit circle': {
    symbol: 'x^2 + y^2 = 1, \\quad (\\cos\\theta, \\sin\\theta)',
    partOfSpeech: 'n',
    examFocus: 'bac2',
    lesson: {
      grade: '11',
      gradeLabelEn: 'Grade 11',
      gradeLabelKm: 'ថ្នាក់ទី ១១',
      topicTitleEn: 'Unit Circle Trigonometry',
      topicTitleKm: 'រង្វង់ត្រីកោណមាត្រ',
      path: '/grades/11/subjects/trigonometry/topics/unit-circle-trigonometry',
    },
  },
  'Sine': {
    symbol: '\\sin\\theta = \\frac{\\text{opposite}}{\\text{hypotenuse}}',
    etymology: { lang: 'fr', label: 'Fr. sinus' },
    partOfSpeech: 'n',
    examFocus: 'diploma',
    lesson: {
      grade: '9',
      gradeLabelEn: 'Grade 9',
      gradeLabelKm: 'ថ្នាក់ទី ៩ (ឌីប្លូម)',
      topicTitleEn: 'Right-Triangle Trigonometry',
      topicTitleKm: 'ត្រីកោណមាត្រកែង',
      path: '/grades/9/subjects/trigonometry/topics/right-triangle-trigonometry',
    },
  },
  'Cosine': {
    symbol: '\\cos\\theta = \\frac{\\text{adjacent}}{\\text{hypotenuse}}',
    etymology: { lang: 'fr', label: 'Fr. cosinus' },
    partOfSpeech: 'n',
    examFocus: 'diploma',
    lesson: {
      grade: '9',
      gradeLabelEn: 'Grade 9',
      gradeLabelKm: 'ថ្នាក់ទី ៩ (ឌីប្លូម)',
      topicTitleEn: 'Right-Triangle Trigonometry',
      topicTitleKm: 'ត្រីកោណមាត្រកែង',
      path: '/grades/9/subjects/trigonometry/topics/right-triangle-trigonometry',
    },
  },
  'Trigonometric identity': {
    symbol: '\\sin^2\\theta + \\cos^2\\theta = 1, \\quad 1 + \\tan^2\\theta = \\frac{1}{\\cos^2\\theta}',
    partOfSpeech: 'n',
    examFocus: 'bac2',
    lesson: {
      grade: '11',
      gradeLabelEn: 'Grade 11',
      gradeLabelKm: 'ថ្នាក់ទី ១១',
      topicTitleEn: 'Trigonometric Identities and Equations',
      topicTitleKm: 'រូបមន្តត្រីកោណមាត្រ',
      path: '/grades/11/subjects/trigonometry/topics/trigonometric-identities-and-equations',
    },
  },
  'Vector': {
    symbol: '\\vec{v} = \\begin{pmatrix} x \\\\ y \\end{pmatrix}, \\quad |\\vec{v}| = \\sqrt{x^2 + y^2}',
    etymology: { lang: 'fr', label: 'Fr. vecteur' },
    partOfSpeech: 'n',
    lesson: {
      grade: '11',
      gradeLabelEn: 'Grade 11',
      gradeLabelKm: 'ថ្នាក់ទី ១១',
      topicTitleEn: 'Vectors in Two Dimensions',
      topicTitleKm: 'វ៉ិចទ័រក្នុងប្លង់ ២D',
      path: '/grades/11/subjects/vectors-matrices/topics/vectors-in-two-dimensions',
    },
  },
  'Dot product / Scalar product': {
    symbol: '\\vec{u} \\cdot \\vec{v} = |\\vec{u}||\\vec{v}|\\cos\\theta = x_1 x_2 + y_1 y_2',
    etymology: { lang: 'fr', label: 'Fr. produit scalaire' },
    partOfSpeech: 'n',
    examFocus: 'bac2',
    lesson: {
      grade: '11',
      gradeLabelEn: 'Grade 11',
      gradeLabelKm: 'ថ្នាក់ទី ១១',
      topicTitleEn: 'Vectors in Two Dimensions',
      topicTitleKm: 'វ៉ិចទ័រក្នុងប្លង់ ២D',
      path: '/grades/11/subjects/vectors-matrices/topics/vectors-in-two-dimensions',
    },
  },
  'Matrix': {
    symbol: 'A = \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}, \\quad \\det(A) = ad - bc',
    etymology: { lang: 'fr', label: 'Fr. matrice' },
    partOfSpeech: 'n',
    lesson: {
      grade: '11',
      gradeLabelEn: 'Grade 11',
      gradeLabelKm: 'ថ្នាក់ទី ១១',
      topicTitleEn: 'Matrices and Determinants',
      topicTitleKm: 'ម៉ាទ្រីស និងដេទែរមីណង់',
      path: '/grades/11/subjects/vectors-matrices/topics/matrices-and-determinants',
    },
  },
  'Determinant': {
    symbol: '\\det(A) = \\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix} = ad - bc',
    etymology: { lang: 'fr', label: 'Fr. déterminant' },
    partOfSpeech: 'n',
    examFocus: 'bac2',
    lesson: {
      grade: '11',
      gradeLabelEn: 'Grade 11',
      gradeLabelKm: 'ថ្នាក់ទី ១១',
      topicTitleEn: 'Matrices and Determinants',
      topicTitleKm: 'ម៉ាទ្រីស និងដេទែរមីណង់',
      path: '/grades/11/subjects/vectors-matrices/topics/matrices-and-determinants',
    },
  },
  'Probability': {
    symbol: 'P(A) = \\frac{n(A)}{n(S)}, \\quad 0 \\le P(A) \\le 1',
    etymology: { lang: 'pali', label: 'បាលី (ប្រ+ឧត្ត+ភាវ)' },
    partOfSpeech: 'n',
    lesson: {
      grade: '11',
      gradeLabelEn: 'Grade 11',
      gradeLabelKm: 'ថ្នាក់ទី ១១',
      topicTitleEn: 'Conditional Probability',
      topicTitleKm: 'ប្រូបាបមានលក្ខខណ្ឌ',
      path: '/grades/11/subjects/statistics-probability/topics/conditional-probability',
    },
  },
  'Mean / Arithmetic average': {
    symbol: '\\bar{x} = \\frac{1}{n} \\sum_{i=1}^n x_i',
    partOfSpeech: 'n',
    examFocus: 'diploma',
    lesson: {
      grade: '7',
      gradeLabelEn: 'Grade 7',
      gradeLabelKm: 'ថ្នាក់ទី ៧',
      topicTitleEn: 'Averages and Range',
      topicTitleKm: 'មធ្យមភាគ និងរ៉ង់ស៍',
      path: '/grades/7/subjects/statistics-probability/topics/averages',
    },
  },
  'Variance': {
    symbol: '\\sigma^2 = \\frac{1}{n}\\sum_{i=1}^n (x_i - \\bar{x})^2',
    etymology: { lang: 'fr', label: 'Fr. variance' },
    partOfSpeech: 'n',
    examFocus: 'bac2',
    lesson: {
      grade: '11',
      gradeLabelEn: 'Grade 11',
      gradeLabelKm: 'ថ្នាក់ទី ១១',
      topicTitleEn: 'Variance, Distributions & Normal Curve',
      topicTitleKm: 'វ៉ារ្យ៉ង់ និងគម្លាតស្តង់ដារ',
      path: '/grades/11/subjects/statistics-probability/topics/statistics-variance-and-distributions',
    },
  },
  'Standard deviation': {
    symbol: '\\sigma = \\sqrt{\\sigma^2} = \\sqrt{\\frac{1}{n}\\sum (x_i - \\bar{x})^2}',
    etymology: { lang: 'fr', label: 'Fr. écart type' },
    partOfSpeech: 'n',
    examFocus: 'bac2',
    lesson: {
      grade: '11',
      gradeLabelEn: 'Grade 11',
      gradeLabelKm: 'ថ្នាក់ទី ១១',
      topicTitleEn: 'Variance, Distributions & Normal Curve',
      topicTitleKm: 'វ៉ារ្យ៉ង់ និងគម្លាតស្តង់ដារ',
      path: '/grades/11/subjects/statistics-probability/topics/statistics-variance-and-distributions',
    },
  },
  'Parabola': {
    symbol: 'y = ax^2 + bx + c \\quad (a \\neq 0)',
    etymology: { lang: 'fr', label: 'Fr. parabole' },
    partOfSpeech: 'n',
    lesson: {
      grade: '11',
      gradeLabelEn: 'Grade 11',
      gradeLabelKm: 'ថ្នាក់ទី ១១',
      topicTitleEn: 'Parabolas as Conics',
      topicTitleKm: 'ប៉ារ៉ាបូល',
      path: '/grades/11/subjects/coordinate-geometry/topics/parabolas-as-conics',
    },
  },
  'Ellipse': {
    symbol: '\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1',
    etymology: { lang: 'fr', label: 'Fr. ellipse' },
    partOfSpeech: 'n',
    examFocus: 'bac2',
    lesson: {
      grade: '12',
      gradeLabelEn: 'Grade 12',
      gradeLabelKm: 'ថ្នាក់ទី ១២ (បាក់ឌុប)',
      topicTitleEn: 'Conic Sections',
      topicTitleKm: 'កោនិច (អេលីប)',
      path: '/grades/12/subjects/coordinate-geometry/topics/conic-sections',
    },
  },
  'Hyperbola': {
    symbol: '\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1',
    etymology: { lang: 'fr', label: 'Fr. hyperbole' },
    partOfSpeech: 'n',
    examFocus: 'bac2',
    lesson: {
      grade: '12',
      gradeLabelEn: 'Grade 12',
      gradeLabelKm: 'ថ្នាក់ទី ១២ (បាក់ឌុប)',
      topicTitleEn: 'Conic Sections',
      topicTitleKm: 'កោនិច (ហ៊ីពែរបូល)',
      path: '/grades/12/subjects/coordinate-geometry/topics/conic-sections',
    },
  },
  'Asymptote': {
    symbol: 'y = mx + b \\quad (\\text{as } x \\to \\pm\\infty)',
    etymology: { lang: 'fr', label: 'Fr. asymptote' },
    partOfSpeech: 'n',
    examFocus: 'bac2',
    lesson: {
      grade: '12',
      gradeLabelEn: 'Grade 12',
      gradeLabelKm: 'ថ្នាក់ទី ១២ (បាក់ឌុប)',
      topicTitleEn: 'Limits & Continuity',
      topicTitleKm: 'លីមីត និងអាស៊ីមតូត',
      path: '/grades/12/subjects/advanced/topics/limits-and-continuity',
    },
  },
}

/**
 * Pre-enriched glossary terms with complete metadata.
 */
export const enrichedGlossaryTerms: EnrichedTerm[] = glossaryTerms.map((term, index) => {
  const kmConsonant = getKhmerInitial(term.km)
  const enLetter = getEnglishInitial(term.en)
  const meta = METADATA_MAP[term.en] ?? {}

  // Auto-extract mathematical symbols from notes if not explicitly set
  let extractedSymbol = meta.symbol
  if (!extractedSymbol && term.note) {
    // Check for LaTeX notation patterns in note, e.g. aᵐ · aⁿ = aᵐ⁺ⁿ, √x, |x|, etc.
    const symbolMatch = term.note.match(/(?:written |denoted |form |formula:? |rule:? )([^\n,;(]+)/i)
    if (symbolMatch && symbolMatch[1] && symbolMatch[1].length < 30) {
      extractedSymbol = symbolMatch[1].trim()
    }
  }

  // Auto-detect French loan words in Khmer parenthesis, e.g. (ឬ អាំងតេក្រាល / Fr. ...)
  let etymology = meta.etymology
  if (!etymology && term.note) {
    const frMatch = term.note.match(/\(([A-Z]{3,4}|[a-z]+ [a-z]+|entier|dérivée|vecteur)\)/i)
    if (frMatch) {
      etymology = { lang: 'fr', label: `Fr. ${frMatch[1]}` }
    }
  }

  return {
    ...term,
    id: `glossary-${index}-${term.en.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    khmerConsonant: kmConsonant,
    englishLetter: enLetter,
    symbol: extractedSymbol,
    etymology,
    partOfSpeech: meta.partOfSpeech ?? 'n',
    lesson: meta.lesson,
    examFocus: meta.examFocus,
  }
})

/**
 * Traditional Khmer Consonant alphabet sequence for academic indexing (ក - អ).
 */
export const KHMER_CONSONANTS_ALPHABET = [
  'ក', 'ខ', 'គ', 'ឃ', 'ង',
  'ច', 'ឆ', 'ជ', 'ឈ', 'ញ',
  'ដ', 'ឋ', 'ឌ', 'ឍ', 'ណ',
  'ត', 'ថ', 'ទ', 'ធ', 'ន',
  'ប', 'ផ', 'ព', 'ភ', 'ម',
  'យ', 'រ', 'ល', 'វ',
  'ស', 'ហ', 'ឡ', 'អ',
] as const

/**
 * English A-Z alphabet.
 */
export const ENGLISH_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

export type IndexingSystem = 'km' | 'en'
export type GlossaryViewMode = 'lexicon' | 'flashcards'
