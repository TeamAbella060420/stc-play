import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import { NAV_ROUTES } from '../../helpers/navRoutes';
import { useAccount, useAuth } from '@fe-monorepo/hooks';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootNavigation';
import { StyledContainer } from '../../components/container';
import { Header } from './component/header.component';
import { ValidateAccountForm } from './component/validateAccountForm';
import { PasswordForm } from './component/passwordForm';
import { LoginModel } from '@fe-monorepo/models';
import { CHANNEL, OTP_TYPES_SCREENS } from '@fe-monorepo/helper';
import { setPersona, setValidateAccount, useAppDispatch } from '@fe-monorepo/store';
import { CommonActions, RouteProp } from '@react-navigation/native';
import ViewContainer from '../../components/view_container';

export interface SignInData {
  type?: string;
  isNotFromOnboarding?: boolean;
}

export type SignInRouteProp = RouteProp<RootStackParamList, NAV_ROUTES.SignIn>;

type SignInNavProps = StackNavigationProp<RootStackParamList, NAV_ROUTES.SignIn>;
export interface SignInProps {
  navigation: SignInNavProps;
  route: SignInRouteProp;
}

export const SignInScreen = ({ navigation, route }: SignInProps) => {
  const type = route?.params?.type ? route?.params?.type : 'signin';
  const [isUsernameValid, setUsernameValid] = useState<boolean>(false);
  const [email, setEmailAddress] = useState<string>('');
  const { t } = useTranslation();
  const { loginUser, loginData, isSuccessFull, errorMessage, errorCode } = useAuth();
  const [passwordError, setPassowrdError] = useState<string>('');
  const [passwordAttemptCounter, setPassowrdAttemptCounter] = useState<number>(0);
  const { getUserProfile } = useAccount();
  const dispatch = useAppDispatch();
  // for Sign-In
  const onPressCallBack = (email: string, isValidUser: boolean) => {
    //reset password error
    if (isValidUser) {
      resetForm();
    }
    setEmailAddress(email);
    setUsernameValid(isValidUser);
  };

  const resetForm = () => {
    setPassowrdAttemptCounter(0);
    setPassowrdError('');
  };

  const onForgotPassword = () => {
    navigation.navigate(NAV_ROUTES.ForgotPassword);
  };

  const onPressSubmit = (password: string, saveCredentials?: boolean) => {
    /*** TO DO add advertisement id when we enable the function */
    loginUser(
      {
        identifier: email,
        endpoint: Platform.OS,
        channel: CHANNEL.EMAIL,
        advertisement_id: 'aabb',
        password: password
      } as LoginModel,
      saveCredentials
    );
  };

  useEffect(() => {
    if (errorMessage !== undefined) {
      if (['2004'].includes(errorCode)) {
        setPassowrdAttemptCounter(passwordAttemptCounter + 1);
        if (passwordAttemptCounter > 4) {
          setPassowrdError(t('validation_exceeded_attempts'));
        } else {
          setPassowrdError(t('validation_password_invalid'));
        }
      } else if (['3063'].includes(errorCode)) {
        setPassowrdAttemptCounter(5);
        setPassowrdError(t('validation_exceeded_attempts'));
      }
    }
  }, [errorMessage, errorCode]);

  useEffect(() => {
    if (isSuccessFull) {
      if ((loginData.is_mobile_verified === 1 || loginData.is_email_verified === 1) && loginData.is_2FA_required === 0) {
        dispatch(setValidateAccount(true));
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: NAV_ROUTES.Main }]
          })
        );
      } else {
        getUserProfile();
        navigation.replace(NAV_ROUTES.Otp, { email: email, type: OTP_TYPES_SCREENS.SIGN_IN_EMAIL_OTP, channel: CHANNEL.EMAIL });
      }
      dispatch(setPersona('existing'));
    }
  }, [isSuccessFull, loginData]);

  const onPressBackButton = () => {
    if (isUsernameValid) {
      setUsernameValid(false);
    } else {
      navigation.navigate(NAV_ROUTES.SignUp);
    }
  };

  const onNavigate = () => {
    dispatch(setPersona('existing'));
    navigation.navigate(NAV_ROUTES.Main);
  };

  return (
    <ViewContainer style={{ paddingTop: 0, paddingHorizontal: 0, marginBottom: 0 }}>
      <StyledContainer type="scrollview">
        <Header
          title={isUsernameValid ? t('formAttribute_password') : t('action_signin')}
          subtitle={isUsernameValid ? undefined : t('common_new_to_stc')}
          subTitleLink={isUsernameValid ? undefined : t('common_create_account')}
          onPress={() => {
            isUsernameValid ? setUsernameValid(false) : navigation.goBack();
          }}
          onPressLink={onPressBackButton}
          hasBackButton={isUsernameValid || route?.params?.isNotFromOnboarding}
        />
        {type !== 'forgotPassword' && !isUsernameValid ? (
          <ValidateAccountForm onPressCallBack={onPressCallBack} screenType={'signin'} onNavigate={onNavigate} tempEmail={email} />
        ) : (
          <PasswordForm
            onPressCallBack={onPressSubmit}
            errorMessage={passwordError}
            exceededPasswordAttempt={passwordAttemptCounter > 4}
            resetPasswordAttempts={() => resetForm()}
            onForgotPassword={() => onForgotPassword()}
          />
        )}
      </StyledContainer>
    </ViewContainer>
  );
};
