import { StyleSheet, TextStyle } from 'react-native';
import fonts from 'libs/assets/src/fonts';
import colors from 'libs/themes/src/colors';

interface Typography {
  captionRegular: TextStyle;
  bodySmallRegular: TextStyle;
  bodyRegular: TextStyle;
  bodyLargeRegular: TextStyle;
  subtitleRegular: TextStyle;
  captionSmall: TextStyle;
  captionMedium: TextStyle;
  bodySmallMedium: TextStyle;
  bodyMedium: TextStyle;
  bodyLargeMedium: TextStyle;
  subtitleMedium: TextStyle;
  titleMedium: TextStyle;
  bigTitleMobileMedium: TextStyle;
  bigTitleWebMedium: TextStyle;
  hugeMobileMedium: TextStyle;
  hugeWebMedium: TextStyle;
  subtitleSmall: TextStyle;
}

const Typography = StyleSheet.create<Typography>({
  captionRegular: { fontFamily: fonts.STCForward, fontWeight: '400', fontSize: 12, lineHeight: 16 },
  bodySmallRegular: { fontFamily: fonts.STCForward, fontWeight: '400', fontSize: 14, lineHeight: 20 },
  bodyRegular: { fontFamily: fonts.STCForward, fontWeight: '400', fontSize: 16, lineHeight: 24 },
  bodyLargeRegular: { fontFamily: fonts.STCForward, fontWeight: '400', fontSize: 18, lineHeight: 24 },
  subtitleRegular: { fontFamily: fonts.STCForward, fontWeight: '400', fontSize: 24, lineHeight: 32 },
  captionSmall: { fontFamily: fonts.STCForwardMedium, fontWeight: '500', fontSize: 8 },
  captionMedium: { fontFamily: fonts.STCForwardMedium, fontWeight: '500', fontSize: 12, lineHeight: 16 },
  bodySmallMedium: { fontFamily: fonts.STCForwardMedium, fontWeight: '500', fontSize: 14, lineHeight: 20 },
  bodyMedium: { fontFamily: fonts.STCForwardMedium, fontWeight: '500', fontSize: 16, lineHeight: 24 },
  subtitleSmall: { fontFamily: fonts.STCForwardMedium, fontWeight: '500', fontSize: 10, lineHeight: 10 },
  bodyLargeMedium: { fontFamily: fonts.STCForwardMedium, fontWeight: '500', fontSize: 18, lineHeight: 24 },
  subtitleMedium: { fontFamily: fonts.STCForwardMedium, fontWeight: '500', fontSize: 24, lineHeight: 32 },
  titleMedium: { fontFamily: fonts.STCForwardMedium, fontWeight: '500', fontSize: 32, lineHeight: 36 },
  bigTitleMobileMedium: { fontFamily: fonts.STCForwardMedium, fontWeight: '500', fontSize: 36, lineHeight: 42 },
  bigTitleWebMedium: { fontFamily: fonts.STCForwardMedium, fontWeight: '500', fontSize: 40, lineHeight: 48 },
  hugeMobileMedium: { fontFamily: fonts.STCForwardMedium, fontWeight: '500', fontSize: 52, lineHeight: 60 },
  hugeWebMedium: { fontFamily: fonts.STCForwardMedium, fontWeight: '500', fontSize: 64, lineHeight: 68 }
});

export default Typography;
