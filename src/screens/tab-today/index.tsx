import React from 'react'
import { Button, Text, View } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { getTodayWeatherByCity } from '../../store/weather/actions'
import { RootState } from '../../store/rootReducer'

const TodayScreens = () => {
  const { colors } = useTheme()
  const todayWeather = useSelector(
    (state: RootState) => state.weather.todayWeather,
  )

  const dispatch = useDispatch()

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: colors.text }}>Home Screen</Text>
      <Text style={{ color: colors.text }}>
        Today weathr is {todayWeather?.temp ? todayWeather.temp : '-'}
      </Text>
      <Button
        onPress={() => dispatch(getTodayWeatherByCity('Ludhiana'))}
        title="Get Weather"
      />
    </View>
  )
}

export default TodayScreens
