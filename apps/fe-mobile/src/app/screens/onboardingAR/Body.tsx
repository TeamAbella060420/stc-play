import { TextStyle, View } from 'react-native';
import React from 'react';
import styles from './styles';
import { useSelector } from 'react-redux';
import { RootState } from '@fe-monorepo/store';
import DotsIndicator from './DotsIndicator';
import { sharedProps } from './types';
import Animated, { Easing, Extrapolate, interpolate, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { translate } from '@fe-monorepo/helper';

const Body = (props: sharedProps) => {
  const { sharedValue, activeImageIndex } = props;
  const isRTL = useSelector((state: RootState) => state.app.isRTL);
  const data = [
    { title: translate('onboarding_follow_title'), description: translate('onboarding_follow_description') },
    { title: translate('onboarding_score_title'), description: translate('onboarding_score_description') },
    { title: translate('onboarding_connect_title'), description: translate('onboarding_connect_description') },
    { title: translate('onboarding_nevermiss_title'), description: translate('onboarding_nevermiss_description') }
  ];

  const textAnimationStyle = useAnimatedStyle(() => {
    const inputRange = [activeImageIndex - 1, activeImageIndex, activeImageIndex + 1];
    const outputRange = [0, 1, 0];
    const opacity = interpolate(sharedValue.value, inputRange, outputRange, Extrapolate.CLAMP);
    return { opacity: withTiming(opacity, { easing: Easing.inOut(Easing.ease) }) };
  });
  const textAlign: TextStyle = isRTL ? { textAlign: 'right' } : { textAlign: 'left' };
  const flexDirection: TextStyle = isRTL ? { flexDirection: 'row-reverse' } : { flexDirection: 'row' };
  return (
    <View style={[styles.bodyContainer, isRTL ? styles.bodyContainerRTL : styles.bodyContainerLTR]}>
      <View style={flexDirection}>
        {data.map((_, index) => (
          <DotsIndicator key={`dots_idx${index}`} sharedValue={sharedValue} activeIndex={index * -1} />
        ))}
      </View>
      <Animated.Text style={[styles.bodyTitle, textAlign, textAnimationStyle]}>{data[Math.abs(activeImageIndex)]?.title}</Animated.Text>
      <Animated.Text style={[styles.bodyDescription, textAlign, textAnimationStyle]}>
        {data[Math.abs(activeImageIndex)]?.description}
      </Animated.Text>
    </View>
  );
};

export default Body;
