import { useEffect, useState } from 'react';
import { RootState } from '@fe-monorepo/store';
import { useSelector } from 'react-redux';
import EmailPhase from './EmailPhase';
import PasswordPhase from './PasswordPhase';
import OTPPhase from './OTPPhase';
import { CHANNEL, Validator } from '@fe-monorepo/helper';
import { AuthModel } from '@fe-monorepo/models';
import { useUser, useAuth, useOtp, useAccount } from '@fe-monorepo/hooks';
import { Platform } from 'react-native';
import { LoginModel, OtpModel, UserModel } from '@fe-monorepo/models';
import { useNavigate } from 'react-router';
import { startCase } from 'lodash';
import useGTM from '../../hooks/useGTM';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { aesEnrypt } from '@fe-monorepo/helper';
import { isEmpty } from 'lodash';
import { AppRoutes } from '../../app.routes.enum';
enum SigninPhases {
  EMAIL = 'SIGNIN_EMAIL',
  PASSWORD = 'SIGNIN_PASSWORD',
  OTP = 'SIGNIN_OTP'
}

const SignInCard = (props: {
  currentPhase: SigninPhases;
  goNext: () => void;
  toggleType: () => void;
  setEmail: (value: string) => void;
}) => {
  const { t } = useTranslation();
  const { addEvent } = useGTM();
  const prefs = useSelector((state: RootState) => state.app);
  const User = useSelector((state: RootState) => state.user.userContext);
  const dir = prefs?.language === 'en' ? `ltr` : `rtl`;
  const navigate = useNavigate();
  const { loginUser, loginData, isSuccessFull, setIsSuccessFul, errorMessage: errorAuthMessage } = useAuth();
  const { validateUserData, isValidUser, setValidUser, errorMessage: errorUserMessage } = useUser();
  const { verifyOTP, requestOTPErrorMsg, verifiedErrorMsg, isVerifiedStatus } = useOtp();
  const { getUserProfile } = useAccount();
  const { currentPhase, goNext } = props;

  // States
  const [emailPass, setEmailPass] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [apiError, setApiError] = useState<string>('');
  const handleGtmEvent = async (
    event = 'login',
    {
      loginMethod = null,
      lastLoginDate = false,
      user = null
    }: { loginMethod?: string | null; lastLoginDate?: boolean; user?: UserModel | null } = {},
    redirect = ''
  ) => {
    const userDetails = User.username ? User : user;
    if (!isEmpty(userDetails) || event === 'login_failed') {
      addEvent({
        event,
        event_properties: {
          user_id: userDetails?.username || '',
          account_name: event === 'login_failed' ? emailPass : userDetails?.display_name || '',
          language: t(prefs?.language),
          ...(loginMethod ? { login_method: loginMethod } : {}),
          ...(lastLoginDate ? { last_login_date: moment().format('YYYY-MM-DD') } : {}),
          ...(errorAuthMessage && event === 'login_failed'
            ? {
                reason: errorAuthMessage
              }
            : {})
        },
        user_properties: {
          user_id: userDetails?.username || '',
          user_email_hashed: aesEnrypt(userDetails?.email || emailPass),
          user_number_hased: aesEnrypt(userDetails?.mobile || ''),
          account_name: userDetails?.display_name || ''
        }
      });
    }
    if (redirect) {
      navigate(redirect);
    }
  };
  const getUserDetails = async (event: string, options: object = {}, redirect = '') => {
    const { data: userProfile } = await getUserProfile();
    const { getUserProfileInfo } = userProfile;
    if (getUserProfileInfo.is_successful) {
      return handleGtmEvent(
        event,
        {
          user: getUserProfileInfo.data,
          ...options
        },
        redirect
      );
    }
  };
  const goNextWrapper = async (form: any) => {
    let type = 'email';

    if (currentPhase === SigninPhases.EMAIL) {
      if (Validator.isValidEmail(form.Email.value) && Validator.isValidEmailLength(form.Email.value)) {
        props.setEmail(form.Email.value);
        setEmailPass(form.Email.value);
        setValidUser(false);
        validateUserData({ email: form.Email.value } as AuthModel, type);
      } else {
        type = 'username';
        props.setEmail(form.Email.value);
        setEmailPass(form.Email.value);
        setValidUser(false);
        validateUserData({ username: form.Email.value } as AuthModel, type);
      }
    } else if (currentPhase === SigninPhases.PASSWORD) {
      const password = form.Password.value;
      setIsSuccessFul(false);
      loginUser(
        {
          identifier: emailPass.toString(),
          endpoint: Platform.OS,
          channel: CHANNEL.EMAIL,
          password: password.toString()
        } as LoginModel,
        true
      );
      if (form?.rememberMe?.value) {
        window.localStorage.setItem(
          'x-user',
          aesEnrypt({
            identifier: emailPass.toString(),
            password: password.toString()
          })
        );
      } else {
        window.localStorage.removeItem('x-user');
      }
    }
  };

  // Check if the user is valid
  useEffect(() => {
    if (isValidUser) {
      console.log('Passed Valid User');
      setApiError('');
      goNext();
    } else {
      setApiError(errorUserMessage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValidUser, errorUserMessage]);

  // Checks if the access is valid
  useEffect(() => {
    if (isSuccessFull) {
      setApiError('');
      if (loginData?.is_2FA_required === 1) {
        goNext();
      } else {
        if (!User.username) {
          getUserDetails('login', { loginMethod: 'email' }, AppRoutes.home);
        } else {
          handleGtmEvent('login', { loginMethod: 'email' }, AppRoutes.home);
        }
      }
    } else {
      setApiError(errorAuthMessage);
    }
    if (errorAuthMessage) {
      handleGtmEvent('login_failed');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessFull, errorAuthMessage, requestOTPErrorMsg]);

  useEffect(() => {
    if (otp.length === 6) {
      verifyOTP({ type: 'login', otp: otp } as OtpModel);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp]);

  useEffect(() => {
    if (isVerifiedStatus) {
      getUserDetails('confirmed_otp', { lastLoginDate: false }, AppRoutes.home);
    } else {
      setApiError(verifiedErrorMsg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVerifiedStatus, verifiedErrorMsg]);

  const PhasesObject = {
    [SigninPhases.EMAIL]: (
      <EmailPhase
        isLoading={prefs.isLoading}
        dir={dir}
        goNext={goNextWrapper}
        apiErrorMessage={apiError}
        setApiError={setApiError}
        handleGTMEvent={handleGtmEvent}
      />
    ),

    [SigninPhases.PASSWORD]: <PasswordPhase isLoading={prefs.isLoading} dir={dir} goNext={goNextWrapper} apiErrorMessage={apiError} />,

    [SigninPhases.OTP]: (
      <OTPPhase otpType={'login'} dir={dir} setOtp={setOtp} goNext={goNextWrapper} apiErrorMessage={apiError} setApiError={setApiError} />
    )
  };

  return <div className="h-full w-full">{PhasesObject[currentPhase]}</div>;
};

export default SignInCard;
