import { action as actionCreators } from 'typesafe-actions'
import { GET_COLOR_SCHEME, SET_COLOR_SCHEME } from './actionTypes'
import { GetColorScheme, SetColorScheme } from './types'

export const Creators = {
  getColorScheme: (): GetColorScheme => {
    return actionCreators(GET_COLOR_SCHEME)
  },
  setColorScheme: (colorScheme: string): SetColorScheme => {
    return actionCreators(SET_COLOR_SCHEME, colorScheme)
  },
}
