import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import React from 'react'
import { Appbar } from 'react-native-paper'

interface StackHeaderProps {
  navProps: NativeStackHeaderProps
}

const StackHeader = ({ navProps }: StackHeaderProps) => {
  return (
    <Appbar.Header mode="center-aligned">
      {/* Flèche arrière pour la navigation */}
      {navProps.navigation.canGoBack() && (
        <Appbar.BackAction onPress={() => navProps.navigation.goBack()} />
      )}

      {/* Titre centré */}
      <Appbar.Content
        title={navProps.route.name} // Utilise le nom de la route comme titre
        titleStyle={{ fontWeight: 'bold' }}
      />
    </Appbar.Header>
  )
}

export default StackHeader
