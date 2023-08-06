import { useState, useEffect } from 'react';
import { Platform, Linking } from 'react-native';
import { InAppBrowser } from 'react-native-inappbrowser-reborn';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { LOGIN_TYPES, AUTH_SCREENS, SOC_MED_TYPES } from '@fe-monorepo/helper';
import { useAppDispatch, setToken } from '@fe-monorepo/store';

import { useAppState, useAuth, useSignUp } from '@fe-monorepo/hooks';

export const useSocialMedia = () => {
  const [isSuccessfull, setSuccessFull] = useState<boolean>();
  const [errorMsg, setErrorMsg] = useState<string>('');
  const dispatch = useAppDispatch();
  const { appleLoginUser, isSuccessFull } = useAuth();
  const { appleSignUp, isAppleSuccessful } = useSignUp();
  const { changeServerErrorState } = useAppState();


  useEffect(() => {
    if (isSuccessFull) {
      setSuccessFull(isSuccessFull);
    }
  }, [isSuccessFull]);

  const getSocMedLink = (linkData: any, currentProvider: string, screenType: string) => {
    let socmed = '';
    setSuccessFull(null) //reset the state for successfull login via socmed
   
    switch (currentProvider) {
      case LOGIN_TYPES.GOOGLE:
        socmed = screenType === AUTH_SCREENS.SIGN_UP ? SOC_MED_TYPES.GOOGLE_SIGN_UP : SOC_MED_TYPES.GOOGLE_SIGN_IN;
        break;

      case LOGIN_TYPES.FACE_BOOK:
        socmed = screenType === AUTH_SCREENS.SIGN_UP ? SOC_MED_TYPES.FACEBOOK_SIGN_UP : SOC_MED_TYPES.FACEBOOK_SIGN_IN;
        break;

      case LOGIN_TYPES.TWITTER:
        socmed = screenType === AUTH_SCREENS.SIGN_UP ? SOC_MED_TYPES.TWITTER_SIGN_UP : SOC_MED_TYPES.TWITTER_SIGN_IN;
        break;
    }

    if (currentProvider !== LOGIN_TYPES.APPLE) {
      InAppBrowser.isAvailable()
        .then(isAvailable => {
          if (isAvailable) {
            const deepLinkUrl =
              'stcplayapp://' + (screenType === AUTH_SCREENS.SIGN_UP ? 'SignUpScreen/' + socmed : 'SignInScreen/' + socmed);

            InAppBrowser.openAuth(linkData?.url, deepLinkUrl, {
              // iOS Properties
              ephemeralWebSession: false,
              // Android Properties
              showTitle: false,
              enableUrlBarHiding: true,
              enableDefaultShare: false,
              // Generic
              headers: {
                'x-api-endpoint': Platform.OS
              }
            })
              .then(response => {
                if (response.type === 'success' && response.url) {
                  handleRedierct(response.url, deepLinkUrl);
                } else {
                  setSuccessFull(false);
                }
              })
              .catch(e => {
                setErrorMsg('');
                setSuccessFull(false);
              });
          } else {
            Linking.openURL(linkData?.url);
          }
        })
        .catch(e => {
          Linking.openURL(linkData?.url);
        });
    }
  };

  const handleSignInWithApple = async (screenType: string) => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL]
      });
      const { identityToken, authorizationCode, fullName } = appleAuthRequestResponse;

      if (identityToken && authorizationCode) {
        if (screenType === 'signin') {
          appleLoginUser({
            code: authorizationCode
          });
        } else {
          appleSignUp({
            code: authorizationCode,
            username:
              fullName?.givenName && fullName?.familyName
                ? fullName?.givenName + ' ' + fullName?.familyName
                : fullName?.givenName
                ? fullName?.givenName
                : fullName?.familyName
                ? fullName?.familyName
                : 'Test'
          });
        }
      }
    } catch (error) {
      if (error.code === appleAuth.Error.CANCELED) {
        setSuccessFull(false);
        setErrorMsg('User canceled Apple Sign in.');
      } else {
        changeServerErrorState(true);
      }
    }
  };

  const handleRedierct = (url: string, deepLinkScheme: string) => {
    let params = url?.replace(deepLinkScheme, '');

    params = params?.replace('?', '');

    const paramsArray = params?.split('&');

    const formattedParams = [];
    let tempParam;

    paramsArray.forEach(param => {
      tempParam = param?.split('=');

      formattedParams.push({
        key: tempParam[0],
        value: tempParam[1]
      });
    });

    if (formattedParams?.filter(param => param?.key === 'token')[0]?.value) {
      dispatch(setToken(formattedParams?.filter(param => param?.key === 'token')[0]?.value));
      setSuccessFull(true);
    }

    if (formattedParams?.filter(param => param?.key === 'error')?.length) {
      setErrorMsg(decodeURI(formattedParams?.filter(param => param?.key === 'error')[0]?.value));
      setSuccessFull(false);
    }
  };

  return { getSocMedLink, handleSignInWithApple, isSuccessfull, errorMsg, isAppleSuccessful, isSuccessFull };
};
