import { PageHero } from '../components/ui/PageHero'
import { ProbabilityLab } from '../components/probability/ProbabilityLab'
import { useI18n } from '../lib/i18n'

export default function ProbabilityPage() {
  const { language } = useI18n()
  const isKm = language === 'km'
  const pick = (en: string, km: string) => (isKm ? km : en)

  return (
    <div
      className="probability-page container"
      style={{ maxWidth: '1100px', margin: '0 auto', padding: '1rem 1.5rem 4rem' }}
    >
      <PageHero
        crumbs={[
          { label: pick('Home', 'ទំព័រដើម'), to: '/' },
          { label: pick('Labs', 'មន្ទីរពិសោធន៍'), to: '/' },
          { label: pick('Probability Tree', 'ដើមឈើប្រូបាប') },
        ]}
        eyebrow={pick(
          'Probability & Counting · Grades 10–12 · MoEYS Standard',
          'ប្រូបាប និងការរាប់ · ថ្នាក់ទី១០–១២ · កម្មវិធីសិក្សាជាតិ',
        )}
        title={pick(
          'Probability Tree & Counting Lab (ដើមឈើប្រូបាប)',
          'ដើមឈើប្រូបាប និងការរាប់',
        )}
        intro={pick(
          'Build a probability tree for 2-stage experiments, verify branch sums, and read off P(A∩B), conditional probability P(B|A), and total probability live. Switch tabs for Permutations and Combinations calculators.',
          'បង្កើតដើមឈើប្រូបាបសម្រាប់ការពិសោធន៍២ដំណាក់កាល ផ្ទៀងផ្ទាត់ផលបូកនៃមែក ហើយអានតម្លៃ P(A∩B) លទ្ធភាពតាមលក្ខខណ្ឌ P(B|A) និងលទ្ធភាពសរុបភ្លាមៗ។ ប្ដូរផ្ទាំងសម្រាប់គណនាផ្លាស់ប្ដូរ និងការរួមផ្សំ។',
        )}
      />

      <ProbabilityLab />
    </div>
  )
}
