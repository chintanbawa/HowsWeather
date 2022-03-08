import { combineReducers, Reducer } from 'redux'
import { persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

import weatherReducer from './weather/reducer'
import settingsReducer from './settings/reducer'

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['settings'],
}

const rootReducer: Reducer = combineReducers({
  weather: weatherReducer,
  settings: settingsReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default persistReducer(rootPersistConfig, rootReducer)
