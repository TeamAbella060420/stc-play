import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import React from 'react';
import { styles } from './styles';
import Icon from '../Icon';

interface RatingProps extends TouchableOpacityProps  {
    totalRatings: number
}
    
const Rating = (props: RatingProps) => {

 const { onPress, disabled, totalRatings } = props;
 const LIMIT = 5

 const rating = () => {
  const renders = [];
    for (let i=0; i < LIMIT; i++) {
      renders.push(
          <View key={"rating_"+i}>
               <Icon name = {(i <= totalRatings) ? "starActive" : "starInActive"} width={16} height={16} />
            </View>
        );
    }
    return renders;
 } 

  return (
    <TouchableOpacity disabled={disabled} onPress={onPress} style={[styles.container]}>
       {rating()} 
    </TouchableOpacity>
  );
};

export default Rating;
