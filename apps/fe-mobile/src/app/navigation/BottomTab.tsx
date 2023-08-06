import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Discover from '../screens/home/discover';
import Connect from '../screens/home/connect';
import Compete from '../screens/home/compete';
import CustomTabbar from './components/CustomTabbar';
import Shop from '../screens/home/shop';
import { useSelector } from 'react-redux';
import { RootState } from '@fe-monorepo/store';
import AddScreen from '../screens/common/AddScreen';
import { useSharedValue } from 'react-native-reanimated';
import { useAccount, useWallet } from '@fe-monorepo/hooks';

export type BottomTabParamList = {
  Discover: undefined;
  Compete: undefined;
  Add: undefined;
  Connect: undefined;
  Shop: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTab = () => {
  const { persona } = useSelector((state: RootState) => state.user);
  const { isRTL } = useSelector((state: RootState) => state.app);
  const animatedValue = useSharedValue(0);
  const isGuest = persona === 'guest';
  const { getUserProfile } = useAccount();
  const { getUserWallet } = useWallet();

  useEffect(() => {
    if (!isGuest) {
      getUserProfile();
      getUserWallet();
    }
  }, []);

  const renderShop = () => {
    return <Tab.Screen name="Shop" component={Shop} />;
  };
  const renderConnect = () => {
    return <Tab.Screen name="Connect" component={Connect} />;
  };
  const renderAdd = () => {
    return <Tab.Screen name="Add" component={AddScreen} />;
  };
  const renderCompete = () => {
    return <Tab.Screen name="Compete" component={Compete} />;
  };
  const renderDiscover = () => {
    return <Tab.Screen name="Discover" children={() => <Discover footerAnimatedValue={animatedValue} />} />;
  };

  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Discover"
      backBehavior="none"
      tabBar={props => <CustomTabbar footerAnimatedValue={animatedValue} {...props} />}
    >
      {isRTL ? (
        <>
          {renderShop()}
          {renderConnect()}
          {!isGuest && renderAdd()}
          {renderCompete()}
          {renderDiscover()}
        </>
      ) : (
        <>
          {renderDiscover()}
          {renderCompete()}
          {!isGuest && renderAdd()}
          {renderConnect()}
          {renderShop()}
        </>
      )}
    </Tab.Navigator>
  );
};

export default BottomTab;
