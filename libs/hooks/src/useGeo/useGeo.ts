/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GEO_QUERY } from '@fe-monorepo/data-access';
import { CountryModel } from '@fe-monorepo/models';
import { useAppState } from '../index';


export const useGeo = () => {

  const [fetchCountries, { data: countryDataResponse, error: countryError }] = useLazyQuery(GEO_QUERY.getAllCountries, { errorPolicy: 'all' });

  const [countryData, setCountryData] = useState<[CountryModel]>();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { changeLoadingState } = useAppState();


  const getAllCountries = async () => {
      changeLoadingState(true)
      fetchCountries()
  }

  useEffect(() =>
  {
    if (countryDataResponse)
    {
      const dataResponse = countryDataResponse?.countries
      setCountryData(dataResponse.data)
      setErrorMessage(dataResponse.error_msg)
      changeLoadingState(false)
    }
  }, [countryDataResponse]);

  useEffect(() =>
  {
    if (countryError)
    {
      // TODO ADD CODE HERE
      changeLoadingState(false)
    }
  }, [countryError]);

  return { getAllCountries, countryData, errorMessage };
};
