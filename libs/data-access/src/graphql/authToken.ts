/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import { getEnvironment } from './apiEnvironments'
import { Buffer } from 'buffer'
import jwtDecode from 'jwt-decode'
import dayjs, { Dayjs } from 'dayjs'
import { setAuthToken, store } from '@fe-monorepo/store'

  const ExpiryDateLeewaySeconds = 300

  const generateToken = async () => {
    
    const url = getEnvironment().apiBaseUrl + 'v3/OAuth/token';
   
    const details: any = {
        'grant_type': 'client_credentials'
    };

    let formBody: any = [];

    for (const property in details) {
        const encodedKey = encodeURIComponent(property);
        const encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");

    const axiosConfig =
    {
        headers:
        {
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from(getEnvironment().basicAuthUsername + ':' + getEnvironment().basicAuthPassword).toString('base64')
        }
    };

    return await axios.post(url, formBody, axiosConfig)
    .then(async response =>
    {   
        if (response?.data?.access_token)
        {
            store.dispatch(setAuthToken(response?.data?.access_token))
            return response?.data?.access_token;
        }
        else
        {
            return '';
        }
    })        
    .catch(e =>
    {
        return {
            is_successful: false,
            error_code: 1000,
            error_msg: e?.message,
            hasToLogout:false,
            hasToUpdate:false
        };
    });

  }

  const getTokenExpiryTimestamp = (accessToken: string): number => {
    if (!accessToken) {
      return 0
    }
    const decoded = jwtDecode(accessToken) as {exp: number}
    if (decoded && decoded.exp) {
      return decoded.exp
    }
    return 0
  }


 export const getValidAccessToken = async () => {
    let accessToken
    try {
      const tokens = await getAccessToken()
      accessToken = tokens ? tokens : ''
      if (isExpiredToken(getTokenExpiryTimestamp(accessToken))) {
        accessToken = await generateToken()
      }
    } catch (error) {
      console.log(error)  
      accessToken = undefined
    }
    if (!accessToken) {
        //if token is expired or not valid we can add blocker/alert or logout the app if needed
    }
    return accessToken
  }

  const getAccessToken = (): string => {
    return store.getState().app.authToken
  }

  const isExpiredToken = (
    tokenExpiryTimeStamp: number,
    now: Dayjs = dayjs()
  ): boolean => {
    const expiryDate = dayjs
      .unix(tokenExpiryTimeStamp)
      .subtract(ExpiryDateLeewaySeconds, 'seconds')

    return expiryDate.isBefore(now)
  }
