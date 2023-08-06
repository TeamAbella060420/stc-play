import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSelector } from 'react-redux';
import { RootState } from '@fe-monorepo/store';
import Following from './toptabs/Following';
import Streams from './toptabs/Streams';
import Bits from './toptabs/Bits';
import ForYou from './toptabs/ForYou';
import { NAV_ROUTES } from '../../../helpers/navRoutes';
import { translate } from '@fe-monorepo/helper';
import { DiscoverTopTabParamList, TopTabProps } from '../types';
import StaticTopTabbar from '../common_component/StaticTopTabbar';

const TopTab = createMaterialTopTabNavigator<DiscoverTopTabParamList>();

const TopTabDiscover = (props: TopTabProps) => {
  const { isRTL } = useSelector((state: RootState) => state.app);
  const { persona } = useSelector((state: RootState) => state.user);
  const { headerAnimatedValue, footerAnimatedValue } = props;
  const isLoggedUser = persona !== 'guest';

  const renderForYouScreen = () => (
    <TopTab.Screen
      name={NAV_ROUTES.ForYou}
      options={{ tabBarLabel: translate('top_tab_foryou') }}
      children={() => <ForYou headerAnimatedValue={headerAnimatedValue} footerAnimatedValue={footerAnimatedValue} />}
    />
  );

  const renderBitsScreen = () => (
    <TopTab.Screen
      name={NAV_ROUTES.Bits}
      options={{ tabBarLabel: translate('top_tab_bits') }}
      children={() => <Bits headerAnimatedValue={headerAnimatedValue} footerAnimatedValue={footerAnimatedValue} />}
    />
  );

  const renderStreamsScreen = () => (
    <TopTab.Screen
      name={NAV_ROUTES.Streams}
      options={{ tabBarLabel: translate('top_tab_streams') }}
      children={() => <Streams headerAnimatedValue={headerAnimatedValue} footerAnimatedValue={footerAnimatedValue} />}
    />
  );

  const renderFollowingScreen = () => (
    <TopTab.Screen
      name={NAV_ROUTES.Following}
      options={{ tabBarLabel: translate('top_tab_following') }}
      children={() => <Following headerAnimatedValue={headerAnimatedValue} footerAnimatedValue={footerAnimatedValue} />}
    />
  );

  return (
    <TopTab.Navigator initialRouteName={NAV_ROUTES.ForYou} tabBar={props => <StaticTopTabbar {...props} />} backBehavior="none">
      {isRTL ? (
        <>
          {isLoggedUser && renderFollowingScreen()}
          {renderStreamsScreen()}
          {renderBitsScreen()}
          {renderForYouScreen()}
        </>
      ) : (
        <>
          {renderForYouScreen()}
          {renderBitsScreen()}
          {renderStreamsScreen()}
          {isLoggedUser && renderFollowingScreen()}
        </>
      )}
    </TopTab.Navigator>
  );
};

export default TopTabDiscover;
