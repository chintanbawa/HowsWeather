import { UPDATE_TODAY_WEATHER } from './actionTypes'
import { WeatherActions, WeatherState } from './types'

const initialState: WeatherState = {
  todayWeather: null,
}

export default (state = initialState, action: WeatherActions) => {
  switch (action.type) {
    case UPDATE_TODAY_WEATHER:
      return { ...state, todayWeather: { ...action.payload } }
    default:
      return state
  }
}
