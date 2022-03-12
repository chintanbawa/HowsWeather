import {
  FETCH_TODAY_WEATHER_BY_CITY,
  UPDATE_TODAY_WEATHER,
} from './actionTypes'

export interface WeatherInfo {
  location: Location
  current: Current
}

interface Current {
  last_updated_epoch: number
  last_updated: string
  temp_c: number
  temp_f: number
  is_day: number
  condition: Condition
  wind_mph: number
  wind_kph: number
  wind_degree: number
  wind_dir: string
  pressure_mb: number
  pressure_in: number
  precip_mm: number
  precip_in: number
  humidity: number
  cloud: number
  feelslike_c: number
  feelslike_f: number
  vis_km: number
  vis_miles: number
  uv: number
  gust_mph: number
  gust_kph: number
}

interface Condition {
  text: string
  icon: string
  code: number
}

interface Location {
  name: string
  region: string
  country: string
  lat: number
  lon: number
  tz_id: string
  localtime_epoch: number
  localtime: string
}

export interface WeatherState {
  todayWeather: WeatherInfo | null
}

export type FetchTodayWeatherByCity = {
  type: typeof FETCH_TODAY_WEATHER_BY_CITY
  payload: string
}

export type UploadTodayWeather = {
  type: typeof UPDATE_TODAY_WEATHER
  payload: WeatherInfo
}

export type WeatherActions = FetchTodayWeatherByCity | UploadTodayWeather
