import React, { useState } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import {
  IconButton,
  Snackbar,
  RadioButton,
  Text,
  Card,
  Divider,
  Surface,
  Dialog,
  Portal,
  Button,
  List,
} from 'react-native-paper'

import { Color, Language, Locales } from '@/lib'
import { updateTheme } from '@/lib/services/settingsService'

import { useTheme } from '../../lib/hooks/themeContext'

const Settings = () => {
  const [message, setMessage] = useState({ visible: false, content: '' })
  const [showColorDialog, setShowColorDialog] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [vibrationEnabled, setVibrationEnabled] = useState(true)

  // Utiliser le contexte du thème
  const { theme, color, setTheme, setColor, language, setLanguage } = useTheme()

  const handleChangeTheme = async (theme: 'auto' | 'light' | 'dark') => {
    try {
      await updateTheme(theme) // Mise à jour du thème via ton service
      setTheme(theme) // Mise à jour du thème dans le contexte
      console.log(Locales.t('settings.themeChange'), theme)
    } catch (error) {
      console.error('Error:', error)
      setMessage({
        visible: true,
        content: Locales.t('settings.themeChangeError'),
      })
    }
  }

  const handleColorSelect = (selectedColor: Color) => {
    setColor(selectedColor) // Mettre à jour la couleur dans le contexte
    setShowColorDialog(false) // Fermer le dialogue de couleur
  }

  const handleSoundToggle = () => {
    setSoundEnabled((prev) => !prev)
  }

  const handleVibrationToggle = () => {
    setVibrationEnabled((prev) => !prev)
  }

  const handleLanguageSelect = (language: Language) => {
    setLanguage(language)
  }

  return (
    <Surface style={styles.container} elevation={5}>
      <ScrollView>
        {/* Thème Section */}
        <Text variant="bodyLarge" style={styles.sectionTitle}>
          {Locales.t('settings.theme.title')}
        </Text>
        <Card style={styles.card} elevation={1}>
          <View style={styles.optionContainer}>
            <IconButton icon="autorenew" size={24} />
            <Text style={styles.optionText}>
              {Locales.t('settings.theme.auto')}
            </Text>
            <RadioButton.Android
              value="auto"
              status={theme === 'auto' ? 'checked' : 'unchecked'}
              onPress={() => handleChangeTheme('auto')}
            />
          </View>
          <Divider />
          <View style={styles.optionContainer}>
            <IconButton icon="white-balance-sunny" size={24} />
            <Text style={styles.optionText}>
              {Locales.t('settings.theme.light')}
            </Text>
            <RadioButton.Android
              value="light"
              status={theme === 'light' ? 'checked' : 'unchecked'}
              onPress={() => handleChangeTheme('light')}
            />
          </View>
          <Divider />
          <View style={styles.optionContainer}>
            <IconButton icon="moon-waning-crescent" size={24} />
            <Text style={styles.optionText}>
              {Locales.t('settings.theme.dark')}
            </Text>
            <RadioButton.Android
              value="dark"
              status={theme === 'dark' ? 'checked' : 'unchecked'}
              onPress={() => handleChangeTheme('dark')}
            />
          </View>
        </Card>

        {/* Couleurs Section */}
        <Text variant="bodyLarge" style={styles.sectionTitle}>
          {Locales.t('settings.color.title')}
        </Text>
        <TouchableOpacity onPress={() => setShowColorDialog(true)}>
          <Card style={styles.card} elevation={1}>
            <View style={styles.optionContainer}>
              <IconButton icon="palette" size={24} />
              <Text style={styles.optionText}>
                {Locales.t('settings.color.customize')}
              </Text>
              <View
                style={[
                  styles.colorCircle,
                  { backgroundColor: color || '#000' },
                ]}
              />
            </View>
          </Card>
        </TouchableOpacity>

        {/* Son et Vibrations Section */}
        <Text variant="bodyLarge" style={styles.sectionTitle}>
          {Locales.t('settings.soundVibration.title')}
        </Text>
        <Card style={styles.card} elevation={1}>
          <View style={styles.optionContainer}>
            <IconButton
              icon={soundEnabled ? 'volume-high' : 'volume-off'}
              size={24}
            />
            <Text style={styles.optionText}>
              {Locales.t('settings.soundVibration.sound')}
            </Text>
            <RadioButton.IOS
              value="sound"
              status={soundEnabled ? 'checked' : 'unchecked'}
              onPress={handleSoundToggle}
            />
          </View>
          <Divider />
          <View style={styles.optionContainer}>
            <IconButton
              icon={vibrationEnabled ? 'vibrate' : 'vibrate-off'}
              size={24}
            />
            <Text style={styles.optionText}>
              {Locales.t('settings.soundVibration.vibration')}
            </Text>
            <RadioButton.IOS
              value="vibration"
              status={vibrationEnabled ? 'checked' : 'unchecked'}
              onPress={handleVibrationToggle}
            />
          </View>
        </Card>

        {/* Langue Section */}
        <Text variant="bodyLarge" style={styles.sectionTitle}>
          {Locales.t('settings.language.title')}
        </Text>
        <Card style={styles.card} elevation={1}>
          <View style={styles.optionContainer}>
            <IconButton icon="translate" size={24} />
            <Text style={styles.optionText}>
              {Locales.t('settings.language.label')}
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <Button
                mode={language === 'fr' ? 'contained' : 'text'}
                onPress={() => handleLanguageSelect('fr')}
                style={styles.languageButton}
              >
                {Locales.t('settings.language.fr')}
              </Button>
              <Button
                mode={language === 'en' ? 'contained' : 'text'}
                onPress={() => handleLanguageSelect('en')}
                style={styles.languageButton}
              >
                {Locales.t('settings.language.en')}
              </Button>
            </View>
          </View>
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

      {/* Color Dialog */}
      <Portal>
        <Dialog
          visible={showColorDialog}
          onDismiss={() => setShowColorDialog(false)}
        >
          <Dialog.Title>
            {Locales.t('settings.dialogs.color.title')}
          </Dialog.Title>
          <Dialog.Content>
            <List.Section>
              {[
                'orange',
                'red',
                'violet',
                'indigo',
                'blue',
                'teal',
                'cyan',
                'green',
                'lime',
                'olive',
                'brown',
              ].map((colorName) => (
                <List.Item
                  key={colorName}
                  title={Locales.t(`settings.colors.${colorName}`)}
                  onPress={() => handleColorSelect(colorName as Color)}
                  left={(props) => (
                    <View
                      style={[
                        styles.colorCircle,
                        { backgroundColor: colorName },
                      ]}
                    />
                  )}
                />
              ))}
            </List.Section>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowColorDialog(false)}>
              {Locales.t('settings.dialogs.color.close')}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Surface>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  sectionTitle: { margin: 10, fontWeight: 'bold' },
  card: { margin: 10 },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
    paddingRight: 10,
  },
  optionText: { flex: 1, textAlign: 'left' },
  colorCircle: { width: 20, height: 20, borderRadius: 15 },
  languageButton: { marginLeft: 5 },
})

export default Settings
