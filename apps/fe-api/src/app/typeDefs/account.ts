export interface AccountInput {
    email: string;
    mobile: string;
    username: string;
    password: string;
    is_2FA_required: number;
    token: string;
}

export interface AccountInputObject {
    account_data: AccountInput
}

export interface AddressInput {
    name: string,
    address_id: number,
    mobile: string,
    mobile_code: string
  }
  

export interface PersonalizeQuestionnaireInput {
    personal_questionnaire_code: number;
}

export interface LockDurationInput {
    type: string;
    username: string;
}
