import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import { SearchTopTabParamList } from '../TopTabSearch';
import { StyledContainer } from '../../../components/container';
import ViewContainer from '../../../components/view_container';
import SearchList from '../component/SearchList';
import { ContentModel, SearchModel } from '@fe-monorepo/models';
import { RootState } from '@fe-monorepo/store';
import { useSelector } from 'react-redux';
import AnimatedScrollView from '../component/AnimatedScrollView';
import { TopTabProps } from '../types';
import SingleItem from '../../../components/item_list/single_item';
import { getStyle } from '@fe-monorepo/themes';
import { styles } from '../styles';
import { useGlobalSearch } from '@fe-monorepo/hooks';
import { runOnJS, useDerivedValue, useSharedValue } from 'react-native-reanimated';

const Users = (props: TopTabProps) => {
  const navigation = useNavigation<StackNavigationProp<SearchTopTabParamList, 'Users'>>();
  const { getAllSearchInformation, currentGlobalSearchData, isLoading } = useGlobalSearch();
  const { users } = useSelector((state: RootState) => state.search);
  const isRTL = useSelector((state: RootState) => state.app.isRTL);
  const [searchData, setSearchData] = useState<[ContentModel]>();
  const theme = useSelector((state: RootState) => state.app.themes);
  const { t } = useTranslation();
  const hasReachEnd = useSharedValue(false);

  const TAB_CURRENT_INDEX = isRTL ? 1 : 4;

  const { headerAnimatedValue, keyWord } = props;

  useEffect(() => {
    if (currentGlobalSearchData.length > 0 && !isLoading) {
      hasReachEnd.value = false;
      setSearchData(currentGlobalSearchData);
    }
  }, [currentGlobalSearchData]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('state', e => {
      if (e.data.state.index === TAB_CURRENT_INDEX) {
        loadData();
      }
    });
    return unsubscribe;
  }, [navigation]);

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
        type: 'user',
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
        item={{ title: t('common_results') + ' (' + users.total + ')' } as ContentModel}
      />
    );
  };

  return (
    <AnimatedScrollView headerAnimatedValue={headerAnimatedValue} hasReachEnd={hasReachEnd}>
      <ViewContainer style={styles.containerStyle}>
        {searchData && (
          <SearchList
            type={'thumbnail'}
            searchType="users"
            total={searchData.length}
            data={searchData}
            header={renderHeader()}
            hasLoadingFooter
            isLoading={isLoading}
          />
        )}
      </ViewContainer>
    </AnimatedScrollView>
  );
};

export default Users;
