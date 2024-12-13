import React from 'react'
import { StyleSheet } from 'react-native'
import { IconButton, Surface, Text } from 'react-native-paper'

const ArrowStart = (props: { time: number }) => (
  <>
    <Surface style={styles.arrowContainer} elevation={0}>
      <Text style={styles.arrowTime}>{props.time} sec</Text>
      <IconButton icon="arrow-right" size={32} />
    </Surface>
  </>
)

const styles = StyleSheet.create({
  arrowContainer: {
    alignItems: 'center',
    marginHorizontal: 4,
  },
  arrowTime: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})

export default ArrowStart
