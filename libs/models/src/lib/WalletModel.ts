export interface WalletModel {
  list: [WalletData];
}

interface WalletData {
  entity_type: string;
  total_balance: string;
  refrance_country_code: string;
  wallet_id: string;
}
