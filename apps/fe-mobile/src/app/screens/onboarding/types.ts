import { PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import { SharedValue } from 'react-native-reanimated';

export type sharedProps = {
  sharedValue?: SharedValue<number>;
  onGestureEvent?: (event: PanGestureHandlerGestureEvent) => void;
  onSkip?: () => void;
  onNext?: () => void;
  activeIndex?: number;
  activeImageIndex?: number;
};
