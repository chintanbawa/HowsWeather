import axios from 'axios'
import DeviceInfo from 'react-native-device-info'
import { Platform } from 'react-native'
import { EnvironmentTypes } from '../types/environment-types'
import * as RNLocalize from 'react-native-localize'

let deviceId, appVersion, osVersion

if (!__DEV__) {
  deviceId = DeviceInfo.getUniqueId()
} else {
  deviceId =
    Platform.OS === 'ios' ? 'debug_ios_1234567890' : 'debug_android_1234567890'
}

appVersion = DeviceInfo.getVersion()
osVersion = DeviceInfo.getSystemVersion()

const platform = Platform.OS
const timezone = RNLocalize.getTimeZone()

export let serverHostUrl: string = ''

const getServerHost = (type: string) => {
  switch (type) {
    case EnvironmentTypes.Production:
      serverHostUrl = 'https://api.weatherapi.com'
      break
    case EnvironmentTypes.Staging:
      serverHostUrl = ''
      break
    case EnvironmentTypes.Local:
      serverHostUrl = ''
      break
    default:
      serverHostUrl = ''
      break
  }

  return serverHostUrl
}

const api = axios.create({
  baseURL: getServerHost(EnvironmentTypes.Production), //+ '/api',
  timeout: 300000,
  headers: {
    common: {
      'X-DeviceId': deviceId,
      'X-Platform': platform,
      'X-OSVersion': osVersion,
      'X-AppVersion': appVersion,
      'X-TimeZone': timezone,
    },
  },
})

export default api
