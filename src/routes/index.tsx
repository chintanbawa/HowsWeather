import React from 'react'
import { useColorScheme } from 'react-native'
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useSelector } from 'react-redux'

import { RootState } from '../store/rootReducer'
import TodayScreens from '../screens/tab-today'
import SevenDaysScreen from '../screens/tab-seven-days'
import SettingsScreen from '../screens/tab-settings'

const Tab = createBottomTabNavigator()

const Routes = () => {
  const colorScheme = useSelector(
    (state: RootState) => state.settings.colorScheme,
  )

  // get system default color scheme
  const systemColorScheme = useColorScheme()

  // check if dark mode is enabled
  let isDarkMode = false
  if (colorScheme === 'system') {
    isDarkMode = systemColorScheme === 'dark'
  } else if (colorScheme === 'dark') {
    isDarkMode = true
  } else if (colorScheme === 'light') {
    isDarkMode = false
  }

  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <Tab.Navigator>
        <Tab.Screen name="Today" component={TodayScreens} />
        <Tab.Screen name="7 Days" component={SevenDaysScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default Routes
