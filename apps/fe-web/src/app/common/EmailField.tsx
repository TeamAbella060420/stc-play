import { Validator } from '@fe-monorepo/helper';


import ValidationRule from '../../lib/types/validationRules';
import InputField, { InputFieldStyle } from './InputField';

import { ValidationParameters } from '../hooks/useInputValidation';

import { useTranslation } from 'react-i18next';
import useInputValidation from '../hooks/useInputValidation';
import { authInputFieldStyleObj } from '../pages/AuthenticationScreen/commonStyles';

interface EmailFieldProps
{
  onChange: (e: { value: string; isValid: boolean }) => void;

  resetAPIError?: () => void;

  apiErrorMessage?: string;
  label?: string | null;
  validateEmail?: boolean;
  minChar?: number | string;
  maxChar?: number;
  showValidationMessage?: boolean;
}

const EmailField: React.FC<EmailFieldProps> = ({
  apiErrorMessage,
  resetAPIError,
  onChange,
  label,
  validateEmail = true
}) =>
{
    const { t } = useTranslation();

    const validationRules: ValidationRule[] =
    [
      {
        checkValidity: Validator.isNotEmpty,
        errorMessage: t('validation_emailEmptyField')
      },
      ...(validateEmail ? [{
        checkValidity: Validator.isValidEmail,
        errorMessage: t("validation_emailMustMatch")
      }] : [])
    ]

    const validationParameters: ValidationParameters =
    {
      isOptional: false,
      validationRules: validationRules,
      apiErrorMessage: apiErrorMessage,
      resetAPIError: resetAPIError,
      onChange: onChange,
      dependencies: []
    }

    const { errorMessage, setValue, setFocused, setTyped } = useInputValidation(validationParameters);


    const isUserAllowedToType = (value: string) =>
    {
      return Validator.isValidEmailLength(value)
    }

    return (
      <InputField
        style={authInputFieldStyleObj}

        isSecret={false}
        label={label ?? t('formAttribute_email')}
        errorMessage={errorMessage}

        isUserAllowedToType={isUserAllowedToType}
        retrieveValue={setValue}
        retrieveFocus={setFocused}
        retrieveTyped={setTyped}
      />
    );
};

export default EmailField;
