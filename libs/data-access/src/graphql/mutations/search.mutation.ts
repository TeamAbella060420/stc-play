import { gql } from '@apollo/client';

export const SEARCH_MUTATION = {
 clearSearchHistory: gql`
    mutation clearSearchHistory($details: SearchInput) {
    clearSearchHistory(details: $details) {
        error_msg,
        is_successful,
        error_code
      }
    }
  `,
  saveSearchHistory: gql`
    mutation saveSearchHistory($details: SearchInput) {
    saveSearchHistory(details: $details) {
      error_msg,
      is_successful,
      error_code
    }
   }
`,
 clearAllSearchHistory: gql`
    mutation clearAllSearchHistory {
    clearAllSearchHistory{
        error_msg,
        is_successful,
        error_code
    }
  }
`,
};
