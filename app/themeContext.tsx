import React, { createContext, useContext, useState, useEffect } from 'react'
import { useColorScheme } from 'react-native'

import { Color, Language, Setting, Themes, ThemeType } from '@/lib'
import {
  getSettings,
  saveSettings,
  updateTheme,
  updateColor,
} from '@/lib/services/settingsService'

// Définir un type pour le contexte du thème
interface ThemeContextProps {
  theme: ThemeType
  color: Color
  setTheme: (theme: ThemeType) => void
  setColor: (color: Color) => void
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>('auto')
  const [color, setColor] = useState<Color>('default')
  const [language] = useState<Language>('fr')
  const colorScheme = useColorScheme()

  // Charger les paramètres de thème depuis AsyncStorage
  useEffect(() => {
    const loadSettings = async () => {
      const settings = await getSettings()
      if (settings) {
        setTheme(settings.theme || 'auto')
        setColor(settings.color || 'default')
      }
    }
    loadSettings()
  }, [])

  // Mettre à jour AsyncStorage lorsque les paramètres changent
  useEffect(() => {
    const saveCurrentSettings = async () => {
      const settings: Setting = {
        color,
        theme,
        language,
      }
      await saveSettings(settings) // Sauvegarde les paramètres complets
    }
    saveCurrentSettings()
  }, [theme, color, language])

  const currentTheme =
    Themes[theme === 'auto' ? (colorScheme ?? 'dark') : theme][color]

  const handleSetTheme = async (newTheme: ThemeType) => {
    setTheme(newTheme)
    await updateTheme(newTheme)
  }

  const handleSetColor = async (newColor: Color) => {
    setColor(newColor)
    await updateColor(newColor as Color)
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        color,
        setTheme: handleSetTheme,
        setColor: handleSetColor,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
