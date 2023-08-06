import { View, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompeteTopTabParamList } from '../TopTabCompete';
import AnimatedScrollView from '../../common_component/AnimatedScrollView';
import { TopTabProps } from '../../types';
import styles from '../styles';

const MatchMaking = (props: TopTabProps) => {
  const navigation = useNavigation<StackNavigationProp<CompeteTopTabParamList, 'MatchMaking'>>();
  const { headerAnimatedValue } = props;

  return (
    <AnimatedScrollView style={styles.contentPadding} headerAnimatedValue={headerAnimatedValue}>
      <View style={{ paddingBottom: 100 }}>
        <Image
          style={{ height: 220, width: '100%', marginBottom: 24 }}
          resizeMode="stretch"
          source={require('apps/fe-mobile/src/app/assets/images/placeholders/compete_img1.png')}
        />
        <Image
          style={{ height: 220, width: '100%', marginBottom: 24 }}
          resizeMode="stretch"
          source={require('apps/fe-mobile/src/app/assets/images/placeholders/compete_img2.png')}
        />
        <Image
          style={{ height: 220, width: '100%', marginBottom: 24 }}
          resizeMode="stretch"
          source={require('apps/fe-mobile/src/app/assets/images/placeholders/compete_img1.png')}
        />
        <Image
          style={{ height: 220, width: '100%', marginBottom: 24 }}
          resizeMode="stretch"
          source={require('apps/fe-mobile/src/app/assets/images/placeholders/compete_img2.png')}
        />
      </View>
    </AnimatedScrollView>
  );
};

export default MatchMaking;
