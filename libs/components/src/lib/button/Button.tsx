import { Animated, Easing, Pressable, StyleSheet, View, useWindowDimensions } from 'react-native';
import { useCallback, useRef } from 'react';
import { translate } from '@fe-monorepo/helper';
import { colors } from '@fe-monorepo/themes';
import { ButtonType } from './types';

export const Button = (props: ButtonType) => {
  const { label, labelStyle, style, onPress } = props;
  const { width } = useWindowDimensions();
  const btnRef = useRef(new Animated.Value(0)).current;
  const MyPressable = Animated.createAnimatedComponent(Pressable);
  const txtColor = btnRef.interpolate({ inputRange: [0, 1], outputRange: [colors.white100, colors.sunset] });

  const onHover = useCallback(
    (event: 'hoverIn' | 'hoverOut') => {
      if (event === 'hoverIn') {
        Animated.timing(btnRef, {
          toValue: 1,
          duration: 700,
          easing: Easing.in(Easing.linear),
          useNativeDriver: false
        }).start();
      } else {
        Animated.timing(btnRef, {
          toValue: 0,
          duration: 700,
          easing: Easing.out(Easing.linear),
          useNativeDriver: false
        }).start();
      }
    },
    [btnRef]
  );

  return (
    <View style={[styles.container, style]}>
      <MyPressable
        style={[styles.btnContainer]}
        accessibilityRole={'button'}
        onHoverIn={() => onHover('hoverIn')}
        onHoverOut={() => onHover('hoverOut')}
        onPress={onPress}
      >
        <Animated.View style={[styles.hoverCover, { width: btnRef.interpolate({ inputRange: [0, 1], outputRange: [0, width * 0.3] }) }]} />
        <Animated.Text style={[styles.label, { color: txtColor }, labelStyle]}>{label || translate('common_continue')}</Animated.Text>
      </MyPressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: '30%', backgroundColor: colors.sunset, borderRadius: 2 },
  btnContainer: {
    alignItems: 'center'
  },
  hoverCover: {
    ...StyleSheet.absoluteFillObject,
    alignSelf: 'flex-start',
    flex: 1,
    backgroundColor: colors.white100
  },
  label: { fontWeight: '500', fontSize: 18, lineHeight: 24, marginVertical: 8 }
});
