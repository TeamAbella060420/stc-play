import { ImageBackground, View } from 'react-native';
import React from 'react';
import colors from 'libs/themes/src/colors';
import Animated, { interpolate, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import images from '../../assets/images';
import Divider from './Divider';
import styles from './styles';
import { windowWidth } from '../../utils/Dimensions';
import { sharedProps } from './types';
import { PanGestureHandler } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

const ScoreFavProducts = (props: sharedProps) => {
  const { sharedValue, onGestureEvent } = props;
  const AnimatedImage = Animated.createAnimatedComponent(ImageBackground);
  const animatedImageStyle = useAnimatedStyle(() => {
    const inputRange = [0, 1, 2];
    const outputRange = [-windowWidth * 0.8, -150, -150];
    const right = interpolate(sharedValue.value, inputRange, outputRange);
    return { right: withTiming(right, { duration: 100 }) };
  });
  const animatedContainerStyle = useAnimatedStyle(() => {
    const inputRange = [0, 1, 2, 3];
    const outputRange = [windowWidth * 2 + 400, 0, -windowWidth * 2, -windowWidth * 4];
    const translateX = interpolate(sharedValue.value, inputRange, outputRange);
    return { transform: [{ translateX }] };
  });

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={[styles.scoreContainer, animatedContainerStyle]}>
        <View style={[styles.bgColor, { backgroundColor: colors.moonlight }]} />
        <Divider />
        <ImageBackground source={images.score_console_main} style={styles.scoreImgConsole} resizeMode="contain">
          <AnimatedImage source={images.score_controller_bg} style={[styles.scoreImgController, animatedImageStyle]} resizeMode="contain" />
        </ImageBackground>
        <LinearGradient colors={[colors.black00, colors.black100]} style={styles.gradient} />
      </Animated.View>
    </PanGestureHandler>
  );
};

export default ScoreFavProducts;
