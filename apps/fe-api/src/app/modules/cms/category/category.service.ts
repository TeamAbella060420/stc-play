import { Injectable } from '@nestjs/common';
import { getBaseURL, ENDPOINTS } from './../../../common/endpoints'
import { requestHeaders } from './../../../common/request.header'
import axios from 'axios'

@Injectable()
export class CategoryService {

  async getAllCategory(req) {
    try {
        const { data } = await axios.get(
            getBaseURL() + ENDPOINTS.SHOP.GetAllCategory, 
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
        console.log(error)
        return {
            is_successful: error?.response.data.is_successful,
            error_code: error?.response.data.error_code,
            error_msg:  error?.response.data.error_msg,
            data: error?.response.data.response
         }
      }
  } 
}