import { Text, TouchableOpacity, Image, View, ReactNode } from 'react-native';
import React from 'react';
import { styles } from './styles';
import { useSelector } from 'react-redux';
import { RootState } from '@fe-monorepo/store';
import { getStyle } from '@fe-monorepo/themes';
import colors from 'libs/themes/src/colors';
import { ItemProps } from './types';
import images from '../../assets/images';


const LargeThumbnailItem = (props: ItemProps) => {
  const { item, style, type, hasThumbnail, rightChild, iconName, iconNewStyle, label, labelStyle, onPress, onPressIcon, disabled } = props;
  const theme = useSelector((state: RootState) => state.app.themes);
  const isRTL = useSelector((state: RootState) => state.app.isRTL);

  const avatar = !item.img ? images.profile_placeholder : typeof item.img === 'string' ? { uri: item.img } : item.img;
  

    return (
        <View style={[styles.singleItemContainer, style]}>
            <TouchableOpacity disabled={disabled} onPress={onPress} style={[styles.imageContainer]}>
            <View>  
                <Image style={[styles.largeThumbnail, isRTL ? styles.iconRight : styles.iconLeft]} source={avatar} />
            </View>  
            {(type === 'active') ? <View style={styles.active}><Text style={[styles.textActive]}>Live</Text></View> : null } 
            </TouchableOpacity>
            <TouchableOpacity disabled={disabled} onPress={onPress} style={[styles.textContainer]}>
                <Text style={[styles.titleSmallStyle, labelStyle, {color: colors.sunset}]}>{item.title}</Text>
                <View style={{flexDirection: 'column'}}>
                {(item.type === 'stream' && !item.islive) &&
                  <Text style={[{color: getStyle(theme).textColor}]} ellipsizeMode="tail">{item.description.substring(0, 30)}</Text>
                }
                {(item.type === 'stream' && !item.islive) &&
                  <Image style={[styles.thumbnail, isRTL ? styles.iconRight : styles.iconLeft, iconNewStyle]} source={avatar} resizeMode="contain" />
                }
                </View>
            </TouchableOpacity>
            <View style={[styles.rightContentStyle]}>
              {rightChild}
            </View>
        </View> 
    )

};

export default LargeThumbnailItem;
