import { useSelector } from 'react-redux';
import { t } from 'i18next';

import { ContentModel, SearchData, TournamentModel } from '@fe-monorepo/models';
import { RootState } from '@fe-monorepo/store';

import TournamentResult from './TournamentResult';
import Spinner from '../../../components/Spinner';
import LoadMore from '../../../components/LoadMore';
import SearchSectionResult from '../Components/SearchSectionResult';

type SearchTournamentResultProps =
{
  tournamentData?: SearchData;
  isLoading: boolean;
  tabData?:[ContentModel]
  selectedTab:string
  loadMore:()=>void
  setSelectedTab: (key:string)=>void
};

const SearchTournamentResult = (props: SearchTournamentResultProps) => {
  const prefs = useSelector((state: RootState) => state.app);
  const dir = prefs?.language === "ar" ? 'rtl' : 'ltr';


  const SectionData = () =>
  {
    const TournamentResultContainer = (props:
      {
        list: [ContentModel] | [TournamentModel] | undefined,
        length?: number
      }) =>
    {

      // TODO: Consider changing the grid layout
      // gap-x-20 4xl:gap-x-[35.55px] 5xl:gap-x-[53.33px] 8xl:gap-x-[106.66px]
      return (
        <div className={`
          mt-32 4xl:mt-[56.88px] 5xl:mt-[85.33px] 8xl:mt-[170.66px]
          text-secondary
          grid sm:grid-cols-2 xl:grid-cols-3

          gap-x-20 4xl:gap-x-[35.55px] 5xl:gap-x-[53.33px] 8xl:gap-x-[106.66px]
          gap-y-32 4xl:gap-y-[56.88px] 5xl:gap-y-[85.33px] 8xl:gap-x-[170.66px]
          `
        }
        >
          {
            props?.list?.map((tournament,index) =>
            {
              return (
                <TournamentResult
                  index={index}
                  key={index}
                  tournament={tournament as TournamentModel}
                  length={props?.length}
                />
              )
            })
          }
        </div>)
    }

    return (
      <div>
        {
          props?.selectedTab === "tournament"
        ?
          <>
            <TournamentResultContainer
              list={props?.tabData}
              length={props?.tournamentData?.result?.length}
            />

            <LoadMore isLoading={props?.isLoading} loadMore={props?.loadMore}/>
          </>
          :
            <TournamentResultContainer
              list={ props?.tournamentData?.result}
              length={props?.tournamentData?.result?.length}
            />
        }
      </div>
    )
  }

  return (
        <SearchSectionResult
          dir={dir}
          selectedTab={props.selectedTab}
          isLoading={props.isLoading}
          sectionTitle={t('top_tab_tournaments')}
          totalResults={props?.tournamentData?.total}
          SectionData={<SectionData />}
          selectTab={()=>props?.setSelectedTab("tournament")}
      />
  );
};

export default SearchTournamentResult;
