import { useState } from 'react'
import { Platform } from 'react-native'
import {
  deviceId,
  getVersion,
  getDeviceName
} from '../utils/DeviceUtils'

export enum DeviceRegistrationStatus {
  SUCCESS = 'SUCCESS',
  VALIDATION_FAILED = 'VALIDATION_FAILED',
  VERSION_FAILED = 'VERSION_FAILED',
  DEVICE_DISABLED = 'DEVICE_DISABLED',
  VERSION_WARNING = 'VERSION_WARNING',
  VERSION_ERROR = 'VERSION_ERROR',
  DEVICE_UNAUTHORISED = 'DEVICE_UNAUTHORISED',
  DEVICE_NOT_REGISTERED = 'DEVICE_NOT_REGISTERED',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

type DeviceRegistrationInput = {
  deviceAppId: string
  devicePlatform: string
  deviceName: string
  versionId: string
}

type DeviceRegistrationParams = {
  details: DeviceRegistrationInput
}

type RegisterDeviceResponse = {
  registerDevice: {
    status: DeviceRegistrationStatus
  }
}

type PushTokenRegistrationInput = {
  deviceAppId: string
  devicePlatform: string
  deviceName: string
  versionId: string
}

type PushTokenRegistrationParams = {
  details: PushTokenRegistrationInput
}

type RegisterPushTokenResponse = {
  registerPushToken: {
    status: DeviceRegistrationStatus
  }
}

type AuthoriseDeviceResponse = {
  authoriseDevice: {
    status: DeviceRegistrationStatus
  }
}

export const useDeviceRegistration = () => {
  const [authorisationError, setAuthorisationError] =
    useState<Error | undefined>()
  const [authorisationComplete, setAuthorisationComplete] =
    useState<DeviceRegistrationStatus | undefined>()

  const getDeviceRegistrationRequest = async () => {
    const deviceAppId = await deviceId() // this will generate a new UUID for a fresh installation
    const devicePlatform = Platform.OS
    const deviceName = getDeviceName()
    const versionId = getVersion()
    return {
      details: {
        deviceAppId: deviceAppId,
        devicePlatform: devicePlatform,
        deviceName: deviceName,
        versionId: versionId
      }
    }
  }
 
  // TO DO 
  const getPushTokenRegistrationRequest = async (pushToken: string) => {
    return {
      details: {
        ...(await getDeviceRegistrationRequest()).details,
        pushToken: pushToken
      }
    }
  }


  const makeRegisterDeviceRequest = async () => {
    // TODO register device requesrt
  }

  const makeAuthoriseRequest = async () => {
    // add request for authorise device
  }

  const makeRegisterPushTokenRequest = async (pushToken: string) => {
    // make a push notif
  }

  const authoriseDevice = async () => {
    setAuthorisationComplete(undefined)
    clearAuthorisationError()
    //if (await isNewInstallation()) {
      makeRegisterDeviceRequest() // also authorises device if registration is successful
    // } else {
    //   await makeAuthoriseRequest()
    // }
  }

  const clearAuthorisationError = () => {
    setAuthorisationError(undefined)
  }

  const registerPushToken = async (pushToken: string) => {
    setAuthorisationComplete(undefined)
    // always reset completion flag so that any components listening in will get the completion
    // after a retry
    clearAuthorisationError()
    await makeRegisterPushTokenRequest(pushToken)
  }

  return {
    authorisationError,
    authorisationComplete,
    authoriseDevice,
    clearAuthorisationError,
    registerPushToken
  }
}
