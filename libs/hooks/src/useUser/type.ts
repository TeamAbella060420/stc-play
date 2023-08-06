import { AccountModel, LockDurationModel } from '@fe-monorepo/models';

export type EditAccountResponse = {
  editAccount: {
    is_successful: boolean;
    error_code: string;
    error_msg: string;
    data: ResponseData;
  };
};

export type LogoutResponse = {
  logout: {
    is_successful: boolean;
    error_code: string;
    error_msg: string;
  };
};

export type UpdateAccountResponse = {
  updateUsername: {
    is_successful: boolean;
    error_code: string;
    error_msg: string;
    data: ResponseData;
  };
};

export type ResponseData = {
  token: string;
};

export type ResetPasswordResponse = {
  resetPasswordByOtp: {
    is_successful: boolean;
    error_code: string;
    error_msg: string;
    data: ResponseData;
  };
};

export type AccountParams = {
  details: AccountModel;
};

export type UpdateSettingsResponse = {
  updateSettings: {
    is_successful: boolean;
    error_code: string;
    error_msg: string;
    data: ResponseData;
  };
};

export type UpdatePasswordResponse = {
  updatePassword: {
    is_successful: boolean;
    error_code: string;
    error_msg: string;
    data: ResponseData;
  };
};

export type ValidPasswordResponse = {
  isValidCurrentPassword: {
    is_successful: boolean;
    error_code: string;
    error_msg: string;
    data: ResponseData;
  };
};

/*** Lock Duration ***/
export type LockDurationResponse = {
  lockDuration: {
    is_successful: boolean;
    error_code: string;
    error_msg: string;
    data: LockDurationData;
  };
};

export type LockDurationParams = {
  details: LockDurationModel;
};

type LockDurationData = {
  time_remaining: number;
};
