export type AccountModel = {
  mobile?: string;
  email?: string;
  username?: string;
  password?: string;
  nationality_code?: string;
  bio?: string;
  avatar_url?: string;
  birthdate?: string;
  country_code?: string;
  display_name?: string;
  gender_code?: string;
  preferred_language?: string;
  preferred_currency?: string;
  preferred_theme?: string;
  payment_account_stcpay?: string;
  payment_account_paypal?: string;
  payment_account_payfort?: string;
  notify_for_chat?: boolean;
  notify_for_tournament?: boolean;
  notify_for_comments?: boolean;
  notify_for_marketing?: string;
  preferred_timezone?: string;
  is_2FA_required?: number;
  regesteration_persona?: string;
  gamer_type?: string;
  is_matchmaking_enabled?: boolean;
  mobile_code?: string;
  token?: string;
  old_password?: string;
  new_password?: string;
};

export type LockDurationModel = {
  type?: string;
  username?: string;
};
