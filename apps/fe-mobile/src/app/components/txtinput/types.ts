import { StyleProp, TextInputProps, ViewStyle } from 'react-native';

export interface TxtInputProps extends TextInputProps {
  onSearch?: (val?: any) => void;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;
}
