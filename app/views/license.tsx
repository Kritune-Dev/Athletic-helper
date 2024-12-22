import AsyncStorage from '@react-native-async-storage/async-storage'
import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'
import * as ScreenOrientation from 'expo-screen-orientation'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, View, TouchableOpacity, Alert } from 'react-native'
import { Card, Text, IconButton, Surface } from 'react-native-paper'

const LICENSE_STORAGE_KEY = 'saved_license'

const License = () => {
  const [licenseImage, setLicenseImage] = useState<string | null>(null)

  useEffect(() => {
    const loadSavedLicense = async () => {
      const savedPath = await AsyncStorage.getItem(LICENSE_STORAGE_KEY)
      if (savedPath) {
        setLicenseImage(savedPath)
      }
    }
    loadSavedLicense()
  }, [])

  const saveImageLocally = async (uri: string) => {
    const fileName = uri.split('/').pop() // Extraire le nom de fichier
    const newPath = `${FileSystem.documentDirectory}${fileName}`

    try {
      await FileSystem.copyAsync({ from: uri, to: newPath })
      await AsyncStorage.setItem(LICENSE_STORAGE_KEY, newPath) // Enregistrer le chemin
      setLicenseImage(newPath)
    } catch (error) {
      console.error("Erreur lors de la sauvegarde de l'image :", error)
      Alert.alert('Erreur', "Impossible de sauvegarder l'image.")
    }
  }

  const handleCaptureLicense = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync()
    if (!permission.granted) {
      Alert.alert(
        'Permission refusée',
        'La caméra est nécessaire pour cette fonctionnalité.',
      )
      return
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    })

    if (!result.canceled) {
      saveImageLocally(result.assets[0].uri)
    }
  }

  const handleImportLicense = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    })

    if (!result.canceled) {
      saveImageLocally(result.assets[0].uri)
    }
  }

  const handleRotateScreen = async () => {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT)
  }

  return (
    <Surface style={styles.container}>
      <Card style={styles.card}>
        {licenseImage ? (
          <View>
            <Image source={{ uri: licenseImage }} style={styles.licenseImage} />
            <IconButton
              icon="screen-rotation"
              size={30}
              onPress={handleRotateScreen}
              style={styles.rotationIcon}
            />
          </View>
        ) : (
          <View style={styles.placeholder}>
            <TouchableOpacity
              onPress={handleCaptureLicense}
              style={styles.placeholderSection}
            >
              <IconButton icon="camera" size={40} />
              <Text>Prendre une photo</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity
              onPress={handleImportLicense}
              style={styles.placeholderSection}
            >
              <IconButton icon="image" size={40} />
              <Text>Importer</Text>
            </TouchableOpacity>
          </View>
        )}
      </Card>
    </Surface>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    marginBottom: 20,
  },
  licenseImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  placeholder: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#e0e0e0',
    padding: 20,
    borderRadius: 10,
  },
  placeholderSection: {
    alignItems: 'center',
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: '#aaa',
  },
  rotationIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  actionsCard: {
    padding: 10,
  },
})

export default License
