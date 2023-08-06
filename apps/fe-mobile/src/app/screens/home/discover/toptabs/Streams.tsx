import { View, Image } from 'react-native';
import React from 'react';
import AnimatedScrollView from '../../common_component/AnimatedScrollView';
import { TopTabProps } from '../../types';
import styles from '../styles';

const Streams = (props: TopTabProps) => {
  const { headerAnimatedValue, footerAnimatedValue } = props;

  return (
    <AnimatedScrollView style={styles.contentPadding} headerAnimatedValue={headerAnimatedValue} footerAnimatedValue={footerAnimatedValue}>
      <View style={{ paddingBottom: 150 }}>
        <Image
          style={{ height: 188, width: '100%', marginBottom: 16 }}
          resizeMode="cover"
          source={require('apps/fe-mobile/src/app/assets/images/placeholders/streams_img1.png')}
        />
        <Image
          style={{ height: 188, width: '100%', marginBottom: 16 }}
          resizeMode="cover"
          source={require('apps/fe-mobile/src/app/assets/images/placeholders/streams_img2.png')}
        />
        <Image
          style={{ height: 188, width: '100%', marginBottom: 16 }}
          resizeMode="cover"
          source={require('apps/fe-mobile/src/app/assets/images/placeholders/streams_img3.png')}
        />
        <Image
          style={{ height: 188, width: '100%', marginBottom: 16 }}
          resizeMode="cover"
          source={require('apps/fe-mobile/src/app/assets/images/placeholders/streams_img1.png')}
        />
        <Image
          style={{ height: 188, width: '100%', marginBottom: 16 }}
          resizeMode="cover"
          source={require('apps/fe-mobile/src/app/assets/images/placeholders/streams_img2.png')}
        />
        <Image
          style={{ height: 188, width: '100%', marginBottom: 16 }}
          resizeMode="cover"
          source={require('apps/fe-mobile/src/app/assets/images/placeholders/streams_img3.png')}
        />
      </View>
    </AnimatedScrollView>
  );
};

export default Streams;
