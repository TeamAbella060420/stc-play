import React from 'react';
import { MaterialTopTabNavigationOptions, createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Tournaments from './toptabs/Tournaments';
import MatchMaking from './toptabs/MatchMaking';
import { colors, getStyle } from '@fe-monorepo/themes';
import { useSelector } from 'react-redux';
import { RootState } from '@fe-monorepo/store';
import Typography from '../../../assets/typography';
import { windowWidth } from '../../../utils/Dimensions';
import { NAV_ROUTES } from '../../../helpers/navRoutes';
import { translate } from '@fe-monorepo/helper';
import { TopTabProps } from '../types';
import StaticTopTabbar from '../common_component/StaticTopTabbar';

export type CompeteTopTabParamList = {
  Tournaments: undefined;
  MatchMaking: undefined;
};

const TopTab = createMaterialTopTabNavigator<CompeteTopTabParamList>();

const TopTabCompete = (props: TopTabProps) => {
  const { themes, isRTL } = useSelector((state: RootState) => state.app);
  const { headerAnimatedValue } = props;

  const screenOptions: MaterialTopTabNavigationOptions = {
    tabBarStyle: { backgroundColor: getStyle(themes).backgroundColor },
    tabBarLabelStyle: { ...Typography.bodyMedium, textTransform: 'none', flex: 0, margin: 0, padding: 0 },
    tabBarContentContainerStyle: { flex: 0, margin: 0, padding: 0 },
    tabBarInactiveTintColor: getStyle(themes).textColor50,
    tabBarActiveTintColor: colors.sunset,
    tabBarIndicatorStyle: {
      width: windowWidth / 2 - 40,
      left: 20,
      right: 20,
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
      backgroundColor: colors.sunset
    },
    tabBarIndicatorContainerStyle: { borderBottomWidth: 1, borderBottomColor: getStyle(themes).textColor20 }
  };

  const renderMatchMaking = () => {
    return (
      <TopTab.Screen
        name={NAV_ROUTES.MatchMaking}
        options={{ tabBarLabel: translate('top_tab_matchmaking') }}
        children={() => <MatchMaking headerAnimatedValue={headerAnimatedValue} />}
      />
    );
  };

  const renderTournaments = () => {
    return (
      <TopTab.Screen
        name={NAV_ROUTES.Tournaments}
        options={{ tabBarLabel: translate('top_tab_tournaments') }}
        children={() => <Tournaments headerAnimatedValue={headerAnimatedValue} />}
      />
    );
  };

  return (
    <TopTab.Navigator initialRouteName={NAV_ROUTES.Tournaments} tabBar={props => <StaticTopTabbar {...props} />} backBehavior="none">
      {isRTL ? (
        <>
          {renderMatchMaking()}
          {renderTournaments()}
        </>
      ) : (
        <>
          {renderTournaments()}
          {renderMatchMaking()}
        </>
      )}
    </TopTab.Navigator>
  );
};

export default TopTabCompete;
