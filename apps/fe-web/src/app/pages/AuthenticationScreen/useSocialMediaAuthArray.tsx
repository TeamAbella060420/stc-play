
import { IconNames } from "@fe-monorepo/helper";
import SocialMediaAuthentication from "apps/fe-web/src/lib/types/socialMediaType";
import { useTranslation } from "react-i18next";


interface Props
{
  authenticate:
  {
    google: () => void,
    facebook: () => void,
    twitter: () => void
  }
}

const useSocialMediaAuthArray  = (props: Props): SocialMediaAuthentication[] =>
{
  const { authenticate } = props;

  const { t } = useTranslation();

  const socialMedia: SocialMediaAuthentication[] = [
    {
      text: t('common_loginByGoogle'),
      hoverStyle: 'hover:bg-white hover:border-black100',
      icon: {
        name: IconNames.googleFill,
        defaultStyle: '',
        hoverStyle: '',
        dimensions:
        {
            "normal": { height: 20, width: 20 },
            "2k": { height: 35.55, width: 35.55 },
            "4k": { height: 54, width: 54 },
            "8k": { height: 106, width: 106 }
        }
      },

      authenticate: authenticate.google
    },
    {
      text: t('common_loginByFacebook'),
      hoverStyle: 'hover:bg-blue hover:text-white100',
      icon:
      {
        name: IconNames.facebook,
        defaultStyle: 'fill-[#4689F7]',
        hoverStyle: 'fill-white100',
        dimensions:
        {
          "normal": { height: 35, width: 35 },
          "2k": { height: 62.22, width: 62.22 },
          "4k": { height: 100, width: 141 },
          "8k": { height: 186.66, width: 186.66 }
        }
      },

      authenticate: authenticate.facebook
    },
    {
      text: t('common_loginByApple'),
      hoverStyle: 'hover:bg-black100 hover:text-white100',
      icon: {
        name: IconNames.appleFill,
        defaultStyle: 'fill-black100',
        hoverStyle: 'fill-white100',
        dimensions:
        {
          "normal": { height: 25, width: 25 },
          "2k": { height: 44.44, width: 44.44 },
          "4k": { height: 66.66, width: 66.66 },
          "8k": { height: 133.33, width: 133.33 }
        }
      },
      type: 'apple'
    },
    {
      text: t('common_loginByTwitter'),
      hoverStyle: 'hover:bg-blue hover:text-white100',
      icon:
      {
        name: IconNames.twitter2,
        defaultStyle: 'fill-[#00ACEE]',
        hoverStyle: 'fill-white100',

        dimensions:
        {
          "normal": { height: 40, width: 40 },
          "2k": { height: 71.11, width: 71.11 },
          "4k": { height: 106, width: 106 },
          "8k": { height: 213.33, width: 213.33 }
        }
      },

      authenticate: authenticate.twitter
    }
  ];

  return socialMedia
}

export default useSocialMediaAuthArray;
