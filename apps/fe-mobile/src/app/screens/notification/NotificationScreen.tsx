import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ViewContainer from '../../components/view_container';
import StandardHeader from '../../components/headers/standard_header';
import { useNavigation } from '@react-navigation/native';
import { translate } from '@fe-monorepo/helper';

const NotificationScreen = () => {
  const navigation = useNavigation();
  return (
    <ViewContainer style={styles.container}>
      <StandardHeader onBackPress={() => navigation.goBack()} label={translate('screen_notifications')} />
      <Text>NotificationScreen</Text>
    </ViewContainer>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: { marginBottom: 0, paddingHorizontal: 0 }
});
