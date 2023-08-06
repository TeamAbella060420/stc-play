import React, { useState } from 'react';
import { throttle } from 'lodash';
import { useSelector } from 'react-redux';
import { RootState, setPersona, useAppDispatch } from '@fe-monorepo/store';
import { sharedProps } from './types';
import Button from '../../components/buttons';
import styles from './styles';
import Animated, { interpolate, runOnJS, useAnimatedStyle } from 'react-native-reanimated';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootNavigation';
import { NAV_ROUTES } from '../../helpers/navRoutes';
import { useTranslation } from 'react-i18next';

const Footer = (props: sharedProps) => {
  const dispatch = useAppDispatch();
  const { sharedValue, onNext } = props;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, NAV_ROUTES.Onboarding>>();
  const { t } = useTranslation();
  const isRTL = useSelector((state: RootState) => state.app.isRTL);
  const [isDisabled, setDisabledStatus] = useState(true);

  const animatedIconButtonStyle = useAnimatedStyle(() => {
    const inputRange = [-3, -2];
    const outputRange = [0, 1];
    const opacity = interpolate(sharedValue.value, inputRange, outputRange);
    return { opacity };
  });

  const animatedTextButtonStyle = useAnimatedStyle(() => {
    const inputRange = [-3, -2];
    const outputRange = [1, 0];
    const opacity = interpolate(sharedValue.value, inputRange, outputRange);
    if (sharedValue.value === -3) {
      runOnJS(setDisabledStatus)(false);
    } else {
      runOnJS(setDisabledStatus)(true);
    }
    return { opacity };
  });

  const gotoMain = (persona?: string) => {
    let route;
    if (persona === 'guest') {
      dispatch(setPersona(persona));
      route = NAV_ROUTES.Main;
    } else {
      route = NAV_ROUTES.SignIn;
    }
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: route }]
      })
    );
  };

  return (
    <>
      <Animated.View style={[styles.buttonNext, animatedIconButtonStyle, isRTL ? { left: 20 } : { right: 20 }]}>
        <Button
          type="primary"
          btnContent="iconOnly"
          iconName={isRTL ? 'icon_arrow_left' : 'icon_arrow_right'}
          iconNewStyle={styles.iconArrow}
          onPress={throttle(onNext, 1000)}
        />
      </Animated.View>

      <Animated.View style={[styles.buttonContainer, animatedTextButtonStyle, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
        <Button
          disabled={isDisabled}
          style={styles.btnTxtContainer}
          type="borderPrimary"
          label={t('action_guest')}
          iconName={isRTL ? 'icon_arrow_left' : 'icon_arrow_right'}
          iconNewStyle={styles.iconArrow}
          onPress={throttle(() => gotoMain('guest'), 1000)}
        />
        <Button
          disabled={isDisabled}
          style={styles.btnTxtContainer}
          type="primary"
          label={t('action_signin')}
          iconName={isRTL ? 'icon_arrow_left' : 'icon_arrow_right'}
          iconNewStyle={styles.iconArrow}
          onPress={throttle(() => gotoMain(), 1000)}
        />
      </Animated.View>
    </>
  );
};

export default Footer;
