import { View, Text, TextStyle, ViewStyle, Pressable } from 'react-native';
import { RootState } from '@fe-monorepo/store';
import { useSelector } from 'react-redux';
import Typography from '../../../assets/typography';
import colors from 'libs/themes/src/colors';
import { getStyle } from '@fe-monorepo/themes';
import { windowWidth } from '../../../utils/Dimensions';
import { NAV_ROUTES } from '../../../helpers/navRoutes';

const StaticTopTabbar = ({ state, descriptors, navigation, position }) => {
  const { themes, isRTL } = useSelector((state: RootState) => state.app);

  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;
        const isFocused = state.index === index;
        const txtStyle: TextStyle = {
          color: isFocused ? colors.sunset : getStyle(themes).textColor50,
          textAlign: 'center',
          paddingVertical: 4,
          paddingLeft: index === 0 ? 10 : 0,
          paddingRight: index === 3 && !isRTL ? 20 : 0
        };
        const indicatorStyle: ViewStyle = { height: 1.5, backgroundColor: getStyle(themes).textColor20, alignItems: 'center' };
        const activeIndicatorStyle = {
          height: 1.5,
          width: windowWidth / state.routes.length,
          backgroundColor: colors.sunset
        };

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key
          });
        };

        return (
          <Pressable
            key={`discovertabs_idx${index}`}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[{ flex: route.name === NAV_ROUTES.Bits ? 0.75 : 1.25 }]}
          >
            <Text style={[isFocused ? { ...Typography.bodyMedium } : { ...Typography.bodyRegular }, txtStyle]}>{label}</Text>
            <View style={indicatorStyle}>{isFocused && <View style={activeIndicatorStyle} />}</View>
          </Pressable>
        );
      })}
    </View>
  );
};

export default StaticTopTabbar;
