import { Injectable } from '@nestjs/common';
import { getBaseURL, ENDPOINTS } from '../../../../common/endpoints'
import { requestHeaders } from '../../../../common/request.header'
import axios from 'axios'
import { responseError } from '../../../../common/response.error';
import { responseData } from '../../../../common/response.data';

@Injectable()
export class ContentService {

  async getStaticPage(contentInput, req) {
    try {
        const { data } = await axios.get(
            getBaseURL() + ENDPOINTS.DATA_CONTENT.GetStaticPage+ "?page_code=" + contentInput.page_code, 
            requestHeaders(req)
        )
          return responseData(data)
        }
      catch (error) {
        return responseError(error)
      }
  } 

  async getFaqs(req) {
    try {
        const { data } = await axios.get(
            getBaseURL() + ENDPOINTS.DATA_CONTENT.GetFaqs, 
            requestHeaders(req)
        )
           return responseData(data)
        }
      catch (error) {
        return responseError(error)
      }
  } 
  
}