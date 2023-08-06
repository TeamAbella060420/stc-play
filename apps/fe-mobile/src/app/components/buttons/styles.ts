import spacing from 'libs/themes/src/spacing';
import { StyleSheet } from 'react-native';
import Typography from '../../assets/typography';

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderRadius: spacing[2],
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  iconContainer: {
    padding: 13,
    borderWidth: 1,
    borderRadius: spacing[2],
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  iconLeft: {
    left: 20,
    position: 'absolute'
  },

  iconRight: {
    right: 20,
    position: 'absolute'
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  textStyle: Typography.bodyMedium,
  iconStyle: { width: 16, height: 16 },
  iconLabelStyle: { width: 16, height: 16, marginLeft: 12 }
});
