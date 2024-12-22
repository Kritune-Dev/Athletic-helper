import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs'
import { getHeaderTitle } from '@react-navigation/elements'
import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Appbar, Avatar } from 'react-native-paper'

interface TabsHeaderProps {
  navProps: BottomTabHeaderProps
  userAvatar?: string // URL de l'image utilisateur ou texte pour Avatar
}

const TabsHeader = ({ navProps, userAvatar }: TabsHeaderProps) => {
  const isHomePage = navProps.route.name === 'index'

  // Titre et logo de l'application
  const appTitle = 'Athlétisme Helper'
  const appLogo = require('@/assets/images/icon.png') // Chemin vers ton logo local

  return (
    <Appbar.Header mode="center-aligned">
      {isHomePage ? (
        <View style={styles.homeContainer}>
          {/* Logo et titre pour la page d'accueil */}
          <Image source={appLogo} style={styles.logo} />
          <Appbar.Content title={appTitle} titleStyle={styles.title} />
          {userAvatar ? (
            <Avatar.Image
              size={36}
              source={{ uri: userAvatar }}
              style={styles.avatar}
            />
          ) : (
            <Avatar.Text size={36} label="CB" style={styles.avatar} />
          )}
        </View>
      ) : (
        <>
          {/* Titre centré pour les autres pages */}
          <Appbar.Content
            title={getHeaderTitle(navProps.options, navProps.route.name)}
            titleStyle={styles.titleCentered}
          />
        </>
      )}
    </Appbar.Header>
  )
}

const styles = StyleSheet.create({
  homeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    paddingHorizontal: 16, // Ajoute de l'espace des deux côtés
  },
  logo: {
    width: 36,
    height: 36,
    marginRight: 8, // Espace entre le logo et le titre
  },
  title: {
    fontWeight: 'bold',
  },
  avatar: {
    marginLeft: 8, // Espace entre le titre et l'avatar
    marginRight: 8, // Espace entre l'avatar et le bord de l'écran
  },
  titleCentered: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
})

export default TabsHeader
