import { PageHero } from '../components/ui/PageHero'
import { ArgandLab } from '../components/argand/ArgandLab'
import { useI18n } from '../lib/i18n'

export default function ArgandPage() {
  const { language } = useI18n()
  const isKm = language === 'km'
  const pick = (en: string, km: string) => (isKm ? km : en)

  return (
    <div
      className="argand-page container"
      style={{ maxWidth: '1100px', margin: '0 auto', padding: '1rem 1.5rem 4rem' }}
    >
      <PageHero
        crumbs={[
          { label: pick('Home', 'ទំព័រដើម'), to: '/' },
          { label: pick('Labs', 'មន្ទីរពិសោធន៍'), to: '/' },
          { label: pick('Argand Plane', 'ប្លង់អាកង់') },
        ]}
        eyebrow={pick(
          'Complex Numbers · Grade 12 BacII · MoEYS Standard',
          'ចំនួនកុំផ្លិច · ថ្នាក់ទី១២ BacII · កម្មវិធីសិក្សាជាតិ',
        )}
        title={pick(
          'Argand Plane Lab (បន្ទះពិសោធន៍ប្លង់អាកង់)',
          'បន្ទះពិសោធន៍ប្លង់អាកង់',
        )}
        intro={pick(
          'Place any complex number z = a + bi on the Argand plane and explore its modulus, argument, and polar form. Toggle conjugate, negation, and the product rule to see how z₁z₂ multiplies moduli and adds arguments, a key BacII exam technique.',
          'ដាក់ចំនួនកុំផ្លិច z = a + bi នៅលើប្លង់អាកង់ ហើយស្វែងយល់ពីម៉ូឌុល អាគីម៉ង់ និងទម្រង់ប៉ូឡែរ។ ប្ដូរដើម្បីមើលចំនួនផ្ចិត ចំនួនអវិជ្ជមាន និងច្បាប់គុណ z₁z₂ ដែលជាបច្ចេកទេសសំខាន់ BacII។',
        )}
      />

      <ArgandLab />
    </div>
  )
}
