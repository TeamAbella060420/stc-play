import { ImageRequireSource, ImageStyle, StyleProp, TextStyle, TouchableOpacityProps, ViewStyle } from 'react-native';
import { IconProps } from '../../../helpers/icons';

export interface ItemProps extends TouchableOpacityProps {
  style?: StyleProp<ViewStyle>;
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  subLabel?: string;
  subLabelStyle?: StyleProp<TextStyle>;
  selectedValue?: string;
  selectedValueStyle?: StyleProp<TextStyle>;
  avatarName?: string | ImageRequireSource;
  avatarStyle?: StyleProp<ImageStyle>;
  iconName?: IconProps['name'];
  hasRightIcon?: boolean;
  iconStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  onItemPress?: () => void;
  rightChild?: React.ReactNode;
}
