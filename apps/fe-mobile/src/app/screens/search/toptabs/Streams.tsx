import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { SearchTopTabParamList } from '../TopTabSearch';
import { RootState } from '@fe-monorepo/store';
import { ContentModel } from '@fe-monorepo/models';
import { TopTabProps } from '../types';
import { getStyle } from '@fe-monorepo/themes';
import SingleItem from '../../../components/item_list/single_item';
import AnimatedScrollView from '../component/AnimatedScrollView';
import SearchList from '../component/SearchList';
import ViewContainer from '../../../components/view_container';
import { styles } from '../styles';
import { useSharedValue } from 'react-native-reanimated';

const Streams = (props: TopTabProps) => {
  const navigation = useNavigation<StackNavigationProp<SearchTopTabParamList, 'Streams'>>();
  const { streams } = useSelector((state: RootState) => state.search);
  const [ searchData, setSearchData] = useState<[ContentModel]>();
  const theme = useSelector((state: RootState) => state.app.themes);
  const { t } = useTranslation()
  const hasReachEnd = useSharedValue(false);

  const { headerAnimatedValue } = props;
  useEffect(()=> {
    if (streams) {
      setSearchData(streams.result)
    }
  },[streams])

  const renderHeader = () => {
    return (<SingleItem type={'default'} labelStyle={{color:getStyle(theme).textColor70}}
       item = {{title: t('common_results') + ' (' + streams.total + ')'} as ContentModel}
   />);
  }


  return (
    <AnimatedScrollView headerAnimatedValue={headerAnimatedValue} hasReachEnd={hasReachEnd}>
      <ViewContainer style={styles.containerStyle}>
        {/* {(searchData) &&
            <SearchList type={'large-thumbnail'} searchType='streams' total={0} data={searchData} header={renderHeader()} />
        } */}
      </ViewContainer>
    </AnimatedScrollView>
  );
};

export default Streams;
