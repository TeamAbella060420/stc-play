
import { useRef } from "react";

import useForm, { Form } from "../useForm";

import { useTranslation } from "react-i18next";

import UsernameField from "../../../../common/UsernameField";

import PasswordField from "../../../../common/PasswordField";

import ReferralCodeField from "../../../../common/ReferralCodeField";

import PhoneNumberField from "../../../../common/PhoneNumberField";
import ContinueButton from "../../ContinueButton";

type Props =
{
  isLoading: boolean,
  APIError: { [index: string]: string },
  dir: string,

  validateUsername: (username: string) => void,
  goNext: (form: Form) => void,
  resetAPIError: (key: string) => void
}


const UsernamePhase = (props: Props) =>
{
  const usernameCheckTimerRef = useRef<any>();
  const { isLoading, APIError , dir, goNext, resetAPIError } = props;
  const { t } = useTranslation();
  const { form, isFormValid, editForm } = useForm();

  const doAPIErrorMessagesExist = Object.values(APIError).some(error => error);

  const onUsernameChange = (e: { value: string; isValid: boolean }) =>
  {
    clearTimeout(usernameCheckTimerRef.current);

    if (e.value.length > 3 && e.isValid)
    {
      usernameCheckTimerRef.current = setTimeout(() => props.validateUsername(e.value), 1000);
    }

    editForm('username', e);
  }


  console.log("Username form: ", form);


  return (
    <div className="grid gap-24 mb-50 sm:mb-0 4xl:gap-40 5xl:gap-64 8xl:gap-120">
      <UsernameField
        apiErrorMessage={APIError.username}

        resetAPIError={() => resetAPIError("username")}
        onChange={onUsernameChange}
      />

      <PasswordField
        apiErrorMessage={APIError.password}

        resetAPIError={() => resetAPIError("password")}
        onChange={e => editForm('password', e)}
      />

      <PhoneNumberField
          apiErrorMessage={APIError.phoneNumber}

          onCountryCode={e =>
          {
            console.log("Country Code object: ", e);

            if (e?.country_code_iso_2)
            {
              editForm('country_code_iso', {value: (e.country_code_iso_2), isValid: true})
            }

            if (e?.phone_code_iso)
            {
              editForm('phone_code_iso', { value: (e.phone_code_iso), isValid: true})
            }
          }}
          onPhoneNumberChange={(e) => editForm('phoneNumber', e)}
          resetAPIError={() => resetAPIError("phoneNumber")}
      />

      <ReferralCodeField
        apiErrorMessage={APIError.referralCode}
        resetAPIError={() => resetAPIError("referralCode")}
        onChange={e => editForm('referralCode', e)}
      />

      <ContinueButton
        action={() => goNext(form)}
        disabled={(!isFormValid || isLoading || doAPIErrorMessagesExist)}
      />
    </div>
  );
};

export default UsernamePhase
