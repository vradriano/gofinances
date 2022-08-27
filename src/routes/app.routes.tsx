import React from 'react'
import { useTheme } from 'styled-components'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Dashboard } from '../screens/Dashboard'
import { Register } from '../screens/Register'

const { Navigator, Screen } = createBottomTabNavigator()

export function AppRoutes() {
  const theme = useTheme()

  return (
    <Navigator>
      <Screen 
        name='Listagem'
        component={Dashboard}
      />

      <Screen 
        name='Cadastrar'
        component={Register}
      />


      <Screen 
        name='Resumo'
        component={Register}
      />
    </Navigator>
  )
}