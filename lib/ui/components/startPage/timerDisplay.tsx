import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'

const TimerDisplay = (props: { phase: string; timeLeft: number }) => (
  <Text style={styles.timeDisplay}>
    {props.phase === 'go'
      ? 'Départ !'
      : `${props.phase.charAt(0).toUpperCase() + props.phase.slice(1)}: ${props.timeLeft} sec`}
  </Text>
)

const styles = StyleSheet.create({
  timeDisplay: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
})

export default TimerDisplay
