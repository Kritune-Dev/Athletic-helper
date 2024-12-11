import React from 'react'
import { Surface } from 'react-native-paper'

import { Locales, ScreenInfo, styles } from '@/lib'

const AthleteProfiles = () => (
  <Surface style={styles.screen}>
    <ScreenInfo title={Locales.t('athleteProfiles')} path="app/(tabs)/athleteProfiles.tsx" />
  </Surface>
)

export default AthleteProfiles
