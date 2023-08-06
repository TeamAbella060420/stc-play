import { ImageStyle, StyleProp, TextStyle, TouchableOpacityProps, ViewStyle } from 'react-native';
import images from '../../assets/images';
import { BitsModel, ContentModel, SearchHistoryModel, ShopModel, StreamsModel, TeamsModel, TournamentModel, UserSearchModel } from '@fe-monorepo/models';

export interface ItemProps extends TouchableOpacityProps {
  type: 'default' | 'active'| 'header' |'secondary' ; //
  btnContent?: 'labelOnly' | 'iconOnly' | 'withIcon';
  style?: StyleProp<ViewStyle>;
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  iconName?: keyof typeof images;
  iconNewStyle?: StyleProp<ImageStyle>;
  disabled?: boolean;
  hasThumbnail?: boolean;
  onPressIcon?: (item?: any) => void;
  item: ContentModel
  rightChild?: React.ReactNode;
  keyWord?: string;
}
