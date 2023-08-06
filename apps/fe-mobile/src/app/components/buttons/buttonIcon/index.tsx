import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import React from 'react';
import Icon from '../../Icon';
import { IconProps } from '../../../helpers/icons';

interface IconBtnProps {
  style?: StyleProp<ViewStyle>;
  name?: IconProps['name'];
  width?: IconProps['width'];
  height?: IconProps['height'];
  fill?: IconProps['fill'];
  onPress?: () => void;
}

const IconButton = (props: IconBtnProps) => {
  const { style, name, width, height, fill, onPress } = props;
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Icon name={name} width={width} height={height} fill={fill} />
    </TouchableOpacity>
  );
};

export default IconButton;
