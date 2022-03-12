import { MiddlewareAPI, Dispatch, AnyAction } from 'redux'
import { AppDispatch, RootState } from '../store/rootReducer'
import { setToken } from '../utils/CommonFunctions'

export interface ITokenStore {
  authToken: string | undefined
  dispatch: AppDispatch
}

const TokenAccessMiddleware =
  (store: MiddlewareAPI<RootState>) =>
  (next: Dispatch<AnyAction>) =>
  (action: AnyAction) => {
    const state = store.getState()

    setToken({
      authToken: '', //state.user.authToken,
      dispatch: store.dispatch,
    })

    // continue processing this action
    return next(action)
  }

export default TokenAccessMiddleware
