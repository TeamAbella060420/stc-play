import { Injectable } from '@nestjs/common';
import { getBaseURL, ENDPOINTS } from './../../../common/endpoints';
import { requestHeaders } from './../../../common/request.header';
import axios from 'axios';
import { responseData } from '../../../common/response.data';
import { responseError } from '../../../common/response.error';

@Injectable()
export class AccountService {
  async update(accountInput, req) {
    try {
      const { data } = await axios.post(
        getBaseURL() + ENDPOINTS.Account.editAccount,
        {
          email: accountInput.email
        },
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

  async getInfoByUsername(accountInput, req) {
    try {
      const { data } = await axios.get(
        getBaseURL() + ENDPOINTS.Account.getInfoByUsername + '?username=' + accountInput.username,
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

  async getUserProfileInfo(req) {
    try {
      const { data } = await axios.get(getBaseURL() + ENDPOINTS.Account.getUserProfileInfo, requestHeaders(req));
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

  async updateAddress(addressInput, req) {
    try {
      const { data } = await axios.post(
        getBaseURL() + ENDPOINTS.Account.updateAddress,
        {
          name: addressInput.name,
          address_id: addressInput.address_id,
          mobile: addressInput.mobile,
          mobile_code: addressInput.mobile_code
        },
        requestHeaders(req)
      );
      return responseData(data);
    } catch (error) {
      return {
        is_successful: error?.response.data.is_successful,
        error_code: error?.response.data.error_code,
        error_msg: error?.response.data.error_msg,
        data: error?.response.data.response
      };
    }
  }

  async updatePassword(accountInput, req) {
    try {
      const { data } = await axios.post(
        getBaseURL() + ENDPOINTS.Account.updatePassword,
        {
          old_password: accountInput.old_password,
          new_password: accountInput.new_password
        },
        requestHeaders(req)
      );
      return responseData(data);
    } catch (error) {
      return responseError(error);
    }
  }

  async resetPasswordByOtp(accountInput, req) {
    const tempReq = req;
    if (accountInput?.token) tempReq['headers']['x-api-token'] = accountInput.token;

    try {
      const { data } = await axios.post(
        getBaseURL() + ENDPOINTS.Account.resetPasswordByOtp,
        {
          password: accountInput.password
        },
        requestHeaders(tempReq)
      );
      return responseData(data);
    } catch (error) {
      return responseError(error);
    }
  }

  async updateProfile(accountInputObject, req) {
    try {
      const { data } = await axios.post(
        getBaseURL() + ENDPOINTS.Account.editAccount,
        {
          accountInputObject
        },
        requestHeaders(req)
      );
      return responseData(data);
    } catch (error) {
      return responseError(error);
    }
  }

  async updateUsername(accountInput, req) {
    try {
      console.log(accountInput);
      const { data } = await axios.post(
        getBaseURL() + ENDPOINTS.Account.updateUsername,
        {
          username: accountInput.username,
          email: accountInput.email
        },
        requestHeaders(req)
      );
      return responseData(data);
    } catch (error) {
      return responseError(error);
    }
  }

  async updateSettings(settingsParam, req) {
    try {
      const { data } = await axios.post(
        getBaseURL() + ENDPOINTS.Account.editAccount,
        {
          preferred_language: settingsParam?.preferred_language,
          preferred_currency: settingsParam?.preferred_currency,
          preferred_theme: settingsParam?.preferred_theme
        },
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
}
