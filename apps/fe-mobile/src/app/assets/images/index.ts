import { ImageRequireSource, Image } from 'react-native';
import { ImagesTypes } from './type';

const images: ImagesTypes = {
  //APP LOGO
  stc_logo: require('./stc_logo.png'),

  //BACKGROUND IMAGES
  bg_mask_purple: require('./background/bg_mask_purple.png'),

  //BOTTOM TAB
  discover: require('./bottomtab/discover.png'),
  compete: require('./bottomtab/compete.png'),
  connect: require('./bottomtab/connect.png'),
  shop: require('./bottomtab/shop.png'),
  add: require('./bottomtab/add.png'),

  //ONBOARDING IMAGES
  follow_cash_bg: require('./onboarding/follow_cash_bg.png'),
  follow_man_main: require('./onboarding/folllow_man_main.png'),
  score_controller_bg: require('./onboarding/score_controller_bg.png'),
  score_console_main: require('./onboarding/score_console_main.png'),
  connect_mobile_bg: require('./onboarding/connect_mobile_bg.png'),
  connect_man_main: require('./onboarding/connect_man_main.png'),
  nevermiss_rectangle_bg: require('./onboarding/nevermiss_rectangle_bg.png'),
  nevermiss_man_main: require('./onboarding/nevermiss_man_main.png'),

  //RANDOM IMAGES
  profile_placeholder: require('./placeholders/profile_placeholder.png'),
  display_photo: require('./placeholders/display_photo_placeholder.png'),

  //ICON LIST
  icon_arrow_right: require('./icon_arrow_right.png'),
  icon_arrow_left: require('./icon_arrow_left.png'),
  icon_arrow: require('./icon_arrow.png'),
  twitter: require('./twitter.png'),
  google: require('./google.png'),
  facebook: require('./facebook.png'),
  apple: require('./apple.png'),
  icon_check_circle: require('./icon_check_circle.png'),
  icon_visibility: require('./visibility.png'),
  icon_close: require('./close.png'),
  icon_info: require('./icon_info.png'),
  img_Success: require('./temp_success.png'),
  icon_bell: require('./icon_bell.png'),
  icon_cart: require('./icon_cart.png'),
  icon_heart: require('./icon_heart.png'),
  icon_magnifying: require('./icon_magnifying.png'),
  icon_group: require('./icon_group.png'),
  icon_play_outline: require('./icon_play_outline.png')
};

export default images;

export const preloadImages = (images: ImagesTypes): Promise<void>[] => {
  const promises: Promise<void>[] = [];
  Object.keys(images).forEach((key: string) => {
    const imageSource: ImageRequireSource = images[key];
    if (typeof imageSource === 'number') {
      // If image source is a number, assume it's a local resource ID and convert to URI
      promises.push(
        new Promise((resolve, reject) => {
          const uri = Image.resolveAssetSource(imageSource).uri;
          Image.prefetch(uri)
            .then(() => resolve())
            .catch(error => reject(error));
        })
      );
    } else {
      // If image source is a string, assume it's a URI and prefetch directly
      promises.push(
        new Promise((resolve, reject) => {
          Image.prefetch(imageSource)
            .then(() => resolve())
            .catch(error => reject(error));
        })
      );
    }
  });
  return promises;
};
