import { ImageRequireSource, ImageURISource, StyleProp, ViewStyle } from 'react-native';

export interface headerProps {
  style?: StyleProp<ViewStyle>;
  type?: 'guest' | 'new' | 'existing';
  label?: string;
  profileImg?: string | ImageRequireSource;
  iconName?: 'bell' | 'magnifying' | 'cart';
  iconName2?: 'bell' | 'magnifying' | 'cart';
  onProfilePress?: () => void;
  onPressIcon?: () => void;
  onPressIcon2?: () => void;
  hasBorderBottom?: boolean;
}
