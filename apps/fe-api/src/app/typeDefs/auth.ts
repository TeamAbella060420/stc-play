export interface SignUpInput {
    email: string;
    mobile?: string;
    username: string;
    password: string;
    endpoint: string;
    channel: string;
    mobile_code?: string;
    regesteration_persona: string;
    display_name: string;
    country_code?: string;
    referral_code?: string;
}

export interface LoginInput {
    password: string;
    identifier: string;
    endpoint: string;
    channel: string;
    advertisement_id: string;
}

export interface AppleLoginInput {
    code: string;
}

export interface AppleSignUpInput {
    code: string;
    username: string;
}