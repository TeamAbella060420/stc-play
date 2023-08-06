import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { getStyle } from '@fe-monorepo/themes';
import Typography from '../../assets/typography';
import { useSelector } from 'react-redux';
import { RootState } from '@fe-monorepo/store';
import Icon from '../Icon';
import styles from './styles';
import { cardArrowProps } from './types';

const CardArrow = (props: cardArrowProps) => {
  const { style, title, description, onPress } = props;
  const { themes, isRTL } = useSelector((state: RootState) => state.app);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: getStyle(themes).textColor05,
          flexDirection: isRTL ? 'row-reverse' : 'row'
        },
        style
      ]}
    >
      <View>
        <Text style={{ ...Typography.bodyMedium, color: getStyle(themes).textColor, textAlign: isRTL ? 'right' : 'left' }}>{title}</Text>
        <Text style={{ ...Typography.captionRegular, marginTop: 8, color: getStyle(themes).textColor70 }}>{description}</Text>
      </View>
      <Icon name={isRTL ? 'chevronLeft' : 'chevronRight'} fill={getStyle(themes).textColor} />
    </TouchableOpacity>
  );
};

export default CardArrow;
