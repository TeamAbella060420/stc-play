import spacing from 'libs/themes/src/spacing';
import { StyleSheet } from 'react-native';
import i18next from 'i18next';

export const styles = StyleSheet.create({
  container: {
    borderRadius: spacing[2],
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: i18next.t('config_row'),
  }
});
