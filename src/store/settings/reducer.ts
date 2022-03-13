import { SET_COLOR_SCHEME, SET_MEASUREMENT_UNIT } from './actionTypes'
import { SettingsActions, SettingsState } from './types'

const initialState: SettingsState = {
  colorScheme: 'system',
  measurementUnit: 'Metric',
}

export default (state = initialState, action: SettingsActions) => {
  switch (action.type) {
    case SET_COLOR_SCHEME:
      return { ...state, colorScheme: action.payload }
    case SET_MEASUREMENT_UNIT:
      return { ...state, measurementUnit: action.payload }
    default:
      return state
  }
}
