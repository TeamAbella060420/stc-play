const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const { join } = require('path');
const { globalStyle } = require('../../libs/themes/src/index');
const { spacing } = require('../../libs/themes/src/spacing');
const { colors, light, dark } = require('../../libs/themes/src/colors');
const { webFontSizes } = require('../../libs/themes/src/fontSizes');

delete spacing.spacing;

delete colors.colors;
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, '{src,pages,components}/**/*!(*.stories|*.spec).{ts,tsx,html}'),
    ...createGlobPatternsForDependencies(__dirname)
  ],
  theme: {
    extend: {
      colors: colors,
      spacing: spacing,
      fontFamily:
      {

        thin: ["STCForward-Thin"],
        thinItalic: ["STCForward-ThinItalic"],

        light: ["STCForward-Light"],
        lightItalic: ["STCForward-LightItalic"],

        regular: ["STCForward-Regular"],
        italic: ["STCForward-Italic"],

        medium: ["STCForward-Medium"],
        mediumItalic: ["STCForward-MediumItalic"],

        bold: ["STCForward-Bold"],
        boldItalic: ["STCForward-BoldItalic"],

        extraBold: ["STCForward-ExtraBold"],
        extraBoldItalic: ["STCForward-ExtraBoldItalic"]
      },
      fontSize: webFontSizes
    },
    screens: {
      xs: {min: '320px', max: '374px'},
      xsMax: { min: '375px', max: '767px'},
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
      '4xl': '2560px',
      '5xl': '3840px',
      '6xl': '4096px',
      '8xl': '7680px'
    }
  },
  plugins:
  [
    require('tailwindcss-themer')({
      defaultTheme: {
        extend: {
          colors: light.colors
        }
      },

      themes: [
        {
          name: 'dark',
          extend: {
            colors: dark.colors
          }
        }
      ]
    })
  ]
};
