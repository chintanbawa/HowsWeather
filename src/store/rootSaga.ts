import { all, fork } from 'redux-saga/effects'
import weatherSaga from './weather/saga'

export default function* rootSaga(): any {
  return yield all([fork(weatherSaga)])
}
