import { Text, TouchableOpacity, Image, View } from 'react-native';
import React from 'react';
import { styles } from './styles';
import { useSelector } from 'react-redux';
import { RootState } from '@fe-monorepo/store';
import { colors } from '@fe-monorepo/themes';
import { ItemProps } from './types';
import images from '../../../assets/images';
import { useTranslation } from 'react-i18next';
import Icon from '../../Icon';



const TournamentItem = (props: ItemProps) => {
  const { item, style, onPress, disabled } = props;
  const isRTL = useSelector((state: RootState) => state.app.isRTL);
  const { t } = useTranslation()

  const avatar = !item.img ? images.profile_placeholder : typeof item.img === 'string' ? { uri: item.img } : item.img;
  
    return (
        <View style={[styles.itemContainer, style]}>
            <TouchableOpacity disabled={disabled} onPress={onPress} style={[styles.imageContainer]}>
              <Image style={[styles.thumbnail]} source={avatar} />
              {(item.is_live) ? <View style={[styles.active, (isRTL ? styles.spacingRight : styles.spacingLeft)]}>
                <Text style={[styles.textActive]}>{t('common_live')}</Text>
              </View> 
              :
             <View style={[styles.badgesContainer, (isRTL ? styles.spacingRight : styles.spacingLeft)]}>
              <View style={[styles.badges]}>
                 <Icon name="group" width={14} height={14} style={{margin: 4}}/>
                 <Text style={[styles.titleSmallStyle]}> 130/256 </Text>
              </View> 

              <View style={[styles.badges, styles.versus]}>           
                 <Text style={[styles.titleSmallStyle]}>3vs3</Text>
              </View> 
              </View>
              }
            </TouchableOpacity>
            <View style={[styles.textContainer]}>
                <Text style={[styles.subTitleStyle]}>{item.title}</Text>
                <Text style={[styles.titleSmallStyle, {color: colors.sunset}]}>{item.title}</Text>
            </View>
        </View> 
    )
};

export default TournamentItem;
