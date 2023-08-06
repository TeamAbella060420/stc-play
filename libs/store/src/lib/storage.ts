import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const webStorage = {
  getItem: async (key: any) => {
    return Promise.resolve(localStorage.getItem(key));
  },
  setItem: async (key: any, value: any) => {
    return Promise.resolve(localStorage.setItem(key, value));
  },
  removeItem: async (key: any) => {
    return Promise.resolve(localStorage.removeItem(key));
  }
};

export const storage = Platform.OS === 'web' ? webStorage : AsyncStorage;
