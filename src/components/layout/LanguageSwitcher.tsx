import { useState } from 'react'
import { useI18n } from '../../lib/i18n'
import { IconLanguage } from '../ui/Icons'

/**
 * One-tap language switch. The label shows the language the button will take
 * you to, which is the clearest affordance for a two-language interface.
 *
 * Provides:
 * - Proper `lang` attribute for text rendering and screen reader pronunciation
 * - Polite live-region announcement when language is toggled
 * - Accessible label and descriptive tooltip with in-place update notice
 * - 44px minimum touch target compliance
 */
export function LanguageSwitcher({ onDark = false }: { onDark?: boolean }) {
  const { language, toggleLanguage, t } = useI18n()
  const [statusMessage, setStatusMessage] = useState<string>('')

  const nextIsKhmer = language === 'en'
  const label = nextIsKhmer ? t('common.khmer') : t('common.english')
  const aria = nextIsKhmer ? t('common.switchToKhmer') : t('common.switchToEnglish')

  const handleToggle = () => {
    toggleLanguage()
    setStatusMessage(
      t('nav.languageStatus', {
        language: nextIsKhmer ? t('common.khmer') : t('common.english'),
      }),
    )
  }

  return (
    <>
      <button
        type="button"
        className={`lang-toggle${onDark ? ' lang-toggle--on-dark' : ''}`}
        onClick={handleToggle}
        aria-label={`${aria} · ${t('common.language')}`}
        title={`${aria} (${t('common.opensInPlace')})`}
        data-testid="language-switcher"
        data-current-lang={language}
        data-target-lang={nextIsKhmer ? 'km' : 'en'}
      >
        <IconLanguage size={16} aria-hidden="true" focusable="false" />
        <span lang={nextIsKhmer ? 'km' : 'en'}>{label}</span>
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {statusMessage}
      </span>
    </>
  )
}
