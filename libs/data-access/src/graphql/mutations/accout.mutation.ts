import { gql } from '@apollo/client';

export const ACCOUNT_MUTATION = {
  editAccount: gql`
    mutation editAccount($details: AccountInput) {
      editAccount(details: $details) {
        error_msg
        is_successful
        error_code
      }
    }
  `,
  updateUsername: gql`
    mutation updateUsername($details: AccountInput) {
      updateUsername(details: $details) {
        error_msg
        is_successful
        error_code
      }
    }
  `,
  updatePassword: gql`
    mutation updatePassword($details: AccountInput) {
      updatePassword(details: $details) {
        error_msg
        is_successful
        error_code
      }
    }
  `,

  resetPasswordByOtp: gql`
    mutation resetPasswordByOtp($details: AccountInput) {
      resetPasswordByOtp(details: $details) {
        error_msg
        is_successful
        error_code
      }
    }
  `,

  submitPersonalizationQuestionnaire: gql`
    mutation submitPersonalizationQuestionnaire($details: PersonalizeQuestionnaireInput) {
      submitPersonalizationQuestionnaire(details: $details) {
        error_msg
        is_successful
        error_code
      }
    }
  `,

  logout: gql`
    mutation logout {
      logout {
        error_msg
        error_code
        is_successful
      }
    }
  `,

  updateSettings: gql`
    mutation updateSettings($details: AccountInput) {
      updateSettings(details: $details) {
        error_msg
        is_successful
        error_code
      }
    }
  `
};
