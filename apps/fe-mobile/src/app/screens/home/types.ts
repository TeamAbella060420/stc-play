import { ReactNode } from 'react';
import { SharedValue } from 'react-native-reanimated';

export type DiscoverTopTabParamList = {
  ForYou: undefined;
  Bits: undefined;
  Streams: undefined;
  Following: undefined;
};

export type TopTabProps = {
  headerAnimatedValue?: SharedValue<number>;
  footerAnimatedValue?: SharedValue<number>;
  children?: ReactNode;
};

export type bottomTabProps = {
  footerAnimatedValue: SharedValue<number>;
};
