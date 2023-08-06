import colors from 'libs/themes/src/colors';
import { StyleSheet } from 'react-native';
import Typography from '../../assets/typography';
import { spacing } from '@fe-monorepo/themes';

const styles = StyleSheet.create({
  container: { marginBottom: 0, paddingHorizontal: 0 },
  listContainer: { paddingTop: 16, paddingBottom: 50, paddingHorizontal: 20 },
  category: { ...Typography.captionRegular, marginTop: 26 }
});

export default styles;
