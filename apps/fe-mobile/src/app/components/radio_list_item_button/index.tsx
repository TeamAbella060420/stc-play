import { Pressable, StyleSheet, Text, TextStyle, View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@fe-monorepo/store';
import { radioListItemButtonProps } from './types';
import Typography from '../../assets/typography';
import { colors, getStyle } from '@fe-monorepo/themes';

const RadioListItemButton = (props: radioListItemButtonProps) => {
  const { onPress, label, isSelected, style } = props;
  const { themes, isRTL } = useSelector((state: RootState) => state.app);

  const textColor = isSelected ? colors.sunset : getStyle(themes).textColor;
  const flexDirection: TextStyle = { flexDirection: isRTL ? 'row-reverse' : 'row' };
  const borderStyle = isSelected
    ? { borderWidth: 6, borderColor: colors.sunset }
    : { borderWidth: 1, borderColor: getStyle(themes).textColor50 };

  return (
    <Pressable style={[styles.container, flexDirection, style]} onPress={onPress}>
      <Text style={[{ ...Typography.bodyRegular, color: textColor }, isSelected && { ...Typography.bodyMedium }]}>{label}</Text>
      <View style={[styles.radioIcon, borderStyle]} />
    </Pressable>
  );
};

export default RadioListItemButton;

const styles = StyleSheet.create({
  container: { justifyContent: 'space-between', alignItems: 'center' },
  radioIcon: { width: 24, height: 24, borderRadius: 12 }
});
