import { View, Pressable, Image, StatusBar, Alert, Linking } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import { spacing, colors } from '@fe-monorepo/themes';
import { useAppState } from '@fe-monorepo/hooks';
import { useSelector, batch } from 'react-redux';
import { RootState, useAppDispatch } from '@fe-monorepo/store';
import Animated, { Easing, interpolate, interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { NAV_ROUTES } from '../../helpers/navRoutes';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootNavigation';
import useDisableBackButton from '../../hooks/useDisableBackButton';
import { windowHeight, windowWidth } from '../../utils/Dimensions';
import images from '../../assets/images';
import styles from './styles';
import { translate } from '@fe-monorepo/helper';
import { LanguageSelections, LanguageSelectionsModel, resources } from 'libs/lang/index';


import {
  allowNotifications,
  pushPermissionReceived,
  PushPermissionState,
  startRequestPushToken,
  stopRequestPushToken
} from '@fe-monorepo/store'


const LanguageOption = () => {
  useDisableBackButton(true);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, NAV_ROUTES.Language>>();
  const dispatch = useAppDispatch()
  const { changeLanguage } = useAppState();
  const { language, isRTL } = useSelector((state: RootState) => state.app);
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  const animatedValue = useSharedValue(0);
  const animatedTitleValue = useSharedValue(0);

  const notificationReceived = useSelector(
    (state: RootState) => state.pushnotification.notificationReceived
  )

  const pushPermissionState = useSelector(
    (state: RootState) => state.pushnotification.permissionState
  )


  const animatedButtonStyle = useAnimatedStyle(() => {
    const inputRange = [0, 1];
    const outputRange = [0, windowWidth * 0.3];
    const translateX = interpolate(animatedValue.value, inputRange, outputRange);
    return { transform: [{ translateX }] } as any;
  });

  const animatedButtonARStyle = useAnimatedStyle(() => {
    const inputRange = [0, 1];
    const outputRange = [-windowWidth * 0.3, 0];
    const translateX = interpolate(animatedValue.value, inputRange, outputRange);
    return { transform: [{ translateX }] } as any;
  });

  const languageAnimatedStyle = useAnimatedStyle(() => {
    const inputRange = [0, 1];
    const outputRange = [colors.white100, colors.black50];
    const outputRangeLeft = [48, 24];
    const color = interpolateColor(animatedValue.value, inputRange, outputRange);
    const left = interpolate(animatedValue.value, inputRange, outputRangeLeft);
    return { color, left };
  });
  const languageARAnimatedStyle = useAnimatedStyle(() => {
    const inputRange = [0, 1];
    const outputRange = [colors.black50, colors.white100];
    const outputRangeRight = [24, 48];
    const color = interpolateColor(animatedValue.value, inputRange, outputRange);
    const right = interpolate(animatedValue.value, inputRange, outputRangeRight);
    return { color, right };
  });

  const animatedLanguageButtonARStyle = useAnimatedStyle(() => {
    const inputRange = [0, 1];
    const outputRangeHeight = [112, windowHeight * 0.6];
    const outputRangeWidth = [windowWidth * 0.9, windowWidth];
    const outputRangeBorder = [1, 0];
    const outputRangeBGcolor = ['transparent', colors.purple];
    const height = interpolate(animatedValue.value, inputRange, outputRangeHeight);
    const width = interpolate(animatedValue.value, inputRange, outputRangeWidth);
    const borderWidth = interpolate(animatedValue.value, inputRange, outputRangeBorder);
    const backgroundColor = interpolateColor(animatedValue.value, inputRange, outputRangeBGcolor);
    return { height, width, borderWidth, backgroundColor };
  });

  const animatedLanguageButtonStyle = useAnimatedStyle(() => {
    const inputRange = [0, 1];
    const outputRangeHeight = [windowHeight * 0.6, 112];
    const outputRangeWidth = [windowWidth, windowWidth * 0.9];
    const outputRangeBorder = [0, 1];
    const outputRangeBGcolor = [colors.purple, 'transparent'];
    const height = interpolate(animatedValue.value, inputRange, outputRangeHeight);
    const width = interpolate(animatedValue.value, inputRange, outputRangeWidth);
    const borderWidth = interpolate(animatedValue.value, inputRange, outputRangeBorder);
    const backgroundColor = interpolateColor(animatedValue.value, inputRange, outputRangeBGcolor);
    return { height, width, borderWidth, backgroundColor };
  });

  const titleAniamtedStyle = useAnimatedStyle(() => {
    const inputRangeColor = [0, 1];
    const outputRangeColor = [colors.white100, colors.black100];
    const inputRangeX = [-1, 0, 1];
    const outputRangeX = [windowWidth, 0, 0];
    const color = interpolateColor(animatedValue.value, inputRangeColor, outputRangeColor);
    const translateX = interpolate(animatedTitleValue.value, inputRangeX, outputRangeX);
    return { color };
  });

  const onChangeLang = useCallback(
    (lang: LanguageSelectionsModel) => {
      animatedTitleValue.value = -1;
      if (lang.code === 'en') {
        animatedValue.value = withTiming(0, { duration: 500, easing: Easing.inOut(Easing.ease) });
      } else {
        animatedValue.value = withTiming(1, { duration: 500, easing: Easing.inOut(Easing.ease) });
      }
      animatedTitleValue.value = withTiming(1, { duration: 800, easing: Easing.bezier(0.4, 0.0, 0.2, 1.0) });
      changeLanguage(lang.code, lang.lang);
    },
    [language]
  );

  const handleNavigation = useCallback(() => {
    if (isRTL) {
      navigation.navigate(NAV_ROUTES.OnboardingAR);
    } else {
      navigation.navigate(NAV_ROUTES.Onboarding);
    }
  }, [isRTL]);


  const showNeedNotificationDialog = () => {
    Alert.alert('This feature requires you to enable push notification', 'Please enable push notifications in your phone’s settings and return back to this app.', [
      {
        text: 'Close',
        onPress: () => console.log('Ask me later pressed'),
        style: 'cancel',
      },
      {
        text: 'Go to Settings',
        onPress: () => Linking.openSettings() ,
      }
    ]);

  }

  useEffect(() => {
    if (pushPermissionState) {
      if (pushPermissionState === PushPermissionState.Granted) {
  
        batch(() => {
          dispatch(allowNotifications())
        })
      } else if (pushPermissionState === PushPermissionState.Denied) {
        showNeedNotificationDialog()
      } else {
        console.log('An error occured configuring push notifications')
        showNeedNotificationDialog()
      }
      batch(() => {
        dispatch(pushPermissionReceived())
        dispatch(stopRequestPushToken())
      })
    }
  }, [pushPermissionState])


  useEffect(() => {
      dispatch(startRequestPushToken())
  }, [])

  return (
    <View style={styles.languageContainer}>
      <StatusBar translucent backgroundColor="transparent" barStyle={language === 'en' ? 'light-content' : 'dark-content'} />
      <Animated.View style={[styles.englishV]}>
        <Animated.Text style={[styles.chooseLanguage, titleAniamtedStyle]}>{translate('choose_language')}</Animated.Text>
        <AnimatedPressable onPress={() => onChangeLang(LanguageSelections[0])} style={[styles.buttonStyle, animatedLanguageButtonStyle]}>
          <Animated.Text style={[styles.btnLabel, languageAnimatedStyle]}>{resources.en.translation.choose_language_option}</Animated.Text>
          <AnimatedPressable style={[styles.buttonArrow, animatedButtonStyle]} onPress={handleNavigation}>
            <Image style={[styles.arrowIcon]} source={images.icon_arrow_right} resizeMode="contain" />
          </AnimatedPressable>
        </AnimatedPressable>
      </Animated.View>

      <View style={{ height: spacing[24] }} />

      <Animated.View style={[styles.arabicV]}>
        <AnimatedPressable onPress={() => onChangeLang(LanguageSelections[1])} style={[styles.buttonStyle, animatedLanguageButtonARStyle]}>
          <Animated.Text style={[styles.btnLabelAR, languageARAnimatedStyle]}>
            {resources.ar.translation.choose_language_browse}
          </Animated.Text>
          <AnimatedPressable style={[styles.buttonArrowAR, animatedButtonARStyle]} onPress={handleNavigation}>
            <Image style={[styles.arrowIcon]} source={images.icon_arrow_left} resizeMode="contain" />
          </AnimatedPressable>
        </AnimatedPressable>
      </Animated.View>
    </View>
  );
};

export default LanguageOption;
