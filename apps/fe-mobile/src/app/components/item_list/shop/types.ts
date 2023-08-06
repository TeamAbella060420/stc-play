import { TouchableOpacityProps } from 'react-native';
import { ShopModel } from '@fe-monorepo/models';

export interface ItemProps extends TouchableOpacityProps {
  disabled?: boolean;
  onPressIcon?: (item?: any) => void;
  item: ShopModel;
}
