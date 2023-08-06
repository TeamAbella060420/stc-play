import { View, Image } from 'react-native';
import React from 'react';
import AnimatedScrollView from '../common_component/AnimatedScrollView';
import { TopTabProps } from '../types';
import styles from './styles';
import { windowHeight } from '../../../utils/Dimensions';

const ConnectContent = (props: TopTabProps) => {
  const { headerAnimatedValue } = props;
  return (
    <AnimatedScrollView style={styles.contentPadding} headerAnimatedValue={headerAnimatedValue}>
      <View style={{ paddingBottom: 150 }}>
        <Image
          style={{ height: windowHeight * 0.8, width: '100%', marginBottom: 15 }}
          resizeMode="stretch"
          source={require('apps/fe-mobile/src/app/assets/images/placeholders/connect_img.png')}
        />
        <Image
          style={{ height: windowHeight * 0.8, width: '100%' }}
          resizeMode="stretch"
          source={require('apps/fe-mobile/src/app/assets/images/placeholders/connect_img.png')}
        />
      </View>
    </AnimatedScrollView>
  );
};

export default ConnectContent;
