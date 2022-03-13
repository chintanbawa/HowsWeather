import { action as actionCreators } from 'typesafe-actions'
import { SET_COLOR_SCHEME, SET_MEASUREMENT_UNIT } from './actionTypes'
import { SetColorScheme, setMeasurementUnit } from './types'

export const Creators = {
  setColorScheme: (colorScheme: string): SetColorScheme => {
    return actionCreators(SET_COLOR_SCHEME, colorScheme)
  },

  setMeasurementUnit: (measurementUnit: string): setMeasurementUnit => {
    return actionCreators(SET_MEASUREMENT_UNIT, measurementUnit)
  },
}
