import { Store } from 'redux'
import { Persistor, persistStore } from 'redux-persist'

export let persistor: Persistor

export function persistStoreDevice(store: Store) {
  persistor = persistStore(store)
  return persistor
}
