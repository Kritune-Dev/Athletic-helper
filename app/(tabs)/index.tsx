import { Asset } from 'expo-asset'
import { Audio } from 'expo-av'
import { Camera, CameraType } from 'expo-camera'
import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet } from 'react-native'
import { Button, Surface, Text, Switch } from 'react-native-paper'

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
  const [showCamera, setShowCamera] = useState(false)

  useEffect(() => {
    const loadSettings = async () => {
      const soundSettings = await getSoundSettings()
      setSoundsEnabled(soundSettings.soundsEnabled)
      setVibrationsEnabled(soundSettings.vibrationsEnabled)
    }

    loadSettings()
    Asset.loadAsync(Object.values(sounds))
  }, [sounds])

  const playSound = async (phase: 'marks' | 'set' | 'go') => {
    if (!soundsEnabled) return
    try {
      const { sound } = await Audio.Sound.createAsync(sounds[phase])
      await sound.playAsync()
      sound.setOnPlaybackStatusUpdate((playbackStatus) => {
        if (playbackStatus.isLoaded && playbackStatus.didJustFinish) {
          sound.unloadAsync()
        }
      })
    } catch (error) {
      console.error('Error playing sound:', error)
    }
  }

  const [cameraType, setCameraType] = useState<CameraType>('back')
  const [cameraActive, setCameraActive] = useState(false)
  const { hasCameraPermission, permission, requestPermission } =
    useCameraPermissionsState()
  const { isTimerRunning, currentPhase, timeLeft, start, stopAndReset } =
    useChronometer(marksTime, setTime, playSound, vibrationsEnabled)

  const toggleCamera = () => {
    setCameraType((current) => (current === 'back' ? 'front' : 'back'))
  }

  const toggleShowCamera = (value: boolean) => {
    if (value) startCamera()
    else stopCamera()
  }

  const stopCamera = () => {
    setShowCamera(false)
    setCameraActive(false)
  }

  const startCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync()
    if (status === 'granted') {
      setShowCamera(true)
      setCameraActive(true)
    } else {
      Alert.alert('Accès refusé')
    }
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
      <Surface style={styles.switchContainer} elevation={0}>
        <Text style={styles.text}>Afficher la caméra</Text>
        <Switch
          value={showCamera}
          onValueChange={(value) => toggleShowCamera(value)}
        />
      </Surface>

      {showCamera && (
        <Surface style={styles.cameraWrapper} elevation={0}>
          <CameraControl
            cameraActive={cameraActive}
            cameraType={cameraType}
            hasPermission={hasCameraPermission}
            toggleCamera={toggleCamera}
            stopCamera={stopCamera}
            startCamera={startCamera}
          />
        </Surface>
      )}

      <Surface style={styles.startingSection} elevation={4}>
        <Surface style={styles.startingRow}>
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

      <Button mode="contained" onPress={isTimerRunning ? stopAndReset : start}>
        {isTimerRunning ? 'Stop' : 'Lancer le départ'}
      </Button>
    </Surface>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 18,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    marginBottom: 10,
    borderRadius: 8,
  },
  cameraWrapper: {
    height: 300, // Taille fixe pour la caméra
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 16,
  },
  startingSection: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderRadius: 10,
  },
  startingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    padding: 10,
    borderRadius: 10,
  },
})

export default Starting
