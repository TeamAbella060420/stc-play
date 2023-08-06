import { Injectable } from '@nestjs/common';
import { getBaseURL, ENDPOINTS } from '../../../common/endpoints'
import { requestHeaders } from '../../../common/request.header'
import { responseError } from '../../../common/response.error'
import { OTPInput } from '../../../typeDefs/otp'
import axios from 'axios'

@Injectable()
export class OTPService {

    async requestOTP( otpInput: OTPInput, req) {
      try {
        const { data } = await axios.post(
            getBaseURL() + ENDPOINTS.OTP.RequestOTP,
            {
              channel: otpInput.channel,
              endpoint: otpInput.endpoint,
              type: otpInput.type
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
          return responseError(error)
      }
    }

    async requestResetPasswordOTP( otpInput: OTPInput, req) {
      try {
        const { data } = await axios.post(
            getBaseURL() + ENDPOINTS.OTP.RequestResetPasswordOTP,
            {
              channel: otpInput.channel,
              endpoint: otpInput.endpoint,
              type: otpInput.type,
              email: otpInput.email,
              username: otpInput.username
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
          return responseError(error)
      }
    }

    async verifyOTP( otpInput: OTPInput, req) {
      const tempReq = req;
      if(otpInput?.token) tempReq['headers']['x-api-token'] = otpInput.token
      
      try {
        const { data } = await axios.post(
            getBaseURL() + ENDPOINTS.OTP.VerifyOTP,
            {
              otp: otpInput.otp,
              type: otpInput.type
            },
            requestHeaders(tempReq)
          )
          return ({
            is_successful: data.is_successful,
            error_code: data.error_code,
            error_msg: data.error_msg,
            data: data.response
          })
      }
      catch (error) {
        if (error.response.status === 429) {
          return ({
            is_successful: false,
            error_code: error.response.status,
            error_msg: error.response.statusText,
            data: {}
          })
        }
        return responseError(error)
      }
    }
}
