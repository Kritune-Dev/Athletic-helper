import { MaterialCommunityIcons } from '@expo/vector-icons'
import { JetBrainsMono_400Regular } from '@expo-google-fonts/jetbrains-mono'
import { NotoSans_400Regular } from '@expo-google-fonts/noto-sans'
import {
  DarkTheme as NavDarkTheme,
  DefaultTheme as NavLightTheme,
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { PaperProvider, adaptNavigationTheme } from 'react-native-paper'

import { Locales, StackHeader, Themes } from '@/lib'

// eslint-disable-next-line import/namespace
import { ThemeProvider, useTheme } from '../lib/hooks/themeContext'

export { ErrorBoundary } from 'expo-router'
SplashScreen.preventAutoHideAsync()

const RootLayout = () => {
  const [loaded, error] = useFonts({
    NotoSans_400Regular,
    JetBrainsMono_400Regular,
    ...MaterialCommunityIcons.font,
  })

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  React.useEffect(() => {
    if (error) throw error
  }, [error])

  React.useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <ThemeProvider>
      <RootLayoutNav />
    </ThemeProvider>
  )
}

const RootLayoutNav = () => {
  const { theme, color } = useTheme()

  const { DarkTheme, LightTheme } = adaptNavigationTheme({
    reactNavigationDark: NavDarkTheme,
    reactNavigationLight: NavLightTheme,
    materialDark: Themes.dark[color],
    materialLight: Themes.light[color],
  })

  return (
    <PaperProvider theme={Themes[theme === 'light' ? 'light' : 'dark'][color]}>
      <Stack
        screenOptions={{
          animation: 'slide_from_bottom',
          header: (props) => <StackHeader navProps={props} />,
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="favorite"
          options={{ title: Locales.t('titleFavorite') }}
        />
        <Stack.Screen
          name="onboarding"
          options={{
            presentation: 'fullScreenModal',
            headerShown: false,
            animation: 'fade',
          }}
        />
        <Stack.Screen name="modal" />
      </Stack>

      <StatusBar style="auto" />
    </PaperProvider>
  )
}

export default RootLayout
