import { Injectable } from '@nestjs/common';
import { getBaseURL, ENDPOINTS } from '../../../common/endpoints';
import { requestHeaders } from '../../../common/request.header';
import { SignUpInput } from '../../../typeDefs/auth';
import axios from 'axios';
import { responseData } from '../../../common/response.data';
import { responseError } from '../../../common/response.error';
import { LockDurationInput } from '../../../typeDefs/account';

@Injectable()
export class UserService {
  async lockDuration(durationInput: LockDurationInput, req) {
    let durationParam = ""
    if (durationInput.username) {
      durationParam = "?type=" + durationInput.type + "&username=" + durationInput.username
    } else {
      durationParam = "?type=" + durationInput.type 
    }

    try {
      const { data } = await axios.get(
        getBaseURL() + ENDPOINTS.Account.lockDuration + durationParam,
        requestHeaders(req)
      );
      return {
        is_successful: data.is_successful,
        error_code: data.error_code,
        error_msg: data.error_msg,
        data: data.response
      };
    } catch (error) {
      return {
        is_successful: error?.response.data.is_successful,
        error_code: error?.response.data.error_code,
        error_msg: error?.response.data.error_msg,
        data: error?.response.data.response
      };
    }
  }

  async isUserFoundByEmail(signUpInput: SignUpInput, req) {
    try {
      const { data } = await axios.get(
        getBaseURL() + ENDPOINTS.Account.isUserFoundByEmail + '?email=' + signUpInput.email,
        requestHeaders(req)
      );
      return {
        is_successful: data.is_successful,
        error_code: data.error_code,
        error_msg: data.error_msg,
        data: data.response
      };
    } catch (error) {
      return {
        is_successful: error?.response.data.is_successful,
        error_code: error?.response.data.error_code,
        error_msg: error?.response.data.error_msg,
        data: error?.response.data.response
      };
    }
  }

  async isUserFoundByUsername(signUpInput: SignUpInput, req) {
    try {
      const { data } = await axios.get(
        getBaseURL() + ENDPOINTS.Account.isUserFoundByUsername + '?username=' + encodeURIComponent(signUpInput.username),
        requestHeaders(req)
      );
      return {
        is_successful: data.is_successful,
        error_code: data.error_code,
        error_msg: data.error_msg,
        data: data.response
      };
    } catch (error) {
      return {
        is_successful: error?.response.data.is_successful,
        error_code: error?.response.data.error_code,
        error_msg: error?.response.data.error_msg,
        data: error?.response.data.response
      };
    }
  }

  async isValidCurrentPassword(signUpInput: SignUpInput, req) {
    try {
      const { data } = await axios.post(
        getBaseURL() + ENDPOINTS.Account.isValidCurrentPassword,
        {password: signUpInput.password},
        requestHeaders(req)
      );
      return {
        is_successful: data.is_successful,
        error_code: data.error_code,
        error_msg: data.error_msg,
        data: data.response
      };
    } catch (error) {
      return {
        is_successful: error?.response.data.is_successful,
        error_code: error?.response.data.error_code,
        error_msg: error?.response.data.error_msg,
        data: error?.response.data.response
      };
    }
  }

  async isUserFoundByMobile(signUpInput: SignUpInput, req) {
    try {
      const { data } = await axios.get(
        getBaseURL() + ENDPOINTS.Account.isUserFoundByMobile + '?mobile=' + signUpInput.mobile,
        requestHeaders(req)
      );
      return {
        is_successful: data.is_successful,
        error_code: data.error_code,
        error_msg: data.error_msg,
        data: data.response
      };
    } catch (error) {
      return {
        is_successful: error?.response.data.is_successful,
        error_code: error?.response.data.error_code,
        error_msg: error?.response.data.error_msg,
        data: error?.response.data.response
      };
    }
  }

  async isMobileAvailable(signUpInput: SignUpInput, req) {
    try {
      const { data } = await axios.get(
        getBaseURL() + ENDPOINTS.Account.isMobileAvailable + '?mobile=' + signUpInput.mobile,
        requestHeaders(req)
      );
      return {
        is_successful: data.is_successful,
        error_code: data.error_code,
        error_msg: data.error_msg,
        data: data.response
      };
    } catch (error) {
      return {
        is_successful: error?.response.data.is_successful,
        error_code: error?.response.data.error_code,
        error_msg: error?.response.data.error_msg,
        data: error?.response.data.response
      };
    }
  }

  async isValidReferral(signUpInput: SignUpInput, req) {
    try {
      const { data } = await axios.get(
        getBaseURL() + ENDPOINTS.Account.isValidReferral + '?referral_code=' + signUpInput.referral_code,
        requestHeaders(req)
      );
      return {
        is_successful: data.is_successful,
        error_code: data.error_code,
        error_msg: data.error_msg,
        data: data.response
      };
    } catch (error) {
      return {
        is_successful: error?.response.data.is_successful,
        error_code: error?.response.data.error_code,
        error_msg: error?.response.data.error_msg,
        data: error?.response.data.response
      };
    }
  }

  async getWallet(req) {
    try {
      const { data } = await axios.get(getBaseURL() + ENDPOINTS.WALLET.GetWallet, requestHeaders(req));
      return {
        is_successful: data.is_successful,
        error_code: data.error_code,
        error_msg: data.error_msg,
        data: data.response
      };
    } catch (error) {
      return {
        is_successful: error?.response.data.is_successful,
        error_code: error?.response.data.error_code,
        error_msg: error?.response.data.error_msg,
        data: error?.response.data.response
      };
    }
  }

  //Logout
  async logout(req) {
    try {
      const { data } = await axios.post(
        getBaseURL() + ENDPOINTS.User.Logout,
        {},
        requestHeaders(req)
      )
      return responseData(data)
    }
    catch (error) {
      return responseError(error)
    }
  } 
}
