import { CameraView, CameraType } from 'expo-camera'
import * as MediaLibrary from 'expo-media-library'
import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { IconButton, Surface } from 'react-native-paper'

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
  const [mediaPermission, setMediaPermission] = useState<boolean | null>(null)
  const [videoUri, setVideoUri] = useState<string>('')

  // Demander la permission pour la galerie lors du montage
  useEffect(() => {
    const getMediaPermission = async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync()
      setMediaPermission(status === 'granted')
    }
    getMediaPermission()
  }, [])

  const handleStartRecording = async () => {
    if (cameraRef.current && !isRecording) {
      try {
        console.log('Lancement de la vidéo')
        setIsRecording(true)

        const video = await cameraRef.current.recordAsync({
          maxDuration: 5, // Durée max en secondes
        })

        // Sauvegarder dans la galerie si permission accordée
        if (mediaPermission) {
          console.log('Tentative enregistrement')
          const uri = video?.uri as string
          console.log('Video uri :', uri)
          //const result = await MediaLibrary.saveToLibraryAsync(uri) //Wait the fix
         // console.log('Vidéo sauvegardée dans la galerie')
        } else {
          console.warn('Permission pour la galerie non accordée')
        }
      } catch (error) {
        console.error("Erreur lors de l'enregistrement de la vidéo:", error)
        setIsRecording(false)
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

  // Gestion de la caméra prête
  const onCameraReady = () => {
    console.log('Caméra prête')
  }

  // Gestion des erreurs de montage de la caméra
  const onMountError = (error: any) => {
    console.log('Erreur de montage :', error)
  }

  return (
    <Surface style={styles.cameraSection} elevation={1}>
      <CameraView
        style={styles.camera}
        ref={cameraRef}
        facing={props.cameraType}
        active={props.cameraActive}
        mode="video"
        onCameraReady={onCameraReady}
        onMountError={onMountError}
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
          <IconButton icon="camera-off" size={24} onPress={props.stopCamera} />
        </Surface>
      </CameraView>
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
    borderRadius: 10,
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
