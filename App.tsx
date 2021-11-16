import React from 'react'
import { useColorScheme } from 'react-native'
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TodayScreens from './src/screens/tab-today'
import SevenDaysScreen from './src/screens/tab-seven-days'
import SettingsScreen from './src/screens/tab-settings'

const Tab = createBottomTabNavigator()

const App = () => {
  const isDarkMode = useColorScheme() === 'dark'

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

export default App
