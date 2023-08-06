import { StatusBar, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import { Easing, runOnJS, useAnimatedGestureHandler, useSharedValue, withTiming } from 'react-native-reanimated';
import Header from './Header';
import FollowShareExplore from './FollowShareExplore';
import ScoreFavProducts from './ScoreFavProducts';
import ConnectAnytimeAnywhere from './ConnectAnytimeAnywhere';
import NeverMissChanceToShine from './NeverMissChanceToShine';
import styles from './styles';
import Body from './Body';
import Footer from './Footer';
import useDisableBackButton from '../../hooks/useDisableBackButton';

const Onboarding = () => {
  useDisableBackButton(true);
  const animatedCarouselValue = useSharedValue(0);
  const isAnimating = useSharedValue(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const playAnimation = useCallback((toValue: number, duration: number = 800) => {
    if (!isAnimating.value) {
      isAnimating.value = true;
      animatedCarouselValue.value = withTiming(toValue, { duration, easing: Easing.bezier(0.4, 0.0, 0.2, 1.0) }, () => {
        isAnimating.value = false;
      });
      setActiveImageIndex(toValue);
    }
  }, []);

  const onNext = useCallback(() => {
    let toValue = animatedCarouselValue.value;
    if (animatedCarouselValue.value < 3) {
      toValue = toValue + 1;
    }
    toValue !== undefined && playAnimation(toValue);
  }, [playAnimation]);

  const onGestureEvent = useAnimatedGestureHandler({
    onEnd: event => {
      if (!isAnimating.value) {
        isAnimating.value = true;
        const { translationX } = event;
        const isSwipeRight = translationX > 0;
        const isSwipeLeft = translationX < 0;
        let toValue = animatedCarouselValue.value;
        if (isSwipeRight) {
          if (animatedCarouselValue.value > 0) {
            toValue = Math.round(animatedCarouselValue.value) - 1;
          }
        } else if (isSwipeLeft) {
          if (animatedCarouselValue.value < 3) {
            toValue = Math.round(animatedCarouselValue.value) + 1;
          }
        }
        animatedCarouselValue.value = withTiming(toValue, { duration: 800 }, () => {
          isAnimating.value = false;
          runOnJS(setActiveImageIndex)(toValue);
        });
      }
    }
  });

  const onSkip = useCallback(() => {
    let toValue = animatedCarouselValue.value;
    toValue = 3;
    toValue !== undefined && playAnimation(toValue);
  }, [playAnimation]);

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <Header sharedValue={animatedCarouselValue} onSkip={onSkip} />
      <FollowShareExplore sharedValue={animatedCarouselValue} onGestureEvent={onGestureEvent} />
      <ScoreFavProducts sharedValue={animatedCarouselValue} onGestureEvent={onGestureEvent} />
      <ConnectAnytimeAnywhere sharedValue={animatedCarouselValue} onGestureEvent={onGestureEvent} />
      <NeverMissChanceToShine sharedValue={animatedCarouselValue} onGestureEvent={onGestureEvent} />
      <Body activeImageIndex={activeImageIndex} sharedValue={animatedCarouselValue} />
      <Footer sharedValue={animatedCarouselValue} onNext={onNext} />
    </View>
  );
};

export default Onboarding;
