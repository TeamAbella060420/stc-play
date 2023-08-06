import { Injectable } from '@nestjs/common';
import { getBaseURL, ENDPOINTS } from './../../../common/endpoints'
import { requestHeaders } from './../../../common/request.header'
import axios from 'axios'

@Injectable()
export class HistoryService {

  async getAllSearchHistory(req) {

    try {
        const { data } = await axios.get(
            getBaseURL() + ENDPOINTS.Search.GetAllHistory, 
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


  async saveSearchHistory(searchInput, req) {

    try {
      const { data } = await axios.post(
        getBaseURL() + ENDPOINTS.Search.SaveHistory,
        {
          name: searchInput.name,
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


  async clearSearchHistory(searchInput, req) {

    try {
      const { data } = await axios.post(
        getBaseURL() + ENDPOINTS.Search.ClearHistory,
        {
          search_id: searchInput.search_id,
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


  async clearAllSearchHistory(req) {

    try {
      const { data } = await axios.post(
        getBaseURL() + ENDPOINTS.Search.ClearHistory,
        {},
        requestHeaders(req)
      )
      return ({
        is_successful: data.is_successful,
        error_code: data.error_code,
        error_msg: data.error_msg
      })
    }
    catch (error) {
        return {
            is_successful: error?.response.data.is_successful,
            error_code: error?.response.data.error_code,
            error_msg:  error?.response.data.error_msg
         }
    }
  } 

}