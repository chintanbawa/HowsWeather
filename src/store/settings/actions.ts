import { action as actionCreators } from 'typesafe-actions'
import { GET_COLOR_SCHEME, SET_COLOR_SCHEME } from './actionTypes'
import { GetColorScheme, SetColorScheme } from './types'

export const getColorScheme = (): GetColorScheme =>
  actionCreators(GET_COLOR_SCHEME)

export const setColorScheme = (colorScheme: string): SetColorScheme =>
  actionCreators(SET_COLOR_SCHEME, colorScheme)
