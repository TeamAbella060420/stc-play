import { StyleSheet, Platform } from 'react-native';
import Typography from '../../assets/typography';
import colors from 'libs/themes/src/colors';
import i18next from 'i18next';
import { spacing } from '@fe-monorepo/themes';

export const styles = (props?: any) =>
  StyleSheet.create({
    columnContainer: {
      flexDirection: 'column',
      justifyContent: i18next.t('config_flex'),
      width: '100%',
    },
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row'
    },
    inputContainer: {
      borderBottomWidth: 1,
      paddingVertical: 8,
      flexDirection: i18next.t('config_row')
    },
    label: StyleSheet.flatten([Typography.bodySmallRegular, { width: '100%', textAlign: i18next.t('config_align') }]),

    defaultLabel: {
      ...Typography.bodyRegular,
      lineHeight: Platform.OS === 'ios' ? 16 : 24,
    },
    focusedLabel: StyleSheet.flatten([Typography.bodySmallRegular]),
    errorMessage: {
      alignSelf: i18next.t('config_flex'),
      flexDirection: i18next.t('config_row'),
      paddingVertical: 4,
      color: colors.red
    },
    otpContainer: {
      justifyContent: 'space-between',
      width: '100%',
      gap: 8
    },
    otpInputContainer: {
      flex: 1,
      justifyContent: 'space-between',
      borderBottomColor: props?.lineColor,
      borderBottomWidth: 1
    },
    otpInputText: {
      width: '100%',
      textAlign: 'center',
      textAlignVertical: 'bottom',
      color: props?.textColor,
      lineHeight: 48
    },
    subContainer: {
      flexGrow: 1,
      height: '100%',
      justifyContent: 'space-between'
    },
    subValueText: {
      alignSelf: 'center',
      color: props?.textColor
    },
    subIcon: {
      aspectRatio: 1 / 1,
      width: 24,
      transform: [{ rotateZ: '90deg' }],
      alignSelf: 'center'
    },
    gap: {
      width: 8
    },
    stretch: {
      flexGrow: 10
    },
    inputText: {
      flexGrow: 14,
      flex: 14,
      color: props?.textColor
    },
    inputTextIcon: {
      flexShrink: 1,
      flex: 1,
      justifyContent: 'center'
    },

    containerTextWithIcon: {
      flexDirection: i18next.t('config_row'),
      alignItems: 'center',
      alignContent: 'center'
    },

    textIcon: {
      width: 14,
      height: 14,
      marginHorizontal: 4,
      marginTop: Platform.OS === 'android' ? -3 : 0
    },

    labelWithIcon: StyleSheet.flatten([Typography.bodySmallRegular, { textAlign: i18next.t('config_align') }]),

    iconLabelStyle: { width: 18, height: 14, resizeMode: 'contain' },
    otpError: {
      ...Typography.captionRegular,
      paddingTop: spacing[4],
      color: colors.red,
      textAlign: props?.isRTL ? 'right' : 'left'
    }
  });
