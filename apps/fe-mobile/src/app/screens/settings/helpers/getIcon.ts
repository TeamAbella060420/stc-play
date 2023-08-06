import { IconProps } from '../../../helpers/icons';

export const getIcon = (item: string) => {
  let icon: IconProps['name'];
  switch (item) {
    case 'notification':
      icon = 'bellV3';
      break;
    case 'theme':
      icon = 'crescentV3';
      break;
    case 'language':
      icon = 'globeV3';
      break;
    case 'country':
      icon = 'mapMarkerV3';
      break;
    case 'currency':
      icon = 'cashV3';
      break;
    case 'accountinfo':
      icon = 'accountInfoV3';
      break;
    case 'email':
      icon = 'emailV3';
      break;
    case 'sms':
      icon = 'smsV3';
      break;
    case 'inapp':
      icon = 'bellGearV3';
      break;
    case 'logout':
      icon = 'logoutV3';
      break;
    default:
      icon = 'crescentV3';
      break;
  }
  return icon;
};
