import { Asset } from 'expo-asset'
import { Audio } from 'expo-av'
import { Camera, CameraType } from 'expo-camera'
import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet } from 'react-native'
import { Button, Surface, Text } from 'react-native-paper'

import {
  CameraControl,
  TimerDisplay,
  IconStart,
  ArrowStart,
  useCameraPermissionsState,
  useChronometer,
} from '@/lib'
import { getSoundSettings } from '@/lib/services/soundService'

const soundFiles = {
  marks: require('@/assets/sounds/marks-beep.mp3'),
  set: require('@/assets/sounds/set-beep.mp3'),
  go: require('@/assets/sounds/go-pistol.mp3'),
}

const TIMER_CONFIG = {
  marksTime: 8,
  setTime: 5,
}

const Starting = () => {
  const [sounds] = useState(soundFiles)
  const [soundsEnabled, setSoundsEnabled] = useState(true)
  const [vibrationsEnabled, setVibrationsEnabled] = useState(true)
  const [setTime, setSetTime] = useState(TIMER_CONFIG.setTime)
  const [marksTime, setMarksTime] = useState(TIMER_CONFIG.marksTime)

  // Charger les paramètres utilisateur
  useEffect(() => {
    const loadSettings = async () => {
      const soundSettings = await getSoundSettings()
      setSoundsEnabled(soundSettings.soundsEnabled)
      setVibrationsEnabled(soundSettings.vibrationsEnabled)
    }

    loadSettings()

    // Préchargement des fichiers audio
    Asset.loadAsync(Object.values(sounds))
  }, [sounds])

  // Réagir aux changements de paramètres
  const updateSettings = async () => {
    const soundSettings = await getSoundSettings()
    setSoundsEnabled(soundSettings.soundsEnabled)
    setVibrationsEnabled(soundSettings.vibrationsEnabled)
  }

  const playSound = async (phase: 'marks' | 'set' | 'go') => {
    if (!soundsEnabled) return

    try {
      await updateSettings()
      const { sound } = await Audio.Sound.createAsync(sounds[phase])
      await sound.playAsync()
      sound.setOnPlaybackStatusUpdate((playbackStatus) => {
        if (playbackStatus.isLoaded) {
          if (playbackStatus.didJustFinish) {
            sound.unloadAsync()
          }
        }
      })
    } catch (error) {
      console.error('Error playing sound:', error)
    }
  }

  const [cameraType, setCameraType] = useState<CameraType>('back')
  const [cameraActive, setCameraActive] = useState<boolean>(false)
  const { hasCameraPermission, permission, requestPermission } =
    useCameraPermissionsState()
  const { isTimerRunning, currentPhase, timeLeft, start, stopAndReset } =
    useChronometer(marksTime, setTime, playSound, vibrationsEnabled)

  function toggleCamera() {
    setCameraType((current) => (current === 'back' ? 'front' : 'back'))
  }

  const stopCamera = () => {
    console.log('Caméra arrêtée')
    setCameraActive(false)
  }

  const startCamera = async () => {
    console.log('Caméra redémarrée')
    const { status } = await Camera.requestCameraPermissionsAsync()
    console.log(status)
    if (status === 'granted') {
      setCameraActive(true)
    } else {
      Alert.alert('Access denied')
    }
    setCameraActive(true)
  }

  if (!permission) {
    return <Text>Chargement des permissions...</Text>
  }

  if (!hasCameraPermission) {
    return (
      <Surface style={styles.screen}>
        <Text style={styles.text}>
          Nous avons besoin de votre permission pour utiliser la caméra
        </Text>
        <Button mode="contained" onPress={requestPermission}>
          Accorder la permission
        </Button>
      </Surface>
    )
  }

  return (
    <Surface style={styles.screen}>
      <CameraControl
        cameraActive={cameraActive}
        cameraType={cameraType}
        hasPermission={hasCameraPermission}
        toggleCamera={toggleCamera}
        stopCamera={stopCamera}
        startCamera={startCamera}
      />

      <Surface style={styles.startingSection} elevation={4}>
        <Surface style={styles.startingRow} elevation={4}>
          <IconStart title="Marks" icon="flag" />
          <ArrowStart
            initialTime={marksTime}
            onTimeChange={(value) => setMarksTime(value)}
          />
          <IconStart title="Set" icon="run" />
          <ArrowStart
            initialTime={setTime}
            onTimeChange={(value) => setSetTime(value)}
          />
          <IconStart title="Go" icon="pistol" />
        </Surface>
      </Surface>
      <TimerDisplay phase={currentPhase} timeLeft={timeLeft} />
      <Surface>
        <Button
          mode="contained"
          onPress={isTimerRunning ? stopAndReset : start}
        >
          {isTimerRunning ? 'Stop' : 'Lancer le départ'}
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
  startingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 10,
    width: '100%',
    height: '100%',
  },
})

export default Starting
