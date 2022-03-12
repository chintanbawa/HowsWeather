import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { Alert } from 'react-native'
import { bindActionCreators } from 'redux'

import api from '../services/api'
import { ITokenStore } from '../services/TokenAccessMiddleware'

import { Creators as weatherActions } from '../store/weather/actions'

export let store: ITokenStore | null = null

export function setToken(tokenStore: ITokenStore) {
  store = tokenStore
}

function dispatch() {
  if (!store) {
    return null
  }

  return {
    weatherActions: bindActionCreators(weatherActions, store.dispatch),
  }
}

export type IApiResponse = {
  hasError: boolean
  result: AxiosResponse | undefined
}

// Make api call to Server
export const makeApiCall = async (
  method: string,
  url: string,
  request: AxiosRequestConfig,
  isAuthRequired: boolean = true,
  ignoreError: boolean = false,
): Promise<IApiResponse> => {
  if (isAuthRequired && store) {
    api.defaults.headers.common.Authorization = `Bearer ${store.authToken}`
  }

  try {
    let result

    if (method === HttpMethod.GET) {
      result = await api.get(url)
    } else if (method === HttpMethod.POST) {
      result = await api.post(url, request)
    } else if (method === HttpMethod.PUT) {
      result = await api.put(url, request)
    } else if (method === HttpMethod.DELETE) {
      result = await api.delete(url, { data: request })
    }

    return { hasError: false, result }
  } catch (err) {
    const error = err as AxiosError
    let errorObject

    if (error.response?.data) {
      errorObject = error.response.data
    } else if (error.request?.responseText) {
      errorObject = error.request.responseText
    } else {
      errorObject = error.message
    }

    if (errorObject) {
      let message = ''
      if (typeof errorObject.msg === 'object') {
        const errors = Object.values(errorObject.msg)
        errors.map(
          (msg, index) =>
            (message += msg[0] + (index === errors.length - 1 ? '' : '\n')),
        )
      } else if (typeof errorObject === 'string') {
        message = errorObject
      } else {
        message = errorObject.msg
      }

      if (!ignoreError) {
        Alert.alert(message)
      }
    }

    return { hasError: true, result: undefined }
  }
}

// Http Methods
export const HttpMethod = {
  GET: '@method/GET',
  POST: '@method/POST',
  PUT: '@method/PUT',
  DELETE: '@method/DELETE',
}
