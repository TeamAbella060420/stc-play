import { StyleProp, ViewStyle } from 'react-native';

export interface headerProps {
  style?: StyleProp<ViewStyle>;
  label?: string;
  iconName?: 'heart' | 'bell';
  value?: string;
  placeholder?: string;
  onSearch?: (val?: any) => void;
  onBackPress?: () => void;
  onChangeText?: (val: string) => void;
  onEndEditing?: () => void;
  onClearText?: () => void;
}
