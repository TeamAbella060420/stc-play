import spacing from 'libs/themes/src/spacing';
import { StyleSheet, Platform } from 'react-native';
import Typography from '../../../assets/typography';
import { colors } from '@fe-monorepo/themes';

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing[20],
    paddingTop: spacing[16],
    paddingBottom: spacing[24]
  },
  leftContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  rightContent: { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' },
  defaultLabelStyle: { marginLeft: spacing[16], ...Typography.bodyMedium },
  iconStyle: { marginLeft: spacing[12], width: 24, height: 24 },
  imgStyle: { width: 24, height: 24, borderRadius: 50, tintColor: colors.sunset },
  clearText: { paddingHorizontal: spacing[20], ...Typography.bodySmallRegular, lineHeight: Platform.OS === 'ios' ? 0 : 20},
  clearTextContainer: { position: 'absolute', right: spacing[20], alignItems: 'center', paddingTop: 2},
  textBorderOnFocus: { },
  textBorderOnBlur: {}
});

export default styles;
