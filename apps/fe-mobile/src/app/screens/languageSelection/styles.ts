import colors from 'libs/themes/src/colors';
import { StyleSheet } from 'react-native';
import Typography from '../../assets/typography';
import { spacing } from '@fe-monorepo/themes';

const styles = StyleSheet.create({
  container: { marginBottom: 0, paddingHorizontal: 0 },
  scrollContainer: { paddingHorizontal: 20, paddingVertical: 24 },
  mb100: { marginBottom: 100 },
  divider: { flex: 1, height: 1, marginVertical: 16 },
  btnStyle: { position: 'absolute', right: 20, left: 20, bottom: 50, paddingHorizontal: 20 }
});

export default styles;
