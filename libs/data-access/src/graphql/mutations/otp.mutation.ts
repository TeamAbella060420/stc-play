import { gql } from '@apollo/client';

export const OTP_MUTATION = {
  requestOTP: gql`
    mutation requestOTP($details: OtpInput) {
       requestOTP(details: $details) {
        error_msg,
        is_successful,
        error_code,
        data
        {
          token
        }
      }
    }
  `,

  requestResetPasswordOTP: gql`
    mutation requestResetPasswordOTP($details: OtpInput) {
      requestResetPasswordOTP(details: $details) {
        error_msg,
        is_successful,
        error_code,
        data
        {
          token
        }
      }
    }
  `,

  verifyOTP: gql`
  mutation verifyOTP($details: OtpInput) {
    verifyOTP(details: $details) {
      error_msg,
      is_successful,
      error_code,
      data
      {
        token
      }
    }
  }
  `
};
