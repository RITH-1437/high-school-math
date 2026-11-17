import type { VariableDefinition } from '../types/content'
import type { Language } from './types'

/**
 * Authentic Cambodian MoEYS terminology mapping for formula variable names ("Meaning" column).
 */
const VARIABLE_NAME_MAP: Record<string, string> = {
  // Geometry & Trigonometry
  'radius': 'កាំ',
  'base radius': 'កាំបាត',
  'circumradius': 'កាំរង្វង់ចារឹកក្រៅ',
  'inradius': 'កាំរង្វង់ចារឹកក្នុង',
  'diameter': 'អង្កត់ផ្ចិត',
  'circumference': 'បរិមាត្ររង្វង់',
  'area': 'ផ្ទៃក្រឡា',
  'surface area': 'ផ្ទៃក្រឡាសរុប (ផ្ទៃខាង)',
  'volume': 'មាឌ',
  'perimeter': 'បរិមាត្រ',
  'base': 'បាត',
  'base length': 'ប្រវែងបាត',
  'height': 'កម្ពស់',
  'vertical height': 'កម្ពស់បញ្ឈរ',
  'slant height': 'ប្រវែងទ្រនុង (អាប៉ូតេម)',
  'length': 'បណ្តោយ',
  'width': 'ទទឹង',
  'hypotenuse': 'អ៊ីប៉ូតេនុស',
  'first leg': 'ជ្រុងជាប់មុំកែងទី១',
  'second leg': 'ជ្រុងជាប់មុំកែងទី២',
  'unknown leg': 'ជ្រុងជាប់មុំកែងមិនស្គាល់',
  'side length': 'ប្រវែងជ្រុង',
  'side lengths': 'ប្រវែងជ្រុង',
  'edge length': 'ប្រវែងគែម',
  'angle': 'មុំ',
  'central angle': 'មុំផ្ចិត',
  'central angle in radians': 'មុំផ្ចិតគិតជារ៉ាដ្យង់',
  'inscribed angle': 'មុំចារឹកក្នុង',
  'arc length': 'ប្រវែងធ្នូ',
  'sector angle': 'មុំផ្លិតរង្វង់',
  'apothem': 'អាប៉ូតេម',
  'diagonal': 'អង្កត់ទ្រូង',

  // Coordinate Geometry & Conics
  'slope': 'មេគុណប្រាប់ទិស',
  'gradient': 'មេគុណប្រាប់ទិស',
  'gradient or slope': 'មេគុណប្រាប់ទិស',
  'y-intercept': 'អរដោនេដើម (ប្រសព្វ y)',
  'x-intercept': 'អាប់ស៊ីសដើម (ប្រសព្វ x)',
  'x-coordinate': 'អាប់ស៊ីស ($x$)',
  'y-coordinate': 'អរដោនេ ($y$)',
  'coordinates of the first point': 'កូអរដោនេចំណុចទី១',
  'coordinates of the second point': 'កូអរដោនេចំណុចទី២',
  'coordinates of a point': 'កូអរដោនេចំណុច',
  'midpoint': 'ចំណុចកណ្តាល',
  'distance': 'ចម្ងាយ',
  'distance between the points': 'ចម្ងាយរវាងចំណុចពីរ',
  'vertex': 'កំពូល',
  'focus': 'កំណុំ',
  'directrix': 'បន្ទាត់ប្រាប់ទិស',
  'eccentricity': 'អិចសង់ទ្រិស៊ីតេ',
  'semi-major axis': 'កន្លះអ័ក្សធំ',
  'semi-minor axis': 'កន្លះអ័ក្សតូច',
  'centre of the circle': 'ផ្ចិតរង្វង់',
  'center of the circle': 'ផ្ចិតរង្វង់',

  // Algebra & Polynomials
  'constant': 'ចំនួនថេរ',
  'constant term': 'តួថេរ',
  'constant of integration': 'ចំនួនថេរអាំងតេក្រាល',
  'coefficient': 'មេគុណ',
  'leading coefficient': 'មេគុណមុខគេ',
  'discriminant': 'ឌីស្គ្រីមីណង់',
  'degree': 'ដឺក្រេ',
  'exponent': 'និទស្សន្ត',
  'radicand': 'ចំនួនក្រោមរ៉ាឌីកាល់',
  'numerator': 'ភាគយក',
  'denominator': 'ភាគបែង',
  'quotient': 'ផលចែក',
  'remainder': 'សំណល់',
  'divisor': 'តួចែក',
  'dividend': 'តួត្រូវចែក',
  'root': 'ឫស',
  'factor': 'កត្តា',
  'common difference': 'ផលសងរួម ($d$)',
  'common ratio': 'ផលធៀបរួម ($q$)',
  'first term': 'តួទីមួយ ($u_1$)',
  'second term': 'តួទីពីរ',
  'term in position n': 'តួទី $n$ ($u_n$)',
  'number of terms': 'ចំនួនតួ ($n$)',
  'sum': 'ផលបូក',
  'sum of the first n terms': 'ផលបូក $n$ តួដំបូង ($S_n$)',

  // Vectors & Matrices
  'vector': 'វ៉ិចទ័រ',
  'magnitude': 'ប្រវែង (ម៉ូឌុលវ៉ិចទ័រ)',
  'direction vector': 'វ៉ិចទ័រប្រាប់ទិស',
  'normal vector': 'វ៉ិចទ័រណរម៉ាល់',
  'unit vector': 'វ៉ិចទ័រឯកតា',
  'dot product': 'ផលគុណស្កាលែ',
  'cross product': 'ផលគុណវ៉ិចទ័រ',
  'determinant': 'ដេទែមីណង់',
  'matrix': 'ម៉ាទ្រីស',
  'identity matrix': 'ម៉ាទ្រីសឯកតា',

  // Complex Numbers
  'complex number': 'ចំនួនកុំផ្លិច',
  'real part': 'ផ្នែកពិត',
  'imaginary part': 'ផ្នែកនិម្មិត',
  'modulus': 'ម៉ូឌុល',
  'argument': 'អាគុយម៉ង់',

  // Calculus
  'derivative': 'ដេរីវេ',
  'integral': 'អាំងតេក្រាល',
  'limit': 'លីមីត',
  'rate of change': 'អត្រាបម្រែបម្រួល',
  'variable of integration': 'អថេរអាំងតេក្រាល',

  // Statistics & Probability
  'probability': 'ប្រូបាប៊ីលីតេ',
  'mean': 'មធ្យមភាគ',
  'population mean': 'មធ្យមភាគសកល',
  'sample mean': 'មធ្យមភាគគំរូ',
  'median': 'មេដ្យាន',
  'mode': 'ម៉ូត',
  'variance': 'វ៉ារ្យ៉ង់',
  'standard deviation': 'គម្លាតស្តង់ដា',
  'sample size': 'ទំហំគំរូ ($n$)',
  'frequency': 'ប្រេកង់',
  'number of trials': 'ចំនួនដងនៃការសាកល្បង',
  'number of successes': 'ចំនួនដងជោគជ័យ',
  'success probability': 'ប្រូបាប៊ីលីតេជោគជ័យ',
  'expected value': 'សង្ឃឹមគណិត',
}

const UNIT_MAP: Record<string, string> = {
  'cm': 'cm',
  'cm²': 'cm²',
  'cm³': 'cm³',
  'm': 'm',
  'm²': 'm²',
  'm³': 'm³',
  'mm': 'mm',
  'units': 'ឯកតា',
  'square units': 'ឯកតាផ្ទៃ',
  'cubic units': 'ឯកតាមាឌ',
  'degrees': 'ដឺក្រេ',
  'radians': 'រ៉ាដ្យង់',
  'rad': 'រ៉ាដ្យង់',
  'deg': 'ដឺក្រេ',
  's': 's',
  'sec': 'វិនាទី',
  'min': 'នាទី',
  'h': 'ម៉ោង',
}

const NOTE_PHRASES: [RegExp, string][] = [
  [/^must be positive$/i, 'ត្រូវតែជាចំនួនវិជ្ជមាន ($> 0$)'],
  [/^must be non-negative$/i, 'មិនអវិជ្ជមាន ($\ge 0$)'],
  [/^non-negative$/i, 'មិនអវិជ្ជមាន ($\ge 0$)'],
  [/^positive$/i, 'វិជ្ជមាន ($> 0$)'],
  [/^cannot be zero$/i, 'មិនអាចស្មើ 0'],
  [/^non-zero$/i, 'មិនសូន្យ ($ \ne 0 $)'],
  [/^in radians$/i, 'គិតជារ៉ាដ្យង់'],
  [/^in degrees$/i, 'គិតជាដឺក្រេ'],
  [/^integer$/i, 'ចំនួនគត់'],
  [/^positive integer$/i, 'ចំនួនគត់វិជ្ជមាន'],
  [/^real number$/i, 'ចំនួនពិត'],
  [/^any real number$/i, 'គ្រប់ចំនួនពិត'],
  [/hypotenuse \(longest side\)/i, 'អ៊ីប៉ូតេនុស (ជ្រុងវែងជាងគេ)'],
  [/\$c\$ is the longest side/i, '$c$ ជាជ្រុងវែងជាងគេ'],
  [/opposite the right angle/i, 'ឈមនឹងមុំកែង'],
]

export function translateVariableName(name: string): string {
  const clean = name.trim().toLowerCase()
  if (VARIABLE_NAME_MAP[clean]) return VARIABLE_NAME_MAP[clean]

  // Partial match check
  for (const [en, km] of Object.entries(VARIABLE_NAME_MAP)) {
    if (clean === en.toLowerCase()) return km
  }

  return name
}

export function translateVariableUnit(unit: string | undefined): string | undefined {
  if (!unit) return undefined
  const clean = unit.trim().toLowerCase()
  return UNIT_MAP[clean] ?? unit
}

export function translateVariableNote(note: string | undefined): string | undefined {
  if (!note) return undefined
  let res = note
  for (const [pattern, km] of NOTE_PHRASES) {
    if (pattern.test(res)) {
      return km
    }
  }
  return res
}

export function localizeVariable(v: VariableDefinition, language: Language): VariableDefinition {
  if (language !== 'km') return v
  return {
    ...v,
    name: translateVariableName(v.name),
    unit: translateVariableUnit(v.unit),
    note: translateVariableNote(v.note),
  }
}
