import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export type ButtonType = {
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  label?: string;
  onPress?: (value?: any) => void;
};
