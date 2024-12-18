import { router } from 'expo-router'
import React from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import { Card, Surface, Avatar } from 'react-native-paper'

import tools from '@/lib/utils/tools'

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
