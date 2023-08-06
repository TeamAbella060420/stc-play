import { useSelector } from 'react-redux';

import { RootState } from '@fe-monorepo/store';
import { IconNames } from '@fe-monorepo/helper';

import { useHeaderState } from 'apps/fe-web/src/lib/hooks/useHeaderState/useHeaderState';

import Text from '../../components/Text';
import Icon from '../../common/Icon';

interface DiscoverPlatform {
  isShopCardAppear: boolean;
}

const DiscoverPlatformComponent = (props: DiscoverPlatform) => {
  const prefs = useSelector((state: RootState) => state.app);
  const dir = prefs?.language === 'en' ? `ltr` : `rtl`;
  const innerWidth = useHeaderState()?.innerWidth;

  return (
    <div
      className={`font-light py-[40px] md:py-[56px] 5xl:py-[100.8px] 8xl:py-[224px] text-mobileSubtitle text-center flex flex-col items-center w-[335px] lg:w-[792px] 5xl:w-[1496px] 8xl:w-[3016px] mx-auto`}
    >
      <Text
        divStyle={`duration-[3s] ${props.isShopCardAppear ? 'text-white100' : 'text-black70'}
          text-mobileSubtitle sm:text-subtitle 5xl:text-fourKSubtitle 8xl:text-eightKSubtitle tracking-[-1%]`}
        label={'common_oneStopShop'}
      />
      
      <Text
        divStyle={`pt-20 sm:pt-32 gap-8 text-sunset flex items-center text-mobileSubtitle sm:text-subtitle 5xl:text-fourKSubtitle 8xl:text-eightKSubtitle hover:cursor-pointer underline-${dir}-animation after:bottom-[-0.5rem] after:bg-sunset`}
        label={'common_discoverPlatform'}
        Icon={
          <Icon
            name={IconNames.arrow}
            className={`rtl:rotate-180 fill-sunset`}
            width={innerWidth > 7679 ? 90 : innerWidth > 3839 ? 40 : innerWidth > 2559 ? 29 : 22}
            height={innerWidth > 7679 ? 90 : innerWidth > 3839 ? 40 : innerWidth > 2559 ? 29 : 22}
          />
        }
      />
    </div>
  );
};

export default DiscoverPlatformComponent;
