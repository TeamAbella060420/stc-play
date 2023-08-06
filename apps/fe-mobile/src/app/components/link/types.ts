import { StyleProp, TextStyle, ViewStyle, GestureResponderEvent } from 'react-native';
import images from '../../assets/images';

export type LinkProps = {
  type: 'primary' | 'secondary' ; 
  style?: StyleProp<ViewStyle>;
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  onPress?: (event?: GestureResponderEvent) => void
  iconName?: keyof typeof images;
  disabled?: boolean;
  withUnderLink?: boolean;
  ref?: any
};
