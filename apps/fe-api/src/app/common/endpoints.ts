const discoverBaseUrl = 'v3/cms/timeline/discover/';
const accessBaseUrl = 'v3/crm/user/access/';
const userBaseUrl = 'v3/crm/user/';
const geoBaseurl = 'v3/crm/geo/';
const searchBaseUrl = 'v3/cms/search/';
const statisticBaseUrl = 'v3/tms/statistics/';
const tournamentSectionBaseUrl = 'v3/tms/tournament/section/';
const staticPageUrl = 'v3/cms/content/';
const shopCategory = 'v3/cms/category/';

export const ENDPOINTS = {
  Discover: {
    GetAllPublic: discoverBaseUrl + 'getAllPublic'
  },
  Search: {
    GetAllHistory: searchBaseUrl + 'history/getAll',
    SaveHistory: searchBaseUrl + 'history/save',
    ClearHistory: searchBaseUrl + 'history/clear',
    GetGlobalSearch: searchBaseUrl + 'data/getAll',
    GetSearchInfo: searchBaseUrl + 'data/getInfo'
  },
  User: {
    Login: accessBaseUrl + 'login',
    AccessLink: accessBaseUrl + 'createAccessLink',
    AppleLogin: accessBaseUrl + 'appleLogin',
    AppleLoginWeb: accessBaseUrl + 'appleLoginWeb',
    AppleSignupWeb: accessBaseUrl + 'appleSignupWeb',
    GoogleLogin: accessBaseUrl + 'googleLogin',
    FaceBookLogin: accessBaseUrl + 'facebookLogin',
    TwitterSignIn: accessBaseUrl + 'twitterSignIn',
    Logout: accessBaseUrl + 'logout',
  },
  Account: {
    Register: userBaseUrl + 'register/signup',
    AppleSignup: userBaseUrl + 'register/appleSignup',
    lockDuration: userBaseUrl + 'data/duration',
    isUsernameAvailable: userBaseUrl + 'data/isUsernameAvailable',
    isUserFoundByEmail: userBaseUrl + 'data/isUserFoundByEmail',
    isUserFoundByMobile: userBaseUrl +'data/isUserFoundByMobile',
    isUserFoundByUsername: userBaseUrl +'data/isUserFoundByUsername',
    isValidCurrentPassword: userBaseUrl +'data/isValidCurrentPassword',
    isValidReferral: userBaseUrl +'data/isValidReferral',
    isMobileAvailable: userBaseUrl +'data/isMobileAvailable',
    editAccount: userBaseUrl +'account/update',
    getInfoByUsername: userBaseUrl +'data/getInfoByUsername',
    getUserProfileInfo: userBaseUrl +'account/getUserProfileInfo',
    submitPersonalizationQuestionnaire: userBaseUrl + 'profile/submitPersonalizationQuestionnaire',
    updateAddress: userBaseUrl + 'address/update',
    updatePassword: userBaseUrl + 'password/updatePassword',
    resetPasswordByOtp: userBaseUrl + 'password/resetPasswordByOtp',
    updateUsername: userBaseUrl + 'account/updateUsername',

  },
  Community: {
    Follow: userBaseUrl + 'community/follow',
    UnFollow: userBaseUrl + 'community/unfollow'
  },
  OTP: {
    RequestResetPasswordOTP: userBaseUrl + 'otp/requestResetPasswordOTP',
    RequestOTP: userBaseUrl + 'otp/requestOTP',
    VerifyOTP: userBaseUrl + 'otp/verifyOTP'
  },
  Statistics: {
    GetAll: statisticBaseUrl + 'tournament/getAll'
  },
  TournamentSections:
  {
    getAll: tournamentSectionBaseUrl + "getAll"
  },
  GEO: {
    GetAllCountrie: geoBaseurl + 'country/getAllCountries',
    GetServedCountrie: geoBaseurl + 'country/getServedCountries'
  },
  DATA_CONTENT: {
    GetStaticPage: staticPageUrl + 'data/getStaticPage',
    GetFaqs: staticPageUrl + 'data/getFaqs'
  },
  SHOP: {
    GetAllCategory: shopCategory + 'data/getAll',
    GetAllProduct: shopCategory + 'product/getAll'
  },
  WALLET: { GetWallet: userBaseUrl + 'wallet/getWallets' }
};

export const getBaseURL = () => {
  console.log('baseUrl: ', process.env.NX_APP_API);
  return process.env.NX_APP_API;
};
