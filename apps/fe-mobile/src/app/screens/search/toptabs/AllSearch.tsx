import React from 'react';
import i18next from "i18next";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SearchTopTabParamList } from '../TopTabSearch';
import SearchList from '../component/SearchList';
import ViewContainer from '../../../components/view_container';
import { useSelector } from 'react-redux';
import { RootState } from '@fe-monorepo/store';
import { TopTabProps } from '../types';
import AnimatedScrollView from '../component/AnimatedScrollView';
import { styles } from '../styles';
import { useSharedValue } from 'react-native-reanimated';
import { View } from 'react-native';

const AllSearch = (props: TopTabProps) => {
  const navigation = useNavigation<StackNavigationProp<SearchTopTabParamList, 'All'>>();
  const { shop, users, streams, tournaments } = useSelector((state: RootState) => state.search);
  const { headerAnimatedValue, keyWord } = props;
  const hasReachEnd = useSharedValue(false);
  
  return (
    <AnimatedScrollView headerAnimatedValue={headerAnimatedValue} hasReachEnd={hasReachEnd}>
      <ViewContainer style={styles.containerStyle}>
       <View> 
        {(shop.result.length > 0) &&
          <SearchList type={'thumbnail'} searchType='shop' total={(shop.total === 0) ? shop.result.length : shop.total} data={shop.result} headerTitle={i18next.t('home_shop')} onPressSeeAll={() => { navigation.jumpTo('Shop') }} keyWord={keyWord}/>
        }
        {(streams.result.length > 0) &&
          <SearchList type={'thumbnail'} searchType='streams'  total={streams.total} data={streams.result} headerTitle={i18next.t('top_tab_streams')}  onPressSeeAll={() => { navigation.jumpTo('Streams') }} keyWord={keyWord}/>
        }

        {(users.result.length > 0) &&
          <SearchList type={'thumbnail'} searchType='users' total={users.total} data={users.result} headerTitle={i18next.t('top_tab_users')} onPressSeeAll={() => { navigation.jumpTo('Users') }} keyWord={keyWord}/>
        }

        {(tournaments.result.length > 0) &&
           <SearchList type={'thumbnail'} searchType='tournaments' total={tournaments.total} data={tournaments.result} headerTitle={i18next.t('top_tab_tournaments')} onPressSeeAll={() => { navigation.jumpTo('Tournaments') }} keyWord={keyWord}/>
        }
          {/* <SearchList type={'default'} total={12} data={data} headerTitle='Bits' onPressSeeAll={() => { navigation.jumpTo('Bits') }}/>  */}
      </View>
      </ViewContainer>  
      </AnimatedScrollView>
  );
};

export default AllSearch;
