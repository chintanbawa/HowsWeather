import { GET_COLOR_SCHEME, SET_COLOR_SCHEME } from './actionTypes'

export interface SettingsState {
  colorScheme: string
}

export type GetColorScheme = {
  type: typeof GET_COLOR_SCHEME
}

export type SetColorScheme = {
  type: typeof SET_COLOR_SCHEME
  payload: string
}

export type SettingsActions = GetColorScheme | SetColorScheme
