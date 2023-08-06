import { ImageBackground } from 'react-native';
import React from 'react';
import Animated, { Easing, interpolate, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import images from '../../assets/images';
import styles from './styles';
import { windowHeight, windowWidth } from '../../utils/Dimensions';
import { sharedProps } from './types';
import LinearGradient from 'react-native-linear-gradient';
import { PanGestureHandler } from 'react-native-gesture-handler';
import colors from 'libs/themes/src/colors';

const NeverMissChanceToShine = (props: sharedProps) => {
  const { sharedValue, onGestureEvent } = props;
  const AnimatedImage = Animated.createAnimatedComponent(ImageBackground);
  const animatedImageStyle = useAnimatedStyle(() => {
    const inputRange = [-3, -2, -1, 0];
    const outputRange = [-100, -400, 0, 0];
    const translateX = interpolate(sharedValue.value, inputRange, outputRange);
    return {
      transform: [{ translateX: withTiming(translateX, { duration: 300, easing: Easing.ease }) }, { translateY: -windowHeight * 0.2 }]
    };
  });

  const animatedContainerStyle = useAnimatedStyle(() => {
    const inputRange = [-3, -2];
    const outputRange = [0, -windowWidth - 400];
    const translateX = interpolate(sharedValue.value, inputRange, outputRange);
    return { transform: [{ translateX }] };
  });

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={[styles.nevermissContainer, animatedContainerStyle]}>
        <LinearGradient colors={['#AD1972', '#C22075']} style={styles.bgColor} />
        <ImageBackground source={images.nevermiss_man_main} style={styles.nevermissImgMan} resizeMode="cover">
          <AnimatedImage
            source={images.nevermiss_rectangle_bg}
            style={[styles.nevermissImgRectangle, animatedImageStyle]}
            resizeMode="contain"
          />
        </ImageBackground>
        <LinearGradient colors={[colors.black00, colors.black100]} style={styles.gradient} />
      </Animated.View>
    </PanGestureHandler>
  );
};

export default NeverMissChanceToShine;
