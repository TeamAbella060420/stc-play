/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { PageModel, PageData } from '@fe-monorepo/models';
import { useAppState } from '../index';
import { CONTENT_QUERY } from '@fe-monorepo/data-access';

type StaticPageResponse = {
    getStaticPage: {
      is_successful: boolean;
      error_code: string;
      error_msg: string;
      data: PageData;
    };
};

type PageParams = {
    details: PageModel;
};

export const usePages = () => {

  const [fetchStaticPage, { data: staticPageResponse, error: staticPageError}] = useLazyQuery<
  StaticPageResponse,
  PageParams
  >(CONTENT_QUERY.getStaticPage, { errorPolicy: 'all' });

  const [pageData, setPageData] = useState<PageData>();
  const { changeLoadingState } = useAppState();

  const getStaticPages = async (page: string) => {
      changeLoadingState(true)
      fetchStaticPage({variables: {
        details: {
          page_code: page} as PageModel}})
  }

  useEffect(() =>
  {
    if (staticPageResponse)
    {
      const dataResponse = staticPageResponse?.getStaticPage
      setPageData(dataResponse.data) 
      changeLoadingState(false)
    }
  }, [staticPageResponse]);

  useEffect(() =>
  {
    if (staticPageError)
    {
      // TODO ADD CODE HERE
      changeLoadingState(false)
    }
  }, [staticPageError]);

  return { getStaticPages, pageData };
};
