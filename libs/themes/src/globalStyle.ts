import colors from './colors';
import { Style } from './globalStyleType';

export const globalStyle: Style = {
  light: {
    backgroundColor: colors.white100,
    drawerActiveTintColor: '#CCCCCC',
    textColor: colors.black100,
    textColor05: colors.black05,
    textColor10: colors.black10,
    textColor20: colors.black20,
    textColor50: colors.black50,
    textColor70: colors.black70,
    textColorDisabled: colors.black42,
    textLabelColor: colors.black70,
    primaryColor: colors.black100,
    secondaryColor: colors.black50,
    disabledColor: colors.black20,
    iconColor: colors.black100,
    buttonSecondaryColor: colors.black100,
    buttonBorderColor: colors.black20,
    buttonLabelSecondaryColor: colors.black100,
    buttonDisabledColor: colors.black10,
    buttonLabelDisabledColor: colors.black30,
    sunsetColor: colors.lightSunset
  },

  dark: {
    backgroundColor: colors.black100,
    drawerActiveTintColor: '#CCCCCC',
    textColor: colors.white100,
    textColor05: colors.white10,
    textColor10: colors.white10,
    textColor20: colors.white20,
    textColor50: colors.white50,
    textColor70: colors.white70,
    textColorDisabled: colors.white50,
    textLabelColor: colors.white70,
    iconColor: colors.white100,
    primaryColor: colors.white100,
    secondaryColor: colors.white50,
    disabledColor: colors.white20,
    buttonSecondaryColor: colors.white100,
    buttonBorderColor: colors.white100,
    buttonLabelSecondaryColor: colors.white100,
    buttonDisabledColor: colors.white10,
    buttonLabelDisabledColor: colors.white30,
    sunsetColor: colors.darkSunset
  },

  custom: {
    backgroundColor: colors.darkPurple,
    drawerActiveTintColor: '#CCCCCC',
    textColor: colors.black100,
    textColor05: colors.white05,
    textColor10: colors.white10,
    textColor20: colors.white20,
    textColor50: colors.black50,
    textColor70: colors.black70,
    textColorDisabled: colors.black42,
    textLabelColor: colors.black70,
    iconColor: colors.sunset,
    primaryColor: colors.white100,
    secondaryColor: colors.white50,
    disabledColor: colors.white20,
    buttonSecondaryColor: colors.sunset,
    buttonBorderColor: colors.white100,
    buttonLabelSecondaryColor: colors.black100,
    buttonDisabledColor: colors.white10,
    buttonLabelDisabledColor: colors.white30
  }
};

export const getStyle = (theme: string) => {
  return globalStyle[theme];
};
