import React from 'react';
import { View, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';

const Loading = () => {
  return (
    <View style={styles.container} >
      <ActivityIndicator animating size={'large'} color={'#FF7300'}/>
    </View>
  );
};

export default Loading;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth,
    height: windowHeight,
    backgroundColor: 'rgba(255,255,255, 0.8)',
    position: 'absolute',
    left: 0,
    top: 0
  }
});
