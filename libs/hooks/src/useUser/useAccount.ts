/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { ACCOUNT_MUTATION, USER_QUERY, LOGIN_MUTATION } from '@fe-monorepo/data-access';
import { AccountModel, LockDurationModel, UserModel } from '@fe-monorepo/models';
import { useAppState } from '../index';
import { AccountParams, EditAccountResponse, LogoutResponse, ResetPasswordResponse, UpdateAccountResponse, UpdatePasswordResponse, ValidPasswordResponse, LockDurationResponse, LockDurationParams } from './type';
import { clearUser, setUser, useAppDispatch } from '@fe-monorepo/store';

export const useAccount = () => {
  const [lockDuration, setLockDuration] = useState<number>();
  const [isUpdatedAccount, setUpdatedAccount] = useState<boolean>();
  const [isUpdatedpassword, setUpdatedPassword] = useState<boolean>();
  const [isSuccessful, setIsSuccessfull] = useState<boolean>();
  const [isValidAccount, setValidAccount] = useState<boolean>();
  const [isLogout, setLogout] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [errorCode, setErrorCode] = useState<string>('');
  const { changeLoadingState } = useAppState();
  const dispatch = useAppDispatch();

  const [lockDurationGql, { data: lockDurationResponse, error: lockDurationError }] = useLazyQuery<LockDurationResponse, LockDurationParams>(USER_QUERY.lockDuration, {
    errorPolicy: 'all'
  });

  const [getUserProfileInfo, { data: userProfile, error: userProfileError }] = useLazyQuery(USER_QUERY.getUserProfileInfo, {
    errorPolicy: 'all'
  });

  const [updateUsername, { data: updateUsernameData, error: updateUsernameError }] = useMutation<UpdateAccountResponse, AccountParams>(
    ACCOUNT_MUTATION.updateUsername,
    {
      onError: e => {
        changeLoadingState(false);
      }
    }
  );

  const [updatePassword, { data: passwordData, error: passwordError }] = useMutation<UpdatePasswordResponse, AccountParams>(
    ACCOUNT_MUTATION.updatePassword,
    { onError: e => changeLoadingState(false) }
  );

  const [iaValidPassword, { data: validPasswordData, error: validPasswordError }] = useMutation<ValidPasswordResponse, AccountParams>(
    LOGIN_MUTATION.isValidCurrentPassword,
    { onError: e => changeLoadingState(false) }
  );

  const [editAccount, { data: accountData, error: accountError }] = useMutation<EditAccountResponse, AccountParams>(
    ACCOUNT_MUTATION.editAccount,
    {
      onError: e => {
        changeLoadingState(false);
      }
    }
  );

  const [resetPasswordgql, { data: resetPasswordData, error: resetPasswordError }] = useMutation<ResetPasswordResponse, AccountParams>(
    ACCOUNT_MUTATION.resetPasswordByOtp,
    {
      onError: e => {
        changeLoadingState(false);
      }
    }
  );

  const [logoutgql, { data: logoutData, error: logoutError }] = useMutation<LogoutResponse>(ACCOUNT_MUTATION.logout, {
    onError: e => {
      changeLoadingState(false);
    }
  });

  const logout = async () => {
    changeLoadingState(true);
    logoutgql();
  };

  const getAccessLockDuration = (model: LockDurationModel) => {
    changeLoadingState(true);
    lockDurationGql({
      variables: { details: model }
    });
  }

  const update = async (model: AccountModel) => {
    changeLoadingState(true);
    editAccount({
      variables: { details: model }
    });
  };

  const updateUsernameAndEmail = async (model: AccountModel) => {
    changeLoadingState(true);
    updateUsername({
      variables: { details: model }
    });
  };

  const resetPassword = async (model: AccountModel) => {
    changeLoadingState(true);
    resetPasswordgql({
      variables: { details: model }
    });
  };

  const getUserProfile = async () => {
    return await getUserProfileInfo();
  };

  const updateAccountPassword = async (model: AccountModel) => {
    changeLoadingState(true);
    updatePassword({
      variables: { details: model }
    });
  };

  const isAccountPasswordValid = async (model: AccountModel) => {
    changeLoadingState(true);
    iaValidPassword({
      variables: { details: model }
    });
  };

  useEffect(() => {
    if (lockDurationResponse) {
      const data = lockDurationResponse.lockDuration;
      setLockDuration(data.data.time_remaining)
      setIsSuccessfull(data.is_successful);
      setErrorMessage(data.error_msg);
      setErrorCode(data.error_code);
      changeLoadingState(false);
    }
  }, [lockDurationResponse]);

  useEffect(() => {
    if (passwordData) {
      const data = passwordData.updatePassword;
      setUpdatedPassword(data.is_successful);
      setErrorMessage(data.error_msg);
      setErrorCode(data.error_code);
      changeLoadingState(false);
    }
  }, [passwordData]);

  useEffect(() => {
    if (validPasswordData) {
      const data = validPasswordData.isValidCurrentPassword;
      console.log(validPasswordData);
      
      setValidAccount(data.is_successful);
      setErrorMessage(data.error_msg);
      setErrorCode(data.error_code);
      changeLoadingState(false);
    }
  }, [validPasswordData]);

  useEffect(() => {
    if (logoutData) {
      const data = logoutData.logout;
      if (data.error_code === '1010') {
        //session has expired
        setLogout(false);
      } else {
        setLogout(data.is_successful);
        dispatch(clearUser());
      }
      changeLoadingState(false);
    }
  }, [logoutData]);

  useEffect(() => {
    if (logoutError) {
      setLogout(false); //if session has expired
      changeLoadingState(false);
    }
  }, [logoutError]);

  useEffect(() => {
    if (resetPasswordData) {
      const data = resetPasswordData.resetPasswordByOtp;
      setUpdatedAccount(data.is_successful);
      setErrorMessage(data.error_msg);
      changeLoadingState(false);
    }
  }, [resetPasswordData]);

  useEffect(() => {
    if (accountData) {
      const data = accountData.editAccount;
      setUpdatedAccount(data.is_successful);
      setErrorMessage(data.error_msg);
      changeLoadingState(false);
    }
  }, [accountData]);

  useEffect(() => {
    if (updateUsernameData) {
      const data = updateUsernameData.updateUsername;
      getUserProfile()
      setUpdatedAccount(true);
      setErrorMessage(data.error_msg);
      changeLoadingState(false);
    }
  }, [updateUsernameData]);

  useEffect(() => {
    if (userProfile) {
      const { data } = userProfile.getUserProfileInfo;
      if (data) {
        dispatch(
          setUser({
            username: data.username,
            email: data.email,
            display_name: data.display_name,
            avatar_url: data.avatar_url ? data.avatar_url : '',
            mobile: data.mobile,
            gamer_type: data.gamer_type,
            bio: data.bio,
            points: data.points,
            is_email_verified: data.is_email_verified,
            total_followers: data.total_followers,
            total_following: data.total_following,
            password_updated_at: data.password_updated_at
          } as UserModel)
        );
      }
      changeLoadingState(false);
    }
  }, [userProfile]);

  useEffect(() => {
    if (accountError || resetPasswordError) {
      const { data } = userProfile.getUserProfileInfo;
      if (data) {
        dispatch(
          setUser({
            username: data.username,
            email: data.email,
            display_name: data.display_name,
            avatar_url: data.avatar_url ? data.avatar_url : '',
            mobile: data.mobile,
            gamer_type: data.gamer_type,
            is_email_verified: data.is_email_verified
          } as UserModel)
        );
      }
      changeLoadingState(false);
    }
  }, [accountError, resetPasswordError]);

  useEffect(() => {
    if (userProfileError) {
      changeLoadingState(false);
    }
  }, [userProfileError]);

  useEffect(() => {
    if (updateUsernameError || passwordError || validPasswordError) {
      changeLoadingState(false);
    }
  }, [updateUsernameError, passwordError, validPasswordError]);

  useEffect(() => {
    if (accountError || lockDurationError) {
      changeLoadingState(false);
    }
  }, [accountError, lockDurationError]);

  return { 
    getAccessLockDuration,
    update, 
    logout, 
    isLogout, 
    updateUsernameAndEmail, 
    resetPassword, 
    updateAccountPassword,
    isAccountPasswordValid,
    isUpdatedAccount, 
    isValidAccount,
    isUpdatedpassword,
    isSuccessful,
    lockDuration,
    errorMessage, 
    errorCode,
    getUserProfile 
  };
};
