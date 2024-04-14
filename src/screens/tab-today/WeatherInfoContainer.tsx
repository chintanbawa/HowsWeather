import React, { ComponentPropsWithRef } from 'react'
import { View } from 'react-native'
import { Surface, Text } from 'react-native-paper'

interface IWeatherInfoContainer extends ComponentPropsWithRef<typeof View> {
  headingText?: string
  backgroundColor: string
  elevation: number
}

const WeatherInfoContainer = ({
  headingText,
  backgroundColor,
  elevation,
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
            backgroundColor,
            textAlign: 'center',
            padding: 5,
            color: 'white',
            fontWeight: '700',
          }}>
          {headingText}
        </Text>
      )}
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        {props.children}
      </View>
    </Surface>
  </Surface>
)

export default WeatherInfoContainer
