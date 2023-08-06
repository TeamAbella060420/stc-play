import { t } from 'i18next';
import { useSelector } from 'react-redux';

import { ContentModel, SearchData, UserSearchModel } from '@fe-monorepo/models';
import { RootState } from '@fe-monorepo/store';

import Spinner from '../../../components/Spinner';
import UserResult from './UserResult';
import LoadMore from '../../../components/LoadMore';
import SearchSectionResult from '../Components/SearchSectionResult';

type SearchUserResultProps =
{
  userData?: SearchData;
  isLoading: boolean;
  tabData?:[ContentModel]
  selectedTab:string
  loadMore:()=>void
  setSelectedTab: (key:string)=>void
};

const SearchUserResult = (props: SearchUserResultProps) =>
{
  const prefs = useSelector((state: RootState) => state.app);
  const dir = prefs?.isRTL ? 'rtl' : 'ltr';


  const SectionData = () =>
  {
    return (
    <div>
      {
        props?.selectedTab === "user"
        ?
          <>
            {
              props?.tabData?.map((user, index)=>
              {
                return(
                  <UserResult
                      key={index}
                      shouldShowFollow={props?.selectedTab === "user"}
                      user={user as UserSearchModel}
                  />
                )
              })
            }

            <LoadMore
                isLoading={props?.isLoading}
                loadMore={props?.loadMore}
            />
          </>
        :
          props?.userData?.result?.map((user, index) =>
          {
            return <UserResult
                      key={index}
                      shouldShowFollow={props?.selectedTab === "user"}
                      user={user as UserSearchModel}

                    />

          })
      }
    </div>
    )
  }

  return (
      <SearchSectionResult
          dir={dir}
          selectedTab={props.selectedTab}
          isLoading={props.isLoading}
          sectionTitle={t('top_tab_users')}
          totalResults={props?.userData?.total}
          SectionData={<SectionData />}
          selectTab={()=> props?.setSelectedTab("user")}
      />
  );
};

export default SearchUserResult;
