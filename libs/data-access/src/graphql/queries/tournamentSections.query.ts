import { gql } from '@apollo/client';

export const TOURNAMENT_SECTIONS_QUERY =
{
  getAllTournamentSections: gql`
   query fetchTournamentSections {
    getAllTournamentSections {
       error_msg,
       error_code,
       is_successful,
       data {
            section_code
            name
            list {
              tournament_id,
              section_id,
              is_team_based,
              name,
              is_paid,
              status_code,
              registration_start_date,
              registration_end_date,
              tournament_start_date,
              max_number_of_participants,
              total_number_of_participants,
              banner_url,
              reference_bracket_code,
              hosted_by,
              team_size,
              registration_fee,
              platforms,
              prize
            },
            sort_id
       }
     }
   }
 `
};
