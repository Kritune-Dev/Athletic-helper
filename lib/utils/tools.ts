/**
 * Available tools
 */

import { Locales } from '../locales'

type ToolRoute =
  | '/utils/start'
  | '/utils/athleteSearch'
  | '/utils/sprintCalculator'

const Tools: {
  title: string
  subtitle: string
  route: ToolRoute
  icon: string
}[] = [
  {
    title: Locales.translate('settings.title'),
    subtitle: Locales.translate('settings.subtitle'),
    route: '/utils/start',
    icon: 'cog',
  },
  {
    title: Locales.translate('athleteSearch.title'),
    subtitle: Locales.translate('athleteSearch.subtitle'),
    route: '/utils/athleteSearch',
    icon: 'account-search',
  },
  {
    title: Locales.translate('sprintCalculator.title'),
    subtitle: Locales.translate('sprintCalculator.subtitle'),
    route: '/utils/sprintCalculator',
    icon: 'timer',
  },
]

export default Tools
