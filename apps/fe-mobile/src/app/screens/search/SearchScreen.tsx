import React, { useState, useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import ViewContainer from '../../components/view_container';
import { useNavigation } from '@react-navigation/native';
import { useGlobalSearch, useSearchHistory } from '@fe-monorepo/hooks';
import InputHeader from '../../components/headers/input_header';
import { Recent } from './component/Recent';
import Active from './component/Active';
import TopTabSearch from './TopTabSearch';
import { SearchModel } from '@fe-monorepo/models';
import { windowHeight } from '../../utils/Dimensions';

import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import Loading from '../../components/Loading';
import { useSelector } from 'react-redux';
import { RootState } from '@fe-monorepo/store';
import { styles } from './styles';

const SearchScreen = () => {
  const navigation = useNavigation();
  const [isActiveSearch, setActiveSearch] = useState<boolean>(false);
  const [isEndSearch, setEndSearch] = useState<boolean>(false);
  const [keyWord, setKeyWord] = useState<string>('');
  const { getAllSearch } = useGlobalSearch();
  const { saveHistory } = useSearchHistory();
  const { isLoading } = useSelector((state: RootState) => state.app);

  const onChangeText = (val: string) => {
    if (val.trim().length > 3) {
      setActiveSearch(true);
    } else {
      setEndSearch(false)
      setActiveSearch(false);
    }
    setKeyWord(val);
  };

  const onEndEditing = () => {
    saveHistory(keyWord);
    eventGetAllSearch(keyWord);
  };

  const onClearText = () => {
    setEndSearch(false);
    setKeyWord('');
    setActiveSearch(false);
  };

  const eventGetAllSearch = (val: string) => {
    if (val.trim().length > 3) {
      setKeyWord(val);
      getAllSearch({
        identifier: val
      } as SearchModel);
      setEndSearch(true);
    } else {
      setEndSearch(false);
    }
  };

  const animatedValue = useSharedValue(0);

  const headerAnimation = useAnimatedStyle(() => {
    const inputRange = [0, 72];
    const outputRangeY = [0, -72];
    const translateY = interpolate(animatedValue.value, inputRange, outputRangeY, Extrapolate.CLAMP);
    return { transform: [{ translateY: withTiming(translateY) }] };
  });

  const headerContainerAnimation = useAnimatedStyle(() => {
    const inputRange = [-82, 82];
    const outputRangeY = [-82, 82];
    const translateY = interpolate(animatedValue.value, inputRange, outputRangeY, Extrapolate.CLAMP);
    return { transform: [{ translateY: withTiming(translateY) }] };
  });

  return (
    <>
      <ViewContainer style={styles.container}>
        <Animated.View style={[headerAnimation, { height: windowHeight + 100 }]}>
          <InputHeader
            value={keyWord}
            onBackPress={() => navigation.goBack()}
            onChangeText={val => {
              onChangeText(val);
            }}
            onEndEditing={onEndEditing}
            style={{ borderBottomWidth: isEndSearch ? 0 : 1, paddingBottom: 12 }}
            onClearText={() => onClearText()}
          />
          {!isEndSearch ? (
            isActiveSearch ? (
              <Active keyWord={keyWord} />
            ) : (
              <Recent
                onPressSelectedItem={key => {
                  eventGetAllSearch(key);
                }}
                headerAnimatedValue={animatedValue}
              />
            )
          ) : (
            <TopTabSearch headerAnimatedValue={animatedValue} keyWord={keyWord} />
          )}
        </Animated.View>
        <Animated.View style={[headerContainerAnimation, styles.headerContainer]}>
          <Text style={styles.headerText}>{keyWord}</Text>
        </Animated.View>
      </ViewContainer>
      {isLoading && <Loading />}
    </>
  );
};

export default SearchScreen;
