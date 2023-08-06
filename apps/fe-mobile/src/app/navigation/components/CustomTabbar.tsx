import { View, Text, StyleSheet, Pressable, TextStyle, Image } from 'react-native';
import React, { useState } from 'react';
import Typography from '../../assets/typography';
import { useSelector } from 'react-redux';
import { RootState } from '@fe-monorepo/store';
import { colors, getStyle, spacing } from '@fe-monorepo/themes';
import { translate } from '@fe-monorepo/helper';
import Animated, { Extrapolate, interpolate, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import SuperPlus from './superPlus';
import Icon from '../../components/Icon';

const CustomTabBar = (props: any) => {
  const { state, navigation, footerAnimatedValue } = props;
  const { themes } = useSelector((state: RootState) => state.app);
  const { userContext } = useSelector((state: RootState) => state.user);  
  const backgroundColor = { backgroundColor: getStyle(themes).backgroundColor };
  const borderColor = { borderColor: getStyle(themes).textColor20 };
  const [showSuperPlus, setSuperPlusVisibility] = useState(false);
  const footerAnimation = useAnimatedStyle(() => {
    const inputRange = [0, 90];
    const outputRangeY = [0, 90];
    const translateY = interpolate(footerAnimatedValue.value, inputRange, outputRangeY, Extrapolate.CLAMP);
    return { transform: [{ translateY: withTiming(translateY) }] };
  });

  const renderIcons = (tab, isFocused) => {
    const tintColor = isFocused ? colors.sunset : getStyle(themes).iconColor;
    const iconName = tab.toString().toLowerCase();

    if (tab === 'Add') {      
      return (
        renderAddIcon(isFocused, iconName)
      );
    }
    
    return <View style={styles.iconStyle}><Icon name={iconName} width={24} height={24} fill={tintColor}/></View>
  };

  const renderAddIcon = (isFocused: boolean, iconName = 'add') =>
  {
    return (
      <View style={{ zIndex: 1000, padding: 2, backgroundColor: isFocused ? getStyle(themes).iconColor : getStyle(themes).sunsetColor}}>
        <View style={styles.addBtn}>
          <Icon name={'add'} width={16} height={16} fill={colors.white100}/>
        </View>
      </View>
    )
  }
    
  return (
    <Animated.View style={[styles.container, footerAnimation, backgroundColor, borderColor]}>
      {state.routes.map((route: any, index: number) => {
        const isFocused = state.index === index;
        const isFocusedStyle: TextStyle = isFocused ? { color: colors.sunset, fontWeight: '700' } : { color: getStyle(themes).textColor };
        const label =
          route.name === 'Discover'
            ? translate('home_discover')
            : route.name === 'Compete'
            ? translate('home_compete')
            : route.name === 'Connect'
            ? translate('home_connect')
            : translate('home_shop');

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true
          });

          if (!isFocused && !event.defaultPrevented) {
            if (route.name === 'Add') {
              setSuperPlusVisibility(true)
            } else {
              setSuperPlusVisibility(false)
              navigation.navigate({ name: route.name, merge: true });
            }
          }
        };

        return (
          <Pressable key={`${index}${route.key}`} onPress={onPress} style={styles.tabStyle}>
            {renderIcons(route.name, isFocused)}
            {route.name !== 'Add' && <Text style={[styles.labelStyle, isFocusedStyle]}>{label}</Text>}
          </Pressable>
        );
      })}
      <SuperPlus isVisible={showSuperPlus} onClose={() => setSuperPlusVisibility(false)} type={userContext?.gamer_type} />{/* /userContext?.gamer_type/ */}
    </Animated.View>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing[8],
    paddingBottom: spacing[36],
    flexDirection: 'row',
    borderTopWidth: 1,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0
  },
  tabStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
  },
  iconStyle: { width: 24, height: 24 },
  iconAdd: { width: 16, height: 16 },
  labelStyle: StyleSheet.flatten([Typography.captionRegular]),
  addBtn: {
    padding: 11,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.sunset
  }
});