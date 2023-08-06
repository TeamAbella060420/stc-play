import React, { ReactNode, useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import SingleItem from '../../../components/item_list/single_item'
import { StyledText } from '../../../components/text';
import Typography from '../../../assets/typography';
import { StyledContainer } from '../../../components/container';
import { colors, getStyle } from '@fe-monorepo/themes';
import Link from '../../../components/link';
import { useSearchHistory } from '@fe-monorepo/hooks';
import { SearchHistoryModel } from '@fe-monorepo/models';
import { RootState } from '@fe-monorepo/store';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { SharedValue } from 'react-native-reanimated';
import AnimatedScrollView from './AnimatedScrollView';
import images from '../../../assets/images';
import Icon from './../../../components/Icon';


interface RecentSearchProps {
  onPressSelectedItem?: (item?: string) => void,
  headerAnimatedValue?: SharedValue<number>;
  footerAnimatedValue?: SharedValue<number>;
  children?: ReactNode;
}


export const Recent = ( props: RecentSearchProps) => {
  const { onPressSelectedItem, headerAnimatedValue } = props;
  const { getSearchHistory, removeHistory, clearAllHistory, searchHistoryData } = useSearchHistory()
  const { isLoading } = useSelector((state: RootState) => state.app);
  const theme = useSelector((state: RootState) => state.app.themes);
  const { t } = useTranslation();
  const styles = createStyles(t)
  const [ searchData, setSearchData] = useState<SearchHistoryModel[]>([]);
  

  useEffect(()=> {
    getSearchHistory()
  },[])

  useEffect(()=> {
    if (searchHistoryData) {
      setSearchData(searchHistoryData)
    }
  },[searchHistoryData])

  
  const renderItem = ({ item, index }) => {
    return (
      <View style={[styles.itemContainer]}>
      <TouchableOpacity onPress={() => { onPressSelectedItem(item.title) }} style={styles.renderLeft}>
        <Text style={[{color: getStyle(theme).textColor}, styles.textStyle]}>{item.title}</Text>
      </TouchableOpacity>
 
      <TouchableOpacity onPress={() => { removeHistory(item.search_id) }} style={[styles.renderRight]}>
        <Image style={[styles.iconStyle]} source={images['icon_close']} resizeMode="contain" />
      </TouchableOpacity>  
    </View>
    );
  };

  const renderHeader = () => {
     return <View style={styles.headerContainer}>
         <View style={styles.renderLeft}>
          <StyledText type='primary' textStyle={styles.mediumTextStyle}>{t('common_recent_search')}</StyledText>
          </View>
          {(searchData.length > 0) &&
          <View style={styles.renderRight}>
            <Link type={'primary'} withUnderLink={false} label={t('common_clearAll')} labelStyle = {Typography.bodySmallRegular} onPress={()=> { clearAllHistory() }}/>
          </View>
          }
     </View>
    }

  return (
    <AnimatedScrollView headerAnimatedValue={headerAnimatedValue}>
     {(searchData.length > 0 ) ?
      <FlatList
          style={styles.container}
          scrollEnabled={false}
          data={searchData}
          ListHeaderComponent={renderHeader}
          keyExtractor={(_, index) => `recent_${index}`}
          renderItem={renderItem}
      />
     : (!isLoading) &&
      <View style={styles.noRecentSearchContainer}>
          <Icon name="rectangleSadFill" width={120} height={122} style={{marginBottom: 24}}/>
          <StyledText type='primary' textStyle={styles.mediumTextStyle}>{t('common_no_recent_search')}</StyledText>
      </View>
     }
    </AnimatedScrollView>
  );
};

const createStyles = (
  t: any
) => {
return StyleSheet.create({
  container: {
    flex:1,
    paddingHorizontal: 24
  },
  headerContainer: {
    marginVertical: 24,
    flexDirection: t('config_row'),
    alignItems: 'center'
  },
  itemContainer: {
    marginBottom: 24,
    flexDirection: t('config_row')
  },
  renderLeft: {
    alignItems: t('config_flex'),
    flex:3,
    justifyContent: 'center',
    alignContent: 'center',
  },
  renderRight: {
    alignItems: t('config_flex_reverse'),
    flex:1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  textStyle: {
    textAlign: t('config_align'),
    flex: 9,
    lineHeight: 24,
    ...Typography.bodyRegular
  },
  iconStyle: { 
    width: 9.33, 
    height: 9.33,
    alignContent: 'center',
    alignItems: t('config_flex_reverse'),
    tintColor: colors.black50 
  },
  noRecentSearchContainer: {
    marginVertical: 40,
    alignItems: 'center'
  },
  mediumTextStyle: {
    ...Typography.bodyLargeMedium
  },
 })
}