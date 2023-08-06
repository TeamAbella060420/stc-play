import spacing from 'libs/themes/src/spacing';
import { StyleSheet, Dimensions } from 'react-native';
import Typography from '../../../assets/typography';
import { colors } from '@fe-monorepo/themes';
import i18next from 'i18next';


const windowWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  itemContainer: {
    paddingVertical: 8,
    flex: 1
  },

  textContainer: {
    alignItems: i18next.t('config_flex'),
    marginVertical: 8
  },

  imageContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    margin: 4,
  },

  thumbnail: {
    width: (windowWidth) - 40,
    height: 160,
    padding: 8
  },

  active: {
    position: 'absolute',
    padding: 3,
    backgroundColor: colors.red,
    top: 16,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  activeBorder: {
    backgroundColor: colors.red,
    borderRadius: 2
  },

  textActive: {
    color: colors.white100,
    ...Typography.subtitleSmall,
    justifyContent: 'center',
    textAlign: 'center',
    alignContent: 'center',
  },

  spacingLeft: {
    left: 16,
  },

  spacingRight: {
    right: 16,
  },

  subTitleStyle: {
    textAlign: i18next.t('config_align'),
    lineHeight: 16,
    ...Typography.bodyRegular
  },

  titleSmallStyle: {
    textAlign: i18next.t('config_align'),
    lineHeight: 16,
    marginTop: 4,
    color: colors.white100,
    ...Typography.captionRegular
  },

  badgesContainer : {
    position: 'absolute',
    flexDirection: i18next.t('config_row'),
    top: 16,
  },

  badges : {
    flexDirection: i18next.t('config_row'),
    paddingHorizontal: 4,
    borderRadius: 2,
    backgroundColor: colors.black50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  versus : {
    marginHorizontal: 16
  }
});
