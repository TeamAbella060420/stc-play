import React from 'react';
import { Text, View } from 'react-native';
import ViewContainer from '../../components/view_container';
import { useNavigation } from '@react-navigation/native';
import StandardHeader from '../../components/headers/standard_header';
import { translate } from '@fe-monorepo/helper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootNavigation';
import { NAV_ROUTES } from '../../helpers/navRoutes';
import styles from './styles';
import { colors, getStyle } from '@fe-monorepo/themes';
import Icon from '../../components/Icon';
import { useSelector } from 'react-redux';
import { RootState } from '@fe-monorepo/store';
import Button from '../../components/buttons';
import CardArrow from '../../components/card_arrow';

const GuestComponent = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, NAV_ROUTES.Profile>>();
  const { themes } = useSelector((state: RootState) => state.app);

  return (
    <ViewContainer style={[styles.container, { backgroundColor: colors.purple }]} barStyle="light-content" barBGStyle={colors.purple}>
      <View style={styles.guestTopView}>
        <StandardHeader
          style={styles.guestHeader}
          onBackPress={() => navigation.goBack()}
          label={translate('screen_profile')}
          routeNameStyle={{ color: colors.white100 }}
        />
        <Icon name="rectangleSadFill" width={88} height={90} style={{ alignSelf: 'center' }} />
        <Text style={styles.dontBeStranger}>{translate('profile_guest_dont_be_stranger')}</Text>
        <Text style={styles.guestSignin}>{translate('profile_guest_signin')}</Text>
        <Button
          onPress={() => navigation.navigate(NAV_ROUTES.SignIn, { isNotFromOnboarding: true })}
          style={{ marginHorizontal: 20 }}
          type="primary"
          label={translate('action_signin')}
        />
      </View>

      <View style={[styles.guestBottomView, { backgroundColor: getStyle(themes).backgroundColor }]}>
        <CardArrow
          onPress={() => navigation.navigate(NAV_ROUTES.Settings)}
          title={translate('profile_guest_settings_title')}
          description={translate('profile_guest_settings_description')}
        />
        <CardArrow
          style={{ marginTop: 16 }}
          onPress={() => navigation.navigate(NAV_ROUTES.Support)}
          title={translate('profile_guest_support_title')}
          description={translate('profile_guest_support_description')}
        />
      </View>
    </ViewContainer>
  );
};

export default GuestComponent;
