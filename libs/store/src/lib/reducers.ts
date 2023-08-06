import { combineReducers } from '@reduxjs/toolkit';
import { userSlice } from './userSlice/user';
import { appStateSlice } from './appStateSlice/appStateSlice';
import { searchSlice } from './searchSlice/search';
import { walletSlice } from './walletSlice/wallet';
import { pushNotificationSlice } from './pushNotificationSlice/pushnotification';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  app: appStateSlice.reducer,
  search: searchSlice.reducer,
  wallet: walletSlice.reducer,
  pushnotification: pushNotificationSlice.reducer
});

export default rootReducer;
