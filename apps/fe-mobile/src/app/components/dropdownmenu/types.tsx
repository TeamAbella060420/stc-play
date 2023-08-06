import { CountryModel } from '@fe-monorepo/models';
import { StyleProp, TextStyle, ViewStyle, GestureResponderEvent, ModalProps } from 'react-native';

export type DropdownMenuProps = {
  present: 'modal' | 'overlay';
  header?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  data?: ReadonlyArray<CountryModel> | null | undefined;
  renderItem?: (item?: any, index?: number) => React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress?: (event?: GestureResponderEvent) => void
  modalProps?: ModalProps
  dropdownTopPosition?: number;
};