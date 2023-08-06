import React, { useEffect, useMemo } from 'react';
import { Pressable } from 'react-native';
import styles from './styles';
import { SwitchProps } from './type';
import { useSelector } from 'react-redux';
import { RootState } from '@fe-monorepo/store';
import { colors } from '@fe-monorepo/themes';
import Animated, { Easing, interpolate, interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const Switch = (props: SwitchProps) => {
  const { thumbInActiveColor, thumbActiveColor, trackColor, isOn, disabled, onToggle } = props;
  const { themes } = useSelector((state: RootState) => state.app);
  const animatedValue = useSharedValue(0);

  const animatedViewStyle = useAnimatedStyle(() => {
    const inputRange = [0, 1];
    const outputRange = [0, 24];
    const translateX = withTiming(interpolate(animatedValue.value, inputRange, outputRange), { easing: Easing.linear });
    return { transform: [{ translateX }] } as any;
  });

  const animatedBaseStyle = useAnimatedStyle(() => {
    const initialBG = themes === 'dark' ? colors.white30 : colors.black30;
    const inputRange = [0, 1];
    const outputRange = [thumbInActiveColor || initialBG, thumbActiveColor || colors.sunset];
    const backgroundColor = withTiming(interpolateColor(animatedValue.value, inputRange, outputRange), { easing: Easing.ease });
    return { backgroundColor } as any;
  });

  const memoizedAnimatedStyles = useMemo(() => [styles.container, animatedBaseStyle], [, animatedBaseStyle]);

  useEffect(() => {
    if (isOn) {
      animatedValue.value = 1;
    } else {
      animatedValue.value = 0;
    }
  }, [isOn]);

  return (
    <Pressable disabled={disabled} accessibilityRole={'switch'} onPress={onToggle}>
      <Animated.View style={memoizedAnimatedStyles}>
        <Animated.View style={[styles.trackStyle, trackColor && { backgroundColor: trackColor }, animatedViewStyle]} />
      </Animated.View>
    </Pressable>
  );
};

export default Switch;
