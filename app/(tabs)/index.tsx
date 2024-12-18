import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native'
import {
  Button,
  Avatar,
  Card,
  Surface,
  Text,
  IconButton,
} from 'react-native-paper'

import { Tools, Links } from '@/lib'

const Home = () => {
  const [links, setLinks] = useState(
    Links.map((link) => ({ ...link, isVisible: true })),
  )

  const openLink = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error('An error occurred while opening the URL: ', err),
    )
  }

  const navigateToShortcut = (screen: string) => {
    console.log(`Navigate to ${screen}`) // Replace this with your navigation logic
  }

  return (
    <Surface style={styles.container}>
      {/* Carte du profil */}
      <Card style={styles.card} elevation={3}>
        <View style={styles.profileRow}>
          <Avatar.Text size={75} label="CB" style={styles.avatar} />
          <View style={styles.infoContainer}>
            <Text variant="titleLarge" style={styles.name}>
              Corentin Bacconnais
            </Text>
            <Text variant="titleSmall" style={styles.club}>
              Club: ACL 44
            </Text>
          </View>
        </View>

        <Text style={styles.license} variant="labelLarge">
          N° 1188196
        </Text>

        <View style={styles.buttonContainer}>
          <Button mode="contained-tonal" style={styles.button} icon="pencil">
            Modifier
          </Button>
          <Button mode="contained-tonal" style={styles.button} icon="id-card">
            Voir ma licence
          </Button>
        </View>
      </Card>

      {/* Carte Sites utiles */}
      <Card style={styles.card} elevation={3}>
        <View style={styles.blockHeader}>
          <Text variant="titleMedium">Sites utiles</Text>
          <IconButton
            icon="pencil"
            size={20}
            onPress={() => {}}
            style={styles.editIcon}
          />
        </View>

        {/* Grille des sites utiles */}
        <ScrollView contentContainerStyle={styles.gridContainer}>
          {links.map((link, index) =>
            link.isVisible ? (
              <TouchableOpacity
                key={index}
                style={styles.gridItem}
                onPress={() => openLink(link.url)}
              >
                <Avatar.Image
                  size={50}
                  source={{ uri: link.faviconUrl }}
                  style={styles.icon}
                />
                <Text style={styles.siteLabel}>{link.name}</Text>
              </TouchableOpacity>
            ) : null,
          )}
        </ScrollView>
      </Card>

      {/* Carte Raccourcis */}
      <Card style={styles.card} elevation={3}>
        <View style={styles.blockHeader}>
          <Text variant="titleMedium">Raccourcis</Text>
          <IconButton
            icon="pencil"
            size={20}
            onPress={() => {}}
            style={styles.editIcon}
          />
        </View>

        {/* Grille des raccourcis */}
        <ScrollView contentContainerStyle={styles.gridContainer}>
          {Tools.map((tool, index) => (
            <TouchableOpacity
              key={index}
              style={styles.gridItem}
              onPress={() => navigateToShortcut(tool.route)}
            >
              <Avatar.Icon size={50} icon={tool.icon} style={styles.icon} />
              <Text style={styles.siteLabel}>{tool.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Card>
    </Surface>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 50,
  },
  card: {
    padding: 8,
    marginVertical: 8,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    marginRight: 15,
  },
  infoContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  club: {
    fontSize: 14,
    color: '#666',
  },
  license: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
    position: 'absolute',
    right: 16,
    top: 16,
  },
  blockHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 10,
  },
  editIcon: {
    padding: 0,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '30%',
    alignItems: 'center',
    marginVertical: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 2,
  },
  icon: {
    marginBottom: 8,
  },
  siteLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
})

export default Home
