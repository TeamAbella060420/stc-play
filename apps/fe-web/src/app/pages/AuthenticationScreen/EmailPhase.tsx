import { IconNames, LOGIN_TYPES, OTP_TYPES_SCREENS } from '@fe-monorepo/helper';
import { useFormState } from 'apps/fe-web/src/lib/hooks/useFormState/useFormState';
import SocialMediaAuthentication from 'apps/fe-web/src/lib/types/socialMediaType';
import EmailField from '../../common/EmailField';
import Button from '../../components/Button';
import SocialMediaAuthButton from '../../common/SocialMediaAuthButton';
import { useTranslation } from 'react-i18next';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useAuth } from '@fe-monorepo/hooks';
import { LoginModel } from '@fe-monorepo/models';
import { useWebSocialMedia } from 'apps/fe-web/src/lib/hooks/useWebSocialMedia/useWebSocialMedia';
import AppleLogin from 'react-apple-login';
import uniqid from 'uniqid';
import ContinueButton from './ContinueButton';
import useSocialMediaAuthArray from './useSocialMediaAuthArray';
import Or from './Or';

const EmailPhase = (props: {
  dir: string;
  goNext: (form: any) => void;
  apiErrorMessage?: string | undefined;
  setApiError: Dispatch<SetStateAction<string>>;
  handleGTMEvent?: (event: string, {}: object) => void;
  isLoading?: boolean;
}) => {
  const { dir, goNext, handleGTMEvent = (event: string, {}: object) => {}, isLoading } = props;
  const { t } = useTranslation();
  const { form, isFormValid, editForm } = useFormState();
  const { createAccessLink, linkData, errorMessage, appleLoginUser } = useAuth();
  const { getMediaLink, handleSignInWithApple } = useWebSocialMedia();
  const [currentProvider, setCurrentProvider] = useState<string>('');

  useEffect(() =>
  {
    if (linkData !== undefined) {
      if (linkData.url.length > 0) {
        getMediaLink(linkData.url, currentProvider);
      }
    }
  }, [linkData, currentProvider, errorMessage]);

  return (
    <div className='animate__animated animate__fadeIn'>
      <EmailField
        onChange={e => editForm('Email', e)}
        apiErrorMessage={props.apiErrorMessage}
        label={t('formAttribute_loginIdentifier')}
        validateEmail={false}
        showValidationMessage={false}
        minChar={2}/>

      <ContinueButton
          action={() => goNext(form)}
          disabled={!isFormValid || isLoading}
          isLoading={isLoading}
          isFirstPhase={true}
          handleGTMEvent={props?.handleGTMEvent}
          authType="signin"
      />
    </div>
  );
};

export default EmailPhase;
