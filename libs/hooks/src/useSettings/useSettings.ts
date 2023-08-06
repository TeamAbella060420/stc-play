/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ACCOUNT_MUTATION, LOGIN_MUTATION } from '@fe-monorepo/data-access';
import { AccountModel } from '@fe-monorepo/models';
import { useAppState } from '../index';
import { AccountParams, UpdateSettingsResponse } from '../useUser/type';

export const useSettings = () => {
  const { changeLoadingState } = useAppState();

  const [updateSettings, { data: settingsData, error: settingsError }] = useMutation<UpdateSettingsResponse, AccountParams>(
    ACCOUNT_MUTATION.updateSettings,
    { onError: e => changeLoadingState(false) }
  );

  const updateAccountSettings = async (model: AccountModel) => {
    changeLoadingState(true);
    updateSettings({
      variables: { details: model }
    });
  };

  useEffect(() => {
    if (settingsData) {
      changeLoadingState(false);
    }
  }, [settingsData]);

  useEffect(() => {
    if (settingsError) {
      changeLoadingState(false);
    }
  }, [settingsError]);

  return { updateAccountSettings, settingsData, settingsError };
};
