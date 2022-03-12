import React, { useCallback, useMemo } from 'react'
import { useColorScheme } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { Provider as PaperProvider, withTheme } from 'react-native-paper'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useSelector } from 'react-redux'

import { RootState } from '../store/rootReducer'

import TodayScreens from '../screens/tab-today'
import SevenDaysScreen from '../screens/tab-seven-days'
import SettingsScreen from '../screens/tab-settings'

import { ThemeType, getTheme } from '../theme'

const Tab = createBottomTabNavigator()

const AppNavigationContainer = withTheme(({ theme }) => {
  const { colors } = theme
  return (
    <NavigationContainer theme={theme as ThemeType}>
      <Tab.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.primary },
          headerTitleStyle: { color: 'white' },
        }}>
        <Tab.Screen name="Today" component={TodayScreens} />
        <Tab.Screen name="7 Days" component={SevenDaysScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
})

const Routes = () => {
  const colorScheme = useSelector(
    (state: RootState) => state.settings.colorScheme,
  )
  // get system default color scheme
  const systemColorScheme = useColorScheme()

  const theme: ThemeType = useMemo(
    () => getTheme(colorScheme, systemColorScheme),
    [colorScheme, systemColorScheme],
  )

  return (
    <PaperProvider theme={theme}>
      <AppNavigationContainer theme={theme} />
    </PaperProvider>
  )
}

export default Routes
