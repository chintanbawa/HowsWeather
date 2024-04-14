import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { View, ScrollView, Image } from 'react-native'
import { Subheading, Surface, Text, useTheme } from 'react-native-paper'
import { useFocusEffect } from '@react-navigation/native'
import Geolocation from '@react-native-community/geolocation'
import axios from 'axios'

//services
import { useAppDispatch, useAppSelector } from '../../hooks'
import { Creators as weatherActions } from '../../store/weather/actions'
//components
import WeatherInfoContainer from './WeatherInfoContainer'
import RowContainer from './RowContainer'
//assets
import CompassImage from '../../assets/images/compass.png'
import ArrowImage from '../../assets/images/arrow.png'
//env
import { LOCATION_PROVIDER_API_KEY } from '../../../env'

const TodayScreens = () => {
  const elevation: number = 4
  const { colors } = useTheme()
  const todayWeather = useAppSelector(state => state.weather.todayWeather)
  const measurementUnit = useAppSelector(
    state => state.settings.measurementUnit,
  )
  const [currentLocation, setCurrentLocation] = useState('')

  const isUnitInMetric = useMemo(() => {
    return measurementUnit === 'Metric'
  }, [measurementUnit])

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(weatherActions.getTodayWeatherByCity(currentLocation))
  }, [currentLocation, dispatch])

  useFocusEffect(
    useCallback(() => {
      Geolocation.getCurrentPosition(info => {
        const locationUrl = `http://api.positionstack.com/v1/reverse?access_key=${LOCATION_PROVIDER_API_KEY}&query=${info?.coords?.latitude},${info?.coords?.longitude}`
        axios
          .get(locationUrl)
          .then(res => {
            setCurrentLocation(res.data.data[0]?.label || 'Austin')
          })
          .catch(error => {
            console.log('error', error)
          })
      })
    }, []),
  )

  if (!currentLocation) {
    return (
      <View style={{ alignItems: 'center', padding: 10 }}>
        <Subheading style={{ fontWeight: 'bold' }}>Loading...</Subheading>
      </View>
    )
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View>
        <View
          style={{
            height: 250,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Surface
            style={{
              borderRadius: 8,
              marginBottom: 10,
            }}>
            <Text
              style={{
                color: colors.text,
                fontSize: 16,
                fontWeight: '600',
                textAlign: 'center',
                paddingVertical: 10,
                paddingHorizontal: 20,
              }}>
              {currentLocation}
            </Text>
          </Surface>
          <Text
            style={{ color: colors.primary, fontSize: 80, marginBottom: 10 }}>
            {isUnitInMetric
              ? Math.round(todayWeather?.current?.temp_c) + '\u00B0' + 'c'
              : Math.round(todayWeather?.current?.temp_f) + '\u00B0' + 'f'}
          </Text>
          <Surface
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 20,
              borderRadius: 40,
              elevation,
            }}>
            <Image
              source={{
                uri: `https:${todayWeather?.current?.condition.icon}`,
              }}
              style={{ width: 40, height: 40 }}
              resizeMode="contain"
            />
            <Subheading style={{ paddingEnd: 14, fontWeight: '700' }}>
              {todayWeather?.current.is_day === 1 ? 'Day' : 'Night'} (
              {todayWeather?.current?.condition.text})
            </Subheading>
          </Surface>
        </View>

        <View style={{ paddingHorizontal: 30 }}>
          {/* Row 1 */}
          <RowContainer>
            <WeatherInfoContainer
              headingText="Wind Speed"
              elevation={elevation}
              backgroundColor={colors.primary}>
              <Text style={{ fontSize: 30, marginBottom: 5 }}>
                {isUnitInMetric
                  ? Math.round(todayWeather?.current?.wind_kph)
                  : Math.round(todayWeather?.current?.wind_mph)}
              </Text>
              <Text>{isUnitInMetric ? 'Kph' : 'Mph'}</Text>
            </WeatherInfoContainer>

            <WeatherInfoContainer
              headingText="Wind Direction"
              elevation={elevation}
              backgroundColor={colors.primary}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 5,
                }}>
                <Image
                  source={CompassImage}
                  style={{ width: 75, height: 75, tintColor: colors.text }}
                  resizeMode="contain"
                />
                <Image
                  source={ArrowImage}
                  style={{
                    width: 60,
                    height: 60,
                    position: 'absolute',
                    tintColor: colors.text,
                    transform: [
                      {
                        rotate: todayWeather?.current?.wind_degree
                          ? `${todayWeather?.current?.wind_degree}deg`
                          : '0deg',
                      },
                    ],
                  }}
                  resizeMode="contain"
                />
              </View>
              <Text> {todayWeather?.current?.wind_dir}</Text>
            </WeatherInfoContainer>
          </RowContainer>
          {/* Row 1 */}

          {/* Row 2 */}
          <RowContainer>
            <WeatherInfoContainer
              headingText="Pressure"
              elevation={elevation}
              backgroundColor={colors.primary}>
              <Text style={{ fontSize: 30, marginBottom: 5 }}>
                {isUnitInMetric
                  ? todayWeather?.current?.pressure_mb
                  : Math.round(todayWeather?.current?.pressure_in)}
              </Text>
              <Text>{isUnitInMetric ? 'mb' : 'in'}</Text>
            </WeatherInfoContainer>
            <WeatherInfoContainer
              headingText="Preception"
              elevation={elevation}
              backgroundColor={colors.primary}>
              <Text style={{ fontSize: 30, marginBottom: 5 }}>
                {isUnitInMetric
                  ? todayWeather?.current?.precip_mm
                  : todayWeather?.current?.precip_in}
              </Text>
              <Text>{isUnitInMetric ? 'mm' : 'in'}</Text>
            </WeatherInfoContainer>
          </RowContainer>
          {/* Row 2 */}

          {/* Row 3 */}
          <RowContainer>
            <WeatherInfoContainer
              headingText="Humidity"
              elevation={elevation}
              backgroundColor={colors.primary}>
              <Text style={{ fontSize: 30, marginBottom: 5 }}>
                {todayWeather?.current?.humidity}
              </Text>
              <Text>%</Text>
            </WeatherInfoContainer>
            <WeatherInfoContainer
              headingText="Feels Like"
              elevation={elevation}
              backgroundColor={colors.primary}>
              <Text style={{ fontSize: 30, marginBottom: 5 }}>
                {isUnitInMetric
                  ? Math.round(todayWeather?.current?.feelslike_c)
                  : Math.round(todayWeather?.current?.feelslike_f)}
              </Text>
              <Text>
                {'\u00B0'}
                {isUnitInMetric ? 'C' : 'F'}
              </Text>
            </WeatherInfoContainer>
          </RowContainer>
          {/* Row 3 */}

          {/* Row 4 */}
          <RowContainer>
            <WeatherInfoContainer
              headingText="Visibility"
              elevation={elevation}
              backgroundColor={colors.primary}>
              <Text style={{ fontSize: 30, marginBottom: 5 }}>
                {isUnitInMetric
                  ? todayWeather?.current?.vis_km
                  : todayWeather?.current?.vis_miles}
              </Text>
              <Text>{isUnitInMetric ? 'km' : 'mi'}</Text>
            </WeatherInfoContainer>
            <WeatherInfoContainer
              headingText="UV"
              elevation={elevation}
              backgroundColor={colors.primary}>
              <Text style={{ fontSize: 30, marginBottom: 5 }}>
                {todayWeather?.current?.uv}
              </Text>
            </WeatherInfoContainer>
          </RowContainer>
          {/* Row 4 */}
        </View>
        <View style={{ height: 20 }} />
      </View>
    </ScrollView>
  )
}

export default TodayScreens
