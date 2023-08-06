export type TournamentModel = {
    id: string,
    type: string,
    title: string,
    img: string,
    game_code: string,
    is_live: number,
    pagination?: string
}