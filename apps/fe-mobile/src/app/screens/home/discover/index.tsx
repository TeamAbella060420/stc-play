import React from 'react';
import ViewContainer from '../../../components/view_container';
import styles from './styles';
import HomeHeader from '../../../components/headers/home_header';
import { useSelector } from 'react-redux';
import { RootState } from '@fe-monorepo/store';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigation/RootNavigation';
import { NAV_ROUTES } from '../../../helpers/navRoutes';
import { useNavigation } from '@react-navigation/native';
import TopTabDiscover from './TopTabDiscover';
import { replaceStringsFromJson, translate } from '@fe-monorepo/helper';
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { bottomTabProps } from '../types';

const Discover = (props: bottomTabProps) => {
  const { persona, userContext } = useSelector((state: RootState) => state.user);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, NAV_ROUTES.Main>>();
  const isGuest = persona === 'guest';
  const username = userContext.username;

  const greet_existing = replaceStringsFromJson(translate('home_greet_existinguser'), [{ '[username]': username }]);
  const greetings = (isGuest && translate('home_greet_guest')) || (persona === 'existing' && greet_existing); // TO BE UPDATED WHEN TRANSLATION IS ALREADY UP.
  const animatedValue = useSharedValue(0);

  const headerAnimation = useAnimatedStyle(() => {
    const inputRange = [0, 74];
    const outputRangeY = [0, -74];
    const translateY = interpolate(animatedValue.value, inputRange, outputRangeY, Extrapolate.CLAMP);
    return { transform: [{ translateY: withTiming(translateY) }] } as any;
  });

  const headerOpacityAnimation = useAnimatedStyle(() => {
    const inputRange = [0, 64, 80];
    const outputRangeY = [1, 0.5, 0];
    const opacity = interpolate(animatedValue.value, inputRange, outputRangeY, Extrapolate.CLAMP);
    return { opacity: opacity };
  });

  return (
    <ViewContainer style={styles.container}>
      <Animated.View style={[headerAnimation, { height: '120%' }]}>
        <Animated.View style={[headerOpacityAnimation]}>
          <HomeHeader
            profileImg={userContext.avatar_url}
            label={greetings}
            iconName={isGuest ? null : 'bell'}
            iconName2="magnifying"
            onPressIcon={() => navigation.navigate(NAV_ROUTES.Notification)}
            onPressIcon2={() => navigation.navigate(NAV_ROUTES.Search)}
          />
        </Animated.View>
        <TopTabDiscover headerAnimatedValue={animatedValue} footerAnimatedValue={props.footerAnimatedValue} />
      </Animated.View>
    </ViewContainer>
  );
};

export default Discover;
