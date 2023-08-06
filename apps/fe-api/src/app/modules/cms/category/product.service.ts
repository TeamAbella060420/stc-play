import { Injectable } from '@nestjs/common';
import { getBaseURL, ENDPOINTS } from './../../../common/endpoints'
import { requestHeaders } from './../../../common/request.header'
import { ProductInput } from '../../../typeDefs/product';
import axios from 'axios'

@Injectable()
export class ProductService {

  async getAllProduct(req, params: ProductInput) {
    try {
        const { data } = await axios.get(
            getBaseURL() + ENDPOINTS.SHOP.GetAllProduct, 
            {
                ...requestHeaders(req),
                params: {...params}
            }
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