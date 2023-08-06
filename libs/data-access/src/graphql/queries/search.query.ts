import { gql } from '@apollo/client';

export const SEARCH_QUERY = {
  getGlobalSearch: gql`
    query fetchGlobalSearch ($details: SearchInput){
    getGlobalSearch(details: $details)  {
        error_msg,
        error_code,
        is_successful,
        data {
            shop {
                total,
                result {
                  id
                  type
                  title
                  combination_id
                  img
                  breadcrumbs
                  product_rating
                  total_raters
                  total_price
                  grand_total
                }
            }
            users {
                total,
                result {
                  id
                  type
                  title
                  img
                  is_official_account
                  viewer_is_self_user
                  viewer_is_following,
                  is_live
                }
           }
           teams {
              total,
              result { 
                id
                type
                title
                img
              }
           }
           tournaments {
              total,
              result { 
                id
                type
                title
                img
                game_code
                is_live
              }
           }
           bits {
            total,
              result { 
                id
                type
                title
                img
                number_of_likes
                views
                description
              }
          }
          streams {
            total,
              result { 
                id
                type
                title
                img
                total_followers
                description
                is_live
              }
          }
        }
      }
    }
  `,
  getAllSearchHistory: gql`
   query fetchSearchHistory {
    getAllSearchHistory {
       error_msg,
       error_code,
       is_successful,
       data {
        name,
        search_id
       }
     }
   }
 `,
  getSearchInfo: gql`
   query fetchSearchAllInfo ($details: SearchInput){
    getSearchInfo(details: $details)  {
       error_msg,
       error_code,
       is_successful,
       data {
         id,
         type,
         title,
         breadcrumbs,
         img,
         is_official_account,
         viewer_is_self_user,
         viewer_is_following,
         pagination,
         product_rating,
         total_raters,
         grand_total,
         total_price,
         game_code,
         is_live
        }
     }
   }
 `
};
