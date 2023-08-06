import { IconNames } from '@fe-monorepo/helper';

type SocialMediaAuthentication = {
  text: string;
  hoverStyle: string;
  type?: string,
  icon: {
    name: IconNames;
    defaultStyle: string;
    hoverStyle: string;
    dimensions:
    {
      [index: string]: { height: number; width: number }
    };
  };
  authenticate?: () => void;
  onClick?: () => void;
};

export default SocialMediaAuthentication;
