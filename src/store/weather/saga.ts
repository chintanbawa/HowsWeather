import { put, all, takeLatest } from 'redux-saga/effects'
import * as Effects from 'redux-saga/effects'
const call: any = Effects.call

import { WEATHER_API_KEY } from '../../../env'
import {
  HttpMethod,
  makeApiCall,
  IApiResponse,
} from '../../utils/CommonFunctions'
import { Creators } from './actions'
import { FETCH_TODAY_WEATHER_BY_CITY } from './actionTypes'
import { FetchTodayWeatherByCity } from './types'

export function* getTodayWeatherByCitySaga(input: FetchTodayWeatherByCity) {
  const response: IApiResponse = yield call(
    makeApiCall,
    HttpMethod.GET,
    `/v1/current.json?key=${WEATHER_API_KEY}&q=${input.payload}&aqi=no`,
    undefined,
    false,
    false,
  )

  if (response.hasError) {
    return
  }

  yield put(Creators.updateTodayWeather(response.result?.data))
}

function* weatherSaga(): any {
  return yield all([
    takeLatest(FETCH_TODAY_WEATHER_BY_CITY, getTodayWeatherByCitySaga),
  ])
}

export default weatherSaga
