import { spacing } from '@fe-monorepo/themes';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: { marginBottom: 0, paddingHorizontal: 0, paddingBottom: 0 },
  contentPadding: { paddingHorizontal: spacing[20], paddingTop: spacing[24] },
  headerStyle: { borderBottomWidth: 1 }
});

export default styles;