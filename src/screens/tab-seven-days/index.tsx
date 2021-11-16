import React from 'react'
import { Text, View } from 'react-native'
import { useTheme } from '@react-navigation/native'

const SevenDaysScreen = () => {
  const { colors } = useTheme()
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: colors.text }}>7 Days</Text>
    </View>
  )
}

export default SevenDaysScreen
