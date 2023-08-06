import spacing from 'libs/themes/src/spacing';
import { StyleSheet, Dimensions } from 'react-native';
import Typography from '../../assets/typography';
import { colors } from '@fe-monorepo/themes';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({

  container: { marginBottom: 0, paddingHorizontal: 0 },
  headerContainer: {
    backgroundColor: colors.white100, 
    height: 82, 
    position: 'absolute', 
    zIndex: 9, 
    top: -82, 
    width: '100%', 
    alignItems: 'center',
    borderBottomWidth: 1, 
    borderBottomColor: colors.black20
  },

  headerText: {
    ...Typography.captionRegular,
    textAlign: 'center',
    position: 'absolute',
    flex: 1,
    bottom: 8
  },

  containerStyle: {
    marginTop: -20,
    paddingBottom: 20,
    minHeight: windowHeight + 40
  },

  headerItemContainer: {
    paddingVertical: 8,
    marginHorizontal: 2,
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1
  },

  textContainer: {
    alignItems: 'flex-start',
    marginVertical: 8
  },

  textStyle: {
    textAlign: 'left',
    flex: 9,
    lineHeight: 24,
    ...Typography.bodyRegular
  },

  iconStyle: { 
    width: 9.33, 
    height: 9.33,
    flex: 1,
    alignContent: 'center',
    alignItems: 'flex-end'
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  thumbnail: {
    width: 16,
    height: 16
  },

  thumbnailOval: {
    width: 24,
    height: 24,
    marginRight: 8,
    borderRadius: 12
  },

  thumbnailOvalActive: {
    width: 32,
    height: 32,
    padding: 2,
    borderRadius: 16,
    borderColor: colors.red,
    borderWidth: 2
  },
  
  thumbnailRectangle: {
    width: 56,
    height: 32,
    borderRadius: 2
  },

   thumbnailRectangleActive: {
    width: 56,
    height: 32,
    borderRadius: 2,
    borderColor: colors.red,
    padding: 2,
    borderWidth: 2
  }  
});
