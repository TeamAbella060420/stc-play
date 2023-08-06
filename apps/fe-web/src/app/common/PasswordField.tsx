import * as React from 'react';

import ValidationRule from '../../lib/types/validationRules';
import InputValidationField from '../pages/AuthenticationScreen/InputValidationField';
import { useTranslation } from 'react-i18next';
import { Validator } from '@fe-monorepo/helper';
import { authInputFieldStyleObj } from '../pages/AuthenticationScreen/commonStyles';

interface PasswordFieldProps {
  onChange: (e: { value: string; isValid: boolean }) => void;

  resetAPIError?: () => void;

  apiErrorMessage?: string;
  validatePassword?: boolean;
}

const PasswordField: React.FC<PasswordFieldProps>= ({
  onChange,
  resetAPIError,
  apiErrorMessage,
  validatePassword = true
}) => {
  const { t } = useTranslation();

  const rules: ValidationRule[] = [
    {
      checkValidity: (value: string) => value.length > 0,
      errorMessage: t('validation_passwordEmpty')
    },
    {
      checkValidity: Validator.isValidPasswordMinLength,
      errorMessage: t('validation_invalid_password')
    },
    ...(validatePassword ? [
      {
        checkValidity: Validator.isValidPassword,
        errorMessage: t("validation_invalid_password")
      }
    ] : [])
  ];

  const resetErrorMessage = () =>
    {
      if (resetAPIError)
      {
        resetAPIError();
      }
    }


  const isUserAllowedToType = (value: string) =>
  {
    return Validator.isValidPasswordMaxLength(value)
  }

  return (
    <InputValidationField
      inputFieldProps={{
        style: authInputFieldStyleObj,

        label: t('formAttribute_password'),
        isSecret: true
      }}
      validationRules={rules}
      isOptional={false}
      onChange={onChange}
      apiErrorMessage={apiErrorMessage}
      resetAPIError={resetErrorMessage}
      // isUserAllowedToType={isUserAllowedToType}
    />
  );
};

export default PasswordField;
