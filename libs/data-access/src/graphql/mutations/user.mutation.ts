import { gql } from '@apollo/client';

export const LOGIN_MUTATION = {
  login: gql`
    mutation login($details: LoginInput) {
      login(details: $details) {
        error_msg,
        is_successful,
        error_code,
        data
         {
            token,
            is_email_verified,
            is_mobile_verified,
            is_2FA_required,
            is_password_update_required,
            regesteration_persona,
            is_mobile_update_required,
            identifier
         }
      }
    }
  `,

  appleLogin: gql`
    mutation appleSignin($details: AppleLoginInput) {
      appleSignin(details: $details) {
        error_msg,
        is_successful,
        error_code,
        data
         {
          token,
          username,
          preferred_theme
         }
      }
    }
  `,

  accessLink: gql`
    mutation createAccessLink($details: LoginInput) {
      createAccessLink(details: $details) {
        error_msg,
        is_successful,
        error_code,
        data
        {
            url,
            oauth_token,
            oauth_token_secret,
            oauth_callback_confirmed
        }
      }
    }
`,

  appleSignup: gql`
    mutation appleSignup($details: AppleSignupInput) {
      appleSignup(details: $details) {
        error_msg,
        is_successful,
        error_code,
        data
        {
          token,
          username,
          preferred_theme
        }
      }
    }
`,

  signup: gql`
    mutation signup($details: SignUpInput) {
      signup(details: $details) {
        error_msg,
        is_successful,
        error_code,
        data
        {
          token,
          identifier,
          is_2FA_required,
          preferred_theme
        }
      }
    }
  `,

  isValidCurrentPassword: gql`
  mutation fetchIsValidCurrentPassword($details: SignUpInput) {
      isValidCurrentPassword(details: $details) {
        error_msg
        error_code
        is_successful
      }
    }
  `,
};
