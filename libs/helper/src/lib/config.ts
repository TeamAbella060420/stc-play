import { Platform } from 'react-native';
export interface STCConfig {
  bffBaseURL: string;
  apiBaseURL: string;
  websiteBaseURL: string;
  websiteURL: string;
  environment: string;
  apiAndroidKey: string;
  apiIOSKey: string;
  basicAuthUsername: string;
  basicAuthPassword: string;
}

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

export const firebaseIOSConfig: FirebaseConfig = {
  apiKey: "AIzaSyAGvglNQYL0zxbOOWmtlUuz-256YTfnMks",
  authDomain: "xplay-dev.firebaseapp.com",
  databaseURL: "https://xplay-dev-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "xplay-dev",
  storageBucket: "xplay-dev.appspot.com",
  messagingSenderId: "534490693632",
  appId: "1:534490693632:web:7778e15b91ac71915798e5",
  measurementId: "G-0H2XV5Q12L"
}


export const STC_CONFIG_DEV: STCConfig = {
  bffBaseURL: 'https://api-bff-dev.stcplay.gg/graphql/',
  apiBaseURL: 'https://api-dev.stcplay.gg/',
  websiteBaseURL: 'https://dev.stcplay.gg/',
  websiteURL: 'https://www.dev.stcplay.gg/',
  environment: 'dev',
  apiAndroidKey: 'FsowvoI97Y1oxIFgVEZF28YJMslVu6HT7UBAhLKT',
  apiIOSKey: 'KJLbzUrNShaslUQqq4ZyK5x3FBDpB0oP1P8SQcLg',
  basicAuthUsername: '45pmcek6i6cm51u9kl0l2pa29g',
  basicAuthPassword: 'irfdp9m24l34ujec3884834q1ub3k28tq7k3iloodqprhttcmvk'
};

export const STC_CONFIG_PROD: STCConfig = {
  bffBaseURL: 'https://api-bff-dev.stcplay.gg/',
  apiBaseURL: '',
  websiteBaseURL: 'https://dev.stcplay.gg/',
  websiteURL: 'https://www.dev.stcplay.gg/',
  environment: 'prod',
  apiAndroidKey: 'VpLbsAHBDz1tF63YPsziNaVRaBlliDhj17AeV0eC',
  apiIOSKey: 'j7wJ3ObVGN7lojnTZ2tzSahre1IwLPyJd3qqVRL5',
  basicAuthUsername: 'sbdq9pn37s8tiaqm7n0ms1lec',
  basicAuthPassword: 'k8d4k3b1uutrcakfb0850alfj41qu57vqpfc8mcnsn4grmidm8o'
};

export const STC_CONFIG_LOCALHOST: STCConfig = {
  bffBaseURL: (Platform.OS === 'ios' ||Platform.OS === 'web') ? 'http://localhost:3333/graphql/' : 'http://10.0.2.2:3333/graphql/',
  apiBaseURL: 'https://api-dev.stcplay.gg/',
  websiteBaseURL: 'https://dev.stcplay.gg/',
  websiteURL: 'https://www.dev.stcplay.gg/',
  environment: 'localhost',
  apiAndroidKey: 'FsowvoI97Y1oxIFgVEZF28YJMslVu6HT7UBAhLKT',
  apiIOSKey: 'KJLbzUrNShaslUQqq4ZyK5x3FBDpB0oP1P8SQcLg',
  basicAuthUsername: '45pmcek6i6cm51u9kl0l2pa29g',
  basicAuthPassword: 'irfdp9m24l34ujec3884834q1ub3k28tq7k3iloodqprhttcmvk'
};


export const STC_CONFIG_STAGING: STCConfig = {
  bffBaseURL: 'https://api-bff-stg.stcplay.gg/graphql/',
  apiBaseURL: 'https://api-stg.stcplay.gg/',
  websiteBaseURL: 'https://dev.stcplay.gg/',
  websiteURL: 'https://www.dev.stcplay.gg/',
  environment: 'stg',
  apiAndroidKey: 'tB87UvsgKW7vI84hKjHqM3YljAxML5QwaLNoVPSv',
  apiIOSKey: 'fReLgdxr8v8YfPOgjcsONPpvd9uk7Vy5w4wKutn7',
  basicAuthUsername: '525fv7rqis8srvs6ted3vvk6ge',
  basicAuthPassword: 'a0gaqdoda1oltbeugr6vu7sg5bjv7lveal1es207njr4udh3ut4'
};

export enum LOGIN_TYPES {
  FACE_BOOK = 'facebook',
  TWITTER = 'twitter',
  GOOGLE = 'google',
  APPLE = 'apple'
}

export enum AUTH_SCREENS {
  SIGN_IN = 'signin',
  SIGN_UP = 'signup'
}

export enum OTP_TYPES_SCREENS {
  SIGN_IN_EMAIL_OTP = 'login',
  SIGN_UP_EMAIL_OTP = 'signup',
  EDIT_EMAIL_OTP = 'editEmail',
  RESET_PASSWORD = 'reset_password',
  ADDITIONAL_FIELDS = 'additional_fields'
}

export enum SOC_MED_TYPES {
  GOOGLE_SIGN_IN = 'googleSignin',
  GOOGLE_SIGN_UP = 'googleSignup',
  FACEBOOK_SIGN_IN = 'facebookSignin',
  FACEBOOK_SIGN_UP = 'facebookSignup',
  TWITTER_SIGN_UP = 'twitterSignup',
  TWITTER_SIGN_IN = 'twitterSignin'
}


export enum TOURNAMENT_TYPES
{
  FEATURED = "approved",
}

export enum CHANNEL {
  SMS = 'sms',
  EMAIL = 'email'
  //TODO ADD CHANNEL HERE
}
