import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import {
  TextInput,
  IconButton,
  Button,
  Surface,
  List,
} from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

const EditLinks = () => {
  const [links, setLinks] = useState<{ name: string; url: string }[]>([])

  const handleAddLink = () => {
    setLinks([...links, { name: '', url: '' }])
  }

  const handleSaveLinks = async () => {
    await AsyncStorage.setItem('useful_links', JSON.stringify(links))
    alert('Liens enregistrés avec succès')
  }

  const handleChangeLink = (
    index: number,
    field: 'name' | 'url',
    value: string,
  ) => {
    setLinks((prev) =>
      prev.map((link, i) => (i === index ? { ...link, [field]: value } : link)),
    )
  }

  const handleDeleteLink = (index: number) => {
    setLinks((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Surface style={styles.container}>
        <List.Section>
          {links.map((link, index) => (
            <List.Item
              key={index}
              title={
                <TextInput
                  label="Nom"
                  value={link.name}
                  onChangeText={(text) => handleChangeLink(index, 'name', text)}
                  style={styles.input}
                />
              }
              description={
                <TextInput
                  label="URL"
                  value={link.url}
                  onChangeText={(text) => handleChangeLink(index, 'url', text)}
                  style={styles.input}
                />
              }
              right={() => (
                <IconButton
                  icon="delete"
                  onPress={() => handleDeleteLink(index)}
                />
              )}
            />
          ))}
        </List.Section>
        <Button
          mode="outlined"
          onPress={handleAddLink}
          style={styles.addButton}
        >
          Ajouter un site
        </Button>
        <Button mode="contained" onPress={handleSaveLinks}>
          Enregistrer
        </Button>
      </Surface>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    marginVertical: 5,
    backgroundColor: 'transparent',
  },
  addButton: {
    marginTop: 20,
    marginBottom: 10,
  },
})

export default EditLinks
