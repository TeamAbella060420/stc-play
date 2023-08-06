import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { OtpModel } from '@fe-monorepo/models';
import { useCountdown, useOtp } from '@fe-monorepo/hooks';
import { useTranslation } from 'react-i18next';
import { NAV_ROUTES } from '../../helpers/navRoutes';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootNavigation';
import { StyledSafeView } from '../../components/safe_view';
import { StyledContainer } from '../../components/container';
import { Header } from './component/header.component';
import Textfield from '../../components/textfield';
import { StyledText } from '../../components/text';
import Link from '../../components/link';
import Typography from '../../assets/typography';
import { CommonActions, RouteProp } from '@react-navigation/native';
import { OTP_TYPES_SCREENS, translate } from '@fe-monorepo/helper';
import { Validator } from '@fe-monorepo/helper';
import { RootState, setPersona, setValidateAccount, useAppDispatch } from '@fe-monorepo/store';
import { useSelector } from 'react-redux';
import ServerError from '../../components/server_error';
import { getStyle } from '@fe-monorepo/themes';

export interface OtpData {
  type?: string;
  email?: string;
  username?: string;
  channel?: string;
}

export type OtpRouteProp = RouteProp<RootStackParamList, NAV_ROUTES.Otp>;

type OTPNavProps = StackNavigationProp<RootStackParamList, NAV_ROUTES.Otp>;

export interface OtpProps {
  route: OtpRouteProp;
  navigation: OTPNavProps;
}

export const OtpScreen = ({ route, navigation }: OtpProps) => {
  const { type, email, channel, username } = route.params;
  const userContext = useSelector((state: RootState) => state.user.userContext);
  const { themes } = useSelector((state: RootState) => state.app);
  const { t } = useTranslation();
  const [otp, setOTP] = useState<string>('');
  const styles = createStyles(t);
  const {
    requestOTP,
    requestResetPasswordOTP,
    verifyOTP,
    tempToken,
    isVerifiedStatus,
    verifiedErrorMsg,
    deleteOTPError,
    isServerError,
    isOTPLocked
  } = useOtp();
  const [isVisible, setVisibility] = useState<boolean>(isServerError);
  const [attemptRemaining, setAttemptRemaining] = useState<number>(0);
  const dispatch = useAppDispatch();
  const { remainingTime, formattedTime, setNewTime, resetTime } = useCountdown(60);

  useEffect(() => {
    // added this condition because when you login and the is_2FA_required field is equal to 1 you will recieve the OTP automatically
    if (type === OTP_TYPES_SCREENS.RESET_PASSWORD) {
      requestResetPassword();
    } else if (type !== OTP_TYPES_SCREENS.SIGN_IN_EMAIL_OTP) {
      requestNewOTP();
    }
  }, []);

  useEffect(() => {
    setVisibility(isServerError);
  }, [isServerError]);

  useEffect(() => {
    if (isOTPLocked) {
      setNewTime(900); //  900=15 minutes
    } else if (verifiedErrorMsg && attemptRemaining < 5) {
      setAttemptRemaining(attemptRemaining + 1);
    }
  }, [verifiedErrorMsg, isOTPLocked]);

  useEffect(() => {
    if (otp.length === 6) {
      verifyOtp();
    }
  }, [otp]);

  const checkIsEmailAddress = () => {
    if (Validator.isValidEmail(email)) {
      return email;
    } else {
      return userContext.identifier;
    }
  };

  useEffect(() => {
    let newPersona: any = 'existing';
    if (isVerifiedStatus) {
      if (type === OTP_TYPES_SCREENS.SIGN_IN_EMAIL_OTP) {
        dispatch(setValidateAccount(true));
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: NAV_ROUTES.Main }]
          })
        );
      } else if (type === OTP_TYPES_SCREENS.RESET_PASSWORD && tempToken) {
        navigation.navigate(NAV_ROUTES.ResetPassword, { token: tempToken });
        newPersona = 'guest';
      } else {
        navigation.navigate(NAV_ROUTES.Success);
      }
      dispatch(setPersona(newPersona));
    }
  }, [isVerifiedStatus, tempToken]);

  const onPressBackButton = () => {
    if (type === OTP_TYPES_SCREENS.SIGN_IN_EMAIL_OTP) {
      navigation.navigate(NAV_ROUTES.SignIn);
    } else if (type === OTP_TYPES_SCREENS.RESET_PASSWORD) {
      navigation.goBack();
    }
  };
  const onPressLink = () => {
    navigation.navigate(NAV_ROUTES.SignUp);
  };

  // API request OTP
  const requestNewOTP = () => {
    resetTime();
    if (type === OTP_TYPES_SCREENS.RESET_PASSWORD) {
      requestResetPassword();
    } else {
      requestOTP({
        type: type,
        endpoint: Platform.OS,
        channel: channel
      } as OtpModel);
    }
  };

  // API request reset password OTP
  const requestResetPassword = () => {
    const identifier = email ? { email: email } : username ? { username: username } : {};
    requestResetPasswordOTP({
      ...identifier,
      type: type,
      endpoint: Platform.OS,
      channel: channel
    } as OtpModel);
  };

  // API On Submit OTP
  const verifyOtp = () => {
    verifyOTP({
      type: type,
      otp: otp,
      token: tempToken
    } as OtpModel);
  };

  const onInputChange = (otp: string) => {
    deleteOTPError();
    if (Validator.isDigitsOnly(otp)) {
      setOTP(otp);
    }
  };

  const onPressEditEmail = () => {
    navigation.navigate(NAV_ROUTES.EditEmail, { email: email });
  };

  const otpMsg = () => {
    return remainingTime > 0 ? (
      <View style={styles.otpTimer}>
        <StyledText textStyle={Typography.bodyRegular}>{t('common_otp_resend_in')}</StyledText>
        <Text style={[styles.timerValue, { color: getStyle(themes).textColor }]}>{formattedTime}</Text>
      </View>
    ) : (
      <Link label={t('common_otp_resend_code')} type="primary" onPress={requestNewOTP} style={styles.otpAction} />
    );
  };

  const otpHeader = () => {
    return (
      <View style={styles.otpSubHeader}>
        <StyledText type="subtitle" textStyle={Typography.bodyRegular}>
          {t('common_otp_6digit_code')}{' '}
        </StyledText>
        <View style={styles.editEmailContainer}>
          <StyledText textStyle={Typography.bodyMedium} lineHeight={24}>
            {checkIsEmailAddress()}
          </StyledText>
          {type === OTP_TYPES_SCREENS.SIGN_UP_EMAIL_OTP && <Text> </Text>}
          {type === OTP_TYPES_SCREENS.SIGN_UP_EMAIL_OTP && (
            <Link
              disabled={isOTPLocked}
              label={t('formAttribute_edit_email')}
              type="primary"
              onPress={() => {
                onPressEditEmail();
              }}
            />
          )}
        </View>
      </View>
    );
  };

  return (
    <>
      <StyledSafeView>
        <StyledContainer>
          <Header
            title={
              type === OTP_TYPES_SCREENS.RESET_PASSWORD
                ? t('common_otp_not_pass')
                : attemptRemaining < 3
                ? translate('common_otp_final_boss')
                : translate('common_otp_check_email')
            }
            onPress={onPressBackButton}
            onPressLink={onPressLink}
            children={otpHeader()}
            hasBackButton={type !== OTP_TYPES_SCREENS.SIGN_UP_EMAIL_OTP}
          />
          <Textfield
            editable={!isOTPLocked}
            otpLength={6}
            type={'otp'}
            value={otp}
            keyboardType="number-pad"
            onInputChange={text => {
              onInputChange(text);
            }}
            errorMessage={verifiedErrorMsg}
            otpResendMessage={otpMsg()}
          />
          {type === OTP_TYPES_SCREENS.RESET_PASSWORD && (
            <View style={{ marginTop: 20 }}>
              <StyledText textStyle={Typography.bodyRegular} textAlign={translate('config_align')}>
                {t('common_otp_no_email')}
              </StyledText>
            </View>
          )}
        </StyledContainer>
      </StyledSafeView>
      <ServerError isVisible={isVisible} onRefresh={verifyOtp} closeModal={() => setVisibility(false)} />
    </>
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
    },
    otpContainer: {
      alignItems: t('config_flex'),
      direction: t('config_dir'),
      marginTop: 40,
      margin: 0
    },
    otpAction: {
      marginTop: 40,
      justifyContent: t('config_flex')
    },
    timerValue: {
      ...Typography.bodyMedium,
      padding: 0,
      marginHorizontal: 4,
      marginTop: -1,
      lineHeight: Platform.OS === 'ios' ? 0 : 24
    },
    otpTimer: {
      marginVertical: 40,
      flexDirection: t('config_row'),
      alignItems: t('config_flex'),
      alignContent: 'center'
    }
  });
};
