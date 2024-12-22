import React, { useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import {
  IconButton,
  Snackbar,
  RadioButton,
  Text,
  Card,
  Divider,
  List,
  Surface,
} from 'react-native-paper'

import { updateTheme } from '@/lib/services/settingsService'

import { useTheme } from '../themeContext'

const Settings = () => {
  const [message, setMessage] = useState({ visible: false, content: '' })

  // Utiliser le contexte du thème
  const { theme, setTheme } = useTheme()

  const handleChangeTheme = async (theme: 'auto' | 'light' | 'dark') => {
    try {
      await updateTheme(theme) // Mise à jour du thème via ton service
      setTheme(theme) // Mise à jour du thème dans le contexte
      console.log('Changement de thème pour :', theme)
    } catch (error) {
      console.error('Error:', error)
      setMessage({
        visible: true,
        content: 'Une erreur est survenue lors du changement de thème.',
      })
    }
  }

  return (
    <Surface style={styles.container}>
      <ScrollView>
        {/* Thème Section */}
        <Text variant="bodyLarge" style={styles.sectionTitle}>
          Thème
        </Text>
        <Card style={styles.card} elevation={3}>
          <RadioButton.Group
            value={theme}
            onValueChange={(value) =>
              handleChangeTheme(value as 'auto' | 'light' | 'dark')
            }
          >
            <List.Item
              title="Automatique"
              left={() => <IconButton icon="autorenew" size={24} />}
              right={() => <RadioButton value="auto" />}
            />
            <Divider />
            <List.Item
              title="Light"
              left={() => <IconButton icon="white-balance-sunny" size={24} />}
              right={() => <RadioButton value="light" />}
            />
            <Divider />
            <List.Item
              title="Dark"
              left={() => <IconButton icon="moon-waning-crescent" size={24} />}
              right={() => <RadioButton value="dark" />}
            />
          </RadioButton.Group>
        </Card>

        {/* Snackbar */}
        <Snackbar
          visible={message.visible}
          onDismiss={() => setMessage({ ...message, visible: false })}
          onIconPress={() => setMessage({ ...message, visible: false })}
        >
          {message.content}
        </Snackbar>
      </ScrollView>
    </Surface>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  sectionTitle: {
    margin: 10,
    fontWeight: 'bold',
  },
  card: {
    margin: 10,
  },
})

export default Settings
