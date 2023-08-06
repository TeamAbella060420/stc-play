import { View, Image } from 'react-native';
import React from 'react';
import AnimatedScrollView from '../common_component/AnimatedScrollView';
import { TopTabProps } from '../types';
import styles from './styles';

const ShopContent = (props: TopTabProps) => {
  const { headerAnimatedValue } = props;
  return (
    <AnimatedScrollView style={styles.contentPadding} headerAnimatedValue={headerAnimatedValue}>
      <View style={{ paddingBottom: 150 }}>
        <Image
          style={{ height: 292, width: '100%', marginBottom: 24 }}
          resizeMode="stretch"
          source={require('apps/fe-mobile/src/app/assets/images/placeholders/shop_img1.png')}
        />
        <Image
          style={{ height: 292, width: '100%', marginBottom: 24 }}
          resizeMode="stretch"
          source={require('apps/fe-mobile/src/app/assets/images/placeholders/shop_img2.png')}
        />
        <Image
          style={{ height: 292, width: '100%', marginBottom: 24 }}
          resizeMode="stretch"
          source={require('apps/fe-mobile/src/app/assets/images/placeholders/shop_img1.png')}
        />
        <Image
          style={{ height: 292, width: '100%', marginBottom: 24 }}
          resizeMode="stretch"
          source={require('apps/fe-mobile/src/app/assets/images/placeholders/shop_img2.png')}
        />
      </View>
    </AnimatedScrollView>
  );
};

export default ShopContent;
