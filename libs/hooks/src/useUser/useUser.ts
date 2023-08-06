/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useAppDispatch, setUser } from '@fe-monorepo/store';
import { useLazyQuery } from '@apollo/client';
import { USER_QUERY } from '@fe-monorepo/data-access';
import { AuthModel, FormErrorModel } from '@fe-monorepo/models';
import { useAppState } from '../index';

/*** UserData ***/
type UserFoundByEmailResponse = {
  isUserFoundByEmail: {
    is_successful: boolean;
    error_code: string;
    error_msg: string;
    data: ResponseData;
  };
};

type UserFoundByUserNameResponse = {
  isUserFoundByUsername: {
    is_successful: boolean;
    error_code: string;
    error_msg: string;
    data: ResponseData;
  };
};

type MobileValidationCheckResponse = {
  isMobileAvailable: {
    is_successful: boolean;
    error_code: string;
    error_msg: string;
    data: ResponseData;
  };
};

type ReferralCodeValidationCheckResponse = {
  isValidReferral: {
    is_successful: boolean;
    error_code: string;
    error_msg: string;
    data: ResponseData;
  };
};

type UserParams = {
  details: AuthModel;
};

type ResponseData = {
  token: string;
};

export const useUser = () =>
{
  const dispatch = useAppDispatch();

  const [getUserContext, { data: userContext, error: userContextError }] = useLazyQuery(USER_QUERY.getUserContext, { errorPolicy: 'all' });
  const [isUserFoundByEmail, { data: isUserFoundByEmailData, error: isUserFoundByEmailError }] = useLazyQuery<
    UserFoundByEmailResponse,
    UserParams
  >(USER_QUERY.isUserFoundByEmail, { errorPolicy: 'all' });
  const [isUserFoundByUsername, { data: isUserFoundByUsernameData, error: isUserFoundByUsernameError }] = useLazyQuery<
    UserFoundByUserNameResponse,
    UserParams
  >(USER_QUERY.isUserFoundByUsername, { errorPolicy: 'all' });
  const [isMobileAvailable, { data: isMobileAvailableData, error: isMobileAvailableError }] = useLazyQuery<
    MobileValidationCheckResponse,
    UserParams
  >(USER_QUERY.isMobileAvailable, { errorPolicy: 'all' });
  const [isValidReferral, { data: isValidReferralData, error: isValidReferralError }] = useLazyQuery<
    ReferralCodeValidationCheckResponse,
    UserParams
  >(USER_QUERY.isValidReferral, { errorPolicy: 'all' });
  const [isValidUser, setValidUser] = useState<boolean>();
  const [isValidatedUsername, setValidUsername] = useState<boolean>();
  const [isValidatedMobile, setValidMobile] = useState<boolean>();
  const [isValidatedReferralCode, setValidReferralCode] = useState<boolean>();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [errorCode, setErrorCode] = useState<string>('');
  const { changeLoadingState } = useAppState();

  const getUserData = async () => {
    getUserContext(/**** add params here */);
  };

  const resetErrorMsg = () => {
       //clear error msg and code to reset the error state
       setErrorMessage('')
       setErrorCode('')
       setValidUser(undefined)
  }

  const validateUserData = async (model: AuthModel, type: string) => {
    //clear error msg and code to reset the error state
    resetErrorMsg()

    changeLoadingState(true);
    if (type === 'username') {
      checkUserName(model);
    } else {
      isUserFoundByEmail({
        variables: { details: model }
      });
    }
  };

  const checkUserName = async (model: AuthModel) => {
    resetErrorMsg()
    isUserFoundByUsername({
      variables: { details: model }
    });
  };

  const checkMobileIsAvailable = async (model: AuthModel) => {
    setValidMobile(undefined);
    resetErrorMsg()
    isMobileAvailable({
      variables: { details: model }
    });
  };

  const checkReferralCode = async (model: AuthModel) => {
    setValidReferralCode(undefined);
    isValidReferral({
      variables: { details: model }
    });
  };

  useEffect(() => {
    if (isUserFoundByEmailData) {
      const data = isUserFoundByEmailData.isUserFoundByEmail;
      setValidUser(data.is_successful);
      setErrorMessage(data.error_msg);
      setErrorCode(data.error_code);
      changeLoadingState(false);
    }
  }, [isUserFoundByEmailData]);

  useEffect(() => {
    if (isUserFoundByUsernameData) {
      const data = isUserFoundByUsernameData.isUserFoundByUsername;
      setValidUser(data.is_successful);
      setValidUsername(data.is_successful);
      setErrorMessage(data.error_msg);
      setErrorCode(data.error_code);
      changeLoadingState(false);
    }
  }, [isUserFoundByUsernameData]);

  useEffect(() => {
    if (isMobileAvailableData) {
      const data = isMobileAvailableData.isMobileAvailable;
      setValidMobile(data.is_successful);
      setErrorMessage(data.error_msg);
      setErrorCode(data.error_code);
      changeLoadingState(false);
    }
  }, [isMobileAvailableData]);

  useEffect(() => {
    if (isValidReferralData) {
      const data = isValidReferralData?.isValidReferral;
      setValidReferralCode(data.is_successful);
      setErrorMessage(data.error_msg);
      setErrorCode(data.error_code);
      changeLoadingState(false);
    }
  }, [isValidReferralData]);

  useEffect(() => {
    if (userContext) {
      dispatch(setUser(userContext.user));
    }
  }, [userContext]);

  useEffect(() => {
    if (userContextError || isUserFoundByEmailError || isUserFoundByUsernameError) {
      changeLoadingState(false);
    }
  }, [userContextError, isUserFoundByEmailError, isMobileAvailableError, isValidReferralError]);

  return {
    getUserData,
    checkUserName,
    validateUserData,
    isUserFoundByEmail,
    checkMobileIsAvailable,
    checkReferralCode,
    isValidUser,
    isValidatedUsername,
    isValidatedMobile,
    isUserFoundByEmailData,
    isUserFoundByUsernameData,
    setValidMobile,
    isValidatedReferralCode,
    setValidReferralCode,
    errorMessage,
    errorCode,
    setValidUser
  };
};
