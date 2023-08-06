export interface OTPInput {
    type: string;
    endpoint: string;
    channel: string;
    otp?: string;
    email?: string;
    username?: string;
    token?: string;
}