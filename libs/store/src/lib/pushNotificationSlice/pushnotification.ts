import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const PUSH_TOKEN_ERROR = 'PushTokenError'

export enum PushPermissionState {
  Granted = 'Granted',
  Denied = 'Denied',
  Error = 'Error'
}

type PushNotificationSliceState = {
  tokenRequested: boolean
  token: string
  permissionState: PushPermissionState | null
  notificationReceived: NotificationPayload | null
  ignoreNotifications: boolean
}

/*** we can add more options here */
export type NotificationPayload = {
  title: string
  message: string
  type: string
  foreground?: boolean
  userInteraction?: boolean
}

export const pushNotificationSlice = createSlice({
  name: 'pushNotification',
  initialState: {
    tokenRequested: false,
    token: '',
    permissionState: null,
    notificationReceived: null,
    ignoreNotifications: false
  } as PushNotificationSliceState,
  reducers: {
    startRequestPushToken: (state) => {
      state.tokenRequested = true
    },
    stopRequestPushToken: (state) => {
      state.tokenRequested = false
    },
    tokenReceived: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
    pushPermissionReceived: (
      state,
      action: PayloadAction<PushPermissionState | undefined>
    ) => {
      state.permissionState = action.payload ?? null
    },
    notificationReceived: (
      state,
      action: PayloadAction<NotificationPayload>
    ) => {
      state.notificationReceived = action.payload
    },
    clearNotification: (state) => {
      state.notificationReceived = null
    },
    allowNotifications: (state) => {
      state.ignoreNotifications = true
    },
    ignoreNotifications: (state) => {
      state.ignoreNotifications = true
    }
  }
})

export const {
  startRequestPushToken,
  stopRequestPushToken,
  tokenReceived,
  pushPermissionReceived,
  notificationReceived,
  clearNotification,
  allowNotifications,
  ignoreNotifications
} = pushNotificationSlice.actions
