import { useRef } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@fe-monorepo/store';

import { useComponentIsAppear } from '../../../lib/hooks/useComponentIsAppear/useComponentIsAppear';

import Header from './Header';
import Footer from './Footer';
import ShopCard from './ShopCard';
import Banner from './Banner';
import CompeteCard from './CompeteCard';
import SocialTimelineCard from './SocialTimelineCard';
import ConnectCard from './ConnectCard';

function CorporateLanding(props: { hideDynamicBanner: boolean }) {
  const bannerRef = useRef(null);
  const shopCardRef = useRef(null);
  const chatSectionRef = useRef(null);

  const isRtl = useSelector((state: RootState) => state.app.isRTL);
  const dir = isRtl ? 'rtl' : 'ltr';

  const isBannerSectionAppear = useComponentIsAppear(bannerRef);
  const isShopCardAppear = useComponentIsAppear(shopCardRef);
  const isChatSectionAppear = useComponentIsAppear(chatSectionRef);

  return (
    <div dir={dir} className={`overflow-clip`}>
      <Header />

      <Banner
        bannerRef={bannerRef}
        shopCardRef={shopCardRef}
        isBannerSectionAppear={isBannerSectionAppear?.isIntersecting}
        isChatSectionAppear={isChatSectionAppear?.isIntersecting}
        isShopCardAppear={isShopCardAppear?.isIntersecting}
      />

      <SocialTimelineCard
        isBannerSectionAppear={isBannerSectionAppear?.isIntersecting}
        isChatSectionAppear={isChatSectionAppear?.isIntersecting}
        isShopCardAppear={isShopCardAppear?.isIntersecting}
      />

      <ShopCard
        shopSectionRef={shopCardRef}
        isBannerSectionAppear={isBannerSectionAppear.isIntersecting}
        isChatSectionAppear={isChatSectionAppear?.isIntersecting}
        isShopSectionAppear={isShopCardAppear?.isIntersecting}
      />

      <ConnectCard
        ConnectSectionRef={chatSectionRef}
        isBannerSectionAppear={isBannerSectionAppear.isIntersecting}
        isChatSectionAppear={isChatSectionAppear?.isIntersecting}
        isShopSectionAppear={isShopCardAppear?.isIntersecting}
      />

      <CompeteCard hideDynamicBanner={props.hideDynamicBanner} />

      <Footer />
    </div>
  );
}

export default CorporateLanding;
