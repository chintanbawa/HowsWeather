import React, { ComponentPropsWithRef, useCallback, useMemo } from 'react'
import { View, ScrollView, ViewProps, Image } from 'react-native'
import { Subheading, Surface, Text, useTheme } from 'react-native-paper'
import { useFocusEffect } from '@react-navigation/native'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { Creators as weatherActions } from '../../store/weather/actions'

import CompassImage from '../../assets/images/compass.png'
import ArrowImage from '../../assets/images/arrow.png'

const elevation: number = 4

const TodayScreens = () => {
  const { colors } = useTheme()
  const todayWeather = useAppSelector(state => state.weather.todayWeather)
  const measurementUnit = useAppSelector(
    state => state.settings.measurementUnit,
  )

  const isUnitInMetric = useMemo(() => {
    return measurementUnit === 'Metric'
  }, [measurementUnit])

  // const { temp_c } = todayWeather?.current

  const dispatch = useAppDispatch()

  useFocusEffect(
    useCallback(() => {
      dispatch(weatherActions.getTodayWeatherByCity('Ludhiana'))
    }, []),
  )

  const RowContainer = (props: ViewProps) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: '3%',
      }}
      {...props}>
      {props.children}
    </View>
  )

  interface IWeatherInfoContainer extends ComponentPropsWithRef<typeof View> {
    headingText?: string
  }
  const WeatherInfoContainer = ({
    headingText,
    ...props
  }: IWeatherInfoContainer) => (
    <Surface
      style={[
        {
          width: '47%',
          aspectRatio: 1,
          borderRadius: 10,
          elevation,
        },
        props.style,
      ]}
      {...props}>
      <Surface
        style={{
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          borderRadius: 10,
        }}>
        {headingText && (
          <Text
            style={{
              backgroundColor: colors.primary,
              textAlign: 'center',
              padding: 5,
              color: 'white',
              fontWeight: '700',
            }}>
            {headingText}
          </Text>
        )}
        <View
          style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          {props.children}
        </View>
      </Surface>
    </Surface>
  )

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View>
        <View
          style={{
            height: 250,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{ color: colors.text, fontSize: 80, marginBottom: 10 }}>
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
              {todayWeather?.current?.condition.text}
            </Subheading>
          </Surface>
        </View>

        <View style={{ paddingHorizontal: 30 }}>
          {/* Row 1 */}
          <RowContainer>
            <WeatherInfoContainer headingText="Wind Speed">
              <Text style={{ fontSize: 30, marginBottom: 5 }}>
                {isUnitInMetric
                  ? Math.round(todayWeather?.current?.wind_kph)
                  : Math.round(todayWeather?.current?.wind_mph)}
              </Text>
              <Text>{isUnitInMetric ? 'Kph' : 'Mph'}</Text>
            </WeatherInfoContainer>

            <WeatherInfoContainer headingText="Wind Direction">
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
                      { rotate: `${todayWeather?.current?.wind_degree}deg` },
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
            <WeatherInfoContainer headingText="Pressure">
              <Text style={{ fontSize: 30, marginBottom: 5 }}>
                {isUnitInMetric
                  ? todayWeather?.current?.pressure_mb
                  : Math.round(todayWeather?.current?.pressure_in)}
              </Text>
              <Text>{isUnitInMetric ? 'mb' : 'in'}</Text>
            </WeatherInfoContainer>
            <WeatherInfoContainer headingText="Preception">
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
            <WeatherInfoContainer headingText="Humidity">
              <Text style={{ fontSize: 30, marginBottom: 5 }}>
                {todayWeather?.current?.humidity}
              </Text>
              <Text>%</Text>
            </WeatherInfoContainer>
            <WeatherInfoContainer headingText="Feels Like">
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
            <WeatherInfoContainer headingText="Visibility">
              <Text style={{ fontSize: 30, marginBottom: 5 }}>
                {isUnitInMetric
                  ? todayWeather?.current?.vis_km
                  : todayWeather?.current?.vis_miles}
              </Text>
              <Text>{isUnitInMetric ? 'km' : 'mi'}</Text>
            </WeatherInfoContainer>
            <WeatherInfoContainer headingText="UV">
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
