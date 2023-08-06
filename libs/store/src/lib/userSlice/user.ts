import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserModel } from '@fe-monorepo/models';

// This is a type over interface else it causes errors in store.ts
type SliceState = {
  userContext: UserModel;
  persona?: 'guest' | 'new' | 'existing' | '';
  token: string;
};

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userContext: {
      userId: '',
      firstName: '',
      lastName: '',
      email: '',
      token: '',
      username: '',
      display_name: '',
      avatar_url: '',
      is_2FA_required: 1,
      mobile: '',
      identifier: '',
      gamer_type: 'create',
      bio: '',
      points: 0,
      total_followers: '0',
      total_following: '0',
      is_email_verified: 0,
      password_updated_at: ''
    },
    persona: ''
  } as SliceState,
  reducers: {
    setUser: (state, action: PayloadAction<UserModel>) => {
      state.userContext = {
        ...state.userContext,
        ...action.payload
      };
    },
    clearUser: state => {
      state.userContext = {
        userId: '',
        firstName: '',
        lastName: '',
        email: '',
        token: '',
        username: '',
        display_name: '',
        avatar_url: '',
        is_2FA_required: 1,
        identifier: '',
        gamer_type: 'create',
        bio: '',
        points: 0,
        total_followers: '0',
        total_following: '0',
        is_email_verified: 0,
        password_updated_at: ''
      };
    },
    setToken: (state, action: PayloadAction<SliceState['token']>) => {
      const token = action.payload;
      state.userContext = {
        ...state.userContext,
        token
      };
    },
    setPersona: (state, action: PayloadAction<SliceState['persona']>) => {
      state.persona = action.payload;
    }
  }
});

export const { setUser, clearUser, setPersona, setToken } = userSlice.actions;
