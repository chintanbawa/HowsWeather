import React, { useEffect, useState } from 'react'
import { StyleProp, Text, View, ViewStyle } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import DropDownPicker, { ValueType } from 'react-native-dropdown-picker'

import { RootState } from '../../store/rootReducer'
import { setColorScheme } from '../../store/settings/actions'

const SettingsScreen = () => {
  const colorScheme = useSelector(
    (state: RootState) => state.settings.colorScheme,
  )
  const dispatch = useDispatch()

  const { colors } = useTheme()

  const [open, setOpen] = useState<boolean>(false)
  const [value, setValue] = useState<ValueType | null>(null)
  const [items, setItems] = useState([
    { label: 'System', value: 'system' },
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' },
  ])

  useEffect(() => {
    setValue(colorScheme)
  }, [colorScheme])

  useEffect(() => {
    if (value !== null) {
      dispatch(setColorScheme(value.toString()))
    }
  }, [value, dispatch])

  return (
    <View style={{ flex: 1, padding: 15 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ color: colors.text, marginRight: 10 }}>
          Color Scheme
        </Text>
        <DropDownPicker
          style={{
            borderColor: colors.text,
            backgroundColor: colors.card,
            height: 35,
          }}
          textStyle={{ color: colors.text }}
          containerStyle={{ flex: 1 }}
          dropDownContainerStyle={{ backgroundColor: colors.card }}
          tickIconStyle={{ tintColor: colors.text } as StyleProp<ViewStyle>}
          arrowIconStyle={{ tintColor: colors.text } as StyleProp<ViewStyle>}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
      </View>
    </View>
  )
}

export default SettingsScreen
