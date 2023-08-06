import { BitsModel } from "./BitsModel";
import { ShopModel } from "./ShopModel";
import { StreamsModel } from "./StreamsModel";
import { TeamsModel } from "./TeamsModel";
import { TournamentModel } from "./TournamentModel";
import { UserSearchModel } from "./UserModel";

export type SearchModel = {
    name: string,
    search_id: number,
    identifier: string,
    type?: string,
    direction?: string,
    pagination?: string
}

export type SearchHistoryModel = {
    title: string,
    search_id: number
}


export type SearchData = {
    total: number;
    result: [ShopModel] | [BitsModel] | [StreamsModel] | [TeamsModel] | [TournamentModel] | [UserSearchModel] ;
};

