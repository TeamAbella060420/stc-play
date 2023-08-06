import { t } from 'i18next';
import { useSelector } from 'react-redux';

import { BitsModel, ContentModel, SearchData } from '@fe-monorepo/models';
import { RootState } from '@fe-monorepo/store';

import Spinner from '../../../components/Spinner';
import BitResult from './BitResult';
import SearchSectionResult from '../Components/SearchSectionResult';

type SearchBitResultProps = {
  bitData?: SearchData;
  isLoading: boolean;
  tabData?: [ContentModel]
  selectedTab:string
  loadMore:()=>void
  setSelectedTab: (key:string)=>void
};

const SearchBitResult = (props: SearchBitResultProps) => {
  const prefs = useSelector((state: RootState) => state.app);
  const dir = prefs?.isRTL ? 'rtl' : 'ltr';


  const SectionData = () =>
  {
    return (
    <div className={`text-secondary flex gap-[13px]`}>
    {props?.bitData?.result?.map((bit, index) => {
      return <BitResult bit={bit as BitsModel} key={index} />;
    })}
  </div>)
  }

  return (
    <SearchSectionResult
          dir={dir}
          selectedTab={props.selectedTab}
          isLoading={props.isLoading}
          sectionTitle={t('top_tab_bits')}
          totalResults={props?.bitData?.total}
          SectionData={<SectionData />}
          selectTab={()=>props?.setSelectedTab("bit")}
    />
  );
};

export default SearchBitResult;
