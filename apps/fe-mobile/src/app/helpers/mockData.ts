import { NAV_ROUTES } from './navRoutes';
import { translate } from '@fe-monorepo/helper';

export const generalSupportData = [
  { iconName: 'accountQuestions', title: 'support_my_account', navigateTo: NAV_ROUTES.CSoon },
  { iconName: 'discover', title: 'support_bits_streams', navigateTo: NAV_ROUTES.CSoon },
  { iconName: 'compete', title: 'support_tournaments_matchmaking', navigateTo: NAV_ROUTES.CSoon },
  { iconName: 'shop', title: 'support_shop_orders', navigateTo: NAV_ROUTES.CSoon },
  { iconName: 'creditCard', title: 'support_payment_returns', navigateTo: NAV_ROUTES.CSoon },
  { iconName: 'connect', title: 'support_users', navigateTo: NAV_ROUTES.CSoon },
  { iconName: 'cellInfo', title: 'support_stc_play_app', navigateTo: NAV_ROUTES.CSoon },
  { iconName: 'helpCircle', title: 'support_other', navigateTo: NAV_ROUTES.CSoon }
];

export const policiesData = [
  { title: 'settingPage_termsOfService', navigateTo: NAV_ROUTES.TermsOfService, forGuest: true },
  { title: 'menu_privacy', navigateTo: NAV_ROUTES.PrivacyPolicy, forGuest: true },
  { title: 'menu_anti_spam', navigateTo: NAV_ROUTES.CSoon },
  { title: 'menu_code_of_conduct', navigateTo: NAV_ROUTES.CSoon },
  { title: 'support_feedback', navigateTo: NAV_ROUTES.CSoon }
];

export const accountInfoData = [
  { iconName: 'gender', title: 'common_gender', navigateTo: NAV_ROUTES.CSoon, forGuest: true },
  { iconName: 'phonedial', title: 'common_phone_number', navigateTo: NAV_ROUTES.CSoon, forGuest: true },
  { iconName: 'email', title: 'common_email_capital', navigateTo: NAV_ROUTES.CSoon },
  { iconName: 'lock', title: 'common_password_capital', navigateTo: NAV_ROUTES.ChangePassword }
];

export const GuestSettingsData = () => {
  return [
    { key: 'notification', label: translate('settingPage_notifications'), hasSwitch: true },
    { key: 'theme', label: translate('dark_mode'), hasSwitch: true },
    { key: 'language', label: translate('settingPage_language'), hasSwitch: false },
    { key: 'country', label: translate('menu_changeCountry'), hasSwitch: false },
    { key: 'currency', label: translate('menu_changeCurrency'), hasSwitch: false }
  ];
};

export const LoggedSettingsData = () => {
  return [
    {
      category: translate('pageTitle_account'),
      list: [
        { key: 'viewprofile', label: translate('settings_view_profile'), hasSwitch: false },
        { key: 'accountinfo', label: translate('screen_account_info'), hasSwitch: false }
      ]
    },

    {
      category: translate('settings_location_display'),
      list: [
        { key: 'language', label: translate('settingPage_language'), hasSwitch: false },
        { key: 'country', label: translate('menu_changeCountry'), hasSwitch: false },
        { key: 'currency', label: translate('menu_changeCurrency'), hasSwitch: false },
        { key: 'theme', label: translate('dark_mode'), hasSwitch: true }
      ]
    },

    {
      category: translate('settingPage_notifications'),
      list: [
        { key: 'notification', label: translate('settings_push'), hasSwitch: true },
        { key: 'email', label: translate('common_email_capital'), hasSwitch: true },
        { key: 'sms', label: translate('settings_sms'), hasSwitch: true },
        { key: 'inapp', label: translate('settings_inapp'), hasSwitch: true }
      ]
    },

    { category: translate('pageTitle_login'), list: [{ key: 'logout', label: translate('action_logout'), hasSwitch: false }] }
  ];
};

export type SettingsType = {
  category?: string;
  key?: string;
  label?: string;
  hasSwitch?: boolean;
};
