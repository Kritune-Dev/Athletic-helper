import { router } from 'expo-router'
import React, { useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button } from 'react-native-paper'
import { WebView } from 'react-native-webview'

const AthleteProfiles = () => {
  const webViewRef = useRef<WebView>(null) // Référence pour WebView
  const [canGoBack, setCanGoBack] = useState(false) // Etat pour savoir si la WebView peut revenir en arrière

  const injectedJavaScript = `
    (function() {
      // Remplace la fonction window.open pour intercepter les pop-ups
      window.open = function(url, name, specs) {
        if (url.includes('/asp.net/athletes.aspx')) {
          window.ReactNativeWebView.postMessage(url);  // Envoie l'URL au React Native app
        } else {
          // Sinon, ouvre la pop-up dans une nouvelle fenêtre (comportement par défaut)
          return open(url, name, specs);
        }
      };
    })();
  `

  const handleWebViewMessage = (event: any) => {
    let athleteUrl = event.nativeEvent.data // Récupère l'URL envoyée

    // Vérifie et modifie l'URL si nécessaire
    if (athleteUrl.startsWith('http://bases.athle.com')) {
      athleteUrl = athleteUrl.replace(
        'http://bases.athle.com',
        'https://bases.athle.fr',
      )
    }

    // Ouvre le modal avec l'URL modifiée
    router.push(`/modal?url=${encodeURIComponent(athleteUrl)}`)
  }

  // Fonction pour vérifier si la WebView peut revenir en arrière
  const handleBackPress = () => {
    if (canGoBack && webViewRef.current) {
      webViewRef.current.goBack() // Va à la page précédente dans la WebView
    }
  }

  return (
    <View style={styles.container}>
      {/* Affiche le bouton de retour uniquement si la WebView peut revenir en arrière */}
      {canGoBack && <Button onPress={handleBackPress}>Retour</Button>}

      {/* WebView */}
      <View style={styles.webviewContainer}>
        <WebView
          ref={webViewRef} // Lier la WebView à la référence
          style={styles.webview}
          source={{ uri: 'https://lepistard.run/' }}
          injectedJavaScript={injectedJavaScript} // Injecte le script JS
          onMessage={handleWebViewMessage} // Gère les messages
          onNavigationStateChange={(navState) => {
            setCanGoBack(navState.canGoBack) // Met à jour l'état si la WebView peut revenir en arrière
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10, // Pour ne pas que le bouton touche le bord
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
