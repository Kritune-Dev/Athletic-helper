/**
 * Locales
 */

import { I18n } from 'i18n-js'

import English from '@/lib/locales/en'
import French from '@/lib/locales/fr'

const Locales = new I18n({
  en: English,
  fr: French,
})

Locales.enableFallback = true

export { Locales }
