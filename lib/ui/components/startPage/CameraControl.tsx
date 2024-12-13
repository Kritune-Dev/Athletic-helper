import { CameraView, CameraType } from 'expo-camera'
import React from 'react'
import { StyleSheet } from 'react-native'
import { IconButton, Surface, Text } from 'react-native-paper'

type CameraControlProps = {
  cameraActive: boolean
  hasPermission: boolean
  cameraType: CameraType
  toggleCamera: () => void
  stopCamera: () => void
  startCamera: () => void
}

const CameraControl = (props: CameraControlProps) => (
  <Surface
    style={
      props.hasPermission ? styles.cameraSection : styles.cameraDisabledSection
    }
    elevation={1}
  >
    {props.hasPermission && props.cameraActive ? (
      <CameraView
        style={styles.camera}
        facing={props.cameraType}
        active={props.cameraActive}
      >
        <Surface style={styles.cameraOptions} elevation={2}>
          <IconButton
            icon="camera-switch"
            size={24}
            onPress={props.toggleCamera}
          />
          <IconButton icon="camera-off" size={24} onPress={props.stopCamera} />
          {/* Ajoutez d'autres boutons ici, comme pour filmer ou activer le flash */}
        </Surface>
      </CameraView>
    ) : (
      <>
        <Text style={styles.text}>Caméra désactivée</Text>
        <Surface style={styles.cameraOptions} elevation={2}>
          <IconButton icon="camera" size={24} onPress={props.startCamera} />
        </Surface>
      </>
    )}
  </Surface>
)

const styles = StyleSheet.create({
  cameraSection: {
    justifyContent: 'center',
    backgroundColor: '#bbb',
    alignItems: 'center',
    flex: 1,
    marginBottom: 16,
    borderRadius: 10,
    height: '50%',
  },
  cameraDisabledSection: {
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1 / 6,
    marginBottom: 16,
    borderRadius: 10,
    height: '15%',
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
  camera: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
})

export default CameraControl
