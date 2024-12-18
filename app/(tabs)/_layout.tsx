import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Redirect, Tabs } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Appbar, List, Menu, Switch, Tooltip } from 'react-native-paper'

import { Locales, TabBar, TabsHeader, useFirstTimeOpen } from '@/lib'
import {
  getSoundSettings,
  updateSoundEnabled,
  updateVibrationEnabled,
} from '@/lib/services/soundService'

const TabLayout = () => {
  const [visible, setVisible] = React.useState(false)
  const { isFirstTime, isLoading } = useFirstTimeOpen()

  const [soundsEnabled, setSoundsEnabled] = useState(true) // Simuler l'état du son
  const [vibrationsEnabled, setVibrationsEnabled] = useState(true) // Simuler l'état des vibrations

  useEffect(() => {
    // Récupérer les paramètres de son et de vibrations au démarrage
    const loadSettings = async () => {
      const soundSettings = await getSoundSettings()
      setSoundsEnabled(soundSettings.soundsEnabled)
      setVibrationsEnabled(soundSettings.vibrationsEnabled)
    }

    loadSettings()
  }, [])

  // Gérer la modification des paramètres
  const handleSoundToggle = async (enabled: boolean) => {
    setSoundsEnabled(enabled)
    await updateSoundEnabled(enabled) // Enregistrer la modification du son
  }

  const handleVibrationToggle = async (enabled: boolean) => {
    setVibrationsEnabled(enabled)
    await updateVibrationEnabled(enabled) // Enregistrer la modification des vibrations
  }

  if (isLoading) return <></>
  if (isFirstTime) return <Redirect href="/onboarding" />

  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        tabBarHideOnKeyboard: true,
        header: (props) => <TabsHeader navProps={props} children={undefined} />,
      }}
    >
      <Tabs.Screen
        name="start"
        options={{
          title: Locales.t('start.title'),
          headerRight: () => (
            <>
              <Menu
                statusBarHeight={48}
                visible={visible}
                onDismiss={() => setVisible(false)}
                anchor={
                  <Tooltip title={Locales.t('options')}>
                    <Appbar.Action
                      icon="dots-vertical"
                      onPress={() => setVisible(true)}
                    />
                  </Tooltip>
                }
              >
                {/* Change Sound Settings */}
                <List.Item
                  title={Locales.t('sound')}
                  left={(props) => <List.Icon {...props} icon="music" />}
                  right={() => (
                    <Switch
                      style={{ marginLeft: 10 }}
                      value={soundsEnabled}
                      onValueChange={handleSoundToggle}
                    />
                  )}
                />

                {/* Change Vibration Settings */}
                <List.Item
                  title={Locales.t('vibration')}
                  left={(props) => <List.Icon {...props} icon="vibrate" />}
                  right={() => (
                    <Switch
                      style={{ marginLeft: 10 }}
                      value={vibrationsEnabled}
                      onValueChange={handleVibrationToggle}
                    />
                  )}
                />
              </Menu>
            </>
          ),
          tabBarIcon: (props) => (
            <MaterialCommunityIcons
              {...props}
              size={24}
              name={props.focused ? 'pistol' : 'pistol'}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="index"
        options={{
          title: Locales.t('home.title'),
          tabBarIcon: (props) => (
            <MaterialCommunityIcons
              {...props}
              size={24}
              name={props.focused ? 'home' : 'home-outline'}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="utils"
        options={{
          title: Locales.t('utilsPage.title'),
          tabBarIcon: (props) => (
            <MaterialCommunityIcons {...props} size={24} name="tools" />
          ),
        }}
      />
    </Tabs>
  )
}

export default TabLayout
