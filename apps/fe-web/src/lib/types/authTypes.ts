export enum SignupPhases
{
  EMAIL = 'SIGNUP_EMAIL',
  USERNAME = 'SIGNUP_USERNAME',
  OTP = 'SIGNUP_OTP',

  // This is a side state
  EDIT_EMAIL = "SIGNUP_EDIT_EMAIL",

  FINISHED = 'SIGNUP_FINISHED'
}

export enum SigninPhases
{
  EMAIL = 'SIGNIN_EMAIL',
  PASSWORD = 'SIGNIN_PASSWORD',
  OTP = 'SIGNIN_OTP'
}
