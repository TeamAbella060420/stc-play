import { gql } from '@apollo/client';

export const GEO_QUERY = {
 getAllCountries: gql`
    query fetchAllCountries {
     countries {
        error_msg,
        error_code,
        is_successful,
        data {
            name,
            country_code_iso_2,
            country_code_iso_3,
            phone_code_iso,
            phone_number_length,
            is_otp_required
        }
      }
    }
  `
};
