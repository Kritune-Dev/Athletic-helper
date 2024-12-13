import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Button, IconButton, Surface, Text } from 'react-native-paper'

const Starting = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hasCameraPermission, setHasCameraPermission] = useState(true) // Change to true to test with permission

  const toggleCamera = () => {
    console.log('Caméra retournée')
  }

  const stopCamera = () => {
    console.log('Caméra arrêtée')
  }

  const openSettings = () => {
    console.log('Paramètres ouverts')
  }

  return (
    <Surface style={styles.screen}>
      {/* Zone pour la caméra */}
      <Surface
        style={
          hasCameraPermission
            ? styles.cameraSection
            : styles.cameraDisabledSection
        }
        elevation={1}
      >
        {hasCameraPermission ? (
          <>
            <Text style={styles.text}>Zone pour la caméra</Text>
            {/* Options de la caméra */}
            <Surface style={styles.cameraOptions} elevation={2}>
              <IconButton
                icon="camera-switch"
                size={24}
                onPress={toggleCamera}
              />
              <IconButton icon="camera-off" size={24} onPress={stopCamera} />
              <IconButton icon="cog" size={24} onPress={openSettings} />
            </Surface>
          </>
        ) : (
          <Text style={styles.text}>Caméra désactivée</Text>
        )}
      </Surface>

      {/* Zone pour la procédure de départ */}
      <Surface style={styles.startingSection} elevation={4}>
        <Surface style={styles.startingRow} elevation={4}>
          {/* Marks */}
          <Surface style={styles.startingElement} elevation={0}>
            <IconButton icon="flag" size={30} />
            <Text style={styles.startingText}>Marks</Text>
          </Surface>

          {/* Flèche et temps pour Marks */}
          <Surface style={styles.arrowContainer} elevation={0}>
            <Text style={styles.arrowTime}>5 sec</Text>
            <IconButton icon="arrow-right" size={32} />
          </Surface>

          {/* Set */}
          <Surface style={styles.startingElement} elevation={0}>
            <IconButton icon="run" size={30} />
            <Text style={styles.startingText}>Set</Text>
          </Surface>

          {/* Flèche et temps pour Set */}
          <Surface style={styles.arrowContainer} elevation={0}>
            <Text style={styles.arrowTime}>5 sec</Text>
            <IconButton icon="arrow-right" size={32} />
          </Surface>

          {/* Go */}
          <Surface style={styles.startingElement} elevation={0}>
            <IconButton icon="pistol" size={30} />
            <Text style={styles.startingText}>Go</Text>
          </Surface>
        </Surface>
      </Surface>

      {/* Bouton pour lancer le départ */}
      <Surface>
        <Button mode="contained" onPress={() => console.log('Départ lancé')}>
          Lancer le départ
        </Button>
      </Surface>
    </Surface>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    height: '100%',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
  },
  cameraSection: {
    justifyContent: 'center',
    backgroundColor: '#bbb',
    alignItems: 'center',
    flex: 1,
    marginBottom: 16,
    borderRadius: 10,
    height: '50%', // Par défaut, occupe 50% de la page
  },
  cameraDisabledSection: {
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1 / 6,
    marginBottom: 16,
    borderRadius: 10,
    height: '15%', // Par défaut, occupe 50% de la page
  },
  startingSection: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    height: '100%',
    marginBottom: 16,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  cameraOptions: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    width: '100%',
  },
  startingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 10,
    width: '100%',
    height: '100%',
  },
  startingElement: {
    alignItems: 'center',
    marginHorizontal: 4,
  },
  startingText: {
    fontSize: 20,
  },
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

export default Starting
