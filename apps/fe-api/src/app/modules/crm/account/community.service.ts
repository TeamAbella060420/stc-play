import { Injectable } from '@nestjs/common';
import { getBaseURL, ENDPOINTS } from '../../../common/endpoints'
import { requestHeaders } from '../../../common/request.header'
import { responseError } from '../../../common/response.error'
import { AccountInput } from '../../../typeDefs/account';
import axios from 'axios'


@Injectable()
export class CommunityService {

    async follow( accountInput: AccountInput, req) {
      try {
        const { data } = await axios.post(
            getBaseURL() + ENDPOINTS.Community.Follow,
            {
                username: accountInput.username
            },
            requestHeaders(req)
          )
          return ({
            is_successful: data.is_successful,
            error_code: data.error_code,
            error_msg: data.error_msg
          })
      }
      catch (error) {
          return responseError(error)
      }
    }

    async unfollow( accountInput: AccountInput, req) {
      try {
        const { data } = await axios.post(
            getBaseURL() + ENDPOINTS.Community.UnFollow,
            {
                username: accountInput.username
            },
            requestHeaders(req)
          )
          return ({
            is_successful: data.is_successful,
            error_code: data.error_code,
            error_msg: data.error_msg
          })
      }
      catch (error) {
          return responseError(error)
      }
    }
    
}
