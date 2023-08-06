import { useOtp } from '@fe-monorepo/hooks';
import { useSelector } from 'react-redux';
import { RootState } from '@fe-monorepo/store';
import { useFormState } from 'apps/fe-web/src/lib/hooks/useFormState/useFormState';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import OtpInput from 'react-otp-input';
import { Platform } from 'react-native';
import { OtpModel } from '@fe-monorepo/models';

interface Props
{
  dir: string;
  otpType: 'login' | "signup",
  apiErrorMessage: string | undefined;

  setOtp: (value: string) => void;
  goNext: (form: any) => void;
  setApiError: (value: string) => void;
}

const OTPPhase = (props: Props ) =>
{
  const prefs = useSelector((state: RootState) => state.app);
  const { dir, goNext } = props;
  const { form } = useFormState();
  const { t } = useTranslation();
  const { requestOTP, isRequestStatus } = useOtp();

  const channel = 'email';

  const [timer, setTimer] = useState<number>(60);
  const [code, setCode] = useState<string>('');
  const [isTimer, setIsTimer] = useState<boolean>(true);
  const [showButton, setShowButton] = useState<boolean>(false);

  const handleCodeOtp = (code: string) => setCode(code);

  const handleCodeReset = () =>
  {
    setCode('');
    setTimer(60);
    setIsTimer(true);
    setShowButton(false);

    requestOTP({ type: props.otpType, endpoint: Platform.OS, channel: channel } as OtpModel);

    // {TODO: create a validation if the request failed}
  };

  const formatTimer = () =>
  {

    const zero = prefs.language === "en"? "0": (0).toLocaleString("ar-u-nu-arab");
    const rawMinutes =  Math.floor(timer / 60);
    let minutes = prefs.language === "en"? rawMinutes: rawMinutes.toLocaleString("ar-u-nu-arab");

    minutes = minutes.toString().padStart(2, zero);

    const rawSeconds =  timer % 60;
    let seconds = prefs.language === "en"? rawSeconds: rawSeconds.toLocaleString("ar-u-nu-arab");

    seconds = seconds.toString().padStart(2, zero);

    return `${minutes}:${seconds}`;
  };


  useEffect(() =>
  {
    let intervalId: NodeJS.Timeout;

    if (isTimer)
    {
      intervalId = setInterval(() =>
      {
        setTimer(prevTimer =>
        {
          if (prevTimer === 0)
          {
            clearInterval(intervalId);
            setIsTimer(false);
            setShowButton(true);
          }

          return prevTimer - 1;
        });
      }, 1000);
    }

    return () =>
    {
      clearInterval(intervalId);
    };
  }, [isTimer]);

  useEffect(() => {
    if (code.length === 6)
    {
      props.setOtp(code);
      goNext(form);
    }
  }, [code]);

  useEffect(() =>
  {
    if (code.length === 5)
    {
      props.setApiError('');
    }
  }, [code]);

  useEffect(() =>
  {
    props.setApiError('');
  }, [prefs.language])

  return (
    <div className='w-full animate__animated animate__fadeIn'>

      {/* TODO: this component is not flexible. It needs to be replaced */}
      <div dir='ltr'>
        <OtpInput
          value={code}
          onChange={handleCodeOtp}
          numInputs={6}

          // renderSeparator={<span className={`mx-12 pb-8`} />}
          containerStyle={"w-full grid gap-8 4xl:gap-12 5xl:gap-20 8xl:gap-44"}
          renderInput={props =>
            {
              const newProps = { ...props, style: {} }

              return (
                  <div className='w-[15%] flex justify-center'>
                      <input
                        { ...newProps }
                        className='
                          text-center w-full
                          text-[55px]/[60px] sm:text-huge 4xl:text-xlargeDynamic 5xl:text-fourKTitle 8xl:text-eightKTitle
                          p-0 border-b-2 4xl:border-b-[3.55px] 5xl:border-b-4 8xl:border-b-[11px] outline-none
                          focus:border-sunset
                          font-medium leading-3
                          bg-transparent'
                      />
                  </div>
                )
            }
          }

          shouldAutoFocus={true}
        />
      </div>

      {
        props.apiErrorMessage !== undefined && props.apiErrorMessage?.length > 0
      ?
        <div className={`pt-5 4xl:pt-8 5xl:pt-16 8xl:pt-24`}>
          <p className="text-bodySmall 4xl:text-subtitle 5xl:text-bigTitle 8xl:text-LPTitle font-regular text-red">{props.apiErrorMessage}</p>
        </div>
      :
        <span />
      }

      <div className={`
                mt-56 4xl:mt-100 5xl:mt-140 8xl:mt-300
                mb-140 4xl:mb-240 5xl:mb-370 8xl:mb-655
                text-body 4xl:text-subtitle 5xl:text-fourKSubtitle 8xl:text-LPTitle
                leading-6 font-light
                py-5 5xl:py-12`}
      >
        {
          showButton
        ?
          <button className={`relative text-sunset`} onClick={handleCodeReset}>
            <span className="
                  border-b-[1px] 4xl:border-b-[1.77px] 5xl:border-b-[2.66px] 8xl:border-b-[5.33px]
                  pb-2 4xl:pb-[3.55px] 5xl:pb-4 8xl:pb-11
                  border-sunset"
            >{t('common_otp_resend_code')}</span>
          </button>
        :
          <span className={``}>
            {t('common_otp_resend_in')}
            {" "+formatTimer()}
          </span>
        }
      </div>
    </div>
  );
};

export default OTPPhase;
