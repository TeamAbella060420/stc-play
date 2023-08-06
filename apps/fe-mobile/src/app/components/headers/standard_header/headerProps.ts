import { ReactNode } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface headerProps {
  style?: StyleProp<ViewStyle>;
  routeNameStyle?: StyleProp<TextStyle>;
  label?: string;
  iconName?: 'heart' | 'bell' | 'search';
  onPressRighPress?: () => void;
  onBackPress?: () => void;
  righComponent?: ReactNode;
}
