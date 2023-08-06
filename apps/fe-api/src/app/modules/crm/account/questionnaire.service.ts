import { Injectable } from '@nestjs/common';
import { getBaseURL, ENDPOINTS } from './../../../common/endpoints'
import { requestHeaders } from './../../../common/request.header'
import axios from 'axios'

@Injectable()
export class QuestionnaireService {

  async submit(personalizeQuestionnaireInput, req) {

    try {
      const { data } = await axios.post(
        getBaseURL() + ENDPOINTS.Account.submitPersonalizationQuestionnaire,
        {
            personal_questionnaire_code: personalizeQuestionnaireInput.personal_questionnaire_code,
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
        return {
            is_successful: error?.response.data.is_successful,
            error_code: error?.response.data.error_code,
            error_msg:  error?.response.data.error_msg
         }
    }
  } 
}