import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { CommonActions } from '@react-navigation/native'
import React from 'react'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { BottomNavigation } from 'react-native-paper'

const TabBar = (props: BottomTabBarProps) => {
  const handleTabPress = ({
    route,
    preventDefault,
  }: {
    route: any
    preventDefault: () => void
  }) => {
    const event = props.navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    })

    if (event.defaultPrevented) {
      preventDefault()
    } else {
      props.navigation.dispatch({
        ...CommonActions.navigate(route.name, route.params),
        target: props.state.key,
      })
    }
  }

  const renderIcon = ({
    route,
    focused,
    color,
  }: {
    route: any
    focused: boolean
    color: string
  }) => {
    const { options } = props.descriptors[route.key]
    if (options.tabBarIcon) {
      return options.tabBarIcon({ focused, color, size: 24 })
    }
    return null
  }

  const getLabelText = ({ route }: { route: any }) => {
    const { options } = props.descriptors[route.key]
    return options.tabBarLabel ?? options.title ?? route.title
  }

  const renderTouchable = ({
    key,
    ...touchableProps
  }: { key: string } & TouchableOpacityProps) => {
    // Filtre les propriétés incompatibles (notamment delayLongPress avec null)
    const filteredProps = {
      ...touchableProps,
      delayLongPress: touchableProps.delayLongPress ?? undefined, // Remplace null par undefined
    }

    return <TouchableOpacity key={key} {...filteredProps} />
  }

  return (
    <BottomNavigation.Bar
      shifting
      navigationState={props.state}
      safeAreaInsets={props.insets}
      onTabPress={handleTabPress}
      renderIcon={renderIcon}
      getLabelText={getLabelText}
      renderTouchable={renderTouchable}
    />
  )
}

export default TabBar
