import React from 'react';
import { View, ScrollView, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@fe-monorepo/store';
import { NAV_ROUTES } from '../../helpers/navRoutes';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootNavigation';
import { translate } from '@fe-monorepo/helper';

import ViewContainer from '../../components/view_container';
import styles from './styles';
import { generalSupportData, policiesData } from '../../helpers/mockData';
import StandardHeader from '../../components/headers/standard_header';
import SettingItem from '../../components/item_list/settings/setting_item';
import { colors } from '@fe-monorepo/themes';
import { StyledText } from '../../components/text';
import Typography from '../../assets/typography';
import DeviceInfo from 'react-native-device-info'; 
import i18next, { t } from 'i18next';


const SupportScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, NAV_ROUTES.Support>>();
    const { persona } = useSelector((state: RootState) => state.user);
    const isGuest = persona === 'guest';

    return (
        <ViewContainer style={styles.container}>
            <StandardHeader onBackPress={() => navigation.goBack()} label={translate('screen_support')}/>
            <ScrollView 
                contentContainerStyle={{paddingBottom: 100, paddingHorizontal: 20}}
                showsVerticalScrollIndicator={false} 
                bounces={false}
            >
                <View style={{paddingVertical: 24}}>
                    <StyledText textStyle={Typography.bodyMedium} textAlign={translate('config_align')} >{translate('support_help_title')}</StyledText>
                </View>
                <FlatList
                    scrollEnabled={false}
                    data={generalSupportData}
                    ItemSeparatorComponent={() => <View style={{width: '100%', height: 1, backgroundColor: colors.black10, marginVertical: 8}} />}
                    renderItem={({item, index}) => {
                        return (
                            <SettingItem
                                label={t(item.title)}
                                iconName={item.iconName}
                                onItemPress={() => {navigation.navigate(item.navigateTo)}}
                            />
                        )
                    }}
                />

                <FlatList
                    style={{marginVertical: 28 }}
                    scrollEnabled={false}
                    data={policiesData.filter(item => (item.forGuest && isGuest) || !isGuest)}
                    ItemSeparatorComponent={() => <View style={{width: '100%', height: 1, backgroundColor: colors.black10, marginVertical: 4}} />}
                    renderItem={({item, index}) => {
                        if((item.forGuest && isGuest) || !isGuest)
                        return (
                            <SettingItem
                                label={t(item.title)}
                                onItemPress={() => {navigation.navigate(item.navigateTo)}}
                            />
                        )
                    }}
                />
                <StyledText textStyle={Typography.captionRegular} textColour={colors.black50} textAlign={translate('config_align')} >{t('support_app_version', {version: DeviceInfo.getVersion()+" "+DeviceInfo.getBuildNumber()})}</StyledText>
            </ScrollView>
        </ViewContainer>
    );
};

export default SupportScreen;


