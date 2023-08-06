import { StyleProp, ViewStyle } from 'react-native';

export type radioListItemButtonProps = {
  style?: StyleProp<ViewStyle>;
  isSelected?: boolean;
  label?: string;
  onPress?: () => void;
};
