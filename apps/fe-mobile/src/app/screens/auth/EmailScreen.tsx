import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NAV_ROUTES } from '../../helpers/navRoutes';
import { useAccount } from '@fe-monorepo/hooks';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootNavigation';
import { StyledSafeView } from '../../components/safe_view';
import { StyledContainer } from '../../components/container';
import { Header } from './component/header.component';
import { ValidateAccountForm } from './component/validateAccountForm';
import { RouteProp } from '@react-navigation/native';
import { CHANNEL, OTP_TYPES_SCREENS } from '@fe-monorepo/helper';
import { AccountModel } from '@fe-monorepo/models';
import { setPersona, useAppDispatch } from '@fe-monorepo/store';

type EmailNavProps = StackNavigationProp<RootStackParamList, NAV_ROUTES.EditEmail>;

export type EmailRouteProp = RouteProp<RootStackParamList, NAV_ROUTES.EditEmail>;
export interface EmailProps {
  navigation: EmailNavProps;
  route: EmailRouteProp;
}

export interface EmailData {
  email?: string;
}

export const EmailScreen = ({ navigation, route }: EmailProps) => {
  const dispatch = useAppDispatch();
  const { email: currentEmail } = route.params;
  const { t } = useTranslation();
  const [email, setEmail] = useState<string>('');
  const { update, isUpdatedAccount } = useAccount();

  const onPressCallBack = (email: string, isValidUser: boolean) => {
    if (email === currentEmail) {
      onPressBackButton();
    } else {
      if (!isValidUser) {
        setEmail(email);
        update({
          email: email
        } as AccountModel);
      }
    }
  };

  useEffect(() => {
    if (isUpdatedAccount) {
      navigation.navigate(NAV_ROUTES.Otp, { email: email, type: OTP_TYPES_SCREENS.SIGN_UP_EMAIL_OTP, channel: CHANNEL.SMS });
    }
  }, [isUpdatedAccount]);

  const onNavigate = () => {
    dispatch(setPersona('new'));
    navigation.navigate(NAV_ROUTES.CSoon);
  };

  const onPressBackButton = () => {
    navigation.navigate(NAV_ROUTES.Otp, { email: currentEmail, type: OTP_TYPES_SCREENS.SIGN_UP_EMAIL_OTP, channel: CHANNEL.SMS });
  };

  return (
    <StyledSafeView>
      <StyledContainer type="scrollview">
        <Header title={t('formAttribute_edit_email')} onPress={onPressBackButton} />
        <ValidateAccountForm
          onPressCallBack={onPressCallBack}
          screenType={OTP_TYPES_SCREENS.EDIT_EMAIL_OTP}
          onNavigate={onNavigate}
          tempEmail={currentEmail}
        />
      </StyledContainer>
    </StyledSafeView>
  );
};
