import { Injectable } from '@nestjs/common';
import { getBaseURL, ENDPOINTS } from './../../../common/endpoints'
import { requestHeaders } from './../../../common/request.header'
import axios from 'axios'
import moment from 'moment';


const SHOP = 'shop'
const USER = 'user'
const STREAM = 'stream'
const BIT = 'bit'
@Injectable()
export class SearchService {

  async getGlobalSearch(searchInput, req) {
    try {
        const { data } = await axios.get(
            getBaseURL() + ENDPOINTS.Search.GetGlobalSearch+ "?identifier=" + searchInput.identifier, 
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

  async getSearchInfo(searchInput, req) {
    try {
        let searchParam = ""
        if (searchInput.pagination) {
          searchParam = "?identifier=" + searchInput.identifier + "&type=" + searchInput.type + "&direction=" + searchInput.direction + "&last_cursor=" + searchInput.pagination
        } else {
          searchParam = "?identifier=" + searchInput.identifier + "&type=" + searchInput.type + "&direction=" + searchInput.direction
        }

        const { data } = await axios.get(
            getBaseURL() + ENDPOINTS.Search.GetSearchInfo + searchParam,
            requestHeaders(req)
        )

          data.response.map((item) => { 
            switch (searchInput.type) {
              case USER:
                item.pagination = item.last_cursor;
              break;

              case SHOP:
                item.pagination = encodeURIComponent('{"combination_id":' + item.last_cursor.combination_id +', "product_id":' + item.last_cursor.product_id + '}') + '=';
              break;

              case BIT:
                item.pagination = ""; //TO DO add last cursor depending on the api result
              break;

              default:
                item.pagination = item.last_cursor;
              break;

            }
          })
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