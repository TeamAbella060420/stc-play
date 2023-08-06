import React from 'react';
import { View, ActivityIndicator } from 'react-native';

interface FooterLoderProps {
    isLoading?: boolean,
    initialLoad?: boolean
}

const FooterLoader = (props: FooterLoderProps) => {
  const {isLoading} = props  
  return (
   <View>{(isLoading) ? <ActivityIndicator/> : null }</View>
  );
};

export default FooterLoader;
