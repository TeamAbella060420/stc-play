import React from 'react';
import { Text, StyleSheet } from 'react-native';
import ViewContainer from '../../components/view_container';
import StandardHeader from '../../components/headers/standard_header';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '@fe-monorepo/store';
import { translate } from '@fe-monorepo/helper';

const CartScreen = () => {
  const navigation = useNavigation();
  const { persona } = useSelector((state: RootState) => state.user);
  const isGuest = persona === 'guest';

  return (
    <ViewContainer style={styles.container}>
      <StandardHeader
        onBackPress={() => navigation.goBack()}
        label={translate('screen_cart')}
        iconName={isGuest ? null : 'heart'}
        onPressIcon={() => console.log('navigate to wishlist')}
      />
      <Text>Cart Screen</Text>
    </ViewContainer>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: { marginBottom: 0, paddingHorizontal: 0 }
});
