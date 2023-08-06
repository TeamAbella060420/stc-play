import { gql } from '@apollo/client';

export const COMMUNITY_MUTATION = {
  unfollow: gql`
    mutation unfollowUser($details: AccountInput) {
    unfollowUser(details: $details) {
        error_msg,
        is_successful,
        error_code
      }
    }
  `,

 follow: gql`
  mutation followUser($details: AccountInput) {
    followUser(details: $details) {
      error_msg,
      is_successful,
      error_code
    }
  }
  `
}