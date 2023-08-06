import PushNotification, {
    PushNotificationDeliveredObject,
    PushNotificationPermissions,
    ReceivedNotification
  } from 'react-native-push-notification'
  
  export type PushTokenPayload = {os: string; token: string}
  
  export type PushTokenHandler = (token: PushTokenPayload) => void
  
  export type PushNotificationPayload = Omit<ReceivedNotification, 'userInfo'>
  
  export type PushNotificationHandler = (
    notification: PushNotificationPayload,
  ) => void
  
  export type PushPermissionsHandler = (
    permissions: PushNotificationPermissions,
  ) => void
  
  export type PushNotificationDelivered = (
    notifications: PushNotificationDeliveredObject[],
  ) => void
  
  export const checkNotificationPermissions = (
    callback: PushPermissionsHandler
  ) => {
    return PushNotification.checkPermissions(callback)
  }
  
  export const requestNotificationPermissions = () => {
    return PushNotification.requestPermissions()
  }
  
  export const getDeliveredNotifications = (
    callback: PushNotificationDelivered
  ) => {
    return PushNotification.getDeliveredNotifications(callback)
  }
  
  export const initPushNotifications = (
    onRegister: PushTokenHandler,
    onNotification: PushNotificationHandler
  ) => {
    PushNotification.configure({
      onRegister: onRegister,
      onNotification: onNotification,
      permissions: {
        alert: true,
        badge: true,
        sound: true
      },
      popInitialNotification: true,
      requestPermissions: true
    })
  }
  