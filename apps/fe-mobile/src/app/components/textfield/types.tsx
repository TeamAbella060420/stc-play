import { StyleProp, TextInput, TextStyle, View, ViewStyle } from 'react-native';
import { IconProps } from '../../helpers';

export type TextFieldProps = {
  type: 'phone' | 'email' | 'otp' | 'password' | 'default';
  style?: StyleProp<ViewStyle>;
  subValue?: string;
  value?: string;
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  placeholder?: string;
  otpLength?: number;
  otpResendMessage?: React.ReactNode;
  onPress?: (item?: any) => void;
  onInputChange?: (item?: any) => void;
  iconName?: IconProps;
  actionIconName?: string;
  onIconPress?: (item?: any) => void;
  disabled?: boolean;
  errorMessage?: string;
  dropdown?: React.ReactNode;
  keyboardType?: 'default' | 'number-pad' | 'decimal-pad' | 'numeric' | 'email-address' | 'phone-pad' | 'url';
  hasIcon?: boolean;
  textIconName?: IconProps;
  onEndEditing?: (item?: any) => void;
  secureTextEntry?: boolean;
  checkPasswordStrength?: boolean;
  editable?: boolean;
};
