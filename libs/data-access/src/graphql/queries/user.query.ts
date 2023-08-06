import { gql } from '@apollo/client';

export const USER_QUERY = {
  getUserContext: gql`
    query fetchUserContext {
      user {
        userId
        firstName
        lastName
        email
      }
    }
  `,

  isUserFoundByEmail: gql`
    query fetchIsUserFoundByEmail($details: SignUpInput) {
      isUserFoundByEmail(details: $details) {
        error_msg
        error_code
        is_successful
      }
    }
  `,

  lockDuration: gql`
    query lockDuration($details: LockDurationInput) {
      lockDuration(details: $details) {
        error_msg
        error_code
        is_successful
        data {
          time_remaining
        }
      }
    }
  `,

  isUserFoundByUsername: gql`
    query fetchIsUserFoundByUsername($details: SignUpInput) {
      isUserFoundByUsername(details: $details) {
        error_msg
        error_code
        is_successful
      }
    }
  `,

  isValidReferral: gql`
    query fetchIsValidReferral($details: SignUpInput) {
      isValidReferral(details: $details) {
        error_msg
        error_code
        is_successful
      }
    }
  `,

  isMobileAvailable: gql`
    query fetchIsMobileAvailable($details: SignUpInput) {
      isMobileAvailable(details: $details) {
        error_msg
        error_code
        is_successful
      }
    }
  `,

  getUserProfileInfo: gql`
    query fetchUserData {
      getUserProfileInfo {
        error_msg
        error_code
        is_successful
        data {
          username
          email
          display_name
          avatar_url
          mobile
          gamer_type
          points
          bio
          total_followers
          total_following
          password_updated_at
        }
      }
    }
  `,

  getWallet: gql`
    query fetchWallet {
      getWallet {
        error_msg
        error_code
        is_successful
        data {
          list {
            entity_type
            total_balance
            refrance_country_code
            wallet_id
          }
        }
      }
    }
  `
};
