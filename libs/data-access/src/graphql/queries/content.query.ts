import { gql } from '@apollo/client';

export const CONTENT_QUERY = {
  getStaticPage: gql`
    query fetchStaticPage ($details: ContentInput) {
      getStaticPage(details: $details) {
        error_msg,
        error_code,
        is_successful,
        data {
          page_code,
          content,
          created_at
        }
      }
    }
  `
};
