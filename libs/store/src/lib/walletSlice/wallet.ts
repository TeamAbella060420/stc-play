import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WalletModel } from '@fe-monorepo/models';

type SliceState = {
  wallet: WalletModel;
  userWallet: WalletModel['list'][0];
};

const userWallet = {
  entity_type: '',
  wallet_id: '',
  refrance_country_code: '',
  total_balance: ''
};

const initialState: SliceState = {
  wallet: {
    list: [userWallet]
  },
  userWallet: userWallet
};

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setWalletList: (state, action: PayloadAction<WalletModel>) => {
      state.wallet = action.payload;
    },
    setWallet: (state, action: PayloadAction<WalletModel>) => {
      const wallet = action.payload.list.find(item => item.entity_type === 'user');
      if (wallet) {
        state.userWallet = wallet;
      }
    },
    clearWallet: state => {
      state = initialState;
    }
  }
});

export const { setWalletList, setWallet } = walletSlice.actions;
