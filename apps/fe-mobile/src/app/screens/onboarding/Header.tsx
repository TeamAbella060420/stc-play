import { View, Text, Image, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import images from '../../assets/images';
import { useSelector } from 'react-redux';
import { RootState } from '@fe-monorepo/store';
import Animated, { Easing, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { windowWidth } from '../../utils/Dimensions';
import { sharedProps } from './types';
import { translate } from '@fe-monorepo/helper';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootNavigation';
import { NAV_ROUTES } from '../../helpers/navRoutes';

const Header = (props: sharedProps) => {
  const { sharedValue, onSkip } = props;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, NAV_ROUTES.Onboarding>>();
  const isRTL = useSelector((state: RootState) => state.app.isRTL);
  const [isSkipDisable, setSkipDisableStatus] = useState(false);

  const animatedSkipValue = useSharedValue(0);
  const animatedTextStyle = useAnimatedStyle(() => {
    const inputRange = [0, 1];
    const outputRange = [0, (windowWidth / 2) * 0.75];
    const translateX = interpolate(animatedSkipValue.value, inputRange, outputRange);
    const inputRangeOpac = [2, 3];
    const outputRangeOpac = [1, 0];
    const opacity = interpolate(sharedValue.value, inputRangeOpac, outputRangeOpac);
    if (sharedValue.value === 3) {
      runOnJS(setSkipDisableStatus)(true);
    } else {
      runOnJS(setSkipDisableStatus)(false);
    }
    return { transform: [{ translateX }], opacity, zIndex: sharedValue.value === 3 ? -999 : 10 };
  });
  const animatedRTLTextStyle = useAnimatedStyle(() => {
    const inputRange = [0, 1];
    const outputRangeIos = [(windowWidth / 2) * 0.75, 0];
    const outputRangeAndroid = [0, -(windowWidth / 2) * 0.75];
    const outputRange = Platform.OS === 'android' ? outputRangeAndroid : outputRangeIos;
    const translateX = interpolate(animatedSkipValue.value, inputRange, outputRange);
    const inputRangeOpac = [2, 3];
    const outputRangeOpac = [1, 0];
    const opacity = interpolate(sharedValue.value, inputRangeOpac, outputRangeOpac);
    return { transform: [{ translateX }], opacity };
  });

  useEffect(() => {
    animatedSkipValue.value = withTiming(1, { duration: 300, easing: Easing.inOut(Easing.ease) });
  }, [animatedSkipValue, isRTL]);

  return (
    <View style={[styles.headerContainer, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
      <View style={{ flex: 1, alignItems: isRTL ? 'flex-end' : 'flex-start' }}>
        <Image style={styles.stcLogo} source={images.stc_logo} resizeMode="contain" />
      </View>

      <View style={{ flex: 1 }}>
        <Animated.View style={isRTL ? animatedRTLTextStyle : animatedTextStyle}>
          <Text
            style={[styles.skip]}
            disabled={isSkipDisable}
            onPress={() => {
              navigation.navigate(NAV_ROUTES.SignIn);
            }}
          >
            {translate('action_skip')}
          </Text>
        </Animated.View>
      </View>
    </View>
  );
};

export default Header;
