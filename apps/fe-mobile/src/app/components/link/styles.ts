import spacing from 'libs/themes/src/spacing';
import { StyleSheet } from 'react-native';
import Typography from '../../assets/typography';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  textStyle: {lineHeight: 24, ...Typography.bodyRegular}  
});
