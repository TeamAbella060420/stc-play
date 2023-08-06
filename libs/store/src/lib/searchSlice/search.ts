import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchData } from '@fe-monorepo/models';


type SearchStateSliceState = {
    shop: SearchData ;
    users: SearchData;
    teams: SearchData;
    tournaments: SearchData;
    bits: SearchData;
    streams: SearchData;
  };

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    shop: {
        total: 0,
        result: []
    },
    users: {
        total: 0,
        result: []
    },
    teams: {
        total: 0,
        result: []
    },
    tournaments: {
        total: 0,
        result: []
    },
    bits: {
        total: 0,
        result: []
    },
    streams: {
        total: 0,
        result: []
    }
  } as unknown as SearchStateSliceState,
  reducers: {
    setShop: (state, action: PayloadAction<SearchData>) => {
      const { total, result} = action.payload;
      state.shop = {
        total,
        result 
      };
    },
    setUsers: (state, action: PayloadAction<SearchData>) => {
        const { total, result} = action.payload;
        state.users = {
          total,
          result 
        };
    },
    setTournaments: (state, action: PayloadAction<SearchData>) => {
        const { total, result} = action.payload;
        state.tournaments = {
          total,
          result 
        };
    },
    setTeams: (state, action: PayloadAction<SearchData>) => {
        const { total, result} = action.payload;
        state.teams = {
          total,
          result 
        };
    },
    setBits: (state, action: PayloadAction<SearchData>) => {
        const { total, result} = action.payload;
        state.bits = {
          total,
          result 
        };
    },
    setStreams: (state, action: PayloadAction<SearchData>) => {
        const { total, result} = action.payload;
        state.streams = {
          total,
          result 
        };
    }
  }
});

export const { setShop, setUsers, setTournaments, setTeams, setBits, setStreams } = searchSlice.actions;
