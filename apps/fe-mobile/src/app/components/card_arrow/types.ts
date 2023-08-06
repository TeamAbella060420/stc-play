import { StyleProp, ViewStyle } from 'react-native';

export type cardArrowProps = {
  style?: StyleProp<ViewStyle>;
  title?: string;
  description?: string;
  onPress?: () => void;
};
