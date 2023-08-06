import { gql } from '@apollo/client';

export const STATISTICS_QUERY = 
{
    getAllTournamentStatistecs: gql`
   query fetchTournamentStatistecs {
    getAllTournamentStatistecs {
       error_msg,
       error_code,
       is_successful,
       data {
            active_tournaments
            active_participants
            active_prizes
       }
     }
   }
 `
};
