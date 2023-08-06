import React from 'react';
import { View, StatusBar } from 'react-native';
import styles from './styles';
import { StylesContainerProps } from './type';
import { useSelector } from 'react-redux';
import { RootState } from '@fe-monorepo/store';
import { getStyle } from '@fe-monorepo/themes';
import Loading from '../Loading';

const ViewContainer = (props: StylesContainerProps) => {
  const { style, children, barStyle, barBGStyle } = props;
  const { themes, isLoading } = useSelector((state: RootState) => state.app);
  const bar = themes === 'light' ? 'dark-content' : 'light-content';
  const backgroundColor = { backgroundColor: getStyle(themes).backgroundColor };

  return (
    <View style={[styles.container, backgroundColor, style]}>
      <StatusBar translucent backgroundColor={barBGStyle || getStyle(themes).backgroundColor} barStyle={barStyle || bar} />
      {children}
      {isLoading && <Loading />}
    </View>
  );
};

export default ViewContainer;
