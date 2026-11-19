import { PageHero } from '../components/ui/PageHero'
import { ConicsLab } from '../components/conics/ConicsLab'
import { useI18n } from '../lib/i18n'

export default function ConicsPage() {
  const { language } = useI18n()
  const isKm = language === 'km'
  const pick = (en: string, km: string) => (isKm ? km : en)

  return (
    <div
      className="conics-page container"
      style={{ maxWidth: '1100px', margin: '0 auto', padding: '1rem 1.5rem 4rem' }}
    >
      <PageHero
        crumbs={[
          { label: pick('Home', 'ទំព័រដើម'), to: '/' },
          { label: pick('Conic Sections Lab', 'បន្ទះពិសោធន៍កោនិក') },
        ]}
        eyebrow={pick(
          'Interactive Geometry · Grades 11–12 · MoEYS Standard',
          'រូបតឃ្លែតអន្ដរកម្ម · ថ្នាក់ទី១១–១២ · កម្មវិធីសិក្សាជាតិ',
        )}
        title={pick(
          'Conic Sections Playground (បន្ទះពិសោធន៍កោនិក)',
          'បន្ទះពិសោធន៍កោនិក',
        )}
        intro={pick(
          'Explore Parabolas, Ellipses, and Hyperbolas interactively. Drag point P to verify the focal-distance property of each conic in real time. Adjust parameters with sliders and watch the shape update live.',
          'ស្វែងយល់ពីប៉ារ៉ាបូល អេលីប និងអ៊ីពែបូលតាមរបៀបអន្តរកម្ម។ អូសចំណុច P ដើម្បីបញ្ជាក់លក្ខណៈចម្ងាយនៃកោនិកនីមួយៗ។ កែប្រែប៉ារ៉ាម៉ែត្រដោយប្រើប៊ូតុងរំកិល ហើយមើលរូបរាងផ្លាស់ប្ដូរតាមពេលជាក់ស្ដែង។',
        )}
      />

      <ConicsLab />
    </div>
  )
}
