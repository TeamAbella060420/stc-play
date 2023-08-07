import { Platform } from 'react-native';
import Config from "react-native-config";
import { STC_CONFIG_DEV, STC_CONFIG_LOCALHOST, STC_CONFIG_PROD, STC_CONFIG_STAGING } from '@fe-monorepo/helper';


export const getEnvironment = () => {
  let baseUrl = ''
  let apKey = ''
  let apiBaseUrl = ''
  let basicAuthUsername = ''
  let basicAuthPassword = ''

  //added condition for mobile
  const environment = process.env.NX_APP_ENVIRONMENT
  
  switch (environment) {

     case 'development':
       baseUrl = STC_CONFIG_DEV.bffBaseURL
       apiBaseUrl = STC_CONFIG_DEV.apiBaseURL
       basicAuthUsername = STC_CONFIG_DEV.basicAuthUsername
       basicAuthPassword = STC_CONFIG_DEV.basicAuthPassword
       apKey = Platform.OS === 'android' ? STC_CONFIG_DEV.apiAndroidKey : STC_CONFIG_DEV.apiIOSKey
     break;

     case 'production':
       baseUrl = STC_CONFIG_PROD.bffBaseURL
       apiBaseUrl = STC_CONFIG_PROD.apiBaseURL
       basicAuthUsername = STC_CONFIG_PROD.basicAuthUsername
       basicAuthPassword = STC_CONFIG_PROD.basicAuthPassword
       apKey = Platform.OS === 'android' ? STC_CONFIG_PROD.apiAndroidKey: STC_CONFIG_PROD.apiIOSKey
      break;

     case 'localhost':
       baseUrl = STC_CONFIG_LOCALHOST.bffBaseURL
       apiBaseUrl = STC_CONFIG_LOCALHOST.apiBaseURL
       basicAuthUsername = STC_CONFIG_LOCALHOST.basicAuthUsername
       basicAuthPassword = STC_CONFIG_LOCALHOST.basicAuthPassword
       apKey = Platform.OS === 'android' ? STC_CONFIG_LOCALHOST.apiAndroidKey: STC_CONFIG_LOCALHOST.apiIOSKey
      break;

      case 'staging':
        baseUrl = STC_CONFIG_STAGING.bffBaseURL
        apiBaseUrl = STC_CONFIG_STAGING.apiBaseURL
        basicAuthUsername = STC_CONFIG_STAGING.basicAuthUsername
        basicAuthPassword = STC_CONFIG_STAGING.basicAuthPassword
        apKey = Platform.OS === 'android' ? STC_CONFIG_STAGING.apiAndroidKey: STC_CONFIG_STAGING.apiIOSKey
       break;

     default:
       baseUrl = STC_CONFIG_DEV.bffBaseURL
       apiBaseUrl = STC_CONFIG_DEV.apiBaseURL
       basicAuthUsername = STC_CONFIG_DEV.basicAuthUsername
       basicAuthPassword = STC_CONFIG_DEV.basicAuthPassword
       apKey = Platform.OS === 'android' ? STC_CONFIG_DEV.apiAndroidKey: STC_CONFIG_DEV.apiIOSKey
      break;
  }
  console.log("baseUrl: ", baseUrl)
  
  return { baseUrl, apKey, apiBaseUrl, basicAuthUsername, basicAuthPassword};
};
