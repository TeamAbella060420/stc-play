import { Injectable } from '@nestjs/common';
import { getBaseURL, ENDPOINTS } from './../../../common/endpoints'
import { requestHeaders } from './../../../common/request.header'
import axios from 'axios'
import { AppleLoginInput } from '../../../typeDefs/auth';

@Injectable()
export class LoginService {

  async login( loginInput, req) {

    try { 
    const { data } = await axios.post(
        getBaseURL() + ENDPOINTS.User.Login,
        {
          identifier: loginInput.identifier,
          password: loginInput.password,
          endpoint: loginInput.endpoint,
          channel: loginInput.channel,
          advertisement_id: loginInput.advertisement_id
        },
        requestHeaders(req)
      )
      return ({
        is_successful: data.is_successful,
        error_code: data.error_code,
        error_msg: data.error_msg,
        data: data.response
      })
    }
    catch (error) {
      return {
          is_successful: error?.response.data.is_successful,
          error_code: error?.response.data.error_code,
          error_msg:  error?.response.data.error_msg,
          data: error?.response.data.response
       }
    }

  }

  async createAccessLink( loginInput, req) {

     try {
        const { data } = await axios.post(
            getBaseURL() + ENDPOINTS.User.AccessLink,
            {
              provider: loginInput.provider,
              type: loginInput.type
            },
            requestHeaders(req)
          )
          return ({
            is_successful: data.is_successful,
            error_code: data.error_code,
            error_msg: data.error_msg,
            data: {
                url: (data.response?.url) ? data.response?.url : data.response,
                oauth_token: data.response?.oauth_token,
                oauth_token_secret: data.response?.oauth_token_secret,
                oauth_callback_confirmed: data.response?.oauth_callback_confirmed
            }
          })
      }     
      catch (error) {
        return {
            is_successful: error?.response.data.is_successful,
            error_code: error?.response.data.error_code,
            error_msg:  error?.response.data.error_msg,
            data: error?.response.data.response
         }
      }

    }


    async appleSignin( appleLoginInput: AppleLoginInput, req) {
      try {
        const { data } = await axios.post(
            getBaseURL() + ENDPOINTS.User.AppleLogin,
            {
              code: appleLoginInput.code,
            },
            requestHeaders(req)
          )
          return ({
            is_successful: data.is_successful,
            error_code: data.error_code,
            error_msg: data.error_msg,
            data: data.response
          })
        }
      catch (error) {
        return {
            is_successful: error?.response.data.is_successful,
            error_code: error?.response.data.error_code,
            error_msg:  error?.response.data.error_msg,
            data: error?.response.data.response
         }
      }
    }
}
