import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SearchTopTabParamList } from '../TopTabSearch';
import { useTranslation } from 'react-i18next';
import { RootState } from '@fe-monorepo/store';
import { ContentModel, SearchModel } from '@fe-monorepo/models';
import { TopTabProps } from '../types';
import { getStyle } from '@fe-monorepo/themes';
import SingleItem from '../../../components/item_list/single_item';
import AnimatedScrollView from '../component/AnimatedScrollView';
import SearchList from '../component/SearchList';
import ViewContainer from '../../../components/view_container';
import { styles } from '../styles';
import Icon from '../../../components/Icon';
import { useGlobalSearch } from '@fe-monorepo/hooks';
import { runOnJS, useDerivedValue, useSharedValue } from 'react-native-reanimated';

const Tournaments = (props: TopTabProps) => {
  const navigation = useNavigation<StackNavigationProp<SearchTopTabParamList, 'Tournaments'>>();
  const isRTL = useSelector((state: RootState) => state.app.isRTL);
  const { getAllSearchInformation, currentGlobalSearchData, isLoading } = useGlobalSearch();
  const [searchData, setSearchData] = useState<[ContentModel]>();
  const theme = useSelector((state: RootState) => state.app.themes);
  const { t } = useTranslation();
  const { headerAnimatedValue, keyWord } = props;
  const hasReachEnd = useSharedValue(false);
  const TAB_CURRENT_INDEX = isRTL ? 0 : 5;

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('state', e => {
      if (e.data.state.index === TAB_CURRENT_INDEX) {
        loadData();
      }
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (currentGlobalSearchData.length > 0 && !isLoading) {
      hasReachEnd.value = false;
      setSearchData(currentGlobalSearchData);
    }
  }, [currentGlobalSearchData]);

  const loadMore = () => {
    if (!isLoading) {
      if (currentGlobalSearchData.length > 0) {
        loadData(true);
      }
    }
  };

  const loadData = (hasPagination?: boolean) => {
    getAllSearchInformation(
      {
        type: 'tournament',
        direction: 'next',
        identifier: keyWord
      } as SearchModel,
      hasPagination ? currentGlobalSearchData[currentGlobalSearchData.length - 1].pagination : null
    );
  };

  useDerivedValue(() => {
    if (hasReachEnd.value && !isLoading) {
      runOnJS(loadMore)();
    }
  });

  const renderHeader = () => {
    return (
      <SingleItem
        type={'default'}
        labelStyle={{ color: getStyle(theme).textColor }}
        item={{ title: t('common_results') + ' (' + searchData.length + ')' } as ContentModel}
        rightChild={<Icon name="tuneVerticalFill" width={24} height={24} />}
      />
    );
  };

  return (
    <AnimatedScrollView headerAnimatedValue={headerAnimatedValue} hasReachEnd={hasReachEnd}>
      <ViewContainer style={styles.containerStyle}>
        {searchData && <SearchList type={'large-thumbnail'} searchType="tournaments" total={0} data={searchData} header={renderHeader()} />}
      </ViewContainer>
    </AnimatedScrollView>
  );
};

export default Tournaments;
