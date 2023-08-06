import { Text, TouchableOpacity, Image, View } from 'react-native';
import React from 'react';
import { styles } from './styles';
import { useSelector } from 'react-redux';
import { RootState } from '@fe-monorepo/store';
import { getStyle } from '@fe-monorepo/themes';
import colors from 'libs/themes/src/colors';
import { ButtonProps } from './types';
import images from '../../assets/images';


const Button = (props: ButtonProps) => {
  const { style, type, btnContent, iconName, iconNewStyle, label, labelStyle, onPress, disabled } = props;
  const theme = useSelector((state: RootState) => state.app.themes);
  const isRTL = useSelector((state: RootState) => state.app.isRTL);

  const backgroundColor = {
    backgroundColor: disabled
      ? getStyle(theme).buttonDisabledColor
      : type === 'primary'
      ? colors.sunset
      : type === 'secondary'
      ? getStyle(theme).buttonSecondaryColor
      : 'transparent'
  };
  const borderStyle = {
    borderColor: disabled
      ? getStyle(theme).buttonDisabledColor
      : type === 'borderPrimary'
      ? colors.sunset
      : type === 'borderSecondary'
      ? getStyle(theme).buttonBorderColor
      : 'transparent'
  };
  const textColor = {
    color: disabled
      ? getStyle(theme).buttonLabelDisabledColor
      : type === 'primary'
      ? colors.white100
      : type === 'secondary'
      ? getStyle(theme).buttonLabelSecondaryColor
      : type === 'borderPrimary'
      ? colors.sunset
      : getStyle(theme).buttonSecondaryColor
  };

  if (btnContent === 'iconOnly') {
    return (
      <TouchableOpacity disabled={disabled} onPress={onPress} style={[styles.iconContainer, backgroundColor, borderStyle, style]}>
        <Image style={[styles.iconStyle, { tintColor: textColor.color }, iconNewStyle]} source={images[iconName]} resizeMode="contain" />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity disabled={disabled} onPress={onPress} style={[styles.container, backgroundColor, borderStyle, style]}>
        {btnContent === 'withIcon' && (
          <Image style={[styles.iconLabelStyle, isRTL ? styles.iconRight : styles.iconLeft]} source={images[iconName]} resizeMode="contain" />
        )}
        <View style={styles.textContainer}>
          <Text style={[styles.textStyle, textColor, labelStyle]}>{label}</Text>
        </View>
    </TouchableOpacity>
  );
};

export default Button;
