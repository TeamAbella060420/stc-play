import { ImageSourcePropType } from 'react-native';
export * from './fonts';

type IImages = {
  [index: string]: ImageSourcePropType;
};

type SOCIALMEDIALINKTYPE = {
  [index: string]: string;
}

export const IMAGES: IImages = {
  AppleStore: require('./images/applestore.png'),
  Avatar: require('./images/avatar.png'),
  BannerPlaceholder: require('./images/Banner Placeholder.png'),
  ChatGamer:  require('./images/ChatGamer.png'),  
  Compete: require('./images/placeholder/Compete.png'),
  ContentCreater:  require('./images/ContentCreater.png'),  
  Discover: require('./images/placeholder/Discover.png'),
  FirstChallenger:  require('./images/FirstChallenger.png'),  
  GamerCard:  require('./images/GamerCard.png'),  
  GamingController: require('./images/GamingController.png'),
  GamingCup: require('./images/GamigCup.png'),  
  GamingHeadphones:  require('./images/GamingHeadphones.png'),  
  GamingKeyboard:  require('./images/GamingKeyboard.png'),  
  GamingKeyboard2:  require('./images/GamingKeyboard2.png'),
  GamingMouse:  require('./images/GamingMouse.png'),  
  Home: require('./images/placeholder/Home.png'),
  HomeMenuOutline: require('./icons/outline/icon_home_outline.svg'),
  HomePageDashboard: require('./images/HomePage.png'),
  IosScreenSTCPlay:  require('./images/IosScreenSTCPlay.png'),  
  IosScreenSTCPlayAr:  require('./images/IosScreenSTCPlayAr.png'), 
  ItunesCard:  require('./images/ItunesCard.png'),  
  MobileGamer:  require('./images/MobileGamer.png'),  
  MohammedAdnann:  require('./images/MohammedAdnann.png'),  
  MysteryChallenger: require('./images/MysteryChallenger.png'),  
  PlayStore: require('./images/playstore.png'),
  Ps5Console:  require('./images/Ps5Console.png'),    
  Ps5Controller:  require('./images/Ps5Controller.png'),  
  QrCode: require('./images/footerQrCode.png'),
  SecondChallenger:  require('./images/SecondChallenger.png'),  
  SekiroGif:  require('./images/SekiroGif.gif'),  
  Shop: require('./images/placeholder/Shop.png'),
  SignUpBackground: require('./images/SignUpBackground.png'),
  SignInBackground: require('./images/SignInBackground.png'),  
  SmileFace:  require('./images/SmileFace.png'),  
  VRGamer:  require('./images/VRGamer.png'),  
  XboxBlack:  require('./images/XboxBlack.png'),  
  DefaultPlaceholder: require('./images/placeholder/DefaultPlaceholder.png'),  
};

export const SOCIALMEDIALINK: SOCIALMEDIALINKTYPE = {
  facebook: 'https://www.facebook.com/stcplay.hub/',
  instagram: 'https://www.instagram.com/stcplay/?hl=en',  
  linkedin: 'https://www.linkedin.com/company/stc-pay/',
  twitter: 'https://twitter.com/stcplay?lang=en',
  youtube: 'https://www.youtube.com/channel/UCiTN5fHOYfUyl2yalDvZHmA?app=desktop',
  
}
