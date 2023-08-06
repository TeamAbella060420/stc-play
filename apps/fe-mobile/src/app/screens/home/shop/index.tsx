import React from 'react';
import ViewContainer from '../../../components/view_container';
import styles from './styles';
import HomeHeader from '../../../components/headers/home_header';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigation/RootNavigation';
import { NAV_ROUTES } from '../../../helpers/navRoutes';
import { translate } from '@fe-monorepo/helper';
import Animated, { useSharedValue, useAnimatedStyle, interpolate, Extrapolate, withTiming } from 'react-native-reanimated';
import { windowHeight } from '../../../utils/Dimensions';
import ShopContent from './ShopContent';
import { useSelector } from 'react-redux';
import { RootState } from '@fe-monorepo/store';

const Shop = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, NAV_ROUTES.Main>>();
  const animatedValue = useSharedValue(0);
  const { userContext } = useSelector((state: RootState) => state.user);

  const headerAnimation = useAnimatedStyle(() => {
    const inputRange = [0, 74];
    const outputRangeY = [0, -74];
    const translateY = interpolate(animatedValue.value, inputRange, outputRangeY, Extrapolate.CLAMP);
    return { transform: [{ translateY: withTiming(translateY) }] } as any;
  });
  return (
    <ViewContainer style={styles.container}>
      <Animated.View style={[headerAnimation, { height: windowHeight }]}>
        <HomeHeader
          hasBorderBottom
          profileImg={userContext.avatar_url}
          label={translate('home_shop')}
          iconName="cart"
          iconName2={'magnifying'}
          onPressIcon={() => navigation.navigate(NAV_ROUTES.Cart)}
          onPressIcon2={() => navigation.navigate(NAV_ROUTES.Search)}
        />
        <ShopContent headerAnimatedValue={animatedValue} />
      </Animated.View>
    </ViewContainer>
  );
};

export default Shop;
