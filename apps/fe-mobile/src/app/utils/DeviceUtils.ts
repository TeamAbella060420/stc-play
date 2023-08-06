import { Platform } from 'react-native'
import uuid from 'react-native-uuid'
import DeviceInfo from 'react-native-device-info'


export const DEVICE_ID = 'deviceAppId' // ensure it's different from react-native-device-info's deviceUID

export const isAndroid = Platform.OS === 'android'

export const isIos = Platform.OS === 'ios'

export const wait = (timeout: number) => {
  return new Promise(resolve => setTimeout(resolve, timeout))
}

export const deviceId = async () => {
  // new installation of app so generate a UUID
  return uuid.v4().toString()
}

export const getBuildNumber = () => {
  const buildNumber = DeviceInfo.getBuildNumber()
  return buildNumber
}

export const getVersion = () => {
  const buildVersion = DeviceInfo.getVersion()
  return buildVersion
}
// don't get this getDeviceName confused with RNDI's getDeviceName
export const getDeviceName = () => {
  const deviceId = DeviceInfo.getDeviceId()
  return deviceId
}

export const getPlatform = () => {
  return Platform.OS
}
