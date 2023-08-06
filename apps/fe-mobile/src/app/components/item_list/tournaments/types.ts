import { TouchableOpacityProps } from 'react-native';
import { TournamentModel } from '@fe-monorepo/models';

export interface ItemProps extends TouchableOpacityProps {
  disabled?: boolean;
  onPressIcon?: (item?: any) => void;
  item: TournamentModel;
}
