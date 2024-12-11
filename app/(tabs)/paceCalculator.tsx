import { router } from 'expo-router'
import React from 'react'
import { Button, Surface } from 'react-native-paper'

import { Locales, ScreenInfo, styles } from '@/lib'

const PaceCalculator = () => (
  <Surface style={styles.screen}>
    <ScreenInfo title={Locales.t('paceCalculator')} path="app/(tabs)/profile.tsx" />
  </Surface>
)

export default PaceCalculator
