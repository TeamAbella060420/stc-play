import './Header.scss';
import Button from '../Button';
import { useNavigate } from 'react-router';
import { AppRoutes } from '../../app.routes.enum';
import PopoverMenu from '../PopoverMenu';
import useDrawerToggle from '../../hooks/useDrawerToggle';
import ThemeToggle from './ThemeToggle';
import { useTranslation } from 'react-i18next';
import React from 'react';
import usePageLayout from '../../hooks/usePageLayout';
import ScaledIcon from '../../common/ScaledIcon';
import { IconNames } from '@fe-monorepo/helper';
import useTheme, { theme } from '../../hooks/useTheme';


const MenuLabel = (props: { text: string }) =>
{
  return (
    <p className='font-regular text-body 4xl:text-subtitle 5xl:text-bigTitle 8xl:text-LPTitle'>
      {props.text}
    </p>
  )
}


interface GuestProfileProps {
    btnClass?: string;
    handleLanguageToggle?: (value: string) => void;
}
const GuestProfile: React.FC<GuestProfileProps> = ({
    btnClass,
    handleLanguageToggle = () => {}
}) =>
{
    const { t } = useTranslation();
    const navigate = useNavigate();
    const open = useDrawerToggle(state => state.open);
    const { language, direction } = usePageLayout();

    const { setTheme, isDarkTheme } = useTheme();
    const handleToggleChange = (value: boolean) =>
    {
      console.log("Hello: ", value);

        setTheme(value ? theme.dark : theme.light);
    }

    return (
        <div className='cmp-guest-profile flex gap-20 4xl:gap-36 5xl:gap-54 8xl:gap-100 items-center h-full relative'>
            {
                !open && <div className='flex gap-20 4xl:gap-36 5xl:gap-54 8xl:gap-100 items-center'>
                    <div className='hidden md:block'>
                        <PopoverMenu
                            text={
                                <ScaledIcon
                                    className={`
                                      mt-4 4xl:mt-8 5xl:mt-[10.66px] 8xl:mt-22
                                      fill-secondary/50
                                      animate__animated animate__fadeIn`
                                    }
                                  name={IconNames.moreHorizon}
                                  normalWidth={20}
                                  normalHeight={20}
                                />
                            }
                            cssClassNames='w-200 4xl:w-[355.55px] 5xl:w-[533px] 8xl:w-1050 '

                            options={[
                            {
                                name:
                                    <MenuLabel
                                        text={t('menu_changeLanguage')}
                                    />
                                    ,
                                icon:

                                    <ScaledIcon
                                      className={`
                                        fill-secondary
                                        animate__animated animate__fadeIn`
                                      }
                                      name={IconNames.language}
                                      normalWidth={24}
                                      normalHeight={24}
                                    />
                                ,
                                rightIcon:
                                  <ScaledIcon
                                      className={`
                                        fill-secondary ltr:rotate-[270deg] rtl:rotate-90
                                        animate__animated animate__fadeIn`
                                      }
                                      name={IconNames.chevron}
                                      normalWidth={20}
                                      normalHeight={20}
                                  />
                                ,

                                children:
                                [
                                    {
                                        name:
                                        <span className={`
                                                text-body 4xl:text-subtitle 5xl:text-bigTitle 8xl:text-LPTitle
                                                font-regular text-secondary
                                                w-full
                                                ${language === 'en' ? 'text-sunset' : ''}`}
                                        >
                                              {t('lang_option_en')}
                                        </span>,
                                        icon:
                                          language === 'en'
                                        ?
                                            <ScaledIcon
                                              className={`
                                                fill-sunset
                                                animate__animated animate__fadeIn`
                                              }
                                              name={IconNames.checkFill}
                                              normalWidth={20}
                                              normalHeight={20}
                                            />
                                        :
                                          ''
                                        ,
                                        onClick: () => handleLanguageToggle('en'),
                                    },
                                    {
                                        name:
                                        <span className={`
                                                text-body 4xl:text-subtitle 5xl:text-bigTitle 8xl:text-LPTitle
                                                font-regular text-secondary
                                                w-full
                                                ${language === 'ar' ? 'text-sunset' : ''}`}
                                        >
                                              {t('lang_option_ar')}
                                        </span>
                                        ,
                                        icon: language === 'ar' ?
                                        <ScaledIcon
                                        className={`
                                          fill-sunset
                                          animate__animated animate__fadeIn`
                                        }
                                        name={IconNames.checkFill}
                                        normalWidth={20}
                                        normalHeight={20}
                                      /> : '',
                                        onClick: () => handleLanguageToggle('ar'),
                                    }
                                ]
                            },
                            {
                              name: <ThemeToggle text={t('dark')}/>
                            }
                        ]}/>
                    </div>
                </div>
            }
            <div className='hidden md:inline-block'>
                <Button
                    text={t('action_signin')}
                    style={`
                    w-full
                    px-24 4xl:px-[42.66px] 5xl:px-[90px] 8xl:px-180
                    py-8 4xl:py-[14px] 5xl:py-22 8xl:py-[42.66px]

                    rounded-[2px] 4xl:rounded-[4px] 5xl:rounded-[5.33px] 8xl:rounded-[10.62px]
                    text-body 4xl:text-subtitle 5xl:text-bigTitle 8xl:text-LPTitle
                    font-medium
                    text-white100
                    whitespace-nowrap
                  `}
                    normalStyle={btnClass}
                    onClick={() => navigate(AppRoutes.authSignIn)}
                />
            </div>
        </div>
    );
}

export default GuestProfile;
