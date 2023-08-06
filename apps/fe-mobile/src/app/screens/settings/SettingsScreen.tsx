import React, { useEffect } from 'react';
import ViewContainer from '../../components/view_container';
import styles from './styles';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootNavigation';
import { NAV_ROUTES } from '../../helpers/navRoutes';
import SettingItem from '../../components/item_list/settings/setting_item';
import { translate } from '@fe-monorepo/helper';
import Switch from '../../components/switch';
import StandardHeader from '../../components/headers/standard_header';
import { GuestSettingsData, LoggedSettingsData, SettingsType } from '../../helpers/mockData';
import { ScrollView, Text, View } from 'react-native';
import { colors, getStyle } from '@fe-monorepo/themes';
import { useSelector } from 'react-redux';
import { RootState, setSettingsSwitchStatus, useAppDispatch, allowNotifications } from '@fe-monorepo/store';
import { useAccount, useAppState } from '@fe-monorepo/hooks';
import { getIcon } from './helpers/getIcon';
import { useTranslation } from 'react-i18next';
import images from '../../assets/images';

const SettingsScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, NAV_ROUTES.Settings>>();
  const { themes, selectedLanguage, settingsSwitchData } = useSelector((state: RootState) => state.app);
  const { userContext, persona } = useSelector((state: RootState) => state.user);
  const { ignoreNotifications } = useSelector((state: RootState) => state.pushnotification);
  const dataGuest = GuestSettingsData();
  const dataLogged = LoggedSettingsData();
  const { logout, isLogout } = useAccount();
  const { changeThemes } = useAppState();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLogout) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: NAV_ROUTES.SignIn }]
        })
      );
    }
  }, [isLogout]);

  const onPress = (item: string) => {
    switch (item) {
      case 'theme':
        const theme = themes === 'dark' ? 'light' : 'dark';
        const isDark = theme === 'dark' ? true : false;
        changeThemes(theme);
        dispatch(setSettingsSwitchStatus({ [item]: isDark }));
        break;
      case 'language':
        navigation.navigate(NAV_ROUTES.LanguageSelection);
        break;
      case 'accountinfo':
        navigation.navigate(NAV_ROUTES.AccountInfo);
        break;
      case 'logout':
        logout();
        break;
      case 'notification':
        dispatch(allowNotifications);
        dispatch(setSettingsSwitchStatus({ [item]: !ignoreNotifications }));
      default:
        const isOn = !settingsSwitchData[item] ? false : true;
        dispatch(setSettingsSwitchStatus({ [item]: !isOn }));
        break;
    }
  };

  const renderSettings = ({ item, index }: { item: SettingsType; index: number }, listLength?: number) => {
    const icon = getIcon(item.key);
    const isOn = settingsSwitchData?.[item.key] ?? false;
    const hasDivider = index !== listLength - 1;
    const selectedValue =
      item.key === 'currency'
        ? t('currency_SAR')
        : item.key === 'country'
        ? t('country_SA')
        : item.key === 'language'
        ? selectedLanguage
        : '';

    return (
      <View key={`settings_idx${index}`}>
        <SettingItem
          style={{ paddingVertical: 16 }}
          disabled={item.hasSwitch}
          onItemPress={() => onPress(item.key)}
          iconName={item.key === 'viewprofile' ? null : icon}
          label={item.label}
          hasRightIcon={item.key === 'logout' ? false : true}
          labelStyle={item.key === 'logout' && { color: colors.sunset }}
          avatarName={item.key === 'viewprofile' && (userContext.avatar_url || images.profile_placeholder)}
          subLabel={item.key === 'viewprofile' && userContext.username}
          selectedValue={selectedValue}
          rightChild={item.hasSwitch && <Switch onToggle={() => onPress(item.key)} isOn={isOn} />}
        />
        {hasDivider && <View style={[{ flex: 1, height: 1 }, { backgroundColor: getStyle(themes).textColor10 }]} />}
      </View>
    );
  };

  return (
    <ViewContainer style={styles.container}>
      <StandardHeader
        onBackPress={() => navigation.goBack()}
        label={translate('menu_settings')}
        iconName="search"
        onPressRighPress={() => console.log('MOVE TO SEARCH')}
      />
      <ScrollView contentContainerStyle={styles.listContainer} bounces={false} showsVerticalScrollIndicator={false}>
        {persona === 'guest'
          ? dataGuest.map((item, index) => renderSettings({ item, index }))
          : dataLogged.map((categories, index) => {
              return (
                <View key={`settings_idx${index}`}>
                  <Text style={[styles.category, index === 0 && { marginTop: 8 }, { color: getStyle(themes).textColor70 }]}>
                    {categories.category}
                  </Text>
                  {categories.list.map((item, index) => {
                    return renderSettings({ item, index }, categories.list.length);
                  })}
                </View>
              );
            })}
      </ScrollView>
    </ViewContainer>
  );
};

export default SettingsScreen;
