import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AllSearch from './toptabs/AllSearch';
import Bits from './toptabs/Bits';
import Streams from './toptabs/Streams';
import Shop from './toptabs/Shop';
import Users from './toptabs/Users';
import Tournaments from './toptabs/Tournaments';

import { colors, getStyle } from '@fe-monorepo/themes';
import { useSelector } from 'react-redux';
import { RootState } from '@fe-monorepo/store';
import Typography from '../../assets/typography';
import { translate } from '@fe-monorepo/helper';
import { TopTabProps } from './types';

export type SearchTopTabParamList = {
  All: undefined;
  Bits: undefined;
  Streams: undefined;
  Shop: undefined;
  Users: undefined;
  Tournaments: undefined;
};

const TopTab = createMaterialTopTabNavigator<SearchTopTabParamList>();

const TopTabSearch = (props: TopTabProps) => {
  const { themes, isRTL } = useSelector((state: RootState) => state.app);
  const { headerAnimatedValue, keyWord } = props;


  const screenOptions: any = {
    tabBarLabelStyle: { ...Typography.bodyRegular, textTransform: 'none' },
    style: {backgroundColor:getStyle(themes).backgroundColor},
    tabBarInactiveTintColor: getStyle(themes).textColor50,
    tabBarActiveTintColor: colors.sunset,
    tabBarItemStyle: { width: 'auto', marginBottom: -10},
    tabBarScrollEnabled: true,
    tabBarIndicatorStyle: {  
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
      backgroundColor: colors.sunset
    }
  };

  return (
    <TopTab.Navigator screenOptions={screenOptions} initialRouteName="All">
    {isRTL ? ( 
      <>
      <TopTab.Screen name="Tournaments" options={{ tabBarLabel: translate('top_tab_tournaments') }} children={() => <Tournaments headerAnimatedValue={headerAnimatedValue} keyWord={keyWord}/>} />
      <TopTab.Screen name="Users" options={{ tabBarLabel: translate('top_tab_users') }}  children={() => <Users headerAnimatedValue={headerAnimatedValue} keyWord={keyWord}/>}/>
      <TopTab.Screen name="Shop" options={{ tabBarLabel: translate('home_shop') }}  children={() => <Shop headerAnimatedValue={headerAnimatedValue} keyWord={keyWord}/>} />
      <TopTab.Screen name="Streams" options={{ tabBarLabel: translate('top_tab_streams') }} children={() => <Streams headerAnimatedValue={headerAnimatedValue} keyWord={keyWord} />}/>
      <TopTab.Screen name="Bits" options={{ tabBarLabel: translate('top_tab_bits') }} children={() => <Bits headerAnimatedValue={headerAnimatedValue} keyWord={keyWord}/>}/>
      <TopTab.Screen name="All" options={{ tabBarLabel: translate('tob_tab_all') }}
        children={() => <AllSearch headerAnimatedValue={headerAnimatedValue} keyWord={keyWord}/>}/>
      </>
    ) : 
    (
      <>
      <TopTab.Screen name="All" options={{ tabBarLabel: translate('tob_tab_all') }} children={() => <AllSearch headerAnimatedValue={headerAnimatedValue} keyWord={keyWord}/>}/>
      <TopTab.Screen name="Bits" options={{ tabBarLabel: translate('top_tab_bits') }} children={() => <Bits headerAnimatedValue={headerAnimatedValue} keyWord={keyWord}/>}/>
      <TopTab.Screen name="Streams" options={{ tabBarLabel: translate('top_tab_streams') }} children={() => <Streams headerAnimatedValue={headerAnimatedValue} keyWord={keyWord}/>}/>
      <TopTab.Screen name="Shop" options={{ tabBarLabel: translate('home_shop') }} children={() => <Shop headerAnimatedValue={headerAnimatedValue} keyWord={keyWord}/>}/>
      <TopTab.Screen name="Users" options={{ tabBarLabel: translate('top_tab_users') }} children={() => <Users headerAnimatedValue={headerAnimatedValue} keyWord={keyWord}/>}/>
      <TopTab.Screen name="Tournaments" options={{ tabBarLabel: translate('top_tab_tournaments') }} children={() => <Tournaments headerAnimatedValue={headerAnimatedValue} keyWord={keyWord}/>}/>
      </>
    )
    } 
    </TopTab.Navigator>
  );
};

export default TopTabSearch;
