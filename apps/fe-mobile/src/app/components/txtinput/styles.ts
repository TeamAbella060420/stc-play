import { spacing } from '@fe-monorepo/themes';
import { Platform, StyleSheet } from 'react-native';
import Typography from '../../assets/typography';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingVertical: Platform.OS === 'android' ? 0 : 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: spacing[4]
  },
  iconStyle: { width: 20, height: 20 },
  inputStyles: {
    flex: 1,
    ...Typography.bodyRegular,
    lineHeight: Platform.OS === 'ios' ? 0 : 24,
    alignItems: 'center'
   }
});

export default styles;
