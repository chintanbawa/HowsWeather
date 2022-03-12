import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'

import pRootReducer from './rootReducer'
import rootSaga from './rootSaga'
import { persistStoreDevice } from './persistor'
import TokenAccessMiddleware from '../services/TokenAccessMiddleware'

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware()

// Mount it on the Store
const store = createStore(
  pRootReducer,
  applyMiddleware(sagaMiddleware, logger, TokenAccessMiddleware),
)

persistStoreDevice(store)

// Run the saga
sagaMiddleware.run(rootSaga)

export default store
