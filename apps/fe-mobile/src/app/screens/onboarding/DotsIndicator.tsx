import React from 'react';
import { sharedProps } from './types';
import Animated, { Easing, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import colors from 'libs/themes/src/colors';
import { useSelector } from 'react-redux';
import { RootState } from '@fe-monorepo/store';

const DotsIndicator = (props: sharedProps) => {
  const { sharedValue, activeIndex } = props;
  const isRTL = useSelector((state: RootState) => state.app.isRTL);

  const animateDotStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(activeIndex === sharedValue.value ? colors.sunset : 'white', { easing: Easing.linear }),
      width: withTiming(activeIndex === sharedValue.value ? 27 : 5, { easing: Easing.linear }),
      height: 5
    };
  });

  return <Animated.View style={[isRTL ? { marginLeft: 10 } : { marginRight: 10 }, animateDotStyle]} />;
};

export default DotsIndicator;
