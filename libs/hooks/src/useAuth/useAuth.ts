import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { AppleLoginModel, LoginModel, UserModel } from '@fe-monorepo/models';
import { useAppDispatch, setUser, clearUser } from '@fe-monorepo/store';
import { LOGIN_MUTATION } from '@fe-monorepo/data-access';
import { useAppState } from '../index';

/*** LOGIN ***/
type LoginResponse = {
  login: {
    is_successful: boolean;
    error_code: string;
    error_msg: string;
    data: LoginData;
  };
};

type LoginParams = {
  details: LoginModel;
};

type LoginData = {
  token: string;
  is_email_verified: number;
  is_mobile_verified: number;
  is_2FA_required: number;
  is_password_update_required: number;
  regesteration_persona: string;
  is_mobile_update_required: number;
  identifier: string;
};

/*** LOGIN ***/
type AppleLoginResponse = {
  appleSignin: {
    is_successful: boolean;
    error_code: string;
    error_msg: string;
    data: LoginData;
  };
};

type AppleLoginParams = {
  details: AppleLoginModel;
};

type AppleLoginData = {
  token: string;
};

/*** ACCESS LINK ***/
type AccessLinkResponse = {
  createAccessLink: {
    is_successful: string;
    error_code: string;
    error_msg: string;
    data: AccessLinkData;
  };
};

type AccessLinkData = {
  url: string;
  oauth_token: string;
  oauth_token_secret: string;
  oauth_callback_confirmed: string;
};

type AccessLinkParams = {
  details: LoginModel;
};

export const useAuth = () => {
  const [loginData, setLoginData] = useState<LoginData>();
  const [appleLoginData, setAppleLoginData] = useState<AppleLoginData>();
  const [isSuccessFull, setIsSuccessFul] = useState<boolean>(false);
  const [saveUserCredentials, setSaveingUserCredentials] = useState<boolean>(false);
  const [isSuccessFullyCreatedLink, setCreatedLink] = useState<boolean>();
  const [linkData, setLinkData] = useState<AccessLinkData>();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [errorCode, setErrorCode] = useState<string>('');
  const { changeLoadingState, changeServerErrorState } = useAppState();
  const dispatch = useAppDispatch();

  const [loginGql, { data: loginResponse, error: loginError }] = useMutation<LoginResponse, LoginParams>(LOGIN_MUTATION.login, {
    onError: error => {
      changeLoadingState(false);
      // This is required to prevent unhandled promise errors due to network and invalid token errors
    }
  });

  const [appleLoginGql, { data: appleLoginResponse, error: appleLoginError }] = useMutation<AppleLoginResponse, AppleLoginParams>(
    LOGIN_MUTATION.appleLogin,
    {
      onError: e => {
        changeLoadingState(false);
        changeServerErrorState(true);
        // This is required to prevent unhandled promise errors due to network and invalid token errors
      }
    }
  );

  const [createAccessLinkGql, { data: accessLinkResponse, error: accessLinkError }] = useMutation<AccessLinkResponse, AccessLinkParams>(
    LOGIN_MUTATION.accessLink,
    {
      onError: () => {
        changeLoadingState(false);
        changeServerErrorState(true);
        // This is required to prevent unhandled promise errors due to network and invalid token errors
      }
    }
  );

  const loginUser = async (loginModel: LoginModel, saveCredentials?: boolean) => {
    
    //reset error msg
    setErrorMessage('');
    setErrorCode('')
    changeLoadingState(true);

    setSaveingUserCredentials(saveCredentials ?? false);
    loginGql({
      variables: { details: loginModel }
    });
  };

  const appleLoginUser = async (appleLoginModel: AppleLoginModel) => {
    // add additional code for validation
    dispatch(clearUser()) // clear user information, TODO This will be removed after fixing social media signup/signin flow issue, token related issue
    changeLoadingState(true);
    changeServerErrorState(false);
    appleLoginGql({
      variables: { details: appleLoginModel }
    });
  };

  const createAccessLink = async (loginModel: LoginModel) => {
    // add additional code for validation
    changeLoadingState(true);
    changeServerErrorState(false);
    createAccessLinkGql({
      variables: { details: loginModel }
    });
  };

  useEffect(() => {
    if (loginResponse) {
      // ADD CODE HERE
      const responseData = loginResponse.login;
      if (responseData) {
        if (responseData.is_successful) {
          setLoginData(responseData.data);
          dispatch(
            setUser({
              token: responseData.data.token,
              is_2FA_required: responseData.data.is_2FA_required,
              identifier: responseData.data.identifier
            } as UserModel)
          );
          setIsSuccessFul(true);
        }
        console.log('update error code', responseData);
        
        setErrorMessage(responseData.error_msg);
        setErrorCode(responseData.error_code)
      }
      changeLoadingState(false);
    }
  }, [loginResponse]);

  useEffect(() => {
    if (appleLoginResponse) {
      // ADD CODE HERE
      const responseData = appleLoginResponse.appleSignin;

      if (responseData) {
        if (responseData.is_successful) {
          setAppleLoginData(responseData.data);
          dispatch(
            setUser({
              token: responseData.data.token,
              is_2FA_required: responseData.data.is_2FA_required
            } as UserModel)
          );

          setIsSuccessFul(true);
        }
        setErrorMessage(responseData.error_msg);
      }
      changeLoadingState(false);
    }
  }, [appleLoginResponse]);

  useEffect(() => {
    if (accessLinkResponse) {
      if (accessLinkResponse.createAccessLink) {
        if (accessLinkResponse.createAccessLink.is_successful) {
          console.log(accessLinkResponse, 'Response Link ');
          setLinkData(accessLinkResponse.createAccessLink.data);
          setCreatedLink(true);
        }
      }
      changeLoadingState(false);
    }
  }, [accessLinkResponse]);

  useEffect(() => {
    if (loginError || accessLinkError) {
      // ADD CODE HERE
      setErrorMessage('Server Error');
      changeLoadingState(false);
    }
  }, [loginError, accessLinkError, changeLoadingState]);

  return {
    loginUser,
    loginData,
    errorMessage,
    errorCode,
    isSuccessFull,
    appleLoginUser,
    appleLoginData,
    createAccessLink,
    linkData,
    isSuccessFullyCreatedLink,
    setIsSuccessFul,
    appleLoginError
  };
};
