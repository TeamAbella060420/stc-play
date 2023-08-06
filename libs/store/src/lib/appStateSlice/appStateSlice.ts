import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AppStateSliceState = {
  language: string;
  selectedLanguage: string;
  themes: string;
  isRTL: boolean;
  firstInstall: boolean;
  isLoading: boolean;
  isValidated: boolean;
  authToken: string;
  headerColorChange: boolean;
  isServerError: boolean;
  settingsSwitchData: { [key: string]: boolean };
};

export const appStateSlice = createSlice({
  name: 'appState',
  initialState: {
    language: 'en',
    selectedLanguage: 'English',
    themes: 'light',
    isRTL: false,
    firstInstall: true,
    isValidated: false,
    isLoading: false,
    authToken: '',
    headerColorChange: true,
    isServerError: false,
    settingsSwitchData: { theme: false }
  } as AppStateSliceState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    setSelectedLanguage: (state, action: PayloadAction<string>) => {
      state.selectedLanguage = action.payload;
    },
    setThemes: (state, action: PayloadAction<string>) => {
      state.themes = action.payload;
    },
    setRTLStatus: (state, action: PayloadAction<boolean>) => {
      state.isRTL = action.payload;
    },
    setInstallStatus: (state, action: PayloadAction<boolean>) => {
      state.firstInstall = action.payload;
    },
    setValidateAccount: (state, action: PayloadAction<boolean>) => {
      state.isValidated = action.payload;
    },
    setLoadingState: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setAuthToken: (state, action: PayloadAction<string>) => {
      state.authToken = action.payload;
    },
    setHeaderColorChange: (state, action: PayloadAction<boolean>) => {
      state.headerColorChange = action.payload;
    },
    setServerErrorState: (state, action: PayloadAction<boolean>) => {
      state.isServerError = action.payload;
    },
    setSettingsSwitchStatus: (state, action: PayloadAction<AppStateSliceState['settingsSwitchData']>) => {
      state.settingsSwitchData = { ...state.settingsSwitchData, ...action.payload };

      console.log('state.settingsSwitchData', state.settingsSwitchData);
      console.log('action.payload', action.payload);
    }
  }
});

export const {
  setLanguage,
  setSelectedLanguage,
  setThemes,
  setRTLStatus,
  setLoadingState,
  setInstallStatus,
  setAuthToken,
  setValidateAccount,
  setHeaderColorChange,
  setServerErrorState,
  setSettingsSwitchStatus
} = appStateSlice.actions;
