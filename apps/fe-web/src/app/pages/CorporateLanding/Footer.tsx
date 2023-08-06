/* eslint-disable no-restricted-globals */
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { RootState } from '@fe-monorepo/store';
import { IconNames } from '@fe-monorepo/helper';

import Icon from '../../common/Icon';
import TooltipContainer from '../../common/TooltipContainer';

const socialMediaList = [
  {
    icon: IconNames.facebook,
    link: 'https://www.facebook.com/stcplay.hub/'
  },
  {
    icon: IconNames.twitter2,
    link: 'https://twitter.com/stcplay?lang=en'
  },
  {
    icon: IconNames.instagram2,
    link: 'https://www.instagram.com/stcplay/?hl=en'
  },
  {
    icon: IconNames.youtube2,
    link: 'https://www.youtube.com/@stcplay1125'
  },
  {
    icon: IconNames.linkedin,
    link: ''
  }
];

const appStoreList = [
  {
    icon: IconNames.appleStore,
    width: innerWidth >= 7680 ? 472 : innerWidth >= 3860 ? 212.4 : 118,
    height: innerWidth >= 7680 ? 152 : innerWidth >= 3860 ? 68.4 : 40,
    link: 'https://apps.apple.com/us/app/stc-play/id1558331986'
  },
  {
    icon: IconNames.googlePlay,
    width: innerWidth >= 7680 ? 540 : innerWidth >= 3860 ? 243 : 135,
    height: innerWidth >= 7680 ? 160 : innerWidth >= 3860 ? 72 : 40,
    link: 'https://play.google.com/store/apps/details?id=com.stc.xplay&hl=en&gl=US'
  }
];

const FooterSectionLinks = (props: { title: string; links: string[] }) => {
  const prefs = useSelector((state: RootState) => state.app);
  const dir = prefs?.language === 'en' ? `ltr` : `rtl`;

  return (
    <div className="flex flex-col  rtl:items-end rtl:text-right ">
      <div className="md:h-40 5xl:h-[55px] flex md:items-center text-white100 w-[195px] rtl:justify-end">
        <p className="text-bodyLarge 5xl:text-[32.4px] 5xl:leading-[43.2px] 8xl:text-[72px] 8xl:leading-[96px]">{props.title}</p>
      </div>

      <div className=" md:h-[90px] 5xl:h-[120px] 8xl:h-[240px] flex flex-col text-bodySmall 5xl:text-[25.2px] 5xl:leading-9 8xl:text-[56px] 8xl:leading-[80px] cursor-pointer text-white70 rtl:items-end rtl:text-right">
        {props?.links.map(link => (
          <p
            key={link}
            className={`mt-16 md:mt-8 5xl:mt-[30.8px] 8xl:mt-[66px] rtl:flex-row-reverse hover:cursor-pointer underline-${dir}-animation after:bottom-[-0rem] after:bg-white100 w-fit hover:text-white100`}
          >
            {link}
          </p>
        ))}
      </div>
    </div>
  );
};

const Footer = () => {
  const { t } = useTranslation();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const prefs = useSelector((state: RootState) => state.app);
  const dir = prefs?.language === 'en' ? `ltr` : `rtl`;

  const links2 = [t('common_privacy'), t('common_terms'), t('common_legal'), t('common_accessibility')];

  return (
    <div className="self-end z-[1] w-full flex flex-col justify-center bg-purple font-light overflow-hidden">
      <div className="flex z-[1] flex-col border-t-[1px] border-solid	border-moonlight pt-40 md:pt-56 pb-40 md:pb-32 px-5 xl:px-120 5xl:px-[400px] 8xl:px-[800px]">
        <div className="flex flex-col md:flex-row justify-between w-full ">
          <div className="w-[281px] 5xl:w-[488px] 8xl:w-[972px] me-24">
            <Icon
              className="me-16 cursor-pointer fill-white100"
              name={IconNames.stcPlay}
              width={windowWidth >= 7680 ? 405.2 : windowWidth >= 3860 ? 303 : 183.67}
              height={windowWidth >= 7680 ? 200.04 : windowWidth >= 3860 ? 91 : 50}
            />

            <p className="text-white70 text-bodySmall 5xl:text-[27px] 5xl:leading-9 8xl:text-[60px] 8xl:leading-[80px] mt-12 md:mt-20 5xl:mt-36">
              {t('common_discoverMsg')}
            </p>
          </div>

          <div
            className="flex mt-40 md:mt-0 5xl:mt-40 rtl:flex-row-reverse justify-between w-full md:w-auto 5xl:w-[900px] 8xl:w-[2100px] md:justify-start  md:flex-row"
            dir="ltr"
          >
            <FooterSectionLinks title={t('common_about')} links={[t('common_ourStory'), t('common_partnership'), t('common_news')]} />

            <div className=" md:mt-0 md:ms-24 5xl:ms-[400px] 8xl:ms-[800px]">
              <FooterSectionLinks title={t('common_support')} links={[t('common_FAQs'), t('common_contactUs')]} />
            </div>
          </div>
        </div>

        <div className=" w-full flex flex-col md:flex-row md:items-center md:justify-between mt-40 md:mt-64 5xl:mt-[120px] 8xl:mt-[240px]">
          <div className="flex rtl:justify-end rtl:flex-row-reverse">
            {appStoreList.map((appStoreObj, index) => {
              return (
                <div key={index} onClick={() => window.open(appStoreObj.link, '_blank', 'noopener,noreferrer')}>
                  <Icon className="me-16 cursor-pointer" name={appStoreObj.icon} width={appStoreObj.width} height={appStoreObj.height} />
                </div>
              );
            })}
          </div>

          <div dir="ltr" className="flex rtl:justify-end md:justify-start mt-40 md:mt-0">
            {socialMediaList.map((socialObj, index) => (
              <div key={index} onClick={() => socialObj.link && window.open(socialObj.link, '_blank', 'noopener,noreferrer')}>
                <Icon
                  key={socialObj.icon}
                  className="me-16 cursor-pointer fill-white100 bg-transparent/opacity-0"
                  name={socialObj.icon}
                  width={windowWidth >= 7680 ? 200 : windowWidth >= 3890 ? 90 : 50}
                  height={windowWidth >= 7680 ? 200 : windowWidth >= 3890 ? 90 : 50}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Links 2 */}
      <div className="flex z-[1] text-bodySmall 5xl:text-subtitle 8xl:text-mobileDynamic flex-col md:flex-row md:justify-between w-full py-32 md:py-40 px-20 md:px-120 5xl:px-[400px] 8xl:px-[800px] text-white70 text-bodySmall border-t-[1px] border-solid	border-moonlight whitespace-nowrap">
        <div className="flex items-center h-full">
          {links2.map(link => (
            <p
              key={link}
              className={`cursor-pointer me-24 hover:cursor-pointer underline-${dir}-animation after:bottom-[-0rem] after:bg-white100 w-fit hover:text-white100`}
            >
              {link}
            </p>
          ))}
        </div>

        <div className="h-full flex w-full mt-32 md:mt-0 md:justify-end items-center ">
          <p>{t('common_copyright')}</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
