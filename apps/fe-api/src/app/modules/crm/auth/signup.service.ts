import { Injectable } from '@nestjs/common';
import { getBaseURL, ENDPOINTS } from './../../../common/endpoints'
import { requestHeaders } from './../../../common/request.header'
import { AppleSignUpInput, SignUpInput } from './../../../typeDefs/auth'
import axios from 'axios'
import { responseError } from '../../../common/response.error';
import { responseData } from '../../../common/response.data';

@Injectable()
export class SignUpService {

    async signup( signUpInput: SignUpInput, req) {
      console.log("signUpInput: ", signUpInput);

      try {
        const { data } = await axios.post(
            getBaseURL() + ENDPOINTS.Account.Register,
            {
              email: signUpInput.email,
              mobile: signUpInput.mobile,
              username: signUpInput.username,
              password: signUpInput.password,
              endpoint: signUpInput.endpoint,
              channel: signUpInput.channel,
              mobile_code: signUpInput.mobile_code,
              regesteration_persona: signUpInput.regesteration_persona,
              display_name: signUpInput.display_name,
              country_code: signUpInput.country_code,
              // referral_code: signUpInput.referral_code
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

    async appleSignup( appleSignUpInput: AppleSignUpInput, req) {

      try {
        const { data } = await axios.post(
            getBaseURL() + ENDPOINTS.Account.AppleSignup,
            {
              code: appleSignUpInput.code,
              username: appleSignUpInput.username
            },
            requestHeaders(req)
          )
          return responseData(data)
        }
      catch (error) {
        return responseError(error)
      }
    }

}
