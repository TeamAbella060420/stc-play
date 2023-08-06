import { ImageStyle, StyleProp, TextStyle, TouchableOpacityProps, ViewStyle } from 'react-native';
import images from '../../assets/images';

export interface ButtonProps extends TouchableOpacityProps {
  type: 'primary' | 'secondary' | 'borderPrimary' | 'borderSecondary'; //
  btnContent?: 'labelOnly' | 'iconOnly' | 'withIcon';
  style?: StyleProp<ViewStyle>;
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  iconName?: keyof typeof images;
  iconNewStyle?: StyleProp<ImageStyle>;
  disabled?: boolean;
  onPress?: (item?: any) => void;
}
