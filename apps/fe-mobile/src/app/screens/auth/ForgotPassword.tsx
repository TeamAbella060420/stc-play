import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NAV_ROUTES } from '../../helpers/navRoutes';
import { useAccount, useAuth } from '@fe-monorepo/hooks';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootNavigation';
import { StyledContainer } from '../../components/container';
import { Header } from './component/header.component';
import { ValidateAccountForm } from './component/validateAccountForm';
import { CHANNEL, OTP_TYPES_SCREENS, Validator } from '@fe-monorepo/helper';
import { setPersona, setValidateAccount, useAppDispatch } from '@fe-monorepo/store';
import { CommonActions, RouteProp } from '@react-navigation/native';
import ViewContainer from '../../components/view_container';

export interface SignInData {
  type?: string;
  isNotFromOnboarding?: boolean;
}

export type ForgotPasswordRouteProps = RouteProp<RootStackParamList, NAV_ROUTES.ForgotPassword>;

type ForgotPasswordNavProps = StackNavigationProp<RootStackParamList, NAV_ROUTES.ForgotPassword>;
export interface SignInProps {
  navigation: ForgotPasswordNavProps;
  route: ForgotPasswordRouteProps;
}

const ForgotPassword = ({ navigation, route }: SignInProps) => {
  const [email, setEmailAddress] = useState<string>('');
  const { t } = useTranslation();
  const { loginData, isSuccessFull } = useAuth();
  const { getUserProfile } = useAccount();
  const dispatch = useAppDispatch();

  // for Sign-In
  const onPressCallBack = (email: string, isValidUser: boolean) => {
    if (email) {
      setEmailAddress(email);
      const params = Validator.isValidEmail(email) ? { email: email } : { username: email };
      if (isValidUser) {
        navigation.navigate(NAV_ROUTES.Otp, { ...params, type: OTP_TYPES_SCREENS.RESET_PASSWORD, channel: CHANNEL.EMAIL });
      }
    }
  };

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

  const onNavigate = () => {
    dispatch(setPersona('existing'));
    navigation.navigate(NAV_ROUTES.Main);
  };

  return (
    <ViewContainer style={{ paddingTop: 0, paddingHorizontal: 0, marginBottom: 0 }}>
      <StyledContainer type="scrollview">
        <Header
          title={t('pageTitle_forgot_password')}
          subtitle={t('formAttribute_forgotPassword')}
          subTitleLink={undefined}
          onPress={() => navigation.goBack()}
          hasBackButton
        />

        <ValidateAccountForm onPressCallBack={onPressCallBack} screenType={'forgotPassword'} onNavigate={onNavigate} tempEmail={email} />
      </StyledContainer>
    </ViewContainer>
  );
};

export default ForgotPassword;
