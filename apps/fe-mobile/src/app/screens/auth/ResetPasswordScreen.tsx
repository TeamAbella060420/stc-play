import React, { useEffect } from 'react';
import { CommonActions, RouteProp } from '@react-navigation/native';
import { NAV_ROUTES } from '../../helpers/navRoutes';
import { RootStackParamList } from '../../navigation/RootNavigation';
import { StackNavigationProp } from '@react-navigation/stack';
import { Platform, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import Typography from '../../assets/typography';
import { useAccount } from '@fe-monorepo/hooks';
import { StyledSafeView } from '../../components/safe_view';
import { StyledContainer } from '../../components/container';
import { Header } from './component/header.component';
import { ResetPasswordForm } from './component/resetPasswordFrom';
import { AccountModel } from '@fe-monorepo/models';

export interface ResetPasswordData {
  token?: string;
}

export type ResetPasswordRouteProp = RouteProp<RootStackParamList, NAV_ROUTES.ResetPassword>;

type ResetPasswordNavProps = StackNavigationProp<RootStackParamList, NAV_ROUTES.ResetPassword>;

export interface ResetPasswordProps {
  route: ResetPasswordRouteProp;
  navigation: ResetPasswordNavProps;
}

export const ResetPasswordScreen = ({ route, navigation }: ResetPasswordProps) => {
  const { token } = route.params;
  const { t } = useTranslation();
  const styles = createStyles(t);
  const { resetPassword, isUpdatedAccount } = useAccount();

  const saveNewPassword = (password: string) => {
    //send password to api

    resetPassword({
      password: password,
      token: token
    } as AccountModel);
  };

  useEffect(() => {
    if (isUpdatedAccount) {
      navigation.navigate(NAV_ROUTES.Success, { type: 'forgotPassword' });
    }
  }, [isUpdatedAccount]);

  const goback = () => {
    // navigation.pop(3);
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: NAV_ROUTES.SignIn }]
      })
    );
  };

  return (
    <StyledSafeView>
      <StyledContainer>
        <Header title={t('formAttribute_new_password')} hasBackButton={true} onPress={() => goback()} />
        <ResetPasswordForm onPressCallBack={password => saveNewPassword(password)} />
      </StyledContainer>
    </StyledSafeView>
  );
};

const createStyles = (t: any) => {
  return StyleSheet.create({
    editEmailContainer: {
      flexDirection: t('config_row'),
      flexWrap: 'wrap',
      alignItems: t('config_flex')
    },
    otpSubHeader: {
      marginTop: 16,
      alignItems: t('config_flex')
    }
  });
};
