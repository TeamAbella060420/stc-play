import React from 'react';
import { IMAGES } from '@fe-monorepo/assets';

import { useHeaderState } from '../../../lib/hooks/useHeaderState/useHeaderState';

import DiscoverPlatform from './DiscoverPlatform';
import DynamicText from './DynamicText';

interface bannerProps {
  bannerRef: any;
  shopCardRef: any;
  isShopCardAppear: boolean;
  isBannerSectionAppear: boolean;
  isChatSectionAppear: boolean;
}

//  min-h-[150vh] md:min-h-[170vh]
const HomePageBannerComponent = (props: bannerProps) => {
  const { discoverRef } = useHeaderState();

  return (
    <div className="relative w-screen font-regular select-none">

      {
        // this div is NOT visible it's just used to handle header theme
        <div ref={discoverRef} className={`absolute w-full bg-red z-[-100] 
          h-[100px] top-[141px]
          sm:top-[194px]
          xl:h-[200px] xl:top-[205px]
          5xl:top-[488px]
          8xl:top-[1310px]
        `}/>
      }

      <div
        ref={props?.bannerRef}
        className={`font-regular w-full duration-[1s] flex flex-col z-0 ${
          props?.isChatSectionAppear
            ? `bg-black`
            : props.isShopCardAppear
            ? `bg-purple`
            : props.isBannerSectionAppear
            ? `bg-white`
            : `bg-white`
        }`}
      >
        <div className="absolute bg-purple w-screen h-500 md:h-655 lg:h-765 xl:h-1050 5xl:h-2319 8xl:h-4585" />

        <div className={`pl-5 sm:px-5 xl:px-120 5xl:px-[400px] 8xl:px-[800px] z-[1] `}>
          <DynamicText />

          <div className={`min-w-[550px] aspect-[16/9] rounded-lg relative`}>
            <img className={`w-full`} src={IMAGES.BannerPlaceholder.toString()} alt="banner" />
          </div>
        </div>
      </div>

      {/* px-5 md:px-120 pt-[147px] 2xl:pt-[435px] lg:pt-[147px] sm:pt-[147px] */}
      <div
        className={`h-fit px-5 md:px-120 relative duration-[1s] ${
          props?.isChatSectionAppear
            ? `bg-black`
            : props.isShopCardAppear
            ? `bg-purple`
            : props.isBannerSectionAppear
            ? `bg-white`
            : `bg-white`
        }`}
      >
        <DiscoverPlatform isShopCardAppear={props.isShopCardAppear} />
      </div>
    </div>
  );
};

export default HomePageBannerComponent;
