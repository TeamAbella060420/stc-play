import { SVGProps, FunctionComponent } from 'react';
//Social
import Activity, { ReactComponent as ActivityComponent } from 'libs/assets/src/icons/logos/icon_activity.svg';
import BattleNet, { ReactComponent as BattleNetComponent } from 'libs/assets/src/icons/logos/icon_battlenet.svg';
import Discord, { ReactComponent as DiscordComponent } from 'libs/assets/src/icons/logos/icon_discord.svg';
import FullScreen, { ReactComponent as FullScreenComponent } from 'libs/assets/src/icons/logos/icon_full_screen.svg';
import Instagram, { ReactComponent as InstagramComponent } from 'libs/assets/src/icons/logos/icon_instagram.svg';
import Instagram2, { ReactComponent as Instagram2Component } from 'libs/assets/src/icons/logos/icon_Instagram2.svg';
import Minimize, { ReactComponent as MinimizeComponent } from 'libs/assets/src/icons/logos/icon_minimize.svg';
import Nintendo, { ReactComponent as NintendoComponent } from 'libs/assets/src/icons/logos/icon_nintendo.svg';
import Origin, { ReactComponent as OriginComponent } from 'libs/assets/src/icons/logos/icon_origin.svg';
import LinkedIn, { ReactComponent as LinkedInComponent } from 'libs/assets/src/icons/logos/icon_linkedin.svg';
import PlayStation, { ReactComponent as PlayStationComponent } from 'libs/assets/src/icons/logos/icon_playstation.svg';
import Snapchat, { ReactComponent as SnapchatComponent } from 'libs/assets/src/icons/logos/icon_snapchat.svg';
import Steam, { ReactComponent as SteamComponent } from 'libs/assets/src/icons/logos/icon_steam.svg';
import Twitch, { ReactComponent as TwitchComponent } from 'libs/assets/src/icons/logos/icon_twitch.svg';
import Twitter, { ReactComponent as TwitterComponent } from 'libs/assets/src/icons/logos/icon_twitter.svg';
import Twitter2, { ReactComponent as Twitter2Component } from 'libs/assets/src/icons/logos/icon_twitter2.svg';
import Ubisoft, { ReactComponent as UbisoftComponent } from 'libs/assets/src/icons/logos/icon_ubisoft.svg';
import Xbox, { ReactComponent as XboxComponent } from 'libs/assets/src/icons/logos/icon_xbox.svg';
import YouTube, { ReactComponent as YouTubeComponent } from 'libs/assets/src/icons/logos/icon_youtube.svg';
import YouTube2, { ReactComponent as YouTube2Component } from 'libs/assets/src/icons/logos/icon_youtube2.svg';
import Facebook, { ReactComponent as FacebookComponent } from 'libs/assets/src/icons/logos/icon_facebook.svg';

//Fill
import AddCircleFill, { ReactComponent as AddCircleFillComponent } from 'libs/assets/src/icons/fill/icon_add_circle_fill.svg';
import AddUserFill, { ReactComponent as AddUserFillComponent } from 'libs/assets/src/icons/fill/icon_add_user_fill.svg';
import AutomatedSeedFill, { ReactComponent as AutomatedSeedFillComponent } from 'libs/assets/src/icons/fill/icon_automated_seed_fill.svg';
import BellFill, { ReactComponent as BellFillComponent } from 'libs/assets/src/icons/fill/icon_bell_fill.svg';
import BoxFill, { ReactComponent as BoxFillComponent } from 'libs/assets/src/icons/fill/icon_box_fill.svg';
import CalculatorFill, { ReactComponent as CalculatorFillComponent } from 'libs/assets/src/icons/fill/icon_calculator_fill.svg';
import CalendarFill, { ReactComponent as CalendarFillComponent } from 'libs/assets/src/icons/fill/icon_calendar_fill.svg';
import CallFill, { ReactComponent as CallFillComponent } from 'libs/assets/src/icons/fill/icon_call_fill.svg';
import CameraFill, { ReactComponent as CameraFillComponent } from 'libs/assets/src/icons/fill/icon_camera_fill.svg';
import CartFill, { ReactComponent as CartFillComponent } from 'libs/assets/src/icons/fill/icon_cart_fill.svg';
import ChampionFill, { ReactComponent as ChampionFillComponent } from 'libs/assets/src/icons/fill/icon_champion_fill.svg';
import Talk, { ReactComponent as TalkComponent } from 'libs/assets/src/icons/regular/icon_talk.svg';

import ChatFill, { ReactComponent as ChatFillComponent } from 'libs/assets/src/icons/fill/icon_chat_fill.svg';
import CheckInCircleFill, { ReactComponent as CheckInCircleFillComponent } from 'libs/assets/src/icons/fill/icon_check_in_circle_fill.svg';
import CloseCircleFill, { ReactComponent as CloseCircleFillComponent } from 'libs/assets/src/icons/fill/icon_close_circle_fill.svg';
import CommentFill, { ReactComponent as CommentFillComponent } from 'libs/assets/src/icons/fill/icon_comment_fill.svg';
import CommunityCircleFill, {
  ReactComponent as CommunityCircleFillComponent
} from 'libs/assets/src/icons/fill/icon_community_circle_fill.svg';
import CopyFill, { ReactComponent as CopyFillComponent } from 'libs/assets/src/icons/fill/icon_copy_fill.svg';
import CouponFill, { ReactComponent as CouponFillComponent } from 'libs/assets/src/icons/fill/icon_coupon_fill.svg';
import DeclineFill, { ReactComponent as DeclineFillComponent } from 'libs/assets/src/icons/fill/icon_decline_fill.svg';
import EditFill, { ReactComponent as EditFillComponent } from 'libs/assets/src/icons/fill/icon_edit_fill.svg';
import ExclamationFill, { ReactComponent as ExclamationFillComponent } from 'libs/assets/src/icons/fill/icon_exclamation_fill.svg';
import EyeFill, { ReactComponent as EyeFillComponent } from 'libs/assets/src/icons/fill/icon_eye_fill.svg';
import FlagFill, { ReactComponent as FlagFillComponent } from 'libs/assets/src/icons/fill/icon_flag_fill.svg';
import FoodFill, { ReactComponent as FoodFillComponent } from 'libs/assets/src/icons/fill/icon_food_fill.svg';
import HomeFill, { ReactComponent as HomeFillComponent } from 'libs/assets/src/icons/fill/icon_home_fill.svg';
import LikeFill, { ReactComponent as LikeFillComponent } from 'libs/assets/src/icons/fill/icon_like_fill.svg';
import LocationSignFill, { ReactComponent as LocationSignFillComponent } from 'libs/assets/src/icons/fill/icon_location_sign_fill.svg';
import LockFill, { ReactComponent as LockFillComponent } from 'libs/assets/src/icons/fill/icon_lock_fill.svg';
import MaintenanceFill, { ReactComponent as MaintenanceFillComponent } from 'libs/assets/src/icons/fill/icon_maintenance_fill.svg';
import ManageReferee2Fill, {
  ReactComponent as ManageReferee2FillComponent
} from 'libs/assets/src/icons/fill/icon_manage_referees2_fill.svg';
import ManageRequestsFill, {
  ReactComponent as ManageRequestsFillComponent
} from 'libs/assets/src/icons/fill/icon_manage_requests_fill.svg';
import MicrophoneFill, { ReactComponent as MicrophoneFillComponent } from 'libs/assets/src/icons/fill/icon_microphone_fill.svg';
import MinusFill, { ReactComponent as MinusFillComponent } from 'libs/assets/src/icons/fill/icon_minus_fill.svg';
import MoneyFill, { ReactComponent as MoneyFillComponent } from 'libs/assets/src/icons/fill/icon_money_fill.svg';
import MyOrderFill, { ReactComponent as MyOrderFillComponent } from 'libs/assets/src/icons/fill/icon_my_order_fill.svg';
import ParticipantsFill, { ReactComponent as ParticipantsFillComponent } from 'libs/assets/src/icons/fill/icon_participants_fill.svg';
import PinFill, { ReactComponent as PinFillComponent } from 'libs/assets/src/icons/fill/icon_pin_fill.svg';
import PlayFill, { ReactComponent as PlayFillComponent } from 'libs/assets/src/icons/fill/icon_play_fill.svg';
import QuestionFill, { ReactComponent as QuestionFillComponent } from 'libs/assets/src/icons/fill/icon_question_fill.svg';
import RadioButtonFill, { ReactComponent as RadioButtonFillComponent } from 'libs/assets/src/icons/fill/icon_radio_button_fill.svg';
import ScheduleFill, { ReactComponent as ScheduleFillComponent } from 'libs/assets/src/icons/fill/icon_schedule_fill.svg';
import SendFill, { ReactComponent as SendFillComponent } from 'libs/assets/src/icons/fill/icon_send_fill.svg';
import SettingsFill, { ReactComponent as SettingsFillComponent } from 'libs/assets/src/icons/fill/icon_settings_fill.svg';
import ShopFill, { ReactComponent as ShopFillComponent } from 'libs/assets/src/icons/fill/icon_shop_fill.svg';
import StarFill, { ReactComponent as StarFillComponent } from 'libs/assets/src/icons/fill/icon_star_fill.svg';
import TeamFill, { ReactComponent as TeamFillComponent } from 'libs/assets/src/icons/fill/icon_team_fill.svg';
import TimeFill, { ReactComponent as TimeFillComponent } from 'libs/assets/src/icons/fill/icon_time_fill.svg';
import TrashFill, { ReactComponent as TrashFillComponent } from 'libs/assets/src/icons/fill/icon_trash_fill.svg';
import TVFill, { ReactComponent as TVFillComponent } from 'libs/assets/src/icons/fill/icon_tv_fill.svg';
import UplockFill, { ReactComponent as UplockFillComponent } from 'libs/assets/src/icons/fill/icon_unlock_fill.svg';
import UploadFill, { ReactComponent as UploadFillComponent } from 'libs/assets/src/icons/fill/icon_upload_fill.svg';
import UserFill, { ReactComponent as UserFillComponent } from 'libs/assets/src/icons/fill/icon_user_fill.svg';
import VideoFill, { ReactComponent as VideoFillComponent } from 'libs/assets/src/icons/fill/icon_video_fill.svg';
import VRFill, { ReactComponent as VRFillComponent } from 'libs/assets/src/icons/fill/icon_vr_fill.svg';
import WaitlistFill, { ReactComponent as WaitlistFillComponent } from 'libs/assets/src/icons/fill/icon_waitlist_fill.svg';
import WalletFill, { ReactComponent as WalletFillComponent } from 'libs/assets/src/icons/fill/icon_wallet_fill.svg';
import WhistleFill, { ReactComponent as WhistleFillComponent } from 'libs/assets/src/icons/fill/icon_whistle_fill.svg';
import FacebookFill, { ReactComponent as FacebookFillComponent } from 'libs/assets/src/icons/fill/icon_facebook_fill.svg';
import TwitterFill, { ReactComponent as TwitterFillComponent } from 'libs/assets/src/icons/fill/icon_twitter_fill.svg';
import GoogleFill, { ReactComponent as GoogleFillComponent } from 'libs/assets/src/icons/fill/icon_google_fill.svg';
import AppleFill, { ReactComponent as AppleFillComponent } from 'libs/assets/src/icons/fill/icon_apple_fill.svg';
import CheckMarkFill, { ReactComponent as CheckMarkFillComponent } from "libs/assets/src/icons/fill/icon_check_mark_fill.svg"
import CheckFill, { ReactComponent as CheckFillComponent } from 'libs/assets/src/icons/fill/icon_check_circle.svg';

//Outline
import AddCartOutline, { ReactComponent as AddCartOutlineComponent } from 'libs/assets/src/icons/outline/icon_add_cart_outline.svg';
import AddCircleOutline, { ReactComponent as AddCircleOutlineComponent } from 'libs/assets/src/icons/outline/icon_add_circle_outline.svg';
import AddImageOutline, { ReactComponent as AddImageOutlineComponent } from 'libs/assets/src/icons/outline/icon_add_image_outline.svg';
import AddOutline, { ReactComponent as AddOutlineComponent } from 'libs/assets/src/icons/outline/icon_add_outline.svg';
import AddPostOutline, { ReactComponent as AddPostOutlineComponent } from 'libs/assets/src/icons/outline/icon_add_post_outline.svg';
import AddUserOutline, { ReactComponent as AddUserOutlineComponent } from 'libs/assets/src/icons/outline/icon_add_user_outline.svg';
import AddUser2Outline, { ReactComponent as AddUser2OutlineComponent } from 'libs/assets/src/icons/outline/icon_add_user_outline_2.svg';
import AnalyticsOutline, { ReactComponent as AnalyticsOutlineComponent } from 'libs/assets/src/icons/outline/icon_analytics_outline.svg';
import AttachmentOutline, { ReactComponent as AttachmentOutlineComponent } from 'libs/assets/src/icons/outline/icon_attachment_outline.svg';
import AutomatedSeedOutline, {
  ReactComponent as AutomatedSeedOutlineComponent
} from 'libs/assets/src/icons/outline/icon_automated_seed_outline.svg';
import BellOutline, { ReactComponent as BellOutlineComponent } from 'libs/assets/src/icons/outline/icon_bell_outline.svg';
import BellWhiteOutline, { ReactComponent as BellWhiteOutlineComponent } from 'libs/assets/src/icons/outline/icon_bell_white_outline.svg';
import BoxOutline, { ReactComponent as BoxOutlineComponent } from 'libs/assets/src/icons/outline/icon_box_outline.svg';
import CalCulatorOutline, { ReactComponent as CalCulatorOutlineComponent } from 'libs/assets/src/icons/outline/icon_calculator_outline.svg';
import CalendarOutline, { ReactComponent as CalendarOutlineComponent } from 'libs/assets/src/icons/outline/icon_calendar_outline.svg';
import CallOutline, { ReactComponent as CallOutlineComponent } from 'libs/assets/src/icons/outline/icon_call_outline.svg';
import CameraOutline, { ReactComponent as CameraOutlineComponent } from 'libs/assets/src/icons/outline/icon_camera_outline.svg';
import CartOutline, { ReactComponent as CartOutlineComponent } from 'libs/assets/src/icons/outline/icon_cart_outline.svg';
import ChampionOutline, { ReactComponent as ChampionOutlineComponent } from 'libs/assets/src/icons/outline/icon_champion_outline.svg';
import ChatOutline, { ReactComponent as ChatOutlineComponent } from 'libs/assets/src/icons/outline/icon_chat_outline.svg';
import CheckInCircleOutline, {
  ReactComponent as CheckInCircleOutlineComponent
} from 'libs/assets/src/icons/outline/icon_check_in_circle_outline.svg';
import CloseCircleOutline, {
  ReactComponent as CloseCircleOutlineComponent
} from 'libs/assets/src/icons/outline/icon_close_circle_outline.svg';
import CloseOutline, { ReactComponent as CloseOutlineComponent } from 'libs/assets/src/icons/outline/icon_close_outline.svg';
import CommentOutline, { ReactComponent as CommentOutlineComponent } from 'libs/assets/src/icons/outline/icon_comment_outline.svg';
import CommunityCircleOutline, {
  ReactComponent as CommunityCircleOutlineComponent
} from 'libs/assets/src/icons/outline/icon_community_circle_outline.svg';
import CopyOutline, { ReactComponent as CopyOutlineComponent } from 'libs/assets/src/icons/outline/icon_copy_outline.svg';
import CouponOutline, { ReactComponent as CouponOutlineComponent } from 'libs/assets/src/icons/outline/icon_coupon_outline.svg';
import DeclineOutline, { ReactComponent as DeclineOutlineComponent } from 'libs/assets/src/icons/outline/icon_decline_outline.svg';
import DownloadOutline, { ReactComponent as DownloadOutlineComponent } from 'libs/assets/src/icons/outline/icon_download_outline.svg';
import EditOutline, { ReactComponent as EditOutlineComponent } from 'libs/assets/src/icons/outline/icon_edit_outline.svg';
import EndCallOutline, { ReactComponent as EndCallOutlineComponent } from 'libs/assets/src/icons/outline/icon_endCall_outline.svg';
import ExclamationOutline, {
  ReactComponent as ExclamationOutlineComponent
} from 'libs/assets/src/icons/outline/icon_exclamation_outline.svg';
import EyeOutline, { ReactComponent as EyeOutlineComponent } from 'libs/assets/src/icons/outline/icon_eye_outline.svg';
import EyeClosedOutline, { ReactComponent as EyeClosedOutlineComponent } from 'libs/assets/src/icons/outline/icon_eye_closed_outline.svg';
import FilterOutline, { ReactComponent as FilterOutlineComponent } from 'libs/assets/src/icons/outline/icon_filter_outline.svg';
import FlagOutline, { ReactComponent as FlagOutlineComponent } from 'libs/assets/src/icons/outline/icon_flag_outline.svg';
import FoodOutline, { ReactComponent as FoodOutlineComponent } from 'libs/assets/src/icons/outline/icon_food_outline.svg';
import HomeOutline, { ReactComponent as HomeOutlineComponent } from 'libs/assets/src/icons/outline/icon_home_outline.svg';
import HeartOutline, { ReactComponent as HeartOutlineComponent } from 'libs/assets/src/icons/outline/icon_heart_outline.svg';

import ImageOutline, { ReactComponent as ImageOutlineComponent } from 'libs/assets/src/icons/outline/icon_placeholder_image_outline.svg';
import LikeOutline, { ReactComponent as LikeOutlineComponent } from 'libs/assets/src/icons/outline/icon_like_outline.svg';
import LinkOutline, { ReactComponent as LinkOutlineComponent } from 'libs/assets/src/icons/outline/icon_link_outline.svg';
import LocationSignOutline, {
  ReactComponent as LocationSignOutlineComponent
} from 'libs/assets/src/icons/outline/icon_location_sign_outline.svg';
import LockOutline, { ReactComponent as LockOutlineComponent } from 'libs/assets/src/icons/outline/icon_lock_outline.svg';
import LogoutOutline, { ReactComponent as LogoutOutlineComponent } from 'libs/assets/src/icons/outline/icon_logout_outline.svg';
import MaintenanceOutline, {
  ReactComponent as MaintenanceOutlineComponent
} from 'libs/assets/src/icons/outline/icon_maintenance_outline.svg';
import ManageReferee2Outline, {
  ReactComponent as ManageReferee2OutlineComponent
} from 'libs/assets/src/icons/outline/icon_manage_referees2_outline.svg';
import ManageRefereesOutline, {
  ReactComponent as ManageRefereesOutlineComponent
} from 'libs/assets/src/icons/outline/icon_manage_referees_outline.svg';
import ManageRequestsOutline, {
  ReactComponent as ManageRequestsOutlineComponent
} from 'libs/assets/src/icons/outline/icon_manage_requests_outline.svg';
import MinusOutline, { ReactComponent as MinusOutlineComponent } from 'libs/assets/src/icons/outline/icon_minus_outline.svg';
import MicrophoneOutline, { ReactComponent as MicrophoneOutlineComponent } from 'libs/assets/src/icons/outline/icon_microphone_outline.svg';
import MoneyOutline, { ReactComponent as MoneyOutlineComponent } from 'libs/assets/src/icons/outline/icon_money_outline.svg';
import MyOrderOutline, { ReactComponent as MyOrderOutlineComponent } from 'libs/assets/src/icons/outline/icon_my_order_outline.svg';
import ParticipantsOutline, {
  ReactComponent as ParticipantsOutlineComponent
} from 'libs/assets/src/icons/outline/icon_participants_outline.svg';
import NewBellOutline, { ReactComponent as NewBellOutlineComponent } from 'libs/assets/src/icons/outline/icon_newbell_outline.svg';
import NewChatOutline, { ReactComponent as NewChatOutlineComponent } from 'libs/assets/src/icons/outline/icon_new_chat_outline.svg';
import NewGameOutline, { ReactComponent as NewGameOutlineComponent } from 'libs/assets/src/icons/outline/icon_new_game_outline.svg';
import NewTeamOutline, { ReactComponent as NewTeamOutlineComponent } from 'libs/assets/src/icons/outline/icon_new_team_outline.svg';
import PictureOutline, { ReactComponent as PictureOutlineComponent } from 'libs/assets/src/icons/outline/icon_picture_outline.svg';
import PinOutline, { ReactComponent as PinOutlineComponent } from 'libs/assets/src/icons/outline/icon_pin_outline.svg';
import PlayOutline, { ReactComponent as PlayOutlineComponent } from 'libs/assets/src/icons/outline/icon_play_outline.svg';
import PreferencesOutline, {
  ReactComponent as PreferencesOutlineComponent
} from 'libs/assets/src/icons/outline/icon_preferences_outline.svg';
import QuestionOutline, { ReactComponent as QuestionOutlineComponent } from 'libs/assets/src/icons/outline/icon_question_outline.svg';
import RadioButtonOutline, {
  ReactComponent as RadioButtonOutlineComponent
} from 'libs/assets/src/icons/outline/icon_radio_button_outline.svg';
import RepostOutline, { ReactComponent as RepostOutlineComponent } from 'libs/assets/src/icons/outline/icon_repost_outline.svg';
import ScheduleOutline, { ReactComponent as ScheduleOutlineComponent } from 'libs/assets/src/icons/outline/icon_schedule_outline.svg';
import SearchOutline, { ReactComponent as SearchOutlineComponent } from 'libs/assets/src/icons/outline/icon_search_outline.svg';
import SendOutline, { ReactComponent as SendOutlineComponent } from 'libs/assets/src/icons/outline/icon_send_outline.svg';
import SettingsOutline, { ReactComponent as SettingsOutlineComponent } from 'libs/assets/src/icons/outline/icon_settings_outline.svg';
import ShareOutline, { ReactComponent as ShareOutlineComponent } from 'libs/assets/src/icons/outline/icon_share_outline.svg';
import ShopOutline, { ReactComponent as ShopOutlineComponent } from 'libs/assets/src/icons/outline/icon_shop_outline.svg';
import SpeakerOutline, { ReactComponent as SpeakerOutlineComponent } from 'libs/assets/src/icons/outline/icon_speaker_outline.svg';
import StarOutline, { ReactComponent as StarOutlineComponent } from 'libs/assets/src/icons/outline/icon_star_outline.svg';
import TeamOutline, { ReactComponent as TeamOutlineComponent } from 'libs/assets/src/icons/outline/icon_team_outline.svg';
import TimeOutline, { ReactComponent as TimeOutlineComponent } from 'libs/assets/src/icons/outline/icon_time_outline.svg';
import TrashOutline, { ReactComponent as TrashOutlineComponent } from 'libs/assets/src/icons/outline/icon_trash_outline.svg';
import TVOutline, { ReactComponent as TVOutlineComponent } from 'libs/assets/src/icons/outline/icon_tv_outline.svg';
import UnfollowOutline, { ReactComponent as UnfollowOutlineComponent } from 'libs/assets/src/icons/outline/icon_unfollow_outline.svg';
import UplockOutline, { ReactComponent as UplockOutlineComponent } from 'libs/assets/src/icons/outline/icon_unlock_outline.svg';
import UploadOutline, { ReactComponent as UploadOutlineComponent } from 'libs/assets/src/icons/outline/icon_upload_outline.svg';
import UserOutline, { ReactComponent as UserOutlineComponent } from 'libs/assets/src/icons/outline/icon_user_outline.svg';
import VectorOutline, { ReactComponent as VectorOutlineComponent } from 'libs/assets/src/icons/outline/icon_vector_outline.svg';
import VROutline, { ReactComponent as VROutlineComponent } from 'libs/assets/src/icons/outline/icon_vr_outline.svg';
import WaitlistOutline, { ReactComponent as WaitlistOutlineComponent } from 'libs/assets/src/icons/outline/icon_waitlist_outline.svg';
import WalletOutline, { ReactComponent as WalletOutlineComponent } from 'libs/assets/src/icons/outline/icon_wallet_outline.svg';
import WhistleOutline, { ReactComponent as WhistleOutlineComponent } from 'libs/assets/src/icons/outline/icon_whistle_outline.svg';

//Bold
import AddBold, { ReactComponent as AddBoldComponent } from 'libs/assets/src/icons/bold/icon_add_bold.svg';
import AnalyticsBold, { ReactComponent as AnalyticsBoldComponent } from 'libs/assets/src/icons/bold/icon_analytics_bold.svg';
import AttachmentBold, { ReactComponent as AttachmentBoldComponent } from 'libs/assets/src/icons/bold/icon_attachment_bold.svg';
import BlockBold, { ReactComponent as BlockBoldComponent } from 'libs/assets/src/icons/bold/icon_block_bold.svg';
import CheckInBold, { ReactComponent as CheckInBoldComponent } from 'libs/assets/src/icons/bold/icon_check_in_bold.svg';
import CloseBold, { ReactComponent as CloseBoldComponent } from 'libs/assets/src/icons/bold/icon_close_bold.svg';
import LogoutBold, { ReactComponent as LogoutBoldComponent } from 'libs/assets/src/icons/bold/icon_logout_bold.svg';
import MinusBold, { ReactComponent as MinusBoldComponent } from 'libs/assets/src/icons/bold/icon_minus_bold.svg';
import MenuBold, { ReactComponent as MenuBoldComponent } from 'libs/assets/src/icons/bold/icon_menu_bold.svg';
import OpenBold, { ReactComponent as OpenBoldComponent } from 'libs/assets/src/icons/bold/icon_open_bold.svg';
import OptionsBold, { ReactComponent as OptionsBoldComponent } from 'libs/assets/src/icons/bold/icon_options_bold.svg';
import RepostBold, { ReactComponent as RepostBoldComponent } from 'libs/assets/src/icons/bold/icon_repost_bold.svg';
import SearchBold, { ReactComponent as SearchBoldComponent } from 'libs/assets/src/icons/bold/icon_search_bold.svg';
import Search1, { ReactComponent as Search1Component } from 'libs/assets/src/icons/regular/icon_search_1.svg';

import ShareBold, { ReactComponent as ShareBoldComponent } from 'libs/assets/src/icons/bold/icon_share_bold.svg';

//Regular
import BlockRegular, { ReactComponent as BlockRegularComponent } from 'libs/assets/src/icons/regular/icon_block_regular.svg';
import CheckInRegular, { ReactComponent as CheckInRegularComponent } from 'libs/assets/src/icons/regular/icon_check_in_regular.svg';
import MinusRegular, { ReactComponent as MinusRegularComponent } from 'libs/assets/src/icons/regular/icon_minus_outline.svg';
import MenuRegular, { ReactComponent as MenuRegularComponent } from 'libs/assets/src/icons/regular/icon_menu_regular.svg';
import Openregular, { ReactComponent as OpenregularComponent } from 'libs/assets/src/icons/regular/icon_open_regular.svg';
import OptionsRegular, { ReactComponent as OptionsRegularComponent } from 'libs/assets/src/icons/regular/icon_options_regular.svg';
import WarningRegular, { ReactComponent as WarningRegularComponent } from 'libs/assets/src/icons/regular/warning_regular.svg';
import Arrow, { ReactComponent as ArrowComponent } from 'libs/assets/src/icons/regular/icon_arrow.svg';
import Chevron, { ReactComponent as ChevronComponent } from 'libs/assets/src/icons/regular/icon_chevron.svg';
import Search, { ReactComponent as SearchComponent } from 'libs/assets/src/icons/regular/icon_search.svg';
import ShoppingCart, { ReactComponent as ShoppingCartComponent } from 'libs/assets/src/icons/regular/icon_shopping_cart.svg';
import ShoppingCart1, { ReactComponent as ShoppingCart1Component } from 'libs/assets/src/icons/regular/icon_shopping_cart_1.svg';
import STC, { ReactComponent as STCComponent } from 'libs/assets/src/icons/regular/icon_stc.svg';


import MoreHorizon, { ReactComponent as MoreHorizonComponent} from 'libs/assets/src/icons/regular/icon_more_horiz.svg';
import Moon, { ReactComponent as MoonComponent} from 'libs/assets/src/icons/regular/icon_moon.svg';

import Language, { ReactComponent as LanguageComponent } from 'libs/assets/src/icons/regular/icon_language.svg';
import DarkMode, { ReactComponent as DarkModeComponent } from 'libs/assets/src/icons/regular/icon_dark_mode.svg';
import HamburderMenu, { ReactComponent as HamburgerMenuComponent } from 'libs/assets/src/icons/regular/icon_hamburger.svg';
import Calendar1, { ReactComponent as Calendar1Component } from 'libs/assets/src/icons/regular/icon_calendar_1.svg';

import Close, { ReactComponent as CloseComponent } from 'libs/assets/src/icons/regular/icon_close.svg';
import Close1, { ReactComponent as Close1Component } from 'libs/assets/src/icons/regular/icon_close_1.svg';

import ChevronRight, { ReactComponent as ChevronRightComponent } from 'libs/assets/src/icons/regular/icon_chevron-right.svg';
import Trophy, { ReactComponent as TrophyComponent } from 'libs/assets/src/icons/regular/icon_trophy.svg';
import Users, { ReactComponent as UsersComponent } from 'libs/assets/src/icons/regular/icon_users.svg';



//Two Colors
import AddPostTwoColor, { ReactComponent as AddPostTwoColorComponent } from 'libs/assets/src/icons/twoColor/icon_add_post_2color.svg';
import LinkTwoColor, { ReactComponent as LinkTwoColorComponent } from 'libs/assets/src/icons/twoColor/icon_link_2color.svg';
import NewChatTwoColor, { ReactComponent as NewChatTwoColorComponent } from 'libs/assets/src/icons/twoColor/icon_new_chat_2color.svg';
import NewGameTwoColor, { ReactComponent as NewGameTwoColorComponent } from 'libs/assets/src/icons/twoColor/icon_new_game_2color.svg';
import NewTeamTwoColor, { ReactComponent as NewTeamTwoColorComponent } from 'libs/assets/src/icons/twoColor/icon_new_team_2color.svg';
import PictureTwoColor, { ReactComponent as PictureTwoColorComponent } from 'libs/assets/src/icons/twoColor/icon_picture_2color.svg';
import PreferencesTwoColor, {
  ReactComponent as PreferencesTwoColorComponent
} from 'libs/assets/src/icons/twoColor/icon_preferences_2color.svg';

//Other
import MicrophoneMute, { ReactComponent as MicrophoneMuteComponent } from 'libs/assets/src/icons/other/icon_microphone_mute.svg';
import SpeakerMute1, { ReactComponent as SpeakerMute1Component } from 'libs/assets/src/icons/other/icon_speaker_mute-1.svg';
import SpeakerMute, { ReactComponent as SpeakerMuteComponent } from 'libs/assets/src/icons/other/icon_speaker_mute.svg';
import Verified1, { ReactComponent as Verified1Component } from 'libs/assets/src/icons/other/icon_verified_1.svg';
import Verified2, { ReactComponent as Verified2Component } from 'libs/assets/src/icons/other/icon_verified_2.svg';
import VideoDisabled, { ReactComponent as VideoDisabledComponent } from 'libs/assets/src/icons/other/icon_video_disable.svg';
import Check, { ReactComponent as CheckComponent } from 'libs/assets/src/icons/logos/icon_check.svg';
import Uncheck, { ReactComponent as UncheckComponent } from 'libs/assets/src/icons/other/icon_check_outline.svg';
import Unchecked, { ReactComponent as UncheckedComponent } from 'libs/assets/src/icons/other/icon_unchecked_outline.svg';
import WifiOn, { ReactComponent as WifiOnComponent } from 'libs/assets/src/icons/other/icon_wifi_on.svg';
import WifiOff, { ReactComponent as WifiOffComponent } from 'libs/assets/src/icons/other/icon_wifi_off.svg';
import QRCodeScanner, { ReactComponent as QRCodeScannerComponent } from 'libs/assets/src/icons/other/icon_qrcode_scanner.svg';
import Media, { ReactComponent as MediaComponent } from 'libs/assets/src/icons/other/icon_media.svg';
import Notification, { ReactComponent as NotificationComponent } from 'libs/assets/src/icons/regular/icon_notification.svg';

import Polls, { ReactComponent as PollsComponent } from 'libs/assets/src/icons/other/icon_poll.svg';
import GooglePlay, { ReactComponent as GooglePlayComponent } from 'libs/assets/src/icons/logos/icon_googlePlay.svg';
import AppleStore, { ReactComponent as AppleStoreComponent } from 'libs/assets/src/icons/logos/icon_appleStore.svg';
import StcPlay, { ReactComponent as StcPlayComponent } from 'libs/assets/src/icons/logos/icon_stcPlay.svg';
import StcPlay2, { ReactComponent as StcPlayComponent2 } from 'libs/assets/src/icons/logos/icon_stcPlay2.svg';
import Menu, { ReactComponent as MenuComponent } from 'libs/assets/src/icons/regular/icon_menu.svg';

import MenuButton, { ReactComponent as MenuBurgerComponent } from 'libs/assets/src/icons/other/icons_burger_menu_button.svg';
import CloseXbutton, { ReactComponent as CloseXButtonComponent } from 'libs/assets/src/icons/other/icons_close_button.svg';

//ShareMedia
import ShareFacebook, { ReactComponent as ShareFacebookComponent } from 'libs/assets/src/icons/logos/icon_share_facebook.svg';
import ShareLinkedin, { ReactComponent as ShareLinkedinComponent } from 'libs/assets/src/icons/logos/icon_share_linkedin.svg';
import ShareTwitter, { ReactComponent as ShareTwitterComponent } from 'libs/assets/src/icons/logos/icon_share_twitter.svg';

//Letters
import PLetter, { ReactComponent as PLetterComponent } from 'libs/assets/src/icons/letters/icon_p_ltr.svg';
import LLetter, { ReactComponent as LLetterComponent } from 'libs/assets/src/icons/letters/icon_l_ltr.svg';
import ALetter, { ReactComponent as ALetterComponent } from 'libs/assets/src/icons/letters/icon_a_ltr.svg';
import YLetter, { ReactComponent as YLetterComponent } from 'libs/assets/src/icons/letters/icon_y_ltr.svg';


import { SvgProps } from 'react-native-svg';

export enum IconNames
{
  activity = 'activity',
  appleStore = 'appleStore',
  arrow = 'arrow',
  battlenet = 'battlenet',
  discord = 'discord',
  facebook = 'facebook',
  instagram = 'instagram',
  instagram2 = 'instagram2',
  nintendo = 'nintendo',
  origin = 'origin',
  playstation = 'playstation',
  snapchat = 'snapchat',
  steam = 'steam',
  twitch = 'twitch',
  twitter = 'twitter',
  ubisoft = 'ubisoft',
  xbox = 'xbox',
  youtube = 'youtube',
  youtube2 = 'youtube2',
  shareFacebook = 'shareFacebook',
  shareLinkedin = 'shareLinkedin',
  linkedin = 'linkedin',
  shareTwitter = 'shareTwitter',
  addCircle = 'addCircle',
  addUser = 'addUser',
  automatedSeed = 'automatedSeed',
  bell = 'bell',
  box = 'box',
  calculator = 'calculator',
  calendar = 'calendar',
  calendar1 = 'calendar1',
  call = 'call',
  camera = 'camera',
  cart = 'cart',
  champion = 'champion',
  chat = 'chat',
  checkFill = 'checkFill',
  checkInCircle = 'checkInCircle',
  closeCircle = 'closeCircle',
  close1 = "close1",
  comment = 'comment',
  communityCircle = 'communityCircle',
  copy = 'copy',
  coupon = 'coupon',
  decline = 'decline',
  edit = 'edit',
  exclamation = 'exclamation',
  eye = 'eye',
  flag = 'flag',
  food = 'food',
  home = 'home',
  heartOutline = "heartOutline",
  like = 'like',
  locationSign = 'locationSign',
  lock = 'lock',
  maintenance = 'maintenance',
  manageReferee2 = 'manageReferee2',
  manageRequests = 'manageRequests',
  minus = 'minus',
  moneyFill = 'moneyFill',
  moon = "moon",
  menu = "menu",
  myOrder = 'myOrder',
  participants = 'participants',
  pin = 'pin',
  play = 'play',
  question = 'question',
  radioButton = 'radioButton',
  schedule = 'schedule',
  send = 'send',
  settings = 'settings',
  shop = 'shop',
  star = 'star',
  stc = "stc",
  talk = "talk",
  team = 'team',
  time = 'time',
  trash = 'trash',
  trophy = 'trophy',
  tv = 'tv',
  uplock = 'uplock',
  upload = 'upload',
  user = 'user',
  vr = 'vr',
  waitlist = 'waitlist',
  wallet = 'wallet',
  whistle = 'whistle',
  facebookFill = 'facebookFill',
  twitter2 = 'twitter2',
  twitterFill = 'twitterFill',
  googleFill = 'googleFill',
  googlePlay = 'googlePlay',
  appleFill = 'appleFill',
  addCart = 'addCart',
  addCircleOutline = 'addCircleOutline',
  addImage = 'addImage',
  addUserOutline = 'addUserOutline',
  addUser2Outline = 'addUser2Outline',
  automatedSeedOutline = 'automatedSeedOutline',
  bellOutline = 'bellOutline',
  boxOutline = 'boxOutline',
  calCulatorOutline = 'calCulatorOutline',
  calendarOutline = 'calendarOutline',
  callOutline = 'callOutline',
  cameraOutline = 'cameraOutline',
  cartOutline = 'cartOutline',
  championOutline = 'championOutline',
  chatOutline = 'chatOutline',
  checkInCircleOutline = 'checkInCircleOutline',
  checkMarkFill = "checkMarkFill",
  closeCircleOutline = 'closeCircleOutline',
  commentOutline = 'commentOutline',
  communityCircleOutline = 'communityCircleOutline',
  copyOutline = 'copyOutline',
  couponOutline = 'couponOutline',
  declineOutline = 'declineOutline',
  downloadOutline = 'downloadOutline',
  editOutline = 'editOutline',
  endCallOutline = 'endCallOutline',
  exclamationOutline = 'exclamationOutline',
  eyeOutline = 'eyeOutline',
  eyeClosedOutline = "eyeClosedOutline",
  filterOutline = 'filterOutline',
  flagOutline = 'flagOutline',
  foodOutline = 'foodOutline',
  homeOutline = 'homeOutline',
  imageOutline = 'imageOutline',
  likeOutline = 'likeOutline',
  locationSignOutline = 'locationSignOutline',
  lockOutline = 'lockOutline',
  maintenanceOutline = 'maintenanceOutline',
  manageReferee2Outline = 'manageReferee2Outline',
  manageRefereesOutline = 'manageRefereesOutline',
  manageRequestsOutline = 'manageRequestsOutline',
  minusOutline = 'minusOutline',
  microphoneOutline = 'microphoneOutline',
  moneyOutline = 'moneyOutline',
  notification = 'notification',
  myOrderOutline = 'myOrderOutline',
  participantsOutline = 'participantsOutline',
  playOutline = 'playOutline',
  pinOutline = 'pinOutline',
  questionOutline = 'questionOutline',
  radioButtonOutline = 'radioButtonOutline',
  scheduleOutline = 'scheduleOutline',
  sendOutline = 'sendOutline',
  settingsOutline = 'settingsOutline',
  shopOutline = 'shopOutline',
  speakerOutline = `speakerOutline`,
  starOutline = 'starOutline',
  stcPlay = 'stcPlay',
  stcPlay2 = 'stcPlay2',
  teamOutline = 'teamOutline',
  timeOutline = 'timeOutline',
  trashOutline = 'trashOutline',
  tVOutline = 'tVOutline',
  unfollowOutline = 'unfollowOutline',
  uplockOutline = 'uplockOutline',
  uploadOutline = 'uploadOutline',
  userOutline = 'userOutline',
  vectorOutline = 'vectorOutline',
  vROutline = 'vROutline',
  waitlistOutline = 'waitlistOutline',
  walletOutline = 'walletOutline',
  whistleOutline = 'whistleOutline',
  qRCodeScanner = 'qRCodeScanner',
  media = 'media',
  polls = 'polls',
  bellWhiteOutline = 'bellWhiteOutline',
  addBold = 'addBold',
  analyticsBold = 'analyticsBold',
  attachmentBold = 'attachmentBold',
  blockBold = 'blockBold',
  checkInBold = 'checkInBold',
  closeBold = 'closeBold',
  logoutBold = 'logoutBold',
  minusBold = 'minusBold',
  menuBold = 'menuBold',
  openBold = 'openBold',
  optionsBold = 'optionsBold',
  repostBold = 'repostBold',
  searchBold = 'searchBold',
  shareBold = 'shareBold',
  addOutline = 'addOutline',
  analyticsOutline = 'analyticsOutline',
  attachmentOutline = 'attachmentOutline',
  blockRegular = 'blockRegular',
  checkInRegular = 'checkInRegular',
  closeOutline = 'closeOutline',
  logoutOutline = 'logoutOutline',
  minusRegular = 'minusRegular',
  menuRegular = 'menuRegular',
  openregular = 'openregular',
  optionsRegular = 'optionsRegular',
  repostOutline = 'repostOutline',
  searchOutline = 'searchOutline',
  shareOutline = 'shareOutline',
  warningRegular = 'warningRegular',
  addPostOutline = 'addPostOutline',
  linkOutline = 'linkOutline',
  newBellOutline = 'newBellOutline',
  newChatOutline = 'newChatOutline',
  newGameOutline = 'newGameOutline',
  newTeamOutline = 'newTeamOutline',
  pictureOutline = 'pictureOutline',
  preferencesOutline = 'preferencesOutline',
  addPostTwoColor = 'addPostTwoColor',
  linkTwoColor = 'linkTwoColor',
  newChatTwoColor = 'newChatTwoColor',
  newGameTwoColor = 'newGameTwoColor',
  newTeamTwoColor = 'newTeamTwoColor',
  pictureTwoColor = 'pictureTwoColor',
  preferencesTwoColor = 'preferencesTwoColor',
  microphoneMute = 'microphoneMute',
  speakerMute1 = 'speakerMute1',
  videoDisabled = 'videoDisabled',
  checkOutline = 'checkOutline',
  unchecked = 'unchecked',
  wifiOff = 'wifiOff',
  microphoneFill = 'microphoneFill',
  videoFill = 'videoFill',
  speakerMute = 'speakerMute',
  check = 'check',
  chevron = 'chevron',
  search = 'search',
  search1 = "search1",
  shoppingCart = 'shoppingCart',
  shoppingCart1 = 'shoppingCart1',
  moreHorizon = 'moreHorizon',
  language = 'language',
  darkMode = 'darkMode',
  hamburgerMenu = 'hamburgerMenu',
  close = 'close',
  chevronRight = 'chevronRight',
  wifiOn = 'wifiOn',
  verified1 = 'verified1',
  verified2 = 'verified2',
  fullScreen = 'fullScreen',
  minimize = 'minimize',
  menu_button = 'menu_button',
  close_xbutton = 'close_xbutton',
  users = "users",
  pletter = 'pletter',
  lletter = 'lletter',
  aletter = 'aletter',
  yletter = 'yletter'
}

export interface IconProps extends SvgProps {
  name: IconNames;
  iconClasses?: string;
  width?: number;
  height?: number;
  fill?: string;
  theme?: string;
  color?: string;
  platform: 'web' | 'mobile';
}

let iconsObj: {
  readonly [key in keyof typeof IconNames]: {
    mobile: string;
    web: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string | undefined }>;
  };
};

iconsObj =
{
  checkMarkFill:
  {
    mobile: CheckMarkFill,
    web: CheckMarkFillComponent
  },
  activity: {
    mobile: Activity,
    web: ActivityComponent
  },

  appleStore: {
    mobile: AppleStore,
    web: AppleStoreComponent
  },
  arrow: {
    mobile: Arrow,
    web: ArrowComponent
  },
  battlenet: {
    mobile: BattleNet,
    web: BattleNetComponent
  },

  discord: {
    mobile: Discord,
    web: DiscordComponent
  },

  facebook: {
    mobile: Facebook,
    web: FacebookComponent
  },
  instagram: {
    mobile: Instagram,
    web: InstagramComponent
  },
  instagram2: {
    mobile: Instagram2,
    web: Instagram2Component
  },
  linkedin: {
    mobile: LinkedIn,
    web: LinkedInComponent
  },
  nintendo: {
    mobile: Nintendo,
    web: NintendoComponent
  },
  notification:
  {
    mobile: Notification,
    web: NotificationComponent
  },
  origin: {
    mobile: Origin,
    web: OriginComponent
  },
  playstation: {
    mobile: PlayStation,
    web: PlayStationComponent
  },
  snapchat: {
    mobile: Snapchat,
    web: SnapchatComponent
  },
  steam: {
    mobile: Steam,
    web: SteamComponent
  },

  twitch: {
    mobile: Twitch,
    web: TwitchComponent
  },

  twitter: {
    mobile: Twitter,
    web: TwitterComponent
  },
  trophy:
  {
    mobile: Trophy,
    web: TrophyComponent
  },
  ubisoft: {
    mobile: Ubisoft,
    web: UbisoftComponent
  },
  xbox: {
    mobile: Xbox,
    web: XboxComponent
  },
  youtube: {
    mobile: YouTube,
    web: YouTubeComponent
  },
  youtube2: {
    mobile: YouTube2,
    web: YouTube2Component
  },
  shareFacebook: {
    mobile: ShareFacebook,
    web: ShareFacebookComponent
  },
  shareLinkedin: {
    mobile: ShareLinkedin,
    web: ShareLinkedinComponent
  },
  shareTwitter: {
    mobile: ShareTwitter,
    web: ShareTwitterComponent
  },
  stc:
  {
    mobile: STC,
    web: STCComponent
  },
  addCircle: {
    mobile: AddCircleFill,
    web: AddCircleFillComponent
  },
  addUser: {
    mobile: AddUserFill,
    web: AddUserFillComponent
  },
  automatedSeed: {
    mobile: AutomatedSeedFill,
    web: AutomatedSeedFillComponent
  },
  bell: {
    mobile: BellFill,
    web: BellFillComponent
  },
  box: {
    mobile: BoxFill,
    web: BoxFillComponent
  },
  calculator: {
    mobile: CalculatorFill,
    web: CalculatorFillComponent
  },
  calendar: {
    mobile: CalendarFill,
    web: CalendarFillComponent
  },
  calendar1:
  {
    mobile: Calendar1,
    web: Calendar1Component
  },
  call: {
    mobile: CallFill,
    web: CallFillComponent
  },
  camera: {
    mobile: CameraFill,
    web: CameraFillComponent
  },

  cart: {
    mobile: CartFill,
    web: CartFillComponent
  },

  champion: {
    mobile: ChampionFill,
    web: ChampionFillComponent
  },

  chat: {
    mobile: ChatFill,
    web: ChatFillComponent
  },
  checkInCircle: {
    mobile: CheckInCircleFill,
    web: CheckInCircleFillComponent
  },
  closeCircle: {
    mobile: CloseCircleFill,
    web: CloseCircleFillComponent
  },
  close1:
  {
    mobile: Close1,
    web: Close1Component
  },
  comment: {
    mobile: CommentFill,
    web: CommentFillComponent
  },
  communityCircle: {
    mobile: CommunityCircleFill,
    web: CommunityCircleFillComponent
  },
  copy: {
    mobile: CopyFill,
    web: CopyFillComponent
  },
  coupon: {
    mobile: CouponFill,
    web: CouponFillComponent
  },
  decline: {
    mobile: DeclineFill,
    web: DeclineFillComponent
  },
  edit: {
    mobile: EditFill,
    web: EditFillComponent
  },
  exclamation: {
    mobile: ExclamationFill,
    web: ExclamationFillComponent
  },
  eye: {
    mobile: EyeFill,
    web: EyeFillComponent
  },
  flag: {
    mobile: FlagFill,
    web: FlagFillComponent
  },
  food: {
    mobile: FoodFill,
    web: FoodFillComponent
  },
  home: {
    mobile: HomeFill,
    web: HomeFillComponent
  },
  heartOutline:
  {
    mobile: HeartOutline,
    web: HeartOutlineComponent
  },
  like: {
    mobile: LikeFill,
    web: LikeFillComponent
  },
  locationSign: {
    mobile: LocationSignFill,
    web: LocationSignFillComponent
  },
  lock: {
    mobile: LockFill,
    web: LockFillComponent
  },
  maintenance: {
    mobile: MaintenanceFill,
    web: MaintenanceFillComponent
  },
  manageReferee2: {
    mobile: ManageReferee2Fill,
    web: ManageReferee2FillComponent
  },
  manageRequests: {
    mobile: ManageRequestsFill,
    web: ManageRequestsFillComponent
  },
  minus: {
    mobile: MinusFill,
    web: MinusFillComponent
  },
  moneyFill: {
    mobile: MoneyFill,
    web: MoneyFillComponent
  },
  moon: {
    mobile: Moon,
    web: MoonComponent
  },
  menu:
  {
    mobile: Menu,
    web: MenuComponent,
  },
  myOrder: {
    mobile: MyOrderFill,
    web: MyOrderFillComponent
  },
  participants: {
    mobile: ParticipantsFill,
    web: ParticipantsFillComponent
  },
  pin: {
    mobile: PinFill,
    web: PinFillComponent
  },
  play: {
    mobile: PlayFill,
    web: PlayFillComponent
  },
  question: {
    mobile: QuestionFill,
    web: QuestionFillComponent
  },
  radioButton: {
    mobile: RadioButtonFill,
    web: RadioButtonFillComponent
  },
  schedule: {
    mobile: ScheduleFill,
    web: ScheduleFillComponent
  },
  send: {
    mobile: SendFill,
    web: SendFillComponent
  },
  settings: {
    mobile: SettingsFill,
    web: SettingsFillComponent
  },
  shop: {
    mobile: ShopFill,
    web: ShopFillComponent
  },
  star: {
    mobile: StarFill,
    web: StarFillComponent
  },
  talk:
  {
    mobile: Talk,
    web: TalkComponent
  },
  team: {
    mobile: TeamFill,
    web: TeamFillComponent
  },
  time: {
    mobile: TimeFill,
    web: TimeFillComponent
  },
  trash: {
    mobile: TrashFill,
    web: TrashFillComponent
  },
  tv: {
    mobile: TVFill,
    web: TVFillComponent
  },
  uplock: {
    mobile: UplockFill,
    web: UplockFillComponent
  },
  upload: {
    mobile: UploadFill,
    web: UploadFillComponent
  },
  user: {
    mobile: UserFill,
    web: UserFillComponent
  },
  vr: {
    mobile: VRFill,
    web: VRFillComponent
  },
  waitlist: {
    mobile: WaitlistFill,
    web: WaitlistFillComponent
  },
  wallet: {
    mobile: WalletFill,
    web: WalletFillComponent
  },
  whistle: {
    mobile: WhistleFill,
    web: WhistleFillComponent
  },
  facebookFill: {
    mobile: FacebookFill,
    web: FacebookFillComponent
  },
  twitterFill: {
    mobile: TwitterFill,
    web: TwitterFillComponent
  },
  twitter2: {
    mobile: Twitter2,
    web: Twitter2Component
  },
  googleFill: {
    mobile: GoogleFill,
    web: GoogleFillComponent
  },

  googlePlay: {
    mobile: GooglePlay,
    web: GooglePlayComponent
  },

  appleFill: {
    mobile: AppleFill,
    web: AppleFillComponent
  },
  addCart: {
    mobile: AddCartOutline,
    web: AddCartOutlineComponent
  },
  addCircleOutline: {
    mobile: AddCircleOutline,
    web: AddCircleOutlineComponent
  },
  addImage: {
    mobile: AddImageOutline,
    web: AddImageOutlineComponent
  },
  addUserOutline: {
    mobile: AddUserOutline,
    web: AddUserOutlineComponent
  },
  addUser2Outline: {
    mobile: AddUser2Outline,
    web: AddUser2OutlineComponent
  },
  automatedSeedOutline: {
    mobile: AutomatedSeedOutline,
    web: AutomatedSeedOutlineComponent
  },
  bellOutline: {
    mobile: BellOutline,
    web: BellOutlineComponent
  },
  boxOutline: {
    mobile: BoxOutline,
    web: BoxOutlineComponent
  },
  calCulatorOutline: {
    mobile: CalCulatorOutline,
    web: CalCulatorOutlineComponent
  },
  calendarOutline: {
    mobile: CalendarOutline,
    web: CalendarOutlineComponent
  },
  callOutline: {
    mobile: CallOutline,
    web: CallOutlineComponent
  },
  cameraOutline: {
    mobile: CameraOutline,
    web: CameraOutlineComponent
  },
  cartOutline: {
    mobile: CartOutline,
    web: CartOutlineComponent
  },
  championOutline: {
    mobile: ChampionOutline,
    web: ChampionOutlineComponent
  },
  chatOutline: {
    mobile: ChatOutline,
    web: ChatOutlineComponent
  },
  checkFill: {
    mobile: CheckFill,
    web: CheckFillComponent
  },
  checkInCircleOutline: {
    mobile: CheckInCircleOutline,
    web: CheckInCircleOutlineComponent
  },
  closeCircleOutline: {
    mobile: CloseCircleOutline,
    web: CloseCircleOutlineComponent
  },
  commentOutline: {
    mobile: CommentOutline,
    web: CommentOutlineComponent
  },
  communityCircleOutline: {
    mobile: CommunityCircleOutline,
    web: CommunityCircleOutlineComponent
  },
  copyOutline: {
    mobile: CopyOutline,
    web: CopyOutlineComponent
  },
  couponOutline: {
    mobile: CouponOutline,
    web: CouponOutlineComponent
  },
  declineOutline: {
    mobile: DeclineOutline,
    web: DeclineOutlineComponent
  },
  downloadOutline: {
    mobile: DownloadOutline,
    web: DownloadOutlineComponent
  },
  editOutline: {
    mobile: EditOutline,
    web: EditOutlineComponent
  },
  endCallOutline: {
    mobile: EndCallOutline,
    web: EndCallOutlineComponent
  },
  exclamationOutline: {
    mobile: ExclamationOutline,
    web: ExclamationOutlineComponent
  },
  eyeOutline: {
    mobile: EyeOutline,
    web: EyeOutlineComponent
  },
  eyeClosedOutline:
  {
    mobile: EyeClosedOutline,
    web: EyeClosedOutlineComponent,
  },
  filterOutline: {
    mobile: FilterOutline,
    web: FilterOutlineComponent
  },
  flagOutline: {
    mobile: FlagOutline,
    web: FlagOutlineComponent
  },
  foodOutline: {
    mobile: FoodOutline,
    web: FoodOutlineComponent
  },
  homeOutline: {
    mobile: HomeOutline,
    web: HomeOutlineComponent
  },
  imageOutline: {
    mobile: ImageOutline,
    web: ImageOutlineComponent
  },
  likeOutline: {
    mobile: LikeOutline,
    web: LikeOutlineComponent
  },
  locationSignOutline: {
    mobile: LocationSignOutline,
    web: LocationSignOutlineComponent
  },
  lockOutline: {
    mobile: LockOutline,
    web: LockOutlineComponent
  },
  maintenanceOutline: {
    mobile: MaintenanceOutline,
    web: MaintenanceOutlineComponent
  },
  manageReferee2Outline: {
    mobile: ManageReferee2Outline,
    web: ManageReferee2OutlineComponent
  },
  manageRefereesOutline: {
    mobile: ManageRefereesOutline,
    web: ManageRefereesOutlineComponent
  },
  manageRequestsOutline: {
    mobile: ManageRequestsOutline,
    web: ManageRequestsOutlineComponent
  },
  minusOutline: {
    mobile: MinusOutline,
    web: MinusOutlineComponent
  },
  microphoneOutline: {
    mobile: MicrophoneOutline,
    web: MicrophoneOutlineComponent
  },
  moneyOutline: {
    mobile: MoneyOutline,
    web: MoneyOutlineComponent
  },
  myOrderOutline: {
    mobile: MyOrderOutline,
    web: MyOrderOutlineComponent
  },
  participantsOutline: {
    mobile: ParticipantsOutline,
    web: ParticipantsOutlineComponent
  },
  playOutline: {
    mobile: PlayOutline,
    web: PlayOutlineComponent
  },
  pinOutline: {
    mobile: PinOutline,
    web: PinOutlineComponent
  },
  questionOutline: {
    mobile: QuestionOutline,
    web: QuestionOutlineComponent
  },
  radioButtonOutline: {
    mobile: RadioButtonOutline,
    web: RadioButtonOutlineComponent
  },
  stcPlay: {
    mobile: StcPlay,
    web: StcPlayComponent
  },
  stcPlay2: {
    mobile: StcPlay2,
    web: StcPlayComponent2
  },
  scheduleOutline: {
    mobile: ScheduleOutline,
    web: ScheduleOutlineComponent
  },
  sendOutline: {
    mobile: SendOutline,
    web: SendOutlineComponent
  },
  settingsOutline: {
    mobile: SettingsOutline,
    web: SettingsOutlineComponent
  },
  shopOutline: {
    mobile: ShopOutline,
    web: ShopOutlineComponent
  },
  speakerOutline: {
    mobile: SpeakerOutline,
    web: SpeakerOutlineComponent
  },
  starOutline: {
    mobile: StarOutline,
    web: StarOutlineComponent
  },
  teamOutline: {
    mobile: TeamOutline,
    web: TeamOutlineComponent
  },
  timeOutline: {
    mobile: TimeOutline,
    web: TimeOutlineComponent
  },
  trashOutline: {
    mobile: TrashOutline,
    web: TrashOutlineComponent
  },
  tVOutline: {
    mobile: TVOutline,
    web: TVOutlineComponent
  },
  unfollowOutline: {
    mobile: UnfollowOutline,
    web: UnfollowOutlineComponent
  },
  uplockOutline: {
    mobile: UplockOutline,
    web: UplockOutlineComponent
  },
  uploadOutline: {
    mobile: UploadOutline,
    web: UploadOutlineComponent
  },
  userOutline: {
    mobile: UserOutline,
    web: UserOutlineComponent
  },
  vectorOutline: {
    mobile: VectorOutline,
    web: VectorOutlineComponent
  },
  vROutline: {
    mobile: VROutline,
    web: VROutlineComponent
  },
  waitlistOutline: {
    mobile: WaitlistOutline,
    web: WaitlistOutlineComponent
  },
  walletOutline: {
    mobile: WalletOutline,
    web: WalletOutlineComponent
  },
  whistleOutline: {
    mobile: WhistleOutline,
    web: WhistleOutlineComponent
  },
  qRCodeScanner: {
    mobile: QRCodeScanner,
    web: QRCodeScannerComponent
  },
  media: {
    mobile: Media,
    web: MediaComponent
  },
  polls: {
    mobile: Polls,
    web: PollsComponent
  },
  bellWhiteOutline: {
    mobile: BellWhiteOutline,
    web: BellWhiteOutlineComponent
  },
  addBold: {
    mobile: AddBold,
    web: AddBoldComponent
  },
  analyticsBold: {
    mobile: AnalyticsBold,
    web: AnalyticsBoldComponent
  },
  attachmentBold: {
    mobile: AttachmentBold,
    web: AttachmentBoldComponent
  },
  blockBold: {
    mobile: BlockBold,
    web: BlockBoldComponent
  },
  checkInBold: {
    mobile: CheckInBold,
    web: CheckInBoldComponent
  },
  closeBold: {
    mobile: CloseBold,
    web: CloseBoldComponent
  },
  logoutBold: {
    mobile: LogoutBold,
    web: LogoutBoldComponent
  },
  minusBold: {
    mobile: MinusBold,
    web: MinusBoldComponent
  },
  menuBold: {
    mobile: MenuBold,
    web: MenuBoldComponent
  },
  openBold: {
    mobile: OpenBold,
    web: OpenBoldComponent
  },
  optionsBold: {
    mobile: OptionsBold,
    web: OptionsBoldComponent
  },
  repostBold: {
    mobile: RepostBold,
    web: RepostBoldComponent
  },
  searchBold: {
    mobile: SearchBold,
    web: SearchBoldComponent
  },
  search1:
  {
    mobile: Search1,
    web: Search1Component
  },
  shareBold: {
    mobile: ShareBold,
    web: ShareBoldComponent
  },
  addOutline: {
    mobile: AddOutline,
    web: AddOutlineComponent
  },
  analyticsOutline: {
    mobile: AnalyticsOutline,
    web: AnalyticsOutlineComponent
  },
  attachmentOutline: {
    mobile: AttachmentOutline,
    web: AttachmentOutlineComponent
  },
  blockRegular: {
    mobile: BlockRegular,
    web: BlockRegularComponent
  },
  checkInRegular: {
    mobile: CheckInRegular,
    web: CheckInRegularComponent
  },
  closeOutline: {
    mobile: CloseOutline,
    web: CloseOutlineComponent
  },
  logoutOutline: {
    mobile: LogoutOutline,
    web: LogoutOutlineComponent
  },
  minusRegular: {
    mobile: MinusRegular,
    web: MinusRegularComponent
  },
  menuRegular: {
    mobile: MenuRegular,
    web: MenuRegularComponent
  },
  openregular: {
    mobile: Openregular,
    web: OpenregularComponent
  },
  optionsRegular: {
    mobile: OptionsRegular,
    web: OptionsRegularComponent
  },
  repostOutline: {
    mobile: RepostOutline,
    web: RepostOutlineComponent
  },
  searchOutline: {
    mobile: SearchOutline,
    web: SearchOutlineComponent
  },
  shareOutline: {
    mobile: ShareOutline,
    web: ShareOutlineComponent
  },
  warningRegular: {
    mobile: WarningRegular,
    web: WarningRegularComponent
  },
  addPostOutline: {
    mobile: AddPostOutline,
    web: AddPostOutlineComponent
  },
  linkOutline: {
    mobile: LinkOutline,
    web: LinkOutlineComponent
  },
  newBellOutline: {
    mobile: NewBellOutline,
    web: NewBellOutlineComponent
  },
  newChatOutline: {
    mobile: NewChatOutline,
    web: NewChatOutlineComponent
  },
  newGameOutline: {
    mobile: NewGameOutline,
    web: NewGameOutlineComponent
  },
  newTeamOutline: {
    mobile: NewTeamOutline,
    web: NewTeamOutlineComponent
  },
  pictureOutline: {
    mobile: PictureOutline,
    web: PictureOutlineComponent
  },
  preferencesOutline: {
    mobile: PreferencesOutline,
    web: PreferencesOutlineComponent
  },
  addPostTwoColor: {
    mobile: AddPostTwoColor,
    web: AddPostTwoColorComponent
  },
  linkTwoColor: {
    mobile: LinkTwoColor,
    web: LinkTwoColorComponent
  },
  newChatTwoColor: {
    mobile: NewChatTwoColor,
    web: NewChatTwoColorComponent
  },
  newGameTwoColor: {
    mobile: NewGameTwoColor,
    web: NewGameTwoColorComponent
  },
  newTeamTwoColor: {
    mobile: NewTeamTwoColor,
    web: NewTeamTwoColorComponent
  },
  pictureTwoColor: {
    mobile: PictureTwoColor,
    web: PictureTwoColorComponent
  },
  preferencesTwoColor: {
    mobile: PreferencesTwoColor,
    web: PreferencesTwoColorComponent
  },
  microphoneMute: {
    mobile: MicrophoneMute,
    web: MicrophoneMuteComponent
  },
  speakerMute1: {
    mobile: SpeakerMute1,
    web: SpeakerMute1Component
  },
  videoDisabled: {
    mobile: VideoDisabled,
    web: VideoDisabledComponent
  },
  checkOutline: {
    mobile: Uncheck,
    web: UncheckComponent
  },
  unchecked: {
    mobile: Unchecked,
    web: UncheckedComponent
  },
  wifiOff: {
    mobile: WifiOff,
    web: WifiOffComponent
  },
  microphoneFill: {
    mobile: MicrophoneFill,
    web: MicrophoneFillComponent
  },
  videoFill: {
    mobile: VideoFill,
    web: VideoFillComponent
  },
  speakerMute: {
    mobile: SpeakerMute,
    web: SpeakerMuteComponent
  },
  check: {
    mobile: Check,
    web: CheckComponent
  },
  chevron:
  {
    mobile: Chevron,
    web: ChevronComponent
  },
  search: {
    mobile: Search,
    web: SearchComponent
  },
  shoppingCart: {
    mobile: ShoppingCart,
    web: ShoppingCartComponent
  },
  shoppingCart1: {
    mobile: ShoppingCart1,
    web: ShoppingCart1Component
  },
  moreHorizon: {
    mobile: MoreHorizon,
    web: MoreHorizonComponent
  },
  language: {
    mobile: Language,
    web: LanguageComponent
  },
  darkMode: {
    mobile: DarkMode,
    web: DarkModeComponent
  },
  hamburgerMenu: {
    mobile: HamburderMenu,
    web: HamburgerMenuComponent
  },
  close: {
    mobile: Close,
    web: CloseComponent
  },
  chevronRight: {
    mobile: ChevronRight,
    web: ChevronRightComponent
  },
  wifiOn: {
    mobile: WifiOn,
    web: WifiOnComponent
  },
  verified1: {
    mobile: Verified1,
    web: Verified1Component
  },
  verified2: {
    mobile: Verified2,
    web: Verified2Component
  },
  fullScreen: {
    mobile: FullScreen,
    web: FullScreenComponent
  },
  minimize: {
    mobile: Minimize,
    web: MinimizeComponent
  },
  menu_button: {
    mobile: MenuButton,
    web: MenuBurgerComponent
  },
  close_xbutton: {
    mobile: CloseXbutton,
    web: CloseXButtonComponent
  },
  users:
  {
    mobile: Users,
    web: UsersComponent
  },
  pletter: {
    mobile: PLetter,
    web: PLetterComponent
  },
  lletter: {
    mobile: LLetter,
    web: LLetterComponent
  },
  aletter: {
    mobile: ALetter,
    web: ALetterComponent
  },
  yletter: {
    mobile: YLetter,
    web: YLetterComponent
  }
};

export const getSvgXml = (props: IconProps) => {
  const { name, width = 24, height = 24, platform = 'mobile', fill, iconClasses, stroke } = props;

  if (platform === 'mobile') {
    const Icon = iconsObj[name]['mobile'];

    return <Icon width={width} height={height} {...props} />;
  } else {
    const Icon = iconsObj[name]['web'];
    return <Icon className={iconClasses} width={width} height={height} fill={fill} />;
  }
};
