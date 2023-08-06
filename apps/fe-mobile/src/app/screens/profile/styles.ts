import colors from 'libs/themes/src/colors';
import { StyleSheet } from 'react-native';
import Typography from '../../assets/typography';
import { spacing } from '@fe-monorepo/themes';

const styles = StyleSheet.create({
  container: { marginBottom: 0, paddingHorizontal: 0 },
  editProfile: { ...Typography.bodyRegular, color: colors.sunset },
  guestHeader: { backgroundColor: colors.purple, borderBottomWidth: 0 },
  guestTopView: { paddingBottom: 24 },
  dontBeStranger: StyleSheet.flatten([Typography.subtitleMedium, { textAlign: 'center', marginTop: 14, color: colors.white100 }]),
  guestSignin: StyleSheet.flatten([
    Typography.bodyRegular,
    { textAlign: 'center', marginVertical: spacing[16], color: colors.white100, paddingHorizontal: spacing[40] }
  ]),
  guestBottomView: { flex: 1, paddingHorizontal: 20, paddingVertical: 24 }
});

export default styles;
