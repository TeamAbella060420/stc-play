import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Onboarding from '../screens/onboarding/Onboarding';
import { Translation } from '@fe-monorepo/helper';
import { NAV_ROUTES } from '../helpers/navRoutes';
import { store } from '@fe-monorepo/store';

/** screens **/
import { SignUpScreen } from '../screens/auth/SignUpScreen';
import { SignInData, SignInScreen } from '../screens/auth/SignInScreen';
import Splash from '../screens/splash/Splash';
import LanguageOption from '../screens/languageOption/LanguageOption';
import { OtpScreen, OtpData } from '../screens/auth/OtpScreen';
import { SuccessData, SuccessScreen } from '../screens/common/SuccessScreen';
import Questionnaire from '../screens/questionnaire/Questionnaire';
import { EmailData, EmailScreen } from '../screens/auth/EmailScreen';
import BottomTab from './BottomTab';
import TestScreen from '../screens/common/TestScreen';
import NotificationScreen from '../screens/notification/NotificationScreen';
import SearchScreen from '../screens/search/SearchScreen';
import CartScreen from '../screens/shop/CartScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import OnboardingAR from '../screens/onboardingAR/OnboardingAR';
import { ResetPasswordData, ResetPasswordScreen } from '../screens/auth/ResetPasswordScreen';
import TermsOfServiceScreen from '../screens/termsOfService';
import PrivacyPolicyScreen from '../screens/privacyPolicy';
import SettingsScreen from '../screens/settings/SettingsScreen';
import { AdditionalInputScreen, AdditionalInputData } from '../screens/auth/AdditionalScreen';
import SupportScreen from '../screens/support/SupportScreen';
import CSoon from '../screens/common/CommonScreen';
import LanguageSelection from '../screens/languageSelection/LanguageSelection';
import AccountInfoScreen from '../screens/settings/accountInfo/AccountInfoScreen';
import ChangePasswordScreen from '../screens/settings/changePassword/changePassword';
import { usePushNotification } from '../hooks/usePushNotification';
import ForgotPassword from '../screens/auth/ForgotPassword';

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  OnboardingAR: undefined;
  SignUp: undefined;
  SignIn: SignInData;
  Otp: OtpData;
  Language: undefined;
  CSoon: undefined;
  Success: SuccessData;
  Questionnaire: undefined;
  EditEmail: EmailData;
  Tabbar: undefined;
  Main: undefined;
  Notification: undefined;
  Cart: undefined;
  Profile: undefined;
  Search: undefined;
  ResetPassword: ResetPasswordData;
  TestScreen: undefined;
  TermsOfService: undefined;
  PrivacyPolicy: undefined;
  AccountInfo: undefined;
  ChangePassword: undefined;
  Settings: undefined;
  Support: undefined;
  LanguageSelection: undefined;
  AdditionalInput: AdditionalInputData;
  ForgotPassword: SignInData;
};

const Stack = createStackNavigator<RootStackParamList>();

export const RootNavigation = () => {
  const { language } = store.getState().app;
  usePushNotification(); //initialize push notification

  useEffect(() => {
    Translation(language);
  }, [language]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}>
      <Stack.Screen name={NAV_ROUTES.Splash} component={Splash} />
      <Stack.Screen name={'TestScreen'} component={TestScreen} />
      <Stack.Screen name={NAV_ROUTES.Language} options={{ animationEnabled: false }} component={LanguageOption} />
      <Stack.Screen name={NAV_ROUTES.Onboarding} options={{ animationEnabled: false }} component={Onboarding} />
      <Stack.Screen name={NAV_ROUTES.OnboardingAR} options={{ animationEnabled: false }} component={OnboardingAR} />
      <Stack.Screen initialParams={{ isNotFromOnboarding: false }} name={NAV_ROUTES.SignIn} component={SignInScreen} />
      <Stack.Screen name={NAV_ROUTES.Otp} component={OtpScreen} />
      <Stack.Screen name={NAV_ROUTES.Success} component={SuccessScreen} />
      <Stack.Screen name={NAV_ROUTES.SignUp} component={SignUpScreen} />
      <Stack.Screen name={NAV_ROUTES.ResetPassword} component={ResetPasswordScreen} />
      <Stack.Screen name={NAV_ROUTES.Questionnaire} component={Questionnaire} />
      <Stack.Screen name={NAV_ROUTES.EditEmail} component={EmailScreen} />
      <Stack.Screen name={NAV_ROUTES.Notification} component={NotificationScreen} />
      <Stack.Screen name={NAV_ROUTES.Profile} component={ProfileScreen} />
      <Stack.Screen name={NAV_ROUTES.LanguageSelection} component={LanguageSelection} />
      <Stack.Screen name={NAV_ROUTES.Cart} component={CartScreen} />
      <Stack.Screen name={NAV_ROUTES.Search} component={SearchScreen} />
      <Stack.Screen name={NAV_ROUTES.Main} component={BottomTab} />
      <Stack.Screen name={NAV_ROUTES.PrivacyPolicy} component={PrivacyPolicyScreen} />
      <Stack.Screen name={NAV_ROUTES.TermsOfService} component={TermsOfServiceScreen} />
      <Stack.Screen name={NAV_ROUTES.AccountInfo} component={AccountInfoScreen} />
      <Stack.Screen name={NAV_ROUTES.ChangePassword} component={ChangePasswordScreen} />
      <Stack.Screen name={NAV_ROUTES.Settings} component={SettingsScreen} />
      <Stack.Screen name={NAV_ROUTES.Support} component={SupportScreen} />
      <Stack.Screen name={NAV_ROUTES.AdditionalInput} component={AdditionalInputScreen} />
      <Stack.Screen name={NAV_ROUTES.ForgotPassword} component={ForgotPassword} />
      <Stack.Screen name={NAV_ROUTES.CSoon} component={CSoon} options={{ gestureEnabled: true }} />
    </Stack.Navigator>
  );
};
