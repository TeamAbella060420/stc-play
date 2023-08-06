import React from 'react';
import { View, Pressable, Image } from 'react-native';
import { ItemProps } from './types';
import { createStyle } from './styles';
import Icon from '../../Icon';
import { StyledText } from '../../text';
import { translate } from '@fe-monorepo/helper';
import images from '../../../assets/images';
import Typography from '../../../assets/typography';
import { getStyle } from '@fe-monorepo/themes';
import { useSelector } from 'react-redux';
import { RootState } from '@fe-monorepo/store';
import i18next from 'i18next';

const SettingItem = (props: ItemProps) => {
  const {
    style,
    label,
    labelStyle,
    subLabel,
    subLabelStyle,
    selectedValue,
    selectedValueStyle,
    iconName,
    hasRightIcon = true,
    iconStyle,
    avatarName,
    avatarStyle,
    onItemPress,
    disabled,
    rightChild
  } = props;
  const styles = createStyle(translate);
  const { themes } = useSelector((state: RootState) => state.app);
  const isRTL = i18next.dir() === 'rtl';

  const profile = !avatarName ? images.profile_placeholder : typeof avatarName === 'string' ? { uri: avatarName } : avatarName;
  const textColor = getStyle(themes).textColor;

  return (
    <Pressable disabled={disabled} onPress={() => onItemPress()} style={[styles.container, style]}>
      <View style={styles.leftContainer}>
        {iconName && <Icon name={iconName} width={24} height={24} style={iconStyle} fill={getStyle(themes).textColor} />}
        {avatarName && <Image source={profile} style={[styles.imgStyle, avatarStyle]} resizeMode="cover" />}
        <View style={styles.labelsContainer}>
          {label && (
            <StyledText textStyle={[{ ...Typography.bodyRegular }, labelStyle]} textColour={textColor}>
              {label}
            </StyledText>
          )}
          {subLabel && (
            <StyledText textStyle={[{ ...Typography.captionRegular }, subLabelStyle]} textColour={textColor}>
              {subLabel}
            </StyledText>
          )}
        </View>
      </View>
      <View style={styles.rightContainer}>
        {rightChild ? (
          rightChild
        ) : (
          <>
            {selectedValue && (
              <StyledText textStyle={[{ ...Typography.captionRegular }, selectedValueStyle]} textColour={textColor}>
                {selectedValue}
              </StyledText>
            )}
            {hasRightIcon && (
              <Icon name={isRTL ? 'chevronLeft' : 'chevronRight'} style={styles.arrowStyle} fill={getStyle(themes).textColor50} />
            )}
          </>
        )}
      </View>
    </Pressable>
  );
};

export default SettingItem;
