import { useCameraPermissions } from 'expo-camera'
import { useState, useEffect } from 'react'

const useCameraPermissionsState = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState(false)
  const [permission, requestPermission] = useCameraPermissions()

  useEffect(() => {
    if (permission?.status === 'granted') {
      setHasCameraPermission(true)
    }
  }, [permission])

  return { hasCameraPermission, permission, requestPermission }
}

export default useCameraPermissionsState
