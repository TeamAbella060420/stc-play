import { Image, View } from 'react-native';
import React from 'react';
import AnimatedScrollView from '../../common_component/AnimatedScrollView';
import { TopTabProps } from '../../types';
import styles from '../styles';

const ForYou = (props: TopTabProps) => {
  const { headerAnimatedValue, footerAnimatedValue } = props;

  return (
    <AnimatedScrollView style={styles.contentPadding} headerAnimatedValue={headerAnimatedValue} footerAnimatedValue={footerAnimatedValue}>
      <View style={{ paddingBottom: 150 }}>
        <Image
          style={{ height: 335, width: '100%', marginBottom: 16 }}
          resizeMode="cover"
          source={require('apps/fe-mobile/src/app/assets/images/placeholders/foryou_img1.png')}
        />
        <Image
          style={{ height: 335, width: '100%', marginBottom: 16 }}
          resizeMode="cover"
          source={require('apps/fe-mobile/src/app/assets/images/placeholders/foryou_img2.png')}
        />
        <Image
          style={{ height: 335, width: '100%', marginBottom: 16 }}
          resizeMode="cover"
          source={require('apps/fe-mobile/src/app/assets/images/placeholders/foryou_img1.png')}
        />
        <Image
          style={{ height: 335, width: '100%', marginBottom: 16 }}
          resizeMode="cover"
          source={require('apps/fe-mobile/src/app/assets/images/placeholders/foryou_img2.png')}
        />
      </View>
    </AnimatedScrollView>
  );
};

export default ForYou;
