export type TournamentData =
{
  tournament_id: number,
  section_id: number,
  is_team_based: number,
  name: string,
  is_paid: number,
  status_code: string,
  registration_start_date: string,
  registration_end_date: string,
  tournament_start_date: string,
  max_number_of_participants: number,
  total_number_of_participants: number,
  banner_url: string,
  reference_bracket_code: string,
  hosted_by: string,
  team_size: number,
  registration_fee: number,
  platforms: string[],
  prize: number
}

export type SectionDataModel =
{
  section_code: string,
  name: string,
  list: TournamentData[],
  sort_id: number
}
