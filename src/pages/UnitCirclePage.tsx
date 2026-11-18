import { PageHero } from '../components/ui/PageHero'
import { UnitCircleLab } from '../components/unit-circle/UnitCircleLab'
import { useI18n } from '../lib/i18n'

export default function UnitCirclePage() {
  const { language } = useI18n()
  const isKm = language === 'km'
  const pick = (en: string, km: string) => (isKm ? km : en)

  return (
    <div className="unit-circle-page container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '1rem 1.5rem 4rem' }}>
      <PageHero
        crumbs={[
          { label: pick('Home', 'ទំព័រដើម'), to: '/' },
          { label: pick('Unit Circle Lab', 'រង្វង់ត្រីកោណមាត្រ') },
        ]}
        eyebrow={pick(
          'Interactive Trigonometry · Grades 10–12 · MoEYS Standard',
          'ត្រីកោណមាត្រអន្តរកម្ម · ថ្នាក់ទី១០–១២ · កម្មវិធីសិក្សាជាតិ',
        )}
        title={pick(
          'Interactive Unit Circle Lab (រង្វង់ត្រីកោណមាត្រ)',
          'បន្ទះពិសោធន៍រង្វង់ត្រីកោណមាត្រអន្តរកម្ម',
        )}
        intro={pick(
          'Explore exact radian angles, sine and cosine coordinate projections, tangent lines, and quadrant sign rules. Drag the terminal point or pick any of the 16 exact MoEYS angles to inspect exact radical values.',
          'ស្វែងយល់ពីតម្លៃមុំជារ៉ាដ្យង់ ការបញ្ចាំងកូអរដោនេស៊ីនុស និងកូស៊ីនុស បន្ទាត់តង់សង់ និងសញ្ញាតាមកាដ្រង់នីមួយៗ។ អូសចំណុចចុង ឬជ្រើសរើសមុំពិសេសទាំង ១៦ តាមកម្មវិធីសិក្សាក្រសួងអប់រំ។',
        )}
      />

      <UnitCircleLab />
    </div>
  )
}
