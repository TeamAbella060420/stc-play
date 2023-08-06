import { ReactNode } from 'react';
import { SharedValue } from 'react-native-reanimated';

export type TopTabProps = {
  headerAnimatedValue?: SharedValue<number>;
  footerAnimatedValue?: SharedValue<number>;
  children?: ReactNode;
  keyWord?: string;
  hasReachEnd?: SharedValue<boolean>;
};

