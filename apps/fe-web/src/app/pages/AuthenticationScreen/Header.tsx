import * as React from 'react';

import { RootState } from '@fe-monorepo/store';

import Icon from '../../common/Icon';
import { IconNames } from '@fe-monorepo/helper';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useAppState } from "libs/hooks/src/useAppState/useAppState";

import HoverText from '../../common/HoverText';

const Header = () =>
{
  const { changeLanguage } = useAppState()
  const prefs = useSelector((state: RootState) => state.app);
  const { t } = useTranslation();

  const changeLang = () => changeLanguage(prefs.language === "en"? "ar" : "en")

  return (
    <div className='relative
          min-w-[375px] w-full
          flex self-center sm:self-start
          py-40 sm:py-20 4xl:py-36 5xl:py-54 8xl:py-100
          px-20 sm:px-40 lg:px-120 8xl:px-203
          font-light text-white70
          text-body 4xl:text-subtitle 5xl:text-fourKSubtitle 8xl:text-LPTitle'
    >
      <div className='w-full flex items-center justify-between sm:justify-end'>
        <div className='flex sm:hidden items-center '>
          <Icon
            className="cursor-pointer fill-purple"
            name={IconNames.stcPlay}
            width={109}
            height={30}
          />
        </div>

          <HoverText
            className="text-black70 sm:text-white70"
            underlineStyle='
                  bg-black100 sm:bg-white100
                  h-[1px] 4xl:h-[1.77px] 5xl:h-[2.66px] 8xl:h-[5.333px]'

            hoverColor=' hover:text-black100 hover:sm:text-white100'

            text={t("common_browseInOtherLanguage")}
            onClick={changeLang}
          />
        </div>
    </div>
  );
}


export default Header
