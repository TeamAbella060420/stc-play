import { Text, Pressable, Image } from 'react-native';
import React from 'react';
import { styles } from './styles';
import { useSelector } from 'react-redux';
import { RootState } from '@fe-monorepo/store';
import { getStyle } from '@fe-monorepo/themes';
import colors from 'libs/themes/src/colors';
import { LinkProps } from './types';

const Link = (props: LinkProps) => {
  const { style, type, label, labelStyle, onPress, disabled, withUnderLink= true, ref } = props;
  const theme = useSelector((state: RootState) => state.app.themes);

  const textColor = {
    color: disabled
      ? getStyle(theme).buttonLabelDisabledColor
      : type === 'primary'
      ? colors.sunset
      : type === 'secondary'
      ? getStyle(theme).buttonLabelSecondaryColor
      : type === 'borderPrimary'
      ? colors.sunset
      : getStyle(theme).buttonSecondaryColor
  };

  return (
    <Pressable disabled={disabled} onPress={onPress} style={[styles.container, style]}>
      <Text ref={ref} style={[styles.textStyle, textColor, labelStyle, { textDecorationLine: (withUnderLink) ? 'underline' : null }]}>{label}</Text>
    </Pressable>
  );
};

export default Link;
