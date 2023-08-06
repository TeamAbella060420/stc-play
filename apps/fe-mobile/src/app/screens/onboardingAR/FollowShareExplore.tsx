import { ImageBackground, Dimensions, View } from 'react-native';
import React, { useEffect } from 'react';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import images from '../../assets/images';
import Divider from './Divider';
import styles from './styles';
import { windowWidth } from '../../utils/Dimensions';
import { sharedProps } from './types';
import { PanGestureHandler } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import colors from 'libs/themes/src/colors';

const { height } = Dimensions.get('screen');

const FollowShareExplore = (props: sharedProps) => {
  const { sharedValue, onGestureEvent } = props;
  const AnimatedImage = Animated.createAnimatedComponent(ImageBackground);
  const animatedImageValue = useSharedValue(0);
  const animatedImageStyle = useAnimatedStyle(() => {
    const inputRange = [0, 1];
    const scaleOutput = [0.98, 1];
    const translateYOutput = [height - height * 0.98, 0];
    const scaleY = interpolate(animatedImageValue.value, inputRange, scaleOutput);
    const scaleX = interpolate(animatedImageValue.value, inputRange, scaleOutput);
    const translateY = interpolate(animatedImageValue.value, inputRange, translateYOutput);
    return { transform: [{ scaleX }, { scaleY }, { translateY }] };
  });
  const animatedContainerStyle = useAnimatedStyle(() => {
    const inputRange = [-1, 0];
    const outputRange = [windowWidth * 2, 0];
    const translateX = interpolate(sharedValue.value, inputRange, outputRange);
    return { transform: [{ translateX }] };
  });

  useEffect(() => {
    animatedImageValue.value = withTiming(1, { duration: 500 });
  }, [animatedImageValue.value]);

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={[styles.followContainer, animatedContainerStyle]}>
        <View style={styles.bgColor} />
        <Divider />
        <AnimatedImage source={images.follow_man_main} style={[{ flex: 1 }, animatedImageStyle]} resizeMode="cover">
          <AnimatedImage source={images.follow_cash_bg} style={[{ flex: 1 }, animatedImageStyle]} resizeMode="cover" />
        </AnimatedImage>
        <LinearGradient colors={[colors.black00, colors.black100]} style={styles.gradient} />
      </Animated.View>
    </PanGestureHandler>
  );
};

export default FollowShareExplore;
