import React from 'react';
import Animated, { useAnimatedScrollHandler } from 'react-native-reanimated';
import { clamp } from 'apps/fe-mobile/src/app/helpers/function';
import { useSelector } from 'react-redux';
import { RootState } from '@fe-monorepo/store';
import { getStyle } from '@fe-monorepo/themes';
import { TopTabProps } from '../types';
import { StyleProp, ViewStyle } from 'react-native';

const AnimatedScrollView = (props: TopTabProps & { style?: StyleProp<ViewStyle> }) => {
  const { headerAnimatedValue, footerAnimatedValue, children, style } = props;
  const { themes } = useSelector((state: RootState) => state.app);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event, ctx: any) => {
      let { y } = event.contentOffset;
      if (y < 5) {
        y = 0;
      }
      const diff = y - (ctx?.prevY ?? 0);
      headerAnimatedValue.value = clamp(headerAnimatedValue.value + diff, 0, 74);
      if (footerAnimatedValue) {
        footerAnimatedValue.value = clamp(footerAnimatedValue.value + diff, 0, 90);
      }
      ctx.prevY = y;
    },
    onBeginDrag: (event, ctx) => {
      ctx.prevY = event.contentOffset.y;
    }
  });

  return (
    <Animated.ScrollView
      style={[{ backgroundColor: getStyle(themes).backgroundColor }, style]}
      onScroll={scrollHandler}
      decelerationRate="fast"
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      {children}
    </Animated.ScrollView>
  );
};

export default AnimatedScrollView;
