export type AuthModel = {
    email: string,
    mobile?: string,
    username: string,
    password: string,
    endpoint: string,
    channel: string,
    mobile_code?: string,
    regesteration_persona?: string,
    display_name: string,
    country_code?: string,
    referral_code?: string
}

export type AppleAuthModel = {
   code: string,
   username: string
}