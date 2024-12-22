import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Redirect, Tabs } from 'expo-router'
import React from 'react'

import { Locales, TabBar, TabsHeader, useFirstTimeOpen } from '@/lib'

const TabLayout = () => {
  const { isFirstTime, isLoading } = useFirstTimeOpen()

  if (isLoading) return <></>
  if (isFirstTime) return <Redirect href="/onboarding" />

  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        tabBarHideOnKeyboard: true,
        header: (props) => <TabsHeader navProps={props} />,
      }}
    >
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

      <Tabs.Screen
        name="settings"
        options={{
          title: Locales.t('settings.title'),
          tabBarIcon: (props) => (
            <MaterialCommunityIcons
              {...props}
              size={24}
              name={props.focused ? 'cog' : 'cog-outline'}
            />
          ),
        }}
      />
    </Tabs>
  )
}

export default TabLayout
