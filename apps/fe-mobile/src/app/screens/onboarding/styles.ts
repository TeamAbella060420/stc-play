import colors from 'libs/themes/src/colors';
import spacing from 'libs/themes/src/spacing';
import { StyleSheet } from 'react-native';
import Typography from '../../assets/typography';
import { windowHeight, windowWidth } from '../../utils/Dimensions';

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center' },
  gradient: { position: 'absolute', width: '100%', height: '100%' },
  divider: {
    position: 'absolute',
    right: -100,
    height: windowHeight,
    width: 100,
    backgroundColor: colors.white100,
    transform: [{ rotate: '5deg' }, { scaleY: 1.1 }]
  },
  buttonNext: { zIndex: 5, position: 'absolute', bottom: 58 },
  buttonContainer: {
    position: 'absolute',
    bottom: 58,
    width: windowWidth,
    paddingHorizontal: spacing[20],
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  btnTxtContainer: { width: windowWidth * 0.43 },
  iconArrow: { width: spacing[24], height: spacing[24] },

  headerContainer: {
    zIndex: 5,
    marginTop: spacing[64],
    paddingHorizontal: spacing[20],
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    width: '100%'
  },
  stcLogo: { width: 113, height: 31 },
  skip: StyleSheet.flatten([Typography.bodyRegular, { color: colors.sunset, zIndex: 5, elevation: 7 }]),
  followContainer: {
    position: 'absolute',
    width: '200%',
    height: '100%'
  },
  bgColor: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: colors.purple,
    transform: [{ rotate: '5deg' }, { scaleY: 1.1 }]
  },
  scoreContainer: { position: 'absolute', flex: 1, width: '200%', height: '100%', alignItems: 'center', justifyContent: 'center' },
  scoreImgConsole: { height: windowHeight * 0.4, width: windowWidth * 0.8 },
  scoreImgController: { width: windowWidth * 0.8, height: windowHeight * 0.2, position: 'absolute', top: -100, zIndex: -10 },
  connectContainer: {
    position: 'absolute',
    width: '200%',
    height: '100%',
    alignItems: 'center'
  },
  connectImgMan: { width: windowWidth + windowWidth * 0.4, height: windowHeight, paddingBottom: 50 },
  connectImgMobile: { flex: 1, zIndex: -10 },
  nevermissContainer: {
    position: 'absolute',
    width: '200%',
    height: '100%'
  },
  nevermissImgMan: { width: windowWidth, height: windowHeight, alignSelf: 'center' },
  nevermissImgRectangle: { flex: 1, zIndex: -10 },
  bodyContainer: { position: 'absolute', bottom: 130, width: 227 },
  bodyContainerRTL: { right: 40, alignItems: 'flex-end' },
  bodyContainerLTR: { left: 40, alignItems: 'flex-start' },
  bodyTitle: StyleSheet.flatten([Typography.subtitleMedium, { color: colors.white100, marginVertical: spacing[20] }]),
  bodyDescription: StyleSheet.flatten([Typography.bodySmallRegular, { color: colors.white100 }])
});

export default styles;
