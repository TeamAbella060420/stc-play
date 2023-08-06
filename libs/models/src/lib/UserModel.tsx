export interface UserModel {
  firstName: string;
  lastName: string;
  userId: string;
  username: string;
  display_name: string;
  avatar_url: string;
  email: string;
  token: string;
  is_2FA_required: number;
  mobile?: string;
  identifier: string;
  gamer_type: string;
  bio: string;
  points: number;
  total_followers: string;
  total_following: string;
  is_email_verified: number;
  password_updated_at: string;
}

export type UserSearchModel = {
  id: string;
  type: string;
  title: string;
  is_official_account: number;
  img: string;
  viewer_is_self_user: number;
  viewer_is_following: number;
  pagination?: string;
};
