import React, { useState, useEffect } from 'react';
import { View, GestureResponderEvent, StyleSheet, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useUser, useAuth, useAppState } from '@fe-monorepo/hooks';
import { OTP_TYPES_SCREENS, LOGIN_TYPES, Validator, translate } from '@fe-monorepo/helper';
import { StyledText } from '../../../components/text';
import Typography from '../../../assets/typography';
import Button from '../../../components/buttons';
import Textfield from '../../../components/textfield';
import { AuthModel, LoginModel } from '@fe-monorepo/models';
import { useSocialMedia } from '../../../hooks/useSocialMedia';
import NetworkError from '../../../components/network_error';
import { useSelector } from 'react-redux';
import { RootState } from '@fe-monorepo/store';
import { useNetInfo } from '@react-native-community/netinfo';

export interface ValidateAccountFormProps {
  onPressCallBack?: (email?: string, isValidUser?: boolean, event?: GestureResponderEvent) => void;
  onPressLink?: (event?: GestureResponderEvent) => void;
  screenType?: string;
  onNavigate?: (provider?: string) => void;
  tempEmail?: string;
}

export const ValidateAccountForm = (props: ValidateAccountFormProps) => {
  const { onPressCallBack, tempEmail, onNavigate, screenType } = props;
  const { t } = useTranslation();
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>(null);
  const [isButtonEnable, setButtonEnable] = useState<boolean>(false);
  const [currentProvider, setCurrentProvider] = useState<string>('');
  const styles = createStyles(t);
  const { validateUserData, isValidUser, errorMessage, errorCode, setValidUser } = useUser();
  const { createAccessLink, linkData } = useAuth();
  const { getSocMedLink, handleSignInWithApple, isSuccessfull, isAppleSuccessful } = useSocialMedia();
  const isFromSignIn = screenType === 'signin';
  const { isServerError } = useSelector((state: RootState) => state.app);
  const { changeServerErrorState } = useAppState();
  const netInfo = useNetInfo();

  useEffect(() => {
    if (tempEmail)
      setEmail(tempEmail);
  }, [tempEmail]);


  useEffect(() => {
    if (isAppleSuccessful) {
      onNavigate(currentProvider);
    }
  },[isAppleSuccessful]);

  useEffect(() => {
    if (isValidUser !== undefined) {
      if (!isValidUser && screenType === OTP_TYPES_SCREENS.EDIT_EMAIL_OTP) {
        setError('');
      }

      if (tempEmail === email) {
        setError('');
      } else if (isValidUser === true && (screenType === 'signup' || screenType === OTP_TYPES_SCREENS.EDIT_EMAIL_OTP)) {
        setError(t('validation_takenEmail'));
      }

      onPressCallBack(email, isValidUser);
    }

    if (
      ((screenType === 'signup' || screenType === 'editEmail') && email.includes('@') && Validator.isPartialValidEmail(email)) ||
      ((screenType === 'forgotPassword' || screenType === 'signin') && email.length > 2)
    ) {
      setButtonEnable(true);
    } else {
      setButtonEnable(false);
    }
  }, [email, isValidUser]);

  useEffect(() => {
    if (errorMessage || errorCode || isValidUser) {
      if (!isValidUser && screenType === OTP_TYPES_SCREENS.EDIT_EMAIL_OTP) {
        //TOD add additional error handle here
        setError(null);
      } else if ((screenType === 'signin' || screenType === 'forgotPassword') && ['2001', '2002', '2006', '2101'].includes(errorCode)) {
        setError(t('validation_username_email_invalid'));
      } else if (screenType === 'signup' && ['2014', '2002'].includes(errorCode)) {
        setError(t('validation_takenEmail'));
      } else if (isValidUser && (screenType === 'signup' || screenType === OTP_TYPES_SCREENS.EDIT_EMAIL_OTP)) {
        setError(t('validation_takenEmail'));
      } else {
        setError(errorMessage);
      }
    }
  }, [errorMessage, errorCode, isValidUser]);

  useEffect(() => {
    if (isSuccessfull) {
      onNavigate(currentProvider);
    }
  }, [isSuccessfull]);

  useEffect(() => {
    if (linkData) getSocMedLink(linkData, currentProvider, screenType);
  }, [linkData]);

  const validateAccount = () => {
    let type = 'email';

    if (screenType === 'signup' || screenType === OTP_TYPES_SCREENS.EDIT_EMAIL_OTP) {
      if (Validator.isValidEmail(email) && Validator.isValidEmailLength(email)) {
        type = 'email';
        validateUserData({ email: email } as AuthModel, type);
      } else {
        setError(t('validation_email_format_incorrect'));
      }
    } else {
      if (Validator.isValidEmail(email)) {
        type = 'email';
        validateUserData({ email: email } as AuthModel, type);
      } else {
        type = 'username';
        validateUserData({ username: email } as AuthModel, type);
      }
    }
  };

  const validateEmail = () => {
    if (( screenType === 'signup' || screenType === OTP_TYPES_SCREENS.EDIT_EMAIL_OTP) && email.length > 2 && !Validator.isValidEmail(email)) {
      setError(t('validation_email_format_incorrect'));
    }
  };

  const getAccessLink = (provider: string) => {
    setCurrentProvider(provider);
    createAccessLink({
      provider: provider,
      type: screenType
    } as LoginModel);
  };

  const checkEmailUsername = (text: string) => {
    setError('');
    setValidUser(undefined);
    if (text.length <= 320) {
      setEmail(text);
    }
  };

  const appleSignin = () => {
    setCurrentProvider('apple');
    if (netInfo.isConnected) {
      handleSignInWithApple(screenType);
    } else {
      changeServerErrorState(true);
    }
  };

  const onRefresh = () => {
    if (currentProvider === 'apple' && isServerError) {
      if (netInfo.isConnected) {
        handleSignInWithApple(screenType);
      } else {
        changeServerErrorState(true);
      }
    } else {
      getAccessLink(currentProvider);
    }
  };

  return (
    <View style={styles.container}>
      <Textfield
        type="email"
        label={screenType === 'forgotPassword' || screenType === 'signin' ? t('formAttribute_loginIdentifier') : t('formAttribute_email')}
        iconName={'closeRegular'}
        value={email}
        onInputChange={text => {
          setError(null);
          checkEmailUsername(text);
        }}
        onIconPress={() => {
          setEmail('');
          setError(null);
        }}
        errorMessage={email === '' ? '' : error}
        placeholder={screenType === 'signup' ? t('formPlaceholder_start_typing') : ''}
        onEndEditing={() => validateEmail()}
      />

      <Button
        style={[styles.button, { borderWidth: 0 }]}
        label={t('common_continue')}
        disabled={!isButtonEnable}
        type={isButtonEnable ? 'primary' : null}
        onPress={() => validateAccount()}
      />

      {(screenType !== 'forgotPassword' && screenType !== OTP_TYPES_SCREENS.EDIT_EMAIL_OTP) && (
        <>
          <StyledText textStyle={Typography.bodyRegular} textAlign={'center'} type="disabled" marginStyle={'margin'} marginValue={20}>
            {t('common_or')}
          </StyledText>
          <Button
            labelStyle={{ ...Typography.bodyRegular }}
            style={[styles.button, { marginTop: 0 }]}
            label={t('common_loginByGoogle')}
            type={'borderSecondary'}
            onPress={() => getAccessLink('google')}
            btnContent={'withIcon'}
            iconName={'google'}
          />
          <Button
            labelStyle={{ ...Typography.bodyRegular }}
            style={styles.button}
            label={t('common_loginByFacebook')}
            onPress={() => getAccessLink('facebook')}
            type={'borderSecondary'}
            btnContent={'withIcon'}
            iconName={'facebook'}
          />
          {Platform.OS === 'ios' && (
            <Button
              labelStyle={{ ...Typography.bodyRegular }}
              style={styles.button}
              label={t('common_loginByApple')}
              onPress={appleSignin}
              type={'borderSecondary'}
              btnContent={'withIcon'}
              iconName={'apple'}
            />
          )}
          <Button
            labelStyle={{ ...Typography.bodyRegular }}
            style={styles.button}
            label={t('common_loginByTwitter')}
            onPress={() => getAccessLink('twitter')}
            type={'borderSecondary'}
            btnContent={'withIcon'}
            iconName={'twitter'}
          />
        </>
      )}
      <NetworkError
        isVisible={isServerError}
        hastimer={isFromSignIn ? true : false}
        title={isFromSignIn ? translate('error_network_something_went_wrong') : translate('error_network_unable_to_connect')}
        subtitle={isFromSignIn && translate('error_dont_worry_short')}
        subtitle2={isFromSignIn && translate('error_try_again')}
        linkText={isFromSignIn && translate('error_support_team')}
        onRefresh={onRefresh}
        closeModal={() => changeServerErrorState(false)}
      />
    </View>
  );
};

const createStyles = (t: any) => {
  return StyleSheet.create({
    container: {
      marginTop: 20
    },
    button: {
      marginTop: 20,
      direction: t('config_dir')
    }
  });
};
