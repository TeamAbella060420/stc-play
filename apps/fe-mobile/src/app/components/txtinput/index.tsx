import { View, Image, TextInput, Pressable, ViewStyle } from 'react-native';
import React, { memo } from 'react';
import { TxtInputProps } from './types';
import images from '../../assets/images';
import { useSelector } from 'react-redux';
import { RootState } from 'libs/store/src/lib/store';
import { getStyle } from 'libs/themes/src/globalStyle';
import styles from './styles';
import Typography from '../../assets/typography';

const TxtInput = (props: TxtInputProps) => {
  const { onSearch, inputStyle, style } = props;
  const { themes, isRTL } = useSelector((state: RootState) => state.app);
  const placeholderTextColor = getStyle(themes).textColor50;
  const textColor = { color: getStyle(themes).textColor };
  const borderColor = { borderColor: getStyle(themes).textColor20 };
  const tintColor = { tintColor: getStyle(themes).textColor };
  const flexDirection: ViewStyle = isRTL ? { flexDirection: 'row-reverse' } : { flexDirection: 'row' };
  const margin = isRTL ? { marginLeft: 14 } : { marginRight: 14 };
  const inputDirection: any = isRTL ? { direction: 'rtl', textAlign: 'right' } : { textAlign: 'left' };

  return (
    <View style={[styles.container, flexDirection, borderColor, style]}>
      <Pressable onPress={onSearch}>
        <Image source={images.icon_magnifying} style={[styles.iconStyle, margin, tintColor]} />
      </Pressable>
      <TextInput
        {...props}
        style={[styles.inputStyles, inputDirection, textColor, inputStyle]}
        placeholderTextColor={placeholderTextColor}
      />
    </View>
  );
};

export default TxtInput;
