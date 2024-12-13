import React from 'react'
import { StyleSheet } from 'react-native'
import { IconButton, Surface, Text } from 'react-native-paper'

const IconStart = (props: { title: string; icon: string }) => (
  <>
    <Surface style={styles.startingElement} elevation={0}>
      <IconButton icon={props.icon} size={30} />
      <Text style={styles.startingText}>{props.title}</Text>
    </Surface>
  </>
)

const styles = StyleSheet.create({
  startingElement: {
    alignItems: 'center',
    marginHorizontal: 4,
  },
  startingText: {
    fontSize: 20,
  },
})

export default IconStart
