import spacing from 'libs/themes/src/spacing';
import { StyleSheet } from 'react-native';
import Typography from '../../../assets/typography';
import { colors } from '@fe-monorepo/themes';

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing[20],
    paddingTop: spacing[16],
    paddingBottom: spacing[24]
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  rightContent: { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' },
  defaultLabelStyle: { marginLeft: spacing[16], ...Typography.bodyMedium },
  iconStyle: { marginLeft: spacing[12], width: 24, height: 24 },
  imgStyle: { width: 24, height: 24, borderRadius: 50, tintColor: colors.sunset }
});

export default styles;
