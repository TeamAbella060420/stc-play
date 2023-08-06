import { Validator } from '@fe-monorepo/helper';
import { useUser } from '@fe-monorepo/hooks';
import { AuthModel } from '@fe-monorepo/models';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NAV_ROUTES } from '../helpers/navRoutes';

export const useFormValidation = () => {
  const { t } = useTranslation();
  const [errorEmail, setErrorEmail] = useState<string>();
  const [errorUsername, setErrorUsername] = useState<string>();
  const [activeScreen, setActiveScreen] = useState<NAV_ROUTES>();
  const { validateUserData, isUserFoundByEmailData, isUserFoundByUsernameData } = useUser();

  const validateEmail = (email: string, screen: NAV_ROUTES, currentEmail?: string) => {
    setActiveScreen(screen);
    if (email.length > 2) {
      if (!Validator.isValidEmail(email)) {
        setErrorEmail(t('validation_email_format_incorrect'));
      } else {
        if (currentEmail !== email)
          validateUserData({ email: email } as AuthModel, 'email');
      }
    } else {
      setErrorEmail('');
    }
  };

  const validateEmailTyping = (email: string, screen: NAV_ROUTES) => {
    setActiveScreen(screen);

    if (email.length > 2) {
      if (!Validator.isValidEmail(email)) {
        setErrorEmail(t('validation_email_format_incorrect'));
      } 
    } else {
      setErrorEmail('');
    }
  };

  const validateUsernameTyping = (username: string, screen: NAV_ROUTES) => {
    setActiveScreen(screen);
    if (username.length > 0) {
      if (!Validator.isValidUsernameLength(username)) {
        setErrorUsername(t('validation_username_min_length'));
      } 
    } else {
      setErrorUsername('');
    }
  };

  useEffect(() => {
    if (isUserFoundByEmailData) {
      if (isUserFoundByEmailData.isUserFoundByEmail.error_code === '' && activeScreen === NAV_ROUTES.AdditionalInput) {
        setErrorEmail(t('validation_takenEmail'));
      } else {
        setErrorEmail('');
      }
    }
  }, [isUserFoundByEmailData]);

  const validateUsername = (username: string, screen: NAV_ROUTES) => {
    setActiveScreen(screen);
    if (username.length > 0) {
      if (!Validator.isValidUsernameLength(username)) {
        setErrorUsername(t('validation_username_min_length'));
      } else {
        validateUserData({ username: username } as AuthModel, 'username');
      }
    } else {
      setErrorUsername('');
    }
  };

  useEffect(() => {
    if (isUserFoundByUsernameData) {
      if (isUserFoundByUsernameData.isUserFoundByUsername.error_code === '' && activeScreen === NAV_ROUTES.AdditionalInput) {
        setErrorUsername(t('validation_takenUsername'));
      } else {
        setErrorUsername('')
      }
    }
  }, [isUserFoundByUsernameData]);

  return { validateEmail, validateUsername, validateUsernameTyping,  validateEmailTyping, errorEmail, errorUsername };
};
