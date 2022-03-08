import { delay, put, all, takeLatest } from 'redux-saga/effects'
import { updateTodayWeather } from './actions'
import { FETCH_TODAY_WEATHER_BY_CITY } from './actionTypes'

export function* getTodayWeatherByCitySaga() {
  yield delay(2000)
  yield put(updateTodayWeather({ temp: '20' }))
}

function* weatherSaga(): any {
  return yield all([
    takeLatest(FETCH_TODAY_WEATHER_BY_CITY, getTodayWeatherByCitySaga),
  ])
}

export default weatherSaga
