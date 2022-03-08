import { SET_COLOR_SCHEME } from './actionTypes'
import { SettingsActions, SettingsState } from './types'

const initialState: SettingsState = {
  colorScheme: 'system',
}

export default (state = initialState, action: SettingsActions) => {
  switch (action.type) {
    case SET_COLOR_SCHEME:
      return { ...state, colorScheme: action.payload }
    default:
      return state
  }
}
