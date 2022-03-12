import React, { useCallback } from 'react'
import { Text, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { useFocusEffect } from '@react-navigation/native'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { Creators as weatherActions } from '../../store/weather/actions'

const TodayScreens = () => {
  const { colors } = useTheme()
  const todayWeather = useAppSelector(state => state.weather.todayWeather)

  const dispatch = useAppDispatch()

  useFocusEffect(
    useCallback(() => {
      dispatch(weatherActions.getTodayWeatherByCity('Ludhiana'))
    }, []),
  )

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: colors.text }}>Home Screen</Text>
      <Text style={{ color: colors.text }}>
        Today weathr is {todayWeather?.current?.temp_c}
      </Text>
    </View>
  )
}

export default TodayScreens
