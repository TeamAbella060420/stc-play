import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom"
import { t } from "i18next";

import { RootState } from "@fe-monorepo/store";
import { useGlobalSearch, useSearchHistory } from "@fe-monorepo/hooks";
import { IconNames } from "@fe-monorepo/helper";
import { ContentModel, SearchData, SearchModel } from "@fe-monorepo/models";

import SearchHeader from "./Search/SearchHeader";

import SearchShopResult from "./Search/Shop/SearchShopResult";


import SearchUserResult from "./Search/User/SearchUserResult";
import SearchTournamentResult from "./Search/Tournament/SearchTournamentResult";
import SearchBitResult from "./Search/Bit/SearchBitResult";
import SearchStreamResult from "./Search/Stream/SearchStreamResult";
import EmptyState from "../components/EmptyState";
import Icon from "../common/Icon";
import useRecentSearch from "../hooks/useRecentSearch";
import Container from "../components/Container";
import ScaledIcon from "../common/ScaledIcon";
import Spinner from "../components/Spinner";

const SearchPage = ()=>
{
    const tabs =
    [
        {
            key:"all",
            translate:"tob_tab_all"
        },
        {
            key:"bit",
            translate:"top_tab_bits"
        },
        {
            key:"stream",
            translate:"top_tab_streams"
        },
        {
            key:"shop",
            translate:"shop"
        },
        {
            key:"user",
            translate:"top_tab_users"
        },
        {
            key:"tournament",
            translate:"top_tab_tournaments"
        },
    ]

    const {currentGlobalSearchData, globalSearchData,searchAllInfoData , getAllSearch, getAllSearchInformation  } = useGlobalSearch();

    const location = useLocation()
    const [ totalResult, setTotalResult ] = useState<number>();
    const [ selectedTab, setSelectedTab ] = useState<string>("all");
    const [ bitsData, setBitsData] = useState<SearchData>();
    const [ streamsData, setStreamsData ] = useState<SearchData>();
    const [ shopData, setShopData ] = useState<SearchData>();
    const [ usersData, setUsersData ] = useState<SearchData>();
    const [ tabData, setTabData ] = useState<[ContentModel]>();
    const [ tournamentsData, setTournaments ] = useState<SearchData>();
    const [ isLoading , setIsLoading ] = useState<boolean>(false)
    const [ toggle , setToggle ] = useState<boolean>(false)

    // const isLoggedIn = useSelector((state:RootState)=> state?.app) ? true : false
    const [ isLoadingMore , setIsLoadingMore ] = useState<boolean>(false)
    const [ setIsOpen ] = useRecentSearch(state => [state.setIsOpen]);
    const [ setRevalidateData ] = useRecentSearch(state => [state.setRevalidateData]);
    const saveSearch = useSearchHistory()
    const searchParams = new URLSearchParams(location.search);
    const searchValue = searchParams.get('q') ?? ""

    const loadMore = ()=>
    {
        if(currentGlobalSearchData?.length > 0 && (!isLoading) && (!isLoadingMore))
        {
            loadTabData(true)
        }
    }

    const loadTabData = async (isPagination?: boolean)=>
    {
        setIsLoadingMore(true);
        await getAllSearchInformation(
            {
              type: selectedTab,
              direction: 'next',
              identifier: searchValue
            } as SearchModel,
            isPagination ? currentGlobalSearchData[currentGlobalSearchData.length - 1]?.pagination : null
          );
    }

    useEffect(()=>
    {
        if(searchValue)
        {
            if(selectedTab !== 'all')
            {
                loadTabData()
            }
            setIsLoading(true)
            getAllSearch({identifier: searchValue, name: '', search_id: 0});

            saveSearch.saveHistory(searchValue);
        }
    },[searchValue])

    useEffect(()=>
    {
        const totalNumber:number = (parseInt(globalSearchData?.getGlobalSearch?.data?.bits?.total as any) + parseInt(globalSearchData?.getGlobalSearch?.data?.shop?.total as any) + parseInt(globalSearchData?.getGlobalSearch?.data?.streams?.total as any) + parseInt(globalSearchData?.getGlobalSearch?.data?.teams?.total as any) + parseInt(globalSearchData?.getGlobalSearch?.data?.tournaments?.total as any) + parseInt(globalSearchData?.getGlobalSearch?.data?.users?.total as any))?.toString() !== "NaN" ? parseInt(globalSearchData?.getGlobalSearch?.data?.bits?.total as any) + parseInt(globalSearchData?.getGlobalSearch?.data?.shop?.total as any) + parseInt(globalSearchData?.getGlobalSearch?.data?.streams?.total as any) + parseInt(globalSearchData?.getGlobalSearch?.data?.teams?.total as any) + parseInt(globalSearchData?.getGlobalSearch?.data?.tournaments?.total as any) + parseInt(globalSearchData?.getGlobalSearch?.data?.users?.total as any) : 0

        setBitsData(globalSearchData?.getGlobalSearch?.data?.bits)
        setShopData(globalSearchData?.getGlobalSearch?.data?.shop)
        setUsersData(globalSearchData?.getGlobalSearch?.data?.users)
        setTournaments(globalSearchData?.getGlobalSearch?.data?.tournaments)
        setStreamsData(globalSearchData?.getGlobalSearch?.data?.streams)

        setTotalResult(totalNumber);
        setRevalidateData(true);
        setIsOpen(false);
        setToggle(true);
    },[globalSearchData])

    useEffect(()=>
    {
        if(selectedTab !== "all")
        {
            setTabData(undefined)
            loadTabData()
        }
    },[selectedTab])

    useEffect(()=>
    {
        setIsLoadingMore(false);

        if(selectedTab !== "all")
        {
            if(currentGlobalSearchData?.length > 0 && !isLoading)
            {
                setTabData([...currentGlobalSearchData] as [ContentModel])
            }
        }
    },[currentGlobalSearchData])

    useEffect(()=>
    {
        if(searchAllInfoData?.getSearchInfo?.data?.length as number < 1)
        {
            setIsLoadingMore(false)
        }

    },[searchAllInfoData])

    useEffect(()=>
    {
        if(toggle)
        {
            setIsLoading(false)
        }
    },[usersData])

    return(
        <div className={`w-full h-full font-regular`}>
            <header>
                <SearchHeader
                    tabs={tabs}
                    title={searchValue}
                    totalResult={totalResult as number}
                    selectedTab={selectedTab}
                    isLoading={isLoading}
                    setSelectedTab={setSelectedTab}
                />
            </header>

            <Container>
                {
                    ( (((shopData?.result?.length as number > 0) || ((tabData?.length as number > 0) && selectedTab !== "all"))  || isLoading|| isLoadingMore ) && ((selectedTab === "all") || selectedTab === "shop" ) )
                    &&
                    <SearchShopResult
                        shopData={shopData}
                        isLoading={selectedTab === "shop" ? isLoadingMore : isLoading}
                        tabData={tabData}
                        selectedTab={selectedTab}
                        loadMore={loadMore}
                        setSelectedTab={setSelectedTab}
                    />
                }

                {
                    ((((usersData?.result?.length as number > 0) || ((tabData?.length as number > 0) && selectedTab !== "all")) || isLoading || isLoadingMore ) && (selectedTab === "all" || selectedTab === "user" ) )
                    &&
                    <SearchUserResult
                        userData={usersData}
                        isLoading={ selectedTab === "user" ? isLoadingMore : isLoading}
                        tabData={tabData}
                        selectedTab={selectedTab}
                        loadMore={loadMore}
                        setSelectedTab={setSelectedTab}
                    />
                }

                {
                    ((((tournamentsData?.result?.length as number > 0) || ((tabData?.length as number > 0) && selectedTab !== "all")) || isLoading || isLoadingMore ) && (selectedTab === "all" || selectedTab === "tournament" ) )
                    &&
                    <SearchTournamentResult
                        tournamentData={tournamentsData}
                        isLoading={selectedTab === "tournament" ? isLoadingMore : isLoading}
                        tabData={tabData}
                        selectedTab={selectedTab}
                        loadMore={loadMore}
                        setSelectedTab={setSelectedTab}
                    />
                }

                {
                  ( ((bitsData?.result?.length as number > 0) || isLoading) && (selectedTab === "all" || selectedTab === "bit" ) )
                &&
                  <SearchBitResult
                      bitData={bitsData}
                      isLoading={isLoading}
                      selectedTab={selectedTab}
                      loadMore={loadMore}
                      setSelectedTab={setSelectedTab}
                  />
                }

                {
                  (((streamsData?.result?.length as number > 0) || isLoading) && (selectedTab === "all" || selectedTab === "stream" ) )
                &&
                  <SearchStreamResult
                      streamData={streamsData}
                      isLoading={isLoading}
                      selectedTab={selectedTab}
                      loadMore={loadMore}
                      setSelectedTab={setSelectedTab}
                  />
                }

                <div className={`
                          ${
                            (((totalResult === 0) || (selectedTab !== "all" && !(tabData?.length as number > 0))) && !((isLoading) || (isLoadingMore)))
                          ?
                            ` h-[29rem] 4xl:h-[51.55rem] 5xl:h-[77.33rem] 8xl:h-[154.66rem]`
                          :
                            ``
                          }`
                      }
                >
                    {
                      (((totalResult === 0) || (selectedTab !== "all" && !(tabData?.length as number > 0))) && !((isLoading) || (isLoadingMore)))
                    &&
                      <EmptyState
                          message={t("error_not_found_generic")}
                          icon={
                            <ScaledIcon
                              className={`stroke-secondary fill-primary`}
                              name={IconNames?.searchOutline}
                              normalHeight={90}
                              normalWidth={90}
                          />
                        }
                      />
                    }
                </div>
            </Container>
        </div>
    )
}

export default SearchPage
