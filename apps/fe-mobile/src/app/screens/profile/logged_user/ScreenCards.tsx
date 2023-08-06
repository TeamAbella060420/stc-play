import { StyleSheet, View } from 'react-native';
import React from 'react';
import CardArrow from '../../../components/card_arrow';
import { translate } from '@fe-monorepo/helper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigation/RootNavigation';
import { NAV_ROUTES } from '../../../helpers/navRoutes';

const ScreenCards = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, NAV_ROUTES.Profile>>();

  return (
    <View style={{ paddingHorizontal: 20 }}>
      <CardArrow
        style={{ marginTop: 16 }}
        onPress={() => console.log('MOVE TO MY ACHIEVEMENT')}
        title={translate('profile_myachivement_title')}
        description={translate('profile_myachivement_description')}
      />
      <CardArrow
        style={{ marginTop: 16 }}
        onPress={() => console.log('MOVE TO MY ORDER')}
        title={translate('profile_myorder_title')}
        description={translate('profile_myorder_description')}
      />
      <CardArrow
        style={{ marginTop: 16 }}
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
  );
};

export default ScreenCards;

const styles = StyleSheet.create({});
