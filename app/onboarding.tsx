import AsyncStorage from '@react-native-async-storage/async-storage'
import { useCameraPermissions, useMicrophonePermissions } from 'expo-camera'
import { usePermissions } from 'expo-media-library'
import { router } from 'expo-router'
import React from 'react'
import { Alert, ScrollView, StyleSheet } from 'react-native'
import { Button, Card, Surface, Text } from 'react-native-paper'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated'

const OnBoarding = () => {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions()
  const [microphonePermission, requestMicrophonePermission] =
    useMicrophonePermissions()
  const [mediaLibraryPermission, requestMediaLibraryPermission] =
    usePermissions()

  const handleContinue = async () => {
    const allPermissionsGranted = await requestAllPermissions()
    if (allPermissionsGranted) {
      // navigate to tabs
      router.replace('/(tabs)')
    } else {
      Alert.alert('To continue please provide permissions in settings')
    }
  }

  async function requestAllPermissions() {
    const cameraStatus = await requestCameraPermission()
    if (!cameraStatus.granted) {
      Alert.alert('Error', 'Camera permission is required.')
      return false
    }

    const microphoneStatus = await requestMicrophonePermission()
    if (!microphoneStatus.granted) {
      Alert.alert('Error', 'Microphone permission is required.')
      return false
    }

    const mediaLibraryStatus = await requestMediaLibraryPermission()
    if (!mediaLibraryStatus.granted) {
      Alert.alert('Error', 'Media Library permission is required.')
      return false
    }

    // only set to true once user provides permissions
    // this prevents taking user to home screen without permissions
    await AsyncStorage.setItem('hasOpened', 'true')
    return true
  }

  const rotationAnimation = useSharedValue(0)

  rotationAnimation.value = withRepeat(
    withSequence(
      withTiming(25, { duration: 150 }),
      withTiming(0, { duration: 150 }),
    ),
    4, // Run the animation 4 times
  )

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotationAnimation.value}deg` }],
  }))

  return (
    <Surface style={styles.container}>
      <Surface style={styles.titleContainer} elevation={0}>
        <Text>Athlétisme Helper</Text>
        <Animated.View style={animatedStyle}>
          <Text style={styles.text}>👋</Text>
        </Animated.View>
      </Surface>
      <Surface style={styles.stepContainer} elevation={0}>
        <Surface style={styles.stepCard} elevation={0}>
          <Text>
            Welcome to friend! To provide the best experience, this app requires
            permissions for the following:
          </Text>
        </Surface>
        <Card style={styles.stepCard} elevation={3}>
          <Text style={styles.subtitle}>Camera Permissions</Text>
          <Text>🎥 For taking pictures and videos</Text>
        </Card>
        <Card style={styles.stepCard} elevation={3}>
          <Text style={styles.subtitle}>Microphone Permissions</Text>
          <Text>🎙️ For taking videos with audio</Text>
        </Card>
        <Card style={styles.stepCard} elevation={3}>
          <Text style={styles.subtitle}>Media Library Permissions</Text>
          <Text>📸 To save/view your amazing shots </Text>
        </Card>
        <Button onPress={handleContinue}>Continue</Button>
      </Surface>
    </Surface>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1 / 2,
    height: '100%',
    marginBottom: 16,
    borderRadius: 10,
  },
  stepContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    height: '100%',
    marginBottom: 30,
    borderRadius: 10,
  },
  stepCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
    borderRadius: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 28,
    lineHeight: 32,
    marginTop: -6,
  },
})

export default OnBoarding
