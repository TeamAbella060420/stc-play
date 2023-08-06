import { t } from 'i18next';
import { useSelector } from 'react-redux';

import { ContentModel, SearchData, ShopModel } from '@fe-monorepo/models';
import { RootState } from '@fe-monorepo/store';

import ProductResult from './ProductResult';
import Spinner from '../../../components/Spinner';
import ProductCard from '../../../components/ProductCard/ProductCard';
import ProductCardSearch from '../../../components/ProductCardSearch/ProductCardSearch';
import LoadMore from '../../../components/LoadMore';
import useGetCurrentBreakPoint from 'apps/fe-web/src/lib/hooks/useGetCurrentBreakPoint/useGetCurrentBreakPoint';


import SearchSectionResult from '../Components/SearchSectionResult';

type SearchShopResultProps =
{
  shopData?: SearchData;
  isLoading: boolean;
  tabData?:[ContentModel]
  selectedTab:string
  loadMore:()=>void
  setSelectedTab: (key:string)=>void
};




const SearchShopResult = (props: SearchShopResultProps) =>
{
  const prefs = useSelector((state: RootState) => state.app);
  const dir = prefs?.isRTL ? 'rtl' : 'ltr';
  const { currentBreakPoint } = useGetCurrentBreakPoint();

  const isMobile = currentBreakPoint === "mobile";

  const SectionData = () =>
{
  return (
    <>
      {
        props?.selectedTab === "shop"
      ?
        <>
          <div className={`
                relative
                grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
                sm:gap-24 4xl:gap-[42.66px] 5xl:gap-64 8xl:gap-[128px]
            `}
          >
            {
              isMobile
            ?
                props?.tabData?.map((product, index) =>
                {
                  return <ProductResult key={index} product={product as ShopModel} />;
                })
            :
                props?.tabData?.map((product,index)=>
                {
                  return <ProductCardSearch key={index} tabData={product} />
                })
            }
          </div>

          <LoadMore
              isLoading={props?.isLoading}
              loadMore={props?.loadMore}
          />
        </>
        :
          props?.shopData?.result?.map((product, index) =>
        {
          return <ProductResult key={index} product={product as ShopModel} />;
        })
      }
    </>
    )
}

  return (
      <SearchSectionResult
        dir={dir}
        selectedTab={props.selectedTab}
        isLoading={props.isLoading}
        sectionTitle={t('shop')}
        totalResults={props?.shopData?.total}
        SectionData={<SectionData />}
        selectTab={()=>props?.setSelectedTab("shop")}
      />
  );
};

export default SearchShopResult;
