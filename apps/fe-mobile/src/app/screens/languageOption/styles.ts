import colors from 'libs/themes/src/colors';
import spacing from 'libs/themes/src/spacing';
import { StyleSheet } from 'react-native';
import { windowHeight, windowWidth } from '../../utils/Dimensions';
import Typography from '../../assets/typography';

const styles = StyleSheet.create({
  languageContainer: { flex: 1, backgroundColor: colors.white100 },
  englishV: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderBottomLeftRadius: spacing[8],
    borderBottomRightRadius: spacing[8]
  },
  arabicV: {
    flex: 1,
    alignItems: 'center',
    borderTopLeftRadius: spacing[8],
    borderTopRightRadius: spacing[8]
  },
  chooseLanguage: StyleSheet.flatten([
    Typography.bigTitleMobileMedium,
    { width: 281, textAlign: 'center', position: 'absolute', bottom: 192, zIndex: 10 }
  ]),
  buttonStyle: { borderRadius: spacing[8], borderColor: colors.black20 },
  btnLabel: StyleSheet.flatten([Typography.subtitleRegular, { position: 'absolute', left: spacing[24], bottom: spacing[40] }]),
  btnLabelAR: StyleSheet.flatten([Typography.subtitleRegular, { position: 'absolute', right: spacing[24], top: spacing[40] }]),
  buttonArrow: {
    zIndex: 5,
    position: 'absolute',
    padding: 13,
    borderRadius: spacing[2],
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: colors.sunset,
    bottom: 36,
    right: spacing[24]
  },
  buttonArrowAR: {
    zIndex: 5,
    position: 'absolute',
    padding: 13,
    borderRadius: spacing[2],
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: colors.sunset,
    top: 36,
    left: spacing[24]
  },
  arrowIcon: { width: spacing[24], height: spacing[24], tintColor: colors.white100 }
});

export default styles;
