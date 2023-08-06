/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useAppDispatch, setUsers, setTournaments, setTeams, setShop, setBits, setStreams } from '@fe-monorepo/store';
import { useLazyQuery } from '@apollo/client';
import { SEARCH_QUERY } from '@fe-monorepo/data-access';
import { BitsModel, ContentModel, SearchModel, ShopModel, StreamsModel, TeamsModel, TournamentModel, UserSearchModel } from '@fe-monorepo/models';
import { useAppState } from '../index';

/*** UserData ***/
type SearchResponse = {
  getGlobalSearch: {
    is_successful: boolean;
    error_code: string;
    error_msg: string;
    data: GlobalSearchData
  };
};

type SearchInfoResponse = {
  getSearchInfo: {
    is_successful: boolean;
    error_code: string;
    error_msg: string;
    data: [ShopModel] | [UserSearchModel] | [TeamsModel] | [TournamentModel] | [BitsModel] | [StreamsModel];
  };
};

type SearchData = {
    total: number;
    result: [ShopModel] | [UserSearchModel] | [TeamsModel] | [TournamentModel] | [BitsModel] | [StreamsModel];
};


type GlobalSearchData = {
    shop: SearchData,
    users: SearchData,
    teams: SearchData,
    tournaments: SearchData,
    bits: SearchData,
    streams: SearchData,
}

type SearchParams = {
  details: SearchModel;
};

export const useGlobalSearch = () => {
  const dispatch = useAppDispatch();

  const [getGlobalSearch, { data: globalSearchData, error: globalSearchDataError }] = useLazyQuery<
    SearchResponse,
    SearchParams
  >(SEARCH_QUERY.getGlobalSearch, { errorPolicy: 'all' });


  const [getAllSearchInfo, { data: searchAllInfoData, error: searchAllInfoError}] = useLazyQuery<
  SearchInfoResponse,
  SearchParams
  >(SEARCH_QUERY.getSearchInfo, { errorPolicy: 'all' });
 
  const { changeLoadingState } = useAppState();
  const [ hasPagination, setHasPagination] = useState<boolean>(false);
  const [ currentGlobalSearchData, setcurrentData] = useState<any[]>([]);
  const [ isLoading, setLoading] = useState<boolean>(false);

  const getAllSearch = async (model: SearchModel) => {
    changeLoadingState(true);
    getGlobalSearch({
      variables: { details: model }
    });
  };


  const getAllSearchInformation = async (model: SearchModel, pagination? : string) => {
    setLoading(true)
    if (pagination) {
      setHasPagination(true)
      model.pagination = pagination
    } else {
      setHasPagination(false)
      changeLoadingState(true);
    }
    getAllSearchInfo({
      variables: { details: model }
    });
  };


  useEffect(() => {
    if (globalSearchData) {
      const data = globalSearchData.getGlobalSearch.data;
      if (data) {
        dispatch(setShop(data.shop));
        dispatch(setUsers(data.users));
        dispatch(setTournaments(data.tournaments))
        dispatch(setTeams(data.teams))
        dispatch(setBits(data.bits))
        dispatch(setStreams(data.streams))
      }
      changeLoadingState(false);
    }
  }, [globalSearchData]);


  useEffect(() => {
    if (searchAllInfoData) {
      if (hasPagination) {
        if (searchAllInfoData.getSearchInfo.data.length > 0) {
          setcurrentData(currentGlobalSearchData => [...currentGlobalSearchData, ...searchAllInfoData.getSearchInfo.data])
        }
        else {
          setcurrentData(currentGlobalSearchData)
        }
      } else {
         setcurrentData(searchAllInfoData.getSearchInfo.data)
      }
      setHasPagination(false)
      changeLoadingState(false);
      setLoading(false)
    }
  }, [searchAllInfoData]);


  useEffect(() => {
    if (searchAllInfoError) {
      changeLoadingState(false);
      setLoading(false)
    }
  }, [searchAllInfoError]);
  

  return { getAllSearch, searchAllInfoData, currentGlobalSearchData, isLoading, getAllSearchInformation, globalSearchData };
};
