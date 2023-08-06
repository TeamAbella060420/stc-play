import { persistReducer, persistStore, REHYDRATE, PERSIST } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import logger from 'redux-logger';
import rootReducer from './reducers';
import { storage } from './storage';

const isDevelopment = process.env.NX_APP_ENVIRONMENT === 'development';
const persistConfig = {
  key: 'stc-play',
  storage
};

const persistedReducers = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducers,
  middleware: getDefaultMiddleware => {
    const defaultMiddleware = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [REHYDRATE, PERSIST]
      }
    });
    return isDevelopment ? defaultMiddleware.concat(logger) : defaultMiddleware;
  }
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
