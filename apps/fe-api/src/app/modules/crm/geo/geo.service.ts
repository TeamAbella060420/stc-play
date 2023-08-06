import { Injectable } from '@nestjs/common';
import { getBaseURL, ENDPOINTS } from './../../../common/endpoints'
import { requestHeaders } from './../../../common/request.header'
import { responseError } from './../../../common/response.error'
import axios from 'axios'

@Injectable()
export class GeoService {

    async getAllCountries(req) {
      try {
        const { data } = await axios.get(
            getBaseURL() + ENDPOINTS.GEO.GetAllCountrie, 
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

    async getServedCountrie(req) {
      try {
        const { data } = await axios.get(
            getBaseURL() + ENDPOINTS.GEO.GetServedCountrie, 
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
        return responseError(error)
      }
    }

}
