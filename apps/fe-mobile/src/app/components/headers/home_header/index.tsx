import { Image, Pressable, Text, View, ViewStyle } from 'react-native';
import React from 'react';
import { getStyle, spacing } from '@fe-monorepo/themes';
import { useSelector } from 'react-redux';
import { RootState } from '@fe-monorepo/store';
import images from '../../../assets/images';
import styles from './styles';
import { headerProps } from './headerProps';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigation/RootNavigation';
import { NAV_ROUTES } from '../../../helpers/navRoutes';
import { translate } from '@fe-monorepo/helper';

const HomeHeader = (props: headerProps) => {
  const { style, iconName, iconName2, onProfilePress, onPressIcon, onPressIcon2, label, hasBorderBottom, profileImg } = props;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Main'>>();
  const { themes, isRTL } = useSelector((state: RootState) => state.app);
  const backgroundColor = { backgroundColor: getStyle(themes).backgroundColor };
  const textColor = { color: getStyle(themes).textColor };
  const tintColor = { tintColor: getStyle(themes).iconColor };
  const borderBottom = hasBorderBottom && { borderBottomWidth: 1, borderColor: getStyle(themes).textColor20 };
  const flexDirection: ViewStyle = isRTL ? { flexDirection: 'row-reverse' } : { flexDirection: 'row' };
  const justifyContentRTL: ViewStyle = isRTL ? { justifyContent: 'flex-start' } : { justifyContent: 'flex-end' };
  const justifyContentLTR: ViewStyle = !isRTL ? { justifyContent: 'flex-start' } : { justifyContent: 'flex-end' };
  const marginIcon = isRTL && { marginLeft: spacing[0], marginRight: spacing[12] };
  const icon1 = iconName === 'bell' ? images.icon_bell : iconName === 'cart' ? images.icon_cart : images.icon_magnifying;
  const icon2 = iconName2 === 'bell' ? images.icon_bell : iconName2 === 'cart' ? images.icon_cart : images.icon_magnifying;
  const profile = !profileImg ? images.profile_placeholder : typeof profileImg === 'string' ? { uri: profileImg } : profileImg;
  const greeting =
    label.length > 15
      ? isRTL
        ? `...${label.substring(label.length - 15)}`
        : `${label.substring(0, 15)}...`
      : label || translate('home_greet_newuser');

  return (
    <View style={[styles.headerContainer, flexDirection, backgroundColor, borderBottom, style]}>
      <View style={[styles.leftContent, flexDirection, justifyContentLTR]}>
        <Pressable onPress={onProfilePress ? onProfilePress : () => navigation.navigate(NAV_ROUTES.Profile)}>
          <Image source={profile} style={styles.imgStyle} resizeMode="cover" />
        </Pressable>
        <Text style={[styles.defaultLabelStyle, marginIcon, textColor]} numberOfLines={1} ellipsizeMode={isRTL ? 'head' : 'tail'}>
          {greeting}
        </Text>
      </View>
      <View style={[styles.rightContent, flexDirection, justifyContentRTL]}>
        {iconName && (
          <Pressable onPress={onPressIcon}>
            <Image source={icon1} style={[styles.iconStyle, marginIcon, tintColor]} />
          </Pressable>
        )}
        {iconName2 && (
          <Pressable onPress={onPressIcon2}>
            <Image source={icon2} style={[styles.iconStyle, marginIcon, tintColor]} />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default HomeHeader;
