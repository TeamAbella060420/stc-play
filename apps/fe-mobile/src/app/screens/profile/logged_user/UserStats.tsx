import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { colors, getStyle, spacing } from '@fe-monorepo/themes';
import { useSelector } from 'react-redux';
import { RootState } from '@fe-monorepo/store';
import Typography from '../../../assets/typography';
import { translate } from '@fe-monorepo/helper';

type statsProps = {
  following?: string;
  followers?: string;
  xp?: number;
};

const UserStats = (props: statsProps) => {
  const { followers, following, xp } = props;
  const { isRTL, themes } = useSelector((state: RootState) => state.app);

  return (
    <View style={styles.userStatsContainer}>
      <View style={[styles.statsV, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
        <View style={styles.valueV}>
          <Text style={styles.statsValue}>{following}</Text>
          <Text style={[styles.statsLable, { color: getStyle(themes).textColor70 }]}>{translate('menu_following')}</Text>
        </View>
        <View style={[styles.separator, { backgroundColor: getStyle(themes).textColor05 }]} />
        <View style={styles.valueV}>
          <Text style={styles.statsValue}>{followers}</Text>
          <Text style={[styles.statsLable, { color: getStyle(themes).textColor70 }]}>{translate('menu_followers')}</Text>
        </View>
        <View style={[styles.separator, { backgroundColor: getStyle(themes).textColor05 }]} />
        <View style={styles.valueV}>
          <Text style={styles.statsValue}>{xp}</Text>
          <Text style={[styles.statsLable, { color: getStyle(themes).textColor70 }]}>{translate('menu_xp')}</Text>
        </View>
      </View>
    </View>
  );
};

export default UserStats;

const styles = StyleSheet.create({
  userStatsContainer: { paddingHorizontal: spacing[20], marginTop: spacing[24] },
  statsV: { alignItems: 'center', justifyContent: 'space-evenly' },
  valueV: { flex: 1, alignItems: 'center' },
  statsValue: StyleSheet.flatten([Typography.bodyMedium, { color: colors.sunset }]),
  statsLable: StyleSheet.flatten([Typography.captionRegular, { marginTop: spacing[4] }]),
  separator: { width: 2, height: 32 }
});
