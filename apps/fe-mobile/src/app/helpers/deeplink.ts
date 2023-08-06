
import { Linking } from 'react-native';

const screens = {
       SignIn:{
          path:'SignInScreen/googleSignin',
       },
       SignUp:{
          path:'SignUpScreen/googleSignup'
       }
};

export const deeplink = {
    prefixes: ['https://f9qt.adj.st', 'stcplayapp://', 'https://dev.stcplay.gg'],
    config: {
      screens: screens,
    },
    async getInitialURL() {
      // Check if app was opened from a deep link
      const url = await Linking.getInitialURL();
      if (url != null) {
        return url;
      }
    },
}