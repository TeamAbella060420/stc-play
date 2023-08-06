import { View, Image } from 'react-native';
import React from 'react';
import AnimatedScrollView from '../../common_component/AnimatedScrollView';
import { TopTabProps } from '../../types';
import { windowHeight } from 'apps/fe-mobile/src/app/utils/Dimensions';

const Bitz = (props: TopTabProps) => {
  const { headerAnimatedValue, footerAnimatedValue } = props;

  return (
    <AnimatedScrollView headerAnimatedValue={headerAnimatedValue} footerAnimatedValue={footerAnimatedValue}>
      <View style={{ paddingBottom: 150 }}>
        <Image
          style={{ height: windowHeight, width: '100%', marginBottom: 16 }}
          resizeMode="cover"
          source={require('apps/fe-mobile/src/app/assets/images/placeholders/bits_img.png')}
        />
      </View>
    </AnimatedScrollView>
  );
};

export default Bitz;
