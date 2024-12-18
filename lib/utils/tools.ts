/**
 * Available tools
 */

import { Locales } from '../locales'

type ToolRoute =
  | '/utils/settings'
  | '/utils/athleteSearch'
  | '/utils/sprintCalculator'

const Tools: {
  title: string
  subtitle: string
  route: ToolRoute
  icon: string
}[] = [
  {
    title: Locales.t('settings.title'),
    subtitle: Locales.t('settings.subtitle'),
    route: '/utils/settings',
    icon: 'cog',
  },
  {
    title: Locales.t('athleteSearch.title'),
    subtitle: Locales.t('athleteSearch.subtitle'),
    route: '/utils/athleteSearch',
    icon: 'account-search',
  },
  {
    title: Locales.t('sprintCalculator.title'),
    subtitle: Locales.t('sprintCalculator.subtitle'),
    route: '/utils/sprintCalculator',
    icon: 'timer',
  },
]

export default Tools
