import { SET_COLOR_SCHEME, SET_MEASUREMENT_UNIT } from './actionTypes'

export interface SettingsState {
  colorScheme: string
  measurementUnit: string
}

export type SetColorScheme = {
  type: typeof SET_COLOR_SCHEME
  payload: string
}

export type setMeasurementUnit = {
  type: typeof SET_MEASUREMENT_UNIT
  payload: string
}

export type SettingsActions = SetColorScheme | setMeasurementUnit
