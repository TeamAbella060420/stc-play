import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { Form } from './useForm';

import { RootState } from '@fe-monorepo/store';

import { useSelector } from 'react-redux';

import EmailPhase from './Phases/EmailPhase/EmailPhase';
import UsernamePhase from './Phases/UsernamePhase';

import OTPPhase from '../OTPPhase';
import { useSignUp, useUser, useOtp, useAccount } from '@fe-monorepo/hooks';
import { AccountModel, AuthModel, OtpModel } from '@fe-monorepo/models';
import { CHANNEL, getCurrentDate, stringToHash256 } from '@fe-monorepo/helper';
import FinishedPhase from './Phases/FinishedPhase';
import useGTM from '../../../hooks/useGTM';
import queryString from 'query-string';
import { isEmpty } from 'lodash';
import { AnimatePresence } from 'framer-motion';

import { SignupPhases, SigninPhases } from 'apps/fe-web/src/lib/types/authTypes';
import EditEmailPhase from './Phases/EditEmailPhase';
import { Platform } from 'react-native';


interface CardProps
{
  currentPhase: SignupPhases;


  setEmail: (email: string) => void,
  toggleType: () => void,
  goNext: () => void,
  goBack: () => void,
  goToState: (phase: string) => void,
  goToQuestionnaire: () => void
}

const SignUpCard = (props: CardProps) =>
{
  const prefs = useSelector((state: RootState) => state.app);
  const { currentPhase, goNext, goBack, setEmail, goToState } = props;

  const { t } = useTranslation()

  const { addEvent } = useGTM();

  const {
        validateUserData,
        errorMessage: userError,
        isUserFoundByEmailData,
        isUserFoundByUsernameData
  } = useUser();
  const { requestOTP, verifyOTP, isRequestStatus, requestOTPErrorMsg, isVerifiedStatus, verifiedErrorMsg } = useOtp();
  const { signUp, isSuccessful: isSignUpSuccessful, errorMessage: signUpErrorMessage, errorCode: signUpErrorCode } = useSignUp();
  const { update: updateAccount, isUpdatedAccount, errorMessage: accountError } = useAccount();

  const dir = prefs?.language === 'en' ? `ltr` : `rtl`;
  const languageName =  prefs?.language === "en"? "English": "Arabic";

  const [signUpInfo, setSignUpInfo] = useState<any>({});
  const [otp, setOtp] = useState<string>('');
  const [usernameState, setUsername] = useState<string>("")
  const [APIError, setAPIError] = useState<{ [index: string]: string}>({});
  const [editEmailValue, setEditEmailValue] = useState<string>("")

  const addAPIError = (key: string, value: string) =>
  {
    setAPIError(oldAPIError =>
      {
        const newAPIError = { ...oldAPIError };

        newAPIError[key] = value;

        return newAPIError
      })
  }

  const resetAPIError = (key: string): void =>
  {
      setAPIError(oldAPIError =>
      {
        const newAPIError = { ...oldAPIError };

        delete newAPIError[key];

        return newAPIError
      })
  }

  const signupGTMSuccess = () =>
  {
    const username = signUpInfo?.username? signUpInfo?.username: null;

    const event_properties =
    {
      user_id: username,
      account_name: username,
      signup_method: "Email",
      signup_date: getCurrentDate(),
      language: languageName
    }

    const phoneNumber = signUpInfo?.mobile_code + signUpInfo?.mobile;

    const user_properties =
    {
      user_id: username,
      user_email_hashed: signUpInfo?.email? stringToHash256(signUpInfo.email) : null,
      user_number_hashed: phoneNumber? stringToHash256(phoneNumber) : null,
      signup_method: "Email",
      signup_date: getCurrentDate(),
      account_name: username
    }

    addEvent({ event: "sign_up", event_properties, user_properties })
  }

  const signupGTMFailure = (errorMessage: string) =>
  {
    const username = usernameState? usernameState: signUpInfo?.username? signUpInfo?.username: null;

    const event_properties =
    {
      user_id: username,
      account_name: username,
      language: languageName,
      reason: errorMessage
    }

    const phoneNumber = signUpInfo?.mobile_code + signUpInfo?.mobile;

    const user_properties =
    {
      user_id: username,
      user_email_hashed: signUpInfo?.email? stringToHash256(signUpInfo.email) : null,
      user_number_hashed: phoneNumber? stringToHash256(phoneNumber) : null,
      account_name: username
    }

    addEvent({
        event: "sign_up_failed",
        event_properties,
        user_properties
    })
  }

  const otpGTMConfirmed = () =>
  {
      const username = signUpInfo?.username? signUpInfo?.username: null;

      const event_properties =
      {
        user_id: username,
        account_name: username,
        language: languageName,
      }

      const phoneNumber = signUpInfo?.mobile_code + signUpInfo?.mobile;

      const user_properties =
      {
        user_id: username,
        user_email_hashed:  signUpInfo?.email? stringToHash256(signUpInfo.email) : null,
        user_number_hashed: phoneNumber? stringToHash256(phoneNumber) : null,
        account_name: username
      }

      addEvent({
          event: "confirmed_otp",
          event_properties,
          user_properties
      })
  }

  const goNextWrapper = (form: Form) =>
  {
    if (currentPhase === SignupPhases.EMAIL)
    {
      const email = form?.email.value;

      validateUserData({ email: email } as AuthModel, "email")

      setEmail(email)

      setSignUpInfo((info: any)  => ({ ...(info as object), email: email }))
    }
    else if (currentPhase === SignupPhases.USERNAME)
    {
      const mandatoryInfo =
      {
        username: form?.username?.value,
        password: form?.password?.value,

        country_code: form?.country_code_iso?.value,
        display_name: form?.username?.value,
        channel: CHANNEL.EMAIL,
        endpoint: "web",
        regesteration_persona:'gamer',
      }

      let optionalInfo = {};

      if (form?.phone_code_iso?.value && form?.phoneNumber?.value)
      {
        optionalInfo =
        {
          mobile_code: form?.phone_code_iso?.value,
          mobile: form?.phoneNumber?.value,
        }
      }

      const referralCode = form?.referralCode?.value

      if (referralCode)
       {
        optionalInfo =
        {
          ...optionalInfo,
          referral_code: referralCode
        }
      }

      const signUpObj =
      {
        ...signUpInfo,
        ...mandatoryInfo,
        ...optionalInfo
      }

      let canSignUp = true;

      const signUpDataFields = ["email", "username"];

      for (let i = 0; i < signUpDataFields.length; i++)
      {
        if (!(signUpDataFields[i] in signUpObj))
        {
          canSignUp = false;
          break;
        }
      }

      if (canSignUp)
      {
        setSignUpInfo((info: any) => ({ ...info, ...signUpObj }))
        signUp(signUpObj as AuthModel)
      }
    }
  };

  useEffect(() =>
  {
    if (currentPhase === SignupPhases.EMAIL)
    {
      if (isUserFoundByEmailData)
      {
        const data = isUserFoundByEmailData.isUserFoundByEmail;

        if (data.is_successful)
        {
          signupGTMFailure(t("validation_takenEmail"));

          addAPIError("email", t("validation_takenEmail"))
        }
        else
        {
          goNext();
        }
      }
    }
  }, [isUserFoundByEmailData])

  useEffect(() =>
  {
    if (currentPhase === SignupPhases.USERNAME)
    {
      if (isUserFoundByUsernameData)
      {
        const data = isUserFoundByUsernameData.isUserFoundByUsername;

        if (data.is_successful)
        {
          signupGTMFailure(t("validation_takenUsername"));

          addAPIError("username", t("validation_takenUsername"))
        }
      }
    }
  }, [isUserFoundByUsernameData])

  // Sign up validation
  useEffect(() =>
  {
    if (isSignUpSuccessful)
    {
      // TODO: GTM signup success
      signupGTMSuccess();

      goNext()
    }
    else
    {
      // TODO: GTM signup fail
      signupGTMFailure(signUpErrorMessage);

      const signUpErrorsObj: { [index: string]: string } =
      {
        "2017": "password",

        "4008": "phoneNumber",
        "4009": "phoneNumber",
        "2015": "phoneNumber",
        "3068": "phoneNumber",
        "2069": "phoneNumber",

        "2081": "referralCode",
        "2102": "referralCode",

        "2013": "username",
        "2001": "username",
        "4010": "username",
        "4011": "username",
      }

      const inputField = signUpErrorsObj[signUpErrorCode]

      if (inputField)
      {
        addAPIError(inputField, signUpErrorMessage)
      }
    }
  }, [isSignUpSuccessful, signUpErrorCode, signUpErrorMessage])

  useEffect(() =>
  {
    console.log("accountError: ", accountError);

    if (isUpdatedAccount)
    {
      setEmail(editEmailValue)

      const channel = 'email';

      console.log("I am in!!!!");

      requestOTP({ type: "signup", endpoint: Platform.OS, channel: channel } as OtpModel);
      goToState(SignupPhases.OTP);
    }
    else if (accountError)
    {
      addAPIError("editEmail", accountError)
    }
  }, [accountError, isUpdatedAccount])


  useEffect(() =>
  {
    if (otp.length === 6)
    {
      verifyOTP({ type: "signup", otp: otp } as OtpModel);
    }
  }, [otp]);

  useEffect(() =>
  {
    if (isVerifiedStatus)
    {
      otpGTMConfirmed()

      goToState(SignupPhases.FINISHED)
    } else
    {
      signupGTMFailure(verifiedErrorMsg);
      addAPIError("otp", verifiedErrorMsg)
    }
  }, [isVerifiedStatus, verifiedErrorMsg]);


  useEffect(() =>
  {
    setAPIError({})
  }, [prefs.language])

  useEffect(() =>
  {
    const parsedQueryString = queryString.parse(window.location.search, {parseBooleans: true, parseNumbers: true});

    if (!isEmpty(parsedQueryString) && parsedQueryString?.error)
    {
      setAPIError({ email: (parsedQueryString?.error as string) });
    }
  }, []);


  const PhasesObject =
  {
    [SignupPhases.EMAIL]:
      <EmailPhase
        dir={dir}
        isLoading={prefs.isLoading}
        APIError={{ email: APIError?.email }}

        goNext={goNextWrapper}
        resetAPIError={resetAPIError}
      />,

    [SignupPhases.USERNAME]:
      <UsernamePhase
        dir={dir}
        isLoading={prefs.isLoading}
        APIError={{
            username: APIError?.username,
            password: APIError?.password,
            referralCode: APIError?.referralCode,
            phoneNumber: APIError?.phoneNumber,
        }}

        validateUsername={(username: string) =>
        {
          validateUserData({ username: username } as AuthModel, "username");
          setUsername(username)
        }}

        goNext={goNextWrapper}
        resetAPIError={resetAPIError}
      />,

    [SignupPhases.OTP]:
      <OTPPhase
        otpType={"signup"}
        dir={dir}
        setOtp={setOtp}
        goNext={goNextWrapper}
        apiErrorMessage={APIError.otp}
        setApiError={() => resetAPIError("otp")}
      />,

      [SignupPhases.EDIT_EMAIL]:
        <EditEmailPhase
          isLoading={prefs.isLoading}
          dir={dir}
          apiErrorMessage={APIError.editEmail}
          editEmail={(form: Form) =>
          {
            updateAccount({email: form.editEmail.value} as AccountModel);

            setEditEmailValue(form.editEmail.value)
          }}
          resetAPIError={resetAPIError}
          goBack={goBack}
        />,

    [SignupPhases.FINISHED]: <FinishedPhase goNext={props.goToQuestionnaire}/>
  };

  return (
    <div className={`relative w-full ${currentPhase === SignupPhases.FINISHED ? "h-[calc(100vh-40px-200px)] sm:h-fit flex items-center justify-center": "place-start"}`}>
        {PhasesObject[currentPhase]}
    </div>
    );
};

export default SignUpCard;
