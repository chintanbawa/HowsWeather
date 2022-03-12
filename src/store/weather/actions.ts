import { action as actionCreators } from 'typesafe-actions'

import {
  FETCH_TODAY_WEATHER_BY_CITY,
  UPDATE_TODAY_WEATHER,
} from './actionTypes'
import {
  FetchTodayWeatherByCity,
  UploadTodayWeather,
  WeatherInfo,
} from './types'

export const Creators = {
  getTodayWeatherByCity: (city: string): FetchTodayWeatherByCity => {
    return actionCreators(FETCH_TODAY_WEATHER_BY_CITY, city)
  },
  updateTodayWeather: (weatherInfo: WeatherInfo): UploadTodayWeather => {
    return actionCreators(UPDATE_TODAY_WEATHER, weatherInfo)
  },
}
