import {
  FETCH_TODAY_WEATHER_BY_CITY,
  UPDATE_TODAY_WEATHER,
} from './actionTypes'

export interface WeatherInfo {
  temp: String
}

export interface WeatherState {
  todayWeather: WeatherInfo | null
}

export type FetchTodayWeatherByCity = {
  type: typeof FETCH_TODAY_WEATHER_BY_CITY
}

export type UploadTodayWeather = {
  type: typeof UPDATE_TODAY_WEATHER
  payload: WeatherInfo
}

export type WeatherActions = FetchTodayWeatherByCity | UploadTodayWeather
