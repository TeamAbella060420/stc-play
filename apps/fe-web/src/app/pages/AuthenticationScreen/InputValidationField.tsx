import InputField, { InputFieldStyle } from '../../common/InputField';

import { ValidationParameters } from '../../hooks/useInputValidation';

import useInputValidation from '../../hooks/useInputValidation'

type ValidationRule =
{
  checkValidity: (value: string) => boolean;
  errorMessage: string;
};

type InputFieldProps =
{
  style: InputFieldStyle;
  label: string;
  isSecret?: boolean;
};

interface InputProps
{
  inputFieldProps: InputFieldProps;
  validationRules: ValidationRule[];
  isOptional: boolean;
  errorMessage?: string;
  apiErrorMessage?: string | undefined;

  onChange: (e: { value: string; isValid: boolean }) => void;
  resetAPIError: () => void,
  isUserAllowedToType?: (value: string) => boolean
}

const InputValidationField = (props: InputProps) =>
{
  const validationParameters: ValidationParameters =
  {
    isOptional: props.isOptional,
    validationRules: props.validationRules,
    apiErrorMessage: props.apiErrorMessage,
    resetAPIError: props.resetAPIError,
    onChange: props.onChange,
    dependencies: []
  }

  const { setValue, setFocused, setTyped, errorMessage } = useInputValidation(validationParameters);

  const isUserAllowedToType = (value: string) =>
  {
    if (props?.isUserAllowedToType)
    {
      return props.isUserAllowedToType(value)
    }

    return true;
  }

  return (
    <InputField
      {...props.inputFieldProps}
      errorMessage={errorMessage}

      isUserAllowedToType={isUserAllowedToType}
      retrieveValue={setValue}
      retrieveFocus={setFocused}
      retrieveTyped={setTyped}
    />
  );
};

export default InputValidationField;
