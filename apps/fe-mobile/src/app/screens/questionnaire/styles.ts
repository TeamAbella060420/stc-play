import { spacing } from '@fe-monorepo/themes';
import { StyleSheet } from 'react-native';
import Typography from '../../assets/typography';
import { windowWidth } from '../../utils/Dimensions';

const styles = StyleSheet.create({
  container: { marginBottom: spacing[0] },
  title: StyleSheet.flatten([Typography.titleMedium, { marginTop: 50 }]),
  description: StyleSheet.flatten([Typography.bodySmallRegular, { marginTop: spacing[12] }]),
  mt32: { marginTop: spacing[32] },
  cardContainer: {
    flexDirection: 'row',
    paddingVertical: spacing[16],
    paddingLeft: 22,
    paddingRight: spacing[20],
    borderRadius: spacing[4],
    borderWidth: 1,
    marginBottom: spacing[12]
  },
  iconContainer: { width: 20, height: 20, marginRight: 14 },
  questionsLabel: StyleSheet.flatten([Typography.bodySmallRegular, { flex: 1 }]),
  stickyBottomContainer: {
    zIndex: 5,
    borderTopWidth: 1,
    height: spacing[80],
    paddingVertical: 28,
    paddingHorizontal: spacing[20],
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  skip: StyleSheet.flatten([Typography.bodyRegular])
});

export default styles;
