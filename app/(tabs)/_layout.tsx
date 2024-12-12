import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Tabs, router } from 'expo-router'
import React from 'react'
import { Appbar, Menu, Tooltip } from 'react-native-paper'

import { Locales, TabBar, TabsHeader } from '@/lib'

const TabLayout = () => {
  const [visible, setVisible] = React.useState(false)

  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        tabBarHideOnKeyboard: true,
        header: (props) => <TabsHeader navProps={props} children={undefined} />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: Locales.t('titleHome'),
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
                <Menu.Item
                  title={Locales.t('titleSettings')}
                  leadingIcon="cog"
                  onPress={() => router.push('/settings')}
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
        name="paceCalculator"
        options={{
          title: Locales.t('paceCalculator'),
          headerRight: () => (
            <>
              <Tooltip title={Locales.t('titleSettings')}>
                <Appbar.Action
                  icon="cog"
                  onPress={() => router.push('/settings')}
                />
              </Tooltip>
            </>
          ),
          tabBarIcon: (props) => (
            <MaterialCommunityIcons
              {...props}
              size={24}
              name={
                props.focused
                  ? 'calculator-variant'
                  : 'calculator-variant-outline'
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="athleteProfiles"
        options={{
          title: Locales.t('athleteProfiles'),
          headerRight: () => (
            <>
              <Tooltip title={Locales.t('titleSettings')}>
                <Appbar.Action
                  icon="cog"
                  onPress={() => router.push('/settings')}
                />
              </Tooltip>
            </>
          ),
          tabBarIcon: (props) => (
            <MaterialCommunityIcons
              {...props}
              size={24}
              name={props.focused ? 'run-fast' : 'run'}
            />
          ),
        }}
      />
    </Tabs>
  )
}

export default TabLayout
