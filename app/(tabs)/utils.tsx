import { router } from 'expo-router'
import React from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import { Card, Surface, Avatar } from 'react-native-paper'

import { Locales } from '@/lib'

type ToolRoute =
  | '/utils/settings'
  | '/utils/athleteSearch'
  | '/utils/sprintCalculator'

const tools: {
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

const UtilsPage = () => {
  const cardHeight = Dimensions.get('window').height / 8 // Fixed height based on screen size

  return (
    <Surface style={styles.container}>
      <Surface style={styles.gridContainer} elevation={0}>
        {tools.map((tool, index) => (
          <Card
            key={index}
            onPress={() => router.push(tool.route)}
            style={[styles.card, { height: cardHeight }]}
          >
            <Card.Title
              title={tool.title}
              subtitle={tool.subtitle}
              left={(props) => <Avatar.Icon {...props} icon={tool.icon} />}
            />
          </Card>
        ))}
      </Surface>
    </Surface>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  gridContainer: {
    flexDirection: 'column',
    height: '100%',
  },
  card: {
    margin: 5,
    alignContent: 'center',
    justifyContent: 'center',
  },
})

export default UtilsPage
