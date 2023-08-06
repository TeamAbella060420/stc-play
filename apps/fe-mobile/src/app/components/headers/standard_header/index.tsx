import { Image, Pressable, Text, View, ViewStyle } from 'react-native';
import React from 'react';
import { getStyle, spacing } from '@fe-monorepo/themes';
import { useSelector } from 'react-redux';
import { RootState } from '@fe-monorepo/store';
import images from '../../../assets/images';
import styles from './styles';
import { headerProps } from './headerProps';
import Icon from '../../Icon';

const StandardHeader = (props: headerProps) => {
  const { style, iconName, righComponent, onBackPress, onPressRighPress, label, routeNameStyle } = props;
  const { themes, isRTL } = useSelector((state: RootState) => state.app);
  const backgroundColor = { backgroundColor: getStyle(themes).backgroundColor };
  const textColor = { color: getStyle(themes).textColor };
  const tintColor = { tintColor: getStyle(themes).iconColor };
  const borderBottom = { borderBottomWidth: 1, borderColor: getStyle(themes).textColor20 };
  const flexDirection: ViewStyle = isRTL ? { flexDirection: 'row-reverse' } : { flexDirection: 'row' };
  const justifyContentRTL: ViewStyle = isRTL ? { justifyContent: 'flex-start' } : { justifyContent: 'flex-end' };
  const marginIcon = isRTL && { marginLeft: spacing[0], marginRight: spacing[12] };

  const renderIcons = () => {
    switch (iconName) {
      case 'heart':
        return (
          <Pressable onPress={onPressRighPress}>
            <Image source={images.icon_heart} style={[styles.iconStyle, marginIcon, tintColor]} />
          </Pressable>
        );

      case 'search':
        return (
          <Pressable onPress={onPressRighPress}>
            <Icon name="search" width={24} height={24} fill={getStyle(themes).iconColor} />
          </Pressable>
        );
      default:
        return null;
    }
  };

  return (
    <View style={[styles.headerContainer, flexDirection, backgroundColor, borderBottom, style]}>
      <View style={[styles.leftContent, flexDirection]}>
        <Pressable onPress={onBackPress}>
          <Image source={isRTL ? images.icon_arrow_right : images.icon_arrow_left} style={styles.imgStyle} resizeMode="cover" />
        </Pressable>
        <Text style={[styles.defaultLabelStyle, marginIcon, textColor, routeNameStyle]} numberOfLines={1} ellipsizeMode="tail">
          {label}
        </Text>
      </View>
      <View style={[styles.rightContent, justifyContentRTL]}>{righComponent || renderIcons()}</View>
    </View>
  );
};

export default StandardHeader;
