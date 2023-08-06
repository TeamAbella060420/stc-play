/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@fe-monorepo/store';
import { useLazyQuery, useMutation } from '@apollo/client';
import { SEARCH_QUERY, SEARCH_MUTATION } from '@fe-monorepo/data-access';
import { SearchHistoryModel } from '@fe-monorepo/models';
import { useAppState } from '../index';


type SearchHistoryData = {
    name: string,
    title: string,
    search_id: number
}

type SearchHistoryResponse = {
    is_successful: boolean;
    error_code: string;
    error_msg: string;
}

type SearchHistoryParams = {
    details: SearchHistoryData
}

export const useSearchHistory = () => {
  const dispatch = useAppDispatch();
  const { changeLoadingState } = useAppState();
  const [ searchHistoryData, setSearchHistoryData] = useState<[SearchHistoryModel]>();
  const [ hasSavedHistory, setHasSavedHistory] = useState<boolean>();
  
  

  const [getAllSearchHistory, { data: searchHistory, error: searchHistoryError }] = useLazyQuery(SEARCH_QUERY.getAllSearchHistory, { errorPolicy: 'all' });
  const [removeSearchHistory, { data: removeData, error: removedError }] = useMutation<SearchHistoryResponse, SearchHistoryParams>(SEARCH_MUTATION.clearSearchHistory,
    {
      onError: (e) => {
        changeLoadingState(false)
      }
    }
  )

  const [saveSearchHistory, { data: saveData, error: saveError }] = useMutation<SearchHistoryResponse, SearchHistoryParams>(SEARCH_MUTATION.saveSearchHistory,
    {
      onError: (e) => {
        console.log("error: ", e)
        changeLoadingState(false)
      }
    }
  )
  const [clearAllSearchHistory, { data: clearAllSearchHistoryData, error: clearAllSearchHistoryError }] = useMutation(SEARCH_MUTATION.clearAllSearchHistory,
    {
      onError: (e) => {
        console.log("error: ", e)
        changeLoadingState(false)
      }
    }
  )

  const getSearchHistory = async () => {
    changeLoadingState(true)
    getAllSearchHistory();
  };

  const removeHistory = async (id: number) => {
    removeSearchHistory({
        variables: { details: {
            search_id: id
        } as SearchHistoryData }
    });

    if (searchHistoryData) {
        searchHistoryData.splice(searchHistoryData.findIndex(item => item.search_id === id), 1)
        setSearchHistoryData(searchHistoryData)
    }
  };

  const saveHistory = async (name: string) => {
    saveSearchHistory({
        variables: { details: {
            name: name
        } as SearchHistoryData }
    });
  };

  const clearAllHistory = async () => {
    changeLoadingState(true)
    clearAllSearchHistory();
  };



  useEffect(() => {
    if (saveData) {
     setHasSavedHistory(saveData.is_successful)
     changeLoadingState(false)  
    }
  }, [saveData]);


  useEffect(() => {
    if (clearAllSearchHistoryData) {
     changeLoadingState(false)  
     getSearchHistory()
    }
  }, [clearAllSearchHistoryData]);
  
  

  useEffect(() => {
    if (searchHistory) {
      const data = searchHistory.getAllSearchHistory.data;
      if (data) {
        const tempSearchHistory = data.map((item : SearchHistoryData) => (
            {
                title: item.name,
                search_id: item.search_id
            } 
        )) as [SearchHistoryModel];
        setSearchHistoryData(tempSearchHistory)
      }
      changeLoadingState(false);
    }
  }, [searchHistory]);


  return { getSearchHistory, removeHistory, saveHistory, clearAllHistory, searchHistoryData, hasSavedHistory, removeData, clearAllSearchHistoryData };
};
