import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NAV_ROUTES } from '../../helpers/navRoutes';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootNavigation';
import { StyledSafeView } from '../../components/safe_view';
import { StyledContainer } from '../../components/container';
import { Header } from './component/header.component';
import { ValidateAccountForm } from './component/validateAccountForm';
import { CreateAccountForm } from './component/createAccountForm';
import { CHANNEL, LOGIN_TYPES, OTP_TYPES_SCREENS } from '@fe-monorepo/helper';
import { setPersona, useAppDispatch } from '@fe-monorepo/store';

type SignUpNavProps = StackNavigationProp<RootStackParamList, NAV_ROUTES.SignUp>;
export interface SignUpProps {
  navigation: SignUpNavProps;
}

export const SignUpScreen = ({ navigation }: SignUpProps) => {
  const [isValidated, setValidateAccount] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  // for Sign-Up
  const onPressCallBack = (email: string, isValidUser: boolean) => {
    if (!isValidUser) {
      setEmail(email);
      setValidateAccount(true);
    }
  };

  const onPressBackButton = () => {
    navigation.goBack();
  };

  const onbackToSignUp = () => {
    setValidateAccount(false);
  };

  const signUpCallBack = (isSuccessful: boolean) => {
    if (isSuccessful)
      if (email) {
        navigation.navigate(NAV_ROUTES.Otp, { email: email, type: OTP_TYPES_SCREENS.SIGN_UP_EMAIL_OTP, channel: CHANNEL.EMAIL });
      } else {
        dispatch(setPersona('new'));
        navigation.navigate(NAV_ROUTES.Main);
      }
  };

  const onNavigate = (provider: LOGIN_TYPES) => {
    if (email) {
      navigation.navigate(NAV_ROUTES.Otp, { email: email, type: OTP_TYPES_SCREENS.SIGN_UP_EMAIL_OTP, channel: CHANNEL.EMAIL });
    } else {
      dispatch(setPersona('new'));
      navigation.navigate(NAV_ROUTES.AdditionalInput, {provider: provider});
    }
  };

  return (
    <StyledSafeView>
      <StyledContainer type="scrollview">
        <Header
          title={t('common_create_account')}
          subtitle={!isValidated ? t('common_have_an_account') : ''}
          subTitleLink={!isValidated ? t('common_signin') : ''}
          onPress={!isValidated ? onPressBackButton : onbackToSignUp}
          onPressLink={onPressBackButton}
        />
        {!isValidated ? (
          <ValidateAccountForm onPressCallBack={onPressCallBack} screenType="signup" onNavigate={onNavigate} tempEmail={email} />
        ) : (
          <CreateAccountForm email={email} signUpCallBack={signUpCallBack} />
        )}
      </StyledContainer>
    </StyledSafeView>
  );
};
