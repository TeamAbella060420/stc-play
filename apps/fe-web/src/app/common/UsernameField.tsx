import * as React from 'react';

import ValidationRule from '../../lib/types/validationRules';
import InputValidationField from '../pages/AuthenticationScreen/InputValidationField';
import { useTranslation } from 'react-i18next';


import { Validator } from '@fe-monorepo/helper';
import { authInputFieldStyleObj } from '../pages/AuthenticationScreen/commonStyles';

type Props =
{
  onChange: (e: { value: string; isValid: boolean }) => void;

  resetAPIError?: () => void;

  apiErrorMessage?: string;
}

const UsernameField = (props: Props) =>
{
  const { t } = useTranslation();


  const rules: ValidationRule[] =
  [
    {
      checkValidity: Validator.isNotEmpty,
      errorMessage: t('validation_usernameEmpty')
    },
    {
      checkValidity: Validator.isValidUsernameLength,
      errorMessage: t('validation_invalidUsernameLength')
    },
    {
      checkValidity: Validator.isValidUsername,
      errorMessage: t('validation_invalid_username')
    }
  ];


  const resetErrorMessage = () =>
    {
      if (props?.resetAPIError)
      {
        props.resetAPIError();
      }
  }


  const isUserAllowedToType = (value: string) =>
  {
    return Validator.isValidUsernameMaxLength(value)
  }

  return (
    <InputValidationField
      inputFieldProps={{
        style:
        {
          ...authInputFieldStyleObj,
          containerStyle: ''
        },

        label: t('formAttribute_username'),
        isSecret: false
      }}
      validationRules={rules}
      isOptional={false}
      onChange={props.onChange}
      apiErrorMessage={props.apiErrorMessage}
      resetAPIError={resetErrorMessage}
      isUserAllowedToType={isUserAllowedToType}
    />
  );
};

export default UsernameField;
