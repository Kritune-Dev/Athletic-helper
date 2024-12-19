import AsyncStorage from '@react-native-async-storage/async-storage'

import { Profile } from '../types'

const PROFILE_KEY = 'userProfile' // Clé pour stocker le profil

// Fonction pour sauvegarder le profil dans AsyncStorage
export const saveProfile = async (profile: Profile) => {
  try {
    const jsonValue = JSON.stringify(profile)
    await AsyncStorage.setItem(PROFILE_KEY, jsonValue)
  } catch (error) {
    console.error('Error saving profile:', error)
  }
}

// Fonction pour charger le profil depuis AsyncStorage
export const loadProfile = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(PROFILE_KEY)
    return jsonValue != null ? JSON.parse(jsonValue) : null
  } catch (error) {
    console.error('Error loading profile:', error)
    return null
  }
}
