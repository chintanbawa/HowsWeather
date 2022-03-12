import React, { useEffect, useState } from 'react'
import { StyleProp, Text, View, ViewStyle } from 'react-native'
import { useTheme } from 'react-native-paper'
import DropDownPicker, { ValueType } from 'react-native-dropdown-picker'

import { RootState } from '../../store/rootReducer'
import { Creators as settingsActions } from '../../store/settings/actions'
import { useAppDispatch, useAppSelector } from '../../hooks'

const SettingsScreen = () => {
  const colorScheme = useAppSelector(
    (state: RootState) => state.settings.colorScheme,
  )
  const dispatch = useAppDispatch()

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
      dispatch(settingsActions.setColorScheme(value.toString()))
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
            backgroundColor: colors.surface,
            height: 35,
          }}
          textStyle={{ color: colors.text }}
          containerStyle={{ flex: 1 }}
          dropDownContainerStyle={{ backgroundColor: colors.surface }}
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
