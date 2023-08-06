import { useTranslation } from "react-i18next";
import { useState } from "react";
import Marquee from 'react-fast-marquee';
import { useSelector } from "react-redux";
import { t } from "i18next";

import { IconNames } from "@fe-monorepo/helper";
import { RootState } from "@fe-monorepo/store";

import TooltipContainer from "../../common/TooltipContainer";
import Icon from "../../common/Icon";

const MarqueeContainer = (props: { title: string; windowWidth: number, setMarqueePlaying: any }) => 
{
  const { t } = useTranslation();

  return (
    <div
      className='h-fit w-fit'
        onMouseEnter={() =>  props.setMarqueePlaying(false)}
        onMouseLeave={() =>  props.setMarqueePlaying(true)}
    >
      <TooltipContainer
        className="hidden md:block bg-white100 text-sunsetText px-16 py-8 text-body md:text-subtitle rounded-md select-none"
        content={
          <div
            className="flex items-center rtl:flex-row-reverse"
            >
            <p>{t('common_spin')}</p>

            <Icon
              className="ltr:ms-12 rtl:me-12 cursor-pointer stroke-sunset fill-sunset rtl:rotate-180"
              name={IconNames.arrow}
              width={25}
              height={25}
            />
          </div>
        }

      >
        <p
          className="relative font-medium text-[80px] 8xl:text-eightKDynamic leading-[97.12px] md:text-[200px] h-[190px] leading-[0px]  pt-32 flex  items-center justify-center text-transparent group-hover:text-sunsetText select-none tracking-tight mx-8 cursor-pointer"
          style={{
            WebkitTextStrokeColor: '#E84E13',
            WebkitTextStrokeWidth: props.windowWidth <= 480 ? 1 : 2
          }}
        >
          {props?.title}
        </p>
      </TooltipContainer>
    </div>
  );
};

const DynamicBanner = ()=>
{
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isMarqueePlaying, setMarqueePlaying] = useState(true);

    const prefs = useSelector((state: RootState) => state.app);
    return(
        <div className={`relative 8xl:py-160 self-end w-full flex flex-col justify-center bg-purple font-light overflow-hidden`}>
            <Marquee
            className="h-[285px] md:h-[451px] w-full relative flex items-center"
            direction={prefs.language === 'ar' ? 'right' : 'left'}
            gradient={false}
            speed={windowWidth >= 768 ? 150 : 75}
            style={{ direction: 'ltr' }}
            play={isMarqueePlaying}
            >
            {Array.from({ length: 100 }).map((content, index) => (
                <MarqueeContainer
                    key={index}
                    windowWidth={windowWidth}
                    title={t('common_bannerDiscover')}
                    setMarqueePlaying={setMarqueePlaying}
                />
            ))}
            </Marquee>
        </div>
    )
}

export default DynamicBanner;