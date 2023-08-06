import {
  useAppDispatch,
  setLanguage,
  setThemes,
  setRTLStatus,
  setLoadingState,
  setInstallStatus,
  setHeaderColorChange,
  setServerErrorState,
  setSelectedLanguage
} from '@fe-monorepo/store';
import { Translation } from '@fe-monorepo/helper';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export const useAppState = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const changeLanguage = async (language: string, selectedLanguage?: string) => {
    Translation(language);
    dispatch(setLanguage(language));
    dispatch(setRTLStatus(language === 'ar'));
    //PLACED THIS CONDITION TO HANDLE ERROR ON SOME USAGE THAT DON'T PASS SELECTEDLANGUAGE VALUE
    if (selectedLanguage !== undefined) {
      dispatch(setSelectedLanguage(selectedLanguage));
    }
  };

  const changeThemes = async (theme: string) => {
    dispatch(setThemes(theme));
  };

  const changeInstallStatus = useCallback(() => {
    dispatch(setInstallStatus(false));
  }, [dispatch]);

  const changeLoadingState = async (isLoading: boolean) => {
    dispatch(setLoadingState(isLoading));
  };

  const changeHeaderColorState = async (headerColorChange: boolean) => {
    dispatch(setHeaderColorChange(headerColorChange));
  };

  const changeServerErrorState = async (isServerError: boolean) => {
    dispatch(setServerErrorState(isServerError));
  };

  return {
    t,
    dispatch,
    changeLanguage,
    changeThemes,
    changeLoadingState,
    changeInstallStatus,
    changeHeaderColorState,
    changeServerErrorState
  };
};
