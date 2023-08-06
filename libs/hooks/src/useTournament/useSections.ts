import { useEffect, useState } from "react";

// TODO: create a dispatch method to add tournaments to Redux
// import { useAppDispatch } from "@fe-monorepo/store";

import { useLazyQuery } from "@apollo/client";
import { TOURNAMENT_SECTIONS_QUERY } from '@fe-monorepo/data-access'


import { SectionDataModel } from '@fe-monorepo/models'
// import { useAppState } from "../useAppState/useAppState";

type GetSectionsResponse =
{
  getAllTournamentSections:
  {
    is_successful: boolean;
    error_code: string;
    error_msg: string;
    data: SectionDataModel[];
  }
}

export const useSections = () =>
{
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sections, setSections] = useState<SectionDataModel[]>();
  const [areSectionsValid, setSectionsValid] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [errorCode, setErrorCode] = useState<string>('');

  // Queries
  const [getSectionsGql, { data: sectionsResponse, error: sectionsError }] = useLazyQuery<GetSectionsResponse>(
      TOURNAMENT_SECTIONS_QUERY.getAllTournamentSections,
       { errorPolicy: 'all' }
    )


  const getTournamentSections = () =>
  {
    setIsLoading(true);

    getSectionsGql();
  }

  useEffect(() =>
  {
    console.log("sectionsResponse: ", sectionsResponse);

    if (sectionsResponse)
    {
      const response = sectionsResponse.getAllTournamentSections;

      if (response)
      {
        setSections(response.data);
        setSectionsValid(response.is_successful)
        setErrorMessage(response.error_msg);
        setErrorCode(response.error_code);
      }

      setIsLoading(false);
    }
  }, [sectionsResponse])

  useEffect(() =>
  {
    console.log("sectionsError: ", sectionsError);

    if (sectionsError)
    {
      setIsLoading(false)
    }
  }, [sectionsError])

  return {
    isLoading,
    areSectionsValid,
    sections,
    errorMessage,
    errorCode,
    getTournamentSections
  }
}
