import { View, Text, Pressable } from 'react-native';
import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
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

const Bits = (props: TopTabProps) => {
  const navigation = useNavigation<StackNavigationProp<SearchTopTabParamList, 'Bits'>>();  
  const { bits } = useSelector((state: RootState) => state.search);
  const [ searchData, setSearchData] = useState<[ContentModel]>();
  const theme = useSelector((state: RootState) => state.app.themes);
  const { t } = useTranslation()
  const hasReachEnd = useSharedValue(false);

  const { headerAnimatedValue } = props;
  useEffect(()=> {
    if (bits) {
      setSearchData(bits.result)
    }
  },[bits])

  const renderHeader = () => {
    return (<SingleItem type={'default'} labelStyle={{color:getStyle(theme).textColor70}}
       item = {{title: t('common_results') + ' (' + bits.total + ')'} as ContentModel}
   />);
  }


  return (
    <AnimatedScrollView headerAnimatedValue={headerAnimatedValue} hasReachEnd={hasReachEnd}>
      <ViewContainer style={styles.containerStyle}>
        {/* {(searchData) &&
            <SearchList type={'xlarge-thumbnail'} searchType='tournaments' total={0} data={searchData} header={renderHeader()} />
        } */}
      </ViewContainer>
    </AnimatedScrollView>
  );
};

export default Bits;
