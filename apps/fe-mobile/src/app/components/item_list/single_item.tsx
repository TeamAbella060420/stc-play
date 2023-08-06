import { Text, TouchableOpacity, Image, View } from 'react-native';
import React from 'react';
import { styles } from './styles';
import { useSelector } from 'react-redux';
import { RootState } from '@fe-monorepo/store';
import { getStyle } from '@fe-monorepo/themes';
import colors from 'libs/themes/src/colors';
import { ItemProps } from './types';
import images from '../../assets/images';


const SingleItem = (props: ItemProps) => {
  const { item, style, type, hasThumbnail, rightChild, iconName, iconNewStyle, label, labelStyle, onPress, onPressIcon, disabled } = props;
  const theme = useSelector((state: RootState) => state.app.themes);
  const isRTL = useSelector((state: RootState) => state.app.isRTL);


  if (type === 'default') {
    return (
        <View style={[styles.singleItemContainer, style]}>
        <TouchableOpacity disabled={disabled} onPress={onPress} style={[styles.textContainer]}>
          <Text style={[{color: getStyle(theme).textColor}, styles.textStyle, labelStyle]}>{item.title}</Text>
        </TouchableOpacity>
   
        <View style={[styles.rightContentStyle]}>
          {(iconName) && (
           <TouchableOpacity disabled={disabled} onPress={onPressIcon} style={[styles.iconButtonStyle]}>
              <Image style={[styles.iconStyle, isRTL ? styles.iconRight : styles.iconLeft, iconNewStyle]} source={images[iconName]} resizeMode="contain" />
          </TouchableOpacity>  
          )}
          {(rightChild)}
        </View>
      </View>
    )
  }

  return (
    <TouchableOpacity disabled={disabled} onPress={onPress} style={[styles.singleItemContainer, style]}>
        {(hasThumbnail) && (
          <Image style={[styles.iconStyle, isRTL ? styles.iconRight : styles.iconLeft]} source={images[iconName]} resizeMode="contain" />
        )}
        <View style={styles.textContainer}>
          <Text style={[styles.textStyle, labelStyle]}>{label}</Text>
        </View>
    </TouchableOpacity>
  )

};

export default SingleItem;
