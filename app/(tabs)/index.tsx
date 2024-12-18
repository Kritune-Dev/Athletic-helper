import React from 'react'
import { StyleSheet } from 'react-native'
import { Text, Button, Card, Surface } from 'react-native-paper'

const Home = () => {
  return (
    <Surface style={styles.container}>
      <Card style={styles.card}>
        <Text>Profil du coureur</Text>
        <Text>Numéro de licence : #12345</Text>
      </Card>
      <Card style={styles.card}>
        <Text>Liens utiles :</Text>
        <Button mode="text" onPress={() => {}}>
          Site Comité Départemental
        </Button>
        <Button mode="text" onPress={() => {}}>
          Site Région
        </Button>
        <Button mode="text" onPress={() => {}}>
          Site FFA
        </Button>
      </Card>
      <Card style={styles.card}>
        <Text>Raccourcis personnalisables :</Text>
        {/* Ajoutez les raccourcis */}
      </Card>
    </Surface>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginVertical: 8,
    padding: 16,
  },
})

export default Home
