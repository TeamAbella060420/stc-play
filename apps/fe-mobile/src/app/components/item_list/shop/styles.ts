import { StyleSheet, Dimensions } from 'react-native';
import Typography from '../../../assets/typography';
import { colors } from '@fe-monorepo/themes';
import i18next from 'i18next';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    paddingLeft: 2,
    marginRight: 8,
    marginBottom: 8,
    borderColor: colors.black10,
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 16,
    width: (windowWidth / 2) - 25 
  },
  cardThumbnail: {
    width: '90%', 
    height: (windowHeight / 5),
    alignSelf: 'center',
    marginBottom: 16
  },
  descriptionContainer: {
    flexDirection: 'column',
    paddingHorizontal: 8,
    paddingBottom: 8
  },
  priceContainer: {
    flexDirection: i18next.t('config_row'),
    alignItems: 'center'
  },
  reviewContainer: {
    marginTop: 8,
    flexDirection: i18next.t('config_row'),
    alignItems: 'center',
    alignContent: 'center'
  },
  favContainer: {
    flex: 1,
    position: 'absolute',
    top: 8,
    width: '100%',
    flexDirection: i18next.t('config_row'),
    zIndex: 9
  },
  discounted: {
    flex: 1,
    alignItems: i18next.t('config_flex'),
    padding: 2
  },
  discountedContainer: {
    backgroundColor: colors.sunset,
    borderRadius: 2,
    padding: 2
  },
  discountedText: {
    color: colors.white100
  },
  fav: {
    flex: 1,
    alignItems: i18next.t('config_flex_reverse')
  },
  favIcon: {
    justifyContent: 'center',
    padding: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 3
  },
  categoryName: {
    textAlign: i18next.t('config_align'),
    lineHeight: 16,
    ...Typography.bodySmallRegular
  },
  productName: {
    textAlign: i18next.t('config_align'),
    marginVertical: 8,
    ...Typography.bodySmallMedium
  },
  price: {
    textAlign: i18next.t('config_align'),
    ...Typography.bodyMedium
  },
  oldPrice: {
    textAlign: i18next.t('config_align'),
    ...Typography.bodySmallRegular,
    textDecorationLine: 'line-through'
  },
  totalRating: {
    textAlign: i18next.t('config_align'),
    ...Typography.bodySmallRegular
  }
});
