import { useSelector } from 'react-redux';
import { RootState } from '@fe-monorepo/store';
import { getStyle } from '@fe-monorepo/themes';
import React, { ReactNode } from 'react';
import { StyleSheet, Text, ColorValue, TextProps, TextStyle, StyleProp } from 'react-native';

type StyledTextMargins = 'marginLeft' | 'marginRight' | 'marginTop' | 'marginBottom' | 'margin' | 'marginVertical' | 'marginHorizontal';

export interface StyledTextProps extends TextProps {
  type?: 'primary' | 'secondary' | 'subtitle' | 'disabled';
  children: ReactNode;
  textStyle: StyleProp<TextStyle>;
  textColour?: ColorValue;
  textAlign?: 'left' | 'center' | 'right';
  marginStyle?: StyledTextMargins;
  marginValue?: number | string;
  testID?: string;
  lineHeight?: number;
  letterSpacing?: number;
}

export const StyledText = ({
  type = 'primary',
  children,
  textStyle,
  textColour,
  textAlign = 'left',
  marginStyle,
  marginValue,
  testID,
  lineHeight,
  letterSpacing,
  ...textProps
}: StyledTextProps) => {
  const theme = useSelector((state: RootState) => state.app.themes);

  const marginStyles = StyleSheet.create({
    marginLeft: {
      marginLeft: marginValue || 8
    },
    marginRight: {
      marginRight: marginValue || 8
    },
    marginTop: {
      marginTop: marginValue || 8
    },
    marginBottom: {
      marginBottom: marginValue || 8
    },
    margin: {
      margin: marginValue || 8
    },
    marginVertical: {
      marginVertical: marginValue || 8
    },
    marginHorizontal: {
      marginHorizontal: marginValue || 8
    }
  });

  const fontTextColour = {
    color: textColour
      ? textColour
      : type === 'primary'
      ? getStyle(theme).textColor
      : type === 'secondary'
      ? getStyle(theme).textColor
      : type === 'subtitle'
      ? getStyle(theme).textLabelColor
      : type === 'disabled'
      ? getStyle(theme).textColorDisabled
      : getStyle(theme).textColor
  };

  return (
    <Text
      style={[
        fontTextColour,
        { textAlign: textAlign, lineHeight: lineHeight, letterSpacing: letterSpacing },
        marginStyle && marginStyles[marginStyle],
        textStyle
      ]}
      testID={testID}
      {...textProps}
    >
      {children}
    </Text>
  );
};
