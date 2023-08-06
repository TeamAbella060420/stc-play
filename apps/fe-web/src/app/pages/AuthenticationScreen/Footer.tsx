import * as React from 'react';

import { useNavigate } from 'react-router-dom';
import { RootState } from '@fe-monorepo/store';

import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import HoverText from '../../common/HoverText';




const Footer = () =>
{
  const prefs = useSelector((state: RootState) => state.app);
  const { t } = useTranslation();

  const navigate = useNavigate()

  return (
    <div className="

            self-center sm:self-end
            min-w-[375px] w-full
            z-[0]
            flex justify-between
            font-light
            text-caption 4xl:text-mobileSubtitle 5xl:text-title 8xl:text-huge
            text-white70

            border-solid
            border-t-[0.5px]
            border-black50 sm:border-white50
            backdrop-blur-xl
            px-20 sm:px-40 lg:px-120 8xl:px-203
            py-20 4xl:py-36 5xl:py-54 8xl:py-100
            absolute sm:relative bottom-0"
    >
        <div className=''>
          <HoverText
            text={t("common_backToMainPage")}
            className='text-black70 sm:text-white70'
            underlineStyle='bg-black100 sm:bg-white100
            h-[1px] 4xl:h-[1.77px] 5xl:h-[2.66px] 8xl:h-[5.333px]
            '
            hoverColor=' hover:text-black100 hover:sm:text-white100'
            onClick={() => navigate("/")}
          />
        </div>

        <div className='flex'>
          <HoverText
            className='
            me-24 4xl:me-44 5xl:me-72
            text-black70 sm:text-white70'
            underlineStyle='bg-black100 sm:bg-white100
            h-[1px] 4xl:h-[1.77px] 5xl:h-[2.66px] 8xl:h-[5.333px]
            '
            hoverColor=' hover:text-black100 hover:sm:text-white100'
            text={t("common_terms")}
          />

          <HoverText
            className='text-black70 sm:text-white70'
            underlineStyle='bg-black100 sm:bg-white100
            h-[1px] 4xl:h-[1.77px] 5xl:h-[2.66px] 8xl:h-[5.333px]
              '
            hoverColor=' hover:text-black100 hover:sm:text-white100'
            text={t("common_privacy")}
          />
        </div>
    </div>
  );
}


export default Footer
