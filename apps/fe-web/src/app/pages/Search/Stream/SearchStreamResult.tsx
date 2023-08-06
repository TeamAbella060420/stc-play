import { t } from 'i18next';
import { useSelector } from 'react-redux';

import { ContentModel, SearchData, StreamsModel } from '@fe-monorepo/models';
import { RootState } from '@fe-monorepo/store';

import Spinner from '../../../components/Spinner';
import StreamResult from './StreamResult';
import SearchSectionResult from '../Components/SearchSectionResult';

type SearchStreamResultProps = {
  streamData?: SearchData;
  isLoading: boolean;
  tabData?: [ContentModel]
  selectedTab:string
  loadMore:()=>void
  setSelectedTab: (key:string)=>void
};

const SearchStreamResult = (props: SearchStreamResultProps) => {
  const prefs = useSelector((state: RootState) => state.app);
  const dir = prefs?.isRTL ? 'rtl' : 'ltr';


  const SectionData = () =>
  {
    return (
      <div className='text-secondary flex gap-[13px]'>
        {props?.streamData?.result?.map((bit, index) => {
          return <StreamResult stream={bit as StreamsModel} key={index} />;
        })}
      </div>
    )
  }

  return (
    <SearchSectionResult
          dir={dir}
          selectedTab={props.selectedTab}
          isLoading={props.isLoading}
          sectionTitle={t('top_tab_streams')}
          totalResults={props?.streamData?.total}
          SectionData={<SectionData />}
          selectTab={()=>props?.setSelectedTab("stream")}
    />
  );
};

export default SearchStreamResult;
