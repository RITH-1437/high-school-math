import { kmGrade7 } from './km/grade7'
import { kmGrade8 } from './km/grade8'
import { kmGrade9 } from './km/grade9'
import { kmGrade10 } from './km/grade10'
import { kmGrade11 } from './km/grade11'
import { kmGrade12 } from './km/grade12'
import type {
  CommonMistake,
  ExampleStep,
  Exercise,
  Formula,
  Grade,
  GradeId,
  Shape,
  Subject,
  SubjectFamily,
  Theorem,
  TheorySection,
  Topic,
} from '../types/content'
import type { Language } from './types'

/**
 * Khmer curriculum metadata and localized topic/formula content.
 *
 * Provides authentic Cambodian Ministry of Education (MoEYS) terminology,
 * grade framing, subject and topic descriptions, shape terms, search aliases,
 * and deep translations for topic introductions, theory, formulas, examples, and common mistakes.
 */

export interface GradeCopy {
  title: string
  tagline: string
  description: string
  focus: string[]
}

export interface SubjectCopy {
  title: string
  description: string
}

export interface TopicCopy {
  title: string
  subtitle: string
}

export interface FormulaCopy {
  title: string
  description: string
}

export interface ShapeCopy {
  name: string
  tagline: string
}

export interface LocalizedVariable {
  name: string
  note?: string
  unit?: string
}

export interface LocalizedFormula {
  title?: string
  description?: string
  spoken?: string
  conditions?: string[]
  notes?: string
  variables?: Record<string, LocalizedVariable>
}

export interface LocalizedExampleStep {
  text: string
  math?: string
}

export interface LocalizedExample {
  title?: string
  problem?: string
  given?: string[]
  steps?: LocalizedExampleStep[]
  answer?: string
}

export interface LocalizedMistake {
  mistake: string
  correction: string
}

export interface LocalizedTheorySection {
  title: string
  body: string[]
  bullets?: string[]
}

/**
 * Khmer copy for one exercise. Answers, tolerances and the correct option
 * index are never localized: only the words around them change. `options`
 * must keep the same length and order as the English options.
 */
export interface LocalizedExercise {
  prompt?: string
  hint?: string
  explanation?: string
  options?: string[]
  answerUnit?: string
}

export interface LocalizedTopic {
  title?: string
  subtitle?: string
  introduction?: string
  prerequisites?: string[]
  keyIdeas?: string[]
  shapeCaption?: string
  theory?: LocalizedTheorySection[]
  examples?: LocalizedExample[]
  mistakes?: LocalizedMistake[]
  /** Keyed by exercise id. */
  exercises?: Record<string, LocalizedExercise>
}

export interface LocalizedTheorem {
  title: string
  statement: string
  note?: string
}

/**
 * One grade's Khmer content, authored in `src/i18n/km/gradeN.ts`.
 * Topic entries are merged over `kmTopicContent`, so a grade file may add only
 * the fields that are still missing (for example exercises).
 */
export interface GradeTranslation {
  topics: Record<string, LocalizedTopic>
  /** Keyed by `<subjectId>:<English theorem title>`. */
  theorems: Record<string, LocalizedTheorem>
}


export const kmGrades: Record<GradeId, GradeCopy> = {
  '7': {
    title: 'ថ្នាក់ទី7',
    tagline: 'កសាងទំនុកចិត្តក្នុងការវែកញែកដោយចំនួន អក្សរ រាង និងទិន្នន័យ។',
    description:
      'ថ្នាក់ទី7 គឺជាកន្លែងដែលនព្វន្ធរីកលូតលាស់ទៅជាពិជគណិត។ អ្នកនឹងធ្វើការជាមួយចំនួនអវិជ្ជមាន ប្រភាគ ស្វ័យគុណ និងអនុបាត បន្ទាប់មកប្រើអក្សរដើម្បីពិពណ៌នាលំនាំ និងដោះស្រាយសមីការ។ ធរណីមាត្របំប្លែងការវាស់វែងទៅជាការវែកញែកដោយប្រុងប្រយ័ត្ន ហើយស្ថិតិជួយអ្នកអានរឿងដែលទិន្នន័យប្រាប់។ គំនិតនីមួយៗចាប់ផ្តើមពីឧទាហរណ៍ជាក់ស្តែង ដើម្បីឲ្យអ្នកឃើញពីមូលហេតុដែលច្បាប់ដំណើរការ មុនពេលប្រើវា។',
    focus: [
      'ចំនួនមានសញ្ញា និងការវែកញែកសមាមាត្រ',
      'ជំហានដំបូងក្នុងពិជគណិត៖ កន្សោម សមីការ និងលំនាំ',
      'ការវែកញែកមុំ និងការវាស់រាងធរណីមាត្រ',
      'ការអានទិន្នន័យ និងការវិនិច្ឆ័យឱកាស',
    ],
  },
  '8': {
    title: 'ថ្នាក់ទី8',
    tagline: 'រចនាសម្ព័ន្ធ ការវែកញែក និងការសាកល្បងសម្រាយបញ្ជាក់ដំបូង។',
    description:
      'ថ្នាក់ទី8 បំប្លែងភាពស្ទាត់ជំនាញនព្វន្ធទៅជារចនាសម្ព័ន្ធពិជគណិត។ សិស្សពង្រីកប្រព័ន្ធចំនួនឲ្យរួមបញ្ចូលចំនួនអសនិទាន ធ្វើការដោយទំនុកចិត្តជាមួយឫស និងសញ្ញាណវិទ្យាសាស្ត្រ ដោះស្រាយសមីការ និងវិសមីការច្រើនជំហាន ពន្លាត និងដាក់ពហុធាជាកត្តា ហើយអានអនុគមន៍លីនេអ៊ែរជាគំរូ។ ធរណីមាត្រផ្លាស់ពីការវាស់វែងទៅការវែកញែក តាមរយៈទ្រឹស្តីបទពីតាករ ភាពសមគ្នា និងគ្រួសារចតុកោណ ខណៈស្ថិតិ និងប្រូបាប៊ីលីតេផ្តោតលើការបង្ហាញទិន្នន័យដោយស្មោះត្រង់ និងព្រឹត្តិការណ៍ផ្សំ។',
    focus: [
      'ចំនួនសនិទាន និងអសនិទាន ឫស និងសញ្ញាណវិទ្យាសាស្ត្រ',
      'សមីការលីនេអ៊ែរ វិសមីការ ពហុធា និងការដាក់ជាកត្តា',
      'សញ្ញាណអនុគមន៍ មេគុណប្រាប់ទិស (ជម្រាល) និងក្រាហ្វបន្ទាត់ត្រង់',
      'ត្រីកោណកែង ភាពសមគ្នា និងការវែកញែកចតុកោណ',
      'ការបង្ហាញទិន្នន័យ និងប្រូបាប៊ីលីតេនៃព្រឹត្តិការណ៍ផ្សំ',
    ],
  },
  '9': {
    title: 'ថ្នាក់ទី9',
    tagline: 'មូលដ្ឋានផ្លូវការ៖ រចនាសម្ព័ន្ធ ភាពស្រដៀង និងការវែកញែកកូអរដោនេ។',
    description:
      'ថ្នាក់ទី9 បំប្លែងនព្វន្ធ និងធរណីមាត្រមិនផ្លូវការពីមុន ទៅជាវិធីសាស្ត្រផ្លូវការ។ សិស្សសម្រួលកន្សោមរ៉ាឌីកាល់ ដាក់ពហុធាជាកត្តា ដោះស្រាយសមីការដឺក្រេទីពីរដែលអាចដាក់ជាកត្តា និងប្រព័ន្ធលីនេអ៊ែរ ព្រមទាំងអានអនុគមន៍។ ធរណីមាត្របន្តទៅភាពស្រដៀង ទំនាក់ទំនងរង្វង់ និងការវាស់តួរាងកោង ខណៈវិធីសាស្ត្រកូអរដោនេ និងស្ថិតិចាប់ផ្តើមភ្ជាប់ពិជគណិតទៅនឹងទិន្នន័យ។',
    focus: [
      'រចនាសម្ព័ន្ធពិជគណិត៖ រ៉ាឌីកាល់ ការដាក់ជាកត្តា និងប្រព័ន្ធសមីការ',
      'ភាពស្រដៀង ទំនាក់ទំនងរង្វង់ និងការវាស់តួរាងធរណីមាត្រ',
      'វិធីសាស្ត្រកូអរដោនេសម្រាប់ចម្ងាយ ចំណុចកណ្តាល និងមេគុណប្រាប់ទិស',
      'ទិន្នន័យពីរអថេរ និងប្រូបាប៊ីលីតេពីតារាងពីរផ្នែក',
    ],
  },
  '10': {
    title: 'ថ្នាក់ទី10',
    tagline: 'អនុគមន៍ សម្រាយបញ្ជាក់ និងជំហានដំបូងទៅកាន់គំរូត្រីកោណមាត្រ។',
    description:
      'ថ្នាក់ទី10 បំប្លែងពិជគណិតទៅជាការសិក្សាអនុគមន៍ បន្ថែមសម្រាយបញ្ជាក់ធរណីមាត្រផ្លូវការ និងទ្រឹស្តីបទរង្វង់ ហើយណែនាំត្រីកោណមាត្រត្រីកោណកែង និងត្រីកោណទូទៅ។ ស្ថិតិផ្លាស់ពីការពិពណ៌នាទិន្នន័យ ទៅការវាស់ការខ្ចាត់ខ្ចាយ និងការវែកញែកដោយច្បាប់ប្រូបាប៊ីលីតេ។',
    focus: [
      'សមីការដឺក្រេទីពីរ ឌីស្គ្រីមីណង់ និងការបំពេញការ៉េ',
      'គ្រួសារអនុគមន៍ ការបំប្លែង និងគំរូអិចស្ប៉ូណង់ស្យែល',
      'សម្រាយបញ្ជាក់ដេឌុចទីវ អ៊ីសូមេទ្រី និងទ្រឹស្តីបទរង្វង់',
      'ត្រីកោណមាត្រត្រីកោណកែង និងត្រីកោណទូទៅ',
      'រង្វាស់ទីតាំងកណ្តាល ការខ្ចាត់ខ្ចាយ ការរាប់ និងច្បាប់ប្រូបាប៊ីលីតេ',
    ],
  },
  '11': {
    title: 'ថ្នាក់ទី11',
    tagline: 'អនុគមន៍ដែលមានរចនាសម្ព័ន្ធ ខ្សែកោងដែលមានសមីការ និងប្រូបាប៊ីលីតេមានលក្ខខណ្ឌ។',
    description:
      'ថ្នាក់ទី11 បំប្លែងការគណនាទៅជាការវិភាគ។ អនុគមន៍ពហុធា អិចស្ប៉ូណង់ស្យែល លោការីត និងត្រីកោណមាត្រ ត្រូវបានសិក្សាតាមក្រាហ្វ ឫស និងអត្តសញ្ញាណ។ រង្វង់ និងប៉ារ៉ាបូល ត្រូវបានសាងសង់ឡើងវិញជាទីតាំងចំណុច។ វ៉ិចទ័រ និងម៉ាទ្រីសបង្ហាញរចនាសម្ព័ន្ធលីនេអ៊ែរនៅពីក្រោយធរណីមាត្រ ហើយប្រូបាប៊ីលីតេក្លាយជាប្រូបាប៊ីលីតេមានលក្ខខណ្ឌ។ លទ្ធផលនីមួយៗត្រូវបានទាញយក និងផ្ទៀងផ្ទាត់ មិនមែនទន្ទេញជាបញ្ជីទេ។',
    focus: [
      'អនុគមន៍ពហុធា អិចស្ប៉ូណង់ស្យែល និងលោការីត',
      'ស្វ៊ីត ស៊េរី និងការបូកសរុប',
      'ធរណីមាត្រវិភាគនៃរង្វង់ និងប៉ារ៉ាបូល (កំណុំ និងបន្ទាត់ប្រាប់ទិស)',
      'វ៉ិចទ័រ ម៉ាទ្រីស និងប្រព័ន្ធសមីការលីនេអ៊ែរ',
      'ប្រូបាប៊ីលីតេមានលក្ខខណ្ឌ និងការចែកចាយប្រូបាប',
    ],
  },
  '12': {
    title: 'ថ្នាក់ទី12',
    tagline: 'កាលគណិត រចនាសម្ព័ន្ធ និងគណិតវិទ្យានៃភាពមិនច្បាស់លាស់។',
    description:
      'ថ្នាក់ទី12 នាំបណ្ណាល័យទៅកាន់គំនិតស៊ីជម្រៅ និងមានឥទ្ធិពលបំផុត៖ លីមីត ដេរីវេ និងអាំងតេក្រាលពិពណ៌នាការផ្លាស់ប្តូរ ចំនួនកុំផ្លិច និងការពន្លាតទ្វេធាពង្រីកពិជគណិត វ៉ិចទ័រ និងម៉ាទ្រីសរៀបចំធរណីមាត្របីវិមាត្រ និងប្រព័ន្ធលីនេអ៊ែរ ហើយការចែកចាយប្រូបាប៊ីលីតេធ្វើគំរូភាពចៃដន្យយ៉ាងជាក់លាក់។',
    focus: [
      'លីមីត ភាពជាប់ និងមូលដ្ឋានគ្រឹះនៃកាលគណិត',
      'ដេរីវេ និងអាំងតេក្រាល ព្រមទាំងការអនុវត្តជាក់ស្តែង',
      'ចំនួនកុំផ្លិច ការពន្លាតទ្វេធា និងវិធីសាស្ត្ររាប់',
      'វ៉ិចទ័របីវិមាត្រ និងប្រព័ន្ធសមីការលីនេអ៊ែរ',
      'អថេរចៃដន្យ ការចែកចាយទ្វេធា និងការចែកចាយធម្មតា (ខ្សែកោងកណ្ដឹង)',
    ],
  },
}

export const kmSubjects: Record<string, SubjectCopy> = {
  '7:number-systems': {
    title: 'ប្រព័ន្ធចំនួន',
    description:
      'ចំនួនដែលមានទិសដៅ ផ្នែកនៃមួយភាគ ស្វ័យគុណ និងការប្រៀបធៀប៖ ឧបករណ៍ដែលគ្រប់ប្រធានបទក្រោយៗពឹងផ្អែកលើ។',
  },
  '7:algebra': {
    title: 'ពិជគណិត',
    description: 'អក្សរដែលតំណាងចំនួន សមីការដែលរក្សាតុល្យភាព និងលំនាំដែលអាចព្យាករណ៍បាន។',
  },
  '7:geometry': {
    title: 'ធរណីមាត្រ',
    description: 'ការវែកញែកដោយមុំ និងការវាស់លំហនៅក្នុង និងជុំវិញរាងធរណីមាត្រ។',
  },
  '7:statistics-probability': {
    title: 'ស្ថិតិ និងប្រូបាប៊ីលីតេ',
    description: 'ការប្រមូល និងបង្ហាញទិន្នន័យ ការសង្ខេបដោយមធ្យម និងការវាស់ឱកាសកើតឡើងនៃព្រឹត្តិការណ៍។',
  },
  '8:number-systems': {
    title: 'ប្រព័ន្ធចំនួន',
    description:
      'កសាងរូបភាពច្បាស់លាស់នៃបន្ទាត់ចំនួនពិត៖ ចំនួនសនិទាន និងអសនិទាន ឫសការ៉េ និងឫសគូប និងសញ្ញាណវិទ្យាសាស្ត្រសម្រាប់បរិមាណធំ និងតូចបំផុត។',
  },
  '8:algebra': {
    title: 'ពិជគណិត',
    description:
      'ផ្លាស់ដោយស្ទាត់រវាងកន្សោម សមីការ វិសមីការ និងអនុគមន៍។ ពហុធា និងការដាក់ជាកត្តាផ្តល់ឧបករណ៍រចនាសម្ព័ន្ធ ខណៈអនុគមន៍លីនេអ៊ែរបង្ហាញពីរបៀបដែលពិជគណិតពិពណ៌នាការផ្លាស់ប្តូរ។',
  },
  '8:geometry': {
    title: 'ធរណីមាត្រ',
    description:
      'វែកញែកអំពីរាង និងលំហ៖ ទ្រឹស្តីបទពីតាករ ភាពសមគ្នាតាមចលនារឹង និងឋានានុក្រមចតុកោណ។ ការវាស់វែងក្លាយជាការវែកញែក ដោយរាល់ការអះអាងត្រូវផ្ទៀងផ្ទាត់នឹងនិយមន័យ ឬទ្រឹស្តីបទ។',
  },
  '8:statistics-probability': {
    title: 'ស្ថិតិ និងប្រូបាប៊ីលីតេ',
    description:
      'អានការបង្ហាញទិន្នន័យដោយរិះគន់ និងគណនាប្រូបាប៊ីលីតេនៃព្រឹត្តិការណ៍ផ្សំ។ តារាងប្រេកង់ ហ៊ីស្តូក្រាម និងដ្យាក្រាមដើម-ស្លឹករៀបចំទិន្នន័យ ខណៈលំហគំរូ ដ្យាក្រាមដើមឈើ និងច្បាប់ AND និង OR កំណត់បរិមាណឱកាស។',
  },
  '9:algebra': {
    title: 'ពិជគណិត',
    description: 'រ៉ាឌីកាល់ ការដាក់ជាកត្តា សមីការដឺក្រេទីពីរ ប្រព័ន្ធលីនេអ៊ែរ និងភាសាអនុគមន៍ បង្កើតស្នូលពិជគណិតនៃថ្នាក់ទី9។',
  },
  '9:geometry': {
    title: 'ធរណីមាត្រ',
    description:
      'ភាពស្រដៀង ទំនាក់ទំនងរង្វង់ និងការវាស់តួរាងកោង ពង្រីកការវែកញែកធរណីមាត្រពីរូបក្នុងប្លង់ ទៅបរិបទសមាមាត្រ និងបីវិមាត្រ។',
  },
  '9:coordinate-geometry': {
    title: 'ធរណីមាត្រកូអរដោនេ',
    description:
      'ប្លង់កាតេស៊ីយ៉ង់ផ្តល់អាសយដ្ឋានជាលេខដល់ចំណុច។ ចម្ងាយ ចំណុចកណ្តាល និងមេគុណប្រាប់ទិស បំប្លែងសំណួរធរណីមាត្រអំពីអង្កត់ ទៅជាពិជគណិត។',
  },
  '9:statistics-probability': {
    title: 'ស្ថិតិ និងប្រូបាប៊ីលីតេ',
    description:
      'ទិន្នន័យពីរអថេរ រង្វាស់នៃការខ្ចាត់ខ្ចាយ និងតារាងប្រូបាប៊ីលីតេពីរផ្នែក អភិវឌ្ឍការវែកញែកស្ថិតិដែលចាំបាច់ដើម្បីពិពណ៌នាភាពប្រែប្រួល និងទំនាក់ទំនង។',
  },
  '10:algebra': {
    title: 'ពិជគណិត',
    description:
      'សមីការដឺក្រេទីពីរ គ្រួសារអនុគមន៍ គំរូអិចស្ប៉ូណង់ស្យែល និងប្រព័ន្ធវិសមីការ។ ការផ្តោតសំខាន់គឺភ្ជាប់សមីការទៅនឹងក្រាហ្វ និងជ្រើសរើសវិធីសាស្ត្រដោយចេតនា។',
  },
  '10:geometry': {
    title: 'ធរណីមាត្រ',
    description:
      'ការវែកញែកផ្លូវការ ចលនារឹង និងទ្រឹស្តីបទរង្វង់ដែលភ្ជាប់មុំ ធ្នូ និងបន្ទាត់ប៉ះ (តង់សង់)។ សម្រាយបញ្ជាក់ត្រូវបានចាត់ទុកជាជំនាញ៖ រាល់ការអះអាងត្រូវការហេតុផល។',
  },
  '10:coordinate-geometry': {
    title: 'ធរណីមាត្រកូអរដោនេ',
    description:
      'ពិពណ៌នាបន្ទាត់ដោយពិជគណិត បំប្លែងរវាងទម្រង់ និងប្រើមេគុណប្រាប់ទិសដើម្បីសម្រេចថាបន្ទាត់ស្រប កែង ឬប្រសព្វគ្នា។',
  },
  '10:trigonometry': {
    title: 'ត្រីកោណមាត្រ',
    description:
      'អនុបាតក្នុងត្រីកោណកែង តម្លៃជាក់លាក់សម្រាប់មុំពិសេស និងច្បាប់ស៊ីនុស និងកូស៊ីនុសសម្រាប់ត្រីកោណដែលគ្មានមុំកែង។',
  },
  '10:statistics-probability': {
    title: 'ស្ថិតិ និងប្រូបាប៊ីលីតេ',
    description:
      'គម្លាតស្តង់ដារ និងការជ្រើសរើសរវាងមធ្យម និងមេដ្យាន ពិពណ៌នាសំណុំទិន្នន័យយ៉ាងជាក់លាក់ ខណៈច្បាប់ប្រូបាប៊ីលីតេ វិធីរាប់ និងតម្លៃរំពឹង អនុញ្ញាតឲ្យអ្នកធ្វើគំរូឱកាស និងប្រៀបធៀបលទ្ធផល។',
  },
  '11:algebra': {
    title: 'ពិជគណិតកម្រិតខ្ពស់',
    description:
      'ខ្សែស្រឡាយបួននៃទ្រឹស្តីអនុគមន៍៖ ពហុធា និងឫស គំរូអិចស្ប៉ូណង់ស្យែល និងលោការីត ស្វ៊ីត និងស៊េរី និងពិជគណិតនៃការផ្សំ និងការច្រាស។',
  },
  '11:coordinate-geometry': {
    title: 'ធរណីមាត្រកូអរដោនេ',
    description:
      'ខ្សែកោងដែលពិពណ៌នាដោយសមីការ៖ រង្វង់ដែលកសាងពីកណ្តាល និងកាំ និងប៉ារ៉ាបូលដែលកសាងពីកំណុំ (ហ្វូកូស) និងបន្ទាត់ប្រាប់ទិស។ ពិជគណិត និងការវែកញែកទីតាំងជួបគ្នាក្នុងរាល់ការទាញយក។',
  },
  '11:trigonometry': {
    title: 'ត្រីកោណមាត្រ',
    description:
      'មុំវាស់ជារ៉ាដ្យង់ កូអរដោនេលើរង្វង់ឯកតា ក្រាហ្វខួប អត្តសញ្ញាណ និងចម្លើយទូទៅ។ អនុបាតត្រីកោណកែងក្លាយជាអនុគមន៍ដែលកំណត់សម្រាប់គ្រប់មុំ។',
  },
  '11:vectors-matrices': {
    title: 'វ៉ិចទ័រ និងម៉ាទ្រីស',
    description:
      'ភាសាពីរសម្រាប់រចនាសម្ព័ន្ធលីនេអ៊ែរ៖ វ៉ិចទ័របង្ហាញប្រវែង (ម៉ូឌុល) និងទិសដៅក្នុងប្លង់ ខណៈម៉ាទ្រីសធ្វើសកម្មភាពលើវ៉ិចទ័រ និងដោះស្រាយប្រព័ន្ធសមីការ។',
  },
  '11:statistics-probability': {
    title: 'ស្ថិតិ និងប្រូបាប៊ីលីតេ',
    description:
      'ប្រូបាប៊ីលីតេដែលបានធ្វើបច្ចុប្បន្នភាពដោយព័ត៌មាន និងភាពប្រែប្រួលដែលបានវាស់ និងធ្វើគំរូ។ ប្រូបាប៊ីលីតេមានលក្ខខណ្ឌដោះស្រាយភាពពឹងផ្អែក ខណៈវ៉ារ្យ៉ង់ និងការចែកចាយពិពណ៌នាការខ្ចាត់ខ្ចាយនៃទិន្នន័យ និងអថេរចៃដន្យ។',
  },
  '12:advanced': {
    title: 'គណិតវិទ្យាកម្រិតខ្ពស់',
    description:
      'ខ្សែស្រឡាយកាលគណិត។ លីមីតធ្វើឲ្យគំនិតនៃការខិតជិតមានភាពជាក់លាក់ ដេរីវេវាស់ការផ្លាស់ប្តូរភ្លាមៗ ហើយអាំងតេក្រាលប្រមូលផ្តុំការផ្លាស់ប្តូរទៅជាផលសរុប និងផ្ទៃក្រឡា។',
  },
  '12:algebra': {
    title: 'ពិជគណិត និងគណិតវិទ្យាដាច់ដោយឡែក',
    description:
      'ចំនួនកុំផ្លិចពង្រីកបន្ទាត់ចំនួនពិតទៅជាប្លង់កុំផ្លិច ទ្រឹស្តីបទទ្វេធាពន្លាតស្វ័យគុណដោយមិនបាច់គុណដដែលៗ ហើយវិធីរាប់រៀបចំការរៀបចម្លាស់ និងបន្សំ។',
  },
  '12:coordinate-geometry': {
    title: 'ធរណីមាត្រកូអរដោនេ',
    description:
      'ភាគកាត់កោណ (កោនិក) ពង្រីករង្វង់ និងប៉ារ៉ាបូល ទៅអេលីប និងអ៊ីពែបូល ដែលជាខ្សែកោងកំណត់ដោយចម្ងាយទៅចំណុចថេរ (កំណុំ) និងបន្ទាត់ថេរ (បន្ទាត់ប្រាប់ទិស)។',
  },
  '12:vectors-matrices': {
    title: 'វ៉ិចទ័រ និងម៉ាទ្រីស',
    description:
      'វ៉ិចទ័រក្នុងបីវិមាត្រពិពណ៌នាទិសដៅ និងប្រវែង (ម៉ូឌុល) ក្នុងលំហ ខណៈម៉ាទ្រីសរៀបចំ និងដោះស្រាយប្រព័ន្ធសមីការលីនេអ៊ែរ។',
  },
  '12:statistics-probability': {
    title: 'ស្ថិតិ និងប្រូបាប៊ីលីតេ',
    description:
      'អថេរចៃដន្យផ្តល់លេខដល់លទ្ធផលដោយចៃដន្យ។ គំរូទ្វេធារាប់ជោគជ័យក្នុងការសាកល្បងដដែលៗ ហើយការចែកចាយធម្មតាធ្វើគំរូទិន្នន័យជាប់ដោយខ្សែកោងកណ្ដឹង។',
  },
}


export const kmTopics: Record<string, TopicCopy> = {
  /* Grade 7 */
  integers: {
    title: 'ចំនួនគត់',
    subtitle: 'ចំនួនគត់វិជ្ជមាន និងអវិជ្ជមាន តម្លៃដាច់ខាត និងប្រតិបត្តិការទាំងបួន។',
  },
  'rational-numbers': {
    title: 'ចំនួនសនិទាន',
    subtitle: 'ប្រភាគ និងទសភាគ ការតម្រៀបពួកវា និងប្រតិបត្តិការទាំងបួន។',
  },
  'exponents-and-powers': {
    title: 'ស្វ័យគុណ និងនិទស្សន្ត',
    subtitle: 'ការគុណដដែលៗ ច្បាប់ស្វ័យគុណ និងស្វ័យគុណនៃដប់។',
  },
  'ratios-and-proportions': {
    title: 'អនុបាត និងសមាមាត្រ',
    subtitle: 'ការប្រៀបធៀបបរិមាណ អត្រាឯកតា និងការដោះស្រាយសមាមាត្រ។',
  },
  'algebraic-expressions': {
    title: 'កន្សោមពិជគណិត',
    subtitle: 'អថេរ តួ ការជំនួស និងការសម្រួលដោយលក្ខណៈចែកចាយ។',
  },
  'linear-equations-one-variable': {
    title: 'សមីការលីនេអ៊ែរមួយអថេរ',
    subtitle: 'វិធីសាស្ត្រតុល្យភាព សមីការពីរជំហាន និងចំណោទជាក់ស្តែង។',
  },
  'patterns-and-sequences': {
    title: 'លំនាំ និងស្វ៊ីត',
    subtitle: 'ច្បាប់ពីតួមួយទៅតួមួយ តារាងបញ្ចូល-បញ្ចេញ និងរូបមន្តតួទី n សាមញ្ញ។',
  },
  'lines-angles-and-triangles': {
    title: 'បន្ទាត់ មុំ និងត្រីកោណ',
    subtitle: 'ប្រភេទមុំ បន្ទាត់ស្រប ផលបូកមុំត្រីកោណ និងវិសមភាពត្រីកោណ។',
  },
  'perimeter-and-area': {
    title: 'បរិមាត្រ និងផ្ទៃក្រឡា',
    subtitle: 'ចតុកោណកែង ត្រីកោណ ប៉ារ៉ាឡេឡូក្រាម និងរូបផ្សំ។',
  },
  'circles-intro': {
    title: 'រង្វង់៖ បរិមាត្រ និងផ្ទៃក្រឡា',
    subtitle: 'កាំ អង្កត់ផ្ចិត បរិមាត្រ ផ្ទៃក្រឡា និងអត្ថន័យពិតនៃចំនួន π។',
  },
  'prisms-and-cubes': {
    title: 'ព្រីស និងគូប',
    subtitle: 'សំណាញ់ពន្លាត ផ្ទៃក្រឡាសរុប និងមាឌរបស់ប្រអប់ចតុកោណ និងគូប។',
  },
  'data-and-graphs': {
    title: 'ទិន្នន័យ និងក្រាហ្វ',
    subtitle: 'តារាង ក្រាហ្វសសរ ក្រាហ្វបន្ទាត់ និងក្រាហ្វរង្វង់ ព្រមទាំងរបៀបអានដោយរិះគន់។',
  },
  averages: {
    title: 'មធ្យម និងជួរតម្លៃ',
    subtitle: 'មធ្យមនព្វន្ធ មេដ្យាន ម៉ូដ និងជួរតម្លៃ ជាវិធីសង្ខេបសំណុំទិន្នន័យ។',
  },
  'probability-intro': {
    title: 'ការណែនាំអំពីប្រូបាប៊ីលីតេ',
    subtitle: 'លំហគំរូ ប្រូបាប៊ីលីតេទ្រឹស្តី និងពិសោធន៍ និងប្រូបាប៊ីលីតេបំពេញ។',
  },

  /* Grade 8 */
  'real-numbers': {
    title: 'ចំនួនពិត',
    subtitle: 'ចំនួនសនិទាន និងអសនិទាន ទសភាគខួប និងការតម្រៀបលើបន្ទាត់ចំនួន។',
  },
  'square-and-cube-roots': {
    title: 'ឫសការ៉េ និងឫសគូប',
    subtitle: 'ការ៉េ និងគូបពេញលេញ ច្បាប់ឫស ការប៉ាន់ស្មាន និងការសម្រួល។',
  },
  'scientific-notation': {
    title: 'សញ្ញាណវិទ្យាសាស្ត្រ',
    subtitle: 'សរសេរចំនួនធំ និងតូចបំផុត ជាមេគុណគុណនឹងស្វ័យគុណនៃដប់។',
  },
  'linear-equations-and-inequalities': {
    title: 'សមីការ និងវិសមីការលីនេអ៊ែរ',
    subtitle: 'ការដោះស្រាយច្រើនជំហាន អថេរទាំងសងខាង និងច្បាប់បញ្ច្រាសវិសមីការ។',
  },
  'polynomials-intro': {
    title: 'ការណែនាំអំពីពហុធា',
    subtitle: 'ដឺក្រេ តួដូច ការពន្លាត និងរូបមន្តផលគុណពិសេស (សមភាពគួរចងចាំ)។',
  },
  'factorization-common-factors': {
    title: 'ការដាក់ជាកត្តា៖ កត្តារួម និងលំនាំ',
    subtitle: 'កត្តារួមធំបំផុត ផលដកការ៉េ និងត្រីធាមូលដ្ឋាន។',
  },
  'linear-functions': {
    title: 'អនុគមន៍លីនេអ៊ែរ (អនុគមន)',
    subtitle: 'សញ្ញាណអនុគមន៍ មេគុណប្រាប់ទិស (ជម្រាល) ចំណុចប្រសព្វ និងក្រាហ្វបន្ទាត់ត្រង់។',
  },
  'pythagorean-theorem': {
    title: 'ទ្រឹស្តីបទពីតាករ',
    subtitle: 'ត្រីកោណកែង អ៊ីប៉ូតេនុស ជ្រុងដែលខ្វះ ទ្រឹស្តីបទច្រាស និងការអនុវត្ត។',
  },
  'congruence-and-transformations': {
    title: 'ភាពសមគ្នា និងការបំប្លែង',
    subtitle: 'លក្ខខណ្ឌសមភាពត្រីកោណ SSS, SAS, ASA ព្រមទាំងបំប្លែងបណ្ដែត ចំណាំងឆ្លុះ និងរង្វិល។',
  },
  quadrilaterals: {
    title: 'ចតុកោណ',
    subtitle: 'លក្ខណៈ និងឋានានុក្រមនៃប៉ារ៉ាឡេឡូក្រាម ចតុកោណកែង ចតុកោណស្មើជ្រុង ការ៉េ ត្រាពេសូអុីត និងខ្លែង។',
  },
  'data-displays': {
    title: 'ការបង្ហាញទិន្នន័យ',
    subtitle: 'តារាងប្រេកង់ ហ៊ីស្តូក្រាម ដ្យាក្រាមដើម-ស្លឹក និងការបកស្រាយទិន្នន័យ។',
  },
  'probability-compound-events': {
    title: 'ព្រឹត្តិការណ៍ផ្សំ និងប្រូបាប៊ីលីតេ',
    subtitle: 'លំហគំរូ ព្រឹត្តិការណ៍ឯករាជ ច្បាប់ AND/OR និងដ្យាក្រាមដើមឈើ។',
  },

  /* Grade 9 */
  'radical-expressions': {
    title: 'កន្សោមរ៉ាឌីកាល់',
    subtitle: 'សម្រួល បញ្ចូល និងធ្វើសនិទានកម្មភាគបែង។',
  },
  'polynomial-factorization': {
    title: 'ការដាក់ពហុធាជាកត្តា',
    subtitle: 'បំប្លែងផលបូកជាផលគុណ ដោយប្រើកត្តារួម និងរូបមន្តសមភាពពិសេស។',
  },
  'quadratic-equations-intro': {
    title: 'សមីការដឺក្រេទីពីរ៖ ការណែនាំ',
    subtitle: 'ដោះស្រាយដោយដាក់ជាកត្តា និងឫសការ៉េ ដោយប្រើលក្ខណៈផលគុណសូន្យ។',
  },
  'systems-of-linear-equations': {
    title: 'ប្រព័ន្ធសមីការលីនេអ៊ែរ',
    subtitle: 'សមីការពីរ អថេរពីរ៖ វិធីសាស្ត្រក្រាហ្វ វិធីសាស្ត្រជំនួស និងវិធីសាស្ត្របំបាត់។',
  },
  'functions-intro': {
    title: 'អនុគមន៍ (អនុគមន)៖ ការណែនាំ',
    subtitle: 'បញ្ចូលមួយ បញ្ចេញមួយ៖ សញ្ញាណអនុគមន៍ ដែនកំណត់ និងសំណុំតម្លៃ។',
  },
  'similarity-and-dilations': {
    title: 'ភាពស្រដៀង និងការពង្រីក',
    subtitle: 'រូបរាងដូចគ្នា ទំហំខុសគ្នា៖ មេគុណមាត្រដ្ឋាន និងជ្រុងសមាមាត្រ។',
  },
  'circle-geometry': {
    title: 'ធរណីមាត្ររង្វង់',
    subtitle: 'អង្កត់ធ្នូ ធ្នូ មុំចារឹកក្នុងរង្វង់ និងមុំផ្ចិត។',
  },
  'surface-area-and-volume': {
    title: 'ផ្ទៃក្រឡាសរុប និងមាឌរបស់តួរាងធរណីមាត្រ',
    subtitle: 'ស៊ីឡាំង កោណ និងស្វ៊ែរ ទាំងទម្រង់ពិត និងតម្លៃប្រហាក់ប្រហែល។',
  },
  'cartesian-plane': {
    title: 'ប្លង់កាតេស៊ីយ៉ង់',
    subtitle: 'គូសចំណុច កំណត់កូអរដោនេក្នុងកាដ្រង់ទាំងបួន និងគូសបន្ទាត់ផ្ដេក និងបញ្ឈរ។',
  },
  'distance-midpoint-slope': {
    title: 'ចម្ងាយ ចំណុចកណ្តាល និងមេគុណប្រាប់ទិស',
    subtitle: 'វាស់ប្រវែង រកចំណុចកណ្តាល និងគណនាមេគុណប្រាប់ទិស (ជម្រាល) លើប្លង់កូអរដោនេ។',
  },
  'scatter-plots': {
    title: 'ក្រាហ្វព្រិល និងទំនាក់ទំនង',
    subtitle: 'អានទិន្នន័យពីរអថេរ៖ ទិសដៅ ភាពខ្លាំង តម្លៃខុសប្រក្រតី និងបន្ទាត់តម្រែតម្រង់។',
  },
  'measures-of-spread': {
    title: 'រង្វាស់នៃការខ្ចាត់ខ្ចាយ',
    subtitle: 'ជួរតម្លៃ (Range) កាតេទីល ចន្លោះកាតេទីល (IQR) ក្រាហ្វប្រអប់ និងតម្លៃខុសប្រក្រតី។',
  },
  'probability-compound-and-two-way': {
    title: 'តារាងពីរផ្នែក និងប្រូបាប៊ីលីតេផ្សំ',
    subtitle: 'ប្រូបាប៊ីលីតេរួម ប្រូបាប៊ីលីតេរឹម ប្រូបាប៊ីលីតេមានលក្ខខណ្ឌ និងការសាកល្បងឯករាជភាព។',
  },

  /* Grade 10 */
  'quadratic-equations': {
    title: 'សមីការដឺក្រេទីពីរ',
    subtitle: 'ដោះស្រាយដោយដាក់ជាកត្តា បំពេញការ៉េ ឬរូបមន្ត និងអានឌីស្គ្រីមីណង់ (Discriminant)។',
  },
  'functions-and-transformations': {
    title: 'អនុគមន៍ និងការបំប្លែង',
    subtitle: 'បណ្ដែត ទាញ និងឆ្លុះក្រាហ្វ ដោយមិនបាត់បង់ដែនកំណត់ ឬសំណុំតម្លៃ។',
  },
  'exponential-functions-intro': {
    title: 'អនុគមន៍អិចស្ប៉ូណង់ស្យែល៖ ការណែនាំ',
    subtitle: 'ធ្វើគំរូការផ្លាស់ប្តូរភាគរយដដែលៗ ដោយ y = ab^x មេគុណកំណើន និងការប្រាក់ផ្សំ។',
  },
  'systems-of-inequalities': {
    title: 'ប្រព័ន្ធវិសមីការ',
    subtitle: 'ដាក់ស្រមោលកន្លះប្លង់ កំណត់តំបន់ចម្លើយអាចធ្វើទៅបាន និងដោះស្រាយចំណោទប្រសិទ្ធភាព។',
  },
  'geometric-proofs': {
    title: 'សម្រាយបញ្ជាក់ធរណីមាត្រ',
    subtitle: 'កសាងអំណះអំណាងបែបដេឌុចទីវ ពីនិយមន័យ លក្ខណៈមុំ និងលក្ខខណ្ឌសមភាពត្រីកោណ។',
  },
  'transformations-in-the-plane': {
    title: 'ការបំប្លែងក្នុងប្លង់',
    subtitle: 'ពិពណ៌នាបំប្លែងបណ្ដែត ចំណាំងឆ្លុះ និងរង្វិលយ៉ាងច្បាស់លាស់ដោយកូអរដោនេ។',
  },
  'circle-theorems': {
    title: 'ទ្រឹស្តីបទរង្វង់',
    subtitle: 'ភ្ជាប់មុំ ធ្នូ ចតុកោណចារឹកក្នុងរង្វង់ និងបន្ទាត់ប៉ះ (តង់សង់) ជាមួយសម្រាយបញ្ជាក់។',
  },
  'coordinate-geometry-of-lines': {
    title: 'ធរណីមាត្រកូអរដោនេនៃបន្ទាត់',
    subtitle: 'បំប្លែងរវាងទម្រង់សមីការបន្ទាត់ មេគុណប្រាប់ទិស បន្ទាត់ស្រប និងបន្ទាត់កែង។',
  },
  'right-triangle-trigonometry': {
    title: 'ត្រីកោណមាត្រត្រីកោណកែង',
    subtitle: 'ប្រើអនុបាតស៊ីនុស (sin) កូស៊ីនុស (cos) និងតង់សង់ (tan) ដើម្បីដោះស្រាយត្រីកោណកែង។',
  },
  'sine-and-cosine-rules': {
    title: 'ច្បាប់ស៊ីនុស និងកូស៊ីនុស',
    subtitle: 'ដោះស្រាយត្រីកោណទូទៅ (មិនមែនត្រីកោណកែង) រួមទាំងករណីមិនច្បាស់លាស់ SSA។',
  },
  'statistics-center-and-spread': {
    title: 'រង្វាស់ទីតាំងកណ្តាល និងការខ្ចាត់ខ្ចាយ',
    subtitle: 'ជ្រើសរើសរវាងមធ្យម និងមេដ្យាន វាស់ភាពប្រែប្រួលដោយគម្លាតស្តង់ដារ និងវ៉ារ្យ៉ង់។',
  },
  'probability-rules-and-counting': {
    title: 'ច្បាប់ប្រូបាប៊ីលីតេ ការរាប់ និងតម្លៃរំពឹង',
    subtitle: 'ផ្សំព្រឹត្តិការណ៍ រាប់លទ្ធផលដោយចម្លាស់ និងបន្សំ និងគណនាតម្លៃរំពឹងគណិតវិទ្យា។',
  },

  /* Grade 11 */
  'polynomial-functions': {
    title: 'អនុគមន៍ពហុធា',
    subtitle: 'ដឺក្រេ វិធីចែកពហុធា ទ្រឹស្តីបទសំណល់ ទ្រឹស្តីបទកត្តា និងក្រាហ្វពហុធា។',
  },
  'exponential-and-logarithmic-functions': {
    title: 'អនុគមន៍អិចស្ប៉ូណង់ស្យែល និងលោការីត',
    subtitle: 'អនុគមន៍ច្រាស ច្បាប់លោការីត គោល e និងការអនុវត្តក្នុងការលូតលាស់។',
  },
  'sequences-and-series': {
    title: 'ស្វ៊ីត និងស៊េរី',
    subtitle: 'ស្វ៊ីតនព្វន្ធ ស្វ៊ីតធរណីមាត្រ ផលសងរួម ផលធៀបរួម និងផលបូកស៊េរី។',
  },
  'inverse-and-composite-functions': {
    title: 'អនុគមន៍ច្រាស និងអនុគមន៍បណ្ដាក់',
    subtitle: 'កសាងអនុគមន៍ថ្មីដោយការបណ្ដាក់ (f∘g) និងការស្វែងរកអនុគមន៍ច្រាស (f⁻¹)(x)។',
  },
  'circles-in-coordinate-geometry': {
    title: 'រង្វង់ក្នុងធរណីមាត្រកូអរដោនេ',
    subtitle: 'សមីការស្តង់ដារ សមីការទូទៅ ផ្ចិត កាំ និងសមីការបន្ទាត់ប៉ះនឹងរង្វង់។',
  },
  'parabolas-as-conics': {
    title: 'ប៉ារ៉ាបូលជាភាគកាត់កោណ',
    subtitle: 'ខ្សែកោងនៃចំណុចដែលស្មើចម្ងាយពីកំណុំ (Focus) និងបន្ទាត់ប្រាប់ទិស (Directrix)។',
  },
  'unit-circle-trigonometry': {
    title: 'ត្រីកោណមាត្ររង្វង់ឯកតា',
    subtitle: 'មុំជារ៉ាដ្យង់ កូអរដោនេលើរង្វង់ឯកតា និងក្រាហ្វខួបនៃស៊ីនុស កូស៊ីនុស និងតង់សង់។',
  },
  'trigonometric-identities-and-equations': {
    title: 'អត្តសញ្ញាណ និងសមីការត្រីកោណមាត្រ',
    subtitle: 'រូបមន្តផលបូក ផលគុណ ស្វ័យគុណទ្វេ និងការដោះស្រាយសមីការត្រីកោណមាត្រ។',
  },
  'vectors-in-two-dimensions': {
    title: 'វ៉ិចទ័រក្នុងពីរវិមាត្រ',
    subtitle: 'កូអរដោនេសមាសភាគ ម៉ូឌុល (ប្រវែង) ទិសដៅ និងផលគុណស្កាលែរ។',
  },
  'matrices-and-determinants': {
    title: 'ម៉ាទ្រីស និងដេទែមីណង់',
    subtitle: 'ប្រតិបត្តិការលើម៉ាទ្រីស ដេទែមីណង់ ម៉ាទ្រីសច្រាស និងការដោះស្រាយប្រព័ន្ធលីនេអ៊ែរ។',
  },
  'conditional-probability': {
    title: 'ប្រូបាប៊ីលីតេមានលក្ខខណ្ឌ',
    subtitle: 'ធ្វើបច្ចុប្បន្នភាពប្រូបាប៊ីលីតេ ព្រឹត្តិការណ៍ឯករាជ និងរូបមន្តបេយេស (Bayes)。',
  },
  'statistics-variance-and-distributions': {
    title: 'វ៉ារ្យ៉ង់ ការចែកចាយ និងខ្សែកោងធម្មតា',
    subtitle: 'វាស់ការខ្ចាត់ខ្ចាយ ធ្វើគំរូឱកាស និងស្គាល់ខ្សែកោងកណ្ដឹង។',
  },

  /* Grade 12 */
  'limits-and-continuity': {
    title: 'លីមីត និងភាពជាប់',
    subtitle: 'លីមីតនៃអនុគមន៍ លីមីតរាងមិនកំណត់ ភាពជាប់ត្រង់ចំណុច និងលើចន្លោះ។',
  },
  differentiation: {
    title: 'ដេរីវេ',
    subtitle: 'អត្រាបម្រែបម្រួលភ្លាមៗ មេគុណប្រាប់ទិសបន្ទាត់ប៉ះ និងរូបមន្តដេរីវេ។',
  },
  integration: {
    title: 'អាំងតេក្រាល',
    subtitle: 'ព្រីមីទីវ អាំងតេក្រាលមិនកំណត់ អាំងតេក្រាលកំណត់ និងការគណនាផ្ទៃក្រឡា។',
  },
  'complex-numbers': {
    title: 'ចំនួនកុំផ្លិច',
    subtitle: 'ទម្រង់ពីជគណិត ទម្រង់ត្រីកោណមាត្រ ម៉ូឌុល អាគុយម៉ង់ និងរូបមន្តដឺម័រ (De Moivre)។',
  },
  'binomial-theorem': {
    title: 'ទ្រឹស្តីបទទ្វេធា',
    subtitle: 'ពន្លាតស្វ័យគុណនៃទ្វេធាដោយប្រើមេគុណទ្វេធា និងត្រីកោណប៉ាស្កាល់។',
  },
  'permutations-and-combinations': {
    title: 'ចម្លាស់ និងបន្សំ',
    subtitle: 'គោលការណ៍រាប់ ចម្លាស់ បន្សំ និងការអនុវត្តក្នុងប្រូបាប៊ីលីតេ។',
  },
  'conic-sections': {
    title: 'ភាគកាត់កោណ (កោនិក)៖ អេលីប និងអ៊ីពែបូល',
    subtitle: 'ទម្រង់ស្តង់ដារ កំណុំ (Focus) អុិចសង់ទ្រិស៊ីតេ និងបន្ទាត់អាស៊ីមតូត។',
  },
  'vectors-in-three-dimensions': {
    title: 'វ៉ិចទ័រក្នុងបីវិមាត្រ',
    subtitle: 'កូអរដោនេក្នុងលំហ ផលគុណស្កាលែរ ផលគុណវ៉ិចទ័រ (ផលគុណខ្វែង) សមីការបន្ទាត់ និងប្លង់។',
  },
  'matrices-and-linear-systems': {
    title: 'ម៉ាទ្រីស និងប្រព័ន្ធលីនេអ៊ែរ',
    subtitle: 'វិធីសាស្ត្របំបាត់ហ្គោស ដេទែមីណង់ 3×3 ម៉ាទ្រីសច្រាស និងក្បួនក្រាម័រ (Cramer)។',
  },
  'random-variables-and-distributions': {
    title: 'អថេរចៃដន្យ និងការចែកចាយទ្វេធា',
    subtitle: 'អថេរចៃដន្យដាច់ តម្លៃរំពឹងគណិតវិទ្យា វ៉ារ្យ៉ង់ និងការចែកចាយទ្វេធា។',
  },
  'normal-distribution': {
    title: 'ការចែកចាយធម្មតា',
    subtitle: 'ខ្សែកោងកណ្ដឹង គម្លាតស្តង់ដារ ពិន្ទុ z (z-score) និងក្បួនជាក់ស្តែង 68-95-99.7។',
  },
}

export const kmShapes: Record<string, ShapeCopy> = {
  triangle: { name: 'ត្រីកោណ', tagline: 'ជ្រុងបី និងរូបមន្តផ្ទៃក្រឡាមួយដែលអាចទុកចិត្តបាន។' },
  square: { name: 'ការ៉េ', tagline: 'ជ្រុងស្មើ មុំកែង និងស៊ីមេទ្រីឥតខ្ចោះ។' },
  rectangle: { name: 'ចតុកោណកែង', tagline: 'មុំកែង និងជ្រុងស្មើពីរគូ។' },
  circle: { name: 'រង្វង់', tagline: 'គ្រប់ចំណុចមានចម្ងាយស្មើពីចំណុចកណ្តាល។' },
  semicircle: { name: 'កន្លះរង្វង់', tagline: 'ពាក់កណ្តាលរង្វង់ ជាមួយអង្កត់ផ្ចិតត្រូវចងចាំ។' },
  parallelogram: { name: 'ប៉ារ៉ាឡេឡូក្រាម', tagline: 'ជ្រុងស្របពីរគូ ជ្រុងផ្អៀង និងកម្ពស់កែងមួយ។' },
  rhombus: { name: 'ចតុកោណស្មើជ្រុង', tagline: 'ប៉ារ៉ាឡេឡូក្រាមដែលមានជ្រុងទាំងបួនស្មើ (រ៉ូមប៊ូស)។' },
  trapezoid: { name: 'ត្រាពេសូអុីត', tagline: 'បាតស្របមួយគូ និងជ្រុងសងខាងស្មើពីរ (ត្រពែស)។' },
  kite: { name: 'ចតុកោណខ្លែង', tagline: 'ជ្រុងជាប់គ្នាស្មើពីរគូ លើស៊ុមកែង។' },
  pentagon: { name: 'បញ្ចកោណស្មើ', tagline: 'ជ្រុងស្មើប្រាំ និងមុំក្នុង 108° ប្រាំ។' },
  hexagon: { name: 'ឆកោណស្មើ', tagline: 'ជ្រុងប្រាំមួយដែលអាចក្រាលប្លង់បាន។' },
  'regular-polygon': { name: 'ពហុកោណស្មើ', tagline: 'រូបមន្តមួយសម្រាប់គ្រប់ពហុកោណស្មើ n ជ្រុង។' },
  cube: { name: 'គូប', tagline: 'ការ៉េប្រាំមួយ គែមដប់ពីរ និងមាឌមួយច្បាស់លាស់។' },
  cuboid: { name: 'ព្រីសចតុកោណកែង', tagline: 'ប្រអប់ប្រចាំថ្ងៃ ដែលវាស់បានបីទិស (ប្រលេពីប៉ែតកែង)។' },
  sphere: { name: 'ស្វ៊ែរ', tagline: 'ស៊ីមេទ្រីឥតខ្ចោះគ្រប់ទិសដៅ។' },
  cylinder: { name: 'ស៊ីឡាំង', tagline: 'រង្វង់ពីរភ្ជាប់ដោយជញ្ជាំងកោង។' },
  cone: { name: 'កោណ', tagline: 'រង្វង់មួយលូតឡើងទៅចំណុចមួយ (កំពូល)។' },
  pyramid: { name: 'ពីរ៉ាមីតបាតការ៉េ', tagline: 'បាតការ៉េ និងត្រីកោណបួនជួបគ្នានៅកំពូលខាងលើ។' },
  'triangular-prism': { name: 'ព្រីសត្រីកោណ', tagline: 'ត្រីកោណដែលពង្រីកទៅជាតួរាងធរណីមាត្រ។' },
  'rectangular-prism': { name: 'ព្រីសចតុកោណកែង', tagline: 'គូបវែង ឬប្រអប់ចតុកោណកែង។' },
}

export const kmFamilies: Record<SubjectFamily, string> = {
  number: 'ចំនួន',
  algebra: 'ពិជគណិត',
  geometry: 'ធរណីមាត្រ',
  trigonometry: 'ត្រីកោណមាត្រ',
  'statistics-probability': 'ស្ថិតិ និងប្រូបាប៊ីលីតេ',
  'coordinate-geometry': 'ធរណីមាត្រកូអរដោនេ',
  'vectors-matrices': 'វ៉ិចទ័រ និងម៉ាទ្រីស',
  advanced: 'គណិតវិទ្យាកម្រិតខ្ពស់',
}

/** Shape Lab dimension, metric and formula labels. */
export const kmShapeTerms: Record<string, string> = {
  Base: 'បាត',
  Height: 'កម្ពស់',
  'Apex offset': 'ចម្ងាយកំពូល',
  'Left side': 'ជ្រុងខាងឆ្វេង',
  'Right side': 'ជ្រុងខាងស្តាំ',
  Perimeter: 'បរិមាត្រ',
  Area: 'ផ្ទៃក្រឡា',
  'Angle sum': 'ផលបូកមុំ',
  Side: 'ជ្រុង',
  Diagonal: 'អង្កត់ទ្រូង',
  'Interior angle': 'មុំក្នុង',
  Length: 'ប្រវែង',
  Width: 'ទទឹង',
  Radius: 'កាំ',
  Diameter: 'អង្កត់ផ្ចិត',
  Circumference: 'បរិមាត្ររង្វង់',
  'Area from diameter': 'ផ្ទៃក្រឡាពីអង្កត់ផ្ចិត',
  'Arc length': 'ប្រវែងធ្នូ',
  'Angle in a semicircle': 'មុំក្នុងកន្លះរង្វង់',
  'Slanted side': 'ជ្រុងផ្អៀង',
  'Horizontal offset': 'ចម្ងាយផ្ដេក',
  'Consecutive angles': 'មុំជាប់គ្នា',
  'Diagonal 1': 'អង្កត់ទ្រូង 1',
  'Diagonal 2': 'អង្កត់ទ្រូង 2',
  'Diagonal relationship': 'ទំនាក់ទំនងអង្កត់ទ្រូង',
  'Base a': 'បាត a',
  'Base b': 'បាត b',
  Leg: 'ជ្រុងជាប់មុំកែង (ជ្រុងសងខាង)',
  Midsegment: 'អង្កត់មធ្យម (អង្កត់កណ្តាល)',
  'Symmetry diagonal': 'អង្កត់ទ្រូងស៊ីមេទ្រី',
  'Cross diagonal': 'អង្កត់ទ្រូងឆ្លងកាត់',
  'Top segment': 'ផ្នែកខាងលើ',
  'Upper side': 'ជ្រុងខាងលើ',
  'Lower side': 'ជ្រុងខាងក្រោម',
  Apothem: 'អាប៉ូតេម',
  Circumradius: 'កាំរង្វង់ចារឹកក្រៅ',
  Inradius: 'កាំរង្វង់ចារឹកក្នុង',
  'Number of sides': 'ចំនួនជ្រុង',
  'Exterior angle': 'មុំក្រៅ',
  Edge: 'គែម',
  Vertex: 'កំពូល',
  Chord: 'អង្កត់ធ្នូ',
  'Surface area': 'ផ្ទៃក្រឡាសរុប',
  Volume: 'មាឌ',
  'Face diagonal': 'អង្កត់ទ្រូងមុខ',
  'Space diagonal': 'អង្កត់ទ្រូងលំហ',
  'Base diagonal': 'អង្កត់ទ្រូងបាត',
  'Same solid': 'តួដូចគ្នា',
  'Great-circle circumference': 'បរិមាត្ររង្វង់ធំ',
  'Great-circle area': 'ផ្ទៃក្រឡារង្វង់ធំ',
  'Base area': 'ផ្ទៃក្រឡាបាត',
  'Lateral area': 'ផ្ទៃក្រឡាខាង',
  'Base circumference': 'បរិមាត្របាត',
  'Base radius': 'កាំបាត',
  'Slant height': 'កម្ពស់ផ្អៀង (ទ្រនុងផ្អៀង)',
  'Base side': 'ជ្រុងបាត',
  'Triangle base': 'បាតត្រីកោណ',
  'Triangle height': 'កម្ពស់ត្រីកោណ',
  'Prism length': 'ប្រវែងព្រីស',
  'Equal triangle side': 'ជ្រុងត្រីកោណស្មើ',
  'Triangle area': 'ផ្ទៃក្រឡាត្រីកោណ',
  'Triangle side': 'ជ្រុងត្រីកោណ',
  'Same solid as a cuboid': 'តួដូចគ្នានឹងព្រីសចតុកោណកែង',
  'Heron’s formula': 'រូបមន្តហេរ៉ុង (Heron)',
  "Heron's formula": 'រូបមន្តហេរ៉ុង (Heron)',
}


/** Extra Khmer and English search terms that are not already in a topic title. */
export const kmAliases: Record<string, string[]> = {
  /* Grade 7 */
  integers: [
    'ចំនួនគត់',
    'ចំនួនគត់រ៉ឺឡាទីប',
    'ចំនួនអវិជ្ជមាន',
    'ចំនួនវិជ្ជមាន',
    'តម្លៃដាច់ខាត',
    'បូកដកគុណចែក',
    'integers',
    'negative numbers',
    'absolute value',
  ],
  'rational-numbers': [
    'ប្រភាគ',
    'ទសភាគ',
    'ចំនួនសនិទាន',
    'ភាគយក',
    'ភាគបែង',
    'rational numbers',
    'fractions',
    'decimals',
  ],
  'exponents-and-powers': [
    'ស្វ័យគុណ',
    'product law for powers',
    'powers',
    'exponents',
    'និទស្សន្ត',
    'ច្បាប់ស្វ័យគុណ',
    'ស្វ័យគុណនៃដប់',
    'laws of exponents',
  ],
  'ratios-and-proportions': [
    'អនុបាត',
    'សមាមាត្រ',
    'អត្រាឯកតា',
    'ភាគរយ',
    'ratios',
    'proportions',
    'unit rate',
    'percentage',
  ],
  'algebraic-expressions': [
    'កន្សោមពិជគណិត',
    'កន្សោម',
    'អថេរ',
    'មេគុណ',
    'តួ',
    'algebraic expressions',
    'variables',
    'terms',
  ],
  'linear-equations-one-variable': [
    'សមីការ',
    'សមីការលីនេអ៊ែរ',
    'ដោះស្រាយសមីការ',
    'តុល្យភាពសមីការ',
    'linear equations',
    'one variable',
  ],
  'patterns-and-sequences': [
    'លំនាំ',
    'ស្វីត',
    'ស្វ៊ីត',
    'តួទី n',
    'តារាង',
    'patterns',
    'sequences',
    'nth term',
  ],
  'lines-angles-and-triangles': [
    'មុំ',
    'ត្រីកោណ',
    'បន្ទាត់ស្រប',
    'មុំកែង',
    'មុំឆ្លាស់',
    'ផលបូកមុំត្រីកោណ',
    'angles',
    'triangles',
    'parallel lines',
  ],
  'perimeter-and-area': [
    'បរិមាត្រ',
    'ផ្ទៃក្រឡា',
    'ចតុកោណកែង',
    'រូបផ្សំ',
    'perimeter',
    'area',
  ],
  'circles-intro': [
    'រង្វង់',
    'កាំ',
    'អង្កត់ផ្ចិត',
    'បរិមាត្ររង្វង់',
    'ផ្ទៃក្រឡារង្វង់',
    'ផាយ',
    'pi',
    'circles',
    'radius',
    'diameter',
    'circumference',
  ],
  'prisms-and-cubes': [
    'ព្រីស',
    'គូប',
    'ផ្ទៃក្រឡាសរុប',
    'មាឌ',
    'សំណាញ់ពន្លាត',
    'prisms',
    'cubes',
    'volume',
    'surface area',
  ],
  'data-and-graphs': [
    'ទិន្នន័យ',
    'ក្រាហ្វ',
    'តារាង',
    'ក្រាហ្វសសរ',
    'ក្រាហ្វបន្ទាត់',
    'ក្រាហ្វរង្វង់',
    'data',
    'graphs',
    'bar chart',
    'pie chart',
  ],
  averages: [
    'មធ្យម',
    'មធ្យមនព្វន្ធ',
    'មេដ្យាន',
    'ម៉ូដ',
    'ជួរតម្លៃ',
    'មធ្យមភាគ',
    'mean',
    'median',
    'mode',
    'range',
    'averages',
  ],
  'probability-intro': [
    'ប្រូបាប',
    'ប្រូបាប៊ីលីតេ',
    'លំហគំរូ',
    'ឱកាស',
    'ព្រឹត្តិការណ៍',
    'probability',
    'sample space',
  ],

  /* Grade 8 */
  'real-numbers': [
    'ចំនួនពិត',
    'ចំនួនអសនិទាន',
    'ចំនួនសនិទាន',
    'ទសភាគខួប',
    'បន្ទាត់ចំនួន',
    'real numbers',
    'irrational numbers',
  ],
  'square-and-cube-roots': [
    'ឫសការ៉េ',
    'ឫសគូប',
    'ឫស',
    'ការ៉េពេញលេញ',
    'square root',
    'cube root',
    'radicals',
  ],
  'scientific-notation': [
    'សញ្ញាណវិទ្យាសាស្ត្រ',
    'ស្វ័យគុណនៃដប់',
    'scientific notation',
    'powers of ten',
  ],
  'linear-equations-and-inequalities': [
    'សមីការ',
    'វិសមីការ',
    'វិសមីការលីនេអ៊ែរ',
    'សមីការលីនេអ៊ែរ',
    'linear inequalities',
    'equations',
  ],
  'polynomials-intro': [
    'ពហុធា',
    'ដឺក្រេ',
    'ការពន្លាត',
    'ផលគុណពិសេស',
    'សមភាពគួរចងចាំ',
    'polynomials',
    'special products',
  ],
  'factorization-common-factors': [
    'កត្តា',
    'ការដាក់ជាកត្តា',
    'កត្តារួម',
    'ផលដកការ៉េ',
    'factoring',
    'common factors',
    'difference of squares',
  ],
  'linear-functions': [
    'អនុគមន៍',
    'អនុគមន',
    'អនុគមន៍លីនេអ៊ែរ',
    'អនុគមនលីនេអ៊ែរ',
    'ជម្រាល',
    'មេគុណប្រាប់ទិស',
    'ក្រាហ្វបន្ទាត់ត្រង់',
    'linear functions',
    'linear function',
    'slope',
    'intercept',
  ],
  'pythagorean-theorem': [
    'ពីតាករ',
    'ទ្រឹស្តីបទពីតាករ',
    'ត្រីកោណកែង',
    'អ៊ីប៉ូតេនុស',
    'ទ្រឹស្តីបទច្រាសពីតាករ',
    'pythagorean theorem',
    'pythagoras',
    'hypotenuse',
  ],
  'congruence-and-transformations': [
    'សមគ្នា',
    'ភាពសមគ្នា',
    'ការបំប្លែង',
    'បំប្លែងបណ្ដែត',
    'ចំណាំងឆ្លុះ',
    'រង្វិល',
    'congruence',
    'transformations',
    'SSS',
    'SAS',
    'ASA',
  ],
  quadrilaterals: [
    'ចតុកោណ',
    'ប៉ារ៉ាឡេឡូក្រាម',
    'ចតុកោណកែង',
    'ការ៉េ',
    'ចតុកោណស្មើជ្រុង',
    'ត្រាពេសូអុីត',
    'ខ្លែង',
    'quadrilaterals',
    'parallelogram',
    'rhombus',
    'trapezoid',
  ],
  'data-displays': [
    'ទិន្នន័យ',
    'ហ៊ីស្តូក្រាម',
    'ប្រេកង់',
    'ដើម-ស្លឹក',
    'តារាងប្រេកង់',
    'histograms',
    'frequency table',
    'stem and leaf',
  ],
  'probability-compound-events': [
    'ប្រូបាប',
    'ប្រូបាប៊ីលីតេ',
    'ព្រឹត្តិការណ៍ផ្សំ',
    'ដ្យាក្រាមដើមឈើ',
    'ព្រឹត្តិការណ៍ឯករាជ',
    'compound events',
    'independent events',
    'tree diagram',
  ],

  /* Grade 9 */
  'radical-expressions': [
    'រ៉ាឌីកាល់',
    'ឫស',
    'សម្រួលឫស',
    'ភាគបែងសនិទាន',
    'សនិទានកម្មភាគបែង',
    'radicals',
    'rationalize denominator',
  ],
  'polynomial-factorization': [
    'ពហុធា',
    'កត្តា',
    'ការដាក់ជាកត្តា',
    'ដាក់ពហុធាជាកត្តា',
    'polynomial factorization',
  ],
  'quadratic-equations-intro': [
    'សមីការដឺក្រេទីពីរ',
    'សមីការការ៉េ',
    'ដោះស្រាយដោយកត្តា',
    'ផលគុណសូន្យ',
    'quadratic equations',
    'zero product',
  ],
  'systems-of-linear-equations': [
    'ប្រព័ន្ធសមីការ',
    'ប្រព័ន្ធសមីការលីនេអ៊ែរ',
    'សមីការពីរមិនស្គាល់',
    'វិធីសាស្ត្រជំនួស',
    'វិធីសាស្ត្របំបាត់',
    'system of linear equations',
    'elimination',
    'substitution',
  ],
  'functions-intro': [
    'អនុគមន៍',
    'អនុគមន',
    'ដែនកំណត់',
    'សំណុំតម្លៃ',
    'បញ្ចូលបញ្ចេញ',
    'functions',
    'function',
    'domain',
    'range',
  ],
  'similarity-and-dilations': [
    'ភាពស្រដៀង',
    'ការពង្រីក',
    'មេគុណមាត្រដ្ឋាន',
    'ជ្រុងសមាមាត្រ',
    'similarity',
    'dilation',
    'scale factor',
    'similar triangles',
  ],
  'circle-geometry': [
    'រង្វង់',
    'អង្កត់ធ្នូ',
    'ធ្នូ',
    'មុំចារឹកក្នុងរង្វង់',
    'មុំផ្ចិត',
    'circle geometry',
    'chords',
    'arcs',
    'inscribed angles',
  ],
  'surface-area-and-volume': [
    'ផ្ទៃក្រឡាសរុប',
    'មាឌ',
    'ស៊ីឡាំង',
    'កោណ',
    'ស្វ៊ែរ',
    'surface area',
    'volume',
    'cylinder',
    'cone',
    'sphere',
  ],
  'cartesian-plane': [
    'ប្លង់កូអរដោនេ',
    'កាតេស៊ីយ៉ង់',
    'កាដ្រង់',
    'ចំណុច',
    'cartesian plane',
    'quadrants',
    'coordinates',
  ],
  'distance-midpoint-slope': [
    'ចម្ងាយ',
    'ចំណុចកណ្តាល',
    'ជម្រាល',
    'មេគុណប្រាប់ទិស',
    'កូអរដោនេ',
    'distance formula',
    'midpoint',
    'slope',
  ],
  'scatter-plots': [
    'ក្រាហ្វព្រិល',
    'ទិន្នន័យពីរអថេរ',
    'ទំនាក់ទំនង',
    'តម្លៃខុសប្រក្រតី',
    'បន្ទាត់តម្រែតម្រង់',
    'scatter plots',
    'correlation',
    'best fit line',
  ],
  'measures-of-spread': [
    'ការខ្ចាត់ខ្ចាយ',
    'IQR',
    'ចន្លោះកាតេទីល',
    'ក្រាហ្វប្រអប់',
    'កាតេទីល',
    'តម្លៃខុសប្រក្រតី',
    'interquartile range',
    'box plot',
    'quartiles',
    'outliers',
  ],
  'probability-compound-and-two-way': [
    'តារាងពីរផ្នែក',
    'ប្រូបាប៊ីលីតេ',
    'ប្រូបាប៊ីលីតេមានលក្ខខណ្ឌ',
    'ពីរអថេរ',
    'two-way tables',
    'conditional probability',
  ],

  /* Grade 10 */
  'quadratic-equations': [
    'សមីការដឺក្រេទីពីរ',
    'សមីការការ៉េ',
    'ឌីស្គ្រីមីណង់',
    'រូបមន្តសមីការដឺក្រេទីពីរ',
    'បំពេញការ៉េ',
    'quadratic formula',
    'discriminant',
    'completing the square',
  ],
  'functions-and-transformations': [
    'អនុគមន៍',
    'អនុគមន',
    'ការបំប្លែង',
    'ការបណ្ដែត',
    'ចំណាំងឆ្លុះ',
    'ក្រាហ្វអនុគមន៍',
    'function transformations',
    'shifts',
    'reflections',
  ],
  'exponential-functions-intro': [
    'អិចស្ប៉ូណង់ស្យែល',
    'អនុគមន៍',
    'អនុគមន',
    'អនុគមន៍អិចស្ប៉ូណង់ស្យែល',
    'ការលូតលាស់',
    'ការប្រាក់ផ្សំ',
    'exponential functions',
    'compound interest',
  ],
  'systems-of-inequalities': [
    'វិសមីការ',
    'ប្រព័ន្ធវិសមីការ',
    'តំបន់ចម្លើយ',
    'កន្លះប្លង់',
    'systems of inequalities',
    'feasible region',
  ],
  'geometric-proofs': [
    'សម្រាយបញ្ជាក់',
    'សម្រាយបញ្ជាក់ធរណីមាត្រ',
    'ដេឌុចទីវ',
    'ទ្រឹស្តីបទ',
    'geometric proofs',
    'deductive reasoning',
  ],
  'transformations-in-the-plane': [
    'ការបំប្លែងក្នុងប្លង់',
    'បំប្លែងបណ្ដែត',
    'ចំណាំងឆ្លុះ',
    'រង្វិល',
    'transformations in plane',
    'translation',
    'reflection',
    'rotation',
  ],
  'circle-theorems': [
    'ទ្រឹស្តីបទរង្វង់',
    'រង្វង់',
    'តង់សង់',
    'បន្ទាត់ប៉ះ',
    'ចតុកោណចារឹកក្នុងរង្វង់',
    'មុំចារឹកក្នុងរង្វង់',
    'circle theorems',
    'tangents',
    'cyclic quadrilateral',
  ],
  'coordinate-geometry-of-lines': [
    'បន្ទាត់',
    'ជម្រាល',
    'មេគុណប្រាប់ទិស',
    'សមីការបន្ទាត់',
    'បន្ទាត់ស្រប',
    'បន្ទាត់កែង',
    'lines',
    'slope',
    'slope-intercept form',
    'perpendicular lines',
  ],
  'right-triangle-trigonometry': [
    'ត្រីកោណមាត្រ',
    'ស៊ីនុស',
    'កូស៊ីនុស',
    'តង់សង់',
    'ត្រីកោណកែង',
    'sin',
    'cos',
    'tan',
    'trigonometry',
    'right triangle',
  ],
  'sine-and-cosine-rules': [
    'ច្បាប់ស៊ីនុស',
    'ច្បាប់កូស៊ីនុស',
    'ត្រីកោណ',
    'ដោះស្រាយត្រីកោណ',
    'sine rule',
    'cosine rule',
    'law of sines',
    'law of cosines',
  ],
  'statistics-center-and-spread': [
    'មធ្យម',
    'មេដ្យាន',
    'គម្លាតស្តង់ដារ',
    'ការខ្ចាត់ខ្ចាយ',
    'វ៉ារ្យ៉ង់',
    'mean',
    'median',
    'standard deviation',
    'spread',
  ],
  'probability-rules-and-counting': [
    'ប្រូបាប',
    'ប្រូបាប៊ីលីតេ',
    'ការរាប់',
    'ចម្លាស់',
    'បន្សំ',
    'តម្លៃរំពឹង',
    'permutations',
    'combinations',
    'expected value',
    'counting rules',
  ],

  /* Grade 11 */
  'polynomial-functions': [
    'ពហុធា',
    'អនុគមន៍',
    'អនុគមន',
    'អនុគមន៍ពហុធា',
    'ឫសពហុធា',
    'ដឺក្រេ',
    'ទ្រឹស្តីបទកត្តា',
    'ទ្រឹស្តីបទសំណល់',
    'polynomial functions',
    'factor theorem',
    'remainder theorem',
  ],
  'exponential-and-logarithmic-functions': [
    'អិចស្ប៉ូណង់ស្យែល',
    'លោការីត',
    'អនុគមន៍',
    'អនុគមន',
    'អនុគមន៍ច្រាស',
    'ច្បាប់លោការីត',
    'log',
    'ln',
    'exponential functions',
    'logarithmic functions',
  ],
  'sequences-and-series': [
    'ស្វីត',
    'ស្វ៊ីត',
    'ស៊េរី',
    'ស្វ៊ីតនព្វន្ធ',
    'ស្វ៊ីតធរណីមាត្រ',
    'ផលសងរួម',
    'ផលធៀបរួម',
    'arithmetic sequence',
    'geometric sequence',
    'series',
  ],
  'inverse-and-composite-functions': [
    'អនុគមន៍',
    'អនុគមន',
    'អនុគមន៍ច្រាស',
    'អនុគមន៍ផ្សំ',
    'អនុគមន៍បណ្ដាក់',
    'composite functions',
    'inverse functions',
  ],
  'circles-in-coordinate-geometry': [
    'រង្វង់',
    'កូអរដោនេ',
    'កណ្តាល',
    'ផ្ចិត',
    'កាំ',
    'បន្ទាត់ប៉ះ',
    'សមីការរង្វង់',
    'circle equations',
    'center and radius',
  ],
  'parabolas-as-conics': [
    'ប៉ារ៉ាបូល',
    'កំណុំ',
    'ហ្វូកូស',
    'បន្ទាត់ប្រាប់ទិស',
    'បន្ទាត់ណែនាំ',
    'ភាគកាត់កោណ',
    'កោនិក',
    'parabola',
    'focus',
    'directrix',
    'conics',
  ],
  'unit-circle-trigonometry': [
    'រង្វង់ឯកតា',
    'ត្រីកោណមាត្រ',
    'រ៉ាដ្យង់',
    'ស៊ីនុស',
    'កូស៊ីនុស',
    'តង់សង់',
    'radians',
    'unit circle',
    'trigonometric functions',
  ],
  'trigonometric-identities-and-equations': [
    'អត្តសញ្ញាណត្រីកោណមាត្រ',
    'សមីការត្រីកោណមាត្រ',
    'រូបមន្តត្រីកោណមាត្រ',
    'trigonometric identities',
    'trig equations',
  ],
  'vectors-in-two-dimensions': [
    'វ៉ិចទ័រ',
    'វុិចទ័រ',
    'ម៉ូឌុល',
    'ប្រវែងវ៉ិចទ័រ',
    'ទិសដៅ',
    'ផលគុណស្កាលែរ',
    'ផលគុណចំណុច',
    'vectors',
    'magnitude',
    'dot product',
    'scalar product',
  ],
  'matrices-and-determinants': [
    'ម៉ាទ្រីស',
    'ដេទែមីណង់',
    'ម៉ាទ្រីសច្រាស',
    'ប្រព័ន្ធលីនេអ៊ែរ',
    'matrices',
    'determinants',
    'inverse matrix',
  ],
  'conditional-probability': [
    'ប្រូបាប៊ីលីតេមានលក្ខខណ្ឌ',
    'ប្រូបាប',
    'ព្រឹត្តិការណ៍',
    'បេយេស',
    'conditional probability',
    'Bayes theorem',
  ],
  'statistics-variance-and-distributions': [
    'វ៉ារ្យ៉ង់',
    'ការចែកចាយ',
    'ខ្សែកោងធម្មតា',
    'គម្លាតស្តង់ដារ',
    'variance',
    'distributions',
    'normal curve',
  ],

  /* Grade 12 */
  'limits-and-continuity': [
    'លីមីត',
    'ភាពជាប់',
    'កាលគណិត',
    'លីមីតរាងមិនកំណត់',
    'limits',
    'continuity',
    'calculus',
    'indeterminate forms',
  ],
  differentiation: [
    'ដេរីវេ',
    'បន្ទាត់ប៉ះ',
    'តង់សង់',
    'អត្រាបម្រែបម្រួលភ្លាមៗ',
    'រូបមន្តដេរីវេ',
    'derivatives',
    'differentiation',
    'tangents',
    'chain rule',
  ],
  integration: [
    'អាំងតេក្រាល',
    'ព្រីមីទីវ',
    'ផ្ទៃក្រឡា',
    'អាំងតេក្រាលមិនកំណត់',
    'អាំងតេក្រាលកំណត់',
    'integrals',
    'integration',
    'antiderivatives',
    'area under curve',
  ],
  'complex-numbers': [
    'ចំនួនកុំផ្លិច',
    'ចំនួនកុំប្លិច',
    'ចំនួននិម្មិត',
    'ប្លង់កុំផ្លិច',
    'ម៉ូឌុល',
    'អាគុយម៉ង់',
    'ទម្រង់ត្រីកោណមាត្រ',
    'ដឺម័រ',
    'complex numbers',
    'imaginary numbers',
    'argand plane',
    'De Moivre',
  ],
  'binomial-theorem': [
    'ទ្វេធា',
    'ទ្រឹស្តីបទទ្វេធា',
    'ការពន្លាតទ្វេធា',
    'ត្រីកោណប៉ាស្កាល់',
    'មេគុណទ្វេធា',
    'binomial theorem',
    'pascal triangle',
    'expansion',
  ],
  'permutations-and-combinations': [
    'ចម្លាស់',
    'បន្សំ',
    'ការរាប់',
    'ក្បួនរាប់',
    'ប្រូបាប៊ីលីតេ',
    'permutations',
    'combinations',
    'nCr',
    'nPr',
    'counting',
  ],
  'conic-sections': [
    'ភាគកាត់កោណ',
    'កោនិក',
    'អេលីប',
    'អ៊ីពែបូល',
    'អាស៊ីមតូត',
    'កំណុំ',
    'អុិចសង់ទ្រិស៊ីតេ',
    'conics',
    'conic sections',
    'ellipse',
    'hyperbola',
    'foci',
  ],
  'vectors-in-three-dimensions': [
    'វ៉ិចទ័រ',
    'វុិចទ័រ',
    'បីវិមាត្រ',
    'ផលគុណវ៉ិចទ័រ',
    'ផលគុណខ្វែង',
    'ផលគុណស្កាលែរ',
    'ប្លង់',
    'បន្ទាត់ក្នុងលំហ',
    '3D vectors',
    'cross product',
    'dot product',
  ],
  'matrices-and-linear-systems': [
    'ម៉ាទ្រីស',
    'ប្រព័ន្ធលីនេអ៊ែរ',
    'ហ្គោស',
    'ដេទែមីណង់',
    'ម៉ាទ្រីសច្រាស',
    'ក្រាម័រ',
    'matrices',
    'gaussian elimination',
    'linear systems',
    'Cramer rule',
  ],
  'random-variables-and-distributions': [
    'អថេរចៃដន្យ',
    'ការចែកចាយ',
    'ទ្វេធា',
    'ការចែកចាយទ្វេធា',
    'តម្លៃរំពឹង',
    'random variables',
    'binomial distribution',
    'expected value',
  ],
  'normal-distribution': [
    'ការចែកចាយធម្មតា',
    'ខ្សែកោងកណ្ដឹង',
    'ពិន្ទុ z',
    'z-score',
    'គម្លាតស្តង់ដារ',
    'normal distribution',
    'bell curve',
    'empirical rule',
  ],

  /* Shapes */
  triangle: ['ត្រីកោណ', 'triangle', 'right triangle'],
  square: ['ការ៉េ', 'ចតុកោណស្មើ', 'square'],
  rectangle: ['ចតុកោណកែង', 'rectangle'],
  circle: ['រង្វង់', 'circle', 'radius', 'diameter'],
  semicircle: ['កន្លះរង្វង់', 'semicircle'],
  parallelogram: ['ប៉ារ៉ាឡេឡូក្រាម', 'parallelogram'],
  rhombus: ['ចតុកោណស្មើជ្រុង', 'រ៉ូមប៊ូស', 'ពេជ្រ', 'rhombus'],
  trapezoid: ['ត្រាពេសូអុីត', 'ត្រពែស', 'ចតុកោណព្នាយ', 'trapezoid'],
  kite: ['ចតុកោណខ្លែង', 'ខ្លែង', 'kite'],
  pentagon: ['បញ្ចកោណ', 'បញ្ចកោណស្មើ', 'pentagon'],
  hexagon: ['ឆកោណ', 'ឆកោណស្មើ', 'hexagon'],
  'regular-polygon': ['ពហុកោណស្មើ', 'regular polygon'],
  cube: ['គូប', 'cube'],
  cuboid: ['ព្រីសចតុកោណកែង', 'ប្រលេពីប៉ែតកែង', 'ប្រអប់', 'cuboid', 'rectangular prism'],
  sphere: ['ស្វ៊ែរ', 'sphere'],
  cylinder: ['ស៊ីឡាំង', 'cylinder'],
  cone: ['កោណ', 'cone'],
  pyramid: ['ពីរ៉ាមីត', 'ពីរ៉ាមីតបាតការ៉េ', 'pyramid'],
  'triangular-prism': ['ព្រីសត្រីកោណ', 'triangular prism'],
  'rectangular-prism': ['ព្រីសចតុកោណកែង', 'rectangular prism'],
}

export const kmPopularSearches: string[] = [
  'ទ្រឹស្តីបទពីតាករ',
  'សមីការដឺក្រេទីពីរ',
  'ដេរីវេ',
  'អាំងតេក្រាល',
  'លីមីត',
  'ចំនួនកុំផ្លិច',
  'ត្រីកោណមាត្រ',
  'ប្រូបាប៊ីលីតេ',
  'វ៉ិចទ័រ',
  'ផ្ទៃក្រឡារង្វង់',
  'មាឌស៊ីឡាំង',
  'ស្វ៊ីតនព្វន្ធ',
  'មេគុណប្រាប់ទិស',
  'ប៉ារ៉ាបូល',
  'ម៉ាទ្រីស',
  'ភាគកាត់កោណ',
]

export const kmTopicContent: Record<string, LocalizedTopic> = {
  'quadratic-equations': {
    title: 'សមីការដឺក្រេទីពីរ',
    subtitle: 'ដោះស្រាយដោយដាក់ជាកត្តា បំពេញការ៉េ ឬរូបមន្ត និងអានឌីស្គ្រីមីណង់ (Discriminant)។',
    introduction:
      'សមីការដឺក្រេទីពីរពិពណ៌នាអំពីប៉ារ៉ាបូលប្រសព្វនឹងបន្ទាត់ផ្ដេក។ ចម្លើយឫសរបស់វាអាចអានបានពីក្រាហ្វ រកឃើញតាមរយៈការដាក់ជាកត្តា ឬគណនាដោយផ្ទាល់តាមរូបមន្តសមីការដឺក្រេទីពីរ។ រូបមន្តទូទៅតែងតែដំណើរការជានិច្ច ប៉ុន្តែឌីស្គ្រីមីណង់ (Discriminant) អាចប្រាប់អ្នកជាមុនថាតើសមីការមានឫសជាចំនួនពិតប៉ុន្មាន។',
    prerequisites: [
      'ការដាក់កន្សោមដឺក្រេទីពីរជាកត្តា',
      'ការសម្រួលកន្សោមរ៉ាឌីកាល់ (ឫស)',
      'ការសង់ក្រាហ្វអនុគមន៍លីនេអ៊ែរ និងដឺក្រេទីពីរ',
    ],
    keyIdeas: [
      'ទម្រង់ស្តង់ដារគឺ $ax^2+bx+c=0$ ដែល $a \\ne 0$។',
      'លក្ខណៈផលគុណសូន្យបំប្លែងកត្តាទៅជាឫសចម្លើយ។',
      'ការបំពេញការ៉េបង្កើតបានទាំងទម្រង់កំពូលនៃប៉ារ៉ាបូល និងរូបមន្តសមីការដឺក្រេទីពីរ។',
      'ឌីស្គ្រីមីណង់ $\\Delta = b^2-4ac$ កំណត់ចំនួន និងប្រភេទនៃឫសពិត។',
      'បរិបទជាក់ស្តែងនៃចំណោទ អាចបដិសេធឫសគណិតវិទ្យាដែលមិនសមស្រប។',
    ],
    theory: [
      {
        title: 'ទម្រង់ស្តង់ដារ និងគោលការណ៍ផលគុណសូន្យ',
        body: [
          'គ្រប់សមីការដឺក្រេទីពីរទាំងអស់អាចតម្រៀបទៅជាទម្រង់ស្តង់ដារ $ax^2+bx+c=0$ ដែល $a$, $b$, និង $c$ ជាចំនួនថេរ និង $a \\ne 0$។ ឫសចម្លើយគឺជាតម្លៃនៃ $x$ ដែលធ្វើឲ្យអង្គខាងឆ្វេងស្មើសូន្យ។',
          'ការដាក់ជាកត្តាគឺជាវិធីសាស្ត្រលឿនបំផុតនៅពេលកត្តាងាយស្រួលមើលឃើញ។ ប្រសិនបើផលគុណស្មើសូន្យ យ៉ាងហោចណាស់កត្តាមួយត្រូវតែស្មើសូន្យ។ ដូច្នេះ $(x-r)(x-s)=0$ នាំឲ្យ $x=r$ ឬ $x=s$។ គោលការណ៍នេះពិតព្រោះសំណុំចំនួនពិតគ្មានតួចែកនៃសូន្យឡើយ។',
          'ការដាក់ជាកត្តាក្លាយជាការពិបាកនៅពេលឫសជាចំនួនអសនិទាន ឬមេគុណស្មុគស្មាញ។ រូបមន្តសមីការដឺក្រេទីពីរដោះស្រាយបានគ្រប់ករណីទាំងអស់ដោយមិនបាច់ទាយ។',
        ],
        bullets: [
          'ផ្ទេរគ្រប់តួទាំងអស់ទៅអង្គម្ខាងមុននឹងកំណត់តម្លៃ $a$, $b$, និង $c$។',
          'រក្សាសញ្ញានៃមេគុណនីមួយៗ៖ ក្នុង $2x^2-7x+3=0$ យើងមាន $b=-7$។',
          'សមីការដឺក្រេទីពីរអាចមានឫសពិតពីរ ឫសឌុបមួយ ឬគ្មានឫសក្នុងសំណុំ $\\mathbb{R}$ ឡើយ។',
        ],
      },
      {
        title: 'ការបំពេញការ៉េ និងការទាញរូបមន្ត',
        body: [
          'ការបំពេញការ៉េសរសេរ $x^2+bx+c$ ឡើងវិញជាការ៉េពេញលេញបូកនឹងចំនួនថេរ៖ $x^2+bx+c = \\left(x+\\frac{b}{2}\\right)^2 + c - \\frac{b^2}{4}$។',
          'ការអនុវត្តជំហានដូចគ្នានេះលើ $ax^2+bx+c=0$ ផ្តល់ឲ្យយើងនូវរូបមន្តសមីការដឺក្រេទីពីរ៖ ចែកអង្គទាំងពីរនឹង $a$ បន្ទាប់មកបំពេញការ៉េលើ $x^2+\\frac{b}{a}x$ រួចទាញឫសការ៉េ។ លទ្ធផលទទួលបានគឺ $x=\\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$។',
          'នៅពេល $a \\ne 1$ ត្រូវចែកគ្រប់តួទាំងអស់នឹង $a$ មុននឹងបំពេញការ៉េ។ កុំចែកតែពីរតួដំបូងឲ្យសោះ។',
        ],
        bullets: [
          'បូក និងដក $(b/2)^2$ ក្នុងកន្សោមតែមួយ។',
          'ទម្រង់កំពូល $y=a(x-h)^2+k$ កើតចេញពីការរៀបចំដូចគ្នានេះ។',
          'រូបមន្តគឺជាផ្លូវកាត់សម្រាប់ការគណនាតាមវិធីបំពេញការ៉េ។',
        ],
      },
      {
        title: 'ឌីស្គ្រីមីណង់ និងក្រាហ្វ',
        body: [
          'ឌីស្គ្រីមីណង់គឺ $\\Delta = b^2-4ac$ ដែលជាកន្សោមស្ថិតនៅក្រោមរ៉ាឌីកាល់។ សញ្ញារបស់វាកំណត់លក្ខណៈនៃឫស និងចំនួនចំណុចប្រសព្វរវាងប៉ារ៉ាបូល $y=ax^2+bx+c$ ជាមួយអ័ក្សអាប់ស៊ីស ($x$-axis)។',
          'កំពូលនៃប៉ារ៉ាបូលស្ថិតនៅ $x=-\\frac{b}{2a}$។ នៅពេលឌីស្គ្រីមីណង់ស្មើសូន្យ កំពូលនោះស្ថិតនៅលើអ័ក្សអាប់ស៊ីសយ៉ាងពិតប្រាកដ ដូច្នេះសមីការមានឫសឌុបតែមួយគត់។',
        ],
        bullets: [
          '$\\Delta > 0$៖ មានឫសពិតពីរផ្សេងគ្នា ប៉ារ៉ាបូលកាត់អ័ក្សអាប់ស៊ីសត្រង់ពីរចំណុច។',
          '$\\Delta = 0$៖ មានឫសឌុបតែមួយ ($x_1=x_2=-\\frac{b}{2a}$) ប៉ារ៉ាបូលប៉ះអ័ក្សអាប់ស៊ីសត្រង់កំពូល។',
          '$\\Delta < 0$៖ គ្មានឫសជាចំនួនពិតឡើយ (មានឫសកុំផ្លិច) ប៉ារ៉ាបូលមិនជួបអ័ក្សអាប់ស៊ីសទេ។',
        ],
      },
    ],
    examples: [
      {
        title: 'ដោះស្រាយសមីការដឺក្រេទីពីរតាមរូបមន្តទូទៅ',
        problem: 'ដោះស្រាយសមីការ $2x^2 - 5x - 3 = 0$ ក្នុងសំណុំចំនួនពិត $\\mathbb{R}$។',
        given: ['$a = 2$', '$b = -5$', '$c = -3$'],
        steps: [
          { text: 'គណនាឌីស្គ្រីមីណង់ $\\Delta = b^2 - 4ac$៖', math: '\\Delta = (-5)^2 - 4(2)(-3) = 25 + 24 = 49' },
          { text: 'ដោយ $\\Delta = 49 > 0$ នាំឲ្យសមីការមានឫសពិតពីរផ្សេងគ្នា៖', math: 'x = \\frac{-b \\pm \\sqrt{\\Delta}}{2a} = \\frac{5 \\pm 7}{4}' },
          { text: 'គណនាឫសនីមួយៗ៖', math: 'x_1 = \\frac{5+7}{4} = 3, \\quad x_2 = \\frac{5-7}{4} = -\\frac{1}{2}' },
        ],
        answer: 'សមីការមានឫសពីរគឺ $x = 3$ និង $x = -\\frac{1}{2}$។',
      },
    ],
    mistakes: [
      {
        mistake: 'សរសេរបន្ទាត់ប្រភាគចែកតែត្រង់រ៉ាឌីកាល់៖ $x = -b \\pm \\frac{\\sqrt{b^2-4ac}}{2a}$។',
        correction: 'បន្ទាត់ប្រភាគត្រូវចែកភាគយកទាំងមូល៖ $x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$ ដោយទាំង $-b$ និងឫសការ៉េត្រូវបានចែកនឹង $2a$។',
      },
      {
        mistake: 'ភ្លេចដូរសញ្ញានៅពេលជំនួស $b$ អវិជ្ជមាន ឧទាហរណ៍ $b=-5$ ជំនួសជា $-5$ ជំនួសឲ្យ $-(-5) = 5$។',
        correction: 'សរសេរបង់វង់ក្រចកជានិច្ច $-b = -(-5) = 5$ ដើម្បីកុំឲ្យច្រឡំសញ្ញា។',
      },
    ],
  },

  'pythagorean-theorem': {
    title: 'ទ្រឹស្តីបទពីតាករ',
    subtitle: 'ត្រីកោណកែង អ៊ីប៉ូតេនុស ជ្រុងដែលខ្វះ ទ្រឹស្តីបទច្រាស និងការអនុវត្ត។',
    introduction:
      'ទ្រឹស្តីបទពីតាករភ្ជាប់ប្រវែងជ្រុងទាំងបីនៃត្រីកោណកែង។ វាបំប្លែងជ្រុងដែលស្គាល់ពីរទៅជាជ្រុងទីបី ហើយទ្រឹស្តីបទច្រាសរបស់វាជួយអ្នកផ្ទៀងផ្ទាត់ថាតើមុំមួយជាមុំកែងដែរឬទេ។',
    prerequisites: ['បរិមាត្រ និងផ្ទៃក្រឡា', 'បន្ទាត់ មុំ និងត្រីកោណ', 'ឫសការ៉េ និងឫសគូប'],
    keyIdeas: [
      'ក្នុងត្រីកោណកែង អ៊ីប៉ូតេនុសគឺជាជ្រុងឈមនឹងមុំកែង ហើយជាជ្រុងដែលវែងជាងគេជានិច្ច។',
      'ទ្រឹស្តីបទបញ្ជាក់ថា $a^2+b^2=c^2$ ដែល $c$ ជាប្រវែងអ៊ីប៉ូតេនុស។',
      'ទ្រឹស្តីបទច្រាសអាចសម្គាល់មុំកែងបានតាមរយៈតែប្រវែងជ្រុងទាំងបី។',
      'ត្រីគុណពីតាករនៃចំនួនគត់ដូចជា $(3,4,5)$ និង $(5,12,13)$ ជួយសម្រួលការផ្ទៀងផ្ទាត់យ៉ាងលឿន។',
    ],
    theory: [
      {
        title: 'ទ្រឹស្តីបទ និងសមាសភាគរបស់វា',
        body: [
          'ក្នុងត្រីកោណកែង ជ្រុងឈមនឹងមុំកែងហៅថា អ៊ីប៉ូតេនុស (Hypotenuse) ដែលជាជ្រុងវែងជាងគេ។ ជ្រុងពីរទៀតហៅថា ជ្រុងជាប់មុំកែង (Legs)។ ទ្រឹស្តីបទពីតាករចែងថា ការ៉េនៃអ៊ីប៉ូតេនុសស្មើនឹងផលបូកការ៉េនៃជ្រុងជាប់មុំកែងទាំងពីរ៖ $a^2+b^2=c^2$។',
          'លទ្ធផលនេះបង្ហាញអំពីផ្ទៃក្រឡា៖ ការ៉េដែលសង់លើអ៊ីប៉ូតេនុស មានផ្ទៃក្រឡាស្មើនឹងផលបូកផ្ទៃក្រឡានៃការ៉េទាំងពីរដែលសង់លើជ្រុងជាប់មុំកែង។ ត្រីកោណ $3$–$4$–$5$ គឺជាឧទាហរណ៍ចំនួនគត់តូចបំផុត៖ $9+16=25$។',
        ],
      },
      {
        title: 'ការស្វែងរកជ្រុងដែលបាត់',
        body: [
          'ប្រសិនបើមិនស្គាល់អ៊ីប៉ូតេនុស ត្រូវបូកការ៉េនៃជ្រុងជាប់មុំកែង រួចទាញឫសការ៉េ៖ $c=\\sqrt{a^2+b^2}$។',
          'ប្រសិនបើមិនស្គាល់ជ្រុងជាប់មុំកែងមួយ ត្រូវដកការ៉េនៃជ្រុងនោះចេញពីការ៉េនៃអ៊ីប៉ូតេនុស រួចទាញឫសការ៉េ៖ $a=\\sqrt{c^2-b^2}$។ ដោយសារអ៊ីប៉ូតេនុសជាជ្រុងវែងជាងគេ កន្សោមក្រោមរ៉ាឌីកាល់តែងតែវិជ្ជមានជានិច្ច។',
        ],
      },
      {
        title: 'ទ្រឹស្តីបទច្រាស និងការអនុវត្ត',
        body: [
          'ទ្រឹស្តីបទច្រាសក៏ពិតដែរ៖ ប្រសិនបើប្រវែងជ្រុងទាំងបីនៃត្រីកោណផ្ទៀងផ្ទាត់ $a^2+b^2=c^2$ ដោយ $c$ ជាជ្រុងវែងជាងគេ នោះត្រីកោណនោះគឺជាត្រីកោណកែងត្រង់មុំឈមនឹងជ្រុង $c$។',
          'ប្រសិនបើ $a^2+b^2 > c^2$ ត្រីកោណនោះជាត្រីកោណមុំស្រួច។ ប្រសិនបើ $a^2+b^2 < c^2$ ត្រីកោណនោះជាត្រីកោណមុំទាល។',
        ],
      },
    ],
    examples: [
      {
        title: 'គណនាប្រវែងអ៊ីប៉ូតេនុស',
        problem: 'ត្រីកោណកែងមួយមានជ្រុងជាប់មុំកែងប្រវែង $a = 6\\text{ cm}$ និង $b = 8\\text{ cm}$។ គណនាប្រវែងអ៊ីប៉ូតេនុស $c$។',
        given: ['$a = 6\\text{ cm}$', '$b = 8\\text{ cm}$'],
        steps: [
          { text: 'អនុវត្តរូបមន្តទ្រឹស្តីបទពីតាករ $c^2 = a^2 + b^2$៖', math: 'c^2 = 6^2 + 8^2 = 36 + 64 = 100' },
          { text: 'ទាញយកឫសការ៉េវិជ្ជមាន៖', math: 'c = \\sqrt{100} = 10\\text{ cm}' },
        ],
        answer: 'ប្រវែងអ៊ីប៉ូតេនុសគឺ $c = 10\\text{ cm}$។',
      },
    ],
    mistakes: [
      {
        mistake: 'បូកជ្រុងទាំងពីរបញ្ចូលគ្នាជំនួសឲ្យការបូកការ៉េ៖ គិតថា $c = a + b$។',
        correction: 'ត្រូវលើកជ្រុងនីមួយៗជាការ៉េជាមុនសិន រួចបូកបញ្ចូលគ្នា ហើយទើបទាញឫសការ៉េ៖ $c = \\sqrt{a^2 + b^2}$។ តាមវិសមភាពត្រីកោណ $c < a + b$ ជានិច្ច។',
      },
    ],
  },

  differentiation: {
    title: 'ដេរីវេ',
    subtitle: 'អត្រាបម្រែបម្រួលភ្លាមៗ មេគុណប្រាប់ទិសបន្ទាត់ប៉ះ និងរូបមន្តដេរីវេ។',
    introduction:
      'ដេរីវេវាស់ស្ទង់ថាតើបរិមាណមួយប្រែប្រួលលឿនប៉ុណ្ណាក្នុងខណៈពេលមួយភ្លែត។ តាមធរណីមាត្រ វាគឺជាមេគុណប្រាប់ទិសនៃបន្ទាត់ប៉ះទៅនឹងខ្សែកោងក្រាហ្វ។ តាមរូបវិទ្យា វាគឺជាល្បឿនខណៈពេលស្គាល់ចម្ងាយចរ ឬជាសំទុះខណៈពេលស្គាល់ល្បឿន។ និយមន័យដេរីវេកើតចេញពីលីមីតនៃផលធៀបបម្រែបម្រួល ហើយរូបមន្តដេរីវេជួយឲ្យការគណនាកាន់តែរហ័ស។',
    prerequisites: ['លីមីត និងភាពជាប់', 'អនុគមន៍ពហុធា និងសនិទាន', 'ធរណីមាត្រកូអរដោនេនៃបន្ទាត់'],
    keyIdeas: [
      'ដេរីវេគឺជាលីមីតនៃផលធៀបកំណើន $\\lim_{h \\to 0} \\frac{f(x+h)-f(x)}{h}$។',
      'រូបមន្តស្វ័យគុណ ផលគុណ ផលធៀប និងអនុគមន៍បណ្ដាក់ គ្របដណ្តប់លើអនុគមន៍ភាគច្រើន។',
      '$f\'(x)=0$ កំណត់ទីតាំងចំណុចស្ថានីយ (ចំណុចបរមាដែលអាចមាន)។',
      'ដេរីវេទីពីរ $f\'\'(x)$ ជួយកំណត់ភាពប៉ោង ផត និងចាត់ថ្នាក់អតិបរមា ឬអប្បបរមា។',
    ],
    theory: [
      {
        title: 'ដេរីវេជាលីមីត និងបន្ទាត់ប៉ះ',
        body: [
          'ចំពោះអនុគមន៍ $f$ អត្រាបម្រែបម្រួលមធ្យមរវាង $x$ និង $x+h$ គឺ $\\frac{f(x+h)-f(x)}{h}$។ នៅពេលគណនាលីមីតកាលណា $h \\to 0$ យើងទទួលបានអត្រាបម្រែបម្រួលភ្លាមៗ ហៅថា ដេរីវេ $f\'(x)$។',
          'ដេរីវេក៏ជាមេគុណប្រាប់ទិសនៃបន្ទាត់ប៉ះទៅនឹងក្រាហ្វត្រង់ចំណុច $(x, f(x))$ ផងដែរ។ បើលីមីតនេះមានតម្លៃពិត នោះអនុគមន៍ $f$ មានដេរីវេត្រង់ $x$។ ភាពមានដេរីវេគឺរឹងមាំជាងភាពជាប់៖ អនុគមន៍ដែលមានដេរីវេគឺពិតជាជាប់ ប៉ុន្តែអនុគមន៍ជាប់អាចគ្មានដេរីវេត្រង់ចំណុចមុត (ដូចជា $f(x)=|x|$ ត្រង់ $x=0$)។',
        ],
        bullets: [
          'អត្រាបម្រែបម្រួលមធ្យម៖ $\\frac{\\Delta y}{\\Delta x} = \\frac{f(x+h)-f(x)}{h}$។',
          'អត្រាបម្រែបម្រួលភ្លាមៗ៖ $f\'(x) = \\lim_{h \\to 0} \\frac{f(x+h)-f(x)}{h}$។',
          'ដេរីវេមិនមានត្រង់ចំណុចមុត (Corner), ចំណុចត្រឡប់ (Cusp), និងបន្ទាត់ប៉ះឈរ។',
        ],
      },
      {
        title: 'វិធាន និងរូបមន្តដេរីវេគ្រឹះ',
        body: [
          'ដេរីវេនៃចំនួនថេរស្មើសូន្យ៖ $(c)\'=0$។ ដេរីវេនៃស្វ័យគុណ៖ $(x^n)\'=nx^{n-1}$។ ផលបូក និងផលដកអាចយកដេរីវេតាមតួនីមួយៗ។',
          'វិធានផលគុណ៖ $(uv)\'=u\'v + uv\'$។ វិធានផលធៀប៖ $\\left(\\frac{u}{v}\\right)\'= \\frac{u\'v - uv\'}{v^2}$ ($v \\ne 0$)។ វិធានបណ្ដាក់ (Chain Rule)៖ $(f(g(x)))\'=f\'(g(x)) \\cdot g\'(x)$។',
        ],
        bullets: [
          'ដេរីវេផលគុណ៖ $(uv)\'=u\'v+uv\'$ (មិនមែន $u\'v\'$ ទេ)។',
          'ដេរីវេផលធៀប៖ $\\left(\\frac{u}{v}\\right)\'= \\frac{u\'v-uv\'}{v^2}$។',
          'ដេរីវេអនុគមន៍បណ្ដាក់៖ យកដេរីវេក្រៅគុណនឹងដេរីវេក្នុង។',
        ],
      },
    ],
    examples: [
      {
        title: 'គណនាដេរីវេដោយប្រើវិធានផលគុណ',
        problem: 'គណនាដេរីវេនៃអនុគមន៍ $f(x) = (x^2 + 1)(3x - 2)$។',
        given: ['$u = x^2 + 1 \\implies u\' = 2x$', '$v = 3x - 2 \\implies v\' = 3$'],
        steps: [
          { text: 'អនុវត្តរូបមន្តផលគុណ $(uv)\'=u\'v + uv\'$៖', math: 'f\'(x) = (2x)(3x - 2) + (x^2 + 1)(3)' },
          { text: 'ពន្លាត និងបូកបង្រួមតួដូចគ្នា៖', math: 'f\'(x) = 6x^2 - 4x + 3x^2 + 3 = 9x^2 - 4x + 3' },
        ],
        answer: 'ដេរីវេនៃអនុគមន៍គឺ $f\'(x) = 9x^2 - 4x + 3$។',
      },
    ],
    mistakes: [
      {
        mistake: 'ច្រឡំយកដេរីវេផលគុណជាផលគុណនៃដេរីវេ៖ $(fg)\' = f\'g\'$។',
        correction: 'ត្រូវប្រើវិធានផលគុណជានិច្ច៖ $(fg)\' = f\'g + fg\'$។',
      },
      {
        mistake: 'ភ្លេចគុណដេរីវេខាងក្នុងពេលប្រើវិធានបណ្ដាក់ ឧ. $( (2x+1)^3 )\' = 3(2x+1)^2$។',
        correction: 'ត្រូវគុណនឹងដេរីវេខាងក្នុង $(2x+1)\'=2$ បន្ថែមទៀត៖ $( (2x+1)^3 )\' = 3(2x+1)^2 \\cdot 2 = 6(2x+1)^2$។',
      },
    ],
  },

  'limits-and-continuity': {
    title: 'លីមីត និងភាពជាប់',
    subtitle: 'លីមីតនៃអនុគមន៍ លីមីតរាងមិនកំណត់ ភាពជាប់ត្រង់ចំណុច និងលើចន្លោះ។',
    introduction:
      'លីមីតពិពណ៌នាអំពីតម្លៃដែលអនុគមន៍ខិតជិត នៅពេលអថេរឯករាជ្យខិតជិតចំណុចណាមួយ។ វាជាគ្រឹះនៃកាលគណិតទាំងមូល ដែលអនុញ្ញាតឲ្យយើងគណនាអត្រាបម្រែបម្រួល និងផ្ទៃក្រឡា ដោយមិនចាំបាច់ចែកនឹងសូន្យ។',
    prerequisites: ['អនុគមន៍ពហុធា និងអនុគមន៍សនិទាន', 'ដែនកំណត់នៃអនុគមន៍'],
    keyIdeas: [
      'លីមីត $\\lim_{x \\to a} f(x) = L$ មានន័យថា $f(x)$ ខិតជិត $L$ កាលណា $x$ ខិតជិត $a$។',
      'លីមីតមាន លុះត្រាតែលីមីតខាងឆ្វេង និងលីមីតខាងស្តាំមានតម្លៃស្មើគ្នា។',
      'រាងមិនកំណត់ $\\left[\\frac{0}{0}\\right]$ និង $\\left[\\frac{\\infty}{\\infty}\\right]$ ត្រូវសម្រួលកត្តារួម ឬគុណកន្សោមឆ្លាស់។',
      'អនុគមន៍ $f$ ជាប់ត្រង់ $x=a$ លុះត្រាតែ $\\lim_{x \\to a} f(x) = f(a)$។',
    ],
    theory: [
      {
        title: 'សញ្ញាណលីមីត និងលក្ខណៈគ្រឹះ',
        body: [
          'លីមីតពិនិត្យមើលឥរិយាបថនៃ $f(x)$ នៅក្បែរចំណុច $a$ ដោយមិនខ្វល់ថាតើ $f(a)$ កំណត់ឬអត់នោះទេ។',
          'ចំពោះអនុគមន៍ពហុធា និងសនិទានដែលភាគបែងមិនសូន្យ យើងអាចគណនាលីមីតដោយគ្រាន់តែជំនួស $x=a$ ផ្ទាល់។',
        ],
        bullets: [
          'លីមីតផលបូក ផលដក ផលគុណ និងផលធៀប ស្មើនឹងផលបូក ផលដក ផលគុណ និងផលធៀបនៃលីមីតនីមួយៗ។',
          'ទ្រឹស្តីបទកៀប (Squeeze Theorem)៖ បើ $g(x) \\le f(x) \\le h(x)$ ហើយ $\\lim g = \\lim h = L$ នោះ $\\lim f = L$។',
        ],
      },
    ],
  },

  integration: {
    title: 'អាំងតេក្រាល',
    subtitle: 'ព្រីមីទីវ អាំងតេក្រាលមិនកំណត់ អាំងតេក្រាលកំណត់ និងការគណនាផ្ទៃក្រឡា។',
    introduction:
      'អាំងតេក្រាលគឺជាប្រតិបត្តិការបញ្ច្រាសនៃដេរីវេ។ វាប្រមូលផ្តុំផលបូកនៃផ្នែកតូចៗដើម្បីគណនាផ្ទៃក្រឡាក្រោមខ្សែកោង មាឌ និងបរិមាណសរុបដែលបានផ្លាស់ប្តូរ។',
    prerequisites: ['ដេរីវេនៃអនុគមន៍', 'អនុគមន៍ត្រីកោណមាត្រ និងអិចស្ប៉ូណង់ស្យែល'],
    keyIdeas: [
      'ព្រីមីទីវ $F(x)$ នៃ $f(x)$ គឺជាអនុគមន៍ដែល $F\'(x) = f(x)$។',
      'អាំងតេក្រាលមិនកំណត់រួមបញ្ចូលថេរអាំងតេក្រាល $C$ ជានិច្ច៖ $\\int f(x)dx = F(x) + C$។',
      'ទ្រឹស្តីបទគ្រឹះនៃកាលគណិតភ្ជាប់អាំងតេក្រាលទៅនឹងព្រីមីទីវ៖ $\\int_a^b f(x)dx = F(b) - F(a)$។',
      'ផ្ទៃក្រឡាក្រោមខ្សែកោងវិជ្ជមាន $y=f(x)$ ពី $a$ ដល់ $b$ គឺ $\\int_a^b f(x)dx$។',
    ],
  },

  'complex-numbers': {
    title: 'ចំនួនកុំផ្លិច',
    subtitle: 'ទម្រង់ពីជគណិត ទម្រង់ត្រីកោណមាត្រ ម៉ូឌុល អាគុយម៉ង់ និងរូបមន្តដឺម័រ (De Moivre)។',
    introduction:
      'ចំនួនកុំផ្លិចពង្រីកបន្ទាត់ចំនួនពិតទៅជាប្លង់ពីរវិមាត្រ។ ឯកតានិម្មិត $i = \\sqrt{-1}$ អនុញ្ញាតឲ្យដោះស្រាយសមីការដែលគ្មានឫសក្នុងសំណុំចំនួនពិត ដូចជា $x^2 + 1 = 0$។',
    prerequisites: ['ប្រព័ន្ធចំនួនពិត', 'ត្រីកោណមាត្រ និងរង្វង់ឯកតា', 'កូអរដោនេក្នុងប្លង់'],
    keyIdeas: [
      'ទម្រង់ពីជគណិតគឺ $z = a + bi$ ដែល $a$ ជាផ្នែកពិត និង $b$ ជាផ្នែកនិម្មិត ($i^2 = -1$)។',
      'ម៉ូឌុល $|z| = \\sqrt{a^2+b^2}$ តំណាងឲ្យចម្ងាយពីគល់តម្រុយទៅចំណុចរូបភាព។',
      'ចំនួនកុំផ្លិចឆ្លាស់នៃ $z = a + bi$ គឺ $\\bar{z} = a - bi$ ហើយ $z \\bar{z} = |z|^2$។',
      'ទម្រង់ត្រីកោណមាត្រគឺ $z = r(\\cos\\theta + i\\sin\\theta)$ ដែល $r=|z|$ និង $\\theta = \\arg(z)$។',
      'រូបមន្តដឺម័រ (De Moivre)៖ $[r(\\cos\\theta + i\\sin\\theta)]^n = r^n(\\cos(n\\theta) + i\\sin(n\\theta))$។',
    ],
  },

  'right-triangle-trigonometry': {
    title: 'ត្រីកោណមាត្រត្រីកោណកែង',
    subtitle: 'ប្រើអនុបាតស៊ីនុស (sin) កូស៊ីនុស (cos) និងតង់សង់ (tan) ដើម្បីដោះស្រាយត្រីកោណកែង។',
    introduction:
      'ត្រីកោណមាត្រត្រីកោណកែងសិក្សាអំពីទំនាក់ទំនងរវាងមុំស្រួច និងអនុបាតនៃប្រវែងជ្រុងក្នុងត្រីកោណកែង។ វាអនុញ្ញាតឲ្យយើងគណនាប្រវែងជ្រុង និងទំហំមុំដែលមិនអាចវាស់ដោយផ្ទាល់បាន។',
    prerequisites: ['ត្រីកោណកែង និងទ្រឹស្តីបទពីតាករ', 'អនុបាត និងសមាមាត្រ'],
    keyIdeas: [
      '$\\sin\\theta = \\frac{\\text{ជ្រុងឈម}}{\\text{អ៊ីប៉ូតេនុស}}$',
      '$\\cos\\theta = \\frac{\\text{ជ្រុងជាប់}}{\\text{អ៊ីប៉ូតេនុស}}$',
      '$\\tan\\theta = \\frac{\\text{ជ្រុងឈម}}{\\text{ជ្រុងជាប់}} = \\frac{\\sin\\theta}{\\cos\\theta}$',
      'សមភាពគ្រឹះពីតាករ៖ $\\sin^2\\theta + \\cos^2\\theta = 1$។',
    ],
  },

  'parabolas-as-conics': {
    title: 'ប៉ារ៉ាបូលជាភាគកាត់កោណ',
    subtitle: 'ខ្សែកោងនៃចំណុចដែលស្មើចម្ងាយពីកំណុំ (Focus) និងបន្ទាត់ប្រាប់ទិស (Directrix)។',
    introduction:
      'ប៉ារ៉ាបូលគឺជាសំណុំនៃគ្រប់ចំណុចក្នុងប្លង់ ដែលមានចម្ងាយស្មើគ្នាពីចំណុចថេរមួយហៅថា កំណុំ (Focus) និងបន្ទាត់ថេរមួយហៅថា បន្ទាត់ប្រាប់ទិស (Directrix)។',
    prerequisites: ['សមីការដឺក្រេទីពីរ និងក្រាហ្វ', 'រូបមន្តចម្ងាយរវាងពីរចំណុច'],
    keyIdeas: [
      'និយមន័យទីតាំង៖ $d(P, F) = d(P, d)$។',
      'កំពូល (Vertex) ស្ថិតនៅចំកណ្តាលរវាងកំណុំ និងបន្ទាត់ប្រាប់ទិស។',
      'សមីការស្តង់ដារកំពូល $(0,0)$ អ័ក្សឆ្លុះផ្ដេក៖ $y^2 = 4px$ (កំណុំ $(p, 0)$, បន្ទាត់ប្រាប់ទិស $x = -p$)។',
      'សមីការស្តង់ដារកំពូល $(0,0)$ អ័ក្សឆ្លុះឈរ៖ $x^2 = 4py$ (កំណុំ $(0, p)$, បន្ទាត់ប្រាប់ទិស $y = -p$)។',
    ],
  },

  'vectors-in-two-dimensions': {
    title: 'វ៉ិចទ័រក្នុងពីរវិមាត្រ',
    subtitle: 'កូអរដោនេសមាសភាគ ម៉ូឌុល (ប្រវែង) ទិសដៅ និងផលគុណស្កាលែរ។',
    introduction:
      'វ៉ិចទ័រគឺជាបរិមាណដែលមានទាំងទំហំ (ប្រវែង/ម៉ូឌុល) និងទិសដៅ។ ក្នុងប្លង់ពីរវិមាត្រ វ៉ិចទ័រត្រូវបានតំណាងដោយកូអរដោនេសមាសភាគ ឬអង្កត់មានទិសដៅ។',
    prerequisites: ['ប្លង់កូអរដោនេកាតេស៊ីយ៉ង់', 'ទ្រឹស្តីបទពីតាករ', 'ត្រីកោណមាត្រ'],
    keyIdeas: [
      'វ៉ិចទ័រ $\\vec{v} = \\begin{pmatrix} x \\\\ y \\end{pmatrix} = x\\vec{i} + y\\vec{j}$។',
      'ម៉ូឌុល (ប្រវែង)៖ $|\\vec{v}| = \\sqrt{x^2 + y^2}$។',
      'ផលគុណស្កាលែរ (Dot Product)៖ $\\vec{u} \\cdot \\vec{v} = u_1 v_1 + u_2 v_2 = |\\vec{u}||\\vec{v}|\\cos\\theta$។',
      'វ៉ិចទ័រពីរអរតូកូណាល់ (កែងគ្នា) លុះត្រាតែ $\\vec{u} \\cdot \\vec{v} = 0$។',
    ],
  },

  'sequences-and-series': {
    title: 'ស្វ៊ីត និងស៊េរី',
    subtitle: 'ស្វ៊ីតនព្វន្ធ ស្វ៊ីតធរណីមាត្រ ផលសងរួម ផលធៀបរួម និងផលបូកស៊េរី។',
    introduction:
      'ស្វ៊ីតគឺជាលំដាប់នៃចំនួនដែលរៀបចំតាមច្បាប់កំណត់ច្បាស់លាស់។ ស៊េរីគឺជាផលបូកនៃតួទាំងឡាយនៃស្វ៊ីត។ ស្វ៊ីតនព្វន្ធ និងស្វ៊ីតធរណីមាត្រគឺជាស្វ៊ីតមូលដ្ឋានដ៏សំខាន់បំផុតក្នុងគណិតវិទ្យាវិទ្យាល័យ។',
    prerequisites: ['អនុគមន៍លីនេអ៊ែរ និងអិចស្ប៉ូណង់ស្យែល', 'ការបូកសរុបកន្សោមពិជគណិត'],
    keyIdeas: [
      'ស្វ៊ីតនព្វន្ធ៖ តួបន្ទាប់ស្មើនឹងតួមុនបូកនឹងផលសងរួម $d$ ($u_n = u_1 + (n-1)d$)។',
      'ផលបូកស្វ៊ីតនព្វន្ធ៖ $S_n = \\frac{n}{2}(u_1 + u_n) = \\frac{n}{2}[2u_1 + (n-1)d]$។',
      'ស្វ៊ីតធរណីមាត្រ៖ តួបន្ទាប់ស្មើនឹងតួមុនគុណនឹងផលធៀបរួម $q$ ($u_n = u_1 \\cdot q^{n-1}$)។',
      'ផលបូកស្វ៊ីតធរណីមាត្រ៖ $S_n = u_1 \\frac{1 - q^n}{1 - q}$ ($q \\ne 1$)។',
    ],
  },
}

export const kmFormulaContent: Record<string, LocalizedFormula> = {
  'g7-integers-distance': {
    title: "ចម្ងាយរវាងពីរចំនួនគត់",
    description: "ចម្ងាយរវាងចំនួនគត់ a និង b លើបន្ទាត់ចំនួនគឺ d = |a - b| = |b - a|",
  },
  'g7-integers-subtraction': {
    title: "ការដកដោយបូកចំនួនផ្ទុយ",
    description: "ការដកចំនួនគត់ b ចេញពី a ស្មើនឹងការបូក a ជាមួយចំនួនផ្ទុយនៃ b៖ a - b = a + (-b)",
  },
  'g7-integers-bracket-subtraction': {
    title: "ការដកផលបូកក្នុងវង់ក្រចក",
    description: "ការដកផលបូកក្នុងវង់ក្រចកតម្រូវឲ្យដូរសញ្ញាតួនីមួយៗ៖ a - (b + c) = a - b - c",
  },
  'g7-integers-negative-product': {
    title: "ផលគុណនៃពីរចំនួនអវិជ្ជមាន",
    description: "ផលគុណនៃពីរចំនួនអវិជ្ជមានគឺជាចំនួនវិជ្ជមាន៖ (-a) · (-b) = ab",
  },
  'g7-rational-equivalent': {
    title: "ប្រភាគសមមូល",
    description: "ការគុណ ឬចែកភាគយក និងភាគបែងនឹងចំនួនមិនសូន្យដូចគ្នា ផ្តល់នូវប្រភាគសមមូល",
  },
  'g7-rational-add': {
    title: "ការបូក និងដកប្រភាគ",
    description: "បូក ឬដកប្រភាគដោយតម្រូវភាគបែងរួម៖ a/b ± c/d = (ad ± bc)/(bd)",
  },
  'g7-rational-multiply': {
    title: "ការគុណប្រភាគ",
    description: "គុណភាគយកនឹងភាគយក និងភាគបែងនឹងភាគបែង៖ (a/b) · (c/d) = (ac)/(bd)",
  },
  'g7-rational-divide': {
    title: "ការចែកប្រភាគ",
    description: "គុណប្រភាគទីមួយនឹងប្រភាគចម្រាសនៃប្រភាគទីពីរ៖ (a/b) ÷ (c/d) = (ad)/(bc)",
  },
  'g7-exponents-product': {
    title: "ស្វ័យគុណ (Product law for powers)",
    description: "ច្បាប់ផលគុណស្វ័យគុណដែលមានគោលដូចគ្នា៖ រក្សាទុកគោល និងបូកនិទស្សន្ត aᵐ · aⁿ = aᵐ⁺ⁿ",
  },
  'g7-exponents-quotient': {
    title: "ច្បាប់ផលចែកស្វ័យគុណ",
    description: "ច្បាប់ផលចែកស្វ័យគុណដែលមានគោលដូចគ្នា៖ រក្សាទុកគោល និងដកនិទស្សន្ត aᵐ / aⁿ = aᵐ⁻ⁿ (a ≠ 0)",
  },
  'g7-exponents-power': {
    title: "ស្វ័យគុណនៃស្វ័យគុណ",
    description: "លើកស្វ័យគុណមួយជាស្វ័យគុណមួយទៀតដោយគុណនិទស្សន្តបញ្ចូលគ្នា៖ (aᵐ)ⁿ = aᵐⁿ",
  },
  'g7-exponents-zero': {
    title: "ស្វ័យគុណសូន្យ",
    description: "គ្រប់ចំនួនមិនសូន្យលើកជាស្វ័យគុណសូន្យស្មើ 1 ជានិច្ច៖ a⁰ = 1 (a ≠ 0)",
  },
  'g7-ratios-fraction': {
    title: "អនុបាតជាប្រភាគ",
    description: "អនុបាត a : b អាចសរសេរជាប្រភាគ a/b ដែល b ≠ 0",
  },
  'g7-ratios-equivalent': {
    title: "អនុបាតសមមូល",
    description: "អនុបាតស្មើគ្នាបង្កើតបានសមាមាត្រ a : b = ka : kb",
  },
  'g7-ratios-unit-rate': {
    title: "អត្រាឯកតា",
    description: "ប្រៀបធៀបបរិមាណធៀបនឹង 1 ឯកតានៃបរិមាណមួយទៀត",
  },
  'g7-ratios-cross': {
    title: "ផលគុណខ្វែងក្នុងសមាមាត្រ",
    description: "ក្នុងសមាមាត្រ a/b = c/d ផលគុណខ្វែងស្មើគ្នា៖ ad = bc",
  },
  'g7-expressions-distribute': {
    title: "លក្ខណៈចែកចាយនៃវិធីគុណ",
    description: "គុណតួខាងក្រៅជាមួយគ្រប់តួទាំងអស់ក្នុងវង់ក្រចក៖ a(b + c) = ab + ac",
  },
  'g7-expressions-like-terms': {
    title: "ការបូកបង្រួមតួដូចគ្នា",
    description: "បូក ឬដកមេគុណនៃតួដែលមានអថេរ និងស្វ័យគុណដូចគ្នា៖ ax + bx = (a + b)x",
  },
  'g7-expressions-negative-bracket': {
    title: "សញ្ញាដកមុខវង់ក្រចក",
    description: "សញ្ញាដកនៅមុខវង់ក្រចកប្តូរសញ្ញាគ្រប់តួទាំងអស់ខាងក្នុង៖ -(a - b) = -a + b",
  },
  'g7-equations-two-step': {
    title: "សមីការពីរជំហាន",
    description: "ដោះស្រាយសមីការ ax + b = c ដោយដក b រួចចែកនឹង a៖ x = (c - b)/a",
  },
  'g7-equations-brackets': {
    title: "សមីការមានវង់ក្រចក",
    description: "ពន្លាតវង់ក្រចកដោយលក្ខណៈចែកចាយមុនពេលដោះស្រាយអថេរ",
  },
  'g7-equations-fraction': {
    title: "សមីការមានប្រភាគ",
    description: "គុណអង្គទាំងពីរនៃសមីការនឹងភាគបែងរួមដើម្បីបំបាត់ប្រភាគ",
  },
  'g7-patterns-nth-term': {
    title: "តួទី n នៃលំនាំនព្វន្ធ",
    description: "រូបមន្តតួទី n នៃស្វ៊ីតនព្វន្ធដែលមានផលសងរួម d៖ aₙ = a₁ + (n - 1)d",
  },
  'g7-patterns-triangular': {
    title: "ចំនួនត្រីកោណ",
    description: "ផលបូកនៃចំនួនគត់វិជ្ជមាន n តំបូងគឺ Tₙ = n(n + 1)/2",
  },
  'g7-patterns-odd-sum': {
    title: "ផលបូកនៃ n ចំនួនសេសដំបូង",
    description: "ផលបូកនៃ n ចំនួនគត់សេសវិជ្ជមានដំបូងស្មើនឹង n²",
  },
  'g7-angles-triangle-sum': {
    title: "ផលបូកមុំក្នុងត្រីកោណ",
    description: "ផលបូកនៃរង្វាស់មុំក្នុងទាំងបីនៃត្រីកោណស្មើ 180° ជានិច្ច",
  },
  'g7-angles-straight-line': {
    title: "មុំលើបន្ទាត់ត្រង់",
    description: "ផលបូកនៃមុំជាប់គ្នានៅលើបន្ទាត់ត្រង់ស្មើ 180°",
  },
  'g7-angles-exterior': {
    title: "មុំក្រៅនៃត្រីកោណ",
    description: "មុំក្រៅនៃត្រីកោណស្មើនឹងផលបូកនៃមុំក្នុងមិនជាប់ទាំងពីរ",
  },
  'g7-angles-inequality': {
    title: "វិសមភាពត្រីកោណ",
    description: "ផលបូកប្រវែងជ្រុងពីរណាក៏ដោយក្នុងត្រីកោណ ត្រូវតែធំជាងប្រវែងជ្រុងទីបីជានិច្ច",
  },
  'g7-area-rectangle-perimeter': {
    title: "បរិមាត្រចតុកោណកែង",
    description: "បរិមាត្រនៃចតុកោណកែងដែលមានបណ្តោយ l និងទទឹង w គឺ P = 2(l + w)",
  },
  'g7-area-rectangle': {
    title: "ផ្ទៃក្រឡាចតុកោណកែង",
    description: "ផ្ទៃក្រឡានៃចតុកោណកែងដែលមានបណ្តោយ l និងទទឹង w គឺ A = lw",
  },
  'g7-area-parallelogram': {
    title: "ផ្ទៃក្រឡាប៉ារ៉ាឡេឡូក្រាម",
    description: "ផ្ទៃក្រឡានៃប៉ារ៉ាឡេឡូក្រាមដែលមានបាត b និងកម្ពស់កែង h គឺ A = bh",
  },
  'g7-area-triangle': {
    title: "ផ្ទៃក្រឡាត្រីកោណ",
    description: "ផ្ទៃក្រឡានៃត្រីកោណដែលមានបាត b និងកម្ពស់កែង h គឺ A = (1/2)bh",
  },
  'g7-circles-circumference-radius': {
    title: "បរិមាត្ររង្វង់តាមកាំ",
    description: "បរិមាត្ររង្វង់គណនាតាមកាំ r គឺ C = 2πr",
  },
  'g7-circles-circumference-diameter': {
    title: "បរិមាត្ររង្វង់តាមអង្កត់ផ្ចិត",
    description: "បរិមាត្ររង្វង់គណនាតាមអង្កត់ផ្ចិត d គឺ C = πd",
  },
  'g7-circles-area': {
    title: "ផ្ទៃក្រឡារង្វង់ (Area of a circle)",
    description: "ផ្ទៃក្រឡារង្វង់គណនាតាមកាំ r គឺ A = πr²",
  },
  'g7-prisms-cuboid-volume': {
    title: "មាឌព្រីសចតុកោណកែង",
    description: "មាឌនៃប្រអប់ចតុកោណកែង (ប្រលេពីប៉ែតកែង) គឺ V = lwh",
  },
  'g7-prisms-cuboid-surface-area': {
    title: "ផ្ទៃក្រឡាសរុបព្រីសចតុកោណកែង",
    description: "ផ្ទៃក្រឡាសរុបនៃប្រអប់ចតុកោណកែងគឺ A = 2(lw + lh + wh)",
  },
  'g7-prisms-cube': {
    title: "មាឌ និងផ្ទៃក្រឡាសរុបនៃគូប",
    description: "ចំពោះគូបដែលមានគែមប្រវែង s៖ មាឌ V = s³ និងផ្ទៃក្រឡាសរុប A = 6s²",
  },
  'g7-data-total-frequency': {
    title: "ប្រេកង់សរុប",
    description: "ផលបូកនៃប្រេកង់ទាំងអស់ក្នុងតារាងទិន្នន័យ N = ∑f",
  },
  'g7-data-relative-frequency': {
    title: "ប្រេកង់ធៀប",
    description: "ប្រេកង់ធៀបជាប្រភាគ ឬភាគរយនៃប្រភេទមួយធៀបនឹងចំនួនសរុប",
  },
  'g7-data-pie-angle': {
    title: "មុំផ្គុំនៃក្រាហ្វផ្លិតរង្វង់",
    description: "មុំផ្គុំនៃផ្នែកនីមួយៗក្នុងក្រាហ្វរង្វង់គឺ θ = (ប្រេកង់ / សរុប) · 360°",
  },
  'g7-averages-mean': {
    title: "មធ្យមនព្វន្ធ",
    description: "មធ្យមនៃសំណុំទិន្នន័យស្មើនឹងផលបូកតម្លៃទិន្នន័យទាំងអស់ចែកនឹងចំនួនទិន្នន័យ x̄ = (∑x)/n",
  },
  'g7-averages-median-position': {
    title: "ទីតាំងនៃមេដ្យាន",
    description: "ក្នុងសំណុំទិន្នន័យ n ដែលរៀបតាមលំដាប់ ទីតាំងមេដ្យានគឺ (n + 1)/2",
  },
  'g7-averages-range': {
    title: "ជួរតម្លៃ (Range)",
    description: "គម្លាតរវាងតម្លៃអតិបរមា និងតម្លៃអប្បបរមានៃទិន្នន័យ៖ Range = Max - Min",
  },
  'g7-probability-theoretical': {
    title: "ប្រូបាប៊ីលីតេទ្រឹស្តី",
    description: "ប្រូបាបនៃព្រឹត្តិការណ៍ A គឺ P(A) = n(A)/n(S) (លទ្ធផលស្រប / លទ្ធផលអាច)",
  },
  'g7-probability-complement': {
    title: "ប្រូបាប៊ីលីតេនៃព្រឹត្តិការណ៍បំពេញ",
    description: "ប្រូបាបនៃព្រឹត្តិការណ៍មិនកើតឡើងគឺ P(A') = 1 - P(A)",
  },
  'g7-probability-experimental': {
    title: "ប្រូបាប៊ីលីតេពិសោធន៍",
    description: "ប្រូបាបគណនាតាមប្រេកង់ជាក់ស្តែងនៃការពិសោធន៍ដដែលៗ",
  },
  'g8-real-numbers-rational-form': {
    title: "ទម្រង់ប្រភាគនៃចំនួនសនិទាន",
    description: "ចំនួនសនិទានជាចំនួនដែលអាចសរសេរជាទម្រង់ a/b ដែល a, b ជាចំនួនគត់ និង b ≠ 0",
  },
  'g8-real-numbers-recurring-fraction': {
    title: "បំប្លែងទសភាគខួបជាប្រភាគ",
    description: "វិធីសាស្ត្រពិជគណិតដើម្បីបំប្លែងទសភាគខួបដដែលៗទៅជាប្រភាគ",
  },
  'g8-real-numbers-order-roots': {
    title: "ការប្រៀបធៀបឫសការ៉េវិជ្ជមាន",
    description: "ចំពោះ a, b > 0៖ a < b លុះត្រាតែ √a < √b",
  },
  'g8-roots-square-definition': {
    title: "និយមន័យឫសការ៉េ",
    description: "ឫសការ៉េនៃ a ≥ 0 គឺជាចំនួនមិនអវិជ្ជមាន x ដែល x² = a",
  },
  'g8-roots-product-rule': {
    title: "រូបមន្តផលគុណនៃឫសការ៉េ",
    description: "ឫសការ៉េនៃផលគុណស្មើនឹងផលគុណនៃឫសការ៉េនីមួយៗ៖ √(ab) = √a · √b (a, b ≥ 0)",
  },
  'g8-roots-quotient-rule': {
    title: "រូបមន្តផលចែកនៃឫសការ៉េ",
    description: "ឫសការ៉េនៃផលចែកស្មើនឹងផលចែកនៃឫសការ៉េនីមួយៗ៖ √(a/b) = √a / √b (a ≥ 0, b > 0)",
  },
  'g8-roots-cube-definition': {
    title: "និយមន័យឫសគូប",
    description: "ឫសគូបនៃ a គឺជាចំនួន x ដែល x³ = a (កំណត់ចំពោះគ្រប់ចំនួនពិត a)",
  },
  'g8-sci-notation-standard-form': {
    title: "សញ្ញាណវិទ្យាសាស្ត្រស្តង់ដារ",
    description: "សរសេរចំនួនជាទម្រង់ a × 10ⁿ ដែល 1 ≤ |a| < 10 និង n ជាចំនួនគត់",
  },
  'g8-sci-notation-multiply': {
    title: "ការគុណក្នុងសញ្ញាណវិទ្យាសាស្ត្រ",
    description: "គុណមេគុណបញ្ចូលគ្នា និងបូកនិទស្សន្តនៃស្វ័យគុណដប់",
  },
  'g8-sci-notation-divide': {
    title: "ការចែកក្នុងសញ្ញាណវិទ្យាសាស្ត្រ",
    description: "ចែកមេគុណ និងដកនិទស្សន្តនៃស្វ័យគុណដប់",
  },
  'g8-linear-ineq-solve': {
    title: "ដោះស្រាយសមីការលីនេអ៊ែរមួយអថេរ",
    description: "ប្រើប្រតិបត្តិការបញ្ច្រាសដើម្បីផ្តាច់អថេរមួយនៅអង្គម្ខាងនៃសមីការ",
  },
  'g8-linear-ineq-both-sides': {
    title: "សមីការមានអថេរទាំងសងខាង",
    description: "ប្រមូលផ្តុំតួមានអថេរនៅអង្គម្ខាង និងតួថេរនៅអង្គម្ខាងទៀត",
  },
  'g8-linear-ineq-reversal': {
    title: "ច្បាប់ប្តូរទិសដៅវិសមភាព",
    description: "នៅពេលគុណ ឬចែកអង្គទាំងពីរនៃវិសមភាពនឹងចំនួនអវិជ្ជមាន ទិសដៅវិសមភាពត្រូវតែត្រឡប់បញ្ច្រាស",
  },
  'g8-linear-ineq-interval': {
    title: "សញ្ញាណចន្លោះ និងវិសមភាព",
    description: "តំណាងសំណុំចម្លើយវិសមភាពលើបន្ទាត់ចំនួន និងទម្រង់ចន្លោះ [a, b)",
  },
  'g8-polynomials-like-terms': {
    title: "ការបូកបង្រួមតួដូចគ្នាក្នុងពហុធា",
    description: "បូកបង្រួមឯកធាដែលមានអថេរ និងដឺក្រេដូចគ្នា",
  },
  'g8-polynomials-monomial-product': {
    title: "ផលគុណនៃឯកធា",
    description: "គុណមេគុណ និងបូកនិទស្សន្តនៃអថេរដូចគ្នា",
  },
  'g8-polynomials-binomial-square': {
    title: "ការ៉េនៃទ្វេធា (សមភាពគួរចងចាំ)",
    description: "រូបមន្តការ៉េនៃផលបូក និងផលដក៖ (a ± b)² = a² ± 2ab + b²",
  },
  'g8-polynomials-difference-squares': {
    title: "ផលដកការ៉េ (Difference of squares)",
    description: "ផលគុណនៃផលបូក និងផលដកស្មើនឹងផលដកការ៉េ៖ (a + b)(a - b) = a² - b²",
  },
  'g8-factorization-gcf': {
    title: "ការដាក់ជាកត្តារួមធំបំផុត",
    description: "ទាញកត្តារួមធំបំផុត (GCF) ចេញពីគ្រប់តួទាំងអស់នៃពហុធា",
  },
  'g8-factorization-difference-squares': {
    title: "ការដាក់ជាកត្តាតាមផលដកការ៉េ",
    description: "បំប្លែងផលដកការ៉េទៅជាផលគុណពីរទ្វេធា៖ a² - b² = (a + b)(a - b)",
  },
  'g8-factorization-monic-trinomial': {
    title: "ការដាក់ត្រីធាដឺក្រេទីពីរជាកត្តា",
    description: "ដាក់ x² + bx + c ជាកត្តា (x + p)(x + q) ដែល p + q = b និង pq = c",
  },
  'g8-linear-functions-slope': {
    title: "មេគុណប្រាប់ទិសពីពីរចំណុច (Gradient / Slope)",
    description: "មេគុណប្រាប់ទិសនៃបន្ទាត់កាត់តាម (x₁, y₁) និង (x₂, y₂) គឺ m = (y₂ - y₁) / (x₂ - x₁) (x₁ ≠ x₂)",
  },
  'g8-linear-functions-slope-intercept': {
    title: "ទម្រង់សមីការបន្ទាត់ y = mx + c (Slope-intercept form)",
    description: "សមីការបន្ទាត់ត្រង់ដែលមានមេគុណប្រាប់ទិស m និងចំណុចប្រសព្វលើអ័ក្សអរដោនេ c",
  },
  'g8-linear-functions-x-intercept': {
    title: "ចំណុចប្រសព្វលើអ័ក្សអាប់ស៊ីស (x-intercept)",
    description: "តម្លៃនៃ x នៅពេល y = 0៖ x = -c/m (ចំពោះ m ≠ 0)",
  },
  'g8-pythagoras-main': {
    title: "ទ្រឹស្តីបទពីតាករ",
    description: "ក្នុងត្រីកោណកែង ការ៉េនៃអ៊ីប៉ូតេនុសស្មើនឹងផលបូកការ៉េនៃជ្រុងជាប់មុំកែង៖ a² + b² = c²",
  },
  'g8-pythagoras-hypotenuse': {
    title: "ប្រវែងអ៊ីប៉ូតេនុស",
    description: "គណនាប្រវែងអ៊ីប៉ូតេនុសពីជ្រុងជាប់មុំកែងទាំងពីរ៖ c = √(a² + b²)",
  },
  'g8-pythagoras-leg': {
    title: "ប្រវែងជ្រុងជាប់មុំកែងដែលបាត់",
    description: "គណនាជ្រុងជាប់មុំកែងចេញពីអ៊ីប៉ូតេនុស និងជ្រុងមួយទៀត៖ a = √(c² - b²)",
  },
  'g8-pythagoras-converse': {
    title: "ទ្រឹស្តីបទច្រាសពីតាករ",
    description: "បើជ្រុងទាំងបីនៃត្រីកោណផ្ទៀងផ្ទាត់ a² + b² = c² នោះត្រីកោណនោះជាត្រីកោណកែង",
  },
  'g8-congruence-sss': {
    title: "លក្ខខណ្ឌសមភាពត្រីកោណ SSS (ជ្រុង-ជ្រុង-ជ្រុង)",
    description: "បើជ្រុងទាំងបីនៃត្រីកោណមួយស្មើនឹងជ្រុងទាំងបីនៃត្រីកោណមួយទៀត នោះត្រីកោណទាំងពីរជាត្រីកោណប៉ុនគ្នា (សមគ្នា)",
  },
  'g8-congruence-translation': {
    title: "បំប្លែងបណ្ដែតក្នុងប្លង់កូអរដោនេ",
    description: "បំប្លែងចំណុច (x, y) ទៅ (x + a, y + b) តាមវ៉ិចទ័របណ្ដែត (a, b)",
  },
  'g8-congruence-reflection-y': {
    title: "ចំណាំងឆ្លុះធៀបនឹងអ័ក្សអរដោនេ (y-axis)",
    description: "ចំណាំងឆ្លុះធៀបនឹងអ័ក្ស y ប្តូរចំណុច (x, y) ទៅ (-x, y)",
  },
  'g8-congruence-rotation-90': {
    title: "រង្វិល 90° ច្រាសទ្រនិចនាឡិកា",
    description: "រង្វិល 90° ជុំវិញគល់តម្រុយប្តូរចំណុច (x, y) ទៅ (-y, x)",
  },
  'g8-quadrilaterals-angle-sum': {
    title: "ផលបូកមុំក្នុងនៃចតុកោណ",
    description: "ផលបូកនៃរង្វាស់មុំក្នុងទាំងបួននៃចតុកោណប៉ោងស្មើ 360° ជានិច្ច",
  },
  'g8-quadrilaterals-opposite-angles': {
    title: "មុំឈមនៃប៉ារ៉ាឡេឡូក្រាម",
    description: "មុំឈមនៃប៉ារ៉ាឡេឡូក្រាមមានរង្វាស់ស្មើគ្នាពីរៗ",
  },
  'g8-quadrilaterals-consecutive-angles': {
    title: "មុំជាប់គ្នានៃប៉ារ៉ាឡេឡូក្រាម",
    description: "មុំជាប់គ្នាពីរនៃប៉ារ៉ាឡេឡូក្រាមជាមុំបន្ថែមគ្នា (ផលបូកស្មើ 180°)",
  },
  'g8-data-displays-relative-frequency': {
    title: "ប្រេកង់ធៀបនៃថ្នាក់ទិន្នន័យ",
    description: "ផលធៀបរវាងប្រេកង់នៃថ្នាក់នីមួយៗ ធៀបនឹងទំហំគំរូសរុប",
  },
  'g8-data-displays-class-width': {
    title: "ទំហំថ្នាក់នៃហ៊ីស្តូក្រាម",
    description: "គម្លាតរវាងកម្រិតព្រំដែនខាងលើ និងខាងក្រោមនៃថ្នាក់នីមួយៗ",
  },
  'g8-data-displays-frequency-mean': {
    title: "មធ្យមនព្វន្ធពីតារាងប្រេកង់",
    description: "គណនាមធ្យមដោយបូកផលគុណប្រេកង់ និងតម្លៃកណ្តាលថ្នាក់ x̄ = (∑fx) / (∑f)",
  },
  'g8-compound-prob-basic': {
    title: "ប្រូបាបនៃលទ្ធផលមានឱកាសស្មើគ្នា",
    description: "ប្រូបាបនៃព្រឹត្តិការណ៍ស្មើនឹងចំនួនលទ្ធផលអំណោយផលចែកនឹងចំនួនលទ្ធផលសរុប",
  },
  'g8-compound-prob-and-independent': {
    title: "ច្បាប់ផលគុណចំពោះព្រឹត្តិការណ៍ឯករាជ្យ (AND Rule)",
    description: "បើ A និង B ឯករាជ្យគ្នា នោះប្រូបាប៊ីលីតេនៃ A និង B កើតឡើងព្រមគ្នាគឺ P(A ∩ B) = P(A) · P(B)",
  },
  'g8-compound-prob-or-exclusive': {
    title: "ច្បាប់ផលបូកចំពោះព្រឹត្តិការណ៍មិនចុះសម្រុង (OR Rule)",
    description: "បើ A និង B មិនចុះសម្រុងគ្នា (គ្មានធាតុរួម) នោះ P(A ∪ B) = P(A) + P(B)",
  },
  'g8-compound-prob-complement': {
    title: "ច្បាប់ព្រឹត្តិការណ៍បំពេញ",
    description: "ប្រូបាបនៃព្រឹត្តិការណ៍បំពេញគឺ P(A') = 1 - P(A)",
  },
  'g9-radicals-product': {
    title: "លក្ខណៈផលគុណនៃឫសការ៉េ",
    description: "ឫសការ៉េនៃផលគុណស្មើនឹងផលគុណនៃឫសការ៉េ៖ √(ab) = √a · √b (a, b ≥ 0)",
  },
  'g9-radicals-quotient': {
    title: "លក្ខណៈផលចែកនៃឫសការ៉េ",
    description: "ឫសការ៉េនៃផលចែកស្មើនឹងផលចែកនៃឫសការ៉េ៖ √(a/b) = √a / √b (a ≥ 0, b > 0)",
  },
  'g9-radicals-simplify': {
    title: "ការសម្រួលកន្សោមរ៉ាឌីកាល់",
    description: "ទាញកត្តាការ៉េពេញលេញចេញក្រៅរ៉ាឌីកាល់ √(a²b) = a√b (a ≥ 0)",
  },
  'g9-radicals-rationalize': {
    title: "សនិទានកម្មភាគបែង (Rationalizing denominator)",
    description: "គុណភាគយក និងភាគបែងនឹងរ៉ាឌីកាល់ដើម្បីបំបាត់ឫសពីភាគបែង",
  },
  'g9-factor-gcf': {
    title: "ការដាក់ជាកត្តារួមធំបំផុត",
    description: "ទាញកត្តារួមចេញពីគ្រប់តួនៃពហុធា៖ ab + ac = a(b + c)",
  },
  'g9-factor-difference-squares': {
    title: "ការដាក់ជាកត្តាតាមផលដកការ៉េ",
    description: "រូបមន្តផលដកការ៉េ a² - b² = (a + b)(a - b)",
  },
  'g9-factor-perfect-square': {
    title: "ត្រីធាការ៉េពេញលេញ",
    description: "រូបមន្តការ៉េពេញលេញ a² ± 2ab + b² = (a ± b)²",
  },
  'g9-factor-trinomial': {
    title: "ការដាក់ត្រីធាដឺក្រេទីពីរជាកត្តា",
    description: "បំប្លែង x² + bx + c = (x + p)(x + q) ដែល p + q = b និង pq = c",
  },
  'g9-quadratic-intro-standard': {
    title: "ទម្រង់ស្តង់ដារនៃសមីការដឺក្រេទីពីរ",
    description: "ទម្រង់ទូទៅ ax² + bx + c = 0 ដែល a ≠ 0",
  },
  'g9-quadratic-intro-zero-product': {
    title: "លក្ខណៈផលគុណសូន្យ (Zero-product property)",
    description: "បើ ab = 0 នោះ a = 0 ឬ b = 0",
  },
  'g9-quadratic-intro-square-root': {
    title: "វិធីសាស្ត្រទាញឫសការ៉េ",
    description: "បើ x² = k (k ≥ 0) នោះ x = ±√k",
  },
  'g9-quadratic-intro-factored': {
    title: "ចម្លើយចេញពីទម្រង់កត្តា",
    description: "សមីការ (x - p)(x - q) = 0 មានឫសពីរគឺ x = p និង x = q",
  },
  'g9-systems-standard': {
    title: "ទម្រង់ស្តង់ដារនៃប្រព័ន្ធសមីការលីនេអ៊ែរ",
    description: "ប្រព័ន្ធសមីការពីរអថេរ a₁x + b₁y = c₁ និង a₂x + b₂y = c₂",
  },
  'g9-systems-substitution': {
    title: "វិធីសាស្ត្រជំនួសក្នុងប្រព័ន្ធសមីការ",
    description: "ទាញអថេរមួយពីសមីការទីមួយ រួចយកទៅជំនួសក្នុងសមីការទីពីរ",
  },
  'g9-systems-slope-test': {
    title: "ចំនួនចម្លើយតាមរយៈមេគុណប្រាប់ទិស",
    description: "ប្រៀបធៀបមេគុណប្រាប់ទិសដើម្បីដឹងថាប្រព័ន្ធសមីការមានចម្លើយមួយ គ្មានចម្លើយ ឬមានចម្លើយរាប់មិនអស់",
  },
  'g9-functions-notation': {
    title: "សញ្ញាណអនុគមន៍ (Function notation)",
    description: "សញ្ញាណ f(x) តំណាងឲ្យតម្លៃបញ្ចេញនៃអនុគមន៍ f ចំពោះតម្លៃបញ្ចូល x",
  },
  'g9-functions-linear': {
    title: "អនុគមន៍លីនេអ៊ែរ (Linear function)",
    description: "អនុគមន៍លីនេអ៊ែរមានទម្រង់ f(x) = mx + c ដែល m ជាមេគុណប្រាប់ទិស (ជម្រាល) និង c ជាកូអរដោនេលើអ័ក្សអរដោនេត្រង់ចំណុចប្រសព្វ",
  },
  'g9-functions-rate': {
    title: "អត្រាបម្រែបម្រួលមធ្យម (Average rate of change)",
    description: "អត្រាបម្រែបម្រួលនៃ f លើចន្លោះ [a, b] គឺ (f(b) - f(a)) / (b - a)",
  },
  'g9-similarity-scale-factor': {
    title: "មេគុណមាត្រដ្ឋាននៃភាពស្រដៀង",
    description: "ផលធៀបរវាងប្រវែងជ្រុងត្រូវគ្នានៃរូបស្រដៀងពីរគឺ k = a'/a",
  },
  'g9-similarity-side-ratio': {
    title: "ជ្រុងសមាមាត្រនៃត្រីកោណស្រដៀង",
    description: "ក្នុងត្រីកោណស្រដៀង ផលធៀបនៃជ្រុងត្រូវគ្នាទាំងអស់មានតម្លៃស្មើគ្នា",
  },
  'g9-similarity-area-ratio': {
    title: "ផលធៀបផ្ទៃក្រឡានៃរូបស្រដៀង",
    description: "ផលធៀបផ្ទៃក្រឡានៃរូបស្រដៀងពីរស្មើនឹងការ៉េនៃមេគុណមាត្រដ្ឋាន k²",
  },
  'g9-similarity-dilation': {
    title: "បំប្លែងពង្រីក-បង្រួមក្នុងប្លង់កូអរដោនេ",
    description: "បំប្លែងពង្រីកធៀបនឹងគល់តម្រុយមេគុណ k ប្តូរ (x, y) ទៅ (kx, ky)",
  },
  'g9-circles-central-angle': {
    title: "មុំផ្ចិត និងធ្នូរង្វង់",
    description: "រង្វាស់មុំផ្ចិតគិតជាដឺក្រេស្មើនឹងរង្វាស់នៃធ្នូស្កាត់ដោយមុំនោះ",
  },
  'g9-circles-inscribed-angle': {
    title: "ទ្រឹស្តីបទមុំចារឹកក្នុងរង្វង់",
    description: "រង្វាស់មុំចារឹកក្នុងរង្វង់ស្មើពាក់កណ្តាលនៃរង្វាស់ធ្នូស្កាត់ ឬពាក់កណ្តាលមុំផ្ចិតត្រូវគ្នា",
  },
  'g9-circles-tangent-radius': {
    title: "លក្ខណៈកែងនៃបន្ទាត់ប៉ះ និងកាំរង្វង់",
    description: "បន្ទាត់ប៉ះនឹងរង្វង់តែងតែកែងនឹងកាំត្រង់ចំណុចប៉ះជានិច្ច",
  },
  'g9-circles-chord-distance': {
    title: "ចម្ងាយពីផ្ចិតទៅអង្កត់ធ្នូ",
    description: "កាំរង្វង់កែងនឹងអង្កត់ធ្នូ ចែកអង្កត់ធ្នូនោះជាពីរស្មើគ្នា និងផ្ទៀងផ្ទាត់ r² = d² + (c/2)²",
  },
  'g9-solids-cylinder': {
    title: "មាឌស៊ីឡាំង (Volume of cylinder)",
    description: "មាឌនៃស៊ីឡាំងដែលមានកាំបាត r និងកម្ពស់ h គឺ V = πr²h",
  },
  'g9-solids-cone': {
    title: "មាឌកោណ (Volume of cone)",
    description: "មាឌនៃកោណដែលមានកាំបាត r និងកម្ពស់ h គឺ V = (1/3)πr²h",
  },
  'g9-solids-sphere-volume': {
    title: "មាឌស្វ៊ែរ (Volume of sphere)",
    description: "មាឌនៃស្វ៊ែរដែលមានកាំ r គឺ V = (4/3)πr³",
  },
  'g9-solids-sphere-surface': {
    title: "ផ្ទៃក្រឡាសរុបនៃស្វ៊ែរ",
    description: "ផ្ទៃក្រឡាសរុបនៃស្វ៊ែរដែលមានកាំ r គឺ A = 4πr²",
  },
  'g9-cartesian-quadrants': {
    title: "សញ្ញាកូអរដោនេតាមកាដ្រង់ទាំងបួន",
    description: "កាដ្រង់ I (+,+), កាដ្រង់ II (-,+), កាដ្រង់ III (-,-), កាដ្រង់ IV (+,-)",
  },
  'g9-cartesian-vertical-line': {
    title: "សមីការបន្ទាត់ឈរ",
    description: "បន្ទាត់ឈរកាត់តាមអាប់ស៊ីស a មានសមីការ x = a (គ្មានមេគុណប្រាប់ទិស)",
  },
  'g9-cartesian-horizontal-line': {
    title: "សមីការបន្ទាត់ផ្ដេក",
    description: "បន្ទាត់ផ្ដេកកាត់តាមអរដោនេ b មានសមីការ y = b (មេគុណប្រាប់ទិស m = 0)",
  },
  'g9-distance-formula': {
    title: "រូបមន្តចម្ងាយរវាងពីរចំណុច (Distance formula)",
    description: "ចម្ងាយរវាងចំណុច (x₁, y₁) និង (x₂, y₂) លើប្លង់កូអរដោនេគឺ d = √((x₂ - x₁)² + (y₂ - y₁)²);",
  },
  'g9-distance-midpoint': {
    title: "រូបមន្តចំណុចកណ្តាល (Midpoint formula)",
    description: "ចំណុចកណ្តាលនៃអង្កត់ភ្ជាប់ (x₁, y₁) និង (x₂, y₂) គឺ M = ((x₁ + x₂)/2, (y₁ + y₂)/2)",
  },
  'g9-distance-slope': {
    title: "មេគុណប្រាប់ទិសនៃអង្កត់ (Slope / Gradient)",
    description: "មេគុណប្រាប់ទិស m = (y₂ - y₁) / (x₂ - x₁) ចំពោះ x₁ ≠ x₂",
  },
  'g9-scatter-best-fit': {
    title: "បន្ទាត់តម្រែតម្រង់ល្អបំផុត (Line of best fit)",
    description: "បន្ទាត់លីនេអ៊ែរដែលតំណាងឲ្យនិន្នាការនៃទិន្នន័យពីរអថេរ",
  },
  'g9-scatter-slope': {
    title: "ការបកស្រាយមេគុណប្រាប់ទិសនៃបន្ទាត់តម្រែតម្រង់",
    description: "ការកើនឡើងនៃអថេរ y ចំពោះការកើនឡើងមួយឯកតានៃអថេរ x",
  },
  'g9-scatter-residual': {
    title: "សំណល់ (Residual)",
    description: "ផលដករវាងតម្លៃជាក់ស្តែងដែលសង្កេតបាន និងតម្លៃព្យាករណ៍តាមបន្ទាត់តម្រែតម្រង់",
  },
  'g9-spread-range': {
    title: "ជួរតម្លៃនៃទិន្នន័យ (Range)",
    description: "គម្លាតរវាងតម្លៃអតិបរមា និងតម្លៃអប្បបរមា៖ Range = Max - Min",
  },
  'g9-spread-iqr': {
    title: "ចន្លោះកាតេទីល (Interquartile range - IQR)",
    description: "គម្លាតរវាងកាតេទីលទីបី និងកាតេទីលទីមួយ៖ IQR = Q₃ - Q₁",
  },
  'g9-spread-outlier-fences': {
    title: "ព្រំដែនតម្លៃខុសប្រក្រតី (Outlier fences)",
    description: "តម្លៃទិន្នន័យខុសប្រក្រតីស្ថិតនៅក្រៅចន្លោះ [Q₁ - 1.5·IQR, Q₃ + 1.5·IQR]",
  },
  'g10-quadratic-formula-standard': {
    title: "រូបមន្តសមីការដឺក្រេទីពីរ",
    description: "ផ្តល់ឫសជាចំនួនពិតនៃសមីការដឺក្រេទីពីរដែលសរសេរក្នុងទម្រង់ស្តង់ដារ ax² + bx + c = 0",
  },
  'g10-quadratic-discriminant': {
    title: "ឌីស្គ្រីមីណង់ (Discriminant)",
    description: "កំណត់ចំនួន និងលក្ខណៈនៃឫសសមីការ ax² + bx + c = 0 ដោយមិនបាច់ដោះស្រាយសមីការ",
  },
  'g10-quadratic-completing-square': {
    title: "អត្តសញ្ញាណបំពេញការ៉េ",
    description: "សរសេរកន្សោមដឺក្រេទីពីរឡើងវិញជាផលបូកការ៉េពេញលេញ និងចំនួនថេរ ដើម្បីបង្ហាញកូអរដោនេកំពូល",
  },
  'g10-quadratic-vertex-form': {
    title: "ទម្រង់កំពូលនៃប៉ារ៉ាបូល (Vertex form)",
    description: "សមីការ y = a(x - h)² + k ដែលមានកំពូលត្រង់ចំណុច (h, k)",
  },
  'g10-functions-translation': {
    title: "ការបណ្ដែតក្រាហ្វនៃអនុគមន៍",
    description: "ក្រាហ្វ y = f(x - h) + k គឺជាការបណ្ដែតក្រាហ្វ y = f(x) ចម្ងាយ h តាមផ្ដេក និង k តាមឈរ",
  },
  'g10-functions-stretch-reflection': {
    title: "ការពង្រីក និងចំណាំងឆ្លុះនៃក្រាហ្វ",
    description: "មេគុណ a ក្នុង y = af(x) ពង្រីកក្រាហ្វតាមទិសឈរ ហើយឆ្លុះធៀបនឹងអ័ក្ស x ប្រសិនបើ a < 0",
  },
  'g10-functions-absolute-value': {
    title: "អនុគមន៍តម្លៃដាច់ខាតដែលបានបំប្លែង",
    description: "ក្រាហ្វ y = a|x - h| + k មានកំពូលត្រង់ (h, k) និងរាងអក្សរ V",
  },
  'g10-functions-even-odd': {
    title: "អនុគមន៍គូ និងអនុគមន៍សេស",
    description: "អនុគមន៍គូផ្ទៀងផ្ទាត់ f(-x) = f(x) (ឆ្លុះធៀបនឹងអ័ក្ស y) អនុគមន៍សេស f(-x) = -f(x) (ឆ្លុះធៀបនឹងគល់ O)",
  },
  'g10-exponential-model': {
    title: "គំរូកំណើន និងថយចុះអិចស្ប៉ូណង់ស្យែល",
    description: "រូបមន្ត y = abˣ ដែល a ជាតម្លៃដើម និង b ជាកត្តាកំណើន (b > 1) ឬកត្តាថយចុះ (0 < b < 1)",
  },
  'g10-exponential-compound-interest': {
    title: "រូបមន្តការប្រាក់ផ្សំ (Compound interest)",
    description: "ប្រាក់សរុបទទួលបានគឺ A = P(1 + r/n)ⁿᵗ",
  },
  'g10-exponential-half-life': {
    title: "ការថយចុះតាមកន្លះជីវិត (Half-life decay)",
    description: "បរិមាណដែលនៅសល់គឺ N(t) = N₀(1/2)^(t / t_half)",
  },
  'g10-inequalities-boundary': {
    title: "បន្ទាត់ព្រំដែននៃកន្លះប្លង់",
    description: "បន្ទាត់ ax + by = c បែងចែកប្លង់ជាពីរកន្លះប្លង់ចម្លើយនៃវិសមភាព",
  },
  'g10-inequalities-system': {
    title: "ប្រព័ន្ធវិសមីការលីនេអ៊ែរ",
    description: "តំបន់ចម្លើយគឺជាតំបន់ប្រសព្វគ្នានៃកន្លះប្លង់ទាំងអស់ដែលផ្ទៀងផ្ទាត់ប្រព័ន្ធ",
  },
  'g10-inequalities-objective': {
    title: "អនុគមន៍គោលដៅលីនេអ៊ែរ (Objective function)",
    description: "តម្លៃអតិបរមា ឬអប្បបរមានៃ Z = ax + by តែងតែកើតឡើងត្រង់កំពូលនៃតំបន់ចម្លើយ",
  },
  'g10-proofs-triangle-angle-sum': {
    title: "សម្រាយបញ្ជាក់ផលបូកមុំត្រីកោណ",
    description: "គូសបន្ទាត់ស្របកាត់តាមកំពូលមួយ បង្ហាញថាមុំទាំងបីផ្គុំគ្នាបាន 180°",
  },
  'g10-proofs-exterior-angle': {
    title: "ទ្រឹស្តីបទមុំក្រៅនៃត្រីកោណ",
    description: "មុំក្រៅនៃត្រីកោណស្មើផលបូកមុំក្នុងមិនជាប់ទាំងពីរ",
  },
  'g10-proofs-isosceles-base-angles': {
    title: "ទ្រឹស្តីបទត្រីកោណសមបាត",
    description: "ក្នុងត្រីកោណសមបាត មុំបាតទាំងពីរមានរង្វាស់ស្មើគ្នាជានិច្ច",
  },
  'g10-transformations-translation': {
    title: "វិធានបំប្លែងបណ្ដែត",
    description: "បណ្ដែតចំណុចក្នុងប្លង់កូអរដោនេ (x, y) ↦ (x + a, y + b)",
  },
  'g10-transformations-reflection-x': {
    title: "ចំណាំងឆ្លុះធៀបនឹងអ័ក្សអាប់ស៊ីស (x-axis)",
    description: "ឆ្លុះចំណុច (x, y) ធៀបនឹងអ័ក្ស x ទទួលបាន (x, -y)",
  },
  'g10-transformations-reflection-y': {
    title: "ចំណាំងឆ្លុះធៀបនឹងអ័ក្សអរដោនេ (y-axis)",
    description: "ឆ្លុះចំណុច (x, y) ធៀបនឹងអ័ក្ស y ទទួលបាន (-x, y)",
  },
  'g10-transformations-rotation-90': {
    title: "រង្វិល 90° ជុំវិញគល់តម្រុយ",
    description: "រង្វិល 90° ច្រាសទ្រនិចនាឡិកាប្តូរ (x, y) ↦ (-y, x)",
  },
  'g10-circles-inscribed-angle': {
    title: "ទ្រឹស្តីបទមុំចារឹកក្នុងរង្វង់",
    description: "រង្វាស់មុំចារឹកក្នុងរង្វង់ស្មើពាក់កណ្តាលមុំផ្ចិតដែលស្កាត់ធ្នូជាមួយគ្នា",
  },
  'g10-circles-cyclic-quadrilateral': {
    title: "មុំឈមនៃចតុកោណចារឹកក្នុងរង្វង់",
    description: "ផលបូកនៃមុំឈមទាំងពីរនៃចតុកោណចារឹកក្នុងរង្វង់ស្មើ 180° ជានិច្ច",
  },
  'g10-circles-alternate-segment': {
    title: "ទ្រឹស្តីបទកំណាត់ធ្នូឆ្លាស់",
    description: "មុំបង្កើតដោយបន្ទាត់ប៉ះ និងអង្កត់ធ្នូស្មើនឹងមុំចារឹកក្នុងស្កាត់អង្កត់ធ្នូនោះ",
  },
  'g10-circles-tangent-lengths': {
    title: "ប្រវែងបន្ទាត់ប៉ះគូសចេញពីចំណុចក្រៅរង្វង់",
    description: "អង្កត់ប៉ះទាំងពីរគូសចេញពីចំណុចមួយនៅក្រៅរង្វង់ទៅកាន់រង្វង់មានប្រវែងស្មើគ្នា",
  },
  'g10-lines-slope': {
    title: "មេគុណប្រាប់ទិសរវាងពីរចំណុច (Slope)",
    description: "មេគុណប្រាប់ទិសនៃបន្ទាត់ m = (y₂ - y₁) / (x₂ - x₁) (x₁ ≠ x₂)",
  },
  'g10-lines-slope-intercept': {
    title: "ទម្រង់សមីការបន្ទាត់ y = mx + c (Slope-intercept form)",
    description: "សមីការបន្ទាត់ត្រង់ដែលមានមេគុណប្រាប់ទិស m និងចំណុចប្រសព្វអ័ក្សអរដោនេ c",
  },
  'g10-lines-point-slope': {
    title: "ទម្រង់សមីការបន្ទាត់តាមមួយចំណុច និងមេគុណប្រាប់ទិស",
    description: "សមីការបន្ទាត់កាត់តាម (x₁, y₁) មានមេគុណប្រាប់ទិស m គឺ y - y₁ = m(x - x₁) ",
  },
  'g10-lines-perpendicular': {
    title: "លក្ខខណ្ឌនៃបន្ទាត់កែងគ្នា",
    description: "បន្ទាត់ពីរមិនឈរកែងគ្នា លុះត្រាតែផលគុណមេគុណប្រាប់ទិសរបស់វាស្មើ -1៖ m₁ · m₂ = -1",
  },
  'g10-trig-sine-ratio': {
    title: "អនុបាតស៊ីនុស (Sine)",
    description: "ផលធៀបរវាងជ្រុងឈម និងអ៊ីប៉ូតេនុសក្នុងត្រីកោណកែង៖ sin θ = ឈម / អ៊ីប៉ូតេនុស",
  },
  'g10-trig-cosine-ratio': {
    title: "អនុបាតកូស៊ីនុស (Cosine)",
    description: "ផលធៀបរវាងជ្រុងជាប់ និងអ៊ីប៉ូតេនុសក្នុងត្រីកោណកែង៖ cos θ = ជាប់ / អ៊ីប៉ូតេនុស",
  },
  'g10-trig-tangent-ratio': {
    title: "អនុបាតតង់សង់ (Tangent)",
    description: "ផលធៀបរវាងជ្រុងឈម និងជ្រុងជាប់ក្នុងត្រីកោណកែង៖ tan θ = ឈម / ជាប់",
  },
  'g10-trig-pythagorean-identity': {
    title: "អត្តសញ្ញាណត្រីកោណមាត្រពីតាករ",
    description: "ផលបូកការ៉េស៊ីនុស និងកូស៊ីនុសស្មើ 1 ជានិច្ច៖ sin² θ + cos² θ = 1",
  },
  'g10-trig-sine-rule': {
    title: "ច្បាប់ស៊ីនុស (Sine rule)",
    description: "ក្នុងគ្រប់ត្រីកោណទាំងអស់៖ a / sin A = b / sin B = c / sin C = 2R",
  },
  'g10-trig-cosine-rule': {
    title: "ច្បាប់កូស៊ីនុសសម្រាប់គណនាជ្រុង (Cosine rule)",
    description: "ក្នុងគ្រប់ត្រីកោណទាំងអស់៖ a² = b² + c² - 2bc cos A",
  },
  'g10-trig-cosine-angle': {
    title: "ច្បាប់កូស៊ីនុសសម្រាប់គណនាមុំ",
    description: "គណនាមុំពីប្រវែងជ្រុងទាំងបី៖ cos A = (b² + c² - a²) / (2bc)",
  },
  'g10-trig-area-formula': {
    title: "ផ្ទៃក្រឡាត្រីកោណតាមអនុបាតស៊ីនុស",
    description: "ផ្ទៃក្រឡាត្រីកោណស្មើកន្លះផលគុណជ្រុងពីរ និងស៊ីនុសមុំរវាងជ្រុងទាំងពីរ៖ Area = (1/2)ab sin C",
  },
  'g11-poly-general': {
    title: "ទម្រង់ទូទៅនៃពហុធា",
    description: "ពហុធាដឺក្រេ n៖ P(x) = aₙxⁿ + aₙ₋₁xⁿ⁻¹ + ... + a₁x + a₀ (aₙ ≠ 0)",
  },
  'g11-poly-division': {
    title: "ក្បួនចែកពហុធា (Division algorithm)",
    description: "ចែកពហុធា P(x) នឹង D(x) ទទួលបានផលចែក Q(x) និងសំណល់ R(x)៖ P(x) = D(x)Q(x) + R(x)",
  },
  'g11-poly-remainder': {
    title: "ទ្រឹស្តីបទសំណល់ (Remainder theorem)",
    description: "សំណល់នៃការចែកពហុធា P(x) នឹង (x - c) គឺស្មើនឹង P(c)",
  },
  'g11-poly-factor': {
    title: "ទ្រឹស្តីបទកត្តា (Factor theorem)",
    description: "(x - c) ជាកត្តានៃពហុធា P(x) លុះត្រាតែ P(c) = 0 (c ជាឫសនៃ P)",
  },
  'g11-explog-definition': {
    title: "និយមន័យលោការីត",
    description: "y = log_b(x) លុះត្រាតែ bʸ = x (b > 0, b ≠ 1, x > 0)",
  },
  'g11-explog-laws': {
    title: "ច្បាប់គ្រឹះនៃលោការីត",
    description: "log(xy) = log x + log y, log(x/y) = log x - log y, log(xᵏ) = k log x",
  },
  'g11-explog-change-base': {
    title: "រូបមន្តប្តូរគោលលោការីត",
    description: "ប្តូរទៅគោលថ្មី a៖ log_b(x) = log_a(x) / log_a(b)",
  },
  'g11-explog-compound': {
    title: "គំរូកំណើនបន្ត (Continuous compounding)",
    description: "រូបមន្តកំណើនបន្តតាមគោលអយល័រ e៖ A = Peʳᵗ",
  },
  'g11-seq-arith-nth': {
    title: "តួទី n នៃស្វ៊ីតនព្វន្ធ",
    description: "រូបមន្តតួទី n នៃស្វ៊ីតនព្វន្ធ៖ uₙ = u₁ + (n - 1)d",
  },
  'g11-seq-arith-sum': {
    title: "ផលបូក n តួដំបូងនៃស្វ៊ីតនព្វន្ធ",
    description: "ផលបូកស៊េរីនព្វន្ធ Sₙ = (n/2)(u₁ + uₙ) = (n/2)[2u₁ + (n - 1)d]",
  },
  'g11-seq-geom-nth': {
    title: "តួទី n នៃស្វ៊ីតធរណីមាត្រ",
    description: "រូបមន្តតួទី n នៃស្វ៊ីតធរណីមាត្រដែលមានផលធៀបរួម q៖ uₙ = u₁ · qⁿ⁻¹",
  },
  'g11-seq-geom-sum': {
    title: "ផលបូក n តួដំបូងនៃស្វ៊ីតធរណីមាត្រ",
    description: "ផលបូកស៊េរីធរណីមាត្រ Sₙ = u₁(1 - qⁿ) / (1 - q) (q ≠ 1)",
  },
  'g11-invcomp-composite': {
    title: "អនុគមន៍បណ្ដាក់ (Composite function)",
    description: "អនុគមន៍បណ្ដាក់ (f ∘ g)(x) = f(g(x)) អនុវត្ត g មុន បន្ទាប់មកអនុវត្ត f",
  },
  'g11-invcomp-inverse': {
    title: "អនុគមន៍ច្រាស (Inverse function)",
    description: "អនុគមន៍ច្រាស f⁻¹(x) ផ្ទៀងផ្ទាត់ f(a) = b លុះត្រាតែ f⁻¹(b) = a",
  },
  'g11-invcomp-identity': {
    title: "អត្តសញ្ញាណបណ្ដាក់នៃអនុគមន៍ច្រាស",
    description: "(f ∘ f⁻¹)(x) = x និង (f⁻¹ ∘ f)(x) = x ចំពោះគ្រប់ x ក្នុងដែនកំណត់",
  },
  'g11-circle-standard': {
    title: "សមីការស្តង់ដារនៃរង្វង់",
    description: "រង្វង់ផ្ចិត (h, k) និងកាំ r មានសមីការ (x - h)² + (y - k)² = r²",
  },
  'g11-circle-general': {
    title: "សមីការទូទៅនៃរង្វង់",
    description: "ទម្រង់ទូទៅ x² + y² + 2gx + 2fy + c = 0 ដែលផ្ចិត (-g, -f) និងកាំ r = √(g² + f² - c)",
  },
  'g11-circle-centre-radius': {
    title: "ផ្ចិត និងកាំពីរូបមន្តទូទៅ",
    description: "កូអរដោនេផ្ចិត និងកាំគណនាដោយផ្ទាល់ពីមេគុណនៃសមីការទូទៅ",
  },
  'g11-circle-tangent': {
    title: "លក្ខខណ្ឌបន្ទាត់ប៉ះនឹងរង្វង់",
    description: "បន្ទាត់ប៉ះនឹងរង្វង់ លុះត្រាតែចម្ងាយពីផ្ចិតទៅបន្ទាត់ស្មើនឹងកាំ r",
  },
  'g11-parabola-locus': {
    title: "សមីការទីតាំងនៃប៉ារ៉ាបូល (Focus-Directrix)",
    description: "សំណុំចំណុចដែលស្មើចម្ងាយពីកំណុំ F និងបន្ទាត់ប្រាប់ទិស d៖ d(P, F) = d(P, d)",
  },
  'g11-parabola-standard': {
    title: "ទម្រង់ស្តង់ដារនៃប៉ារ៉ាបូលអ័ក្សផ្ដេក",
    description: "កំពូល (0,0) អ័ក្សឆ្លុះផ្ដេក y² = 4px ដែលកំណុំ (p, 0) និងបន្ទាត់ប្រាប់ទិស x = -p",
  },
  'g11-parabola-vertical': {
    title: "ទម្រង់ស្តង់ដារនៃប៉ារ៉ាបូលអ័ក្សឈរ",
    description: "កំពូល (h, k) អ័ក្សឆ្លុះឈរ (x - h)² = 4p(y - k) ដែលកំណុំ (h, k + p)",
  },
  'g11-parabola-latus': {
    title: "ប្រវែងឡាទូសរ៉ិចទុម (Latus rectum)",
    description: "អង្កត់កាត់តាមកំណុំកែងនឹងអ័ក្សឆ្លុះនៃប៉ារ៉ាបូលមានប្រវែង |4p|",
  },
  'g11-unitrig-radian': {
    title: "ការបំប្លែងដឺក្រេ និងរ៉ាដ្យង់",
    description: "ទំនាក់ទំនងរវាងមុំជាដឺក្រេ និងរ៉ាដ្យង់៖ 180° = π rad",
  },
  'g11-unitrig-definition': {
    title: "និយមន័យត្រីកោណមាត្រលើរង្វង់ឯកតា",
    description: "ចំណុចលើរង្វង់ឯកតាមានកូអរដោនេ (cos θ, sin θ) ដែល θ ជាមុំផ្ចិត",
  },
  'g11-unitrig-arc': {
    title: "ប្រវែងធ្នូរង្វង់ (Arc length)",
    description: "ប្រវែងធ្នូស្កាត់ដោយមុំផ្ចិត θ (គិតជារ៉ាដ្យង់) គឺ s = rθ",
  },
  'g11-unitrig-sinusoid': {
    title: "ប៉ារ៉ាម៉ែត្រនៃអនុគមន៍ស៊ីនុសូអ៊ីដ",
    description: "អនុគមន៍ y = A sin(Bx - C) + D ដែលអំភ្លីទុត |A|, ខួប T = 2π/|B|, គម្លាតដំណាក់ C/B",
  },
  'g11-trigid-pythagorean': {
    title: "អត្តសញ្ញាណពីតាករនៃត្រីកោណមាត្រ",
    description: "sin² θ + cos² θ = 1, 1 + tan² θ = 1/cos² θ, 1 + cot² θ = 1/sin² θ",
  },
  'g11-trigid-quotient-reciprocal': {
    title: "រូបមន្តផលធៀប និងចម្រាសត្រីកោណមាត្រ",
    description: "tan θ = sin θ / cos θ, cot θ = cos θ / sin θ",
  },
  'g11-trigid-double': {
    title: "រូបមន្តមុំទ្វេ (Double-angle identities)",
    description: "sin 2θ = 2 sin θ cos θ, cos 2θ = cos² θ - sin² θ = 2 cos² θ - 1",
  },
  'g11-trigid-general': {
    title: "ទម្រង់ចម្លើយទូទៅនៃសមីការត្រីកោណមាត្រ",
    description: "sin x = sin α នាំឲ្យ x = α + 2kπ ឬ x = π - α + 2kπ (k ∈ ℤ)",
  },
  'g11-vec2-magnitude': {
    title: "ម៉ូឌុល (ប្រវែង) នៃវ៉ិចទ័រក្នុងប្លង់",
    description: "ម៉ូឌុលនៃវ៉ិចទ័រ v = (x, y) គឺ |v| = √(x² + y²)",
  },
  'g11-vec2-unit': {
    title: "វ៉ិចទ័រឯកតា (Unit vector)",
    description: "វ៉ិចទ័រឯកតាមានទិសដៅដូច v គឺ u = v / |v| ដែល |u| = 1",
  },
  'g11-vec2-dot': {
    title: "ផលគុណស្កាលែរនៃពីរវ៉ិចទ័រ (Dot product)",
    description: "ផលគុណស្កាលែរ u · v = u₁v₁ + u₂v₂ = |u||v| cos θ",
  },
  'g11-vec2-angle': {
    title: "មុំរវាងពីរវ៉ិចទ័រ",
    description: "កូស៊ីនុសនៃមុំរវាងវ៉ិចទ័រពីរគឺ cos θ = (u · v) / (|u||v|)",
  },
  'g11-mat-multiply': {
    title: "ផលគុណម៉ាទ្រីស (Matrix multiplication)",
    description: "ធាតុក្នុងជួរដេក i ជួរឈរ j ស្មើនឹងផលគុណស្កាលែរនៃជួរដេក i និងជួរឈរ j",
  },
  'g11-mat-det': {
    title: "ដេទែមីណង់នៃម៉ាទ្រីស 2×2",
    description: "ដេទែមីណង់នៃម៉ាទ្រីស [[a, b], [c, d]] គឺ det(A) = ad - bc",
  },
  'g11-mat-inverse': {
    title: "ម៉ាទ្រីសច្រាសនៃម៉ាទ្រីស 2×2",
    description: "ម៉ាទ្រីសច្រាស A⁻¹ = (1/det(A)) · [[d, -b], [-c, a]] (det(A) ≠ 0)",
  },
  'g11-mat-system': {
    title: "ដោះស្រាយប្រព័ន្ធសមីការដោយម៉ាទ្រីសច្រាស",
    description: "បើ AX = B ហើយ det(A) ≠ 0 នោះ X = A⁻¹B",
  },
  'g11-condprob-def': {
    title: "និយមន័យប្រូបាប៊ីលីតេមានលក្ខខណ្ឌ",
    description: "ប្រូបាបនៃ A ដោយដឹងថា B បានកើតឡើង P(A|B) = P(A ∩ B) / P(B) (P(B) > 0)",
  },
  'g11-condprob-multiplication': {
    title: "វិធានផលគុណប្រូបាប៊ីលីតេ",
    description: "P(A ∩ B) = P(B) · P(A|B) = P(A) · P(B|A)",
  },
  'g11-condprob-independence': {
    title: "លក្ខខណ្ឌនៃព្រឹត្តិការណ៍ឯករាជ្យ",
    description: "A និង B ឯករាជ្យគ្នា លុះត្រាតែ P(A ∩ B) = P(A) · P(B) ឬ P(A|B) = P(A)",
  },
  'g11-condprob-total': {
    title: "រូបមន្តប្រូបាប៊ីលីតេសរុប (Law of total probability)",
    description: "P(A) = ∑ P(Bᵢ) · P(A|Bᵢ) ចំពោះបំណែងចែកលំហគំរូ {Bᵢ}",
  },
  'g11-statvar-variance-sd': {
    title: "វ៉ារ្យ៉ង់ និងគម្លាតស្តង់ដារនៃទិន្នន័យ",
    description: "វ៉ារ្យ៉ង់ σ² = (∑(x - μ)²)/N និងគម្លាតស្តង់ដារ σ = √(σ²)",
  },
  'g11-statvar-expectation-variance': {
    title: "តម្លៃរំពឹង និងវ៉ារ្យ៉ង់នៃអថេរចៃដន្យដាច់",
    description: "E(X) = ∑ x·p(x) និង Var(X) = E(X²) - [E(X)]²",
  },
  'g11-statvar-empirical-rule': {
    title: "ក្បួនជាក់ស្តែង 68–95–99.7 (Empirical rule)",
    description: "ក្នុងបំណែងចែកធម្មតា៖ 68% ក្នុងចន្លោះ μ±σ, 95% ក្នុង μ±2σ, 99.7% ក្នុង μ±3σ",
  },
  'g12-limits-notation': {
    title: "លីមីតត្រង់ចំណុច (Limit at a point)",
    description: "លីមីតនៃអនុគមន៍ f(x) កាលណា x ខិតជិត a ស្មើនឹង L៖ lim_{x → a} f(x) = L",
  },
  'g12-limits-one-sided': {
    title: "លីមីតឯកតោភាគី និងអត្ថិភាពនៃលីមីត",
    description: "លីមីតត្រង់ a មានលុះត្រាតែលីមីតខាងឆ្វេងស្មើនឹងលីមីតខាងស្តាំ lim_{x → a⁻} f(x) = lim_{x → a⁺} f(x)",
  },
  'g12-limits-infinity': {
    title: "លីមីតនៅអនន្ត (Limits at infinity)",
    description: "កាលណា x → ±∞ យើងមាន lim 1/xⁿ = 0 ចំពោះគ្រប់ចំនួនសនិទានវិជ្ជមាន n",
  },
  'g12-limits-continuity': {
    title: "ភាពជាប់នៃអនុគមន៍ត្រង់ចំណុច",
    description: "អនុគមន៍ f ជាប់ត្រង់ x = a លុះត្រាតែ lim_{x → a} f(x) = f(a)",
  },
  'g12-diff-first-principles': {
    title: "ដេរីវេតាមនិយមន័យលីមីត",
    description: "ដេរីវេ f'(x) = lim_{h → 0} [f(x + h) - f(x)] / h",
  },
  'g12-diff-power-rule': {
    title: "រូបមន្តដេរីវេនៃស្វ័យគុណ (Power rule)",
    description: "ដេរីវេនៃ xⁿ គឺ d/dx(xⁿ) = n xⁿ⁻¹ ចំពោះគ្រប់ចំនួនពិត n",
  },
  'g12-diff-product-quotient': {
    title: "វិធានផលគុណ និងផលធៀបនៃដេរីវេ",
    description: "(uv)' = u'v + uv' និង (u/v)' = (u'v - uv') / v² (v ≠ 0)",
  },
  'g12-diff-chain-rule': {
    title: "រូបមន្តដេរីវេអនុគមន៍បណ្ដាក់ (Chain rule)",
    description: "ដេរីវេនៃអនុគមន៍សមាស d/dx f(g(x)) = f'(g(x)) · g'(x)",
  },
  'g12-int-power': {
    title: "រូបមន្តអាំងតេក្រាលនៃស្វ័យគុណ",
    description: "អាំងតេក្រាល ∫ xⁿ dx = xⁿ⁺¹/(n + 1) + C ចំពោះ n ≠ -1",
  },
  'g12-int-standard': {
    title: "អាំងតេក្រាលនៃអនុគមន៍ចម្រាស និងអិចស្ប៉ូណង់ស្យែល",
    description: "∫ (1/x) dx = ln|x| + C និង ∫ eˣ dx = eˣ + C",
  },
  'g12-int-trig': {
    title: "អាំងតេក្រាលនៃអនុគមន៍ត្រីកោណមាត្រ",
    description: "∫ cos x dx = sin x + C និង ∫ sin x dx = -cos x + C",
  },
  'g12-int-ftc': {
    title: "ទ្រឹស្តីបទគ្រឹះនៃកាលគណិត (Fundamental Theorem of Calculus)",
    description: "អាំងតេក្រាលកំណត់ពី a ដល់ b ស្មើនឹង F(b) - F(a) ដែល F' = f",
  },
  'g12-complex-imaginary-unit': {
    title: "ឯកតានិម្មិត i",
    description: "ឯកតានិម្មិត i កំណត់ដោយ i² = -1",
  },
  'g12-complex-modulus': {
    title: "ម៉ូឌុល និងកុំផ្លិចឆ្លាស់",
    description: "ម៉ូឌុល |z| = √(a² + b²) និងចំនួនកុំផ្លិចឆ្លាស់ z̄ = a - bi ដែល z·z̄ = |z|²",
  },
  'g12-complex-polar': {
    title: "ទម្រង់ត្រីកោណមាត្រនៃចំនួនកុំផ្លិច (Polar form)",
    description: "z = r(cos θ + i sin θ) ដែល r = |z| និង θ = arg(z)",
  },
  'g12-binomial-theorem': {
    title: "ទ្រឹស្តីបទទ្វេធា (Binomial theorem)",
    description: "ការពន្លាតស្វ័យគុណទ្វេធា (a + b)ⁿ = ∑_{k=0}ⁿ C(n,k) aⁿ⁻ᵏ bᵏ",
  },
  'g12-binomial-coefficient': {
    title: "មេគុណទ្វេធា C(n, k)",
    description: "មេគុណទ្វេធា C(n, k) = n! / (k!(n - k)!)",
  },
  'g12-binomial-general-term': {
    title: "តួទូទៅនៃការពន្លាតទ្វេធា",
    description: "តួទី k + 1 នៃការពន្លាតទ្វេធាគឺ T_{k+1} = C(n, k) aⁿ⁻ᵏ bᵏ",
  },
  'g12-perms-factorial': {
    title: "ហ្វាក់តូរីយ៉ែល n!",
    description: "ផលគុណនៃ n ចំនួនគត់វិជ្ជមានដំបូង n! = n · (n - 1) · ... · 1 (0! = 1)",
  },
  'g12-perms-npr': {
    title: "ចម្លាស់នៃ n ធាតុយកម្តង r ធាតុ (Permutations)",
    description: "ចំនួនរបៀបរៀបចម្លាស់មានលំដាប់គឺ P(n, r) = n! / (n - r)!",
  },
  'g12-perms-ncr': {
    title: "បន្សំនៃ n ធាតុយកម្តង r ធាតុ (Combinations)",
    description: "ចំនួនរបៀបជ្រើសរើសបន្សំគ្មានលំដាប់គឺ C(n, r) = n! / (r!(n - r)!)",
  },
  'g12-perms-identical': {
    title: "ចម្លាស់នៃវត្ថុមានធាតុដូចគ្នា",
    description: "ចំនួនចម្លាស់គឺ n! / (n₁! n₂! ... nₖ!)",
  },
  'g12-conic-ellipse': {
    title: "សមីការអេលីបផ្ចិតនៅគល់តម្រុយ",
    description: "សមីការស្តង់ដារ x²/a² + y²/b² = 1 (a > b > 0) ដែលកំណុំ (±c, 0) និង c² = a² - b²",
  },
  'g12-conic-hyperbola': {
    title: "សមីការអ៊ីពែបូលផ្ចិតនៅគល់តម្រុយ",
    description: "សមីការស្តង់ដារ x²/a² - y²/b² = 1 ដែលកំណុំ (±c, 0), c² = a² + b² និងអាស៊ីមតូត y = ±(b/a)x",
  },
  'g12-conic-eccentricity': {
    title: "អុិចសង់ទ្រិស៊ីតេនៃកោនិក (Eccentricity)",
    description: "អុិចសង់ទ្រិស៊ីតេ e = c/a៖ អេលីប 0 < e < 1, ប៉ារ៉ាបូល e = 1, អ៊ីពែបូល e > 1",
  },
  'g12-vec3-magnitude-dot': {
    title: "ម៉ូឌុល និងផលគុណស្កាលែរក្នុងលំហ 3D",
    description: "ម៉ូឌុល |v| = √(x² + y² + z²) និងផលគុណស្កាលែរ u · v = u₁v₁ + u₂v₂ + u₃v₃",
  },
  'g12-vec3-cross': {
    title: "ផលគុណវ៉ិចទ័រ (ផលគុណខ្វែង - Cross product)",
    description: "ផលគុណវ៉ិចទ័រ u × v បង្កើតបានវ៉ិចទ័រថ្មីមួយដែលកែងនឹងទាំង u និង v",
  },
  'g12-vec3-line-plane': {
    title: "សមីការវ៉ិចទ័រនៃបន្ទាត់ និងប្លង់ក្នុងលំហ",
    description: "បន្ទាត់ r = r₀ + tv និងប្លង់ n · (r - r₀) = 0 ដែល n ជាវ៉ិចទ័រណរម៉ាល់",
  },
  'g12-matsys-det3': {
    title: "ដេទែមីណង់នៃម៉ាទ្រីស 3×3",
    description: "គណនាតាមក្បួនសារុស (Sarrus) ឬពន្លាតតាមជួរដេកណាមួយ",
  },
  'g12-matsys-inverse': {
    title: "ម៉ាទ្រីសច្រាសនៃម៉ាទ្រីស 3×3",
    description: "A⁻¹ = (1/det(A)) · adj(A) (លុះត្រាតែ det(A) ≠ 0)",
  },
  'g12-matsys-solve': {
    title: "ដោះស្រាយប្រព័ន្ធសមីការដោយម៉ាទ្រីសច្រាស",
    description: "ដោះស្រាយប្រព័ន្ធ AX = B តាមរយៈ X = A⁻¹B",
  },
  'g12-randvar-expectation-variance': {
    title: "តម្លៃរំពឹង និងវ៉ារ្យ៉ង់នៃអថេរចៃដន្យ",
    description: "E(X) = ∑ x P(X = x) និង Var(X) = E(X²) - [E(X)]²",
  },
  'g12-randvar-binomial-pmf': {
    title: "ច្បាប់ប្រូបាប៊ីលីតេនៃការចែកចាយទ្វេធា",
    description: "ប្រូបាបទទួលបានជោគជ័យ k ដងក្នុងការសាកល្បង n ដងគឺ P(X = k) = C(n, k) pᵏ (1 - p)ⁿ⁻ᵏ",
  },
  'g12-randvar-binomial-moments': {
    title: "មធ្យម និងវ៉ារ្យ៉ង់នៃការចែកចាយទ្វេធា",
    description: "មធ្យម μ = np និងវ៉ារ្យ៉ង់ σ² = np(1 - p)",
  },
  'g12-normal-zscore': {
    title: "ពិន្ទុ z (z-score) នៃបំណែងចែកធម្មតា",
    description: "បំប្លែងតម្លៃ x ទៅជាពិន្ទុ z ស្តង់ដារ៖ z = (x - μ) / σ",
  },
  'g12-normal-empirical': {
    title: "ក្បួនជាក់ស្តែងនៃបំណែងចែកធម្មតា 68–95–99.7",
    description: "68.3% នៃទិន្នន័យក្នុង [μ - σ, μ + σ], 95.4% ក្នុង [μ - 2σ, μ + 2σ], 99.7% ក្នុង [μ - 3σ, μ + 3σ]",
  },
  'g12-normal-probability': {
    title: "ប្រូបាប៊ីលីតេក្នុងបំណែងចែកធម្មតា",
    description: "ប្រូបាបរវាងពីរតម្លៃស្មើនឹងផ្ទៃក្រឡាក្រោមខ្សែកោងធម្មតារវាងតម្លៃទាំងពីរនោះ",
  },
  'g7-circles-circumference': {
    title: "បរិមាត្ររង្វង់តាមកាំ (Circumference from radius)",
    description: "បរិមាត្ររង្វង់គណនាតាមកាំ r គឺ C = 2πr",
  },
  'g8-surface-area-cylinder': {
    title: "ផ្ទៃក្រឡាសរុបស៊ីឡាំង",
    description: "ផ្ទៃក្រឡាសរុបនៃស៊ីឡាំងគឺ A = 2πr² + 2πrh",
  },
  'g8-volume-cylinder': {
    title: "មាឌស៊ីឡាំង",
    description: "មាឌនៃស៊ីឡាំងគឺ V = πr²h",
  },
  'g8-linear-slope-intercept': {
    title: "ទម្រង់សមីការបន្ទាត់ y = mx + c (Slope-intercept form)",
    description: "សមីការបន្ទាត់ត្រង់ដែលមានមេគុណប្រាប់ទិស m និងចំណុចប្រសព្វលើអ័ក្សអរដោនេ c",
  },
  'g9-coordinate-slope': {
    title: "មេគុណប្រាប់ទិសនៃអង្កត់ (Slope / Gradient)",
    description: "មេគុណប្រាប់ទិស m = (y₂ - y₁) / (x₂ - x₁) ចំពោះ x₁ ≠ x₂",
  },
  'g9-coordinate-distance': {
    title: "រូបមន្តចម្ងាយរវាងពីរចំណុច (Distance formula)",
    description: "ចម្ងាយរវាងចំណុច (x₁, y₁) និង (x₂, y₂) លើប្លង់កូអរដោនេគឺ d = √((x₂ - x₁)² + (y₂ - y₁)²);",
  },
  'g10-functions-composition': {
    title: "អនុគមន៍បណ្ដាក់ (Composite function)",
    description: "អនុគមន៍បណ្ដាក់ (f ∘ g)(x) = f(g(x)) អនុវត្ត g មុន បន្ទាប់មកអនុវត្ត f",
  },
  'g11-functions-inverse': {
    title: "អនុគមន៍ច្រាស (Inverse function)",
    description: "អនុគមន៍ច្រាស f⁻¹(x) ផ្ទៀងផ្ទាត់ f(a) = b លុះត្រាតែ f⁻¹(b) = a",
  },
  'g12-calc-power-rule': {
    title: "រូបមន្តដេរីវេនៃស្វ័យគុណ (Power rule)",
    description: "ដេរីវេនៃ xⁿ គឺ d/dx(xⁿ) = n xⁿ⁻¹ ចំពោះគ្រប់ចំនួនពិត n",
  },
  'g12-calc-chain-rule': {
    title: "រូបមន្តដេរីវេអនុគមន៍បណ្ដាក់ (Chain rule)",
    description: "ដេរីវេនៃអនុគមន៍សមាស d/dx f(g(x)) = f'(g(x)) · g'(x)",
  },
  'g12-calc-integral-power': {
    title: "រូបមន្តអាំងតេក្រាលនៃស្វ័យគុណ",
    description: "អាំងតេក្រាល ∫ xⁿ dx = xⁿ⁺¹/(n + 1) + C ចំពោះ n ≠ -1",
  },
}


/* ------------------------------------------------------------------ */
/* Accessors                                                           */
/* ------------------------------------------------------------------ */

export function gradeCopy(grade: Grade, language: Language): GradeCopy {
  if (language === 'km') return kmGrades[grade.id] ?? fallbackGrade(grade)
  return {
    title: grade.title,
    tagline: grade.tagline,
    description: grade.description,
    focus: grade.focus,
  }
}

function fallbackGrade(grade: Grade): GradeCopy {
  return {
    title: `ថ្នាក់ទី${grade.number}`,
    tagline: grade.tagline,
    description: grade.description,
    focus: grade.focus,
  }
}

export function subjectCopy(gradeId: string, subject: Subject, language: Language): SubjectCopy {
  if (language === 'km') {
    const copy = kmSubjects[`${gradeId}:${subject.id}`]
    if (copy) return copy
  }
  return { title: subject.title, description: subject.description }
}

export function topicCopy(topic: Topic, language: Language): TopicCopy {
  if (language === 'km') {
    const km = kmTopicContent[topic.id]
    if (km?.title || km?.subtitle) {
      return {
        title: km.title ?? kmTopics[topic.id]?.title ?? topic.title,
        subtitle: km.subtitle ?? kmTopics[topic.id]?.subtitle ?? topic.subtitle,
      }
    }
    const copy = kmTopics[topic.id]
    if (copy) return copy
  }
  return { title: topic.title, subtitle: topic.subtitle }
}

export function formulaCopy(formula: Formula, language: Language): FormulaCopy {
  if (language === 'km') {
    const km = kmFormulaContent[formula.id]
    if (km?.title || km?.description) {
      return {
        title: km.title ?? formula.title,
        description: km.description ?? formula.description,
      }
    }
  }
  return { title: formula.title, description: formula.description }
}

export function formulaContent(formula: Formula, language: Language): Formula {
  if (language !== 'km') return formula
  const km = kmFormulaContent[formula.id]
  if (!km) return formula

  return {
    ...formula,
    title: km.title ?? formula.title,
    description: km.description ?? formula.description,
    spoken: km.spoken ?? formula.spoken,
    conditions: km.conditions ?? formula.conditions,
    notes: km.notes ?? formula.notes,
    variables: formula.variables.map((v) => {
      const kv = km.variables?.[v.symbol]
      if (!kv) return v
      return {
        ...v,
        name: kv.name,
        note: kv.note !== undefined ? kv.note : v.note,
        unit: kv.unit !== undefined ? kv.unit : v.unit,
      }
    }),
  }
}

const KM_GRADE_FILES: GradeTranslation[] = [kmGrade7, kmGrade8, kmGrade9, kmGrade10, kmGrade11, kmGrade12]

const KM_GRADE_TOPICS: Record<string, LocalizedTopic> = Object.assign(
  {},
  ...KM_GRADE_FILES.map((file) => file.topics),
)

const KM_THEOREMS: Record<string, LocalizedTheorem> = Object.assign(
  {},
  ...KM_GRADE_FILES.map((file) => file.theorems),
)

/** Khmer topic content: the grade file wins field-by-field over the legacy table. */
export function kmTopicEntry(topicId: string): LocalizedTopic | undefined {
  const legacy = kmTopicContent[topicId]
  const graded = KM_GRADE_TOPICS[topicId]
  if (!legacy && !graded) return undefined
  return { ...legacy, ...graded }
}

/** True when a topic's long-form content (introduction and theory) exists in Khmer. */
export function hasKhmerTopicContent(topicId: string): boolean {
  const entry = kmTopicEntry(topicId)
  return Boolean(entry?.introduction && entry.theory && entry.theory.length > 0)
}

export function exerciseContent(exercise: Exercise, km: LocalizedExercise | undefined): Exercise {
  if (!km) return exercise
  const base = {
    ...exercise,
    prompt: km.prompt ?? exercise.prompt,
    hint: km.hint ?? exercise.hint,
    explanation: km.explanation ?? exercise.explanation,
  }
  if (base.type === 'multiple-choice') {
    const options = km.options && km.options.length === base.options.length ? km.options : base.options
    return { ...base, options }
  }
  return { ...base, answerUnit: km.answerUnit ?? base.answerUnit }
}

export function theoremCopy(subjectId: string, theorem: Theorem, language: Language): Theorem {
  if (language !== 'km') return theorem
  const km = KM_THEOREMS[`${subjectId}:${theorem.title}`]
  return km ? { ...theorem, ...km } : theorem
}

export function topicContent(topic: Topic, language: Language): Topic {
  if (language !== 'km') return topic
  const km = kmTopicEntry(topic.id)
  const copy = kmTopics[topic.id]

  const title = km?.title ?? copy?.title ?? topic.title
  const subtitle = km?.subtitle ?? copy?.subtitle ?? topic.subtitle
  const introduction = km?.introduction ?? topic.introduction
  const prerequisites = km?.prerequisites ?? topic.prerequisites
  const keyIdeas = km?.keyIdeas ?? topic.keyIdeas
  const shapeCaption = km?.shapeCaption ?? topic.shapeCaption
  const theory = km?.theory ? (km.theory as TheorySection[]) : topic.theory
  const formulas = topic.formulas.map((f) => formulaContent(f, language))
  const examples = km?.examples
    ? topic.examples.map((ex, i) => {
        const kmEx = km.examples?.[i]
        if (!kmEx) return ex
        return {
          title: kmEx.title ?? ex.title,
          problem: kmEx.problem ?? ex.problem,
          given: kmEx.given ?? ex.given,
          steps: kmEx.steps ? (kmEx.steps as ExampleStep[]) : ex.steps,
          answer: kmEx.answer ?? ex.answer,
        }
      })
    : topic.examples
  const mistakes = km?.mistakes ? (km.mistakes as CommonMistake[]) : topic.mistakes
  const exercises = topic.exercises.map((exercise) => exerciseContent(exercise, km?.exercises?.[exercise.id]))

  return {
    ...topic,
    title,
    subtitle,
    introduction,
    prerequisites,
    keyIdeas,
    shapeCaption,
    theory,
    formulas,
    examples,
    mistakes,
    exercises,
  }
}

export function shapeCopy(shape: Shape, language: Language): ShapeCopy {
  if (language === 'km') {
    const copy = kmShapes[shape.id]
    if (copy) return copy
  }
  return { name: shape.name, tagline: shape.tagline }
}

export function familyLabelFor(family: SubjectFamily, language: Language): string {
  return language === 'km' ? (kmFamilies[family] ?? family) : familyLabelEnglish(family)
}

function familyLabelEnglish(family: SubjectFamily): string {
  const labels: Record<SubjectFamily, string> = {
    number: 'Number',
    algebra: 'Algebra',
    geometry: 'Geometry',
    trigonometry: 'Trigonometry',
    'statistics-probability': 'Statistics & Probability',
    'coordinate-geometry': 'Coordinate Geometry',
    'vectors-matrices': 'Vectors & Matrices',
    advanced: 'Advanced Mathematics',
  }
  return labels[family]
}

export function shapeTerm(label: string, language: Language): string {
  if (language !== 'km') return label
  return kmShapeTerms[label] ?? label
}

