import { ColorValue, StyleProp, ViewStyle } from 'react-native';

export interface StylesContainerProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  barStyle?: 'default' | 'light-content' | 'dark-content';
  barBGStyle?: ColorValue;
}
