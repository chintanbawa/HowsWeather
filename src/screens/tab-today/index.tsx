import React from 'react'
import { Text, View } from 'react-native'
import { useTheme } from '@react-navigation/native'

const TodayScreens = () => {
  const { colors } = useTheme()
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: colors.text }}>Home Screen</Text>
    </View>
  )
}

export default TodayScreens
