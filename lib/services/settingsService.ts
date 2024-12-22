// settingsServices.ts
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Color, Language, Setting } from '@/lib'

const SETTINGS_KEY = 'userSettings'

/**
 * Récupère les paramètres de l'utilisateur stockés.
 */
export const getSettings = async (): Promise<Setting> => {
  try {
    const storedSettings = await AsyncStorage.getItem(SETTINGS_KEY)
    return storedSettings
      ? JSON.parse(storedSettings)
      : { color: 'default', language: 'fr', theme: 'auto' }
  } catch (error) {
    console.error(
      'Erreur lors de la récupération des paramètres utilisateur :',
      error,
    )
    return { color: 'default', language: 'fr', theme: 'auto' }
  }
}

/**
 * Enregistre les paramètres de l'utilisateur.
 * @param settings - Les paramètres à enregistrer.
 */
export const saveSettings = async (settings: Setting): Promise<void> => {
  try {
    await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
  } catch (error) {
    console.error(
      "Erreur lors de l'enregistrement des paramètres utilisateur :",
      error,
    )
  }
}

/**
 * Met à jour uniquement la couleur.
 * @param color - La nouvelle couleur.
 */
export const updateColor = async (color: Color): Promise<void> => {
  try {
    const settings = await getSettings()
    settings.color = color
    await saveSettings(settings)
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la couleur :', error)
  }
}

/**
 * Met à jour uniquement la langue.
 * @param language - La nouvelle langue.
 */
export const updateLanguage = async (language: Language): Promise<void> => {
  try {
    const settings = await getSettings()
    settings.language = language
    console.log('Change language:', language)
    await saveSettings(settings)
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la langue :', error)
  }
}

/**
 * Met à jour uniquement le thème.
 * @param theme - Le nouveau thème.
 */
export const updateTheme = async (
  theme: 'auto' | 'light' | 'dark',
): Promise<void> => {
  try {
    const settings = await getSettings()
    settings.theme = theme
    await saveSettings(settings)
  } catch (error) {
    console.error('Erreur lors de la mise à jour du thème :', error)
  }
}
