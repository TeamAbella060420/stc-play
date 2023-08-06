import i18next from 'i18next';
import detector from 'i18next-browser-languagedetector';
import { initReactI18next, useTranslation } from 'react-i18next';
import { resources } from '@fe-monorepo/lang';
import en from 'libs/lang/en.json';

export const Translation = async (language: string) => {
  i18next
    .use(detector)
    .use(initReactI18next)
    .init({
      compatibilityJSON: 'v3',
      resources,
      lng: language,
      fallbackLng: 'en',
      keySeparator: false,
      interpolation: { escapeValue: false }
    });
};

type DefaultLocale = typeof en;

type RecursiveKeyOf<TObj extends Record<string, any>> = {
  [TKey in keyof TObj & string]: TObj[TKey] extends Record<string, any> ? `${TKey}` | `${TKey}.${RecursiveKeyOf<TObj[TKey]>}` : `${TKey}`;
}[keyof TObj & string];

export type TxKeyPath = RecursiveKeyOf<DefaultLocale>;

export const translate = (key: TxKeyPath) => {
  const { t } = useTranslation();
  return key ? t(key) : null;
};
