import { Platform, StyleSheet } from 'react-native';
import Typography from '../../assets/typography';
import spacing from 'libs/themes/src/spacing';
import { windowHeight, windowWidth } from '../../utils/Dimensions';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: windowWidth,
    height: windowHeight,
    paddingHorizontal: 0,
    marginBottom: 0
  },
  headerStyle: { borderBottomWidth: 0 },
  bodyContainer: { paddingHorizontal: spacing[20] },
  title: StyleSheet.flatten([Typography.bigTitleMobileMedium, { marginTop: spacing[32], marginBottom: spacing[16] }]),
  description: StyleSheet.flatten([Typography.bodyRegular, { marginBottom: spacing[16] }]),
  btnStyle: { marginTop: spacing[24] }
});

export default styles;
