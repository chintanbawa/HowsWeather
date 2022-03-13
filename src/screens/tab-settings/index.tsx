import React, { useEffect, useState } from 'react'
import {
  StyleProp,
  Text,
  View,
  ViewStyle,
  TouchableOpacity,
} from 'react-native'
import { Subheading, useTheme } from 'react-native-paper'
import DropDownPicker, { ValueType } from 'react-native-dropdown-picker'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import { Creators as settingsActions } from '../../store/settings/actions'
import { useAppDispatch, useAppSelector } from '../../hooks'

const SettingsScreen = () => {
  const colorScheme = useAppSelector(state => state.settings.colorScheme)
  const measurementUnit = useAppSelector(
    state => state.settings.measurementUnit,
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

      <View style={{ marginTop: 20 }}>
        <Subheading style={{ color: colors.text }}>
          Measurement Unit:
        </Subheading>

        <View
          style={{
            flexDirection: 'row',
            elevation: 0,
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            marginTop: 10,
          }}>
          {['Metric', 'Imperial'].map((unit, index) => {
            const isSelected = measurementUnit === unit
            return (
              <TouchableOpacity
                key={unit + index}
                onPress={() =>
                  dispatch(settingsActions.setMeasurementUnit(unit.toString()))
                }>
                <View
                  style={{
                    backgroundColor: isSelected ? colors.primary : '#0000',
                    paddingHorizontal: 30,
                    height: 40,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderRadius: 40,
                    borderColor: isSelected ? '#0000' : colors.primary,
                    borderWidth: isSelected ? 0 : 1.5,
                  }}>
                  {isSelected && (
                    <MaterialIcons name="check" size={25} color="white" />
                  )}
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: 'bold',
                      color: isSelected ? 'white' : colors.primary,
                      marginLeft: 5,
                    }}>
                    {unit}
                  </Text>
                </View>
              </TouchableOpacity>
            )
          })}
        </View>
      </View>
    </View>
  )
}

export default SettingsScreen
