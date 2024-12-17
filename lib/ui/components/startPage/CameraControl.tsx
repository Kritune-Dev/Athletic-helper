import { CameraView, CameraType } from 'expo-camera'
import React, { useState, useRef } from 'react'
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

const CameraControl = (props: CameraControlProps) => {
  const cameraRef = useRef<CameraView>(null)
  const [isRecording, setIsRecording] = useState(false)

  const handleTakePicture = async () => {
    if (cameraRef.current) {
      const picture = await cameraRef.current.takePictureAsync()
      console.log('Photo prise:', picture?.uri)
    }
  }

  const handleStartRecording = async () => {
    if (cameraRef.current && !isRecording) {
      try {
        console.log('Lancement de la vidéo')
        const video = await cameraRef.current.recordAsync({
          maxDuration: 1,
        })
        console.log(video)
        setIsRecording(true)
        console.log('Vidéo enregistrée:', video?.uri)
      } catch (error) {
        console.error("Erreur lors de l'enregistrement de la vidéo:", error)
      }
    }
  }

  const handleStopRecording = async () => {
    if (cameraRef.current && isRecording) {
      try {
        await cameraRef.current.stopRecording()
        setIsRecording(false)
        console.log('Enregistrement arrêté')
      } catch (error) {
        console.error("Erreur lors de l'arrêt de l'enregistrement:", error)
      }
    }
  }

  return (
    <Surface
      style={
        props.hasPermission
          ? styles.cameraSection
          : styles.cameraDisabledSection
      }
      elevation={1}
    >
      {props.hasPermission && props.cameraActive ? (
        <CameraView
          style={styles.camera}
          ref={cameraRef}
          facing={props.cameraType}
          active={props.cameraActive}
          mode="video"
          onCameraReady={() => console.log('Caméra prête')}
          onMountError={(error) => console.log('Erreur de montage :', error)}
        >
          <Surface style={styles.cameraOptions} elevation={2}>
            <IconButton
              icon="camera-switch"
              size={24}
              onPress={props.toggleCamera}
            />
            <IconButton
              icon={isRecording ? 'stop' : 'movie'}
              size={24}
              onPress={isRecording ? handleStopRecording : handleStartRecording}
            />
            <IconButton
              icon="camera-off"
              size={24}
              onPress={props.stopCamera}
            />
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
}

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
