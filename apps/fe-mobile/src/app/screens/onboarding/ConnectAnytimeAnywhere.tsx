import { ImageBackground, View } from 'react-native';
import React from 'react';
import Animated, { interpolate, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import images from '../../assets/images';
import Divider from './Divider';
import styles from './styles';
import { windowWidth } from '../../utils/Dimensions';
import { sharedProps } from './types';
import { PanGestureHandler } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import colors from 'libs/themes/src/colors';

const ConnectAnytimeAnywhere = (props: sharedProps) => {
  const { sharedValue, onGestureEvent } = props;
  const AnimatedImage = Animated.createAnimatedComponent(ImageBackground);
  const animatedImageStyle = useAnimatedStyle(() => {
    const inputRange = [0, 1, 2, 3];
    const outputRange = [0, windowWidth, 0, 0];
    const translateX = interpolate(sharedValue.value, inputRange, outputRange);
    return { transform: [{ translateX: withTiming(translateX, { duration: 100 }) }, { scale: 0.65 }] };
  });

  const animatedContainerStyle = useAnimatedStyle(() => {
    const inputRange = [1, 2, 3];
    const outputRange = [windowWidth * 2 + 400, 0, -windowWidth * 2];
    const translateX = interpolate(sharedValue.value, inputRange, outputRange);
    return { transform: [{ translateX }] };
  });

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={[styles.connectContainer, animatedContainerStyle]}>
        <View style={[styles.bgColor]} />
        <Divider />
        <ImageBackground source={images.connect_man_main} style={styles.connectImgMan} resizeMode="contain">
          <AnimatedImage source={images.connect_mobile_bg} style={[styles.connectImgMobile, animatedImageStyle]} resizeMode="contain" />
        </ImageBackground>
        <LinearGradient colors={[colors.black00, colors.black100]} style={styles.gradient} />
      </Animated.View>
    </PanGestureHandler>
  );
};

export default ConnectAnytimeAnywhere;
