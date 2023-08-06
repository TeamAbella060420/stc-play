import { Image, Pressable, View, ViewStyle } from 'react-native';
import i18next from "i18next";
import React, {useEffect, useState} from 'react';
import { getStyle, spacing } from '@fe-monorepo/themes';
import { useSelector } from 'react-redux';
import { RootState } from '@fe-monorepo/store';
import images from '../../../assets/images';
import styles from './styles';
import { headerProps } from './headerProps';
import Txtinput from '../../txtinput';
import { translate } from '@fe-monorepo/helper';
import Link from '../../link';
import { colors } from '@fe-monorepo/themes';
import Typography from '../../../assets/typography';


const InputHeader = (props: headerProps) => {
  const { style, onBackPress, onSearch, onChangeText, onEndEditing, onClearText, value, placeholder } = props;
  const { themes, isRTL } = useSelector((state: RootState) => state.app);
  const borderBottom = { borderBottomWidth: 1, borderColor: getStyle(themes).textColor20 };
  const flexDirection: ViewStyle = isRTL ? { flexDirection: 'row-reverse' } : { flexDirection: 'row' };
  const margin = isRTL ? { marginLeft: spacing[16] } : { marginRight: spacing[16] };
  const [isSearchOnFocus, setSearchOnFocus] = useState<boolean>(false);

  return (
    <View style={[styles.headerContainer, flexDirection, borderBottom, style]}>
      <Pressable onPress={onBackPress}>
        <Image source={isRTL ? images.icon_arrow_right : images.icon_arrow_left} style={[styles.imgStyle, margin]} resizeMode="cover" />
      </Pressable>
      <Txtinput onSearch={onSearch} onChangeText={(text) => onChangeText(text)} onEndEditing={onEndEditing} value={value} placeholder={placeholder || translate('screen_search')}  onFocus={()=> setSearchOnFocus(true)}  onBlur={()=> setSearchOnFocus(false)} style={{ borderColor: (isSearchOnFocus) ? colors.sunset :  getStyle(themes).disabledColor}}/>
      {(value) &&
       <View style={styles.clearTextContainer}>
         <Link type={'primary'} withUnderLink={false} label={i18next.t('common_clear')} labelStyle={styles.clearText}  onPress={onClearText}/>
       </View>
      }
    </View>
  );
};

export default InputHeader;
