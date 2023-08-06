import { AUTH_SCREENS, LOGIN_TYPES, SOC_MED_TYPES } from '@fe-monorepo/helper';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth, useSignUp } from '@fe-monorepo/hooks';

export const useWebSocialMedia = () => {
  let socialMedia: string = '';
  const navigate = useNavigate();
  const location = useLocation();

  const [isSuccessfull, setSuccessFull] = useState<boolean>();
  const [errorMsg, setErrorMsg] = useState<string>('');

  const { appleLoginUser, isSuccessFull, errorMessage } = useAuth();
  const { appleSignUp, isAppleSuccessful, appleErrorMessage } = useSignUp();

  const getMediaLink = (linkData: any, currentProvider: string) => {
    if (currentProvider !== LOGIN_TYPES.APPLE) {
      window.open(linkData, '_self');
    }
  };

  const handleWindowAuthMessage = () => {
    const url = new URLSearchParams(location.search);
    const authResponse = url.get('authResult');

    if (authResponse) {
      console.log('Authentication response', authResponse);
      redirectToDashboard();
    } else {
      console.log('Error');
    }
  };

  const handleSignInWithApple = async (screenType: string) => {};

  const redirectToDashboard = () => {
    navigate('/dashboard');
  };

  useEffect(() => {
    handleWindowAuthMessage();
  }, [location.search]);

  return { getMediaLink, handleSignInWithApple };
};
