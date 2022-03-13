import React, { useMemo } from 'react'
import { useColorScheme } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { Provider as PaperProvider, withTheme } from 'react-native-paper'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import TodayScreens from '../screens/tab-today'
import CitiesScreen from '../screens/tab-cities'
import SettingsScreen from '../screens/tab-settings'

import { ThemeType, getTheme } from '../theme'
import { useAppSelector } from '../hooks'

const Tab = createBottomTabNavigator()

const AppNavigationContainer = withTheme(({ theme }) => {
  const { colors } = theme
  return (
    <NavigationContainer theme={theme as ThemeType}>
      <Tab.Navigator
        initialRouteName="Today"
        screenOptions={({ route }) => ({
          headerStyle: { backgroundColor: colors.primary },
          headerTitleStyle: { color: 'white' },
          tabBarIcon: ({ color, size }) => {
            let iconName: string = ''

            if (route.name === 'Today') {
              iconName = 'cloud'
            } else if (route.name === 'Cities') {
              iconName = 'apartment'
            } else if (route.name === 'Settings') {
              iconName = 'settings'
            }

            // You can return any component that you like here!
            return <MaterialIcons name={iconName} size={size} color={color} />
          },
        })}>
        <Tab.Screen
          name="Today"
          component={TodayScreens}
          options={{ headerTitle: "Today's Weather" }}
        />
        <Tab.Screen name="Cities" component={CitiesScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
})

const Routes = () => {
  const colorScheme = useAppSelector(state => state.settings.colorScheme)
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
