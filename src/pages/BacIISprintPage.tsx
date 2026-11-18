import { PageHero } from '../components/ui/PageHero'
import { BacIISprintDrill } from '../components/sprint/BacIISprintDrill'
import { useI18n } from '../lib/i18n'

export default function BacIISprintPage() {
  const { language } = useI18n()
  const isKm = language === 'km'
  const pick = (en: string, km: string) => (isKm ? km : en)

  return (
    <div className="sprint-page container" style={{ maxWidth: '900px', margin: '0 auto', padding: '1rem 1.5rem 4rem' }}>
      <PageHero
        crumbs={[
          { label: pick('Home', 'ទំព័រដើម'), to: '/' },
          { label: pick('BacII Exam', 'ប្រឡងបាក់ឌុប'), to: '/bacii' },
          { label: pick('Sprint Drill', 'ហ្វឹកហាត់ល្បឿន') },
        ]}
        eyebrow={pick(
          'Speed & Recall Trainer · Grade 12 · MoEYS BacII High-Yield',
          'ការហ្វឹកហាត់ល្បឿន និងរូបមន្ត · ថ្នាក់ទី១២ · សំណួរគន្លឹះបាក់ឌុប',
        )}
        title={pick(
          'BacII Sprint Drill Mode (ការហ្វឹកហាត់ល្បឿនបាក់ឌុប)',
          'ការហ្វឹកហាត់ល្បឿនបាក់ឌុប (BacII Sprint Drill)',
        )}
        intro={pick(
          'Master Grade 12 formulas with fast, mobile-friendly 3-minute and 5-minute speed drills. Instant MoEYS formula feedback and local streak tracking.',
          'ពង្រឹងការចងចាំរូបមន្តថ្នាក់ទី១២ ជាមួយការហ្វឹកហាត់ល្បឿន ៣នាទី និង ៥នាទី។ ការពន្យល់រូបមន្តភ្លាមៗ និងកត់ត្រាពិន្ទុជាប្រចាំ។',
        )}
      />

      <BacIISprintDrill />
    </div>
  )
}
