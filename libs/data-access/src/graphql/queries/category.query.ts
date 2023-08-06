import { gql } from '@apollo/client';

export const CATEGORY_QUERY = {
  getAllCategory: gql`
  query fetchCategory {
    getAllCategory {
      error_msg,
      error_code,
      is_successful,
      data {
        category_id,
        category_seo_code,
        name_en,
        name,
        sort_id,
        img,
        parent_category_id,
        sub_categories {
          category_id
        }
      }
    }
  }
  `,
};
