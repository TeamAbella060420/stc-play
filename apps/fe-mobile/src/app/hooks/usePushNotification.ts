import PushNotificationIOS from '@react-native-community/push-notification-ios'
import PushNotification, { PushNotificationPermissions } from 'react-native-push-notification';
import { useDeviceRegistration } from '../hooks/useDeviceRegistration'
import {
  checkNotificationPermissions,
  initPushNotifications,
  PushNotificationPayload,
  PushTokenPayload
} from '../utils/NotificationService'

import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isIos } from '../utils/DeviceUtils'

import {
  notificationReceived,
  pushPermissionReceived,
  PushPermissionState
} from '@fe-monorepo/store'
import { RootState } from '@fe-monorepo/store'


const simErrorCode = 3010


PushNotification.createChannel({
    channelId:'stcplay-notification-channel',
    channelName:'stcplay-channel'
});

export const usePushNotification = () => {
  const {
    registerPushToken,
    authorisationError: registerPushTokenError,
    authorisationComplete: registerPushTokenComplete
  } = useDeviceRegistration()
  
  const dispatch = useDispatch()
  const [permission, setPermission] = useState<PushPermissionState | null>(null)
  const [registerToken, setRegisterToken] = useState<string | null>(null)
  const ignoreNotificationsRef = useRef(false)

  const tokenRequested = useSelector(
    (state: RootState) => state.pushnotification.tokenRequested
  )

  const ignoreNotifications = useSelector(
    (state: RootState) => state.pushnotification.ignoreNotifications
  )

  const onTokenReceived = async (token: PushTokenPayload) => {
    const pushToken = token.token
    console.log(
      'We have configured push notifications and here is your token',
      token
    )
    //console.log('device id:', await deviceId())
    if (pushToken) {
      console.log('Saving token', pushToken)
      setRegisterToken(pushToken)
      // we have received a token now we request permission from the user
      // requesting permission, then getting a token results in this callback function being called twice
      checkNotificationPermissions(checkAndHandlePermissions)
    } else {
      setPermission(PushPermissionState.Error)
      dispatch(pushPermissionReceived(PushPermissionState.Error))
    }
  }

  const onNotificationReceived = (notification: PushNotificationPayload) => {
    // handle notification

    if (isIos) {
      // Need to finish() to prevent ios from throttling back future notifications
      notification.finish(PushNotificationIOS.FetchResult.NoData)
    }
  }

  const checkAndHandlePermissions = async (
    permissions: PushNotificationPermissions
  ) => {
    if (!permissions.alert) {
      // user has disallowed push notifications
      // we can wipe the push token
      setPermission(PushPermissionState.Denied)
      setRegisterToken(null)
      dispatch(pushPermissionReceived(PushPermissionState.Denied))
    } else {
      // user has allowed push, we can now send push token to stc
      setPermission(PushPermissionState.Granted)
    }
  }

  const configurePushNotifications = async () => {
    initPushNotifications(onTokenReceived, onNotificationReceived)
  }

  useEffect(() => {
    isIos &&
      PushNotificationIOS.addEventListener("registrationError", e => {
        console.log('Error with ios', e)
        // setting up push notification auto errors out on ios simulator
        // we catch this error and manually trigger onRegister call back function
        // passing through a mock payload
        if (e.code === simErrorCode) {
          onTokenReceived({ os: 'iOS', token: 'sim-token' })
        }
      })
  }, [])

  useEffect(() => {
    if (permission) {
      if (permission === PushPermissionState.Granted && registerToken) {
        // permission granted and we have received a push token, sending to stc
        console.log(
          'Sending this token to authorise device123:',
          registerToken
        )
        registerPushToken(registerToken)
      } else if (permission === PushPermissionState.Denied) {
        // if the user disallows push notifications
        // wipe the push token 
        registerPushToken('')
      }
    }
  }, [permission])

  useEffect(() => {
    if (registerPushTokenComplete && permission === PushPermissionState.Granted) {
      dispatch(pushPermissionReceived(PushPermissionState.Granted))
    }
  }, [registerPushTokenComplete])

  useEffect(() => {
    if (registerPushTokenError && permission) {
      dispatch(pushPermissionReceived(PushPermissionState.Error))
    }
  }, [registerPushTokenError])

  useEffect(() => {
    if (tokenRequested) {
      // reset local state to check latest permissions and grab new token
      setPermission(null)
      setRegisterToken(null)
      configurePushNotifications()
    }
  }, [tokenRequested])

  useEffect(() => {
    ignoreNotificationsRef.current = ignoreNotifications
  }, [ignoreNotifications])
}
