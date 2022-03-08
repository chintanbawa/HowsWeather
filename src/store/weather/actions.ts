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

export const getTodayWeatherByCity = (input: String): FetchTodayWeatherByCity =>
  actionCreators(FETCH_TODAY_WEATHER_BY_CITY, input)
export const updateTodayWeather = (
  weatherInfo: WeatherInfo,
): UploadTodayWeather => actionCreators(UPDATE_TODAY_WEATHER, weatherInfo)
