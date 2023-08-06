import { useEffect, useMemo, useRef } from 'react';
import { Animated, Easing, Pressable, StyleSheet } from 'react-native';
import { SwitchProps } from './types';
import { useSelector } from 'react-redux';
import { RootState } from '@fe-monorepo/store';
import { colors } from '@fe-monorepo/themes';

export const Switch = (props: SwitchProps) => {
  const { thumbInActiveColor, thumbActiveColor, trackColor, isOn, disabled, onToggle } = props;
  const { themes } = useSelector((state: RootState) => state.app);

  const animatedRef = useRef(new Animated.Value(0)).current;
  const initialBG = themes === 'dark' ? colors.white30 : colors.black30;

  const memoizedAnimatedStyles = useMemo(
    () => [
      styles.container,
      {
        backgroundColor: animatedRef.interpolate({
          inputRange: [0, 1],
          outputRange: [thumbInActiveColor || initialBG, thumbActiveColor || colors.sunset]
        })
      }
    ],
    [animatedRef]
  );

  useEffect(() => {
    if (isOn) {
      Animated.timing(animatedRef, { toValue: 1, duration: 500, easing: Easing.ease, useNativeDriver: false }).start();
    } else {
      Animated.timing(animatedRef, { toValue: 0, duration: 500, easing: Easing.ease, useNativeDriver: false }).start();
    }
  }, [isOn]);

  return (
    <Pressable disabled={disabled} accessibilityRole={'switch'} onPress={onToggle}>
      <Animated.View style={memoizedAnimatedStyles}>
        <Animated.View
          style={[
            styles.trackStyle,
            trackColor ? { backgroundColor: trackColor } : null,
            {
              transform: [{ translateX: animatedRef.interpolate({ inputRange: [0, 1], outputRange: [0, 24] }) }]
            }
          ]}
        />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: { width: 56, height: 32, borderRadius: 20, padding: 4 },
  trackStyle: { width: 24, height: 24, borderRadius: 20, backgroundColor: colors.white100 }
});
