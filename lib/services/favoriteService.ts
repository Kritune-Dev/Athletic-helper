import AsyncStorage from '@react-native-async-storage/async-storage'

export interface Favorite {
  name: string
  url: string
}

const FAVORITES_KEY = 'favorites'

/**
 * Récupère la liste des favoris stockés.
 */
export const getFavorites = async (): Promise<Favorite[]> => {
  try {
    const storedFavorites = await AsyncStorage.getItem(FAVORITES_KEY)
    return storedFavorites ? JSON.parse(storedFavorites) : []
  } catch (error) {
    console.error('Erreur lors de la récupération des favoris :', error)
    return []
  }
}

/**
 * Ajoute un favori à la liste.
 * @param favorite - L'objet favori à ajouter.
 */
export const addFavorite = async (favorite: Favorite): Promise<void> => {
  try {
    const favorites = await getFavorites()
    favorites.push(favorite)
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
  } catch (error) {
    console.error("Erreur lors de l'ajout du favori :", error)
  }
}

/**
 * Supprime un favori de la liste.
 * @param url - L'URL du favori à supprimer.
 */
export const removeFavorite = async (url: string): Promise<void> => {
  try {
    const favorites = await getFavorites()
    const updatedFavorites = favorites.filter((fav) => fav.url !== url)
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites))
  } catch (error) {
    console.error('Erreur lors de la suppression du favori :', error)
  }
}

/**
 * Vérifie si un favori existe déjà.
 * @param url - L'URL du favori à vérifier.
 */
export const isFavorite = async (url: string): Promise<boolean> => {
  try {
    const favorites = await getFavorites()
    return favorites.some((fav) => fav.url === url)
  } catch (error) {
    console.error('Erreur lors de la vérification du favori :', error)
    return false
  }
}
