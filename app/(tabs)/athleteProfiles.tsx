import { Locales } from '@/lib'
import { router } from 'expo-router'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Surface } from 'react-native-paper'
import { WebView } from 'react-native-webview'

const AthleteProfiles = () => {
  const handleRequest = (request: any) => {
    // Vérifie si l'URL commence par https://bases.athle.fr/
    if (request.url.startsWith('https://bases.athle.fr/')) {
      // Navigue vers le modal avec l'URL en tant que paramètre
      router.push(`/modal?url=${encodeURIComponent(request.url)}`)
      return false // Empêche le WebView de charger l'URL directement
    }
    return true // Permet de charger d'autres URLs normalement
  }

  return (
    <View style={styles.container}>
      {/* Main WebView */}
      <View style={styles.webviewContainer}>
        <WebView
          style={styles.webview}
          source={{ uri: 'https://lepistard.run/' }}
          onShouldStartLoadWithRequest={handleRequest} // Intercepte les requêtes
        />
      </View>
      {/* Button to navigate to the favorites page */}
      <Surface
        elevation={0}
        style={{
          padding: 16,
          gap: 16,
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <Button mode="contained" onPress={() => router.push('/favorite')}>
          {Locales.t('favorite')}
        </Button>
      </Surface>
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
  webview: {
    flex: 1,
  },
})

export default AthleteProfiles
