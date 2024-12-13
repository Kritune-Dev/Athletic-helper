import AsyncStorage from '@react-native-async-storage/async-storage'

const SOUND_SETTINGS_KEY = 'soundSettings'

export interface SoundSettings {
  soundsEnabled: boolean
  vibrationsEnabled: boolean
}

/**
 * Récupère les paramètres de son et de vibration stockés.
 */
export const getSoundSettings = async (): Promise<SoundSettings> => {
  try {
    const storedSettings = await AsyncStorage.getItem(SOUND_SETTINGS_KEY)
    return storedSettings
      ? JSON.parse(storedSettings)
      : { soundsEnabled: true, vibrationsEnabled: true }
  } catch (error) {
    console.error(
      'Erreur lors de la récupération des paramètres du son et des vibrations :',
      error,
    )
    return { soundsEnabled: true, vibrationsEnabled: true }
  }
}

/**
 * Enregistre les paramètres de son et de vibration.
 * @param settings - Les paramètres à enregistrer.
 */
export const saveSoundSettings = async (
  settings: SoundSettings,
): Promise<void> => {
  try {
    await AsyncStorage.setItem(SOUND_SETTINGS_KEY, JSON.stringify(settings))
  } catch (error) {
    console.error(
      "Erreur lors de l'enregistrement des paramètres du son et des vibrations :",
      error,
    )
  }
}

/**
 * Met à jour uniquement l'état du son.
 * @param enabled - Le nouvel état du son.
 */
export const updateSoundEnabled = async (enabled: boolean): Promise<void> => {
  try {
    const settings = await getSoundSettings()
    settings.soundsEnabled = enabled
    await saveSoundSettings(settings)
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'état du son :", error)
  }
}

/**
 * Met à jour uniquement l'état des vibrations.
 * @param enabled - Le nouvel état des vibrations.
 */
export const updateVibrationEnabled = async (
  enabled: boolean,
): Promise<void> => {
  try {
    const settings = await getSoundSettings()
    settings.vibrationsEnabled = enabled
    await saveSoundSettings(settings)
  } catch (error) {
    console.error(
      "Erreur lors de la mise à jour de l'état des vibrations :",
      error,
    )
  }
}
