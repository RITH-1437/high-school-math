import { PageHero } from '../components/ui/PageHero'
import { RevolutionLab } from '../components/revolution/RevolutionLab'
import { useI18n } from '../lib/i18n'

export default function RevolutionPage() {
  const { language } = useI18n()
  const isKm = language === 'km'
  const pick = (en: string, km: string) => (isKm ? km : en)

  return (
    <div
      className="revolution-page container"
      style={{ maxWidth: '1100px', margin: '0 auto', padding: '1rem 1.5rem 4rem' }}
    >
      <PageHero
        crumbs={[
          { label: pick('Home', 'ទំព័រដើម'), to: '/' },
          { label: pick('Labs', 'មន្ទីរពិសោធន៍'), to: '/' },
          { label: pick('Volume of Revolution', 'បរិមាណវិលបង្វិល') },
        ]}
        eyebrow={pick(
          'Integral Calculus · Grade 12 BacII · MoEYS Standard',
          'គណិតវិភាគអាំងតេក្រាល · ថ្នាក់ទី១២ BacII · កម្មវិធីសិក្សាជាតិ',
        )}
        title={pick(
          'Volume of Revolution Lab (បន្ទះពិសោធន៍បរិមាណវិលបង្វិល)',
          'បន្ទះពិសោធន៍បរិមាណវិលបង្វិល',
        )}
        intro={pick(
          'Watch the solid of revolution build up as x sweeps from a to b. Drag the 3D solid to rotate it, adjust the limits with sliders, and verify the closed-form result against the numerical integral. Covers y = x², y = √x, and y = x, all core BacII exam functions.',
          'មើលតួរាងបីវិមាត្រកកើតឡើងពេល x ស្រែកពី a ដល់ b។ អូសតួរាង 3D ដើម្បីបង្វិល ប្ដូរដែនកំណត់ដោយប្រើប៊ូតុងរំកិល ហើយបញ្ជាក់លទ្ធផលរូបមន្តបិទជាមួយអាំងតេក្រាលលេខ។ គ្របដណ្ដប់ y = x² y = √x និង y = x ដែលជាអនុគមន៍ស្នូល BacII ទាំងអស់។',
        )}
      />

      <RevolutionLab />
    </div>
  )
}
