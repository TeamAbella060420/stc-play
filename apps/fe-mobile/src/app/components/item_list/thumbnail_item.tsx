import { Text, TouchableOpacity, Image, View, ReactNode } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { styles } from './styles';
import { useSelector } from 'react-redux';
import { RootState } from '@fe-monorepo/store';
import { getStyle } from '@fe-monorepo/themes';
import colors from 'libs/themes/src/colors';
import { ItemProps } from './types';
import images from '../../assets/images';


const ThumbnailItem = (props: ItemProps) => {
  const { item, style, type, hasThumbnail, rightChild, iconName, iconNewStyle, label, labelStyle, onPress, onPressIcon, disabled, keyWord } = props;
  const theme = useSelector((state: RootState) => state.app.themes);
  const isRTL = useSelector((state: RootState) => state.app.isRTL);
  const { t } = useTranslation()

  const avatar = !item.img ? images.profile_placeholder : typeof item.img === 'string' ? { uri: item.img } : item.img;
  
    const productSearch = (keyWord !== '' && item.title) ? (item.title).split(" ") : []

    return (
        <View style={[styles.singleItemContainer, style]}>
            <TouchableOpacity disabled={disabled} onPress={onPress} style={[styles.imageContainer]}>
                <Image style={[styles.thumbnail, isRTL ? styles.iconRight : styles.iconLeft, iconNewStyle]} source={avatar} resizeMode="contain" />
            {(type === 'active') ? <View style={styles.active}><Text style={[styles.textActive]}>{t('common_live')}</Text></View> : null } 
            </TouchableOpacity>
            <TouchableOpacity disabled={disabled} onPress={onPress} style={[styles.textContainer]}>


               {(productSearch.length <= 0 || item.type !== 'shop') ?
                <Text style={[styles.textStyle, labelStyle, {color: getStyle(theme).textColor}]}>{item.title}</Text>
                :
                <View style={{flexDirection: isRTL ? 'row-reverse' : 'row'}}>
                    {(keyWord !== "") ?
                    productSearch.map((value, index) => {
                      if (value.toLowerCase().includes(keyWord.toLowerCase())) {
                        return (<Text key={'title_'+ index} style={[styles.titleStyle, {color: getStyle(theme).textColor}]}> {value} </Text>)
                      } else {
                        return (<Text key={'title_'+ index} style={[styles.titleStyle, {color: getStyle(theme).textColor50}]}> {value} </Text>)
                      }  
                    })
                   : <Text style={[styles.textStyle, labelStyle, {color: getStyle(theme).textColor}]}>{item.title}</Text>
                   }
                </View>
               }

                <View style={{flexDirection: isRTL ? 'row-reverse' : 'row'}}>
                {(item.breadcrumbs) &&
                  <>
                  {(item.type === 'shop') &&
                   <Text style={[{color: getStyle(theme).textColor50, textTransform: 'capitalize'}]}>{t("shop")  + " > "}</Text>
                  }

                  {
                    item.breadcrumbs.map((value, index) => {
                      if (item.breadcrumbs.length !== (index + 1)) {
                        return (<Text key={'breadcrumbs_'+ index} style={[{color: getStyle(theme).textColor50}]}> { value + ' > '} </Text>)
                      } else {
                        return (<Text key={'breadcrumbs_'+ index} style={[{color: colors.sunset}]}> {value} </Text>)
                      }  
                    })
                   }
                  </>
                }
                {(item.type === 'user') &&
                  <Text style={[{color: getStyle(theme).textColor50}]}>{"@" + item.id}</Text>
                }
                {/* {(item.type === 'tournament' && item.game_code) &&
                  <>
                  <Text style={[{color: getStyle(theme).textColor50}]}>{t("top_tab_tournaments")  + " > "}</Text>
                  <Text style={[{color: colors.sunset}]}> {item.game_code} </Text>
                  </> 
                } */}
                {(item.type === 'stream' && !item.islive) &&
                 <>
                  <Text style={[{color: getStyle(theme).textColor50}]}>{ (isRTL ? ' < ' : '')  + " " + t('top_tab_streams')  + " " +  (!isRTL ? ' > ' : '')}</Text>
                  <Text style={[{color: colors.sunset}]} numberOfLines={2} ellipsizeMode="tail">{item.description.substring(0, 30)}</Text>
                 </>  
                }
                {(item.type === 'stream' && item.islive) &&
                 <>
                  <Text style={[{color: getStyle(theme).textColor50}]}>{ (isRTL ? ' < ' : '')  + " " +  t('live_streams')  + " " +  (!isRTL ? ' > ' : '')}</Text>
                  <Text style={[{color: colors.sunset}]} numberOfLines={2} ellipsizeMode="tail">{item.description.substring(0, 30)}</Text>
                 </>  
                }
                </View>
            </TouchableOpacity>
            <View style={[styles.rightContentStyle]}>
              {rightChild}
            </View>
        </View> 
    )

};

export default ThumbnailItem;
