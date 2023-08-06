import { gql } from '@apollo/client';

export const PRODUCT_QUERY = {
  getAllProduct: gql`
  query fetchProduct ($details: ProductInput) {
    getAllProduct(details: $details) {
      error_msg,
      error_code,
      is_successful,
      data {
        product_id,
        is_preorder,
        name_en,
        name,
        is_tax_applicable,
        description_en,
        details_en,
        usage_instructions_en,
        quantity,
        number_of_likes,
        is_digital,
        sort_id,
        category_id,
        sku,
        media,
        unit_price,
        discount_rate,
        discount_price,
        total_price,
        total_tax,
        grand_total,
        combination_id,
        lowest_grand_total
      }
    }
  }
  `,
};
