import { Text, TouchableOpacity, Image, View } from 'react-native';
import React from 'react';
import { styles } from './styles';
import { useSelector } from 'react-redux';
import { RootState } from '@fe-monorepo/store';
import { getStyle } from '@fe-monorepo/themes';
import { ItemProps } from '../types';
import images from '../../../assets/images';
import Icon from '../../Icon';
import Rating from '../../rating';

const ShopItem = (props: ItemProps) => {
  const { item, onPress, onPressIcon, disabled } = props;
  const theme = useSelector((state: RootState) => state.app.themes);

  const avatar = !item.img ? images.profile_placeholder : typeof item.img === 'string' ? { uri: item.img } : item.img;
  const discountPercentage = item.total_price !== 0 ? (item.total_price / item.grand_total) * 100 : '';

  return (
    <View style={[styles.container]}>
      <View style={styles.favContainer}>
        <View style={[styles.discounted]}>
          {item.total_price !== 0 && (
            <View style={[styles.discountedContainer]}>
              <Text style={[styles.discountedText]}>{'-' + discountPercentage + '%'}</Text>
            </View>
          )}
        </View>
        <View style={[styles.fav]}>
          <View style={[styles.favIcon]}>
            <TouchableOpacity disabled={disabled} onPress={onPressIcon}>
              <Icon name="heartFill" width={16} height={16} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TouchableOpacity disabled={disabled} onPress={onPress}>
        <Image style={[styles.cardThumbnail]} source={avatar} resizeMode="contain" />
        <View style={styles.descriptionContainer}>
          {((item.breadcrumbs)) && 
           <Text style={[styles.categoryName, { color: getStyle(theme).textColor }]} ellipsizeMode="tail">
            {item.breadcrumbs[0]}
           </Text>
          }  
          <Text style={[styles.productName, { color: getStyle(theme).textColor }]} numberOfLines={2} ellipsizeMode="tail">
            {item.title}
          </Text>
          <View style={styles.priceContainer}>
            <Text style={[styles.price, { color: getStyle(theme).textColor }]}> SR </Text>
            <Text style={[styles.price, { color: getStyle(theme).textColor }]}> {item?.grand_total.toFixed(2)} </Text>
            <Text style={[styles.oldPrice, { color: getStyle(theme).textColor50 }]}> 
              {item?.total_price !== 0 ? '( ' + item?.total_price.toFixed(2) + ' )' : ''} 
            </Text>
          </View>
          <View style={styles.reviewContainer}>
            <Rating totalRatings={item.product_rating} />
            <Text style={[styles.totalRating, { color: getStyle(theme).textColor50 }]}>{' (' + item?.total_raters + ') '}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ShopItem;
