import React from 'react';
import { View, ScrollView, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@fe-monorepo/store';
import { NAV_ROUTES } from '../../../helpers/navRoutes';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigation/RootNavigation';
import { translate } from '@fe-monorepo/helper';
import styles from './styles';
import { accountInfoData } from '../../../helpers/mockData';
import StandardHeader from '../../../components/headers/standard_header';
import ViewContainer from '../../../components/view_container';
import SettingItem from '../../../components/item_list/settings/setting_item';
import { colors } from '@fe-monorepo/themes';
import { StyledText } from '../../../components/text';
import Typography from '../../../assets/typography';
import { t } from 'i18next';

const AccountInfoScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, NAV_ROUTES.Support>>();
  const { userContext, persona } = useSelector((state: RootState) => state.user);
  const { themes } = useSelector((state: RootState) => state.app);
  const isGuest = persona === 'guest';

  return (
    <ViewContainer style={styles.container}>
      <StandardHeader onBackPress={() => navigation.goBack()} label={translate('support_my_account')} iconName="search" />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={{ paddingVertical: 24, flexDirection: 'column', gap: 16 }}>
          <View style={{ flexDirection: 'column', gap: 12 }}>
            <StyledText textStyle={Typography.bodyRegular} textColour={colors.black70} textAlign={translate('config_align')}>
              {translate('formAttribute_username')}
            </StyledText>
            <StyledText textStyle={Typography.bodyMedium} textColour={colors.black100} textAlign={translate('config_align')}>
              {userContext.username}
            </StyledText>
          </View>
          <StyledText textStyle={Typography.captionRegular} textColour={colors.black50} textAlign={translate('config_align')}>
            {translate('common_cannot_change_username')}
          </StyledText>
        </View>
        <FlatList
          scrollEnabled={false}
          data={accountInfoData}
          ItemSeparatorComponent={() => <View style={{ width: '100%', height: 1, backgroundColor: colors.black10, marginVertical: 8 }} />}
          renderItem={({ item, index }) => {
            return (
              <SettingItem
                label={t(item.title)}
                iconName={item.iconName}
                onItemPress={() => {
                  navigation.navigate(item.navigateTo);
                }}
              />
            );
          }}
        />
      </ScrollView>
    </ViewContainer>
  );
};

export default AccountInfoScreen;
