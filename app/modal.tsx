import { useLocalSearchParams, useNavigation } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useCallback, useEffect, useState } from 'react'
import { Platform, View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import WebView from 'react-native-webview'

import {
  addFavorite,
  isFavorite,
  removeFavorite,
} from '@/lib/services/favoriteService'

const Modal = () => {
  const { url } = useLocalSearchParams()
  const [athleteName, setAthleteName] = useState<string | null>(null)
  const [isFavoriteState, setIsFavoriteState] = useState(false)
  const navigation = useNavigation()

  const urlString = typeof url === 'string' ? url : ''

  const toTitleCase = (str: string) => {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  const injectedJavaScript = `
    (function() {
      const nameElement = document.querySelector('#ctnMainDetails .titles span');
      const athleteName = nameElement ? nameElement.innerText.trim() : 'Nom non trouvé';
      window.ReactNativeWebView.postMessage(athleteName);
    })();
  `

  const onMessage = (event: any) => {
    const name = event.nativeEvent.data
    setAthleteName(toTitleCase(name))
  }

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (urlString) {
        const status = await isFavorite(urlString)
        setIsFavoriteState(status)
      }
    }
    checkFavoriteStatus()
  }, [urlString])

  const handleToggleFavorite = useCallback(async () => {
    if (urlString && athleteName) {
      if (isFavoriteState) {
        await removeFavorite(urlString)
      } else {
        await addFavorite({ name: athleteName, url: urlString })
      }
      setIsFavoriteState(!isFavoriteState)
    }
  }, [athleteName, urlString, isFavoriteState])

  useEffect(() => {
    if (athleteName) {
      navigation.setOptions({
        title: athleteName,
        headerRight: () => (
          <TouchableOpacity
            onPress={handleToggleFavorite}
            style={styles.favoriteButton}
          >
            <Text
              style={[styles.starIcon, isFavoriteState && styles.activeStar]}
            >
              {isFavoriteState ? '★' : '☆'}
            </Text>
          </TouchableOpacity>
        ),
      })
    }
  }, [athleteName, isFavoriteState, navigation, handleToggleFavorite])

  return (
    <View style={styles.container}>
      <View style={styles.webviewContainer}>
        {urlString && (
          <WebView
            style={styles.modalWebview}
            source={{ uri: urlString }}
            injectedJavaScript={injectedJavaScript}
            onMessage={onMessage}
          />
        )}
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webviewContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  modalWebview: {
    flex: 1,
    marginTop: 5,
  },
  favoriteButton: {
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  starIcon: {
    fontSize: 24, // Taille ajustée de l'étoile
    color: 'gray',
  },
  activeStar: {
    color: '#FFD700', // Couleur dorée pour l'étoile active
  },
})

export default Modal
