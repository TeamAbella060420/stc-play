/* eslint-disable @typescript-eslint/no-empty-function */
import '@testing-library/jest-native/extend-expect';
import * as ReactNative from 'react-native'
import 'react-native-gesture-handler/jestSetup';

  jest.useFakeTimers()

  jest.doMock('react-native', () => {
    // Extend ReactNative
    return Object.setPrototypeOf(
      {
        NativeModules: {
          ...ReactNative.NativeModules,
        },
        I18nManager: {
          ...ReactNative.I18nManager,
          isRTL: false
        }
      },
      ReactNative
    )
  })

  jest
  .mock('node_modules/react-native/Libraries/Animated/NativeAnimatedHelper')
  .mock('react-native-gesture-handler', () => {
    return {
      State: {},
      Directions: {}
    }
  })

  jest.mock('@react-native-async-storage/async-storage', () =>
   require('@react-native-async-storage/async-storage/jest/async-storage-mock')
  )

  jest.mock('@react-navigation/drawer', () => {
    return {
      addEventListener: jest.fn(),
      createDrawerNavigator: () => {
        return {
          Navigator: () => 'Navigator',
          Screen: () => 'Screen'  
        }
      }
    }
  });


  jest.mock('react-native-reanimated', () => ({
    withTiming: () => {},
    useSharedValue: () => {},
    useAnimatedStyle: () => {},
    Easing: () => {},
    interpolate: () => {},
    Extrapolate: () => {},
    runOnJS: () => {},
    useDerivedValue: () => {},
    cancelAnimation: () => {},
    createAnimatedComponent: () => {},
    useAnimatedGestureHandler: () => {},
    View: () => 'AnimatedView',
    Text: () => 'AnimatedText'
  }))

  // reanimated babel plugin transforms worklets so we need to mock them nicely
  global.__reanimatedWorkletInit = jest.fn()