import { Text, TouchableOpacity, Image, View, ReactNode } from 'react-native';
import React from 'react';
import { styles } from './styles';
import { useSelector } from 'react-redux';
import { RootState } from '@fe-monorepo/store';
import { getStyle } from '@fe-monorepo/themes';
import colors from 'libs/themes/src/colors';
import { ItemProps } from './types';
import images from '../../assets/images';


const XlargeThumbnailItem = (props: ItemProps) => {
  const { item, style, type, hasThumbnail, rightChild, iconName, iconNewStyle, label, labelStyle, onPress, onPressIcon, disabled } = props;
  const theme = useSelector((state: RootState) => state.app.themes);
  const isRTL = useSelector((state: RootState) => state.app.isRTL);

  const avatar = !item.img ? images.profile_placeholder : typeof item.img === 'string' ? { uri: item.img } : item.img;
  
    return (
        <View style={[styles.itemContainer, style]}>
        <TouchableOpacity disabled={disabled} onPress={onPress}>
           <Image style={[styles.xlargeThumbnail]} source={avatar} resizeMode="contain" />
            {(type === 'active') ? <View style={styles.active}><Text style={[styles.textActive]}>Live</Text></View> : null } 
            </TouchableOpacity>
            <View style={{flexDirection: 'column'}}>
             {(item.game_code) &&
                <Text style={[{color: getStyle(theme).textColor,marginTop: 12}]} ellipsizeMode="tail">{item.game_code.substring(0, 30)}</Text>
             }
             {(item.description) &&
                <Text style={[{color: getStyle(theme).textColor}]} ellipsizeMode="tail">{item.description.substring(0, 30)}</Text>
             }
             <Text style={[styles.titleSmallStyle, labelStyle, {color: colors.sunset, marginVertical: 8}]}>{item.title}</Text>
            </View>
        </View> 
    )

};

export default XlargeThumbnailItem;
