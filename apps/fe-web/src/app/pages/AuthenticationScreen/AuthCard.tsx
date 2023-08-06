import { useEffect, useState, useRef } from 'react';

import usePhases from './usePhases';
import Icon from '../../common/Icon';
import { IconNames, Validator } from '@fe-monorepo/helper';

import HoverText from '../../common/HoverText';

import SignUpCard from './SignUp/SignUpCard';
import SignInCard from './SignInCard';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '@fe-monorepo/store';
import Questionnaire from './Questionnaire';

import { motion } from 'framer-motion';

import { SignupPhases, SigninPhases } from 'apps/fe-web/src/lib/types/authTypes';
import { useNavigate } from 'react-router-dom';

export interface AuthProps
{
  type: 'signup' | 'signin';
  toggleType: () => void;
  setIsDoneSignup: (value: boolean) => void
}

const BackButtonIcon = (props: { goBack: () => void }) =>
{
  return (
  <>
    <div className="relative w-full flex h-fit scale-100 4xl:hidden">
      <Icon
        className="cursor-pointer stroke-sunset fill-sunset ltr:rotate-180 "
        name={IconNames.arrow}
        width={20}
        height={20}
        onClick={props.goBack}
      />
    </div>

    <div className="relative w-full h-fit scale-100 hidden 4xl:flex 5xl:hidden">
      <Icon
        className="cursor-pointer stroke-sunset fill-sunset ltr:rotate-180 "
        name={IconNames.arrow}
        width={35.55}
        height={35.55}
        onClick={props.goBack}
      />
    </div>

    <div className="relative w-full h-fit scale-100 hidden 5xl:flex 8xl:hidden">
      <Icon
        className="cursor-pointer stroke-sunset fill-sunset ltr:rotate-180 "
        name={IconNames.arrow}
        width={53}
        height={53}
        onClick={props.goBack}
      />
    </div>

    <div className="relative w-full h-fit scale-100 hidden 8xl:flex">
      <Icon
        className="cursor-pointer stroke-sunset fill-sunset ltr:rotate-180 "
        name={IconNames.arrow}
        width={106.66}
        height={106.66}
        onClick={props.goBack}
      />
    </div>
  </>
  )
}

interface TitleProps
{
  authType: 'signin' | 'signup';
  isPassword: boolean,
  isOTPPhase: boolean,
  isEditEmail: boolean
}

const CardTitle = (props: TitleProps) =>
{
  const { authType, isOTPPhase, isEditEmail, isPassword } = props;
  const { t } = useTranslation();

  const titleKey =  isOTPPhase? "common_otp_final_boss":
                    authType === 'signup'? 'common_create_account':
                    props.isPassword? 'common_password_capital':
                    'action_signin'

  const titleText = isOTPPhase
                ?
                  t('common_otp_final_boss')
                :
                  isEditEmail
                ?
                  t("formAttribute_edit_email")
                :
                  authType === 'signup'
                ?
                  t('common_create_account')
                :
                  isPassword
                ?
                  t('common_password_capital')
                :
                  t('action_signin')

  return (
    <div className="
        h-fit  w-full
        flex items-center
        py-20 4xl:py-36 5xl:py-54 8xl:py-100"
    >
      <motion.p
        key={titleKey}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="
            w-fit
            font-medium text-black100
            text-bigTitle 4xl:text-huge 5xl:text-xlargeDynamic 8xl:text-fiveKDynamic
            tracking-[-3%]"
      >
        {titleText}
      </motion.p>
    </div>
  );
};

const CardSubtitle = (props: {
          authType: 'signin' | 'signup';
          isFirstPhase: boolean,
          isOTPPhase: boolean;
          email: string,
          toggleType: () => void;
          goToEditEmail: () => void
}) =>
{
  const { authType, isFirstPhase, isOTPPhase, toggleType, goToEditEmail } = props;
  const { t } = useTranslation();

  return (
    <motion.div
      key={authType + isFirstPhase + isOTPPhase}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}

      className="
        h-fit w-full
        text-body 4xl:text-subtitle 5xl:text-fourKSubtitle 8xl:text-LPTitle
        font-regular
        flex
        mb-20 4xl:mb-36 5xl:mb-54 8xl:mb-100"
    >
      {
        isOTPPhase
      ?
        <div>
          <p className="me-8 4xl:me-16 5xl:me-22 8xl:me-44 text-black70">
            {t('msg_password_send_code')}
          </p>

          <div className='flex'>
              <p className='font-bold text-black100  me-4 4xl:me-8 5xl:me-12 8xl:me-22'>{props.email}</p>

              {
                authType === "signup"
              &&

                <HoverText
                    className="text-sunset"
                    alwaysShowUnderline={true}
                    underlineStyle="bg-sunset h-[1px] 4xl:h-[1.77px] 5xl:h-[2.66px] 8xl:h-[5.333px]"
                    text={t('formAttribute_edit_email')}
                    onClick={goToEditEmail}
                />
              }
          </div>
        </div>
      :
        <>
          {
            isFirstPhase
          &&
          <>
            <span className="me-8 4xl:me-16 5xl:me-22 8xl:me-44 text-black70">{authType === 'signup' ? t('common_have_an_account') : t('common_new_to_stc')}</span>

            <HoverText
              className="text-sunset"
              alwaysShowUnderline={true}
              underlineStyle="bg-sunset h-[1px] 4xl:h-[1.77px] 5xl:h-[2.66px] 8xl:h-[5.333px]"
              text={authType === 'signup' ? t('common_signin_card') : t('common_create_account')}
              onClick={toggleType}
            />
          </>
          }
        </>
      }
    </motion.div>
  );
};

const AuthCard = (props: AuthProps) =>
{
  const prefs = useSelector((state: RootState) => state.app);

  const { type } = props;

  const User = useSelector((state: RootState) => state.user.userContext);

  const navigate = useNavigate()

  const {
        index: phaseIndex,
        currentPhase,
        goBack: goBackToPreviousPhase,
        goNext,
        setIndex,
        goToState
      } = usePhases(Object.values(type === 'signup' ? SignupPhases : SigninPhases), [type]);

  const [email, setEmail] = useState<string>('');

  useEffect(() =>
  {
    // setIndex(3)
    // goToState(SignupPhases.FINISHED)
  }, []);

  const goBack = () =>
  {
    const isFirstPhase = [SigninPhases.EMAIL as string, SignupPhases.EMAIL].includes(currentPhase);

    if (isFirstPhase)
    {
      navigate(-1)
    }
    else
    {
      goBackToPreviousPhase()
    }
  }
  const isPassword = [SigninPhases.PASSWORD as string].includes(currentPhase);
  const isOTPPhase = [SignupPhases.OTP as string, SigninPhases.OTP as string].includes(currentPhase);
  const isEditEmail= [SignupPhases.EDIT_EMAIL as string].includes(currentPhase);

  const dir = prefs?.language === 'en' ? `ltr` : `rtl`

  return (
      <motion.div
        layoutId={dir+"authCard"}
        layout="preserve-aspect"
        key={"authCard"}
        className="
              relative bg-white100
              p-20 sm:p-[48px] 4xl:p-[85px] 5xl:p-[128px] 8xl:p-[256px]
              h-full sm:h-fit
              w-full sm:w-[486px] 4xl:w-[864px] 5xl:w-[1296px] 8xl:w-[2592px]
              flex flex-col
              rounded-[8px] 4xl:rounded-[14.22px] 5xl:rounded-[20px] 8xl:rounded-[43px]
              overflow-hidden
        "

        transition={{ duration: 0.5 }}
      >
        {
          <>
            {
               !(type === 'signup' && currentPhase === SignupPhases.FINISHED)
            &&
              <BackButtonIcon goBack={goBack}/>
            }

            {
              // 'SIGNIN_PASSWORD'
              (type === 'signin' && currentPhase === SigninPhases.PASSWORD || currentPhase === SignupPhases.USERNAME || currentPhase === SignupPhases.EDIT_EMAIL)
            ?
              <CardTitle
                  authType={type}
                  isEditEmail={isEditEmail}
                  isPassword={isPassword}
                  isOTPPhase={isOTPPhase}
              />
            :
              <>
                {
                  !(type === 'signup' && currentPhase === SignupPhases.FINISHED)
                &&
                  <>
                    <CardTitle
                      authType={type}
                      isPassword={isPassword}
                      isOTPPhase={isOTPPhase}
                      isEditEmail={isEditEmail}
                    />

                    <CardSubtitle
                      authType={type}
                      email={type === 'signup' ? Validator.isValidEmail(email)? (""+email).toLowerCase():User.identifier : User.identifier}
                      isOTPPhase={isOTPPhase}
                      isFirstPhase={phaseIndex === 0}
                      toggleType={props.toggleType}
                      goToEditEmail={() => goToState(SignupPhases.EDIT_EMAIL)}
                    />
                  </>
                }
              </>
            }

            {
              type === 'signup'
            ?
              <SignUpCard
                currentPhase={currentPhase as SignupPhases}

                setEmail={setEmail}
                toggleType={props.toggleType}
                goNext={goNext}
                goBack={goBackToPreviousPhase}
                goToQuestionnaire={() => props.setIsDoneSignup(true)}
                goToState={goToState}
              />
            :
              <SignInCard
                currentPhase={currentPhase as SigninPhases}

                toggleType={props.toggleType}
                goNext={goNext}
                setEmail={setEmail}
              />
            }
          </>
        }
      </motion.div>
  );
};

export default AuthCard;
