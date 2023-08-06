import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { AppleAuthModel, AuthModel, UserModel } from '@fe-monorepo/models';
import { useAppDispatch, setUser } from '@fe-monorepo/store';
import { LOGIN_MUTATION } from '@fe-monorepo/data-access';
import { useAppState } from '../index';

/*** SIGNUP ***/
type SignUpResponse = {
  signup: {
    is_successful: boolean;
    error_code: string;
    error_msg: string;
    data: SignUpData;
  };
};

type SignUpParams = {
  details: AuthModel;
};

type SignUpData = {
  token: string;
  identifier: string;
  is_2FA_required: number;
  preferred_theme: string;
};

/*** Apple SIGNUP ***/
type AppleSignUpResponse = {
  appleSignup: {
    is_successful: boolean;
    error_code: string;
    error_msg: string;
    data: AppleSignUpData;
  };
};

type AppleSignUpParams = {
  details: AppleAuthModel;
};

type AppleSignUpData = {
  token: string;
  username: string;
  preferred_theme: string;
};

export const useSignUp = () => {
  const dispatch = useAppDispatch();
  const [isSuccessful, setIsSuccessFul] = useState<boolean>();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [errorCode, setErrorCode] = useState<string>('');
  const [isAppleSuccessful, setIsAppleSuccessFul] = useState<boolean>(false);
  const [appleErrorMessage, setAppleErrorMessage] = useState<string>('');
  const { changeLoadingState, changeServerErrorState } = useAppState();

  const [signUpGql, { data: signUpResponse, error: signUpError }] = useMutation<SignUpResponse, SignUpParams>(LOGIN_MUTATION.signup, {
    onError: error => {
      changeLoadingState(false);
    }
  });

  const signUp = async (authModel: AuthModel) => {
    // Todo add additional code for validation
    changeLoadingState(true);
    setErrorMessage('');
    setErrorCode('');
    signUpGql({
      variables: { details: authModel }
    });
  };

  const [appleSignUpGql, { data: appleSignUpResponse, error: appleSignUpError }] = useMutation<AppleSignUpResponse, AppleSignUpParams>(
    LOGIN_MUTATION.appleSignup,
    {
      onError: error => {
        changeLoadingState(false);
        changeServerErrorState(true);
        // This is required to prevent unhandled promise errors due to network and invalid token errors
      }
    }
  );

  const appleSignUp = async (dataModel: AppleAuthModel) => {
    // Todo add additional code for validation
    changeLoadingState(true);
    setErrorMessage('');
    setErrorCode('');
    setIsAppleSuccessFul(false)
    changeServerErrorState(false);
    appleSignUpGql({
      variables: { details: dataModel }
    });
  };

  useEffect(() => {
    if (signUpResponse) {
      // ADD CODE HERE
      const response = signUpResponse.signup;   
      if (response.is_successful) {
        //set user context
        dispatch(
          setUser({
            token: response.data.token,
            is_2FA_required: response.data.is_2FA_required
          } as UserModel)
        );
      }
      setErrorMessage(response.error_msg);
      setErrorCode(response.error_code);
      setIsSuccessFul(response.is_successful);
      changeLoadingState(false);
    }
  }, [dispatch, signUpResponse]);

  useEffect(() => {
    if (signUpError) {
      // ADD CODE HERE
      setErrorMessage(signUpError.message);
    }
  }, [signUpError]);

  useEffect(() => {
    if (appleSignUpResponse) {
      const response = appleSignUpResponse.appleSignup;
      if (response.is_successful) {
        dispatch(
          setUser({
            token: response.data.token
          } as UserModel)
        );
      }
      setErrorMessage(response.error_msg);
      setErrorCode(response.error_code);
      setIsSuccessFul(response.is_successful);
      setIsAppleSuccessFul(response.is_successful);
    }
    changeLoadingState(false);
  }, [appleSignUpResponse]);

  useEffect(() => {
    if (appleSignUpError) {
      // ADD CODE HERE
      console.log("apple appleSignUpError: ", appleSignUpError)   
      setAppleErrorMessage(appleSignUpError.message);
    }
  }, [appleSignUpError]);

  return {
    signUp,
    signUpError,
    errorMessage,
    errorCode,
    isSuccessful,
    appleSignUp,
    appleSignUpError,
    appleErrorMessage,
    isAppleSuccessful
  };
};
