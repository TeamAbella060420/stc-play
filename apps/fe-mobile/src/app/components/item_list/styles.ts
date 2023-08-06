import spacing from 'libs/themes/src/spacing';
import { StyleSheet, Dimensions } from 'react-native';
import Typography from '../../assets/typography';
import { colors, getStyle } from '@fe-monorepo/themes';
import i18next from 'i18next';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  singleItemContainer: {
    paddingVertical: 8,
    flex: 1,
    flexDirection: i18next.t('config_row')
  },

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
    padding:2,
    margin: 4,
  },

  textStyle: {
    textAlign: i18next.t('config_align'),
    flex: 9,
    lineHeight: 24,
    ...Typography.bodyRegular
  },

  titleStyle: {
    textAlign: i18next.t('config_align'),
    ...Typography.bodyRegular
  },


  textActive: {
    color: colors.white100,
    ...Typography.captionSmall,
    justifyContent: 'center',
    textAlign: 'center',
    alignContent: 'center',
  },

  titleSmallStyle: {
    textAlign: 'left',
    flex: 9,
    lineHeight: 16,
    ...Typography.captionRegular
  },

  subTitleStyle: {
    textAlign: 'left',
    flex: 9,
    lineHeight: 16,
    ...Typography.captionRegular
  },

  rightContentStyle: { 
    flex: 1,
    alignItems: i18next.t('config_flex_reverse'),
    alignSelf: 'center',
  },

  iconStyle: { 
    width: 9.33, 
    height: 9.33,
    alignContent: 'center',
    alignItems: i18next.t('config_flex_reverse'),
  },

  iconLeft: {
    
  },

  iconRight: {

  },

  thumbnail: {
    width: 24,
    height: 24,
    padding: 8
  },

  largeThumbnail: {
    width: 148,
    height: 84,
    padding: 8
  },

  xlargeThumbnail: {
    width: windowWidth,
    height: (windowHeight / 5) + windowHeight / 40,
    backgroundColor: '#f6f6f6',
    alignSelf: 'center'
  },

  cardThumbnail: {
    width: (windowWidth/2) - 55, // minus spacing
    height: (windowHeight / 5) + windowHeight / 40,
    alignSelf: 'center'
  },

  active: {
    padding: 2,
    backgroundColor: colors.red,
    borderRadius: 2,
    position: 'absolute',
    alignItems: 'center',
    alignContent: 'center',
    bottom: -4
  },

  activeBorder: {
    backgroundColor: colors.red,
    borderRadius: 2
  },

  iconButtonStyle: {
    alignItems: i18next.t('config_flex_reverse'),
    padding: 10
  }
});
