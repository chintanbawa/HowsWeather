import React from 'react'
import { View, ViewProps } from 'react-native'

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

export default RowContainer
