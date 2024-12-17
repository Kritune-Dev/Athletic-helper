import Slider from '@react-native-community/slider'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import {
  IconButton,
  Surface,
  Text,
  Portal,
  Dialog,
  Button,
} from 'react-native-paper'

const ArrowStart = (props: {
  initialTime: number
  onTimeChange: (time: number) => void
}) => {
  const [time, setTime] = useState(props.initialTime)
  const [isDialogVisible, setIsDialogVisible] = useState(false)

  // Met à jour l'état local si `initialTime` change (par exemple, via un parent)
  useEffect(() => {
    setTime(props.initialTime)
  }, [props.initialTime])

  const handleTimeChange = (value: number) => {
    setTime(value)
  }

  const confirmTimeChange = () => {
    props.onTimeChange(time) // Informe le parent du changement
    setIsDialogVisible(false) // Ferme la boîte de dialogue
  }

  return (
    <Surface style={styles.arrowContainer} elevation={0}>
      <Text style={styles.arrowTime}>{time} sec</Text>
      <IconButton
        icon="arrow-right"
        size={32}
        onPress={() => setIsDialogVisible(true)} // Ouvre la boîte de dialogue
      />

      {/* Dialog pour le slider */}
      <Portal>
        <Dialog
          visible={isDialogVisible}
          onDismiss={() => setIsDialogVisible(false)}
        >
          <Dialog.Title>Réglez le temps</Dialog.Title>
          <Dialog.Content>
            <Text style={styles.dialogText}>{time} sec</Text>
            <Slider
              style={styles.slider}
              minimumValue={1}
              maximumValue={30}
              step={1}
              value={time}
              onValueChange={handleTimeChange}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setIsDialogVisible(false)}>Annuler</Button>
            <Button onPress={confirmTimeChange}>Confirmer</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Surface>
  )
}

const styles = StyleSheet.create({
  arrowContainer: {
    alignItems: 'center',
    marginHorizontal: 4,
    padding: 8,
  },
  arrowTime: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  dialogText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 16,
  },
})

export default ArrowStart
